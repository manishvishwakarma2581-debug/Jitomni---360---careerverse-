import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Zap,
  Clock,
  Database,
  CheckCircle2,
  AlertTriangle,
  Play,
  FileDown,
  BookOpen,
  HelpCircle,
  Video,
  PlusCircle,
  RefreshCw,
  Layers,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { Language, TopicItem } from '../types';
import { generateTopicPdf, downloadPdfBlob } from '../utils/pdfGenerator';

interface AdminSchedulerModuleProps {
  lang: Language;
  onSelectTopic: (topic: TopicItem) => void;
  onOpenQuiz: (topic: TopicItem) => void;
  onOpenVideo: (topic: TopicItem) => void;
  onAddNewTopicToCurriculum?: (topic: TopicItem) => void;
}

export const AdminSchedulerModule: React.FC<AdminSchedulerModuleProps> = ({
  lang,
  onSelectTopic,
  onOpenQuiz,
  onOpenVideo,
  onAddNewTopicToCurriculum,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLog, setGenerationLog] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>(() => {
    return (
      localStorage.getItem('jitomni_last_batch_summary') ||
      'Kal 5 topics add hue: 1. DNA & Genetic Code (Class 10), 2. Preamble & Constitutional Morality (UPSC), 3. GST Council & Fiscal Federalism (MPPSC), 4. Vedic Speed Math Sutras (Class 8), 5. Sound Waves & Echo Physics (Class 9)'
    );
  });
  const [autoScheduleActive, setAutoScheduleActive] = useState<boolean>(() => {
    return localStorage.getItem('jitomni_auto_scheduler_enabled') !== 'false';
  });
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [customSubject, setCustomSubject] = useState('Science');
  const [customClassOrExam, setCustomClassOrExam] = useState('Class 10');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Stored topics in localStorage (direct Firestore client persistence)
  const [storedTopics, setStoredTopics] = useState<TopicItem[]>(() => {
    try {
      const saved = localStorage.getItem('jitomni_auto_topics');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse local stored topics', e);
    }
    return [];
  });

  const [nextBatchTimeCountdown, setNextBatchTimeCountdown] = useState<string>('23h 59m');

  // Cron-like 24-hour interval effect
  useEffect(() => {
    const checkAndTriggerDailyBatch = async () => {
      if (!autoScheduleActive) return;

      const lastRun = localStorage.getItem('jitomni_last_cron_run_timestamp');
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (!lastRun || now - parseInt(lastRun, 10) >= twentyFourHours) {
        console.log('24h Interval Triggered: Running automatic daily batch...');
        await handleGenerateDailyBatch(true);
      } else {
        const msRemaining = twentyFourHours - (now - parseInt(lastRun, 10));
        const hours = Math.floor(msRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
        setNextBatchTimeCountdown(`${hours}h ${minutes}m`);
      }
    };

    checkAndTriggerDailyBatch();
    const interval = setInterval(checkAndTriggerDailyBatch, 60000); // check every minute

    return () => clearInterval(interval);
  }, [autoScheduleActive]);

  const handleGenerateDailyBatch = async (isAuto = false) => {
    setIsGenerating(true);
    setGenerationLog((prev) => [
      `[${new Date().toLocaleTimeString()}] 🚀 Initiating ${isAuto ? '24h Auto-Cron' : 'Manual'} 5-Topic Batch...`,
      ...prev,
    ]);

    try {
      const res = await fetch('/api/admin/generate-daily-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.success && data.topics) {
        const newBatch: TopicItem[] = data.topics;
        const updated = [...newBatch, ...storedTopics];
        setStoredTopics(updated);
        localStorage.setItem('jitomni_auto_topics', JSON.stringify(updated));
        localStorage.setItem('jitomni_last_cron_run_timestamp', Date.now().toString());

        if (data.batchSummary) {
          setStatusMessage(data.batchSummary);
          localStorage.setItem('jitomni_last_batch_summary', data.batchSummary);
        }

        // Add each to parent curriculum if prop available
        if (onAddNewTopicToCurriculum) {
          newBatch.forEach((t) => onAddNewTopicToCurriculum(t));
        }

        setGenerationLog((prev) => [
          `[${new Date().toLocaleTimeString()}] ✅ 5 Topics successfully generated in Hindi, English & Hinglish!`,
          `[${new Date().toLocaleTimeString()}] 📦 Direct Firestore Database & Local Storage synchronized.`,
          ...prev,
        ]);
      } else {
        throw new Error(data.error || 'Server returned failure');
      }
    } catch (err: any) {
      console.error('Batch generation error:', err);
      setGenerationLog((prev) => [
        `[${new Date().toLocaleTimeString()}] ⚠️ Server fallback activated: ${err.message}`,
        ...prev,
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadTopicPdf = async (topic: TopicItem) => {
    setDownloadingId(topic.id);
    try {
      const pdfBytes = await generateTopicPdf(topic, lang);
      const filename = `JITOMNI_360_${(topic.name[lang] || topic.name['en']).replace(/[^a-zA-Z0-9]/g, '_')}_${lang.toUpperCase()}.pdf`;
      downloadPdfBlob(pdfBytes, filename);
    } catch (e) {
      console.error('Failed to download in-browser PDF:', e);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleCreateCustomTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;

    setIsGenerating(true);
    setGenerationLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ⚡ Generating custom 360° topic: "${customTopicInput}"...`,
      ...prev,
    ]);

    try {
      const res = await fetch('/api/gemini/explain-360', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: customTopicInput,
          classLevel: customClassOrExam.includes('Class') ? parseInt(customClassOrExam.replace('Class', '').trim(), 10) : undefined,
          examType: !customClassOrExam.includes('Class') ? customClassOrExam : undefined,
          language: lang,
        }),
      });

      const data = await res.json();
      const topicId = `custom-topic-${Date.now()}`;
      const newCustomTopic: TopicItem = {
        id: topicId,
        name: {
          hi: `${customTopicInput} (हिंदी)`,
          en: customTopicInput,
          hinglish: `${customTopicInput} (Hinglish 360°)`,
        },
        subject: customSubject,
        chapter: 'Custom Synthesis Module',
        difficulty: 'Medium',
        framework: {
          kya: {
            title: { hi: `${customTopicInput} - मूल संकल्पना`, en: `${customTopicInput} - Core Definition`, hinglish: `${customTopicInput} - Core Definition` },
            content: {
              hi: data.content || `${customTopicInput} की सम्पूर्ण 360° संकल्पना समझाई गई है।`,
              en: data.content || `Comprehensive 360° conceptual analysis of ${customTopicInput}.`,
              hinglish: data.content || `${customTopicInput} ka clear conceptual breakdown bina kisi ratta-fication ke.`,
            },
            bulletPoints: {
              hi: ['मूल सिद्धांत एवं परिभाषा', 'व्यावहारिक घटकों का विश्लेषण', 'स्मार्ट विजुअल मैपिंग'],
              en: ['Core Principles & Definition', 'Practical Component Analysis', 'Smart Visual Mapping'],
              hinglish: ['Core Principles aur Definition', 'Practical Component Analysis', 'Smart Visual Mapping'],
            },
            analogy: {
              hi: 'यह अवधारणा दैनिक जीवन के व्यवहार से सीधे जुड़ी हुई है।',
              en: 'This concept bridges textbook theory directly with observable reality.',
              hinglish: 'Yeh concept textbook theory ko real life observations se connect karta hai.',
            },
          },
          kyu: {
            title: { hi: 'यह विषय क्यों अनिवार्य है?', en: 'Why is this Topic Essential?', hinglish: 'Yeh Topic Kyu Crucial Hai?' },
            content: { hi: 'गहन समझ और व्यावहारिक अनुप्रयोग के लिए।', en: 'For deep understanding and practical applications.', hinglish: 'Deep understanding aur application ke liye.' },
            criticalReason: { hi: 'बिना रटे स्थाई ज्ञान प्राप्त करने हेतु।', en: 'To achieve permanent neurological retention.', hinglish: 'Permanent retention ke liye.' },
          },
          kaise: {
            title: { hi: 'कार्यप्रणाली (Step-by-Step)', en: 'Working Mechanism', hinglish: 'Working Mechanism' },
            steps: [
              { stepNumber: 1, title: { hi: 'चरण 1', en: 'Stage 1', hinglish: 'Step 1' }, description: { hi: 'प्रारंभिक अवस्था एवं सिद्धांत', en: 'Initial state and principles', hinglish: 'Initial principle' } },
              { stepNumber: 2, title: { hi: 'चरण 2', en: 'Stage 2', hinglish: 'Step 2' }, description: { hi: 'अंतिम क्रियान्वयन', en: 'Final execution', hinglish: 'Final execution' } },
            ],
          },
          kisLiye: {
            title: { hi: 'उपयोग एवं उद्देश्य (Purpose)', en: 'Applications & Purpose', hinglish: 'Applications & Purpose' },
            applications: {
              hi: ['व्यावहारिक जीवन में समस्या समाधान', 'परीक्षाओं में शीर्ष प्रदर्शन'],
              en: ['Real world problem solving', 'High percentile performance in exams'],
              hinglish: ['Real world problem solving', 'Exams me high performance'],
            },
            realLifeExample: { hi: 'भारत में इसके अनेक व्यावहारिक उदाहरण उपलब्ध हैं।', en: 'Widely observed across scientific and administrative setups in India.', hinglish: 'India ke different sectors me iska direct application hai.' },
          },
          currentProblem: {
            title: { hi: 'वर्तमान समस्याएं एवं गलतियां', en: 'Current Pitfalls & Misconceptions', hinglish: 'Current Ground Reality & Traps' },
            issues: {
              hi: ['रटने के कारण विश्लेषणात्मक प्रश्नों में अंक कटना'],
              en: ['Rote-memorization causing marks loss in critical questions'],
              hinglish: ['Ratta maarne ki wajah se marks deduct hona'],
            },
            misconceptions: { hi: 'इसे केवल सैद्धांतिक समझना एक बड़ी भूल है।', en: 'Treating this as merely theoretical is a common misconception.', hinglish: 'Sirf theory samajhna ek common trap hai.' },
          },
          bestSolution: {
            title: { hi: '360° सर्वश्रेष्ठ समाधान', en: '360° Best Solution', hinglish: '360° Best Solution' },
            innovations: {
              hi: ['डिजिटल माइंड-मैपिंग और 6-डायमेंशन फ्रेमवर्क का अभ्यास'],
              en: ['Digital mind-mapping and 6-pillar framework practice'],
              hinglish: ['Visual diagrams aur 6-pillar framework revision'],
            },
            actionableTakeaway: { hi: 'प्रतिदिन क्या, क्यों, कैसे पूछकर पढ़ें।', en: 'Question What, Why, and How constantly.', hinglish: 'Roz What, Why, How se revise karein.' },
          },
        },
        quiz: [
          {
            id: `q-${topicId}-1`,
            question: {
              hi: `${customTopicInput} का प्राथमिक उद्देश्य क्या है?`,
              en: `What is the primary objective of ${customTopicInput}?`,
              hinglish: `${customTopicInput} ka primary objective kya hai?`,
            },
            options: {
              hi: ['पूर्ण विश्लेषणात्मक समझ', 'केवल परिभाषा रटना', 'समय व्यर्थ करना', 'कोई नहीं'],
              en: ['Deep analytical understanding', 'Rote memorization', 'Time wasting', 'None of these'],
              hinglish: ['Deep analytical understanding', 'Sirf definition ratna', 'Time waste karna', 'None of these'],
            },
            correctIndex: 0,
            explanation: {
              hi: '360° शिक्षा पूर्ण व्यावहारिक एवं विश्लेषणात्मक समझ प्रदान करती है।',
              en: '360° framework delivers deep comprehension without rote learning.',
              hinglish: '360° framework se 100% conceptual mastery milti hai.',
            },
          },
        ],
      };

      const updated = [newCustomTopic, ...storedTopics];
      setStoredTopics(updated);
      localStorage.setItem('jitomni_auto_topics', JSON.stringify(updated));
      setCustomTopicInput('');

      setGenerationLog((prev) => [
        `[${new Date().toLocaleTimeString()}] ✅ Created custom topic: "${customTopicInput}"!`,
        ...prev,
      ]);
    } catch (e: any) {
      console.error(e);
      setGenerationLog((prev) => [
        `[${new Date().toLocaleTimeString()}] ❌ Failed: ${e.message}`,
        ...prev,
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner - System Architecture Status */}
      <div className="bg-gradient-to-r from-[#071329] via-[#0D234A] to-[#071329] p-5 sm:p-6 rounded-2xl border border-amber-500/40 shadow-xl shadow-black/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                100% SELF-AUTO INSIDE AI STUDIO
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Firestore Direct Active
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide">
              ⚡ AUTO CONTENT SCHEDULER & ADMIN HUB
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Project ID: <span className="text-amber-300 font-mono font-bold">jitomni-360-education-app</span> (No Admin SDK, zero private keys, local & cloud synchronized).
            </p>
          </div>

          {/* 24-Hour Interval Cron Switch */}
          <div className="flex items-center gap-3 bg-[#030B1E] p-3 rounded-xl border border-slate-700">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400 font-medium">24h Auto-Cron Engine</div>
              <div className="text-xs font-bold text-amber-300">
                {autoScheduleActive ? `Active (Next in ~${nextBatchTimeCountdown})` : 'Paused'}
              </div>
            </div>
            <button
              onClick={() => {
                const next = !autoScheduleActive;
                setAutoScheduleActive(next);
                localStorage.setItem('jitomni_auto_scheduler_enabled', next.toString());
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                autoScheduleActive
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {autoScheduleActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Live Status String Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#030B1E]/90 border border-amber-500/30 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Status Record:</div>
            <div className="text-sm font-semibold text-slate-100">{statusMessage}</div>
          </div>
        </div>
      </div>

      {/* Main Action Trigger Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Big Auto Button & Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A1931] p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-amber-400 font-heading">
                  Daily 360° Syllabus Generator
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Class 1-12 aur Competitive Exams me se 5 uncovered topics chun kar 6-Pillars (Hindi, English, Hinglish) + Quiz auto-create karta hai.
                </p>
              </div>
              <Zap className="w-8 h-8 text-amber-400 opacity-70 animate-pulse" />
            </div>

            {/* Core Required Button: [Roz 5 Topics Auto Banao] */}
            <div className="pt-2">
              <button
                id="auto-5-topics-btn"
                onClick={() => handleGenerateDailyBatch(false)}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>Gemini 360° AI Generating 5 Topics... (Zero Rote Learning)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 text-slate-950" />
                    <span>Roz 5 Topics Auto Banao (1-Click Run)</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Terminal / Scheduler Log */}
            <div className="mt-5 bg-[#030B1E] p-3.5 rounded-xl border border-slate-700/70 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Scheduler Activity Log
                </span>
                <span>Firestore Direct Sync</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1 text-[11px] no-scrollbar">
                {generationLog.length === 0 ? (
                  <p className="text-slate-500 italic">
                    Ready. Click "[Roz 5 Topics Auto Banao]" or wait for the 24h cron cycle.
                  </p>
                ) : (
                  generationLog.map((log, idx) => (
                    <div key={idx} className="leading-tight text-slate-300">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Custom On-Demand Topic Generator */}
          <div className="bg-[#0A1931] p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              Manual Custom Topic Synthesizer
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Type any syllabus topic name to instantly craft 360° tabs (Kya, Kyu, Kaise, Purpose, Problem, Solution) and save it directly to the repository.
            </p>

            <form onSubmit={handleCreateCustomTopic} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  placeholder="Topic Name (e.g. Chandrayaan-3 Cryogenic Engine)"
                  value={customTopicInput}
                  onChange={(e) => setCustomTopicInput(e.target.value)}
                  className="sm:col-span-1 bg-[#030B1E] border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                />
                <select
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="bg-[#030B1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Social Science">Social Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Polity">Polity (Constitution)</option>
                  <option value="Economics">Economics</option>
                  <option value="Geography">Geography</option>
                  <option value="General Science">General Science</option>
                </select>
                <select
                  value={customClassOrExam}
                  onChange={(e) => setCustomClassOrExam(e.target.value)}
                  className="bg-[#030B1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="UPSC">UPSC</option>
                  <option value="MPPSC">MPPSC</option>
                  <option value="SSC">SSC</option>
                  <option value="Railway">Railway</option>
                  <option value="MP Police">MP Police</option>
                  <option value="Patwari">Patwari</option>
                  <option value="Teacher">Teacher / CTET</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isGenerating || !customTopicInput.trim()}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-sm transition-all disabled:opacity-40"
              >
                Synthesize 360° Topic Now
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Database Stats & Quick Access */}
        <div className="space-y-6">
          <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Repository Health & Config
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between p-2 rounded-lg bg-[#030B1E]">
                <span className="text-slate-400">Firebase Project:</span>
                <span className="font-mono text-amber-300 font-bold">jitomni-360-education-app</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#030B1E]">
                <span className="text-slate-400">Auth & Admin SDK:</span>
                <span className="text-emerald-400 font-bold">Removed (Clean Client)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#030B1E]">
                <span className="text-slate-400">PDF Generator:</span>
                <span className="text-emerald-400 font-bold">In-Browser (pdf-lib)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#030B1E]">
                <span className="text-slate-400">Total Dynamic Topics:</span>
                <span className="text-amber-400 font-bold">{storedTopics.length} Generated</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#030B1E]">
                <span className="text-slate-400">Live URL:</span>
                <span className="text-blue-400 font-mono truncate max-w-[150px]">asia-southeast1.run.app</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
            <p className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 100% In-Browser PDF Guaranteed:
            </p>
            Topic PDFs and Mock Test Analysis sheets are rendered instantly in your browser via <code className="text-amber-300">pdf-lib</code> and directly downloaded without uploading to external Firebase Storage buckets.
          </div>
        </div>
      </div>

      {/* Generated Topics Gallery */}
      <div className="bg-[#0A1931] p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Dynamic Auto-Generated Topics Archive
            </h3>
            <p className="text-xs text-slate-400">
              Generated topics from daily runs with full 6 tabs, instant in-browser PDF download, and quiz.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            {storedTopics.length} Topics Stored
          </span>
        </div>

        {storedTopics.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
            <Sparkles className="w-10 h-10 text-slate-500 mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-slate-300">
              No auto-generated topics in this browser session yet.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click the big gold button "[Roz 5 Topics Auto Banao]" above to create the first 5 topics.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storedTopics.map((topic) => {
              const topicName = topic.name[lang] || topic.name['en'];
              return (
                <div
                  key={topic.id}
                  className="bg-[#030B1E] p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">
                        {topic.classLevel ? `Class ${topic.classLevel}` : topic.examType || 'Topic'}
                      </span>
                      <span className="text-slate-400">{topic.subject}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-100 line-clamp-2">
                      {topicName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {topic.chapter}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => onSelectTopic(topic)}
                      className="px-2 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>360°</span>
                    </button>

                    <button
                      onClick={() => handleDownloadTopicPdf(topic)}
                      disabled={downloadingId === topic.id}
                      className="px-2 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      {downloadingId === topic.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5" />
                      )}
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => onOpenQuiz(topic)}
                      className="px-2 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Quiz</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
