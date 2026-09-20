import { Router } from 'express';
import { getGenAI, generateFastContent } from '../ai/geminiClient';

export const hiringRouter = Router();

export interface BackendCompany {
  id: string;
  name: string;
  gstNumber: string;
  isGstVerified: boolean;
  industry: string;
  location: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  about: string;
  activeVacanciesCount: number;
  totalHiredCount: number;
}

export interface BackendVacancy {
  id: string;
  companyId: string;
  companyName: string;
  companyGst: string;
  isCompanyVerified: boolean;
  postName: string;
  skillsRequired: string[];
  qualification: '10th' | '12th' | 'ITI' | 'Graduate' | 'Post-Graduate';
  salaryMin: number;
  salaryMax: number;
  salaryDisplay: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Remote' | 'Hybrid';
  openings: number;
  description: string;
  testId?: string;
  testPassingScore: number;
  testQuestionsCount: number;
  hasTest: boolean;
  createdAt: string;
  status: 'Active' | 'Closed';
  matchedCandidatesCount: number;
}

export interface BackendTestResult {
  id: string;
  candidateId: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  candidateEducation: string;
  candidateCity?: string;
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
  status: string;
  isAIInterviewVerified?: boolean;
  aiInterviewBadge?: string;
  aiScore?: number;
  aiMetrics?: any;
  aiCertId?: string;
}

const companiesStore: BackendCompany[] = [
  {
    id: 'comp-1',
    name: 'Tata Consultancy & Digital Logistics',
    gstNumber: '23AABCT1234F1Z8',
    isGstVerified: true,
    industry: 'IT & Digital Operations',
    location: 'Bhopal / Indore (MP) & Remote',
    contactPerson: 'Rajesh Sharma (Senior HR)',
    contactPhone: '+91 98260 12345',
    contactEmail: 'hr@tatadigital-hiring.com',
    about: 'Leading enterprise solutions provider offering certified roles in MIS, data management, and cloud workflows.',
    activeVacanciesCount: 2,
    totalHiredCount: 142
  },
  {
    id: 'comp-2',
    name: 'Mahakal Accounts & Fintech Solutions',
    gstNumber: '23AAAFM5544P1Z5',
    isGstVerified: true,
    industry: 'Financial Accounting & Taxation',
    location: 'Indore / Ujjain',
    contactPerson: 'Pooja Verma (Accounts Lead)',
    contactPhone: '+91 94250 88990',
    contactEmail: 'careers@mahakalfintech.in',
    about: 'Reputed chartered accounting and financial consultancy hiring certified Tally and GST specialists.',
    activeVacanciesCount: 1,
    totalHiredCount: 88
  },
  {
    id: 'comp-3',
    name: 'Sharma Tech & Software Labs',
    gstNumber: '23AAACS9876K1Z2',
    isGstVerified: true,
    industry: 'Software Engineering',
    location: 'Bhopal / Hybrid',
    contactPerson: 'Amitabh Saxena (CTO)',
    contactPhone: '+91 97555 43210',
    contactEmail: 'hiring@sharmatechlabs.com',
    about: 'Fast growing software engineering firm developing web applications and AI APIs.',
    activeVacanciesCount: 1,
    totalHiredCount: 64
  }
];

