import React from 'react';
import { BookOpen, Award, Mic, BrainCircuit, ArrowRight, Sparkles, FileText, CheckCircle2, ShieldCheck, HelpCircle, HeartHandshake, Briefcase, Globe2, Building2, GraduationCap, HardHat, Flag, Cpu, Video, Sprout } from 'lucide-react';
import { Language, MainTab, TopicItem } from '../types';
import { translations } from '../data/translations';
import { schoolCurriculumData, competitiveCurriculumData } from '../data/curriculumData';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';

interface HomeDashboardProps {
  lang: Language;
  onNavigateTab: (tab: MainTab) => void;
  onSelectTopic: (topic: TopicItem) => void;
  onOpenAboutUs?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  lang,
  onNavigateTab,
  onSelectTopic,
  onOpenAboutUs,
}) => {
  const modules = [
    {
      id: 'agri' as MainTab,
      badge: 'ICAR • Singapore • China Tech',
      title: lang === 'hi' ? '🌾 कृषि 360° एवं एडवांस्ड फार्मिंग' : '🌾 Agriculture 360° & Global Tech',
      desc: lang === 'hi' ? 'B.Sc/M.Sc ICAR 6D पाठ्यक्रम, AI फसल डॉक्टर (रोग पहचान), सिंगापुर स्काई ग्रीन्स वर्टिकल फार्मिंग व चीन बेइदोऊ रोबोटिक्स।' : 'Comprehensive ICAR degree curriculum, AI crop disease doctor, Singapore 30x30 vertical farming & China Beidou unmanned farm fleets.',
      icon: <Sprout className="w-8 h-8 text-emerald-400" />,
      color: 'from-emerald-950/80 via-[#061F14] to-[#020A07]',
      border: 'border-emerald-500/50 hover:border-emerald-400',
      tag: 'ICAR • NABARD • AI Crop Doctor',
      features: ['ICAR B.Sc / M.Sc 6D पाठ्यक्रम', 'सिंगापुर व चीन एडवांस्ड फार्मिंग', 'AI फसल डॉक्टर व NPK कैलकुलेटर'],
    },
    {
      id: 'verifiedjobs' as MainTab,
      badge: '100% No Fake Profiles',
      title: lang === 'hi' ? '🏢 जिटोम्नी वेरिफाइड जॉब्स' : '🏢 Jitomni Verified Jobs Platform',
      desc: lang === 'hi' ? 'कंपनियों के लिए GST वेरिफिकेशन व AI 10 MCQ टेस्ट, और कैंडिडेट्स के लिए टेस्ट पास वेरिफाइड डायरेक्ट नौकरी।' : 'Direct hiring platform with GST company verification, 10 MCQ skill verification engine, and 5km blue-collar job matching.',
      icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
      color: 'from-blue-950/80 via-[#0C1E3D] to-[#040C1A]',
      border: 'border-blue-500/50 hover:border-amber-400',
      tag: 'Company • Skilled Seeker • Labour',
      features: ['GST वेरिफाइड कंपनियां', '10 MCQ ऑटो स्किल टेस्ट (60%+ Pass)', 'लेबर/कारीगर 5km डायरेक्ट कॉल'],
    },
    {
      id: 'companion' as MainTab,
      badge: '100% Police Verified',
      title: lang === 'hi' ? '🤝 ऑन-डिमांड साथी एवं टास्क सेवा' : '🤝 On-Demand Companion & Task Service',
      desc: lang === 'hi' ? 'अस्पताल देखभाल, शादी-इवेंट व्यवस्था, बुजुर्गों का सहारा व रोजमर्रा के कार्यों हेतु घंटे के आधार पर प्रमाणित युवा साथी। लाइव जीपीएस ट्रैकिंग व एसओएस सुरक्षा।' : 'On-demand police-verified companions for hospital stay, wedding coordination, elderly assistance & daily errands with live GPS tracking and SOS safety.',
      icon: <HeartHandshake className="w-8 h-8 text-rose-400" />,
      color: 'from-rose-950/80 via-[#240813] to-[#0A0205]',
      border: 'border-rose-500/50 hover:border-rose-400',
      tag: 'Hospital • Wedding • Elderly • Errands',
      features: ['4 प्रमुख श्रेणियां (प्रति घंटा आधार)', 'लाइव जीपीएस लोकेशन ट्रैकिंग', '1-टैप इमरजेंसी एसओएस व पुलिस 112'],
    },
    {
      id: 'school' as MainTab,
      badge: 'कक्षा 1 से 12',
      title: translations.home.schoolCard.title[lang],
      desc: translations.home.schoolCard.desc[lang],
      icon: <BookOpen className="w-8 h-8 text-amber-400" />,
      color: 'from-blue-900/60 to-[#0A1931]',
      border: 'border-blue-500/40 hover:border-amber-400',
      tag: 'MP Board • CBSE • NCERT',
      features: ['कक्षा 1 से 12 चयन', '360° 6-डायमेंशन फ्रेमवर्क', 'PDF, Video, Quiz, Map'],
    },
    {
      id: 'exam' as MainTab,
      badge: 'UPSC • MPPSC • SSC',
      title: translations.home.examCard.title[lang],
      desc: translations.home.examCard.desc[lang],
      icon: <Award className="w-8 h-8 text-amber-400" />,
      color: 'from-amber-950/40 to-[#0A1931]',
      border: 'border-amber-500/40 hover:border-amber-400',
      tag: 'CBT Real Mock Tests',
      features: ['नेगेटिव मार्किंग व टाइमर', 'ऑल इंडिया रैंक अनुमान', 'स्कोरकार्ड PDF रिपोर्ट'],
    },
    {
      id: 'vacancies' as MainTab,
      badge: 'Real-Time Updates',
      title: lang === 'hi' ? '🔥 सरकारी नौकरी (लाइव वेकेंसी हब)' : '🔥 Live Sarkari Vacancies Hub',
      desc: lang === 'hi' ? 'SSC CGL, MP पुलिस, रेलवे, पटवारी और UPSC की सभी सक्रिय व आगामी भर्तियों के आधिकारिक नोटिफिकेशन, योग्यता व सिलेबस।' : 'Real-time tracking of central and state govt jobs, 1-click notification PDFs, and 360° syllabus mapping.',
      icon: <Briefcase className="w-8 h-8 text-cyan-400" />,
      color: 'from-cyan-950/60 via-[#0A1931] to-[#040C1A]',
      border: 'border-cyan-500/50 hover:border-cyan-400',
      tag: 'Daily 6 AM Auto-Sync',
      features: ['SSC, MP पुलिस, रेलवे, UPSC', 'ऑफिशियल नोटिफिकेशन PDF व लिंक', 'JITOMNI 360° तैयारी सिलेबस'],
    },
    {
      id: 'globaljobs' as MainTab,
      badge: '9.7 Crore+ Openings',
      title: lang === 'hi' ? '🌍 ग्लोबल AI जॉब्स (घर बैठे $$ कमाओ)' : '🌍 Global AI Remote & Freelance Hub',
      desc: lang === 'hi' ? 'Prompt Engineering, Data Entry, AI Video Editing और Freelancing से $20-$45/hr (₹1.5 - 8 लाख/महीना) कमाने का 7-दिन का संपूर्ण ब्लूप्रिंट।' : 'Worldwide work from home AI careers, live Upwork/LinkedIn feeds, and direct dollar bank payouts for all qualifications.',
      icon: <Globe2 className="w-8 h-8 text-emerald-400" />,
      color: 'from-emerald-950/60 via-[#071F18] to-[#020A07]',
      border: 'border-emerald-500/50 hover:border-emerald-400',
      tag: '10th to Graduate (No Code)',
      features: ['8 इन-डिमांड AI रोल्स ($25/hr+)', '7-Day Zero to Earning ब्लूप्रिंट', 'Upwork, Fiverr & Payoneer मास्टरक्लास'],
    },
    {
      id: 'english' as MainTab,
      badge: 'Voice AI Tutor',
      title: translations.home.englishCard.title[lang],
      desc: translations.home.englishCard.desc[lang],
      icon: <Mic className="w-8 h-8 text-amber-400" />,
      color: 'from-emerald-950/40 to-[#0A1931]',
      border: 'border-emerald-500/40 hover:border-amber-400',
      tag: '5 Custom Roles',
      features: ['बच्चों, छात्रों व इंटरव्यू के लिए', 'हिंग्लिश से फ्लूएंट इंग्लिश', 'रियल-लाइफ रोल प्ले'],
    },
    {
      id: 'doubt' as MainTab,
      badge: 'Photo & Voice Solver',
      title: lang === 'hi' ? '🎯 AI डाउट सॉल्वर (100% सटीक)' : '🎯 Instant AI Doubt Solver',
      desc: lang === 'hi' ? 'कक्षा 1-12 व प्रतियोगी परीक्षाओं के किसी भी कठिन सवाल की फोटो खींचें या बोलकर तुरंत 360° हल पाएं।' : 'Upload photo or speak your doubt to get step-by-step verified explanations and 10s tricks.',
      icon: <HelpCircle className="w-8 h-8 text-violet-400" />,
      color: 'from-violet-950/60 to-[#0A1931]',
      border: 'border-violet-500/40 hover:border-violet-400',
      tag: 'Step-by-Step 360° Solution',
      features: ['फोटो / वॉइस इनपुट सपोर्ट', '10-सेकंड शॉर्टकट ट्रिक', 'समान अभ्यास प्रश्न'],
    },
    {
      id: 'flashcards' as MainTab,
      badge: 'Spaced Repetition & Streaks',
      title: lang === 'hi' ? '⚡ स्मार्ट फ्लैशकार्ड्स & वीकनेस रडार' : '⚡ Smart Flashcards & Spaced Recall',
      desc: lang === 'hi' ? '5 मिनट में मास्टर फॉर्मूला और 10-सेकंड ट्रिक्स का त्वरित रिवीजन, XP रिवॉर्ड्स और स्ट्रीक ट्रैकिंग।' : 'Rapid active recall flashcards with gamified streak tracker and AI Personal Weakness Radar.',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      color: 'from-amber-950/60 to-[#0A1931]',
      border: 'border-amber-500/40 hover:border-amber-400',
      tag: '5-Min Pre-Exam Recall',
      features: ['फॉर्मूला व स्पीड ट्रिक्स फ्लिप', 'डेली स्टडी स्ट्रीक व XP', 'AI वीकनेस रडार रिपोर्ट'],
    },
    {
      id: 'prime' as MainTab,
      badge: 'Central AI Brain',
      title: translations.home.primeCard.title[lang],
      desc: translations.home.primeCard.desc[lang],
      icon: <BrainCircuit className="w-8 h-8 text-amber-400" />,
      color: 'from-purple-950/40 to-[#0A1931]',
      border: 'border-purple-500/40 hover:border-amber-400',
      tag: '6 Autonomous Agents',
      features: ['वॉइस या टेक्स्ट से कमांड दें', 'ऑटो PDF व क्विज जनरेटर', 'मल्टी-एजेंट कोआर्डिनेशन'],
    },
  ];

  const featuredTopics = [
    schoolCurriculumData[0], // Water Cycle
    competitiveCurriculumData[0], // Fundamental Rights
    schoolCurriculumData[1], // Photosynthesis
    competitiveCurriculumData[2], // Tribal Heritage of MP
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Sovereign Hero Section with Emblem Logo & SpaceX Mission Patch Style */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#000000] via-[#07132B] to-[#000000] border-2 border-[#FFD700]/50 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD700]/15 text-[#FFD700] font-bold text-xs border border-[#FFD700]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
              <span>BUILDINDIA • SOVEREIGN IDENTITY • 100% VERIFIED TALENT</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF] font-heading tracking-tight leading-tight">
                JITOMNI 360° CAREERVERSE
              </h1>
              <p className="text-sm sm:text-base font-bold text-[#00D4FF] mt-1">
                {translations.tagline[lang]}
              </p>
            </div>

            {/* OFFICIAL SUBTITLE */}
            <div className="p-3 rounded-2xl bg-[#030B1E]/90 border border-[#00D4FF]/30 text-xs sm:text-sm font-mono text-amber-200/90 shadow-inner">
              <strong className="text-[#FFD700]">jit+omni (all) = jitomni</strong> : <span className="text-[#00D4FF]">Jitendriy- Manish</span> (Sovereign Strategic Architect & Philosophical Nation-Builder: Rooting out systemic failure with 360° revolutionary solutions.)
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              We <strong>BUILDINDIA</strong>. This is not just an app, this is a Sovereign Strategy to solve India's biggest problem - <strong>Fake Profiles & Skills Gap</strong>. We believe in VERIFIED Talent, not Degrees. We empower from 10th pass labour to AI engineer with real skills and real jobs.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-verified-jobs-btn"
                onClick={() => onNavigateTab('verifiedjobs')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#F59E0B] to-[#FFD700] text-black font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-[#FFD700]/30 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>🏢 वेरिफाइड जॉब्स हब (No Fake)</span>
              </button>

              <button
                id="hero-ai-interview-btn"
                onClick={() => onNavigateTab('ai-interview')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-amber-300" />
                <span>🎥 AI वीडियो इंटरव्यू</span>
              </button>

              {onOpenAboutUs && (
                <button
                  id="hero-about-sovereign-btn"
                  onClick={onOpenAboutUs}
                  className="px-5 py-3 rounded-2xl bg-[#0A1931] hover:bg-[#102447] text-[#FFD700] font-bold text-xs sm:text-sm border border-[#FFD700]/40 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span>Sovereign Identity</span>
                </button>
              )}

              <button
                id="hero-start-school-btn"
                onClick={() => onNavigateTab('school')}
                className="px-4 py-3 rounded-2xl bg-[#07132B] hover:bg-[#0c1e3d] text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>स्कूल (1-12)</span>
              </button>
            </div>
          </div>

          {/* Golden Sovereign Eagle Mission Patch Emblem Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 border border-[#FFD700]/30 shadow-2xl relative group">
            <JitomniEmblemLogo size="2xl" showGlow={true} animate={true} interactive={true} onClick={onOpenAboutUs} />
            <span className="text-[10px] text-amber-300/80 font-mono mt-3 uppercase tracking-widest">
              Golden Sovereign Eagle • Mission Patch
            </span>
          </div>
        </div>

        {/* Decorative Golden Geometry */}
        <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* LEADERSHIP PHILOSOPHY - FOUNDER'S CODE (GOLDEN BORDER QUOTE BOX) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#000000] border-2 border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.2)] relative overflow-hidden">
        <div className="absolute -top-3.5 left-6 px-4 py-1 rounded-full bg-[#FFD700] text-black text-xs font-black tracking-wider uppercase shadow-md">
          LEADERSHIP PHILOSOPHY • FOUNDER'S CODE
        </div>

        <blockquote className="text-base sm:text-lg text-slate-100 font-serif italic leading-relaxed pt-2">
          "I suppose leadership at one time meant muscles; then it meant getting along with people; today in the age of AI, true leadership means <strong>EMPOWERING</strong> people to build their own future through Innovation & Accessibility. That's BUILDINDIA."
        </blockquote>

        <div className="mt-5 pt-3 border-t border-[#FFD700]/40 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-[#00D4FF] font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>Sovereign Strategy Matrix</span>
          </div>

          <div className="text-right">
            <div className="text-sm font-black text-[#FFD700] tracking-wide">
              - Jitomni : Jitendriy- Manish
            </div>
            <div className="text-xs text-[#00D4FF] font-mono font-bold">
              ( Sovereign Strategic Architect & Philosophical Nation-Builder )
            </div>
          </div>
        </div>
      </div>

      {/* SPECIAL HIGHLIGHT: JITOMNI 100% VERIFIED JOBS 3-ROLE DIRECT PORTAL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/90 via-[#0B1B36] to-[#040C1A] border-2 border-blue-500/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% VERIFIED HIRING • NO FAKE PROFILES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
              {lang === 'hi' ? '🏢 जिटोम्नी वेरिफाइड जॉब्स: आप कौन हैं?' : '🏢 Jitomni Verified Jobs: Who are you?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              फर्जी प्रोफाइल्स और स्कैम कॉल का परमानेंट अंत। कंपनियों के लिए GST वेरिफिकेशन व ऑटो MCQ टेस्ट, और कैंडिडेट्स के लिए डायरेक्ट जॉब मैचिंग।
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('verifiedjobs')}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 whitespace-nowrap"
          >
            <span>पूरा हायरिंग हब खोलें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Interactive Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Role 1: Company */}
          <div
            onClick={() => onNavigateTab('company')}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-[#071329] border border-blue-500/40 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Role 1: कंपनी
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                कंपनी (जॉब निकालने वाला)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                GST वेरिफिकेशन के साथ वैकेंसी निकालें। AI से ऑटो 10 MCQ टेस्ट बनाएं और सिर्फ टेस्ट पास योग्य उम्मीदवारों से चैट/कॉल करें।
              </p>
              <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> GST वेरिफिकेशन बैज</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI 10 MCQ टेस्ट जनरेटर</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 60%+ पास कैंडिडेट्स सूची</li>
              </ul>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-amber-300">
              <span>डैशबोर्ड खोलें (/company)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Role 2: Skilled Seeker */}
          <div
            onClick={() => onNavigateTab('skilled')}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-[#071329] border border-indigo-500/40 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Role 2: स्किल्ड सीकर
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                जॉब सीकर - स्किल्ड (पढ़ा-लिखा)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                डिग्री व आधार वेरिफिकेशन, 10 MCQ ऑनलाइन स्किल टेस्ट पास करें और वेरिफाइड स्कोर के साथ कंपनियों से डायरेक्ट ऑफर पाएं।
              </p>
              <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> डिग्री व आधार वेरिफाइड प्रोफाइल</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 10 MCQ टेस्ट (तुरंत स्कोरकार्ड)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> कंपनियों को ऑटो सेंड प्रोफाइल</li>
              </ul>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-amber-300">
              <span>नौकरियां देखें (/jobs)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Role 3: Labour & Blue Collar */}
          <div
            onClick={() => onNavigateTab('labour')}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-[#071329] border border-amber-500/40 hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
                  <HardHat className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Role 3: लेबर व कारीगर
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                जॉब सीकर - लेबर (कम पढ़ा-लिखा)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                मिस्त्री, मजदूर, ड्राइवर, फैक्ट्री वर्कर, डिलीवरी हेतु बड़े फोटो आइकॉन, 5km जीपीएस पास का काम और 1-क्लिक डायरेक्ट कॉल।
              </p>
              <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> विजुअल केटेगरी कार्ड्स (नो कॉम्प्लेक्सिटी)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5km रेडियस पास की नौकरियां</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ठेकेदार/मालिक को डायरेक्ट 1-क्लिक कॉल</li>
              </ul>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>काम देखें (/labour-jobs)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ALL MAIN MODULE CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">
            {translations.home.selectModule[lang]}
          </h2>
          <span className="text-xs text-amber-400 font-bold">Comprehensive 360° Learning & Career Portals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              id={`home-module-card-${mod.id}`}
              onClick={() => onNavigateTab(mod.id)}
              className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${mod.color} border ${mod.border} transition-all duration-200 cursor-pointer shadow-xl group flex flex-col justify-between space-y-5 hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-2xl bg-[#030B1E] border border-amber-500/30 shadow-md">
                    {mod.icon}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                    {mod.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors font-heading">
                  {mod.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {mod.desc}
                </p>

                {/* Features List */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                  {mod.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>{translations.home.exploreButton[lang]}</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360° Framework Dimensional Blueprint */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1931] border border-amber-500/30 shadow-xl space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-black text-xl text-white">
              The 360° Critical Analysis Framework
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            हर विषय को 6 अनिवार्य कोणों से समझना—यही है असली शिक्षा:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-[#071329] border border-amber-500/30 text-center space-y-1.5">
            <span className="text-2xl">🔍</span>
            <h4 className="text-xs font-bold text-amber-300">1. क्या (WHAT)</h4>
            <p className="text-[11px] text-slate-400">मूल परिभाषा व संकल्पना</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071329] border border-blue-500/30 text-center space-y-1.5">
            <span className="text-2xl">💡</span>
            <h4 className="text-xs font-bold text-blue-300">2. क्यों (WHY)</h4>
            <p className="text-[11px] text-slate-400">महत्व व आवश्यकता</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071329] border border-emerald-500/30 text-center space-y-1.5">
            <span className="text-2xl">⚙️</span>
            <h4 className="text-xs font-bold text-emerald-300">3. कैसे (HOW)</h4>
            <p className="text-[11px] text-slate-400">कार्यप्रणाली व चरण</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071329] border border-purple-500/30 text-center space-y-1.5">
            <span className="text-2xl">🎯</span>
            <h4 className="text-xs font-bold text-purple-300">4. किस लिए (PURPOSE)</h4>
            <p className="text-[11px] text-slate-400">दैनिक व वास्तविक उपयोग</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071329] border border-rose-500/30 text-center space-y-1.5">
            <span className="text-2xl">⚠️</span>
            <h4 className="text-xs font-bold text-rose-300">5. समस्या (PROBLEM)</h4>
            <p className="text-[11px] text-slate-400">कमियां व गलत धारणाएं</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071329] border border-yellow-500/30 text-center space-y-1.5">
            <span className="text-2xl">✨</span>
            <h4 className="text-xs font-bold text-yellow-300">6. समाधान (SOLUTION)</h4>
            <p className="text-[11px] text-slate-400">360° नवाचार व सुधार</p>
          </div>
        </div>
      </div>

      {/* Featured Topics Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            ⭐ High-Yield Sample 360° Blueprints
          </h3>
          <span className="text-xs text-slate-400">Click to inspect instant 6 dimensions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 hover:border-amber-500/40 hover:bg-[#0c1e3d] cursor-pointer transition-all space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {topic.subject}
                </span>
                <span className="text-[10px] text-slate-400">{topic.classLevel ? `Class ${topic.classLevel}` : topic.examType}</span>
              </div>

              <h4 className="font-bold text-white text-sm group-hover:text-amber-300 line-clamp-1">
                {topic.name[lang] || topic.name['en']}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2">
                {topic.framework.kya.content[lang] || topic.framework.kya.content['en']}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-bold border-t border-slate-800">
                <span>View Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
