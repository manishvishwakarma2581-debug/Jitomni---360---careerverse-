import React from 'react';
import { BookOpen, Award, Mic, BrainCircuit, Globe, Sparkles, Volume2, Globe2, ShieldCheck, Building2, Info, Flag } from 'lucide-react';
import { Language, MainTab } from '../types';
import { translations } from '../data/translations';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  onOpenPrimeChat?: () => void;
  onOpenRoleModal?: () => void;
  onOpenAboutUs?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenPrimeChat,
  onOpenRoleModal,
  onOpenAboutUs,
}) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hinglish', label: 'Hinglish', flag: '⚡' },
  ];

  const isVerifiedJobsActive = 
    activeTab === 'verifiedjobs' || 
    activeTab === 'company' || 
    activeTab === 'skilled' || 
    activeTab === 'labour';

  return (
    <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-[#FFD700]/30 shadow-lg shadow-black/80">
      {/* Top Universal Access Ribbon */}
      <div className="bg-gradient-to-r from-[#000000] via-[#07132B] to-[#000000] py-1 px-4 border-b border-[#FFD700]/20 text-xs text-amber-300/90 text-center flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
          <span className="font-mono text-[11px] text-[#00D4FF]">
            BUILDINDIA • Padhai Se Kamai Tak • 100% Verified Talent
          </span>
        </div>

        {/* Quick Sovereign Identity & Verified Jobs Pill */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenAboutUs && (
            <button
              onClick={onOpenAboutUs}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 text-[#FFD700] font-bold border border-[#FFD700]/40 hover:bg-[#FFD700]/25 transition-all text-[10px]"
            >
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span>Sovereign Identity</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('verifiedjobs')}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-all text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% No Fake Profiles</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 min-h-[76px]">
          {/* Logo Brand with Golden Sovereign Eagle Mission Patch */}
          <div
            id="brand-logo"
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Center Golden Sovereign Eagle Emblem */}
            <JitomniEmblemLogo size="md" showGlow={true} animate={true} interactive={true} />

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-heading font-black text-lg sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">
                  JITOMNI 360°
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-black border border-[#FFD700]/50 tracking-wider">
                  CAREERVERSE
                </span>
              </div>
              
              {/* OFFICIAL SUBTITLE */}
              <p className="text-[10px] sm:text-[11px] text-amber-200/90 font-mono font-medium tracking-tight">
                <strong className="text-[#FFD700]">jit+omni (all) = jitomni</strong> : <span className="text-[#00D4FF]">Jitendriy- Manish</span> <span className="hidden md:inline">(Sovereign Strategic Architect & Philosophical Nation-Builder: Rooting out systemic failure with 360° revolutionary solutions.)</span>
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* About Sovereign Identity Info Button */}
            {onOpenAboutUs && (
              <button
                id="about-sovereign-btn"
                onClick={onOpenAboutUs}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#FFD700]/20 to-[#00D4FF]/20 text-[#FFD700] border border-[#FFD700]/50 hover:bg-[#FFD700]/30 transition-all shadow-md shadow-black"
                title="View Sovereign Identity & Vision"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="hidden sm:inline">About Us</span>
              </button>
            )}

            {/* Direct Verified Jobs Action Button */}
            <button
              id="header-hiring-btn"
              onClick={() => onTabChange('verifiedjobs')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                isVerifiedJobsActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/30'
                  : 'bg-blue-950/50 text-blue-300 border-blue-500/40 hover:bg-blue-900/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>🏢 वेरिफाइड जॉब्स</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>

            {/* Language Switcher - Core Requirement Top Placement */}
            <div className="flex items-center bg-[#07132B] p-1 rounded-xl border border-[#FFD700]/40 shadow-inner">
              <Globe className="w-4 h-4 text-[#FFD700] ml-1.5 hidden sm:block mr-1" />
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-btn-${lang.code}`}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FFD700] to-amber-600 text-slate-950 shadow-md shadow-[#FFD700]/40'
                        : 'text-slate-300 hover:text-[#FFD700] hover:bg-[#FFD700]/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Prime Chat Launcher Button */}
            <button
              id="prime-brain-quick-btn"
              onClick={() => onTabChange('prime')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFD700]/20 via-amber-400/20 to-[#00D4FF]/20 border border-[#FFD700]/50 text-[#FFD700] text-xs sm:text-sm font-bold hover:bg-[#FFD700]/30 transition-all hover:scale-105"
            >
              <BrainCircuit className="w-4 h-4 text-[#FFD700] animate-spin" style={{ animationDuration: '8s' }} />
              <span>PRIME AI Brain</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Mobile & Desktop */}
        <nav className="flex items-center gap-1.5 sm:gap-2 pb-2.5 overflow-x-auto no-scrollbar">
          <button
            id="nav-home-btn"
            onClick={() => onTabChange('home')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-[#0A1931]/80 text-slate-300 hover:text-amber-300 hover:bg-[#102447] border border-slate-700/50'
            }`}
          >
            <span>🏠</span>
            <span>{translations.nav.home[currentLang]}</span>
          </button>

          {/* Dedicated Verified Jobs Nav Tab */}
          <button
            id="nav-verifiedjobs-btn"
            onClick={() => onTabChange('verifiedjobs')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isVerifiedJobsActive
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white shadow-lg shadow-blue-500/40 border border-blue-400/60'
                : 'bg-[#0A1931]/80 text-blue-300 hover:text-blue-200 hover:bg-[#102447] border border-blue-500/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{translations.nav.verifiedjobs?.[currentLang] || '🏢 वेरिफाइड जॉब्स (No Fake)'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-slate-950 font-black">NEW</span>
          </button>

          {/* Dedicated Krishi 360° Agri-Tech Nav Tab */}
          <button
            id="nav-agri-btn"
            onClick={() => onTabChange('agri')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'agri'
                ? 'bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-white shadow-lg shadow-emerald-500/40 border border-emerald-400/60'
                : 'bg-[#0A1931]/80 text-emerald-300 hover:text-emerald-200 hover:bg-[#102447] border border-emerald-500/40'
            }`}
          >
            <span>🌾</span>
            <span>{translations.nav.agri?.[currentLang] || '🌾 कृषि 360° (Agri-Tech)'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-400 text-slate-950 font-black">ICAR/AI</span>
          </button>

          {/* Dedicated ITI Sovereign Nav Tab */}
          <button
            id="nav-iti-btn"
            onClick={() => onTabChange('iti')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'iti'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/40 border border-amber-400/60 font-black'
                : 'bg-[#0A1931]/80 text-amber-300 hover:text-amber-200 hover:bg-[#102447] border border-amber-500/40'
            }`}
          >
            <span>🛠️</span>
            <span>{translations.nav.iti?.[currentLang] || '🛠️ ITI हब (A to Z)'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-slate-950 font-black">NCVT/ALP</span>
          </button>

          {/* Dedicated IIT & JEE Sovereign Nav Tab */}
          <button
            id="nav-iit-btn"
            onClick={() => onTabChange('iit')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'iit'
                ? 'bg-gradient-to-r from-[#00D4FF] via-blue-600 to-indigo-700 text-white shadow-lg shadow-cyan-500/40 border border-cyan-400/60 font-black'
                : 'bg-[#0A1931]/80 text-cyan-300 hover:text-cyan-200 hover:bg-[#102447] border border-cyan-500/40'
            }`}
          >
            <span>🏛️</span>
            <span>{translations.nav.iit?.[currentLang] || '🏛️ IIT व JEE (A to Z)'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#00D4FF] text-slate-950 font-black">ADVANCED</span>
          </button>

          <button
            id="nav-school-btn"
            onClick={() => onTabChange('school')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'school'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-[#0A1931]/80 text-slate-300 hover:text-amber-300 hover:bg-[#102447] border border-slate-700/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{translations.nav.school[currentLang]}</span>
          </button>

          <button
            id="nav-exam-btn"
            onClick={() => onTabChange('exam')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'exam'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-[#0A1931]/80 text-slate-300 hover:text-amber-300 hover:bg-[#102447] border border-slate-700/50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{translations.nav.exam[currentLang]}</span>
          </button>

          <button
            id="nav-vacancies-btn"
            onClick={() => onTabChange('vacancies')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'vacancies'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-[#0A1931]/80 text-cyan-300 hover:text-cyan-200 hover:bg-[#102447] border border-cyan-500/40'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>{translations.nav.vacancies?.[currentLang] || '🔥 सरकारी नौकरी (Live)'}</span>
          </button>

          <button
            id="nav-globaljobs-btn"
            onClick={() => onTabChange('globaljobs')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'globaljobs'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50'
                : 'bg-[#0A1931]/80 text-emerald-300 hover:text-emerald-200 hover:bg-[#102447] border border-emerald-500/40'
            }`}
          >
            <Globe2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{translations.nav.globaljobs?.[currentLang] || '🌍 ग्लोबल AI जॉब्स ($$)'}</span>
          </button>

          <button
            id="nav-english-btn"
            onClick={() => onTabChange('english')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'english'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-[#0A1931]/80 text-slate-300 hover:text-amber-300 hover:bg-[#102447] border border-slate-700/50'
            }`}
          >
            <Mic className="w-4 h-4 text-amber-400" />
            <span>{translations.nav.english[currentLang]}</span>
          </button>

          <button
            id="nav-doubt-btn"
            onClick={() => onTabChange('doubt')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'doubt'
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/40'
                : 'bg-[#0A1931]/80 text-violet-300 hover:text-violet-200 hover:bg-[#102447] border border-violet-500/30'
            }`}
          >
            <span>🎯</span>
            <span>{translations.nav.doubt?.[currentLang] || 'AI डाउट सॉल्वर'}</span>
          </button>

          <button
            id="nav-flashcards-btn"
            onClick={() => onTabChange('flashcards')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/40'
                : 'bg-[#0A1931]/80 text-amber-300 hover:text-amber-200 hover:bg-[#102447] border border-amber-500/30'
            }`}
          >
            <span>⚡</span>
            <span>{translations.nav.flashcards?.[currentLang] || 'फ्लैशकार्ड्स'}</span>
          </button>

          <button
            id="nav-prime-btn"
            onClick={() => onTabChange('prime')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'prime'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/40'
                : 'bg-[#0A1931]/80 text-amber-300 hover:text-amber-200 hover:bg-[#102447] border border-amber-500/30'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-amber-400" />
            <span>{translations.nav.prime[currentLang]}</span>
          </button>

          <button
            id="nav-admin-btn"
            onClick={() => onTabChange('admin')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/40'
                : 'bg-[#0A1931]/80 text-amber-400 hover:text-amber-300 hover:bg-[#102447] border border-amber-500/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>⚡ {translations.nav.admin?.[currentLang] || 'Roz 5 Topics Auto'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