const vacanciesStore: BackendVacancy[] = [
  {
    id: 'vac-1',
    companyId: 'comp-1',
    companyName: 'Tata Consultancy & Digital Logistics',
    companyGst: '23AABCT1234F1Z8',
    isCompanyVerified: true,
    postName: 'Senior Excel & MIS Executive',
    skillsRequired: ['Advanced Excel', 'VLOOKUP', 'Pivot Tables', 'MIS Reporting', 'Formulas'],
    qualification: 'Graduate',
    salaryMin: 28000,
    salaryMax: 42000,
    salaryDisplay: '₹28,000 - ₹42,000 / महीना',
    location: 'Bhopal / Indore (MP)',
    jobType: 'Full-Time',
    openings: 5,
    description: 'Looking for verified MIS Executive to manage sales analytics, inventory trackers, and generate daily executive dashboards using advanced Excel formulas.',
    testId: 'test-excel-101',
    testPassingScore: 60,
    testQuestionsCount: 10,
    hasTest: true,
    createdAt: '2026-08-30',
    status: 'Active',
    matchedCandidatesCount: 1
  },
  {
    id: 'vac-2',
    companyId: 'comp-2',
    companyName: 'Mahakal Accounts & Fintech Solutions',
    companyGst: '23AAAFM5544P1Z5',
    isCompanyVerified: true,
    postName: 'Tally Prime & GST Accountant',
    skillsRequired: ['Tally Prime', 'GST Filing', 'Bank Reconciliation', 'Sundry Debtors', 'P&L Statement'],
    qualification: 'Graduate',
    salaryMin: 25000,
    salaryMax: 38000,
    salaryDisplay: '₹25,000 - ₹38,000 / महीना',
    location: 'Indore / Ujjain (MP)',
    jobType: 'Full-Time',
    openings: 3,
    description: 'Reputed accounts firm hiring test-verified Accountants proficient in Tally Prime, day-to-day vouchers, TDS entries, and GST reconciliation.',
    testId: 'test-tally-102',
    testPassingScore: 60,
    testQuestionsCount: 10,
    hasTest: true,
    createdAt: '2026-08-29',
    status: 'Active',
    matchedCandidatesCount: 1
  },
  {
    id: 'vac-3',
    companyId: 'comp-3',
    companyName: 'Sharma Tech & Software Labs',
    companyGst: '23AAACS9876K1Z2',
    isCompanyVerified: true,
    postName: 'Python & Django Backend Developer',
    skillsRequired: ['Python', 'Django', 'REST API', 'PostgreSQL', 'Git'],
    qualification: 'Graduate',
    salaryMin: 45000,
    salaryMax: 70000,
    salaryDisplay: '₹45,000 - ₹70,000 / महीना',
    location: 'Bhopal / Remote',
    jobType: 'Hybrid',
    openings: 4,
    description: 'We are looking for test-passed Python Developers to build robust APIs, database models, and cloud-integrated web apps.',
    testId: 'test-python-103',
    testPassingScore: 60,
    testQuestionsCount: 10,
    hasTest: true,
    createdAt: '2026-08-31',
    status: 'Active',
    matchedCandidatesCount: 1
  }
];

const testResultsStore: BackendTestResult[] = [
  {
    id: 'tr-1',
    candidateId: 'cand-1',
    candidateName: 'Manish Vishwakarma',
    candidatePhone: '+91 98931 44556',
    candidateEmail: 'manish.v@verifiedjobs.in',
    candidateEducation: 'B.Com (Honours) - Barkatullah University',
    candidateAadhaarVerified: true,
    candidateDegreeVerified: true,
    candidateSkills: ['Advanced Excel', 'VLOOKUP', 'Pivot Tables', 'MIS Reporting'],
    vacancyId: 'vac-1',
    vacancyTitle: 'Senior Excel & MIS Executive',
    companyId: 'comp-1',
    companyName: 'Tata Consultancy & Digital Logistics',
    testId: 'test-excel-101',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    passed: true,
    takenAt: '2026-08-31 16:45',
    autoMatched: true,
    status: 'Verified Candidate'
  }
];

const labourApplicationsStore: any[] = [];
const aiInterviewResultsStore: any[] = [];

// GET all companies
hiringRouter.get('/api/hiring/companies', (req, res) => {
  res.json({ success: true, companies: companiesStore });
});

// POST register/update company
hiringRouter.post('/api/hiring/companies', (req, res) => {
  const { name, gstNumber, industry, location, contactPerson, contactPhone, contactEmail, about } = req.body;
  if (!name || !contactPhone) {
    return res.status(400).json({ error: 'Company name and contact phone are required' });
  }

  const isGstValid = gstNumber && gstNumber.trim().length >= 10;
  const newCompany: BackendCompany = {
    id: `comp-${Date.now()}`,
    name,
    gstNumber: gstNumber || 'Verified In-Process',
    isGstVerified: Boolean(isGstValid),
    industry: industry || 'General Services',
    location: location || 'Bhopal / MP',
    contactPerson: contactPerson || 'HR Manager',
    contactPhone,
    contactEmail: contactEmail || 'careers@company.com',
    about: about || 'Verified Employer on Jitomni Jobs.',
    activeVacanciesCount: 0,
    totalHiredCount: 0
  };

  companiesStore.unshift(newCompany);
  res.json({ success: true, company: newCompany });
});

// GET all vacancies
hiringRouter.get('/api/hiring/vacancies', (req, res) => {
  res.json({ success: true, vacancies: vacanciesStore });
});

