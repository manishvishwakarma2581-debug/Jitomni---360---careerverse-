import { VocabWordItem, GrammarLesson, EnglishRole } from '../types';

export const dailyVocabList: VocabWordItem[] = [
  {
    id: 'v1',
    word: 'Resilience',
    pronunciation: 'रज़िल्यंस (ri-ZIL-yuhns)',
    partOfSpeech: 'Noun (संज्ञा)',
    meaning: {
      hi: 'कठिनाइयों से उबरने की क्षमता / लचीलापन व दृढ़ता',
      en: 'The capacity to recover quickly from difficulties; toughness',
      hinglish: 'Mushkil waqt se jaldi recover karne ki power aur himmat',
    },
    memoryTrick: {
      hi: 'Re-silence -> जो शांत रहकर हर आंधी का मुकाबला करे और दोबारा खड़ा हो जाए।',
      en: 'Think of a spring: push it down, and it bounces back!',
      hinglish: 'Spring ki tarah dabne ke baad wapas upar aana!',
    },
    exampleSentence: {
      en: 'Rural Indian students show incredible resilience while preparing for competitive exams.',
      hi: 'प्रतियोगी परीक्षाओं की तैयारी करते समय ग्रामीण भारतीय छात्र अविश्वसनीय लचीलापन और दृढ़ता दिखाते हैं।',
    },
    synonyms: ['Toughness', 'Endurance', 'Flexibility', 'Grit'],
    antonyms: ['Fragility', 'Weakness', 'Vulnerability'],
  },
  {
    id: 'v2',
    word: 'Pragmatic',
    pronunciation: 'प्रैग्मैटिक (prag-MAT-ik)',
    partOfSpeech: 'Adjective (विशेषण)',
    meaning: {
      hi: 'व्यावहारिक / जो हवाई बातों के बजाय यथार्थवादी हो',
      en: 'Dealing with things sensibly and realistically based on practical considerations',
      hinglish: 'Practical sochne wala, hawa-hawai baatein nahi karne wala',
    },
    memoryTrick: {
      hi: 'Pragmatic sounds like Practical (व्यावहारिक)',
      en: 'Focus on "Prac" as in Practice.',
      hinglish: 'Pragmatic matlab Practical approach rakhna!',
    },
    exampleSentence: {
      en: 'We need a pragmatic solution to solve farm water scarcity.',
      hi: 'खेतों में पानी की कमी को दूर करने के लिए हमें एक व्यावहारिक समाधान की आवश्यकता है।',
    },
    synonyms: ['Practical', 'Realistic', 'Sensible', 'Logical'],
    antonyms: ['Idealistic', 'Impractical', 'Unrealistic'],
  },
  {
    id: 'v3',
    word: 'Eloquent',
    pronunciation: 'एलोकवेंट (EL-uh-kwuhnt)',
    partOfSpeech: 'Adjective (विशेषण)',
    meaning: {
      hi: 'सुवक्ता / प्रभावशाली और स्पष्ट बोलने वाला',
      en: 'Fluent or persuasive in speaking or writing',
      hinglish: 'Prabhavshali dhang se bolne wala jise sunkar sab impress ho jayein',
    },
    exampleSentence: {
      en: 'Dr. APJ Abdul Kalam gave an eloquent speech on youth leadership.',
      hi: 'डॉ. एपीजे अब्दुल कलाम ने युवा नेतृत्व पर एक प्रभावशाली भाषण दिया।',
    },
    memoryTrick: {
      hi: 'E-fluent -> जो धाराप्रवाह और दिल को छूने वाला बोले।',
      en: 'Think of "Eloquent" as Elegant Speaking.',
      hinglish: 'Elegant + Fluent = Eloquent speaker!',
    },
    synonyms: ['Articulate', 'Fluent', 'Persuasive', 'Expressive'],
    antonyms: ['Inarticulate', 'Hesitant', 'Mute'],
  },
  {
    id: 'v4',
    word: 'Meticulous',
    pronunciation: 'मेटिक्युलस (muh-TIK-yuh-luhs)',
    partOfSpeech: 'Adjective (विशेषण)',
    meaning: {
      hi: 'बारीकी से काम करने वाला / अति-सावधान',
      en: 'Showing great attention to detail; very careful and precise',
      hinglish: 'Har chhoti se chhoti cheez ka dhyan rakhne wala',
    },
    memoryTrick: {
      hi: 'Meticulous -> "Mitti ke particle" jitna chhota point bhi dhyan me rakhna.',
      en: 'Meticulous people never miss a trick.',
      hinglish: 'Ek-ek detail ko perfect karne wala!',
    },
    exampleSentence: {
      en: 'She did meticulous revision before entering the NEET examination hall.',
      hi: 'NEET परीक्षा हॉल में प्रवेश करने से पहले उसने अत्यंत सावधानीपूर्वक दोहराव किया।',
    },
    synonyms: ['Thorough', 'Diligent', 'Precise', 'Painstaking'],
    antonyms: ['Careless', 'Sloppy', 'Negligent'],
  },
  {
    id: 'v5',
    word: 'Catalyst',
    pronunciation: 'कैटालिस्ट (KAT-l-ist)',
    partOfSpeech: 'Noun (संज्ञा)',
    meaning: {
      hi: 'उत्प्रेरक / जो बदलाव की गति को तेज कर दे',
      en: 'A person or thing that precipitates an event or change',
      hinglish: 'Jo kisi bhi badlav ya progress ko tezi se aage badha de',
    },
    memoryTrick: {
      hi: 'Chemistry wala Catalyst -> Reaction ko fast karne wala.',
      en: 'Think of an accelerator in a car.',
      hinglish: 'Change ka accelerator!',
    },
    exampleSentence: {
      en: 'Quality digital education will act as a catalyst for rural development.',
      hi: 'गुणवत्तापूर्ण डिजिटल शिक्षा ग्रामीण विकास के लिए उत्प्रेरक का कार्य करेगी।',
    },
    synonyms: ['Stimulant', 'Spark', 'Impetus', 'Driver'],
    antonyms: ['Blocker', 'Hindrance', 'Deterrent'],
  },
  {
    id: 'v6',
    word: 'Ubiquitous',
    pronunciation: 'यूबिक्विटस (yoo-BIK-wi-tuhs)',
    partOfSpeech: 'Adjective (विशेषण)',
    meaning: {
      hi: 'सर्वव्यापी / जो हर जगह उपस्थित हो',
      en: 'Present, appearing, or found everywhere',
      hinglish: 'Jo har jagah aasani se mil jaye ya maujood ho',
    },
    memoryTrick: {
      hi: 'Ubiquitous -> "You be everywhere!" (हर जगह मौजूद)',
      en: 'Smartphones are now ubiquitous.',
      hinglish: 'Jise aap har gali, har hath me dekhein!',
    },
    exampleSentence: {
      en: 'Smartphones and UPI payments have become ubiquitous across Indian villages.',
      hi: 'स्मार्टफोन और यूपीआई भुगतान भारतीय गांवों में सर्वव्यापी हो गए हैं।',
    },
    synonyms: ['Omnipresent', 'Everywhere', 'Pervasive', 'Universal'],
    antonyms: ['Rare', 'Scarce', 'Absent'],
  },
  {
    id: 'v7',
    word: 'Empathy',
    pronunciation: 'एम्पैथी (EM-puh-thee)',
    partOfSpeech: 'Noun (संज्ञा)',
    meaning: {
      hi: 'सहानुभूति व परानुभूति / दूसरे के दुख-दर्द को खुद महसूस करना',
      en: 'The ability to understand and share the feelings of another',
      hinglish: 'Dusro ki jagah khud ko rakhkar unke dard ko samajhna',
    },
    memoryTrick: {
      hi: 'Empathy = Entering another person’s path.',
      en: 'Put yourself in someone else’s shoes.',
      hinglish: 'Dusre ke shoes me pair rakhkar chalna!',
    },
    exampleSentence: {
      en: 'A true civil servant must have deep empathy for underprivileged citizens.',
      hi: 'एक सच्चे लोक सेवक में वंचित नागरिकों के प्रति गहरी परानुभूति होनी चाहिए।',
    },
    synonyms: ['Compassion', 'Understanding', 'Sensitivity', 'Warmth'],
    antonyms: ['Apathy', 'Indifference', 'Callousness'],
  },
  {
    id: 'v8',
    word: 'Perseverance',
    pronunciation: 'पर्सिवियरेंस (pur-suh-VEER-uhns)',
    partOfSpeech: 'Noun (संज्ञा)',
    meaning: {
      hi: 'लगन, निरंतर प्रयास व अडिग निष्ठा',
      en: 'Persistence in doing something despite difficulty or delay in achieving success',
      hinglish: 'Bina ruke, bina thake continuous mehnat karte rehna',
    },
    memoryTrick: {
      hi: 'Per-Severe -> Severe (कठिन) परिस्थितियों में भी टिके रहना।',
      en: 'Never giving up until the finish line.',
      hinglish: 'Jab tak todenge nahi, tab tak chhodenge nahi!',
    },
    exampleSentence: {
      en: 'His perseverance led him to crack the UPSC exam on his fourth attempt.',
      hi: 'उनकी निरंतर लगन ने उन्हें चौथे प्रयास में यूपीएससी परीक्षा पास कराई।',
    },
    synonyms: ['Dedication', 'Determination', 'Persistence', 'Tenacity'],
    antonyms: ['Quitting', 'Hesitation', 'Idleness'],
  },
  {
    id: 'v9',
    word: 'Collaborate',
    pronunciation: 'कोलैबोरेट (kuh-LAB-uh-rayt)',
    partOfSpeech: 'Verb (क्रिया)',
    meaning: {
      hi: 'मिलकर काम करना / सहयोग करना',
      en: 'Work jointly on an activity or project',
      hinglish: 'Ek team bankar saath me kaam karna',
    },
    memoryTrick: {
      hi: 'Co + Labor -> साथ मिलकर श्रम करना।',
      en: 'Co (Together) + Labor (Work).',
      hinglish: 'Miljulkar mehnat karna!',
    },
    exampleSentence: {
      en: 'Scientists across the country collaborate on Chandrayaan lunar missions.',
      hi: 'देश भर के वैज्ञानिक चंद्रयान चंद्र मिशनों पर मिलकर काम करते हैं।',
    },
    synonyms: ['Team up', 'Cooperate', 'Join forces', 'Partner'],
    antonyms: ['Compete', 'Oppose', 'Divide'],
  },
  {
    id: 'v10',
    word: 'Authentic',
    pronunciation: 'ऑथेंटिक (aw-THEN-tik)',
    partOfSpeech: 'Adjective (विशेषण)',
    meaning: {
      hi: 'प्रामाणिक, असली व सच्चा',
      en: 'Of undisputed origin and not a copy; genuine',
      hinglish: 'Asli, bina kisi milawat ke aur 100% genuine',
    },
    memoryTrick: {
      hi: 'Author-tic -> जो असली लेखक द्वारा प्रमाणित हो।',
      en: 'Real, reliable, and verified.',
      hinglish: 'Pukka aur vishwasniya!',
    },
    exampleSentence: {
      en: 'Always study from authentic NCERT textbooks for concept clarity.',
      hi: 'अवधारणा की स्पष्टता के लिए हमेशा प्रामाणिक एनसीईआरटी पाठ्यपुस्तकों से अध्ययन करें।',
    },
    synonyms: ['Genuine', 'Legitimate', 'Real', 'Original'],
    antonyms: ['Fake', 'Counterfeit', 'Spurious'],
  },
];

