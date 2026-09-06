import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { soundEffects } from '../../services/audio';

interface UpdateInfo {
  version: string;
  downloadUrl: string;
  forceUpdate: boolean;
  releaseNotes?: string;
}

export const AppUpdateModal: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Only check for native Android app updates (APKs)
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return;

    const checkVersion = async () => {
      try {
        const response = await fetch('/api/system/version');
        if (response.ok) {
          const data: UpdateInfo = await response.json();
          // __APP_VERSION__ is injected by Vite via package.json
          const currentVersion = __APP_VERSION__ || '1.0.0';
          
          if (compareVersions(data.version, currentVersion) > 0) {
            setUpdateInfo(data);
            setIsVisible(true);
            soundEffects.playMessageReceived();
          }
        }
      } catch (err) {
        console.warn('Failed to check for app updates:', err);
      }
    };

    // Delay the check slightly so it doesn't block initial boot rendering
    const timer = setTimeout(checkVersion, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Helper to compare semver (e.g. 1.0.5 vs 1.0.4)
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

  const handleDownloadUpdate = () => {
    if (!updateInfo) return;
    soundEffects.playSuccessTone();
    setIsDownloading(true);
    
    // Directing the browser to the APK URL will trigger Android's download manager
    window.location.href = updateInfo.downloadUrl;
    
    // Revert state after a few seconds so user can try again if they backed out
    setTimeout(() => setIsDownloading(false), 5000);
  };

  if (!isVisible || !updateInfo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-sm bg-gradient-to-b from-[#090d22] to-[#040614] border-2 border-indigo-500/30 rounded-3xl shadow-2xl shadow-indigo-900/40 overflow-hidden flex flex-col"
      >
        {/* Header Graphic */}
        <div className="bg-indigo-600/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d22] to-transparent opacity-80" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"
          />
          <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-2xl shadow-lg flex items-center justify-center mb-4 transform -rotate-6">
            <Zap className="w-8 h-8 text-white fill-white/20" />
          </div>
          <h2 className="relative z-10 text-xl font-black text-white tracking-tight">Major Update Available</h2>
          <p className="relative z-10 text-indigo-200 text-sm font-medium mt-1">
            Version {updateInfo.version} is ready!
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200 font-semibold mb-1">What's New</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {updateInfo.releaseNotes || 'Performance improvements and new features to enhance your AURA experience.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-[11px] text-amber-200/90 leading-tight">
              To install, tap Download, wait for the notification, then tap "Update" when prompted by your device.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownloadUpdate}
              disabled={isDownloading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:scale-100"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Downloading APK...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download & Install Update</span>
                </>
              )}
            </button>
            
            {!updateInfo.forceUpdate && (
              <button
                onClick={() => setIsVisible(false)}
                className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Skip for now
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
