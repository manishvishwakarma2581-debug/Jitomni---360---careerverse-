import React, { useState, useEffect } from 'react';
import { MainTab, Language, TopicItem, MockExamConfig, QuizQuestion, AppRole } from './types';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { HiringLandingHome } from './components/HiringLandingHome';
import { CompanyDashboard } from './components/CompanyDashboard';
import { SkilledCandidateDashboard } from './components/SkilledCandidateDashboard';
import { LabourDashboard } from './components/LabourDashboard';
import { SchoolModule } from './components/SchoolModule';
import { ExamModule } from './components/ExamModule';
import { AgriModule } from './components/AgriModule';
import { ITIModule } from './components/ITIModule';
import { IITModule } from './components/IITModule';
import { VacanciesDashboard } from './components/VacanciesDashboard';
import { GlobalAIJobsDashboard } from './components/GlobalAIJobsDashboard';
import { EnglishMentorModule } from './components/EnglishMentorModule';
import { DoubtSolverModule } from './components/DoubtSolverModule';
import { FlashcardsModule } from './components/FlashcardsModule';
import { PrimeManager } from './components/PrimeManager';
import { AdminSchedulerModule } from './components/AdminSchedulerModule';
import { AIInterviewerModule } from './components/AIInterviewerModule';
import { CompanionServiceModule } from './components/companion/CompanionServiceModule';
import { DailyCurrentAffairsHub } from './components/DailyCurrentAffairsHub';
import { TopicDetailModal } from './components/TopicDetailModal';
import { MockTestModal } from './components/MockTestModal';
import { QuizModal } from './components/QuizModal';
import { InfographicModal } from './components/InfographicModal';
import { VideoModal } from './components/VideoModal';
import { RoleLoginModal } from './components/RoleLoginModal';
import { AboutUsModal } from './components/AboutUsModal';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { MahiPawarKrishiAdminPortal } from './components/admin/MahiPawarKrishiAdminPortal';
import { FourteenModulesQualityRadarModal } from './components/admin/FourteenModulesQualityRadarModal';
import { AuthLoginModal } from './components/auth/AuthLoginModal';
import { UniversalPaymentModal } from './components/payment/UniversalPaymentModal';
import { UserDemandBoxModal } from './components/UserDemandBoxModal';
import { InstallPwaBanner } from './components/pwa/InstallPwaBanner';
import { AuthService } from './services/authService';
import { NOMINAL_PAYMENT_TIERS } from './services/paymentService';
import { PaymentTier, UserProfile } from './types';
import { JitomniEmblemLogo } from './components/JitomniEmblemLogo';
import { ShieldCheck, Building2, GraduationCap, HardHat, CheckCircle2, ArrowRight, Video, Sparkles, Flag, Cpu } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('jitomni_app_lang') as Language;
    return saved || 'hi';
  });

  const [activeTab, setActiveTab] = useState<MainTab>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/company') return 'company';
      if (path === '/jobs' || path === '/skilled') return 'skilled';
      if (path === '/labour-jobs' || path === '/labour') return 'labour';
      if (path === '/verifiedjobs' || path === '/verified-jobs') return 'verifiedjobs';
      if (path === '/companion' || path === '/on-demand-companion' || path === '/task-service') return 'companion';
      if (path === '/ai-interview' || path === '/interview') return 'ai-interview';
      if (path === '/agri' || path === '/krishi' || path === '/agriculture') return 'agri';
      if (path === '/iti' || path === '/iti-trades') return 'iti';
      if (path === '/iit' || path === '/jee' || path === '/iit-jee') return 'iit';
      if (path === '/school') return 'school';
      if (path === '/exam') return 'exam';
      if (path === '/current-affairs' || path === '/daily-ca' || path === '/ca') return 'current-affairs';
      if (path === '/vacancies') return 'vacancies';
      if (path === '/global-ai-jobs' || path === '/globaljobs') return 'globaljobs';
      if (path === '/english') return 'english';
      if (path === '/doubt') return 'doubt';
      if (path === '/flashcards') return 'flashcards';
      if (path === '/prime') return 'prime';
      if (path === '/admin') return 'admin';
      if (path === '/super-admin') return 'super-admin';
      if (path === '/krishi-admin') return 'krishi-admin';
    }
    return 'home';
  });

  // Modal states
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [quizTopic, setQuizTopic] = useState<TopicItem | null>(null);
  const [videoTopic, setVideoTopic] = useState<TopicItem | null>(null);
  const [infographicTopic, setInfographicTopic] = useState<TopicItem | null>(null);
  const [activeMockTest, setActiveMockTest] = useState<{ config: MockExamConfig; questions: QuizQuestion[] } | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthLoginModalOpen, setIsAuthLoginModalOpen] = useState(false);
  const [is14RadarModalOpen, setIs14RadarModalOpen] = useState(false);
  const [isDemandBoxOpen, setIsDemandBoxOpen] = useState(false);
  const [demandInitialQuery, setDemandInitialQuery] = useState('');
  const [activePaymentTier, setActivePaymentTier] = useState<PaymentTier | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(() => AuthService.getCurrentUser());

  // Listen for universal nominal payment events, 14-radar events, & demand box events from any module
  useEffect(() => {
    const handleOpenPayment = (e: any) => {
      const tier = e.detail || NOMINAL_PAYMENT_TIERS[0];
      setActivePaymentTier(tier);
    };
    const handleOpen14Radar = () => setIs14RadarModalOpen(true);
    const handleOpenDemandBox = (e: any) => {
      setDemandInitialQuery(e?.detail?.query || '');
      setIsDemandBoxOpen(true);
    };

    window.addEventListener('jitomni-open-payment', handleOpenPayment);
    window.addEventListener('jitomni-open-14-radar', handleOpen14Radar);
    window.addEventListener('jitomni-open-demand-box', handleOpenDemandBox);
    return () => {
      window.removeEventListener('jitomni-open-payment', handleOpenPayment);
      window.removeEventListener('jitomni-open-14-radar', handleOpen14Radar);
      window.removeEventListener('jitomni-open-demand-box', handleOpenDemandBox);
    };
  }, []);

  // Sync URL with Tab
  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      let path = '/';
      if (tab === 'company') path = '/company';
      else if (tab === 'skilled') path = '/jobs';
      else if (tab === 'labour') path = '/labour-jobs';
      else if (tab === 'verifiedjobs') path = '/verified-jobs';
      else if (tab === 'companion') path = '/companion';
      else if (tab === 'ai-interview') path = '/ai-interview';
      else if (tab === 'agri') path = '/agri';
      else if (tab === 'iti') path = '/iti';
      else if (tab === 'iit') path = '/iit';
      else if (tab === 'school') path = '/school';
      else if (tab === 'exam') path = '/exam';
      else if (tab === 'vacancies') path = '/vacancies';
      else if (tab === 'globaljobs') path = '/global-ai-jobs';
      else if (tab === 'english') path = '/english';
      else if (tab === 'doubt') path = '/doubt';
      else if (tab === 'flashcards') path = '/flashcards';
      else if (tab === 'prime') path = '/prime';
      else if (tab === 'admin') path = '/admin';
      else if (tab === 'super-admin') path = '/super-admin';
      else if (tab === 'krishi-admin') path = '/krishi-admin';
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/company') setActiveTab('company');
      else if (path === '/jobs' || path === '/skilled') setActiveTab('skilled');
      else if (path === '/labour-jobs' || path === '/labour') setActiveTab('labour');
      else if (path === '/verifiedjobs' || path === '/verified-jobs') setActiveTab('verifiedjobs');
      else if (path === '/companion' || path === '/on-demand-companion' || path === '/task-service') setActiveTab('companion');
      else if (path === '/ai-interview' || path === '/interview') setActiveTab('ai-interview');
      else if (path === '/agri' || path === '/krishi' || path === '/agriculture') setActiveTab('agri');
      else if (path === '/iti' || path === '/iti-trades') setActiveTab('iti');
      else if (path === '/iit' || path === '/jee' || path === '/iit-jee') setActiveTab('iit');
      else if (path === '/school') setActiveTab('school');
      else if (path === '/exam') setActiveTab('exam');
      else if (path === '/vacancies') setActiveTab('vacancies');
      else if (path === '/global-ai-jobs' || path === '/globaljobs') setActiveTab('globaljobs');
      else if (path === '/english') setActiveTab('english');
      else if (path === '/doubt') setActiveTab('doubt');
      else if (path === '/flashcards') setActiveTab('flashcards');
      else if (path === '/prime') setActiveTab('prime');
      else if (path === '/admin') setActiveTab('admin');
      else if (path === '/super-admin') setActiveTab('super-admin');
      else if (path === '/krishi-admin') setActiveTab('krishi-admin');
      else setActiveTab('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('jitomni_app_lang', lang);
  }, [lang]);

  // Derived current hiring role for sub-nav
  const currentHiringRole: AppRole = 
    activeTab === 'company' ? 'company' :
    activeTab === 'skilled' ? 'skilled' :
    activeTab === 'labour' ? 'labour' : 'home';

  const isHiringSectionActive = ['verifiedjobs', 'company', 'skilled', 'labour', 'ai-interview'].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col selection:bg-[#FFD700] selection:text-black font-sans antialiased">
      {/* Universal Global Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentLang={lang}
        onLanguageChange={setLang}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenAboutUs={() => setIsAboutModalOpen(true)}
        onOpenAuthLogin={() => setIsAuthLoginModalOpen(true)}
        onOpenPaymentModal={() => setActivePaymentTier(NOMINAL_PAYMENT_TIERS[0])}
        onOpen14RadarModal={() => setIs14RadarModalOpen(true)}
        onOpenDemandBox={() => {
          setDemandInitialQuery('');
          setIsDemandBoxOpen(true);
        }}
      />

      {/* Sub-Header Bar when inside Jitomni Verified Jobs */}
      {isHiringSectionActive && (
        <div className="bg-gradient-to-r from-[#000000] via-[#07132B] to-[#000000] border-b border-[#00D4FF]/30 px-4 sm:px-6 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <JitomniEmblemLogo size="xs" showGlow={false} />
              <span className="text-xs font-black text-white tracking-wide uppercase">
                Jitomni 360° Careerverse Platform
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% No Fake Profiles
              </span>
            </div>

            {/* Quick 3-Role Toggle Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => handleTabChange('verifiedjobs')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'verifiedjobs'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-[#06142E] text-slate-300 hover:text-white border border-blue-900/60'
                }`}
              >
                🛡️ ओवरव्यू
              </button>

              <button
                onClick={() => handleTabChange('company')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'company'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-[#06142E] text-slate-300 hover:text-blue-300 border border-blue-900/60'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>कंपनी डैशबोर्ड</span>
              </button>

              <button
                onClick={() => handleTabChange('skilled')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'skilled'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-[#06142E] text-slate-300 hover:text-indigo-300 border border-indigo-900/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>स्किल्ड सीकर</span>
              </button>

              <button
                onClick={() => handleTabChange('labour')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'labour'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/30'
                    : 'bg-[#06142E] text-slate-300 hover:text-amber-300 border border-amber-900/60'
                }`}
              >
                <HardHat className="w-3.5 h-3.5 text-amber-400" />
                <span>लेबर व कारीगर</span>
              </button>

              <button
                onClick={() => handleTabChange('ai-interview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'ai-interview'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : 'bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-amber-300 hover:text-white border border-amber-500/40'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>🎥 AI वीडियो इंटरव्यू (High-Profile)</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500 text-slate-950 font-black">PRO</span>
              </button>

              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="ml-2 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                🔑 आप कौन हैं?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <HomeDashboard
            lang={lang}
            onNavigateTab={handleTabChange}
            onSelectTopic={(t) => setSelectedTopic(t)}
          />
        )}

        {/* TAB 2: VERIFIED JOBS OVERVIEW */}
        {activeTab === 'verifiedjobs' && (
          <HiringLandingHome
            onSelectRole={(role) => handleTabChange(role as MainTab)}
            lang={lang}
          />
        )}

        {/* TAB 2.5: ON-DEMAND COMPANION & TASK SERVICE */}
        {activeTab === 'companion' && (
          <CompanionServiceModule lang={lang} />
        )}

        {/* TAB 3: COMPANY ROLE */}
        {activeTab === 'company' && (
          <CompanyDashboard lang={lang} />
        )}

        {/* TAB 4: SKILLED ROLE */}
        {activeTab === 'skilled' && (
          <SkilledCandidateDashboard 
            lang={lang} 
            onOpenAIInterviewTab={() => handleTabChange('ai-interview')}
          />
        )}

        {/* TAB 5: LABOUR ROLE */}
        {activeTab === 'labour' && (
          <LabourDashboard lang={lang} />
        )}

        {/* TAB 5.5: AI INTERVIEWER FOR HIGH PROFILE JOBS */}
        {activeTab === 'ai-interview' && (
          <AIInterviewerModule
            lang={lang}
            onNavigateToCandidateHub={() => handleTabChange('skilled')}
          />
        )}

        {/* TAB 5.7: KRISHI 360° AGRI-TECH & GLOBAL BENCHMARK */}
        {activeTab === 'agri' && (
          <AgriModule
            lang={lang}
            onNavigateTab={handleTabChange}
          />
        )}

        {/* TAB 5.8: ITI SOVEREIGN HUB (A TO Z TRADES & APPRENTICESHIP) */}
        {activeTab === 'iti' && (
          <ITIModule
            lang={lang}
          />
        )}

        {/* TAB 5.9: IIT & JEE ADVANCED 360° MASTER HUB */}
        {activeTab === 'iit' && (
          <IITModule
            lang={lang}
          />
        )}

        {/* TAB 6: SCHOOL MODULE */}
        {activeTab === 'school' && (
          <SchoolModule
            lang={lang}
            onSelectTopic={(t) => setSelectedTopic(t)}
            onOpenQuiz={(t) => setQuizTopic(t)}
            onOpenVideo={(t) => setVideoTopic(t)}
            onOpenInfographic={(t) => setInfographicTopic(t)}
          />
        )}

        {/* TAB 7: COMPETITIVE EXAM MODULE */}
        {activeTab === 'exam' && (
          <ExamModule
            lang={lang}
            onSelectTopic={(t) => setSelectedTopic(t)}
            onOpenQuiz={(t) => setQuizTopic(t)}
            onOpenVideo={(t) => setVideoTopic(t)}
            onOpenInfographic={(t) => setInfographicTopic(t)}
            onStartMockTest={(config, questions) => setActiveMockTest({ config, questions })}
          />
        )}

        {/* TAB 7.5: DAILY CURRENT AFFAIRS 360° (EXAM DEMAND BASED) */}
        {activeTab === 'current-affairs' && (
          <DailyCurrentAffairsHub
            lang={lang}
            onStartQuiz={(config, questions) => setActiveMockTest({ config, questions })}
            onBackToSyllabus={() => handleTabChange('exam')}
          />
        )}

        {/* TAB 8: SARKARI VACANCIES HUB */}
        {activeTab === 'vacancies' && (
          <VacanciesDashboard
            lang={lang}
            onNavigateToExam={() => handleTabChange('exam')}
          />
        )}

        {/* TAB 9: GLOBAL AI & FREELANCING JOBS */}
        {activeTab === 'globaljobs' && (
          <GlobalAIJobsDashboard lang={lang} />
        )}

        {/* TAB 10: ENGLISH AI MENTOR */}
        {activeTab === 'english' && (
          <EnglishMentorModule lang={lang} />
        )}

        {/* TAB 11: INSTANT AI DOUBT SOLVER */}
        {activeTab === 'doubt' && (
          <DoubtSolverModule
            lang={lang}
            onOpenTopic={(name) => {
              handleTabChange('school');
            }}
            onNavigateTab={handleTabChange}
            onOpenDemandBox={(q) => {
              setDemandInitialQuery(q || '');
              setIsDemandBoxOpen(true);
            }}
          />
        )}

        {/* TAB 12: SMART FLASHCARDS & WEAKNESS RADAR */}
        {activeTab === 'flashcards' && (
          <FlashcardsModule
            lang={lang}
            onOpenTopic={(name) => {
              handleTabChange('exam');
            }}
          />
        )}

        {/* TAB 13: JITOMNI PRIME AI MANAGER */}
        {activeTab === 'prime' && (
          <PrimeManager
            lang={lang}
            onOpenTopicModal={(t) => setSelectedTopic(t)}
            onNavigateTab={handleTabChange}
          />
        )}

        {/* TAB 14: ADMIN AUTO SCHEDULER */}
        {activeTab === 'admin' && (
          <AdminSchedulerModule
            lang={lang}
            onSelectTopic={(t) => setSelectedTopic(t)}
            onOpenQuiz={(t) => setQuizTopic(t)}
            onOpenVideo={(t) => setVideoTopic(t)}
            onNavigateTab={handleTabChange}
          />
        )}

        {/* TAB 15: SOVEREIGN SUPER ADMIN (MANISH VISHWAKARMA) */}
        {activeTab === 'super-admin' && (
          <SuperAdminDashboard
            lang={lang}
            onNavigateTab={handleTabChange}
          />
        )}

        {/* TAB 16: KRISHI 360° AUTONOMOUS DIRECTORATE (MAHI PAWAR) */}
        {activeTab === 'krishi-admin' && (
          <MahiPawarKrishiAdminPortal
            lang={lang}
            onNavigateTab={handleTabChange}
          />
        )}
      </main>

      {/* ALL INTERACTIVE MODALS */}

      {/* 1. Topic Detail 360° Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          lang={lang}
          onClose={() => setSelectedTopic(null)}
          onOpenQuiz={(t) => {
            setSelectedTopic(null);
            setQuizTopic(t);
          }}
          onOpenVideo={(t) => {
            setSelectedTopic(null);
            setVideoTopic(t);
          }}
          onOpenInfographic={(t) => {
            setSelectedTopic(null);
            setInfographicTopic(t);
          }}
        />
      )}

      {/* 2. Interactive CBT Mock Examination Modal */}
      {activeMockTest && (
        <MockTestModal
          config={activeMockTest.config}
          questions={activeMockTest.questions}
          lang={lang}
          onClose={() => setActiveMockTest(null)}
        />
      )}

      {/* 3. School / Practice Quiz Modal */}
      {quizTopic && (
        <QuizModal
          topic={quizTopic}
          lang={lang}
          onClose={() => setQuizTopic(null)}
        />
      )}

      {/* 4. Infographic Architectural Map Modal */}
      {infographicTopic && (
        <InfographicModal
          topic={infographicTopic}
          lang={lang}
          onClose={() => setInfographicTopic(null)}
        />
      )}

      {/* 5. Concept Video Modal */}
      {videoTopic && (
        <VideoModal
          topic={videoTopic}
          lang={lang}
          onClose={() => setVideoTopic(null)}
        />
      )}

      {/* 6. "Aap Kaun Hai?" Role Login Modal */}
      <RoleLoginModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={(role) => {
          handleTabChange(role as MainTab);
          setIsRoleModalOpen(false);
        }}
        currentRole={currentHiringRole}
        lang={lang}
      />

      {/* 7. Master Sovereign Identity & About Us Modal */}
      <AboutUsModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        lang={lang}
      />

      {/* 8. Sovereign Role & User Login Modal */}
      {isAuthLoginModalOpen && (
        <AuthLoginModal
          onClose={() => setIsAuthLoginModalOpen(false)}
          onSuccess={(profile) => {
            setCurrentUserProfile(profile);
            if (profile.role === 'super_admin') handleTabChange('super-admin');
            else if (profile.role === 'krishi_admin') handleTabChange('krishi-admin');
          }}
        />
      )}

      {/* 9. Sovereign Universal Nominal Payment Modal */}
      {activePaymentTier && (
        <UniversalPaymentModal
          tier={activePaymentTier}
          onClose={() => setActivePaymentTier(null)}
          onSuccess={(tx) => {
            console.log('Sovereign Payment Success:', tx);
          }}
        />
      )}

      {/* 10. Install PWA / Play Store App Mobile Banner */}
      <InstallPwaBanner />

      {/* 11. Sovereign 14-Module Deep Quality & Continuous Fulfillment Radar Modal */}
      {is14RadarModalOpen && (
        <FourteenModulesQualityRadarModal
          isOpen={is14RadarModalOpen}
          onClose={() => setIs14RadarModalOpen(false)}
          lang={lang}
          onNavigateTab={handleTabChange}
        />
      )}

      {/* 12. User Demand & Public Help Request Modal (Direct Sovereign Pipeline) */}
      <UserDemandBoxModal
        isOpen={isDemandBoxOpen}
        onClose={() => setIsDemandBoxOpen(false)}
        lang={lang}
        initialQuery={demandInitialQuery}
        onNavigateTab={handleTabChange}
      />

      {/* Sovereign Master Global Footer */}
      <footer className="w-full bg-[#000000] border-t-2 border-[#FFD700]/40 text-xs text-slate-400 py-12 mt-auto relative overflow-hidden">
        {/* Subtle Background Circuit Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Top Banner: Sovereign Brand & Mission Statement */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-[#FFD700]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <JitomniEmblemLogo size="lg" showGlow={true} interactive={true} onClick={() => setIsAboutModalOpen(true)} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF] font-heading">
                    JITOMNI 360° CAREERVERSE
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold uppercase tracking-wider">
                    Sovereign Identity
                  </span>
                </div>
                <p className="text-xs text-[#00D4FF] font-mono mt-1">
                  jit+omni (all) = jitomni : Jitendriy- Manish (Sovereign Strategic Architect & Philosophical Nation-Builder: Rooting out systemic failure with 360° revolutionary solutions.)
                </p>
                <p className="text-xs text-slate-300 mt-1.5 max-w-2xl">
                  <strong>TO EMPOWER & TRANSFORM THROUGH INNOVATION & ACCESSIBILITY • BUILDINDIA</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black font-black text-xs hover:scale-105 transition-all shadow-lg shadow-[#FFD700]/30 whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>About Sovereign Vision</span>
            </button>
          </div>

          {/* FOUNDER'S CODE QUOTE BOX (HOME PAGE FOOTER REQUIREMENT) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-black border-2 border-[#FFD700]/60 shadow-[0_0_20px_rgba(255,215,0,0.15)] relative">
            <div className="text-[11px] font-mono text-[#FFD700] font-black uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>LEADERSHIP PHILOSOPHY • FOUNDER'S CODE • BUILDINDIA</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-serif italic leading-relaxed">
              "I suppose leadership at one time meant muscles; then it meant getting along with people; today in the age of AI, true leadership means <strong>EMPOWERING</strong> people to build their own future through Innovation & Accessibility. That's BUILDINDIA."
            </p>
            <div className="mt-2 text-right text-xs">
              <span className="font-bold text-[#FFD700]">- Jitomni : Jitendriy- Manish</span>{' '}
              <span className="text-[#00D4FF] font-mono">( Sovereign Strategic Architect & Philosophical Nation-Builder )</span>
            </div>
          </div>

          {/* 4-Column Navigation & Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
            <div className="space-y-3">
              <h4 className="text-white font-black text-xs uppercase tracking-wider text-[#FFD700] flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>BUILDINDIA Vision</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We BUILDINDIA. This is not just an app, this is a Sovereign Strategy to solve India's biggest problem - Fake Profiles & Skills Gap. We believe in VERIFIED Talent, not Degrees.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Verified Talent Matrix</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#00D4FF]">शिक्षा एवं 360° तैयारी</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleTabChange('school')} className="hover:text-[#FFD700] transition-colors">📚 स्कूल शिक्षा (कक्षा 1-12)</button></li>
                <li><button onClick={() => handleTabChange('exam')} className="hover:text-[#FFD700] transition-colors">🏆 प्रतियोगी परीक्षा (UPSC, SSC, MPPSC)</button></li>
                <li><button onClick={() => handleTabChange('iti')} className="text-amber-300 hover:text-white font-bold transition-colors">🛠️ ITI महा-हब (A to Z ट्रेड्स व NAPS)</button></li>
                <li><button onClick={() => handleTabChange('iit')} className="text-cyan-300 hover:text-white font-bold transition-colors">🏛️ IIT व JEE महा-हब (23 IITs & Strategy)</button></li>
                <li><button onClick={() => handleTabChange('agri')} className="text-emerald-300 hover:text-white font-bold transition-colors">🌾 कृषि 360° (Agri-Tech & Mandi)</button></li>
                <li><button onClick={() => handleTabChange('doubt')} className="hover:text-[#FFD700] transition-colors">🎯 AI डाउट सॉल्वर (फोटो/वॉइस)</button></li>
                <li><button onClick={() => handleTabChange('flashcards')} className="hover:text-[#FFD700] transition-colors">⚡ स्मार्ट फ्लैशकार्ड्स & वीकनेस रडार</button></li>
                <li><button onClick={() => handleTabChange('english')} className="hover:text-[#FFD700] transition-colors">🗣️ AI इंग्लिश मेंटर (5 रोल्स)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#00D4FF]">करियर & 100% वेरिफाइड जॉब्स</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleTabChange('ai-interview')} className="text-amber-300 hover:text-white font-bold transition-colors flex items-center gap-1">🎥 AI वीडियो इंटरव्यू (ऑटो प्रोफाइल)</button></li>
                <li><button onClick={() => handleTabChange('company')} className="hover:text-[#FFD700] transition-colors">🏢 कंपनी: GST वेरिफिकेशन & टेस्ट बनाओ</button></li>
                <li><button onClick={() => handleTabChange('skilled')} className="hover:text-[#FFD700] transition-colors">🎓 स्किल्ड सीकर: 10 MCQ टेस्ट पास करो</button></li>
                <li><button onClick={() => handleTabChange('labour')} className="hover:text-[#FFD700] transition-colors">👷 लेबर/कारीगर: 5km पास का काम (कॉल)</button></li>
                <li><button onClick={() => handleTabChange('vacancies')} className="hover:text-[#FFD700] transition-colors">🔥 सरकारी नौकरी लाइव ट्रैकर</button></li>
                <li><button onClick={() => handleTabChange('globaljobs')} className="hover:text-[#FFD700] transition-colors">🌍 ग्लोबल AI जॉब्स ($25/hr Remote)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#FFD700]">हेल्पलाइन & आर्किटेक्चर</h4>
              <p className="text-xs text-slate-300">📞 टोल-फ्री: 1800-123-JITOMNI</p>
              <p className="text-xs text-slate-300 mt-1">📧 support@jitomni.edu.in</p>
              <p className="text-xs text-slate-300 mt-1">🏛️ स्ट्रेटेजी आर्किटेक्ट: भोपाल, म.प्र. (भारत)</p>
              <div className="pt-3 flex flex-col gap-1.5">
                <button
                  onClick={() => setIsAboutModalOpen(true)}
                  className="text-left text-[11px] text-[#FFD700] hover:underline font-bold"
                >
                  📖 Read Full Sovereign Manifesto
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-2">© 2026 Jitomni 360° Careerverse. BUILDINDIA.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