// POST create vacancy
hiringRouter.post('/api/hiring/vacancies', (req, res) => {
  const {
    companyId,
    postName,
    skillsRequired,
    qualification,
    salaryMin,
    salaryMax,
    salaryDisplay,
    location,
    jobType,
    openings,
    description
  } = req.body;

  if (!companyId || !postName) {
    return res.status(400).json({ error: 'companyId and postName are required' });
  }

  const company = companiesStore.find(c => c.id === companyId) || companiesStore[0];

  const newVacancy: BackendVacancy = {
    id: `vac-${Date.now()}`,
    companyId: company.id,
    companyName: company.name,
    companyGst: company.gstNumber,
    isCompanyVerified: company.isGstVerified,
    postName,
    skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : [skillsRequired || 'Core Skills'],
    qualification: qualification || 'Graduate',
    salaryMin: Number(salaryMin) || 20000,
    salaryMax: Number(salaryMax) || 35000,
    salaryDisplay: salaryDisplay || `₹${salaryMin || 20000} - ₹${salaryMax || 35000} / महीना`,
    location: location || company.location,
    jobType: jobType || 'Full-Time',
    openings: Number(openings) || 2,
    description: description || 'Verified vacancy created on Jitomni hiring portal.',
    testId: `test-${Date.now()}`,
    testPassingScore: 60,
    testQuestionsCount: 10,
    hasTest: true,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Active',
    matchedCandidatesCount: 0
  };

  company.activeVacanciesCount = (company.activeVacanciesCount || 0) + 1;
  vacanciesStore.unshift(newVacancy);
  res.json({ success: true, vacancy: newVacancy });
});

// POST AI generate 10 MCQ test questions for a job / skill
hiringRouter.post('/api/hiring/generate-test', async (req, res) => {
  const { postName, skillsRequired } = req.body;
  const skillsList = Array.isArray(skillsRequired) ? skillsRequired.join(', ') : (skillsRequired || 'General Aptitude');

  try {
    const ai = getGenAI();
    if (ai) {
      const prompt = `Generate a 10-question multiple choice skill test for the job role: "${postName}" requiring skills: "${skillsList}".
Each question must test real practical, on-the-job knowledge.
Return strictly a valid JSON object matching this schema:
{"title":"${postName} Skills Verification Test (10 Questions)","durationMinutes":12,"passingPercentage":60,"questions":[{"id":"q1","question":"Clear question text?","options":["Option A","Option B","Option C","Option D"],"correctOptionIndex":0,"explanation":"Why this answer is correct."}]}`;

      const response = await generateFastContent(ai, prompt, 'Professional HR Assessment Generator', true);
      if (response?.text) {
        const parsedTest = JSON.parse(response.text);
        if (parsedTest.questions && Array.isArray(parsedTest.questions) && parsedTest.questions.length > 0) {
          return res.json({ success: true, test: parsedTest });
        }
      }
    }
  } catch (err: any) {
    console.warn('AI test generation fallback triggered:', err.message);
  }

  // Fallback high quality test
  res.json({
    success: true,
    test: {
      title: `${postName} Skill Verification Test (10 Questions)`,
      durationMinutes: 12,
      passingPercentage: 60,
      questions: [
        {
          id: 'fb-q1',
          question: `In professional ${postName} workflow, what is the primary standard procedure to ensure error-free execution?`,
          options: ['Double verification and validation against source records', 'Skip logging to save time', 'Rely on memory without documentation', 'Delay task until end of week'],
          correctOptionIndex: 0,
          explanation: 'Standard quality control requires structured validation against authoritative source data.'
        },
        {
          id: 'fb-q2',
          question: `Which key skill is most critical when handling ${skillsList}?`,
          options: ['Systematic problem-solving and accurate data structuring', 'Manual repetitive entry without formulas', 'Ignoring client constraints', 'Uncoordinated communication'],
          correctOptionIndex: 0,
          explanation: 'Accuracy and structured problem solving are foundational.'
        },
        {
          id: 'fb-q3',
          question: 'What is the most effective approach to handle unexpected errors or discrepancies in work reports?',
          options: ['Isolate root cause, log the issue, and apply structured fix', 'Delete the erroneous row silently', 'Blame external team', 'Ignore until deadline'],
          correctOptionIndex: 0,
          explanation: 'Root cause analysis and documented remediation prevent recurring discrepancies.'
        },
        {
          id: 'fb-q4',
          question: 'Which tool/method ensures fast search and cross-referencing across large datasets?',
          options: ['Indexed lookup tables / query keys', 'Manual line by line scanning', 'Printing on paper and highlighting', 'Random sampling'],
          correctOptionIndex: 0,
          explanation: 'Indexed lookups deliver optimal constant/logarithmic search time.'
        },
        {
          id: 'fb-q5',
          question: 'What constitutes professional data confidentiality in corporate operations?',
          options: ['Protecting client credentials and sensitive financial numbers', 'Sharing internal sheets on public forums', 'Emailing passwords in plain text', 'Leaving workstation unlocked'],
          correctOptionIndex: 0,
          explanation: 'Data privacy and secure credential management are non-negotiable.'
        },
        {
          id: 'fb-q6',
          question: 'When communicating progress to team leads, what format is most appreciated?',
          options: ['Concise summary with bullet points, metrics, and pending blockers', 'Vague one-word messages', '10-page unformatted text dump', 'No updates unless asked'],
          correctOptionIndex: 0,
          explanation: 'Structured scannable reporting keeps stakeholders aligned.'
        },
        {
          id: 'fb-q7',
          question: 'What is the primary benefit of automating recurring workflows?',
          options: ['Eliminates human fatigue error and speeds up turnaround', 'Makes work harder to track', 'Causes system crashes', 'Reduces company productivity'],
          correctOptionIndex: 0,
          explanation: 'Automation drastically reduces human error and accelerates processing.'
        },
        {
          id: 'fb-q8',
          question: 'How should conflicting task deadlines be prioritized?',
          options: ['Assess business impact, urgency, and consult manager for priority matrix', 'Work only on the easiest task first', 'Halt all work', 'Ignore higher impact deliverables'],
          correctOptionIndex: 0,
          explanation: 'Impact vs urgency evaluation delivers optimal business outcomes.'
        },
        {
          id: 'fb-q9',
          question: 'What is a key indicator of high quality documentation in technical and business tasks?',
          options: ['Step-by-step reproducibility and clear explanations', 'No comments or headings', 'Outdated links', 'Using technical jargon without context'],
          correctOptionIndex: 0,
          explanation: 'Clear reproducibility enables anyone on the team to maintain workflows.'
        },
        {
          id: 'fb-q10',
          question: 'What makes a candidate truly "Verified & Job-Ready" on Jitomni Platform?',
          options: ['Demonstrated skill mastery by passing 60%+ in skill assessment and verified credentials', 'Copy-pasting a fake resume', 'Purchasing paid fake certificates', 'Applying without knowing the tools'],
          correctOptionIndex: 0,
          explanation: 'Verified skills and genuine assessment passing guarantee authentic job readiness.'
        }
      ]
    }
  });
});

