import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  FileText,
  Play,
  CheckCircle2,
  Network,
  ChevronRight,
  Clock,
  ShieldAlert,
  Sparkles,
  Filter,
  BookOpen,
  Layers,
  Check,
  HelpCircle,
  ChevronDown,
  Compass,
  Flame,
  Zap,
  TrendingUp,
  Target,
  ArrowRight,
} from 'lucide-react';
import { CompetitiveExam, Language, MockExamConfig, QuizQuestion, TopicItem, CompetitiveTopicDetail } from '../types';
import { getSyllabusTreeForExam } from '../data/fullSyllabusTree';
import { competitiveCurriculumData, mockExamConfigs, mockQuestionsByExam } from '../data/curriculumData';
import { examPatternsData } from '../data/examPatternsData';
import { competitiveSpecialTopics } from '../data/competitiveSpecialTopics';
import { CompetitiveTopicModal } from './CompetitiveTopicModal';
import { translations } from '../data/translations';
import { generateTopicPdf, downloadPdfBlob } from '../utils/pdfGenerator';
import { buildFallbackFramework, buildFallbackQuiz } from '../utils/aiTopicSynthesizer';

interface ExamModuleProps {
  lang: Language;
  onSelectTopic: (topic: TopicItem) => void;
  onOpenQuiz: (topic: TopicItem) => void;
  onOpenVideo: (topic: TopicItem) => void;
  onOpenInfographic: (topic: TopicItem) => void;
  onStartMockTest: (config: MockExamConfig, questions: QuizQuestion[]) => void;
}

