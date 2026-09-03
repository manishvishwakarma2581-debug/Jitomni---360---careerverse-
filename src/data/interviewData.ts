import { AIInterviewQuestion, AIInterviewGapAnalysis } from '../types';

export interface CompanyInterviewProfile {
  id: string;
  companyName: string;
  roleName: string;
  department: string;
  experienceRequired: string;
  salaryPackage: string;
  companyLogoText: string;
  companyColor: string;
  interviewDurationMin: number;
  totalQuestionsCount: number;
  minPassingScore: number; // e.g. 75%
  interviewerName: string;
  interviewerRole: string;
  interviewerAvatar: string;
  keyEvaluationFocus: string[];
  questions: AIInterviewQuestion[];
}

export const highProfileInterviewPresets: CompanyInterviewProfile[] = [
  {
    id: 'int-tech-lead',
    companyName: 'Tata Consultancy & Digital Logistics',
    roleName: 'Senior Software Tech Lead & Cloud Architect',
    department: 'Enterprise Engineering',
    experienceRequired: '3-7 Years',
    salaryPackage: '₹14,00,000 - ₹24,00,000 / Year',
    companyLogoText: 'TATA',
    companyColor: 'from-blue-600 to-indigo-800',
    interviewDurationMin: 15,
    totalQuestionsCount: 5,
    minPassingScore: 75,
    interviewerName: 'Dr. Avantika Sharma',
    interviewerRole: 'Chief AI Technical Assessor (Tata Digital)',
    interviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    keyEvaluationFocus: [
      'सिस्टम डिजाइन व स्केलेबिलिटी समझ',
      'क्राइसिस व सर्वर आउटेज में धैर्य व डिसीजन मेकिंग',
      'टीम लीडरशिप, आई कॉन्टैक्ट व बॉडी लैंग्वेज',
      'कॉम्प्लेक्स टेक्निकल विचारों का स्पष्ट संवाद'
    ],
    questions: [
      {
        id: 'tl-q1',
        category: 'introduction',
        question: 'Please introduce yourself, walk us through a high-impact engineering system you architected, and what defines your leadership philosophy under pressure.',
        hindiPrompt: 'कृपया अपना संक्षिप्त परिचय दें, अपने द्वारा बनाए गए किसी बड़े सॉफ्टवेयर सिस्टम के बारे में बताएं और टीम का नेतृत्व करते समय आपकी क्या फिलॉसफी रहती है?',
        tips: [
          'सीधे कैमरे में देखें और स्थिर चेहरे के भाव बनाए रखें (Eye Contact ~80%+)।',
          'STAR (Situation, Task, Action, Result) फॉर्मेट का प्रयोग करें।',
          'व्यर्थ के फिलर वर्ड्स (Um, Ah, Like) से बचें।'
        ],
        expectedKeywords: ['architecture', 'scalability', 'team leadership', 'resilience', 'impact', 'metrics', 'reliability'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 20,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 30
        }
      },
      {
        id: 'tl-q2',
        category: 'technical',
        question: 'Suppose your production microservices database latency suddenly spikes by 400% during peak Diwali traffic. How do you systematically debug, isolate bottlenecks, and prevent cascading failure?',
        hindiPrompt: 'मान लीजिए पीक ट्रैफिक के दौरान डेटाबेस लेटेंसी 400% बढ़ जाती है और सिस्टम क्रैश होने की कगार पर है। आप इसे कैसे डायग्नोस और फिक्स करेंगे?',
        situationalScenario: 'Production High-Severity Outage (P0)',
        tips: [
          'घबराएं नहीं, शांत और निर्णायक आवाज में बोलें।',
          'स्टेप-बाय-स्टेप लॉग एनालिसिस, कनेक्शन पूलिंग, रीड रेप्लिका और सर्किट ब्रेकर का जिक्र करें।'
        ],
        expectedKeywords: ['profiling', 'read replica', 'circuit breaker', 'caching', 'connection pooling', 'slow query logs', 'rollback'],
        evaluationCriteria: {
          communicationWeight: 20,
          hardSituationWeight: 30,
          expressionBodyLanguageWeight: 20,
          technicalUnderstandingWeight: 30
        }
      },
      {
        id: 'tl-q3',
        category: 'situational_crisis',
        question: 'Your project deadline is 48 hours away, but two senior developers have a severe disagreement on code architecture and refuse to cooperate. As the Tech Lead, how do you resolve this immediate crisis without missing the client launch?',
        hindiPrompt: 'क्लाइंट डिलीवरी में सिर्फ 48 घंटे बचे हैं और दो सीनियर डेवलपर्स आर्किटेक्चर को लेकर आपस में भिड़ गए हैं। आप इस क्राइसिस को तुरंत कैसे संभालेंगे?',
        situationalScenario: 'Team Conflict Under Deadline Pressure',
        tips: [
          'सहानुभूतिपूर्ण लेकिन फर्म बॉडी लैंग्वेज रखें।',
          'ईगो हटाने, डेटा-ड्रिवन कॉम्प्रोमाइज और डिलीवरी फोकस पर जोर दें।'
        ],
        expectedKeywords: ['objective decision', 'pragmatism', 'de-escalation', 'data driven', 'fallback plan', 'client alignment'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 35,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 15
        }
      },
      {
        id: 'tl-q4',
        category: 'body_language_behavioral',
        question: 'How do you explain an unavoidable technical debt or security vulnerability to non-technical C-suite executives who only care about business revenue?',
        hindiPrompt: 'गैर-तकनीकी कंपनी डायरेक्टर (C-Suite) को आप टेक्निकल रिस्क व सिक्योरिटी खतरे को बिजनेस भाषा में कैसे समझाएंगे ताकि वे बजट दें?',
        tips: [
          'सीधे सरल उदाहरण दें, तकनीकी जार्गन का प्रयोग कम करें।',
          'हाथों के नेचुरल जेस्चर का प्रयोग करके आत्मविश्वास दर्शाएं।'
        ],
        expectedKeywords: ['business risk', 'roi', 'brand reputation', 'revenue loss prevention', 'compliance', 'structured timeline'],
        evaluationCriteria: {
          communicationWeight: 35,
          hardSituationWeight: 25,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 15
        }
      },
      {
        id: 'tl-q5',
        category: 'leadership_culture',
        question: 'Tell us about a time you made a wrong architectural or hiring choice. What was the fallout, what did you learn, and how did you rectify it?',
        hindiPrompt: 'अपने करियर के किसी ऐसे फैसले के बारे में बताएं जो गलत साबित हुआ हो। आपने उस गलती को कैसे स्वीकारा और ठीक किया?',
        tips: [
          'सच्चाई और ईमानदारी से बोलें; यह आपकी मैच्योरिटी दिखाता है।',
          'ब्लेम गेम न करें, आत्मनिरीक्षण और सुधार पर फोकस करें।'
        ],
        expectedKeywords: ['accountability', 'post-mortem', 'ownership', 'corrective measure', 'learning mindset'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 30,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 20
        }
      }
    ]
  },
  {
    id: 'int-finance-lead',
    companyName: 'Mahakal Accounts & Fintech Solutions',
    roleName: 'Senior Financial Controller & Risk Analyst',
    department: 'Finance & Regulatory Compliance',
    experienceRequired: '2-5 Years',
    salaryPackage: '₹9,00,000 - ₹16,00,000 / Year',
    companyLogoText: 'MAHAKAL',
    companyColor: 'from-amber-600 to-emerald-800',
    interviewDurationMin: 15,
    totalQuestionsCount: 5,
    minPassingScore: 70,
    interviewerName: 'CA Rajeshwar Iyer',
    interviewerRole: 'Chief Financial Partner & Audit Head',
    interviewerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    keyEvaluationFocus: [
      'टैक्सेशन, GST स्क्रूटनी व ऑडिट मेंटल मॉडल्स',
      'कैश-फ्लो संकट व फ्रॉड डिटेक्शन में त्वरित निर्णय',
      'कॉन्फिडेंट बॉडी पोस्चर व वित्तीय सटीकता',
      'स्टेकहोल्डर्स को वित्तीय जोखिम समझाने की क्षमता'
    ],
    questions: [
      {
        id: 'fin-q1',
        category: 'introduction',
        question: 'Introduce your financial background and explain the most complex corporate GST or balance sheet reconciliation you have personally executed.',
        hindiPrompt: 'कृपया अपने वित्तीय अनुभव का परिचय दें और बताएं कि आपने सबसे जटिल जीएसटी या बैलेंस शीट रिकंसीलिएशन कैसे पूरा किया था?',
        tips: ['अपनी टोन को शांत और पेशेवर रखें।', 'विशिष्ट नंबर्स और अनुपालन समयसीमा का उल्लेख करें।'],
        expectedKeywords: ['gstr-9', 'input tax credit', 'reconciliation', 'variance analysis', 'internal audit'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 20,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 30
        }
      },
      {
        id: 'fin-q2',
        category: 'situational_crisis',
        question: 'During a surprise tax scrutiny or internal audit, you discover an unrecorded liability of ₹45 Lakhs due to a previous manager oversight. How do you handle this immediately without causing panic in the board?',
        hindiPrompt: 'अचानक ऑडिट में आपको पता चलता है कि ₹45 लाख की पुरानी देनदारी रिकॉर्ड में नहीं है। आप बोर्ड और टैक्स अधिकारियों के सामने इसे कैसे पेश करेंगे?',
        situationalScenario: 'Audit Discrepancy Crisis',
        tips: ['अखंडता (Integrity) और शांत मुद्रा बनाए रखें।', 'समाधान-उन्मुख रोडमैप प्रस्तुत करें।'],
        expectedKeywords: ['disclosure', 'rectification', 'provisioning', 'board memorandum', 'statutory compliance'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 35,
          expressionBodyLanguageWeight: 20,
          technicalUnderstandingWeight: 20
        }
      },
      {
        id: 'fin-q3',
        category: 'technical',
        question: 'When analyzing a company working capital cycle, if DSI (Days Sales of Inventory) and DSO (Days Sales Outstanding) are rising rapidly while DPO is falling, what is your diagnostic prognosis and emergency cash-flow plan?',
        hindiPrompt: 'यदि कंपनी का वर्किंग कैपिटल चक्र बिगड़ रहा है और कैश ब्लॉक हो रहा है, तो आपका इमरजेंसी कैश-फ्लो सुधार प्लान क्या होगा?',
        tips: ['तर्कसंगत और विश्लेषणात्मक दृष्टिकोण अपनाएं।'],
        expectedKeywords: ['liquidity squeeze', 'working capital', 'factoring', 'inventory rationalization', 'vendor terms'],
        evaluationCriteria: {
          communicationWeight: 20,
          hardSituationWeight: 25,
          expressionBodyLanguageWeight: 20,
          technicalUnderstandingWeight: 35
        }
      },
      {
        id: 'fin-q4',
        category: 'body_language_behavioral',
        question: 'A department head furiously approaches you arguing that their budget was unfairly slashed. How do you maintain composure and de-escalate the tension?',
        hindiPrompt: 'एक डिपार्टमेंट हेड गुस्से में आकर बजट कटौती पर बहस करता है। आप शांत रहकर स्थिति को कैसे संभालेंगे?',
        tips: ['आई कॉन्टैक्ट बनाए रखें, डिफेंसिव न हों, सहानुभूति से सुनें।'],
        expectedKeywords: ['active listening', 'calm tone', 'data evidence', 'collaborative compromise'],
        evaluationCriteria: {
          communicationWeight: 30,
          hardSituationWeight: 30,
          expressionBodyLanguageWeight: 30,
          technicalUnderstandingWeight: 10
        }
      },
      {
        id: 'fin-q5',
        category: 'leadership_culture',
        question: 'What ethical boundaries will you never cross for short-term corporate profitability?',
        hindiPrompt: 'शॉर्ट-टर्म प्रॉफिट के लिए कंपनी में आप किन नैतिक सीमाओं का कभी उल्लंघन नहीं करेंगे?',
        tips: ['दृढ़ता और नैतिकता के साथ उत्तर दें।'],
        expectedKeywords: ['fiduciary duty', 'ethics', 'compliance', 'long-term brand trust', 'transparency'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 25,
          expressionBodyLanguageWeight: 30,
          technicalUnderstandingWeight: 20
        }
      }
    ]
  },
  {
    id: 'int-product-manager',
    companyName: 'Sharma Tech & Software Labs',
    roleName: 'Lead Product & Operations Manager',
    department: 'Product Strategy & Growth',
    experienceRequired: '3-6 Years',
    salaryPackage: '₹12,00,000 - ₹20,00,000 / Year',
    companyLogoText: 'SHARMA',
    companyColor: 'from-purple-600 to-indigo-900',
    interviewDurationMin: 15,
    totalQuestionsCount: 5,
    minPassingScore: 72,
    interviewerName: 'Priya Mehra',
    interviewerRole: 'VP of Product & AI Strategy',
    interviewerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    keyEvaluationFocus: [
      'यूजर एम्पेथी व प्रोडक्ट विजन',
      'प्रायोरिटाइजेशन व डेटा-ड्रिवन डिसीजन',
      'कम्युनिकेशन स्पष्टता व स्टेकहोल्डर अलाइनमेंट',
      'फेलियर से रिकवरी और एजाइल माइंडसेट'
    ],
    questions: [
      {
        id: 'pm-q1',
        category: 'introduction',
        question: 'Walk us through your product management career and explain how you prioritize conflicting feature requests from Sales, Engineering, and End-Users.',
        hindiPrompt: 'अपने प्रोडक्ट मैनेजमेंट सफर के बारे में बताएं और समझाएं कि जब सेल्स, टेक टीम और यूजर्स अलग-अलग फीचर्स मांगें, तो आप किसे प्राथमिकता देते हैं?',
        tips: ['RICE या MoSCoW प्रायोरिटाइजेशन फ्रेमवर्क का संदर्भ दें।'],
        expectedKeywords: ['rice framework', 'business value', 'user feedback', 'roadmap', 'impact vs effort'],
        evaluationCriteria: {
          communicationWeight: 30,
          hardSituationWeight: 20,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 25
        }
      },
      {
        id: 'pm-q2',
        category: 'situational_crisis',
        question: 'A newly launched flagship feature causes user churn by 12% in the first 48 hours. How do you lead the war-room response, communicate with furious users, and turn the situation around?',
        hindiPrompt: 'नया फीचर लॉन्च होते ही 12% यूजर्स ऐप छोड़ रहे हैं। आप वॉर-रूम की लीडरशिप कैसे संभालेंगे और स्थिति को 24 घंटे में कैसे सुधारेंगे?',
        situationalScenario: 'Severe Post-Launch Churn Crisis',
        tips: ['शांत, विश्लेषणात्मक और एक्शन-ओरिएंटेड लहजे में जवाब दें।'],
        expectedKeywords: ['root cause analysis', 'telemetry metrics', 'feature flag rollback', 'user communication', 'hotfix'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 40,
          expressionBodyLanguageWeight: 20,
          technicalUnderstandingWeight: 15
        }
      },
      {
        id: 'pm-q3',
        category: 'technical',
        question: 'How do you structure an A/B test for onboarding funnel conversion? What statistical significance threshold do you demand before rolling out to 100% of users?',
        hindiPrompt: 'ऑनबोर्डिंग फनल में A/B टेस्टिंग कैसे डिजाइन करेंगे और निर्णय लेने के लिए कौन से मेट्रिक्स देखेंगे?',
        tips: ['कन्वर्जन रेट, P-वैल्यू, सैंपल साइज का उल्लेख करें।'],
        expectedKeywords: ['p-value', 'hypothesis', 'sample size', 'conversion funnel', 'guardrail metrics'],
        evaluationCriteria: {
          communicationWeight: 25,
          hardSituationWeight: 15,
          expressionBodyLanguageWeight: 20,
          technicalUnderstandingWeight: 40
        }
      },
      {
        id: 'pm-q4',
        category: 'body_language_behavioral',
        question: 'Demonstrate how you pitch an ambitious 6-month product roadmap to an investor or CEO in under 90 seconds.',
        hindiPrompt: 'कंपनी के सीईओ या इन्वेस्टर को सिर्फ 90 सेकंड में अपने अगले 6 महीने का प्रोडक्ट विजन पिच करके दिखाएं।',
        tips: ['ऊर्जावान, आत्मविश्वास से भरे और स्पष्ट बॉडी जेस्चर्स के साथ बोलें।'],
        expectedKeywords: ['vision', 'market opportunity', 'traction', 'key milestones', 'competitive moat'],
        evaluationCriteria: {
          communicationWeight: 40,
          hardSituationWeight: 20,
          expressionBodyLanguageWeight: 30,
          technicalUnderstandingWeight: 10
        }
      },
      {
        id: 'pm-q5',
        category: 'leadership_culture',
        question: 'When engineering says a critical feature is impossible within the deadline, how do you negotiate scope without burning out the team?',
        hindiPrompt: 'जब टेक टीम कहे कि तय समय में फीचर बनाना नामुमकिन है, तो आप टीम पर दबाव डाले बिना स्कोप को कैसे मैनेज करेंगे?',
        tips: ['MVP सोच और टीम के प्रति सम्मान प्रदर्शित करें।'],
        expectedKeywords: ['mvp', 'scope reduction', 'empathy', 'trade-offs', 'collaborative sprint planning'],
        evaluationCriteria: {
          communicationWeight: 30,
          hardSituationWeight: 30,
          expressionBodyLanguageWeight: 25,
          technicalUnderstandingWeight: 15
        }
      }
    ]
  }
];

