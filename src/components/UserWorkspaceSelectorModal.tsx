import React, { useState } from 'react';
import { UserPersona, Language, MainTab } from '../types';
import { USER_PERSONAS, PersonaConfig, getPersonaConfig } from '../data/userPersonas';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookOpen, Building2, Briefcase, Shovel, Share2 } from 'lucide-react';

interface UserWorkspaceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: UserPersona;
  onSelectPersona: (persona: UserPersona, targetTab?: MainTab) => void;
  lang: Language;
  onOpenShareModal?: () => void;
}

export const UserWorkspaceSelectorModal: React.FC<UserWorkspaceSelectorModalProps> = ({
  isOpen,
  onClose,
  currentPersona,
  onSelectPersona,
  lang,
  onOpenShareModal,
}) => {
  const [selected, setSelected] = useState<UserPersona>(currentPersona);
  const [rememberChoice, setRememberChoice] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleApply = () => {
    if (rememberChoice) {
      localStorage.setItem('jitomni_user_persona', selected);
    }
    const config = getPersonaConfig(selected);
    onSelectPersona(selected, config.defaultTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-[#07132B] border-2 border-[#FFD700]/50 rounded-3xl shadow-2xl shadow-black overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Top Gold Gradient Bar */}
        <div className="h-2.5 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 flex items-start justify-between bg-gradient-to-b from-[#0C1E3D] to-transparent shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-black tracking-wider bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                100% डिमांड-आधारित पर्सनलाइज्ड वर्कस्पेस
              </span>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> जीरो डिस्ट्रैक्शन गारंटी
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>आप JITOMNI का उपयोग किस उद्देश्य से करना चाहते हैं?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              अपनी जरूरत का कार्यक्षेत्र चुनें। आपके लिए <strong className="text-[#FFD700]">केवल वही मॉड्यूल्स</strong> खुलेंगे जिनकी आपको आवश्यकता है, ताकि छात्रों की पढ़ाई में कोई व्यवधान न हो और कंपनियों को सीधे वेरिफाइड टैलेंट मिले।
            </p>
          </div>

          <button
            id="close-workspace-selector-btn"
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Personas Grid - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {USER_PERSONAS.map((p) => {
              const isSelected = selected === p.id;
              return (
                <div
                  key={p.id}
                  id={`persona-card-${p.id}`}
                  onClick={() => setSelected(p.id)}
                  className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#102752] to-[#081733] border-[#FFD700] shadow-xl shadow-[#FFD700]/15 ring-2 ring-[#FFD700]/30 scale-[1.01]'
                      : 'bg-[#091833]/60 border-slate-800 hover:border-slate-600 hover:bg-[#0C2044]'
                  }`}
                >
                  {/* Top Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#040C1A] border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                        {p.icon}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-[#FFD700] text-slate-950 border-[#FFD700]'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700'
                        }`}>
                          {p.badge[lang]}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#FFD700] shrink-0" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white mb-1">
                      {p.name[lang]}
                    </h3>
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                      {p.subtitle[lang]}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="space-y-1.5 mb-3 bg-[#030B1E]/60 p-2.5 rounded-xl border border-slate-800/80">
                      {p.highlights[lang].slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-snug">
                          <span className="text-[#00D4FF] font-black">✦</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Tagline */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium line-clamp-1 italic">
                      {p.tagline[lang]}
                    </span>
                    <span className={`font-bold ml-1 shrink-0 ${isSelected ? 'text-[#FFD700]' : 'text-slate-400'}`}>
                      {isSelected ? '✓ चयनित' : 'चुनें ➔'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#061224] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#FFD700] focus:ring-[#FFD700] accent-amber-400 cursor-pointer"
              />
              <span>इस डिवाइस पर मेरी पसंद याद रखें (Auto-Login with this workspace)</span>
            </label>

            {onOpenShareModal && (
              <button
                type="button"
                onClick={onOpenShareModal}
                className="text-xs font-bold text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>दोस्तों या कंपनियों के साथ डायरेक्ट रोल-लिंक शेयर करें</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              रद्द करें
            </button>

            <button
              id="confirm-workspace-persona-btn"
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-[#FFD700] to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span>यह वर्कस्पेस खोलें</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
