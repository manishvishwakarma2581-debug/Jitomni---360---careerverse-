import React, { useState } from 'react';
import { UserPersona, Language, MainTab } from '../types';
import { USER_PERSONAS, getPersonaShareUrl } from '../data/userPersonas';
import { X, Copy, Check, Share2, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

interface ShareWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentPersona: UserPersona;
  activeTab: MainTab;
}

export const ShareWorkspaceModal: React.FC<ShareWorkspaceModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentPersona,
  activeTab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleWhatsAppShare = (title: string, url: string) => {
    const text = encodeURIComponent(`*${title}* on JITOMNI 360° (Padhai Se Kamai Tak):\n\n${url}\n\n100% Verified & Distraction-Free Access!`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#07132B] border-2 border-[#00D4FF]/50 rounded-3xl shadow-2xl shadow-black overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Glow Bar */}
        <div className="h-2.5 bg-gradient-to-r from-[#00D4FF] via-[#FFD700] to-[#00D4FF] shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800 flex items-start justify-between bg-gradient-to-b from-[#0B2144] to-transparent shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-black tracking-wider bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 flex items-center gap-1">
                <Share2 className="w-3 h-3 text-[#00D4FF]" />
                स्मार्ट रोल-बेस्ड शेयरिंग लिंक
              </span>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> जीरो डिस्ट्रैक्शन
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>ज़रूरत के अनुसार सटीक लिंक शेयर करें</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              जब आप नीचे दिया गया लिंक किसी छात्र, कंपनी या किसान को भेजेंगे, तो उनके सामने केवल उनके काम के मॉड्यूल्स ही खुलेंगे—कोई अनावश्यक भ्रम या भटकाव नहीं होगा।
            </p>
          </div>

          <button
            id="close-share-modal-btn"
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 grow">
          {USER_PERSONAS.map((p) => {
            const shareUrl = getPersonaShareUrl(p.id);
            const isCopied = copiedId === p.id;
            const isCurrent = currentPersona === p.id;

            return (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#0E254C] border-[#FFD700]/60 ring-1 ring-[#FFD700]/30 shadow-md'
                    : 'bg-[#071733]/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#030B1E] border border-slate-700 flex items-center justify-center text-xl shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-white">
                          {p.name[lang]}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FFD700] text-slate-950">
                            वर्तमान मोड
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">
                        {p.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppShare(p.name[lang], shareUrl)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="WhatsApp पर शेयर करें"
                    >
                      <span>💬 WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(p.id, shareUrl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        isCopied
                          ? 'bg-emerald-400 text-slate-950 font-black'
                          : 'bg-[#FFD700] hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>कॉपी हो गया!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>लिंक कॉपी करें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Readonly URL Display */}
                <div className="bg-[#030B1E] px-3 py-2 rounded-xl border border-slate-800 font-mono text-xs text-[#00D4FF] truncate flex items-center justify-between">
                  <span className="truncate">{shareUrl}</span>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white shrink-0 ml-2"
                    title="नए टैब में खोलकर टेस्ट करें"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#061224] flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400">
            💡 टिप: किसी भी लिंक में <code className="text-[#FFD700]">&role=student</code> या <code className="text-[#FFD700]">&role=company</code> जोड़कर सीधे वही मोड खोला जा सकता है।
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-black bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
