export type Language = 'hi' | 'en' | 'hinglish';

export type AppRole = 'home' | 'company' | 'skilled' | 'labour';

export type MainTab = AppRole | 'verifiedjobs' | 'ai-interview' | 'agri' | 'iti' | 'iit' | 'school' | 'exam' | 'vacancies' | 'globaljobs' | 'english' | 'prime' | 'doubt' | 'flashcards' | 'admin';

export type ITITabSection =
  | 'overview'
  | 'trades_directory'
  | 'apprenticeship_naps'
  | 'govt_jobs_railway'
  | 'workshop_tools_safety'
  | 'workshop_formulas_symbols'
  | 'bharat_skills_library'
  | 'contractor_license_business'
  | 'cits_instructor'
  | 'cbt_mock_tests'
  | 'salary_career';

export type IITTabSection =
  | 'overview'
  | '23_iits_matrix'
  | 'jee_main_adv_strategy'
  | 'branches_future_tech'
  | 'placements_internships'
  | 'startups_incubation'
  | 'gate_jam_research'
  | 'coding_cp_roadmap'
  | 'advanced_mock_arena';


export type AgriTabSection = 
  | 'kisan_hub'
  | 'crop_calendar_guide'
  | 'market_demand_profit'
  | 'ai_kisan_mitra'
  | 'govt_schemes'
  | 'weather_advisory'
  | 'farm_equipment'
  | 'overview'
  | 'curriculum'
  | 'global_tech'
  | 'ai_tools'
  | 'crop_doctor'
  | 'soil_npk'
  | 'drone_ndvi'
  | 'hydroponics'
  | 'mandi_economics'
  | 'exam_arena'
  | 'agri_careers';

export interface AgriSubject {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  code: string;
  icon: string;
  badge: string;
  description: { hi: string; en: string; hinglish: string };
  chaptersCount: number;
  icarWeightage: string;
  chapters: AgriChapter[];
}

export interface AgriChapter {
  id: string;
  title: { hi: string; en: string; hinglish: string };
  keyConcepts: string[];
  framework360: {
    what: { hi: string; en: string; hinglish: string };
    why: { hi: string; en: string; hinglish: string };
    how: { hi: string; en: string; hinglish: string };
    application: { hi: string; en: string; hinglish: string };
    challenges: { hi: string; en: string; hinglish: string };
    solutionFuture: { hi: string; en: string; hinglish: string };
  };
  aiCaseStudy?: string;
  globalBenchmark?: string;
}

export interface GlobalAgriTech {
  id: string;
  country: 'Singapore' | 'China' | 'Israel' | 'Netherlands' | 'India Benchmark';
  flag: string;
  title: { hi: string; en: string; hinglish: string };
  subtitle: { hi: string; en: string; hinglish: string };
  category: 'Vertical Farming & CEA' | 'Autonomous Robotics & AI' | 'Solar Greenhouses' | 'Circular Eco-Farming' | 'Drone & Satellite Remote Sensing' | 'Gene Editing & Super Hybrids';
  coreMechanism: { hi: string; en: string; hinglish: string };
  keyMetrics: { label: string; value: string; impact: string }[];
  implementationSteps: string[];
  indiaReplicationStrategy: { hi: string; en: string; hinglish: string };
  techArchitecture: string[];
  icon: string;
  badgeColor: string;
}

export interface CropDiseaseItem {
  id: string;
  cropName: { hi: string; en: string; hinglish: string };
  diseaseName: { hi: string; en: string; hinglish: string };
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Deficiency';
  severity: 'Critical' | 'Moderate' | 'Low';
  symptoms: { hi: string; en: string; hinglish: string };
  causeAndSpread: { hi: string; en: string; hinglish: string };
  chemicalControl: { medicine: string; dose: string; stage: string };
  organicControl: { medicine: string; preparation: string };
  preventiveTips: string[];
  yieldLossRisk: string;
  icon: string;
}

export type LabourWorkType = 
  | 'Mistri'
  | 'Mazdoor'
  | 'Factory Worker'
  | 'Driver'
  | 'Delivery'
  | 'Safai Karmi'
  | 'Electrician'
  | 'Plumber'
  | 'Security Guard';

export interface AIInterviewQuestion {
  id: string;
  category: 'introduction' | 'technical' | 'situational_crisis' | 'body_language_behavioral' | 'leadership_culture';
  question: string;
  hindiPrompt: string;
  tips: string[];
  expectedKeywords: string[];
  situationalScenario?: string;
  evaluationCriteria: {
    communicationWeight: number;
    hardSituationWeight: number;
    expressionBodyLanguageWeight: number;
    technicalUnderstandingWeight: number;
  };
}

