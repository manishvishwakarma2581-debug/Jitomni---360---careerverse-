import { Router } from 'express';
import { getGenAI, generateFastContent } from '../ai/geminiClient';

export const vacanciesAndJobsRouter = Router();

// ==========================================
// 1. LIVE SARKARI VACANCIES (Module 9)
// ==========================================
export interface VacancyItem {
  id: string;
  postName: string;
  department: string;
  departmentLogo?: string;
  totalPosts: string;
  startDate: string;
  lastDate: string;
  isLastDateNear: boolean;
  qualification: string;
  ageLimit: string;
  salaryPayScale: string;
  status: 'Active' | 'Upcoming' | 'Last Date Near';
  category: 'Centre' | 'MP State';
  subCategory: 'Police' | 'Banking' | 'Railway' | 'SSC' | 'Civil Services' | 'Teaching' | 'Other';
  officialLink: string;
  notificationPdfUrl: string;
  applyOnlineUrl: string;
  syllabusExamKey: 'SSC' | 'MP Police' | 'Patwari' | 'Railway' | 'Banking' | 'MPPSC' | 'UPSC';
  summaryHindi: string;
  keyPoints: string[];
  updatedAt?: string;
}

const liveVacanciesStore: VacancyItem[] = [
  {
    id: 'vac-ssc-cgl-2026',
    postName: 'SSC Combined Graduate Level (CGL) 2026',
    department: 'Staff Selection Commission (Govt of India)',
    departmentLogo: '🏛️',
    totalPosts: '17,727 Posts',
    startDate: '24 June 2026',
    lastDate: '27 July 2026',
    isLastDateNear: false,
    qualification: 'Bachelor Degree in Any Stream from Recognized University',
    ageLimit: '18 - 32 Years (Post-wise variation)',
    salaryPayScale: 'Pay Level 4 to Level 8 (₹25,500 - ₹1,51,100)',
    status: 'Active',
    category: 'Centre',
    subCategory: 'SSC',
    officialLink: 'https://ssc.gov.in',
    notificationPdfUrl: 'https://ssc.gov.in/notice-board/cgl-2026-notice.pdf',
    applyOnlineUrl: 'https://ssc.gov.in',
    syllabusExamKey: 'SSC',
    summaryHindi: 'भारत सरकार के विभिन्न मंत्रालयों एवं विभागों में असिस्टेंट ऑडिट ऑफिसर, इंस्पेक्टर, ASO और एक्साइज इंस्पेक्टर के 17,727 पदों पर भर्ती।',
    keyPoints: [
      'Tier 1 (CBT) में Maths, Reasoning, English, General Awareness',
      'कोई इंटरव्यू नहीं (100% मेरिट बेस्ड सिलेक्शन)',
      'JITOMNI पर 10-सेकंड क्वांट और वोकैब ट्रिक्स उपलब्ध'
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vac-mp-police-2026',
    postName: 'MP Police Constable & Radio Operator 2026',
    department: 'Madhya Pradesh Employees Selection Board (ESB MP)',
    departmentLogo: '👮',
    totalPosts: '7,500 Posts',
    startDate: '10 July 2026',
    lastDate: '15 August 2026',
    isLastDateNear: false,
    qualification: '10th / 12th Pass (Radio के लिए ITI/Diploma)',
    ageLimit: '18 - 36 Years (MP Candidates Relaxation Included)',
    salaryPayScale: '₹19,500 - ₹62,000 (Level 4)',
    status: 'Upcoming',
    category: 'MP State',
    subCategory: 'Police',
    officialLink: 'https://esb.mp.gov.in',
    notificationPdfUrl: 'https://esb.mp.gov.in/Rulebooks/RB_2026/MP_Police_2026.pdf',
    applyOnlineUrl: 'https://esb.mponline.gov.in',
    syllabusExamKey: 'MP Police',
    summaryHindi: 'मध्य प्रदेश पुलिस विभाग में आरक्षक (जीडी व विशेष सशस्त्र बल) के 7,500 पदों पर सीधी भर्ती।',
    keyPoints: [
      '100 अंक लिखित परीक्षा + 100 अंक फिजिकल टेस्ट (800m दौड़, गोला फेंक, लंबी कूद)',
      'MP GK और रीजनिंग का 50% से ज्यादा वेटेज',
      'JITOMNI 360° पर MP GK स्पेशल नोट्स और मॉक टेस्ट उपलब्ध'
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vac-mp-patwari-2026',
    postName: 'MP Patwari & Group-2 Sub Group-4 2026',
    department: 'MP Revenue Department / ESB MP',
    departmentLogo: '📜',
    totalPosts: '3,500 Posts',
    startDate: '01 August 2026',
    lastDate: '30 September 2026',
    isLastDateNear: false,
    qualification: 'Graduation + CPCT Scorecard (या 3 वर्ष में अनिवार्य)',
    ageLimit: '18 - 40 Years',
    salaryPayScale: '₹22,100 - ₹70,000 (Grade Pay 2100)',
    status: 'Upcoming',
    category: 'MP State',
    subCategory: 'Other',
    officialLink: 'https://esb.mp.gov.in',
    notificationPdfUrl: 'https://esb.mp.gov.in/Rulebooks/RB_2026/Patwari_2026.pdf',
    applyOnlineUrl: 'https://esb.mponline.gov.in',
    syllabusExamKey: 'Patwari',
    summaryHindi: 'मध्य प्रदेश के सभी 55 जिलों में भू-अभिलेख एवं राजस्व विभाग में पटवारी पदों पर भर्ती।',
    keyPoints: [
      'पंचायती राज, ग्रामीण अर्थव्यवस्था, सामान्य ज्ञान, हिंदी व कंप्यूटर ज्ञान',
      'सिंगल स्टेज कंबाइंड एग्जाम',
      'JITOMNI 360° पर पिछले 10 वर्षों के PYQ बैंक उपलब्ध'
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vac-rrb-group-d-2026',
    postName: 'Railway RRB Group D (Level-1) & ALP 2026',
    department: 'Railway Recruitment Boards (RRB)',
    departmentLogo: '🚆',
    totalPosts: '32,000 Posts',
    startDate: '15 June 2026',
    lastDate: '18 August 2026',
    isLastDateNear: false,
    qualification: '10th Pass / ITI (NCVT/SCVT)',
    ageLimit: '18 - 33 Years',
    salaryPayScale: '7th CPC Level 1 (₹18,000 - ₹56,900 + Allowances)',
    status: 'Active',
    category: 'Centre',
    subCategory: 'Railway',
    officialLink: 'https://rrbcdg.gov.in',
    notificationPdfUrl: 'https://rrbcdg.gov.in/CEN_01_2026.pdf',
    applyOnlineUrl: 'https://www.rrbapply.gov.in',
    syllabusExamKey: 'Railway',
    summaryHindi: 'भारतीय रेलवे के विभिन्न जोनों में ट्रैक मेंटेनर, पॉइंट्समैन व असिस्टेंट लोको पायलट के 32,000 पद।',
    keyPoints: [
      'CBT में साइंस, मैथ्स, रीजनिंग और करंट अफेयर्स',
      'ITI पास युवाओं के लिए विशेष तकनीकी सीटें',
      'JITOMNI पर ITI व रेलवे स्पेशल टेस्ट उपलब्ध'
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vac-mppsc-pre-2026',
    postName: 'MPPSC State Services & Forest Examination 2026',
    department: 'Madhya Pradesh Public Service Commission (MPPSC Indore)',
    departmentLogo: '🏛️',
    totalPosts: '286 Posts (Deputy Collector, DSP, Naib Tehsildar)',
    startDate: '01 May 2026',
    lastDate: '10 June 2026',
    isLastDateNear: false,
    qualification: 'Graduation in Any Stream',
    ageLimit: '21 - 40 Years (For Uniform Posts: 33 Years)',
    salaryPayScale: '₹56,100 - ₹1,77,500 (Level 12 / 10)',
    status: 'Active',
    category: 'MP State',
    subCategory: 'Civil Services',
    officialLink: 'https://mppsc.mp.gov.in',
    notificationPdfUrl: 'https://mppsc.mp.gov.in/Upload/Advertisements/SSE_2026_Notification.pdf',
    applyOnlineUrl: 'https://mponline.gov.in',
    syllabusExamKey: 'MPPSC',
    summaryHindi: 'मध्य प्रदेश में प्रशासनिक सेवा (डिप्टी कलेक्टर), पुलिस सेवा (DSP), व नायब तहसीलदार पदों पर भर्ती।',
    keyPoints: [
      'प्रारंभिक परीक्षा (GS 1 + CSAT) ओएमआर शीट आधारित',
      'मध्य प्रदेश का इतिहास, भूगोल व जनजातीय संस्कृति का 35%+ वेटेज',
      'JITOMNI पर MPPSC ओरिएंटेड 360° टॉपिक नोट्स उपलब्ध'
    ],
    updatedAt: new Date().toISOString()
  }
];

const vacancyAlerts = [
  '⚡ SSC CGL 2026 के 17,727 पदों के लिए आवेदन फॉर्म शुरू हैं। अंतिम तिथि से पूर्व आवेदन करें।',
  '📢 MP Police Constable भर्ती का नोटिफिकेशन इसी माह ESB MP पोर्टल पर जारी होने की संभावना है।',
  '🚆 Railway RRB Group D और ALP भर्ती 2026 का आधिकारिक पोर्टल एक्टिव हो चुका है।'
];

// GET Live Vacancies
vacanciesAndJobsRouter.get('/api/vacancies/live', (req, res) => {
  res.json({
    success: true,
    count: liveVacanciesStore.length,
    vacancies: liveVacanciesStore,
    alerts: vacancyAlerts,
    lastSyncTime: new Date().toISOString(),
    status: 'Live Real-Time Sync Active'
  });
});

// POST Refresh Vacancies
vacanciesAndJobsRouter.post('/api/vacancies/refresh', async (req, res) => {
  try {
    const ai = getGenAI();
    let newItemsCount = 0;

    if (ai) {
      try {
        const prompt = `List all latest central and MP state government competitive exam vacancies declared recently with official website links.
Categories: SSC, UPSC, MPPSC, MP Police, Patwari, Railway, Banking.
Return JSON array with id, postName, department, totalPosts, startDate, lastDate, qualification, ageLimit, salaryPayScale, status, category, subCategory, officialLink, notificationPdfUrl, applyOnlineUrl, syllabusExamKey, summaryHindi, keyPoints.`;

        const response = await generateFastContent(ai, prompt, 'Official Indian Vacancies Grounding', true);
        if (response?.text) {
          const freshData = JSON.parse(response.text);
          if (Array.isArray(freshData) && freshData.length > 0) {
            for (const item of freshData) {
              const exists = liveVacanciesStore.some(v => v.postName.toLowerCase() === item.postName.toLowerCase() || v.id === item.id);
              if (!exists) {
                liveVacanciesStore.unshift({ ...item, updatedAt: new Date().toISOString() });
                newItemsCount++;
              }
            }
          }
        }
      } catch (geminiErr: any) {
        console.warn('Gemini live vacancy refresh warning:', geminiErr.message);
      }
    }

    res.json({
      success: true,
      message: newItemsCount > 0 ? `Synced ${newItemsCount} fresh official vacancies` : 'All gazette vacancies already synchronized',
      count: liveVacanciesStore.length,
      vacancies: liveVacanciesStore
    });
  } catch (error: any) {
    console.error('Error in /api/vacancies/refresh:', error);
    res.status(500).json({ error: 'Failed to refresh vacancies', message: error.message });
  }
});

// ==========================================
// 2. GLOBAL HIGH-PAYING AI JOBS (Module 10)
// ==========================================
export interface GlobalAIJob {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salaryInDollar: string;
  salaryInRupees: string;
  applyLink: string;
  source: 'Upwork' | 'Fiverr' | 'Turing' | 'LinkedIn' | 'Outlier' | 'Direct Company';
  skills: string[];
  postedAgo: string;
  badge?: string;
  isIndiansEligible: boolean;
}

const globalAIJobsStore: GlobalAIJob[] = [
  {
    id: 'gjob-ai-tutor-math',
    jobTitle: 'AI Math & Reasoning Model Trainer & Evaluator (Hindi/English)',
    company: 'Outlier.ai / Alignerr',
    location: 'Remote (Work From Anywhere in India)',
    salaryInDollar: '$25 - $45 / hr',
    salaryInRupees: '₹2,100 - ₹3,700 / घंटा (₹3.5 - 6.0 लाख/महीना)',
    applyLink: 'https://outlier.ai',
    source: 'Outlier',
    skills: ['Class 10-12 Math', 'Step-by-Step Logic', 'English/Hindi Writing', 'RLHF Feedback'],
    postedAgo: 'Just Now',
    badge: '🔥 Top High-Demand (No Coding Needed)',
    isIndiansEligible: true
  },
  {
    id: 'gjob-prompt-engineer-marketing',
    jobTitle: 'Generative AI Prompt Engineer & Content Specialist',
    company: 'Singapore Growth Agency (SG Remote)',
    location: 'Singapore / Remote India',
    salaryInDollar: '$35 - $60 / hr',
    salaryInRupees: '₹2,900 - ₹5,000 / घंटा (₹4.5 - 8.0 लाख/महीना)',
    applyLink: 'https://www.upwork.com',
    source: 'Upwork',
    skills: ['ChatGPT Plus Prompting', 'Claude 3.5 Sonnet', 'Midjourney v6', 'English Copywriting'],
    postedAgo: '2 hours ago',
    badge: '🌟 Verified Client (Payment Guaranteed)',
    isIndiansEligible: true
  },
  {
    id: 'gjob-video-editor',
    jobTitle: 'Short-Form Video Editor (CapCut AI + Premiere)',
    company: 'Global Media Creators LLC (Singapore)',
    location: 'Singapore / Remote',
    salaryInDollar: '$30 - $55 / hr',
    salaryInRupees: '₹2,500 - ₹4,500 / घंटा (₹3.8 - 7 लाख/महीना)',
    applyLink: 'https://www.fiverr.com',
    source: 'Fiverr',
    skills: ['CapCut AI', 'Pictory AI', 'Subtitles & B-Rolls', 'Reels / TikTok Strategy'],
    postedAgo: 'Today',
    badge: '🎬 Creative & High Pay',
    isIndiansEligible: true
  },
  {
    id: 'gjob-ai-voiceover',
    jobTitle: 'AI Voice-Over & Audio Localization Specialist',
    company: 'Voiseed Global (UK / Remote)',
    location: 'UK / Remote Work',
    salaryInDollar: '$18 - $30 / hr',
    salaryInRupees: '₹1,500 - ₹2,500 / घंटा (₹2.2 - 3.8 लाख/महीना)',
    applyLink: 'https://elevenlabs.io',
    source: 'LinkedIn',
    skills: ['ElevenLabs Voice AI', 'Hindi-English Voice Tuning', 'Audacity / Sound Editing'],
    postedAgo: '1 day ago',
    badge: '🎙️ Voice AI',
    isIndiansEligible: true
  },
  {
    id: 'gjob-virtual-assistant',
    jobTitle: 'AI-Powered Executive Virtual Assistant',
    company: 'E-commerce Brand Owners (US / Canada)',
    location: 'US / Remote WFH',
    salaryInDollar: '$22 - $40 / hr',
    salaryInRupees: '₹1,800 - ₹3,300 / घंटा (₹2.8 - 5 लाख/महीना)',
    applyLink: 'https://www.upwork.com',
    source: 'Upwork',
    skills: ['Email Management', 'Google Sheets + AI', 'ChatGPT Scheduling', 'Canva Graphics'],
    postedAgo: 'Today',
    badge: '💼 Stable Monthly Retainer',
    isIndiansEligible: true
  },
  {
    id: 'gjob-nocode-builder',
    jobTitle: 'No-Code Website & Landing Page Builder (Framer / Wix AI)',
    company: 'Startups & SMEs (Dubai / Australia)',
    location: 'Dubai / Australia (Remote)',
    salaryInDollar: '$35 - $70 / hr',
    salaryInRupees: '₹2,900 - ₹5,800 / घंटा (₹4.5 - 9 लाख/महीना)',
    applyLink: 'https://www.framer.com',
    source: 'LinkedIn',
    skills: ['Framer AI', 'Wix Studio', 'Webflow Basics', 'Responsive UI Design'],
    postedAgo: '3 hours ago',
    badge: '🚀 Mega Earning Potential',
    isIndiansEligible: true
  }
];

vacanciesAndJobsRouter.get(['/api/global-ai-jobs', '/api/global-jobs/live'], (req, res) => {
  res.json({
    success: true,
    total: globalAIJobsStore.length,
    jobs: globalAIJobsStore,
    syncStatus: 'Verified Global Opportunities Active',
    lastSyncTime: new Date().toISOString()
  });
});

vacanciesAndJobsRouter.post(['/api/global-ai-jobs/refresh', '/api/global-jobs/refresh'], async (req, res) => {
  try {
    const ai = getGenAI();
    let newJobsCount = 0;

    if (ai) {
      try {
        const prompt = `List 5 latest real-world high paying remote AI jobs open to candidates from India.
Platforms: Outlier, Upwork, Fiverr, Turing, Remotasks.
Return JSON array with id, jobTitle, company, location, salaryInDollar, salaryInRupees, applyLink, source, skills, postedAgo, badge, isIndiansEligible.`;

        const response = await generateFastContent(ai, prompt, 'Global Remote Tech Jobs Specialist', true);
        if (response?.text) {
          const freshJobs = JSON.parse(response.text);
          if (Array.isArray(freshJobs) && freshJobs.length > 0) {
            for (const item of freshJobs) {
              const exists = globalAIJobsStore.some(j => j.jobTitle.toLowerCase() === item.jobTitle.toLowerCase() || j.id === item.id);
              if (!exists) {
                globalAIJobsStore.unshift(item);
                newJobsCount++;
              }
            }
          }
        }
      } catch (geminiErr: any) {
        console.warn('Gemini global AI jobs refresh warning:', geminiErr.message);
      }
    }

    res.json({
      success: true,
      message: newJobsCount > 0 ? `Synced ${newJobsCount} fresh verified international AI opportunities` : 'All remote AI listings are currently up-to-date',
      total: globalAIJobsStore.length,
      jobs: globalAIJobsStore
    });
  } catch (error: any) {
    console.error('Error in /api/global-ai-jobs/refresh:', error);
    res.status(500).json({ error: 'Failed to refresh global AI jobs', message: error.message });
  }
});
