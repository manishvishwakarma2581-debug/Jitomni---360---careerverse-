import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    if (sessionStorage.getItem('jitomni_pwa_banner_dismissed')) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Fallback: If on mobile device and not in standalone mode, show banner after 4 seconds
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (!isStandalone) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // Manual instruction fallback for iOS / browsers without beforeinstallprompt
      alert(
        'ऐप इंस्टॉल करने के लिए अपने ब्राउज़र के मेनू (Three Dots ⋮ या Share बटन) पर क्लिक करें और "Add to Home Screen" या "ऐप इंस्टॉल करें" चुनें!'
      );
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('jitomni_pwa_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#030914] via-[#091529] to-[#030914] border-2 border-[#FFD700] shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-[#FFD700] border border-amber-500/40 flex-shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">
                JITOMNI 360° Android ऐप इंस्टॉल करें
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500 text-slate-950">
                PWA / PLAY STORE
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              फुल स्क्रीन, ऑफलाइन सपोर्ट और फास्ट लोडिंग स्पीड के साथ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-black font-black text-xs hover:scale-105 transition-all shadow-md shadow-amber-500/30 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>इंस्टॉल करें</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
