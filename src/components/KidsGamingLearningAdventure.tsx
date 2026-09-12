// src/components/KidsGamingLearningAdventure.tsx
// Interactive Gamified Learning Adventure for Young School Kids (Class 1 to 5)
// Makes learning as thrilling as a game with stars, animated mascots, audio reading & puzzles!

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  Star,
  RotateCcw,
  CheckCircle2,
  Volume2,
  VolumeX,
  Flame,
  ArrowRight,
  Smile,
  Heart,
  Music,
  Zap,
  BookOpen,
  Trophy,
  HelpCircle,
  ThumbsUp,
  Gamepad2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speech } from '../utils/speech';
import { Language } from '../types';

interface KidsGamingLearningAdventureProps {
  lang: Language;
  selectedClass: number;
  onExitGameMode?: () => void;
}

type GameModeType = 'match' | 'mathTrain' | 'audioStory' | 'starQuiz';

interface MatchItem {
  id: string;
  emoji: string;
  wordHi: string;
  wordEn: string;
}

const matchPairs: MatchItem[] = [
  { id: '1', emoji: '🍎', wordHi: 'सेब', wordEn: 'Apple' },
  { id: '2', emoji: '🦁', wordHi: 'शेर', wordEn: 'Lion' },
  { id: '3', emoji: '☀️', wordHi: 'सूरज', wordEn: 'Sun' },
  { id: '4', emoji: '🚂', wordHi: 'रेलगाड़ी', wordEn: 'Train' },
  { id: '5', emoji: '📚', wordHi: 'किताब', wordEn: 'Book' },
  { id: '6', emoji: '🌳', wordHi: 'पेड़', wordEn: 'Tree' },
];

