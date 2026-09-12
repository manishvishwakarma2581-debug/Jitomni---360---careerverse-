// src/components/FullChapterReaderModal.tsx
// Comprehensive Full-Chapter Study Reader & Complete Mega-Test Modal
// For all students (Class 1 to 12) according to NCERT & State Board syllabus!

import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  VolumeX,
  FileDown,
  Sparkles,
  Award,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Star,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Zap,
  Bookmark,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { ChapterStudyMaterial, syllabusEngine } from '../services/syllabusAutoFulfillService';
import { speech } from '../utils/speech';

interface FullChapterReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterId: string;
  chapterName: { hi: string; en: string; hinglish?: string };
  subjectName: string;
  classLevel: number;
  lang: Language;
  initialTab?: 'chapter' | 'vocabulary' | 'solutions' | 'megaTest';
}

export const FullChapterReaderModal: React.FC<FullChapterReaderModalProps> = ({
  isOpen,
  onClose,
  chapterId,
  chapterName,
  subjectName,
  classLevel,
  lang,
  initialTab = 'chapter',
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'chapter' | 'vocabulary' | 'solutions' | 'megaTest'>(initialTab);
  const [studyData, setStudyData] = useState<ChapterStudyMaterial | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // --- MEGA TEST STATE ---
  const [currentTestQuestionIndex, setCurrentTestQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);

  // Retrieve or synthesize on-demand full chapter material
  useEffect(() => {
    const data = syllabusEngine.getChapterStudyMaterial(chapterId, chapterName, subjectName, classLevel);
    setStudyData(data);
    setCurrentTestQuestionIndex(0);
    setSelectedAnswers({});
    setIsTestSubmitted(false);
    setTestScore(0);
    setActiveTab(initialTab);
  }, [chapterId, classLevel, subjectName, initialTab]);

  // Clean up speech on close
  useEffect(() => {
    return () => {
      speech.stop();
    };
  }, []);

  if (!studyData) return null;

  const isKids = studyData.isKidsMode;
  const hiTitle = studyData.chapterTitle.hi;
  const enTitle = studyData.chapterTitle.en;

  // Audio Read-aloud handler
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speech.stop();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = `${hiTitle}. `;
    if (isKids && studyData.kidsStory) {
      textToSpeak += studyData.kidsStory.storyParagraphs.map((p) => p.hi).join(' ');
      textToSpeak += ` शिक्षा: ${studyData.kidsStory.moralLesson.hi}`;
    } else {
      textToSpeak += `${studyData.overview.hi}. `;
      textToSpeak += studyData.keyConcepts.map((c) => `${c.title}. ${c.explanation}`).join(' ');
    }

    setIsSpeaking(true);
    speech.speak(textToSpeak, 'hi', () => {
      setIsSpeaking(false);
    });
  };

  // Mega Test Answer Handler
  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isTestSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  // Submit Mega Test
  const handleSubmitTest = () => {
    let score = 0;
    const questions = studyData.fullChapterTest.questions;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score += 1;
      }
    });
    setTestScore(score);
    setIsTestSubmitted(true);
    if (score >= questions.length * 0.6) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRetakeTest = () => {
    setSelectedAnswers({});
    setIsTestSubmitted(false);
    setTestScore(0);
    setCurrentTestQuestionIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#07132B] border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl my-auto space-y-6 max-h-[92vh] flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> कक्षा {classLevel} • {subjectName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                NCERT & बोर्ड प्रमाणित संपूर्ण अध्याय
              </span>
              {isKids && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ✨ सचित्र बाल कहानी व गेम मोड
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white font-heading">
              {hiTitle} <span className="text-sm font-normal text-slate-400 font-sans">({enTitle})</span>
            </h1>
          </div>

          {/* Top Actions: Read Aloud, Close */}
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={handleToggleSpeech}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'वाचन रोकें ⏸️' : 'पूरा अध्याय सुनें 🔊'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/80 pb-2 shrink-0">
          {[
            { id: 'chapter', label: isKids ? '📖 अध्याय की सचित्र कहानी' : '📖 पूरा अध्याय पाठ व संकल्पना', icon: BookOpen },
            { id: 'vocabulary', label: isKids ? '🌟 शब्दावली व ज्ञान बिंदु' : '💡 मुख्य परिभाषाएं व सूत्र', icon: Sparkles },
            { id: 'solutions', label: '✍️ NCERT अभ्यास व हल', icon: CheckCircle2 },
            { id: 'megaTest', label: '🏆 संपूर्ण अध्याय टेस्ट (10 प्रश्न)', icon: Award },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB BODY (SCROLLABLE) */}
        <div className="overflow-y-auto pr-1 space-y-6 flex-1">
          {/* =============================================================== */}
          {/* 1. FULL CHAPTER TEXT & STORY TAB */}
          {/* =============================================================== */}
          {activeTab === 'chapter' && (
            <div className="space-y-6">
              {/* Kids Story Mode if Class 1-5 */}
              {isKids && studyData.kidsStory && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1C0F38] to-[#120726] border-2 border-purple-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{studyData.kidsStory.characterEmoji}</span>
                      <div>
                        <h3 className="text-lg font-black text-amber-300">
                          {studyData.kidsStory.characterName} का बाल प्रसंग
                        </h3>
                        <p className="text-xs text-purple-200">परिवेश: {studyData.kidsStory.setting}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                      सरल व सचित्र
                    </span>
                  </div>

                  {/* Story Paragraphs */}
                  <div className="space-y-3 pt-2">
                    {studyData.kidsStory.storyParagraphs.map((para, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-4 rounded-2xl bg-black/40 border border-purple-800/60 space-y-1.5"
                      >
                        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                          {para.hi}
                        </p>
                        <p className="text-xs text-purple-300 italic leading-relaxed">{para.en}</p>
                      </div>
                    ))}
                  </div>

                  {/* Moral of the Story */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/50 flex items-start gap-3">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wider text-amber-300 block">
                        नैतिक शिक्षा (Moral Lesson):
                      </span>
                      <p className="text-sm font-bold text-white mt-0.5">{studyData.kidsStory.moralLesson.hi}</p>
                      <p className="text-xs text-amber-200/80 italic mt-0.5">{studyData.kidsStory.moralLesson.en}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* High School & Universal Comprehensive Text */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black text-white">अध्याय परिचय व सार (Overview)</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                  {studyData.overview.hi}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic">
                  {studyData.overview.en}
                </p>
              </div>

              {/* Core Concepts Breakdown */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>अध्याय के मुख्य वैचारिक स्तंभ (Core Concepts)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {studyData.keyConcepts.map((concept, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-5 rounded-2xl bg-[#081736] border border-blue-900/50 space-y-2 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{concept.icon || '📌'}</span>
                          <h4 className="text-sm font-black text-amber-300 leading-snug">{concept.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{concept.explanation}</p>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider pt-2 border-t border-blue-900/60">
                        ✓ 360° NCERT सत्यापित
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Jump to Mega Test CTA */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-purple-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-black text-white">अध्याय पढ़ लिया? अब अपनी तैयारी की जांच करें!</h4>
                  <p className="text-xs text-slate-300">
                    10 बहुविकल्पीय प्रश्नों का संपूर्ण अध्याय टेस्ट दें और अपना स्कोरकार्ड प्राप्त करें।
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('megaTest')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg flex items-center gap-2 whitespace-nowrap transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>10 MCQ महा-टेस्ट शुरू करें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 2. VOCABULARY & FORMULAS TAB */}
          {/* =============================================================== */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-6">
              {/* Kids Illustrated Vocabulary */}
              {isKids && studyData.kidsStory && (
                <div className="space-y-3">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>बच्चों के लिए नए शब्द व अर्थ (Vocabulary)</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {studyData.kidsStory.vocabulary.map((vocab, vIdx) => (
                      <div
                        key={vIdx}
                        className="p-4 rounded-2xl bg-[#1C0D36] border border-purple-800/60 space-y-1 text-center"
                      >
                        <div className="text-3xl">{vocab.emoji}</div>
                        <h4 className="text-sm font-black text-amber-300">{vocab.word}</h4>
                        <p className="text-xs text-slate-300">{vocab.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Definitions & Golden Rules */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-400" />
                  <span>महत्वपूर्ण परिभाषाएं व नियम (Rules & Formulas)</span>
                </h3>
                <div className="space-y-3">
                  {studyData.formulasAndDefinitions.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5"
                    >
                      <h4 className="text-sm sm:text-base font-black text-amber-400">{rule.termOrFormula}</h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{rule.meaningOrRule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 3. NCERT QUESTIONS & SOLUTIONS TAB */}
          {/* =============================================================== */}
          {activeTab === 'solutions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white">
                    पाठ्यपुस्तक अभ्यास प्रश्न व आदर्श हल (NCERT Exercise & Solutions)
                  </h3>
                  <p className="text-xs text-slate-400">
                    परीक्षा में पूरे अंक लाने हेतु चरणबद्ध व प्रामाणिक उत्तर।
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {studyData.ncertQuestionsAndSolutions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">{item.question}</h4>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-900/50 text-xs sm:text-sm text-emerald-200 space-y-1">
                      <p className="font-medium leading-relaxed">{item.answer}</p>
                      {item.hint && (
                        <p className="text-[11px] text-amber-300/80 font-mono">💡 संकेत: {item.hint}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 4. FULL CHAPTER MEGA TEST (10 MCQs) TAB */}
          {/* =============================================================== */}
          {activeTab === 'megaTest' && (
            <div className="space-y-6">
              {!isTestSubmitted ? (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div>
                      <h3 className="text-base font-black text-white">{studyData.fullChapterTest.title}</h3>
                      <p className="text-xs text-slate-400">
                        कुल प्रश्न: {studyData.fullChapterTest.questions.length} • पासिंग स्कोर:{' '}
                        {studyData.fullChapterTest.passingScore}%
                      </p>
                    </div>

                    <div className="text-xs text-amber-300 font-bold">
                      उत्तर दिए: {Object.keys(selectedAnswers).length} /{' '}
                      {studyData.fullChapterTest.questions.length}
                    </div>
                  </div>

                  {/* Question Cards List */}
                  <div className="space-y-5">
                    {studyData.fullChapterTest.questions.map((q, qIdx) => {
                      const userChoice = selectedAnswers[qIdx];
                      return (
                        <div
                          key={q.id}
                          className="p-5 rounded-2xl bg-[#08152E] border border-slate-800 space-y-3.5"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                              Q{qIdx + 1}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                              {q.question}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = userChoice === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectAnswer(qIdx, oIdx)}
                                  className={`p-3 rounded-xl text-xs sm:text-sm font-medium text-left transition-all border flex items-center gap-2.5 ${
                                    isSelected
                                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                                      : 'bg-slate-950/80 hover:bg-slate-900 text-slate-200 border-slate-800'
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center border ${
                                      isSelected
                                        ? 'bg-slate-950 text-amber-400 border-slate-950'
                                        : 'bg-slate-800 text-slate-300 border-slate-700'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span className="flex-1">{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      सभी {studyData.fullChapterTest.questions.length} प्रश्नों के उत्तर देकर टेस्ट सबमिट करें।
                    </span>
                    <button
                      onClick={handleSubmitTest}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>टेस्ट सबमिट करें व स्कोर देखें</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* TEST REPORT & EXPLANATION REVIEW */
                <div className="space-y-6 animate-in zoom-in-95">
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A2619] via-[#081F14] to-[#04120B] border-2 border-emerald-500/50 text-center space-y-3">
                    <div className="text-5xl">🏆</div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      अध्याय टेस्ट परिणाम: {testScore} / {studyData.fullChapterTest.questions.length} सही!
                    </h3>
                    <div className="text-xs font-bold text-emerald-300">
                      सफलता दर: {Math.round((testScore / studyData.fullChapterTest.questions.length) * 100)}% •{' '}
                      {testScore >= 6 ? '✓ उत्तीर्ण (PASS) - उत्कृष्ट तैयारी!' : 'सुधार की आवश्यकता - दोबारा प्रयास करें'}
                    </div>

                    <button
                      onClick={handleRetakeTest}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>टेस्ट दोबारा दें</span>
                    </button>
                  </div>

                  {/* Review Questions */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">
                      प्रश्नों का संपूर्ण विश्लेषण व सही उत्तर:
                    </h4>

                    {studyData.fullChapterTest.questions.map((q, qIdx) => {
                      const userChoice = selectedAnswers[qIdx];
                      const isCorrect = userChoice === q.correctOptionIndex;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
                            isCorrect
                              ? 'bg-[#061C12] border-emerald-500/40'
                              : 'bg-[#1F0A0A] border-rose-500/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-sm font-bold text-white">
                              {qIdx + 1}. {q.question}
                            </h5>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                              }`}
                            >
                              {isCorrect ? 'सही' : 'गलत'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-300 space-y-1">
                            <p>
                              <span className="font-bold text-emerald-400">सही उत्तर: </span>
                              {q.options[q.correctOptionIndex]}
                            </p>
                            <p className="text-slate-400 italic">
                              <span className="font-bold text-amber-300">व्याख्या: </span>
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
