export type Language = 'hi' | 'en' | 'hinglish';

export type UserPersona = 'student' | 'company' | 'jobseeker' | 'kisan' | 'worker' | 'all';

export type AppRole = 'home' | 'company' | 'skilled' | 'labour';

export type MainTab = AppRole | 'verifiedjobs' | 'companion' | 'ai-interview' | 'agri' | 'iti' | 'iit' | 'school' | 'exam' | 'current-affairs' | 'vacancies' | 'globaljobs' | 'english' | 'prime' | 'doubt' | 'flashcards' | 'admin' | 'super-admin' | 'krishi-admin';

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
  | 'kriti_faas'
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
  jobType: 'Full-Time' | 'Part-Time' | 'Remote' | 'Work From Office' | 'Hybrid' | 'Field Work';
  openings: number;
  description: string;
  detailedRequirements?: string[];
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  requiresAadhaarKyc?: boolean;
  urgency?: 'Immediate' | 'Regular' | 'Walk-in';
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

export interface VisionIasDataPoint {
  metric: string;
  label: string;
  source?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface VisionIasChallenge {
  challenge: string;
  severity: 'Critical' | 'High' | 'Medium';
  impact: string;
}

export interface VisionIasRecommendation {
  title: string;
  agencyOrModel: string;
  actionableStep: string;
}

export interface VisionIasDimension {
  title: string;
  points: string[];
  iconName?: string;
}

export interface VisionIasMainsFramework {
  question: string;
  marks: string;
  intro: string;
  dimensions: string[];
  diagramTip: string;
  conclusion: string;
}

export interface VisionIasInfographic {
  topicTitle: string;
  paperLinkage: string;
  editionTag: string;
  badgeColor?: string;
  whyInNews: {
    heading: string;
    points: string[];
  };
  mindmapMermaidCode: string;
  visualProcessSteps?: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  multidimensionalMatrix: {
    constitutionalLegal: VisionIasDimension;
    economicFinancial: VisionIasDimension;
    socialHuman: VisionIasDimension;
    techGlobalEnvironmental: VisionIasDimension;
  };
  criticalChallenges: VisionIasChallenge[];
  wayForward: VisionIasRecommendation[];
  keyDataPoints: VisionIasDataPoint[];
  mainsFramework: VisionIasMainsFramework;
  graphicIllustrationUrl?: string;
  graphicIllustrationConcept?: {
    title: string;
    visualNodes: { label: string; sub: string; color: string }[];
  };
}

export interface DoubtSolutionResponse {
  doubtQuery?: string;
  categoryType?: string;
  identifiedSubject?: string;
  identifiedChapter?: string;
  shortAnswer?: { [key: string]: string };
  stepByStepSolution?: any[];
  speedTrickOrShortCut?: any;
  similarPracticeQuestion?: any;
  actionableModuleLink?: any;
  keyTakeaway?: { [key: string]: string };
  visionIasInfographic?: VisionIasInfographic;
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

// ==========================================
// JITOMNI 360° ON-DEMAND COMPANION & TASK SERVICE TYPES
// ==========================================

export type CompanionCategoryType = 
  | 'hospital_care' 
  | 'event_wedding' 
  | 'senior_citizen' 
  | 'daily_errands'
  | 'ride_travel';

// Standard 8 Sovereign Task Services
export type SovereignTaskServiceId = 
  | 'buzurg_sathi'          // 1. Buzurg Sathi (Baat, ghoomana, khana)
  | 'hospital_sahayak'      // 2. Hospital Sahayak (Line, dawai, report)
  | 'bank_sarkari'          // 3. Bank & Sarkari Sahayak (Form, line)
  | 'sheher_guide'          // 4. Sheher Guide + Hostel Navigator
  | 'local_delivery'        // 5. Local Saman & Emergency Task (Delivery)
  | 'surakshit_yatra'       // 6. Surakshit Yatra Sathi (Akele ladki/buzurg ke saath)
  | 'event_parivarik'       // 7. Event & Parivarik Sahayak (Shaadi/Function)
  | 'rapido_ride';          // 8. SIRF Ride Service (Rapido jaisi)

export type CompanionVehicleMode = 'without_bike' | 'with_bike';

export interface SovereignTaskRateCard {
  id: SovereignTaskServiceId;
  taskNumber: number;
  name: { hi: string; en: string; hinglish: string };
  desc: { hi: string; en: string; hinglish: string };
  icon: string;
  badge: string;
  category: CompanionCategoryType;
  withoutBikeRatePerHour: number | null; // null for pure ride
  withoutBikeNote?: { hi: string; en: string; hinglish: string };
  withBikeRatePerHour: number;
  withBikeNote?: { hi: string; en: string; hinglish: string };
  minBookingHours: number; // 2, 2, 2, 1, 1, 1, 3, 0 (ride)
  platformCommissionPercent: number; // 10% - 20% based on task importance
  importanceLevel: 'critical' | 'high' | 'standard';
  managementEffortReason: { hi: string; en: string };
  isRideService?: boolean;
  rideBaseFare?: number; // ₹30 for ride
  ridePerKmDayRate?: number; // ₹10/KM
  ridePerKmNightRate?: number; // ₹12/KM (9pm - 6am)
  hasFourKmFreeRule?: boolean; // true for 4, 5, 6
  hasWaitingChargeRule?: boolean; // true for 2, 3 (Bank, Hospital)
  waitingFreeHours?: number; // 1 hr free
  waitingChargePer30Min?: number; // ₹50 per 30 min
}

export interface CompanionSubService {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  desc: { hi: string; en: string; hinglish: string };
  icon: string;
  recommendedHours: number;
}

export interface CompanionServiceCategory {
  id: CompanionCategoryType;
  title: { hi: string; en: string; hinglish: string };
  tagline: { hi: string; en: string; hinglish: string };
  icon: string;
  visualAnchorBadge: string;
  themeColor: {
    badge: string;
    border: string;
    bgGlow: string;
    gradient: string;
    accent: string;
  };
  baseHourlyRate: number;
  subServices: CompanionSubService[];
  quickRequirements: string[];
}

export interface CompanionWorker {
  id: string;
  name: string;
  gender: 'female' | 'male' | 'any';
  age: number;
  photoUrl: string;
  rating: number;
  reviewsCount: number;
  tasksCompleted: number;
  policeVerified: boolean;
  policeVerificationId: string;
  aadhaareKYCVerified: boolean;
  verificationStatus: 'pending_approval' | 'verified_active' | 'rejected';
  isFlagged?: boolean;
  flagReason?: string;
  specialization: { hi: string; en: string; hinglish: string };
  languages: string[];
  distanceKm: number;
  etaMinutes: number;
  hourlyRate: number;
  city: string;
  phone: string;
  availableNow: boolean;
  badgeTitle: string;
  bio: string;
  documents?: {
    aadhaar?: {
      number: string;
      docName: string;
      status: 'pending' | 'verified' | 'rejected';
      uploadedAt: string;
      fileUrl?: string;
    };
    policeVerification?: {
      certNumber: string;
      policeStation: string;
      docName: string;
      status: 'pending' | 'verified' | 'rejected';
      uploadedAt: string;
      fileUrl?: string;
    };
    backgroundCheck?: {
      certId: string;
      agency: string;
      docName: string;
      status: 'pending' | 'verified' | 'rejected';
      uploadedAt: string;
      fileUrl?: string;
    };
  };
  wallet?: {
    availableBalance: number;
    pendingWeeklyPayout: number;
    totalEarnings: number;
    upiId?: string;
    bankAccountNumber?: string;
    bankIfsc?: string;
    bankName?: string;
  };
}

export interface CompanionRadarTask {
  id: string;
  category: CompanionCategoryType;
  title: string;
  customerName: string;
  customerPhone: string;
  location: string;
  distanceKm: number;
  hours: number;
  hourlyRate: number;
  totalGrossFee: number;
  workerNetEarnings80: number;
  platformFee20: number;
  urgency: 'immediate' | 'scheduled' | 'flexible';
  startTime: string;
  date: string;
  requirements: string;
  genderRequired?: 'female' | 'male' | 'any';
  otpCode: string;
  status: 'available' | 'accepted' | 'declined' | 'en_route' | 'arrived' | 'in_progress' | 'completed';
}

export type CompanionTaskLifecycleStep = 
  | 'idle' 
  | 'radar' 
  | 'start_travel' 
  | 'reach_location' 
  | 'start_task' 
  | 'complete_task' 
  | 'task_finished';

export interface CompanionTaskCommissionRecord {
  id: string;
  taskId: string;
  taskTitle: string;
  customerName: string;
  workerId: string;
  workerName: string;
  hours: number;
  hourlyRate: number;
  bikeKm?: number;
  bikeKmCharge?: number;
  waitingCharge?: number;
  grossFee: number;
  billFormulaBreakdown?: string;
  platformCommissionPercent: number; // 10% - 20%
  platformShareAmount: number;
  workerShareAmount: number;
  workerShare80?: number; // backwards compatibility
  platformShare20?: number; // backwards compatibility
  status: 'credited' | 'settled' | 'pending';
  timestamp: string;
  dateStr?: string;
  startPhotoUrl?: string;
  startGpsLocation?: string;
  endPhotoUrl?: string;
  endGpsLocation?: string;
}

export interface CompanionNotification {
  id: string;
  type: 'task_booked' | 'task_accepted' | 'start_checkin' | 'rule_applied' | 'waiting_alert' | 'end_checkin' | 'bill_generated' | 'wallet_credit';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  importance?: 'normal' | 'high' | 'urgent';
  metadata?: any;
}

export interface CompanionWorkerRatingReview {
  id: string;
  taskId: string;
  workerId: string;
  customerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export type BookingStatus = 
  | 'searching'
  | 'matched'
  | 'confirmed'
  | 'dispatched'
  | 'en_route'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface CompanionBooking {
  id: string;
  category: CompanionCategoryType;
  subServiceId?: string;
  selectedDate: string;
  startTime: string;
  durationHours: number;
  requirements: string;
  genderPreference: 'any' | 'female' | 'male';
  workerCount: number;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  userPhone: string;
  emergencyContact: string;
  status: BookingStatus;
  matchedWorker?: CompanionWorker;
  serviceTaskId?: SovereignTaskServiceId;
  vehicleMode?: CompanionVehicleMode;
  distanceKm?: number;
  estimatedDistanceKm?: number;
  distanceCharge?: number;
  waitingMinutes?: number;
  waitingCharge?: number;
  isNightRide?: boolean;
  hourlyRate: number;
  baseAmount: number;
  safetyInsuranceFee: number;
  taxAmount: number;
  totalEstimatedAmount: number;
  startOtp: string;
  endOtp: string;
  createdAt: string;
  startCheckIn?: {
    photoUrl: string;
    gpsCoordinates: { lat: number; lng: number };
    addressText: string;
    timestamp: string;
  };
  endCheckIn?: {
    photoUrl: string;
    gpsCoordinates: { lat: number; lng: number };
    addressText: string;
    timestamp: string;
  };
  billFormulaBreakdown?: string;
  platformCommissionPercent?: number;
  platformCommissionAmount?: number;
  workerPayoutAmount?: number;
  trackingCoordinates?: {
    lat: number;
    lng: number;
    destinationLat: number;
    destinationLng: number;
    speedKmh: number;
    batteryLevel: number;
    updatedAt: string;
  };
}

export interface CompanionSOSEvent {
  id: string;
  bookingId: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  userPhone: string;
  workerName?: string;
  workerPhone?: string;
  policeContacted: boolean;
  emergencyContactsNotified: boolean;
  sovereignControlRoomAlerted: boolean;
  sirenActive: boolean;
}

// ==========================================
// RIDE & TRAVEL (CAR & BIKE PARTNERS) TYPES
// ==========================================

export type VehicleCategoryType = 
  | 'bike' 
  | 'scooter' 
  | 'car_hatchback' 
  | 'car_sedan' 
  | 'car_suv' 
  | 'electric_ev';

export interface RideVehiclePartner {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  photoUrl: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  vehicleType: VehicleCategoryType;
  vehicleName: string;
  vehicleNumber: string;
  seatingCapacity: number;
  serviceArea: string;
  operatingCity: string;
  routeCoverage: string;
  maxKilometers: number;
  ratePerKm: number;
  baseFare: number;
  acAvailable?: boolean;
  helmetProvided?: boolean;
  availableNow: boolean;
  rating: number;
  reviewsCount: number;
  tripsCompleted: number;
  policeVerified: boolean;
  policeVerificationId: string;
  dlNumber: string;
  rcVerified: boolean;
  aadhaarVerified: boolean;
  isFemaleDriver?: boolean;
  bio?: string;
  platformFeePlan?: 'percentage_10' | 'daily_fleet_pass';
  totalFareGenerated?: number;
  platformFeePaid?: number;
  platformFeePending?: number;
}

export interface RideBookingRequest {
  id: string;
  riderName: string;
  riderPhone: string;
  pickupLocation: string;
  dropLocation: string;
  estimatedDistanceKm: number;
  vehicleType: 'any' | VehicleCategoryType;
  preferredTiming: 'immediate' | 'scheduled';
  scheduledTime?: string;
  passengersCount: number;
  partnerId?: string;
  partnerName?: string;
  partnerPhone?: string;
  partnerVehicle?: string;
  partnerPhoto?: string;
  estimatedFare: number;
  driverShareFare?: number;
  platformFee?: number;
  status: 'pending' | 'accepted' | 'driver_arrived' | 'trip_started' | 'completed' | 'cancelled';
  rideOtp: string;
  createdAt: string;
}

export interface RidePlatformFeeRecord {
  id: string;
  rideId: string;
  driverName: string;
  driverPhone: string;
  vehicleType: VehicleCategoryType;
  vehicleNumber: string;
  route: string;
  distanceKm: number;
  totalFare: number;
  driverPayout: number; // 90%
  platformFee: number; // 10%
  date: string;
  status: 'collected' | 'pending';
}

// ==========================================
// HUMARA MEDICAL SATHI 3-LEVEL SERVICE TYPES
// ==========================================

export type MedicalSathiLevel = 'level1' | 'level2' | 'level3';

export type MedicalSathiAddon = 
  | 'Medicine Lane'
  | 'Report Lane'
  | 'Khana Lane'
  | 'Dharamshala Book Karna'
  | 'Return Drop';

export interface MedicalSathiStaffMember {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
  verifiedId: string;
  role: 'companion' | 'nurse' | 'doctor';
  qualification?: string;
  specialty?: string;
  registrationNumber?: string;
  rating: number;
  experienceYears: number;
}

export interface MedicalSathiBooking {
  id: string;
  level: MedicalSathiLevel;
  pickup_type: 'railway' | 'home';
  pickup_location: string;
  drop_hospital: string;
  patient_name: string;
  patient_age: number;
  can_walk: boolean;
  wheelchair_needed: boolean;
  nurse_required: boolean;
  doctor_required: boolean;
  primary_care_needed: boolean;
  addons: MedicalSathiAddon[];
  hours: number;
  hourly_rate: number;
  distance_km: number;
  distance_charge: number;
  total_fare: number;
  assigned_staff: {
    sathi?: MedicalSathiStaffMember;
    nurse?: MedicalSathiStaffMember;
    doctor?: MedicalSathiStaffMember;
  };
  transit_tracking: {
    currentLat: number;
    currentLng: number;
    currentLocationName: string;
    step: 'pickup_arrived' | 'patient_escorted' | 'in_transit' | 'hospital_counter' | 'completed';
    etaMinutes: number;
    speedKmh: number;
    vitalsLogged?: { bp: string; sugar: string; pulse: string; notes: string };
  };
  status: 'booked' | 'assigned' | 'in_transit' | 'reached_hospital' | 'completed';
  user_phone: string;
  created_at: string;
}

// ==========================================
// KRITI 360° (Farming-as-a-Service) TYPES
// ==========================================

export type KritiPillarId = 
  | 'faas_model'
  | 'agri_entrepreneurs'
  | 'hybrid_model'
  | 'affordable_tech'
  | 'export_market_linkage';

export interface KritiPillarItem {
  id: KritiPillarId;
  titleHi: string;
  titleEn: string;
  taglineHi: string;
  pillarNumber: number;
  iconName: string;
  summaryHi: string;
  keyFeatures: string[];
  financialStructure?: {
    farmerShare: string;
    platformShare: string;
    upfrontCost: string;
    riskFactor: string;
  };
  commissionModel?: {
    agentCommission: string;
    clusterScale: string;
    monthlyEarningEstimate: string;
  };
  actionLabel?: string;
  actionRoute?: 'contract_flow' | 'samadhan_chat' | 'calculator';
}

export type KritiContractRole = 'tech_agent' | 'hybrid_hub';

export interface KritiContractApplication {
  id: string;
  role: KritiContractRole;
  fullName: string;
  phone: string;
  email?: string;
  aadhaarNumber: string;
  state: string;
  district: string;
  villageCluster: string;
  pinCode: string;
  landOrPremisesDetails: string;
  proposedLandAcres?: number;
  consultationDate: string;
  consultationSlot: string;
  consultationMode: 'video_call' | 'hub_visit' | 'on_field_visit';
  status: 'draft' | 'under_review' | 'kyc_verified' | 'contract_issued' | 'signed_active';
  agreementNumber: string;
  authorizedBy: string;
  issuedAt: string;
  signedAt?: string;
  digitalSignatureHash?: string;
  notes?: string;
}

export interface KritiSamadhanMessage {
  id: string;
  sender: 'farmer' | 'mahi_desk';
  senderName: string;
  text: string;
  imageUrl?: string;
  voiceNoteUrl?: string;
  voiceDurationSeconds?: number;
  cropTag?: string;
  timestamp: string;
  routingStatus: 'received' | 'analyzed_by_ai' | 'routed_to_mahi_desk' | 'resolved';
  expertBadge?: string;
}

// ----------------------------------------------------
// SOVEREIGN RBAC, AUTH, MEMORY & MONETIZATION TYPES
// ----------------------------------------------------

export type UserRole =
  | 'guest'              // Free browsing citizen / explorer (no forced login/download)
  | 'student'            // 1-12th, UPSC, SSC, IIT, ITI student
  | 'jobseeker'          // White-collar & skilled candidate (Aadhaar KYC verified)
  | 'labour_worker'      // Blue-collar / field labour worker
  | 'company'            // Employer / Corporate HR posting vacancies
  | 'sathi_provider'     // On-demand companion & task worker (earns 80%)
  | 'service_consumer'   // Citizen / family booking tasks & companion services
  | 'farmer'             // Farmer & Krishi entrepreneur
  | 'krishi_admin'       // Mahi Pawar Krishi 360° Directorate
  | 'super_admin';       // Manish Vishwakarma Sovereign Super Admin

export interface AadhaarKycData {
  aadhaarNumberMasked: string; // e.g. "XXXX-XXXX-8921"
  maskedAadhaar?: string; // backwards compatibility alias
  fullName: string;
  fatherOrSpouseName?: string;
  dob?: string;
  gender?: 'M' | 'F' | 'Other';
  addressState: string;
  addressDistrict: string;
  verificationId: string; // e.g. "JITOMNI-UIDAI-KYC-2026-98124"
  verifiedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  verificationMethod: 'OTP' | 'OFFLINE_XML';
  tamperProofHash: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  targetGoal: string; // e.g. 'UPSC Civil Services', 'SSC CGL', 'IIT-JEE', 'ITI Electrician', 'Agri-Tech & Krishi', 'Remote AI Jobs', 'Corporate Hiring'
  currentStreakDays: number;
  totalXp: number;
  verifiedBadges: string[];
  unlockedServices: string[]; // service keys that user has paid for or earned
  aadhaarKyc?: AadhaarKycData;
  memorySummary?: string;
  lastLoginAt: string;
}

export interface UserMemoryEntry {
  id: string;
  userId: string;
  timestamp: string;
  category: 'doubt' | 'weak_topic' | 'career_target' | 'quiz_score' | 'interview_result' | 'aspirational_note';
  topicOrSubject: string;
  summary: string;
  scoreOrDetail?: string;
  importance: 'normal' | 'high' | 'critical';
}

export interface PaymentTier {
  id: string;
  serviceKey: string;
  title: { hi: string; en: string };
  categoryBadge: string;
  nominalPriceRupee: number; // Phase 1: ₹9 to ₹49
  phase2StandardPriceRupee: number; // After 2 months: sustainable price
  durationOrUsage: string;
  features: string[];
  icon: string;
  popular?: boolean;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceKey: string;
  serviceTitle: string;
  amountRupee: number;
  paymentMethod: 'upi_qr' | 'upi_vpa' | 'card' | 'netbanking' | 'wallet';
  upiRefNumber: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  invoiceNo: string;
}

export interface FeaturePriorityItem {
  id: string;
  title: string;
  description: string;
  targetModule: MainTab;
  nationalImpactScore: number; // 1-10
  revenuePotentialScore: number; // 1-10
  technicalFeasibilityScore: number; // 1-10
  userDemandScore: number; // 1-10
  compositePriorityScore: number; // calculated weighted score
  status: 'active' | 'next_sprint' | 'backlog';
  category: 'core_nation_building' | 'revenue_engine' | 'ai_deeptech' | 'security_infrastructure';
  targetReleasePhase: string;
}

// ==========================================
// REWA CITY SERVICE PROVIDER & ON-DEMAND SATHI TYPES
// ==========================================

export type ServiceProviderCategory = 
  | 'hospital_helper' 
  | 'elderly_care' 
  | 'cab_vendor' 
  | 'hotel_partner';

export interface ServiceProviderRegistration {
  id: string;
  fullNameOrBusiness: string;
  serviceType: ServiceProviderCategory;
  phone: string;
  aadhaarNumber: string;
  aadhaarStatus: 'verified' | 'pending' | 'rejected';
  aadhaarVerified?: boolean;
  location: {
    address: string;
    landmark: string;
    city: string;
    lat: number;
    lng: number;
  };
  cabDetails?: {
    vehicleType: string;
    vehicleNumber: string;
    dlNumber: string;
    seatingCapacity: number;
    ratePerKm: number;
  };
  hotelDetails?: {
    hotelName: string;
    totalRooms: number;
    proximityStationKm: number;
    proximityHospitalKm: number;
    startingPrice: number;
    amenities: string[];
  };
  status: 'pending_approval' | 'verified_active' | 'rejected';
  adminRemarks?: string;
  appliedAt: string;
  registeredAt?: string;
  approvedAt?: string;
}

export type RewaLocationType = 'sathi' | 'cab' | 'hotel';

export interface RewaMapLocationPin {
  id: string;
  name: string;
  type: RewaLocationType;
  categoryLabel: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  address: string;
  phone: string;
  verifiedBadge: string;
  priceLabel: string;
  isAvailable: boolean;
  distanceKm?: number;
  etaMinutes?: number;
  meta: {
    photoUrl?: string;
    specialty?: string;
    vehicleNumber?: string;
    vehicleModel?: string;
    roomsAvailable?: number;
    amenities?: string[];
    hospitalProximityKm?: number;
  };
}

export type JITOMNICoreModule =
  | 'Buzurg Sathi - Senior Care Assistance'
  | 'Hospital Sahayak - Medical Support & Guidance'
  | 'Bank Sarkari Sahayak - Government & Banking Help'
  | 'Sheher Guide - Local City Tour'
  | 'Local Saman Delivery - Doorstep Delivery Service'
  | 'Surakshit Yatra Sathi - Safe Travel Companion'
  | 'Event Sahayak - Event Planning & Support'
  | 'Sirf Ride - On-Demand Ride Service';

export type JITOMNIDemandCategory = 
  | JITOMNICoreModule
  | 'Hospital Assistant'
  | 'Senior Citizen Care'
  | 'Premium Stay Booking'
  | 'Premium Cab Request'
  | 'Local Guide';

export interface SecureTrustDossier {
  verifiedId: string; // e.g. STV-IND-2026-89421
  qrPayload: string;
  isAadhaarVerified: boolean;
  isPoliceClearanceVerified: boolean;
  verificationDate: string;
  issuingAuthority: string;
  qrCodeUrl?: string;
  status: 'ACTIVE_VERIFIED' | 'PENDING_REVIEW' | 'SUSPENDED';
}

export interface AIParsedTaskResult {
  rawRequest: string;
  category: string;
  demandCategory: JITOMNIDemandCategory;
  coreModule: JITOMNICoreModule;
  taskTitle: string;
  city: string;
  location: string;
  destination: string;
  hubType?: 'hospital' | 'railway_station' | 'airport' | 'bank_branch' | 'city_landmark' | 'doorstep';
  hubName?: string;
  timeRequirement: string;
  durationHours: number;
  isNight: boolean;
  baseRatePerHour: number;
  nightSurcharge: number;
  baseAmount: number;
  distanceKm?: number;
  tierPricing: {
    baselineStartingAt: number; // starting at ₹100
    hourlyRate: number;
    durationAmount: number;
    distanceAmount: number;
    tierMultiplier: number;
    nightSurcharge: number;
    totalCalculated: number;
  };
  totalEstimatedAmount: number;
  partnerEarnings: number; // 80%
  platformShare: number;   // 20%
  complexity: 'standard' | 'high_priority' | 'critical_medical';
  recommendedSathis: CompanionWorker[];
  billFormulaBreakdown: string;
  confidenceScore: number;
  matchedReason: string;
  taskToken: string; // e.g. TT-IND-84920
  broadcastStatus?: 'ready' | 'broadcasting' | 'accepted' | 'dispatched';
  autoInvoiceText: string;
  secureTrustDossier: SecureTrustDossier;
  deliveryOtp?: string;
  conciergeDesk: {
    status: 'active_24x7';
    helpline: string;
    escalationLevel: 'Level-1 Automated AI' | 'Level-2 Duty Officer' | 'Level-3 City Node Commander';
    deskAgent: string;
  };
}

