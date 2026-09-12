import { VisionIasInfographic, Language } from '../types';

/**
 * JITOMNI SOVEREIGN ACADEMY • VISION IAS 360° CRITICAL ANALYSIS INFOGRAPHIC ENGINE
 * Generates magazine-grade 360° Infographics with multi-dimensional matrices, 
 * live Mermaid mindmaps, key data boxes, challenges, and Mains answer frameworks.
 */
export function generateVisionIasInfographic(
  query: string,
  lang: Language = 'hi',
  customContext?: string
): VisionIasInfographic {
  const q = (query || '').toLowerCase();

  // 1. POLITY & CONSTITUTION (Fundamental Rights / Constitution / Parliament / Governance)
  if (
    q.includes('fundamental right') || 
    q.includes('मौलिक अधिकार') || 
    q.includes('constitution') || 
    q.includes('संविधान') || 
    q.includes('article') || 
    q.includes('अनुच्छेद') || 
    q.includes('polity') ||
    q.includes('judiciary') ||
    q.includes('nyaypalika')
  ) {
    return {
      topicTitle: lang === 'hi' ? 'भारतीय संविधान: मौलिक अधिकार व 360° विधिक समीक्षा' : 'Fundamental Rights: 360° Constitutional & Judicial Review',
      paperLinkage: 'GS PAPER-II: Indian Constitution, Fundamental Rights, Judiciary & Governance',
      editionTag: 'JITOMNI MONTHLY SPECIAL • 360° CRITICAL REVIEW',
      badgeColor: 'from-blue-600 to-indigo-700',
      whyInNews: {
        heading: lang === 'hi' ? 'चर्चा में क्यों है? (Context & Triggering Events)' : 'Why in News & Contextual Drivers',
        points: [
          lang === 'hi' 
            ? 'डिजिटल युग में निजता का अधिकार (अनुच्छेद 21 - पुट्टास्वामी निर्णय) और डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act) के अंतर्संबंध पर सर्वोच्च न्यायालय में विमर्श।'
            : 'Supreme Court reflections on Right to Privacy (Art 21 - Puttaswamy verdict) vs Digital Personal Data Protection Act implementation.',
          lang === 'hi'
            ? 'अभिव्यक्ति की स्वतंत्रता (अनुच्छेद 19(1)(a)) बनाम घृणास्पद भाषण (Hate Speech) व ऑनलाइन भ्रामक सूचनाओं पर युक्तियुक्त निर्बंधन (Reasonable Restrictions - 19(2)) का संतुलन।'
            : 'Balancing Free Speech (Art 19(1)(a)) with Reasonable Restrictions (Art 19(2)) in the era of AI deepfakes and algorithmic virality.',
          lang === 'hi'
            ? 'समान नागरिक संहिता (UCC - अनुच्छेद 44) बनाम धार्मिक स्वतंत्रता के अधिकार (अनुच्छेद 25-28) पर राष्ट्रीय विधि आयोग व संसदीय बहस।'
            : 'Law Commission deliberations on Uniform Civil Code (Art 44) vs Freedom of Religion guarantees (Art 25-28).'
        ]
      },
      mindmapMermaidCode: `graph TD
  A[संविधान भाग III: मौलिक अधिकार<br/>Art. 12 to 35] --> B[समानता का अधिकार<br/>Art. 14-18]
  A --> C[स्वतंत्रता का अधिकार<br/>Art. 19-22]
  A --> D[शोषण के विरुद्ध अधिकार<br/>Art. 23-24]
  A --> E[धार्मिक स्वतंत्रता<br/>Art. 25-28]
  A --> F[संवैधानिक उपचार<br/>Art. 32: संविधान की आत्मा]
  C --> C1[Art. 21: जीवन व व्यक्तिगत स्वतंत्रता]
  C1 --> C2[Right to Privacy - Puttaswamy 2017]
  C1 --> C3[Right to Clean Air & Environment]
  F --> F1[5 रिट याचिकाएं: बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण, अधिकार पृच्छा]`,
      visualProcessSteps: [
        {
          stepNumber: 1,
          title: lang === 'hi' ? 'संवैधानिक आधार (Part III)' : 'Constitutional Core (Part III)',
          description: lang === 'hi' ? 'अनुच्छेद 12 से 35 तक मैग्ना कार्टा के रूप में राज्य की निरंकुशता पर अंकुश।' : 'Articles 12-35 acting as the Magna Carta against state arbitrariness.'
        },
        {
          stepNumber: 2,
          title: lang === 'hi' ? 'मूल संरचना सिद्धांत (Basic Structure)' : 'Basic Structure Doctrine',
          description: lang === 'hi' ? 'केशवानंद भारती (1973): संसद मौलिक अधिकारों के सार को नष्ट नहीं कर सकती।' : 'Kesavananda Bharati (1973): Parliament cannot abrogate core fundamental freedoms.'
        },
        {
          stepNumber: 3,
          title: lang === 'hi' ? 'विस्तारित न्यायिक आयाम' : 'Golden Triangle (Arts 14, 19, 21)',
          description: lang === 'hi' ? 'मेनका गांधी (1978): विधि द्वारा स्थापित प्रक्रिया से विधि की सम्यक प्रक्रिया (Due Process)।' : 'Maneka Gandhi (1978): Evolution from Procedure Established by Law to Due Process.'
        },
        {
          stepNumber: 4,
          title: lang === 'hi' ? 'संवैधानिक उपचार (Art 32)' : 'Remedies & Writs (Art 32)',
          description: lang === 'hi' ? 'सर्वोच्च व उच्च न्यायालय द्वारा 5 रिटों का त्वरित प्रवर्तन।' : 'High Courts (Art 226) & Supreme Court (Art 32) enforcing writ jurisdiction.'
        }
      ],
      multidimensionalMatrix: {
        constitutionalLegal: {
          title: lang === 'hi' ? '🏛️ संवैधानिक व विधिक आयाम' : '🏛️ Constitutional & Legal Dimension',
          points: [
            lang === 'hi' ? 'स्वर्ण त्रिभुज (Golden Triangle): अनुच्छेद 14, 19, और 21 परस्पर जुड़े हैं; कोई भी कानून तीनों की कसौटी पर खरा उतरना चाहिए।' : 'Golden Triangle: Articles 14, 19, and 21 form an organic whole; arbitrary laws violate all three.',
            lang === 'hi' ? 'मूल संरचना (Basic Structure): मिनर्वा मिल्स (1980) में स्पष्ट किया गया कि मौलिक अधिकार और नीति निर्देशक सिद्धांत (DPSP) संविधान के दो पहिए हैं।' : 'Minerva Mills (1980): Balanced harmony between Part III (Fundamental Rights) and Part IV (DPSPs).'
          ]
        },
        economicFinancial: {
          title: lang === 'hi' ? '💰 आर्थिक व आजीविका आयाम' : '💰 Economic & Livelihood Realities',
          points: [
            lang === 'hi' ? 'अनुच्छेद 19(1)(g) के तहत किसी भी व्यापार, पेशे या आजीविका की स्वतंत्रता, लेकिन सार्वजनिक हित में राज्य द्वारा एकाधिकार या तकनीकी योग्यताएं तय की जा सकती हैं।' : 'Art 19(1)(g) empowers trade & professions, subject to reasonable public interest licensing.',
            lang === 'hi' ? 'आर्थिक न्याय (Social & Economic Democracy) की स्थापना के बिना नागरिक अधिकारों का उपभोग केवल औपचारिक बनकर रह जाता है (डॉ. बी. आर. अम्बेडकर)।' : 'Economic democracy is foundational for political democracy to survive and thrive.'
          ]
        },
        socialHuman: {
          title: lang === 'hi' ? '👥 सामाजिक व मानवीय गरिमा आयाम' : '👥 Social Justice & Human Dignity',
          points: [
            lang === 'hi' ? 'अनुच्छेद 15 व 17: अस्पृश्यता का पूर्ण उन्मूलन और जाति, धर्म, लिंग के आधार पर सार्वजनिक स्थानों पर भेदभाव का निषेध।' : 'Arts 15 & 17: Total prohibition of untouchability and discrimination in public spaces.',
            lang === 'hi' ? 'अनुच्छेद 21ए: 86वें संविधान संशोधन (2002) द्वारा 6 से 14 वर्ष के बच्चों को निशुल्क व अनिवार्य शिक्षा का मौलिक अधिकार।' : 'Art 21A: Right to free and compulsory education for 6-14 year olds as an inviolable right.'
          ]
        },
        techGlobalEnvironmental: {
          title: lang === 'hi' ? '🌍 आधुनिक तकनीकी व पर्यावरणीय आयाम' : '🌍 Tech Era & Environmental Horizons',
          points: [
            lang === 'hi' ? 'पर्यावरणीय न्याय: एम. सी. मेहता निर्णयों के तहत स्वच्छ जल, प्रदूषण मुक्त वायु और पर्यावरण को अनुच्छेद 21 का अभिन्न अंग माना गया।' : 'Right to pollution-free air and potable water recognized as inherent to Right to Life (Art 21).',
            lang === 'hi' ? 'डिजिटल राइट्स व AI: फेशियल रिकॉग्निशन, इंटरनेट शटडाउन (अनुराधा भसीन केस) और एल्गोरिथमिक बायस पर सख्त न्यायिक निगरानी आवश्यक।' : 'Digital rights: Internet access protected under Art 19(1)(a) (Anuradha Bhasin case).'
          ]
        }
      },
      criticalChallenges: [
        {
          challenge: lang === 'hi' ? 'न्यायिक विलंब और विचाराधीन कैदी' : 'Judicial Pendency & Undertrials',
          severity: 'Critical',
          impact: lang === 'hi' ? 'देश की जेलों में 75%+ कैदी विचाराधीन हैं, जो अनुच्छेद 21 के त्वरित न्याय के अधिकार का प्रत्यक्ष उल्लंघन है।' : 'Over 75% jail population consists of undertrials, eroding speedy trial guarantees.'
        },
        {
          challenge: lang === 'hi' ? 'डिजिटल विभाजन व सर्विलांस' : 'Digital Surveillance Overreach',
          severity: 'High',
          impact: lang === 'hi' ? 'नागरिकों के बायोमेट्रिक व व्यक्तिगत डेटा पर अत्यधिक राज्य निगरानी से निजता के अधिकार पर खतरा।' : 'Mass surveillance without clear judicial warrant mechanisms compromises privacy.'
        },
        {
          challenge: lang === 'hi' ? 'निवारक निरोध (Preventive Detention)' : 'Misuse of Preventive Detention',
          severity: 'High',
          impact: lang === 'hi' ? 'अनुच्छेद 22(3) का असाधारण परिस्थितियों के बजाय सामान्य कानून व्यवस्था के लिए अत्यधिक उपयोग।' : 'Routinization of preventive detention undermining personal liberty.'
        }
      ],
      wayForward: [
        {
          title: lang === 'hi' ? 'अनुपातिकता परीक्षण (Proportionality Test) का कड़ाई से पालन' : 'Institutionalize Proportionality Test',
          agencyOrModel: 'Supreme Court Puttaswamy Benchmark',
          actionableStep: lang === 'hi' ? 'राज्य की किसी भी कार्रवाई में 4 शर्तें पूरी होनी चाहिए: वैधता, वैध लक्ष्य, उपाय की उपयुक्तता और कम से कम दखल।' : 'Ensure every state action passes 4-fold test: legality, legitimate aim, suitability, and necessity.'
        },
        {
          title: lang === 'hi' ? 'स्वतंत्र डेटा संरक्षण प्राधिकरण का गठन' : 'Independent Data Protection Board',
          agencyOrModel: 'Justice B.N. Srikrishna Committee',
          actionableStep: lang === 'hi' ? 'नागरिकों की निजता और डिजिटल अधिकारों की रक्षा के लिए बिना राजनीतिक हस्तक्षेप वाला स्वायत्त नियामक।' : 'Autonomous regulatory body with punitive teeth against unauthorized data harvesting.'
        },
        {
          title: lang === 'hi' ? 'विधिक सहायता व त्वरित न्याय (Legal Aid 360°)' : 'Universal Free Legal Aid (Art 39A)',
          agencyOrModel: 'NALSA & 2nd ARC Recommendations',
          actionableStep: lang === 'hi' ? 'हर जिले में डिजिटल विधिक क्लिनिक और विचाराधीन कैदियों के लिए स्वचालित जमानत समीक्षा तंत्र।' : 'Automated bail review dashboards and 100% legal representation for marginalized citizens.'
        }
      ],
      keyDataPoints: [
        { metric: 'Part III', label: 'Constitution Articles 12-35', source: 'Magna Carta of India' },
        { metric: 'Art. 21', label: 'Right to Life & Dignity', source: 'Expanding Umbrella Right' },
        { metric: 'Art. 32', label: 'Heart & Soul of Constitution', source: 'Dr. B.R. Ambedkar' },
        { metric: '1973', label: 'Kesavananda Basic Structure', source: 'Supreme Court Bench (13 Judges)' }
      ],
      mainsFramework: {
        question: lang === 'hi' 
          ? 'प्रश्न: "भारतीय संविधान का अनुच्छेद 21 केवल जैविक अस्तित्व की गारंटी नहीं देता, बल्कि मानवीय गरिमा के साथ जीने का अधिकार प्रदान करता है।" विभिन्न न्यायिक निर्णयों के आलोक में इस कथन का समालोचनात्मक मूल्यांकन कीजिए। (15 अंक / 250 शब्द)'
          : 'Question: "Article 21 of the Indian Constitution does not merely guarantee biological existence, but ensures a life of dignity." Critically evaluate this statement in light of landmark judicial pronouncements. (15 Marks / 250 Words)',
        marks: '15 Marks / 250 Words (UPSC GS-2 / State PCS)',
        intro: lang === 'hi' 
          ? 'प्रस्तावना (15% शब्द): अनुच्छेद 21 के पाठ ("विधि द्वारा स्थापित प्रक्रिया") का उल्लेख करते हुए एके गोपालन (1950) की संकुचित व्याख्या से मेनका गांधी (1978) के गतिशील और मानवीय गरिमा वाले दृष्टिकोण में परिवर्तन को संक्षेप में रेखांकित करें।'
          : 'Introduction (35-40 words): Contrast AK Gopalan (1950) procedural literalism with Maneka Gandhi (1978) substantive due process and transformative constitutionalism.',
        dimensions: [
          lang === 'hi' ? 'मेनका गांधी (1978) व निष्पक्षता: कानून न केवल पारित होना चाहिए बल्कि उचित, न्यायसंगत और तर्कसंगत (Just, Fair & Reasonable) होना चाहिए।' : 'Substantive Due Process: Natural justice and fairness embedded directly into statutory law.',
          lang === 'hi' ? 'पुट्टास्वामी निर्णय (2017): निजता को अनुच्छेद 21 का अंतर्निहित घटक घोषित किया गया, जो दैहिक और सूचनात्मक दोनों स्तरों पर लागू है।' : 'Puttaswamy (2017): Informational and bodily privacy as core components of human autonomy.',
          lang === 'hi' ? 'सामाजिक-आर्थिक अधिकार: ओल्गा टेलिस (आजीविका का अधिकार), परमानंद कटारा (तत्काल चिकित्सा सहायता), मोहिनी जैन (शिक्षा का अधिकार)।' : 'Socio-economic rights: Livelihood (Olga Tellis), Emergency medical care (Parmanand Katara).',
          lang === 'hi' ? 'पर्यावरणीय व स्वास्थ्य आयाम: एम. सी. मेहता और हालिया निर्णयों में जलवायु परिवर्तन के प्रतिकूल प्रभावों से मुक्ति का अधिकार।' : 'Environmental justice: Right against adverse climate change impacts recognized under Art 21.'
        ],
        diagramTip: lang === 'hi' ? 'फ्लोचार्ट सुझाव: केंद्र में "अनुच्छेद 21 (मानवीय गरिमा)" बनाएं और चारों ओर 6 उपग्रह नोड्स (निजता, स्वच्छ पर्यावरण, आजीविका, त्वरित न्याय, स्वास्थ्य, शिक्षा) जोड़ें।' : 'Diagram Tip: Draw a central hub for "Art 21 Human Dignity" with radial spokes to Privacy, Environment, Health, Speedy Trial, and Livelihood.',
        conclusion: lang === 'hi' 
          ? 'निष्कर्ष (15% शब्द): अनुच्छेद 21 एक जीवंत वृक्ष (Living Tree) के समान है जो समय के साथ नए सामाजिक-तकनीकी अधिकारों को समाहित करता है। इसका अंतिम लक्ष्य एक ऐसे कल्याणकारी राज्य का निर्माण करना है जहां प्रत्येक नागरिक गरिमापूर्ण जीवन जी सके।'
          : 'Conclusion (35-40 words): Article 21 represents transformative constitutionalism—evolving from negative non-interference into positive state obligations to secure human flourishing.'
      },
      graphicIllustrationConcept: {
        title: lang === 'hi' ? 'मौलिक अधिकारों का 360° विजुअल आर्किटेक्चर' : '360° Fundamental Rights Architectural Matrix',
        visualNodes: [
          { label: 'Art 14-18', sub: 'Right to Equality', color: 'from-blue-600 to-cyan-600' },
          { label: 'Art 19-22', sub: 'Right to Freedom & Art 21', color: 'from-emerald-600 to-teal-600' },
          { label: 'Art 23-24', sub: 'Anti-Exploitation Protections', color: 'from-amber-600 to-orange-600' },
          { label: 'Art 25-28', sub: 'Religious Freedom & Conscience', color: 'from-purple-600 to-pink-600' },
          { label: 'Art 32', sub: 'Constitutional Remedies & Writs', color: 'from-rose-600 to-red-600' }
        ]
      }
    };
  }

  // 2. GLOBAL AI JOBS & SINGAPORE TECH / REMOTE DOLLARS
  if (
    q.includes('singapore') || 
    q.includes('सिंगापुर') || 
    q.includes('global') || 
    q.includes('remote') || 
    q.includes('dollar') || 
    q.includes('prompt engineer') || 
    q.includes('n8n') || 
    q.includes('ai job') || 
    q.includes('salary') || 
    q.includes('nodeflair')
  ) {
    return {
      topicTitle: lang === 'hi' ? 'ग्लोबल व सिंगापुर AI टेक जॉब्स: 360° मांग, सैलरी व भर्ती मैट्रिक्स' : 'Singapore & Global AI Tech Careers: 360° Demand, Salary & Hiring Matrix',
      paperLinkage: 'GLOBAL CAREERS • INDUSTRY 4.0 • REMOTE DOLLAR ECONOMY (MODULE 10)',
      editionTag: 'JITOMNI SOVEREIGN TECH DISPATCH • GLOBAL AI LAB',
      badgeColor: 'from-emerald-600 to-teal-800',
      whyInNews: {
        heading: lang === 'hi' ? 'चर्चा में क्यों है? (Global Tech Shift)' : 'Why Global AI Jobs Are Booming',
        points: [
          lang === 'hi' 
            ? 'सिंगापुर सरकार (GovTech) और वित्तीय दिग्गजों (DBS, OCBC, Grab) ने 15,000+ AI प्रॉम्प्ट व ऑटोमेशन इंजीनियर्स की सीधी भर्ती शुरू की है।'
            : 'Singapore GovTech and fintech titans (DBS, Grab) initiated massive hiring for 15,000+ Agentic AI & Prompt specialists.',
          lang === 'hi'
            ? 'भारतीय प्रोफेशनल्स घर बैठे (Remote WFH) सिंगापुर से S$6,000 - S$13,500 SGD/महीना (₹3.7 लाख - ₹8.3 लाख) कमा रहे हैं, 0% GST (LUT) लाभ के साथ।'
            : 'Indian talent earning S$6k-S$13.5k SGD/mo remotely under 0% GST Export of Services framework.',
          lang === 'hi'
            ? 'केवल कोडिंग नहीं, बल्कि n8n वर्कफ्लो ऑटोमेशन, Claude 3.5 XML प्रॉम्प्टिंग, और LLM इवैल्यूएशन की मांग में 340% की भारी उछाल आई है।'
            : 'Explosive 340% demand spike for n8n autonomous pipelines, Claude 3.5 XML prompting, and AI evaluation over raw syntax.'
        ]
      },
      mindmapMermaidCode: `graph TD
  A[ग्लोबल AI करियर मैट्रिक्स<br/>S$6,000 - S$13,500 / mo] --> B[AI टेक स्टैक]
  A --> C[सत्यापित भर्ती पोर्टल्स]
  A --> D[ATS रिज्यूमे स्टैंडर्ड]
  A --> E[कानूनी व टैक्स गाइड]
  B --> B1[Claude 3.5 Sonnet XML Prompting]
  B --> B2[Autonomous n8n Pipelines]
  B --> B3[RAG Architecture & Vector DBs]
  C --> C1[NodeFlair Singapore - #1 Tech Portal]
  C --> C2[MyCareersFuture GovTech SG]
  C --> C3[Tech in Asia & Upwork Enterprise]
  D --> D1[Single-Column Zero-Photo Format]
  D --> D2[Metrics: % and $ Business Saved]
  E --> E1[IGST Section 2(6) - 0% GST on Export]
  E --> E2[FIRC Certificate & Section 44ADA 50% Relief]`,
      visualProcessSteps: [
        {
          stepNumber: 1,
          title: lang === 'hi' ? 'तकनीकी स्टैक मास्टरी' : 'In-Demand Tech Stack',
          description: lang === 'hi' ? 'Claude 3.5 Sonnet, n8n ऑटोमेशन, और Cursor AI में दक्षता।' : 'Mastering enterprise LLMs, agentic loops, and JSON schema constraints.'
        },
        {
          stepNumber: 2,
          title: lang === 'hi' ? 'सिंगापुर ATS रिज्यूमे' : 'Singapore ATS Formatting',
          description: lang === 'hi' ? 'सिंगापुर मिनिस्ट्री ऑफ मैनपावर (MOM) मानकों के अनुसार सिंगल-कॉलम इम्पैक्ट रिज्यूमे।' : 'Zero-photo, quantified metric bullets matching MOM compliance standards.'
        },
        {
          stepNumber: 3,
          title: lang === 'hi' ? 'सत्यापित पोर्टल्स पर आवेदन' : 'Targeted Portal Pipeline',
          description: lang === 'hi' ? 'NodeFlair, MyCareersFuture, Tech in Asia पर सीधे आवेदन व प्रोफाइल बिल्डिंग।' : 'Direct hiring channels with real-time transparent salary benchmarks.'
        },
        {
          stepNumber: 4,
          title: lang === 'hi' ? 'कानूनी टैक्स व विदेशी मुद्रा' : 'Legal Remittance & Tax (LUT)',
          description: lang === 'hi' ? '0% GST LUT बॉन्ड, FIRC सर्टिफिकेट और सेक्शन 44ADA में 50% टैक्स छूट।' : 'Zero GST on service exports, Bank FIRC, and presumptive tax optimization.'
        }
      ],
      multidimensionalMatrix: {
        constitutionalLegal: {
          title: lang === 'hi' ? '⚖️ कानूनी, टैक्स व विदेशी मुद्रा नियम' : '⚖️ Legal, Cross-Border Remittance & Tax',
          points: [
            lang === 'hi' ? 'IGST अधिनियम धारा 2(6): विदेशी मुद्रा (SGD/USD) में भुगतान प्राप्त करने पर सेवा निर्यात (Export of Services) माना जाता है, जिस पर 0% GST (LUT के तहत) लागू है।' : 'IGST Act Sec 2(6): Service export into foreign currency qualifies for 0% GST under Letter of Undertaking (LUT).',
            lang === 'hi' ? 'आयकर अधिनियम धारा 44ADA: भारतीय फ्रीलांसर/कंसल्टेंट अपनी आय का 50% खर्च दिखाकर केवल शेष 50% पर ही वैध टैक्स देते हैं।' : 'Sec 44ADA: Indian professionals claim 50% presumptive expenditure, drastically lowering effective tax.'
          ]
        },
        economicFinancial: {
          title: lang === 'hi' ? '💰 वेतनमान, मुद्रा विनिमय व आय प्रभाव' : '💰 Salary Benchmarks & Currency Arbitrage',
          points: [
            lang === 'hi' ? 'सिंगापुर सैलरी: जूनियर स्तर S$5,500/माह (₹3.4L/माह), सीनियर AI ऑटोमेशन स्पेशलिस्ट S$14,000/माह (₹8.6L/माह)।' : 'Singapore Salary: Junior S$5,500/mo (₹3.4L/mo) up to Senior S$14,000/mo (₹8.6L/mo).',
            lang === 'hi' ? 'ग्लोबल आर्बिट्रेज: भारत में रहते हुए कम जीवन यापन लागत (Low Cost of Living) में वैश्विक अंतरराष्ट्रीय सैलरी का शुद्ध संचय।' : 'Global Geo-Arbitrage: Earning in strong Singapore Dollars while spending in Indian Rupee.'
          ]
        },
        socialHuman: {
          title: lang === 'hi' ? '👥 टैलेंट मोबिलिटी व करियर संप्रभुता' : '👥 Human Capital & Career Sovereignty',
          points: [
            lang === 'hi' ? 'पारंपरिक डिग्री की बजाय वेरिफाइड हैंड्स-ऑन पोर्टफोलियो और GitHub/n8n ऑटोमेशन प्रूफ ऑफ वर्क की निर्णायक भूमिका।' : 'Proof-of-work (live workflow blueprints, GitHub repos) supersedes traditional pedigree.',
            lang === 'hi' ? 'टियर-2 और टियर-3 भारतीय शहरों के युवाओं का सीधे सिंगापुर और वैश्विक फॉर्च्यून-500 टेक इकोसिस्टम से जुड़ाव।' : 'Democratization: Tier-2/3 Indian talent accessing Tier-1 global corporate compensation.'
          ]
        },
        techGlobalEnvironmental: {
          title: lang === 'hi' ? '🌍 तकनीकी गहराई व वैश्विक मानक' : '🌍 Tech Depth & Global Benchmarks',
          points: [
            lang === 'hi' ? 'एजेंटिक पाइपलाइन्स: केवल चैट नहीं, बल्कि n8n, LangChain, और AutoGen द्वारा जटिल बहु-चरणीय व्यावसायिक प्रक्रियाओं का स्वचालन।' : 'Autonomous multi-agent loops replacing repetitive enterprise customer/data pipelines.',
            lang === 'hi' ? 'प्रॉम्प्ट इंजीनियरिंग गोल्ड स्टैंडर्ड: XML स्ट्रक्चरिंग (<instructions>, <constraints>, <output_format>) से 0% हैलूसिनेशन।' : 'Structured XML prompting preventing hallucinations and securing corporate compliance.'
          ]
        }
      },
      criticalChallenges: [
        {
          challenge: lang === 'hi' ? 'ATS रिज्यूमे रिजेक्शन' : 'High ATS Rejection Rates',
          severity: 'Critical',
          impact: lang === 'hi' ? '85% भारतीय रिज्यूमे दो-कॉलम और फोटो के कारण सिंगापुर के ATS बॉट्स द्वारा बिना पढ़े रिजेक्ट हो जाते हैं।' : '85% applicants discarded due to incompatible dual-column or graphic-heavy CV layouts.'
        },
        {
          challenge: lang === 'hi' ? 'सैलरी व मुद्रा विनिमय में कटौती' : 'Forex & High Platform Fees',
          severity: 'High',
          impact: lang === 'hi' ? 'पारंपरिक बिचौलियों द्वारा 10-20% कमीशन काटने की समस्या (सीधे बैंक FIRC ट्रांसफर आवश्यक)।' : 'Intermediary platforms eating up to 20% in conversion and commission spreads.'
        }
      ],
      wayForward: [
        {
          title: lang === 'hi' ? 'सिंगापुर-मानक ATS रिज्यूमे व पोर्टफोलियो' : 'Singapore-Standard Single-Column ATS CV',
          agencyOrModel: 'NodeFlair & Singapore MOM Guidelines',
          actionableStep: lang === 'hi' ? 'प्रत्येक बुलेट में "Action Verb + AI Tool + % Business Impact" का गणितीय फॉर्मूला दर्ज करें।' : 'Format every bullet point with: Action Verb + Enterprise AI Tool + Quantifiable Output.'
        },
        {
          title: lang === 'hi' ? 'JITOMNI सिंगापुर AI जॉब्स लैब का उपयोग' : 'Access JITOMNI Module 10 Command Center',
          agencyOrModel: 'JITOMNI Sovereign Global Lab',
          actionableStep: lang === 'hi' ? 'मॉड्यूल 10 में जाकर सिंगापुर लाइव वेकेंसीज देखें, ATS स्कोर जांचें और 100% जॉब-रेडी सर्टिफिकेशन लें।' : 'Verify vacancies on NodeFlair/MyCareersFuture and take the benchmark readiness test.'
        }
      ],
      keyDataPoints: [
        { metric: 'S$6,000+', label: 'Starting Singapore AI Package (₹3.7L/mo)', source: 'NodeFlair Salary Report' },
        { metric: '0% GST', label: 'Export of Services (LUT Bond)', source: 'IGST Sec 2(6)' },
        { metric: '50% Relief', label: 'Presumptive Tax Relief', source: 'Income Tax Sec 44ADA' },
        { metric: '340%', label: 'Growth in n8n & Prompt Engineer Openings', source: 'Tech in Asia 2025' }
      ],
      mainsFramework: {
        question: lang === 'hi' 
          ? 'इंटरव्यू / केस स्टडी प्रश्न: "एक सिंगापुर आधारित फिनटेक बैंक के लिए एक ऐसा स्वायत्त AI वर्कफ्लो डिजाइन करें जो 10,000 ग्राहक शिकायतों को स्वचालित रूप से वर्गीकृत और हल कर सके, जिसमें 0% हैलूसिनेशन हो।"'
          : 'Interview Case Study: "Design an autonomous enterprise AI pipeline for a Singapore fintech firm handling 10,000 daily KYC inquiries with zero hallucination guarantee."',
        marks: 'Global Tech Job Assessment / Senior Role',
        intro: lang === 'hi' 
          ? 'प्रस्तावना: Claude 3.5 Sonnet XML टैगिंग और n8n एजेंटिक पाइपलाइन के संयुक्त आर्किटेक्चर का उल्लेख करें।'
          : 'Architecture Overview: High-speed ingestion via n8n webhook, JSON validation layer, and Claude 3.5 structured execution.',
        dimensions: [
          lang === 'hi' ? 'डेटा अंतर्ग्रहण: n8n ऑटोमेशन ट्रिगर से रियल-टाइम API कॉल्स।' : 'Ingestion: Webhook orchestration into vector database.',
          lang === 'hi' ? 'प्रॉम्प्ट कंट्रोल: XML टैग्स (<context>, <rules>, <output_schema>) के जरिए सख्त सीमाएं।' : 'Prompt Boundary: Strict JSON schema output enforcement.',
          lang === 'hi' ? 'सुरक्षा व अनुपालन: सिंगापुर PDPA डेटा संरक्षण और शून्य लीकेज ऑडिट ट्रेल।' : 'Security: Singapore PDPA compliance and end-to-end encryption.'
        ],
        diagramTip: lang === 'hi' ? 'फ्लोचार्ट: Webhook -> Claude 3.5 XML Guardrail -> JSON Validator -> FinTech ERP Action' : 'Flowchart: Customer Query -> Vector Search -> Structured LLM -> Validation -> CRM',
        conclusion: lang === 'hi' 
          ? 'निष्कर्ष: यह प्रणाली मैनुअल कार्य को 80% कम करती है और बैंक को प्रति माह $40,000 की शुद्ध बचत कराती है।'
          : 'Business Impact: Eliminates 80% manual triage, ensuring sub-second response times.'
      },
      graphicIllustrationConcept: {
        title: lang === 'hi' ? 'सिंगापुर व ग्लोबल AI वर्कफ्लो आर्किटेक्चर' : 'Singapore Global AI Career Architecture',
        visualNodes: [
          { label: 'S$6,000 - S$13,500', sub: 'Verified Singapore Monthly Salary', color: 'from-emerald-600 to-teal-600' },
          { label: 'Claude 3.5 + n8n', sub: 'Primary Enterprise AI Stack', color: 'from-blue-600 to-cyan-600' },
          { label: 'Single-Column ATS', sub: '0-Photo High-Impact Resume', color: 'from-purple-600 to-pink-600' },
          { label: '0% GST (LUT)', sub: 'Full Legal Export Exemption', color: 'from-amber-600 to-orange-600' }
        ]
      }
    };
  }

  // 3. SCIENCE / NCERT / ACADEMIC (Photosynthesis, Light, Ohm's Law, Water Cycle, Cell)
  if (
    q.includes('photosynthesis') || 
    q.includes('प्रकाश संश्लेषण') || 
    q.includes('science') || 
    q.includes('विज्ञान') || 
    q.includes('ohm') || 
    q.includes('जल चक्र') || 
    q.includes('water cycle') || 
    q.includes('cell') || 
    q.includes('कोशिका') ||
    q.includes('physics') ||
    q.includes('chemistry')
  ) {
    const isPhotosynthesis = q.includes('photosynthesis') || q.includes('प्रकाश संश्लेषण');
    const isOhm = q.includes('ohm') || q.includes('ओम');
    const isWater = q.includes('जल चक्र') || q.includes('water cycle');

    const topicName = isPhotosynthesis 
      ? (lang === 'hi' ? 'प्रकाश संश्लेषण (Photosynthesis): 360° रासायनिक व जैव वैज्ञानिक विश्लेषण' : 'Photosynthesis: 360° Biochemical & Ecological Blueprint')
      : isOhm 
        ? (lang === 'hi' ? 'ओम का नियम (Ohm\'s Law): विद्युत परिपथ व V=IR 360° विश्लेषण' : 'Ohm\'s Law: Circuit Analysis & Resistance Dynamics')
        : isWater 
          ? (lang === 'hi' ? 'जल चक्र (Water Cycle): जलीय चक्रण व पर्यावरणीय 360° विश्लेषण' : 'Hydrological Cycle: 360° Environmental & Geospatial Dynamics')
          : (lang === 'hi' ? `${query} : NCERT 360° वैज्ञानिक व तकनीकी विश्लेषण` : `${query}: NCERT 360° Scientific & Practical Analysis`);

    return {
      topicTitle: topicName,
      paperLinkage: 'NCERT CLASS 6-12 • GS PAPER-III: SCIENCE & TECHNOLOGY / ENVIRONMENT',
      editionTag: 'JITOMNI ACADEMIC SCIENCE SPECIAL • 360° CRITICAL REVIEW',
      badgeColor: 'from-cyan-600 to-blue-800',
      whyInNews: {
        heading: lang === 'hi' ? 'वैज्ञानिक महत्व व परीक्षा संदर्भ' : 'Scientific Importance & Exam Relevance',
        points: [
          lang === 'hi' 
            ? 'कक्षा 10 बोर्ड व प्रतियोगी परीक्षाओं (NEET, JEE, SSC, State PCS) में प्रकाश-रासायनिक अभिक्रियाओं और हरितगृह प्रभाव पर लगातार 3-5 प्रश्न।'
            : 'Core foundational topic with recurring multi-tier questions across Board Exams, NEET, JEE, and State Services.',
          lang === 'hi'
            ? 'जलवायु परिवर्तन, कार्बन सीक्वेस्ट्रेशन और भविष्य के कृत्रिम प्रकाश संश्लेषण (Artificial Photosynthesis) में वैश्विक शोध।'
            : 'Global breakthroughs in artificial photosynthesis and solar fuel conversion addressing energy security.',
          lang === 'hi'
            ? 'सैद्धांतिक परिभाषा से हटकर प्रायोगिक सत्यापन और 10-सेकंड संख्यात्मक शॉर्टकट की आवश्यकता।'
            : 'Shift from rote definitions toward circuit diagrams, reaction equations, and numerical speed shortcuts.'
        ]
      },
      mindmapMermaidCode: isPhotosynthesis 
        ? `graph TD
  A[प्रकाश संश्लेषण / Photosynthesis<br/>6CO2 + 6H2O + Light -> C6H12O6 + 6O2] --> B[कच्ची सामग्रियां / Reactants]
  A --> C[क्लोरोप्लास्ट / Thylakoid & Stroma]
  A --> D[दो चरण / Dual Phases]
  A --> E[उत्पाद / Final Products]
  B --> B1[सूर्य का प्रकाश / Photons]
  B --> B2[CO2 - वायुमंडल से स्टोमेटा द्वारा]
  B --> B3[H2O - जड़ों द्वारा अवशोषित]
  D --> D1[प्रकाशिक अभिक्रिया - थाइलाकोइड में O2 मुक्ति]
  D --> D2[अप्रकाशिक केल्विन चक्र - स्ट्रोमा में ग्लूकोज निर्माण]
  E --> E1[ग्लूकोज - पौधों का आहार व स्टार्च]
  E --> E2[ऑक्सीजन - जीवनदायिनी गैस उप-उत्पाद]`
        : `graph TD
  A[वैज्ञानिक संकल्पना: ${query}] --> B[आधारभूत सिद्धांत व नियम]
  A --> C[गणितीय समीकरण व सूत्र]
  A --> D[प्रायोगिक सत्यापन व परिपथ]
  A --> E[दैनिक जीवन में अनुप्रयोग]
  B --> B1[कारण व परिणाम संबंध]
  C --> C1[मानक मात्रक व विमाएं]
  D --> D1[ग्राफिकल निरूपण]
  E --> E1[औद्योगिक व पर्यावरणीय उपयोग]`,
      visualProcessSteps: [
        {
          stepNumber: 1,
          title: lang === 'hi' ? 'प्रकाश ऊर्जा का अवशोषण' : 'Light Absorption & Excitation',
          description: lang === 'hi' ? 'क्लोरोफिल वर्णक द्वारा फोटॉन अवशोषण व इलेक्ट्रॉनों का उत्तेजन।' : 'Chlorophyll pigment captures solar photons, initiating electron transport.'
        },
        {
          stepNumber: 2,
          title: lang === 'hi' ? 'जल का प्रकाशिक अपघटन (Photolysis)' : 'Photolysis of Water',
          description: lang === 'hi' ? '2H2O -> 4H+ + 4e- + O2 (यहीं से ऑक्सीजन गैस निकलती है)।' : 'Water molecules split into protons, electrons, and free oxygen gas.'
        },
        {
          stepNumber: 3,
          title: lang === 'hi' ? 'ऊर्जा यौगिकों का निर्माण' : 'ATP & NADPH Synthesis',
          description: lang === 'hi' ? 'थाइलाकोइड में रासायनिक ऊर्जा (ATP व NADPH) का संचय।' : 'Light reactions yield energy carriers ATP and NADPH.'
        },
        {
          stepNumber: 4,
          title: lang === 'hi' ? 'केल्विन चक्र व कार्बन स्थिरीकरण' : 'Calvin Cycle & Glucose Storage',
          description: lang === 'hi' ? 'स्ट्रोमा में CO2 का अपचयन होकर ग्लूकोज (C6H12O6) का निर्माण।' : 'Stroma enzymes fix CO2 into durable glucose and storage starch.'
        }
      ],
      multidimensionalMatrix: {
        constitutionalLegal: {
          title: lang === 'hi' ? '🏛️ पर्यावरणीय कानून व नीतिगत आयाम' : '🏛️ Environmental Law & Policy Context',
          points: [
            lang === 'hi' ? 'अनुच्छेद 48A और 51A(g): वनों, झीलों, और वन्यजीवों की रक्षा करना राज्य व प्रत्येक नागरिक का संवैधानिक कर्तव्य है।' : 'Art 48A & 51A(g): State duty and citizen fundamental duty to preserve natural forests and plant cover.',
            lang === 'hi' ? 'राष्ट्रीय वनीकरण कार्यक्रम व पेरिस समझौता: भारत का 2.5 से 3 बिलियन टन अतिरिक्त कार्बन सिंक बनाने का राष्ट्रीय लक्ष्य।' : 'India NDC Commitment: Creating 2.5-3 billion tonnes of additional carbon sink via green biomass.'
          ]
        },
        economicFinancial: {
          title: lang === 'hi' ? '💰 कृषि, ऊर्जा व बायो-इकोनॉमी' : '💰 Agronomic, Energy & Bio-Economy Impact',
          points: [
            lang === 'hi' ? 'फसल उत्पादकता: प्रकाश संश्लेषण की दक्षता (Photosynthetic Efficiency) में 1% सुधार से खाद्यान्न उपज में 15% की वृद्धि संभव।' : '1% boost in photosynthetic efficiency yields 15% increase in global cereal output.',
            lang === 'hi' ? 'बायोफ्यूल व बायोमास: सौर ऊर्जा को रासायनिक ऊर्जा में बदलने वाली प्राकृतिक जैव-ऊर्जा का बाजार ₹50,000 करोड़ का है।' : 'Bio-energy and ethanol blending economy anchored entirely upon plant photosynthetic biomass.'
          ]
        },
        socialHuman: {
          title: lang === 'hi' ? '👥 मानव जीवन व पारिस्थितिकी संतुलन' : '👥 Human Survival & Ecological Balance',
          points: [
            lang === 'hi' ? 'पृथ्वी पर जीवन का प्राथमिक आधार: सभी शाकाहारी और मांसाहारी जीवों की खाद्य श्रृंखला का प्रारंभिक बिंदु यही है।' : 'Primary producer bedrock: Earth trophic food web is 100% dependent on plant photosynthesis.',
            lang === 'hi' ? 'ऑक्सीजन चक्र: वायुमंडलीय 21% ऑक्सीजन का स्तर बनाए रखने और ओजोन परत के सुरक्षा कवच का निर्माण।' : 'Sustains 21% atmospheric oxygen and regenerates stratospheric ozone shield.'
          ]
        },
        techGlobalEnvironmental: {
          title: lang === 'hi' ? '🌍 अत्याधुनिक अनुसंधान व भविष्य की तकनीक' : '🌍 Frontier Research & Global Innovations',
          points: [
            lang === 'hi' ? 'आर्टिफिशियल फोटोसिंथेसिस (कृत्रिम प्रकाश संश्लेषण): प्रयोगशाला में सूर्य के प्रकाश और पानी से सीधे हरित हाइड्रोजन (Green Hydrogen) का उत्पादन।' : 'Artificial photosynthesis producing green hydrogen and synthetic zero-emission fuels directly from sunlight.',
            lang === 'hi' ? 'C4 और CAM फसलें: जलवायु परिवर्तन के दौर में कम पानी में अधिकतम भोजन बनाने वाली फसलों (मक्का, बाजरा) का जीनोमिक संवर्धन।' : 'Genetically engineered C4 pathways in C3 crops to withstand extreme droughts.'
          ]
        }
      },
      criticalChallenges: [
        {
          challenge: lang === 'hi' ? 'ग्लोबल वार्मिंग व तापमान वृद्धि' : 'Thermal Stomata Closure',
          severity: 'Critical',
          impact: lang === 'hi' ? '35°C से अधिक तापमान पर पौधे वाष्पोत्सर्जन रोकने के लिए स्टोमेटा बंद कर लेते हैं, जिससे प्रकाश संश्लेषण 40% घट जाता है।' : 'High heat forces stomatal closure, halting CO2 uptake and crashing crop yields.'
        },
        {
          challenge: lang === 'hi' ? 'वनों की अंधाधुंध कटाई (Deforestation)' : 'Rapid Global Deforestation',
          severity: 'High',
          impact: lang === 'hi' ? 'प्रतिवर्ष लाखों हेक्टेयर वन नष्ट होने से पृथ्वी का कार्बन सोखने का फेफड़ा सिकुड़ रहा है।' : 'Shrinking global green cover accelerating atmospheric CO2 accumulation.'
        }
      ],
      wayForward: [
        {
          title: lang === 'hi' ? 'शहरी मियावाकी वन व कृषि वानिकी (Agroforestry)' : 'Urban Forests & Agroforestry Expansion',
          agencyOrModel: 'ICAR & MoEFCC Action Plan',
          actionableStep: lang === 'hi' ? 'प्रत्येक खेत की मेड़ पर पेड़ लगाना और शहरों में सूक्ष्म-वन विकसित करना।' : 'Promote multi-strata agroforestry and Miyawaki urban forest clusters.'
        },
        {
          title: lang === 'hi' ? 'प्रयोगशाला-आधारित 360° व्यावहारिक शिक्षण' : 'Hands-on NCERT Visual Demonstrations',
          agencyOrModel: 'JITOMNI School 360° Lab',
          actionableStep: lang === 'hi' ? 'स्टार्च परीक्षण (Iodine Test) और प्रकाश तीव्रता के प्रभाव को 3D सिमुलेशन से समझना।' : 'Interactive iodine starch test and stomatal peel microscopic visualization.'
        }
      ],
      keyDataPoints: [
        { metric: '6CO2 + 6H2O', label: 'Balanced Reaction Inputs', source: 'NCERT Class 10' },
        { metric: '21%', label: 'Atmospheric O2 Sustained', source: 'Geochemical Cycle' },
        { metric: 'Chlorophyll', label: 'Magnesium (Mg) Centered Pigment', source: 'Core Bio-Molecule' },
        { metric: '10s Trick', label: 'Photosynthesis occurs in chloroplast; oxygen comes from H2O, not CO2', source: 'PYQ Golden Rule' }
      ],
      mainsFramework: {
        question: lang === 'hi' 
          ? 'प्रश्न: "प्रकाश संश्लेषण केवल एक पादप प्रक्रिया नहीं है, बल्कि यह वैश्विक कार्बन चक्र और पृथ्वी के जलवायु संतुलन का आधार स्तंभ है।" समालोचनात्मक व्याख्या कीजिए। (15 अंक / 250 शब्द)'
          : 'Question: "Photosynthesis is not merely a botanical process, but the master pillar of planetary carbon balance and climate stability." Discuss. (15 Marks / 250 Words)',
        marks: '15 Marks / 250 Words (UPSC GS-3 / State PCS)',
        intro: lang === 'hi' 
          ? 'प्रस्तावना: प्रकाश संश्लेषण का संतुलित रासायनिक समीकरण लिखें और बताएं कि यह सौर ऊर्जा को जैव-रासायनिक ऊर्जा में बदलने वाला पृथ्वी का एकमात्र वृहद प्राकृतिक संयंत्र है।'
          : 'Introduction: State the foundational chemical equation and define it as the planetary engine converting cosmic solar energy into organic biosphere currency.',
        dimensions: [
          lang === 'hi' ? 'जैव-रासायनिक तंत्र: प्रकाशिक व अप्रकाशिक चरणों का स्पष्ट विभाजन और जल के अपघटन से ऑक्सीजन मुक्ति।' : 'Biochemical mechanisms: Photolysis in thylakoids and enzymatic carbon fixation in stroma.',
          lang === 'hi' ? 'पारिस्थितिक भूमिका: ट्रोफिक स्तरों पर ऊर्जा प्रवाह का 10% नियम और वैश्विक कार्बन सिंक।' : 'Ecological role: Energy transfer across trophic levels and global carbon sink mechanics.',
          lang === 'hi' ? 'जलवायु परिवर्तन के खतरे: तापमान वृद्धि, सुपोषण और महासागरीय पादपप्लवक (Phytoplankton) का ह्रास।' : 'Vulnerabilities: Phytoplankton acidification and rising temperature impacts.',
          lang === 'hi' ? 'भविष्योन्मुखी तकनीकें: कृत्रिम प्रकाश संश्लेषण और जेनेटिकली मॉडिफाइड C4 चावल अनुसंधान।' : 'Technological frontiers: Artificial photosynthetic fuels and C4 genome editing.'
        ],
        diagramTip: lang === 'hi' ? 'फ्लोचार्ट: सूर्य का प्रकाश + CO2 + H2O -> क्लोरोप्लास्ट -> ग्लूकोज (आहार) + O2 (वायुमंडल)' : 'Diagram Tip: Draw chloroplast showing light reaction (H2O -> O2) connected to Calvin cycle (CO2 -> Glucose).',
        conclusion: lang === 'hi' 
          ? 'निष्कर्ष: हरित आवरण की रक्षा करना केवल पर्यावरण संरक्षण नहीं, बल्कि भावी पीढ़ियों के अस्तित्व की अनिवार्य पूर्वशर्त है।'
          : 'Conclusion: Safeguarding vegetal and marine photosynthetic systems is essential for planetary biosphere resilience.'
      },
      graphicIllustrationConcept: {
        title: lang === 'hi' ? 'प्रकाश संश्लेषण 360° विजुअल आर्किटेक्चर' : 'Photosynthesis 360° Concept Architecture',
        visualNodes: [
          { label: 'Sunlight + Photons', sub: 'Primary Energy Source', color: 'from-amber-500 to-yellow-600' },
          { label: 'Water (H2O)', sub: 'Photolysis Yields Free O2', color: 'from-cyan-500 to-blue-600' },
          { label: 'CO2 from Stomata', sub: 'Fixed into Glucose Matrix', color: 'from-purple-500 to-indigo-600' },
          { label: 'Glucose (C6H12O6)', sub: 'Primary Biosphere Nutrition', color: 'from-emerald-500 to-teal-600' }
        ]
      }
    };
  }

  // 4. GENERAL DYNAMIC FALLBACK: Synthesizes a true 360° Vision IAS Magazine Infographic for ANY topic
  return {
    topicTitle: lang === 'hi' ? `${query} : 360° बहुआयामी विश्लेषण व इन्फोग्राफिक` : `${query}: 360° Multidimensional Analysis & Infographic`,
    paperLinkage: 'GENERAL STUDIES / CURRICULUM INTEGRATED • JITOMNI 360° CORE',
    editionTag: 'JITOMNI SPECIAL EDITION • 360° CRITICAL ANALYSIS',
    badgeColor: 'from-indigo-600 to-purple-800',
    whyInNews: {
      heading: lang === 'hi' ? 'चर्चा में क्यों है? (Context & Triggers)' : 'Context & Strategic Relevance',
      points: [
        lang === 'hi' 
          ? `विषय "${query}" वर्तमान में प्रतियोगी परीक्षाओं, शैक्षणिक मूल्यांकन और उद्योग की बदलती जरूरतों के केंद्र में है।`
          : `Topic "${query}" represents high-impact conceptual and applied knowledge across modern syllabi.`,
        lang === 'hi'
          ? 'रट्टा मारने की पारंपरिक पद्धति को समाप्त कर 360° संकल्पनात्मक स्पष्टता (Conceptual Clarity) की आवश्यकता।'
          : 'Transitioning from superficial memorization to comprehensive first-principles mastery.',
        lang === 'hi'
          ? 'सैद्धांतिक ज्ञान को व्यावहारिक रोजगार और परीक्षा समाधानों से 100% जोड़ने की अनिवार्यता।'
          : 'Directly bridging academic theory with sovereign career application and problem-solving speed.'
      ]
    },
    mindmapMermaidCode: `graph TD
  A[${query.replace(/["'<>]/g, '')}<br/>360° कोर संकल्पना] --> B[आधारभूत सिद्धांत]
  A --> C[बहुआयामी प्रभाव]
  A --> D[चुनौतियाँ व गतिरोध]
  A --> E[आगे की राह व समाधान]
  B --> B1[परिभाषा व प्राथमिक नियम]
  C --> C1[आर्थिक व सामाजिक आयाम]
  C --> C2[विधिक व नीतिगत ढांचा]
  D --> D1[क्रियान्वयन में बाधाएं]
  E --> E1[रणनीतिक सुधार व सर्वोत्तम अभ्यास]`,
    visualProcessSteps: [
      {
        stepNumber: 1,
        title: lang === 'hi' ? 'मूल संकल्पना व परिभाषा' : 'Core Definitions & Axioms',
        description: lang === 'hi' ? 'विषय के मूल सिद्धांतों और प्राथमिक चरों की स्पष्ट पहचान।' : 'Isolating fundamental variables, core definitions, and boundary conditions.'
      },
      {
        stepNumber: 2,
        title: lang === 'hi' ? 'कारण-प्रभाव विश्लेषण' : 'Cause-and-Effect Architecture',
        description: lang === 'hi' ? 'यह कैसे काम करता है और इसके परिणाम समाज व व्यवस्था पर क्या होते हैं।' : 'Tracing operational causality and structural dependencies.'
      },
      {
        stepNumber: 3,
        title: lang === 'hi' ? 'क्रिटिकल इवैल्यूएशन' : 'Critical Evaluation & Gaps',
        description: lang === 'hi' ? 'कमजोरियों, गतिरोधों और व्यवस्थागत सीमाओं का वस्तुनिष्ठ विश्लेषण।' : 'Identifying friction points, implementation deficits, and systemic bottlenecks.'
      },
      {
        stepNumber: 4,
        title: lang === 'hi' ? 'समाधान व परिणाम' : 'Pragmatic Roadmap & Synthesis',
        description: lang === 'hi' ? 'सर्वोत्तम प्रथाओं के आधार पर व्यावहारिक व परिणामोन्मुख आगे की राह।' : 'Actionable policy or procedural steps to achieve target outcomes.'
      }
    ],
    multidimensionalMatrix: {
      constitutionalLegal: {
        title: lang === 'hi' ? '🏛️ नीतिगत, विधिक व संस्थागत आयाम' : '🏛️ Policy, Legal & Institutional Framework',
        points: [
          lang === 'hi' ? 'संस्थागत जवाबदेही: संबंधित वैधानिक नियमों और नीतियों का पारदर्शी क्रियान्वयन सुनिश्चित करना।' : 'Institutional governance mechanisms ensuring rule-of-law adherence and transparency.',
          lang === 'hi' ? 'मानक संचालन प्रक्रिया (SOP): अस्पष्टता को समाप्त कर व्यवस्थित कानूनी प्रोटोकॉल लागू करना।' : 'Standard Operating Procedures eliminating discretionary bias.'
        ]
      },
      economicFinancial: {
        title: lang === 'hi' ? '💰 आर्थिक, बजटीय व संसाधन आयाम' : '💰 Economic & Resource Allocation Realities',
        points: [
          lang === 'hi' ? 'लागत-लाभ विश्लेषण: न्यूनतम संसाधनों में अधिकतम उत्पादकता और रिटर्न ऑन इन्वेस्टमेंट (ROI)।' : 'Cost-benefit optimization and prudent capital deployment.',
          lang === 'hi' ? 'रोजगार व मूल्य संवर्धन: इस विषय की समझ से बाजार में मांग और वेतन क्षमता में सकारात्मक वृद्धि।' : 'Value-chain enhancement directly multiplying earning and operational efficiency.'
        ]
      },
      socialHuman: {
        title: lang === 'hi' ? '👥 सामाजिक प्रभाव व समावेशिता' : '👥 Social Equity & Human Centricity',
        points: [
          lang === 'hi' ? 'अंतिम व्यक्ति तक पहुंच: समाज के सबसे वंचित वर्ग के लिए लाभ की उपलब्धता सुनिश्चित करना।' : 'Last-mile equity ensuring benefits reach marginalized demographics.',
          lang === 'hi' ? 'जन-जागरूकता व सहभागिता: नागरिक चेतना और सक्रिय भागीदारी के बिना दीर्घकालिक सफलता असंभव।' : 'Citizen empowerment and grassroot community engagement.'
        ]
      },
      techGlobalEnvironmental: {
        title: lang === 'hi' ? '🌍 तकनीकी व वैश्विक सर्वोत्तम अभ्यास' : '🌍 Technology, Global Standards & Sustainability',
        points: [
          lang === 'hi' ? 'डिजिटल एकीकरण: ऑटोमेशन और AI टूल्स द्वारा मानवीय त्रुटियों को 0% के करीब लाना।' : 'Digital enablement and algorithmic oversight cutting friction.',
          lang === 'hi' ? 'वैश्विक बेंचमार्क: अंतरराष्ट्रीय स्तर पर सफल मॉडलों (जैसे सिंगापुर, नॉर्डिक देश) का अनुकूलन।' : 'Benchmarking against leading global practices adapted for Indian context.'
        ]
      }
    },
    criticalChallenges: [
      {
        challenge: lang === 'hi' ? 'सिद्धांत और व्यवहार में अंतर' : 'Theory-Practice Implementation Gap',
        severity: 'Critical',
        impact: lang === 'hi' ? 'कागजी योजनाओं और जमीनी हकीकत के बीच समन्वय की कमी से अपेक्षित परिणाम न मिलना।' : 'Disconnection between policy blueprints and grassroots field realities.'
      },
      {
        challenge: lang === 'hi' ? 'संसाधनों व कौशल का अभाव' : 'Skill Deficit & Resource Crunch',
        severity: 'High',
        impact: lang === 'hi' ? 'उचित प्रशिक्षण और आधुनिक उपकरणों की अनुपलब्धता से विकास की गति बाधित होना।' : 'Inadequate infrastructural provisioning retarding full-potential realization.'
      }
    ],
    wayForward: [
      {
        title: lang === 'hi' ? 'चरणबद्ध कार्ययोजना व निगरानी' : 'Phased Execution with Real-Time KPIs',
        agencyOrModel: 'Strategic Planning Framework',
        actionableStep: lang === 'hi' ? 'प्रत्येक चरण के लिए स्पष्ट समयसीमा और उत्तरदायित्व तय करना।' : 'Establish concrete milestones with objective quantitative tracking.'
      },
      {
        title: lang === 'hi' ? 'क्षमता निर्माण व डिजिटल टूल्स का प्रयोग' : 'Capacity Building via Digital Ecosystem',
        agencyOrModel: 'JITOMNI 360° Standard',
        actionableStep: lang === 'hi' ? 'नवीनतम तकनीकों और व्यावहारिक प्रशिक्षण द्वारा युवाओं को सशक्त बनाना।' : 'Equip stakeholders with state-of-the-art tools and practical drills.'
      }
    ],
    keyDataPoints: [
      { metric: '360°', label: 'Holistic Critical View', source: 'Zero Rote Philosophy' },
      { metric: '100%', label: 'Demand-Aligned Focus', source: 'Sovereign Benchmark' },
      { metric: '4-Pillars', label: 'Legal, Economic, Social, Tech', source: 'Vision IAS Standard' },
      { metric: 'Step-by-Step', label: 'First Principles Logic', source: 'JITOMNI AI Core' }
    ],
    mainsFramework: {
      question: lang === 'hi' 
        ? `प्रश्न: "${query} के बहुआयामी पक्षों का समालोचनात्मक परीक्षण कीजिए और इसके प्रभावी क्रियान्वयन हेतु व्यावहारिक समाधान सुझाइए।" (15 अंक / 250 शब्द)`
        : `Question: "Critically examine the multidimensional facets of ${query} and propose an actionable roadmap for sustainable implementation." (15 Marks / 250 Words)`,
      marks: '15 Marks / 250 Words (Analytical Framework)',
      intro: lang === 'hi' 
        ? 'प्रस्तावना (15% शब्द): विषय के संदर्भ, पृष्ठभूमि और इसके व्यापक महत्व को संक्षेप में परिभाषित करें।'
        : 'Introduction: Provide concise definitions, macro context, and core significance of the subject matter.',
      dimensions: [
        lang === 'hi' ? 'सकारात्मक पक्ष व अवसर: व्यवस्था और समाज को मिलने वाले प्रत्यक्ष लाभ।' : 'Opportunities: Tangible strategic and operational advantages.',
        lang === 'hi' ? 'चुनौतियाँ व संरचनात्मक बाधाएं: प्रमुख अवरोध जो प्रगति को रोकते हैं।' : 'Structural challenges: Hidden bottlenecks impeding seamless scale.',
        lang === 'hi' ? 'सर्वोत्तम अंतरराष्ट्रीय व राष्ट्रीय केस स्टडीज का संदर्भ।' : 'Case studies: Grounded precedents from proven international benchmarks.'
      ],
      diagramTip: lang === 'hi' ? 'फ्लोचार्ट सुझाव: केंद्र में विषय और चारों कोनों पर 4 आयाम (कानूनी, आर्थिक, सामाजिक, तकनीकी) बनाकर तीर के निशान से जोड़ें।' : 'Diagram Tip: Draw a 4-quadrant diagram mapping Stakeholders -> Process -> Barriers -> Outcomes.',
      conclusion: lang === 'hi' 
        ? 'निष्कर्ष (15% शब्द): एक संतुलित, आशावादी और भविष्योन्मुखी निष्कर्ष लिखें जो आगे की राह को स्पष्ट करे।'
        : 'Conclusion: Synthesize an optimistic, balanced way forward prioritizing resilience and equity.'
    },
    graphicIllustrationConcept: {
      title: lang === 'hi' ? '360° विजुअल कॉन्सेप्ट मैप' : '360° Conceptual Node Matrix',
      visualNodes: [
        { label: 'Core Axioms', sub: 'Foundational Truths', color: 'from-blue-600 to-indigo-600' },
        { label: 'Multidimensional Matrix', sub: '4 Strategic Pillars', color: 'from-emerald-600 to-teal-600' },
        { label: 'Bottleneck Analysis', sub: 'Overcoming Friction', color: 'from-amber-600 to-orange-600' },
        { label: 'Way Forward', sub: 'Actionable Synthesis', color: 'from-purple-600 to-pink-600' }
      ]
    }
  };
}
