import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Smartphone,
  Download,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { soundEffects } from '../../services/audio';

export const ANDROID_APK_DOWNLOAD_URL = 'https://webcraftstudio.cloud/aura.apk';

interface AndroidApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidApkModal: React.FC<AndroidApkModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasStartedDownload, setHasStartedDownload] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ANDROID_APK_DOWNLOAD_URL);
      setCopiedLink(true);
      soundEffects.playTap();
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadClick = () => {
    soundEffects.playTap();
    setHasStartedDownload(true);
    // Direct browser navigation to download APK file
    const link = document.createElement('a');
    link.href = ANDROID_APK_DOWNLOAD_URL;
    link.setAttribute('download', 'aura.apk');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="android-apk-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-fade-in select-none overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#090d22]/95 border border-emerald-500/30 rounded-[32px] shadow-2xl shadow-emerald-950/40 overflow-hidden flex flex-col max-h-[92vh] text-white my-auto"
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-950/40 via-black/40 to-black/40 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">Android Direct APK Install</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Android APK
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Direct install package for all Android devices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 min-h-0 text-slate-200">
          {/* APK Package Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/40 via-black/40 to-slate-900/60 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <Download className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>aura.apk</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-300">Native Android Application Package</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[220px] sm:max-w-xs">
                  {ANDROID_APK_DOWNLOAD_URL}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy direct download link"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1 shrink-0 transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[10px] hidden sm:inline">{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* CRITICAL NOTICE: Unsafe / Unknown Source Explanation */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>Notice: &ldquo;Install from Unsafe / Unknown Source&rdquo;</span>
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              Because you are downloading <strong>aura.apk</strong> directly from our private cloud server rather than the Google Play Store, Android will display standard security prompts warning that the file <strong className="text-white">&ldquo;might be harmful&rdquo;</strong> or is from an <strong className="text-white">&ldquo;unknown source&rdquo;</strong>.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>This APK is clean, verified, and safe to install on your device.</span>
            </div>
          </div>

          {/* Step-by-Step Installation Instructions */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>How to Complete the Install (3 Simple Steps):</span>
            </h5>

            <ol className="space-y-2.5 text-xs">
              {/* Step 1 */}
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  1
                </span>
                <div className="flex-1 space-y-0.5">
                  <div className="font-bold text-white">Tap &ldquo;Download anyway&rdquo;</div>
                  <p className="text-[11px] text-slate-300">
                    When Chrome or Samsung Internet asks <em className="text-amber-300">&ldquo;File might be harmful. Do you want to download aura.apk anyway?&rdquo;</em>, tap <strong className="text-emerald-300">&ldquo;Download anyway&rdquo;</strong> or <strong className="text-emerald-300">&ldquo;Keep&rdquo;</strong>.
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  2
                </span>
                <div className="flex-1 space-y-0.5">
                  <div className="font-bold text-white">Enable &ldquo;Allow from this source&rdquo; (If prompted)</div>
                  <p className="text-[11px] text-slate-300">
                    Open the downloaded file. If your phone says <em className="text-amber-300">&ldquo;For your security, your phone is not allowed to install unknown apps from this source&rdquo;</em>, tap <strong className="text-amber-300">&ldquo;Settings&rdquo;</strong> and toggle switch <strong className="text-emerald-300">&ldquo;Allow from this source&rdquo;</strong> to ON.
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  3
                </span>
                <div className="flex-1 space-y-0.5">
                  <div className="font-bold text-white">Tap &ldquo;Install&rdquo; & Launch</div>
                  <p className="text-[11px] text-slate-300">
                    Tap <strong className="text-emerald-300">&ldquo;Install&rdquo;</strong>. If Google Play Protect shows a prompt, select <strong className="text-white">&ldquo;Install anyway&rdquo;</strong> or <strong className="text-white">&ldquo;More details &gt; Install anyway&rdquo;</strong>. Once finished, tap <strong className="text-emerald-300">&ldquo;Open&rdquo;</strong> to enjoy Aura!
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Main Action Download Button */}
          <div className="pt-2 space-y-2">
            <button
              id="proceed-download-apk-button"
              type="button"
              onClick={handleDownloadClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 border border-emerald-400/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Proceed & Download APK (aura.apk)</span>
            </button>

            {hasStartedDownload && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2 text-xs text-emerald-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Download started! Check your phone notification bar or Downloads folder to tap and install <strong>aura.apk</strong>.</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Direct Link: <a href={ANDROID_APK_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">webcraftstudio.cloud/aura.apk</a></span>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-white underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
