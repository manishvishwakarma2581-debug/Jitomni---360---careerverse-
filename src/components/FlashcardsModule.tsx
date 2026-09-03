import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle, 
  Flame, 
  Trophy, 
  BookOpen, 
  Zap, 
  Volume2, 
  Clock, 
  Layers, 
  Check, 
  X, 
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { Language, FlashcardItem, UserGamificationProfile } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface FlashcardsModuleProps {
  lang: Language;
  onOpenTopic?: (topicName: string) => void;
}

export const FlashcardsModule: React.FC<FlashcardsModuleProps> = ({ lang, onOpenTopic }) => {
  const [subject, setSubject] = useState('Mathematics');
  const [topicName, setTopicName] = useState('त्रिकोणमिति व सूत्र (Trigonometry)');
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Gamification stats
  const [userProfile, setUserProfile] = useState<UserGamificationProfile>({
    totalXp: 120,
    currentStreakDays: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    solvedDoubtsCount: 4,
    completedQuizzesCount: 6,
    masteredFlashcardsCount: 8,
    rankBadge: 'Scholar Titan',
    weakTopics: [
      { topicName: 'Quadratic Equations', subject: 'Maths', accuracyPercent: 55, recommendedAction: 'Revise 10-Second Shortcut' },
      { topicName: 'Indian Constitution Articles', subject: 'Polity', accuracyPercent: 62, recommendedAction: 'Review Timeline Mnemonic' },
      { topicName: 'Optics & Lenses', subject: 'Physics', accuracyPercent: 68, recommendedAction: 'Inspect Ray Diagram' }
    ]
  });

  const presetTopics = [
    { subject: 'Mathematics', topic: 'त्रिकोणमिति व सूत्र (Trigonometry)' },
    { subject: 'Mathematics', topic: 'प्रतिशत और लाभ-हानि (Profit & Loss Speed Tricks)' },
    { subject: 'Science', topic: 'प्रकाश का परावर्तन और अपवर्तन (Optics Laws)' },
    { subject: 'Science', topic: 'मानव पाचन तंत्र (Digestive System Enzyme Table)' },
    { subject: 'General Studies', topic: 'भारतीय संविधान के महत्वपूर्ण अनुच्छेद (Polity Articles)' },
    { subject: 'Reasoning', topic: 'दिशा और दूरी (Direction & Distance Shortcuts)' },
  ];

  useEffect(() => {
    // Load local storage gamification stats
    const savedXp = parseInt(localStorage.getItem('jitomni_user_xp') || '120', 10);
    const savedDoubts = parseInt(localStorage.getItem('jitomni_solved_doubts') || '4', 10);
    setUserProfile((prev) => ({
      ...prev,
      totalXp: savedXp,
      solvedDoubtsCount: savedDoubts
    }));

    // Auto-generate initial deck
    handleFetchCards('Mathematics', 'त्रिकोणमिति व सूत्र (Trigonometry)');
  }, []);

  const handleFetchCards = async (sub: string, top: string) => {
    setIsLoading(true);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const res = await fetch('/api/gemini/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicOrChapter: top,
          subject: sub,
          classOrExam: 'Class 10 / SSC',
          count: 6
        })
      });

      const data = await res.json();
      if (data.success && data.flashcards && data.flashcards.length > 0) {
        setFlashcards(data.flashcards);
      } else {
        // Fallback card set
        setFlashcards([
          {
            id: 'fc-1',
            category: sub,
            subCategory: top,
            front: {
              title: { hi: 'sin²θ + cos²θ = ?', en: 'Fundamental Identity 1', hinglish: 'Fundamental Identity 1' },
              typeBadge: 'Formula',
              clueOrContext: { hi: 'सबसे बुनियादी और आवश्यक त्रिकोणमितीय सर्वसमिका', en: 'Core identity used in 80% problems', hinglish: 'Core formula' }
            },
            back: {
              definitionOrAnswer: { hi: 'sin²θ + cos²θ = 1 (सदा सत्य)', en: 'Always equals 1 for all real angles', hinglish: 'Hamesha 1 ke barabar hota hai.' },
              keyFormulaOrTrick: 'Derived: 1 - sin²θ = cos²θ and 1 - cos²θ = sin²θ',
              examTip: { hi: 'जब भी प्रश्न में sin और cos दोनों के वर्ग हों, 1 रखने से सवाल 5 सेकंड में हल होता है।', en: 'Substitute 1 immediately to simplify equations.', hinglish: 'Direct 1 substitute karein.' },
              commonMistakeToAvoid: { hi: 'θ का मान दोनों में समान होना चाहिए।', en: 'Angles must be identical in both terms.', hinglish: 'Angle alag alag na ho.' }
            },
            masteryLevel: 'new'
          },
          {
            id: 'fc-2',
            category: sub,
            subCategory: top,
            front: {
              title: { hi: 'tan 45° और cot 45° का मान', en: 'Values of tan 45° & cot 45°', hinglish: 'tan 45° and cot 45° Value' },
              typeBadge: 'Speed Trick',
              clueOrContext: { hi: 'हाइट और डिस्टेंस (Height & Distance) का मास्टर सीक्रेट', en: 'Critical for 1-step Height & Distance problems', hinglish: 'Height & Distance Shortcut' }
            },
            back: {
              definitionOrAnswer: { hi: 'tan 45° = 1 और cot 45° = 1', en: 'Both equal exactly 1', hinglish: 'Dono 1 ke barabar hote hain' },
              keyFormulaOrTrick: 'When angle of elevation = 45°, Height = Base Distance! (10s shortcut)',
              examTip: { hi: 'अगर 45° कोण दिया हो, तो खंभे की ऊंचाई = छाया की लंबाई। बिना फॉर्मूला लिखे उत्तर दें।', en: 'Height equals Shadow length at 45°. No calculations needed.', hinglish: 'Direct Base = Height likhein.' },
              commonMistakeToAvoid: { hi: '30° और 60° के मान से भ्रमित न हों (1/√3 और √3)।', en: 'Confusing with 30/60 degree ratios.', hinglish: '√3 factor dhyan rakhein.' }
            },
            masteryLevel: 'new'
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching flashcards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkMastered = () => {
    // Add XP
    const newXp = userProfile.totalXp + 15;
    const newMastered = userProfile.masteredFlashcardsCount + 1;
    localStorage.setItem('jitomni_user_xp', newXp.toString());
    setUserProfile((prev) => ({
      ...prev,
      totalXp: newXp,
      masteredFlashcardsCount: newMastered
    }));

    // Move to next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const activeCard = flashcards[currentIndex];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner with Gamification Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-[#0A1931] to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{userProfile.currentStreakDays}-Day Active Study Streak • Spaced Repetition</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide">
              {lang === 'hi' ? '⚡ स्मार्ट फ्लैशकार्ड्स & XP रिवॉर्ड' : '⚡ Smart Flashcards & Spaced Repetition'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              {lang === 'hi'
                ? 'परीक्षा से 1 दिन पहले 5 मिनट में सभी आवश्यक फॉर्मूले, तिथियां और 10-सेकंड ट्रिक्स का त्वरित रिवीजन करें।'
                : 'Rapidly reinforce memory retention with active recall flashcards, tips, and common exam traps.'}
            </p>
          </div>

          {/* Gamification Stats Strip */}
          <div className="grid grid-cols-3 gap-3 bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 w-full lg:w-auto">
            <div className="text-center px-3 border-r border-slate-700/60">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-lg">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{userProfile.totalXp}</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total XP</p>
            </div>
            <div className="text-center px-3 border-r border-slate-700/60">
              <div className="flex items-center justify-center gap-1 text-orange-400 font-black text-lg">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{userProfile.currentStreakDays} Days</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Streak</p>
            </div>
            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-black text-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{userProfile.masteredFlashcardsCount}</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Mastered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Topics Carousel Selector */}
      <div className="bg-[#0A1931]/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{lang === 'hi' ? 'रिवीजन डेक चुनें (Choose Quick Deck):' : 'Select Revision Deck:'}</span>
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {presetTopics.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSubject(item.subject);
                setTopicName(item.topic);
                handleFetchCards(item.subject, item.topic);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                topicName === item.topic
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-[#030B1E] text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              <span>{item.topic}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Flip Arena */}
      {isLoading ? (
        <div className="bg-[#0A1931] border border-slate-800 rounded-3xl p-16 text-center space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-white">AI स्मार्ट फ्लैशकार्ड्स तैयार कर रहा है...</h3>
          <p className="text-xs text-slate-400">10-सेकंड ट्रिक्स और मुख्य सूत्रों का संकलन</p>
        </div>
      ) : activeCard ? (
        <div className="space-y-4">
          {/* Card Progress counter */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-400">
            <span>Card {currentIndex + 1} of {flashcards.length}</span>
            <span className="text-amber-400 font-bold">Tap card to Flip ⚡</span>
          </div>

          {/* Interactive Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[320px] sm:min-h-[360px] bg-gradient-to-br from-[#0A1931] via-[#071329] to-[#020712] border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between transition-all hover:scale-[1.01] relative overflow-hidden"
          >
            {/* Front of Card */}
            {!isFlipped ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                      {activeCard.front.typeBadge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{activeCard.category}</span>
                  </div>

                  <div className="mt-8 text-center space-y-4">
                    <h3 className="text-xl sm:text-3xl font-heading font-black text-white leading-tight">
                      {activeCard.front.title[lang] || activeCard.front.title.hi || activeCard.front.title.en}
                    </h3>
                    {activeCard.front.clueOrContext && (
                      <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto italic">
                        💡 {activeCard.front.clueOrContext[lang] || activeCard.front.clueOrContext.hi}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-slate-800/80">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                    <RotateCw className="w-4 h-4" />
                    <span>उत्तर / ट्रिक देखने के लिए क्लिक करें (Tap to Reveal Answer)</span>
                  </span>
                </div>
              </div>
            ) : (
              /* Back of Card */
              <div className="space-y-5 flex-1 flex flex-col justify-between animate-in zoom-in-95 duration-200">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                      ✓ Answer & Concept
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(activeCard.back.definitionOrAnswer[lang] || activeCard.back.definitionOrAnswer.hi, lang);
                      }}
                      className="p-2 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {activeCard.back.definitionOrAnswer[lang] || activeCard.back.definitionOrAnswer.hi}
                      </h4>
                    </div>

                    {activeCard.back.keyFormulaOrTrick && (
                      <div className="bg-black/60 border border-amber-500/40 rounded-xl p-3 text-xs sm:text-sm text-amber-300 font-mono font-bold">
                        ⚡ {activeCard.back.keyFormulaOrTrick}
                      </div>
                    )}

                    <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3 text-xs text-blue-200">
                      <strong className="text-amber-300">Exam Tip: </strong>
                      {activeCard.back.examTip[lang] || activeCard.back.examTip.hi}
                    </div>

                    {activeCard.back.commonMistakeToAvoid && (
                      <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-200">
                        <strong className="text-rose-400">Avoid Mistake: </strong>
                        {activeCard.back.commonMistakeToAvoid[lang] || activeCard.back.commonMistakeToAvoid.hi}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
                  Tap anywhere to flip back
                </div>
              </div>
            )}
          </div>

          {/* Navigation & Mastery Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-[#0A1931] border border-slate-700 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              onClick={handleMarkMastered}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>याद हो गया (+15 XP Mastered)</span>
            </button>

            <button
              onClick={handleNextCard}
              disabled={currentIndex === flashcards.length - 1}
              className="px-4 py-2.5 rounded-xl bg-[#0A1931] border border-slate-700 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}

      {/* AI Personal Weakness Radar Box */}
      <div className="bg-[#0A1931] border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-black text-white text-base sm:text-lg">
              {lang === 'hi' ? '📊 पर्सनल AI वीकनेस रडार (सुधार सुझाव)' : '📊 Personal AI Weakness Radar'}
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Auto-Generated from Quiz Errors
          </span>
        </div>

        <p className="text-xs text-slate-400">
          {lang === 'hi'
            ? 'आपके हालिया क्विज़ और टेस्ट के आधार पर इन 3 टॉपिक्स में रिवीजन की आवश्यकता है:'
            : 'Based on your latest quiz attempts, spend 3 minutes reviewing these targeted topics:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {userProfile.weakTopics.map((topic, idx) => (
            <div key={idx} className="bg-[#030B1E] border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">{topic.subject}</span>
                <span className="text-xs font-black text-rose-400">{topic.accuracyPercent}% Accuracy</span>
              </div>
              <h4 className="font-bold text-white text-sm">{topic.topicName}</h4>
              <p className="text-xs text-amber-300 font-medium">{topic.recommendedAction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
