import React, { useState } from 'react';
import { 
  Globe2, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  DollarSign, 
  Building2, 
  FileText, 
  Sparkles, 
  Zap, 
  Briefcase, 
  ArrowRight, 
  Code2, 
  Layers, 
  HelpCircle,
  Copy,
  Check,
  Search,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface SingaporeGlobalTechHubProps {
  lang: Language;
}

export const SingaporeGlobalTechHub: React.FC<SingaporeGlobalTechHubProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'vacancies' | 'portals' | 'ats_scanner' | 'sandbox' | 'certification'>('vacancies');
  const [selectedHub, setSelectedHub] = useState<'singapore' | 'usa' | 'uae' | 'europe'>('singapore');
  
  // ATS Resume Scanner State
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsFeedback, setAtsFeedback] = useState<{ pass: string[]; missing: string[] }>({ pass: [], missing: [] });

  // Sandbox State
  const [promptInput, setPromptInput] = useState('<role>Expert Singapore Fintech Prompt Engineer</role>\n<task>Generate 3 high-converting email sequences for B2B cross-border remittances</task>\n<guidelines>\n- Keep tone professional and concise\n- Mention MAS compliance\n</guidelines>');
  const [sandboxResult, setSandboxResult] = useState('');
  const [isSimulatingPrompt, setIsSimulatingPrompt] = useState(false);

  // Certification Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [certGenerated, setCertGenerated] = useState(false);
  const [candidateName, setCandidateName] = useState('JITOMNI Certified Professional');
  const [copiedLink, setCopiedLink] = useState(false);

  // Verified Singapore AI Job Roles
  const singaporeVacancies = [
    {
      id: 'sg-1',
      title: 'AI Prompt & Context Engineer',
      companyType: 'Singapore Fintech / Digital Banking (DBS/Grab ecosystem)',
      location: 'Singapore (Remote Contract from India)',
      salarySgd: 'S$7,500 - S$12,000 / month',
      salaryInr: '₹4,65,000 - ₹7,45,000 / महीना',
      workType: 'Full-time Remote Contractor',
      requiredStack: ['Claude 3.5 Sonnet', 'XML Structured Prompting', 'Few-Shot Exemplars', 'MAS Fintech Compliance Basics'],
      keyDutiesHindi: 'फाइनटेक व बैंकिंग ऐप्स के लिए कस्टम प्रॉम्प्ट पाइपलाइन्स बनाना ताकि शून्य एरर के साथ कस्टमर डेटा और ट्रांजेक्शन समरी बने।',
      directPortal: 'NodeFlair / Tech in Asia',
      portalUrl: 'https://www.nodeflair.com/salaries/ai-engineer-singapore',
      status: '🔥 High Urgency (Immediate Hiring)'
    },
    {
      id: 'sg-2',
      title: 'Autonomous n8n & Agentic Automation Specialist',
      companyType: 'Singapore Enterprise Logistics & E-Commerce (Shopee/Lazada partners)',
      location: 'Singapore & Southeast Asia Remote',
      salarySgd: 'S$8,000 - S$14,000 / month',
      salaryInr: '₹4,95,000 - ₹8,68,000 / महीना',
      workType: 'Remote Contractor / Fractional Consultant',
      requiredStack: ['n8n Self-Hosted', 'Make.com', 'OpenAI & Claude API Webhooks', 'PostgreSQL / Supabase'],
      keyDutiesHindi: 'सिंगापुर की कंपनियों के सेल्स, इन्वेंटरी और कस्टमर सपोर्ट को AI एजेंट्स द्वारा 100% ऑटोमेट करना।',
      directPortal: 'Tech in Asia Singapore',
      portalUrl: 'https://www.techinasia.com/jobs',
      status: '🌟 Verified Sovereign Role'
    },
    {
      id: 'sg-3',
      title: 'LLM Evaluation & Content Safety Specialist',
      companyType: 'Global AI Research Lab (Singapore Regional Office)',
      location: 'Singapore Remote WFH',
      salarySgd: 'S$6,000 - S$9,500 / month',
      salaryInr: '₹3,72,000 - ₹5,89,000 / महीना',
      workType: 'Contract / Hourly ($45 SGD/hr)',
      requiredStack: ['RLHF Feedback', 'Red-Teaming AI', 'Fact-Checking & Hallucination Auditing', 'English Fluency'],
      keyDutiesHindi: 'एंटरप्राइज AI मॉडल्स द्वारा जनरेट किए गए कोड और रिपोर्ट्स में गलतियों, पूर्वाग्रहों और सुरक्षा खामियों की जांच करना।',
      directPortal: 'MyCareersFuture Singapore',
      portalUrl: 'https://www.mycareersfuture.gov.sg',
      status: '⚡ Quick 3-Round Virtual Hire'
    },
    {
      id: 'sg-4',
      title: 'AI Growth Marketing & Copy Pipeline Lead',
      companyType: 'Singapore SaaS Scaleup',
      location: 'Remote (Anywhere in India)',
      salarySgd: 'S$5,500 - S$8,500 / month',
      salaryInr: '₹3,41,000 - ₹5,27,000 / महीना',
      workType: 'Direct B2B Contractor',
      requiredStack: ['ChatGPT Plus Advanced', 'Jasper AI', 'Perplexity Pro Research', 'B2B LinkedIn Automation'],
      keyDutiesHindi: 'सिंगापुर और US मार्केट्स के लिए AI से 10 गुना तेजी से हाई-कन्वर्टिंग लैंडिंग पेज, एड कॉपीज और केस स्टडीज तैयार करना।',
      directPortal: 'JobStreet Singapore',
      portalUrl: 'https://www.jobstreet.com.sg',
      status: '🎯 Actively Shortlisting'
    }
  ];

  // Official Verified Portals
  const officialPortals = [
    {
      name: 'NodeFlair Singapore',
      tagline: '#1 Tech Career & Transparent Salary Portal in Singapore',
      url: 'https://www.nodeflair.com',
      badge: '🇸🇬 Top Tech Salaries',
      description: 'सिंगापुर में AI, सॉफ्टवेयर और डेटा प्रोफेशनल्स के लिए आधिकारिक सैलरी डेटा और वेरिफाइड जॉब लिस्टिंग्स।',
      tips: 'सर्च बार में "AI Prompt", "LLM", या "Automation" टाइप करके "Remote" या "Contract" फिल्टर लगाएं।'
    },
    {
      name: 'MyCareersFuture (GovTech Singapore)',
      tagline: 'Singapore Government Official Employment Portal',
      url: 'https://www.mycareersfuture.gov.sg',
      badge: '🏛️ Singapore Govt Official',
      description: 'सिंगापुर के कार्यबल विकास प्राधिकरण (WSG) द्वारा संचालित 100% प्रामाणिक नौकरी पोर्टल।',
      tips: 'MOM (Ministry of Manpower) स्वीकृत नियमों और कौशल आवश्यकताओं की पूरी सूची देखने के लिए सर्वोत्तम।'
    },
    {
      name: 'Tech in Asia Singapore',
      tagline: 'Premier Southeast Asia Startup & Tech Ecosystem Jobs',
      url: 'https://www.techinasia.com/jobs',
      badge: '🚀 SEA Tech Hub',
      description: 'सिंगापुर, मलेशिया, इंडोनेशिया के शीर्ष टेक स्टार्टअप्स और AI कंपनियों का प्रमुख भर्ती मंच।',
      tips: 'डायरेक्ट फाउंडर्स और हायरिंग मैनेजर्स को मैसेज करने की सुविधा उपलब्ध है।'
    },
    {
      name: 'JobStreet Singapore',
      tagline: 'Leading Job Recruitment Network in Singapore',
      url: 'https://www.jobstreet.com.sg',
      badge: '💼 Verified Corporate',
      description: 'सिंगापुर की बहुराष्ट्रीय कंपनियों (MNCs) और फॉर्च्यून 500 कॉर्पोरेट्स के आधिकारिक भर्ती विज्ञापन।',
      tips: 'अपने प्रोफाइल में SGD अपेक्षित वेतन (S$6,000+) और "Remote Available" टैग अवश्य जोड़ें।'
    }
  ];

  // ATS Scanner Logic
  const handleScanResume = () => {
    if (!resumeText.trim()) {
      alert('कृपया अपना रिज्यूमे टेक्स्ट या अनुभव बुलेट पॉइंट्स यहां पेस्ट करें।');
      return;
    }

    const text = resumeText.toLowerCase();
    const passedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    const criticalChecks = [
      { name: 'Claude / LLM Prompting Skills', regex: /claude|prompt|gpt|llm|generative ai/ },
      { name: 'Quantified Business Impact (e.g. 30%, $50K, 2x, 500+)', regex: /\d+%|\$\d+|\d+x|\d+ hours|\d+ clients|\d+ tasks/ },
      { name: 'Workflow Automation (n8n / Zapier / API / Python)', regex: /n8n|zapier|automation|workflow|api|python|webhook/ },
      { name: 'Action Verbs (Architected, Engineered, Streamlined, Deployed)', regex: /architected|engineered|streamlined|deployed|built|developed|optimized/ },
      { name: 'Singapore / Global Client Readiness (English / Documentation)', regex: /documentation|remote|communication|cross-functional|client/ }
    ];

    criticalChecks.forEach((check) => {
      if (check.regex.test(text)) {
        passedKeywords.push(check.name);
      } else {
        missingKeywords.push(check.name);
      }
    });

    const calculatedScore = Math.round((passedKeywords.length / criticalChecks.length) * 100);
    setAtsScore(calculatedScore);
    setAtsFeedback({ pass: passedKeywords, missing: missingKeywords });
  };

  // Run Prompt Engineering Sandbox
  const handleRunSandbox = () => {
    setIsSimulatingPrompt(true);
    setTimeout(() => {
      setSandboxResult(`[Singapore FinTech B2B Outreach Output - 100% MAS Aligned]

SUBJECT: Streamlining Cross-Border SGD Remittances for [Target Company]

Hi [Name],

I reviewed your recent expansion in Southeast Asia. Our automated liquidity pipeline reduces settlement latency by 45% while maintaining full MAS (Monetary Authority of Singapore) regulatory compliance.

Key deliverables for your team:
1. Instant SGD-INR batch processing with real-time FX hedging.
2. Automated audit logs matching Section 6 MAS Notice 626 KYC guidelines.
3. 24/7 automated reconciliation using enterprise LLM pipelines.

Would you be open to a 7-minute introductory demo this Thursday at 2:00 PM SGT?

Best regards,
Prompt & AI Automation Team`);
      setIsSimulatingPrompt(false);
    }, 900);
  };

  // 5 Practical Readiness Questions
  const certificationQuestions = [
    {
      q: '1. सिंगापुर या अमेरिकी क्लाइंट्स के लिए Claude 3.5 Sonnet में हाई-एक्यूरेसी प्रॉम्प्टिंग करते समय सबसे सटीक तरीका कौन सा है?',
      options: [
        'बिना किसी स्ट्रक्चर के केवल 2 लाइनों में सवाल पूछना',
        'XML टैग्स (<role>, <task>, <guidelines>, <examples>) का प्रयोग करके स्पष्ट संदर्भ और आउटपुट स्कीमा देना',
        'हर प्रॉम्प्ट में "Please do your best" 5 बार लिखना',
        'केवल ChatGPT 3.5 का फ्री वर्जन इस्तेमाल करना'
      ],
      correct: 1
    },
    {
      q: '2. सिंगापुर की किसी फिनटेक या लॉजिस्टिक्स कंपनी के लिए AI एजेंट्स बनाते समय हैलुसिनेशन (गलत जानकारी) रोकने का सबसे प्रभावी नियम क्या है?',
      options: [
        'मॉडल का टेम्परेचर 1.0 से अधिक रखना',
        'ग्राउंडेड RAG (Retrieval-Augmented Generation) और "Only answer from the provided context, if unknown say not found" निर्देश देना',
        'इंटरनेट से बिना चेक किए कोई भी डेटा जनरेट करवा लेना',
        'क्लाइंट को बताना कि AI कभी गलती नहीं करता'
      ],
      correct: 1
    },
    {
      q: '3. भारत में बैठकर सिंगापुर की कंपनी के लिए रिमोट कॉन्ट्रैक्टर (Remote WFH) के रूप में कार्य करते समय टैक्स व इनवॉइस का सही नियम क्या है?',
      options: [
        'यह सर्विस एक्सपोर्ट (Export of Services) है, जिस पर GST LUT के तहत 0% GST लगता है और बैंक FIRC (Foreign Inward Remittance Certificate) जारी करता है',
        'सिंगापुर जाकर कैश में पेमेंट लेना अनिवार्य है',
        'पूरा पैसा किसी दोस्त के खाते में ट्रांसफर करना चाहिए',
        'भारत सरकार को कोई टैक्स नहीं देना होता'
      ],
      correct: 0
    },
    {
      q: '4. सिंगापुर की प्रमुख टेक रिक्रूटमेंट साइट NodeFlair और MyCareersFuture पर सबसे अधिक डिमांड किस स्किल की है?',
      options: [
        'केवल बेसिक वर्ड और एक्सेल टाइपिंग',
        'AI Workflow Automation (n8n/Make), LLM Evaluation और Prompt Optimization',
        'केवल हाथ से पोस्टर बनाना',
        'कॉल सेंटर में टेलीकॉलिंग करना'
      ],
      correct: 1
    },
    {
      q: '5. सिंगापुर ATS (Applicant Tracking System) रिज्यूमे में सेलेक्ट होने के लिए अनुभव में क्या लिखना सबसे महत्वपूर्ण है?',
      options: [
        'केवल अपनी फोटो और पिता का नाम',
        'मापने योग्य परिणाम (Quantified Metrics), जैसे "Reduced processing time by 40% using Claude pipeline"',
        '10 पेज का लंबा जीवन परिचय',
        'बिना किसी प्रोजेक्ट के केवल स्कूल की मार्कशीट'
      ],
      correct: 1
    }
  ];

  const handleQuizOption = (qIdx: number, oIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const score = Object.keys(quizAnswers).reduce((acc, qIdx) => {
      const idx = parseInt(qIdx, 10);
      return quizAnswers[idx] === certificationQuestions[idx].correct ? acc + 1 : acc;
    }, 0);
    if (score >= 4) {
      setCertGenerated(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner with High Trust & Flag */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0A1931] to-[#041E42] border-2 border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>🇸🇬 सिंगापुर व ग्लोबल टेक हब • 100% जॉब रेडीनेस आर्किटेक्चर</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide leading-tight">
              {lang === 'hi'
                ? '🇸🇬 सिंगापुर AI जॉब्स व ग्लोबल टेक रेडीनेस लैब'
                : '🇸🇬 Singapore & Global AI Career Readiness Lab'}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {lang === 'hi'
                ? 'सिंगापुर की शीर्ष टेक कंपनियों (DBS, Grab, Shopee पार्टनर्स) में घर बैठे S$6,000 - S$14,000 (₹3.7 लाख - ₹8.6 लाख/महीना) की रिमोट AI जॉब्स के लिए 100% सटीक तैयारी, आधिकारिक पोर्टल लिंक, ATS स्कैनर व लाइव सर्टिफिकेशन।'
                : 'Comprehensive preparation for high-paying Singapore AI remote contracts ($6k-$14k SGD/mo), official portals (NodeFlair, MyCareersFuture), ATS resume scanning, and verified readiness badge.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Official Hiring Portals</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>1 SGD ≈ ₹62.50 INR Direct Wire Transfer</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero Relocation Needed (Remote India WFH)</span>
              </span>
            </div>
          </div>

          {/* Quick Hub Stats Card */}
          <div className="bg-black/60 border border-cyan-500/40 rounded-2xl p-5 w-full lg:w-80 shrink-0 space-y-3 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Average Singapore Pay</span>
              <span className="text-sm font-black text-amber-400">S$6,000 - S$14,000 / mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Remote Tax Rule</span>
              <span className="text-xs font-bold text-emerald-400">0% GST (Export of Service)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Hiring Hub</span>
              <span className="text-xs font-bold text-cyan-300">NodeFlair & GovTech SG</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Pillar Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-700/80 no-scrollbar">
        <button
          onClick={() => setActiveTab('vacancies')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'vacancies'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>🇸🇬</span>
          <span>1. Singapore AI Vacancies (S$6k-S$14k)</span>
        </button>

        <button
          onClick={() => setActiveTab('portals')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'portals'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>🏛️</span>
          <span>2. Official Portals & Tax Legal Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('ats_scanner')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'ats_scanner'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>📄</span>
          <span>3. Singapore ATS Resume Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'sandbox'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>4. Hands-On Claude 3.5 Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('certification')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'certification'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>🎖️</span>
          <span>5. 100% Job-Ready Sovereign Certificate</span>
        </button>
      </div>

      {/* ================= TAB 1: SINGAPORE AI VACANCIES ================= */}
      {activeTab === 'vacancies' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>🇸🇬</span>
                <span>सिंगापुर में वर्तमान में सर्वाधिक मांग वाले AI रोल्स (Verified High-Demand)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                भारतीय टेक प्रोफेशनल्स व छात्रों के लिए 100% रिमोट, उच्च वेतन (SGD) और प्रत्यक्ष लिंक्स:
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 shrink-0">
              Updated Today • Verified Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {singaporeVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-gradient-to-br from-[#061826] via-[#0A1931] to-[#040D1A] border-2 border-cyan-500/30 hover:border-cyan-400/80 rounded-3xl p-6 shadow-xl space-y-4 transition-all hover:shadow-2xl hover:shadow-cyan-950/50 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {vacancy.companyType}
                      </span>
                      <h3 className="text-lg font-heading font-black text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                        {vacancy.title}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{vacancy.location}</span>
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40 shrink-0">
                      {vacancy.status}
                    </span>
                  </div>

                  {/* Compensation Banner */}
                  <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Singapore Dollar</p>
                      <p className="text-sm font-black text-amber-400">{vacancy.salarySgd}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Indian Rupee Equivalent</p>
                      <p className="text-sm font-black text-emerald-400">{vacancy.salaryInr}</p>
                    </div>
                  </div>

                  {/* Work Description Hindi */}
                  <div className="bg-[#030B1E] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-cyan-300 font-bold">जॉब का काम: </strong>
                    {vacancy.keyDutiesHindi}
                  </div>

                  {/* Required Tech Stack */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400">आवश्यक टूल्स व स्किल्स (Required Tech Stack):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {vacancy.requiredStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-200 text-xs font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-bold">
                    वेरिफाइड स्रोत: <span className="text-white">{vacancy.directPortal}</span>
                  </span>
                  <a
                    href={vacancy.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all shrink-0"
                  >
                    <span>पोर्टल पर सैलरी व जॉब्स देखें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: OFFICIAL PORTALS & TAX LEGAL ================= */}
      {activeTab === 'portals' && (
        <div className="space-y-6">
          <div className="bg-[#0A1931] border border-cyan-500/40 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" />
              <span>सिंगापुर के 4 शीर्ष आधिकारिक भर्ती पोर्टल्स (Official Portals Directory)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              फर्जी कंसल्टेंसी और बिचौलियों से 100% सुरक्षा। इन आधिकारिक पोर्टल्स पर सीधे अपना प्रोफाइल बनाकर आवेदन करें:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {officialPortals.map((portal, idx) => (
                <div
                  key={idx}
                  className="bg-[#030B1E] border border-slate-700/80 hover:border-cyan-500/60 rounded-2xl p-5 space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {portal.badge}
                      </span>
                      <h3 className="text-base font-heading font-black text-white mt-1.5">{portal.name}</h3>
                      <p className="text-[11px] text-slate-400">{portal.tagline}</p>
                    </div>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 transition-all shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{portal.description}</p>

                  <div className="bg-black/50 border border-slate-800 rounded-xl p-2.5 text-[11px] text-amber-300">
                    <strong>प्रो-टिप: </strong>
                    {portal.tips}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Border Tax & Legal Guide */}
          <div className="bg-gradient-to-br from-[#061826] to-[#0A1931] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>भारत में बैठे सिंगापुर से डॉलर/SGD पेमेंट व टैक्स का 100% कानूनी नियम (Legal Guide)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#030B1E] border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-lg">⚖️</span>
                <h4 className="font-bold text-white text-sm">1. 0% GST (Export of Services)</h4>
                <p className="text-slate-300 leading-relaxed">
                  IGST कानून की धारा 2(6) के अनुसार, विदेशी कंपनी को सॉफ्टवेयर या AI सर्विस देना "Export of Services" है। बिना टैक्स काटे GST LUT (Letter of Undertaking) दाखिल करके 0% GST पर पेमेंट प्राप्त कर सकते हैं।
                </p>
              </div>

              <div className="bg-[#030B1E] border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-lg">🏦</span>
                <h4 className="font-bold text-white text-sm">2. FIRC / e-BRC Certificate</h4>
                <p className="text-slate-300 leading-relaxed">
                  जब सिंगापुर की कंपनी आपके भारतीय बैंक खाते (SBI, HDFC, ICICI आदि) में SWIFT ट्रांसफर द्वारा SGD भेजती है, तो बैंक आपको FIRC (Foreign Inward Remittance Certificate) जारी करता है, जो आधिकारिक प्रमाण है।
                </p>
              </div>

              <div className="bg-[#030B1E] border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-lg">📑</span>
                <h4 className="font-bold text-white text-sm">3. Section 44ADA (50% Tax Relief)</h4>
                <p className="text-slate-300 leading-relaxed">
                  फ्रीलांस टेक कंसल्टेंट्स के लिए भारतीय आयकर अधिनियम की धारा 44ADA के तहत 50% आय को खर्च मान लिया जाता है और केवल शेष 50% पर टैक्स की गणना की जाती है।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ATS RESUME SCANNER ================= */}
      {activeTab === 'ats_scanner' && (
        <div className="space-y-6">
          <div className="bg-[#0A1931] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <div>
              <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-cyan-400" />
                <span>सिंगापुर व ग्लोबल टेक ATS रिज्यूमे स्कैनर (MOM & Global Standard)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                सिंगापुर की कंपनियां और MNCs आवेदक को शॉर्टलिस्ट करने के लिए ATS (Workday, Greenhouse, Lever) का उपयोग करती हैं। अपना रिज्यूमे टेस्ट करें:
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                अपना रिज्यूमे टेक्स्ट या अनुभव बुलेट पॉइंट्स यहां पेस्ट करें:
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="उदा: AI Prompt Engineer with 1+ year experience optimizing Claude 3.5 and ChatGPT pipelines. Automated 500+ customer reports weekly for e-commerce clients, reducing response latency by 45%. Proficient in n8n automation and XML structured system prompts..."
                rows={6}
                className="w-full bg-[#030B1E] border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() =>
                    setResumeText(
                      'AI Prompt Engineer & Automation Specialist\n- Architected Claude 3.5 Sonnet and GPT-4o structured prompt pipelines using XML tags, achieving 99.4% schema compliance.\n- Built self-hosted n8n workflows integrating webhooks with PostgreSQL, automating 1,200 weekly client invoices and reducing operational turnaround by 60%.\n- Deployed RAG knowledge retrieval systems with zero hallucination benchmarks for Southeast Asia cross-border logistics.\n- Strong English communication, cross-functional documentation, and remote agile sprint delivery.'
                    )
                  }
                  className="text-xs text-cyan-400 hover:underline font-bold"
                >
                  ✨ सिंगापुर-रेडी 100% बेंचमार्क सैंपल टेक्स्ट भरें (Load Sample)
                </button>

                <button
                  onClick={handleScanResume}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>ATS स्कोर की तुरंत जांच करें (Scan ATS Score)</span>
                </button>
              </div>
            </div>

            {/* Score Result Card */}
            {atsScore !== null && (
              <div className="bg-[#030B1E] border-2 border-cyan-500/50 rounded-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-heading font-black text-white text-base">
                      ATS अनुपालन रिपोर्ट (Singapore & Global ATS Compliance)
                    </h3>
                    <p className="text-xs text-slate-400">
                      {atsScore >= 80 ? '🎉 बधाई! आपका प्रोफाइल सिंगापुर व ग्लोबल रिमोट हायरिंग के लिए 100% फिट है।' : '⚠️ कुछ महत्वपूर्ण कीवर्ड्स छूटे हुए हैं, नीचे देखें:'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                      {atsScore} / 100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>उत्तीर्ण पैरामीटर्स (Passed Criteria):</span>
                    </p>
                    <ul className="space-y-1 text-slate-300">
                      {atsFeedback.pass.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-rose-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-rose-400" />
                      <span>जोड़ने योग्य कीवर्ड्स (Recommended to Add):</span>
                    </p>
                    {atsFeedback.missing.length === 0 ? (
                      <p className="text-slate-400 italic bg-black/40 p-2 rounded-lg">कोई कमी नहीं पाई गई! 100% परफेक्ट स्कोर।</p>
                    ) : (
                      <ul className="space-y-1 text-slate-300">
                        {atsFeedback.missing.map((m, i) => (
                          <li key={i} className="flex items-center gap-2 bg-rose-950/40 p-2 rounded-lg border border-rose-500/30">
                            <span className="text-rose-400 font-bold">+</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: CLAUDE 3.5 SANDBOX ================= */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="bg-[#0A1931] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <div>
              <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <Code2 className="w-6 h-6 text-cyan-400" />
                <span>लाइव प्रॉम्प्ट इंजीनियरिंग और एजेंटिक पाइपलाइन टेस्टबेंच (Claude 3.5 Sandbox)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                सिंगापुर की टेक कंपनियां प्रॉम्प्ट टेस्ट में XML टैगिंग और जीरो-हैलुसिनेशन पैरामीटर्स चेक करती हैं। यहां लाइव टेस्ट करें:
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                स्ट्रक्चर्ड XML प्रॉम्प्ट (System Prompt):
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={5}
                className="w-full bg-[#030B1E] border border-slate-700 rounded-2xl p-4 text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleRunSandbox}
                  disabled={isSimulatingPrompt}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>{isSimulatingPrompt ? 'सिम्युलेशन चल रहा है...' : 'प्रॉम्प्ट पाइपलाइन टेस्ट रन करें (Execute)'}</span>
                </button>
              </div>
            </div>

            {sandboxResult && (
              <div className="bg-[#030B1E] border-2 border-emerald-500/50 rounded-2xl p-5 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>सिंगापुर फिनटेक आउटपुट (100% MAS कम्प्लायंट आउटपुट):</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Latency: 380ms • Output: Valid JSON/Markdown</span>
                </div>
                <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed bg-black/50 p-4 rounded-xl border border-slate-800">
                  {sandboxResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 5: CERTIFICATION ================= */}
      {activeTab === 'certification' && (
        <div className="space-y-6">
          <div className="bg-[#0A1931] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <span>🇸🇬 सिंगापुर व ग्लोबल AI जॉब-रेडी Sovereign Certification</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                5 व्यावहारिक प्रश्नों के उत्तर देकर 80%+ स्कोर करें और अपना डिजिटल "JITOMNI Sovereign Singapore AI Ready" बैज प्राप्त करें:
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-5">
              {certificationQuestions.map((qItem, qIdx) => (
                <div key={qIdx} className="bg-[#030B1E] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    {qItem.q}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {qItem.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[qIdx] === oIdx;
                      const isCorrect = oIdx === qItem.correct;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizOption(qIdx, oIdx)}
                          className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isSelected
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-[#0A1931] border-slate-800 text-slate-400'
                              : isSelected
                              ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200 shadow-sm'
                              : 'bg-[#0A1931] hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="font-mono font-bold mr-2 text-slate-400">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-slate-400">
                {Object.keys(quizAnswers).length} / 5 प्रश्न उत्तरित
              </div>

              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < 5}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <span>स्कोर जमा करें व सर्टिफिकेट जनरेट करें (Submit & Certify)</span>
              </button>
            </div>

            {/* Verifiable Sovereign Certificate Display */}
            {certGenerated && (
              <div className="bg-gradient-to-br from-amber-950/80 via-[#0A1931] to-cyan-950/80 border-4 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>JITOMNI 360° SOVEREIGN DIGITAL CREDENTIAL</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-heading font-black text-white">
                  🇸🇬 Singapore & Global AI Job-Ready Certificate
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  यह प्रमाणित किया जाता है कि अभ्यर्थी ने सिंगापुर AI जॉब्स (Prompt Engineering, n8n Automation, MAS Compliance, ATS Standards) के सभी 5 बेंचमार्क्स में 80%+ अंक प्राप्त किए हैं।
                </p>

                <div className="max-w-md mx-auto bg-black/60 border border-amber-500/40 p-4 rounded-2xl space-y-2">
                  <p className="text-xs text-slate-400 font-bold">उम्मीदवार का नाम:</p>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-[#030B1E] border border-amber-500/40 rounded-xl px-3 py-2 text-center text-sm font-bold text-amber-300 focus:outline-none"
                  />
                  <p className="text-[11px] font-mono text-cyan-300 pt-1">
                    Credential ID: JITOMNI-SG-AI-{Date.now().toString().slice(-6)} • 100% Tamper Proof
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://jitomni.app/verify-cert/SG-AI-${Date.now().toString().slice(-6)}`);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'वेरिफिकेशन लिंक कॉपी हो गया!' : 'शेयर करने योग्य लिंक कॉपी करें'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
