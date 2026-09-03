import { TopicItem, Framework360, QuizQuestion } from '../types';

export function buildFallbackFramework(topicName: string, subject: string, chapter: string, classLevelOrExam: string): Framework360 {
  return {
    kya: {
      title: {
        hi: `${topicName} क्या है? (मूलभूत संकल्पना)`,
        en: `What is ${topicName}? (Foundational Concept)`,
        hinglish: `${topicName} kya hai aur iska primary core concept kya hai?`,
      },
      content: {
        hi: `${topicName}, ${subject} का एक अत्यंत महत्वपूर्ण सिद्धांत है जो ${chapter} के अंतर्गत आता है। यह हमें यह समझने की शक्ति देता है कि कैसे प्राकृतिक व वैज्ञानिक प्रक्रियाएं एक सुव्यवस्थित नियम के अनुसार कार्य करती हैं।`,
        en: `${topicName} is a foundational pillar in ${subject} (${chapter}). It provides deep structural insight into the governing principles of the discipline without rote memorization.`,
        hinglish: `${topicName} subject ${subject} ka ek essential topic hai jo ${chapter} me aata hai. Ye hume bina ratey har cheez ka logic explain karta hai.`,
      },
      bulletPoints: {
        hi: [
          `मुख्य सिद्धांत और वैज्ञानिक परिभाषा`,
          `प्रणाली के प्रमुख घटक और नियम`,
          `व्यावहारिक व वैचारिक आधारशिला`,
        ],
        en: [
          `Fundamental definition and structural formulation`,
          `Key parameters, equations, and systemic behavior`,
          `Conceptual foundation without rote memorization`,
        ],
        hinglish: [
          `Basic definition aur core scientific logic`,
          `Iske main components aur kaam karne ka dhang`,
          `Zero-ratta, 100% conceptual clarity`,
        ],
      },
      analogy: {
        hi: `सरल उपमा: इसे ऐसे समझें जैसे एक घड़ी की सूक्ष्म गरारियां मिलकर पूरे समय चक्र को गतिमान रखती हैं।`,
        en: `Simple Analogy: Think of it like precision gears inside a clock, orchestrating seamless motion.`,
        hinglish: `Simple Analogy: Jaise train ke engine aur bogiyan milkar track par daudte hain!`,
      },
    },
    kyu: {
      title: {
        hi: `${topicName} क्यों महत्वपूर्ण है? (Why it matters)`,
        en: `Why is ${topicName} Essential?`,
        hinglish: `${topicName} kyu itna important hai aur exam me kyu puchte hain?`,
      },
      content: {
        hi: `इसके बिना हम ${subject} की उच्च स्तरीय संकल्पनाओं को हल नहीं कर सकते। प्रतियोगी परीक्षाओं (UPSC, NEET, JEE, MPPSC, Boards) में इस पर आधारित विश्लेषणात्मक प्रश्न पूछे जाते हैं।`,
        en: `Without mastering this principle, higher-order problem-solving in ${subject} is incomplete. It forms the backbone of both academic exams and real-world technology.`,
        hinglish: `Iske bina ${subject} ke advance concepts samajhna mushkil hai. Boards aur Competitive exams dono me direct analytical questions aate hain.`,
      },
      criticalReason: {
        hi: `यह सिद्धांत विद्यार्थियों में वैज्ञानिक दृष्टिकोण, तार्किक क्षमता और 360° विश्लेषणात्मक चिंतन का विकास करता है।`,
        en: `It sharpens critical inquiry, mathematical reasoning, and multidimensional problem solving.`,
        hinglish: `Ye student ko ratne ki aadat se bacha kar direct logical thinker banata hai.`,
      },
    },
    kaise: {
      title: {
        hi: `${topicName} कैसे काम करता है? (Step-by-Step Mechanism)`,
        en: `How does ${topicName} Work? (Operational Steps)`,
        hinglish: `${topicName} kaise operate karta hai step-by-step?`,
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            hi: 'चरण 1: आरंभिक इनपुट व पृष्ठभूमि',
            en: 'Step 1: Input & Initial State',
            hinglish: 'Step 1: Initial conditions aur basic setup',
          },
          description: {
            hi: 'प्रक्रिया के लिए आवश्यक कारक और ऊर्जा स्रोत का संयोजन होता है।',
            en: 'The core physical parameters and energy drivers initiate the process.',
            hinglish: 'Pehle jaruri inputs aur environment ready hota hai.',
          },
        },
        {
          stepNumber: 2,
          title: {
            hi: 'चरण 2: अंतर्निहित रूपांतरण व कार्यप्रणाली',
            en: 'Step 2: Core Transformation & Dynamic Reaction',
            hinglish: 'Step 2: Main process aur reaction dynamic',
          },
          description: {
            hi: 'सिद्धांत के नियमों के तहत ऊर्जा या सूचना का व्यवस्थित प्रवाह होता है।',
            en: 'Energy or information transforms according to conservation laws.',
            hinglish: 'System ke andar main transformation run hota hai.',
          },
        },
        {
          stepNumber: 3,
          title: {
            hi: 'चरण 3: अंतिम परिणाम व संतुलन',
            en: 'Step 3: Output & Equilibrium State',
            hinglish: 'Step 3: Final outcome aur sustainable balance',
          },
          description: {
            hi: 'प्रणाली अपने स्थिर व उपयोगी आउटपुट को प्राप्त करती है।',
            en: 'The system achieves stable equilibrium and measurable output.',
            hinglish: 'System final result aur balance achieve karta hai.',
          },
        },
      ],
    },
    kisLiye: {
      title: {
        hi: `${topicName} का वास्तविक जीवन में क्या उपयोग है? (Purpose)`,
        en: `Real-World Purpose & Industry Applications of ${topicName}`,
        hinglish: `${topicName} real life me kis kaam aata hai?`,
      },
      applications: {
        hi: [
          `आधुनिक उद्योगों एवं इंजीनियरिंग में सीधा अनुप्रयोग`,
          `दैनिक जीवन की तकनीकी समस्याओं का निवारण`,
          `पर्यावरण, स्वास्थ्य एवं ऊर्जा दक्षता में योगदान`,
        ],
        en: [
          `High-precision engineering and industrial manufacturing`,
          `Smart technology, automation, and daily utilities`,
          `Environmental sustainability, green energy, and diagnostics`,
        ],
        hinglish: [
          `Modern technology aur everyday appliances me use`,
          `Smart solutions aur cost reduction`,
          `Career aur competitive exam high-scoring questions`,
        ],
      },
      realLifeExample: {
        hi: `दैनिक उदाहरण: भारतीय कृषि में ड्रिप सिंचाई, सौर ऊर्जा पैनल और स्मार्टफोन प्रोसेसर सब इसी प्रकार के वैज्ञानिक व प्रबंधकीय सिद्धांतों पर आधारित हैं।`,
        en: `Real-Life Example: From smart solar grids to precision medical monitors and UPI algorithms, this logic drives modern systems.`,
        hinglish: `Real Life Example: Jaise solar panels aur smart inverters energy balance manage karte hain!`,
      },
    },
    currentProblem: {
      title: {
        hi: `वर्तमान समस्याएं एवं भ्रांतियां (Current Flaws & Misconceptions)`,
        en: `Current Challenges, Misconceptions & Bottlenecks`,
        hinglish: `${topicName} me abhi kya galatfehmi ya problems hain?`,
      },
      issues: {
        hi: [
          `छात्रों द्वारा केवल सूत्रों को रटना और भौतिक अर्थ न समझना`,
          `संसाधनों की बर्बादी और अकुशल पारंपरिक प्रणालियां`,
          `व्यावहारिक प्रयोगशाला प्रयोगों का अभाव`,
        ],
        en: [
          `Rote memorization of equations without intuitive understanding`,
          `Efficiency loss and outdated legacy models in practice`,
          `Lack of hands-on simulation tools in traditional classrooms`,
        ],
        hinglish: [
          `Formula rat lena par practical logic na samajhna`,
          `Traditional method me time aur energy ki barbadi`,
          `Real world problem se connect na kar pana`,
        ],
      },
      misconceptions: {
        hi: `आम भ्रांति: कई लोग मानते हैं कि यह केवल परीक्षा पास करने के लिए है, जबकि यह हमारे दैनिक जीवन की कार्यप्रणाली को नियंत्रित करता है।`,
        en: `Common Myth: Believing this is purely abstract theory, whereas it directly governs technological infrastructure.`,
        hinglish: `Sabse bada myth ye hai ki ye sirf exam ke liye hai, jabki ye har jagah practical use hota hai.`,
      },
    },
    bestSolution: {
      title: {
        hi: `360° समाधान व क्रांतिकारी नवाचार (Actionable Best Solutions)`,
        en: `360° Actionable Innovations & Future Solutions`,
        hinglish: `${topicName} ka 360° best smart solution kya hai?`,
      },
      innovations: {
        hi: [
          `AI और 3D विजुअल सिमुलेशन द्वारा 100% कॉन्सेप्ट क्लैरिटी`,
          `हरित व पर्यावरण अनुकूल वैकल्पिक तकनीकों का विकास`,
          `ग्रामीण एवं शहरी छात्रों के लिए समान सुलभ गुणवत्तापूर्ण अध्ययन`,
        ],
        en: [
          `AI-powered dynamic visualization and concept mapping`,
          `Eco-friendly next-gen materials and optimized workflows`,
          `Equalizing learning opportunities through democratized digital intelligence`,
        ],
        hinglish: [
          `JITOMNI 360° visual maps se crystal-clear learning`,
          `Smart practical hacks aur green technology`,
          `Har student ke liye self-paced mastery`,
        ],
      },
      actionableTakeaway: {
        hi: `छात्र टेकअवे: सूत्र रटने के बजाय 'क्या, क्यों और कैसे' के 360° चक्र को समझें। इससे आपका स्कोर और आत्मविश्वास दोनों 10 गुना बढ़ेंगे।`,
        en: `Student Actionable Takeaway: Always map any concept to its 'What, Why, How, Purpose & Flaws'. You will never forget it!`,
        hinglish: `Master Rule: Ratta band, 360° socho. Exam me top rank aur life me success pakki!`,
      },
    },
  };
}

