import { Language } from '../types';

export type CurrentAffairsCategory =
  | 'polity_governance'
  | 'economy_banking'
  | 'science_tech'
  | 'environment_ecology'
  | 'international_relations'
  | 'defence_security'
  | 'govt_schemes'
  | 'sports_awards';

export type ExamDemandCategory = 'ALL' | 'UPSC' | 'SSC_RAILWAY' | 'BANKING' | 'STATE_DEFENCE';

export interface MultiStatementPrelimsQuestion {
  question: {
    hi: string;
    en: string;
    hinglish: string;
  };
  statements: {
    hi: string[];
    en: string[];
    hinglish: string[];
  };
  options: {
    label: string;
    text: { hi: string; en: string; hinglish: string };
  }[];
  correctIndex: number;
  explanation: {
    hi: string;
    en: string;
    hinglish: string;
  };
  gsPaper: string;
  pyqTrendLink: string;
}

export interface MainsAnalyticalQuestion {
  question: {
    hi: string;
    en: string;
    hinglish: string;
  };
  marks: number;
  wordCount: number;
  gsPaper: 'GS Paper 1' | 'GS Paper 2' | 'GS Paper 3' | 'GS Paper 4' | 'Essay';
  modelAnswerFramework: {
    introduction: { hi: string; en: string; hinglish: string };
    dimensions: {
      title: { hi: string; en: string; hinglish: string };
      points: { hi: string[]; en: string[]; hinglish: string[] };
    }[];
    challengesOrCounterpoints: { hi: string[]; en: string[]; hinglish: string[] };
    wayForwardAndCommittees: { hi: string[]; en: string[]; hinglish: string[] };
    conclusion: { hi: string; en: string; hinglish: string };
  };
}

export interface SscFastDemand {
  speedSummary: {
    hi: string;
    en: string;
    hinglish: string;
  };
  speedOneLiners: {
    hi: string[];
    en: string[];
    hinglish: string[];
  };
  staticGkHooks: {
    key: string;
    value: { hi: string; en: string; hinglish: string };
  }[];
  directMcq: {
    question: { hi: string; en: string; hinglish: string };
    options: { hi: string[]; en: string[]; hinglish: string[] };
    correctIndex: number;
    explanation: { hi: string; en: string; hinglish: string };
  };
  shortcutTrick?: {
    title: { hi: string; en: string; hinglish: string };
    mnemonic: string;
  };
}

export interface BankingDemand {
  financialAngle: {
    hi: string;
    en: string;
    hinglish: string;
  };
  keyFinancialTerms: {
    term: string;
    definition: { hi: string; en: string; hinglish: string };
  }[];
  bankingDirectMcq: {
    question: { hi: string; en: string; hinglish: string };
    options: { hi: string[]; en: string[]; hinglish: string[] };
    correctIndex: number;
    explanation: { hi: string; en: string; hinglish: string };
  };
  regulatoryEntity: string;
}

export interface StateDefenceDemand {
  strategicSignificance: {
    hi: string;
    en: string;
    hinglish: string;
  };
  defenceOrStateMcq: {
    question: { hi: string; en: string; hinglish: string };
    options: { hi: string[]; en: string[]; hinglish: string[] };
    correctIndex: number;
    explanation: { hi: string; en: string; hinglish: string };
  };
  keyMilitaryOrStateFacts: { hi: string[]; en: string[]; hinglish: string[] };
}

export interface DailyCurrentAffairItem {
  id: string;
  date: string; // YYYY-MM-DD
  category: CurrentAffairsCategory;
  categoryLabel: { hi: string; en: string; hinglish: string };
  categoryIcon: string;
  headline: {
    hi: string;
    en: string;
    hinglish: string;
  };
  subHeadline: {
    hi: string;
    en: string;
    hinglish: string;
  };
  officialSource: string;
  readTimeMinutes: number;
  importanceLevel: 'Very High (100% Exam Probability)' | 'High' | 'Medium';

  // THE EXAM DEMAND MATRIX
  examDemandBreakdown: {
    whyExamsAskThisDifferently: {
      hi: string;
      en: string;
      hinglish: string;
    };
    upscDemand: {
      gsPaper: 'GS Paper 1' | 'GS Paper 2' | 'GS Paper 3' | 'GS Paper 4';
      analyticalContext: {
        hi: string;
        en: string;
        hinglish: string;
      };
      constitutionalOrPolicyArticles: string[];
      prelimsMultiStatementQuestion: MultiStatementPrelimsQuestion;
      mainsQuestion: MainsAnalyticalQuestion;
    };
    sscRailwayDemand: SscFastDemand;
    bankingDemand: BankingDemand;
    stateDefenceDemand: StateDefenceDemand;
  };
}

export interface SpeedOneLinerItem {
  id: string;
  date: string;
  category: CurrentAffairsCategory;
  examTargets: ('UPSC' | 'SSC' | 'Banking' | 'Railway' | 'State PSC')[];
  text: {
    hi: string;
    en: string;
    hinglish: string;
  };
  staticLink: {
    hi: string;
    en: string;
    hinglish: string;
  };
}

export const CURRENT_AFFAIRS_CATEGORIES: {
  id: CurrentAffairsCategory;
  label: { hi: string; en: string; hinglish: string };
  icon: string;
  color: string;
}[] = [
  { id: 'polity_governance', label: { hi: 'राजव्यवस्था व संविधान (Polity)', en: 'Polity & Governance', hinglish: 'Polity & Governance' }, icon: '⚖️', color: 'indigo' },
  { id: 'economy_banking', label: { hi: 'अर्थव्यवस्था व बैंकिंग (Economy)', en: 'Economy & Banking', hinglish: 'Economy & Banking' }, icon: '📈', color: 'emerald' },
  { id: 'science_tech', label: { hi: 'विज्ञान, अंतरिक्ष व AI (Sci-Tech)', en: 'Science, Space & AI', hinglish: 'Science, Space & Tech' }, icon: '🚀', color: 'cyan' },
  { id: 'environment_ecology', label: { hi: 'पर्यावरण व जलवायु (Environment)', en: 'Environment & Ecology', hinglish: 'Environment & Ecology' }, icon: '🌿', color: 'green' },
  { id: 'international_relations', label: { hi: 'अंतरराष्ट्रीय संबंध व शिखर सम्मेलन (IR)', en: 'International Relations', hinglish: 'International Relations' }, icon: '🌐', color: 'blue' },
  { id: 'defence_security', label: { hi: 'रक्षा, युद्धाभ्यास व सुरक्षा (Defence)', en: 'Defence & Security', hinglish: 'Defence & Security' }, icon: '🛡️', color: 'rose' },
  { id: 'govt_schemes', label: { hi: 'सरकारी योजनाएं व कल्याण (Schemes)', en: 'Govt Schemes & Initiatives', hinglish: 'Govt Schemes & Policies' }, icon: '🏛️', color: 'amber' },
  { id: 'sports_awards', label: { hi: 'खेलकूद, पुरस्कार व नियुक्तियां (Sports)', en: 'Sports, Awards & Appointments', hinglish: 'Sports, Awards & Persons' }, icon: '🏆', color: 'purple' },
];

export const EXAM_DEMAND_EXPLAINER = {
  title: {
    hi: 'विभिन्न सरकारी परीक्षाओं में करेंट अफेयर्स की मांग में मौलिक अंतर (Exam Demand Difference)',
    en: 'Fundamental Difference in Current Affairs Demand Across Competitive Exams',
    hinglish: 'Different Exams me Current Affairs ki Demand kaise alag hoti hai?',
  },
  comparisons: [
    {
      exam: 'UPSC Civil Services (IAS/IPS)',
      badge: 'Analytical + Multi-Dimensional + GS Mapping',
      icon: '⚖️',
      color: 'indigo',
      demandNature: {
        hi: 'तथ्य (Facts) नहीं, बल्कि "कारण, प्रभाव, संवैधानिक ढांचा और समाधान (Why, Impact, Policy, Way Forward)" पूछा जाता है। प्रीलिम्स में 3-4 कथनों वाले प्रश्न (Statement-based) और मेन्स में 250 शब्दों के विश्लेषणात्मक निबंधात्मक उत्तर।',
        en: 'Focuses on structural roots, Constitutional articles, inter-linking of GS papers, societal impact, counter-perspectives, and balanced administrative solutions rather than rote memorization.',
        hinglish: 'UPSC me direct facts nahi, balki GS Paper 1, 2, 3 se inter-linkage, Constitutional articles, Supreme Court rulings, aur Mains ke 15 marks ke analytical questions aate hain.',
      },
      keyFocus: ['GS 1/2/3/4 Syllabus Mapping', 'Multi-statement Prelims MCQs', 'Mains Answer Structure & Flowcharts', 'Government Committees & Case Laws'],
    },
    {
      exam: 'SSC (CGL, CHSL, GD) & Railways (NTPC/ALP)',
      badge: 'Speed + Direct Factual Recall + Static GK Hook',
      icon: '⚡',
      color: 'amber',
      demandNature: {
        hi: 'सीधे प्रश्न: "कौन, क्या, कहाँ, कब, कौन सा पदक, कौन सा सूचकांक?"। साथ में उस खबर से जुड़ा स्टेटिक जीके (जैसे किसी देश के राष्ट्रपति की यात्रा हुई तो उस देश की राजधानी, मुद्रा या संसद का नाम)।',
        en: 'High-speed one-line facts: Who was appointed, venue of sports events, global indices rank, trophy winners, linked with Static GK (Capital, Currency, National Parks, Articles).',
        hinglish: 'SSC & Railway me 10-second fast direct recall chahiye: Appointments, Military exercises, GI tags, Sports winners, and connected Static GK facts.',
      },
      keyFocus: ['10-Second Recall One-Liners', 'Direct 4-Option MCQs', 'Connected Static GK (Headquarters, River, Article)', 'Memory Mnemonics & Tricks'],
    },
    {
      exam: 'Banking & Insurance (IBPS, SBI, RBI)',
      badge: 'Monetary Policy + Financial Ratios + Regulatory Circulars',
      icon: '🏦',
      color: 'emerald',
      demandNature: {
        hi: 'आरबीआई की मौद्रिक नीति दरें (Repo, Reverse Repo, MSF, CRR), मुद्रास्फीति दर, सकल घरेलू उत्पाद (GDP) पूर्वानुमान, विलय-अधिग्रहण, डिजिटल बैंकिंग (UPI, CBDC), और बैंकिंग जागरूकता।',
        en: 'In-depth focus on RBI monetary policy decisions, banking regulations, inflation indices (CPI/WPI), fiscal deficit numbers, international agencies (World Bank, IMF) growth projections, and Fintech.',
        hinglish: 'Banking me Monetary rates, RBI notifications, GDP growth estimates by rating agencies, FinTech innovations, and banking static terms ka focus rahta hai.',
      },
      keyFocus: ['RBI Monetary Policy Rates', 'Financial & Macroeconomic Indices', 'Mergers, Acquisitions & SEBI Rules', 'Banking Awareness Static Terms'],
    },
    {
      exam: 'Defence (NDA/CDS) & State PSCs (MPPSC, BPSC)',
      badge: 'Strategic Doctrine + State Specific Schemes & Culture',
      icon: '🛡️',
      color: 'rose',
      demandNature: {
        hi: 'डिफेंस में द्विपक्षीय युद्धाभ्यास, मिसाइल परीक्षण, नौसैनिक युद्धपोत, सामरिक संधियां। स्टेट पीएससी में राज्य बजट, राज्य की स्थानीय योजनाएं, जिले की उपलब्धियां और राज्य का भूगोल/संस्कृति।',
        en: 'Defence tests military hardware, tactical doctrines, bilateral drills. State PSCs demand intense focus on state-specific welfare schemes, state budget allocations, local tribal culture, and district geography.',
        hinglish: 'Defence me Joint military drills, missile ranges, air defense systems; State PSC me state-specific government schemes, state budget, aur local geography.',
      },
      keyFocus: ['Bilateral Military Drills & Platforms', 'State Budget & State Welfare Schemes', 'Local Heritage & Tribal Development', 'Regional Current Affairs'],
    },
  ],
};

