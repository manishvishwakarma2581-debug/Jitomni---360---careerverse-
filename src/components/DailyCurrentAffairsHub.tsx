import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Zap,
  Target,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  Compass,
  FileText,
  Shield,
  Clock,
  Filter,
  RefreshCw,
  Eye,
  Check,
} from 'lucide-react';
import { Language, MockExamConfig, QuizQuestion } from '../types';
import {
  CURRENT_AFFAIRS_CATEGORIES,
  EXAM_DEMAND_EXPLAINER,
  DailyCurrentAffairItem,
  ExamDemandCategory,
  CurrentAffairsCategory,
} from '../data/dailyCurrentAffairsData';
import { CurrentAffairsEngine } from '../services/currentAffairsEngine';

interface DailyCurrentAffairsHubProps {
  lang: Language;
  onStartQuiz?: (config: MockExamConfig, questions: QuizQuestion[]) => void;
  onBackToSyllabus?: () => void;
}

export const DailyCurrentAffairsHub: React.FC<DailyCurrentAffairsHubProps> = ({
  lang,
  onStartQuiz,
  onBackToSyllabus,
}) => {
  // Navigation & Filter states
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-09');
  const [selectedExamDemand, setSelectedExamDemand] = useState<ExamDemandCategory>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CurrentAffairsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active in-card view lens state: Map of itemId -> 'UPSC' | 'SSC' | 'BANKING' | 'STATE'
  const [cardActiveLens, setCardActiveLens] = useState<Record<string, 'UPSC' | 'SSC' | 'BANKING' | 'STATE'>>({});
  
  // Interactive quiz solving in card states
  const [userSelectedOption, setUserSelectedOption] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  
  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Audio Speech state
  const [speakingItemId, setSpeakingItemId] = useState<string | null>(null);

  // Show Exam Demand Explainer modal
  const [showDemandRadarModal, setShowDemandRadarModal] = useState(false);

  // Active Rapid One-Liners category filter
  const [oneLinerFilter, setOneLinerFilter] = useState<'ALL' | CurrentAffairsCategory>('ALL');

  // Load initial bookmarks
  useEffect(() => {
    setBookmarkedIds(CurrentAffairsEngine.getBookmarks());
  }, []);

  const availableDates = useMemo(() => {
    return CurrentAffairsEngine.getAvailableDates();
  }, []);

  // Fetch and filter items
  const allDateItems = useMemo(() => {
    return CurrentAffairsEngine.getItemsForDate(selectedDate);
  }, [selectedDate]);

  const displayedItems = useMemo(() => {
    let items = CurrentAffairsEngine.filterByCategory(allDateItems, selectedCategory);
    items = CurrentAffairsEngine.searchItems(items, searchQuery);
    if (showBookmarksOnly) {
      items = items.filter((item) => bookmarkedIds.includes(item.id));
    }
    return items;
  }, [allDateItems, selectedCategory, searchQuery, showBookmarksOnly, bookmarkedIds]);

  const rapidOneLiners = useMemo(() => {
    let list = CurrentAffairsEngine.getRapidOneLiners(selectedDate, selectedExamDemand);
    if (oneLinerFilter !== 'ALL') {
      list = list.filter((ol) => ol.category === oneLinerFilter);
    }
    return list;
  }, [selectedDate, selectedExamDemand, oneLinerFilter]);

  // Handle bookmark toggle
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isNowBookmarked = CurrentAffairsEngine.toggleBookmark(id);
    if (isNowBookmarked) {
      setBookmarkedIds((prev) => [...prev, id]);
    } else {
      setBookmarkedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // Handle Audio Speech
  const handleToggleSpeech = (item: DailyCurrentAffairItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (speakingItemId === item.id) {
      CurrentAffairsEngine.stopSpeaking();
      setSpeakingItemId(null);
      return;
    }

    CurrentAffairsEngine.stopSpeaking();
    setSpeakingItemId(item.id);

    const textToSpeak = `${item.headline[lang] || item.headline.hi}. ${item.subHeadline[lang] || item.subHeadline.hi}. ${
      item.examDemandBreakdown.whyExamsAskThisDifferently[lang] || item.examDemandBreakdown.whyExamsAskThisDifferently.hi
    }`;

    CurrentAffairsEngine.speakText(textToSpeak, lang, () => {
      setSpeakingItemId(null);
    });
  };

  // Launch Full Current Affairs CBT Mock Quiz
  const handleLaunchCurrentAffairsQuiz = () => {
    if (!onStartQuiz) return;
    const questions = CurrentAffairsEngine.generateDailyQuizQuestions(allDateItems, selectedExamDemand, lang);
    const mockConfig: MockExamConfig = {
      id: `ca-mock-${selectedDate}-${selectedExamDemand.toLowerCase()}`,
      examType: 'SSC',
      title: {
        hi: `दैनिक करेंट अफेयर्स CBT परीक्षा (${selectedExamDemand} Special)`,
        en: `Daily Current Affairs CBT Mock (${selectedExamDemand} Lens)`,
        hinglish: `Daily Current Affairs Real CBT Test (${selectedExamDemand})`,
      },
      examName: `Daily Current Affairs ${selectedDate}`,
      totalQuestions: questions.length,
      timeLimitMinutes: Math.max(10, questions.length * 2),
      durationMinutes: Math.max(10, questions.length * 2),
      positiveMarksPerQuestion: selectedExamDemand === 'UPSC' ? 2 : 1,
      negativeMarksPerQuestion: selectedExamDemand === 'UPSC' ? 0.66 : 0.25,
      marksPerQuestion: selectedExamDemand === 'UPSC' ? 2 : 1,
      negativeMarkingRatio: 0.33,
      totalMarks: selectedExamDemand === 'UPSC' ? questions.length * 2 : questions.length,
      passingPercentage: 50,
    };
    onStartQuiz(mockConfig, questions);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      
      {/* 1. TOP HERO BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#12284C] border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/50 flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SOVEREIGN DAILY CURRENT AFFAIRS ENGINE 360°</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
              Exam Demand Driven
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
              UPSC vs SSC vs Banking Lens
            </span>
            <button
              onClick={() => setShowDemandRadarModal(true)}
              className="ml-auto text-xs px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>UPSC का करंट अफेयर्स अलग क्यों है? (Exam Difference Matrix)</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-wide">
            दैनिक समसामयिकी — परीक्षा-वार विश्लेषण व प्रश्न बैंक
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            सामान्य समाचार नहीं, बल्कि <strong>परीक्षा की सटीक मांग (Demand of Exam)</strong> के अनुसार तैयार: UPSC के लिए बहु-कथनीय प्रारंभिक प्रश्न व 250 शब्दों के मुख्य परीक्षा मॉडल उत्तर; SSC व रेलवे के लिए 10-सेकंड फास्ट वन-लाइनर्स व स्टैटिक जीके; तथा बैंकिंग के लिए मौद्रिक दरें व वित्तीय शब्दावली!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleLaunchCurrentAffairsQuiz}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>आज के करेंट अफेयर्स का लाइव टेस्ट दें (Daily CBT Quiz)</span>
            </button>

            {onBackToSyllabus && (
              <button
                onClick={onBackToSyllabus}
                className="px-4 py-2.5 rounded-xl bg-[#08152B] hover:bg-[#102447] text-slate-300 hover:text-white border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>वापस संपूर्ण परीक्षा सिलेबस पर जाएं</span>
              </button>
            )}
          </div>
        </div>

        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. DATE STRIP & CALENDAR NAVIGATOR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black text-slate-200 uppercase tracking-wider">
              तारीख चुनें (Select Date):
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">सक्रिय अंक:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {selectedDate === '2026-09-09' ? 'आज का अंक (9 सितंबर 2026)' : selectedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {availableDates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === '2026-09-09';
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 scale-105 ring-2 ring-amber-400'
                    : 'bg-[#071329] text-slate-300 hover:bg-[#102447] border border-slate-800'
                }`}
              >
                <span>{isToday ? '🔥 आज (Today)' : dateStr === '2026-09-08' ? '📅 कल (Yesterday)' : '📅 ' + dateStr}</span>
                {isToday && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 font-bold">
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CORE EXAM DEMAND LENS SELECTOR (UPSC vs SSC vs BANKING vs STATE) */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c1f3f] via-[#08152b] to-[#040c1a] border-2 border-indigo-500/40 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-black text-white">
                लक्ष्य परीक्षा की मांग के अनुसार फ़िल्टर करें (Exam Demand Lens):
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              एक ही समाचार को अलग-अलग परीक्षाएं अलग तरह से पूछती हैं। अपनी परीक्षा का चश्मा (Lens) चुनें:
            </p>
          </div>

          <button
            onClick={() => setShowDemandRadarModal(true)}
            className="text-xs px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold border border-indigo-500/40 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>विस्तृत तुलनात्मक विश्लेषण देखें</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Option 1: ALL */}
          <button
            onClick={() => setSelectedExamDemand('ALL')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedExamDemand === 'ALL'
                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-300 scale-[1.02]'
                : 'bg-[#071329] text-slate-300 hover:bg-[#0c1f3f] border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">🌐</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/60 font-bold">
                  All-In-One
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black">समग्र परीक्षा दृश्य</h4>
              <p className="text-[11px] opacity-80 mt-1 leading-snug">
                सभी परीक्षाओं के दृष्टिकोण को एक साथ देखें।
              </p>
            </div>
          </button>

          {/* Option 2: UPSC */}
          <button
            onClick={() => setSelectedExamDemand('UPSC')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedExamDemand === 'UPSC'
                ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 ring-2 ring-purple-300 scale-[1.02]'
                : 'bg-[#071329] text-slate-300 hover:bg-[#0c1f3f] border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">⚖️</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 font-bold border border-purple-500/30">
                  GS 1/2/3/4
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-amber-300">UPSC सिविल सेवा</h4>
              <p className="text-[11px] opacity-80 mt-1 leading-snug">
                बहु-कथनीय प्रश्न, संवैधानिक धाराएं व 250 शब्दों के मेन्स मॉडल उत्तर।
              </p>
            </div>
          </button>

          {/* Option 3: SSC & Railways */}
          <button
            onClick={() => setSelectedExamDemand('SSC_RAILWAY')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedExamDemand === 'SSC_RAILWAY'
                ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 scale-[1.02]'
                : 'bg-[#071329] text-slate-300 hover:bg-[#0c1f3f] border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">⚡</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/60 text-amber-300 font-bold">
                  10s Speed
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black">SSC व रेलवे (CGL/NTPC)</h4>
              <p className="text-[11px] opacity-90 mt-1 leading-snug">
                सुपरफास्ट 10-सेकंड वन-लाइनर्स, स्टेटिक जीके व सीधे 4-विकल्पी प्रश्न।
              </p>
            </div>
          </button>

          {/* Option 4: Banking */}
          <button
            onClick={() => setSelectedExamDemand('BANKING')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedExamDemand === 'BANKING'
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-300 scale-[1.02]'
                : 'bg-[#071329] text-slate-300 hover:bg-[#0c1f3f] border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">🏦</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 font-bold border border-emerald-500/30">
                  RBI & Finance
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-emerald-300">बैंकिंग (IBPS/SBI/RBI)</h4>
              <p className="text-[11px] opacity-80 mt-1 leading-snug">
                मौद्रिक नीतियां, रेपो/CRR दरें, वित्तीय शब्दावली व नियामक सर्कुलर।
              </p>
            </div>
          </button>

          {/* Option 5: State & Defence */}
          <button
            onClick={() => setSelectedExamDemand('STATE_DEFENCE')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedExamDemand === 'STATE_DEFENCE'
                ? 'bg-gradient-to-br from-rose-600 to-pink-700 text-white border-rose-400 shadow-lg shadow-rose-600/30 ring-2 ring-rose-300 scale-[1.02]'
                : 'bg-[#071329] text-slate-300 hover:bg-[#0c1f3f] border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">🛡️</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-200 font-bold border border-rose-500/30">
                  State & Drills
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-rose-300">रक्षा व स्टेट PCS</h4>
              <p className="text-[11px] opacity-80 mt-1 leading-snug">
                द्विपक्षीय युद्धाभ्यास, राज्य योजनाएं, जनजातीय कल्याण व राज्य बजट।
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. CATEGORY FILTER CHIPS & SEARCH */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-3 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="करेंट अफेयर्स खोजें (उदा. रेपो रेट, निसार, यूसीसी, हाइड्रोजन, बजट)..."
                className="w-full pl-9 pr-4 py-2 bg-[#071329] border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                showBookmarksOnly
                  ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400'
                  : 'bg-[#071329] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>सेव किए गए ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white font-black'
                : 'bg-[#071329] text-slate-300 hover:bg-[#102447] border border-slate-800'
            }`}
          >
            <span>🌐</span>
            <span>सभी श्रेणियां</span>
          </button>
          {CURRENT_AFFAIRS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-black ring-1 ring-indigo-400'
                  : 'bg-[#071329] text-slate-300 hover:bg-[#102447] border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label[lang] || cat.label.hi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. RAPID ONE-LINERS SECTION (Super popular for SSC & Railway Aspirants) */}
      {(selectedExamDemand === 'ALL' || selectedExamDemand === 'SSC_RAILWAY') && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#101b33] via-[#0b172a] to-[#060e1d] border-2 border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                  10-Second High-Speed Recall Capsule
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  सुपरफास्ट दैनिक वन-लाइनर्स (SSC, Railway, Vyapam, Police Special)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setOneLinerFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                  oneLinerFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                सभी
              </button>
              <button
                onClick={() => setOneLinerFilter('sports_awards')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                  oneLinerFilter === 'sports_awards' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                खेल व पुरस्कार
              </button>
              <button
                onClick={() => setOneLinerFilter('defence_security')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                  oneLinerFilter === 'defence_security' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                रक्षा युद्धाभ्यास
              </button>
              <button
                onClick={() => setOneLinerFilter('govt_schemes')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                  oneLinerFilter === 'govt_schemes' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                सरकारी योजनाएं
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rapidOneLiners.map((ol) => (
              <div
                key={ol.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {ol.examTargets.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{ol.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                    {ol.text[lang] || ol.text.hi}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-start gap-1">
                  <span className="font-bold shrink-0">📌 स्टैटिक जीके हुक:</span>
                  <span className="text-slate-300">{ol.staticLink[lang] || ol.staticLink.hi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MAIN CURRENT AFFAIRS IN-DEPTH ARTICLES WITH EXAM DEMAND SWITCHER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              दैनिक समसामयिकी — बहु-आयामी विश्लेषण कार्ड ({displayedItems.length} मुख्य मुद्दे):
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            प्रत्येक कार्ड में परीक्षा-वार चश्मा बदल कर देखें
          </span>
        </div>

        {displayedItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0A1931] border border-slate-800 space-y-3">
            <p className="text-base text-slate-300 font-bold">कोई करेंट अफेयर्स नहीं मिला।</p>
            <p className="text-xs text-slate-400">कृपया सर्च क्वेरी या फ़िल्टर बदलकर पुनः प्रयास करें।</p>
          </div>
        ) : (
          displayedItems.map((item) => {
            const activeLens =
              cardActiveLens[item.id] ||
              (selectedExamDemand === 'UPSC'
                ? 'UPSC'
                : selectedExamDemand === 'BANKING'
                ? 'BANKING'
                : selectedExamDemand === 'STATE_DEFENCE'
                ? 'STATE'
                : 'UPSC');

            const isBookmarked = bookmarkedIds.includes(item.id);
            const isSpeakingThis = speakingItemId === item.id;

            return (
              <div
                key={item.id}
                id={`ca-card-${item.id}`}
                className="rounded-3xl bg-[#0A1931] border-2 border-slate-800 hover:border-indigo-500/50 transition-all overflow-hidden shadow-xl space-y-0"
              >
                {/* Card Top Ribbon */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#071329] via-[#0A1931] to-[#0c1f3f] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                      {item.categoryIcon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-amber-400">
                          {item.categoryLabel[lang] || item.categoryLabel.hi}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                          {item.importanceLevel}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.readTimeMinutes} मिनट अध्ययन</span>
                        <span>•</span>
                        <span>स्रोत: {item.officialSource}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleSpeech(item, e)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                        isSpeakingThis
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-[#071329] text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeakingThis ? 'बंद करें' : 'सुनें (Audio)'}</span>
                    </button>

                    <button
                      onClick={(e) => handleToggleBookmark(item.id, e)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-[#071329] text-slate-400 hover:text-amber-300 border-slate-700'
                      }`}
                      title="बुकमार्क करें"
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Headline & Why Exams Ask Differently Callout */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div>
                    <h2 className="text-base sm:text-xl font-black text-white leading-snug">
                      {item.headline[lang] || item.headline.hi}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {item.subHeadline[lang] || item.subHeadline.hi}
                    </p>
                  </div>

                  {/* Why Exams Ask This Differently Prompt Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">🎯</span>
                    <div className="text-xs">
                      <strong className="text-amber-300 font-bold block mb-1">
                        परीक्षा-वार मांग का अंतर (Why Exams Ask This Differently):
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        {item.examDemandBreakdown.whyExamsAskThisDifferently[lang] ||
                          item.examDemandBreakdown.whyExamsAskThisDifferently.hi}
                      </p>
                    </div>
                  </div>

                  {/* IN-CARD LENS SWITCHER TABS */}
                  <div className="border-t border-slate-800/90 pt-4 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        इस खबर को किस परीक्षा के चश्मे से पढ़ना चाहते हैं?
                      </span>

                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                        <button
                          onClick={() => setCardActiveLens((prev) => ({ ...prev, [item.id]: 'UPSC' }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            activeLens === 'UPSC'
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>⚖️</span>
                          <span>UPSC Civil Services</span>
                        </button>
                        <button
                          onClick={() => setCardActiveLens((prev) => ({ ...prev, [item.id]: 'SSC' }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            activeLens === 'SSC'
                              ? 'bg-amber-500 text-slate-950 shadow font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>⚡</span>
                          <span>SSC & Railways</span>
                        </button>
                        <button
                          onClick={() => setCardActiveLens((prev) => ({ ...prev, [item.id]: 'BANKING' }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            activeLens === 'BANKING'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>🏦</span>
                          <span>Banking & RBI</span>
                        </button>
                        <button
                          onClick={() => setCardActiveLens((prev) => ({ ...prev, [item.id]: 'STATE' }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            activeLens === 'STATE'
                              ? 'bg-rose-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>🛡️</span>
                          <span>Defence & State</span>
                        </button>
                      </div>
                    </div>

                    {/* LENS CONTENT: UPSC */}
                    {activeLens === 'UPSC' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#120f26] via-[#090b1a] to-[#050610] border-2 border-purple-500/40 space-y-5 animate-in fade-in">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                              {item.examDemandBreakdown.upscDemand.gsPaper}
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              UPSC Mains व Prelims की संपूर्ण तैयारी
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.examDemandBreakdown.upscDemand.constitutionalOrPolicyArticles.map((art, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-amber-300 border border-slate-700"
                              >
                                {art}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Analytical Context */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider">
                            गहन विश्लेषणात्मक संदर्भ (Analytical Context):
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                            {item.examDemandBreakdown.upscDemand.analyticalContext[lang] ||
                              item.examDemandBreakdown.upscDemand.analyticalContext.hi}
                          </p>
                        </div>

                        {/* UPSC Prelims Multi-Statement Question */}
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-purple-900/60 text-purple-200 font-bold text-[11px] border border-purple-700">
                              UPSC PRELIMS MCQs (Multi-Statement Pattern)
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.pyqTrendLink}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 font-bold">
                            {item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.question[lang] ||
                              item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.question.hi}
                          </p>

                          {/* Statements */}
                          <div className="space-y-1 text-xs text-slate-300 pl-2 border-l-2 border-purple-500/50">
                            {(
                              item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.statements[lang] ||
                              item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.statements.hi
                            ).map((st, idx) => (
                              <p key={idx}>{st}</p>
                            ))}
                          </div>

                          <p className="text-xs font-bold text-amber-300 pt-1">
                            उपर्युक्त कथनों में से कौन-सा/से सही है/हैं?
                          </p>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.options.map(
                              (opt, optIdx) => {
                                const questionKey = `upsc-${item.id}`;
                                const selectedIdx = userSelectedOption[questionKey];
                                const isCorrect =
                                  optIdx ===
                                  item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.correctIndex;
                                const isSelected = selectedIdx === optIdx;

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() =>
                                      setUserSelectedOption((prev) => ({ ...prev, [questionKey]: optIdx }))
                                    }
                                    className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                                      selectedIdx !== undefined
                                        ? isCorrect
                                        : isSelected
                                        ? 'bg-purple-600 text-white border-purple-400'
                                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
                                    }`}
                                  >
                                    <span>
                                      <strong>{opt.label}.</strong> {opt.text[lang] || opt.text.hi}
                                    </span>
                                    {selectedIdx !== undefined && isCorrect && (
                                      <Check className="w-4 h-4 text-emerald-400" />
                                    )}
                                  </button>
                                );
                              }
                            )}
                          </div>

                          {/* Reveal Solution */}
                          <div className="pt-2">
                            <button
                              onClick={() =>
                                setRevealedExplanations((prev) => ({
                                  ...prev,
                                  [`upsc-${item.id}`]: !prev[`upsc-${item.id}`],
                                }))
                              }
                              className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                            >
                              <span>
                                {revealedExplanations[`upsc-${item.id}`]
                                  ? 'व्याख्या छुपाएं'
                                  : 'विस्तृत व्याख्या व सही उत्तर देखें'}
                              </span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>

                            {revealedExplanations[`upsc-${item.id}`] && (
                              <div className="mt-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 leading-relaxed space-y-1">
                                <strong className="text-emerald-300 font-bold block">
                                  उत्तर व्याख्या (Explanation):
                                </strong>
                                <p>
                                  {item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.explanation[
                                    lang
                                  ] ||
                                    item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion.explanation.hi}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* UPSC Mains 250-Word Question & Answer Framework */}
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-indigo-900/60 text-indigo-200 font-bold text-[11px] border border-indigo-700">
                              UPSC MAINS PRACTICE QUESTION (15 Marks, 250 Words)
                            </span>
                            <span className="text-[10px] text-amber-300 font-bold">
                              {item.examDemandBreakdown.upscDemand.mainsQuestion.gsPaper}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed italic">
                            "{item.examDemandBreakdown.upscDemand.mainsQuestion.question[lang] ||
                              item.examDemandBreakdown.upscDemand.mainsQuestion.question.hi}"
                          </p>

                          {/* Model Answer Structure Accordion */}
                          <div className="p-3.5 rounded-xl bg-[#09152b] border border-slate-800 space-y-3 text-xs">
                            <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5" />
                              <span>आदर्श उत्तर रूपरेखा (Model Answer Framework):</span>
                            </h5>

                            {/* 1. Introduction */}
                            <div>
                              <strong className="text-slate-300 font-bold block text-[11px] uppercase tracking-wide">
                                1. प्रस्तावना (Introduction):
                              </strong>
                              <p className="text-slate-400 mt-0.5">
                                {item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework.introduction[
                                  lang
                                ] ||
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework.introduction
                                    .hi}
                              </p>
                            </div>

                            {/* 2. Core Dimensions */}
                            <div className="space-y-2">
                              <strong className="text-slate-300 font-bold block text-[11px] uppercase tracking-wide">
                                2. मुख्य भाग (Core Dimensions & Arguments):
                              </strong>
                              {item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework.dimensions.map(
                                (dim, dimIdx) => (
                                  <div key={dimIdx} className="pl-2 border-l-2 border-indigo-500/50 space-y-0.5">
                                    <span className="text-indigo-300 font-semibold text-[11px]">
                                      • {dim.title[lang] || dim.title.hi}:
                                    </span>
                                    <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                                      {(dim.points[lang] || dim.points.hi).map((pt, ptIdx) => (
                                        <li key={ptIdx}>{pt}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>

                            {/* 3. Challenges */}
                            <div>
                              <strong className="text-slate-300 font-bold block text-[11px] uppercase tracking-wide">
                                3. प्रमुख चुनौतियां व सीमाएं (Challenges):
                              </strong>
                              <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                                {(
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework
                                    .challengesOrCounterpoints[lang] ||
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework
                                    .challengesOrCounterpoints.hi
                                ).map((ch, chIdx) => (
                                  <li key={chIdx}>{ch}</li>
                                ))}
                              </ul>
                            </div>

                            {/* 4. Way Forward */}
                            <div>
                              <strong className="text-emerald-400 font-bold block text-[11px] uppercase tracking-wide">
                                4. आगे की राह व समितियां (Way Forward):
                              </strong>
                              <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                                {(
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework
                                    .wayForwardAndCommittees[lang] ||
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework
                                    .wayForwardAndCommittees.hi
                                ).map((wf, wfIdx) => (
                                  <li key={wfIdx}>{wf}</li>
                                ))}
                              </ul>
                            </div>

                            {/* 5. Conclusion */}
                            <div>
                              <strong className="text-slate-300 font-bold block text-[11px] uppercase tracking-wide">
                                5. संतुलित निष्कर्ष (Conclusion):
                              </strong>
                              <p className="text-slate-400 mt-0.5">
                                {item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework.conclusion[
                                  lang
                                ] ||
                                  item.examDemandBreakdown.upscDemand.mainsQuestion.modelAnswerFramework.conclusion.hi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* LENS CONTENT: SSC & RAILWAYS */}
                    {activeLens === 'SSC' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1c1809] via-[#0f1107] to-[#080a04] border-2 border-amber-500/40 space-y-5 animate-in fade-in">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/30">
                              SSC CGL / CHSL / NTPC / GD Pattern
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              10-Second Recall & Direct Facts
                            </span>
                          </div>
                        </div>

                        {/* Speed Summary */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                          <strong className="text-amber-400 block mb-1">फास्ट सारांश (Fast Summary):</strong>
                          <p>
                            {item.examDemandBreakdown.sscRailwayDemand.speedSummary[lang] ||
                              item.examDemandBreakdown.sscRailwayDemand.speedSummary.hi}
                          </p>
                        </div>

                        {/* Speed One Liners */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            <span>10-सेकंड वन-लाइनर्स (रटने योग्य प्रमुख बिंदु):</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              item.examDemandBreakdown.sscRailwayDemand.speedOneLiners[lang] ||
                              item.examDemandBreakdown.sscRailwayDemand.speedOneLiners.hi
                            ).map((line, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 font-semibold"
                              >
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Connected Static GK Hooks */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                            📌 जुड़े हुए स्टैटिक जीके (Static GK Linkages):
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {item.examDemandBreakdown.sscRailwayDemand.staticGkHooks.map((gk, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs"
                              >
                                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                                  {gk.key}:
                                </span>
                                <span className="text-slate-100 font-semibold">
                                  {gk.value[lang] || gk.value.hi}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shortcut Trick / Mnemonic */}
                        {item.examDemandBreakdown.sscRailwayDemand.shortcutTrick && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div>
                              <strong className="text-amber-300 font-bold block">
                                {item.examDemandBreakdown.sscRailwayDemand.shortcutTrick.title[lang] ||
                                  item.examDemandBreakdown.sscRailwayDemand.shortcutTrick.title.hi}
                              </strong>
                              <p className="mt-0.5 text-slate-300 font-mono">
                                {item.examDemandBreakdown.sscRailwayDemand.shortcutTrick.mnemonic}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Direct SSC MCQ */}
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3">
                          <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30">
                            SSC / RAILWAYS DIRECT MCQ PRACTICE
                          </span>

                          <p className="text-xs sm:text-sm text-slate-200 font-bold">
                            {item.examDemandBreakdown.sscRailwayDemand.directMcq.question[lang] ||
                              item.examDemandBreakdown.sscRailwayDemand.directMcq.question.hi}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              item.examDemandBreakdown.sscRailwayDemand.directMcq.options[lang] ||
                              item.examDemandBreakdown.sscRailwayDemand.directMcq.options.hi
                            ).map((opt, optIdx) => {
                              const qKey = `ssc-${item.id}`;
                              const selected = userSelectedOption[qKey];
                              const isCorrect =
                                optIdx === item.examDemandBreakdown.sscRailwayDemand.directMcq.correctIndex;
                              const isChosen = selected === optIdx;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => setUserSelectedOption((prev) => ({ ...prev, [qKey]: optIdx }))}
                                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                                    selected !== undefined
                                      ? isCorrect
                                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                                        : isChosen
                                        ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 text-slate-400 border-slate-800'
                                      : isChosen
                                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-800'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selected !== undefined && isCorrect && (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {userSelectedOption[`ssc-${item.id}`] !== undefined && (
                            <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800">
                              <strong className="text-amber-300">व्याख्या:</strong>{' '}
                              {item.examDemandBreakdown.sscRailwayDemand.directMcq.explanation[lang] ||
                                item.examDemandBreakdown.sscRailwayDemand.directMcq.explanation.hi}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* LENS CONTENT: BANKING */}
                    {activeLens === 'BANKING' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#061c14] via-[#05110d] to-[#030906] border-2 border-emerald-500/40 space-y-5 animate-in fade-in">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                              BANKING & FINANCIAL AWARENESS LENS
                            </span>
                            <span className="text-xs text-slate-300">
                              नियामक संस्था: {item.examDemandBreakdown.bankingDemand.regulatoryEntity}
                            </span>
                          </div>
                        </div>

                        {/* Financial Angle */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                          <strong className="text-emerald-400 block mb-1">
                            वित्तीय व मौद्रिक प्रभाव (Financial & Monetary Impact):
                          </strong>
                          <p>
                            {item.examDemandBreakdown.bankingDemand.financialAngle[lang] ||
                              item.examDemandBreakdown.bankingDemand.financialAngle.hi}
                          </p>
                        </div>

                        {/* Key Financial Terms */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                            🔑 महत्वपूर्ण वित्तीय शब्दावली (Key Banking Terms):
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {item.examDemandBreakdown.bankingDemand.keyFinancialTerms.map((term, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/20 space-y-1 text-xs"
                              >
                                <span className="font-bold text-emerald-300 block">{term.term}</span>
                                <p className="text-slate-300">
                                  {term.definition[lang] || term.definition.hi}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Banking Direct MCQ */}
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
                          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
                            BANKING & INSURANCE DIRECT MCQ
                          </span>

                          <p className="text-xs sm:text-sm text-slate-200 font-bold">
                            {item.examDemandBreakdown.bankingDemand.bankingDirectMcq.question[lang] ||
                              item.examDemandBreakdown.bankingDemand.bankingDirectMcq.question.hi}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              item.examDemandBreakdown.bankingDemand.bankingDirectMcq.options[lang] ||
                              item.examDemandBreakdown.bankingDemand.bankingDirectMcq.options.hi
                            ).map((opt, optIdx) => {
                              const qKey = `bank-${item.id}`;
                              const selected = userSelectedOption[qKey];
                              const isCorrect =
                                optIdx === item.examDemandBreakdown.bankingDemand.bankingDirectMcq.correctIndex;
                              const isChosen = selected === optIdx;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => setUserSelectedOption((prev) => ({ ...prev, [qKey]: optIdx }))}
                                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                                    selected !== undefined
                                      ? isCorrect
                                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                                        : isChosen
                                        ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 text-slate-400 border-slate-800'
                                      : isChosen
                                      ? 'bg-emerald-600 text-white border-emerald-400'
                                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-800'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selected !== undefined && isCorrect && (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {userSelectedOption[`bank-${item.id}`] !== undefined && (
                            <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800">
                              <strong className="text-emerald-300">समाधान व्याख्या:</strong>{' '}
                              {item.examDemandBreakdown.bankingDemand.bankingDirectMcq.explanation[lang] ||
                                item.examDemandBreakdown.bankingDemand.bankingDirectMcq.explanation.hi}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* LENS CONTENT: STATE & DEFENCE */}
                    {activeLens === 'STATE' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1c080d] via-[#110508] to-[#070204] border-2 border-rose-500/40 space-y-5 animate-in fade-in">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/30">
                            DEFENCE & STATE PSC (MPPSC/BPSC/UPPSC) LENS
                          </span>
                        </div>

                        {/* Strategic Significance */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                          <strong className="text-rose-400 block mb-1">
                            सामरिक व राज्य-स्तरीय महत्व (Strategic & State Significance):
                          </strong>
                          <p>
                            {item.examDemandBreakdown.stateDefenceDemand.strategicSignificance[lang] ||
                              item.examDemandBreakdown.stateDefenceDemand.strategicSignificance.hi}
                          </p>
                        </div>

                        {/* Military / State Facts */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider">
                            🛡️ मुख्य सामरिक व राज्य तथ्य (Key Strategic Facts):
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              item.examDemandBreakdown.stateDefenceDemand.keyMilitaryOrStateFacts[lang] ||
                              item.examDemandBreakdown.stateDefenceDemand.keyMilitaryOrStateFacts.hi
                            ).map((f, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200"
                              >
                                • {f}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Defence/State MCQ */}
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/30 space-y-3">
                          <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[11px] border border-rose-500/30">
                            DEFENCE & STATE PSC MCQ
                          </span>

                          <p className="text-xs sm:text-sm text-slate-200 font-bold">
                            {item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.question[lang] ||
                              item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.question.hi}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.options[lang] ||
                              item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.options.hi
                            ).map((opt, optIdx) => {
                              const qKey = `def-${item.id}`;
                              const selected = userSelectedOption[qKey];
                              const isCorrect =
                                optIdx ===
                                item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.correctIndex;
                              const isChosen = selected === optIdx;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => setUserSelectedOption((prev) => ({ ...prev, [qKey]: optIdx }))}
                                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                                    selected !== undefined
                                      ? isCorrect
                                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                                        : isChosen
                                        ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 text-slate-400 border-slate-800'
                                      : isChosen
                                      ? 'bg-rose-600 text-white border-rose-400'
                                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-800'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selected !== undefined && isCorrect && (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {userSelectedOption[`def-${item.id}`] !== undefined && (
                            <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800">
                              <strong className="text-rose-300">समाधान व्याख्या:</strong>{' '}
                              {item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.explanation[lang] ||
                                item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq.explanation.hi}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 7. MODAL: EXAM DEMAND DIFFERENCE RADAR MATRIX */}
      {showDemandRadarModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full bg-[#0A1931] border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {EXAM_DEMAND_EXPLAINER.title[lang] || EXAM_DEMAND_EXPLAINER.title.hi}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold">
                    UPSC का करेंट अफेयर्स SSC या Banking से अलग क्यों होता है?
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDemandRadarModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {EXAM_DEMAND_EXPLAINER.comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{comp.icon}</span>
                      <h4 className="text-sm font-black text-white">{comp.exam}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {comp.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comp.demandNature[lang] || comp.demandNature.hi}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {comp.keyFocus.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-amber-300 border border-slate-800"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 font-bold block mb-1">
                JITOMNI 360° संप्रभु नियम:
              </strong>
              कभी भी UPSC की तैयारी केवल वन-लाइनर्स से न करें, और SSC में बड़े विश्लेषणात्मक निबंधों पर समय व्यर्थ न करें। हमारी प्रणाली प्रत्येक परीक्षा के वास्तविक पैटर्न के अनुसार तैयारी कराती है।
            </div>

            <button
              onClick={() => setShowDemandRadarModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm hover:scale-[1.01] transition-transform"
            >
              समझ गया, दैनिक करेंट अफेयर्स पढ़ना जारी रखें
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