export const ExamModule: React.FC<ExamModuleProps> = ({
  lang,
  onSelectTopic,
  onOpenQuiz,
  onOpenVideo,
  onOpenInfographic,
  onStartMockTest,
}) => {
  const [selectedExam, setSelectedExam] = useState<CompetitiveExam>('SSC');
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState<string>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'cards'>('hierarchy');
  const [generatingPdfTopicId, setGeneratingPdfTopicId] = useState<string | null>(null);
  const [activeCompetitiveTopic, setActiveCompetitiveTopic] = useState<CompetitiveTopicDetail | null>(null);

  const exams: { id: CompetitiveExam; label: string; badge: string; icon: string }[] = [
    { id: 'SSC', label: 'SSC (CGL/CHSL/GD)', badge: 'Speed Heavy', icon: '📊' },
    { id: 'MP Police', label: 'MP Police & SI', badge: 'State Police', icon: '👮' },
    { id: 'Banking', label: 'Banking (IBPS/SBI)', badge: 'Puzzle & DI', icon: '🏦' },
    { id: 'UPSC', label: 'UPSC CSE', badge: 'Concept + Apply', icon: '⚖️' },
    { id: 'MPPSC', label: 'MPPSC State PCS', badge: 'MP GK + GS', icon: '🏛️' },
    { id: 'Railway', label: 'Railway RRB NTPC', badge: 'PYQ Heavy', icon: '🚆' },
    { id: 'NEET', label: 'NEET (UG)', badge: 'NCERT Medical', icon: '🧬' },
    { id: 'JEE', label: 'JEE (Main/Adv)', badge: 'Engineering', icon: '⚡' },
    { id: 'Patwari', label: 'MP Patwari / Vyapam', badge: 'Revenue & GK', icon: '🌾' },
    { id: 'Teacher', label: 'Teacher (Varg 1/2/3)', badge: 'Pedagogy', icon: '👩‍🏫' },
    { id: 'CTET', label: 'CTET Paper 1 & 2', badge: 'Central TET', icon: '📝' },
    { id: 'CUET', label: 'CUET UG / PG', badge: 'University', icon: '🎓' },
    { id: 'NDA', label: 'NDA Defence', badge: 'Defence', icon: '🎖️' },
  ];

  // Active Exam Pattern Info from Master Dataset
  const activePattern = useMemo(() => {
    return examPatternsData[selectedExam] || examPatternsData['SSC'];
  }, [selectedExam]);

  // Auto-loaded subjects from master syllabus tree
  const examSubjects = useMemo(() => {
    return getSyllabusTreeForExam(selectedExam);
  }, [selectedExam]);

  // Filter subjects based on Category (Quant, Reasoning, Science, GK, Language)
  const categoryClassifiedSubjects = useMemo(() => {
    if (selectedSubjectCategory === 'all') return examSubjects;
    return examSubjects.filter((subj) => {
      const nameLower = ((subj.name?.en || '') + ' ' + (subj.name?.hi || '')).toLowerCase();
      if (selectedSubjectCategory === 'quant') {
        return nameLower.includes('math') || nameLower.includes('quant') || nameLower.includes('arithmetic') || nameLower.includes('गणित');
      }
      if (selectedSubjectCategory === 'reasoning') {
        return nameLower.includes('reasoning') || nameLower.includes('logic') || nameLower.includes('तर्कशक्ति');
      }
      if (selectedSubjectCategory === 'science') {
        return nameLower.includes('science') || nameLower.includes('physic') || nameLower.includes('chem') || nameLower.includes('bio') || nameLower.includes('विज्ञान');
      }
      if (selectedSubjectCategory === 'gk_gs') {
        return nameLower.includes('gk') || nameLower.includes('gs') || nameLower.includes('general') || nameLower.includes('history') || nameLower.includes('polity') || nameLower.includes('geography') || nameLower.includes('mp') || nameLower.includes('सामान्य ज्ञान');
      }
      if (selectedSubjectCategory === 'language') {
        return nameLower.includes('hindi') || nameLower.includes('english') || nameLower.includes('pedagogy') || nameLower.includes('भाषा') || nameLower.includes('बाल विकास');
      }
      return true;
    });
  }, [examSubjects, selectedSubjectCategory]);

  // Set default subject and expand first chapter when exam changes
  React.useEffect(() => {
    setSelectedSubjectId('all');
    if (examSubjects.length > 0) {
      setExpandedChapterId(examSubjects[0]?.chapters[0]?.id || null);
    }
  }, [selectedExam, examSubjects]);

  // Transform a syllabus node into a full TopicItem
  const convertNodeToTopicItem = (
    topicNode: { id: string; name: { hi: string; en: string; hinglish: string } },
    subjectName: string,
    chapterName: string
  ): TopicItem => {
    const topicHi = topicNode.name?.hi || topicNode.name?.en || 'विषय';
    const topicEn = topicNode.name?.en || topicNode.name?.hi || 'Topic';
    const topicHinglish = topicNode.name?.hinglish || `${topicEn} (${topicHi})`;

    const existing = competitiveCurriculumData.find(
      (t) => t.id === topicNode.id || (t.name?.en && t.name.en.toLowerCase() === topicEn.toLowerCase())
    );
    if (existing) {
      return existing;
    }

    const topicLocalizedName = topicNode.name?.[lang] || topicEn;
    const framework = buildFallbackFramework(topicLocalizedName, subjectName, chapterName, selectedExam);
    const quiz = buildFallbackQuiz(topicLocalizedName);

    return {
      id: topicNode.id,
      name: {
        hi: topicHi,
        en: topicEn,
        hinglish: topicHinglish,
      },
      subject: subjectName,
      chapter: chapterName,
      examType: selectedExam,
      difficulty: 'Advanced',
      framework,
      quiz,
      videoScript: {
        title: { hi: `${topicHi} - 360° विश्लेषणात्मक वीडियो`, en: `${topicEn} - 360° Visual Lesson`, hinglish: `${topicHinglish} - 360° Video` },
        duration: '5:30',
        scenes: [
          {
            timestamp: '00:00',
            narration: { hi: `प्रतियोगी परीक्षा ${selectedExam} के लिए इस विषय का 360° विश्लेषण।`, en: `360° critical breakdown of this concept for ${selectedExam}.`, hinglish: `Exam ${selectedExam} ke liye 360° conceptual analysis.` },
            visualPrompt: 'High-yield conceptual diagram with key equations and real data points',
            keyConcept: { hi: 'मुख्य अवधारणा', en: 'Core Concept', hinglish: 'Core Concept' },
          },
        ],
      },
      conceptMapNodes: [
        { id: 'c1', label: { hi: topicHi, en: topicEn, hinglish: topicHinglish }, x: 200, y: 150, type: 'core' },
        { id: 'c2', label: { hi: 'क्या (What)', en: 'What', hinglish: 'Kya' }, x: 100, y: 60, type: 'pillar' },
        { id: 'c3', label: { hi: 'क्यों (Why)', en: 'Why', hinglish: 'Kyu' }, x: 300, y: 60, type: 'pillar' },
        { id: 'c4', label: { hi: 'कैसे (How)', en: 'How', hinglish: 'Kaise' }, x: 100, y: 240, type: 'pillar' },
        { id: 'c5', label: { hi: 'समाधान (Solution)', en: 'Solution', hinglish: 'Solution' }, x: 300, y: 240, type: 'action' },
      ],
    };
  };

  // Mock Exam Config for the chosen exam
  const currentMockConfig: MockExamConfig = useMemo(() => {
    if (mockExamConfigs[selectedExam]) {
      return mockExamConfigs[selectedExam]!;
    }
    return {
      id: `exam-${selectedExam.toLowerCase().replace(/\s+/g, '-')}`,
      examType: selectedExam,
      title: {
        hi: `${selectedExam} समग्र मॉक परीक्षा (CBT Pattern)`,
        en: `${selectedExam} Comprehensive CBT Mock Test`,
        hinglish: `${selectedExam} Real Exam Mock Test`,
      },
      examName: `${selectedExam} Real CBT Test`,
      totalQuestions: activePattern?.totalQuestions || 20,
      timeLimitMinutes: activePattern?.durationMinutes || 20,
      durationMinutes: activePattern?.durationMinutes || 20,
      positiveMarksPerQuestion: activePattern?.negativeMarking === '0.50 marks' ? 2 : 1,
      negativeMarksPerQuestion: 0.5,
      marksPerQuestion: 2.0,
      negativeMarkingRatio: 0.25,
      totalMarks: activePattern?.totalMarks || 100,
      passingPercentage: 45,
    };
  }, [selectedExam, activePattern]);

  const handleQuickPdf = async (e: React.MouseEvent, topic: TopicItem) => {
    e.stopPropagation();
    try {
      setGeneratingPdfTopicId(topic.id);
      const pdfBytes = await generateTopicPdf(topic, lang);
      downloadPdfBlob(pdfBytes, `JITOMNI_360_${topic.examType || selectedExam}_${topic.id}_${lang}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPdfTopicId(null);
    }
  };

  const handleLaunchMock = () => {
    let questions: QuizQuestion[] = mockQuestionsByExam[selectedExam] || [];
    
    // Supplement with generated questions from the syllabus tree
    examSubjects.forEach((subj) => {
      subj.chapters.forEach((ch) => {
        ch.topics.forEach((t) => {
          const generatedQuiz = buildFallbackQuiz(t.name[lang] || t.name.en);
          questions.push(...generatedQuiz);
        });
      });
    });

    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, currentMockConfig.totalQuestions || 20);
    onStartMockTest(currentMockConfig, shuffled);
  };

  // Filtered displayed subjects
  const displayedSubjects = useMemo(() => {
    let list = categoryClassifiedSubjects;
    if (selectedSubjectId !== 'all') {
      list = list.filter((s) => s.id === selectedSubjectId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list
        .map((subj) => {
          const matchingChapters = subj.chapters
            .map((ch) => {
              const matchingTopics = ch.topics.filter(
                (t) =>
                  (t.name?.hi || '').toLowerCase().includes(q) ||
                  (t.name?.en || '').toLowerCase().includes(q) ||
                  (t.name?.hinglish || '').toLowerCase().includes(q)
              );
              if (
                (ch.name?.hi || '').toLowerCase().includes(q) ||
                (ch.name?.en || '').toLowerCase().includes(q) ||
                matchingTopics.length > 0
              ) {
                return { ...ch, topics: matchingTopics.length > 0 ? matchingTopics : ch.topics };
              }
              return null;
            })
            .filter(Boolean) as typeof subj.chapters;

          if (
            (subj.name?.hi || '').toLowerCase().includes(q) ||
            (subj.name?.en || '').toLowerCase().includes(q) ||
            matchingChapters.length > 0
          ) {
            return { ...subj, chapters: matchingChapters.length > 0 ? matchingChapters : subj.chapters };
          }
          return null;
        })
        .filter(Boolean) as typeof examSubjects;
    }
    return list;
  }, [categoryClassifiedSubjects, selectedSubjectId, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      
      {/* 1. TOP HERO BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>COMPETITIVE EXAMS 360° ENGINE</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Exam-Pattern Based Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              10-Second Shortcut Tricks
            </span>
            <span className="text-xs text-amber-300/80 font-bold ml-auto hidden sm:inline-block">
              🎯 SSC • MP Police • Banking • UPSC • Vyapam
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-wide">
            {translations.exam.title[lang]}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            School system se alag, pure competitive exam pattern — Quantitative Aptitude, Logical Reasoning, General Science aur GK/GS ka alag-alag high-yield syllabus, 10-Year PYQ Bank, aur Basic vs 10-Second Short Trick Engine!
          </p>
        </div>

        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. EXAM SELECTOR CAROUSEL */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0A1931] border border-slate-800 space-y-5 shadow-lg">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Choose Target Competitive Exam:
            </label>
            <span className="text-[11px] text-slate-400">
              Selected: <span className="text-amber-300 font-bold">{selectedExam}</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {exams.map((ex) => {
              const isSelected = selectedExam === ex.id;
              return (
                <button
                  key={ex.id}
                  id={`exam-btn-${ex.id.replace(/\s+/g, '')}`}
                  onClick={() => setSelectedExam(ex.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 scale-105 ring-2 ring-amber-400'
                      : 'bg-[#071329] text-slate-300 hover:bg-[#102447] hover:text-amber-300 border border-slate-800'
                  }`}
                >
                  <span className="text-base">{ex.icon}</span>
                  <span>{ex.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/60 text-amber-300 border border-amber-500/20">
                    {ex.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DYNAMIC EXAM PATTERN & WEIGHTAGE BLUEPRINT CARD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0c1e3d] via-[#08152b] to-[#050D1A] border-2 border-indigo-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl border border-indigo-500/30">
                📋
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Official Blueprint & Strategy
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activePattern?.title?.[lang] || activePattern?.title?.en || `${selectedExam} Pattern Matrix`}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 font-semibold border border-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activePattern?.durationMinutes || 60} Mins</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-emerald-300 font-semibold border border-slate-700">
                {activePattern?.totalQuestions || 100} Qs / {activePattern?.totalMarks || 200} Marks
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-300 font-semibold border border-rose-800/40">
                Neg: {activePattern?.negativeMarking || '0.25'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
            {activePattern?.subtitle?.[lang] || activePattern?.subtitle?.hi || activePattern?.strategyTip?.[lang] || activePattern?.strategyTip?.hi || activePattern?.pyqTrendSummary?.[lang] || ''}
          </p>

          {/* Subject Breakdown Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {(activePattern?.subjectBreakdown || []).map((sb, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-200">{sb.subject}</span>
                  <span className="text-amber-400">{sb.questions} Qs</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{sb.marks} Marks</span>
                  <span className="text-emerald-400 font-medium">{sb.speedImportance} Speed</span>
                </div>
              </div>
            ))}
          </div>

          {/* Speed & Pro Tip Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>
                <strong>Target Speed:</strong> {Math.round(((activePattern?.durationMinutes || 60) * 60) / (activePattern?.totalQuestions || 100))} sec per question
              </span>
            </div>

            <button
              onClick={handleLaunchMock}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Launch {selectedExam} CBT Mock Test</span>
            </button>
          </div>
        </div>

        {/* 4. HIGH-YIELD SPECIAL SHORT-TRICK TOPICS SPOTLIGHT */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Featured 10-Second Short Trick Mastery Topics:
              </h3>
            </div>
            <span className="text-xs text-indigo-400">Zero Algebra • Direct Mental Math</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Topic 1: Profit & Loss */}
            <div
              onClick={() => setActiveCompetitiveTopic(competitiveSpecialTopics['comp-profit-loss'])}
              className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500/40 hover:border-amber-400/80 p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <span>📊</span> Quantitative Aptitude
                  </span>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                    2-3 Qs Guaranteed
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  लाभ और हानि (Profit & Loss) — Master Shortcuts
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                  CP = SP equal goods trick, successive discount AB/100, and cheating shopkeeper 10-second shortcuts with 5 years past PYQs.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Saves 70s per question
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Engine</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Topic 2: Direction Test */}
            <div
              onClick={() => setActiveCompetitiveTopic(competitiveSpecialTopics['comp-direction-distance'])}
              className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/40 hover:border-amber-400/80 p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <span>🧩</span> Logical Reasoning
                  </span>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    Diagram & Logic Tree
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  दिशा और दूरी परीक्षण (Direction Test) — Linear N-E-S-W
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                  No paper drawing required! 8-direction compass angles, shadow logic during sunrise/sunset, and direct Pythagoras distance shortcuts.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
                <span className="text-cyan-300 font-semibold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  Zero Drawing Needed
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Engine</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SEPARATED COMPETITIVE SUBJECT CLASSIFICATION TABS */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Filter by Dedicated Subject Agent:
          </label>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all', label: 'All Subjects', icon: '🌐' },
              { id: 'quant', label: 'Quantitative Aptitude (Maths)', icon: '📊' },
              { id: 'reasoning', label: 'Logical Reasoning', icon: '🧩' },
              { id: 'science', label: 'General Science', icon: '🔬' },
              { id: 'gk_gs', label: 'GK / GS & MP Special', icon: '🏛️' },
              { id: 'language', label: 'Language & Pedagogy', icon: '📚' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedSubjectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedSubjectCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                    : 'bg-[#071329] text-slate-300 hover:bg-[#102447] border border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & View Mode Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-800 items-center">
          <div className="md:col-span-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="exam-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${selectedExam} topics, formulas or PYQs...`}
                className="w-full pl-9 pr-4 py-2 bg-[#071329] border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex justify-end gap-2">
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-[#071329] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Syllabus Tree</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'cards'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-[#071329] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>360° Cards</span>
            </button>
          </div>
        </div>

      </div>

      {/* Topics Content Area */}
      {viewMode === 'hierarchy' ? (
        /* HIERARCHICAL SYLLABUS TREE ACCORDION VIEW */
        <div className="space-y-6">
          {displayedSubjects.map((subj) => (
            <div key={subj.id} className="rounded-3xl bg-[#0A1931] border border-slate-800 overflow-hidden shadow-lg">
              {/* Subject Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#071329] to-[#0A1931] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-2xl bg-slate-800/80 border border-slate-700">{subj.icon}</span>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>{subj.name[lang] || subj.name.en}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {selectedExam} Pattern
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      {subj.chapters.length} High-Yield Chapters • Detailed PYQs & Shortcuts
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Ready to Practice
                </span>
              </div>

              {/* Chapters List */}
              <div className="divide-y divide-slate-800/80">
                {subj.chapters.map((ch, chIdx) => {
                  const isExpanded = expandedChapterId === ch.id;
                  return (
                    <div key={ch.id} className="transition-colors">
                      <button
                        onClick={() => setExpandedChapterId(isExpanded ? null : ch.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#0e2246] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-300 text-xs font-black flex items-center justify-center border border-amber-500/30 shrink-0">
                            {chIdx + 1}
                          </span>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-200">
                              {ch.name[lang] || ch.name.en}
                            </h3>
                            <p className="text-xs text-slate-400">
                              {ch.topics.length} In-depth Exam Topics
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                            {ch.topics.length} Topics
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Topics Grid */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 bg-[#050D1A]/80 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {ch.topics.map((t, tIdx) => {
                              const fullTopic = convertNodeToTopicItem(t, subj.name?.[lang] || subj.name?.en || 'Subject', ch.name?.[lang] || ch.name?.en || 'Chapter');
                              
                              // Check if we have pre-baked special competitive topic
                              const isSpecialProfitLoss = (t.name?.en || '').toLowerCase().includes('profit') || (t.name?.hi || '').includes('लाभ');
                              const isSpecialDirection = (t.name?.en || '').toLowerCase().includes('direction') || (t.name?.hi || '').includes('दिशा');
                              
                              return (
                                <div
                                  key={t.id}
                                  id={`topic-item-${t.id}`}
                                  onClick={() => {
                                    if (isSpecialProfitLoss) {
                                      setActiveCompetitiveTopic(competitiveSpecialTopics['comp-profit-loss']);
                                    } else if (isSpecialDirection) {
                                      setActiveCompetitiveTopic(competitiveSpecialTopics['comp-direction-distance']);
                                    } else {
                                      onSelectTopic(fullTopic);
                                    }
                                  }}
                                  className="p-3.5 rounded-2xl bg-[#0A1931] border border-slate-800 hover:border-amber-500/60 hover:bg-[#0f254c] transition-all cursor-pointer group flex flex-col justify-between space-y-2.5 shadow-md"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                                        Topic {tIdx + 1}
                                      </span>
                                      <span className="text-[10px] text-emerald-400 font-semibold">10-Year PYQ</span>
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                      {t.name?.[lang] || t.name?.en || t.name?.hi || 'Topic'}
                                    </h4>
                                  </div>

                                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                                    <button
                                      onClick={(e) => handleQuickPdf(e, fullTopic)}
                                      className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[11px] font-bold transition-all flex items-center gap-1"
                                      title="Direct PDF"
                                    >
                                      <FileText className="w-3 h-3" />
                                      <span>PDF</span>
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenQuiz(fullTopic);
                                      }}
                                      className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-300 text-[11px] font-bold transition-all flex items-center gap-1"
                                      title="Take Quiz"
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Quiz</span>
                                    </button>
                                    <span className="text-amber-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[11px]">
                                      <span>Analyze</span>
                                      <ChevronRight className="w-3 h-3" />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedSubjects.flatMap((subj) =>
            subj.chapters.flatMap((ch) =>
              ch.topics.map((t) => {
                const topic = convertNodeToTopicItem(t, subj.name?.[lang] || subj.name?.en || 'Subject', ch.name?.[lang] || ch.name?.en || 'Chapter');
                const isSpecialProfitLoss = (t.name?.en || '').toLowerCase().includes('profit') || (t.name?.hi || '').includes('लाभ');
                const isSpecialDirection = (t.name?.en || '').toLowerCase().includes('direction') || (t.name?.hi || '').includes('दिशा');

                return (
                  <div
                    key={topic.id}
                    id={`topic-card-${topic.id}`}
                    onClick={() => {
                      if (isSpecialProfitLoss) {
                        setActiveCompetitiveTopic(competitiveSpecialTopics['comp-profit-loss']);
                      } else if (isSpecialDirection) {
                        setActiveCompetitiveTopic(competitiveSpecialTopics['comp-direction-distance']);
                      } else {
                        onSelectTopic(topic);
                      }
                    }}
                    className="p-5 sm:p-6 rounded-3xl bg-[#0A1931] border border-slate-800 hover:border-amber-500/50 hover:bg-[#0c1e3d] transition-all duration-200 cursor-pointer shadow-lg group flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30">
                          {topic.subject}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{topic.chapter}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {topic.name[lang] || topic.name['en']}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {topic.framework?.kya?.content[lang] || topic.framework?.kya?.content['en']}
                      </p>

                      <div className="grid grid-cols-3 gap-1.5 mt-3 text-[10px] font-bold">
                        <span className="p-1 rounded bg-[#102447] text-amber-300 text-center border border-amber-500/20">
                          1. क्या (What)
                        </span>
                        <span className="p-1 rounded bg-[#102447] text-blue-300 text-center border border-blue-500/20">
                          2. क्यों (Why)
                        </span>
                        <span className="p-1 rounded bg-[#102447] text-emerald-300 text-center border border-emerald-500/20">
                          3. कैसे (How)
                        </span>
                        <span className="p-1 rounded bg-[#102447] text-purple-300 text-center border border-purple-500/20">
                          4. सूत्र (Formula)
                        </span>
                        <span className="p-1 rounded bg-[#102447] text-rose-300 text-center border border-rose-500/20">
                          5. बेसिक (Basic)
                        </span>
                        <span className="p-1 rounded bg-[#102447] text-yellow-300 text-center border border-yellow-500/20">
                          6. शॉर्ट ट्रिक (10s)
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={(e) => handleQuickPdf(e, topic)}
                          disabled={generatingPdfTopicId === topic.id}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-xs font-bold border border-amber-500/40 transition-all flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{generatingPdfTopicId === topic.id ? 'PDF...' : 'PDF'}</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenVideo(topic);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold border border-blue-500/40 transition-all flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Video</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuiz(topic);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/40 transition-all flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Quiz</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenInfographic(topic);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold border border-purple-500/40 transition-all flex items-center gap-1"
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>Map</span>
                        </button>
                      </div>

                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Short Trick Master</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      )}

      {/* 6. COMPETITIVE TOPIC FULL MASTER MODAL */}
      {activeCompetitiveTopic && (
        <CompetitiveTopicModal
          topic={activeCompetitiveTopic}
          language={lang}
          onClose={() => setActiveCompetitiveTopic(null)}
          onLaunchFullMock={handleLaunchMock}
        />
      )}

    </div>
  );
};