export const KidsGamingLearningAdventure: React.FC<KidsGamingLearningAdventureProps> = ({
  lang,
  selectedClass,
  onExitGameMode,
}) => {
  const [activeGame, setActiveGame] = useState<GameModeType>('match');
  const [stars, setStars] = useState<number>(15);
  const [streak, setStreak] = useState<number>(3);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // --- 1. PICTURE-WORD MATCH GAME STATE ---
  const [selectedEmojiId, setSelectedEmojiId] = useState<string | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchMessage, setMatchMessage] = useState<string>('चित्र देखकर सही शब्द चुनो!');

  // --- 2. MATH TRAIN GAME STATE ---
  const [trainStation, setTrainStation] = useState<number>(1);
  const [currentMathQuestion, setCurrentMathQuestion] = useState<{
    num1: number;
    num2: number;
    op: '+' | '-';
    visualEmoji: string;
    options: number[];
    answer: number;
  }>({
    num1: 3,
    num2: 2,
    op: '+',
    visualEmoji: '🎈',
    options: [4, 5, 6],
    answer: 5,
  });
  const [trainStatus, setTrainStatus] = useState<'waiting' | 'correct' | 'wrong'>('waiting');

  // --- 3. AUDIO STORY QUEST STATE ---
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [isReadingStory, setIsReadingStory] = useState<boolean>(false);

  const storySlides = [
    {
      title: 'जादुई आम का बगीचा (The Magic Mango Garden)',
      character: '🦜 मिट्ठू तोता और 🐒 चीकू बंदर',
      textHi:
        'एक सुंदर बगीचे में एक रसीला आम का पेड़ था। मिट्ठू तोता और चीकू बंदर बहुत पक्के दोस्त थे। दोनों मिलकर मीठे फल खाते और कभी किसी को परेशान नहीं करते थे।',
      textEn:
        'In a vibrant garden stood a sweet mango tree. Mitthu the parrot and Cheeku the monkey were best buddies. They shared delicious fruits and lived in harmony.',
      moralHi: 'सच्चे दोस्त हमेशा बांटकर खाते हैं और एक-दूसरे की मदद करते हैं।',
      moralEn: 'True friends always share with joy and help one another.',
      questionHi: 'मिट्ठू और चीकू कौन थे?',
      optionsHi: ['पक्के दोस्त', 'दुश्मन', 'अजनबी'],
      correctIndex: 0,
    },
    {
      title: 'नन्हीं चींटी और नदी (The Little Ant and River)',
      character: '🐜 नन्हीं चींटी और 🕊️ दयालु कबूतर',
      textHi:
        'एक नन्हीं चींटी नदी के पानी में बहने लगी। एक दयालु कबूतर ने पेड़ से सूखा पत्ता तोड़ा और पानी में गिरा दिया। चींटी पत्ते पर चढ़ गई और उसकी जान बच गई!',
      textEn:
        'A tiny ant fell into the flowing river. A kind pigeon dropped a green leaf into the stream. The ant climbed on it and was safely saved!',
      moralHi: 'दया और भलाई का फल हमेशा मीठा होता है।',
      moralEn: 'Kindness and helping hands always bring true blessings.',
      questionHi: 'कबूतर ने चींटी को बचाने के लिए क्या गिराया?',
      optionsHi: ['पत्ता', 'पत्थर', 'कांटा'],
      correctIndex: 0,
    },
  ];

  // --- 4. STAR QUIZ STATE ---
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const kidQuizList = [
    {
      q: 'हमारे शरीर में देखने के लिए कौन-सा अंग काम आता है? 👀',
      opts: ['आंखें (Eyes)', 'कान (Ears)', 'नाक (Nose)'],
      ans: 0,
      cheer: 'बिल्कुल सही! आंखें हमें दुनिया दिखाती हैं! ⭐',
    },
    {
      q: 'इंद्रधनुष (Rainbow) में कितने रंग होते हैं? 🌈',
      opts: ['5 रंग', '7 रंग', '10 रंग'],
      ans: 1,
      cheer: 'वाह शाबाश! 7 मनमोहक रंग होते हैं! ⭐⭐',
    },
    {
      q: 'सूर्य किस दिशा से उगता है? 🌅',
      opts: ['पूर्व (East)', 'पश्चिम (West)', 'उत्तर (North)'],
      ans: 0,
      cheer: 'अद्भुत! पूर्व दिशा से नया सवेरा आता है! ⭐⭐⭐',
    },
    {
      q: 'पानी की बूंदों से मिलकर क्या बनता है? 🌧️',
      opts: ['बादल (Clouds)', 'रेगिस्तान', 'आग'],
      ans: 0,
      cheer: 'बहुत बढ़िया! बादल वर्षा लाते हैं! ⭐⭐⭐⭐',
    },
  ];

  // Sound effect helper
  const playCheerSpeech = (phrase: string) => {
    if (isMuted) return;
    try {
      speech.speak(phrase, 'hi');
    } catch (e) {
      console.log('Speech playback note:', e);
    }
  };

  // --- MATCH GAME LOGIC ---
  useEffect(() => {
    if (selectedEmojiId && selectedWordId) {
      if (selectedEmojiId === selectedWordId) {
        // Matched!
        setMatchedIds((prev) => [...prev, selectedEmojiId]);
        setStars((s) => s + 5);
        setStreak((st) => st + 1);
        setMatchMessage('🎉 शाबाश! बिल्कुल सही मिलान! (+5 स्टार्स)');
        playCheerSpeech('अरे वाह! बहुत खूब!');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        setMatchMessage('😅 अरे कोई बात नहीं, फिर से कोशिश करो!');
        playCheerSpeech('फिर से कोशिश करो प्यारे!');
      }
      setTimeout(() => {
        setSelectedEmojiId(null);
        setSelectedWordId(null);
      }, 700);
    }
  }, [selectedEmojiId, selectedWordId]);

  const handleResetMatch = () => {
    setMatchedIds([]);
    setSelectedEmojiId(null);
    setSelectedWordId(null);
    setMatchMessage('चित्र देखकर सही शब्द चुनो!');
  };

  // --- MATH TRAIN LOGIC ---
  const handleAnswerTrainMath = (selectedAnswer: number) => {
    if (selectedAnswer === currentMathQuestion.answer) {
      setTrainStatus('correct');
      setStars((s) => s + 10);
      setStreak((st) => st + 1);
      playCheerSpeech('छुक-छुक गाड़ी आगे बढ़ी! सही जवाब!');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });

      setTimeout(() => {
        setTrainStation((prev) => prev + 1);
        // Generate new question
        const n1 = Math.floor(Math.random() * 5) + 1;
        const n2 = Math.floor(Math.random() * 4) + 1;
        const isAdd = Math.random() > 0.3;
        const op: '+' | '-' = isAdd ? '+' : '-';
        const ans = isAdd ? n1 + n2 : Math.max(1, n1 - n2);
        const actualN1 = isAdd ? n1 : n1 + n2;
        const actualAns = isAdd ? n1 + n2 : n1;

        const allOpts = Array.from(new Set([actualAns, actualAns + 1, Math.max(1, actualAns - 1), actualAns + 2]))
          .slice(0, 3)
          .sort(() => Math.random() - 0.5);

        setCurrentMathQuestion({
          num1: isAdd ? n1 : actualN1,
          num2: n2,
          op,
          visualEmoji: ['🎈', '🍬', '⭐', '🍎', '🌻'][Math.floor(Math.random() * 5)],
          options: allOpts,
          answer: actualAns,
        });
        setTrainStatus('waiting');
      }, 1200);
    } else {
      setTrainStatus('wrong');
      playCheerSpeech('थोड़ा ध्यान से गिनो!');
      setTimeout(() => setTrainStatus('waiting'), 1000);
    }
  };

  // --- AUDIO STORY LOGIC ---
  const handleToggleStorySpeech = () => {
    if (isReadingStory) {
      speech.stop();
      setIsReadingStory(false);
    } else {
      const story = storySlides[currentStoryIndex];
      setIsReadingStory(true);
      speech.speak(`${story.title}. ${story.textHi}. शिक्षा: ${story.moralHi}`, 'hi', () => {
        setIsReadingStory(false);
      });
    }
  };

  // --- QUIZ LOGIC ---
  const handleAnswerKidQuiz = (idx: number) => {
    const current = kidQuizList[quizIndex];
    if (idx === current.ans) {
      setQuizScore((sc) => sc + 1);
      setStars((st) => st + 5);
      playCheerSpeech(current.cheer);
      confetti({ particleCount: 35, spread: 50 });
    } else {
      playCheerSpeech('कोई बात नहीं, अगली बार सही होगा!');
    }

    setTimeout(() => {
      if (quizIndex + 1 < kidQuizList.length) {
        setQuizIndex((prev) => prev + 1);
      } else {
        setQuizFinished(true);
        confetti({ particleCount: 90, spread: 90 });
      }
    }, 1100);
  };

  return (
    <div className="space-y-6 rounded-3xl bg-gradient-to-b from-[#1A0B2E] via-[#100720] to-[#0A0314] border-2 border-amber-400/60 p-5 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
      {/* Background Decorative Sparkles */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: MASCOT & REWARD BADGES */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-purple-800/40 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-purple-600/50 animate-bounce">
            🦊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" /> खेल-खेल में पढ़ाई (Kids Game Mode)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 font-bold text-[10px] border border-purple-500/40">
                कक्षा 1 से 5 विशेष
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2 font-heading">
              <span>जीतू भैया का जादुई स्कूल 🌟</span>
            </h2>
          </div>
        </div>

        {/* Stars Counter & Audio Control */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center gap-2 font-black text-sm shadow-md">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-spin" />
            <span>{stars} स्टार्स ⭐</span>
          </div>

          <div className="px-3 py-1.5 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-300 flex items-center gap-1.5 font-bold text-xs">
            <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{streak} स्ट्रीक 🔥</span>
          </div>

          <button
            onClick={() => {
              if (isReadingStory) speech.stop();
              setIsMuted(!isMuted);
            }}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-purple-900 text-purple-200 border-purple-500'
            }`}
            title={isMuted ? 'ध्वनि चालू करें' : 'ध्वनि म्यूट करें'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {onExitGameMode && (
            <button
              onClick={onExitGameMode}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700"
            >
              सामान्य मोड पर जाएं
            </button>
          )}
        </div>
      </div>

      {/* GAME SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
        {[
          { id: 'match', label: '🧩 चित्र-शब्द मिलान', desc: 'देखकर सही जोड़ो', color: 'from-amber-500 to-amber-600' },
          { id: 'mathTrain', label: '🚂 गणित रेलगाड़ी', desc: 'गिनती और जोड़ खेल', color: 'from-emerald-500 to-teal-600' },
          { id: 'audioStory', label: '📖 बोलती कहानी', desc: 'सुनो और सीखो', color: 'from-blue-500 to-indigo-600' },
          { id: 'starQuiz', label: '🌟 सुपर स्टार क्विज', desc: 'ट्रॉफी जीतो', color: 'from-purple-500 to-pink-600' },
        ].map((tab) => {
          const isSelected = activeGame === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveGame(tab.id as GameModeType)}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden flex flex-col justify-between border-2 ${
                isSelected
                  ? `bg-gradient-to-r ${tab.color} text-white border-white shadow-lg scale-102`
                  : 'bg-[#15072B] text-slate-300 hover:bg-[#1E0B3C] border-purple-900/50'
              }`}
            >
              <span className="font-black text-xs sm:text-sm">{tab.label}</span>
              <span className="text-[10px] opacity-80 mt-0.5">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* ================================================================= */}
      {/* 1. PICTURE-WORD MATCH GAME VIEW */}
      {/* ================================================================= */}
      {activeGame === 'match' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#130626] border border-purple-800/60 space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              <h3 className="text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2">
                <span>🍎 चित्र और शब्द का जादुई मिलान</span>
              </h3>
              <p className="text-xs text-amber-300 font-bold mt-0.5">{matchMessage}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                सफलता: {matchedIds.length} / {matchPairs.length}
              </span>
              <button
                onClick={handleResetMatch}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="दोबारा खेलें"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Emojis Column */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide block text-center">
                1. चित्र चुनो 👇
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {matchPairs.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedEmojiId === item.id;
                  return (
                    <button
                      key={`emoji-${item.id}`}
                      disabled={isMatched}
                      onClick={() => {
                        setSelectedEmojiId(item.id);
                        playCheerSpeech(item.wordHi);
                      }}
                      className={`h-20 rounded-2xl flex flex-col items-center justify-center text-3xl transition-all border-2 ${
                        isMatched
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 opacity-40 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-300 scale-105 shadow-xl'
                          : 'bg-[#1C0A38] hover:bg-[#280F4E] border-purple-800/80 shadow'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      {isMatched && <span className="text-[10px] font-bold text-emerald-400">✓ हो गया</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Words Column */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wide block text-center">
                2. सही नाम चुनो 👇
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[...matchPairs]
                  .sort((a, b) => a.wordHi.localeCompare(b.wordHi))
                  .map((item) => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedWordId === item.id;
                    return (
                      <button
                        key={`word-${item.id}`}
                        disabled={isMatched}
                        onClick={() => setSelectedWordId(item.id)}
                        className={`h-20 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all border-2 ${
                          isMatched
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 opacity-40 cursor-not-allowed'
                            : isSelected
                            ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-300 scale-105 shadow-xl'
                            : 'bg-[#1C0A38] hover:bg-[#280F4E] border-purple-800/80 shadow'
                        }`}
                      >
                        <span className="font-black text-sm">{item.wordHi}</span>
                        <span className="text-[10px] opacity-75 font-mono">({item.wordEn})</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {matchedIds.length === matchPairs.length && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border-2 border-emerald-400 text-center space-y-2 animate-in zoom-in-95">
              <h4 className="text-lg font-black text-emerald-300">🏆 कमाल कर दिया! सारे जोड़े मिल गए!</h4>
              <p className="text-xs text-emerald-200">आपने 30 स्टार्स अर्जित किए! अब गणित की रेलगाड़ी खेलें!</p>
              <button
                onClick={() => setActiveGame('mathTrain')}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg inline-flex items-center gap-1.5"
              >
                <span>आगे बढ़ो 🚂</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. MATH TRAIN ADVENTURE VIEW */}
      {/* ================================================================= */}
      {activeGame === 'mathTrain' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#130626] border border-purple-800/60 space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🚂 गणित की जादुई रेलगाड़ी</span>
              </h3>
              <p className="text-xs text-amber-300 font-bold">स्टेशन {trainStation}: सही गिनती चुनकर इंजन चालू करो!</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
              स्टेशन {trainStation} पर गाड़ी रुकी है
            </span>
          </div>

          {/* Animated Train Track & Visual Count */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0B0218] border border-purple-900 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="text-4xl sm:text-5xl animate-pulse">🚂 🚃 🚃 💨</div>

            {/* Visual Object Counting Aid */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-[#170530] border border-purple-800/60 max-w-md">
              <div className="flex items-center gap-1">
                {Array.from({ length: currentMathQuestion.num1 }).map((_, i) => (
                  <span key={`a-${i}`} className="text-2xl animate-bounce">
                    {currentMathQuestion.visualEmoji}
                  </span>
                ))}
              </div>
              <span className="text-2xl font-black text-amber-400 px-2">{currentMathQuestion.op}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: currentMathQuestion.num2 }).map((_, i) => (
                  <span key={`b-${i}`} className="text-2xl animate-bounce">
                    {currentMathQuestion.visualEmoji}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {currentMathQuestion.num1} {currentMathQuestion.op} {currentMathQuestion.num2} = ?
            </div>

            {trainStatus === 'correct' && (
              <div className="text-sm font-black text-emerald-400 animate-bounce">
                🎉 शाबाश! छुक-छुक गाड़ी चल पड़ी! (+10 स्टार्स)
              </div>
            )}
            {trainStatus === 'wrong' && (
              <div className="text-sm font-black text-rose-400">
                😅 अरे नहीं! एक बार फिर से गिनो!
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {currentMathQuestion.options.map((opt) => (
              <button
                key={`opt-${opt}`}
                onClick={() => handleAnswerTrainMath(opt)}
                className="h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-purple-300"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. AUDIO STORY QUEST VIEW */}
      {/* ================================================================= */}
      {activeGame === 'audioStory' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#130626] border border-purple-800/60 space-y-6 relative z-10">
          {(() => {
            const story = storySlides[currentStoryIndex];
            return (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      सचित्र बाल कहानी {currentStoryIndex + 1} / {storySlides.length}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1">{story.title}</h3>
                    <p className="text-xs text-amber-300 font-bold">{story.character}</p>
                  </div>

                  <button
                    onClick={handleToggleStorySpeech}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all ${
                      isReadingStory
                        ? 'bg-rose-500 text-white ring-4 ring-rose-400 animate-pulse'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isReadingStory ? 'कहानी रोकें ⏸️' : 'कहानी बोलकर सुनाओ 🔊'}</span>
                  </button>
                </div>

                {/* Story Card Box */}
                <div className="p-5 rounded-2xl bg-[#1A0933] border border-purple-800/70 space-y-4">
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                    {story.textHi}
                  </p>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    {story.textEn}
                  </p>

                  <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-2">
                    <Heart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-amber-300">कहानी की शिक्षा (Moral of the Story):</span>
                      <span>{story.moralHi}</span>
                    </div>
                  </div>
                </div>

                {/* Comprehension Mini Puzzle */}
                <div className="p-4 rounded-2xl bg-[#0E031D] border border-purple-900 space-y-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>कहानी से सवाल: {story.questionHi}</span>
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {story.optionsHi.map((opt, oIdx) => (
                      <button
                        key={opt}
                        onClick={() => {
                          if (oIdx === story.correctIndex) {
                            setStars((s) => s + 5);
                            playCheerSpeech('बिल्कुल सही जवाब!');
                            confetti({ particleCount: 30, spread: 50 });
                          } else {
                            playCheerSpeech('कहानी को दोबारा सुनो!');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-700 text-xs font-bold text-white border border-purple-500/50 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Story Button */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      if (isReadingStory) speech.stop();
                      setCurrentStoryIndex((prev) => (prev + 1) % storySlides.length);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>अगली कहानी ➡️</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================================================================= */}
      {/* 4. SUPER STAR KID QUIZ VIEW */}
      {/* ================================================================= */}
      {activeGame === 'starQuiz' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#130626] border border-purple-800/60 space-y-6 relative z-10">
          {!quizFinished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">
                  सवाल {quizIndex + 1} / {kidQuizList.length}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  स्कोर: {quizScore} ⭐
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#1B0A36] border border-purple-800 text-center space-y-3">
                <h3 className="text-base sm:text-xl font-black text-white leading-relaxed">
                  {kidQuizList[quizIndex].q}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {kidQuizList[quizIndex].opts.map((opt, oIdx) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswerKidQuiz(oIdx)}
                    className="p-4 rounded-2xl bg-[#230C46] hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-slate-950 text-white font-black text-sm border-2 border-purple-600/60 hover:border-white shadow-lg transition-all transform active:scale-95 text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/70 to-purple-950/70 border-2 border-amber-400 text-center space-y-4 animate-in zoom-in-95">
              <div className="text-6xl animate-bounce">🏆</div>
              <h3 className="text-2xl font-black text-amber-300">
                बधाई हो! आप बने सुपर स्टार बाल जीनियस!
              </h3>
              <p className="text-sm text-slate-200">
                आपने {kidQuizList.length} में से {quizScore} सही जवाब दिए और कुल {stars} स्टार्स जमा किए!
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/40 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                  JITOMNI 360° BAL CERTIFICATE
                </span>
                <h4 className="text-lg font-black text-white">कक्षा {selectedClass} बाल मेधावी सम्मान</h4>
                <p className="text-xs text-emerald-400 font-bold">✓ 100% Verified Young Scholar Badge</p>
              </div>

              <button
                onClick={() => {
                  setQuizIndex(0);
                  setQuizScore(0);
                  setQuizFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>क्विज दोबारा खेलें</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
