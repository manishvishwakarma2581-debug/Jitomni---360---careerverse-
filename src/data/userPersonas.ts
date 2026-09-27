import { UserPersona, MainTab, Language } from '../types';

export interface PersonaConfig {
  id: UserPersona;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  badge: Record<Language, string>;
  icon: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  defaultTab: MainTab;
  allowedTabs: MainTab[];
  highlights: Record<Language, string[]>;
  tagline: Record<Language, string>;
}

export const USER_PERSONAS: PersonaConfig[] = [
  {
    id: 'student',
    name: {
      hi: 'विद्यार्थी / प्रतियोगी परीक्षा',
      en: 'Student & Aspirants',
      hinglish: 'Student & Aspirants (Study Mode)',
    },
    subtitle: {
      hi: '100% पढ़ाई एवं जीरो डिस्ट्रैक्शन — कक्षा 1-12, UPSC, SSC, IIT-JEE, ITI व टेस्ट सीरीज',
      en: '100% Distraction-Free Study — School 1-12, UPSC, SSC, IIT-JEE, ITI, NCERT & Doubt Solver',
      hinglish: '100% Padhai & Zero Distraction — School 1-12, UPSC, SSC, IIT-JEE, ITI, Mock Tests & Doubts',
    },
    badge: {
      hi: '100% डिस्ट्रैक्शन फ्री पढ़ाई',
      en: 'Pure Study Mode',
      hinglish: 'Zero Distraction Study',
    },
    icon: '🎓',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50 hover:border-amber-400',
    bgGradient: 'from-amber-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'home',
    allowedTabs: [
      'home',
      'school',
      'exam',
      'current-affairs',
      'iit',
      'iti',
      'doubt',
      'flashcards',
      'english',
      'prime',
    ],
    highlights: {
      hi: [
        'कक्षा 1 से 12 तक NCERT व MP/CBSE बोर्ड के संपूर्ण अध्याय',
        'UPSC, MPPSC, SSC व रेलवे की टाइमर व नेगेटिव मार्किंग युक्त टेस्ट सीरीज',
        'IIT-JEE व ITI के कठिनतम न्यूमेरिकल्स व थ्योरी हल',
        '24x7 AI डाउट सॉल्वर एवं स्मार्ट रिवीजन फ्लैशकार्ड्स',
      ],
      en: [
        'Classes 1 to 12 full NCERT chapters and step-by-step solutions',
        'UPSC, SSC, State PSC & Railway timed CBT mock tests with negative marking',
        'IIT-JEE & ITI derivations, formulas, and NIMI question banks',
        '24x7 Instant AI Doubt Solver and spaced-repetition flashcards',
      ],
      hinglish: [
        'Class 1-12 full NCERT chapters aur step-by-step solutions',
        'UPSC, SSC, Railway timed mock tests with negative marking',
        'IIT-JEE & ITI advanced numericals and NIMI question banks',
        'Instant AI Doubt Solver aur smart spaced flashcards',
      ],
    },
    tagline: {
      hi: 'लेबर जॉब्स, कंपनी हायरिंग और अन्य बाहरी चीजों से पूरी तरह मुक्त विशुद्ध अध्ययन का माहौल।',
      en: 'Completely isolated from labour hiring, company portals, and outside clutter.',
      hinglish: 'Labour jobs aur company hiring clutter se 100% free pure study workspace.',
    },
  },
  {
    id: 'company',
    name: {
      hi: 'कंपनी / नियोक्ता (Recruiter)',
      en: 'Company & Recruiter',
      hinglish: 'Company / Employer Hiring',
    },
    subtitle: {
      hi: '100% आधार व टेस्ट वेरिफाइड कैंडिडेट्स — जीरो फेक प्रोफाइल, जीरो कमीशन डायरेक्ट हायरिंग',
      en: '100% Aadhaar & Test-Verified Candidates — Zero Fake Profiles, Direct Hiring',
      hinglish: '100% Aadhaar & Skill Verified Candidates — Zero Fake Profiles, Direct Zero-Commission Hiring',
    },
    badge: {
      hi: 'सत्यापित कॉर्पोरेट हायरिंग',
      en: 'Zero Fake Hiring',
      hinglish: 'Verified Talent Pool',
    },
    icon: '🏢',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/50 hover:border-blue-400',
    bgGradient: 'from-blue-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'company',
    allowedTabs: [
      'company',
      'verifiedjobs',
      'ai-interview',
      'franchise',
      'skilled',
      'labour',
    ],
    highlights: {
      hi: [
        'कैंडिडेट्स का आधार KYC, 5-पैरामीटर AI इंटरव्यू स्कोर और स्किल टेस्ट रिपोर्ट',
        'बिना किसी बिचौलिए या एजेंसी कमीशन के सीधा संपर्क (Call/WhatsApp/Email)',
        'कंपनी जॉब पोस्टिंग और ऑटोमैटिक स्किल-मैचिंग कैंडिडेट रडार',
        'तकनीकी, ऑफिस एवं कुशल वर्कफोर्स का संपूर्ण सत्यापित डेटाबेस',
      ],
      en: [
        'Tamper-proof candidate dossiers with Aadhaar KYC and AI interview scores',
        'Direct zero-commission hiring with 1-click candidate WhatsApp/Call',
        'Post job openings and receive automated skill-matched applicants',
        'Comprehensive verified pool across IT, office, skilled and technical roles',
      ],
      hinglish: [
        'Candidates ke Aadhaar status, AI interview scores aur skill badges',
        'Direct zero-commission candidate contact (Call/WhatsApp/Email)',
        'Company job posting aur automated candidate radar',
        'Verified technical, office and operational workforce database',
      ],
    },
    tagline: {
      hi: 'छात्रों के स्कूल सिलेबस या खेती-किसानी से अलग — केवल योग्य व जांची-परखी प्रतिभा खोजने का कार्यक्षेत्र।',
      en: 'Focused exclusively on qualified verified talent acquisition without academic clutter.',
      hinglish: 'School syllabus ya outside noise se alag — pure corporate verified hiring portal.',
    },
  },
  {
    id: 'jobseeker',
    name: {
      hi: 'जॉब सीकर / युवा प्रोफेशनल',
      en: 'Job Seeker & Professional',
      hinglish: 'Job Seeker (Careers & Vacancies)',
    },
    subtitle: {
      hi: 'वेरिफाइड नौकरियां, लाइव सरकारी भर्तियां और वैश्विक रिमोट AI डॉलर जॉब्स ($25-$120/hr)',
      en: 'Verified Private Jobs, Official Govt Vacancies & Global Remote AI Jobs ($25-$120/hr)',
      hinglish: 'Verified Jobs, Live Sarkari Vacancies & High-Paying Remote AI Jobs ($25-$120/hr)',
    },
    badge: {
      hi: 'रोजगार व करियर हब',
      en: 'Career & Employment',
      hinglish: 'Careers & Vacancies',
    },
    icon: '💼',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50 hover:border-emerald-400',
    bgGradient: 'from-emerald-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'verifiedjobs',
    allowedTabs: [
      'verifiedjobs',
      'vacancies',
      'globaljobs',
      'ai-interview',
      'english',
      'iti',
    ],
    highlights: {
      hi: [
        'सत्यापित कंपनियों में सीधे आवेदन (बिना फर्जी कंसल्टेंसी के)',
        'केंद्र व राज्य सरकार की लाइव भर्तियों की आधिकारिक अधिसूचनाएं (PDF)',
        'घर बैठे अंतरराष्ट्रीय रिमोट AI रोल्स ($25-$120/घंटा) व अपवर्क ट्रेनिंग',
        'AI इंटरव्यूअर से मॉक इंटरव्यू देकर अपना स्कोर व बैज हासिल करें',
      ],
      en: [
        'Direct applications to verified employers with zero fake consultancy scam',
        '100% authentic central & state government vacancy gazette notifications',
        'High-paying international remote AI roles ($25-$120/hr) with Upwork blueprints',
        'AI Interviewer practice with 5-parameter rubric feedback and verified badge',
      ],
      hinglish: [
        'Direct verified company jobs (Zero fake consultancy)',
        'Live Sarkari vacancies with official syllabus and direct apply links',
        'Global remote AI jobs ($25-$120/hr) from home with step-by-step roadmap',
        'AI Interviewer mock sessions aur verified employability score',
      ],
    },
    tagline: {
      hi: 'रोजगार की तलाश कर रहे युवाओं के लिए केवल सत्यापित अवसर और इंटरव्यू की तैयारी।',
      en: 'Dedicated to genuine employment opportunities, salary transparency, and interview readiness.',
      hinglish: 'Pure job opportunities, verified hiring and high-paying career opportunities.',
    },
  },
  {
    id: 'kisan',
    name: {
      hi: 'किसान / एग्री-टेक (Krishi 360°)',
      en: 'Farmer & Agri-Tech',
      hinglish: 'Farmer & Agri-Tech (Krishi 360°)',
    },
    subtitle: {
      hi: 'वैज्ञानिक खेती, दैनिक मंडी भाव, AI फसल रोग डॉक्टर, मौसम अलर्ट और FaaS खेती अनुबंध',
      en: 'Scientific Farming, Daily Mandi Rates, AI Crop Doctor, Weather & FaaS Farming Contracts',
      hinglish: 'Scientific Krishi, Live Mandi Bhav, AI Crop Doctor & FaaS Contracts Desk',
    },
    badge: {
      hi: 'कृषि एवं किसान हब',
      en: 'Agri-Tech & Farming',
      hinglish: 'Krishi 360°',
    },
    icon: '🌾',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50 hover:border-emerald-400',
    bgGradient: 'from-emerald-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'agri',
    allowedTabs: [
      'agri',
      'doubt',
    ],
    highlights: {
      hi: [
        'दैनिक लाइव मंडी भाव एवं बाजार भाव पूर्वानुमान',
        'AI फसल डॉक्टर: पत्तियों के रोग की फोटो खींचकर तुरंत देसी व वैज्ञानिक इलाज',
        'माही पवार FaaS डिजिटल अनुबंध व कृषि उपकरण सहायता',
        'ICAR पाठ्यक्रम, ड्रिप इरिगेशन, सॉइल हेल्थ व ड्रोन सब्सिडी गाइड',
      ],
      en: [
        'Daily APMC live mandi rates and market price forecasts',
        'AI Crop Doctor: Instant disease diagnosis and organic/chemical remedies from leaf photo',
        'Mahi Pawar FaaS digital farming contracts and tractor/drone machinery lease',
        'ICAR agricultural curriculum, soil health, drip irrigation, and subsidy roadmaps',
      ],
      hinglish: [
        'Live daily APMC Mandi rates aur weather advisory',
        'AI Crop Doctor: Photo upload karke bimari ka turant ilaj',
        'FaaS digital farming contracts aur machinery support',
        'ICAR agri syllabus aur Krishi schemes guidance',
      ],
    },
    tagline: {
      hi: 'भारतीय किसानों और कृषि छात्रों के लिए समर्पित आधुनिक खेती व मंडी सहायता।',
      en: 'Dedicated to farmers and agriculture graduates with actionable agro-economic intelligence.',
      hinglish: 'Kisan bhaiyon aur agri students ke liye dedicated scientific farming workspace.',
    },
  },
  {
    id: 'worker',
    name: {
      hi: 'स्थानीय कामगार एवं साथी सेवा',
      en: 'Local Worker & Companion',
      hinglish: 'Local Worker & Companion Tasks',
    },
    subtitle: {
      hi: 'दैनिक दिहाड़ी कार्य (₹450-₹900/दिन) एवं ऑन-डिमांड साथी टास्क सेवा (80% सीधी कमाई)',
      en: 'Daily Wage Local Work (₹450-₹900/day) & Safe On-Demand Companion Tasks (80% Payout)',
      hinglish: 'Daily Local Wage Work (Plumber, Mason, Electrician) & Companion Tasks (80% Direct Pay)',
    },
    badge: {
      hi: 'कामगार एवं साथी हब',
      en: 'Labour & Companion',
      hinglish: 'Work & Companion',
    },
    icon: '🛠️',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/50 hover:border-orange-400',
    bgGradient: 'from-orange-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'companion',
    allowedTabs: [
      'companion',
      'labour',
      'verifiedjobs',
      'iti',
    ],
    highlights: {
      hi: [
        'प्लंबर, इलेक्ट्रीशियन, राजमिस्त्री, पेंटर व खेत मजदूर को सीधे दैनिक काम',
        'बिना ठेकेदार के कमीशन के पारदर्शी दैनिक दिहाड़ी (₹450-₹900)',
        'ऑन-डिमांड साथी सेवा: बुजुर्गों की सहायता, बाजार काम व हॉस्पिटल साथी (80% कमाई)',
        '100% आधार व पुलिस सत्यापन से सुरक्षित कार्य व तत्काल भुगतान',
      ],
      en: [
        'Direct local tasks for plumbers, electricians, masons, painters, and helpers',
        'Transparent daily wages (₹450-₹900/day) with zero middleman deductions',
        'On-demand companion tasks: senior citizen care, market assistance, hospital visits (80% split)',
        'Safe tasks backed by 100% Aadhaar and police verification with direct payouts',
      ],
      hinglish: [
        'Local construction, plumbing, painting aur daily helper jobs',
        'Transparent daily wage (₹450-₹900/day) bina thekedar commission',
        'On-demand companion service for senior citizens, tasks & quick earnings (80% wallet)',
        'Aadhaar verified trustworthy local gigs with direct 1-click contact',
      ],
    },
    tagline: {
      hi: 'मेहनतकश श्रमिकों और पार्ट-टाइम टास्क वर्करों के लिए सम्मानजनक एवं सुरक्षित रोजगार।',
      en: 'Respectful, transparent local earning opportunities for daily workers and companions.',
      hinglish: 'Daily wage workers aur local companion partners ke liye transparent direct earning.',
    },
  },
  {
    id: 'all',
    name: {
      hi: 'सम्पूर्ण JITOMNI 360° (सभी 14 मॉड्यूल्स)',
      en: 'All 14 Sovereign Modules',
      hinglish: 'All 14 Sovereign Modules (Full 360°)',
    },
    subtitle: {
      hi: 'सुपर एडमिन, नीति निर्माता एवं सम्पूर्ण प्लेटफॉर्म अन्वेषक (पढ़ाई से कमाई तक का पूरा विज़न)',
      en: 'Full Sovereign Architecture: School, Exams, Jobs, ITI, IIT, Agri, Labour & Global AI',
      hinglish: 'Complete Sovereign Ecosystem: Padhai Se Kamai Tak (All 14 Modules)',
    },
    badge: {
      hi: 'सम्पूर्ण 360° संप्रभु पोर्टल',
      en: 'Complete 360° Access',
      hinglish: 'Full 14 Modules',
    },
    icon: '🌐',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50 hover:border-cyan-400',
    bgGradient: 'from-cyan-950/40 via-[#0A1931] to-[#040C1A]',
    defaultTab: 'home',
    allowedTabs: [
      'home',
      'verifiedjobs',
      'companion',
      'agri',
      'iti',
      'iit',
      'school',
      'exam',
      'current-affairs',
      'vacancies',
      'globaljobs',
      'english',
      'doubt',
      'flashcards',
      'prime',
      'company',
      'skilled',
      'labour',
      'ai-interview',
      'franchise',
      'admin',
      'super-admin',
      'krishi-admin',
    ],
    highlights: {
      hi: [
        'सभी 14 शैक्षणिक, रोजगार, कृषि एवं सेवा मॉड्यूल्स का संपूर्ण एक्सेस',
        'सुपर एडमिन कंट्रोल पैनल (मनीष विश्वकर्मा) एवं कृषि निदेशालय (माही पवार)',
        '14 मॉड्यूल्स संप्रभु क्वालिटी रडार, यूजर डिमांड्स ट्रैकर एवं ऑटो-शेड्यूलर',
        'संपूर्ण राष्ट्र-निर्माण विज़न: 10वीं पास मजदूर से लेकर AI इंजीनियर तक',
      ],
      en: [
        'Full unrestricted access to all 14 educational, hiring, agri, and service modules',
        'Super Admin command center (Manish Vishwakarma) & Krishi Directorate (Mahi Pawar)',
        '14-Modules Sovereign Quality Radar, User Demands center, and Auto-Scheduler',
        'Philosophical nation-building vision: from 10th pass labour to top AI engineers',
      ],
      hinglish: [
        'All 14 modules full unrestricted access in one single interface',
        'Super Admin dashboard aur Krishi Directorate controls',
        '14-Module Quality Radar, User Demands Hub aur Auto-Cron Scheduler',
        'Complete Sovereign Vision: Padhai Se Kamai Tak',
      ],
    },
    tagline: {
      hi: 'प्लेटफॉर्म के सभी 14 आयामों को एक साथ देखने या प्रबंधित करने के लिए।',
      en: 'For exploring, testing, and managing the entire 14-module sovereign careerverse.',
      hinglish: 'Pure platform ke sabhi 14 modules ko manage aur explore karne ke liye.',
    },
  },
];