// POST submit candidate test
hiringRouter.post('/api/hiring/submit-test', (req, res) => {
  const {
    candidateName,
    candidatePhone,
    candidateEmail,
    candidateEducation,
    candidateSkills,
    vacancyId,
    score,
    totalQuestions,
    candidateAadhaarVerified,
    candidateDegreeVerified
  } = req.body;

  const total = Number(totalQuestions) || 10;
  const sc = Number(score) || 0;
  const percentage = Math.round((sc / total) * 100);
  const passed = percentage >= 60;

  const vacancy = vacanciesStore.find(v => v.id === vacancyId) || vacanciesStore[0];

  const result: BackendTestResult = {
    id: `tr-${Date.now()}`,
    candidateId: `cand-${Date.now()}`,
    candidateName: candidateName || 'Verified Candidate',
    candidatePhone: candidatePhone || '+91 98000 00000',
    candidateEmail: candidateEmail || 'applicant@verifiedjobs.in',
    candidateEducation: candidateEducation || 'Graduate',
    candidateAadhaarVerified: candidateAadhaarVerified !== false,
    candidateDegreeVerified: candidateDegreeVerified !== false,
    candidateSkills: Array.isArray(candidateSkills) ? candidateSkills : (vacancy ? vacancy.skillsRequired : ['Excel', 'MIS']),
    vacancyId: vacancy ? vacancy.id : 'vac-1',
    vacancyTitle: vacancy ? vacancy.postName : 'Executive Role',
    companyId: vacancy ? vacancy.companyId : 'comp-1',
    companyName: vacancy ? vacancy.companyName : 'Verified Employer',
    testId: vacancy ? (vacancy.testId || 'test-1') : 'test-1',
    score: sc,
    totalQuestions: total,
    percentage,
    passed,
    takenAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    autoMatched: passed,
    status: passed ? 'Verified Candidate' : 'Re-test Scheduled (7 Days)'
  };

  testResultsStore.unshift(result);

  if (passed && vacancy) {
    vacancy.matchedCandidatesCount = (vacancy.matchedCandidatesCount || 0) + 1;
  }

  res.json({
    success: true,
    passed,
    percentage,
    result,
    autoMatchedToCompany: passed ? vacancy?.companyName : null,
    message: passed
      ? `🎉 बधाई! आपने ${percentage}% स्कोर के साथ टेस्ट पास कर लिया है। आपका वेरिफाइड प्रोफाइल सीधे ${vacancy?.companyName} के डैशबोर्ड पर भेज दिया गया है!`
      : `स्कोर ${percentage}% (पासिंग 60% आवश्यक)। 7 दिन बाद पुनः प्रयास करें। तैयारी हेतु स्टडी मटेरियल नीचे दिया गया है।`
  });
});

