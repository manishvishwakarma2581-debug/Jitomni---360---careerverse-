import React, { useState, useEffect } from 'react';
import { X, Clock, Award, CheckCircle2, XCircle, AlertCircle, FileDown, RotateCcw, ChevronLeft, ChevronRight, Flag, Filter, Check, HelpCircle, Eye, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, MockExamConfig, QuizQuestion } from '../types';
import { translations } from '../data/translations';
import { generateMockExamAnalysisPdf, downloadPdfBlob } from '../utils/pdfGenerator';

interface MockTestModalProps {
  config: MockExamConfig;
  questions: QuizQuestion[];
  lang: Language;
  onClose: () => void;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({
  config,
  questions,
  lang: initialLang,
  onClose,
}) => {
  const [activeLang, setActiveLang] = useState<Language>(initialLang);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({});
  
  const marksPerQuestion = config.marksPerQuestion ?? config.positiveMarksPerQuestion ?? 1;
  const negativeMarkingRatio = config.negativeMarkingRatio ?? (config.negativeMarksPerQuestion ? config.negativeMarksPerQuestion / marksPerQuestion : 0.25);
  const durationMinutes = config.durationMinutes ?? config.timeLimitMinutes ?? 20;

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted'>('all');

  const currentQ = questions[currentIdx];
  const displayTitle = config.title?.[activeLang] || config.title?.['en'] || config.title?.['hi'] || config.title?.['hinglish'] || config.examName || `${config.examType || 'Competitive'} CBT Mock Test`;

  // Track visited questions
  useEffect(() => {
    if (currentQ) {
      setVisitedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  }, [currentIdx, currentQ]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const handleSelectAnswer = (optIndex: number) => {
    if (isSubmitted || !currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleClearAnswer = () => {
    if (isSubmitted || !currentQ) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const toggleReviewMark = () => {
    if (!currentQ) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleSaveAndNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  const handleRetake = () => {
    setUserAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({});
    setTimeLeftSeconds(durationMinutes * 60);
    setIsSubmitted(false);
    setCurrentIdx(0);
    setResultFilter('all');
  };

  // Calculations
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === undefined) {
      unattemptedCount++;
    } else if (ans === q.correctIndex) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalPossibleMarks = questions.length * marksPerQuestion;
  const positiveMarks = correctCount * marksPerQuestion;
  const negativeDeduction = wrongCount * (marksPerQuestion * negativeMarkingRatio);
  const finalScore = Math.max(0, positiveMarks - negativeDeduction);

  // Realistic Rank Estimation
  const totalMockAspirants = 48500;
  const scorePercent = totalPossibleMarks > 0 ? finalScore / totalPossibleMarks : 0;
  const estimatedRank = Math.max(
    1,
    Math.round(totalMockAspirants * (1 - scorePercent * 0.96) + 4)
  );

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadReport = async () => {
    try {
      setIsDownloadingPdf(true);
      const pdfBytes = await generateMockExamAnalysisPdf(
        config,
        finalScore,
        totalPossibleMarks,
        correctCount,
        wrongCount,
        unattemptedCount,
        estimatedRank,
        totalMockAspirants,
        questions,
        userAnswers,
        activeLang
      );
      downloadPdfBlob(pdfBytes, `JITOMNI_MOCK_REPORT_${config.examType}_${activeLang}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Filtered list for post-exam review
  const filteredReviewQuestions = questions.filter((q) => {
    const userAns = userAnswers[q.id];
    if (resultFilter === 'wrong') return userAns !== undefined && userAns !== q.correctIndex;
    if (resultFilter === 'correct') return userAns === q.correctIndex;
    if (resultFilter === 'unattempted') return userAns === undefined;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A1931] w-full max-w-6xl max-h-[95vh] rounded-2xl sm:rounded-3xl border border-amber-500/50 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header with Live Info and Language Switcher */}
        <div className="p-3 sm:p-4 bg-[#030B1E] border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20">
              {config.examType || 'Exam'} CBT
            </span>
            <div>
              <h2 className="font-heading font-black text-white text-sm sm:text-base leading-tight">
                {displayTitle}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>Roll: JIT-2026-8941</span>
                <span>•</span>
                <span>+{marksPerQuestion} / -{(marksPerQuestion * negativeMarkingRatio).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mid-Test Language Switcher */}
            <div className="flex items-center bg-[#071329] p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveLang('hi')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeLang === 'hi'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setActiveLang('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeLang === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLang('hinglish')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeLang === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* Timer */}
            {!isSubmitted && (
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm ${
                  timeLeftSeconds < 300
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-[#102447] border-amber-500/40 text-amber-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Test Body */}
        {!isSubmitted ? (
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4">
            {/* Left/Main Question & OMR Area */}
            <div className="lg:col-span-3 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-6">
              {currentQ ? (
                <div className="space-y-4">
                  {/* Top Bar for Question */}
                  <div className="flex items-center justify-between text-xs text-amber-300/90 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        Question {currentIdx + 1} of {questions.length}
                      </span>
                      {currentQ.category && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                          {currentQ.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-400 font-mono">
                        +{marksPerQuestion} Correct
                      </span>
                      <span className="text-[11px] text-rose-400 font-mono">
                        -{ (marksPerQuestion * negativeMarkingRatio).toFixed(2) } Wrong
                      </span>
                      <button
                        onClick={toggleReviewMark}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          markedForReview[currentQ.id]
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Text Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#102447] border border-amber-500/30 shadow-inner">
                    <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {currentQ.question[activeLang] || currentQ.question['en']}
                    </p>
                  </div>

                  {/* OMR Options Selector */}
                  <div className="space-y-3">
                    {(currentQ.options[activeLang] || currentQ.options['en']).map((opt, optIdx) => {
                      const isSelected = userAnswers[currentQ.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          id={`opt-btn-${currentQ.id}-${optIdx}`}
                          onClick={() => handleSelectAnswer(optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center gap-3.5 group ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500/25 via-[#102447] to-amber-500/10 border-amber-400 text-amber-200 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
                              : 'bg-[#071329] border-slate-800 text-slate-200 hover:bg-[#0f2142] hover:border-slate-700'
                          }`}
                        >
                          {/* Round OMR Bubble */}
                          <div
                            className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center shrink-0 border-2 transition-all ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md scale-105'
                                : 'bg-[#030B1E] text-slate-400 border-slate-700 group-hover:border-amber-400 group-hover:text-amber-300'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className="leading-snug flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                    disabled={currentIdx === 0}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs disabled:opacity-40 hover:bg-slate-700 transition-all flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{translations.buttons.previousQuestion[activeLang]}</span>
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    disabled={currentIdx === questions.length - 1}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-500/40 transition-all flex items-center gap-1"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleClearAnswer}
                    className="px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30 transition-all"
                  >
                    Clear Response
                  </button>
                </div>

                <button
                  id="submit-cbt-exam-btn"
                  onClick={handleSubmitTest}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-emerald-500/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{translations.buttons.finishTest[activeLang]}</span>
                </button>
              </div>
            </div>

            {/* Right Question Palette & OMR Sheet Status */}
            <div className="p-4 bg-[#071329] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Question Palette
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {Object.keys(userAnswers).length}/{questions.length} Answered
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isReview = markedForReview[q.id];
                    const isCurrent = currentIdx === idx;
                    const isVisited = visitedQuestions[q.id];

                    let bgClass = 'bg-slate-800 text-slate-400 border-slate-700';
                    if (isAnswered && isReview) {
                      bgClass = 'bg-blue-600 text-white border-blue-400';
                    } else if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white border-emerald-400';
                    } else if (isReview) {
                      bgClass = 'bg-purple-600 text-white border-purple-400';
                    } else if (isVisited) {
                      bgClass = 'bg-rose-950/60 text-rose-300 border-rose-800';
                    }

                    if (isCurrent) {
                      bgClass += ' ring-2 ring-amber-400 font-black scale-105';
                    }

                    return (
                      <button
                        key={q.id}
                        id={`palette-btn-${idx}`}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-9 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Palette Legend */}
              <div className="p-3 rounded-2xl bg-[#030B1E] border border-slate-800 text-[11px] space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 shrink-0" />
                  <span>Answered ({Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-purple-600 shrink-0" />
                  <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-rose-950/60 border border-rose-800 shrink-0" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-800 border border-slate-700 shrink-0" />
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Detailed Result, Scorecard, Rank & 360° Wrong-Answer Solutions */
          <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#030B1E] via-[#102447] to-[#0A1931] border border-amber-500/50 text-center relative overflow-hidden shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-1 shadow-lg shadow-amber-500/30">
                <div className="w-full h-full bg-[#030B1E] rounded-[14px] flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wide">
                All-India Mock Test Scorecard
              </h3>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
                {displayTitle}
              </p>

              {/* Big Metrics Grid with Kitne Sahi & Kitne Galat */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
                <div className="p-3.5 rounded-2xl bg-[#071329] border border-amber-500/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Your Score</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">
                    {finalScore.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ {totalPossibleMarks} Marks</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#071329] border border-emerald-500/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Estimated AIR</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">
                    #{estimatedRank}
                  </span>
                  <span className="text-[10px] text-slate-400 block">in {totalMockAspirants.toLocaleString()} students</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#071329] border border-emerald-500/30 bg-emerald-950/20">
                  <span className="text-[11px] text-emerald-300 block font-bold">Kitne Sahi (Right)</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">
                    {correctCount}
                  </span>
                  <span className="text-[10px] text-emerald-400 block">+{positiveMarks.toFixed(1)} Marks</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#071329] border border-rose-500/30 bg-rose-950/20">
                  <span className="text-[11px] text-rose-300 block font-bold">Kitne Galat (Wrong)</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-400">
                    {wrongCount}
                  </span>
                  <span className="text-[10px] text-rose-400 block">-{negativeDeduction.toFixed(2)} Penalty</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#071329] border border-slate-700">
                  <span className="text-[11px] text-slate-400 block font-medium">Chhute Hue</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-300">
                    {unattemptedCount}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Unattempted</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#071329] border border-blue-500/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Accuracy Rate</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-400">
                    {correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0}%
                  </span>
                  <span className="text-[10px] text-blue-300 block">Precision</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="download-analysis-pdf-btn"
                  onClick={handleDownloadReport}
                  disabled={isDownloadingPdf}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-amber-500/30 flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{isDownloadingPdf ? 'Generating PDF...' : '📄 Download Scorecard & 360° Analysis PDF'}</span>
                </button>

                <button
                  onClick={handleRetake}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-700 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-take Test</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-700 transition-all"
              >
                {translations.buttons.close[activeLang]}
              </button>
            </div>

            {/* Filter Tabs for Question-by-Question Review */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-heading font-black text-white text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>360° Solution & Error Diagnostic</span>
                </h4>

                <div className="flex items-center gap-1 bg-[#071329] p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => setResultFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      resultFilter === 'all'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({questions.length})
                  </button>
                  <button
                    onClick={() => setResultFilter('wrong')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      resultFilter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'text-rose-400 hover:text-rose-200'
                    }`}
                  >
                    ❌ Wrong Only ({wrongCount})
                  </button>
                  <button
                    onClick={() => setResultFilter('correct')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      resultFilter === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : 'text-emerald-400 hover:text-emerald-200'
                    }`}
                  >
                    ✅ Correct ({correctCount})
                  </button>
                  <button
                    onClick={() => setResultFilter('unattempted')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      resultFilter === 'unattempted'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚪ Unattempted ({unattemptedCount})
                  </button>
                </div>
              </div>

              {filteredReviewQuestions.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#071329] text-center text-slate-400 text-sm border border-slate-800">
                  No questions in this filter category.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReviewQuestions.map((q) => {
                    const originalIdx = questions.findIndex((item) => item.id === q.id);
                    const userAns = userAnswers[q.id];
                    const isCorrect = userAns === q.correctIndex;
                    const isUnattempted = userAns === undefined;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : isUnattempted
                            ? 'bg-slate-900/60 border-slate-800'
                            : 'bg-rose-950/25 border-rose-500/40 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white text-sm">
                              Q{originalIdx + 1}.
                            </span>
                            {q.category && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                                {q.category}
                              </span>
                            )}
                          </div>

                          <span
                            className={`font-black px-2.5 py-1 rounded-md text-xs ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : isUnattempted
                                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}
                          >
                            {isCorrect
                              ? `+${marksPerQuestion} Marks Awarded`
                              : isUnattempted
                              ? 'Unattempted (0 Marks)'
                              : `-${(marksPerQuestion * negativeMarkingRatio).toFixed(2)} Negative Deducted`}
                          </span>
                        </div>

                        <p className="font-bold text-white text-sm sm:text-base mb-3 leading-relaxed">
                          {q.question[activeLang] || q.question['en']}
                        </p>

                        <div className="text-xs space-y-1.5 text-slate-300">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400 w-24 shrink-0">Your Answer:</span>
                            <span
                              className={`font-bold ${
                                isCorrect
                                  ? 'text-emerald-400'
                                  : isUnattempted
                                  ? 'text-slate-400 italic'
                                  : 'text-rose-400'
                              }`}
                            >
                              {isUnattempted
                                ? 'Not Attempted'
                                : `Option ${String.fromCharCode(65 + userAns)}: ${(q.options[activeLang] || q.options['en'])[userAns]}`}
                            </span>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold w-24 shrink-0">
                              Correct Answer:
                            </span>
                            <span className="text-emerald-300 font-bold">
                              Option {String.fromCharCode(65 + q.correctIndex)}:{' '}
                              {(q.options[activeLang] || q.options['en'])[q.correctIndex]}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3.5 p-3.5 rounded-xl bg-[#030B1E]/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                          <span className="font-bold text-amber-400 flex items-center gap-1.5">
                            <span>🧠 360° Concept Explanation & Analysis:</span>
                          </span>
                          <p className="leading-relaxed">
                            {q.explanation[activeLang] || q.explanation['en']}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

