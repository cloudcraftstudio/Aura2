import { soundEffects } from './audio';
import { AppNotification } from '../types';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

class NotificationService {
  private permission: NotificationPermission | string = 'default';
  private listeners: ((notification: AppNotification) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  public async requestPermission(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      try {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive !== 'granted') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
          this.permission = 'denied';
          return false;
        }

        await PushNotifications.register();
        this.permission = 'granted';
        return true;
      } catch (e) {
        console.warn('Capacitor Push Notifications request error:', e);
        return false;
      }
    } else {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        return false;
      }
      try {
        const result = await Notification.requestPermission();
        this.permission = result;
        return result === 'granted';
      } catch (e) {
        console.warn('Push notification permission error:', e);
        return false;
      }
    }
  }

  public async getPermissionStatus(): Promise<NotificationPermission | string> {
    if (Capacitor.isNativePlatform()) {
      try {
        const status = await PushNotifications.checkPermissions();
        return status.receive;
      } catch (e) {
        return 'denied';
      }
    }
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'denied';
  }

  public subscribe(cb: (notification: AppNotification) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public notify(options: {
    type: AppNotification['type'];
    title: string;
    body: string;
    avatar?: string;
    actionId?: string;
    playSound?: boolean;
  }) {
    const notification: AppNotification = {
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: options.type,
      title: options.title,
      body: options.body,
      avatar: options.avatar,
      actionId: options.actionId,
      timestamp: Date.now(),
      isRead: false,
    };

    // Play chime based on type
    if (options.playSound !== false) {
      if (options.type === 'chat') {
        soundEffects.playMessageReceived();
      } else if (options.type === 'like') {
        soundEffects.playLikeSparkle();
      }
    }

    // Broadcast to in-app listeners
    this.listeners.forEach((listener) => {
      try {
        listener(notification);
      } catch (err) {
        console.error('Notification listener error:', err);
      }
    });

    // Native browser push notification if permitted
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      // 1. ServiceWorkerRegistration (Required on Android Chrome & mobile PWAs)
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.showNotification(options.title, {
              body: options.body,
              icon: options.avatar || '/icon.png',
              badge: '/icon.png',
              tag: options.type + '_' + (options.actionId || 'general'),
              data: { url: window.location.href, actionId: options.actionId },
            });
          })
          .catch(() => {
            // Fallback to desktop constructor
            try {
              const nativeNotif = new Notification(options.title, {
                body: options.body,
                icon: options.avatar || '/icon.png',
                tag: options.type + '_' + (options.actionId || 'general'),
              });
              nativeNotif.onclick = () => {
                window.focus();
                nativeNotif.close();
              };
            } catch {}
          });
      } else {
        // 2. Standard desktop browser constructor
        try {
          const nativeNotif = new Notification(options.title, {
            body: options.body,
            icon: options.avatar || '/icon.png',
            tag: options.type + '_' + (options.actionId || 'general'),
          });
          nativeNotif.onclick = () => {
            window.focus();
            nativeNotif.close();
          };
        } catch (e) {
          console.warn('Native notification dispatch error:', e);
        }
      }
    }

    return notification;
  }
  // Helper to convert VAPID public key
  private urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Register device for Android / Mobile background Push Notifications
  public async registerPushSubscription(userId: string) {
    if (Capacitor.isNativePlatform()) {
      try {
        await PushNotifications.addListener('registration', async (token) => {
          console.log('Push registration success, token: ' + token.value);
          // Send native token to server (the server will need to support FCM token format)
          await fetch("/api/push/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              userId, 
              subscription: { 
                endpoint: token.value, 
                keys: { p256dh: 'fcm', auth: 'fcm' } 
              } 
            }),
          });
        });

        await PushNotifications.addListener('registrationError', (error: any) => {
          console.warn('Error on registration: ' + JSON.stringify(error));
        });

        await PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push received: ' + JSON.stringify(notification));
          this.notify({
            type: 'system',
            title: notification.title || 'Notification',
            body: notification.body || '',
          });
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        });

        await PushNotifications.register();
        return { isNative: true };
      } catch (err) {
        console.warn('Capacitor native push registration failed:', err);
        return null;
      }
    }

    if (
      typeof window === "undefined" ||
      !("Notification" in window) ||
      Notification.permission !== "granted" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window)
    ) {
      return null;
    }
    try {
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();

      if (!sub) {
        const res = await fetch("/api/push/vapid-key");
        if (!res.ok) return null;
        const { publicKey } = await res.json();
        if (!publicKey) return null;

        const convertedKey = this.urlBase64ToUint8Array(publicKey);
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
      }

      // Send subscription to server
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, subscription: sub.toJSON() }),
      });

      return sub;
    } catch (err: any) {
      // Gracefully ignore expected browser security or user permission rejections
      if (
        err?.name === "NotAllowedError" ||
        err?.message?.includes("permission denied") ||
        err?.message?.includes("Permission denied")
      ) {
        return null;
      }
      console.debug("Background push registration notice:", err);
      return null;
    }
  }

}

export const notificationService = new NotificationService();
