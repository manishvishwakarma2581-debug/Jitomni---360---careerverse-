import React from 'react';
import { X, ShieldCheck, Award, Sparkles, Flag, Globe, Cpu, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'hi' | 'en' | 'hinglish';
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({
  isOpen,
  onClose,
  lang = 'hi',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#000000] border-2 border-[#FFD700]/70 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.25)] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-white">
        
        {/* Background Ambient Glowing Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative px-6 py-4 border-b border-[#FFD700]/30 flex items-center justify-between bg-gradient-to-r from-[#000000] via-[#0A1931] to-[#000000]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span>SOVEREIGN IDENTITY UPDATE</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Hero Identity Center Piece */}
          <div className="text-center space-y-4">
            {/* Center Emblem Logo with Golden Glow Animation */}
            <div className="flex justify-center">
              <JitomniEmblemLogo size="xl" showGlow={true} animate={true} />
            </div>

            {/* App Master Title */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFFFFF] to-[#00D4FF]">
                JITOMNI 360° CAREERVERSE
              </h1>
              <p className="text-xs sm:text-sm font-black text-[#00D4FF] tracking-widest uppercase mt-1 flex items-center justify-center gap-2">
                <span>PADHAI SE KAMAI TAK</span>
                <span>•</span>
                <span>VERIFIED JOBS</span>
                <span>•</span>
                <span>NO FAKE PROFILES</span>
                <span>•</span>
                <span>BUILDINDIA</span>
              </p>
            </div>

            {/* OFFICIAL SUBTITLE */}
            <div className="max-w-2xl mx-auto px-4 py-2.5 rounded-2xl bg-[#07132B]/90 border border-[#00D4FF]/40 shadow-lg shadow-[#00D4FF]/10">
              <p className="text-xs sm:text-sm font-semibold text-amber-200/90 font-mono leading-relaxed">
                <strong className="text-[#FFD700]">jit+omni (all) = jitomni</strong> : <span className="text-[#00D4FF]">Jitendriy- Manish</span> (Sovereign Strategic Architect & Philosophical Nation-Builder: Rooting out systemic failure with 360° revolutionary solutions.)
              </p>
            </div>
          </div>

          {/* VISION & MISSION SECTION */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#050D1E] via-[#081736] to-[#050D1E] border border-[#00D4FF]/40 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-[#00D4FF]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] animate-ping" />
              <h2 className="text-sm sm:text-base font-black text-[#FFD700] tracking-wide uppercase">
                TO EMPOWER & TRANSFORM THROUGH INNOVATION & ACCESSIBILITY • BUILDINDIA
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              We <strong>BUILDINDIA</strong>. This is not just an app, this is a <strong>Sovereign Strategy</strong> to solve India's biggest problem - <strong>Fake Profiles & Skills Gap</strong>. We believe in <strong>VERIFIED Talent, not Degrees</strong>. We empower from 10th pass labour to AI engineer with real skills and real jobs.
            </p>

            {/* Sovereign 3-Pillar Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 text-left">
                <div className="text-xs font-black text-[#FFD700] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Verified Talent</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Zero fake resumes. Every candidate passes 10 MCQ or AI video drill.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-[#00D4FF]/30 text-left">
                <div className="text-xs font-black text-[#00D4FF] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#00D4FF]" />
                  <span>10th Pass to AI Engineer</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Inclusive empowerment for local artisans, blue-collar, and global tech talent.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-left">
                <div className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                  <Flag className="w-4 h-4 text-amber-400" />
                  <span>Sovereign Innovation</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Decentralized, accessible, and designed exclusively for BUILDINDIA vision.</p>
              </div>
            </div>
          </div>

          {/* LEADERSHIP PHILOSOPHY - FOUNDER'S CODE (GOLDEN BORDER QUOTE BOX) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#03060E] border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.2)] relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#FFD700] text-black text-[10px] font-black tracking-wider uppercase">
              LEADERSHIP PHILOSOPHY • FOUNDER'S CODE
            </div>

            <blockquote className="text-sm sm:text-base text-slate-100 font-serif italic leading-relaxed pt-2">
              "I suppose leadership at one time meant muscles; then it meant getting along with people; today in the age of AI, true leadership means <strong>EMPOWERING</strong> people to build their own future through Innovation & Accessibility. That's BUILDINDIA."
            </blockquote>

            <div className="mt-4 pt-3 border-t border-[#FFD700]/40 flex items-center justify-between flex-wrap gap-2">
              <div className="text-right ml-auto">
                <div className="text-xs sm:text-sm font-black text-[#FFD700] tracking-wide">
                  - Jitomni : Jitendriy- Manish
                </div>
                <div className="text-[11px] text-[#00D4FF] font-mono font-bold">
                  ( Sovereign Strategic Architect & Philosophical Nation-Builder )
                </div>
              </div>
            </div>
          </div>

          {/* SOVEREIGN BRANDING PALETTE */}
          <div className="p-5 rounded-2xl bg-black/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Sovereign Identity Design Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#000000] border border-slate-700">
                <div className="w-8 h-8 rounded-lg bg-[#000000] border border-slate-600 shadow-inner" />
                <div>
                  <div className="text-xs font-black text-white">#000000</div>
                  <div className="text-[10px] text-slate-400">Black (Sovereign Authority)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#000000] border border-slate-700">
                <div className="w-8 h-8 rounded-lg bg-[#FFD700] shadow-md shadow-[#FFD700]/30" />
                <div>
                  <div className="text-xs font-black text-[#FFD700]">#FFD700</div>
                  <div className="text-[10px] text-slate-400">Gold (Sovereign Eagle)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#000000] border border-slate-700">
                <div className="w-8 h-8 rounded-lg bg-[#00D4FF] shadow-md shadow-[#00D4FF]/30" />
                <div>
                  <div className="text-xs font-black text-[#00D4FF]">#00D4FF</div>
                  <div className="text-[10px] text-slate-400">Neon Blue (Tech India Circuits)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Action Button */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#F59E0B] to-[#FFD700] hover:brightness-110 text-black font-black text-xs sm:text-sm shadow-xl shadow-[#FFD700]/25 transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Explore Careerverse</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
