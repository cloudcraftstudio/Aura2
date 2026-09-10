import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserStatus } from '../types';
import { auth, db, googleProvider, facebookProvider, githubProvider } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseAuthProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, query, getDocs } from 'firebase/firestore';
import { notificationService } from '../services/notifications';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

interface AuthContextType {
  user: UserProfile | null;
  allUsers: UserProfile[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
  
  // Auth Methods
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  registerWithEmail: (email: string, username: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  
  // Social
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithFacebook: () => Promise<{ success: boolean; error?: string }>;
  signInWithGithub: () => Promise<{ success: boolean; error?: string }>;
  
  // Verification & Reset
  sendVerificationEmail: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  
  // Phone Auth
  setupRecaptcha: (containerId: string) => void;
  sendPhoneCode: (phoneNumber: string) => Promise<{ success: boolean; error?: string }>;
  verifyPhoneCode: (code: string) => Promise<{ success: boolean; error?: string }>;
  
  // Profile
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  setUserStatus: (status: UserStatus, statusMessage?: string) => Promise<void>;
  getUserById: (id: string) => UserProfile | undefined;
  followUser: (targetUserId: string) => Promise<boolean>;
  
  isOnline: boolean;
  isServerConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isServerConnected, setIsServerConnected] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    let unsubscribeUsers: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Listen to all users only when authenticated
        const q = query(collection(db, 'users'));
        unsubscribeUsers = onSnapshot(q, (snapshot) => {
          const usersList: UserProfile[] = [];
          snapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() } as UserProfile);
          });
          setAllUsers(usersList);
        });

        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const profileData = userDoc.data() as Omit<UserProfile, 'id'>;
          setUser({ 
            id: firebaseUser.uid, 
            ...profileData,
            isVerified: firebaseUser.emailVerified || !!firebaseUser.phoneNumber || profileData.authProvider !== 'email'
          } as UserProfile);
        } else {
          // If no doc exists (e.g. newly signed up via social), create one
          const newProfile: UserProfile = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'New User',
            email: firebaseUser.email || '',
            handle: (firebaseUser.email?.split('@')[0] || firebaseUser.uid).toLowerCase(),
            avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
            bio: 'Just joined the sanctuary.',
            status: 'online',
            followersCount: 0,
            followingCount: 0,
            isVerified: firebaseUser.emailVerified || !!firebaseUser.phoneNumber,
            joinedAt: new Date().toISOString(),
            authProvider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email'
          };
          await setDoc(userDocRef, newProfile);
          setUser(newProfile);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribeUsers) unsubscribeUsers();
      unsubscribeAuth();
    };
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);

  const syncFirebaseUserToDb = async (firebaseUser: FirebaseUser, additionalData?: any) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      const newProfile: UserProfile = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || additionalData?.name || 'New User',
        email: firebaseUser.email || additionalData?.email || '',
        handle: additionalData?.handle || (firebaseUser.email?.split('@')[0] || firebaseUser.uid).toLowerCase(),
        avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
        bio: 'Just joined the sanctuary.',
        status: 'online',
        followersCount: 0,
        followingCount: 0,
        isVerified: firebaseUser.emailVerified || !!firebaseUser.phoneNumber || additionalData?.authProvider !== 'email',
        joinedAt: new Date().toISOString(),
        authProvider: additionalData?.authProvider || 'email'
      };
      await setDoc(userDocRef, newProfile);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        return { success: true, requiresVerification: true };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const registerWithEmail = async (email: string, username: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateFirebaseAuthProfile(result.user, { displayName: name });
      await syncFirebaseUserToDb(result.user, { name, handle: username, authProvider: 'email' });
      await sendEmailVerification(result.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncFirebaseUserToDb(result.user, { authProvider: 'google' });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await syncFirebaseUserToDb(result.user, { authProvider: 'facebook' });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await syncFirebaseUserToDb(result.user, { authProvider: 'github' });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: 'No authenticated user.' };
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const setupRecaptcha = (containerId: string) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
      });
    }
  };

  const sendPhoneCode = async (phoneNumber: string) => {
    try {
      if (!window.recaptchaVerifier) throw new Error("Recaptcha not initialized");
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const verifyPhoneCode = async (code: string) => {
    if (!confirmationResult) return { success: false, error: 'No confirmation result found' };
    try {
      const result = await confirmationResult.confirm(code);
      await syncFirebaseUserToDb(result.user, { authProvider: 'phone' });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.id);
    await updateDoc(userDocRef, updates);
    setUser({ ...user, ...updates });
  };

  const setUserStatus = async (status: UserStatus, statusMessage?: string) => {
    await updateProfile({ status, statusMessage });
  };

  const getUserById = (id: string) => allUsers.find(u => u.id === id);

  const followUser = async (targetUserId: string) => {
    // simplified mock return, actual would update followers/following lists
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user, allUsers, isAuthModalOpen, setIsAuthModalOpen, openAuthModal,
      loginWithEmail, registerWithEmail, logout,
      signInWithGoogle, signInWithFacebook, signInWithGithub,
      sendVerificationEmail, resetPassword,
      setupRecaptcha, sendPhoneCode, verifyPhoneCode,
      updateProfile, setUserStatus, getUserById, followUser,
      isOnline, isServerConnected
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
