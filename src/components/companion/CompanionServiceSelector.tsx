import React from 'react';
import { ShieldCheck, ArrowRight, Clock, Star, Users, CheckCircle2, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { CompanionCategoryType, CompanionServiceCategory, Language } from '../../types';
import { companionCategories } from '../../data/companionData';

interface CompanionServiceSelectorProps {
  selectedCategory: CompanionCategoryType;
  onSelectCategory: (cat: CompanionCategoryType, subServiceId?: string) => void;
  onQuickBook: (cat: CompanionCategoryType) => void;
  lang: Language;
}

export const CompanionServiceSelector: React.FC<CompanionServiceSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  onQuickBook,
  lang,
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06142E] via-[#040B1A] to-black border-2 border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-black border border-[#FFD700]/50 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              BUILDINDIA • PADHAI SE KAMAI TAK
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Police Verified Companions
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
            {lang === 'hi' ? (
              <>
                जिटोम्नी 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">ऑन-डिमांड साथी</span> एवं टास्क सेवा
              </>
            ) : (
              <>
                Jitomni 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">On-Demand Companion</span> & Task Service
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {lang === 'hi'
              ? 'अस्पताल में परिजन के साथ रुकने, शादी-इवेंट में व्यवस्था संभालने, बुजुर्गों को बैंक-पार्क ले जाने या रोजमर्रा के कामों हेतु तुरंत बुलाएं प्रमाणित युवा साथी। प्रति घंटा आधार पर पारदर्शी मूल्य, लाइव जीपीएस ट्रैकिंग व 24/7 इमरजेंसी एसओएस सुरक्षा।'
              : 'Compassionate, 100% police-verified companions for hospital bedside support, wedding coordination, elderly assistance & daily errands. Transparent hourly pricing, live GPS telemetry & 24/7 sovereign SOS protection.'}
          </p>

          {/* Key Trust Pillars */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <div>
                <div className="font-bold text-white">CID & Police Verified</div>
                <div className="text-[10px] text-slate-400">Zero Criminal Record</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <div>
                <div className="font-bold text-white">Hourly Basis (₹/hr)</div>
                <div className="text-[10px] text-slate-400">No Long-term Contract</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">📍</span>
              <div>
                <div className="font-bold text-white">Live GPS Tracking</div>
                <div className="text-[10px] text-slate-400">Real-time Telemetry</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">🚨</span>
              <div>
                <div className="font-bold text-white">1-Tap SOS Safety</div>
                <div className="text-[10px] text-slate-400">Police 112 & ₹2L Cover</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
            <span>पांच प्रमुख सेवा श्रेणियां</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-mono font-bold">
              5 Distinct Service Verticals (कार व बाइक राइड सहित)
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'hi'
              ? 'अपनी आवश्यकता अनुसार श्रेणी चुनें — अस्पताल देखभाल, शादी इवेंट, बुजुर्ग सहायता, दैनिक कार्य या कार व बाइक यात्रा'
              : 'Choose the relevant service vertical below to configure requirements & match companions'}
          </p>
        </div>
      </div>

      {/* 4 Main Service Cards with Distinct Visual Anchors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companionCategories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <div
              key={category.id}
              id={`service-card-${category.id}`}
              className={`group relative rounded-3xl p-6 transition-all duration-300 border-2 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? `bg-gradient-to-br ${category.themeColor.bgGlow} ${category.themeColor.border} shadow-[0_0_35px_rgba(255,215,0,0.15)] ring-2 ring-[#FFD700]/40 scale-[1.01]`
                  : `bg-[#07132B]/80 hover:bg-[#0A1A38] border-slate-700/60 ${category.themeColor.border}`
              }`}
            >
              {/* Category Anchor Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase border ${category.themeColor.badge}`}>
                  {category.visualAnchorBadge}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs">
                  <span className="text-slate-400">Starting</span>
                  <span className="font-bold text-[#FFD700]">₹{category.baseHourlyRate}</span>
                  <span className="text-[10px] text-slate-400">/hr</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl p-2.5 rounded-2xl bg-black/40 border border-white/10">
                    {category.icon}
                  </span>
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-[#FFD700] transition-colors">
                      {category.title[lang] || category.title.hi}
                    </h4>
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Police & Aadhaar Verified Crew
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                  {category.tagline[lang] || category.tagline.hi}
                </p>

                {/* Sub-services Breakdown Pills */}
                <div className="mt-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'hi' ? 'शामिल मुख्य कार्य (Sub-Services):' : 'Key Included Tasks:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.subServices.map((sub) => (
                      <div
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCategory(category.id, sub.id);
                        }}
                        className="p-2.5 rounded-xl bg-black/40 hover:bg-black/80 border border-white/5 hover:border-[#FFD700]/40 transition-all cursor-pointer flex items-start gap-2 text-left"
                      >
                        <span className="text-sm mt-0.5">{sub.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-200 truncate">
                            {sub.name[lang] || sub.name.hi}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5 text-amber-400" />
                            <span>Recommended: ~{sub.recommendedHours} hrs</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Requirement Samples */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    {lang === 'hi' ? 'त्वरित आवश्यकताएं (Quick Prompts):' : 'Common Requirement Prompts:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.quickRequirements.slice(0, 3).map((req, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5"
                      >
                        "{req}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  id={`select-cat-btn-${category.id}`}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    isSelected
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-[#0A1A38] text-slate-200 hover:text-white border-slate-600 hover:border-slate-400'
                  }`}
                >
                  <span>{isSelected ? '✓ चयनित श्रेणी' : 'विवरण देखें'}</span>
                </button>

                <button
                  id={`book-now-btn-${category.id}`}
                  onClick={() => onQuickBook(category.id)}
                  className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 text-white bg-gradient-to-r ${category.themeColor.gradient} hover:brightness-110 shadow-lg`}
                >
                  <span>{lang === 'hi' ? 'बुक करें' : 'Book Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