export const MASTER_DAILY_CURRENT_AFFAIRS: DailyCurrentAffairItem[] = [
  {
    id: 'ca-rbi-mpc-rates-2026',
    date: '2026-09-09',
    category: 'economy_banking',
    categoryLabel: { hi: 'अर्थव्यवस्था व बैंकिंग नीति', en: 'Economy & Banking Policy', hinglish: 'Economy & Monetary Policy' },
    categoryIcon: '📈',
    headline: {
      hi: 'आरबीआई मौद्रिक नीति समिति (MPC) ने रेपो दर 6.50% पर स्थिर रखी; लिक्विडिटी व खाद्य मुद्रास्फीति पर कड़ा रुख',
      en: 'RBI Monetary Policy Committee (MPC) Keeps Repo Rate Unchanged at 6.50%; Focus on Food Inflation & Durable Price Stability',
      hinglish: 'RBI Monetary Policy Committee ne Repo Rate 6.50% par barkarar rakhi; Inflation targeting par sakht stance',
    },
    subHeadline: {
      hi: 'लगातार 9वीं द्विमासिक बैठक में दरें स्थिर; स्टैंडिंग डिपॉजिट फैसिलिटी (SDF) 6.25% और एमएसएफ 6.75% पर कायम।',
      en: 'Policy stance maintained at "Withdrawal of Accommodation"; GDP growth projected at 7.2% for FY26.',
      hinglish: 'Policy stance "Withdrawal of Accommodation" par continue; GDP growth target 7.2% rakha gaya.',
    },
    officialSource: 'Reserve Bank of India (RBI) Official Bulletin & Gazette Statement',
    readTimeMinutes: 4,
    importanceLevel: 'Very High (100% Exam Probability)',

    examDemandBreakdown: {
      whyExamsAskThisDifferently: {
        hi: 'UPSC इसमें मुद्रास्फीति लक्ष्यीकरण (Flexible Inflation Targeting), मौद्रिक संचरण (Monetary Transmission) और राजकोषीय नीति के साथ टकराव पर विश्लेषणात्मक प्रश्न पूछेगा। SSC/Railway केवल वर्तमान रेपो रेट और आरबीआई स्थापना का वर्ष पूछेगा। Banking इसमें SDF, MSF, CRR और तरलता प्रबंधन (LAF) के सटीक आंकड़े पूछेगा।',
        en: 'UPSC examines structural macroeconomics, legal mandate under RBI Act 1934, and trade-off between growth and inflation. SSC requires direct rate numbers and static RBI facts. Banking requires operational liquidity tools and banking ratios.',
        hinglish: 'UPSC macro-economics aur policy challenge puchega; SSC direct rate aur Static GK puchega; Banking operational liquidity aur regulatory ratios puchega.',
      },

      upscDemand: {
        gsPaper: 'GS Paper 3',
        analyticalContext: {
          hi: 'आरबीआई अधिनियम 1934 की धारा 45ZB के तहत गठित MPC का वैधानिक अधिदेश 4% (+/- 2%) का लचीला मुद्रास्फीति लक्ष्य (FIT) बनाए रखना है। मुख्य चुनौती खाद्य मुद्रास्फीति (Food Inflation) की अस्थिरता है, जिस पर मौद्रिक नीति का सीधा प्रभाव सीमित होता है, क्योंकि यह आपूर्ति-पक्ष (Supply-side shocks) से प्रेरित होती है।',
          en: 'Constituted under Section 45ZB of RBI Act 1934, the 6-member MPC operates on a Flexible Inflation Targeting (FIT) framework of 4% (+/- 2%). The core analytical dilemma is balancing rate cuts to spur private capital expenditure against stubborn food inflation driven by climate anomalies and supply-side bottlenecks.',
          hinglish: 'RBI Act 1934 Section 45ZB ke mutabik 6-member MPC ka Flexible Inflation Target 4% (+/-2%) hai. Core issue supply-side food inflation vs growth capex balance ka hai.',
        },
        constitutionalOrPolicyArticles: ['Section 45ZB to 45ZO of RBI Act 1934', 'Article 246 (Union List Entry 38 - Reserve Bank of India)', 'Fiscal Responsibility and Budget Management (FRBM) Act'],
        prelimsMultiStatementQuestion: {
          gsPaper: 'GS Paper 3 (Economy)',
          pyqTrendLink: 'UPSC CSE Prelims 2017 & 2021 Question on Monetary Policy Committee',
          question: {
            hi: 'भारतीय रिज़र्व बैंक की मौद्रिक नीति समिति (MPC) के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:',
            en: 'With reference to the Monetary Policy Committee (MPC) of the Reserve Bank of India, consider the following statements:',
            hinglish: 'Reserve Bank of India ki Monetary Policy Committee (MPC) ke bare me nimnlikhit statements par dhyan dein:',
          },
          statements: {
            hi: [
              '1. यह भारतीय रिज़र्व बैंक अधिनियम, 1934 के तहत गठित एक 6-सदस्यीय वैधानिक निकाय है।',
              '2. केंद्रीय वित्त मंत्री पदेन (Ex-officio) इस समिति के अध्यक्ष होते हैं।',
              '3. मतों के बराबर होने की स्थिति में, आरबीआई गवर्नर के पास निर्णायक मत (Casting Vote) होता है।',
            ],
            en: [
              '1. It is a 6-member statutory body constituted under the Reserve Bank of India Act, 1934.',
              '2. The Union Finance Minister serves as the ex-officio Chairperson of the committee.',
              '3. In the event of an equality of votes, the Governor of the RBI possesses a casting vote.',
            ],
            hinglish: [
              '1. Yeh RBI Act 1934 ke tahat 6-member statutory committee hai.',
              '2. Union Finance Minister iske ex-officio Chairperson hote hain.',
              '3. Vote tie hone par RBI Governor ke paas casting vote hota hai.',
            ],
          },
          options: [
            { label: 'A', text: { hi: 'केवल 1 और 2', en: '1 and 2 only', hinglish: '1 aur 2 only' } },
            { label: 'B', text: { hi: 'केवल 1 और 3', en: '1 and 3 only', hinglish: '1 aur 3 only' } },
            { label: 'C', text: { hi: 'केवल 3', en: '3 only', hinglish: '3 only' } },
            { label: 'D', text: { hi: '1, 2 और 3', en: '1, 2 and 3', hinglish: '1, 2 aur 3' } },
          ],
          correctIndex: 1, // B: 1 and 3 only
          explanation: {
            hi: 'कथन 2 गलत है क्योंकि आरबीआई गवर्नर (Governor of RBI) MPC के पदेन अध्यक्ष होते हैं, वित्त मंत्री नहीं। कथन 1 और 3 पूर्णतः सत्य हैं। धारा 45ZB के तहत 3 सदस्य आरबीआई से और 3 केंद्र सरकार द्वारा नियुक्त स्वतंत्र विशेषज्ञ होते हैं।',
            en: 'Statement 2 is incorrect because the Governor of the RBI is the ex-officio Chairperson of the MPC, NOT the Union Finance Minister. Statements 1 and 3 are correct. The committee comprises 3 members from RBI and 3 external experts appointed by the Central Government for a 4-year tenure.',
            hinglish: 'Statement 2 galat hai kyunki RBI Governor MPC ke ex-officio Chairperson hote hain, Finance Minister nahi. Statements 1 & 3 sahi hain.',
          },
        },
        mainsQuestion: {
          gsPaper: 'GS Paper 3',
          marks: 15,
          wordCount: 250,
          question: {
            hi: '"लचीले मुद्रास्फीति लक्ष्यीकरण (FIT) ने भारत में मैक्रो-इकोनॉमिक स्थिरता तो प्रदान की है, किंतु आपूर्ति-पक्षीय झटकों (Supply-side shocks) से निपटने में इसकी अपनी सीमाएं हैं।" आलोचनात्मक विश्लेषण कीजिए। (15 अंक, 250 शब्द)',
            en: '"While Flexible Inflation Targeting (FIT) has anchored macro-economic expectations in India, its efficacy is fundamentally circumscribed when dealing with supply-side food shocks." Critically analyze. (15 Marks, 250 Words)',
            hinglish: '"Flexible Inflation Targeting (FIT) ne macro-stability toh di hai, lekin supply-side food shocks par iski limitations hain." Critically examine karein. (15 Marks, 250 Words)',
          },
          modelAnswerFramework: {
            introduction: {
              hi: 'उर्जित पटेल समिति (2014) की सिफारिशों पर 2016 में लागू FIT ढांचे और 4% (+/-2%) लक्ष्य का उल्लेख करें।',
              en: 'Introduce the adoption of FIT framework in 2016 based on the Urjit Patel Committee recommendations under the amended RBI Act 1934, institutionalizing the 4% (+/- 2%) target.',
              hinglish: 'Urjit Patel committee (2014) recommendation aur amended RBI Act 1934 se shuru karein.',
            },
            dimensions: [
              {
                title: { hi: 'सफलताएं (Successes of FIT)', en: 'Achievements of FIT Framework', hinglish: 'FIT ki Achievements' },
                points: {
                  hi: [
                    'मुद्रास्फीति की प्रत्याशाओं (Inflation expectations) को मजबूती से नियंत्रित किया।',
                    'विदेशी निवेशकों का विश्वास और सरकारी बॉन्ड यील्ड्स में स्थिरता लाई।',
                    'कोविड और यूक्रेन युद्ध के वैश्विक झटकों के बावजूद 1970/1990 जैसी बेकाबू मुद्रास्फीति नहीं होने दी।',
                  ],
                  en: [
                    'Anchored household and corporate inflation expectations effectively.',
                    'Enhanced monetary transmission transparency through bi-monthly published minutes and voting records.',
                    'Insulated India from runaway currency depreciation compared to peer emerging economies.',
                  ],
                  hinglish: [
                    'Household inflation expectations ko anchor kiya.',
                    'RBI transparency aur policy predictability badhayi.',
                    'Emerging markets me currency depreciation ko control kiya.',
                  ],
                },
              },
              {
                title: { hi: 'संरचनात्मक सीमाएं (Structural Limitations)', en: 'Structural Limitations in Indian Context', hinglish: 'Structural Limitations' },
                points: {
                  hi: [
                    'उपभोक्ता मूल्य सूचकांक (CPI) बास्केट में खाद्य एवं पेय पदार्थों का भार लगभग 45.86% है, जो मौद्रिक दरों के प्रति कम संवेदनशील है।',
                    'अल-नीनो, बेमौसम बारिश और भू-राजनीतिक आपूर्ति व्यवधानों को ब्याज दर बढ़ाकर ठीक नहीं किया जा सकता।',
                    'उच्च ब्याज दरें निजी पूंजी निवेश (Private Capex) और एमएसएमई ऋण को धीमा कर सकती हैं।',
                  ],
                  en: [
                    'High food weightage (~45.86%) in Indian CPI basket renders monetary tightening less effective against erratic monsoon and supply bottlenecks.',
                    'Higher interest rates risk dampening private capital formation and MSME working capital cycles.',
                    'Core inflation is well-behaved, yet headline inflation remains elevated due to vegetable/protein volatility.',
                  ],
                  hinglish: [
                    'CPI basket me food weightage 45.86% hai jo monetary policy se direct control nahi hota.',
                    'Unseasonal weather aur supply shock interest rate se solve nahi hote.',
                    'High interest rates se MSME loans aur investment par asar padta hai.',
                  ],
                },
              },
            ],
            challengesOrCounterpoints: {
              hi: [
                'राजकोषीय नीति (Fiscal policy) और मौद्रिक नीति (Monetary policy) के बीच तालमेल का अभाव।',
                'बैंकों द्वारा सावधि जमा दरों और ऋण दरों में असमान संचरण (Asymmetric transmission)।',
              ],
              en: [
                'Need for synchronized fiscal action (buffer stocking, trade tariff adjustments, cold storage logistics).',
                'Lag in credit transmission from policy repo rate to retail lending benchmarks.',
              ],
              hinglish: ['Fiscal vs monetary policy synchronization zaroori hai.', 'Monetary transmission lags retail lending rates.'],
            },
            wayForwardAndCommittees: {
              hi: [
                'खाद्य आपूर्ति श्रृंखला में कोल्ड-चेन व एग्री-लॉजिस्टिक्स अवसंरचना का आधुनिकीकरण (स्वामीनाथन आयोग व अशोक दलवई समिति)।',
                'हेडलाइन बनाम कोर मुद्रास्फीति पर बारीक अंतर करते हुए अधिक लचीला नीति रुख अपनाना।',
              ],
              en: [
                'Strengthen post-harvest infrastructure and cold storages to curb seasonal food price spikes (Ashok Dalwai Committee).',
                'Differentiate between transient climatic shocks and persistent demand pressures before hiking borrowing costs.',
              ],
              hinglish: ['Cold storage aur logistics improve karein.', 'Headline vs core inflation me balance rakhein.'],
            },
            conclusion: {
              hi: 'निष्कर्षतः, स्थायी मूल्य स्थिरता केवल मौद्रिक नीति से संभव नहीं है; इसके लिए मौद्रिक नियंत्रण और आपूर्ति-पक्षीय कृषि सुधारों का समकालिक समन्वय अनिवार्य है।',
              en: 'In conclusion, durable price stability requires an integrated macroeconomic posture where monetary discipline is reinforced by structural supply-chain reforms.',
              hinglish: 'Durable price stability ke liye monetary policy aur agricultural supply-chain reforms ka synchronization anivarya hai.',
            },
          },
        },
      },

      sscRailwayDemand: {
        speedSummary: {
          hi: 'आरबीआई ने वर्तमान रेपो दर को 6.50% पर अपरिवर्तित रखा है। रिवर्स रेपो 3.35% है। आरबीआई का मुख्यालय मुंबई में है और वर्तमान गवर्नर शक्तिकांत दास हैं।',
          en: 'RBI kept the policy Repo Rate unchanged at 6.50%. Reverse repo is 3.35%. RBI headquarters is in Mumbai, governed currently by Shaktikanta Das.',
          hinglish: 'RBI ne Repo Rate 6.50% par rakha hai. Headquarters Mumbai me hai aur Governor Shaktikanta Das hain.',
        },
        speedOneLiners: {
          hi: [
            '🔹 वर्तमान रेपो दर (Repo Rate): 6.50%',
            '🔹 स्टैंडिंग डिपॉजिट फैसिलिटी (SDF) दर: 6.25%',
            '🔹 मार्जिनल स्टैंडिंग फैसिलिटी (MSF) दर: 6.75%',
            '🔹 आरबीआई का स्थापना वर्ष: 1 अप्रैल 1935 (कोलकाता में, 1937 में मुंबई स्थानांतरित)',
            '🔹 आरबीआई का राष्ट्रीयकरण (Nationalization): 1 जनवरी 1949',
            '🔹 आरबीआई के पहले गवर्नर: सर ऑस्बोर्न स्मिथ (Sir Osborne Smith)',
            '🔹 आरबीआई के पहले भारतीय गवर्नर: सी.डी. देशमुख (C.D. Deshmukh)',
          ],
          en: [
            '🔹 Current Repo Rate: 6.50%',
            '🔹 Standing Deposit Facility (SDF) Rate: 6.25%',
            '🔹 Marginal Standing Facility (MSF) Rate: 6.75%',
            '🔹 RBI Established: 1st April 1935 under Hilton Young Commission recommendations',
            '🔹 RBI Nationalized: 1st January 1949',
            '🔹 First RBI Governor: Sir Osborne Smith (1935-1937)',
            '🔹 First Indian RBI Governor: C.D. Deshmukh',
          ],
          hinglish: [
            '🔹 Current Repo Rate: 6.50%',
            '🔹 SDF Rate: 6.25%, MSF Rate: 6.75%',
            '🔹 RBI Establishment: 1 April 1935',
            '🔹 RBI Nationalization: 1 January 1949',
            '🔹 First Governor: Sir Osborne Smith',
            '🔹 First Indian Governor: C.D. Deshmukh',
          ],
        },
        staticGkHooks: [
          { key: 'Headquarters', value: { hi: 'मुंबई, महाराष्ट्र', en: 'Mumbai, Maharashtra', hinglish: 'Mumbai, Maharashtra' } },
          { key: 'Recommended By', value: { hi: 'हिल्टन यंग आयोग (1926 Royal Commission on Indian Currency)', en: 'Hilton Young Commission (1926)', hinglish: 'Hilton Young Commission' } },
          { key: 'Financial Year of RBI', value: { hi: '1 अप्रैल से 31 मार्च (पहले 1 जुलाई से 30 जून था)', en: '1st April to 31st March (Shifted from July-June)', hinglish: '1 April to 31 March' } },
        ],
        directMcq: {
          question: {
            hi: 'वर्तमान में भारतीय रिज़र्व बैंक (RBI) द्वारा निर्धारित नीतिगत रेपो दर (Repo Rate) कितनी है?',
            en: 'What is the current policy Repo Rate set by the Reserve Bank of India (RBI)?',
            hinglish: 'Presently RBI ne policy Repo Rate kitni fix ki hai?',
          },
          options: {
            hi: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
            en: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
            hinglish: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
          },
          correctIndex: 2, // C: 6.50%
          explanation: {
            hi: 'आरबीआई मौद्रिक नीति समिति ने रेपो दर को 6.50% पर स्थिर रखा है। रिवर्स रेपो 3.35% और एमएसएफ 6.75% है।',
            en: 'The RBI Monetary Policy Committee has retained the policy repo rate at 6.50%.',
            hinglish: 'Correct answer C (6.50%) hai.',
          },
        },
        shortcutTrick: {
          title: { hi: 'रेपो और रिवर्स रेपो का अंतर याद रखने की ट्रिक', en: 'Repo vs Reverse Repo Memory Trick', hinglish: 'Repo vs Reverse Repo Trick' },
          mnemonic: 'R-E-P-O = Reserve Bank Gives Money to Commercial Banks (ब्याज बैंक भरते हैं). Reverse = Banks Give to RBI.',
        },
      },

      bankingDemand: {
        financialAngle: {
          hi: 'रेपो दर स्थिर रहने से बैंकों की मार्जिनल कॉस्ट ऑफ फंड्स बेस्ड लेंडिंग रेट (MCLR) और एक्सटर्नल बेंचमार्क लेंडिंग रेट (EBLR) में स्थिरता बनी रहेगी। होम लोन और कार लोन की ईएमआई में तत्काल बढ़ोतरी या कटौती नहीं होगी।',
          en: 'Neutral repo rate keeps MCLR and EBLR stable, keeping retail lending rates steady while managing the credit-deposit (CD) ratio which currently hovers around 79-80%.',
          hinglish: 'Stable repo rate se MCLR aur EBLR stable rehenge, retail lending EMI me sudden change nahi hoga.',
        },
        keyFinancialTerms: [
          {
            term: 'SDF (Standing Deposit Facility)',
            definition: {
              hi: 'बिना कोई सरकारी प्रतिभूति गिरवी रखे बैंकों से अतिरिक्त तरलता अवशोषित करने का गैर-संपार्श्विक साधन (दर: 6.25%)।',
              en: 'Non-collateralized liquidity absorption tool used by RBI to park surplus bank funds (Rate: 6.25%).',
              hinglish: 'Collateral-free liquidity absorption tool (Rate: 6.25%).',
            },
          },
          {
            term: 'MSF (Marginal Standing Facility)',
            definition: {
              hi: 'बैंकों द्वारा आपातकालीन रात्रि (Overnight) तरलता प्राप्त करने की सुविधा (दर: 6.75%)।',
              en: 'Overnight borrowing window for scheduled commercial banks against SLR securities (Rate: 6.75%).',
              hinglish: 'Overnight borrowing window for banks against SLR quota (Rate: 6.75%).',
            },
          },
          {
            term: 'Cash Reserve Ratio (CRR)',
            definition: {
              hi: 'बैंकों को अपनी शुद्ध मांग और समय देनदारियों (NDTL) का वह प्रतिशत जो अनिवार्य रूप से आरबीआई के पास नकद रूप में रखना होता है (वर्तमान: 4.50%)।',
              en: 'Percentage of Net Demand and Time Liabilities (NDTL) that banks must keep with RBI in cash (Current: 4.50%).',
              hinglish: 'Mandatory percentage of NDTL kept with RBI in cash form (4.50%).',
            },
          },
        ],
        bankingDirectMcq: {
          question: {
            hi: 'आरबीआई द्वारा तरलता अवशोषण (Liquidity Absorption) के लिए प्रयोग की जाने वाली स्थायी जमा सुविधा (Standing Deposit Facility - SDF) की वर्तमान दर क्या है?',
            en: 'What is the current rate of the Standing Deposit Facility (SDF) employed by RBI for non-collateralized liquidity absorption?',
            hinglish: 'RBI dwara use ki jaane wali Standing Deposit Facility (SDF) ki current rate kya hai?',
          },
          options: {
            hi: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
            en: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
            hinglish: ['A. 6.00%', 'B. 6.25%', 'C. 6.50%', 'D. 6.75%'],
          },
          correctIndex: 1, // B: 6.25%
          explanation: {
            hi: 'SDF दर रेपो दर से 25 आधार अंक नीचे होती है। रेपो दर 6.50% है, अतः SDF 6.25% है। एमएसएफ रेपो से 25 आधार अंक ऊपर (6.75%) होती है।',
            en: 'SDF is pegged 25 bps below the policy Repo Rate (6.50% - 0.25% = 6.25%). Marginal Standing Facility (MSF) is pegged 25 bps above repo (6.75%).',
            hinglish: 'SDF Repo se 25 bps neeche (6.25%) aur MSF 25 bps upar (6.75%) hoti hai.',
          },
        },
        regulatoryEntity: 'Reserve Bank of India (RBI) / Monetary Policy Department',
      },

      stateDefenceDemand: {
        strategicSignificance: {
          hi: 'ब्याज दरें स्थिर रहने से राज्य सरकारों द्वारा विकास कार्यों हेतु जारी किए जाने वाले राज्य विकास ऋण (State Development Loans - SDLs) की यील्ड्स और उधार लागत पर नियंत्रण रहता है।',
          en: 'Unchanged repo rates stabilize borrowing yields on State Development Loans (SDLs) used by state governments to fund welfare capital projects.',
          hinglish: 'Stable repo rates se State Development Loans (SDLs) ki borrowing cost predictable rehti hai.',
        },
        defenceOrStateMcq: {
          question: {
            hi: 'राज्य सरकारों द्वारा बाज़ार से दीर्घकालिक ऋण प्राप्त करने के लिए जारी किए जाने वाले बॉन्ड्स को क्या कहा जाता है?',
            en: 'What are the sovereign market-borrowing bonds issued by State Governments called in India?',
            hinglish: 'State Governments market se long-term borrow karne ke liye jo bonds issue karti hain unhe kya kehte hain?',
          },
          options: {
            hi: ['A. ट्रेजरी बिल्स (T-Bills)', 'B. राज्य विकास ऋण (State Development Loans - SDLs)', 'C. कमर्शियल पेपर्स', 'D. सॉवरेन गोल्ड बॉन्ड्स'],
            en: ['A. Treasury Bills (T-Bills)', 'B. State Development Loans (SDLs)', 'C. Commercial Papers', 'D. Sovereign Gold Bonds'],
            hinglish: ['A. T-Bills', 'B. State Development Loans (SDLs)', 'C. Commercial Papers', 'D. Sovereign Gold Bonds'],
          },
          correctIndex: 1, // B: SDLs
          explanation: {
            hi: 'राज्य सरकारें केवल स्टेट डेवलपमेंट लोन्स (SDLs) जारी करती हैं। ट्रेजरी बिल्स (T-Bills) केवल केंद्र सरकार द्वारा जारी किए जाते हैं, राज्य सरकारों द्वारा नहीं।',
            en: 'State governments issue State Development Loans (SDLs). Treasury bills (91, 182, 364 days) are issued exclusively by the Central Government.',
            hinglish: 'Correct answer B: State Governments SDLs issue karti hain. T-Bills sirf Central Govt issue karti hai.',
          },
        },
        keyMilitaryOrStateFacts: {
          hi: ['ट्रेजरी बिल केवल केंद्र सरकार जारी कर सकती है।', 'राज्यों की उधारी संविधान के अनुच्छेद 293(3) द्वारा नियंत्रित होती है।'],
          en: ['Treasury bills issued exclusively by Central Govt.', 'State borrowings governed under Article 293(3) of the Constitution.'],
          hinglish: ['T-bills only Central Govt issue karti hai.', 'Article 293(3) governs state market borrowings.'],
        },
      },
    },
  },

  {
    id: 'ca-nisar-isro-nasa-2026',
    date: '2026-09-09',
    category: 'science_tech',
    categoryLabel: { hi: 'विज्ञान, अंतरिक्ष व प्रौद्योगिकी', en: 'Science, Space & Technology', hinglish: 'Science, Space & Tech' },
    categoryIcon: '🚀',
    headline: {
      hi: 'इसरो और नासा का ऐतिहासिक संयुक्त मिशन "NISAR" प्रक्षेपण के अंतिम चरण में; दोहरी रडार तकनीक से पृथ्वी के सूक्ष्म परिवर्तनों की होगी निगरानी',
      en: 'ISRO-NASA Joint Satellite Mission "NISAR" Enters Final Launch Integration; Dual Synthetic Aperture Radar to Map Earth’s Fragile Ecosystems',
      hinglish: 'ISRO-NASA ka Joint Mission "NISAR" launch ke final phase me; Dual Frequency SAR se Earth observation',
    },
    subHeadline: {
      hi: 'विश्व का पहला दोहरा फ्रीक्वेंसी (L-बैंड और S-बैंड) रडार उपग्रह; ग्लेशियरों, भूकंपीय भ्रंश रेखाओं व वनावरण का 12 दिनों में वैश्विक मानचित्रण।',
      en: 'First-of-its-kind dual frequency (L-band & S-band) radar observatory; maps land and ice surfaces globally every 12 days.',
      hinglish: 'World ka pehla L-band & S-band dual radar satellite; glaciers aur tectonic faults ka 12-day global mapping.',
    },
    officialSource: 'Indian Space Research Organisation (ISRO) Press Release & NASA JPL Statement',
    readTimeMinutes: 4,
    importanceLevel: 'Very High (100% Exam Probability)',

    examDemandBreakdown: {
      whyExamsAskThisDifferently: {
        hi: 'UPSC में रिमोट सेंसिंग के सिद्धांत, L-बैंड बनाम S-बैंड की तरंगदैर्ध्य (Penetration capacity), और आपदा प्रबंधन में इसकी भूमिका पूछी जाएगी। SSC/Railway केवल यह पूछेगा कि निसार किन दो एजेंसियों का संयुक्त मिशन है और यह किस रॉकेट से छोड़ा जाएगा। Banking इसमें मिशन लागत और भारत के अंतरिक्ष क्षेत्र में एफडीआई नीतियों से लिंक करेगा।',
        en: 'UPSC focuses on microwave remote sensing physics, SAR penetration through clouds, disaster governance, and space indigenization. SSC asks acronyms, launch center, rocket type. Banking covers space commerce and budgetary outlays.',
        hinglish: 'UPSC SAR remote sensing physics aur disaster management puchega; SSC launching vehicle aur NASA-ISRO partner puchega; Banking commercial space economy puchega.',
      },

      upscDemand: {
        gsPaper: 'GS Paper 3',
        analyticalContext: {
          hi: 'NISAR (NASA-ISRO Synthetic Aperture Radar) पृथ्वी अवलोकन उपग्रहों में तकनीकी छलांग है। यह बादलों, कोहरे और रात के अंधेरे में भी सतह का 1 सेंटीमीटर से भी कम का विस्थापन (Ground displacement) माप सकता है। L-बैंड (नासा द्वारा निर्मित, 24 सेमी तरंगदैर्ध्य) घने जंगलों की छतरी को भेदकर ज़मीन तक पहुंचता है, जबकि S-बैंड (इसरो द्वारा निर्मित, 12 सेमी तरंगदैर्ध्य) फसल निगरानी और हल्के वनस्पतियों के लिए सर्वोत्तम है।',
          en: 'NISAR employs repeat-pass interferometry to measure surface deformations with sub-centimeter precision. The L-band SAR (NASA, 24 cm wavelength) penetrates dense canopies to image underlying ground deformation, while the S-band SAR (ISRO, 12 cm wavelength) is tuned for crop classification, soil moisture, and coastal dynamics.',
          hinglish: 'NISAR sub-centimeter precision se ground deformation measure karta hai. L-band dense forests penetrate karta hai, S-band crop moisture aur coastal mapping ke liye tuned hai.',
        },
        constitutionalOrPolicyArticles: ['Outer Space Treaty 1967', 'Indian Space Policy 2023', 'Disaster Management Act 2005 (NDMA Data Integration)'],
        prelimsMultiStatementQuestion: {
          gsPaper: 'GS Paper 3 (Science & Tech)',
          pyqTrendLink: 'UPSC CSE Prelims 2016 (Astrosat) & 2022 (Space Debris) pattern',
          question: {
            hi: 'इसरो-नासा संयुक्त उपग्रह मिशन "NISAR" के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:',
            en: 'With reference to the ISRO-NASA joint satellite mission "NISAR", consider the following statements:',
            hinglish: 'ISRO-NASA joint mission "NISAR" ke bare me nimn statements par dhyan dein:',
          },
          statements: {
            hi: [
              '1. यह विश्व का पहला ऐसा पृथ्वी-अवलोकन उपग्रह है जो एक साथ एल-बैंड और एस-बैंड दोहरी रडार आवृत्तियों का उपयोग करता है।',
              '2. इसमें प्रयुक्त एल-बैंड रडार पूरी तरह से भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) द्वारा विकसित किया गया है।',
              '3. इसे श्रीहरिकोटा के सतीश धवन अंतरिक्ष केंद्र से इसरो के जीएसएलवी (GSLV Mk-II) रॉकेट द्वारा प्रक्षेपित किया जाएगा।',
            ],
            en: [
              '1. It is the world’s first earth observation satellite to simultaneously operate in dual L-band and S-band radar frequencies.',
              '2. The L-band Synthetic Aperture Radar on board was entirely developed by the Indian Space Research Organisation (ISRO).',
              '3. It is scheduled to be launched from the Satish Dhawan Space Centre in Sriharikota using ISRO’s GSLV rocket.',
            ],
            hinglish: [
              '1. Yeh world ka pehla dual L-band aur S-band radar satellite hai.',
              '2. Iska L-band radar entirely ISRO dwara develop kiya gaya hai.',
              '3. Ise Sriharikota se GSLV rocket dwara launch kiya jayega.',
            ],
          },
          options: [
            { label: 'A', text: { hi: 'केवल 1 और 2', en: '1 and 2 only', hinglish: '1 aur 2 only' } },
            { label: 'B', text: { hi: 'केवल 1 और 3', en: '1 and 3 only', hinglish: '1 aur 3 only' } },
            { label: 'C', text: { hi: 'केवल 2 और 3', en: '2 and 3 only', hinglish: '2 aur 3 only' } },
            { label: 'D', text: { hi: '1, 2 और 3', en: '1, 2 and 3', hinglish: '1, 2 aur 3' } },
          ],
          correctIndex: 1, // B: 1 and 3 only
          explanation: {
            hi: 'कथन 2 गलत है क्योंकि L-बैंड रडार NASA/JPL द्वारा निर्मित किया गया है, जबकि S-बैंड रडार और स्पेसक्राफ्ट बस ISRO द्वारा निर्मित किए गए हैं। कथन 1 और 3 सही हैं। यह GSLV F16 द्वारा लो अर्थ ऑर्बिट (LEO) में भेजा जाएगा।',
            en: 'Statement 2 is incorrect because the L-band SAR was designed and manufactured by NASA/JPL. ISRO developed the S-band SAR, spacecraft bus, and provides the launch vehicle (GSLV). Statements 1 and 3 are correct.',
            hinglish: 'Statement 2 galat hai kyunki L-band NASA ne banaya hai aur S-band ISRO ne banaya hai. Launching vehicle GSLV hai.',
          },
        },
        mainsQuestion: {
          gsPaper: 'GS Paper 3',
          marks: 15,
          wordCount: 250,
          question: {
            hi: '"सिंथेटिक एपर्चर रडार (SAR) आधारित अंतरिक्ष मिशन हिमालयी पारिस्थितिकी तंत्र में हिमनद झीलों के फटने से आने वाली बाढ़ (GLOF) और भूस्खलन के पूर्व चेतावनी तंत्र में किस प्रकार क्रांतिकारी परिवर्तन ला सकते हैं?" विस्तार से समझाइए। (15 अंक, 250 शब्द)',
            en: '"How can Synthetic Aperture Radar (SAR) based satellite systems revolutionize early warning protocols for Glacial Lake Outburst Floods (GLOFs) and catastrophic landslides across fragile Himalayan geographies?" Elaborate. (15 Marks, 250 Words)',
            hinglish: 'SAR satellite systems Himalayan GLOF aur landslide early warning protocols ko kaise revolutionize kar sakte hain? Detail me discuss karein. (15 Marks, 250 Words)',
          },
          modelAnswerFramework: {
            introduction: {
              hi: 'सिक्किम (ल्होनक झील 2023) और उत्तराखंड (जोशीमठ भूधंसाव) के उदाहरणों के साथ हिमालय की नाजुक भू-आकृति और SAR की मिलीमीटर-स्तरीय विस्थापन क्षमता का परिचय दें।',
              en: 'Contextualize with recent South Lhonak GLOF (Sikkim) and Joshimath subsidence; define SAR interferometry and its all-weather, day-and-night sub-centimeter deformation tracking.',
              hinglish: 'Sikkim GLOF aur Joshimath subsidence ka context dete hue SAR technology ka all-weather advantage batayein.',
            },
            dimensions: [
              {
                title: { hi: 'आपदा प्रबंधन में तकनीकी क्षमता (Technical Capabilities)', en: 'Technical Capabilities in Disaster Mitigation', hinglish: 'Disaster Mitigation Tech' },
                points: {
                  hi: [
                    'ऑप्टिकल उपग्रह बादलों व बर्फबारी में सतह नहीं देख पाते; SAR माइक्रोवेव स्पेक्ट्रम होने के कारण बादलों को भेद सकता है।',
                    'इंटरफेरोमेट्री (InSAR) तकनीक से पहाड़ियों में 1-2 मिमी के दरार या झुकाव का महीनों पहले पता लगाया जा सकता है।',
                    'हिमनद झीलों के तटबंधों (Moraine dams) के कमजोर होने का समय रहते पूर्वानुमान।',
                  ],
                  en: [
                    'All-weather penetration: Unlike optical sensors blinded by monsoonal cloud cover, microwaves penetrate atmospheric clutter.',
                    'InSAR baseline change detection tracks millimeter-scale creeping prior to sudden mass slope failure.',
                    'Real-time volumetric expansion tracking of proglacial moraine-dammed lakes.',
                  ],
                  hinglish: [
                    'Monsoon clouds ko penetrate karke 24x7 monitoring.',
                    'InSAR slope failure se pehle millimeter-scale movement detect karta hai.',
                    'Glacial lakes ke expansion aur dam leakage ko track karta hai.',
                  ],
                },
              },
            ],
            challengesOrCounterpoints: {
              hi: ['दूरदराज के पहाड़ी क्षेत्रों में उपग्रह डेटा को तुरंत ज़मीनी प्रशासनिक चेतावनी में बदलने (Last-mile connectivity) का अभाव।'],
              en: ['Computational latency in processing massive petabyte SAR data into actionable localized civil defense alarms.'],
              hinglish: ['Ground alert transmission me delay aur last-mile warning reach.'],
            },
            wayForwardAndCommittees: {
              hi: ['राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) और इसरो के भुवन पोर्टल के बीच स्वचालित चेतावनी प्रणाली का एकीकरण।'],
              en: ['Integrate ISRO Bhuvan portal automated algorithmic flags with State Disaster Management Authorities (SDMA) SMS hubs.'],
              hinglish: ['NDMA aur ISRO Bhuvan ka real-time integration.'],
            },
            conclusion: {
              hi: 'अंतरिक्ष प्रौद्योगिकी केवल अनुसंधान का विषय नहीं, बल्कि हिमालयी क्षेत्र में जीवन और बुनियादी ढांचे की रक्षा का सर्वोच्च ढाल है।',
              en: 'Harnessing microwave SAR observation transforms reactive rescue operations into predictive, life-saving resilience.',
              hinglish: 'Space technology reactive disaster rescue ko proactive preventive shield me badalti hai.',
            },
          },
        },
      },

      sscRailwayDemand: {
        speedSummary: {
          hi: 'NISAR उपग्रह इसरो (भारत) और नासा (अमेरिका) का संयुक्त मिशन है। इसे श्रीहरिकोटा से GSLV रॉकेट से लॉन्च किया जाएगा। निसार का पूरा नाम नासा-इसरो सिंथेटिक एपर्चर रडार है।',
          en: 'NISAR is a joint mission between ISRO (India) and NASA (USA). To be launched via GSLV rocket from Sriharikota. Full form: NASA-ISRO Synthetic Aperture Radar.',
          hinglish: 'NISAR ISRO aur NASA ka joint satellite hai. Sriharikota se GSLV se launch hoga. Full form: NASA-ISRO Synthetic Aperture Radar.',
        },
        speedOneLiners: {
          hi: [
            '🔹 NISAR का फुल फॉर्म: NASA-ISRO Synthetic Aperture Radar',
            '🔹 किन दो देशों का मिशन: भारत (ISRO) और संयुक्त राज्य अमेरिका (NASA)',
            '🔹 प्रक्षेपण स्थल: सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा (आंध्र प्रदेश)',
            '🔹 लॉन्च व्हीकल (रॉकेट): GSLV Mk II (Geosynchronous Satellite Launch Vehicle)',
            '🔹 इसरो का स्थापना वर्ष: 15 अगस्त 1969',
            '🔹 इसरो का मुख्यालय: बेंगलुरु, कर्नाटक',
            '🔹 वर्तमान इसरो अध्यक्ष: एस. सोमनाथ (S. Somanath)',
            '🔹 राष्ट्रीय अंतरिक्ष दिवस: 23 अगस्त (चंद्रयान-3 की लैंडिंग के उपलक्ष्य में)',
          ],
          en: [
            '🔹 NISAR Full Form: NASA-ISRO Synthetic Aperture Radar',
            '🔹 Collaborating Agencies: ISRO (India) & NASA (USA)',
            '🔹 Launch Site: Satish Dhawan Space Centre, Sriharikota (AP)',
            '🔹 Rocket: GSLV Mk II',
            '🔹 ISRO Established: 15th August 1969',
            '🔹 ISRO Headquarters: Bengaluru, Karnataka',
            '🔹 Current ISRO Chairman: S. Somanath',
            '🔹 National Space Day: August 23 (commemorating Chandrayaan-3 soft landing)',
          ],
          hinglish: [
            '🔹 NISAR: NASA-ISRO Synthetic Aperture Radar',
            '🔹 ISRO (India) + NASA (USA) joint mission',
            '🔹 Launchpad: Sriharikota (Andhra Pradesh)',
            '🔹 Rocket: GSLV Mk II',
            '🔹 ISRO Founded: 15 August 1969, HQ: Bengaluru',
            '🔹 Space Day: 23 August',
          ],
        },
        staticGkHooks: [
          { key: 'Space Center Venue', value: { hi: 'सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा (पुलिकट झील के पास, आंध्र प्रदेश)', en: 'SDSC Sriharikota, Pulicat Lake, Andhra Pradesh', hinglish: 'Sriharikota near Pulicat lake, AP' } },
          { key: 'First Indian Satellite', value: { hi: 'आर्यभट्ट (19 अप्रैल 1975, सोवियत संघ के कॉस्मोस-3M से)', en: 'Aryabhata (19 April 1975)', hinglish: 'Aryabhata (1975)' } },
          { key: 'Father of Indian Space', value: { hi: 'डॉ. विक्रम साराभाई', en: 'Dr. Vikram Sarabhai', hinglish: 'Dr. Vikram Sarabhai' } },
        ],
        directMcq: {
          question: {
            hi: 'प्रसिद्ध अंतरिक्ष मिशन "NISAR" किन दो अंतरिक्ष अनुसंधान संस्थाओं का संयुक्त उपग्रह प्रोजेक्ट है?',
            en: 'The landmark earth-observation satellite project "NISAR" is a joint initiative between which two space agencies?',
            hinglish: 'Space mission "NISAR" kin do space agencies ka joint mission hai?',
          },
          options: {
            hi: ['A. ISRO और Roscosmos', 'B. ISRO और NASA', 'C. ISRO और JAXA', 'D. ISRO और ESA'],
            en: ['A. ISRO and Roscosmos', 'B. ISRO and NASA', 'C. ISRO and JAXA', 'D. ISRO and ESA'],
            hinglish: ['A. ISRO & Roscosmos', 'B. ISRO & NASA', 'C. ISRO & JAXA', 'D. ISRO & ESA'],
          },
          correctIndex: 1, // B: ISRO and NASA
          explanation: {
            hi: 'NISAR का अर्थ है NASA-ISRO Synthetic Aperture Radar। यह भारत के इसरो और अमेरिका के नासा का संयुक्त मिशन है।',
            en: 'NISAR stands for NASA-ISRO Synthetic Aperture Radar, a flagship joint mission between India and the USA.',
            hinglish: 'Correct answer B: ISRO aur NASA ka joint venture hai.',
          },
        },
        shortcutTrick: {
          title: { hi: 'NISAR नाम याद रखने का सूत्र', en: 'NISAR Name Decoded', hinglish: 'NISAR Name Trick' },
          mnemonic: 'N-I-S-A-R = N (NASA) + I (ISRO) + SAR (Synthetic Aperture Radar). नाम में ही दोनों एजेंसियां शामिल हैं!',
        },
      },

      bankingDemand: {
        financialAngle: {
          hi: 'भारतीय अंतरिक्ष नीति 2023 और एफडीआई नीति सुधारों के तहत उपग्रह निर्माण में 100% तक प्रत्यक्ष विदेशी निवेश (74% तक ऑटोमैटिक रूट) की अनुमति दी गई है, जिससे न्यूस्पेस इंडिया लिमिटेड (NSIL) और निजी कंपनियों के लिए अरबों डॉलर का बाज़ार खुला है।',
          en: 'Indian Space Policy 2023 and amended FDI norms permit up to 100% foreign direct investment in space sector (74% under automatic route for satellite manufacturing), generating major institutional funding opportunities for space-tech startups.',
          hinglish: 'Space FDI policy me satellite manufacturing me 74% automatic route allowed hai. Space commerce badh raha hai.',
        },
        keyFinancialTerms: [
          {
            term: 'NewSpace India Limited (NSIL)',
            definition: {
              hi: 'अंतरिक्ष विभाग के प्रशासनिक नियंत्रण में भारत सरकार की पूर्ण स्वामित्व वाली वाणिज्यिक शाखा (स्थापना 2019, मुख्यालय बेंगलुरु)।',
              en: 'Commercial arm of Department of Space, established in 2019 to commercially market Indian space products globally.',
              hinglish: 'Commercial arm of ISRO / Dept of Space (Founded 2019).',
            },
          },
          {
            term: 'IN-SPACe (Indian National Space Promotion and Authorization Centre)',
            definition: {
              hi: 'निजी कंपनियों को इसरो की सुविधाओं का उपयोग करने और अंतरिक्ष गतिविधियों की अनुमति देने वाली एकल-खिड़की नोडल एजेंसी।',
              en: 'Autonomous single-window nodal agency to authorize and foster private sector participation in space activities.',
              hinglish: 'Single window regulator for private space companies.',
            },
          },
        ],
        bankingDirectMcq: {
          question: {
            hi: 'भारतीय अंतरिक्ष क्षेत्र में उपग्रह विनिर्माण एवं संचालन (Satellite Manufacturing & Operation) के लिए स्वचालित मार्ग (Automatic Route) के तहत कितने प्रतिशत प्रत्यक्ष विदेशी निवेश (FDI) की अनुमति है?',
            en: 'Under amended FDI regulations in the Indian space sector, what percentage of FDI is permitted under the Automatic Route for satellite manufacturing and operations?',
            hinglish: 'Satellite manufacturing me Automatic Route ke tahat kitne percent FDI allowed hai?',
          },
          options: {
            hi: ['A. 49%', 'B. 51%', 'C. 74%', 'D. 100%'],
            en: ['A. 49%', 'B. 51%', 'C. 74%', 'D. 100%'],
            hinglish: ['A. 49%', 'B. 51%', 'C. 74%', 'D. 100%'],
          },
          correctIndex: 2, // C: 74%
          explanation: {
            hi: 'उपग्रह निर्माण और संचालन में 74% तक एफडीआई स्वचालित मार्ग (Automatic Route) से और 74% से अधिक सरकारी अनुमति से संभव है। प्रक्षेपण यानों (Launch vehicles) के लिए स्वचालित मार्ग 49% है।',
            en: 'Up to 74% FDI is allowed under automatic route for satellite manufacturing & data products (beyond 74% via government route). For launch vehicles, automatic limit is 49%.',
            hinglish: 'Satellite manufacturing me 74% automatic route allowed hai.',
          },
        },
        regulatoryEntity: 'Department of Space / IN-SPACe / DPIIT',
      },

      stateDefenceDemand: {
        strategicSignificance: {
          hi: 'निसार की रडार क्षमता भारत की वास्तविक नियंत्रण रेखा (LAC) और हिंद महासागर क्षेत्र (IOR) में सीमा पार बुनियादी ढांचे, सैन्य बंकरों और पुलों के निर्माण की 24x7 सटीक टोह लेने में रणनीतिक बढ़त देगी।',
          en: 'All-weather dual SAR provides continuous reconnaissance capabilities across remote border lines (Line of Actual Control) and maritime chokepoints regardless of cloud cover or darkness.',
          hinglish: 'Border infrastructure aur maritime movement ko day-and-night track karne ki strategic surveillance capability deta hai.',
        },
        defenceOrStateMcq: {
          question: {
            hi: 'भारतीय सेना और सामरिक बलों के लिए भारत की क्षेत्रीय उपग्रह नौवहन प्रणाली (Regional Navigation Satellite System) का आधिकारिक नाम क्या है?',
            en: 'What is the operational domestic name of India’s independent Regional Navigation Satellite System operated by ISRO?',
            hinglish: 'India ke independent navigation satellite system ka official operational name kya hai?',
          },
          options: {
            hi: ['A. गगन (GAGAN)', 'B. नाविक (NavIC)', 'C. दिशा (DISHA)', 'D. व्योम (VYOM)'],
            en: ['A. GAGAN', 'B. NavIC', 'C. DISHA', 'D. VYOM'],
            hinglish: ['A. GAGAN', 'B. NavIC', 'C. DISHA', 'D. VYOM'],
          },
          correctIndex: 1, // B: NavIC
          explanation: {
            hi: 'NavIC (Navigation with Indian Constellation) भारत का स्वदेशी जीपीएस जैसा नेविगेशन सिस्टम है, जिसे पहले IRNSS कहा जाता था।',
            en: 'NavIC (Navigation with Indian Constellation) is India’s sovereign regional satellite navigation system with 7 satellites in orbit.',
            hinglish: 'Correct answer B: NavIC (Navigation with Indian Constellation).',
          },
        },
        keyMilitaryOrStateFacts: {
          hi: ['नाविक (NavIC) का दायरा भारत और उसकी सीमाओं से 1500 किमी बाहर तक है।', 'भारत का पहला समर्पित सैन्य संचार उपग्रह GSAT-7 (रुक्मिणी) नौसेना के लिए है।'],
          en: ['NavIC coverage spans India plus 1,500 km beyond sovereign land borders.', 'GSAT-7 (Rukmini) was India’s first dedicated naval military communications satellite.'],
          hinglish: ['NavIC coverage 1500 km beyond Indian borders.', 'GSAT-7 Rukmini is Navy communication satellite.'],
        },
      },
    },
  },

  {
    id: 'ca-ucc-constitution-article44-2026',
    date: '2026-09-08',
    category: 'polity_governance',
    categoryLabel: { hi: 'संवैधानिक कानून व राजव्यवस्था', en: 'Constitutional Law & Polity', hinglish: 'Constitution & Polity' },
    categoryIcon: '⚖️',
    headline: {
      hi: 'समान नागरिक संहिता (UCC) पर राष्ट्रीय विमर्श; 22वें विधि आयोग की रिपोर्ट व संवैधानिक अनुच्छेद 44 का वैधानिक विश्लेषण',
      en: 'National Discourse on Uniform Civil Code (UCC); 22nd Law Commission Review & Constitutional Analysis of Article 44',
      hinglish: 'Uniform Civil Code (UCC) par national debate; Article 44 aur personal laws ka comprehensive analysis',
    },
    subHeadline: {
      hi: 'विवाह, तलाक, भरण-पोषण और उत्तराधिकार के कानूनों में एकरूपता बनाम अनुच्छेद 25-28 के तहत धार्मिक स्वतंत्रता की स्वायत्तता।',
      en: 'Balancing gender equality and secular uniform civil laws with cultural pluralism and tribal exemptions under Article 25 & Sixth Schedule.',
      hinglish: 'Gender justice aur uniform civil laws vs Article 25 religious freedom aur tribal protection.',
    },
    officialSource: 'Law Commission of India Consultation Gazette & Ministry of Law and Justice',
    readTimeMinutes: 5,
    importanceLevel: 'Very High (100% Exam Probability)',

    examDemandBreakdown: {
      whyExamsAskThisDifferently: {
        hi: 'UPSC में अनुच्छेद 44 (नीति निदेशक तत्व) बनाम मौलिक अधिकारों (अनुच्छेद 25-28) का संवैधानिक द्वंद्व, शाह बानो व सरला मुद्गल केस के निर्णय, और आदिवासी समाजों के 6ठी अनुसूची के संरक्षण पर विश्लेषणात्मक प्रश्न आएंगे। SSC/Railway केवल अनुच्छेद 44 और स्वतंत्र भारत में यूसीसी लागू करने वाले पहले राज्य (उत्तराखंड) के बारे में पूछेगा। State PSC में राज्य-विशिष्ट अधिनियम और लिव-इन रिलेशनशिप पंजीकरण प्रावधान पूछे जाएंगे।',
        en: 'UPSC explores doctrinal conflict between DPSP (Art 44) and Fundamental Rights (Art 25), landmark judicial precedents, and federal dynamics. SSC tests article number, first state to pass UCC. State PSC tests state law specific clauses.',
        hinglish: 'UPSC Constitutional jurisprudence aur judicial verdicts puchega; SSC Article 44 aur first state puchega; State PSC local state law clauses puchega.',
      },

      upscDemand: {
        gsPaper: 'GS Paper 2',
        analyticalContext: {
          hi: 'संविधान के भाग IV में अनुच्छेद 44 राज्य को "भारत के पूरे क्षेत्र में नागरिकों के लिए एक समान नागरिक संहिता सुनिश्चित करने" का प्रयास करने का निर्देश देता है। यह गैर-न्यायिक (Non-justiciable) है। मुख्य संवैधानिक बहस यह है कि क्या यूसीसी लैंगिक न्याय (Gender Justice - अनुच्छेद 14 और 15) को आगे बढ़ाती है, या यह अनुच्छेद 25 (अंतःकरण की स्वतंत्रता) और 29 (संस्कृति का संरक्षण) में हस्तक्षेप करती है।',
          en: 'Article 44 in Part IV of the Constitution directs the State to strive for a Uniform Civil Code across India. Since DPSPs are non-justiciable under Article 37, the core constitutional friction lies between Article 14 (Equality before law) & Article 15 (Prohibition of discrimination on grounds of sex) on one hand, and Article 25 (Freedom of religion) & Article 29 (Protection of minorities) on the other.',
          hinglish: 'Article 44 DPSP ka part hai. Gender justice (Articles 14, 15) vs Freedom of Religion (Articles 25, 29) ka balance core issue hai.',
        },
        constitutionalOrPolicyArticles: ['Article 44 (DPSP)', 'Article 25 to 28 (Freedom of Religion)', 'Article 37 (Non-justiciable nature of DPSP)', 'Special Marriage Act 1954'],
        prelimsMultiStatementQuestion: {
          gsPaper: 'GS Paper 2 (Indian Polity)',
          pyqTrendLink: 'UPSC CSE Prelims 2015 & 2020 DPSP questions',
          question: {
            hi: 'भारतीय संविधान में समान नागरिक संहिता (UCC) के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:',
            en: 'With reference to the Uniform Civil Code (UCC) in the Indian Constitution, consider the following statements:',
            hinglish: 'Indian Constitution me Uniform Civil Code (UCC) ke baare me nimn statements par dhyan dein:',
          },
          statements: {
            hi: [
              '1. यह संविधान के भाग III के अंतर्गत एक प्रवर्तनीय मौलिक अधिकार (Enforceable Fundamental Right) के रूप में सूचीबद्ध है।',
              '2. अनुच्छेद 44 राज्य को पूरे भारत में नागरिकों के लिए समान नागरिक संहिता लागू करने का प्रयास करने का निर्देश देता है।',
              '3. गोवा स्वतंत्र भारत में अपनी विधायिका द्वारा नया यूसीसी कानून पारित करने वाला पहला राज्य था।',
            ],
            en: [
              '1. It is enshrined as an enforceable Fundamental Right under Part III of the Constitution.',
              '2. Article 44 directs the State to endeavor to secure for citizens a uniform civil code throughout the territory of India.',
              '3. Goa was the first state in independent India whose elected state assembly enacted a newly drafted UCC bill.',
            ],
            hinglish: [
              '1. Yeh Part III ke under enforceable Fundamental Right hai.',
              '2. Article 44 State ko poore India me UCC secure karne ka nirdesh deta hai.',
              '3. Goa independent India ka pehla state tha jisne assembly se naya UCC bill pass kiya.',
            ],
          },
          options: [
            { label: 'A', text: { hi: 'केवल 1 और 2', en: '1 and 2 only', hinglish: '1 aur 2 only' } },
            { label: 'B', text: { hi: 'केवल 2', en: '2 only', hinglish: '2 only' } },
            { label: 'C', text: { hi: 'केवल 2 और 3', en: '2 and 3 only', hinglish: '2 aur 3 only' } },
            { label: 'D', text: { hi: '1, 2 और 3', en: '1, 2 and 3', hinglish: '1, 2 aur 3' } },
          ],
          correctIndex: 1, // B: 2 only
          explanation: {
            hi: 'कथन 1 गलत है क्योंकि यूसीसी भाग IV (नीति निदेशक तत्व) में अनुच्छेद 44 के तहत है, भाग III (मौलिक अधिकार) में नहीं। कथन 3 भी गलत है क्योंकि गोवा में 1867 का पुर्तगाली नागरिक संहिता (Portuguese Civil Code) लागू था; स्वतंत्र भारत में नया यूसीसी कानून पारित करने वाला पहला राज्य उत्तराखंड (2024) बना। अतः केवल कथन 2 सही है।',
            en: 'Statement 1 is incorrect because UCC is in Part IV (DPSP), not Part III. Statement 3 is incorrect because Goa retained its 1867 Portuguese Civil Code; Uttarakhand became the first state in post-independence India to draft and pass a new UCC legislation in 2024. Therefore, only Statement 2 is correct.',
            hinglish: 'Statement 1 galat hai (yeh DPSP hai). Statement 3 galat hai kyunki independent India me pehla naya UCC Uttarakhand ne pass kiya (Goa me Portuguese code 1867 se tha). Only 2 is correct.',
          },
        },
        mainsQuestion: {
          gsPaper: 'GS Paper 2',
          marks: 15,
          wordCount: 250,
          question: {
            hi: '"समान नागरिक संहिता का मूल लक्ष्य विभिन्न धार्मिक संहिताओं पर एकरूपता थोपना नहीं, बल्कि सभी महिलाओं के लिए विवाह, तलाक और उत्तराधिकार में न्यायसंगत समानता सुनिश्चित करना होना चाहिए।" सर्वोच्च न्यायालय के प्रमुख निर्णयों के आलोक में परीक्षण कीजिए। (15 अंक, 250 शब्द)',
            en: '"The core philosophy of a Uniform Civil Code should not be majoritarian uniformity, but guaranteeing constitutional gender justice across all personal laws." Examine in light of landmark Supreme Court rulings. (15 Marks, 250 Words)',
            hinglish: 'UCC ka core philosophy majoritarian uniformity nahi, balki sabhi women ke liye constitutional gender justice hona chahiye. SC verdicts ke context me examine karein. (15 Marks, 250 Words)',
          },
          modelAnswerFramework: {
            introduction: {
              hi: 'अनुच्छेद 44 और डॉ. बी.आर. अंबेडकर के संविधान सभा में दिए गए वक्तव्य (कि यूसीसी को स्वैच्छिक और क्रमिक रूप से आगे बढ़ाया जाना चाहिए) से शुरुआत करें।',
              en: 'Quote Article 44 and Dr. B.R. Ambedkar’s constituent assembly vision that personal laws must evolve progressively towards constitutional gender justice.',
              hinglish: 'Article 44 aur Dr. Ambedkar ke constituent assembly speech se shuru karein.',
            },
            dimensions: [
              {
                title: { hi: 'प्रमुख न्यायिक दृष्टांत (Landmark Judicial Precedents)', en: 'Landmark Judicial Precedents', hinglish: 'Landmark SC Verdicts' },
                points: {
                  hi: [
                    'शाह बानो मामला (1985): सीआरपीसी 125 के तहत मुस्लिम महिलाओं को भरण-पोषण का अधिकार, जिसमें न्यायालय ने यूसीसी लागू करने की आवश्यकता जताई।',
                    'सरला मुद्गल मामला (1995): दूसरे विवाह के लिए धर्म परिवर्तन पर रोक लगाते हुए द्वि-विवाह को अवैध ठहराया।',
                    'शायरा बानो मामला (2017): तीन तलाक (तलाक-ए-बिद्दत) को असंवैधानिक घोषित किया।',
                  ],
                  en: [
                    'Shah Bano Case (1985): Affirmed divorced women’s right to maintenance under Section 125 CrPC irrespective of personal law.',
                    'Sarla Mudgal Case (1995): Prohibited solemnization of second marriage through opportunistic religious conversion.',
                    'Shayara Bano Case (2017): Struck down unilateral Triple Talaq as violative of Article 14.',
                  ],
                  hinglish: [
                    'Shah Bano case (1985): Sec 125 CrPC maintenance right.',
                    'Sarla Mudgal case (1995): Conversion for second marriage banned.',
                    'Shayara Bano case (2017): Triple talaq unconstitutional.',
                  ],
                },
              },
              {
                title: { hi: 'लैंगिक न्याय बनाम सांस्कृतिक विविधता', en: 'Gender Justice vs Cultural Pluralism', hinglish: 'Gender Justice vs Diversity' },
                points: {
                  hi: [
                    'उत्तराधिकार और संपत्ति अधिकारों में बेटियों को समान अधिकार देना।',
                    'आदिवासी समुदायों (छठी अनुसूची और 5वीं अनुसूची) की विशिष्ट प्रथागत परंपराओं को संरक्षण देना।',
                  ],
                  en: [
                    'Eliminating discriminatory inheritance and guardianship provisions across personal codes.',
                    'Safeguarding customary autonomy of tribal communities (Schedule V & VI regions).',
                  ],
                  hinglish: ['Inheritance me daughters ko equal rights.', 'Tribal customs ko protection.'],
                },
              },
            ],
            challengesOrCounterpoints: {
              hi: ['21वें विधि आयोग (2018) का विचार: "इस चरण में यूसीसी न तो आवश्यक है और न ही वांछनीय; इसके स्थान पर प्रत्येक व्यक्तिगत कानून में आंतरिक सुधार किए जाने चाहिए।"'],
              en: ['21st Law Commission Consultation Paper (2018): UCC was "neither necessary nor desirable at this stage"; reform within personal laws was prioritized.'],
              hinglish: ['21st Law Commission ne kaha tha ki individual personal laws ke andar gender reform pehle ho.'],
            },
            wayForwardAndCommittees: {
              hi: ['सभी धर्मों के विवाह, तलाक और उत्तराधिकार कानूनों में भेदभावपूर्ण धाराओं को पहले हटाना।', 'आम सहमति और हितधारकों के साथ संवाद।'],
              en: ['Harmonize discriminatory clauses across all civil codes incrementally before imposing a single monolithic statute.'],
              hinglish: ['Step-by-step discrimination khatam karein.'],
            },
            conclusion: {
              hi: 'समान नागरिक संहिता को धर्म के विरुद्ध नहीं, बल्कि मानवाधिकारों और महिला गरिमा के पक्ष में देखा जाना चाहिए।',
              en: 'A transformative UCC must be framed not as an assault on religious identity, but as an emancipatory charter of gender dignity.',
              hinglish: 'UCC ko religious attack nahi balki women dignity aur gender equality ke roop me implement hona chahiye.',
            },
          },
        },
      },

      sscRailwayDemand: {
        speedSummary: {
          hi: 'संविधान के अनुच्छेद 44 में समान नागरिक संहिता (UCC) का प्रावधान है। यह नीति निदेशक तत्वों (DPSP, भाग 4) में आता है, जो आयरलैंड के संविधान से लिए गए हैं। स्वतंत्र भारत में यूसीसी विधेयक पारित करने वाला पहला राज्य उत्तराखंड है।',
          en: 'Uniform Civil Code is covered under Article 44 in Part IV (Directive Principles of State Policy, borrowed from Ireland). First state in independent India to pass UCC is Uttarakhand.',
          hinglish: 'Article 44 me UCC hai. DPSP Part IV me aata hai (Ireland se borrowed). Independent India me pehla UCC state Uttarakhand hai.',
        },
        speedOneLiners: {
          hi: [
            '🔹 UCC किस अनुच्छेद में है: अनुच्छेद 44 (Article 44)',
            '🔹 UCC संविधान के किस भाग में है: भाग IV (नीति निदेशक तत्व - DPSP)',
            '🔹 DPSP किस देश से लिए गए हैं: आयरलैंड (Ireland)',
            '🔹 क्या DPSP अदालत में प्रवर्तनीय (Enforceable) हैं: नहीं (अनुच्छेद 37 के अनुसार गैर-न्यायिक)',
            '🔹 स्वतंत्र भारत में नया UCC पारित करने वाला पहला राज्य: उत्तराखंड (Uttarakhand, 2024)',
            '🔹 पुर्तगाली नागरिक संहिता (1867) किस राज्य में पहले से लागू थी: गोवा (Goa)',
            '🔹 संविधान सभा में प्रारूप समिति के अध्यक्ष: डॉ. बी.आर. अंबेडकर',
          ],
          en: [
            '🔹 Article for UCC: Article 44',
            '🔹 Constitution Part: Part IV (DPSPs)',
            '🔹 Source Country of DPSPs: Ireland',
            '🔹 Are DPSPs enforceable in court?: No (Non-justiciable under Article 37)',
            '🔹 First state in independent India to pass UCC: Uttarakhand (2024)',
            '🔹 State with Portuguese Civil Code 1867: Goa',
            '🔹 Chairman of Drafting Committee: Dr. B. R. Ambedkar',
          ],
          hinglish: [
            '🔹 Article: 44',
            '🔹 Part: Part IV (DPSP)',
            '🔹 Borrowed from: Ireland',
            '🔹 Enforceable?: No (Article 37)',
            '🔹 First post-independence state: Uttarakhand (2024)',
            '🔹 Pre-existing civil code state: Goa (1867)',
          ],
        },
        staticGkHooks: [
          { key: 'Article 44 Category', value: { hi: 'नीति निदेशक तत्व (अनुच्छेद 36 से 51)', en: 'Directive Principles (Articles 36 to 51)', hinglish: 'DPSP (Articles 36 to 51)' } },
          { key: 'Uttarakhand UCC Committee Head', value: { hi: 'न्यायमूर्ति (सेवानिवृत्त) रंजना प्रकाश देसाई', en: 'Justice (Retd) Ranjana Prakash Desai', hinglish: 'Justice Ranjana Prakash Desai' } },
        ],
        directMcq: {
          question: {
            hi: 'भारतीय संविधान के किस अनुच्छेद में "समान नागरिक संहिता" (Uniform Civil Code) का उल्लेख किया गया है?',
            en: 'Under which Article of the Indian Constitution is the "Uniform Civil Code" provided?',
            hinglish: 'Indian Constitution ke kis Article me Uniform Civil Code (UCC) ka provision hai?',
          },
          options: {
            hi: ['A. अनुच्छेद 40', 'B. अनुच्छेद 44', 'C. अनुच्छेद 48', 'D. अनुच्छेद 50'],
            en: ['A. Article 40', 'B. Article 44', 'C. Article 48', 'D. Article 50'],
            hinglish: ['A. Article 40', 'B. Article 44', 'C. Article 48', 'D. Article 50'],
          },
          correctIndex: 1, // B: Article 44
          explanation: {
            hi: 'अनुच्छेद 44 में राज्य को पूरे भारत में नागरिकों के लिए समान नागरिक संहिता का प्रयास करने का निर्देश दिया गया है। अनुच्छेद 40 ग्राम पंचायतों के गठन से संबंधित है।',
            en: 'Article 44 deals with Uniform Civil Code. Article 40 deals with organization of Village Panchayats.',
            hinglish: 'Correct answer B: Article 44.',
          },
        },
        shortcutTrick: {
          title: { hi: 'अनुच्छेद 44 याद रखने का आसान ट्रिक', en: 'Article 44 Easy Mnemonic', hinglish: 'Article 44 Trick' },
          mnemonic: '4 और 4 दोनों एक समान (Equal) हैं! जब संख्याएं समान (4 = 4) हैं, तो संहिता भी समान नागरिक संहिता (UCC) होगी!',
        },
      },

      bankingDemand: {
        financialAngle: {
          hi: 'समान नागरिक संहिता से महिलाओं को पैतृक संपत्ति, बैंक खातों में उत्तराधिकार प्रमाण पत्र (Succession Certificate), और संयुक्त संपत्तियों में समान कानूनी अधिकार मिलेंगे, जिससे बैंक नॉमिनेशन और संपत्ति विवादों के निपटारे में स्पष्टता आएगी।',
          en: 'UCC standardizes succession and property rights, directly streamlining banking nominee disputes, transmission of deceased depositor assets, and women’s credit collateral ownership.',
          hinglish: 'Bank account nominee aur inheritance claims me legal uniformity aayegi.',
        },
        keyFinancialTerms: [
          {
            term: 'Succession Certificate',
            definition: {
              hi: 'मृतक व्यक्ति के बैंक खातों, प्रतिभूतियों और ऋणों की वसूली हेतु अदालत द्वारा जारी कानूनी प्रमाण पत्र।',
              en: 'A legal document sanctioned by court to realize debts and securities of a deceased person.',
              hinglish: 'Court certificate for claiming deceased assets in banks.',
            },
          },
          {
            term: 'Coparcenary Rights',
            definition: {
              hi: 'पैतृक संपत्ति में जन्म से प्राप्त अविभाज्य कानूनी अधिकार (2005 के हिंदू उत्तराधिकार संशोधन द्वारा बेटियों को भी प्राप्त)।',
              en: 'Equal birthright in ancestral property conferred upon daughters under the Hindu Succession Amendment Act 2005.',
              hinglish: 'Birthright in ancestral property for daughters.',
            },
          },
        ],
        bankingDirectMcq: {
          question: {
            hi: 'बैंकों में किसी मृत जमाकर्ता (Deceased Depositor) के खाते में बिना वसीयत (Without Will) के दावे के निपटारे हेतु प्राथमिक कानूनी प्रमाण पत्र क्या होता है?',
            en: 'Which legal instrument is primarily issued by a civil court to settle movable banking assets of a deceased person without a will?',
            hinglish: 'Deceased depositor ke movable bank funds claim karne ke liye civil court kya issue karta hai?',
          },
          options: {
            hi: ['A. वसीयतनामा (Probate of Will)', 'B. उत्तराधिकार प्रमाण पत्र (Succession Certificate)', 'C. पावर ऑफ अटॉर्नी', 'D. अनापत्ति प्रमाण पत्र (NOC)'],
            en: ['A. Probate of Will', 'B. Succession Certificate', 'C. Power of Attorney', 'D. NOC'],
            hinglish: ['A. Probate of Will', 'B. Succession Certificate', 'C. Power of Attorney', 'D. NOC'],
          },
          correctIndex: 1, // B: Succession Certificate
          explanation: {
            hi: 'चल संपत्तियों (बैंक जमा, शेयर) के लिए उत्तराधिकार प्रमाण पत्र (Succession Certificate) भारतीय उत्तराधिकार अधिनियम 1925 के तहत जारी किया जाता है। अचल संपत्ति के लिए लेटर ऑफ एडमिनिस्ट्रेशन चाहिए होता है।',
            en: 'A Succession Certificate is issued under the Indian Succession Act 1925 for movable assets like bank balances and securities.',
            hinglish: 'Correct answer B: Succession Certificate.',
          },
        },
        regulatoryEntity: 'Indian Succession Act 1925 / Ministry of Law & Justice',
      },

      stateDefenceDemand: {
        strategicSignificance: {
          hi: 'सीमावर्ती राज्यों (जैसे पूर्वोत्तर भारत) में जनजातीय समाजों के पारंपरिक रीति-रिवाजों और छठी अनुसूची के विशेषाधिकारों का संरक्षण आंतरिक सुरक्षा और सामाजिक सौहार्द बनाए रखने के लिए अनिवार्य है।',
          en: 'Preserving customary tribal laws in border states (Schedule VI of NE India) is pivotal to sustaining social cohesion and national security in sensitive peripheral belts.',
          hinglish: 'Border states me tribal customary autonomy internal peace aur border security ke liye vital hai.',
        },
        defenceOrStateMcq: {
          question: {
            hi: 'संविधान की किस अनुसूची के तहत असम, मेघालय, त्रिपुरा और मिजोरम के जनजातीय क्षेत्रों के प्रशासन हेतु स्वायत्त जिला परिषदों (ADCs) का गठन किया गया है?',
            en: 'Under which Schedule of the Indian Constitution are Autonomous District Councils (ADCs) established for tribal areas of Assam, Meghalaya, Tripura, and Mizoram?',
            hinglish: 'Assam, Meghalaya, Tripura, Mizoram ke tribal administration ke liye kaun si Schedule hai?',
          },
          options: {
            hi: ['A. 5वीं अनुसूची', 'B. 6ठी अनुसूची', 'C. 7वीं अनुसूची', 'D. 8वीं अनुसूची'],
            en: ['A. Fifth Schedule', 'B. Sixth Schedule', 'C. Seventh Schedule', 'D. Eighth Schedule'],
            hinglish: ['A. 5th Schedule', 'B. 6th Schedule', 'C. 7th Schedule', 'D. 8th Schedule'],
          },
          correctIndex: 1, // B: Sixth Schedule
          explanation: {
            hi: '6ठी अनुसूची (Sixth Schedule) असम, मेघालय, त्रिपुरा और मिजोरम के 10 स्वायत्त जिला परिषदों को विशेष विधायी और न्यायिक शक्तियां देती है।',
            en: 'The Sixth Schedule governs the administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram (AMTM) through Autonomous District Councils.',
            hinglish: 'Correct answer B: Sixth Schedule (AMTM states).',
          },
        },
        keyMilitaryOrStateFacts: {
          hi: ['6ठी अनुसूची केवल 4 राज्यों पर लागू होती है: असम, मेघालय, त्रिपुरा, मिजोरम (ट्रिक: AMTM)।', 'उत्तराखंड विधानसभा ने फरवरी 2024 में देश का पहला राज्य यूसीसी विधेयक पारित किया।'],
          en: ['Sixth Schedule applies exclusively to 4 states: Assam, Meghalaya, Tripura, Mizoram (AMTM).', 'Uttarakhand enacted India’s first post-independence state UCC bill in Feb 2024.'],
          hinglish: ['Sixth Schedule: AMTM states only.', 'Uttarakhand passed first state UCC in 2024.'],
        },
      },
    },
  },

  {
    id: 'ca-green-hydrogen-sight-2026',
    date: '2026-09-08',
    category: 'environment_ecology',
    categoryLabel: { hi: 'पर्यावरण, नवीकरणीय ऊर्जा व जलवायु', en: 'Environment & Green Energy', hinglish: 'Environment & Energy' },
    categoryIcon: '🌿',
    headline: {
      hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन (SIGHT प्रोग्राम) के तहत इलेक्ट्रोलाइज़र निर्माण व उत्पादन प्रोत्साहन का दूसरा चरण जारी',
      en: 'National Green Hydrogen Mission Launches Tranche-II under SIGHT Scheme; Accelerates India’s Net-Zero 2070 Roadmap',
      hinglish: 'National Green Hydrogen Mission SIGHT Scheme Tranche-II launch; 2070 Net-Zero target accelerated',
    },
    subHeadline: {
      hi: '₹19,744 करोड़ के कुल बजट में से भारी उद्योगों (स्टील, रिफाइनरी व उर्वरक) में फॉसिल ईंधन के प्रतिस्थापन हेतु वित्तीय प्रोत्साहन।',
      en: 'Incentives for domestic electrolyser manufacturing & green hydrogen production to decarbonize hard-to-abate sectors.',
      hinglish: 'Total outlay ₹19,744 crore; steel, refinery aur fertilizer sectors ko decarbonize karne ka target.',
    },
    officialSource: 'Ministry of New and Renewable Energy (MNRE) Press Release',
    readTimeMinutes: 4,
    importanceLevel: 'Very High (100% Exam Probability)',

    examDemandBreakdown: {
      whyExamsAskThisDifferently: {
        hi: 'UPSC में ग्रीन हाइड्रोजन के उत्पादन के वैज्ञानिक सिद्धांत (जल का इलेक्ट्रोलिसिस), ग्रे/ब्लू/ग्रीन हाइड्रोजन में अंतर, और यूरोपीय संघ के कार्बन बॉर्डर एडजस्टमेंट मैकेनिज्म (CBAM) का भारत के निर्यात पर प्रभाव पूछा जाएगा। SSC/Railway मिशन का कुल बजट (₹19,744 करोड़), नोडल मंत्रालय (MNRE), और नेट जीरो वर्ष (2070) पूछेगा। Banking इसमें ग्रीन बॉन्ड्स, ESG फ्रेमवर्क और प्रायोरिटी सेक्टर लेंडिंग (PSL) से जुड़े प्रश्न पूछेगा।',
        en: 'UPSC tests thermodynamics of electrolysis, comparative hydrogen spectrum, and international trade geopolitics (CBAM). SSC tests numerical outlay and dates. Banking tests green deposit guidelines and ESG bond yields.',
        hinglish: 'UPSC physics/chemistry of green hydrogen, CBAM impact puchega; SSC budget outlay aur target years puchega; Banking green bonds aur ESG investments puchega.',
      },

      upscDemand: {
        gsPaper: 'GS Paper 3',
        analyticalContext: {
          hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन 2030 तक प्रति वर्ष कम से कम 5 मिलियन मीट्रिक टन (MMT) हरित हाइड्रोजन उत्पादन क्षमता विकसित करने का लक्ष्य रखता है। इसके लिए लगभग 125 GW की नवीकरणीय ऊर्जा क्षमता जोड़ी जाएगी। यह भारत के 2030 तक 500 GW गैर-जीवाश्म ऊर्जा और 2070 तक शुद्ध शून्य (Net Zero) उत्सर्जन के "पंचामृत" संकल्पों को पूरा करने का मुख्य आधार है।',
          en: 'Targeting 5 MMT annual production by 2030 with ~125 GW dedicated renewable capacity, the mission underpins India’s "Panchamrit" commitments from COP26. Crucial challenge is reducing production cost from current ~$4-5/kg to ~$1.5-2/kg to compete with fossil grey hydrogen produced via Steam Methane Reforming (SMR).',
          hinglish: '2030 tak 5 MMT production aur 125 GW renewable capacity target hai. Panchamrit aur Net Zero 2070 ka core pillar hai.',
        },
        constitutionalOrPolicyArticles: ['Article 48A (Protection of Environment)', 'Article 51A(g) (Fundamental Duty to protect natural environment)', 'National Green Hydrogen Mission 2023'],
        prelimsMultiStatementQuestion: {
          gsPaper: 'GS Paper 3 (Environment & Energy)',
          pyqTrendLink: 'UPSC CSE Prelims 2019 & 2023 questions on Renewable Energy and Hydrogen fuel',
          question: {
            hi: 'हरित हाइड्रोजन (Green Hydrogen) और राष्ट्रीय हरित हाइड्रोजन मिशन के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:',
            en: 'With reference to Green Hydrogen and the National Green Hydrogen Mission, consider the following statements:',
            hinglish: 'Green Hydrogen aur National Green Hydrogen Mission ke baare me nimn statements par dhyan dein:',
          },
          statements: {
            hi: [
              '1. हरित हाइड्रोजन का उत्पादन नवीकरणीय ऊर्जा से संचालित जल के विद्युत अपघटन (Electrolysis of water) द्वारा किया जाता है, जिसमें उप-उत्पाद केवल ऑक्सीजन और जलवाष्प होते हैं।',
              '2. भारत ने 2030 तक प्रति वर्ष 50 मिलियन मीट्रिक टन (MMT) हरित हाइड्रोजन उत्पादन का लक्ष्य रखा है।',
              '3. SIGHT कार्यक्रम इस मिशन के तहत इलेक्ट्रोलाइज़र निर्माण और हाइड्रोजन उत्पादन दोनों के लिए वित्तीय प्रोत्साहन प्रदान करता है।',
            ],
            en: [
              '1. Green hydrogen is produced through the electrolysis of water powered by renewable energy, emitting only oxygen and water vapor as byproducts.',
              '2. India has set a target to produce 50 Million Metric Tonnes (MMT) of green hydrogen per annum by 2030.',
              '3. The SIGHT programme provides financial incentives for both domestic electrolyser manufacturing and green hydrogen production.',
            ],
            hinglish: [
              '1. Green hydrogen renewable energy se water electrolysis dwara produce hoti hai, emission me sirf oxygen nikalti hai.',
              '2. India ka 2030 tak target 50 MMT per annum hai.',
              '3. SIGHT programme electrolyser manufacturing aur green hydrogen production dono ke liye incentives deta hai.',
            ],
          },
          options: [
            { label: 'A', text: { hi: 'केवल 1 और 2', en: '1 and 2 only', hinglish: '1 aur 2 only' } },
            { label: 'B', text: { hi: 'केवल 1 और 3', en: '1 and 3 only', hinglish: '1 aur 3 only' } },
            { label: 'C', text: { hi: 'केवल 2 और 3', en: '2 and 3 only', hinglish: '2 aur 3 only' } },
            { label: 'D', text: { hi: '1, 2 और 3', en: '1, 2 and 3', hinglish: '1, 2 aur 3' } },
          ],
          correctIndex: 1, // B: 1 and 3 only
          explanation: {
            hi: 'कथन 2 गलत है क्योंकि 2030 का लक्ष्य 5 मिलियन मीट्रिक टन (5 MMT) है, न कि 50 MMT। कथन 1 और 3 सही हैं। SIGHT का पूर्ण रूप "Strategic Interventions for Green Hydrogen Transition" है।',
            en: 'Statement 2 is incorrect because the official target for 2030 is 5 Million Metric Tonnes (5 MMT), NOT 50 MMT. Statements 1 and 3 are correct. SIGHT stands for Strategic Interventions for Green Hydrogen Transition.',
            hinglish: 'Statement 2 galat hai (target 5 MMT hai, 50 MMT nahi). Statements 1 & 3 sahi hain.',
          },
        },
        mainsQuestion: {
          gsPaper: 'GS Paper 3',
          marks: 15,
          wordCount: 250,
          question: {
            hi: '"हरित हाइड्रोजन भारत की ऊर्जा सुरक्षा और भारी औद्योगिक डीकार्बोनाइजेशन का भविष्य है, किंतु उच्च उत्पादन लागत, जल की भारी खपत और परिवहन अवसंरचना की कमी इसके मार्ग में गंभीर चुनौतियां हैं।" मूल्यांकन कीजिए। (15 अंक, 250 शब्द)',
            en: '"Green Hydrogen represents the linchpin for India’s energy sovereignty and industrial decarbonization; however, prohibitive production costs, high water intensity, and transportation bottlenecks remain formidable hurdles." Evaluate. (15 Marks, 250 Words)',
            hinglish: 'Green Hydrogen India ki energy security aur industrial decarbonization ka key pillar hai, lekin high cost, water intensity aur logistics constraints challenges hain. Evaluate karein. (15 Marks, 250 Words)',
          },
          modelAnswerFramework: {
            introduction: {
              hi: 'भारत के वर्तमान जीवाश्म ईंधन आयात बिल ($150+ बिलियन) और भारत के नेट-जीरो 2070 लक्ष्य के संदर्भ में हरित हाइड्रोजन की भूमिका को रेखांकित करें।',
              en: 'Contextualize with India’s heavy crude/gas import dependence and the strategic mandate to replace fossil feedstock in steel, fertilizer, and petrochemicals.',
              hinglish: 'India ke import bill aur Net Zero 2070 target ke backdrop me define karein.',
            },
            dimensions: [
              {
                title: { hi: 'रणनीतिक लाभ (Strategic Advantages)', en: 'Strategic Advantages for India', hinglish: 'Key Advantages' },
                points: {
                  hi: [
                    'कच्चे तेल और प्राकृतिक गैस के आयात पर निर्भरता में भारी कमी।',
                    'स्टील उद्योग में कोक कोयले के स्थान पर ग्रीन हाइड्रोजन से डीआरआई (Direct Reduced Iron) उत्पादन।',
                    'यूरोपीय संघ के कार्बन टैक्स (CBAM) से भारतीय निर्यातकों को सुरक्षा।',
                  ],
                  en: [
                    'Forex savings: Drastic reduction in imported LNG and coking coal dependencies.',
                    'Decarbonizing hard-to-abate sectors: Direct Reduced Iron (DRI) steelmaking and green ammonia for fertilizers.',
                    'Shielding Indian exports against EU’s Carbon Border Adjustment Mechanism (CBAM) tariffs.',
                  ],
                  hinglish: [
                    'Forex import bill me reduction.',
                    'Steel DRI aur Fertilizer green ammonia decarbonization.',
                    'EU CBAM carbon tax se protection.',
                  ],
                },
              },
              {
                title: { hi: 'प्रमुख चुनौतियां (Key Bottlenecks)', en: 'Technical & Logistical Challenges', hinglish: 'Bottlenecks' },
                points: {
                  hi: [
                    'उच्च लागत: वर्तमान में ग्रीन हाइड्रोजन $4-5/किग्रा है जबकि ग्रे हाइड्रोजन $1.5/किग्रा है।',
                    'जल की तीव्रता: 1 किग्रा ग्रीन हाइड्रोजन के लिए लगभग 9-10 लीटर विशुद्ध विआयनीकृत (Deionized) पानी चाहिए।',
                    'परिवहन जटिलता: हाइड्रोजन का क्वथनांक -253°C है, जिसके लिए अत्यंत जटिल क्रायोजेनिक पाइपलाइन या अमोनिया कन्वर्जन चाहिए।',
                  ],
                  en: [
                    'Cost parity deficit: Green hydrogen (~$4-5/kg) is three times more expensive than fossil grey hydrogen (~$1.5-2/kg).',
                    'Water stress: Requires ~9-10 litres of ultra-pure demineralized water per kg of hydrogen produced.',
                    'Storage & embrittlement: Hydrogen gas causes steel embrittlement in pipelines; requires cryogenic liquefaction (-253°C) or ammonia cracking.',
                  ],
                  hinglish: [
                    'Cost 3x expensive hai grey hydrogen se.',
                    '9-10 litres deionized water per kg requirement.',
                    'Storage aur transport infrastructure underdeveloped hai.',
                  ],
                },
              },
            ],
            challengesOrCounterpoints: {
              hi: ['इलेक्ट्रोलाइज़र निर्माण में प्रयुक्त दुर्लभ धातुओं (प्लेटिनम, इरिडियम) की आपूर्ति शृंखला पर वैश्विक निर्भरता।'],
              en: ['Critical mineral dependencies (Iridium, Platinum, Nickel) for Proton Exchange Membrane (PEM) electrolysers.'],
              hinglish: ['Critical minerals supply chain dependency.'],
            },
            wayForwardAndCommittees: {
              hi: ['SIGHT योजना के तहत स्थानीय इलेक्ट्रोलाइज़र विनिर्माण को गति देना।', 'तटीय क्षेत्रों में अलवणीकरण (Desalination) संयंत्रों के साथ ग्रीन हाइड्रोजन हब स्थापित करना।'],
              en: ['Establish coastal Green Hydrogen Hubs co-located with seawater desalination and deep-water export ports.'],
              hinglish: ['Coastal desalination hubs aur domestic electrolysers par focus karein.'],
            },
            conclusion: {
              hi: 'यदि भारत उत्पादन लागत को $1.5-2/किग्रा तक लाने में सफल होता है, तो वह ऊर्जा आयातक से वैश्विक हरित ऊर्जा निर्यातक बन सकता है।',
              en: 'Achieving cost parity at $1.5/kg will transform India from a perennial energy consumer into a sovereign net energy exporter.',
              hinglish: 'India energy importer se global clean energy exporter ban sakta hai.',
            },
          },
        },
      },

      sscRailwayDemand: {
        speedSummary: {
          hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन का कुल परिव्यय ₹19,744 करोड़ है। नोडल मंत्रालय नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) है। भारत का नेट जीरो (शुद्ध शून्य कार्बन) लक्ष्य वर्ष 2070 है और 2030 तक 5 MMT हरित हाइड्रोजन का उत्पादन लक्ष्य है।',
          en: 'National Green Hydrogen Mission total outlay is ₹19,744 crore. Nodal ministry: Ministry of New and Renewable Energy (MNRE). India’s Net Zero target year: 2070; 2030 target: 5 MMT green hydrogen per annum.',
          hinglish: 'Mission budget: ₹19,744 crore. Nodal ministry: MNRE. Net Zero Target: 2070. 2030 Green Hydrogen Target: 5 MMT.',
        },
        speedOneLiners: {
          hi: [
            '🔹 राष्ट्रीय हरित हाइड्रोजन मिशन का बजट: ₹19,744 करोड़',
            '🔹 2030 तक हरित हाइड्रोजन उत्पादन लक्ष्य: 5 मिलियन मीट्रिक टन (5 MMT)',
            '🔹 भारत का शुद्ध शून्य कार्बन उत्सर्जन (Net-Zero) लक्ष्य वर्ष: 2070',
            '🔹 2030 तक गैर-जीवाश्म ऊर्जा क्षमता लक्ष्य: 500 गीगावाट (500 GW)',
            '🔹 SIGHT का फुल फॉर्म: Strategic Interventions for Green Hydrogen Transition',
            '🔹 नोडल मंत्रालय: नवीन और नवीकरणीय ऊर्जा मंत्रालय (MNRE)',
            '🔹 अंतरराष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय: गुरुग्राम, हरियाणा (भारत)',
            '🔹 पहली हाइड्रोजन ट्रेन का परीक्षण: जींद-सोनीपत खंड (उत्तर रेलवे, हरियाणा)',
          ],
          en: [
            '🔹 Green Hydrogen Mission Outlay: ₹19,744 crore',
            '🔹 2030 Target: 5 Million Metric Tonnes (5 MMT) annually',
            '🔹 India Net-Zero Target Year: 2070',
            '🔹 Non-fossil renewable target by 2030: 500 GW',
            '🔹 SIGHT Full Form: Strategic Interventions for Green Hydrogen Transition',
            '🔹 Nodal Ministry: Ministry of New and Renewable Energy (MNRE)',
            '🔹 International Solar Alliance (ISA) HQ: Gurugram, Haryana (India)',
            '🔹 India’s First Hydrogen Train Trial Section: Jind-Sonipat (Northern Railway)',
          ],
          hinglish: [
            '🔹 Budget Outlay: ₹19,744 crore',
            '🔹 2030 Target: 5 MMT per year',
            '🔹 Net-Zero Year: 2070',
            '🔹 Non-fossil capacity: 500 GW by 2030',
            '🔹 SIGHT: Strategic Interventions for Green Hydrogen Transition',
            '🔹 ISA HQ: Gurugram, Haryana',
            '🔹 First Hydrogen Train: Jind-Sonipat section',
          ],
        },
        staticGkHooks: [
          { key: 'ISA Headquarters', value: { hi: 'ग्वाल पहाड़ी, गुरुग्राम (हरियाणा)', en: 'Gurugram, Haryana', hinglish: 'Gurugram, Haryana' } },
          { key: 'Net-Zero Declaration', value: { hi: 'COP26 ग्लासगो शिखर सम्मेलन (2021) में प्रधानमंत्री मोदी द्वारा', en: 'COP26 Glasgow Summit (2021)', hinglish: 'COP26 Glasgow (2021)' } },
          { key: 'Element with lowest atomic mass', value: { hi: 'हाइड्रोजन (परमाणु क्रमांक 1, परमाणु भार 1.008)', en: 'Hydrogen (Atomic No. 1)', hinglish: 'Hydrogen (H, Atomic number 1)' } },
        ],
        directMcq: {
          question: {
            hi: 'भारत सरकार के राष्ट्रीय हरित हाइड्रोजन मिशन के तहत वर्ष 2030 तक प्रति वर्ष कितने मिलियन मीट्रिक टन (MMT) हरित हाइड्रोजन उत्पादन का लक्ष्य निर्धारित किया गया है?',
            en: 'Under the National Green Hydrogen Mission, what is the annual production target of green hydrogen to be achieved by the year 2030?',
            hinglish: 'Green Hydrogen Mission ke tahat 2030 tak kitne MMT production ka target rakha gaya hai?',
          },
          options: {
            hi: ['A. 1 MMT', 'B. 5 MMT', 'C. 10 MMT', 'D. 25 MMT'],
            en: ['A. 1 MMT', 'B. 5 MMT', 'C. 10 MMT', 'D. 25 MMT'],
            hinglish: ['A. 1 MMT', 'B. 5 MMT', 'C. 10 MMT', 'D. 25 MMT'],
          },
          correctIndex: 1, // B: 5 MMT
          explanation: {
            hi: '2030 तक 5 मिलियन मीट्रिक टन (5 MMT) प्रति वर्ष हरित हाइड्रोजन उत्पादन और लगभग 125 GW नवीकरणीय ऊर्जा क्षमता जोड़ने का लक्ष्य है।',
            en: 'The target is 5 Million Metric Tonnes (5 MMT) per annum by 2030.',
            hinglish: 'Correct answer B: 5 MMT per annum.',
          },
        },
        shortcutTrick: {
          title: { hi: 'हाइड्रोजन के प्रकार याद रखने की ट्रिक', en: 'Hydrogen Colors Mnemonic', hinglish: 'Hydrogen Colors' },
          mnemonic: 'G-R-E-Y = Gas (Methane) se CO2 nikalne wali; B-L-U-E = Carbon Capture wali; G-R-E-E-N = Water + Renewable Solar/Wind wali!',
        },
      },

      bankingDemand: {
        financialAngle: {
          hi: 'आरबीआई ने हरित वित्तपोषण (Green Financing) को बढ़ावा देने के लिए बैंकों को ग्रीन डिपॉजिट फ्रेमवर्क जारी किया है, और नवीकरणीय ऊर्जा परियोजनाओं को प्राथमिकता प्राप्त क्षेत्र ऋण (PSL) सीमा ₹30 करोड़ तक शामिल किया है।',
          en: 'RBI has notified the Framework for Acceptance of Green Deposits and expanded Priority Sector Lending (PSL) limits up to ₹30 crore for renewable energy infrastructure.',
          hinglish: 'Green Deposits framework aur PSL category me renewable energy investments ko boost diya gaya hai.',
        },
        keyFinancialTerms: [
          {
            term: 'Sovereign Green Bonds (SGrBs)',
            definition: {
              hi: 'सरकार द्वारा हरित और पर्यावरण अनुकूल अवसंरचना परियोजनाओं के वित्तपोषण हेतु जारी विशेष सरकारी प्रतिभूतियां।',
              en: 'Government debt securities earmarked exclusively to raise capital for public-sector clean energy and adaptation projects.',
              hinglish: 'Govt bonds specifically for financing clean energy infrastructure.',
            },
          },
          {
            term: 'Carbon Border Adjustment Mechanism (CBAM)',
            definition: {
              hi: 'यूरोपीय संघ द्वारा कार्बन-सघन आयातों (स्टील, सीमेंट, एल्युमीनियम) पर लगाया जाने वाला सीमा शुल्क।',
              en: 'EU’s landmark tariff on carbon-intensive goods imported into the European bloc to level playing fields.',
              hinglish: 'EU tariff on high-carbon imported industrial goods like steel.',
            },
          },
        ],
        bankingDirectMcq: {
          question: {
            hi: 'भारतीय रिज़र्व बैंक के प्राथमिकता प्राप्त क्षेत्र ऋण (Priority Sector Lending - PSL) दिशानिर्देशों के तहत नवीकरणीय ऊर्जा (सोलर, विंड, बायोमास) परियोजनाओं के लिए बैंक ऋण की अधिकतम सीमा कितनी है?',
            en: 'Under RBI’s Priority Sector Lending (PSL) norms, what is the maximum bank credit eligible per borrower for renewable energy projects?',
            hinglish: 'RBI ke PSL guidelines me renewable energy projects ke liye maximum bank credit limit kitni hai?',
          },
          options: {
            hi: ['A. ₹10 करोड़', 'B. ₹15 करोड़', 'C. ₹30 करोड़', 'D. ₹50 करोड़'],
            en: ['A. ₹10 Crore', 'B. ₹15 Crore', 'C. ₹30 Crore', 'D. ₹50 Crore'],
            hinglish: ['A. ₹10 Crore', 'B. ₹15 Crore', 'C. ₹30 Crore', 'D. ₹50 Crore'],
          },
          correctIndex: 2, // C: ₹30 Crore
          explanation: {
            hi: 'आरबीआई के पीएसएल नियमों के अनुसार सौर जनरेटर, बायोमास संयंत्र, पवन चक्कियों आदि के लिए प्रति उधारकर्ता ₹30 करोड़ तक का ऋण प्राथमिकता प्राप्त क्षेत्र में गिना जाता है।',
            en: 'RBI permits bank loans up to a limit of ₹30 crore to borrowers for clean energy power generation under Priority Sector Lending.',
            hinglish: 'Correct answer C: ₹30 Crore per borrower.',
          },
        },
        regulatoryEntity: 'Ministry of New & Renewable Energy / RBI / SEBI',
      },

      stateDefenceDemand: {
        strategicSignificance: {
          hi: 'भारतीय रेलवे ने 2030 तक "शुद्ध शून्य कार्बन उत्सर्जक" बनने का लक्ष्य रखा है। इसके तहत हरियाणा के जींद-सोनीपत मार्ग पर देश की पहली हाइड्रोजन ट्रेन का परीक्षण किया जा रहा है।',
          en: 'Indian Railways aims for net-zero carbon emitter status by 2030, rolling out hydrogen-powered passenger trains on remote heritage and branch lines.',
          hinglish: 'Indian Railways 2030 net-zero target ke liye Jind-Sonipat section par Hydrogen train run karega.',
        },
        defenceOrStateMcq: {
          question: {
            hi: 'भारतीय रेलवे द्वारा पहली प्रोटोटाइप हाइड्रोजन-संचालित ट्रेन का परीक्षण किस राज्य के रेल खंड पर किया जा रहा है?',
            en: 'On which state’s railway section is the trial of India’s first prototype hydrogen-fuel-cell passenger train being undertaken?',
            hinglish: 'India ki first hydrogen passenger train ka trial kis state ke section par ho raha hai?',
          },
          options: {
            hi: ['A. गुजरात (अहमदाबाद)', 'B. हरियाणा (जींद-सोनीपत)', 'C. मध्य प्रदेश (भोपाल-इंदौर)', 'D. उत्तर प्रदेश (वाराणसी)'],
            en: ['A. Gujarat', 'B. Haryana (Jind-Sonipat)', 'C. Madhya Pradesh', 'D. Uttar Pradesh'],
            hinglish: ['A. Gujarat', 'B. Haryana (Jind-Sonipat)', 'C. MP', 'D. UP'],
          },
          correctIndex: 1, // B: Haryana (Jind-Sonipat)
          explanation: {
            hi: 'उत्तर रेलवे द्वारा 89 किलोमीटर लंबे जींद-सोनीपत खंड (हरियाणा) पर भारत की पहली हाइड्रोजन ट्रेन का परीक्षण किया जा रहा है।',
            en: 'Northern Railway is conducting hydrogen fuel-cell trials on the 89-km Jind-Sonipat section in Haryana.',
            hinglish: 'Correct answer B: Haryana (Jind-Sonipat section).',
          },
        },
        keyMilitaryOrStateFacts: {
          hi: ['भारतीय रेलवे का नेट-जीरो लक्ष्य: वर्ष 2030', 'लद्दाख के लेह में एनटीपीसी द्वारा देश का पहला ग्रीन हाइड्रोजन मोबिलिटी प्रोजेक्ट और बसें शुरू की गईं।'],
          en: ['Indian Railways net-zero target: 2030.', 'NTPC commissioned India’s first green hydrogen mobility bus fleet in Leh, Ladakh.'],
          hinglish: ['Indian Railways Net-zero: 2030.', 'NTPC green hydrogen buses in Leh, Ladakh.'],
        },
      },
    },
  },
];