// GET verified candidates for a company
hiringRouter.get('/api/hiring/company-candidates/:companyId', (req, res) => {
  const { companyId } = req.params;
  const candidates = testResultsStore.filter(tr => tr.companyId === companyId || companyId === 'all');
  res.json({ success: true, count: candidates.length, candidates });
});

// POST 1-Click Labour Job Apply
hiringRouter.post('/api/hiring/labour-apply', (req, res) => {
  const { jobId, jobTitle, employerName, employerPhone, workerName, workerPhone, workerLocation, workType } = req.body;
  if (!workerName || !workerPhone) {
    return res.status(400).json({ error: 'Name and Phone number are required' });
  }

  const application = {
    id: `lab-app-${Date.now()}`,
    jobId: jobId || 'lab-1',
    jobTitle: jobTitle || 'काम का आवेदन',
    employerName: employerName || 'ठेकेदार / कंपनी',
    employerPhone: employerPhone || '+91 98930 77112',
    workerName,
    workerPhone,
    workerLocation: workerLocation || 'भोपाल',
    workType: workType || 'Mazdoor',
    appliedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'Direct Call Connected'
  };

  labourApplicationsStore.unshift(application);

  res.json({
    success: true,
    message: 'काम का आवेदन सफलतापूर्वक दर्ज हो गया है! आप ठेकेदार/मालिक को सीधे कॉल कर सकते हैं।',
    application,
    directCallPhone: application.employerPhone
  });
});

// POST AI Interview Evaluation Submission
hiringRouter.post('/api/hiring/ai-interview-submit-evaluation', (req, res) => {
  const result = req.body;
  if (!result || !result.candidateName) {
    return res.status(400).json({ error: 'Valid candidate evaluation payload is required' });
  }

  aiInterviewResultsStore.unshift({
    ...result,
    storedAt: new Date().toISOString()
  });

  testResultsStore.unshift({
    id: `tr-ai-${Date.now()}`,
    candidateId: `cand-ai-${Date.now()}`,
    candidateEmail: 'candidate.verified@jitomni.edu.in',
    candidateName: result.candidateName,
    candidatePhone: result.candidatePhone || '+91 98261 44520',
    candidateCity: result.candidateCity || 'Indore',
    candidateEducation: result.candidateEducation || 'B.Tech / MBA / Senior Specialist',
    candidateAadhaarVerified: true,
    candidateDegreeVerified: true,
    candidateSkills: [result.targetRole, 'AI Video Interview Verified', 'Leadership', 'Crisis Management'],
    vacancyId: 'vac-5',
    vacancyTitle: result.targetRole,
    companyId: 'comp-1',
    companyName: result.targetCompany,
    testId: 'ai-interview-pro',
    score: Math.round((result.metrics?.overallWeightedScore || 88) / 10),
    totalQuestions: 10,
    percentage: result.metrics?.overallWeightedScore || 88,
    passed: true,
    takenAt: result.completedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    autoMatched: true,
    status: 'AI Interview Verified Candidate',
    isAIInterviewVerified: true,
    aiInterviewBadge: 'AI Interview Pro (Top 5% Talent)',
    aiScore: result.metrics?.overallWeightedScore || 88,
    aiMetrics: result.metrics,
    aiCertId: result.certificationId
  });

  res.json({
    success: true,
    message: 'AI Interview evaluation successfully registered and pushed to company talent dashboard.',
    certificationId: result.certificationId,
    storedCount: aiInterviewResultsStore.length
  });
});

// GET AI Interview Evaluations
hiringRouter.get('/api/hiring/ai-interview-evaluations', (req, res) => {
  res.json({
    success: true,
    count: aiInterviewResultsStore.length,
    results: aiInterviewResultsStore
  });
});
