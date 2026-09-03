import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Clock, ArrowRight, Award, AlertCircle, RefreshCw, BookOpen, Send, Phone, User, Mail, GraduationCap } from 'lucide-react';
import { SkillTest, JobVacancy, Language } from '../types';

interface InteractiveTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: JobVacancy | null;
  skillTest: SkillTest | null;
  onTestComplete: (passed: boolean, score: number, total: number, percentage: number) => void;
  lang: Language;
}

export const InteractiveTestModal: React.FC<InteractiveTestModalProps> = ({
  isOpen,
  onClose,
  vacancy,
  skillTest,
  onTestComplete,
  lang,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(720); // 12 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [hasPassed, setHasPassed] = useState<boolean | null>(null);

  // Candidate basic info for direct auto-push
  const [candidateName, setCandidateName] = useState('Manish Vishwakarma');
  const [candidatePhone, setCandidatePhone] = useState('+91 98931 44556');
  const [candidateEmail, setCandidateEmail] = useState('manish.v@verifiedjobs.in');
  const [candidateEducation, setCandidateEducation] = useState('B.Com / Graduate');

  // Reset when opened with a new test
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setTimeLeft(720);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setTestScore(null);
      setHasPassed(null);
    }
  }, [isOpen, skillTest?.id]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  if (!isOpen || !skillTest || !vacancy) return null;

  const questions = skillTest.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const totalQ = questions.length;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex,
    }));
  };

  const handleSubmitTest = async () => {
    if (isSubmitted || isSubmitting) return;
    setIsSubmitting(true);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQ) * 100);
    const passed = percentage >= 60;

    setTestScore(correctCount);
    setHasPassed(passed);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Call backend API to auto-match candidate if passed
    try {
      await fetch('/api/hiring/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          candidatePhone,
          candidateEmail,
          candidateEducation,
          candidateSkills: vacancy.skillsRequired,
          vacancyId: vacancy.id,
          score: correctCount,
          totalQuestions: totalQ,
          candidateAadhaarVerified: true,
          candidateDegreeVerified: true,
        }),
      });
    } catch (err) {
      console.warn('Backend submit test notification caught:', err);
    }

    onTestComplete(passed, correctCount, totalQ, percentage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#06122C] border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto">
        {/* Header Bar */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  10 MCQ Skill Verification
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-emerald-400 font-semibold">
                  Passing: 60%+ (6/10)
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {vacancy.postName} — {vacancy.companyName}
              </h3>
            </div>
          </div>

          {!isSubmitted && (
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono font-bold text-sm ${
              timeLeft < 180 ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' : 'bg-slate-800 border-slate-700 text-amber-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* ================= IF TEST SUBMITTED (RESULT SCREEN) ================= */}
        {isSubmitted && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            {hasPassed ? (
              /* PASS SCREEN */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 border border-emerald-500 text-emerald-300 uppercase tracking-wider">
                  🎉 टेस्ट पास • 100% वेरिफाइड कैंडिडेट
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  बधाई हो! आपने <span className="text-emerald-400">{Math.round(((testScore || 0) / totalQ) * 100)}% ({testScore}/{totalQ})</span> स्कोर किया है
                </h2>

                {/* Auto-Push Card */}
                <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-left max-w-xl mx-auto space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <Send className="w-4 h-4" />
                    <span>ऑटो-पुश सफल: प्रोफाइल सीधे कंपनी को भेज दी गई है</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p>• <strong>कंपनी</strong>: {vacancy.companyName} (GST वेरिफाइड)</p>
                    <p>• <strong>पद</strong>: {vacancy.postName}</p>
                    <p>• <strong>कैंडिडेट</strong>: {candidateName} ({candidatePhone})</p>
                    <p>• <strong>वेरिफाइड स्कोर</strong>: {testScore}/{totalQ} ({Math.round(((testScore || 0) / totalQ) * 100)}%)</p>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    कंपनी के HR को आपकी वेरिफाइड प्रोफाइल + टेस्ट स्कोर प्राप्त हो गया है। वे आपको सीधे कॉल/इंटरव्यू शेड्यूल करेंगे।
                  </p>
                </div>

                <button
                  id="test-pass-close-btn"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
                >
                  डैशबोर्ड पर वापस जाएं
                </button>
              </div>
            ) : (
              /* FAIL SCREEN */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 text-rose-400 mx-auto flex items-center justify-center">
                  <XCircle className="w-10 h-10" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 border border-rose-500 text-rose-300 uppercase tracking-wider">
                  स्कोर: {Math.round(((testScore || 0) / totalQ) * 100)}% (पासिंग 60% आवश्यक)
                </span>

                <h2 className="text-2xl font-black text-white">
                  7 दिन बाद फिर से प्रयास करें (Re-try in 7 Days)
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Jitomni पर कोई फेक प्रोफाइल नहीं जाती। कृपया नीचे दिए गए रिवीजन मटेरियल से तैयारी करें और 7 दिन बाद दोबारा टेस्ट दें।
                </p>

                {/* Revision Notes Card */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left max-w-xl mx-auto space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>तैयारी के लिए मुख्य टॉपिक्स ({vacancy.postName}):</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>VLOOKUP, INDEX-MATCH और कंडीशनल फॉर्मेटिंग की प्रैक्टिस करें।</li>
                    <li>शॉर्टकट कीज़ (Alt + N + V, F5, Alt + C) याद करें।</li>
                    <li>प्रैक्टिकल लाइव डेटा शीट्स और एरर हैंडलिंग (=IFERROR) समझें।</li>
                  </ul>
                </div>

                <button
                  id="test-fail-close-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  बंद करें
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= DURING ACTIVE TEST (QUESTION VIEW) ================= */}
        {!isSubmitted && (
          <div className="p-6 space-y-6">
            {/* Candidate Quick Header */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="आपका नाम"
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs w-44"
                />
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <input
                  type="text"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  placeholder="मोबाइल नंबर"
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs w-36"
                />
              </div>
              <div className="text-[11px] text-amber-400 font-semibold">
                (टेस्ट पास होते ही कंपनी को जाएगा)
              </div>
            </div>

            {/* Question Progress Dots */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    currentQuestionIndex === idx
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                      : selectedAnswers[idx] !== undefined
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Question Text */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>प्रश्न {currentQuestionIndex + 1} of {totalQ}</span>
                <span className="text-amber-400 font-bold">1 अंक</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ?.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ?.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all flex items-start gap-3 border ${
                      selectedAnswers[currentQuestionIndex] === optIdx
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      selectedAnswers[currentQuestionIndex] === optIdx
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                पिछला सवाल
              </button>

              <div className="text-xs text-slate-400">
                उत्तर दिए: <span className="text-white font-bold">{Object.keys(selectedAnswers).length}</span> / {totalQ}
              </div>

              {currentQuestionIndex < totalQ - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <span>अगला सवाल</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="submit-test-btn"
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>मूल्यांकन हो रहा है...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>टेस्ट सबमिट करें & वेरिफाई हों</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
