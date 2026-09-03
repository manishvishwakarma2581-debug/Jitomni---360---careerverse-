import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, QuizQuestion, TopicItem } from '../types';
import { translations } from '../data/translations';
import { classifyTopic, synthesizeAdaptive360 } from '../utils/topicClassifier';

interface QuizModalProps {
  topic: TopicItem;
  lang: Language;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ topic, lang, onClose }) => {
  const topicName = topic.name[lang] || topic.name['hi'] || topic.name['en'];
  const topicType = classifyTopic(topicName, topic.subject, topic.chapter, topic.classLevel, topic.examType);
  const adaptiveData = topic.adaptive360 || synthesizeAdaptive360(topicName, topic.subject, topic.chapter, topic.classLevel, topic.examType);

  // Build questions list: from topic.quiz or from adaptive synthesis
  const buildQuestions = (): QuizQuestion[] => {
    if (topic.quiz && topic.quiz.length >= 2) {
      return topic.quiz;
    }

    // Check if Kids Quiz exists
    if (adaptiveData.typeC_Kids?.kidsQuiz && adaptiveData.typeC_Kids.kidsQuiz.length > 0) {
      return adaptiveData.typeC_Kids.kidsQuiz.map((kq, idx) => ({
        id: `kq-${idx}`,
        question: kq.question,
        options: {
          hi: kq.emojiOptions.map((o) => `${o.emoji} ${o.label}`),
          en: kq.emojiOptions.map((o) => `${o.emoji} ${o.label}`),
          hinglish: kq.emojiOptions.map((o) => `${o.emoji} ${o.label}`),
        },
        correctIndex: kq.correctIndex,
        explanation: {
          hi: kq.funCelebration,
          en: kq.funCelebration,
          hinglish: kq.funCelebration,
        },
      }));
    }

    // Check if Solved PYQs exist (Type F)
    if (adaptiveData.typeF_Competitive?.solvedPyqBank && adaptiveData.typeF_Competitive.solvedPyqBank.length > 0) {
      return adaptiveData.typeF_Competitive.solvedPyqBank.map((pyq, idx) => ({
        id: `pyq-${idx}`,
        question: pyq.question,
        options: {
          hi: pyq.options,
          en: pyq.options,
          hinglish: pyq.options,
        },
        correctIndex: pyq.correctIndex,
        explanation: pyq.solutionStepByStep,
      }));
    }

    // Check if Reasoning Drills exist (Type E)
    if (adaptiveData.typeE_Reasoning?.practiceDrills && adaptiveData.typeE_Reasoning.practiceDrills.length > 0) {
      return adaptiveData.typeE_Reasoning.practiceDrills.map((drill, idx) => ({
        id: `drill-${idx}`,
        question: drill.question,
        options: {
          hi: drill.options,
          en: drill.options,
          hinglish: drill.options,
        },
        correctIndex: drill.correctIndex,
        explanation: drill.logicExplanation,
      }));
    }

    // Default 360 Adaptive 5-Question Framework for any topic
    return [
      {
        id: `q-${topic.id}-1`,
        question: {
          hi: `${topicName} का 360° मूल उद्देश्य और मुख्य अनुप्रयोग क्या है?`,
          en: `What is the core 360° purpose and primary application of ${topicName}?`,
          hinglish: `${topicName} ka primary 360° objective aur application kya hai?`,
        },
        options: {
          hi: [
            'संकल्पना को व्यावहारिक रूप से समझना और समस्याओं का समाधान करना',
            'केवल परीक्षा के लिए परिभाषाएं रटना',
            'बिना समझे याद करना',
            'केवल किताबी ज्ञान तक सीमित रहना',
          ],
          en: [
            'Practical understanding and systematic problem-solving',
            'Rote memorization solely for exams',
            'Memorizing formulas blindly',
            'Limiting knowledge to textbooks only',
          ],
          hinglish: [
            'Practical conceptual understanding aur critical problem solving',
            'Sirf definition ratna',
            'Bina samjhe yaad karna',
            'Kitabi gyan tak seemit rehna',
          ],
        },
        correctIndex: 0,
        explanation: {
          hi: '360° शिक्षा का उद्देश्य रटने की प्रवृत्ति को समाप्त कर छात्रों में विश्लेषणात्मक व तार्किक सोच विकसित करना है।',
          en: '360° conceptual education eliminates rote memorization, building practical reasoning and neural retention.',
          hinglish: '360° education framework ratta-fication khatam karke deep conceptual understanding banata hai.',
        },
      },
      {
        id: `q-${topic.id}-2`,
        question: {
          hi: `${topicName} में समय बचाने के लिए सबसे प्रभावी रणनीति क्या है?`,
          en: `What is the most effective time-saving strategy for ${topicName}?`,
          hinglish: `${topicName} me time save karne ki best speed strategy kya hai?`,
        },
        options: {
          hi: [
            '10-Second शॉर्टकट नियम और विजुअल मैपिंग का उपयोग',
            'लंबे किताबी पारंपरिक तरीके से गणना करना',
            'अनुमान लगाकर उत्तर चुनना',
            'कठिन प्रश्नों को छोड़ देना',
          ],
          en: [
            'Using 10-second shortcuts and visual mental mapping',
            'Applying lengthy conventional textbook steps',
            'Random blind guessing',
            'Skipping difficult analytical questions',
          ],
          hinglish: [
            '10-Second speed tricks aur visual mental mapping use karna',
            'Lambe traditional steps se time waste karna',
            'Blind guessing karna',
            'Questions skip kar dena',
          ],
        },
        correctIndex: 0,
        explanation: {
          hi: 'JITOMNI 10s स्पीड ट्रिक्स और विजुअल फ्लोचार्ट्स परीक्षा में 70% समय की बचत करते हैं।',
          en: 'JITOMNI 10s speed shortcuts and visual blueprints save up to 70% calculation time during exams.',
          hinglish: '10s Speed shortcuts exam me high accuracy ke sath time bachate hain.',
        },
      },
      {
        id: `q-${topic.id}-3`,
        question: {
          hi: `${topicName} के अध्ययन में सबसे आम त्रुटि (Common Mistake) क्या होती है?`,
          en: `What is the most common student pitfall when solving ${topicName}?`,
          hinglish: `${topicName} solve karte waqt sabse common student mistake kya hoti hai?`,
        },
        options: {
          hi: [
            'मूल संकल्पना और चिन्हों/नियमों की अनदेखी करके जल्दबाजी करना',
            'चरणबद्ध तरीके से प्रश्न का विश्लेषण करना',
            'शॉर्टकट ट्रिक्स का सही अभ्यास करना',
            'नियमित रिवीजन करना',
          ],
          en: [
            'Rushing through without checking core signs, conditions and conventions',
            'Systematic step-by-step reasoning',
            'Practicing shortcut formulas properly',
            'Consistent spaced revision',
          ],
          hinglish: [
            'Signs, core rules aur conditions ko bina dekhe jaldbazi karna',
            'Step-by-step question analysis karna',
            'Shortcuts ki proper practice karna',
            'Daily revision karna',
          ],
        },
        correctIndex: 0,
        explanation: {
          hi: 'अधिकांश छात्र बुनियादी चिन्हों (+ / -) या नियमों को नजरअंदाज करने के कारण नकारात्मक अंक पाते हैं।',
          en: 'Most negative marks happen due to rushing past foundational sign rules and boundary conditions.',
          hinglish: 'Foundational rules aur signs ko dhyan me rakhne se negative marking zero ho jati hai.',
        },
      },
      {
        id: `q-${topic.id}-4`,
        question: {
          hi: `${topicName} का वास्तविक जीवन (Real-World) में क्या महत्व है?`,
          en: `What is the real-world significance and utility of ${topicName}?`,
          hinglish: `${topicName} ka real life aur practical utility me kya role hai?`,
        },
        options: {
          hi: [
            'दैनिक गणनाओं, वैज्ञानिक निर्णय और तार्किक विश्लेषण में सीधी मदद',
            'दैनिक जीवन में इसका कोई उपयोग नहीं है',
            'यह केवल किताबी थ्योरी है',
            'केवल कागजी काम के लिए जरूरी है',
          ],
          en: [
            'Direct application in daily calculations, scientific reasoning & decision-making',
            'Zero utility in daily routine life',
            'Pure abstract academic theory with no application',
            'Only required for paperwork',
          ],
          hinglish: [
            'Daily calculations, scientific thinking aur smart decision making me direct use',
            'Real life me koi utility nahi hai',
            'Sirf paper pass karne ke liye hai',
            'Practical life me koi roll nahi hai',
          ],
        },
        correctIndex: 0,
        explanation: {
          hi: 'हर शैक्षणिक विषय का निर्माण दैनिक जीवन और उद्योगों की वास्तविक समस्याओं को हल करने के लिए हुआ है।',
          en: 'Every academic concept is rooted in solving real human, industrial, and societal challenges.',
          hinglish: '360° framework har topic ko daily life problems se connect karta hai.',
        },
      },
      {
        id: `q-${topic.id}-5`,
        question: {
          hi: `${topicName} में 100% निपुणता (Mastery) पाने का सबसे उत्तम उपाय क्या है?`,
          en: `What is the ultimate method to achieve 100% mastery in ${topicName}?`,
          hinglish: `${topicName} me 100% mastery hasil karne ka best tarika kya hai?`,
        },
        options: {
          hi: [
            '360° फ्रेमवर्क (क्या, क्यों, कैसे), माइंडमैप और PYQ अभ्यास',
            'परीक्षा के 1 दिन पहले रटना',
            'बिना समझे सूत्रों को याद करना',
            'केवल दूसरों के नोट्स पढ़ना',
          ],
          en: [
            '360° framework (What, Why, How), Mindmaps and rigorous PYQ drill',
            'Last-night cramming before exam',
            'Blind formula memorization without intuition',
            'Passively reading peer notes',
          ],
          hinglish: [
            '360° Framework (Kya, Kyu, Kaise) + Mindmaps + Speed PYQ Practice',
            'Exam se 1 din pehle ratna',
            'Bina samjhe formula ratna',
            'Dusro ke notes passive read karna',
          ],
        },
        correctIndex: 0,
        explanation: {
          hi: '360° वैज्ञानिक दृष्टिकोण और माइंडमैप्स मस्तिष्क में स्थायी न्यूरल कनेक्शन बनाते हैं।',
          en: 'The 360° framework builds permanent neural retention and complete conceptual mastery.',
          hinglish: '360° framework se retention 100% permanent ho jata hai.',
        },
      },
    ];
  };

  const questions = buildQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ: QuizQuestion | undefined = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ?.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A1931] w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-amber-500/50 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-500/40">
              {topicType === 'TYPE_C' ? '🎈 बाल क्विज' : '📝 360° Quiz'}
            </span>
            <div>
              <h3 className="font-heading font-black text-white text-base sm:text-lg">
                {topicName}
              </h3>
              <p className="text-xs text-amber-300/80">
                Question {currentIndex + 1} of {questions.length} • {adaptiveData.typeBadge}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {!isCompleted ? (
            <>
              {/* Question Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#102447] border border-amber-500/30">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  {topicType === 'TYPE_C' ? '🌟 बाल प्रश्न (Fun Kid Question)' : 'संकल्पनात्मक प्रश्न (Conceptual Question)'}
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question[lang] || currentQ.question['hi'] || currentQ.question['en']}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(currentQ.options[lang] || currentQ.options['hi'] || currentQ.options['en']).map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-[#071329] border-slate-800 text-slate-200 hover:border-amber-500/40 hover:bg-[#0c1e3d]';

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20';
                    } else if (isSelected && idx !== currentQ.correctIndex) {
                      btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 360 Explanation after submit */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#102447] to-blue-500/10 border border-amber-500/40 text-slate-200 text-xs sm:text-sm animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>360° वैज्ञानिक स्पष्टीकरण (Critical Analysis):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentQ.explanation[lang] || currentQ.explanation['hi'] || currentQ.explanation['en']}
                  </p>
                </div>
              )}

              {/* Action Controls */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm disabled:opacity-50 hover:scale-105 transition-all shadow-md shadow-amber-500/30"
                  >
                    {translations.buttons.submitAnswer[lang]}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:scale-105 transition-all shadow-md shadow-emerald-500/30 flex items-center gap-1.5"
                  >
                    <span>{currentIndex < questions.length - 1 ? translations.buttons.nextQuestion[lang] : 'Finish Quiz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Scorecard Celebration */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-600 p-1 shadow-xl shadow-amber-500/40">
                <div className="w-full h-full bg-[#030B1E] rounded-[22px] flex items-center justify-center">
                  <Award className="w-10 h-10 text-amber-400" />
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-black text-white font-heading">
                  शानदार प्रयास! (Quiz Completed)
                </h4>
                <p className="text-amber-300 text-sm font-medium mt-1">
                  आपने {questions.length} में से {score} प्रश्नों के सही उत्तर दिए!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#102447] border border-amber-500/30 max-w-sm mx-auto text-xs text-slate-300 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>सटीकता (Accuracy):</span>
                  <span className="text-amber-400">{Math.round((score / questions.length) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>360° समझ स्तर:</span>
                  <span className="text-emerald-400 font-bold">
                    {score === questions.length ? '🌟 Exceptional Master' : '👍 Good Understanding'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-700 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>फिर से अभ्यास करें</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-amber-500/30"
                >
                  {translations.buttons.close[lang]}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