export function buildFallbackQuiz(topicName: string): QuizQuestion[] {
  return [
    {
      id: `q1-${Date.now()}`,
      question: {
        hi: `${topicName} का मूल आधार और सबसे महत्वपूर्ण वैज्ञानिक/तार्किक उद्देश्य क्या है?`,
        en: `What is the core fundamental objective of ${topicName}?`,
        hinglish: `${topicName} ka main scientific aur logical purpose kya hai?`,
      },
      options: [
        { hi: 'सिस्टम की कार्यकुशलता और तार्किक संतुलन स्थापित करना', en: 'To establish system efficiency and conceptual equilibrium', hinglish: 'System ki efficiency aur logic clear karna' },
        { hi: 'केवल रटकर परीक्षा में अंक हासिल करना', en: 'Merely memorizing without physical meaning', hinglish: 'Sirf bina samjhe ratna' },
        { hi: 'संसाधनों की खपत को बढ़ाना', en: 'Increasing random resource wastage', hinglish: 'Energy waste karna' },
        { hi: 'उपरोक्त में से कोई नहीं', en: 'None of the above', hinglish: 'Koi nahi' },
      ],
      correctAnswerIndex: 0,
      explanation: {
        hi: `${topicName} का मुख्य लक्ष्य प्रक्रिया को वैज्ञानिक रूप से दक्ष, संतुलित और उपयोगी बनाना है।`,
        en: `The primary objective is establishing rigorous logical principles and operational efficiency.`,
        hinglish: `Iska main aim logic aur functional clarity establish karna hai.`,
      },
    },
    {
      id: `q2-${Date.now()}`,
      question: {
        hi: `360° फ्रेमवर्क के अनुसार, ${topicName} में कौन सी भ्रांति (Misconception) सबसे आम है?`,
        en: `According to the 360° framework, what is the most common misconception regarding ${topicName}?`,
        hinglish: `${topicName} ko lekar sabse badi galatfehmi kya hoti hai?`,
      },
      options: [
        { hi: 'यह केवल किताबी थ्योरी है और इसका दैनिक जीवन में उपयोग नहीं है', en: 'That it is purely abstract theory with no real-world application', hinglish: 'Ki ye sirf book me hai, real life me nahi' },
        { hi: 'यह पर्यावरण के लिए लाभदायक है', en: 'That it is sustainable', hinglish: 'Ki ye useful hai' },
        { hi: 'यह प्रतियोगी परीक्षाओं में पूछा जाता है', en: 'That it appears in competitive exams', hinglish: 'Exam me aana' },
        { hi: 'यह 6-पिलर विश्लेषण पर आधारित है', en: 'That it uses 6-pillar analysis', hinglish: '6-pillar framework' },
      ],
      correctAnswerIndex: 0,
      explanation: {
        hi: `वास्तव में यह दैनिक जीवन और आधुनिक तकनीक का अभिन्न अंग है, केवल कागजी थ्योरी नहीं।`,
        en: `In reality, it actively governs modern technology and natural phenomena.`,
        hinglish: `Real life me ye har jagah use hota hai, ye sirf kitabi nahi hai.`,
      },
    },
    {
      id: `q3-${Date.now()}`,
      question: {
        hi: `${topicName} के कार्यप्रणाली में 'चरण 2 (Core Mechanism)' क्या सुनिश्चित करता है?`,
        en: `In the operational mechanism of ${topicName}, what does Step 2 ensure?`,
        hinglish: `${topicName} ke core mechanism me step 2 ka kya role hai?`,
      },
      options: [
        { hi: 'ऊर्जा और सूचना का नियमबद्ध रूपांतरण', en: 'Systematic transformation of energy/information under governing laws', hinglish: 'Energy aur logic ka systematic transformation' },
        { hi: 'प्रक्रिया को पूरी तरह रोक देना', en: 'Abruptly shutting down the process', hinglish: 'Process ko rokna' },
        { hi: 'अनियंत्रित त्रुटियां उत्पन्न करना', en: 'Introducing uncontrolled random errors', hinglish: 'Random errors lana' },
        { hi: 'इनपुट को शून्य कर देना', en: 'Nullifying the initial inputs', hinglish: 'Zero kar dena' },
      ],
      correctAnswerIndex: 0,
      explanation: {
        hi: `चरण 2 में इनपुट का वास्तविक रूप से उपयोगी आउटपुट में रूपांतरण होता है।`,
        en: `Step 2 drives the active conversion and systemic execution.`,
        hinglish: `Step 2 main conversion run karta hai.`,
      },
    },
    {
      id: `q4-${Date.now()}`,
      question: {
        hi: `अगर आप ${topicName} पर आधारित सवाल को UPSC / NEET / Boards में हल कर रहे हैं, तो सबसे सही रणनीति क्या है?`,
        en: `What is the best 360° strategy to solve high-order questions on ${topicName}?`,
        hinglish: `UPSC/NEET/Board exam me ${topicName} solve karne ki best strategy kya hai?`,
      },
      options: [
        { hi: 'क्या, क्यों, कैसे और वास्तविक अनुप्रयोग के 360° चक्र से उत्तर तैयार करना', en: 'Connecting What, Why, How, Purpose & Real Application in a structured 360° manner', hinglish: 'Kya, Kyu, Kaise aur Real purpose ko jodkar solve karna' },
        { hi: 'अंधाधुंध तुक्का लगाना', en: 'Blind guessing without reading options', hinglish: 'Random guess lagana' },
        { hi: 'प्रश्न को छोड़कर आगे बढ़ जाना', en: 'Skipping the question entirely', hinglish: 'Skip kar dena' },
        { hi: 'केवल एक शब्द में उत्तर देना', en: 'One word answer without reasoning', hinglish: 'Bina reason ke likhna' },
      ],
      correctAnswerIndex: 0,
      explanation: {
        hi: `360° अप्रोच से आपको 100% सटीकता और अधिकतम अंक मिलते हैं।`,
        en: `360° multi-dimensional approach ensures high accuracy and top rank performance.`,
        hinglish: `360° clarity se accuracy 100% rehti hai.`,
      },
    },
    {
      id: `q5-${Date.now()}`,
      question: {
        hi: `${topicName} के लिए प्रस्तावित आधुनिक नवाचार (Best Solution) क्या है?`,
        en: `What is the proposed modern innovation for ${topicName}?`,
        hinglish: `${topicName} ke liye proposed modern solution kya hai?`,
      },
      options: [
        { hi: 'AI संचालित विजुअल सिमुलेशन और पर्यावरण अनुकूल अनुकूलन', en: 'AI-driven dynamic visualization and eco-friendly optimization', hinglish: 'AI visual simulation aur green technology optimization' },
        { hi: 'पुस्तकों को पढ़ना बंद कर देना', en: 'Completely stopping reading books', hinglish: 'Padhai band karna' },
        { hi: 'पुराने अप्रभावी तरीकों को बढ़ावा देना', en: 'Promoting obsolete inefficient methods', hinglish: 'Outdated tareeke use karna' },
        { hi: 'प्रदूषण को अनदेखा करना', en: 'Ignoring environmental impacts', hinglish: 'Pollution ignore karna' },
      ],
      correctAnswerIndex: 0,
      explanation: {
        hi: `डिजिटल और ग्रीन तकनीकों का एकीकरण ही भविष्य का सबसे बेहतर समाधान है।`,
        en: `Digital simulations and sustainable optimization represent the pinnacle solution.`,
        hinglish: `Smart AI + Green innovation sabse best solution hai.`,
      },
    },
  ];
}
