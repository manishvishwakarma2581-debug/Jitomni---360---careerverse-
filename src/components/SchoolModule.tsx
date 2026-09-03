import React, { useState, useMemo } from 'react';
import { BookOpen, Search, FileText, Play, CheckCircle2, Network, ChevronRight, Sparkles, Filter, Layers, ChevronDown, Award, Zap, Compass } from 'lucide-react';
import { Board, Language, TopicItem } from '../types';
import { getSyllabusTreeForClass } from '../data/fullSyllabusTree';
import { schoolCurriculumData } from '../data/curriculumData';
import { translations } from '../data/translations';
import { generateTopicPdf, downloadPdfBlob } from '../utils/pdfGenerator';
import { buildFallbackFramework, buildFallbackQuiz } from '../utils/aiTopicSynthesizer';

interface SchoolModuleProps {
  lang: Language;
  onSelectTopic: (topic: TopicItem) => void;
  onOpenQuiz: (topic: TopicItem) => void;
  onOpenVideo: (topic: TopicItem) => void;
  onOpenInfographic: (topic: TopicItem) => void;
}

export const SchoolModule: React.FC<SchoolModuleProps> = ({
  lang,
  onSelectTopic,
  onOpenQuiz,
  onOpenVideo,
  onOpenInfographic,
}) => {
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [selectedBoard, setSelectedBoard] = useState<Board>('MP Board');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'cards'>('hierarchy');
  const [generatingPdfTopicId, setGeneratingPdfTopicId] = useState<string | null>(null);

  const isKidsClass = selectedClass <= 5;
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const boards: Board[] = ['MP Board', 'CBSE', 'NCERT'];

  // Retrieve current class syllabus subject tree
  const syllabusSubjects = useMemo(() => {
    return getSyllabusTreeForClass(selectedClass);
  }, [selectedClass]);

  // Set default subject when class changes
  React.useEffect(() => {
    if (syllabusSubjects.length > 0) {
      setSelectedSubjectId('all');
      setExpandedChapterId(syllabusSubjects[0]?.chapters[0]?.id || null);
    }
  }, [selectedClass, syllabusSubjects]);

  // Transform a syllabus node into a full TopicItem
  const convertNodeToTopicItem = (
    topicNode: { id: string; name: { hi: string; en: string; hinglish: string } },
    subjectName: string,
    chapterName: string
  ): TopicItem => {
    const topicHi = topicNode.name?.hi || topicNode.name?.en || 'विषय';
    const topicEn = topicNode.name?.en || topicNode.name?.hi || 'Topic';
    const topicHinglish = topicNode.name?.hinglish || `${topicEn} (${topicHi})`;

    // Check if pre-baked in curriculumData
    const existing = schoolCurriculumData.find((t) => t.id === topicNode.id || (t.name?.en && t.name.en.toLowerCase() === topicEn.toLowerCase()));
    if (existing) {
      return existing;
    }

    const localizedName = topicNode.name?.[lang] || topicEn;
    const framework = buildFallbackFramework(localizedName, subjectName, chapterName, `Class ${selectedClass}`);
    const quiz = buildFallbackQuiz(localizedName);

    return {
      id: topicNode.id,
      name: {
        hi: topicHi,
        en: topicEn,
        hinglish: topicHinglish,
      },
      subject: subjectName,
      chapter: chapterName,
      classLevel: selectedClass,
      board: selectedBoard,
      difficulty: 'Medium',
      framework,
      quiz,
      videoScript: {
        title: { hi: `${topicHi} - 360° वीडियो व्याख्यान`, en: `${topicEn} - Visual Video Lesson`, hinglish: `${topicHinglish} - 360° Video` },
        duration: '4:15',
        scenes: [
          {
            timestamp: '00:00',
            narration: { hi: 'नमस्ते! आइए 360° नजरिए से इस विषय की शुरुआत करते हैं।', en: 'Welcome! Let us explore this concept from a 360° viewpoint.', hinglish: 'Hello dosto! Aaj hum is topic ko 360° logic se seekhenge.' },
            visualPrompt: 'Dynamic 3D blueprint illustrating core concepts',
            keyConcept: { hi: 'परिचय', en: 'Introduction', hinglish: 'Intro' },
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

  const handleQuickPdf = async (e: React.MouseEvent, topic: TopicItem) => {
    e.stopPropagation();
    try {
      setGeneratingPdfTopicId(topic.id);
      const pdfBytes = await generateTopicPdf(topic, lang);
      downloadPdfBlob(pdfBytes, `JITOMNI_360_Class${topic.classLevel || selectedClass}_${topic.id}_${lang}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPdfTopicId(null);
    }
  };

  // Filtered list of subjects based on search or selection
  const displayedSubjects = useMemo(() => {
    let list = syllabusSubjects;
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
        .filter(Boolean) as typeof syllabusSubjects;
    }
    return list;
  }, [syllabusSubjects, selectedSubjectId, searchQuery]);

  // Total topics count
  const totalTopicsCount = useMemo(() => {
    return syllabusSubjects.reduce((acc, s) => acc + s.chapters.reduce((cAcc, ch) => cAcc + ch.topics.length, 0), 0);
  }, [syllabusSubjects]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>School Education • Class 1 to 12</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium text-xs border border-blue-500/30">
              MP Board • CBSE • NCERT Mapped
            </span>
            <span className="text-xs text-amber-300/80 font-bold ml-auto">
              ✨ 100% Functional • Zero Dead Buttons
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-wide">
            {translations.school.title[lang]}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {translations.school.subtitle[lang]} — Select any class, subject, chapter and click any topic to immediately launch 360° AI synthesis, quiz, blueprints & direct PDF downloads!
          </p>
        </div>

        {/* Decorative Golden Blur */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Selectors Bar: Class + Board + Search */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4 shadow-lg">
        {/* Class Selector Carousel */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {translations.school.selectClass[lang]}:
            </label>
            <span className="text-xs text-slate-400">
              Showing Class {selectedClass} ({totalTopicsCount} Syllabus Topics)
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {classes.map((cls) => {
              const isSelected = selectedClass === cls;
              return (
                <button
                  key={cls}
                  id={`class-btn-${cls}`}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/30 scale-105 ring-2 ring-amber-400'
                      : 'bg-[#071329] text-slate-300 hover:bg-[#102447] hover:text-amber-300 border border-slate-800'
                  }`}
                >
                  Class {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Board Selector & View Mode Switch */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 border-t border-slate-800/80 items-center">
          {/* Board Buttons */}
          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 shrink-0">Board:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {boards.map((b) => (
                <button
                  key={b}
                  id={`board-btn-${b.replace(/\s+/g, '')}`}
                  onClick={() => setSelectedBoard(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedBoard === b
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                      : 'bg-[#071329] text-slate-300 hover:bg-[#102447] border border-slate-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Search Field */}
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="school-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or chapter..."
                className="w-full pl-9 pr-4 py-2 bg-[#071329] border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="md:col-span-3 flex justify-end gap-1.5">
            <button
              id="view-hierarchy-btn"
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-[#071329] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Syllabus Tree</span>
            </button>
            <button
              id="view-cards-btn"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
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

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/80">
          <button
            id="subject-tab-all"
            onClick={() => setSelectedSubjectId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubjectId === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-[#071329] text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Subjects ({syllabusSubjects.length})
          </button>
          {syllabusSubjects.map((subj) => (
            <button
              key={subj.id}
              id={`subject-tab-${subj.id}`}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedSubjectId === subj.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-[#071329] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{subj.icon}</span>
              <span>{subj.name[lang] || subj.name.en}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400">
                {subj.chapters.length} Ch
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
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
                      {subj.stream && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {subj.stream}
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {subj.chapters.length} Chapters • {subj.chapters.reduce((acc, c) => acc + c.topics.length, 0)} Total 360° Topics
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Ready to Learn
                </span>
              </div>

              {/* Chapters List */}
              <div className="divide-y divide-slate-800/80">
                {subj.chapters.map((ch, chIdx) => {
                  const isExpanded = expandedChapterId === ch.id;
                  return (
                    <div key={ch.id} className="transition-colors">
                      {/* Chapter Row Toggle */}
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
                              {ch.topics.length} In-depth Topics • Full 360° Framework
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

                      {/* 5 Topics Expanded Grid */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 bg-[#050D1A]/80 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {ch.topics.map((t, tIdx) => {
                              const fullTopic = convertNodeToTopicItem(t, subj.name[lang] || subj.name.en, ch.name[lang] || ch.name.en);
                              return (
                                <div
                                  key={t.id}
                                  id={`topic-item-${t.id}`}
                                  onClick={() => onSelectTopic(fullTopic)}
                                  className="p-3.5 rounded-2xl bg-[#0A1931] border border-slate-800 hover:border-amber-500/60 hover:bg-[#0f254c] transition-all cursor-pointer group flex flex-col justify-between space-y-2.5 shadow-md"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                                        Topic {tIdx + 1}
                                      </span>
                                      <span className="text-[10px] text-slate-400">360° Ready</span>
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                      {t.name[lang] || t.name.en}
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
                                      <span>360°</span>
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
        /* CARD MATRIX VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedSubjects.flatMap((subj) =>
            subj.chapters.flatMap((ch) =>
              ch.topics.map((t) => {
                const topic = convertNodeToTopicItem(t, subj.name[lang] || subj.name.en, ch.name[lang] || ch.name.en);
                return (
                  <div
                    key={topic.id}
                    id={`topic-card-${topic.id}`}
                    onClick={() => onSelectTopic(topic)}
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

                      {/* Tailored Dimension Badges for Class Level */}
                      {isKidsClass ? (
                        <div className="grid grid-cols-4 gap-1.5 mt-3 text-[10px] font-bold">
                          <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-300 text-center border border-pink-500/30">
                            📖 1. कहानी (Story)
                          </span>
                          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-center border border-amber-500/30">
                            🎨 2. चित्र (Visual)
                          </span>
                          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-center border border-emerald-500/30">
                            🎮 3. खेल (Game)
                          </span>
                          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-center border border-cyan-500/30">
                            🔊 4. सुनो (Audio)
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 mt-3 text-[10px] font-bold">
                          <span className="p-1 rounded bg-[#102447] text-amber-300 text-center border border-amber-500/20">
                            1. क्या
                          </span>
                          <span className="p-1 rounded bg-[#102447] text-blue-300 text-center border border-blue-500/20">
                            2. क्यों
                          </span>
                          <span className="p-1 rounded bg-[#102447] text-emerald-300 text-center border border-emerald-500/20">
                            3. कैसे
                          </span>
                          <span className="p-1 rounded bg-[#102447] text-purple-300 text-center border border-purple-500/20">
                            4. अनुप्रयोग
                          </span>
                          <span className="p-1 rounded bg-[#102447] text-rose-300 text-center border border-rose-500/20">
                            5. 10s ट्रिक
                          </span>
                          <span className="p-1 rounded bg-[#102447] text-yellow-300 text-center border border-yellow-500/20">
                            6. समाधान
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons on Card */}
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

                        {!isKidsClass ? (
                          <>
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
                                onOpenInfographic(topic);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold border border-purple-500/40 transition-all flex items-center gap-1"
                            >
                              <Network className="w-3.5 h-3.5" />
                              <span>Map</span>
                            </button>
                          </>
                        ) : null}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuiz(topic);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/40 transition-all flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isKidsClass ? '🎈 Khel Quiz' : 'Quiz'}</span>
                        </button>
                      </div>

                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{isKidsClass ? '🎈 360° Kahani' : '360° View'}</span>
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
    </div>
  );
};