export const grammarLessonsList: GrammarLesson[] = [
  {
    id: 'g1',
    title: {
      hi: 'काल (Tenses) का 360° मास्टर फॉर्मूला',
      en: 'Mastery of English Tenses (Present, Past, Future)',
      hinglish: 'Tenses Master Formula & Daily Usage',
    },
    category: 'Tenses',
    formula: 'Subject + Helping Verb (is/am/are/have/had/will) + Main Verb (V1/V2/V3/V-ing) + Object',
    ruleExplanation: {
      hi: 'Tense बताता है कि कोई कार्य किस समय हुआ। 3 मुख्य Tense होते हैं: Present (वर्तमान), Past (भूतकाल), Future (भविष्यकाल)। प्रत्येक के 4 रूप हैं: Simple, Continuous, Perfect, Perfect Continuous।',
      en: 'Tenses indicate the time of an action. There are 3 main tenses, each divided into Simple, Continuous, Perfect, and Perfect Continuous.',
      hinglish: 'Tense se pata chalta hai ki action kab hua. Simple present me daily habit (I study), continuous me abhi chal raha kaam (I am studying), perfect me ho chuka kaam (I have studied).',
    },
    examples: [
      {
        wrong: 'He go to school daily.',
        correct: 'He goes to school daily.',
        explanation: {
          hi: 'Simple Present में Third Person Singular (He, She, It, Name) के साथ क्रिया में s/es लगता है।',
          en: 'In Simple Present tense, add -s/-es with third-person singular subjects (He, She, It).',
          hinglish: 'He/She/It ke saath verb me s/es lagana zaroori hai.',
        },
      },
      {
        wrong: 'I am knowing the answer.',
        correct: 'I know the answer.',
        explanation: {
          hi: 'Know, understand, love जैसी stative verbs में आम तौर पर -ing नहीं लगता।',
          en: 'Stative verbs like know, believe, like generally do not take the continuous -ing form.',
          hinglish: 'Knowing bolna galat hai, "I know" bolna sahi hai.',
        },
      },
    ],
    practiceQuestions: [
      {
        question: {
          hi: 'She _______ (work) on her project since morning.',
          en: 'She _______ (work) on her project since morning.',
          hinglish: 'She _______ (work) on her project since morning.',
        },
        options: ['is working', 'has been working', 'had worked', 'was working'],
        correctIndex: 1,
        explanation: {
          hi: 'जब कोई कार्य भूतकाल से शुरू होकर अभी भी जारी हो और time expression (since morning) हो, तो Present Perfect Continuous (has been + V-ing) प्रयुक्त होता है।',
          en: 'Use Present Perfect Continuous (has been working) with "since/for" showing an action continuing till now.',
          hinglish: 'Since morning diya hai, isliye "has been working" aayega.',
        },
      },
      {
        question: {
          hi: 'By this time next year, I _______ my degree.',
          en: 'By this time next year, I _______ my degree.',
          hinglish: 'By this time next year, I _______ my degree.',
        },
        options: ['will complete', 'will have completed', 'completed', 'am completing'],
        correctIndex: 1,
        explanation: {
          hi: 'भविष्य में किसी निश्चित समय तक पूरा होने वाले कार्य के लिए Future Perfect (will have + V3) लगता है।',
          en: 'Future Perfect (will have completed) expresses an action completed before a future deadline.',
          hinglish: 'By next year matlab future tak complete ho chuka hoga.',
        },
      },
    ],
  },
  {
    id: 'g2',
    title: {
      hi: 'Active & Passive Voice (कर्तृवाच्य व कर्मवाच्य)',
      en: 'Active & Passive Voice Transformation',
      hinglish: 'Active and Passive Voice Made Super Simple',
    },
    category: 'Active & Passive Voice',
    formula: 'Active: Subject + Verb + Object  ==>  Passive: Object + Be-form (is/was/been) + V3 + by + Subject',
    ruleExplanation: {
      hi: 'Active Voice में कर्ता (Subject) कार्य करता है। Passive Voice में कर्म (Object) पर जोर दिया जाता है और क्रिया की हमेशा 3rd Form (Past Participle) प्रयोग होती है।',
      en: 'Active voice focuses on the doer, while passive voice focuses on the receiver of the action. Passive always uses a form of "to be" + Past Participle (V3).',
      hinglish: 'Active me doer aage hota hai (Ram wrote a book), Passive me object aage aata hai (A book was written by Ram). V3 form hamesha aati hai.',
    },
    examples: [
      {
        wrong: 'A song was sang by her.',
        correct: 'A song was sung by her.',
        explanation: {
          hi: 'Passive voice में क्रिया की हमेशा V3 (Third Form) लगती है: Sing - Sang - Sung.',
          en: 'Passive voice strictly uses V3 (Past Participle): "sung", not V2 "sang".',
          hinglish: 'Was ke baad V3 (sung) lagega.',
        },
      },
    ],
    practiceQuestions: [
      {
        question: {
          hi: 'Convert to Passive: "The teacher explained the concept."',
          en: 'Convert to Passive: "The teacher explained the concept."',
          hinglish: 'Change to Passive: "The teacher explained the concept."',
        },
        options: [
          'The concept is explained by the teacher.',
          'The concept was explained by the teacher.',
          'The concept had been explained by the teacher.',
          'The concept explains by the teacher.',
        ],
        correctIndex: 1,
        explanation: {
          hi: 'Past Simple (explained) का Passive "was/were + V3" (was explained) बनता है।',
          en: 'Past Simple becomes was/were + V3 in passive.',
          hinglish: 'Past tense tha isliye "was explained" sahi hai.',
        },
      },
    ],
  },
  {
    id: 'g3',
    title: {
      hi: 'Modals (Can, Could, May, Might, Should, Must)',
      en: 'Modals & Auxiliary Verbs for Confident English',
      hinglish: 'Modals (Can, Could, May, Should, Must) Rules',
    },
    category: 'Modals',
    formula: 'Subject + Modal (Can/May/Should/Must) + Base Verb (V1)',
    ruleExplanation: {
      hi: 'Modals का उपयोग क्षमता (Can), विनम्र अनुमति (May/Could), सलाह (Should) और अनिवार्य कर्तव्य (Must) को व्यक्त करने के लिए किया जाता है। इनके बाद हमेशा क्रिया की 1st form आती है।',
      en: 'Modals express ability (can), polite permission (may/could), advice (should), and obligation (must). They are always followed by the base form of the verb.',
      hinglish: 'Modals ke baad hamesha V1 lagti hai. Can = capability, May = formal permission/possibility, Should = suggestion, Must = zaroori duty.',
    },
    examples: [
      {
        wrong: 'You should to obey your parents.',
        correct: 'You should obey your parents.',
        explanation: {
          hi: 'Should, Can, Must के बाद "to" नहीं लगाया जाता (Ought to को छोड़कर)।',
          en: 'Do not use "to" after modal verbs like should, can, must.',
          hinglish: 'Should to galat hai, seedha "should obey" bole.',
        },
      },
    ],
    practiceQuestions: [
      {
        question: {
          hi: 'You _______ wear a helmet while riding a motorcycle. (Legal obligation)',
          en: 'You _______ wear a helmet while riding a motorcycle. (Legal obligation)',
          hinglish: 'You _______ wear a helmet while riding a motorcycle. (Strict rule)',
        },
        options: ['might', 'could', 'must', 'may'],
        correctIndex: 2,
        explanation: {
          hi: 'कानूनी नियम और अनिवार्य कर्तव्य के लिए "Must" का प्रयोग होता है।',
          en: '"Must" indicates strong necessity or legal obligation.',
          hinglish: 'Compulsion ke liye "Must" sabse accurate hai.',
        },
      },
    ],
  },
  {
    id: 'g4',
    title: {
      hi: 'Prepositions (In, On, At, By, Into, Between, Among)',
      en: 'Prepositions Mastery with Visual Logic',
      hinglish: 'Prepositions (In, On, At, Into, Between) Rules',
    },
    category: 'Prepositions',
    formula: 'Position / Time / Motion Preposition + Noun / Pronoun',
    ruleExplanation: {
      hi: 'In = बड़े स्थान या समय (In India, In 2026), On = सतह या दिन (On the table, On Monday), At = सटीक बिंदु या समय (At 5 PM, At the gate), Into = गति के साथ अंदर जाना (Jumped into the river)।',
      en: 'In for enclosed spaces/larger areas, On for surfaces/days, At for precise points/time, Into for movement inward.',
      hinglish: 'At = exact time/point, In = andar/bada sheher, Into = speed se andar jaana, Between = 2 log, Among = 2 se zyada log.',
    },
    examples: [
      {
        wrong: 'He jumped in the pool.',
        correct: 'He jumped into the pool.',
        explanation: {
          hi: 'जब गति (Movement) के साथ किसी चीज़ के अंदर जाया जाता है तो "Into" लगता है।',
          en: 'Use "into" when there is motion towards the inside of something.',
          hinglish: 'Movement ho raha hai isliye "into" lagega.',
        },
      },
    ],
    practiceQuestions: [
      {
        question: {
          hi: 'Distribute these sweets _______ the five students.',
          en: 'Distribute these sweets _______ the five students.',
          hinglish: 'Distribute these sweets _______ the five students.',
        },
        options: ['between', 'among', 'into', 'with'],
        correctIndex: 1,
        explanation: {
          hi: 'दो से अधिक व्यक्तियों या वस्तुओं के बीच बंटवारे के लिए "Among" का प्रयोग होता है (दो के लिए Between)।',
          en: 'Use "among" for more than two entities and "between" for two.',
          hinglish: '5 students hain (2 se zyada), isliye "among" aayega.',
        },
      },
    ],
  },
];

