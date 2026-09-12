import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  FileText,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  TrendingUp,
  Share2,
  RefreshCw,
  Eye,
  Check,
  Printer
} from 'lucide-react';
import { CompetitiveTopicDetail, Language, QuizQuestion } from '../types';
import { generateTopicPdf } from '../utils/pdfGenerator';
import { exportStylishVisionIasPdf } from '../utils/stylishPdfExporter';

interface CompetitiveTopicModalProps {
  topic: CompetitiveTopicDetail;
  language: Language;
  onClose: () => void;
  onLaunchFullMock?: () => void;
}

export const CompetitiveTopicModal: React.FC<CompetitiveTopicModalProps> = ({
  topic,
  language,
  onClose,
  onLaunchFullMock,
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'pyq' | 'practice20' | 'diagram'>('blueprint');
  const [selectedPyqAnswers, setSelectedPyqAnswers] = useState<Record<string, number>>({});
  const [revealedPyqSolutions, setRevealedPyqSolutions] = useState<Record<string, boolean>>({});
  
  // Practice Set (20Q) State
  const [practiceActiveIndex, setPracticeActiveIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [isPracticeSubmitted, setIsPracticeSubmitted] = useState(false);
  const [practiceTimeRemaining, setPracticeTimeRemaining] = useState(20 * 60); // 20 minutes
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Helper for localized text
  const getLoc = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.hi || obj.en || obj.hinglish || '';
  };

  const getLocArray = (obj: any): string[] => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    return obj[language] || obj.hi || obj.en || obj.hinglish || [];
  };

  // Timer for Practice Set
  useEffect(() => {
    if (activeTab === 'practice20' && !isPracticeSubmitted && practiceTimeRemaining > 0) {
      const timer = setInterval(() => {
        setPracticeTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTab, isPracticeSubmitted, practiceTimeRemaining]);

  // Speech synthesizer
  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${getLoc(topic?.name)}. ${getLoc(topic?.examDemand?.summary)}. ${getLoc(topic?.bestMethodVsShortTrick?.jitomniFastTrick?.title)}. ${getLoc(topic?.bestMethodVsShortTrick?.jitomniFastTrick?.executionStep)}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard?.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  // Score calculation for Practice Set
  const calculatePracticeScore = () => {
    let correct = 0;
    let wrong = 0;
    const questions = topic.practiceSet20 || [];
    questions.forEach((q, idx) => {
      if (practiceAnswers[idx] !== undefined) {
        if (practiceAnswers[idx] === q.correctIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });
    const marks = correct * 2 - wrong * 0.5; // SSC pattern 2 marks positive, 0.5 negative
    return { correct, wrong, unattempted: questions.length - (correct + wrong), marks };
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isReasoning = topic.subjectCategory === 'reasoning';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 sm:px-6 py-4 border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg ${
              isReasoning ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {isReasoning ? '🧩' : '📊'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {topic.subjectName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {topic.targetExam} Target
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {topic.examDemand.difficultyLevel}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {getLoc(topic.name)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-lg border transition-all ${
                isSpeaking
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
              title="Voice Speech Explanation"
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'blueprint'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Exam Demand & Short Tricks</span>
            </button>

            <button
              onClick={() => setActiveTab('pyq')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'pyq'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>10-Year PYQ Bank ({topic.pyqBank.length})</span>
            </button>

            {isReasoning && topic.reasoningDiagram && (
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'diagram'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Diagram & Logic Tree</span>
              </button>
            )}

            {!isReasoning && topic.mathsCalculationMatrix && (
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'diagram'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Speed Calculation Matrix</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('practice20')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'practice20'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-rose-400" />
              <span>20-Q Practice CBT ({topic.practiceSet20.length} Qs)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                let md = `# ${getLoc(topic.name).toUpperCase()}\n\n`;
                md += `> 📌 **EXAM DEMAND & 10-YEAR WEIGHTAGE ANALYSIS (${topic.targetExam})**:\n> ${getLoc(topic.examDemand?.summary)}\n\n`;
                
                if (topic.formulaCheatSheet && topic.formulaCheatSheet.length > 0) {
                  md += `## ✦ MASTER FORMULA CHEAT SHEET\n`;
                  topic.formulaCheatSheet.forEach((f) => {
                    md += `✦ **${getLoc(f.title)}**: \`${f.formula}\`\n`;
                    md += `> 📌 **Exam Utility**: ${getLoc(f.utility)}\n`;
                  });
                  md += `\n`;
                }

                if (topic.bestMethodVsShortTrick) {
                  md += `## ✦ JITOMNI SPEED SHORTCUT VS CONVENTIONAL METHOD\n`;
                  md += `✦ **Speed Shortcut**: ${getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick?.title)}\n`;
                  md += `✦ **Execution**: ${getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick?.executionStep)}\n`;
                  md += `✦ **Conventional Method**: ${getLoc(topic.bestMethodVsShortTrick.conventionalMethod?.title)} — ${getLoc(topic.bestMethodVsShortTrick.conventionalMethod?.steps)}\n\n`;
                }

                if (topic.pyqBlueprint && topic.pyqBlueprint.length > 0) {
                  md += `## ✦ PREVIOUS YEARS QUESTIONS (PYQ) BREAKDOWN\n`;
                  topic.pyqBlueprint.forEach((p, idx) => {
                    md += `✦ **PYQ ${idx + 1} (${p.year} ${p.examName})**: ${getLoc(p.question)}\n`;
                    md += `> 📌 **Solution / Trap**: ${getLoc(p.fastSolution)}\n`;
                  });
                  md += `\n`;
                }

                exportStylishVisionIasPdf({
                  title: getLoc(topic.name),
                  markdownContent: md,
                  lang: language,
                  authorBadge: `JITOMNI 360° EXAM COMMAND • ${topic.subjectName.toUpperCase()}`,
                  paperLinkage: `${topic.targetExam} • High-Yield Topic Dossier`,
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-lg shadow-md transition-all cursor-pointer"
              title="Vision IAS Publication-Grade PDF Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>📄 विज़न IAS स्टाइलिश PDF</span>
            </button>

            <button
              onClick={() => generateTopicPdf({ ...topic, framework: null as any } as any, language)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Standard PDF</span>
            </button>
          </div>
        </div>

        {/* MODAL MAIN CONTENT SCROLLER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: BLUEPRINT (EXAM DEMAND + FORMULA BOX + SIDE-BY-SIDE TRICK) */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              
              {/* SECTION A: EXAM DEMAND & WEIGHTAGE BOX */}
              <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-xl font-black">🎯</span>
                    <h3 className="text-base font-bold text-white">
                      Exam Demand & 10-Year Weightage Analysis
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {topic.examDemand.expectedQuestions}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-4 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  {getLoc(topic.examDemand.summary)}
                </p>

                {/* Exam Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {topic.examDemand.frequencyStats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-300 block">{stat.exam}</span>
                        <span className="text-xs text-indigo-400">{stat.frequency}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                        {stat.marksWeightage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION B: BEST MASTER FORMULA BOX */}
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      ∑
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {getLoc(topic.bestFormulaBox.title)}
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">100% High Yield</span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {topic.bestFormulaBox.formulaList.map((fItem, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-500/40 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">
                          {getLoc(fItem.name)}
                        </span>
                        <button
                          onClick={() => handleCopyFormula(fItem.formula)}
                          className="text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition-colors"
                        >
                          {copiedFormula === fItem.formula ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <span>Copy Formula</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Formula Card */}
                      <div className="bg-slate-900/90 border border-emerald-500/30 font-mono text-sm sm:text-base font-bold text-amber-300 px-3.5 py-2.5 rounded-lg mb-2 text-center tracking-wide overflow-x-auto">
                        {fItem.formula}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                        <div className="bg-slate-900/50 p-2 rounded border border-slate-800/60">
                          <span className="font-semibold text-indigo-300">Where to Use: </span>
                          <span>{getLoc(fItem.whereUsed)}</span>
                        </div>
                        <div className="bg-slate-900/50 p-2 rounded border border-slate-800/60">
                          <span className="font-semibold text-emerald-300">Fast Example: </span>
                          <span>{getLoc(fItem.exampleTip)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: BEST METHOD vs JITOMNI FAST TRICK (SIDE-BY-SIDE COMPARISON) */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-xl p-4 sm:p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <h3 className="text-base font-bold text-white">
                      Basic Method vs JITOMNI Fast Trick (Side-by-Side Comparison)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-800/40">
                    Saves 85% Time
                  </span>
                </div>

                {/* Question Banner */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4 text-sm font-semibold text-amber-200 leading-relaxed">
                  {getLoc(topic.bestMethodVsShortTrick.problemStatement)}
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* LEFT: BASIC METHOD */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          Basic School Method
                        </span>
                        <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {topic.bestMethodVsShortTrick.basicMethod.timeTaken}
                        </span>
                      </div>

                      <div className="space-y-2.5 mb-4">
                        {topic.bestMethodVsShortTrick.basicMethod.steps.map((step, sIdx) => (
                          <div key={sIdx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded">
                            <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{getLoc(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 italic bg-slate-950 p-2 rounded border border-slate-800/50">
                      ⚠️ परीक्षा में 100 प्रश्नों के लिए यह विधि समय समाप्त कर देती है।
                    </div>
                  </div>

                  {/* RIGHT: JITOMNI FAST TRICK */}
                  <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border-2 border-amber-500/50 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-amber-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-bl-lg">
                      10 SECONDS
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-indigo-500/30 pb-2">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          JITOMNI Super Shortcut
                        </span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                          <Zap className="w-3.5 h-3.5" />
                          {topic.bestMethodVsShortTrick.jitomniFastTrick.timeTaken}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 border border-amber-500/30 p-2.5 rounded-lg mb-3 font-mono text-xs font-bold text-amber-300 text-center">
                        {topic.bestMethodVsShortTrick.jitomniFastTrick.trickFormulaOrLogic}
                      </div>

                      <div className="text-xs text-slate-200 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-500/20 mb-3 leading-relaxed">
                        <span className="font-semibold text-emerald-300 block mb-1">Execution:</span>
                        {getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick.executionStep)}
                      </div>
                    </div>

                    <div className="text-xs text-amber-200 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40 font-medium">
                      💡 {getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick.proTip)}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LAST 10 YEARS PYQ PRACTICE BANK */}
          {activeTab === 'pyq' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 text-lg font-black">🏛️</span>
                    10-Year Verified PYQ Practice Bank
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real past exam questions with Dual Solution (Basic Method vs 10-Second Trick)
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-300 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                  {topic.pyqBank.length} Past Questions Loaded
                </span>
              </div>

              <div className="space-y-4">
                {topic.pyqBank.map((pyq, pIdx) => {
                  const isRevealed = revealedPyqSolutions[pyq.id];
                  const selectedOpt = selectedPyqAnswers[pyq.id];
                  const opts = getLocArray(pyq.options);

                  return (
                    <div
                      key={pyq.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 transition-all hover:border-slate-700"
                    >
                      {/* PYQ Header */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pyq.yearTag}
                          </span>
                          <span className="text-xs text-slate-400">
                            {pyq.exam}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          Saves ~{pyq.timeSaveSeconds}s with Shortcut
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="text-sm font-medium text-slate-100 mb-3 leading-relaxed">
                        <span className="text-indigo-400 font-bold mr-1.5">Q{pIdx + 1}.</span>
                        {getLoc(pyq.question)}
                      </p>

                      {/* 4 Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {opts.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          const isCorrect = pyq.correctIndex === oIdx;
                          let btnClass = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800';

                          if (selectedOpt !== undefined) {
                            if (isCorrect) {
                              btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (isSelected) {
                              btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 font-semibold';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => setSelectedPyqAnswers((prev) => ({ ...prev, [pyq.id]: oIdx }))}
                              className={`p-2.5 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center gap-2 ${btnClass}`}
                            >
                              <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center text-xs shrink-0 font-bold">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Reveal Dual Solution Toggle */}
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                        <button
                          onClick={() =>
                            setRevealedPyqSolutions((prev) => ({
                              ...prev,
                              [pyq.id]: !prev[pyq.id],
                            }))
                          }
                          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-800/40 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isRevealed ? 'Hide Dual Solution' : 'View Dual Solution (Method 1 vs 2)'}</span>
                        </button>
                        {pyq.formulaUsed && (
                          <span className="text-xs font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {pyq.formulaUsed}
                          </span>
                        )}
                      </div>

                      {/* DUAL SOLUTION REVEAL BOX */}
                      {isRevealed && (
                        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Method 1 */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                            <span className="font-bold text-slate-400 block mb-1">
                              Method 1: Step-by-Step Basic (60s):
                            </span>
                            <p className="text-slate-300 leading-relaxed">
                              {getLoc(pyq.basicMethodSolution)}
                            </p>
                          </div>

                          {/* Method 2 */}
                          <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/30 text-xs">
                            <span className="font-bold text-amber-300 block mb-1 flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              Method 2: 10-Second Shortcut (3s):
                            </span>
                            <p className="text-emerald-200 leading-relaxed font-medium">
                              {getLoc(pyq.shortTrickSolution)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGRAM & LOGIC TREE / SPEED CALCULATION MATRIX */}
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              
              {/* REASONING 8-DIRECTION COMPASS & LOGIC TREE */}
              {isReasoning && topic.reasoningDiagram && (
                <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-base font-bold text-white">
                        {getLoc(topic.reasoningDiagram.title)}
                      </h3>
                    </div>
                    <span className="text-xs text-cyan-400 font-semibold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                      Zero Drawing Needed
                    </span>
                  </div>

                  {/* Compass Interactive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                    {topic.reasoningDiagram.compassNodes?.map((node, nIdx) => (
                      <div
                        key={nIdx}
                        className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center hover:border-cyan-500/50 transition-colors"
                      >
                        <div className="text-xs font-mono text-cyan-400 font-bold mb-0.5">{node.dir} ({node.angle}°)</div>
                        <div className="text-xs text-slate-200 font-medium">{node.hiLabel}</div>
                      </div>
                    ))}
                  </div>

                  {/* Logic Rules List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Fundamental Rotation & Shadow Rules:
                    </h4>
                    {topic.reasoningDiagram.logicRules.map((rule, rIdx) => (
                      <div key={rIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{getLoc(rule)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MATHS FRACTION TO PERCENTAGE TABLE */}
              {!isReasoning && topic.mathsCalculationMatrix && (
                <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      <h3 className="text-base font-bold text-white">
                        {getLoc(topic.mathsCalculationMatrix.title)}
                      </h3>
                    </div>
                    <span className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded border border-indigo-800">
                      Speed Multiplier Table
                    </span>
                  </div>

                  {/* Fraction Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                    {topic.mathsCalculationMatrix.fractionTable?.map((fRow, frIdx) => (
                      <div key={frIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                        <div className="font-mono text-sm font-bold text-amber-300">{fRow.fraction}</div>
                        <div className="text-xs font-semibold text-emerald-400">{fRow.percentage}</div>
                        <div className="text-[10px] text-slate-400">Dec: {fRow.decimal}</div>
                      </div>
                    ))}
                  </div>

                  {/* Speed Multipliers */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Direct Arithmetic Speed Multipliers:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.mathsCalculationMatrix.speedMultiplierTricks?.map((sm, smIdx) => (
                        <div key={smIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                          <div className="font-bold text-indigo-300">{sm.name}</div>
                          <div className="text-slate-200 font-mono">{sm.trick}</div>
                          <div className="text-slate-400 text-[11px] mt-0.5 italic">{sm.example}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: 20-QUESTION PRACTICE CBT SET */}
          {activeTab === 'practice20' && (
            <div className="space-y-5">
              
              {/* Test Header with Timer & Submit */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>⚡</span>
                    20-Question Targeted Practice Test
                  </h3>
                  <span className="text-xs text-slate-400">
                    Pattern: +2.0 Marks, -0.50 Negative Marking | Target: 20 Mins
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-sm font-bold text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimer(practiceTimeRemaining)}</span>
                  </div>

                  {!isPracticeSubmitted ? (
                    <button
                      onClick={() => setIsPracticeSubmitted(true)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-colors"
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsPracticeSubmitted(false);
                        setPracticeAnswers({});
                        setPracticeTimeRemaining(20 * 60);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SCORE RESULT BANNER (When Submitted) */}
              {isPracticeSubmitted && (() => {
                const score = calculatePracticeScore();
                return (
                  <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-emerald-500/40 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4 shadow-xl">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Test Complete</span>
                      <h4 className="text-xl font-black text-white">
                        Your Score: {score.marks.toFixed(1)} / {topic.practiceSet20.length * 2}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="bg-emerald-950 px-2.5 py-1 rounded border border-emerald-700 text-emerald-300">
                        ✓ {score.correct} Correct
                      </span>
                      <span className="bg-rose-950 px-2.5 py-1 rounded border border-rose-700 text-rose-300">
                        ✗ {score.wrong} Wrong
                      </span>
                      <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-400">
                        — {score.unattempted} Left
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Questions scroller */}
              <div className="space-y-4">
                {topic.practiceSet20.map((qItem, qIdx) => {
                  const selected = practiceAnswers[qIdx];
                  const isCorrect = selected === qItem.correctIndex;
                  const opts = getLocArray(qItem.options);

                  return (
                    <div
                      key={qItem.id || qIdx}
                      className={`bg-slate-900 border rounded-xl p-4 sm:p-5 transition-all ${
                        isPracticeSubmitted
                          ? isCorrect
                            ? 'border-emerald-500/40 bg-slate-900/90'
                            : selected !== undefined
                            ? 'border-rose-500/40 bg-slate-900/90'
                            : 'border-slate-800'
                          : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-400">
                          Question {qIdx + 1} of {topic.practiceSet20.length}
                        </span>
                        {qItem.yearTag && (
                          <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                            {qItem.yearTag}
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-slate-100 mb-3">
                        {getLoc(qItem.question)}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {opts.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          let optStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800';

                          if (isPracticeSubmitted) {
                            if (qItem.correctIndex === oIdx) {
                              optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isOptionSelected) {
                              optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                            }
                          } else if (isOptionSelected) {
                            optStyle = 'bg-indigo-900/80 border-indigo-500 text-indigo-200 font-semibold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isPracticeSubmitted}
                              onClick={() => setPracticeAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                              className={`p-2.5 rounded-lg border text-left text-xs sm:text-sm flex items-center gap-2 transition-colors ${optStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs shrink-0 font-bold">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Show Explanation when Submitted */}
                      {isPracticeSubmitted && (
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-emerald-400 block mb-0.5">Explanation:</span>
                          {getLoc(qItem.explanation)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-900/90 border-t border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-400">
            JITOMNI 360° Competitive Engine • Verified 10-Year Syllabus Matrix
          </div>

          <div className="flex items-center gap-2">
            {onLaunchFullMock && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchFullMock();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch {topic.targetExam} Full Mock CBT</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