export const DAILY_RAPID_ONE_LINERS: SpeedOneLinerItem[] = [
  {
    id: 'ol-1',
    date: '2026-09-09',
    category: 'sports_awards',
    examTargets: ['SSC', 'Railway', 'Banking', 'State PSC'],
    text: {
      hi: 'शतरंज ओलंपियाड (FIDE Chess Olympiad) में भारत की पुरुष और महिला दोनों टीमों ने ऐतिहासिक स्वर्ण पदक जीते।',
      en: 'India created history by clinching double Gold medals in both Open and Women’s sections at the FIDE Chess Olympiad.',
      hinglish: 'FIDE Chess Olympiad me India ki Men aur Women dono teams ne double Gold medal jeeta.',
    },
    staticLink: {
      hi: 'FIDE का मुख्यालय लुसाने, स्विट्जरलैंड में है। ग्रैंडमास्टर की उपाधि FIDE द्वारा दी जाती है।',
      en: 'FIDE HQ is in Lausanne, Switzerland. India’s first Grandmaster was Viswanathan Anand (1988).',
      hinglish: 'FIDE HQ Lausanne (Switzerland). India ke first GM Viswanathan Anand (1988).',
    },
  },
  {
    id: 'ol-2',
    date: '2026-09-09',
    category: 'defence_security',
    examTargets: ['UPSC', 'SSC', 'Railway', 'State PSC'],
    text: {
      hi: 'भारत और अमेरिका के बीच संयुक्त सैन्य अभ्यास "युद्ध अभ्यास" (Yudh Abhyas) का 20वां संस्करण आयोजित हुआ।',
      en: '20th edition of Indo-US joint military exercise "Yudh Abhyas" conducted focusing on counter-terror operations.',
      hinglish: 'India-US bilateral military exercise "Yudh Abhyas" ka 20th edition conduct hua.',
    },
    staticLink: {
      hi: 'भारत-अमेरिका के अन्य अभ्यास: वज्र प्रहार (विशेष बल), कोप इंडिया (वायुसेना), और मालाबार (नौसेना अभ्यास जिसमें जापान व ऑस्ट्रेलिया भी शामिल हैं)।',
      en: 'Other US-India drills: Vajra Prahar (Special Forces), Cope India (Air Force), Malabar (Naval with Quad partners).',
      hinglish: 'Other drills: Vajra Prahar (Special Forces), Cope India, Malabar (Quad navies).',
    },
  },
  {
    id: 'ol-3',
    date: '2026-09-09',
    category: 'govt_schemes',
    examTargets: ['SSC', 'Banking', 'Railway', 'State PSC'],
    text: {
      hi: '"पीएम सूर्य घर: मुफ्त बिजली योजना" के तहत 1 करोड़ परिवारों को हर महीने 300 यूनिट तक मुफ्त बिजली देने का लक्ष्य है (कुल बजट ₹75,021 करोड़)।',
      en: 'PM Surya Ghar: Muft Bijli Yojana aims to provide up to 300 units of free solar power monthly to 1 crore households (Outlay ₹75,021 Cr).',
      hinglish: 'PM Surya Ghar Muft Bijli Yojana me 1 crore households ko 300 units free solar electricity target (Outlay ₹75,021 Cr).',
    },
    staticLink: {
      hi: 'योजना की नोडल एजेंसी आरईसी लिमिटेड (REC Limited - महारत्न कंपनी) है।',
      en: 'Nodal implementing financial agency is REC Limited (Maharatna CPSE).',
      hinglish: 'Nodal agency REC Limited (Maharatna company) hai.',
    },
  },
  {
    id: 'ol-4',
    date: '2026-09-09',
    category: 'economy_banking',
    examTargets: ['Banking', 'UPSC', 'SSC'],
    text: {
      hi: 'विश्व बैंक ने वित्त वर्ष 2025-26 के लिए भारत की सकल घरेलू उत्पाद (GDP) वृद्धि दर का अनुमान 7.0% पर बरकरार रखा।',
      en: 'World Bank retained India’s FY26 GDP growth forecast at robust 7.0%, citing infrastructure capex and private consumption.',
      hinglish: 'World Bank ne India ki FY26 GDP growth projection 7.0% par maintain ki.',
    },
    staticLink: {
      hi: 'विश्व बैंक का मुख्यालय वाशिंगटन डी.सी., अमेरिका में है। वर्तमान अध्यक्ष अजय बंगा (Ajay Banga) हैं।',
      en: 'World Bank HQ is in Washington D.C. Current President is Ajay Banga.',
      hinglish: 'World Bank HQ Washington D.C., President Ajay Banga.',
    },
  },
  {
    id: 'ol-5',
    date: '2026-09-09',
    category: 'polity_governance',
    examTargets: ['UPSC', 'SSC', 'Railway', 'State PSC'],
    text: {
      hi: '1 जुलाई 2024 से भारत में 3 नए आपराधिक कानून लागू हुए: भारतीय न्याय संहिता (BNS), भारतीय नागरिक सुरक्षा संहिता (BNSS), और भारतीय साक्ष्य अधिनियम (BSA)।',
      en: 'Three transformative criminal laws took effect: Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).',
      hinglish: '1 July 2024 se IPC, CrPC aur Evidence Act ki jagah BNS, BNSS aur BSA lagu hue.',
    },
    staticLink: {
      hi: 'BNS ने 1860 के IPC का, BNSS ने 1973 के CrPC का, और BSA ने 1872 के भारतीय साक्ष्य अधिनियम का स्थान लिया।',
      en: 'BNS replaced IPC 1860, BNSS replaced CrPC 1973, BSA replaced Indian Evidence Act 1872.',
      hinglish: 'IPC 1860 -> BNS; CrPC 1973 -> BNSS; Evidence 1872 -> BSA.',
    },
  },
  {
    id: 'ol-6',
    date: '2026-09-09',
    category: 'international_relations',
    examTargets: ['UPSC', 'SSC', 'Banking', 'Railway'],
    text: {
      hi: 'ब्रिक्स (BRICS) समूह का 16वां ऐतिहासिक शिखर सम्मेलन कज़ान, रूस में आयोजित हुआ जिसमें नए सदस्य देशों ने पूर्ण भागीदारी की।',
      en: '16th BRICS Summit held in Kazan, Russia, marking the first summit with expanded full members (Egypt, Ethiopia, Iran, UAE).',
      hinglish: '16th BRICS Summit Kazan (Russia) me organize hua jisme expanded members participate kiye.',
    },
    staticLink: {
      hi: 'न्यू डेवलपमेंट बैंक (NDB - ब्रिक्स बैंक) का मुख्यालय शंघाई, चीन में है। इसकी वर्तमान अध्यक्ष डिल्मा रूसेफ हैं।',
      en: 'New Development Bank (NDB) HQ is in Shanghai, China; President is Dilma Rousseff.',
      hinglish: 'NDB HQ Shanghai (China), President Dilma Rousseff.',
    },
  },
  {
    id: 'ol-7',
    date: '2026-09-09',
    category: 'science_tech',
    examTargets: ['UPSC', 'SSC', 'Railway', 'State PSC'],
    text: {
      hi: 'इसरो ने गगनयान मानव अंतरिक्ष उड़ान मिशन के लिए दूसरे अनक्रू परीक्षण मिशन "G1/G2" की उड़ान योग्यता परीक्षण पूरे किए।',
      en: 'ISRO successfully qualified human-rated L110 Vikas liquid engines and CE-20 cryogenic stage for Gaganyaan mission.',
      hinglish: 'ISRO ne Gaganyaan mission ke liye human-rated L110 Vikas aur CE-20 cryogenic engines qualify kiye.',
    },
    staticLink: {
      hi: 'गगनयान भारत का पहला मानव अंतरिक्ष मिशन है जो 3 सदस्यों को 3 दिन के लिए 400 किमी की निचली कक्षा (LEO) में ले जाएगा।',
      en: 'Gaganyaan aims to send a 3-member crew to 400 km Low Earth Orbit for 3 days and return them safely.',
      hinglish: 'Gaganyaan 3 astronauts ko 400 km LEO me 3 days ke liye bhejega.',
    },
  },
];
