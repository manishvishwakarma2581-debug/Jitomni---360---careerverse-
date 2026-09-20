import React, { useState, useEffect, useMemo } from 'react';
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
  Printer,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { CompetitiveTopicDetail, Language, QuizQuestion } from '../types';
import { generateTopicPdf } from '../utils/pdfGenerator';
import { exportStylishVisionIasPdf } from '../utils/stylishPdfExporter';
import { MermaidDiagram } from './MermaidDiagram';

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
  if (!topic) return null;

  // Defensive arrays and flags
  const practiceList = useMemo(() => {
    return (topic.practiceSet20 || topic.practiceQuestions20 || []) as any[];
  }, [topic]);

  const pyqList = useMemo(() => {
    return (topic.pyqBank || topic.pyqBlueprint || []) as any[];
  }, [topic]);

  const formulaList = useMemo(() => {
    return (topic.bestFormulaBox?.formulaList || topic.formulaCheatSheet || []) as any[];
  }, [topic]);

  const isReasoning = topic.subjectCategory === 'reasoning';
  const hasReasoningDiagram = Boolean(isReasoning && topic.reasoningDiagram);
  const hasMathsMatrix = Boolean(!isReasoning && topic.mathsCalculationMatrix);
  const hasMermaid = Boolean(topic.visualMermaidDiagram?.code);

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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const topicTitle = getLoc(topic?.name) || 'Topic Blueprint';
        const summaryText = getLoc(topic?.examDemand?.summary);
        const trickTitle = getLoc(topic?.bestMethodVsShortTrick?.jitomniFastTrick?.title);
        const trickStep = getLoc(topic?.bestMethodVsShortTrick?.jitomniFastTrick?.executionStep);

        const textToRead = `${topicTitle}. ${summaryText}. ${trickTitle}. ${trickStep}`;
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
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(formula);
    }
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  // Score calculation for Practice Set
  const calculatePracticeScore = () => {
    let correct = 0;
    let wrong = 0;
    practiceList.forEach((q, idx) => {
      if (practiceAnswers[idx] !== undefined) {
        if (practiceAnswers[idx] === q.correctIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });
    const marks = correct * 2 - wrong * 0.5; // SSC pattern 2 marks positive, 0.5 negative
    return { correct, wrong, unattempted: practiceList.length - (correct + wrong), marks };
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const topicDisplayName = getLoc(topic?.name) || 'Competitive Topic Blueprint';
  const targetExamName = topic?.targetExam || 'Competitive Exam';
  const subjectDisplayName = topic?.subjectName || 'General Aptitude';
  const difficultyLabel = topic?.examDemand?.difficultyLevel || getLoc(topic?.examDemand?.difficultyTrend) || 'Moderate to Advanced';
  const expectedQuestionsLabel = topic?.examDemand?.expectedQuestions || '2 - 3 Questions Guaranteed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
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
                  {subjectDisplayName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {targetExamName} Target
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {difficultyLabel}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {topicDisplayName}
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
              <span>10-Year PYQ Bank ({pyqList.length})</span>
            </button>

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

            <button
              onClick={() => setActiveTab('practice20')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'practice20'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-rose-400" />
              <span>20-Q Practice CBT ({practiceList.length} Qs)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                let md = `# ${topicDisplayName.toUpperCase()}\n\n`;
                md += `> 📌 **EXAM DEMAND & 10-YEAR WEIGHTAGE ANALYSIS (${targetExamName})**:\n> ${getLoc(topic.examDemand?.summary)}\n\n`;
                
                if (formulaList.length > 0) {
                  md += `## ✦ MASTER FORMULA CHEAT SHEET\n`;
                  formulaList.forEach((f: any) => {
                    md += `✦ **${getLoc(f.name || f.title)}**: \`${f.formula}\`\n`;
                    md += `> 📌 **Exam Utility**: ${getLoc(f.whereUsed || f.utility)}\n`;
                  });
                  md += `\n`;
                }

                if (topic.bestMethodVsShortTrick) {
                  md += `## ✦ JITOMNI SPEED SHORTCUT VS CONVENTIONAL METHOD\n`;
                  md += `✦ **Speed Shortcut**: ${getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick?.title)}\n`;
                  md += `✦ **Execution**: ${getLoc(topic.bestMethodVsShortTrick.jitomniFastTrick?.executionStep)}\n`;
                  md += `✦ **Conventional Method**: ${getLoc(topic.bestMethodVsShortTrick.basicMethod?.title || topic.bestMethodVsShortTrick.conventionalMethod?.title)}\n\n`;
                }

                if (pyqList.length > 0) {
                  md += `## ✦ PREVIOUS YEARS QUESTIONS (PYQ) BREAKDOWN\n`;
                  pyqList.forEach((p: any, idx: number) => {
                    md += `✦ **PYQ ${idx + 1} (${p.yearTag || p.exam})**: ${getLoc(p.question)}\n`;
                    md += `> 📌 **Solution / Trap**: ${getLoc(p.shortTrickSolution || p.fastSolution || p.basicMethodSolution)}\n`;
                  });
                  md += `\n`;
                }

                exportStylishVisionIasPdf({
                  title: topicDisplayName,
                  markdownContent: md,
                  lang: language,
                  authorBadge: `JITOMNI 360° EXAM COMMAND • ${(subjectDisplayName || 'GENERAL').toUpperCase()}`,
                  paperLinkage: `${targetExamName} • High-Yield Topic Dossier`,
                });
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
              title="Download Vision IAS Grade Exam PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Vision IAS PDF</span>
            </button>
          </div>
        </div>

        {/* MODAL BODY (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: BLUEPRINT & FORMULAS & SHORTCUTS */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
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
                    {expectedQuestionsLabel}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  {getLoc(topic.examDemand?.summary) || `${targetExamName} एवं सभी प्रमुख केंद्रीय/राज्य परीक्षाओं में पिछले 10 वर्षों में यह विषय अत्यंत निर्णायक रहा है।`}
                </p>

                {/* 10-Year Frequency Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(topic.examDemand?.frequencyStats || [
                    { exam: `${targetExamName} Tier-1`, frequency: '2 - 3 Qs', marksWeightage: '4 - 6 Marks' },
                    { exam: 'SSC CGL / CHSL', frequency: '2 Questions', marksWeightage: '4 Marks' },
                    { exam: 'Railway RRB / NTPC', frequency: '2 Questions', marksWeightage: '2 Marks' },
                    { exam: 'State PSC / Police', frequency: '1 - 2 Questions', marksWeightage: '2 - 4 Marks' }
                  ]).map((stat: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 text-center">
                      <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{stat.exam}</div>
                      <div className="text-xs font-bold text-amber-300">{stat.frequency}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">{stat.marksWeightage}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">Trend Analysis:</span>
                  <span>{getLoc(topic.examDemand?.difficultyTrend) || 'मध्यम से उच्च — सीधे सूत्रों के स्थान पर 360° विश्लेषणात्मक व ट्रिकी प्रश्न पूछे जाते हैं।'}</span>
                </div>
              </div>

              {/* SECTION B: 3 FORMULA & SHORT TRICK BOX */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      ∑
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {getLoc(topic.bestFormulaBox?.title) || 'Master Formulas & Speed Rules'}
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">100% High Yield</span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {formulaList.map((fItem: any, fIdx: number) => (
                    <div
                      key={fIdx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <span className="text-xs font-bold text-indigo-300">
                          {getLoc(fItem.name || fItem.title)}
                        </span>
                        <button
                          onClick={() => handleCopyFormula(fItem.formula)}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                        >
                          {copiedFormula === fItem.formula ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3 h-3" />
                              <span>Copy Rule</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Formula Card Code Block */}
                      <div className="bg-slate-900 px-3 py-2 rounded-lg font-mono text-sm font-bold text-amber-300 border border-slate-800 mb-2.5 overflow-x-auto">
                        {fItem.formula}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="text-slate-300">
                          <span className="text-slate-400 font-medium">Where to apply: </span>
                          {getLoc(fItem.whereUsed || fItem.utility)}
                        </div>
                        <div className="text-amber-200/90 font-medium bg-amber-950/30 p-2 rounded border border-amber-900/30">
                          ⚡ <span className="font-semibold">Exam Hall Pro-Tip: </span>
                          {getLoc(fItem.exampleTip || fItem.example)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: METHOD 1 (BASIC) VS METHOD 2 (10-SEC TRICK) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚖️</span>
                    <h3 className="text-base font-bold text-white">
                      Method Comparison: Basic School Method vs JITOMNI 10-Second Shortcut
                    </h3>
                  </div>
                </div>

                {/* Question Banner */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4 text-sm font-semibold text-amber-200 leading-relaxed">
                  {getLoc(topic.bestMethodVsShortTrick?.problemStatement) || `Standard Problem: How to solve ${topicDisplayName} in under 10 seconds without standard algebraic equations?`}
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* LEFT: BASIC METHOD */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          {getLoc(topic.bestMethodVsShortTrick?.basicMethod?.title) || 'Basic School Method'}
                        </span>
                        <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {topic.bestMethodVsShortTrick?.basicMethod?.timeTaken || '60-90s'}
                        </span>
                      </div>

                      <div className="space-y-2.5 mb-4">
                        {(topic.bestMethodVsShortTrick?.basicMethod?.steps || [
                          { hi: 'चरण 1: सभी अज्ञात मानों को x मानकर समीकरण स्थापित करें।', en: 'Step 1: Assign variable x to unknowns and set up algebraic equations.' },
                          { hi: 'चरण 2: समीकरणों को बीजगणितीय विधि से विस्तारित करें।', en: 'Step 2: Expand and manipulate equations.' },
                          { hi: 'चरण 3: लंबा गुणा-भाग करके x का मान निकालें।', en: 'Step 3: Perform lengthy arithmetic to solve for x.' }
                        ]).map((step: any, sIdx: number) => (
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
                          {getLoc(topic.bestMethodVsShortTrick?.jitomniFastTrick?.title) || 'JITOMNI Super Shortcut'}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                          <Zap className="w-3.5 h-3.5" />
                          {topic.bestMethodVsShortTrick?.jitomniFastTrick?.timeTaken || '8-10s'}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 border border-amber-500/30 p-2.5 rounded-lg mb-3 font-mono text-xs font-bold text-amber-300 text-center">
                        {topic.bestMethodVsShortTrick?.jitomniFastTrick?.trickFormulaOrLogic || 'डायरेक्ट रेश्यो + डिजिटल सम + टारगेट मल्टीप्लायर'}
                      </div>

                      <div className="text-xs text-slate-200 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-500/20 mb-3 leading-relaxed">
                        <span className="font-semibold text-emerald-300 block mb-1">Execution:</span>
                        {getLoc(topic.bestMethodVsShortTrick?.jitomniFastTrick?.executionStep) || 'दिए गए मान का सीधा अनुपात लें और उत्तर विकल्प को मात्र 8 सेकंड में लॉक करें बिना लंबा गुणा-भाग किए।'}
                      </div>
                    </div>

                    <div className="text-xs text-amber-200 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40 font-medium">
                      💡 {getLoc(topic.bestMethodVsShortTrick?.jitomniFastTrick?.proTip) || 'एग्जाम प्रो-टिप: 100% सटीक उत्तर के लिए हमेशा विकल्पों के अंतिम अंकों और डिजिटल सम का मिलान करें।'}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: VERIFIED 10-YEAR PYQ BANK */}
          {activeTab === 'pyq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
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
                  {pyqList.length} Past Questions Loaded
                </span>
              </div>

              <div className="space-y-4">
                {pyqList.map((pyq: any, pIdx: number) => {
                  const qId = pyq.id || `pyq-${pIdx}`;
                  const isRevealed = revealedPyqSolutions[qId];
                  const selectedOpt = selectedPyqAnswers[qId];
                  const opts = getLocArray(pyq.options);

                  return (
                    <div
                      key={qId}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 transition-all hover:border-slate-700"
                    >
                      {/* PYQ Header */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pyq.yearTag || `${targetExamName} PYQ`}
                          </span>
                          <span className="text-xs text-slate-400">
                            {pyq.exam || targetExamName}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          Saves ~{pyq.timeSaveSeconds || 40}s with Shortcut
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="text-sm font-medium text-slate-100 mb-3 leading-relaxed">
                        <span className="text-indigo-400 font-bold mr-1.5">Q{pIdx + 1}.</span>
                        {getLoc(pyq.question)}
                      </p>

                      {/* 4 Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {opts.map((opt: string, oIdx: number) => {
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
                              onClick={() => setSelectedPyqAnswers((prev) => ({ ...prev, [qId]: oIdx }))}
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
                              [qId]: !prev[qId],
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
                              {getLoc(pyq.basicMethodSolution) || 'पारंपरिक विधि से विस्तृत समीकरण हल करके उत्तर प्राप्त करें।'}
                            </p>
                          </div>

                          {/* Method 2 */}
                          <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/30 text-xs">
                            <span className="font-bold text-amber-300 block mb-1 flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              Method 2: 10-Second Shortcut (3s):
                            </span>
                            <p className="text-emerald-200 leading-relaxed font-medium">
                              {getLoc(pyq.shortTrickSolution || pyq.fastSolution) || 'JITOMNI 360° सुपर ट्रिक: दिए गए मान का अनुपात लें और उत्तर विकल्प को तुरंत लॉक करें।'}
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

          {/* TAB 3: DIAGRAM & LOGIC TREE / SPEED CALCULATION MATRIX / MERMAID FLOWCHART */}
          {activeTab === 'diagram' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* REASONING 8-DIRECTION COMPASS & LOGIC TREE */}
              {hasReasoningDiagram && (
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
                    {(topic.reasoningDiagram.compassNodes || []).map((node: any, nIdx: number) => (
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
                    {(topic.reasoningDiagram.logicRules || []).map((rule: any, rIdx: number) => (
                      <div key={rIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{getLoc(rule)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MATHS FRACTION TO PERCENTAGE TABLE */}
              {hasMathsMatrix && (
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
                    {(topic.mathsCalculationMatrix.fractionTable || []).map((fRow: any, frIdx: number) => (
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
                      {(topic.mathsCalculationMatrix.speedMultiplierTricks || []).map((sm: any, smIdx: number) => (
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

              {/* DYNAMIC MERMAID FLOWCHART (For all synthesized & standard topics) */}
              {hasMermaid && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-amber-400" />
                      <h3 className="text-base font-bold text-white">
                        {getLoc(topic.visualMermaidDiagram?.title) || `${topicDisplayName} — Master Decision Tree`}
                      </h3>
                    </div>
                    <span className="text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60 font-semibold">
                      Interactive Visual Logic
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <MermaidDiagram
                      code={topic.visualMermaidDiagram.code}
                      title={getLoc(topic.visualMermaidDiagram.title)}
                    />
                  </div>
                </div>
              )}

              {/* FALLBACK DECISION TREE IF NO DIAGRAM IS CONFIGURED */}
              {!hasReasoningDiagram && !hasMathsMatrix && !hasMermaid && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">
                      {topicDisplayName} — 10-Second Exam Hall Flowchart
                    </h3>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <MermaidDiagram
                      code={`graph TD
    A["🎯 ${topicDisplayName} Question"] --> B{"Question Type?"}
    B -->|Direct Value Given| C["⚡ JITOMNI 10s Base Shortcut"]
    B -->|Complex / Mixed Pattern| D["📊 Elimination & Digital Root Check"]
    C --> E["🏆 Lock Option in 8 Seconds with 100% Accuracy"]
    D --> E
    style A fill:#f59e0b,stroke:#d97706,color:#000
    style C fill:#059669,stroke:#10b981,color:#fff
    style D fill:#2563eb,stroke:#3b82f6,color:#fff
    style E fill:#7c3aed,stroke:#8b5cf6,color:#fff`}
                      title={`${topicDisplayName} Decision Tree`}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: 20-QUESTION PRACTICE CBT SET */}
          {activeTab === 'practice20' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
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
                        Your Score: {score.marks.toFixed(1)} / {practiceList.length * 2}
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
                {practiceList.map((qItem: any, qIdx: number) => {
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
                          Question {qIdx + 1} of {practiceList.length}
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
                        {opts.map((opt: string, oIdx: number) => {
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
                          {getLoc(qItem.explanation || qItem.solution) || 'JITOMNI 360° विधि के अनुसार नियम लागू करने पर सही उत्तर प्राप्त होता है।'}
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
                <span>Launch {targetExamName} Full Mock CBT</span>
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