export interface RoleConfig {
  id: EnglishRole;
  title: { hi: string; en: string; hinglish: string };
  description: { hi: string; en: string; hinglish: string };
  scenarios: {
    id: string;
    title: { hi: string; en: string; hinglish: string };
    starterPrompt: { hi: string; en: string; hinglish: string };
    targetEnglish: string;
  }[];
}

export const englishRoles: RoleConfig[] = [
  {
    id: 'kids',
    title: { hi: 'बच्चे (Kids & School)', en: 'Kids & School', hinglish: 'Kids & School' },
    description: {
      hi: 'स्कूल, खेल और दोस्तों के साथ सरल और मजेदार अंग्रेजी',
      en: 'Fun, engaging English for school, games, and friends',
      hinglish: 'School aur friends ke saath easy English',
    },
    scenarios: [
      {
        id: 'k1',
        title: { hi: 'कक्षा में अनुमति मांगना', en: 'Asking Permission in Class', hinglish: 'Class me permission lena' },
        starterPrompt: { hi: 'सर, क्या मैं पानी पीने जा सकता हूँ?', en: 'Sir, may I drink water?', hinglish: 'Sir kya mai paani peene jaa sakta hu?' },
        targetEnglish: 'Excuse me Sir, may I please go to drink water?',
      },
      {
        id: 'k2',
        title: { hi: 'दोस्तों के साथ खेल', en: 'Playing with Friends', hinglish: 'Friends ke saath khelna' },
        starterPrompt: { hi: 'चलो साथ में क्रिकेट खेलते हैं!', en: 'Let us play cricket together!', hinglish: 'Chalo saath me cricket khelte hain!' },
        targetEnglish: 'Hey friends, let us play cricket together in the playground!',
      },
    ],
  },
  {
    id: 'students',
    title: { hi: 'कॉलेज व प्रतियोगी छात्र', en: 'College & Exam Aspirants', hinglish: 'College & Aspirants' },
    description: {
      hi: 'प्रतियोगी परीक्षाओं, सेमिनार और डिबेट के लिए उच्च स्तरीय अंग्रेजी',
      en: 'Polished English for exams, seminars, and group discussions',
      hinglish: 'Exams, seminars aur GDs ke liye confident English',
    },
    scenarios: [
      {
        id: 's1',
        title: { hi: 'ग्रुप डिस्कशन में राय रखना', en: 'Sharing Views in Group Discussion', hinglish: 'GD me apna point rakhna' },
        starterPrompt: { hi: 'मेरे हिसाब से डिजिटल इंडिया ने गांवों में बहुत बदलाव लाया है।', en: 'In my view Digital India has transformed villages.', hinglish: 'Mere hisaab se digital India ne villages me bohot badlav laya hai.' },
        targetEnglish: 'In my perspective, Digital India has catalyzed unprecedented socio-economic empowerment across rural India.',
      },
      {
        id: 's2',
        title: { hi: 'प्रोफेसर से डाउट पूछना', en: 'Asking Academic Doubts', hinglish: 'Professors se doubt poochna' },
        starterPrompt: { hi: 'मैम, मुझे इस फॉर्मूले का प्रूफ समझ नहीं आया।', en: 'Mam, I could not understand this formula proof.', hinglish: 'Mam mujhe is formula ka proof samajh nahi aaya.' },
        targetEnglish: 'Respected Ma’am, could you kindly elaborate on the mathematical derivation of this theorem once again?',
      },
    ],
  },
  {
    id: 'interview',
    title: { hi: 'जॉब इंटरव्यू की तैयारी', en: 'Job & Career Interview', hinglish: 'Job Interview Prep' },
    description: {
      hi: 'कॉन्फिडेंट बॉडी लैंग्वेज, अपना परिचय और सैलरी नेगोशिएशन',
      en: 'Confident introduction, behavioral questions, and professional tone',
      hinglish: 'Self introduction, HR round aur confident answers',
    },
    scenarios: [
      {
        id: 'i1',
        title: { hi: 'अपना परिचय (Tell me about yourself)', en: 'Tell Me About Yourself', hinglish: 'Tell me about yourself introduction' },
        starterPrompt: { hi: 'मेरा नाम राहुल है, मैं भोपाल से हूँ और मैंने बी.टेक किया है।', en: 'My name is Rahul, I am from Bhopal and did B.Tech.', hinglish: 'Mera naam Rahul hai, mai Bhopal se hu aur maine BTech kiya hai.' },
        targetEnglish: 'Good morning Sir/Ma’am. My name is Rahul. I hold a degree in Computer Science from Bhopal and specialize in full-stack cloud applications.',
      },
      {
        id: 'i2',
        title: { hi: 'अपनी सबसे बड़ी ताकत बताना', en: 'Highlighting Key Strengths', hinglish: 'Apni strengths batana' },
        starterPrompt: { hi: 'मैं बहुत मेहनती हूँ और नई चीजें जल्दी सीखता हूँ।', en: 'I am hardworking and quick learner.', hinglish: 'Mai bohot mehnati hu aur nayi cheeze jaldi seekhta hu.' },
        targetEnglish: 'My greatest strengths are rapid adaptability, high resilience under deadlines, and a relentless focus on collaborative problem solving.',
      },
    ],
  },
  {
    id: 'business',
    title: { hi: 'व्यापार व उद्यमिता', en: 'Business & Negotiation', hinglish: 'Business & Trade' },
    description: {
      hi: 'ग्राहकों से बातचीत, ईमेल ड्राफ्टिंग और प्राइस नेगोशिएशन',
      en: 'Customer relations, formal business emails, and deal negotiations',
      hinglish: 'Client meetings, emails aur business deals',
    },
    scenarios: [
      {
        id: 'b1',
        title: { hi: 'ग्राहक से छूट पर बातचीत', en: 'Negotiating Price with Client', hinglish: 'Client se discount par deal karna' },
        starterPrompt: { hi: 'हम आपको 10% डिस्काउंट दे सकते हैं अगर आप बड़ा ऑर्डर दें।', en: 'We can give 10% discount on bulk order.', hinglish: 'Hum aapko 10% discount de sakte hain agar aap bulk order dein.' },
        targetEnglish: 'We are pleased to offer a tiered 10% volume discount subject to bulk order confirmation.',
      },
    ],
  },
  {
    id: 'farmer_global',
    title: { hi: 'किसान व ग्रामीण भाई', en: 'Farmers & Agri-Global', hinglish: 'Farmers & Agri-Global' },
    description: {
      hi: 'अंतर्राष्ट्रीय मंडी, खाद, बीज, मौसम और सरकारी योजनाओं की वैश्विक समझ',
      en: 'Global crop pricing, export quality standards, and modern machinery',
      hinglish: 'Kheti, Mandi rates, export aur modern tools',
    },
    scenarios: [
      {
        id: 'f1',
        title: { hi: 'जैविक फसल निर्यात की बात', en: 'Organic Crop Export Enquiry', hinglish: 'Organic export ki baat karna' },
        starterPrompt: { hi: 'हमारा गेहूं बिना किसी केमिकल के 100% शुद्ध जैविक है।', en: 'Our wheat is 100% organic without chemicals.', hinglish: 'Hamara gehu bina chemical ke 100% certified organic hai.' },
        targetEnglish: 'Our harvested wheat crop is 100% certified organic, free from synthetic pesticides and ready for premium export.',
      },
    ],
  },
];
