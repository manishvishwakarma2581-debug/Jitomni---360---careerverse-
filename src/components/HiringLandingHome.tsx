import React from 'react';
import { Building2, GraduationCap, HardHat, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, FileCheck, Phone, Zap, Award, Users, Search, Target, Clock, Star, MapPin } from 'lucide-react';
import { AppRole, Language } from '../types';

interface HiringLandingHomeProps {
  onSelectRole: (role: AppRole) => void;
  lang: Language;
}

export const HiringLandingHome: React.FC<HiringLandingHomeProps> = ({
  onSelectRole,
  lang,
}) => {
  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* HERO SECTION WITH 2 MEGA ACTION BUTTONS */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B1E48] via-[#05112B] to-[#030B1E] border border-blue-500/30 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Background glow graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-bold shadow-inner">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% VERIFIED HIRING • FAKE PROFILES KHATAM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            JITOMNI <span className="text-amber-400">VERIFIED JOBS</span>
            <span className="block text-xl sm:text-2xl lg:text-3xl text-slate-300 font-semibold mt-2">
              बिना टेस्ट पास किए कोई फेक कैंडिडेट नहीं • सिर्फ असली टैलेंट व असली काम
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            कंपनियों को मिलते हैं सिर्फ वही कैंडिडेट्स जिन्होंने 10 MCQ टेस्ट में <strong className="text-emerald-400">60%+ स्कोर</strong> किया हो। और मजदूरों को मिलता है <strong className="text-amber-400">5km के अंदर 1-क्लिक में डायरेक्ट काम</strong>।
          </p>

          {/* ================= 2 BADE BUTTONS (HOME PAGE CHANGE) ================= */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Button 1: Company */}
            <button
              id="hero-company-btn"
              onClick={() => onSelectRole('company')}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-500 hover:to-indigo-700 text-white border-2 border-blue-400/50 shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1 text-left flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wide">
                  GST Verified
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-200 transition-colors flex items-center gap-2">
                  <span>🏢 कंपनी है?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-sm font-bold text-blue-200 mt-1">
                  वैकेंसी निकालो & टेस्ट बनाओ
                </p>
                <p className="text-xs text-blue-100/80 mt-2">
                  AI से 10 MCQ टेस्ट जनरेट करें, सिर्फ टेस्ट पास वेरिफाइड प्रोफाइल्स सीधे डैशबोर्ड पर पाएं।
                </p>
              </div>
            </button>

            {/* Button 2: Job Seeker */}
            <button
              id="hero-jobseeker-btn"
              onClick={() => onSelectRole('skilled')}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 border-2 border-amber-300 shadow-xl shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1 text-left flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-950/15 backdrop-blur-md flex items-center justify-center text-slate-950 border border-slate-950/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-950 text-amber-300 uppercase tracking-wide">
                  Instant Hiring
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                  <span>💼 नौकरी चाहिए?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-950" />
                </h3>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  वेरिफाई करके सीधे नौकरी पाओ
                </p>
                <p className="text-xs text-slate-900/90 mt-2">
                  Excel/Tally/Coding का 10 MCQ टेस्ट दें → 60%+ आते ही प्रोफाइल ऑटो-पुश होगी।
                </p>
              </div>
            </button>
          </div>

          {/* Third direct banner for Labour / Blue Collar */}
          <div className="pt-2">
            <button
              id="hero-labour-btn"
              onClick={() => onSelectRole('labour')}
              className="w-full max-w-3xl mx-auto p-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/50 text-white flex items-center justify-between gap-4 transition-all group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-emerald-300">
                      👷 मिस्त्री, मजदूर, ड्राइवर, हेल्पर व फैक्ट्री काम?
                    </span>
                    <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950">
                      नो टेस्ट • डायरेक्ट कॉल
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    आपके 5km के अंदर तुरंत काम पाएं और सीधे ठेकेदार को कॉल लगाएं
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform">
                <span>लेबर जॉब्स</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS EXPLAINED */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">3-Way Trust Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            यह सामान्य जॉब पोर्टल नहीं है — यह है <span className="text-amber-400">100% वेरिफाइड हायरिंग</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            फेक बायोडाटा और फर्जी इंटरव्यू कॉल का झंझट हमेशा के लिए खत्म
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Company */}
          <div className="p-6 rounded-2xl bg-[#071536] border border-blue-500/30 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-400">ROLE 1</span>
              <h3 className="text-lg font-bold text-white mt-0.5">कंपनी डैशबोर्ड (/company)</h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>GST वेरिफाइड प्रोफाइल</strong> से फ्रॉड कंपनियों का अंत</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AI ऑटो टेस्ट मेकर</strong>: 1-क्लिक में 10 MCQ टेस्ट तैयार</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ऑटो-मैच्ड टैलेंट</strong>: सिर्फ 60%+ टेस्ट पास कैंडिडेट्स की लिस्ट</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectRole('company')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>कंपनी पोर्टल पर जाएं</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Skilled Job Seeker */}
          <div className="p-6 rounded-2xl bg-[#1C1405] border border-amber-500/30 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-400">ROLE 2</span>
              <h3 className="text-lg font-bold text-white mt-0.5">स्किल्ड जॉब सीकर (/jobs)</h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>10 MCQ स्किल टेस्ट</strong> (Excel, Tally, Python आदि)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>ऑटो पुश</strong>: 60%+ स्कोर आते ही प्रोफाइल कंपनी के पास</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>फेक प्रोफाइल बैन</strong>: बिना टेस्ट पास किए कोई अप्लाई नहीं</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectRole('skilled')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>स्किल्ड जॉब्स देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Labour / Blue Collar */}
          <div className="p-6 rounded-2xl bg-[#041A12] border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <HardHat className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400">ROLE 3</span>
              <h3 className="text-lg font-bold text-white mt-0.5">लेबर / कारीगर (/labour-jobs)</h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>बड़ी फोटो, कम लिखाई</strong>: आसान और साफ डिजाइन</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>5km रेडियस ऑटो डिटेक्ट</strong>: पास के काम तुरंत देखें</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-क्लिक अप्लाई & डायरेक्ट कॉल</strong>: नाम और मोबाइल बस</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectRole('labour')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>लेबर जॉब्स खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* High-Profile AI Video Interview Assessor Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0D244D] to-[#07132B] border border-amber-400/60 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>न्यू फीचर: हाई-प्रोफाइल AI वीडियो इंटरव्यू</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                👑 सीनियर व हाई-प्रोफाइल पदों के लिए AI वीडियो इंटरव्यू वेरिफिकेशन
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                फ्रंट कैमरा व माइक से लाइव हाव-भाव (Facial Expressions), बॉडी लैंग्वेज, आई-कॉन्टैक्ट, संवाद शैली और संकट में निर्णय क्षमता (Crisis Management) का 360° विश्लेषण। साथ ही कमियों को निखारने के लिए <strong className="text-amber-300">तुरंत प्रैक्टिकल ड्रिल्स सैंडबॉक्स</strong>।
              </p>
            </div>

            <button
              onClick={() => onSelectRole('skilled')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center gap-2 whitespace-nowrap transition-all"
            >
              <span>🎥 AI वीडियो इंटरव्यू रूम देखें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* AUTO-MATCHING ENGINE SHOWCASE */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#07132B] to-slate-900 border border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                ऑटो-मैचिंग इंजन (How Auto-Matching Works)
              </h3>
              <p className="text-xs text-slate-400">
                कैंडिडेट को पता भी नहीं चलेगा, टेस्ट पास करते ही उसका प्रोफाइल कंपनी को पहुँच जाएगा!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm mx-auto flex items-center justify-center mb-2">1</div>
              <p className="font-bold text-xs text-white">कंपनी वैकेंसी निकालती है</p>
              <p className="text-[11px] text-slate-400 mt-1">कौशल तय करती है (ex: Excel)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm mx-auto flex items-center justify-center mb-2">2</div>
              <p className="font-bold text-xs text-white">कैंडिडेट टेस्ट देता है</p>
              <p className="text-[11px] text-slate-400 mt-1">10 MCQ प्रैक्टिकल सवाल</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm mx-auto flex items-center justify-center mb-2">3</div>
              <p className="font-bold text-xs text-white">60%+ स्कोर = टेस्ट पास</p>
              <p className="text-[11px] text-slate-400 mt-1">वेरिफाइड बैच सक्रिय</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm mx-auto flex items-center justify-center mb-2">4</div>
              <p className="font-bold text-xs text-white">ऑटो-पुश टू कंपनी</p>
              <p className="text-[11px] text-slate-400 mt-1">HR से डायरेक्ट कॉल / चैट</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
