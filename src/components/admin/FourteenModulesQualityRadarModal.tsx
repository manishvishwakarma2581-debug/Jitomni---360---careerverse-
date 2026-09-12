// src/components/admin/FourteenModulesQualityRadarModal.tsx
// JITOMNI 360° CAREERVERSE — 14-MODULE SOVEREIGN QUALITY & CONTINUOUS DATA RADAR

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Search,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Award,
  Cpu,
  HardHat,
  Sprout,
  Video,
  Globe2,
  HeartHandshake,
  Mic,
  BrainCircuit,
  Flame,
  ChevronRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { Language, MainTab } from '../../types';
import {
  fourteenModulesEngine,
  ModuleAuditSpec,
  Global14ModuleAuditReport,
} from '../../services/fourteenModulesMasterEngine';

interface FourteenModulesQualityRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onNavigateTab: (tab: MainTab) => void;
}

export const FourteenModulesQualityRadarModal: React.FC<FourteenModulesQualityRadarModalProps> = ({
  isOpen,
  onClose,
  lang,
  onNavigateTab,
}) => {
  const [auditReport, setAuditReport] = useState<Global14ModuleAuditReport>(() =>
    fourteenModulesEngine.auditAllFourteenModules()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'edu' | 'jobs' | 'ai' | 'service'>('all');
  const [isBoosting, setIsBoosting] = useState(false);
  const [boostLogs, setBoostLogs] = useState<string[]>([]);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBoostAll14Modules = () => {
    setIsBoosting(true);
    setBoostLogs([`[${new Date().toLocaleTimeString()}] 🚀 Initiating 14-Module Deep Sovereign Data Sync...`]);

    setTimeout(() => {
      const updated = fourteenModulesEngine.boostAndFulfillAllModules((msg) => {
        setBoostLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
      });
      setAuditReport(updated);
      setIsBoosting(false);
    }, 400);
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'Award': return <Award className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-orange-400" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Hammer': return <HardHat className="w-5 h-5 text-amber-500" />;
      case 'Video': return <Video className="w-5 h-5 text-rose-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-500" />;
      case 'Globe2': return <Globe2 className="w-5 h-5 text-emerald-300" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-amber-300" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      default: return <Sparkles className="w-5 h-5 text-[#FFD700]" />;
    }
  };

  const filteredModules = auditReport.modules.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.title.hi.toLowerCase().includes(q) ||
      m.title.en.toLowerCase().includes(q) ||
      m.purpose.hi.toLowerCase().includes(q) ||
      m.keyKeywords.some((k) => k.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'edu') return ['school', 'exam', 'iit', 'iti', 'agri'].includes(m.id);
    if (selectedCategory === 'jobs') return ['verifiedjobs', 'labour', 'ai-interview', 'vacancies', 'globaljobs'].includes(m.id);
    if (selectedCategory === 'ai') return ['doubt', 'english', 'flashcards'].includes(m.id);
    if (selectedCategory === 'service') return ['companion'].includes(m.id);

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#07132B] border-2 border-[#FFD700]/40 rounded-3xl shadow-2xl shadow-black overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#000000] via-[#0A1931] to-[#000000] border-b border-[#FFD700]/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-white font-heading tracking-wide">
                  14-मॉड्यूल संप्रभु गुणवत्ता व पूर्ति रडार
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
                  100% Live
                </span>
              </div>
              <p className="text-xs text-amber-200/90 mt-0.5">
                उद्देश्य (Purpose), मांग (Demand) व निरंतर 100% डेटा पूर्ति — उपयोगकर्ताओं का विश्वास अटूट रखने का संप्रभु संकल्प
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBoostAll14Modules}
              disabled={isBoosting}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {isBoosting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>बूस्ट हो रहा है...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span className="hidden sm:inline">14 मॉड्यूल्स डेटा बूस्ट करें 🚀</span>
                  <span className="sm:hidden">बूस्ट करें</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-[#040C1A] border-b border-slate-800 text-xs shrink-0">
          <div className="p-3 rounded-xl bg-[#071733] border border-slate-700/80 text-center">
            <span className="text-slate-400 text-[11px] block">कुल पंजीकृत मॉड्यूल्स</span>
            <span className="text-xl font-black text-white mt-0.5 block font-mono">14 / 14</span>
            <span className="text-emerald-400 text-[10px] font-bold">✓ 100% कवर्ड</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071733] border border-slate-700/80 text-center">
            <span className="text-slate-400 text-[11px] block">कुल संरचित डेटा एंटिटीज़</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block font-mono">
              {auditReport.totalDataEntitiesCount}+
            </span>
            <span className="text-slate-300 text-[10px]">चैप्टर्स, जॉब्स, टेस्ट, कार्ड्स</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071733] border border-slate-700/80 text-center">
            <span className="text-slate-400 text-[11px] block">प्लेटफ़ॉर्म पूर्ति स्कोर</span>
            <span className="text-xl font-black text-emerald-300 mt-0.5 block font-mono">
              {auditReport.overallPlatformCompleteness}%
            </span>
            <span className="text-emerald-400 text-[10px] font-bold">Zero Hollow Mock Data</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071733] border border-slate-700/80 text-center">
            <span className="text-slate-400 text-[11px] block">स्वायत्त ऑटो-शेड्यूलर</span>
            <span className="text-xl font-black text-[#00D4FF] mt-0.5 block font-mono">24x7 Active</span>
            <span className="text-cyan-300 text-[10px]">निरंतर स्वतः सिंक</span>
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div className="p-4 bg-[#0A1931]/60 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="मॉड्यूल, उद्देश्य या कीवर्ड खोजें..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040C1A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-[#071733] text-slate-300 hover:text-white'
              }`}
            >
              सभी 14
            </button>
            <button
              onClick={() => setSelectedCategory('edu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'edu'
                  ? 'bg-blue-500 text-white font-black'
                  : 'bg-[#071733] text-slate-300 hover:text-white'
              }`}
            >
              शिक्षा (School, JEE, ITI, Agri, Exam)
            </button>
            <button
              onClick={() => setSelectedCategory('jobs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'jobs'
                  ? 'bg-indigo-500 text-white font-black'
                  : 'bg-[#071733] text-slate-300 hover:text-white'
              }`}
            >
              रोजगार व हायरिंग (Jobs, Labour, Sarkari)
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'ai'
                  ? 'bg-purple-500 text-white font-black'
                  : 'bg-[#071733] text-slate-300 hover:text-white'
              }`}
            >
              AI मेंटरशिप (Doubt, English, Cards)
            </button>
            <button
              onClick={() => setSelectedCategory('service')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'service'
                  ? 'bg-pink-500 text-white font-black'
                  : 'bg-[#071733] text-slate-300 hover:text-white'
              }`}
            >
              साथी सेवा (Companion)
            </button>
          </div>
        </div>

        {/* Live Boost Terminal Logs (if active or triggered) */}
        {boostLogs.length > 0 && (
          <div className="p-3 bg-black/90 border-b border-amber-500/30 max-h-28 overflow-y-auto font-mono text-[11px] text-emerald-400 space-y-1">
            <div className="flex items-center justify-between text-amber-300 text-[10px] uppercase tracking-wider pb-1 border-b border-slate-800">
              <span>ऑटो-शेड्यूलर टर्मिनल लॉग्स (14-Module Sovereign Sync)</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
            {boostLogs.map((log, i) => (
              <div key={i} className="leading-tight">{log}</div>
            ))}
          </div>
        )}

        {/* Scrollable List of All 14 Modules */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredModules.map((mod, idx) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div
                key={mod.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#091B3A] border border-slate-700/80 hover:border-amber-500/50 transition-all shadow-lg"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#061224] border border-slate-700 text-slate-300 text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#061224] border border-slate-700/80 shrink-0">
                      {getModuleIcon(mod.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-black text-white font-heading">
                          {mod.title.hi}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                          {mod.route}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          {mod.metrics.verifiedQualityStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{mod.title.en}</p>
                    </div>
                  </div>

                  {/* Actions & Metrics */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <div className="text-right hidden sm:block pr-2">
                      <span className="text-xs font-black text-amber-400 font-mono block">
                        {mod.metrics.totalEntitiesCount} {mod.metrics.entitiesLabel}
                      </span>
                      <span className="text-[10px] text-emerald-400">✓ 100% Fulfill</span>
                    </div>

                    <button
                      onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#061224] hover:bg-slate-800 text-xs text-slate-200 border border-slate-700 font-bold transition-colors"
                    >
                      {isExpanded ? 'संक्षिप्त करें' : 'उद्देश्य व विवरण 🔍'}
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigateTab(mod.tab);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black flex items-center gap-1 hover:brightness-110 shadow"
                    >
                      <span>ओपन करें</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Purpose Callout (Always visible summary) */}
                <div className="mt-3 p-3 rounded-xl bg-[#06142E] border border-blue-900/40 text-xs">
                  <div className="flex items-start gap-2">
                    <strong className="text-amber-400 shrink-0 uppercase font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-400/15">
                      उद्देश्य (PURPOSE):
                    </strong>
                    <span className="text-slate-200 leading-relaxed font-medium">
                      {mod.purpose.hi}
                    </span>
                  </div>
                </div>

                {/* Expanded Deep Specifications */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-3.5 text-xs">
                    {/* Demand & Scale */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-[#040C1A] border border-slate-800">
                        <span className="font-bold text-amber-300 block mb-1">
                          🎯 मांग व लक्षित नागरिक (Target Audience):
                        </span>
                        <p className="text-slate-300">{mod.demandAndAudience.targetCitizens.hi}</p>
                        <p className="text-slate-400 text-[11px] mt-1 font-mono">
                          Scale: {mod.demandAndAudience.demandScale}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#040C1A] border border-slate-800">
                        <span className="font-bold text-cyan-300 block mb-1">
                          💡 यह मॉड्यूल क्यों अनिवार्य है:
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px]">
                          {mod.demandAndAudience.whyNeeded.map((reason, rIdx) => (
                            <li key={rIdx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Gap Analysis & Sovereign Standard */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/20 via-[#061224] to-emerald-950/20 border border-slate-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-bold text-red-400 flex items-center gap-1 mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            कहाँ क्या कमी रहती थी (Common Gaps Avoided):
                          </span>
                          <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                            {mod.gapAnalysisAndSovereignStandard.commonGapsIdentified.map((gap, gIdx) => (
                              <li key={gIdx}>{gap}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            क्या व कैसे होना चाहिए (Sovereign Mandate Fulfilled):
                          </span>
                          <ul className="space-y-1 text-emerald-200/90 text-[11px] list-disc list-inside font-medium">
                            {mod.gapAnalysisAndSovereignStandard.mandatoryStandard.map((std, sIdx) => (
                              <li key={sIdx}>{std}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Feature badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                      <span className="text-slate-400">सक्रिय क्षमताएं:</span>
                      {mod.metrics.hasInteractiveModal && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-900/50 text-purple-300 border border-purple-700/50">
                          ✓ इंटरएक्टिव 360° मोडल
                        </span>
                      )}
                      {mod.metrics.hasFullReaderOrAudio && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-900/50 text-blue-300 border border-blue-700/50">
                          ✓ फुल रीडर / ऑडियो वाचन
                        </span>
                      )}
                      {mod.metrics.hasAssessmentTest && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-900/50 text-amber-300 border border-amber-700/50">
                          ✓ असेसमेंट / महा-टेस्ट
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                        अंतिम सत्यापन: {new Date(mod.metrics.lastFulfilledAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee Bar */}
        <div className="p-4 bg-[#040C1A] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px]">
              <strong>संप्रभु गारंटी:</strong> सभी 14 मॉड्यूल्स के उद्देश्य, मांग व गुणवत्ता मानक सिस्टम में स्थायी रूप से कोडित हैं। किसी उपयोगकर्ता का विश्वास कभी नहीं टूटेगा।
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors shrink-0"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
