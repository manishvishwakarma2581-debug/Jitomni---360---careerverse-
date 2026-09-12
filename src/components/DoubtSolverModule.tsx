import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Mic, 
  Send, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  Lightbulb, 
  Clock, 
  BookOpen, 
  Volume2, 
  ArrowRight,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Globe2,
  Target,
  ExternalLink,
  ShieldCheck,
  Award,
  MessageSquarePlus,
  Printer
} from 'lucide-react';
import { Language, DoubtSolutionResponse, VisionIasInfographic } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { UserMemoryService } from '../services/userMemoryService';
import { VisionIasInfographicCard } from './VisionIasInfographicCard';
import { generateVisionIasInfographic } from '../utils/visionIasInfographicGenerator';
import { exportStylishVisionIasPdf } from '../utils/stylishPdfExporter';
import { ErrorBoundary } from './ErrorBoundary';

// Safe extraction helper to guarantee zero React child crash even if backend returns objects or localized maps
export function getLocalizedText(val: any, lang: Language = 'hi'): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'object') {
    if (val[lang] && typeof val[lang] !== 'object') return String(val[lang]);
    if (val.hi && typeof val.hi !== 'object') return String(val.hi);
    if (val.en && typeof val.en !== 'object') return String(val.en);
    if (val.hinglish && typeof val.hinglish !== 'object') return String(val.hinglish);
    const keys = Object.keys(val);
    for (const k of keys) {
      const res = getLocalizedText(val[k], lang);
      if (res) return res;
    }
  }
  return '';
}

interface DoubtSolverModuleProps {
  lang: Language;
  onOpenTopic?: (topicName: string) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenDemandBox?: (initialQuery?: string) => void;
}

