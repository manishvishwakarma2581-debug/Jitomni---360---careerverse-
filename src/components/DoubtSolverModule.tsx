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
  RotateCcw
} from 'lucide-react';
import { Language, DoubtSolutionResponse } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface DoubtSolverModuleProps {
  lang: Language;
  onOpenTopic?: (topicName: string) => void;
}

export const DoubtSolverModule: React.FC<DoubtSolverModuleProps> = ({ lang, onOpenTopic }) => {
  const [questionText, setQuestionText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedClassExam, setSelectedClassExam] = useState('Class 10 / SSC');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<DoubtSolutionResponse | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [showPracticeResult, setShowPracticeResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    { id: 'Mathematics', label: { hi: 'गणित (Maths)', en: 'Mathematics', hinglish: 'Maths' }, icon: '📐' },
    { id: 'Science', label: { hi: 'विज्ञान (Science)', en: 'Science', hinglish: 'Science' }, icon: '🔬' },
    { id: 'Reasoning', label: { hi: 'तर्कशक्ति (Reasoning)', en: 'Reasoning', hinglish: 'Reasoning' }, icon: '🧩' },
    { id: 'General Studies', label: { hi: 'सामान्य ज्ञान (GK/GS)', en: 'General Studies', hinglish: 'GK / GS' }, icon: '🏛️' },
    { id: 'English', label: { hi: 'अंग्रेजी (English)', en: 'English', hinglish: 'English' }, icon: '🔤' },
    { id: 'Hindi', label: { hi: 'हिंदी व्याकरण', en: 'Hindi Grammar', hinglish: 'Hindi' }, icon: '📖' },
  ];

  const quickSamples = [
    {
      q: 'यदि किसी वस्तु का विक्रय मूल्य 1200 रु और 20% लाभ हुआ तो क्रय मूल्य क्या होगा?',
      subject: 'Mathematics',
      classExam: 'SSC / Police'
    },
    {
      q: 'पौधों में प्रकाश संश्लेषण (Photosynthesis) के दौरान कौन सी गैस निकलती है और क्यों?',
      subject: 'Science',
      classExam: 'Class 10 NCERT'
    },
    {
      q: 'भारतीय संविधान में मौलिक अधिकार किस अनुच्छेद (Articles) में वर्णित हैं?',
      subject: 'General Studies',
      classExam: 'MPPSC / UPSC'
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

    try {
      const res = await fetch('/api/gemini/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q,
          subject: selectedSubject,
          classOrExam: selectedClassExam,
          imageBase64: uploadedImage || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.solution) {
        setSolution(data.solution);
        // Track in XP / solved doubts
        const currentSolved = parseInt(localStorage.getItem('jitomni_solved_doubts') || '0', 10);
        localStorage.setItem('jitomni_solved_doubts', (currentSolved + 1).toString());
        const currentXp = parseInt(localStorage.getItem('jitomni_user_xp') || '50', 10);
        localStorage.setItem('jitomni_user_xp', (currentXp + 25).toString());
      } else {
        alert('डाउट हल करने में समस्या आई। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      console.error('Doubt solver network error:', err);
      alert('नेटवर्क समस्या। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                ? 'कक्षा 1-12 व MPPSC/SSC/Police के किसी भी कठिन सवाल का स्टेप-बाय-स्टेप 360° हल और 10-सेकंड सुपर ट्रिक तुरंत पाएं।'
                : 'Get step-by-step breakdown, master formulas, and 10-second speed shortcut for any question in seconds.'}
            </p>
          </div>

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
              <option value="Class 6-8 NCERT">Class 6-8 (Middle School)</option>
              <option value="Class 9-10 (Board Exam)">Class 9-10 (Board Exam / MP Board / CBSE)</option>
              <option value="Class 11-12 (Board / JEE / NEET)">Class 11-12 (Physics / Chemistry / Maths / Bio)</option>
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

        {/* Quick Sample Questions */}
        <div className="pt-2 border-t border-slate-800">
          <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'उदाहरण प्रश्न (क्लिक करके हल देखें):' : 'Try Quick Sample Doubt Questions:'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestionText(sample.q);
                  setSelectedSubject(sample.subject);
                  handleSolveDoubt(sample.q);
                }}
                className="text-left text-xs bg-[#030B1E] hover:bg-violet-950/40 text-slate-300 hover:text-violet-200 border border-slate-800 hover:border-violet-600/50 px-3 py-1.5 rounded-xl transition-all"
              >
                {sample.q}
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
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-white mt-2">
                Q: {solution.doubtQuery}
              </h3>
            </div>

            <button
              onClick={() => {
                const textToSpeak = `${solution.shortAnswer[lang] || solution.shortAnswer.hi}. ${solution.keyTakeaway[lang] || solution.keyTakeaway.hi}`;
                speakText(textToSpeak, lang);
              }}
              className="px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-400/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4 text-violet-400" />
              <span>बोलकर समझाओ (Audio)</span>
            </button>
          </div>

          {/* Direct Answer Box */}
          <div className="bg-gradient-to-br from-emerald-950/60 via-[#030B1E] to-[#0A1931] border border-emerald-500/40 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'hi' ? 'सीधा और सटीक उत्तर (Direct Answer):' : 'Direct Verified Answer:'}</span>
            </div>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
              {solution.shortAnswer[lang] || solution.shortAnswer.hi || solution.shortAnswer.en}
            </p>
          </div>

          {/* 10-Second Shortcut Trick Box if present */}
          {solution.speedTrickOrShortCut && (
            <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/20 to-[#030B1E] border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-amber-400 font-heading font-black text-sm sm:text-base">
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>{solution.speedTrickOrShortCut.trickName[lang] || solution.speedTrickOrShortCut.trickName.hi}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  ⚡ {solution.speedTrickOrShortCut.timeSaving}
                </span>
              </div>
              <p className="text-amber-100/90 text-xs sm:text-sm font-mono bg-black/40 p-3 rounded-xl border border-amber-500/30">
                {solution.speedTrickOrShortCut.logic}
              </p>
            </div>
          )}

          {/* Step-by-Step 360° Breakdown */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>{lang === 'hi' ? 'चरणबद्ध समाधान (Step-by-Step 360° Solution):' : 'Step-by-Step Methodical Solution:'}</span>
            </h4>

            <div className="space-y-3">
              {solution.stepByStepSolution.map((step, idx) => (
                <div key={idx} className="bg-[#030B1E] border border-slate-700/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <h5 className="font-bold text-violet-300 text-sm">
                      {step.stepTitle[lang] || step.stepTitle.hi || step.stepTitle.en}
                    </h5>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm pl-8 leading-relaxed">
                    {step.explanation[lang] || step.explanation.hi || step.explanation.en}
                  </p>
                  {step.formulaOrKeyPoint && (
                    <div className="ml-8 bg-black/50 border border-violet-500/30 rounded-xl p-2.5 text-xs text-amber-300 font-mono">
                      {step.formulaOrKeyPoint}
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
                {solution.similarPracticeQuestion.question[lang] || solution.similarPracticeQuestion.question.hi}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {solution.similarPracticeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPracticeAnswer(idx);
                      setShowPracticeResult(true);
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${
                      showPracticeResult
                        ? idx === solution.similarPracticeQuestion.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : practiceAnswer === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-[#0A1931] border-slate-800 text-slate-400'
                        : 'bg-[#0A1931] hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="mr-2 font-mono text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {showPracticeResult && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                  <span className="font-bold">स्पष्टीकरण: </span>
                  {solution.similarPracticeQuestion.explanation[lang] || solution.similarPracticeQuestion.explanation.hi}
                </div>
              )}
            </div>
          )}

          {/* Key Takeaway */}
          <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 font-bold">Key Takeaway: </strong>
              {solution.keyTakeaway[lang] || solution.keyTakeaway.hi || solution.keyTakeaway.en}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
