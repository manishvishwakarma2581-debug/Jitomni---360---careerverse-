import React, { useState } from 'react';
import { 
  GraduationCap, ShieldCheck, CheckCircle2, Award, Briefcase, 
  Search, Filter, Sparkles, BookOpen, Clock, FileCheck, ArrowRight, 
  User, Phone, MapPin, Check, Video, Camera, Dumbbell, AlertCircle, 
  Smile, Activity, Volume2, Flame, Brain, ChevronRight, Share2 
} from 'lucide-react';
import { JobVacancy, SkillTest, Language, AIInterviewResult } from '../types';
import { initialVacancies, prebuiltSkillTests } from '../data/initialData';
import { InteractiveTestModal } from './InteractiveTestModal';
import { AIInterviewerModule } from './AIInterviewerModule';

interface SkilledCandidateDashboardProps {
  lang: Language;
  onOpenAIInterviewTab?: () => void;
}

export const SkilledCandidateDashboard: React.FC<SkilledCandidateDashboardProps> = ({ 
  lang,
  onOpenAIInterviewTab 
}) => {
  // Candidate Profile State
  const [candidateName, setCandidateName] = useState('Manish Vishwakarma');
  const [candidatePhone, setCandidatePhone] = useState('+91 98931 44556');
  const [candidateEducation, setCandidateEducation] = useState('B.Com / M.Com Graduate');
  const [isDegreeVerified, setIsDegreeVerified] = useState(true);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(true);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Interview State
  const [isAIInterviewVerified, setIsAIInterviewVerified] = useState(true);
  const [aiInterviewScore, setAiInterviewScore] = useState(92);
  const [aiInterviewBadge, setAiInterviewBadge] = useState('Diamond Verified');
  const [isAIInterviewModalOpen, setIsAIInterviewModalOpen] = useState(false);
  const [selectedVacancyForAIInterview, setSelectedVacancyForAIInterview] = useState<JobVacancy | null>(null);

  // Selected Skills for Matching
  const [mySkills, setMySkills] = useState<string[]>([
    'Advanced Excel',
    'VLOOKUP',
    'Tally Prime',
    'Python',
    'System Design',
    'Crisis Management'
  ]);

  // Skill Test Modal State
  const [selectedVacancyForTest, setSelectedVacancyForTest] = useState<JobVacancy | null>(null);
  const [selectedSkillTest, setSelectedSkillTest] = useState<SkillTest | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [passedVacanciesMap, setPassedVacanciesMap] = useState<Record<string, { score: number; total: number; percentage: number }>>({
    'vac-1': { score: 9, total: 10, percentage: 90 },
    'vac-5': { score: 10, total: 10, percentage: 100 }
  });

  const availableSkillsList = [
    'Advanced Excel',
    'VLOOKUP',
    'Pivot Tables',
    'Tally Prime',
    'GST Filing',
    'Python',
    'Django',
    'REST API',
    'System Design',
    'Crisis Management',
    'Corporate Audit',
    'Google Ads'
  ];

  const handleToggleSkill = (skill: string) => {
    if (mySkills.includes(skill)) {
      setMySkills(mySkills.filter((s) => s !== skill));
    } else {
      setMySkills([...mySkills, skill]);
    }
  };

  const handleStartSkillTest = (vacancy: JobVacancy) => {
    const matchedTest = prebuiltSkillTests.find((t) => t.vacancyId === vacancy.id) || prebuiltSkillTests[0];
    setSelectedVacancyForTest(vacancy);
    setSelectedSkillTest(matchedTest);
    setIsTestModalOpen(true);
  };

  const handleStartAIInterview = (vacancy?: JobVacancy) => {
    setSelectedVacancyForAIInterview(vacancy || null);
    setIsAIInterviewModalOpen(true);
  };

  const handleTestComplete = (passed: boolean, score: number, total: number, percentage: number) => {
    if (passed && selectedVacancyForTest) {
      setPassedVacanciesMap((prev) => ({
        ...prev,
        [selectedVacancyForTest.id]: { score, total, percentage },
      }));
    }
  };

  const handleAIInterviewComplete = (res: AIInterviewResult) => {
    setIsAIInterviewVerified(true);
    setAiInterviewScore(res.metrics.overallScore);
    setAiInterviewBadge(res.metrics.badgeGrade);
  };

  // Filtered Vacancies Feed
  const filteredVacancies = initialVacancies.filter((vac) => {
    const matchesSearch =
      vac.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vac.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vac.skillsRequired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesFilter = true;
    if (selectedSkillFilter === 'HighProfile') {
      matchesFilter = !!vac.isHighProfile;
    } else if (selectedSkillFilter !== 'All') {
      matchesFilter = vac.skillsRequired.some((s) => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CANDIDATE PROFILE HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E1204] via-[#2A1B07] to-[#120B02] border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> ROLE 2: SKILLED CANDIDATE DASHBOARD
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% NO FAKE RESUME
              </span>
              {isAIInterviewVerified && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                  <Video className="w-3.5 h-3.5" /> 🎥 AI INTERVIEW VERIFIED ({aiInterviewBadge} - {aiInterviewScore}%)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
                {candidateName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <span>{candidateName}</span>
                  {isDegreeVerified && (
                    <span title="Degree & Aadhaar Verified">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </span>
                  )}
                </h1>
                <p className="text-xs text-amber-200/90 font-medium">
                  {candidateEducation} • {candidatePhone}
                </p>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setIsDegreeVerified(!isDegreeVerified)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isDegreeVerified
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>डिग्री फोटो वेरिफाइड</span>
                {isDegreeVerified && <Check className="w-3 h-3 text-emerald-400" />}
              </button>

              <button
                onClick={() => setIsAadhaarVerified(!isAadhaarVerified)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isAadhaarVerified
                    ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>आधार वेरिफाइड</span>
                {isAadhaarVerified && <Check className="w-3 h-3 text-blue-400" />}
              </button>

              <button
                onClick={() => handleStartAIInterview()}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>AI वीडियो इंटरव्यू स्टेटस</span>
                <span className="bg-slate-950 text-amber-300 px-1.5 py-0.2 rounded text-[10px]">{aiInterviewScore}%</span>
              </button>
            </div>
          </div>

          {/* Quick Skill Selector Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 max-w-sm space-y-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>आपकी चुनी हुई स्किल्स (Select Skills):</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableSkillsList.map((sk) => (
                <button
                  key={sk}
                  onClick={() => handleToggleSkill(sk)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    mySkills.includes(sk)
                      ? 'bg-amber-500 text-slate-950 ring-1 ring-amber-300'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {mySkills.includes(sk) ? '✓ ' : '+ '}
                  {sk}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI INTERVIEW VERIFICATION SHOWCASE & 5D BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#071530] via-[#0A2252] to-[#071530] border border-blue-500/40 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                High-Profile AI Assessor
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> AI Interview Verified (ID: JIT-AI-INT-2026-9140)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>🎥 आपका 5D पर्सनालिटी व एबिलिटीज वेरिफिकेशन स्कोरकार्ड</span>
            </h2>
            <p className="text-xs text-slate-300">
              फ्रंट कैमरा व माइक द्वारा हाव-भाव (Facial Expressions), बॉडी लैंग्वेज, आई-कॉन्टैक्ट, संवाद स्पष्टता व क्राइसिस डिसीजन मेकिंग का आधिकारिक विश्लेषण।
            </p>
          </div>

          <button
            onClick={() => handleStartAIInterview()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 whitespace-nowrap transition-all"
          >
            <Video className="w-4 h-4" />
            <span>लाइव AI इंटरव्यू री-अटेम्प्ट / प्रैक्टिस करें</span>
          </button>
        </div>

        {/* 5-Metric Quick Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-[#06142E] border border-blue-900/60 space-y-1">
            <div className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              <span>हाव-भाव (Hav-Bhav)</span>
            </div>
            <div className="text-lg font-black text-amber-400">88%</div>
            <div className="text-[10px] text-slate-400">स्थिर व सकारात्मक</div>
          </div>

          <div className="p-3 rounded-xl bg-[#06142E] border border-blue-900/60 space-y-1">
            <div className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>बॉडी लैंग्वेज & आई</span>
            </div>
            <div className="text-lg font-black text-blue-400">90%</div>
            <div className="text-[10px] text-slate-400">आई-कॉन्टैक्ट: 86%</div>
          </div>

          <div className="p-3 rounded-xl bg-[#06142E] border border-blue-900/60 space-y-1">
            <div className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>संवाद (Communication)</span>
            </div>
            <div className="text-lg font-black text-emerald-400">92%</div>
            <div className="text-[10px] text-slate-400">फ्लूएंट & नो पैनिक</div>
          </div>

          <div className="p-3 rounded-xl bg-[#06142E] border border-blue-900/60 space-y-1">
            <div className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>क्राइसिस हैंडलिंग</span>
            </div>
            <div className="text-lg font-black text-rose-400">94%</div>
            <div className="text-[10px] text-slate-400">तनाव में लॉजिकल हल</div>
          </div>

          <div className="p-3 rounded-xl bg-[#06142E] border border-blue-900/60 space-y-1 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-slate-300 font-bold flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              <span>डोमेन समझ (Depth)</span>
            </div>
            <div className="text-lg font-black text-indigo-400">91%</div>
            <div className="text-[10px] text-slate-400">सिस्टम व टैक्स एक्सपर्टीज</div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="जॉब, कंपनी या स्किल सर्च करें (ex: Tech Lead, Excel, Tally)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold shrink-0">फ़िल्टर:</span>
          {[
            { key: 'All', label: 'सभी नौकरियां' },
            { key: 'HighProfile', label: '👑 हाई-प्रोफाइल (AI इंटरव्यू)' },
            { key: 'Excel', label: 'Excel & MIS' },
            { key: 'Tally', label: 'Tally & Accounts' },
            { key: 'Python', label: 'Python Dev' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSkillFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedSkillFilter === tab.key
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* JOB FEED WITH TEST & AI INTERVIEW BUTTONS */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" />
            <span>उपलब्ध वेरिफाइड नौकरियां (10 MCQ + AI वीडियो इंटरव्यू)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            हाई-प्रोफाइल पदों में 10-MCQ टेस्ट के साथ <strong>AI वीडियो इंटरव्यू</strong> अनिवार्य है।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVacancies.map((vac) => {
            const hasPassed = passedVacanciesMap[vac.id];

            return (
              <div
                key={vac.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  hasPassed
                    ? 'bg-[#051C12] border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                    : vac.isHighProfile
                    ? 'bg-gradient-to-br from-[#0B1D45] to-[#06122B] border-amber-400/60 shadow-lg'
                    : 'bg-[#07132B] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div>
                  {/* Company & Verification Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3 text-amber-400" /> GST Verified Company
                        </span>
                        {vac.isHighProfile && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                            👑 हाई-प्रोफाइल लीडरशिप
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white mt-1.5">
                        {vac.postName}
                      </h3>
                      <p className="text-xs text-amber-300 font-bold">
                        {vac.companyName}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-white font-mono">
                        {vac.salaryDisplay}
                      </div>
                      <span className="text-[10px] text-slate-400">{vac.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-2">
                    {vac.description}
                  </p>

                  {/* Required Skills */}
                  <div className="pt-3 flex flex-wrap gap-1.5">
                    {vac.skillsRequired.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Test & AI Video Interview Action Status */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>
                      {vac.isHighProfile ? '10 MCQ + AI वीडियो इंटरव्यू' : '10 MCQ टेस्ट (पासिंग: 60%)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {vac.isHighProfile && (
                      <button
                        onClick={() => handleStartAIInterview(vac)}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>AI इंटरव्यू दें</span>
                      </button>
                    )}

                    {hasPassed ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>स्कोर {hasPassed.score}/{hasPassed.total} • वेरिफाइड</span>
                        </span>
                      </div>
                    ) : (
                      <button
                        id={`apply-test-btn-${vac.id}`}
                        onClick={() => handleStartSkillTest(vac)}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 whitespace-nowrap"
                      >
                        <Award className="w-4 h-4 text-slate-950" />
                        <span>10 MCQ टेस्ट दें</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE MCQ TEST MODAL */}
      <InteractiveTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        vacancy={selectedVacancyForTest}
        skillTest={selectedSkillTest}
        onTestComplete={handleTestComplete}
        lang={lang}
      />

      {/* FULL-SCREEN AI INTERVIEWER MODAL */}
      {isAIInterviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-6xl bg-[#06142E] border border-blue-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl my-auto">
            <button
              onClick={() => setIsAIInterviewModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 z-20"
            >
              ✕ बंद करें
            </button>

            <AIInterviewerModule
              lang={lang}
              targetVacancy={selectedVacancyForAIInterview}
              onInterviewCompleted={(res) => {
                handleAIInterviewComplete(res);
              }}
              onNavigateToCandidateHub={() => setIsAIInterviewModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