export interface AIInterviewMetrics {
  eyeContactPercent: number; // 0-100%
  facialExpressionScore: number; // 0-100 (Calm, Confident, Poised)
  bodyLanguageScore: number; // 0-100 (Posture, Head Tilt, Gestures)
  communicationScore: number; // 0-100 (Fluency, Modulation, Vocabulary)
  hardSituationScore: number; // 0-100 (Crisis Resolution, Stress Resilience)
  technicalUnderstandingScore: number; // 0-100 (Depth of Knowledge)
  fillerWordsCount: number; // e.g. 4
  speechPaceWpm: number; // words per minute (ideal 120-150)
  hesitationPauses: number;
  overallScore: number; // 0-100
  badgeGrade: 'Diamond Verified' | 'Gold Verified' | 'Silver Verified' | 'Practice Recommended';
}

export interface AIInterviewGapAnalysis {
  identifiedWeaknesses: {
    area: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    exampleQuoteOrMoment: string;
    recommendedSolution: string;
  }[];
  keyStrengths: string[];
  practicalDrills: {
    id: string;
    title: string;
    type: 'star_technique' | 'eye_contact_posture' | 'filler_reduction' | 'crisis_rehearsal';
    instructions: string;
    exercisePrompt: string;
    durationMinutes: number;
  }[];
}

export interface AIInterviewResult {
  id: string;
  certificateId: string;
  candidateId: string;
  candidateName: string;
  targetRole: string;
  targetCompany: string;
  isHighProfile: boolean;
  completedAt: string;
  metrics: AIInterviewMetrics;
  gapAnalysis: AIInterviewGapAnalysis;
  questionAnswers: {
    questionId: string;
    question: string;
    candidateAudioText: string;
    durationSeconds: number;
    sentimentSummary: string;
    situationalApproachFeedback: string;
    score: number;
  }[];
  overallSummaryHindi: string;
  overallSummaryEnglish: string;
  isVerifiedBadgeAddedToProfile: boolean;
  qrVerificationUrl?: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  gstNumber: string;
  isGstVerified: boolean;
  industry: string;
  location: string;
  logo?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  about?: string;
  activeVacanciesCount?: number;
  totalHiredCount?: number;
}

export interface SkillTestQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface SkillTest {
  id: string;
  vacancyId: string;
  skillName: string;
  postName: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingPercentage: number; // default 60%
  questions: SkillTestQuestion[];
  generatedByAI?: boolean;
}

export interface JobVacancy {
  id: string;
  companyId: string;
  companyName: string;
  companyGst: string;
  isCompanyVerified: boolean;
  postName: string;
  skillsRequired: string[];
  qualification: '10th Pass' | '12th Pass' | 'ITI/Diploma' | 'Graduate' | 'Post Graduate' | 'Any Degree';
  salaryMin: number;
  salaryMax: number;
  salaryDisplay: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Remote' | 'Work From Office' | 'Hybrid';
  openings: number;
  description: string;
  testId?: string;
  testPassingScore: number; // 60
  testQuestionsCount: number; // 10
  hasTest: boolean;
  isHighProfile?: boolean;
  requiresAIInterview?: boolean;
  interviewId?: string;
  createdAt: string;
  status: 'Active' | 'Closed';
  matchedCandidatesCount?: number;
}

export interface TestResult {
  id: string;
  candidateId?: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  candidateEducation: string;
  candidateAadhaarVerified: boolean;
  candidateDegreeVerified: boolean;
  candidateSkills: string[];
  vacancyId: string;
  vacancyTitle: string;
  companyId: string;
  companyName: string;
  testId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  takenAt: string;
  autoMatched: boolean;
  status: 'Verified Candidate' | 'Re-test Scheduled';
  isAIInterviewVerified?: boolean;
  aiInterviewScore?: number;
  aiInterviewBadge?: string;
}

