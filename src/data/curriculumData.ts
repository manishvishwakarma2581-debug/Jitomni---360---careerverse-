import { ChapterItem, ClassLevel, CompetitiveExam, MockExamConfig, QuizQuestion, SubjectItem, TopicItem } from '../types';

export const mockExamConfigs: Partial<Record<CompetitiveExam, MockExamConfig>> = {
  UPSC: {
    id: 'exam-upsc',
    examType: 'UPSC',
    title: {
      hi: 'UPSC सिविल सेवा प्रारंभिक परीक्षा (GS Paper 1)',
      en: 'UPSC Civil Services Prelims (GS Paper 1)',
      hinglish: 'UPSC CSE Prelims Mock Test (GS Paper 1)',
    },
    totalQuestions: 20, // Rapid high-yield mock subset for web MVP (pattern scalable to 100)
    durationMinutes: 30,
    marksPerQuestion: 2.0,
    negativeMarkingRatio: 0.333,
    subjects: ['Indian Polity', 'Modern History', 'Geography & Environment', 'Indian Economy', 'Science & Tech'],
  },
  MPPSC: {
    id: 'exam-mppsc',
    examType: 'MPPSC',
    title: {
      hi: 'MPPSC राज्य सेवा परीक्षा (सामान्य अध्ययन प्रश्नपत्र 1)',
      en: 'MPPSC State Services Exam (General Studies Paper 1)',
      hinglish: 'MPPSC State Services GS Paper 1 Mock Test',
    },
    totalQuestions: 20,
    durationMinutes: 25,
    marksPerQuestion: 2.0,
    negativeMarkingRatio: 0.0, // MPPSC prelims generally no negative marking
    subjects: ['MP General Knowledge', 'Indian Constitution', 'MP History & Culture', 'Geography of MP', 'Science'],
  },
  SSC: {
    id: 'exam-ssc',
    examType: 'SSC',
    title: {
      hi: 'SSC CGL / CHSL Tier-1 समग्र अभ्यास परीक्षा',
      en: 'SSC CGL / CHSL Tier-1 Combined Mock Test',
      hinglish: 'SSC CGL/CHSL Tier-1 General Studies & Reasoning',
    },
    totalQuestions: 25,
    durationMinutes: 25,
    marksPerQuestion: 2.0,
    negativeMarkingRatio: 0.25,
    subjects: ['General Awareness', 'Quantitative Aptitude', 'Reasoning', 'General Science'],
  },
  Railway: {
    id: 'exam-railway',
    examType: 'Railway',
    title: {
      hi: 'रेलवे RRB NTPC / Group D CBT परीक्षा',
      en: 'Railway RRB NTPC / Group D CBT Mock Test',
      hinglish: 'Railway RRB NTPC Full Length Practice Exam',
    },
    totalQuestions: 20,
    durationMinutes: 20,
    marksPerQuestion: 1.0,
    negativeMarkingRatio: 0.333,
    subjects: ['General Science', 'General Awareness', 'Maths & Logic'],
  },
  'MP Police': {
    id: 'exam-mppolice',
    examType: 'MP Police',
    title: {
      hi: 'मध्य प्रदेश पुलिस आरक्षक एवं SI परीक्षा',
      en: 'MP Police Constable & Sub-Inspector Test',
      hinglish: 'MP Police Constable & SI Targeted Mock Exam',
    },
    totalQuestions: 20,
    durationMinutes: 20,
    marksPerQuestion: 1.0,
    negativeMarkingRatio: 0.0,
    subjects: ['MP GK & Current Affairs', 'General Science', 'Mental Ability & Reasoning'],
  },
  Patwari: {
    id: 'exam-patwari',
    examType: 'Patwari',
    title: {
      hi: 'MP पटवारी एवं संयुक्त भर्ती परीक्षा',
      en: 'MP Patwari & Combined Group Exam',
      hinglish: 'MP Patwari & Rural Economy Special Mock Test',
    },
    totalQuestions: 20,
    durationMinutes: 20,
    marksPerQuestion: 1.0,
    negativeMarkingRatio: 0.0,
    subjects: ['Rural Economy & Panchayati Raj', 'General Hindi', 'General Knowledge', 'Computer Awareness'],
  },
  CTET: {
    id: 'exam-ctet',
    examType: 'CTET',
    title: {
      hi: 'CTET / State TET शिक्षक पात्रता परीक्षा (Paper 1 & 2)',
      en: 'CTET / State TET Teacher Eligibility Exam',
      hinglish: 'CTET Child Development & Pedagogy Mock Test',
    },
    totalQuestions: 20,
    durationMinutes: 25,
    marksPerQuestion: 1.0,
    negativeMarkingRatio: 0.0,
    subjects: ['Child Development & Pedagogy', 'Environmental Studies (EVS)', 'Language Pedagogy', 'Mathematics'],
  },
  Teacher: {
    id: 'exam-teacher',
    examType: 'Teacher',
    title: {
      hi: 'शिक्षक पात्रता एवं भर्ती परीक्षा (MP Varg 1/2/3, CTET, Super TET)',
      en: 'Teacher Eligibility & Recruitment Mock Exam (Varg 1/2/3 & CTET)',
      hinglish: 'Teacher Exam Mock Test (Child Pedagogy, EVS & Science)',
    },
    totalQuestions: 20,
    durationMinutes: 25,
    marksPerQuestion: 1.0,
    negativeMarkingRatio: 0.0,
    subjects: ['Child Development & Pedagogy', 'Environmental Studies & Science', 'Hindi & English Pedagogy', 'Mathematics'],
  },
};

