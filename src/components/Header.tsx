import React from 'react';
import { BookOpen, Award, Mic, BrainCircuit, Globe, Sparkles, Volume2, Globe2, ShieldCheck, Building2, Info, Flag, HeartHandshake, MessageSquarePlus, Share2, Users, HardHat } from 'lucide-react';
import { Language, MainTab, UserPersona } from '../types';
import { translations } from '../data/translations';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';
import { getPersonaConfig, isTabAllowedForPersona } from '../data/userPersonas';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  currentPersona?: UserPersona;
  onSelectPersona?: (persona: UserPersona) => void;
  onOpenWorkspaceSelector?: () => void;
  onOpenShareWorkspace?: () => void;
  onOpenPrimeChat?: () => void;
  onOpenRoleModal?: () => void;
  onOpenAboutUs?: () => void;
  onOpenAuthLogin?: () => void;
  onOpenPaymentModal?: () => void;
  onOpen14RadarModal?: () => void;
  onOpenDemandBox?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  currentPersona = 'student',
  onOpenWorkspaceSelector,
  onOpenShareWorkspace,
  onOpenPrimeChat,
  onOpenRoleModal,
  onOpenAboutUs,
  onOpenAuthLogin,
  onOpenPaymentModal,
  onOpen14RadarModal,
  onOpenDemandBox,
}) => {
  const personaConfig = getPersonaConfig(currentPersona);

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

  const shouldShow = (tab: MainTab) => isTabAllowedForPersona(tab, currentPersona);

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
          {/* Persona Switcher Pill */}
          {onOpenWorkspaceSelector && (
            <button
              id="header-ribbon-workspace-btn"
              onClick={onOpenWorkspaceSelector}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 via-[#FFD700]/30 to-amber-500/25 text-[#FFD700] font-black border border-[#FFD700]/60 hover:bg-[#FFD700]/30 transition-all text-[11px] shadow-sm cursor-pointer"
              title="अपना कार्यक्षेत्र (मोड) बदलें"
            >
              <span>{personaConfig.icon}</span>
              <span className="font-extrabold">{personaConfig.name[currentLang]}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-[#FFD700] text-slate-950 font-black">
                बदलें ▾
              </span>
            </button>
          )}

          {/* Share Workspace Link Button */}
          {onOpenShareWorkspace && (
            <button
              id="header-ribbon-share-btn"
              onClick={onOpenShareWorkspace}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] font-black border border-[#00D4FF]/50 hover:bg-[#00D4FF]/30 transition-all text-[11px] shadow-sm cursor-pointer"
              title="छात्रों, कंपनियों या किसानों के लिए सटीक लिंक शेयर करें"
            >
              <Share2 className="w-3 h-3 text-[#00D4FF]" />
              <span>🔗 शेयर लिंक</span>
            </button>
          )}

          {/* Public Demand & Help Center Button */}
          {onOpenDemandBox && (
            <button
              id="header-demand-ribbon-btn"
              onClick={onOpenDemandBox}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-[#FFD700] text-slate-950 font-black hover:brightness-110 transition-all text-[11px] shadow-sm animate-pulse cursor-pointer"
              title="अपनी मांग, शिकायत या नई सुविधा का सुझाव भेजें (100% Demand Match)"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-slate-950" />
              <span>📢 मांग / सहायता बॉक्स</span>
            </button>
          )}

          {/* 14 Modules Sovereign Quality Radar Button */}
          {onOpen14RadarModal && (
            <button
              id="header-14-radar-btn"
              onClick={onOpen14RadarModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] font-black border border-[#00D4FF]/50 hover:bg-[#00D4FF]/30 transition-all text-[11px] shadow-sm animate-pulse"
              title="14 मॉड्यूल्स का उद्देश्य, मांग व पूर्ति रडार देखें"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>14 मॉड्यूल्स संप्रभु रडार ⚡</span>
            </button>
          )}

          {/* Sovereign Admin Shortcuts */}
          <button
            onClick={() => onTabChange('super-admin')}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-bold border border-[#FFD700]/50 hover:bg-[#FFD700]/30 transition-all text-[11px]"
          >
            <span>👑 सुपर एडमिन: मनीष</span>
          </button>

          <button
            onClick={() => onTabChange('krishi-admin')}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-all text-[11px]"
          >
            <span>🌾 कृषि हब: माहि पवार</span>
          </button>

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

            {/* Direct Demand / Help Center Action Button */}
            {onOpenDemandBox && (
              <button
                id="header-demand-btn"
                onClick={onOpenDemandBox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-[#FFD700] to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
                title="अपनी मांग / सहायता भेजें (100% Demand Match)"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                <span>📢 मांग / सहायता</span>
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

            {/* Nominal Monetization / Pricing Button */}
            {onOpenPaymentModal && (
              <button
                id="header-payment-btn"
                onClick={onOpenPaymentModal}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 shadow-md hover:brightness-110 transition-all whitespace-nowrap"
                title="नॉमिनल टोकन फीस (₹9 - ₹49)"
              >
                <span>💰 नॉमिनल पास (₹9-₹49)</span>
              </button>
            )}

            {/* Sovereign Auth / Role Login Button */}
            {onOpenAuthLogin && (
              <button
                id="header-auth-btn"
                onClick={onOpenAuthLogin}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-[#061224] text-slate-200 border border-slate-700 hover:border-amber-400 transition-all whitespace-nowrap"
                title="लॉगिन या रोल बदलें"
              >
                <span>👤 लॉगिन / रोल्स</span>
              </button>
            )}

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

        {/* Navigation Tabs - Mobile & Desktop with Zero-Distraction Filtering */}
        <nav className="flex items-center gap-1.5 sm:gap-2 pb-2.5 overflow-x-auto no-scrollbar">
          {/* Home Tab - always available */}
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

          {/* Company Recruiter Desk Tab */}
          {shouldShow('company') && (
            <button
              id="nav-company-btn"
              onClick={() => onTabChange('company')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'company'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/40 border border-blue-400 font-black'
                  : 'bg-[#0A1931]/80 text-blue-300 hover:text-blue-200 hover:bg-[#102447] border border-blue-500/40'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>{currentLang === 'hi' ? '🏢 कंपनी हायरिंग डेस्क' : '🏢 Company Hiring Desk'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-slate-950 font-black">RECRUITER</span>
            </button>
          )}

          {/* Dedicated Verified Jobs Nav Tab */}
          {shouldShow('verifiedjobs') && (
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
          )}

          {/* AI Interviewer Tab */}
          {shouldShow('ai-interview') && (
            <button
              id="nav-ai-interview-btn"
              onClick={() => onTabChange('ai-interview')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-interview'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/40 border border-cyan-400 font-black'
                  : 'bg-[#0A1931]/80 text-cyan-300 hover:text-cyan-200 hover:bg-[#102447] border border-cyan-500/40'
              }`}
            >
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>{currentLang === 'hi' ? '🎙️ AI इंटरव्यूअर' : '🎙️ AI Interviewer'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-400 text-slate-950 font-black">TEST</span>
            </button>
          )}

          {/* Labour & Daily Local Work Tab */}
          {shouldShow('labour') && (
            <button
              id="nav-labour-btn"
              onClick={() => onTabChange('labour')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'labour'
                  ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-lg shadow-orange-500/40 border border-orange-400 font-black'
                  : 'bg-[#0A1931]/80 text-orange-300 hover:text-orange-200 hover:bg-[#102447] border border-orange-500/40'
              }`}
            >
              <HardHat className="w-4 h-4 text-orange-400" />
              <span>{currentLang === 'hi' ? '👷 स्थानीय दैनिक काम (Labour)' : '👷 Daily Local Work'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-400 text-slate-950 font-black">₹450-₹900</span>
            </button>
          )}

          {/* Skilled Workforce Pool Tab */}
          {shouldShow('skilled') && (
            <button
              id="nav-skilled-btn"
              onClick={() => onTabChange('skilled')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'skilled'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/40 border border-indigo-400 font-black'
                  : 'bg-[#0A1931]/80 text-indigo-300 hover:text-indigo-200 hover:bg-[#102447] border border-indigo-500/40'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{currentLang === 'hi' ? '👥 स्किल्ड टैलेंट पूल' : '👥 Skilled Talent'}</span>
            </button>
          )}

          {/* Dedicated On-Demand Companion & Task Service Nav Tab */}
          {shouldShow('companion') && (
            <button
              id="nav-companion-btn"
              onClick={() => onTabChange('companion')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'companion'
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-rose-500/40 border border-rose-400/60 font-black'
                  : 'bg-[#0A1931]/80 text-rose-300 hover:text-rose-200 hover:bg-[#102447] border border-rose-500/40'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{currentLang === 'hi' ? '🤝 ऑन-डिमांड साथी एवं टास्क' : currentLang === 'hinglish' ? '🤝 Companion & Task Service' : '🤝 On-Demand Companion'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-500 text-white font-black">100% SAFE</span>
            </button>
          )}

          {/* Franchise Module: Franchise Lo - Apne Sheher Ke Boss Bano */}
          <button
            id="nav-franchise-btn"
            onClick={() => onTabChange('franchise')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'franchise'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/40 border border-white'
                : 'bg-[#0A1931]/90 text-[#D4AF37] hover:text-white hover:bg-[#102447] border border-[#D4AF37]/60'
            }`}
          >
            <span>🏛️</span>
            <span>{currentLang === 'hi' ? 'फ्रैंचाइज़ी लो — अपने शहर के बॉस बनो' : 'Franchise Lo — Apne Sheher Ke Boss Bano'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-950 text-[#D4AF37] font-black border border-[#D4AF37]/50 font-mono">
              ₹75K
            </span>
          </button>

          {/* Dedicated Krishi 360° Agri-Tech Nav Tab */}
          {shouldShow('agri') && (
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
          )}

          {/* Dedicated ITI Sovereign Nav Tab */}
          {shouldShow('iti') && (
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
          )}

          {/* Dedicated IIT & JEE Sovereign Nav Tab */}
          {shouldShow('iit') && (
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
          )}

          {/* School 360 */}
          {shouldShow('school') && (
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
          )}

          {/* Competitive Exams */}
          {shouldShow('exam') && (
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
          )}

          {/* Dedicated Sovereign Daily Current Affairs Tab */}
          {shouldShow('current-affairs') && (
            <button
              id="nav-current-affairs-btn"
              onClick={() => onTabChange('current-affairs')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'current-affairs'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 text-white shadow-lg shadow-indigo-500/40 border border-indigo-400/60 font-black ring-2 ring-amber-400'
                  : 'bg-[#0A1931]/80 text-amber-300 hover:text-amber-200 hover:bg-[#102447] border border-amber-500/40'
              }`}
            >
              <span>🔥</span>
              <span>{currentLang === 'hi' ? 'दैनिक समसामयिकी' : currentLang === 'hinglish' ? 'Daily Current Affairs' : 'Daily Current Affairs'}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-500 text-white font-black animate-pulse">DAILY</span>
            </button>
          )}

          {/* Govt Vacancies */}
          {shouldShow('vacancies') && (
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
          )}

          {/* Global AI Jobs */}
          {shouldShow('globaljobs') && (
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
          )}

          {/* English Mentor */}
          {shouldShow('english') && (
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
          )}

          {/* Doubt Solver */}
          {shouldShow('doubt') && (
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
          )}

          {/* Flashcards */}
          {shouldShow('flashcards') && (
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
          )}

          {/* Prime AI Brain */}
          {shouldShow('prime') && (
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
          )}

          {/* Admin Roz 5 Topics */}
          {shouldShow('admin') && (
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
          )}

          {/* Super Admin Manish Vishwakarma Navigation Tab */}
          {shouldShow('super-admin') && (
            <button
              id="nav-super-admin-btn"
              onClick={() => onTabChange('super-admin')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'super-admin'
                  ? 'bg-gradient-to-r from-[#FFD700] via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/40 border border-white'
                  : 'bg-[#0A1931]/80 text-[#FFD700] hover:bg-[#102447] border border-[#FFD700]/50'
              }`}
            >
              <span>👑</span>
              <span>सुपर एडमिन (मनीष)</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-black text-[#FFD700] font-mono">14 MODS</span>
            </button>
          )}

          {/* Krishi Admin Mahi Pawar Navigation Tab */}
          {shouldShow('krishi-admin') && (
            <button
              id="nav-krishi-admin-btn"
              onClick={() => onTabChange('krishi-admin')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'krishi-admin'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/40 border border-emerald-300'
                  : 'bg-[#0A1931]/80 text-emerald-300 hover:bg-[#102447] border border-emerald-500/50'
              }`}
            >
              <span>🌾</span>
              <span>माहि पवार कृषि हब</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-950 text-emerald-300 font-mono">DIRECTOR</span>
            </button>
          )}

          {/* Persona Switch / Explore All Button */}
          {onOpenWorkspaceSelector && (
            <button
              id="nav-explore-all-btn"
              onClick={onOpenWorkspaceSelector}
              className="px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 bg-[#FFD700]/15 text-[#FFD700] hover:bg-[#FFD700]/25 border border-[#FFD700]/40 shadow-sm shrink-0"
              title="अन्य सभी 14 मॉड्यूल्स देखें या मोड बदलें"
            >
              <span>🌐</span>
              <span>{currentPersona === 'all' ? 'मोड बदलें' : '+ अन्य मॉड्यूल्स (All 14)'}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