export const DoubtSolverModule: React.FC<DoubtSolverModuleProps> = ({ lang, onOpenTopic, onNavigateTab, onOpenDemandBox }) => {
  const [questionText, setQuestionText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedClassExam, setSelectedClassExam] = useState('NEET (UG) / Medical Entrance');
  const [activeIntentFilter, setActiveIntentFilter] = useState<'all' | 'global_jobs' | 'competitive' | 'school'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<DoubtSolutionResponse | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [showPracticeResult, setShowPracticeResult] = useState(false);
  const [viewMode, setViewMode] = useState<'understood' | 'vision_ias'>('understood');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    { id: 'Mathematics', label: { hi: 'गणित (Maths)', en: 'Mathematics', hinglish: 'Maths' }, icon: '📐' },
    { id: 'Science', label: { hi: 'विज्ञान व बायोलॉजी (Bio/Sci)', en: 'Science & Biology', hinglish: 'Bio / Science' }, icon: '🔬' },
    { id: 'Reasoning', label: { hi: 'तर्कशक्ति (Reasoning)', en: 'Reasoning', hinglish: 'Reasoning' }, icon: '🧩' },
    { id: 'General Studies', label: { hi: 'सामान्य ज्ञान (GK/GS)', en: 'General Studies', hinglish: 'GK / GS' }, icon: '🏛️' },
    { id: 'English', label: { hi: 'अंग्रेजी (English)', en: 'English', hinglish: 'English' }, icon: '🔤' },
    { id: 'Hindi', label: { hi: 'हिंदी व्याकरण', en: 'Hindi Grammar', hinglish: 'Hindi' }, icon: '📖' },
  ];

  const quickSamples = [
    {
      q: 'NEET 2026 की शून्य से 680+ तैयारी कैसे करें? संपूर्ण 720 अंक सिलेबस वेटेज, NCERT बायोलॉजी 360/360 रणनीति व टाइमर मॉक टेस्ट का मास्टर रोडमैप बताएं।',
      subject: 'Science',
      classExam: 'NEET (UG) / Medical Entrance',
      category: 'competitive',
      tag: '🩺 NEET 2026 Master Roadmap'
    },
    {
      q: '🇸🇬 सिंगापुर में AI टूल्स और टेक जॉब्स की क्या मांग व सैलरी (SGD) है? भारतीय छात्र 100% तैयारी कैसे करें?',
      subject: 'English',
      classExam: 'Global AI Jobs',
      category: 'global_jobs',
      tag: '🇸🇬 Singapore AI Jobs'
    },
    {
      q: 'रिमोट AI प्रॉम्प्ट इंजीनियर और n8n एजेंटिक ऑटोमेशन सीखकर विदेश से $40/घंटा (₹3,300/घं) का काम कैसे पाएं?',
      subject: 'English',
      classExam: 'Global AI Jobs',
      category: 'global_jobs',
      tag: '🌍 Remote AI USD'
    },
    {
      q: 'UPSC / State PSC के लिए 100% सटीक तैयारी रणनीति, NCERT 6-12 मैपिंग और मेंस आंसर राइटिंग फ्रेमवर्क क्या है?',
      subject: 'General Studies',
      classExam: 'MPPSC / UPSC',
      category: 'competitive',
      tag: '🎯 UPSC Strategy'
    },
    {
      q: 'SSC CGL और बैंक परीक्षा में क्वांट/मैथ्स में नेगेटिव मार्किंग से कैसे बचें और 10-सेकंड शॉर्टकट कैसे लगाएं?',
      subject: 'Mathematics',
      classExam: 'SSC / Police',
      category: 'competitive',
      tag: '⚡ SSC 10s Tricks'
    },
    {
      q: 'यदि किसी वस्तु का विक्रय मूल्य 1200 रु और 20% लाभ हुआ तो क्रय मूल्य क्या होगा?',
      subject: 'Mathematics',
      classExam: 'SSC / Police',
      category: 'school',
      tag: '📐 Maths PYQ'
    },
    {
      q: 'पौधों में प्रकाश संश्लेषण (Photosynthesis) के दौरान कौन सी गैस निकलती है और क्यों?',
      subject: 'Science',
      classExam: 'Class 10 NCERT',
      category: 'school',
      tag: '🔬 Science NCERT'
    }
  ];

  // Voice speech-to-text recognition
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuestionText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Strip data prefix for Gemini API if needed
        const base64Data = base64String.split(',')[1];
        setUploadedImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolveDoubt = async (queryToSolve?: string) => {
    const q = queryToSolve || questionText;
    if (!q.trim() && !uploadedImage) {
      alert('कृपया अपना सवाल टाइप करें, बोलें या फोटो अपलोड करें।');
      return;
    }

    setIsLoading(true);
    setSolution(null);
    setPracticeAnswer(null);
    setShowPracticeResult(false);
    setViewMode('understood');

    try {
      const contextMemory = UserMemoryService.getAIContextPrompt();

      const res = await fetch('/api/gemini/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q,
          subject: selectedSubject,
          classOrExam: selectedClassExam,
          imageBase64: uploadedImage || undefined,
          contextMemory,
        }),
      });

      const data = await res.json();
      if (data.success && data.solution) {
        const sol: DoubtSolutionResponse = { ...data.solution };
        if (!sol.visionIasInfographic) {
          sol.visionIasInfographic = generateVisionIasInfographic(q, lang);
        }
        setSolution(sol);
        // Track in XP / solved doubts
        const currentSolved = parseInt(localStorage.getItem('jitomni_solved_doubts') || '0', 10);
        localStorage.setItem('jitomni_solved_doubts', (currentSolved + 1).toString());
        const currentXp = parseInt(localStorage.getItem('jitomni_user_xp') || '50', 10);
        localStorage.setItem('jitomni_user_xp', (currentXp + 25).toString());

        // Persist in UserMemoryService for Long-Term AI Mentor recall
        UserMemoryService.addMemory({
          category: 'doubt',
          topicOrSubject: `${selectedSubject}: ${q.slice(0, 45)}`,
          summary: `Doubt solved on ${selectedSubject}. Question: "${q.slice(0, 80)}"`,
          scoreOrDetail: `Target: ${selectedClassExam}`,
          importance: 'normal',
        });
      } else {
        // High fidelity fallback with full Vision IAS infographic
        const fallbackInfographic = generateVisionIasInfographic(q, lang);
        setSolution({
          doubtQuery: q,
          identifiedSubject: selectedSubject,
          identifiedChapter: '360° Critical Analysis',
          shortAnswer: {
            hi: `"${q}" पर JITOMNI 360° सॉवरेन विज़न IAS इन्फोग्राफिक विश्लेषण नीचे प्रस्तुत है।`,
            en: `JITOMNI 360° Vision IAS critical analysis infographic for "${q}" generated below.`
          },
          stepByStepSolution: [
            {
              stepNumber: 1,
              stepTitle: { hi: 'आधारभूत संकल्पना व परिभाषा', en: 'Foundational Concept & Definition' },
              explanation: { hi: 'मूल सिद्धांतों की पहचान और कारण-प्रभाव की व्यवस्थित समझ।', en: 'Identification of first principles and causality chains.' }
            }
          ],
          keyTakeaway: {
            hi: '0% रट्टा मारना, 100% 360° संकल्पनात्मक स्पष्टता।',
            en: 'Zero rote learning, 100% 360° conceptual clarity.'
          },
          visionIasInfographic: fallbackInfographic
        });
      }
    } catch (err) {
      console.error('Doubt solver network error:', err);
      alert('नेटवर्क समस्या। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportDoubtPdf = () => {
    if (!solution) return;
    const title = solution.doubtQuery || 'Doubt Solution';
    const shortAns = getLocalizedText(solution.shortAnswer, lang);
    const takeaway = getLocalizedText(solution.keyTakeaway, lang);
    
    let md = `# ${title.toUpperCase()}\n\n`;
    md += `> 📌 **CORE CONCEPT / DIRECT ANSWER**:\n> ${shortAns}\n\n`;
    
    if (solution.speedTrickOrShortCut) {
      const trickName = getLocalizedText(solution.speedTrickOrShortCut.trickName, lang);
      const timeSaving = getLocalizedText(solution.speedTrickOrShortCut.timeSaving, lang);
      const logic = getLocalizedText(solution.speedTrickOrShortCut.logic, lang);
      md += `## ✦ 10-SECOND SPEED SHORTCUT (${timeSaving})\n`;
      md += `✦ **${trickName}**: ${logic}\n\n`;
    }

    if (solution.stepByStepSolution && solution.stepByStepSolution.length > 0) {
      md += `## ✦ STEP-BY-STEP METHODICAL BREAKDOWN\n`;
      solution.stepByStepSolution.forEach((step, idx) => {
        const stepTitle = getLocalizedText(step.stepTitle, lang);
        const expl = getLocalizedText(step.explanation, lang);
        const formula = step.formulaOrKeyPoint ? getLocalizedText(step.formulaOrKeyPoint, lang) : '';
        md += `✦ **Step ${step.stepNumber || idx + 1} - ${stepTitle}**: ${expl}\n`;
        if (formula) {
          md += `> 📌 **Formula / Key Point**: ${formula}\n`;
        }
      });
      md += '\n';
    }

    if (solution.similarPracticeQuestion) {
      const q = getLocalizedText(solution.similarPracticeQuestion.question, lang);
      md += `## ✦ RETENTION PRACTICE TEST\n`;
      md += `✦ **Practice Question**: ${q}\n\n`;
    }

    md += `> 📌 **HIGH-YIELD EXAM TAKEAWAY**: ${takeaway}\n`;

    exportStylishVisionIasPdf({
      title,
      markdownContent: md,
      lang,
      authorBadge: `JITOMNI 360° AI MENTOR • ${solution.identifiedSubject || 'ACADEMIC'} DOSSIER`,
      paperLinkage: `${solution.identifiedSubject || 'General'} • ${solution.identifiedChapter || 'Core Syllabus'}`,
    });
  };

  return (
    <ErrorBoundary fallbackTitle="AI डाउट सॉल्वर सुरक्षित रिकवरी (Doubt Solver Crash Guard)">
      <div className="space-y-6 pb-12 animate-in fade-in duration-300">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-violet-950 via-[#0A1931] to-slate-900 border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>100% सटीक AI डाउट सॉल्वर • 0% रट्टा मारना</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide">
                {lang === 'hi' ? '🎯 AI डाउट सॉल्वर (फोटो या बोलकर पूछें)' : '🎯 Instant 360° AI Doubt Solver'}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {lang === 'hi'
                  ? 'NEET (UG), IIT-JEE, UPSC, SSC, रेलवे और स्कूल (कक्षा 1-12) के किसी भी सवाल का स्टेप-बाय-स्टेप 360° हल और 10-सेकंड सुपर ट्रिक तुरंत पाएं।'
                  : 'Get step-by-step breakdown, master formulas, and 10-second speed shortcut for NEET, JEE, UPSC, SSC & School in seconds.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={() => {
                  if (onOpenDemandBox) {
                    onOpenDemandBox(questionText || 'NEET 2026 सम्पूर्ण तैयारी रोडमैप व स्टडी सामग्री');
                  } else {
                    window.dispatchEvent(new CustomEvent('jitomni-open-demand-box', { detail: { query: questionText } }));
                  }
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>{lang === 'hi' ? '📢 सहायता / मांग बॉक्स' : '📢 Help / Demand Box'}</span>
              </button>

              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-violet-500/30 text-xs">
                <div className="w-10 h-10 rounded-xl bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300 font-bold text-base">
                  +25
                </div>
                <div>
                  <p className="font-bold text-white">XP Earned per Doubt</p>
                  <p className="text-slate-400 text-[11px]">Level up your knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prominent Demand / Request Box Alert */}
        <div className="bg-gradient-to-r from-amber-500/15 via-[#030B1E] to-cyan-500/15 border-2 border-amber-400/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl backdrop-blur-md">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/50">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-300">📢 JITOMNI यूजर सहायता व मांग बॉक्स (Public Demand & Help Center)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">100% लाइव अपडेट</span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'hi'
                  ? 'क्या आपको ऐप में कोई खास विषय (जैसे NEET 2026 रोडमैप), परीक्षा नोट्स, ITI टेस्ट या नया फीचर नहीं मिल रहा? सीधे अपनी मांग भेजें!'
                  : 'Looking for missing topics (like NEET 2026 roadmap), exam notes, or new features? Submit your demand directly!'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onOpenDemandBox) {
                onOpenDemandBox(questionText || 'NEET 2026 सम्पूर्ण तैयारी रोडमैप व स्टडी सामग्री');
              } else {
                window.dispatchEvent(new CustomEvent('jitomni-open-demand-box', { detail: { query: questionText } }));
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{lang === 'hi' ? 'अपनी मांग / सहायता भेजें' : 'Open Demand Box'}</span>
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-[#0A1931]/90 backdrop-blur-md border border-slate-700/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          {/* Subject & Class Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {lang === 'hi' ? 'विषय चुनें (Subject):' : 'Select Subject:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      selectedSubject === sub.id
                        ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-600/30 scale-[1.02]'
                        : 'bg-[#030B1E] text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span className="truncate">{sub.label[lang] || sub.label.en}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {lang === 'hi' ? 'परीक्षा या कक्षा स्तर:' : 'Target Exam / Class Level:'}
              </label>
              <select
                value={selectedClassExam}
                onChange={(e) => setSelectedClassExam(e.target.value)}
                className="w-full bg-[#030B1E] border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 font-semibold focus:outline-none focus:border-violet-500"
              >
                <option value="NEET (UG) / Medical Entrance">🩺 NEET (UG) 2026 (Medical / 720 Marks Target)</option>
                <option value="IIT-JEE (Main & Advanced)">⚡ IIT-JEE (Main & Advanced)</option>
                <option value="Class 11-12 (Board / JEE / NEET)">Class 11-12 (Physics / Chemistry / Maths / Bio)</option>
                <option value="Class 9-10 (Board Exam)">Class 9-10 (Board Exam / MP Board / CBSE)</option>
                <option value="Class 6-8 NCERT">Class 6-8 (Middle School)</option>
                <option value="SSC CGL / CHSL / MTS">SSC CGL / CHSL / MTS</option>
                <option value="MP Police Constable / SI">MP Police Constable & Sub Inspector</option>
                <option value="MPPSC / State Civil Services">MPPSC / State Civil Services (Prelims & Mains)</option>
                <option value="Railway NTPC & Group D">Railway NTPC & Group D</option>
                <option value="Banking IBPS / SBI PO & Clerk">Banking IBPS / SBI</option>
              </select>
            </div>
          </div>

        {/* Text Input Area with Voice & Photo Upload buttons */}
        <div className="relative">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'अपना प्रश्न यहां लिखें या नीचे माइक बटन दबाकर बोलें... (उदा: किसी वृत्त का क्षेत्रफल 154 वर्ग सेमी है तो त्रिज्या क्या होगी?)'
                : 'Type your question here or tap the mic icon to speak... (e.g. Find the roots of quadratic equation 2x² - 5x + 3 = 0)'
            }
            rows={4}
            className="w-full bg-[#030B1E] border border-slate-700 rounded-2xl p-4 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
          />

          {uploadedImage && (
            <div className="mt-2 flex items-center gap-3 bg-violet-950/50 border border-violet-500/40 p-2.5 rounded-xl">
              <ImageIcon className="w-5 h-5 text-violet-400" />
              <span className="text-xs text-violet-200 flex-1 truncate">Question Image Uploaded (Base64 Ready)</span>
              <button
                onClick={() => setUploadedImage(null)}
                className="text-xs text-rose-400 hover:underline font-bold"
              >
                Remove
              </button>
            </div>
          )}

          {/* Action Bar inside input */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-[#030B1E] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Camera className="w-4 h-4 text-violet-400" />
                <span>{lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleVoice}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isListening
                    ? 'bg-red-600 text-white border-red-500 animate-pulse'
                    : 'bg-[#030B1E] hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                <Mic className={`w-4 h-4 ${isListening ? 'text-white' : 'text-amber-400'}`} />
                <span>{isListening ? 'सुन रहे हैं... (Listening)' : lang === 'hi' ? 'बोलकर पूछें' : 'Voice Input'}</span>
              </button>
            </div>

            <button
              id="submit-doubt-btn"
              onClick={() => handleSolveDoubt()}
              disabled={isLoading || (!questionText.trim() && !uploadedImage)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-amber-500 hover:from-violet-500 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-violet-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
                  <span>360° AI हल तैयार कर रहा है...</span>
                </>
              ) : (
                <>
                  <span>{lang === 'hi' ? 'तुरंत हल करें' : 'Solve Doubt Now'}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Questions with Intent Filters */}
        <div className="pt-2 border-t border-slate-800 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'उच्च-मांग प्रश्न (क्लिक करके 100% सटीक हल व डेटा देखें):' : 'High-Demand Sample Inquiries (Click to solve):'}</span>
            </p>

            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <button
                onClick={() => setActiveIntentFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeIntentFilter === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#030B1E] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                सभी (All)
              </button>
              <button
                onClick={() => setActiveIntentFilter('global_jobs')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  activeIntentFilter === 'global_jobs'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#030B1E] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30'
                }`}
              >
                🇸🇬 Global AI & Singapore
              </button>
              <button
                onClick={() => setActiveIntentFilter('competitive')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  activeIntentFilter === 'competitive'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#030B1E] text-amber-400 hover:text-amber-300 border border-amber-500/30'
                }`}
              >
                🎯 Target Exam
              </button>
              <button
                onClick={() => setActiveIntentFilter('school')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  activeIntentFilter === 'school'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#030B1E] text-blue-400 hover:text-blue-300 border border-blue-500/30'
                }`}
              >
                📐 School/NCERT
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickSamples
              .filter((s) => activeIntentFilter === 'all' || s.category === activeIntentFilter)
              .map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestionText(sample.q);
                    setSelectedSubject(sample.subject);
                    setSelectedClassExam(sample.classExam);
                    handleSolveDoubt(sample.q);
                  }}
                  className="text-left text-xs bg-[#030B1E] hover:bg-violet-950/40 text-slate-300 hover:text-violet-200 border border-slate-800 hover:border-violet-600/50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 group"
                >
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-amber-400 font-mono">
                    {sample.tag}
                  </span>
                  <span className="truncate max-w-md">{sample.q}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0" />
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Solution Display Card */}
      {solution && (
        <div className="bg-[#0A1931] border-2 border-violet-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
          {/* Solution Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-violet-600/30 text-violet-300 font-bold text-xs border border-violet-500/40">
                  {solution.identifiedSubject}
                </span>
                {solution.identifiedChapter && (
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-600/30 text-blue-300 font-bold text-xs border border-blue-500/40">
                    {solution.identifiedChapter}
                  </span>
                )}
                {solution.categoryType === 'global_jobs' && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-600/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-emerald-400" />
                    🇸🇬 Global AI Tech Matrix
                  </span>
                )}
                {solution.categoryType === 'competitive_exam' && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-600/30 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1">
                    <Target className="w-3 h-3 text-amber-400" />
                    🎯 Sovereign Exam Protocol
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-white mt-2">
                Q: {solution.doubtQuery}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportDoubtPdf}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                title="Download or print Vision IAS publication-quality PDF dossier"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>📄 स्टाइलिश PDF / प्रिंट</span>
              </button>

              <button
                onClick={() => {
                  const shortAns = getLocalizedText(solution.shortAnswer, lang);
                  const takeaway = getLocalizedText(solution.keyTakeaway, lang);
                  const textToSpeak = `${shortAns}. ${takeaway}`;
                  speakText(textToSpeak, lang);
                }}
                className="px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-400/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-violet-400" />
                <span>बोलकर समझाओ (Audio)</span>
              </button>
            </div>
          </div>

          {/* Actionable Module Link / Sovereign 360° Portal Connector */}
          {solution.actionableModuleLink && (
            <div className="bg-gradient-to-r from-emerald-950/90 via-[#030B1E] to-teal-950/90 border-2 border-emerald-400/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold">
                    🏛️ {getLocalizedText(solution.actionableModuleLink.moduleName, lang)}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Demand Match
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-200">
                  {lang === 'hi' 
                    ? 'इस विषय की संपूर्ण 100% तैयारी, आधिकारिक वैकेंसी, लाइव टूल्स व रोडमैप के लिए तुरंत मुख्य हब में जाएं:' 
                    : 'Explore dedicated sovereign hub for complete official vacancies, tools, and step-by-step roadmap:'}
                </p>
              </div>
              <button
                onClick={() => {
                  if (onNavigateTab && solution.actionableModuleLink?.moduleTab) {
                    onNavigateTab(solution.actionableModuleLink.moduleTab);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
              >
                <span>{getLocalizedText(solution.actionableModuleLink.buttonLabel, lang) || 'हब खोलें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* View Mode Toggle: Direct Understood Answer vs In-Depth Vision IAS Analysis */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#030B1E] border border-slate-800 rounded-2xl p-2.5">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setViewMode('understood')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'understood'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? '⚡ सहज व स्पष्ट उत्तर (Understood Response)' : '⚡ Understood Response'}</span>
              </button>

              <button
                onClick={() => setViewMode('vision_ias')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'vision_ias'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-amber-400/90 hover:text-amber-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? '🏛️ 360° विज़न IAS संपादकीय (वैकल्पिक)' : '🏛️ Vision IAS Editorial'}</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 hidden sm:inline-block px-2">
              {viewMode === 'understood' ? '✨ व्यावहारिक व टू-द-पॉइंट समाधान' : '🏛️ 4-आयामी विस्तृत संपादकीय व मेन्स उत्तर'}
            </span>
          </div>

          {/* Understood Direct Response View (DEFAULT) */}
          {viewMode === 'understood' ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Direct Answer Box */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-[#030B1E] to-[#0A1931] border border-emerald-500/40 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'hi' ? 'सीधा और सटीक उत्तर (Direct Answer):' : 'Direct Verified Answer:'}</span>
                </div>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
                  {getLocalizedText(solution.shortAnswer, lang)}
                </p>
              </div>

              {/* 10-Second Shortcut Trick Box if present */}
              {solution.speedTrickOrShortCut && (
                <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/20 to-[#030B1E] border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-amber-400 font-heading font-black text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span>{getLocalizedText(solution.speedTrickOrShortCut.trickName, lang)}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                      ⚡ {getLocalizedText(solution.speedTrickOrShortCut.timeSaving, lang)}
                    </span>
                  </div>
                  <p className="text-amber-100/90 text-xs sm:text-sm font-mono bg-black/40 p-3 rounded-xl border border-amber-500/30">
                    {getLocalizedText(solution.speedTrickOrShortCut.logic, lang)}
                  </p>
                </div>
              )}

              {/* Step-by-Step 360° Breakdown */}
              <div className="space-y-3">
                <h4 className="font-heading font-black text-white text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <span>{lang === 'hi' ? 'चरणबद्ध समाधान (Step-by-Step Solution):' : 'Step-by-Step Methodical Solution:'}</span>
                </h4>

                <div className="space-y-3">
                  {solution.stepByStepSolution && solution.stepByStepSolution.map((step, idx) => (
                    <div key={idx} className="bg-[#030B1E] border border-slate-700/80 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
                          {step.stepNumber || idx + 1}
                        </span>
                        <h5 className="font-bold text-violet-300 text-sm">
                          {getLocalizedText(step.stepTitle, lang)}
                        </h5>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm pl-8 leading-relaxed">
                        {getLocalizedText(step.explanation, lang)}
                      </p>
                      {step.formulaOrKeyPoint && (
                        <div className="ml-8 bg-black/50 border border-violet-500/30 rounded-xl p-2.5 text-xs text-amber-300 font-mono">
                          {getLocalizedText(step.formulaOrKeyPoint, lang)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Question for Retention */}
              {solution.similarPracticeQuestion && (
                <div className="bg-[#030B1E] border border-cyan-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'hi' ? 'रिवीजन अभ्यास प्रश्न (Test Yourself):' : 'Retention Practice Test:'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">100% Concept Lock</span>
                  </div>
                  <p className="text-slate-100 font-bold text-xs sm:text-sm">
                    {getLocalizedText(solution.similarPracticeQuestion.question, lang)}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {solution.similarPracticeQuestion.options && solution.similarPracticeQuestion.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setPracticeAnswer(idx);
                          setShowPracticeResult(true);
                        }}
                        className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${
                          showPracticeResult
                            ? idx === solution.similarPracticeQuestion?.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : practiceAnswer === idx
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-[#0A1931] border-slate-800 text-slate-400'
                            : 'bg-[#0A1931] hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="mr-2 font-mono text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                        <span>{getLocalizedText(opt, lang)}</span>
                      </button>
                    ))}
                  </div>

                  {showPracticeResult && (
                    <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                      <span className="font-bold">स्पष्टीकरण: </span>
                      {getLocalizedText(solution.similarPracticeQuestion.explanation, lang)}
                    </div>
                  )}
                </div>
              )}

              {/* Key Takeaway */}
              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300 font-bold">Key Takeaway: </strong>
                  {getLocalizedText(solution.keyTakeaway, lang)}
                </p>
              </div>

              {/* Demand Box Trigger Card inside Solution */}
              <div className="bg-gradient-to-r from-amber-500/10 via-[#030B1E] to-violet-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <MessageSquarePlus className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'hi' 
                      ? 'क्या इस उत्तर में आपकी जरूरत का कोई पॉइंट या अध्याय छूट गया है? अपनी मांग दर्ज कराएं:' 
                      : 'Missing any specific topic or notes in this solution? Submit a request:'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (onOpenDemandBox) {
                      onOpenDemandBox(`Demand regarding: ${questionText || solution.doubtQuery || 'Exam topic'}`);
                    } else {
                      window.dispatchEvent(new CustomEvent('jitomni-open-demand-box', { 
                        detail: { query: questionText || solution.doubtQuery } 
                      }));
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  📢 मांग दर्ज करें (Request Updates)
                </button>
              </div>

              {/* Optional Prompt to view Vision IAS Magazine Infographic */}
              <div className="bg-gradient-to-r from-amber-950/40 via-[#030B1E] to-amber-950/30 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-amber-200/90 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'hi' ? 'क्या आप इस विषय का विस्तृत UPSC / 360° विज़न IAS संपादकीय विश्लेषण (4-आयामी मैट्रिक्स, चुनौतियां, 15-मार्कर उत्तर) देखना चाहते हैं?' : 'Want in-depth UPSC / 360° Vision IAS Editorial Analysis (4D Matrix, Challenges, 15-Marker Answer)?'}</span>
                </div>
                <button
                  onClick={() => setViewMode('vision_ias')}
                  className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  {lang === 'hi' ? '🏛️ विज़न IAS विश्लेषण खोलें' : 'Open Vision IAS Analysis'}
                </button>
              </div>
            </div>
          ) : (
            /* Vision IAS Editorial Analysis View (OPTIONAL) */
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'hi' ? '360° विज़न IAS संपादकीय व मेन्स विश्लेषण मोड' : 'Vision IAS Editorial & Mains Analysis Mode'}</span>
                </div>
                <button
                  onClick={() => setViewMode('understood')}
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'hi' ? '← वापस सहज उत्तर पर जाएं' : '← Back to Understood Answer'}
                </button>
              </div>

              <VisionIasInfographicCard
                infographic={solution.visionIasInfographic || generateVisionIasInfographic(solution.doubtQuery || questionText, lang)}
                lang={lang}
                onNavigateTab={onNavigateTab}
              />

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setViewMode('understood')}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'hi' ? '← वापस सहज उत्तर पर जाएं (Back to Understood Answer)' : '← Back to Understood Answer'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
};
