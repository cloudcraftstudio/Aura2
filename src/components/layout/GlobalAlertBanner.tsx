import React, { useState, useEffect } from 'react';
import { Sparkles, Download, CheckCircle2, Megaphone, Heart, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Capacitor } from '@capacitor/core';
import { getCurrentDevotional } from '../../content/devotionals';

interface UpdateInfo {
  version: string;
  downloadUrl: string;
}

export const GlobalAlertBanner: React.FC = () => {
  const [bannerState, setBannerState] = useState<'checking' | 'update_available' | 'up_to_date' | 'idle'>('idle');
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [devotional, setDevotional] = useState<any>(null);
  
  const navigateTo = (tab: string, subtab?: string) => {
    window.dispatchEvent(new CustomEvent('navigate_tab', { detail: { tab, subtab } }));
  };

  useEffect(() => {
    const dev = getCurrentDevotional();
    setDevotional(dev);
  }, []);

  // Determine which verse to show based on time of day
  const getVerseOfTheDay = () => {
    if (!devotional) return null;
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        label: "Morning Manna",
        ref: devotional.morning.reference,
        text: devotional.morning.text,
        subtab: 'morning'
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        label: "Midday Scripture",
        ref: devotional.midday.reference,
        text: devotional.midday.text,
        subtab: 'midday'
      };
    } else {
      return {
        label: "Evening Watch",
        ref: devotional.evening.reference,
        text: devotional.evening.text,
        subtab: 'evening'
      };
    }
  };

  const currentVerse = getVerseOfTheDay();

  // Rotating idle alerts
  const idleAlerts = [
    ...(currentVerse ? [{ 
      icon: <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />, 
      text: `${currentVerse.label} (${currentVerse.ref}): "${currentVerse.text}"`,
      action: () => navigateTo('devotional', currentVerse.subtab)
    }] : []),
    { 
      icon: <Megaphone className="w-4 h-4 text-amber-400 shrink-0" />, 
      text: "New Sermon Series Available! Watch the latest message in the Studio.",
      action: () => navigateTo('bible', 'pulpit')
    },
    { 
      icon: <Heart className="w-4 h-4 text-amber-400 shrink-0" />, 
      text: "Join the 'Walking in Faith' Group and connect with believers today.",
      action: () => navigateTo('recovery', 'groups')
    },
    { 
      icon: <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />, 
      text: "Course Alert: Foundations of Faith is now open. Start your journey!",
      action: () => navigateTo('bible', 'courses')
    }
  ];
  
  const [idleIndex, setIdleIndex] = useState(0);

  useEffect(() => {
    const checkVersion = async () => {
      if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
        setBannerState('idle');
        return;
      }
      
      try {
        const response = await fetch('/api/system/version');
        if (response.ok) {
          const data: UpdateInfo = await response.json();
          const currentVersion = (window as any).__APP_VERSION__ || '1.0.0';
          
          if (compareVersions(data.version, currentVersion) > 0) {
            setUpdateInfo(data);
            setBannerState('update_available');
          } else {
            setBannerState('up_to_date');
            setTimeout(() => {
              setBannerState('idle');
            }, 6000);
          }
        } else {
            setBannerState('idle');
        }
      } catch (err) {
        console.warn('Failed to check for app updates:', err);
        setBannerState('idle');
      }
    };
    checkVersion();
  }, []);

  const compareVersions = (v1: string, v2: string) => {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  };

  const handleDownload = async () => {
    if (updateInfo?.downloadUrl) {
      if (Capacitor.isNativePlatform()) {
        const { Browser } = await import('@capacitor/browser');
        await Browser.open({ url: updateInfo.downloadUrl });
      } else {
        window.location.href = updateInfo.downloadUrl;
      }
    }
  };

  const nextAlert = () => {
    if (idleAlerts.length > 0) {
      setIdleIndex((prev) => (prev + 1) % idleAlerts.length);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600/20 via-amber-500/20 to-amber-600/20 border-b border-amber-500/30 overflow-hidden relative z-50">
       <div className="absolute inset-0 bg-[#05060f]/80 backdrop-blur-md" />
       
       <div className="relative pt-[max(env(safe-area-inset-top),3.25rem)] sm:pt-[max(env(safe-area-inset-top),3.25rem)] pb-2 px-4 flex items-center justify-center min-h-[50px] overflow-hidden">
          <AnimatePresence mode="wait">
            {bannerState === 'update_available' && (
              <motion.div 
                key="update"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 sm:gap-3 w-full max-w-4xl justify-center sm:justify-between flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-amber-100">
                    New version available!
                  </span>
                </div>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg text-[#05060f] font-black text-[10px] sm:text-xs tracking-wide uppercase hover:scale-105 active:scale-95 transition-transform"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Now</span>
                </button>
              </motion.div>
            )}

            {bannerState === 'up_to_date' && (
              <motion.div 
                key="uptodate"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 text-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-bold">
                  Your app is up to date, Praise the Lord!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ticker / Marquee for Idle State */}
          {bannerState === 'idle' && idleAlerts.length > 0 && (
            <div 
              className="absolute inset-0 pt-[max(env(safe-area-inset-top),3.25rem)] sm:pt-[max(env(safe-area-inset-top),3.25rem)] pb-2 flex items-center overflow-hidden cursor-pointer"
              onClick={idleAlerts[idleIndex].action}
            >
              <motion.div
                key={idleIndex}
                initial={{ x: "100vw" }}
                animate={{ x: "-100%" }}
                transition={{ 
                  duration: 26, // Slower ticker speed
                  ease: "linear"
                }}
                onAnimationComplete={nextAlert}
                className="flex items-center gap-2 whitespace-nowrap px-4 hover:opacity-80 transition-opacity"
              >
                {idleAlerts[idleIndex].icon}
                <span className="text-sm font-semibold text-amber-200 tracking-wide drop-shadow-md">
                  {idleAlerts[idleIndex].text}
                </span>
              </motion.div>
            </div>
          )}
       </div>
    </div>
  );
};
