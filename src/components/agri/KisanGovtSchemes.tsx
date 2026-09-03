import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  PhoneCall, 
  FileText, 
  Award, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Info,
  DollarSign,
  Search,
  Zap
} from 'lucide-react';
import { Language } from '../../types';
import { KISAN_GOVT_SCHEMES_LIST, KisanGovtSchemeItem } from '../../data/kisanData';

interface KisanGovtSchemesProps {
  lang: Language;
}

export const KisanGovtSchemes: React.FC<KisanGovtSchemesProps> = ({ lang }) => {
  const [selectedScheme, setSelectedScheme] = useState<KisanGovtSchemeItem>(KISAN_GOVT_SCHEMES_LIST[0]);
  const [searchScheme, setSearchScheme] = useState<string>('');

  const filteredSchemes = KISAN_GOVT_SCHEMES_LIST.filter(s => {
    const q = searchScheme.toLowerCase();
    return !searchScheme || 
      s.name.hi.toLowerCase().includes(q) || 
      s.name.en.toLowerCase().includes(q) || 
      s.name.hinglish.toLowerCase().includes(q) ||
      s.badge.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C11] via-[#05291B] to-[#000000] border-2 border-emerald-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>केन्द्र एवं राज्य सरकार की कृषि योजनाएं व 60-90% सब्सिडी पोर्टल</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
              सरकारी योजनाएं, अनुदान व आसान आवेदन गाइड
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              पीएम कुसुम सोलर पंप, 80% ड्रिप सिंचाई सब्सिडी, पीएम किसान ₹6,000, ट्रैक्टर-ड्रोन यंत्रीकरण सब्सिडी और 4% ब्याज पर KCC लोन — पात्रता, जरूरी दस्तावेज व स्टेप-बाय-स्टेप ऑनलाइन फॉर्म भरने की विधि।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-center shrink-0">
            <span className="text-xs text-emerald-300 font-bold block">सक्रिय योजनाएं</span>
            <span className="text-3xl font-black text-white">{KISAN_GOVT_SCHEMES_LIST.length}</span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">100% वेरिफाइड डायरेक्ट पोर्टल</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5.5" />
          <input
            type="text"
            value={searchScheme}
            onChange={(e) => setSearchScheme(e.target.value)}
            placeholder="योजना खोजें (जैसे: सोलर पंप, ड्रिप सिंचाई, ट्रैक्टर सब्सिडी, पीएम किसान, केसीसी लोन)..."
            className="w-full bg-[#010D08] border border-emerald-500/40 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 shadow-inner"
          />
        </div>
      </div>

      {/* Main Grid: Schemes List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Scheme Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>उपलब्ध सरकारी योजनाएं ({filteredSchemes.length})</span>
            <span className="text-emerald-400">योजना चुनें ➔</span>
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedScheme.id === scheme.id
                    ? 'bg-gradient-to-r from-emerald-950 via-[#042416] to-[#02130B] border-emerald-400 shadow-xl ring-2 ring-emerald-400/30'
                    : 'bg-[#02110A] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#031A10]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{scheme.icon}</span>
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-400/30">
                        {scheme.subsidyRange}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white mt-1">
                        {scheme.name.hi}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {scheme.tagline.hi}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-500/15 text-[11px]">
                  <span className="text-emerald-400 font-bold">{scheme.badge}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    विवरण देखें <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Scheme Guide & Steps */}
        <div className="lg:col-span-7 space-y-6">
          {selectedScheme && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/50 shadow-2xl space-y-6">
              
              {/* Header Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#032014] to-[#010D08] border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 font-black text-xs">
                    {selectedScheme.subsidyRange}
                  </span>
                  <span className="text-xs text-slate-400">{selectedScheme.dept}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>{selectedScheme.icon}</span>
                  <span>{selectedScheme.name.hi}</span>
                </h3>
                <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                  {selectedScheme.tagline.hi}
                </p>
              </div>

              {/* Financial Benefit Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>वित्तीय लाभ व सब्सिडी का स्वरूप (Financial Benefit):</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedScheme.financialBenefit.hi}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>पात्रता की शर्तें (Eligibility Criteria):</span>
                </h4>
                <div className="space-y-1.5 mt-1">
                  {selectedScheme.eligibility.map((el, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>आवश्यक दस्तावेज (Required Documents):</span>
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedScheme.documentsRequired.map((doc, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-[#031A10] border border-emerald-500/20 text-xs text-slate-200 font-semibold flex items-center gap-1.5">
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Online Application Process */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>ऑनलाइन आवेदन करने की आसान प्रक्रिया (Step-by-Step Application):</span>
                </h4>
                <div className="space-y-2">
                  {selectedScheme.howToApplySteps.map((step, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#041D12] border border-emerald-500/20 text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Portal Link & Helpline Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#042416] to-black border border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-400 block">सहायता के लिए हेल्पलाइन:</span>
                  <span className="text-base font-black text-amber-300">{selectedScheme.helpline}</span>
                </div>

                <a
                  href={selectedScheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>आधिकारिक पोर्टल खोलें</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