// Rich 360° topic for Water Cycle / Jal Chakra
export const waterCycleTopic: TopicItem = {
  id: 'topic-water-cycle',
  name: {
    hi: 'जल चक्र (Water Cycle)',
    en: 'The Water Cycle (Hydrological Cycle)',
    hinglish: 'Jal Chakra (The Water Cycle)',
  },
  subject: 'Science / EVS',
  chapter: 'Our Natural Environment',
  difficulty: 'Easy',
  framework: {
    kya: {
      title: {
        hi: 'जल चक्र क्या है? (मूल संकल्पना)',
        en: 'What is the Water Cycle? (Core Concept)',
        hinglish: 'Water Cycle kya hai? (Core Concept)',
      },
      content: {
        hi: 'जल चक्र पृथ्वी पर जल का वायुमंडल, भूमि और महासागरों के बीच एक निरंतर चलने वाला प्राकृतिक चक्र है। इसमें पानी कभी खत्म नहीं होता, बस अपना रूप (ठोस, द्रव, गैस) बदलता रहता है।',
        en: 'The water cycle is the continuous natural journey of water moving from Earth’s oceans and land into the atmosphere and back again, continuously recycling our planet’s freshwater.',
        hinglish: 'Water Cycle nature ka ek endless cycle hai jisme pani ocean, zameen aur hawa ke beech circulate hota hai. Pani na banta hai na khatam hota hai, bas form change karta hai.',
      },
      bulletPoints: {
        hi: [
          'पृथ्वी पर 97% खारा पानी है, केवल 3% मीठा पानी है।',
          'सूर्य इस चक्र का मुख्य ऊर्जा इंजन (Driving Force) है।',
          'इसके मुख्य 4 चरण हैं: वाष्पीकरण, संघनन, वर्षण, और संचयन।',
        ],
        en: [
          'Over 97% of Earth’s water is in oceans, only ~3% is freshwater.',
          'The Sun powers the entire hydrological cycle.',
          'Four primary phases: Evaporation, Condensation, Precipitation, and Collection.',
        ],
        hinglish: [
          'Duniya ka 97% water salty ocean me hai, sirf 3% freshwater hai.',
          'Suraj ki sunlight aur heat is cycle ka main engine hai.',
          '4 main steps hote hain: Evaporation, Condensation, Precipitation, aur Collection.',
        ],
      },
      analogy: {
        hi: 'साधारण उदाहरण: जैसे घर में चाय की केतली से भाप निकलती है और प्लेट से टकराकर फिर से पानी की बूंदें बन जाती हैं!',
        en: 'Everyday Analogy: Like boiling a kettle where steam touches a cool lid and turns back into water drops.',
        hinglish: 'Real Life Example: Jaise chai banate waqt steam thandi plate se takra kar wapas pani ban jaati hai!',
      },
    },
    kyu: {
      title: {
        hi: 'जल चक्र क्यों जरूरी है? (महत्व व कारण)',
        en: 'Why is the Water Cycle Essential? (Importance)',
        hinglish: 'Water cycle kyu zaroori hai? (Importance)',
      },
      content: {
        hi: 'यदि जल चक्र न हो, तो पूरी पृथ्वी का मीठा पानी कुछ ही वर्षों में समाप्त हो जाएगा, मौसम तंत्र ठप हो जाएगा और जीवन का अस्तित्व असंभव हो जाएगा।',
        en: 'Without the hydrological cycle, freshwater distribution across continents would cease, weather patterns would collapse, and terrestrial life could not survive.',
        hinglish: 'Agar Water Cycle na ho to rivers sukh jayengi, rain band ho jayegi, kheti khatam ho jayegi aur pure Earth par life impossible ho jayegi.',
      },
      criticalReason: {
        hi: 'यह पृथ्वी के तापमान को नियंत्रित रखता है और खारे समुद्र से प्राकृतिक रूप से शुद्ध आसवित जल (Distilled Water) वर्षा के रूप में प्रदान करता है।',
        en: 'It regulates global climate balance and naturally desalinates ocean water into pure freshwater for land ecosystems.',
        hinglish: 'Ye Earth ka temperature cool rakhta hai aur samundar ke khare pani ko naturally filter karke barsaat banata hai.',
      },
    },
    kaise: {
      title: {
        hi: 'यह कैसे कार्य करता है? (चरणबद्ध प्रक्रिया)',
        en: 'How Does it Work? (Step-by-Step Mechanism)',
        hinglish: 'Ye Kaise Work Karta Hai? (Step-by-Step)',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            hi: '1. वाष्पीकरण एवं वाष्पोत्सर्जन (Evaporation & Transpiration)',
            en: '1. Evaporation & Transpiration',
            hinglish: '1. Evaporation & Transpiration (Pani ka Bhaap Banna)',
          },
          description: {
            hi: 'सूर्य की गर्मी से नदियों, तालाबों और पौधों की पत्तियों से जल वाष्प बनकर वायुमंडल में ऊपर उठता है।',
            en: 'Solar heat causes surface water and plant leaves to release water vapor rising into the atmosphere.',
            hinglish: 'Suraj ki heat se pani bhaap ban kar upar aasman me jata hai.',
          },
        },
        {
          stepNumber: 2,
          title: {
            hi: '2. संघनन (Condensation)',
            en: '2. Condensation (Badal Banna)',
            hinglish: '2. Condensation (Badal Banna)',
          },
          description: {
            hi: 'ऊपर उठकर तापमान कम होने से वाष्प ठंडी होकर सूक्ष्म बूंदों में बदलती है और बादलों का निर्माण करती है।',
            en: 'Rising water vapor cools at high altitudes, adhering to dust particles to form clouds.',
            hinglish: 'Upar jaakar thandak se vapor droplets ban kar cloud form karta hai.',
          },
        },
        {
          stepNumber: 3,
          title: {
            hi: '3. वर्षण (Precipitation)',
            en: '3. Precipitation (Varsha / Rain)',
            hinglish: '3. Precipitation (Rain aur Barish)',
          },
          description: {
            hi: 'जब बादलों में बूंदें भारी हो जाती हैं, तो वे गुरुत्वाकर्षण के कारण वर्षा, बर्फ या ओलों के रूप में गिरती हैं।',
            en: 'Dense cloud droplets coalesce and fall to the ground as rain, snow, or hail under gravity.',
            hinglish: 'Jab badal heavy ho jaate hain to gravity ki wajah se barsaat hoti hai.',
          },
        },
        {
          stepNumber: 4,
          title: {
            hi: '4. भूजल पुनर्भरण व संचयन (Infiltration & Runoff)',
            en: '4. Infiltration & Runoff',
            hinglish: '4. Ground Water Recharge & Collection',
          },
          description: {
            hi: 'वर्षा का जल भूमि में रिसकर भूजल बनता है तथा नदियों द्वारा वापस समुद्र में मिल जाता है।',
            en: 'Rainwater seeps into soil aquifers (percolation) or flows through streams back into oceans.',
            hinglish: 'Pani zameen me soak hokar underground water banta hai aur rivers se ocean me chala jata hai.',
          },
        },
      ],
    },
    kisLiye: {
      title: {
        hi: 'किस लिए? (व्यावहारिक उपयोग व जीवन में अनुप्रयोग)',
        en: 'For What Purpose? (Real-World Applications)',
        hinglish: 'Kis Liye? (Real-Life Applications)',
      },
      applications: {
        hi: [
          'कृषि एवं मानसूनी फसलों की सिंचाई (Kharif and Rabi crops)।',
          'जलविद्युत ऊर्जा (Hydroelectric Power Plants) का संचालन।',
          'पारिस्थितिकीय संतुलन और जंगलों का हरा-भरा रहना।',
          'मानव जीवन के लिए पीने योग्य भूजल की उपलब्धता।',
        ],
        en: [
          'Agricultural irrigation and monsoon crop yields.',
          'Hydroelectric energy generation in reservoirs.',
          'Forest biodiversity and ecological balance.',
          'Recharging underground drinking water aquifers.',
        ],
        hinglish: [
          'Farmers ki kheti aur Monsoon crops ke liye direct life-line.',
          'Dams me Hydroelectric power generate karne ke liye.',
          'Jungle, ped-paudhe aur animals ke existence ke liye.',
          'Handpump aur wells ke groundwater recharge ke liye.',
        ],
      },
      realLifeExample: {
        hi: 'मध्य प्रदेश में नर्मदा और चंबल नदियों का प्रवाह इसी जल चक्र पर निर्भर करता है जिससे लाखों किसानों को पानी मिलता है।',
        en: 'The perennial flow of rivers like Narmada and Chambal supports agriculture and drinking water across central India.',
        hinglish: 'Narmada aur Chambal river me pani ka flow isi hydrological cycle se sustain hota hai.',
      },
    },
    currentProblem: {
      title: {
        hi: 'वर्तमान समस्या व गलत धारणाएं (Current Problems)',
        en: 'Current Problems & Misconceptions',
        hinglish: 'Current Problem & Common Mistakes',
      },
      issues: {
        hi: [
          'ग्लोबल वॉर्मिंग से कहीं भयानक बाढ़ तो कहीं सूखा पड़ रहा है (Climate Imbalance)।',
          'कंक्रीट के शहरों के कारण वर्षा जल जमीन में नहीं रिस पाता (Zero Infiltration)।',
          'भूजल का अत्यधिक दोहन जिससे बोरवेल 500-800 फीट गहरे सूख रहे हैं।',
          'गलत धारणा: "पानी कभी खत्म नहीं होगा तो हम जितना चाहें बर्बाद कर सकते हैं।"',
        ],
        en: [
          'Climate disruption leading to erratic monsoons, droughts, and sudden cloudbursts.',
          'Urban concretization blocking natural groundwater percolation and causing flash floods.',
          'Over-extraction of deep aquifers causing alarming water table collapse.',
          'Common Myth: "Since water cycles endlessly, we can waste as much clean water as we want."',
        ],
        hinglish: [
          'Global Warming ki wajah se bemausam barish aur drought create ho raha hai.',
          'Pakki sadak aur concrete ki wajah se barish ka pani zameen ke andar nahi ja paata.',
          'Groundwater over-pumping se borewells sukh rahe hain.',
          'Badi Galatfehmi: "Pani to cycle me wapas aa hi jayega to waste karo" - Fresh clean water limited hai!',
        ],
      },
      misconceptions: {
        hi: 'रटने की बजाय समझना होगा: जल चक्र पानी को पुनः चक्रित करता है, लेकिन दूषित पानी को शुद्ध करने की प्राकृतिक गति सीमित है!',
        en: 'Critical realization: Water is recycled, but fresh clean usable water in accessible aquifers is rapidly depleting!',
        hinglish: 'Critical thinking: Nature pani recycle karti hai, par hamare ground water replenish hone ki speed slow hai!',
      },
    },
    bestSolution: {
      title: {
        hi: '360° सर्वश्रेष्ठ समाधान (Actionable Innovations)',
        en: '360° Best Solutions & Future Innovations',
        hinglish: '360° Best Solution & Smart Steps',
      },
      innovations: {
        hi: [
          'वर्षा जल संचयन (Rooftop Rainwater Harvesting) अनिवार्य करना।',
          'खेतों में मेड़बंदी और तालाब निर्माण (Farm Pond Scheme / अमृत सरोवर)।',
          'ड्रिप इरिगेशन (Drip & Sprinkler) पद्धति जिससे 60% जल की बचत हो।',
          'स्कूलों और गांवों में जल संरक्षण की व्यावहारिक समझ और डिजिटल मॉनिटरिंग।',
        ],
        en: [
          'Mandatory rooftop rainwater harvesting on all school and community buildings.',
          'Revival of village ponds (Amrit Sarovars) and check-dam percolation trenches.',
          'Micro-drip irrigation in agriculture to conserve 60%+ irrigation water.',
          'Village-level smart water budgeting and youth-led conservation squads.',
        ],
        hinglish: [
          'Ghar aur school me Rainwater Harvesting pit banana.',
          'Gaon me Talab aur Amrit Sarovar bana kar barish ka pani store karna.',
          'Drip Irrigation use karke 60% se jyada pani bachana.',
          'Students dwara gaon me Jal Sanrakshan ki awareness failana.',
        ],
      },
      actionableTakeaway: {
        hi: 'संकल्प: "प्रत्येक छात्र अपने घर या स्कूल में एक सोखता गड्ढा (Soak Pit) या रेनवाटर संचयन प्रणाली में योगदान दे।"',
        en: 'Action Pledge: "Every learner actively protects groundwater through rooftop harvesting and water audits."',
        hinglish: 'Pledge: "Apne ghar aur school me barish ka pani zameen me recharge karne me help karenge!"',
      },
    },
  },
  quiz: [
    {
      id: 'q1',
      question: {
        hi: 'जल चक्र को संचालित करने वाली मुख्य ऊर्जा का स्रोत क्या है?',
        en: 'What is the primary driving energy source of the water cycle?',
        hinglish: 'Water cycle ko chalane wali main energy ka source kya hai?',
      },
      options: {
        hi: ['चंद्रमा का गुरुत्वाकर्षण', 'सूर्य की ऊष्मा (सौर ऊर्जा)', 'पृथ्वी की चुंबकीय शक्ति', 'वायुमंडलीय दबाव'],
        en: ['Moon gravity', 'Solar heat energy from the Sun', 'Earth magnetism', 'Atmospheric pressure'],
        hinglish: ['Moon gravity', 'Suraj ki Heat (Solar Energy)', 'Earth ka Magnet', 'Hawa ka Pressure'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'सूर्य की गर्मी से ही महासागरों व नदियों का पानी वाष्पीकृत होकर बादलों का रूप लेता है।',
        en: 'The Sun provides thermal energy that drives evaporation from water bodies and plants.',
        hinglish: 'Suraj ki dhoop aur garmi se hi evaporation process chalta hai.',
      },
    },
    {
      id: 'q2',
      question: {
        hi: 'पौधों की पत्तियों द्वारा जलवाष्प छोड़ने की प्रक्रिया को क्या कहते हैं?',
        en: 'What is the biological process by which plants release water vapor through leaves?',
        hinglish: 'Plants ke leaves se pani vapor bankar udne ke process ko kya kehte hain?',
      },
      options: {
        hi: ['वाष्पोत्सर्जन (Transpiration)', 'प्रकाश संश्लेषण', 'श्वसन', 'अवसादन'],
        en: ['Transpiration', 'Photosynthesis', 'Respiration', 'Sedimentation'],
        hinglish: ['Transpiration', 'Photosynthesis', 'Respiration', 'Sedimentation'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'पौधे अपनी पत्तियों के रंध्रों (Stomata) से अतिरिक्त जल को वाष्पोत्सर्जन (Transpiration) द्वारा वायु में छोड़ते हैं।',
        en: 'Plants release moisture through microscopic pores called stomata in a process called transpiration.',
        hinglish: 'Plants apne stomata ke through extra water ko hawa me chhodte hain.',
      },
    },
    {
      id: 'q3',
      question: {
        hi: 'यदि कंक्रीट के शहरों में जमीन पर पानी नहीं रिस पाता, तो इसका सबसे गंभीर परिणाम क्या होता है?',
        en: 'What is the most severe consequence when rainwater cannot infiltrate paved urban soils?',
        hinglish: 'Concrete sadko ki wajah se agar barish ka pani zameen me na jaye to kya nuksan hota hai?',
      },
      options: {
        hi: ['सूर्य की धूप बढ़ जाती है', 'भूजल स्तर गिरता है और अचानक शहरी बाढ़ आती है', 'हवा में ऑक्सीजन बढ़ती है', 'समुद्र का खारापन खत्म होता है'],
        en: ['Sunlight increases', 'Groundwater depletes and urban flash floods occur', 'Atmospheric oxygen increases', 'Ocean salinity ends'],
        hinglish: ['Dhoop badh jati hai', 'Groundwater kam hota hai aur city me flash flood aati hai', 'Oxygen badhti hai', 'Samundar mitha hota hai'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'कंक्रीट पानी को जमीन में जाने से रोकता है, जिससे बोरवेल सूख जाते हैं और सड़कों पर जलभराव (Urban Flooding) होता है।',
        en: 'Impermeable surfaces block percolation, starving underground aquifers and causing rapid stormwater runoff floods.',
        hinglish: 'Concrete pani ko soak hone nahi deta, jisse underground pani sukh jata hai aur road par flood aa jata hai.',
      },
    },
  ],
  infographicData: {
    summary: {
      hi: 'जल चक्र का 360° विहंगावलोकन: 4 मुख्य चरण, वर्तमान संकट और वैज्ञानिक समाधान।',
      en: '360° Blueprint of the Hydrological Cycle: 4 Phases, Environmental Crises, and Smart Solutions.',
      hinglish: 'Water Cycle ka 360° Blueprint: Evaporation, Condensation, Rain aur Groundwater Recharge.',
    },
    nodes: [
      { id: '1', label: { hi: 'सूर्य ऊर्जा (Engine)', en: 'Solar Engine', hinglish: 'Suraj ki Heat' }, color: '#F59E0B', desc: { hi: 'समुद्र और झीलों को गर्म करता है', en: 'Heats water surfaces', hinglish: 'Pani ko garam karke bhaap banata hai' } },
      { id: '2', label: { hi: 'वाष्पीकरण (Evaporation)', en: 'Evaporation', hinglish: 'Vapor Upar Gaya' }, color: '#38BDF8', desc: { hi: 'जल से वाष्प में परिवर्तन', en: 'Liquid to gas state', hinglish: 'Liquid se Gas ban gaya' } },
      { id: '3', label: { hi: 'संघनन (Condensation)', en: 'Condensation', hinglish: 'Badal Banna' }, color: '#818CF8', desc: { hi: 'बादलों का निर्माण', en: 'Clouds and vapor droplets', hinglish: 'Aasman me thandak se clouds bane' } },
      { id: '4', label: { hi: 'वर्षण (Precipitation)', en: 'Precipitation', hinglish: 'Barsaat / Rain' }, color: '#34D399', desc: { hi: 'मीठे पानी की वर्षा', en: 'Freshwater rainfall', hinglish: 'Dharti par meetha pani gira' } },
      { id: '5', label: { hi: 'भूजल संचयन (Recharge)', en: 'Aquifer Infiltration', hinglish: 'Groundwater Recharge' }, color: '#10B981', desc: { hi: 'रेनवाटर हार्वेस्टिंग द्वारा संवर्धन', en: 'Rainwater harvesting & wells', hinglish: 'Zameen me soak hokar borewell bhara' } },
    ],
  },
  videoScript: {
    title: {
      hi: 'जल चक्र की 360° विजुअल स्टोरी',
      en: '360° Animated Journey of a Water Droplet',
      hinglish: 'Pani ki Boond ka 360° Visual Safar',
    },
    duration: '2:45 min',
    scenes: [
      {
        timestamp: '0:00 - 0:40',
        visual: '🌊 Ocean Waves under blazing golden sun with steam rising into sky',
        narration: {
          hi: 'देखिए कैसे समुद्र की एक बूंद सूर्य की किरणों से ऊर्जा पाकर आसमान में एक अदृश्य परी की तरह उड़ती है...',
          en: 'Observe how a single droplet from the vast Indian Ocean transforms under solar rays and ascends into the sky...',
          hinglish: 'Dhyan se dekhiye kaise suraj ki kirno se pani bhaap ban kar aasman ki taraf travel karta hai...',
        },
      },
      {
        timestamp: '0:40 - 1:20',
        visual: '☁️ High altitude chilling atmosphere where vapors merge with dust to form thick clouds',
        narration: {
          hi: 'ऊंचाई पर पहुंचते ही हवा ठंडी होती है, और करोड़ों छोटी बूंदें मिलकर बादल बन जाती हैं...',
          en: 'At freezing altitudes, billions of microscopic droplets coalesce around dust particles to forge mighty rainclouds...',
          hinglish: 'Upar pahunchte hi thandi hawa se boonde aapas me jud kar ghane badal ban jati hain...',
        },
      },
      {
        timestamp: '1:20 - 2:10',
        visual: '🌧️ Monsoon clouds striking mountain ranges and raining over farming fields and villages',
        narration: {
          hi: 'पहाड़ों से टकराकर यह बादल बरस पड़ते हैं। किसान के खेत में फसलें लहलहा उठती हैं...',
          en: 'Thunderclouds meet lush mountain ranges, releasing life-giving rain over agricultural valleys and rivers...',
          hinglish: 'Pahadon se takra kar ye badal kisan ke khet me baraste hain aur nadiyan khil uthti hain...',
        },
      },
      {
        timestamp: '2:10 - 2:45',
        visual: '💧 Soak pits, village check-dams and green tree roots soaking water into deep groundwater',
        narration: {
          hi: 'और जब हम रेनवाटर हार्वेस्टिंग करते हैं, तो यह अमृत भविष्य के लिए हमारी धरती में सुरक्षित हो जाता है!',
          en: 'And when smart learners install soak pits and rainwater harvest systems, future water security is guaranteed!',
          hinglish: 'Aur jab hum rainwater harvest karte hain, to hamara gaon aur school hamesha ke liye pani se samriddh banta hai!',
        },
      },
    ],
  },
};

// Additional 360° Topics for School Classes & Exams
export const photosynthesisTopic: TopicItem = {
  id: 'topic-photosynthesis',
  name: {
    hi: 'प्रकाश संश्लेषण (Photosynthesis)',
    en: 'Photosynthesis in Plants',
    hinglish: 'Photosynthesis (Paudhon ka Khana Banana)',
  },
  subject: 'Science / Biology',
  chapter: 'Life Processes & Plant Nutrition',
  difficulty: 'Medium',
  framework: {
    kya: {
      title: { hi: 'प्रकाश संश्लेषण क्या है?', en: 'What is Photosynthesis?', hinglish: 'Photosynthesis kya hai?' },
      content: {
        hi: 'यह वह जैव-रासायनिक प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश, पर्णहरित (क्लोरोफिल), कार्बन डाइऑक्साइड और जल का उपयोग करके अपना भोजन (ग्लूकोज) बनाते हैं और ऑक्सीजन छोड़ते हैं।',
        en: 'Photosynthesis is the biochemical process by which green plants utilize solar energy, chlorophyll, water, and atmospheric carbon dioxide to synthesize glucose and release vital oxygen.',
        hinglish: 'Photosynthesis wo natural process hai jisme green plants Sunlight, Chlorophyll, CO2 aur Water use karke glucose banate hain aur hume Oxygen dete hain.',
      },
      bulletPoints: {
        hi: ['समीकरण: 6CO2 + 6H2O + सूर्य का प्रकाश -> C6H12O6 (ग्लूकोज) + 6O2 (ऑक्सीजन)', 'यह पौधों की पत्तियों में मौजूद क्लोरोप्लास्ट में होता है।', 'यह पृथ्वी पर सभी खाद्य श्रृंखलाओं का आधार है।'],
        en: ['Chemical Equation: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2', 'Takes place inside the chloroplast organelles within mesophyll cells.', 'Forms the primary trophic base of virtually all planetary food webs.'],
        hinglish: ['Formula: 6CO2 + 6H2O + Dhoop -> Glucose + Oxygen', 'Pattiyon ke Chloroplast me ye kitchen ki tarah chalta hai.', 'Earth ke saare living beings ke food ka primary source yahi hai.'],
      },
      analogy: {
        hi: 'जैसे सौर ऊर्जा वाला चूल्हा: पत्ती एक सोलर किचन है जहाँ धूप की भट्ठी में जल और हवा से खाना बनता है!',
        en: 'Think of a solar kitchen where green leaves use sun rays as an induction stove to cook food from air and water.',
        hinglish: 'Jaise solar cooker me dhoop se khana banta hai, waise hi plant ki leaf ek solar kitchen hai!',
      },
    },
    kyu: {
      title: { hi: 'यह क्यों जरूरी है?', en: 'Why is it Crucial?', hinglish: 'Ye kyu zaroori hai?' },
      content: {
        hi: 'पृथ्वी पर उपस्थित सभी जीवों की सांस लेने योग्य ऑक्सीजन और भोजन का एकमात्र प्राथमिक स्रोत प्रकाश संश्लेषण ही है। इसके बिना पृथ्वी वीरान हो जाएगी।',
        en: 'It produces nearly all atmospheric oxygen and locks solar energy into organic chemical energy for animals and humans.',
        hinglish: 'Agar Photosynthesis na ho to Earth par Oxygen khatam ho jayegi aur koi bhi animal zinda nahi reh sakta.',
      },
      criticalReason: {
        hi: 'यह वातावरण से ग्रीनहाउस गैस (CO2) को सोखकर ग्लोबल वॉर्मिंग को रोकने का सबसे शक्तिशाली प्राकृतिक फिल्टर है।',
        en: 'It acts as the planetary carbon sink, mitigating global climate heating naturally.',
        hinglish: 'Ye hawa se harmful CO2 sookh kar global warming kam karta hai.',
      },
    },
    kaise: {
      title: { hi: 'यह कैसे होता है?', en: 'How Does it Function?', hinglish: 'Ye kaise function karta hai?' },
      steps: [
        {
          stepNumber: 1,
          title: { hi: '1. प्रकाश अभिक्रिया (Light Reaction in Grana)', en: '1. Light-Dependent Reactions', hinglish: '1. Light Reaction (Dhoop me Energy)' },
          description: { hi: 'क्लोरोफिल धूप को सोखता है और जल के अणुओं को तोड़कर हाइड्रोजन और ऑक्सीजन बनाता है।', en: 'Chlorophyll absorbs photons, splitting H2O into oxygen gas and high-energy ATP/NADPH molecules.', hinglish: 'Chlorophyll sunlight pakad kar water ko break karta hai aur O2 release hoti hai.' },
        },
        {
          stepNumber: 2,
          title: { hi: '2. अंधकार अभिक्रिया / केल्विन चक्र (Dark Reaction in Stroma)', en: '2. Calvin Cycle (Carbon Fixation)', hinglish: '2. Calvin Cycle (Glucose Banna)' },
          description: { hi: 'पत्तियों के रंध्रों से आई CO2 को ऊर्जा का उपयोग करके मीठे ग्लूकोज में बदला जाता है।', en: 'CO2 enters via stomata and is converted into six-carbon glucose sugars via enzyme Rubisco.', hinglish: 'CO2 aur energy milkar plant ke liye food (glucose) taiyar karte hain.' },
        },
      ],
    },
    kisLiye: {
      title: { hi: 'किस लिए? (व्यावहारिक उपयोग)', en: 'For What Real-World Impact?', hinglish: 'Kis Liye? (Practical Application)' },
      applications: {
        hi: ['अनाज, फल, सब्जियां और लकड़ी का निर्माण।', 'ऑक्सीजन का निरंतर उत्पादन।', 'बायोमास और जैव ईंधन (Biofuels) का आधार।'],
        en: ['Production of all agricultural crops, fruits, grains, and timber.', 'Continuous replenishment of breathable O2.', 'Foundation for biofuels, renewable biomass, and paper.'],
        hinglish: ['Saari fasal, gehu, chawal, aam aur sabjiyo ka banna.', 'Oxygen ka continuous supply.', 'Lakdi aur biomass fuel ka base.'],
      },
      realLifeExample: {
        hi: 'पीपल और बरगद के वृक्ष विशाल पत्तियों से दिन में भारी मात्रा में ऑक्सीजन उत्सर्जित करते हैं, इसलिए इन्हें गांव का फेफड़ा कहा जाता है।',
        en: 'Banyan and Peepal trees act as biological oxygen generators, serving as natural lung filters for rural communities.',
        hinglish: 'Peepal aur Neem ke ped gaon ke liye natural oxygen cylinder ka kaam karte hain.',
      },
    },
    currentProblem: {
      title: { hi: 'वर्तमान समस्या व प्रदूषण', en: 'Current Crisis & Challenges', hinglish: 'Current Problem & Deforestation' },
      issues: {
        hi: ['जंगलों की अंधाधुंध कटाई (Deforestation) से पृथ्वी की कार्बन सोखने की क्षमता आधी रह गई है।', 'धूल और वायु प्रदूषण के कण पत्तियों के रंध्रों (Stomata) को जाम कर देते हैं।', 'रटने की समस्या: केवल परिभाषा याद रखना, पौधे लगाने और बचाने की चिंता न करना।'],
        en: ['Massive deforestation eroding Earth’s carbon absorption capacity.', 'Particulate dust pollution choking microscopic leaf stomata in urban corridors.', 'Rote memorization disconnected from real tree plantation and environmental ethics.'],
        hinglish: ['Jungle katne se nature ka balancing system disturb ho gaya hai.', 'Dhool aur dhue se pattiyo ke stomata block ho jaate hain.', 'Students formula rat lete hain par ek ped bhi nahi lagate.'],
      },
      misconceptions: {
        hi: 'गलतफहमी: "पेड़ केवल दिन में ऑक्सीजन देते हैं और रात में विषैले हो जाते हैं।" सत्य: रात में केवल श्वसन होता है, कोई विषैला प्रभाव नहीं होता।',
        en: 'Myth: "Sleeping under trees at night is deadly toxic." Reality: Respiration occurs naturally without harmful toxicity.',
        hinglish: 'Myth: "Raat ko ped zehar chhodte hain." Reality: Raat ko photosynthesis rukta hai aur ordinary respiration chalta hai.',
      },
    },
    bestSolution: {
      title: { hi: '360° सर्वश्रेष्ठ समाधान', en: '360° Innovation & Solutions', hinglish: '360° Best Solution & Action' },
      innovations: {
        hi: ['मियावाकी विधि (Miyawaki Method) से स्कूलों और ग्राम पंचायतों में सघन मिनी-जंगल उगाना।', 'सोलर फोटोवोल्टाइक के साथ एग्री-वोल्टाइक (Agrivoltaics) तकनीक अपनाना।', 'प्रत्येक छात्र द्वारा प्रतिवर्ष कम से कम 5 देशी पेड़ (नीम, पीपल, शीशम) लगाना और संरक्षण करना।'],
        en: ['Miyawaki urban/rural micro-forests planted in school campuses.', 'Agrivoltaic systems co-optimizing crop photosynthesis with solar panels.', 'Every student adopting and nurturing 5 native shade trees.'],
        hinglish: ['School me Miyawaki mini-forest banana.', 'Khet me agro-forestry aur dhoop ka best use.', 'Har student dwara 5 neem ya peepal ke ped lagana aur unhe protect karna.'],
      },
      actionableTakeaway: {
        hi: 'संकल्प: "रटेंगे नहीं, हर साल अपने जन्मदिन पर एक नया पौधा रोपेंगे और उसे बड़ा करेंगे!"',
        en: 'Action Pledge: "I will nurture green cover and protect our planetary oxygen producers!"',
        hinglish: 'Pledge: "Exam me ratenge nahi, real me ped lagakar nature ko strong banayenge!"',
      },
    },
  },
  quiz: [
    {
      id: 'pq1',
      question: {
        hi: 'प्रकाश संश्लेषण प्रक्रिया में कौन सी गैस उप-उत्पाद (Byproduct) के रूप में निकलती है?',
        en: 'Which essential gas is released as a byproduct during photosynthesis?',
        hinglish: 'Photosynthesis me kaunsi gas byproduct ke roop me release hoti hai?',
      },
      options: {
        hi: ['नाइट्रोजन', 'ऑक्सीजन (O2)', 'कार्बन मोनोऑक्साइड', 'मीथेन'],
        en: ['Nitrogen', 'Oxygen (O2)', 'Carbon Monoxide', 'Methane'],
        hinglish: ['Nitrogen', 'Oxygen (O2)', 'Carbon Monoxide', 'Methane'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'जल के अणुओं के टूटने (Photolysis of water) से ऑक्सीजन गैस निकलती है जो जीवनदायिनी है।',
        en: 'Photolysis of water molecules inside the chloroplast produces breathable oxygen gas.',
        hinglish: 'Water molecules tootne se shuddh Oxygen gas bahar aati hai.',
      },
    },
  ],
  infographicData: {
    summary: {
      hi: 'प्रकाश संश्लेषण 360°: सौर ऊर्जा का रासायनिक ऊर्जा और जीवन रक्षक ऑक्सीजन में रूपांतरण।',
      en: 'Photosynthesis 360°: Conversion of photon energy into glucose biomass and pure oxygen.',
      hinglish: 'Photosynthesis Diagram: Dhoop + CO2 + Water -> Sweet Glucose + Fresh Oxygen.',
    },
    nodes: [
      { id: '1', label: { hi: 'धूप व क्लोरोफिल', en: 'Photons & Chlorophyll', hinglish: 'Sunlight + Chlorophyll' }, color: '#F59E0B', desc: { hi: 'पत्तियों में ऊर्जा ग्रहण', en: 'Captures solar photons', hinglish: 'Dhoop ko capture karta hai' } },
      { id: '2', label: { hi: 'जल अवशोषण (H2O)', en: 'Root Water Inflow', hinglish: 'Jadon se Pani' }, color: '#38BDF8', desc: { hi: 'जड़ों द्वारा जाइलम से परिवहन', en: 'Translocated via xylem', hinglish: 'Jado se pattiyo tak pani' } },
      { id: '3', label: { hi: 'CO2 प्रवेश (Stomata)', en: 'Stomatal CO2 Gas', hinglish: 'Hawa se CO2' }, color: '#94A3B8', desc: { hi: 'रंध्रों से गैस का आदान-प्रदान', en: 'Gaseous diffusion', hinglish: 'Pattiyo ke chhed se hawa aayi' } },
      { id: '4', label: { hi: 'ग्लूकोज निर्माण (Food)', en: 'Synthesized Glucose', hinglish: 'Plant ka Food' }, color: '#10B981', desc: { hi: 'पौधे का पोषण व वृद्धि', en: 'Metabolic fuel for growth', hinglish: 'Paudhe ke phal aur growth' } },
      { id: '5', label: { hi: 'ऑक्सीजन उत्सर्जन (O2)', en: 'Breathable Oxygen', hinglish: 'Shuddh Oxygen' }, color: '#06B6D4', desc: { hi: 'समस्त मानव व जीव कल्याण', en: 'Essential for all fauna', hinglish: 'Sabhi insano ke saans lene ke liye' } },
    ],
  },
  videoScript: {
    title: {
      hi: 'पौधों की सौर रसोई: प्रकाश संश्लेषण 360°',
      en: 'Inside the Plant’s Solar Kitchen: Photosynthesis',
      hinglish: 'Plant ki Solar Kitchen: Photosynthesis Video',
    },
    duration: '2:15 min',
    scenes: [
      {
        timestamp: '0:00 - 0:30',
        visual: '🌱 Microscopic zoom into green leaf cells showing sparkling chloroplasts',
        narration: {
          hi: 'पत्ती के अंदर झांकिए, जहाँ लाखों छोटे सोलर पैनल्स सूर्य की किरणों का स्वागत कर रहे हैं...',
          en: 'Zoom into the green leaf where millions of tiny chloroplast solar reactors absorb sunlight...',
          hinglish: 'Patti ke andar dekhiye, jahan chloroplasts suraj ki kirno ko absorb kar rahe hain...',
        },
      },
      {
        timestamp: '0:30 - 1:15',
        visual: '⚡ Water molecule H2O splitting into H and O2, with glowing sparkles of energy',
        narration: {
          hi: 'जल का एक अणु टूटता है और प्राणवायु ऑक्सीजन बनकर बाहर उड़ जाता है...',
          en: 'Water molecules split under light energy, setting free pure oxygen into the atmosphere...',
          hinglish: 'Pani ka molecule break hota hai aur shuddh oxygen bankar bahar nikalta hai...',
        },
      },
      {
        timestamp: '1:15 - 2:15',
        visual: '🌾 Golden fields of wheat and mango orchards laden with sweet fruits generated by this energy',
        narration: {
          hi: 'और इस ऊर्जा से बनते हैं फल, अनाज और सब कुछ जो हम खाते हैं!',
          en: 'And this captured sunlight becomes the grains, fruits, and bread sustaining all humanity!',
          hinglish: 'Aur isi dhoop ki energy se bante hain aam, gehu aur hamara swadisht khana!',
        },
      },
    ],
  },
};

// Competitive Exam Topics: MPPSC / UPSC - Indian Constitution Fundamental Rights
export const constitutionTopic: TopicItem = {
  id: 'topic-fundamental-rights',
  name: {
    hi: 'मूल अधिकार (भाग 3, अनुच्छेद 12-35)',
    en: 'Fundamental Rights (Part III, Articles 12-35)',
    hinglish: 'Fundamental Rights (Constitution Part III)',
  },
  subject: 'Indian Polity / Constitution',
  chapter: 'Constitutional Framework & Governance',
  difficulty: 'Advanced',
  framework: {
    kya: {
      title: { hi: 'मूल अधिकार क्या हैं?', en: 'What are Fundamental Rights?', hinglish: 'Fundamental Rights kya hain?' },
      content: {
        hi: 'भारतीय संविधान के भाग 3 (अनुच्छेद 12 से 35) में वर्णित वे मौलिक अधिकार जो प्रत्येक नागरिक को बिना किसी भेदभाव के गरिमापूर्ण जीवन जीने और राज्य के अत्याचार से सुरक्षा प्रदान करते हैं। इसे भारत का मैग्नाकार्टा (Magna Carta) कहा जाता है।',
        en: 'Guaranteed under Part III (Articles 12-35) of the Indian Constitution, Fundamental Rights safeguard individual liberty, equality, and dignity against arbitrary state action, hailed as the Magna Carta of India.',
        hinglish: 'Constitution ke Part 3 (Art 12-35) me diye gaye wo basic human rights jo har citizen ko izzat aur azaadi se jeene ka hak dete hain. Isko India ka Magna Carta kehte hain.',
      },
      bulletPoints: {
        hi: [
          'कुल 6 मूल अधिकार: समानता (14-18), स्वतंत्रता (19-22), शोषण के विरुद्ध (23-24), धर्म की स्वतंत्रता (25-28), संस्कृति व शिक्षा (29-30), संवैधानिक उपचार (32)।',
          'ये न्यायालय द्वारा प्रवर्तनीय (Justiciable) हैं - सीधे सुप्रीम कोर्ट (Art 32) या हाई कोर्ट (Art 226) जाया जा सकता है।',
          'संपत्ति का अधिकार (Art 31) 44वें संशोधन 1978 द्वारा हटाकर कानूनी अधिकार (Art 300A) बना दिया गया।',
        ],
        en: [
          '6 Core Rights: Equality (14-18), Freedom (19-22), Against Exploitation (23-24), Religious Freedom (25-28), Cultural & Educational (29-30), Constitutional Remedies (32).',
          'Justiciable by nature; enforceable directly via Supreme Court (Art 32) and High Courts (Art 226).',
          'Right to Property removed as a Fundamental Right by the 44th Amendment 1978 and made a legal right (Art 300A).',
        ],
        hinglish: [
          'Total 6 Rights: Equality, Freedom, Protection from Exploitation, Religion, Culture/Education, Constitutional Remedies (Art 32).',
          'Ye Court enforceable hain, agar koi violate kare to direct Supreme Court ja sakte hain.',
          'Right to Property ko 44th Amendment se hata kar legal right banaya gaya.',
        ],
      },
      analogy: {
        hi: 'नागरिकों का संवैधानिक रक्षा कवच (Bulletproof Shield) जो सरकार या पुलिस की मनमानी शक्ति को नागरिक की स्वतंत्रता छीनने से रोकता है!',
        en: 'A constitutional titanium shield protecting individual liberties from state overreach or authoritarian oppression.',
        hinglish: 'Jaise ek bulletproof jacket soldier ko bachati hai, waise hi Fundamental Rights aam nagrik ko shasan ke atyachar se bachate hain.',
      },
    },
    kyu: {
      title: { hi: 'ये क्यों जरूरी हैं?', en: 'Why are they Paramount?', hinglish: 'Ye kyu sabse important hain?' },
      content: {
        hi: 'लोकतंत्र में बहुसंख्यक सरकार को निरंकुश बनने से रोकने और समाज के सबसे कमजोर व अंतिम व्यक्ति के अधिकारों की रक्षा के लिए ये अपरिहार्य हैं।',
        en: 'To prevent majority tyranny, foster political democracy, and ensure rule of law where individual human freedom reigns supreme.',
        hinglish: 'Taaki koi bhi government ya powerful person kisi garib ya minority ke basic human rights na chheen sake.',
      },
      criticalReason: {
        hi: 'डॉ. बी.आर. अंबेडकर ने अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) को "संविधान का हृदय और आत्मा" कहा था क्योंकि इसके बिना अधिकार केवल कागज का टुकड़ा रह जाते हैं।',
        en: 'Dr. B.R. Ambedkar famously called Article 32 "the very soul and heart of the Constitution" because rights without enforcement remedies are futile.',
        hinglish: 'Dr. Ambedkar ne Article 32 ko "Heart and Soul of Constitution" kaha tha kyunki yahi rights ko real protection deta hai.',
      },
    },
    kaise: {
      title: { hi: 'न्यायालय द्वारा संरक्षण कैसे होता है? (5 रिट्स)', en: 'How are they Enforced? (The 5 Writs)', hinglish: 'Court me Enforce Kaise Hote Hain? (5 Writs)' },
      steps: [
        {
          stepNumber: 1,
          title: { hi: '1. बंदी प्रत्यक्षीकरण (Habeas Corpus)', en: '1. Habeas Corpus', hinglish: '1. Habeas Corpus (To have the body)' },
          description: { hi: '"शरीर को प्रस्तुत करो" - गैरकानूनी रूप से हिरासत में लिए गए व्यक्ति को 24 घंटे में कोर्ट में पेश करने का आदेश।', en: 'Commands the authority holding a detained person to produce them before court to examine legal validity.', hinglish: 'Kisi ko galat arrest kiya ho to court bolta hai person ko turant pesh karo.' },
        },
        {
          stepNumber: 2,
          title: { hi: '2. परमादेश (Mandamus)', en: '2. Mandamus', hinglish: '2. Mandamus (We Command)' },
          description: { hi: '"हम आदेश देते हैं" - सरकारी अधिकारी को उसका कानूनी कर्तव्य निभाने का निर्देश।', en: 'Orders a public official to execute a statutory duty they have failed or refused to perform.', hinglish: 'Sarkari officer ko apna kaam duty ke mutabiq karne ka court order.' },
        },
        {
          stepNumber: 3,
          title: { hi: '3. प्रतिषेध व उत्प्रेषण (Prohibition & Certiorari)', en: '3. Prohibition & Certiorari', hinglish: '3. Prohibition & Certiorari' },
          description: { hi: 'निचली अदालतों को अपने अधिकार क्षेत्र से बाहर जाने से रोकना या लंबित मामले को उच्च न्यायालय में स्थानांतरित करना।', en: 'Prevents subordinate tribunals from exceeding jurisdiction or quashes arbitrary lower orders.', hinglish: 'Lower court ko limit me rakhna aur galat decision ko cancel karna.' },
        },
        {
          stepNumber: 4,
          title: { hi: '4. अधिकार पृच्छा (Quo-Warranto)', en: '4. Quo-Warranto', hinglish: '4. Quo-Warranto (By what authority?)' },
          description: { hi: '"आपका क्या अधिकार है?" - किसी व्यक्ति द्वारा सार्वजनिक पद पर अनाधिकृत कब्जे की जांच।', en: 'Inquires into the legal legality of a person occupying a public office without requisite qualifications.', hinglish: 'Kisi galat person ko public post se hatana agar wo eligible na ho.' },
        },
      ],
    },
    kisLiye: {
      title: { hi: 'किस लिए? (नागरिक सशक्तिकरण)', en: 'For What Purpose in Governance?', hinglish: 'Kis Liye? (Aam Nagrik ke fayde)' },
      applications: {
        hi: ['अभिव्यक्ति की स्वतंत्रता (Art 19(1)(a)) - निडर होकर विचार रखना व पत्रकारिता।', 'अस्पृश्यता का अंत (Art 17) - सामाजिक समानता और जातिगत भेदभाव का खात्मा।', 'निजता का अधिकार (Art 21 - Right to Privacy) - पुट्टास्वामी निर्णय 2017।', 'शिक्षा का अधिकार (Art 21A) - 6 से 14 वर्ष के बच्चों को मुफ्त व अनिवार्य शिक्षा।'],
        en: ['Freedom of Speech & Expression (Art 19(1)(a)) empowering investigative journalism and dissent.', 'Abolition of Untouchability (Art 17) building egalitarian social justice.', 'Right to Privacy under Article 21 (Puttaswamy 2017 landmark verdict).', 'Right to Free & Compulsory Education for children aged 6-14 (Art 21A).'],
        hinglish: ['Freedom of Speech se sacchai bolne ki azaadi.', 'Art 17 se chhua-chhoot aur caste discrimination par full ban.', 'Art 21 se Privacy aur personal dignity ka fundamental right.', 'Art 21A se har bache ke liye free school education mandatory.'],
      },
      realLifeExample: {
        hi: 'जब भी किसी गरीब या किसान को बिना वारंट पुलिस परेशान करती है, तो अनुच्छेद 21 व 22 उसे वकील और जमानत का अधिकार दिलाते हैं।',
        en: 'Whenever an underprivileged citizen faces arbitrary arrest, Articles 21 & 22 guarantee legal counsel and habeas corpus protection.',
        hinglish: 'Jab bhi kisi person ko bina reason arrest kiya jata hai, Fundamental Rights use legal protection aur bail ka right dete hain.',
      },
    },
    currentProblem: {
      title: { hi: 'वर्तमान चुनौतियाँ व परीक्षा विश्लेषण', en: 'Contemporary Issues & Exam Analysis', hinglish: 'Current Problem & Exam Trap' },
      issues: {
        hi: ['अधिकारों की जानकारी का अभाव: गांव और ग्रामीण क्षेत्रों में 80% लोगों को अपने 6 मौलिक अधिकारों का सही ज्ञान नहीं।', 'न्याय मिलने में अत्यधिक विलंब और अदालतों में लंबित करोड़ों केस।', 'इंटरनेट शटडाउन और देशद्रोह कानूनों के दुरुपयोग पर सुप्रीम कोर्ट के कड़े निर्देश।'],
        en: ['Widespread legal illiteracy across rural hinterlands where citizens are unaware of Art 32 remedies.', 'Judicial backlog causing delayed enforcement of habeas corpus petitions.', 'Excessive internet shutdowns challenging freedom of digital trade under Art 19(1)(g).'],
        hinglish: ['Gaon me aam logon ko apne constitutional rights pata hi nahi hote.', 'Court me case lamba chalna.', 'Exam me confusing options: Rights absolute nahi hain, in par reasonable restrictions (Art 19(2)) lag sakte hain.'],
      },
      misconceptions: {
        hi: 'UPSC/MPPSC ट्रैप: "क्या मौलिक अधिकार असीमित (Absolute) हैं?" नहीं! देश की सुरक्षा, संप्रभुता और लोक व्यवस्था के आधार पर युक्तियुक्त प्रतिबंध (Reasonable Restrictions) लगाए जा सकते हैं।',
        en: 'UPSC/PSC Trap: Are Fundamental Rights absolute? NO! They are subject to reasonable restrictions under national security and public order.',
        hinglish: 'Exam Fact: Fundamental Rights absolute nahi hote, in par constitution ke mutabiq reasonable restrictions lag sakte hain.',
      },
    },
    bestSolution: {
      title: { hi: '360° प्रशासनिक व विधिक सुधार', en: '360° Administrative Solutions', hinglish: '360° Solutions & Smart Strategy' },
      innovations: {
        hi: ['विधिक सेवा प्राधिकरण (NALSA/SALSA) द्वारा हर ग्राम पंचायत में मुफ्त विधिक सहायता क्लिनिक।', 'नागरिकों के लिए डिजिटल ई-रिट (E-Writ) और ऑनलाइन एफआईआर ट्रैकिंग पोर्टल।', 'स्कूल स्तर से कक्षा 6 से ही संविधान और मूल अधिकारों की केस-स्टडी आधारित व्यावहारिक शिक्षा।'],
        en: ['Universal legal aid clinics in every Gram Panchayat through NALSA/DLSA.', 'Digital E-Writ filings and transparent real-time custody tracking.', 'Case-law and constitutional literacy integrated right from middle school syllabus.'],
        hinglish: ['NALSA ke through gaon-gaon me free vakeel aur legal help.', 'Mobile se direct e-court grievance filing.', 'School me bachpan se hi Rights aur Duties dono sikhana.'],
      },
      actionableTakeaway: {
        hi: 'परीक्षा सफलता सूत्र: "अनुच्छेदों को केवल रटें नहीं, उन्हें ऐतिहासिक सुप्रीम कोर्ट केस लॉ (केशवानंद भारती, मेनका गांधी, पुट्टास्वामी) के साथ 360° जोड़कर लिखें!"',
        en: 'Mains Strategy: Always link Article theory with landmark cases (Kesavananda Bharati, Maneka Gandhi, Puttaswamy).',
        hinglish: 'Exam Trick: Articles ke saath landmark court judgments connect karke answer likho, maximum marks milenge!',
      },
    },
  },
  quiz: [
    {
      id: 'cq1',
      question: {
        hi: 'डॉ. बी.आर. अंबेडकर ने किस अनुच्छेद को "संविधान का हृदय और आत्मा" कहा था?',
        en: 'Which article of the Indian Constitution was termed "the Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
        hinglish: 'Dr. Ambedkar ne kis Article ko Constitution ka "Heart and Soul" kaha tha?',
      },
      options: {
        hi: ['अनुच्छेद 14 (समानता)', 'अनुच्छेद 19 (स्वतंत्रता)', 'अनुच्छेद 21 (जीवन का अधिकार)', 'अनुच्छेद 32 (संवैधानिक उपचार)'],
        en: ['Article 14 (Equality)', 'Article 19 (Freedom)', 'Article 21 (Life & Liberty)', 'Article 32 (Constitutional Remedies)'],
        hinglish: ['Article 14 (Equality)', 'Article 19 (Freedom)', 'Article 21 (Life)', 'Article 32 (Constitutional Remedies)'],
      },
      correctIndex: 3,
      explanation: {
        hi: 'अनुच्छेद 32 सुप्रीम कोर्ट को नागरिकों के अधिकारों के हनन पर 5 प्रकार की रिट जारी करने का अधिकार देता है।',
        en: 'Article 32 empowers citizens to directly approach the Supreme Court via prerogative writs for enforcement of rights.',
        hinglish: 'Article 32 ke under Supreme Court 5 writs issue karta hai.',
      },
    },
    {
      id: 'cq2',
      question: {
        hi: 'संपत्ति के अधिकार (Right to Property) को किस संविधान संशोधन द्वारा मूल अधिकारों से हटाया गया?',
        en: 'Which constitutional amendment removed the Right to Property from the list of Fundamental Rights?',
        hinglish: 'Right to Property ko kis Amendment se Fundamental Right se hataya gaya?',
      },
      options: {
        hi: ['42वां संशोधन 1976', '44वां संशोधन 1978', '86वां संशोधन 2002', '73वां संशोधन 1992'],
        en: ['42nd Amendment 1976', '44th Amendment 1978', '86th Amendment 2002', '73rd Amendment 1992'],
        hinglish: ['42nd Amendment 1976', '44th Amendment 1978', '86th Amendment 2002', '73rd Amendment 1992'],
      },
      correctIndex: 1,
      explanation: {
        hi: '44वें संविधान संशोधन 1978 द्वारा इसे हटाकर अनुच्छेद 300(A) के तहत एक सामान्य विधिक अधिकार बना दिया गया।',
        en: 'The 44th Amendment in 1978 shifted property rights to Article 300A as an ordinary legal right.',
        hinglish: '44th Amendment 1978 ne isko Article 300A ke under legal right bana diya.',
      },
    },
  ],
  infographicData: {
    summary: {
      hi: 'मूल अधिकार 360°: 6 आधारभूत अधिकार, 5 न्यायालयीय रिट्स और नागरिक रक्षा ढांचा।',
      en: 'Fundamental Rights 360°: 6 Pillars of Freedom, 5 Judicial Writs, and Constitutional Armor.',
      hinglish: 'Fundamental Rights Blueprint: 6 Rights + 5 Writs + Art 32 Supreme Court Power.',
    },
    nodes: [
      { id: '1', label: { hi: 'समानता (Art 14-18)', en: 'Right to Equality', hinglish: 'Equality (Art 14-18)' }, color: '#38BDF8', desc: { hi: 'कानून के समक्ष सब बराबर', en: 'Equal protection of laws', hinglish: 'Kanoon ke aage sab barabar' } },
      { id: '2', label: { hi: 'स्वतंत्रता (Art 19-22)', en: 'Right to Freedom', hinglish: 'Freedom (Art 19-22)' }, color: '#34D399', desc: { hi: 'भाषण, संघ, जीवन व निजता', en: 'Speech, movement, privacy', hinglish: 'Bolne aur jeene ki azaadi' } },
      { id: '3', label: { hi: 'शोषण विरुद्ध (Art 23-24)', en: 'Against Exploitation', hinglish: 'Anti-Exploitation' }, color: '#F87171', desc: { hi: 'बाल श्रम व बंधुआ मजदूरी पर रोक', en: 'Bans forced & child labor', hinglish: 'Child labor par poora ban' } },
      { id: '4', label: { hi: 'धार्मिक स्वतंत्रता (Art 25-28)', en: 'Freedom of Religion', hinglish: 'Dharmik Azaadi' }, color: '#FBBF24', desc: { hi: 'अंतःकरण की स्वतंत्रता', en: 'Conscience & worship', hinglish: 'Apni pooja aur faith ka right' } },
      { id: '5', label: { hi: 'संवैधानिक उपचार (Art 32)', en: 'Remedies (Art 32)', hinglish: 'Writs Protection (Art 32)' }, color: '#F59E0B', desc: { hi: 'संविधान का हृदय व 5 रिट्स', en: 'The soul & writ power', hinglish: 'Direct Supreme Court Writ power' } },
    ],
  },
};

// Math Fractions Topic
export const fractionsTopic: TopicItem = {
  id: 'topic-fractions',
  name: { hi: 'भिन्न (Fractions) की 360° समझ', en: 'Understanding Fractions 360°', hinglish: 'Fractions ko 360° Samjho' },
  subject: 'Maths',
  chapter: 'Fractions',
  difficulty: 'Easy',
  framework: {
    kya: {
      title: { hi: 'भिन्न क्या है?', en: 'What is a Fraction?', hinglish: 'Fraction kya hota hai?' },
      content: {
        hi: 'भिन्न किसी एक संपूर्ण वस्तु के बराबर भागों में से चुने गए हिस्से का गणितीय रूप (p/q) है।',
        en: 'A fraction represents a part of a whole, written as Numerator (parts taken) over Denominator (total equal parts).',
        hinglish: 'Fraction kisi poori cheez ke barabar hisso me se ek part ko represent karta hai, jaise 1/2 roti.',
      },
      bulletPoints: {
        hi: ['अंश (Numerator): ऊपर की संख्या (कितने भाग लिए गए)।', 'हर (Denominator): नीचे की संख्या (कुल कितने बराबर टुकड़े किए)।', 'उचित, अनुचित और मिश्रित भिन्न।'],
        en: ['Numerator: Top number showing parts chosen.', 'Denominator: Bottom number showing total divisions.', 'Proper, Improper, and Mixed fractions.'],
        hinglish: ['Numerator = Kitne tukde liye.', 'Denominator = Total barabar pieces kitne kiye.', 'Proper, Improper aur Mixed fractions.'],
      },
      analogy: {
        hi: 'यदि 1 गोल रोटी के 4 बराबर टुकड़े करें और 1 टुकड़ा खाएं, तो आपने 1/4 रोटी खाई!',
        en: 'If a pizza has 4 slices and you eat 1 slice, you ate 1/4 of the pizza.',
        hinglish: 'Agar ek pizza ke 4 slices hain aur aapne 1 khaya, to aapne 1/4 hissa khaya!',
      },
    },
    kyu: {
      title: { hi: 'यह क्यों जरूरी है?', en: 'Why is it Crucial?', hinglish: 'Ye kyu zaroori hai?' },
      content: {
        hi: 'दैनिक जीवन में जब चीजें पूरी 1, 2, 3 नहीं होतीं (जैसे आधा किलो दूध, पौना घंटा समय), तब भिन्न के बिना हिसाब असंभव है।',
        en: 'Whenever quantities fall between whole integers (e.g. half kilo, quarter hour), fractions provide exact precision.',
        hinglish: 'Daily life me aadha kilo, dedh litre, paun ghanta count karne ke liye fraction zaroori hai.',
      },
      criticalReason: {
        hi: 'यह आगे चलकर प्रतिशत (Percentage), अनुपात (Ratio) और बीजगणित की मजबूत नींव रखता है।',
        en: 'Forms the foundational stepping stone for percentages, ratios, probability, and algebra.',
        hinglish: 'Percentage, Profit-Loss aur Ratio sabhi fractions par based hote hain.',
      },
    },
    kaise: {
      title: { hi: 'यह कैसे कार्य करता है?', en: 'How to Solve & Visualize?', hinglish: 'Solve kaise karte hain?' },
      steps: [
        {
          stepNumber: 1,
          title: { hi: '1. समान हर वाले भिन्न (Like Fractions)', en: '1. Adding Like Fractions', hinglish: '1. Same Denominator Wale Fractions' },
          description: { hi: 'जब हर समान हो, तो केवल अंशों को जोड़ें (जैसे 2/5 + 1/5 = 3/5)।', en: 'When denominators match, simply sum the numerators.', hinglish: 'Jab niche ka number same ho, bas upar wale add karo.' },
        },
        {
          stepNumber: 2,
          title: { hi: '2. असमान हर (LCM विधि)', en: '2. Unlike Fractions via LCM', hinglish: '2. LCM Method' },
          description: { hi: 'जब हर अलग हों, तो पहले ल.स.प. (LCM) लेकर हर समान करें।', en: 'Find the Lowest Common Multiple (LCM) to standardize denominators first.', hinglish: 'Pehle LCM lekar niche ka number equal banao.' },
        },
      ],
    },
    kisLiye: {
      title: { hi: 'किस लिए? (व्यावहारिक उपयोग)', en: 'Real-Life Applications', hinglish: 'Daily Life Use' },
      applications: {
        hi: ['रसोई में खाना पकाने और मसालों के सही अनुपात में।', 'दवाइयों की खुराक (1/2 गोली दिन में दो बार)।', 'खेत की नपाई और संपत्ति के बंटवारे में।'],
        en: ['Cooking recipes and ingredient ratios.', 'Medicine dosage precision (half tablet).', 'Land boundary division and trade transactions.'],
        hinglish: ['Cooking me aadha chammach namak dalne me.', 'Doctor ki dawai dosage me.', 'Khet aur plot ka batwara karne me.'],
      },
      realLifeExample: {
        hi: 'एक किसान अपने 4 एकड़ खेत में से 1 एकड़ में सरसों और 3 एकड़ में गेहूं बोता है, तो सरसों का हिस्सा 1/4 है।',
        en: 'A farmer allocating 1 acre out of 4 for mustard represents a 1/4 fractional land crop use.',
        hinglish: 'Kisan 4 acre me se 1 acre me sarso ugata hai to 1/4 area me sarso hai.',
      },
    },
    currentProblem: {
      title: { hi: 'वर्तमान समस्या व गलतियां', en: 'Common Pitfalls', hinglish: 'Common Student Mistakes' },
      issues: {
        hi: ['गलती: 1/2 और 1/3 को जोड़ते समय ऊपर-ऊपर और नीचे-नीचे जोड़ देना (1+1)/(2+3)=2/5 जो बिल्कुल गलत है!', 'बच्चों को विजुअल डायग्राम न दिखाकर सीधे सूत्र रटाना।'],
        en: ['Classic blunder: Adding numerators and denominators straight across (1/2 + 1/3 = 2/5 is WRONG!).', 'Teaching abstract rules without visual pizza/circle models.'],
        hinglish: ['Sabse badi galti: 1/2 + 1/3 ko (1+1)/(2+3)=2/5 likh dena! Bina LCM liye add nahi kar sakte.', 'Bacho ko bina visual picture dikhaye formula ratana.'],
      },
      misconceptions: {
        hi: 'याद रखें: 1/4 संख्या 1/2 से छोटी होती है, भले ही 4 बड़ा अंक दिखता हो!',
        en: 'Key Insight: 1/4 is SMALLER than 1/2 because you divided the whole into more pieces!',
        hinglish: 'Crucial concept: 1/4 chhota hota hai 1/2 se, kyunki tukde jyada ho gaye!',
      },
    },
    bestSolution: {
      title: { hi: '360° सर्वश्रेष्ठ समाधान', en: '360° Visual Method', hinglish: '360° Smart Trick' },
      innovations: {
        hi: ['बटरफ्लाई क्रॉस-मल्टीप्लिकेशन विधि (Butterfly Method) से चुटकियों में जोड़ना व घटाना।', 'घर की रोटी, सेब और चॉक की मदद से प्रत्यक्ष प्रयोग द्वारा सीखना।'],
        en: ['Butterfly cross-multiplication technique for rapid mental fraction calculation.', 'Hands-on tangible fraction strips using paper folding.'],
        hinglish: ['Butterfly trick se 2 second me LCM solve karna.', 'Kagaz mod kar 1/2, 1/4, 1/8 dekhna aur practical samajhna.'],
      },
      actionableTakeaway: {
        hi: 'टिप: "जब भी भिन्न देखें, दिमाग में एक गोल पिज्जा या रोटी की तस्वीर बनाएं!"',
        en: 'Mental Model: Always picture dividing a round flatbread into equal slices!',
        hinglish: 'Secret: Fraction aate hi dimag me ek gol roti ke barabar tukdo ko imagine karo!',
      },
    },
  },
  quiz: [
    {
      id: 'fq1',
      question: {
        hi: '1/3 और 1/6 को जोड़ने पर क्या परिणाम आएगा?',
        en: 'What is the sum of 1/3 + 1/6?',
        hinglish: '1/3 + 1/6 karne par kya aayega?',
      },
      options: {
        hi: ['2/9', '1/2 (या 3/6)', '2/6', '1/9'],
        en: ['2/9', '1/2 (or 3/6)', '2/6', '1/9'],
        hinglish: ['2/9', '1/2 (ya 3/6)', '2/6', '1/9'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'LCM = 6. अतः 2/6 + 1/6 = 3/6 = 1/2 (आधा)।',
        en: 'Convert 1/3 to 2/6. Then 2/6 + 1/6 = 3/6, which reduces to 1/2.',
        hinglish: '1/3 ko 2/6 likha, phir 2/6 + 1/6 = 3/6 = 1/2.',
      },
    },
  ],
};

// Physics Ohm's Law Topic
export const ohmsLawTopic: TopicItem = {
  id: 'topic-ohms-law',
  name: { hi: 'ओम का नियम (Ohm’s Law V = IR)', en: 'Ohm’s Law (V = IR) 360° View', hinglish: 'Ohm’s Law (V = IR) 360° Concept' },
  subject: 'Physics',
  chapter: 'Electricity',
  difficulty: 'Advanced',
  framework: {
    kya: {
      title: { hi: 'ओम का नियम क्या है?', en: 'What is Ohm’s Law?', hinglish: 'Ohm’s Law kya hai?' },
      content: {
        hi: 'नियत तापमान पर किसी चालक (तार) के सिरों के बीच का विभवांतर (V) उसमें बहने वाली विद्युत धारा (I) के समानुपाती होता है। सूत्र: V = I × R (जहाँ R प्रतिरोध है)।',
        en: 'At constant temperature, electrical potential difference (V) across a conductor is directly proportional to current (I) flowing through it. Formula: V = I × R (R = Resistance).',
        hinglish: 'Agar temperature constant rahe, to wire ke ends par voltage (V) current (I) ke directly proportional hota hai: V = I * R.',
      },
      bulletPoints: {
        hi: ['V = विभवांतर (वोल्ट में)', 'I = विद्युत धारा (एम्पीयर में)', 'R = प्रतिरोध (ओम Ω में)'],
        en: ['V = Voltage in Volts', 'I = Current in Amperes', 'R = Resistance in Ohms (Ω)'],
        hinglish: ['V = Voltage (Volts)', 'I = Current (Amps)', 'R = Resistance (Ohms Ω)'],
      },
      analogy: {
        hi: 'पानी के पाइप का उदाहरण: पानी का दबाव (Voltage), पानी का बहाव (Current), और पाइप का संकरापन (Resistance)!',
        en: 'Water pipe analogy: Water pressure is Voltage, flow rate is Current, and narrow constriction is Resistance.',
        hinglish: 'Water pipe analogy: Tanki ka pressure = Voltage, pani ka flow = Current, aur pipe ka chhota muh = Resistance!',
      },
    },
    kyu: {
      title: { hi: 'यह क्यों जरूरी है?', en: 'Why is it the Heart of Electronics?', hinglish: 'Ye electronics ka king kyu hai?' },
      content: {
        hi: 'मोबाइल चार्जर से लेकर पावर ग्रिड तक, दुनिया के हर इलेक्ट्रॉनिक सर्किट को सुरक्षित रूप से डिजाइन करने के लिए ओम का नियम अनिवार्य है।',
        en: 'From smartphone chipsets to national electric grids, safe electrical circuit dimensioning relies fundamentally on Ohm’s law.',
        hinglish: 'Phone charger, fan regulator aur solar panel sabhi Ohm’s law se design hote hain.',
      },
      criticalReason: {
        hi: 'यदि सही प्रतिरोध (Resistor) न लगाया जाए, तो अत्यधिक करंट से गैजेट्स जलकर राख हो जाएंगे।',
        en: 'Without precise resistance calculation, excess current causes catastrophic thermal burnout.',
        hinglish: 'Sahi resistor na lagao to circuit me aag lag sakti hai aur device blast ho sakta hai.',
      },
    },
    kaise: {
      title: { hi: 'परिपथ में कैसे काम करता है?', en: 'How it Works in Real Circuits', hinglish: 'Circuit me kaise kaam karta hai?' },
      steps: [
        {
          stepNumber: 1,
          title: { hi: '1. वोल्टेज बढ़ाने पर करंट बढ़ता है', en: '1. Increasing V increases I', hinglish: '1. Voltage badhega to Current badhega' },
          description: { hi: 'यदि प्रतिरोध स्थिर रहे, तो वोल्टेज 2 गुना करने पर करंट भी 2 गुना हो जाता है।', en: 'Doubling voltage with fixed resistance doubles current flow.', hinglish: 'Resistance same ho to battery badhane se light tez jalti hai.' },
        },
        {
          stepNumber: 2,
          title: { hi: '2. प्रतिरोध बढ़ाने पर करंट घटता है', en: '2. Increasing R reduces I', hinglish: '2. Resistance badhane par Current kam hota hai' },
          description: { hi: 'यदि तार लंबा या पतला हो, तो प्रतिरोध बढ़ जाता है और करंट धीमा पड़ जाता है।', en: 'Longer, thinner wires increase resistance, impeding charge flow.', hinglish: 'Patla wire resistance badha deta hai aur current rukta hai.' },
        },
      ],
    },
    kisLiye: {
      title: { hi: 'व्यावहारिक उपयोग', en: 'Practical Engineering Use', hinglish: 'Practical Real-Life Use' },
      applications: {
        hi: ['फैन रेगुलेटर (पंखा धीमा-तेज करना)।', 'इलेक्ट्रिक हीटर और गीजर में नाइक्रोम का उच्च प्रतिरोधक तार।', 'घर के फ्यूज और एमसीबी (MCB) का ट्रिप होना।'],
        en: ['Fan speed regulators varying resistance.', 'Electric geysers and irons using high resistance nichrome coils.', 'Household circuit breaker and fuse dimensioning.'],
        hinglish: ['Fan regulator se speed control karna.', 'Heater me nichrome wire se garmi paida karna.', 'Ghar ke fuse aur MCB ko blast se bachana.'],
      },
      realLifeExample: {
        hi: 'जब आप पंखे का रेगुलेटर 1 पर करते हैं, तो वह प्रतिरोध बढ़ाकर करंट कम कर देता है और पंखा धीमा घूमता है!',
        en: 'Switching your ceiling fan knob to speed 1 inserts higher resistance, reducing current so the motor spins slower.',
        hinglish: 'Fan regulator par knob ghumane se resistance badhta hai aur fan slow ho jata hai.',
      },
    },
    currentProblem: {
      title: { hi: 'गलतियां व सावधानियां', en: 'Misconceptions & Pitfalls', hinglish: 'Common Exam Confusions' },
      issues: {
        hi: ['नियम केवल धात्विक चालकों (Ohmic conductors) के लिए लागू होता है, डायोड या ट्रांजिस्टर (Non-ohmic) के लिए नहीं।', 'तापमान बदलने पर प्रतिरोध भी बदल जाता है।'],
        en: ['Applies only to linear ohmic conductors, not semiconductors or diodes.', 'Temperature fluctuations alter baseline material resistivity.'],
        hinglish: ['Ye rule semiconductors ya diode par directly fit nahi hota.', 'Wire garam hone par resistance change ho jata hai.'],
      },
      misconceptions: {
        hi: 'याद रखें: "V = IR" में R पदार्थ और तापमान पर निर्भर करता है, V या I पर नहीं!',
        en: 'Key Insight: Resistance R is an inherent physical property, not changed merely by dialing V.',
        hinglish: 'Secret: R wire ke material aur length par depend karta hai.',
      },
    },
    bestSolution: {
      title: { hi: '360° सर्वश्रेष्ठ समाधान व टिप्स', en: '360° Formula Triangle', hinglish: '360° Triangle Magic Trick' },
      innovations: {
        hi: ['VIR मैजिक ट्रायंगल (ऊपर V, नीचे I और R): अंगुली रखकर तुरंत सूत्र निकालें!', 'सुपरकंडक्टर (Zero Resistance) तकनीक का भविष्य में उपयोग जिससे बिजली का नुकसान शून्य हो।'],
        en: ['VIR Magic Triangle mnemonic for zero-error exam equation rearrangements.', 'Superconducting zero-resistance alloys reducing transmission losses to 0%.'],
        hinglish: ['VIR Triangle Trick: V ko chupao to I*R, I ko chupao to V/R, R ko chupao to V/I!', 'Superconductors se future me bijli ka loss zero hoga.'],
      },
      actionableTakeaway: {
        hi: 'फार्मूला मंत्र: V = I × R | I = V / R | R = V / I',
        en: 'Formula Triad: V = I × R | I = V / R | R = V / I',
        hinglish: 'Formula Mantra: V = I * R, I = V / R, R = V / I',
      },
    },
  },
  quiz: [
    {
      id: 'oq1',
      question: {
        hi: 'यदि किसी 10 ओम प्रतिरोधक पर 20 वोल्ट का विभवांतर लगाया जाए, तो उसमें कितना करंट बहेगा?',
        en: 'If 20 Volts is applied across a 10 Ohm resistor, what current flows through it?',
        hinglish: 'Agar 20 Volt ki battery 10 Ohm resistor par lagayein to kitna current aayega?',
      },
      options: {
        hi: ['200 एम्पीयर', '2 एम्पीयर', '0.5 एम्पीयर', '10 एम्पीयर'],
        en: ['200 Amperes', '2 Amperes', '0.5 Amperes', '10 Amperes'],
        hinglish: ['200 A', '2 Amperes (2A)', '0.5 A', '10 A'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'सूत्र I = V / R = 20 / 10 = 2 एम्पीयर (A)।',
        en: 'Using I = V / R = 20V / 10Ω = 2 Amperes.',
        hinglish: 'I = V / R = 20 / 10 = 2 A.',
      },
    },
  ],
};

// MP Tribal Heritage & Freedom Fighters (MPPSC / MP Police High Yield)
export const mpTribalTopic: TopicItem = {
  id: 'topic-mp-tribal-heritage',
  name: {
    hi: 'मध्य प्रदेश की जनजातीय विरासत व स्वतंत्रता सेनानी',
    en: 'Tribal Heritage & Freedom Fighters of Madhya Pradesh',
    hinglish: 'MP Tribal Culture, Bhil-Gond & Krantiveer',
  },
  subject: 'MP General Knowledge / History',
  chapter: 'MP Heritage & Social Culture',
  difficulty: 'Medium',
  framework: {
    kya: {
      title: { hi: 'जनजातीय विरासत क्या है?', en: 'What is MP’s Tribal Heritage?', hinglish: 'MP Tribal Heritage kya hai?' },
      content: {
        hi: 'मध्य प्रदेश भारत का सर्वाधिक जनजातीय जनसंख्या (21.1%) वाला राज्य है। यहाँ भील, गोंड, बैगा, सहरिया, भारिया जैसी प्रमुख जनजातियाँ और टांट्या भील, भीमा नायक, रानी दुर्गावती, शंकर शाह-रघुनाथ शाह जैसे महान अमर स्वतंत्रता सेनानी हुए हैं।',
        en: 'Madhya Pradesh holds India’s highest tribal population (21.1%), home to iconic communities like Gond, Bhil, Baiga, Sahariya and legendary freedom fighters like Tantya Mama, Bhima Nayak, and Rani Durgavati.',
        hinglish: 'MP India ka sabse bada tribal state hai (21.1% population). Bhil, Gond, Baiga aur Krantiveer Tantya Mama, Bhima Nayak ka aitihasik yogdan hai.',
      },
      bulletPoints: {
        hi: ['प्रमुख जनजातियां: भील (सर्वाधिक), गोंड, बैगा, भारिया, सहरिया।', 'विशेष पिछड़ी जनजातियाँ (PVTGs): बैगा, भारिया और सहरिया।', 'भगोरिया हाट उत्सव: झाबुआ और अलीराजपुर का विश्वप्रसिद्ध सांस्कृतिक मेला।'],
        en: ['Primary Tribes: Bhil (largest), Gond, Baiga, Bharia, Sahariya.', 'Particularly Vulnerable Tribal Groups (PVTGs): Baiga, Bharia, Sahariya.', 'Bhagoria Festival: Globally renowned cultural fair of Jhabua and Alirajpur.'],
        hinglish: ['Bhil sabse badi janjati hai MP ki, followed by Gond.', '3 PVTGs: Baiga, Bharia aur Sahariya.', 'Bhagoria Utsav Jhabua aur Alirajpur ka famous festival hai.'],
      },
      analogy: {
        hi: 'जैसे प्रकृति की जड़ें मिट्टी को बांधकर रखती हैं, वैसे ही जनजातीय संस्कृति मध्य प्रदेश के प्राकृतिक व ऐतिहासिक गौरव की असली आत्मा है!',
        en: 'Like deep ecological roots anchoring rich soil, tribal lore represents the beating cultural soul of Central India.',
        hinglish: 'Jaise roots jungle ko sambhalti hain, waise hi tribal culture MP ka real heritage aur garv hai.',
      },
    },
    kyu: {
      title: { hi: 'यह MPPSC व व्यापम के लिए क्यों सबसे महत्वपूर्ण है?', en: 'Why is it Crucial for MP State Exams?', hinglish: 'MPPSC ke liye kyu critical hai?' },
      content: {
        hi: 'MPPSC के नए पाठ्यक्रम 2024 में "मध्य प्रदेश की जनजातियां, विरासत एवं स्वतंत्रता आंदोलन" को विशेष रूप से एक पृथक इकाई (Unit 10) बनाकर 20+ अंकों का वेटेज दिया गया है।',
        en: 'MPPSC syllabus 2024 dedicated Unit 10 exclusively to MP tribal culture, dialects, and revolutionary heroes with 20+ marks weightage.',
        hinglish: 'MPPSC 2024 syllabus me Unit 10 direct Tribal culture aur History par dedicated hai.',
      },
      criticalReason: {
        hi: 'टंट्या भील को "इंडियन रॉबिन हुड" कहा जाता है, जिन्होंने अंग्रेजों से खजाना लूटकर भूखे गरीबों और आदिवासियों में बांटा था।',
        en: 'Tantya Bhil was reverently known as the "Indian Robin Hood" for redistributing colonial wealth to impoverished indigenous villagers.',
        hinglish: 'Tantya Mama ko Britishers se ladne aur garibo ki madad karne ke karan Indian Robin Hood kaha gaya.',
      },
    },
    kaise: {
      title: { hi: 'प्रमुख लोक कलाएं व प्रथाएं', en: 'Folk Arts & Traditions', hinglish: 'Tribal Arts & Bhagoria' },
      steps: [
        {
          stepNumber: 1,
          title: { hi: '1. पिथौरा चित्रकला (Pithora Painting)', en: '1. Pithora Art', hinglish: '1. Pithora Art' },
          description: { hi: 'भील और भिलाला जनजाति की पवित्र भित्ति चित्रकला, जिसमें घोड़ों का चित्रण मुख्य है। पद्मश्री भूरी बाई इसकी प्रसिद्ध कलाकार हैं।', en: 'Sacred Bhil horse wall murals, popularized globally by Padma Shri Bhuri Bai.', hinglish: 'Bhil community ki deewar par banni painting, Padma Shri Bhuri Bai famous artist hain.' },
        },
        {
          stepNumber: 2,
          title: { hi: '2. गोंड चित्रकला व डिगना (Gond Art)', en: '2. Gond Art & Digna', hinglish: '2. Gond Art' },
          description: { hi: 'प्रकृति, वृक्ष और पशु-पक्षियों के बिंदुओं और रेखाओं से बने सुंदर चित्र। जनगढ़ सिंह श्याम इसके जनक माने जाते हैं।', en: 'Intricate dot-and-line nature paintings pioneered by Jangarh Singh Shyam.', hinglish: 'Dots aur lines se banni traditional Gond painting.' },
        },
      ],
    },
    kisLiye: {
      title: { hi: 'सांस्कृतिक व आधुनिक संरक्षण', en: 'Contemporary Significance', hinglish: 'Modern Preservation' },
      applications: {
        hi: ['भोपाल का जनजातीय संग्रहालय (Tribal Museum) - विश्व स्तरीय सांस्कृतिक धरोहर केंद्र।', 'पातालपानी रेलवे स्टेशन का नाम बदलकर "क्रांतिसूर्य टंट्या भील रेलवे स्टेशन" किया गया।', 'पेसा अधिनियम (PESA Act 2022) - MP में ग्राम सभाओं को जल, जंगल, जमीन का पूर्ण अधिकार।'],
        en: ['Bhopal Tribal Museum showcasing life-size indigenous habitat replicas.', 'Patalpani railway station renamed after Krantisurya Tantya Bhil.', 'PESA Act 2022 empowering MP Gram Sabhas with land, forest, and water rights.'],
        hinglish: ['Bhopal Tribal Museum me realistic culture display.', 'Patalpani Station ka naam Tantya Mama ke samman me.', 'PESA Act se Gram Sabha ko jal, jungle, zameen ke rights.'],
      },
      realLifeExample: {
        hi: 'मंडला और डिंडौरी के बैगा आदिवासियों का पारंपरिक जड़ी-बूटी व औषधीय ज्ञान आज आधुनिक चिकित्सा में अनुसंधान का विषय है।',
        en: 'The traditional ethno-medicinal knowledge of Baiga vaidyas in Dindori cures numerous chronic ailments.',
        hinglish: 'Dindori aur Mandla ke Baiga tribal brothers ka herbal medicine knowledge pure world me recognized hai.',
      },
    },
    currentProblem: {
      title: { hi: 'वर्तमान चुनौतियाँ', en: 'Socio-Economic Challenges', hinglish: 'Current Challenges' },
      issues: {
        hi: ['सिकल सेल एनीमिया (Sickle Cell Anaemia) की आनुवंशिक बीमारी, जिसके उन्मूलन हेतु राष्ट्रीय मिशन चलाया जा रहा है।', 'आधुनिकता की दौड़ में पारंपरिक बोलियों (गोंडी, भीली, कोरकू) का विलुप्त होने का खतरा।'],
        en: ['High prevalence of Sickle Cell Anaemia addressed via National Mission.', 'Endangerment of native tribal dialects like Gondi, Bhili, and Korku.'],
        hinglish: ['Sickle cell bimari ka problem, jiske liye MP me special health mission chal raha hai.', 'Tribal languages ko preserve karne ki zaroorat.'],
      },
      misconceptions: {
        hi: 'परीक्षा फैक्ट: बैगा जनजाति को "जंगल के राजा" के रूप में जाना जाता है और वे हल चलाने को धरती माता का सीना चीरना मानकर कुदाल से खेती (बेवर) करते थे।',
        en: 'Exam Fact: Baiga traditionally practiced Bewar (shifting patch agriculture) using digging sticks to respect Mother Earth.',
        hinglish: 'Exam Fact: Baiga community traditional kheti (Bewar) karti thi aur Dharti Mata ko poojti hai.',
      },
    },
    bestSolution: {
      title: { hi: '360° समग्र विकास उपाय', en: '360° Empowerment Solutions', hinglish: '360° Tribal Development' },
      innovations: {
        hi: ['एकलव्य आदर्श आवासीय विद्यालय (EMRS) द्वारा जनजातीय बच्चों को गुणवत्तापूर्ण मुफ्त आधुनिक शिक्षा।', 'TRIFED और "ट्राइब्स इंडिया" के माध्यम से आदिवासियों के वनोपज (महुआ, शहद, कोदो-कुटकी) को राष्ट्रीय बाजार में सही मूल्य दिलाना।', '15 नवंबर को भगवान बिरसा मुंडा की जयंती पर "जनजातीय गौरव दिवस" का भव्य आयोजन।'],
        en: ['Eklavya Model Residential Schools (EMRS) providing world-class free education.', 'TRIFED & Van Dhan Kendras ensuring premium market prices for minor forest produce (Mahua, Kodo-Kutki millet).', 'National Janjatiya Gaurav Divas celebrated on Nov 15 on Birsa Munda’s birth anniversary.'],
        hinglish: ['Eklavya Schools se tribal students ko high quality education.', 'Van Dhan Vikas Kendras se kodo-kutki aur honey ka sahi daam.', '15 Nov Janjatiya Gaurav Diwas.'],
      },
      actionableTakeaway: {
        hi: 'मॉक मंत्र: "MPPSC मुख्य परीक्षा में हमेशा जनजातीय नायकों के योगदान के साथ पेसा (PESA) कानून और श्रीअन्न (मिलेट्स) को अवश्य शामिल करें!"',
        en: 'Mains Strategy: Always interlink Tribal Hero history with PESA Act governance and Kodo-Kutki millets.',
        hinglish: 'Exam Mantra: MPPSC answers me Tantya Mama, PESA Act aur Kodo-Kutki Millets connect karke likho!',
      },
    },
  },
  quiz: [
    {
      id: 'tq1',
      question: {
        hi: 'मध्य प्रदेश की कौन सी तीन जनजातियों को केंद्र सरकार द्वारा "विशेष पिछड़ी जनजाति (PVTG)" घोषित किया गया है?',
        en: 'Which three tribes of MP are categorized as Particularly Vulnerable Tribal Groups (PVTGs)?',
        hinglish: 'MP ki kaunsi 3 tribes Particularly Vulnerable Tribal Groups (PVTGs) hain?',
      },
      options: {
        hi: ['भील, गोंड, कोल', 'बैगा, भारिया, सहरिया', 'कोरकू, उरांव, कंवर', 'गोंड, प्रधान, पनीका'],
        en: ['Bhil, Gond, Kol', 'Baiga, Bharia, Sahariya', 'Korku, Oraon, Kanwar', 'Gond, Pardhan, Panika'],
        hinglish: ['Bhil, Gond, Kol', 'Baiga, Bharia, Sahariya', 'Korku, Oraon, Kanwar', 'Gond, Pardhan, Panika'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'बैगा, भारिया (पातालकोट, छिंदवाड़ा) और सहरिया (ग्वालियर-चंबल) मध्य प्रदेश की तीन आधिकारिक PVTG जनजातियाँ हैं।',
        en: 'Baiga, Bharia (Patalkot Chhindwara) and Sahariya (Gwalior-Chambal) are the 3 designated PVTGs in MP.',
        hinglish: 'Baiga, Bharia aur Sahariya MP ki 3 officially PVTG tribes hain.',
      },
    },
  ],
};

// Full Subjects & Chapters mapped for Classes 1 to 12
export const schoolCurriculumByClass: Record<number, SubjectItem[]> = {
  5: [
    {
      id: 's-science',
      name: { hi: 'पर्यावरण एवं विज्ञान (EVS/Science)', en: 'Science & Environment', hinglish: 'Science & EVS' },
      icon: 'Droplets',
      chapters: [
        {
          id: 'ch-water',
          name: { hi: 'अध्याय 1: हमारा प्राकृतिक पर्यावरण व जल', en: 'Chapter 1: Natural Environment & Water', hinglish: 'Chapter 1: Jal aur Paryavaran' },
          subject: 'Science',
          topics: [waterCycleTopic],
        },
        {
          id: 'ch-plants',
          name: { hi: 'अध्याय 2: पादप जगत व पोषण', en: 'Chapter 2: Plants & Living World', hinglish: 'Chapter 2: Plant Life & Food' },
          subject: 'Science',
          topics: [photosynthesisTopic],
        },
      ],
    },
    {
      id: 's-maths',
      name: { hi: 'गणित का जादू (Mathematics)', en: 'Mathematics Made Easy', hinglish: 'Maths Magic' },
      icon: 'Calculator',
      chapters: [
        {
          id: 'ch-fractions',
          name: { hi: 'अध्याय 1: भिन्न व दशमलव की अवधारणा', en: 'Chapter 1: Fractions & Decimals 360°', hinglish: 'Chapter 1: Fractions aur Decimals' },
          subject: 'Maths',
          topics: [fractionsTopic],
        },
      ],
    },
  ],
  10: [
    {
      id: 's-sci-10',
      name: { hi: 'विज्ञान (Science - Class 10)', en: 'Science (Class 10 CBSE/MP Board)', hinglish: 'Class 10 Science' },
      icon: 'Atom',
      chapters: [
        {
          id: 'ch-electricity',
          name: { hi: 'अध्याय: विद्युत व परिपथ (Electricity & Ohm’s Law)', en: 'Chapter: Electricity & Ohm’s Law 360°', hinglish: 'Chapter: Electricity & Ohm’s Law' },
          subject: 'Science',
          topics: [ohmsLawTopic],
        },
      ],
    },
  ],
};

// Map subjects and topics for competitive exams
export const competitiveExamSubjects: Partial<Record<CompetitiveExam, SubjectItem[]>> = {
  UPSC: [
    {
      id: 'sub-upsc-polity',
      name: { hi: 'भारतीय राजव्यवस्था व संविधान', en: 'Indian Polity & Governance', hinglish: 'Indian Polity & Constitution' },
      icon: 'Shield',
      chapters: [
        {
          id: 'ch-pol-fr',
          name: { hi: 'अध्याय: मूल अधिकार एवं संवैधानिक उपचार', en: 'Fundamental Rights & Judicial Writs', hinglish: 'Fundamental Rights & Writs' },
          subject: 'Polity',
          topics: [constitutionTopic],
        },
      ],
    },
    {
      id: 'sub-upsc-env',
      name: { hi: 'पर्यावरण एवं पारिस्थितिकी', en: 'Environment & Climate Change', hinglish: 'Environment & Ecology' },
      icon: 'Leaf',
      chapters: [
        {
          id: 'ch-env-water',
          name: { hi: 'अध्याय: जल सुरक्षा व प्राकृतिक चक्र', en: 'Water Security & Biogeochemical Cycles', hinglish: 'Water Security & Hydrology' },
          subject: 'Environment',
          topics: [waterCycleTopic],
        },
      ],
    },
  ],
  MPPSC: [
    {
      id: 'sub-mppsc-tribal',
      name: { hi: 'मध्य प्रदेश की जनजातीय विरासत (Unit 10)', en: 'MP Tribal Heritage & Freedom Fighters', hinglish: 'MP Tribal Heritage & Freedom Fighters' },
      icon: 'Crown',
      chapters: [
        {
          id: 'ch-mp-tribal-ch1',
          name: { hi: 'अध्याय: जनजातीय संस्कृति, लोक कलाएं व टंट्या मामा', en: 'Chapter: Tribal Culture, Folk Arts & Krantiveer', hinglish: 'MP Tribes, Folk Arts & Heroes' },
          subject: 'MP GK / History',
          topics: [mpTribalTopic],
        },
      ],
    },
    {
      id: 'sub-mppsc-polity',
      name: { hi: 'संविधान एवं शासन प्रणाली', en: 'Constitution & MP Governance', hinglish: 'Constitution & MP Polity' },
      icon: 'Shield',
      chapters: [
        {
          id: 'ch-mp-fr',
          name: { hi: 'अध्याय: मौलिक अधिकार व मानवाधिकार', en: 'Fundamental Rights & Human Rights', hinglish: 'Fundamental Rights in MP' },
          subject: 'Polity',
          topics: [constitutionTopic],
        },
      ],
    },
    {
      id: 'sub-mppsc-science',
      name: { hi: 'सामान्य विज्ञान एवं पर्यावरण', en: 'General Science & Environment', hinglish: 'General Science & MP Ecology' },
      icon: 'Atom',
      chapters: [
        {
          id: 'ch-mp-water',
          name: { hi: 'अध्याय: जल संरक्षण व नदियाँ (नर्मदा, चंबल)', en: 'Water Conservation & MP River Systems', hinglish: 'MP Rivers & Water Cycles' },
          subject: 'Science',
          topics: [waterCycleTopic, photosynthesisTopic],
        },
      ],
    },
  ],
  SSC: [
    {
      id: 'sub-ssc-gk',
      name: { hi: 'सामान्य अध्ययन (Polity & Science)', en: 'General Awareness (GS & Science)', hinglish: 'General Studies for SSC' },
      icon: 'Compass',
      chapters: [
        {
          id: 'ch-ssc-pol',
          name: { hi: 'संविधान के महत्वपूर्ण अनुच्छेद व अधिकार', en: 'Key Constitutional Articles & Rights', hinglish: 'Constitution Articles for SSC' },
          subject: 'Polity',
          topics: [constitutionTopic],
        },
        {
          id: 'ch-ssc-sci',
          name: { hi: 'सामान्य भौतिकी व रसायन', en: 'General Physics & Everyday Science', hinglish: 'Everyday Science for SSC' },
          subject: 'Physics',
          topics: [photosynthesisTopic],
        },
      ],
    },
  ],
  Railway: [
    {
      id: 'sub-rrb-science',
      name: { hi: 'रेलवे सामान्य विज्ञान (RRB Special)', en: 'Railway General Science 360°', hinglish: 'RRB NTPC Science' },
      icon: 'Zap',
      chapters: [
        {
          id: 'ch-rrb-phy',
          name: { hi: 'भौतिकी: विद्युत और ऊर्जा', en: 'Physics: Electricity & Energy', hinglish: 'Physics: Electricity & Circuits' },
          subject: 'Physics',
          topics: [waterCycleTopic, photosynthesisTopic],
        },
      ],
    },
  ],
  'MP Police': [
    {
      id: 'sub-police-gk',
      name: { hi: 'MP सामान्य ज्ञान व संविधान', en: 'MP GK & Constitutional Rights', hinglish: 'MP GK & Police Rules' },
      icon: 'ShieldAlert',
      chapters: [
        {
          id: 'ch-police-fr',
          name: { hi: 'नागरिक अधिकार, पुलिस प्रक्रिया व रिट्स', en: 'Citizen Rights & Legal Procedures', hinglish: 'Arrest Rules & Rights' },
          subject: 'Polity',
          topics: [constitutionTopic],
        },
      ],
    },
  ],
  Patwari: [
    {
      id: 'sub-patwari-rural',
      name: { hi: 'पंचायती राज व ग्रामीण अर्थव्यवस्था', en: 'Panchayati Raj & Rural Development', hinglish: 'Panchayati Raj & Farming' },
      icon: 'Tractor',
      chapters: [
        {
          id: 'ch-pat-water',
          name: { hi: 'ग्रामीण जल संचयन व कृषि पारिस्थितिकी', en: 'Rural Water Harvesting & Agriculture', hinglish: 'Kisan Water Harvesting' },
          subject: 'Rural Economy',
          topics: [waterCycleTopic],
        },
      ],
    },
  ],
  CTET: [
    {
      id: 'sub-ctet-evs',
      name: { hi: 'पर्यावरण अध्ययन व शिक्षणशास्त्र (EVS Pedagogy)', en: 'EVS Pedagogy & Concepts', hinglish: 'EVS Pedagogy for CTET' },
      icon: 'GraduationCap',
      chapters: [
        {
          id: 'ch-ctet-water',
          name: { hi: 'थीम: जल, भोजन व पादप जगत', en: 'Theme: Water, Food & Plants 360°', hinglish: 'Theme: Water & Plants' },
          subject: 'EVS',
          topics: [waterCycleTopic, photosynthesisTopic],
        },
      ],
    },
  ],
  Teacher: [
    {
      id: 'sub-teacher-cdp',
      name: { hi: 'बाल विकास एवं शिक्षाशास्त्र (CDP)', en: 'Child Development & Pedagogy', hinglish: 'Child Development & Pedagogy (CDP)' },
      icon: 'GraduationCap',
      chapters: [
        {
          id: 'ch-teacher-cdp1',
          name: { hi: 'अध्याय: समावेशी शिक्षा, पियाजे व वाइगोत्स्की सिद्धांत', en: 'Inclusive Education & Constructivism', hinglish: 'Inclusive Education & Learning Theories' },
          subject: 'CDP',
          topics: [constitutionTopic],
        },
      ],
    },
    {
      id: 'sub-teacher-evs',
      name: { hi: 'पर्यावरण अध्ययन व विज्ञान शिक्षण (EVS & Science)', en: 'Environmental Studies & Science', hinglish: 'EVS & Everyday Science' },
      icon: 'Leaf',
      chapters: [
        {
          id: 'ch-teacher-water',
          name: { hi: 'अध्याय: जल, पादप जगत व पारिस्थितिकी', en: 'Water Cycle, Plant Kingdom & Ecology', hinglish: 'Water Cycle & Plant Biology' },
          subject: 'EVS / Science',
          topics: [waterCycleTopic, photosynthesisTopic],
        },
      ],
    },
  ],
};

// Array of mock configs
export const mockExamConfigsList: MockExamConfig[] = Object.values(mockExamConfigs);

// Comprehensive dedicated question banks for all competitive exams
export const mockQuestionsByExam: Partial<Record<CompetitiveExam, QuizQuestion[]>> = {
  UPSC: [
    {
      id: 'upsc-q1',
      question: {
        hi: 'भारतीय संविधान के अनुच्छेद 32 के अंतर्गत उच्चतम न्यायालय द्वारा जारी की जाने वाली किस रिट का शाब्दिक अर्थ "हमारा आदेश है (We Command)" होता है?',
        en: 'Which writ issued by the Supreme Court under Article 32 literally translates to "We Command"?',
        hinglish: 'Article 32 ke under Supreme Court ki kis writ ka literal meaning "We Command" (Hamara Aadesh Hai) hota hai?',
      },
      options: {
        hi: ['बंदी प्रत्यक्षीकरण (Habeas Corpus)', 'परमादेश (Mandamus)', 'अधिकार पृच्छा (Quo-Warranto)', 'उत्प्रेषण (Certiorari)'],
        en: ['Habeas Corpus', 'Mandamus', 'Quo-Warranto', 'Certiorari'],
        hinglish: ['Habeas Corpus', 'Mandamus', 'Quo-Warranto', 'Certiorari'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'परमादेश (Mandamus) एक लैटिन शब्द है जिसका अर्थ "हम आज्ञा देते हैं" होता है। यह किसी लोक अधिकारी को उसके विधिक कर्तव्य के पालन हेतु जारी किया जाता है।',
        en: 'Mandamus literally means "We Command". It is a judicial command issued to a public official or body to perform a public or statutory duty.',
        hinglish: 'Mandamus ka matlab "We Command" hota hai. Ye public official ko uski statutory duty fulfill karne ke liye issue kiya jata hai.',
      },
      category: 'Indian Polity',
    },
    {
      id: 'upsc-q2',
      question: {
        hi: 'वैश्विक कार्बन चक्र और जलवायु संतुलन में महासागरों की मुख्य भूमिका क्या है?',
        en: 'What is the primary role of the world oceans in the global carbon cycle and climate regulation?',
        hinglish: 'Global Carbon Cycle aur Climate Balance me Oceans ka primary role kya hai?',
      },
      options: {
        hi: ['महासागर मानव जनित 25-30% CO2 को अवशोषित कर कार्बन सिंक का कार्य करते हैं', 'महासागर केवल ऑक्सीजन उत्सर्जित करते हैं', 'महासागरों का कार्बन चक्र से कोई संबंध नहीं है', 'महासागर सभी ग्रीनहाउस गैसों को नष्ट कर देते हैं'],
        en: ['Oceans absorb ~25-30% of anthropogenic CO2 emissions acting as major carbon sinks', 'Oceans only release oxygen', 'Oceans do not interact with carbon', 'Oceans destroy all greenhouse gases'],
        hinglish: ['Oceans human-made 25-30% CO2 ko absorb karke giant Carbon Sink ki tarah act karte hain', 'Oceans sirf oxygen nikalte hain', 'Oceans ka carbon se lena dena nahi hai', 'Oceans greenhouse gases ko destroy karte hain'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'महासागर पृथ्वी का सबसे बड़ा सक्रिय कार्बन सिंक हैं जो वायुमंडलीय अतिरिक्त ऊष्मा का 90% और CO2 उत्सर्जन का लगभग 30% अवशोषित करते हैं।',
        en: 'Oceans absorb over 90% of excess planetary heat and ~30% of atmospheric CO2, acting as the ultimate climate buffer.',
        hinglish: 'Oceans world ka biggest carbon sink hain jo Earth ki excess heat aur 30% CO2 absorb karte hain.',
      },
      category: 'Environment & Ecology',
    },
    {
      id: 'upsc-q3',
      question: {
        hi: 'संविधान के भाग III में उल्लिखित "उचित प्रतिबंध (Reasonable Restrictions)" का अंतिम न्यायिक मूल्यांकन कौन करता है?',
        en: 'Who is the ultimate authority to determine whether a restriction on a Fundamental Right is "Reasonable"?',
        hinglish: 'Fundamental Rights par lagaye gaye "Reasonable Restrictions" ka final decision kaun karta hai?',
      },
      options: {
        hi: ['संसद (Parliament)', 'राष्ट्रपति (President of India)', 'न्यायपालिका (Judiciary - High Courts & Supreme Court)', 'विधि आयोग (Law Commission)'],
        en: ['Parliament', 'President of India', 'Judiciary (High Courts & Supreme Court)', 'Law Commission'],
        hinglish: ['Parliament', 'President', 'Judiciary (Supreme Court & High Court)', 'Law Commission'],
      },
      correctIndex: 2,
      explanation: {
        hi: 'अनुच्छेद 13 और 32 के तहत न्यायिक पुनरावलोकन (Judicial Review) शक्ति न्यायपालिका को यह तय करने का अधिकार देती है कि संसद द्वारा लगाया गया प्रतिबंध उचित है या नहीं।',
        en: 'Under Articles 13 & 32, the Judiciary holds the power of Judicial Review to assess the constitutional validity and reasonableness of legislative restrictions.',
        hinglish: 'Judiciary (Supreme Court aur High Courts) ke paas Judicial Review ki power hoti hai to decide whether restriction reasonable hai ya nahi.',
      },
      category: 'Indian Polity',
    },
    {
      id: 'upsc-q4',
      question: {
        hi: 'प्रकाश संश्लेषण (Photosynthesis) की प्रकाशिक अभिक्रिया (Light Reaction) हरितलवक (Chloroplast) के किस भाग में संपन्न होती है?',
        en: 'In which part of the chloroplast does the Light Reaction of photosynthesis take place?',
        hinglish: 'Photosynthesis ki Light Reaction chloroplast ke kis part me hoti hai?',
      },
      options: {
        hi: ['स्ट्रोमा (Stroma)', 'थायलेकोइड झिल्ली / ग्रैना (Thylakoid Membrane / Grana)', 'माइटोकॉन्ड्रिया (Mitochondria)', 'कोशिका द्रव्य (Cytoplasm)'],
        en: ['Stroma', 'Thylakoid Membrane / Grana', 'Mitochondria', 'Cytoplasm'],
        hinglish: ['Stroma', 'Thylakoid Membrane / Grana', 'Mitochondria', 'Cytoplasm'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'प्रकाश अभिक्रिया थायलेकोइड झिल्ली में होती है जहाँ क्लोरोफिल सूर्य प्रकाश अवशोषित कर ATP व NADPH बनाता है, जबकि डार्क रिएक्शन (केल्विन चक्र) स्ट्रोमा में होता है।',
        en: 'Light reaction occurs in the Thylakoid membranes (Grana) generating ATP and NADPH, while the dark reaction (Calvin cycle) occurs in the Stroma.',
        hinglish: 'Light reaction Thylakoid membranes (Grana) me hoti hai, jabki Dark reaction Stroma me hoti hai.',
      },
      category: 'Science & Tech',
    },
  ],
  MPPSC: [
    {
      id: 'mppsc-q1',
      question: {
        hi: 'मध्य प्रदेश के किस महान जनजातीय स्वतंत्रता सेनानी को "भारतीय रॉबिनहुड" के नाम से जाना जाता है और उनका समाधि स्थल पातालपानी (इंदौर) में है?',
        en: 'Which iconic MP tribal freedom fighter is famously known as the "Indian Robin Hood" with his memorial located at Patalpani, Indore?',
        hinglish: 'MP ke kis tribal freedom fighter ko "Indian Robin Hood" kaha jata hai jinka memorial Patalpani (Indore) me hai?',
      },
      options: {
        hi: ['बिरसा मुंडा', 'क्रांतिसूर्य टंट्या मामा भील', 'भीमा नायक', 'शंकर शाह'],
        en: ['Birsa Munda', 'Krantisurya Tantya Mama Bhil', 'Bhima Nayak', 'Shankar Shah'],
        hinglish: ['Birsa Munda', 'Tantya Mama Bhil', 'Bhima Nayak', 'Shankar Shah'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'टंट्या भील (टंट्या मामा) ने अंग्रेजों के खजाने को लूटकर गरीब आदिवासियों में बांटा था। अंग्रेजों ने उन्हें 1889 में फांसी दी। पातालपानी रेलवे स्टेशन का नाम अब टंट्या मामा रेलवे स्टेशन है।',
        en: 'Tantya Mama Bhil fought bravely against British colonial exploitation. His sacred memorial is at Patalpani near Indore.',
        hinglish: 'Tantya Mama Bhil ne Britishers ke khilaf ladai ladi aur gareeb logon ki madad ki. Patalpani me unka sacred smarak hai.',
      },
      category: 'MP Tribal Heritage (Unit 10)',
    },
    {
      id: 'mppsc-q2',
      question: {
        hi: 'मध्य प्रदेश के छिंदवाड़ा जिले की पातालकोट घाटी में कौन सी विशेष पिछड़ी जनजाति (PVTG) निवास करती है?',
        en: 'Which Particularly Vulnerable Tribal Group (PVTG) predominantly resides in the deep Patalkot valley of Chhindwara district, MP?',
        hinglish: 'MP ke Chhindwara district ki Patalkot ghati me kaunsi PVTG tribe rehti hai?',
      },
      options: {
        hi: ['बैगा (Baiga)', 'भारिया (Bharia)', 'सहरिया (Sahariya)', 'कोल (Kol)'],
        en: ['Baiga', 'Bharia', 'Sahariya', 'Kol'],
        hinglish: ['Baiga', 'Bharia', 'Sahariya', 'Kol'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'भारिया जनजाति पातालकोट घाटी (छिंदवाड़ा) में रहती है। 1981 की जनगणना में इन्हें "जंगलियों का जंगली" कहा गया था। ये पारंपरिक जड़ी-बूटियों के विशेषज्ञ होते हैं।',
        en: 'Bharia tribe resides in the horseshoe-shaped Patalkot valley in Chhindwara and possess deep indigenous ethno-botanical medicine knowledge.',
        hinglish: 'Bharia tribe Patalkot Chhindwara me rehti hai aur indigenous herbal medicine me expert hoti hai.',
      },
      category: 'MP GK',
    },
    {
      id: 'mppsc-q3',
      question: {
        hi: 'मध्य प्रदेश में पेसा (PESA) अधिनियम 1996 के नियम औपचारिक रूप से कब से लागू किए गए?',
        en: 'When were the formal rules of PESA (Panchayats Extension to Scheduled Areas) Act implemented in Madhya Pradesh?',
        hinglish: 'MP me PESA Act ke niyam officially kab implement kiye gaye?',
      },
      options: {
        hi: ['15 नवंबर 2022 (जनजातीय गौरव दिवस)', '26 जनवरी 2020', '15 अगस्त 2021', '1 नवंबर 2023'],
        en: ['15 November 2022 (Janjatiya Gaurav Diwas)', '26 January 2020', '15 August 2021', '1 November 2023'],
        hinglish: ['15 November 2022 (Janjatiya Gaurav Diwas)', '26 January 2020', '15 August 2021', '1 November 2023'],
      },
      correctIndex: 0,
      explanation: {
        hi: '15 नवंबर 2022 को भगवान बिरसा मुंडा की जयंती (जनजातीय गौरव दिवस) पर शहडोल से मध्य प्रदेश में पेसा एक्ट के नियम लागू किए गए, जिससे ग्राम सभाओं को जल, जंगल, जमीन के व्यापक अधिकार मिले।',
        en: 'MP PESA rules were launched on 15 November 2022 at Shahdol empowering tribal Gram Sabhas over land, forest produce, and water resources.',
        hinglish: '15 November 2022 ko Janjatiya Gaurav Diwas par MP me PESA rules launch hue jo Gram Sabhas ko direct powers dete hain.',
      },
      category: 'MP Polity & Governance',
    },
    {
      id: 'mppsc-q4',
      question: {
        hi: 'नर्मदा नदी का उद्गम स्थल मध्य प्रदेश के किस जिले में स्थित है?',
        en: 'The origin of the holy Narmada River is located in which district of Madhya Pradesh?',
        hinglish: 'Narmada River ka origin MP ke kis district me sthit hai?',
      },
      options: {
        hi: ['अनूपपुर (अमरकंटक)', 'डिंडोरी', 'मंडला', 'होशंगाबाद (नर्मदापुरम)'],
        en: ['Anuppur (Amarkantak)', 'Dindori', 'Mandla', 'Hoshangabad (Narmadapuram)'],
        hinglish: ['Anuppur (Amarkantak)', 'Dindori', 'Mandla', 'Hoshangabad'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'नर्मदा नदी अनूपपुर जिले की पुष्पराजगढ़ तहसील में मैकाल पर्वत श्रेणी के अमरकंटक शिखर से निकलती है और खंभात की खाड़ी (अरब सागर) में गिरती है।',
        en: 'Narmada originates from the Amarkantak plateau in the Maikal range of Anuppur district, flowing westward into the Arabian Sea.',
        hinglish: 'Narmada Amarkantak (Anuppur district) se nikal kar west ki taraf behti hai aur Arabian sea me milti hai.',
      },
      category: 'MP Geography',
    },
  ],
  SSC: [
    {
      id: 'ssc-q1',
      question: {
        hi: 'विद्युत धारा (Current) और विभवांतर (Voltage) के बीच संबंध दर्शाने वाला ओम का नियम (Ohm’s Law) किस सूत्र से व्यक्त किया जाता है?',
        en: 'Which mathematical formula accurately represents Ohm’s Law relating Current (I), Voltage (V), and Resistance (R)?',
        hinglish: 'Ohm’s Law ka formula kya hota hai jo Voltage, Current aur Resistance ko relate karta hai?',
      },
      options: {
        hi: ['V = I × R', 'V = I / R', 'I = V × R', 'R = V × I'],
        en: ['V = I × R', 'V = I / R', 'I = V × R', 'R = V × I'],
        hinglish: ['V = I × R', 'V = I / R', 'I = V × R', 'R = V × I'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'ओम के नियम के अनुसार, स्थिर भौतिक परिस्थितियों में चालक के सिरों पर विभवांतर प्रवाहित धारा के समानुपाती होता है (V = I * R)।',
        en: 'Ohm’s Law states that electric potential difference (V) across a conductor is directly proportional to current (I), with resistance (R) as constant of proportionality (V = IR).',
        hinglish: 'Ohm’s Law formula V = I * R hota hai jisme V voltage hai, I current hai aur R electrical resistance hai.',
      },
      category: 'General Science Physics',
    },
    {
      id: 'ssc-q2',
      question: {
        hi: 'भारतीय संविधान के किस अनुच्छेद को डॉ. बी.आर. अम्बेडकर ने "संविधान का हृदय और आत्मा" कहा था?',
        en: 'Which article of the Indian Constitution was described by Dr. B.R. Ambedkar as the "Heart and Soul of the Constitution"?',
        hinglish: 'Dr. B.R. Ambedkar ne kis Article ko Constitution ka "Heart and Soul" kaha tha?',
      },
      options: {
        hi: ['अनुच्छेद 14 (समानता का अधिकार)', 'अनुच्छेद 19 (स्वतंत्रता का अधिकार)', 'अनुच्छेद 21 (जीवन का अधिकार)', 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)'],
        en: ['Article 14', 'Article 19', 'Article 21', 'Article 32 (Right to Constitutional Remedies)'],
        hinglish: ['Article 14', 'Article 19', 'Article 21', 'Article 32 (Constitutional Remedies)'],
      },
      correctIndex: 3,
      explanation: {
        hi: 'अनुच्छेद 32 नागरिकों को मौलिक अधिकारों के उल्लंघन पर सीधे सर्वोच्च न्यायालय जाने और 5 प्रकार की रिट्स प्राप्त करने का अधिकार देता है।',
        en: 'Article 32 provides the Right to Constitutional Remedies, empowering citizens to directly approach the Supreme Court via writs.',
        hinglish: 'Article 32 Constitutional Remedies deta hai jisse citizens directly Supreme Court ja sakte hain agar Fundamental Rights violate hon.',
      },
      category: 'General Studies Polity',
    },
    {
      id: 'ssc-q3',
      question: {
        hi: 'पौधों में पत्तियों का हरा रंग किस वर्णक (Pigment) के कारण होता है जो सूर्य के प्रकाश को अवशोषित करता है?',
        en: 'Which biological pigment is responsible for the green color of plant leaves and absorption of solar light?',
        hinglish: 'Plant leaves ka green color kis pigment ki wajah se hota hai jo sunlight absorb karta hai?',
      },
      options: {
        hi: ['क्लोरोफिल (Chlorophyll / पर्णहरिम)', 'कैरोटीनॉइड (Carotenoid)', 'हीमोग्लोबिन (Hemoglobin)', 'एंथोसायनिन (Anthocyanin)'],
        en: ['Chlorophyll', 'Carotenoid', 'Hemoglobin', 'Anthocyanin'],
        hinglish: ['Chlorophyll', 'Carotenoid', 'Hemoglobin', 'Anthocyanin'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'क्लोरोफिल पौधों के हरितलवक (Chloroplast) में पाया जाने वाला मैग्नीशियम-युक्त हरा वर्णक है जो प्रकाश संश्लेषण का केंद्र है।',
        en: 'Chlorophyll contains a central magnesium ion and captures blue and red wavelengths of light for photosynthesis.',
        hinglish: 'Chlorophyll green pigment hai jisme magnesium hota hai aur ye sunlight capture karta hai.',
      },
      category: 'General Science Biology',
    },
  ],
  Railway: [
    {
      id: 'rrb-q1',
      question: {
        hi: 'यदि किसी 10 ओम प्रतिरोध वाले तार में 2 एम्पीयर की धारा प्रवाहित हो रही है, तो उसके सिरों पर विभवांतर (Voltage) कितना होगा?',
        en: 'If a current of 2 Amperes flows through a wire of 10 Ohms resistance, what is the voltage across its terminals?',
        hinglish: 'Agar 10 Ohm resistance wale wire me 2 Ampere current flow ho raha hai, to Voltage kitna hoga?',
      },
      options: {
        hi: ['5 वोल्ट', '20 वोल्ट', '12 वोल्ट', '0.2 वोल्ट'],
        en: ['5 Volts', '20 Volts', '12 Volts', '0.2 Volts'],
        hinglish: ['5 Volts', '20 Volts', '12 Volts', '0.2 Volts'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'ओम के नियम V = I * R से: V = 2 A * 10 Ω = 20 V (वोल्ट)।',
        en: 'Applying Ohm’s Law V = I * R: V = 2 * 10 = 20 Volts.',
        hinglish: 'Formula V = I * R use karo: V = 2 * 10 = 20 Volts.',
      },
      category: 'Railway General Science',
    },
    {
      id: 'rrb-q2',
      question: {
        hi: 'बादलों से वर्षा की बूंदों का गोल आकार (Spherical Shape) होने का मुख्य भौतिक कारण क्या है?',
        en: 'What is the primary physical property responsible for raindrops assuming a spherical shape?',
        hinglish: 'Raindrops ka shape round / spherical kis physical property ki wajah se hota hai?',
      },
      options: {
        hi: ['पृष्ठ तनाव (Surface Tension)', 'श्यानता (Viscosity)', 'गुरुत्वाकर्षण (Gravity)', 'वायुमंडलीय दाब (Atmospheric Pressure)'],
        en: ['Surface Tension', 'Viscosity', 'Gravity', 'Atmospheric Pressure'],
        hinglish: ['Surface Tension (Prisht Tanav)', 'Viscosity', 'Gravity', 'Atmospheric Pressure'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'पृष्ठ तनाव के कारण द्रव अपनी सतह के क्षेत्रफल को न्यूनतम करने का प्रयास करता है, और दी गई मात्रा के लिए गोले का पृष्ठीय क्षेत्रफल सबसे कम होता है।',
        en: 'Due to surface tension, liquids minimize their surface area, and a sphere has the smallest surface area for a given volume.',
        hinglish: 'Surface Tension ki wajah se liquid minimum surface area lena chahta hai, isliye boond round banti hai.',
      },
      category: 'Everyday Physics',
    },
  ],
  'MP Police': [
    {
      id: 'mpp-q1',
      question: {
        hi: 'भारतीय संविधान के अनुच्छेद 22 के अनुसार, पुलिस द्वारा गिरफ्तार किए गए किसी भी व्यक्ति को कितने समय के भीतर निकटतम मजिस्ट्रेट के समक्ष प्रस्तुत करना अनिवार्य है?',
        en: 'Under Article 22 of the Indian Constitution, an arrested person must be produced before the nearest magistrate within what timeframe?',
        hinglish: 'Article 22 ke according, police ko arrested person ko kitne time me nearest Magistrate ke samne pesh karna compulsory hai?',
      },
      options: {
        hi: ['12 घंटे के भीतर', '24 घंटे के भीतर (यात्रा समय को छोड़कर)', '48 घंटे के भीतर', '72 घंटे के भीतर'],
        en: ['Within 12 hours', 'Within 24 hours (excluding journey time)', 'Within 48 hours', 'Within 72 hours'],
        hinglish: ['Within 12 hours', 'Within 24 hours (excluding travel time)', 'Within 48 hours', 'Within 72 hours'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'अनुच्छेद 22(2) के अनुसार, गिरफ्तार किए गए व्यक्ति को गिरफ्तारी के 24 घंटे के भीतर (यात्रा के आवश्यक समय को छोड़कर) मजिस्ट्रेट के समक्ष पेश किया जाना अनिवार्य है।',
        en: 'Article 22(2) mandates that every person arrested and detained in custody must be produced before the nearest magistrate within 24 hours.',
        hinglish: 'Article 22(2) ensure karta hai ki 24 hours ke andar magistrate ke samne pesh kiya jaye, travel time ko chhodkar.',
      },
      category: 'Police GK & Constitutional Law',
    },
    {
      id: 'mpp-q2',
      question: {
        hi: 'मध्य प्रदेश पुलिस का आधिकारिक आदर्श वाक्य (Motto) क्या है?',
        en: 'What is the official motto of the Madhya Pradesh Police force?',
        hinglish: 'Madhya Pradesh Police ka official Motto / Dhyey Vakya kya hai?',
      },
      options: {
        hi: ['सत्यमेव जयते', 'देशभक्ति, जनसेवा', 'सेवा, सुरक्षा और शांति', 'वीरता और निष्ठा'],
        en: ['Satyameva Jayate', 'Desh Bhakti, Jan Seva (Patriotism, Public Service)', 'Seva, Suraksha aur Shanti', 'Veerta aur Nishtha'],
        hinglish: ['Satyameva Jayate', 'Desh Bhakti, Jan Seva', 'Seva, Suraksha, Shanti', 'Veerta aur Nishtha'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'मध्य प्रदेश पुलिस का आधिकारिक ध्येय वाक्य "देशभक्ति, जनसेवा" है।',
        en: 'The state police motto is "Desh Bhakti, Jan Seva" signifying unwavering national devotion and public service.',
        hinglish: 'MP Police ka motto "Desh Bhakti, Jan Seva" hai.',
      },
      category: 'MP Police Special GK',
    },
  ],
  Patwari: [
    {
      id: 'pat-q1',
      question: {
        hi: 'भारत में पंचायती राज व्यवस्था को संवैधानिक दर्जा किस संविधान संशोधन अधिनियम द्वारा प्रदान किया गया?',
        en: 'Which Constitutional Amendment Act granted constitutional status to the Panchayati Raj Institutions in India?',
        hinglish: 'Panchayati Raj system ko constitutional status kis Amendment Act se mila?',
      },
      options: {
        hi: ['42वां संशोधन अधिनियम 1976', '44वां संशोधन अधिनियम 1978', '73वां संविधान संशोधन अधिनियम 1992', '86वां संशोधन अधिनियम 2002'],
        en: ['42nd Amendment 1976', '44th Amendment 1978', '73rd Constitutional Amendment 1992', '86th Amendment 2002'],
        hinglish: ['42nd Amendment', '44th Amendment', '73rd Amendment Act 1992', '86th Amendment'],
      },
      correctIndex: 2,
      explanation: {
        hi: '73वें संविधान संशोधन 1992 द्वारा संविधान में भाग IX और 11वीं अनुसूची (29 विषय) जोड़ी गई, जिसने 24 अप्रैल 1993 से पंचायती राज को संवैधानिक स्वरूप दिया।',
        en: 'The 73rd Constitutional Amendment Act 1992 inserted Part IX and the 11th Schedule (29 functional subjects) for rural local self-governance.',
        hinglish: '73rd Constitutional Amendment 1992 ne Panchayati Raj ko Part IX aur 11th Schedule ke sath constitutional status diya.',
      },
      category: 'Panchayati Raj & Rural Economy',
    },
    {
      id: 'pat-q2',
      question: {
        hi: 'मध्य प्रदेश में ग्रामीण भूमि अभिलेखों (Land Records) में "खसरा" (Khasra) क्या दर्शाता है?',
        en: 'In Madhya Pradesh revenue administration and land records, what does a "Khasra" represent?',
        hinglish: 'MP Revenue records me "Khasra" number kis cheez ko represent karta hai?',
      },
      options: {
        hi: ['गाँव का नक्शा', 'कृषि भूमि के प्रत्येक विशिष्ट भूखंड/खेत का सर्वेक्षण क्रमांक व विवरण', 'किसान का बैंक खाता', 'फसल बीमा पॉलिसी'],
        en: ['Village boundary map', 'Survey number and ownership/crop details of a specific agricultural land parcel', 'Bank account', 'Crop insurance certificate'],
        hinglish: ['Village map', 'Khet/Plot ka specific survey number aur crop record', 'Farmer bank account', 'Insurance receipt'],
      },
      correctIndex: 1,
      explanation: {
        hi: 'खसरा एक कानूनी भू-राजस्व दस्तावेज है जिसमें खेत का क्षेत्रफल, भू-स्वामी का नाम, बोई गई फसल और मिट्टी का प्रकार दर्ज होता है।',
        en: 'Khasra is the foundational legal land register recording field parcel survey numbers, ownership, soil type, and cultivated crops.',
        hinglish: 'Khasra number khet ka unique survey number hota hai jisme ownership aur crop details patwari dwara update hoti hain.',
      },
      category: 'Land Revenue & Patwari Records',
    },
  ],
  Teacher: [
    {
      id: 'tch-q1',
      question: {
        hi: 'जीन पियाजे (Jean Piaget) के संज्ञानात्मक विकास सिद्धांत के अनुसार, किस अवस्था में बच्चा "मूर्त संक्रियात्मक (Concrete Operational)" चिंतन और संरक्षण (Conservation) की क्षमता विकसित करता है?',
        en: 'According to Jean Piaget’s Theory of Cognitive Development, at which stage does a child develop Concrete Operational thinking and Conservation skills?',
        hinglish: 'Jean Piaget ke cognitive development theory me bacha "Concrete Operational" thinking kis age stage me seekhta hai?',
      },
      options: {
        hi: ['संवेदी पेशीय अवस्था (0 - 2 वर्ष)', 'पूर्व-संक्रियात्मक अवस्था (2 - 7 वर्ष)', 'मूर्त संक्रियात्मक अवस्था (7 - 11 वर्ष)', 'औपचारिक संक्रियात्मक अवस्था (11 वर्ष से ऊपर)'],
        en: ['Sensorimotor stage (0 - 2 yrs)', 'Pre-operational stage (2 - 7 yrs)', 'Concrete Operational stage (7 - 11 yrs)', 'Formal Operational stage (11+ yrs)'],
        hinglish: ['Sensorimotor stage (0 - 2 yrs)', 'Pre-operational stage (2 - 7 yrs)', 'Concrete Operational stage (7 - 11 yrs)', 'Formal Operational stage (11+ yrs)'],
      },
      correctIndex: 2,
      explanation: {
        hi: '7 से 11 वर्ष की मूर्त संक्रियात्मक अवस्था में बच्चे ठोस वस्तुओं के साथ तार्किक चिंतन, वर्गीकरण और संरक्षण (द्रव्यमान/आयतन नहीं बदलता) समझ लेते हैं।',
        en: 'In the Concrete Operational Stage (7-11 years), children grasp conservation of mass/volume, reversibility, and logical classification of tangible objects.',
        hinglish: 'Concrete Operational stage (7 se 11 saal) me bacha logic, classification aur conservation concept samajh leta hai.',
      },
      category: 'Child Development & Pedagogy',
    },
    {
      id: 'tch-q2',
      question: {
        hi: 'राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF 2005 / NEP 2020) के अनुसार, प्राथमिक स्तर पर पर्यावरण अध्ययन (EVS) शिक्षण का मुख्य उद्देश्य क्या होना चाहिए?',
        en: 'According to NCF 2005 & NEP 2020, what is the primary objective of teaching Environmental Studies (EVS) at the primary school level?',
        hinglish: 'NCF 2005 / NEP 2020 ke according primary level par EVS sikhane ka main goal kya hona chahiye?',
      },
      options: {
        hi: ['कक्षा के अधिगम को स्कूल के बाहर के वास्तविक जीवन से जोड़ना और रटने की प्रथा को समाप्त करना', 'केवल वैज्ञानिक शब्दावली याद करवाना', 'विद्यार्थियों को परीक्षा के अंकों के आधार पर रैंक देना', 'पर्यावरण की परिभाषाओं को कंठस्थ कराना'],
        en: ['Connecting classroom learning to real-life outside the school and eliminating rote memorization', 'Memorizing scientific terms only', 'Ranking students on marks', 'Rote learning textbook definitions'],
        hinglish: ['Classroom learning ko real life se connect karna aur ratta maarne ki aadat khatam karna', 'Sirf definitions yaad karwana', 'Sirf marks ke liye padhana', 'Books ko ratna'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'NCF का मुख्य मार्गदर्शक सिद्धांत है ज्ञान को बाहरी जीवन से जोड़ना, सीखने को रटंत प्रणाली से मुक्त करना और बाल-केंद्रित अनुभव आधारित शिक्षा देना।',
        en: 'The core tenet of modern pedagogical frameworks is connecting theoretical knowledge to the child’s natural socio-ecological environment and replacing rote learning with experiential understanding.',
        hinglish: 'Real learning tab hoti hai jab bachhe apne aas-paas ke nature aur real life se topics ko connect karte hain, bina kisi ratte ke.',
      },
      category: 'EVS Pedagogy & Methodology',
    },
  ],
  CTET: [
    {
      id: 'ctet-q1',
      question: {
        hi: 'लेव वाइगोत्स्की (Lev Vygotsky) के सामाजिक-सांस्कृतिक सिद्धांत में "समीपस्थ विकास का क्षेत्र (ZPD)" क्या दर्शाता है?',
        en: 'In Lev Vygotsky’s Socio-Cultural Theory of Learning, what does the "Zone of Proximal Development (ZPD)" signify?',
        hinglish: 'Lev Vygotsky ke theory me "Zone of Proximal Development (ZPD)" kya hota hai?',
      },
      options: {
        hi: ['बच्चे द्वारा स्वयं किए जा सकने वाले कार्य और किसी कुशल वयस्क की सहायता (Scaffolding) से किए जाने वाले कार्य के बीच का अंतर', 'बच्चे की जन्मजात बुद्धिमत्ता', 'केवल औपचारिक स्कूल परीक्षा', 'शारीरिक वृद्धि की सीमा'],
        en: ['Difference between what a child can do independently and what they can achieve with guidance/scaffolding', 'Innate biological intelligence', 'Only formal school testing', 'Physical height growth'],
        hinglish: ['Bacha akele jo kar sakta hai aur teacher/expert ki help (Scaffolding) se jo seekh sakta hai uske beech ka gap', 'Innate IQ', 'School marks', 'Physical growth'],
      },
      correctIndex: 0,
      explanation: {
        hi: 'ZPD वह सीखने का क्षेत्र है जहाँ बच्चा किसी शिक्षक या सक्षम साथी की सहायता (Scaffolding) से उन कठिन समस्याओं को हल कर लेता है जो वह अकेले नहीं कर पाता।',
        en: 'ZPD is the sweet spot of learning where guided assistance (Scaffolding) bridges the gap between actual ability and potential development.',
        hinglish: 'ZPD learning ka wo zone hai jahan guidance aur scaffolding se bacha high-level problem solve karna seekhta hai.',
      },
      category: 'Pedagogy & Learning Theories',
    },
  ],
};

// Flattened arrays for direct module consumption across UI
export const schoolCurriculumData: TopicItem[] = [
  // Class 5 Topics
  { ...waterCycleTopic, classLevel: 5, board: 'MP Board' },
  { ...waterCycleTopic, id: 'topic-water-cycle-cbse', classLevel: 5, board: 'CBSE' },
  { ...waterCycleTopic, id: 'topic-water-cycle-ncert', classLevel: 5, board: 'NCERT' },
  { ...photosynthesisTopic, classLevel: 5, board: 'MP Board' },
  { ...photosynthesisTopic, id: 'topic-photo-cbse', classLevel: 5, board: 'CBSE' },
  { ...photosynthesisTopic, id: 'topic-photo-ncert', classLevel: 5, board: 'NCERT' },
  
  // Class 6 - 8 Topics
  { ...waterCycleTopic, id: 'topic-water-c6', classLevel: 6, board: 'MP Board' },
  { ...photosynthesisTopic, id: 'topic-photo-c7', classLevel: 7, board: 'MP Board' },
  { ...ohmsLawTopic, id: 'topic-ohms-c8', classLevel: 8, board: 'MP Board' },
  
  // Class 10 Topics
  { ...ohmsLawTopic, classLevel: 10, board: 'MP Board' },
  { ...ohmsLawTopic, id: 'topic-ohms-cbse', classLevel: 10, board: 'CBSE' },
  { ...ohmsLawTopic, id: 'topic-ohms-ncert', classLevel: 10, board: 'NCERT' },
  { ...constitutionTopic, id: 'topic-const-c10', classLevel: 10, board: 'MP Board', subject: 'Social Science', chapter: 'Democratic Politics' },
  
  // Class 11 & 12 Topics
  { ...constitutionTopic, id: 'topic-const-c11', classLevel: 11, board: 'CBSE', subject: 'Political Science', chapter: 'Indian Constitution at Work' },
  { ...ohmsLawTopic, id: 'topic-ohms-c12', classLevel: 12, board: 'CBSE', subject: 'Physics', chapter: 'Current Electricity' },
];

export const competitiveCurriculumData: TopicItem[] = [
  { ...constitutionTopic, examType: 'UPSC' },
  { ...constitutionTopic, id: 'topic-fr-mppsc', examType: 'MPPSC' },
  { ...constitutionTopic, id: 'topic-fr-ssc', examType: 'SSC' },
  { ...constitutionTopic, id: 'topic-fr-police', examType: 'MP Police' },
  { ...constitutionTopic, id: 'topic-fr-teacher', examType: 'Teacher' },
  { ...mpTribalTopic, examType: 'MPPSC' },
  { ...mpTribalTopic, id: 'topic-tribal-police', examType: 'MP Police' },
  { ...mpTribalTopic, id: 'topic-tribal-patwari', examType: 'Patwari' },
  { ...waterCycleTopic, id: 'topic-water-upsc', examType: 'UPSC', chapter: 'Environment & Climate Change' },
  { ...waterCycleTopic, id: 'topic-water-patwari', examType: 'Patwari', chapter: 'Rural Water Harvesting & Agriculture' },
  { ...waterCycleTopic, id: 'topic-water-railway', examType: 'Railway', chapter: 'General Science Ecology' },
  { ...waterCycleTopic, id: 'topic-water-ctet', examType: 'CTET', chapter: 'Theme: Water, Food & Plants' },
  { ...waterCycleTopic, id: 'topic-water-teacher', examType: 'Teacher', chapter: 'Theme: Water, Food & Plants' },
  { ...photosynthesisTopic, id: 'topic-photo-ctet', examType: 'CTET', chapter: 'Theme: Water, Food & Plants' },
  { ...photosynthesisTopic, id: 'topic-photo-teacher', examType: 'Teacher', chapter: 'Theme: Water, Food & Plants' },
  { ...photosynthesisTopic, id: 'topic-photo-railway', examType: 'Railway', chapter: 'General Biology' },
  { ...ohmsLawTopic, id: 'topic-ohms-railway', examType: 'Railway', chapter: 'Applied General Physics' },
  { ...ohmsLawTopic, id: 'topic-ohms-ssc', examType: 'SSC', chapter: 'Everyday Science for SSC' },
];
