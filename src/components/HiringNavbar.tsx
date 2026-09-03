import React from 'react';
import { Building2, GraduationCap, HardHat, ShieldCheck, Users, Briefcase, Sparkles, CheckCircle2, ChevronRight, RefreshCw, Layers } from 'lucide-react';
import { AppRole, Language } from '../types';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';

interface HiringNavbarProps {
  currentRole: AppRole;
  onSelectRole: (role: AppRole) => void;
  onOpenRoleModal: () => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
}

export const HiringNavbar: React.FC<HiringNavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenRoleModal,
  lang,
  onSelectLang,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#030B1E]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro bar for verification status */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/80 px-4 py-1 border-b border-slate-800/50 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% NO FAKE PROFILES
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">
              GST वेरिफाइड कंपनियां & 60%+ टेस्ट पास स्किल्ड प्रोफेशनल्स
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Matching Engine Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div 
          onClick={() => onSelectRole('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <JitomniEmblemLogo size="sm" showGlow={true} animate={true} />

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">
                JITOMNI 360°
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 uppercase tracking-wider">
                CAREERVERSE
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-amber-200/90 font-mono">
              jit+omni = jitomni : Jitendriy- Manish
            </p>
          </div>
        </div>

        {/* Primary Role Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            id="nav-tab-home"
            onClick={() => onSelectRole('home')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'home'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🏠 मुख्य पृष्ठ (Home)
          </button>

          <button
            id="nav-tab-company"
            onClick={() => onSelectRole('company')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'company'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>🏢 कंपनी (वैकेंसी निकालो)</span>
          </button>

          <button
            id="nav-tab-skilled"
            onClick={() => onSelectRole('skilled')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'skilled'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>🎓 स्किल्ड जॉब्स (टेस्ट देकर पाओ)</span>
          </button>

          <button
            id="nav-tab-labour"
            onClick={() => onSelectRole('labour')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'labour'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HardHat className="w-3.5 h-3.5 text-emerald-400" />
            <span>👷 लेबर व कारीगर (1-क्लिक कॉल)</span>
          </button>
        </nav>

        {/* Right CTA / Role Switcher & Lang */}
        <div className="flex items-center gap-2.5">
          {/* Role Switcher Button */}
          <button
            id="switch-role-header-btn"
            onClick={onOpenRoleModal}
            className="px-3 py-1.5 rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">भूमिका बदलें /</span>
            <span>Switch Role</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                lang === 'hi' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                lang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('hinglish')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                lang === 'hinglish' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hinglish
            </button>
          </div>
        </div>
      </div>

      {/* Mobile role bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950/90 px-2 py-1.5 text-[11px] font-bold">
        <button
          onClick={() => onSelectRole('home')}
          className={`px-2.5 py-1 rounded-lg ${currentRole === 'home' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400'}`}
        >
          🏠 होम
        </button>
        <button
          onClick={() => onSelectRole('company')}
          className={`px-2.5 py-1 rounded-lg ${currentRole === 'company' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400'}`}
        >
          🏢 कंपनी
        </button>
        <button
          onClick={() => onSelectRole('skilled')}
          className={`px-2.5 py-1 rounded-lg ${currentRole === 'skilled' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
        >
          🎓 स्किल्ड
        </button>
        <button
          onClick={() => onSelectRole('labour')}
          className={`px-2.5 py-1 rounded-lg ${currentRole === 'labour' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'}`}
        >
          👷 लेबर
        </button>
      </div>
    </header>
  );
};