export const prebuiltPracticalDrills = [
  {
    id: 'drill-star',
    title: 'STAR (Situation, Task, Action, Result) मास्टर क्लास ड्रिल',
    type: 'star_technique' as const,
    durationMinutes: 5,
    instructions: 'अपने उत्तर को 4 स्पष्ट हिस्सों में विभाजित करें: पहले स्थिति बताएं (15s), फिर चुनौती/टास्क (15s), आपका व्यक्तिगत एक्शन (40s), और मापने योग्य परिणाम (20s)।',
    exercisePrompt: 'अभ्यास प्रश्न: "जब आपके प्रोजेक्ट में अप्रत्याशित बाधा आई, तो आपने उसे हल कैसे किया?"'
  },
  {
    id: 'drill-eye-contact',
    title: 'आई-कॉन्टैक्ट व स्थिर भाव (Hav-Bhav) अभ्यास',
    type: 'eye_contact_posture' as const,
    durationMinutes: 3,
    instructions: 'लैपटॉप/मोबाइल के कैमरा लेंस की ओर 80%+ समय देखें। बोलते समय हल्की सकारात्मक मुस्कान और स्थिर कंधों की मुद्रा रखें।',
    exercisePrompt: 'अभ्यास प्रश्न: "कंपनी में सबसे बड़े अचीवमेंट का 60 सेकंड में विवरण दें।"'
  },
  {
    id: 'drill-filler-words',
    title: 'फिलर वर्ड रिडक्शन (Um/Ah Elimination) & 2-Sec पॉज ड्रिल',
    type: 'filler_reduction' as const,
    durationMinutes: 4,
    instructions: 'विचार करते समय "Um", "Like", "You Know" बोलने की बजाय 2 सेकंड का मौन (Strategic Pause) लें। यह बुद्धिमत्ता और आत्मविश्वास दर्शाता है।',
    exercisePrompt: 'अभ्यास प्रश्न: "अगले 3 वर्षों में आपका करियर विजन क्या है?"'
  },
  {
    id: 'drill-crisis-rehearsal',
    title: 'हाई-प्रेशर क्राइसिस सिचुएशन डी-एस्केलेशन ड्रिल',
    type: 'crisis_rehearsal' as const,
    durationMinutes: 5,
    instructions: 'मुश्किल सवालों पर घबराएं नहीं। पहले समस्या को स्वीकार करें, 3-सूत्रीय समाधान दें, और प्रिवेंटिव लॉन्ग-टर्म प्लान बताएं।',
    exercisePrompt: 'अभ्यास प्रश्न: "यदि आपके क्लाइंट ने खराब डिलीवरी पर कॉन्ट्रैक्ट कैंसल करने की धमकी दी, तो आप क्या करेंगे?"'
  }
];