export interface SkilledCandidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  education: string;
  degreePhotoUrl?: string;
  isDegreeVerified: boolean;
  aadhaarNumber?: string;
  isAadhaarVerified: boolean;
  skills: string[];
  experienceYears: number;
  currentCity: string;
  expectedSalary: string;
  resumeBio: string;
  verifiedSkillBadges: string[];
  testScores: {
    skill: string;
    scorePercent: number;
    passed: boolean;
    date: string;
  }[];
  isAIInterviewVerified?: boolean;
  aiInterviewScore?: number;
  aiInterviewBadgeGrade?: 'Diamond Verified' | 'Gold Verified' | 'Silver Verified' | 'Practice Recommended';
  aiInterviewResult?: AIInterviewResult;
}

export interface LabourJob {
  id: string;
  employerName: string;
  employerPhone: string;
  isVerifiedEmployer: boolean;
  workType: LabourWorkType;
  titleHindi: string;
  wagePerDay: string;
  location: string;
  distanceKm: number;
  dailyTimings: string;
  vacanciesCount: number;
  foodIncluded: boolean;
  stayIncluded: boolean;
  contactPerson: string;
  descriptionHindi: string;
  postedAt: string;
  photoUrl?: string;
}

export interface LabourApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  employerName: string;
  employerPhone: string;
  workerName: string;
  workerPhone: string;
  workerLocation: string;
  workType: LabourWorkType;
  appliedAt: string;
  status: 'Applied' | 'Direct Call Connected' | 'Hired';
}

export interface CandidateApplicationRecord {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  companyName: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  candidateEducation: string;
  candidateSkills: string[];
  testScorePercentage: number;
  isVerified: boolean;
  appliedAt: string;
  companyContact: {
    phone: string;
    email: string;
    location: string;
  };
}

// ----------------- COMPATIBILITY TYPES ----------------- //
export type Board = string;
export type ClassLevel = number;
export type CompetitiveExam = string;
export type ExamType = string;
export type EnglishRole = string;
export type TopicType = string;
export type SubAgentType = string;

export interface VocabWordItem {
  id: string;
  word: string;
  [key: string]: any;
}

export interface GrammarLesson {
  id: string;
  [key: string]: any;
}

export interface SpeakingScoreResult {
  [key: string]: any;
}

export interface QuizQuestion {
  id?: string;
  question?: any;
  options?: any;
  correctAnswer?: any;
  correctIndex?: any;
  explanation?: any;
  difficulty?: any;
  [key: string]: any;
}

export interface Framework360 {
  [key: string]: any;
}

export interface Adaptive360Data {
  [key: string]: any;
}

export interface TopicItem {
  id: string;
  title?: any;
  name?: any;
  description?: any;
  type?: any;
  classLevel?: any;
  board?: any;
  examType?: any;
  chapter?: any;
  subject?: any;
  framework360?: any;
  framework?: any;
  difficulty?: any;
  quiz?: any;
  youtubeQuery?: any;
  [key: string]: any;
}

export interface ChapterItem {
  id: string;
  title: any;
  chapterNumber?: any;
  topics: any[];
  [key: string]: any;
}

export interface SubjectItem {
  id: string;
  name: any;
  icon?: string;
  chapters: any[];
  [key: string]: any;
}

export interface CompetitiveTopicDetail {
  id: string;
  title?: any;
  [key: string]: any;
}

export interface MockExamConfig {
  examType?: any;
  title?: any;
  examName?: any;
  totalQuestions?: any;
  durationMinutes?: any;
  negativeMarking?: any;
  subjects?: any;
  [key: string]: any;
}

export interface FlashcardItem {
  id: string;
  [key: string]: any;
}

export interface UserGamificationProfile {
  xp?: number;
  streakDays?: number;
  badges?: string[];
  [key: string]: any;
}

export interface DoubtSolutionResponse {
  [key: string]: any;
}

export interface GlobalAIJobCard {
  id: string;
  [key: string]: any;
}

export interface QualificationRoadmap {
  [key: string]: any;
}

export interface AIToolItem {
  [key: string]: any;
}

export interface RemoteLiveVacancy {
  id: string;
  [key: string]: any;
}

export interface VacancyItem {
  id: string;
  [key: string]: any;
}

export type VacancyFilter = string;

export interface VacancyNotificationAlert {
  id: string;
  [key: string]: any;
}

export interface ExamPatternInfo {
  [key: string]: any;
}

export interface SyllabusSubjectNode {
  id?: any;
  name?: any;
  chapters?: any;
  [key: string]: any;
}

export interface SyllabusChapterNode {
  id?: any;
  name?: any;
  topics?: any;
  [key: string]: any;
}

export interface SyllabusTreeNode {
  examType?: any;
  subjects?: any;
  [key: string]: any;
}