export function getPersonaConfig(personaId: UserPersona): PersonaConfig {
  const found = USER_PERSONAS.find((p) => p.id === personaId);
  return found || USER_PERSONAS[0];
}

export function isTabAllowedForPersona(tab: MainTab, personaId: UserPersona): boolean {
  if (personaId === 'all') return true;
  // Always allow admin tabs if opened
  if (tab === 'super-admin' || tab === 'admin' || tab === 'krishi-admin') return true;
  const config = getPersonaConfig(personaId);
  return config.allowedTabs.includes(tab);
}

export function getPersonaFromUrlOrStorage(): UserPersona {
  if (typeof window === 'undefined') return 'worker';
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role') || urlParams.get('persona');
  if (roleParam && USER_PERSONAS.some((p) => p.id === roleParam)) {
    return roleParam as UserPersona;
  }
  const saved = localStorage.getItem('jitomni_user_persona') as UserPersona;
  if (saved && USER_PERSONAS.some((p) => p.id === saved)) {
    return saved;
  }
  return 'worker'; // Clean On-Demand Companion & Services launch default
}

export function saveUserPersona(personaId: UserPersona): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jitomni_user_persona', personaId);
  }
}

export function getPersonaShareUrl(personaId: UserPersona, specificTab?: MainTab): string {
  if (typeof window === 'undefined') return `https://jitomni.in/?role=${personaId}`;
  const origin = window.location.origin;
  const tabParam = specificTab && specificTab !== 'home' ? `&tab=${specificTab}` : '';
  return `${origin}/?role=${personaId}${tabParam}`;
}
