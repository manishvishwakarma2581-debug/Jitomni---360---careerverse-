import { Adaptive360Data, TopicType, TopicItem, Language } from '../types';

/**
 * AGENT 1: Topic Classifier
 * Analyzes topic attributes and keywords to classify into one of the 6 core types:
 * - TYPE_A: Formula / Numerical (Maths, Physics calculation)
 * - TYPE_B: Theory + Diagram (Science, Biology, Chemistry)
 * - TYPE_C: Story + Concept (Class 1-5, EVS, Hindi, Kids)
 * - TYPE_D: Fact + Timeline (History, GK, Polity, Geography)
 * - TYPE_E: Logic + Puzzle (Reasoning, Mental Ability)
 * - TYPE_F: Exam PYQ Heavy (Competitive Exam High-Yield)
 */
export function classifyTopic(
  topicName: string,
  subject: string = '',
  chapter: string = '',
  classLevel?: number,
  examType?: string
): TopicType {
  const combined = `${topicName} ${subject} ${chapter} ${examType || ''}`.toLowerCase();

  // 1. Check for Early Primary / Kids (Class 1-5 or explicit kids/story topics)
  if (
    (classLevel && classLevel <= 5) ||
    combined.includes('class 1') ||
    combined.includes('class 2') ||
    combined.includes('class 3') ||
    combined.includes('class 4') ||
    combined.includes('class 5') ||
    combined.includes('kahani') ||
    combined.includes('story') ||
    combined.includes('chidiya') ||
    combined.includes('my family') ||
    combined.includes('मेरा परिवार') ||
    combined.includes('apple') ||
    combined.includes('rhymes') ||
    combined.includes('bal ') ||
    combined.includes('varnamala') ||
    combined.includes('वर्णमाला')
  ) {
    // If it's pure elementary arithmetic in class 3-5, could be type A, but type C provides the best story-driven learning
    if (combined.includes('family') || combined.includes('परिवार') || combined.includes('story') || combined.includes('evs') || classLevel === 1 || classLevel === 2) {
      return 'TYPE_C';
    }
    return 'TYPE_C';
  }

  // 2. Check for Reasoning / Logic
  if (
    combined.includes('reasoning') ||
    combined.includes('दिशा') ||
    combined.includes('direction') ||
    combined.includes('blood relation') ||
    combined.includes('रक्त संबंध') ||
    combined.includes('खून') ||
    combined.includes('syllogism') ||
    combined.includes('seating arrangement') ||
    combined.includes('coding decoding') ||
    combined.includes('puzzle') ||
    combined.includes('tarkshakti') ||
    combined.includes('तर्कशक्ति') ||
    combined.includes('analogy test') ||
    combined.includes('dice') ||
    combined.includes('पासा') ||
    combined.includes('mirror image')
  ) {
    return 'TYPE_E';
  }

  // 3. Check for History / GK / Polity / Constitution (Timeline & Fact heavy)
  if (
    combined.includes('history') ||
    combined.includes('इतिहास') ||
    combined.includes('panipat') ||
    combined.includes('पानीपत') ||
    combined.includes('yudh') ||
    combined.includes('war') ||
    combined.includes('revolt') ||
    combined.includes('1857') ||
    combined.includes('polity') ||
    combined.includes('constitution') ||
    combined.includes('संविधान') ||
    combined.includes('fundamental rights') ||
    combined.includes('मौलिक अधिकार') ||
    combined.includes('article') ||
    combined.includes('अनुच्छेद') ||
    combined.includes('gk') ||
    combined.includes('general knowledge') ||
    combined.includes('geography') ||
    combined.includes('भूगोल') ||
    combined.includes('rivers') ||
    combined.includes('dynasty') ||
    combined.includes('mughal') ||
    combined.includes('maratha') ||
    combined.includes('british')
  ) {
    return 'TYPE_D';
  }

  // 4. Check for Maths / Formula / Numerical (Type A)
  if (
    combined.includes('math') ||
    combined.includes('गणित') ||
    combined.includes('जोड़') ||
    combined.includes('घटाव') ||
    combined.includes('पूर्णांक') ||
    combined.includes('integer') ||
    combined.includes('addition') ||
    combined.includes('subtraction') ||
    combined.includes('multiplication') ||
    combined.includes('fraction') ||
    combined.includes('भिन्न') ||
    combined.includes('percentage') ||
    combined.includes('प्रतिशत') ||
    combined.includes('profit') ||
    combined.includes('loss') ||
    combined.includes('लाभ') ||
    combined.includes('हानि') ||
    combined.includes('trigonometry') ||
    combined.includes('त्रिकोणमिति') ||
    combined.includes('algebra') ||
    combined.includes('speed') ||
    combined.includes('distance') ||
    combined.includes('time and work') ||
    combined.includes('numerical') ||
    combined.includes('physics numerical') ||
    combined.includes('mensuration') ||
    combined.includes('क्षेत्रमिति') ||
    combined.includes('vedic') ||
    combined.includes('calculation')
  ) {
    // If it's a specific competitive exam category
    if (examType && (examType === 'SSC' || examType === 'Banking' || examType === 'Railway')) {
      return 'TYPE_A'; // Or TYPE_F
    }
    return 'TYPE_A';
  }

  // 5. Check for Competitive Exam High-Yield (Type F)
  if (
    examType ||
    combined.includes('upsc') ||
    combined.includes('mppsc') ||
    combined.includes('ssc') ||
    combined.includes('banking') ||
    combined.includes('patwari') ||
    combined.includes('mp police') ||
    combined.includes('pyq') ||
    combined.includes('cut off')
  ) {
    return 'TYPE_F';
  }

  // 6. Default to Science / Biology / Theory + Diagram (Type B)
  return 'TYPE_B';
}

/**
 * Returns dynamic tab configurations according to the classified TopicType
 */
export function getAdaptiveTabsConfig(type: TopicType) {
  switch (type) {
    case 'TYPE_A':
      return [
        { key: 'formula', label: { hi: '📐 मास्टर सूत्र (Formula)', en: 'Master Formulas', hinglish: 'Master Formulas' }, icon: '📐', color: 'from-amber-500 to-amber-600' },
        { key: 'trick', label: { hi: '⚡ 10s शॉर्ट ट्रिक', en: '10s Speed Trick', hinglish: '10s Super Trick' }, icon: '⚡', color: 'from-blue-500 to-indigo-600' },
        { key: 'examples', label: { hi: '📝 स्टेप उदाहरण', en: 'Step Examples', hinglish: 'Step-by-Step Examples' }, icon: '📝', color: 'from-emerald-500 to-teal-600' },
        { key: 'pyq', label: { hi: '🎯 PYQ अभ्यास ड्रिल', en: 'PYQ Practice Drill', hinglish: 'PYQ Speed Drill' }, icon: '🎯', color: 'from-purple-500 to-pink-600' },
        { key: 'mermaid', label: { hi: '📊 फॉर्मूला चार्ट (Mermaid)', en: 'Flowchart Matrix', hinglish: 'Mermaid Diagram' }, icon: '📊', color: 'from-cyan-500 to-blue-600' },
      ];

    case 'TYPE_B':
      return [
        { key: 'concept', label: { hi: '🔬 मूल सिद्धांत (Core)', en: 'Core Principle', hinglish: 'Core Concept' }, icon: '🔬', color: 'from-blue-500 to-indigo-600' },
        { key: 'mermaid', label: { hi: '📊 360° डायग्राम (Mermaid)', en: 'Mermaid Infographic', hinglish: '360° Diagram' }, icon: '📊', color: 'from-cyan-500 to-teal-600' },
        { key: 'process', label: { hi: '⚙️ कार्यप्रणाली (Mechanism)', en: 'Process & Stages', hinglish: 'Step Mechanism' }, icon: '⚙️', color: 'from-emerald-500 to-green-600' },
        { key: 'realLife', label: { hi: '🌍 वास्तविक अनुप्रयोग', en: 'Real-World Applications', hinglish: 'Real Life Use' }, icon: '🌍', color: 'from-purple-500 to-pink-600' },
      ];

    case 'TYPE_C':
      return [
        { key: 'story', label: { hi: '📖 मज़ेदार कहानी (Story)', en: 'Fun Illustrated Story', hinglish: 'Fun Story' }, icon: '📖', color: 'from-amber-500 to-orange-600' },
        { key: 'visual', label: { hi: '🎨 सचित्र बाल ज्ञान (Visual)', en: 'Visual Cartoon Scene', hinglish: 'Cartoon Visuals' }, icon: '🎨', color: 'from-pink-500 to-rose-600' },
        { key: 'activity', label: { hi: '🎮 खेल-खेल में सीखें (Activity)', en: 'Fun Game & Riddle', hinglish: 'Khel-Khel Me Activity' }, icon: '🎮', color: 'from-emerald-500 to-teal-600' },
        { key: 'quiz', label: { hi: '🌟 बाल क्विज (Kid Quiz)', en: "Kid's Practice Quiz", hinglish: 'Bal Quiz' }, icon: '🌟', color: 'from-purple-500 to-indigo-600' },
      ];

    case 'TYPE_D':
      return [
        { key: 'timeline', label: { hi: '⏳ इतिहास Timeline (Gantt)', en: 'Interactive Timeline', hinglish: 'Timeline & Chronology' }, icon: '⏳', color: 'from-amber-500 to-amber-600' },
        { key: 'mnemonic', label: { hi: '🧠 याद करने की ट्रिक (Mnemonic)', en: 'Mnemonic Memory Trick', hinglish: 'Yaad Karne Ki Trick' }, icon: '🧠', color: 'from-purple-500 to-indigo-600' },
        { key: 'facts', label: { hi: '📜 मुख्य घटनाएं व तथ्य', en: 'Key Historic Facts', hinglish: 'Key Provisions & Facts' }, icon: '📜', color: 'from-blue-500 to-cyan-600' },
        { key: 'pyq', label: { hi: '🎯 परीक्षा PYQ फोकस', en: 'Exam PYQ Focus', hinglish: 'Exam PYQ Focus' }, icon: '🎯', color: 'from-rose-500 to-red-600' },
      ];

    case 'TYPE_E':
      return [
        { key: 'logic', label: { hi: '🧩 तर्क व नियम (Logic Rules)', en: 'Logic Rules & Formulas', hinglish: 'Core Logic Rules' }, icon: '🧩', color: 'from-indigo-500 to-purple-600' },
        { key: 'trick', label: { hi: '⚡ JITOMNI 10s स्पीड ट्रिक', en: '10s Speed Shortcut', hinglish: '10s Super Trick' }, icon: '⚡', color: 'from-amber-500 to-yellow-600' },
        { key: 'mermaid', label: { hi: '🗺️ विजुअल मैपिंग (Diagram)', en: 'Visual Reasoning Map', hinglish: 'Reasoning Diagram' }, icon: '🗺️', color: 'from-cyan-500 to-blue-600' },
        { key: 'drills', label: { hi: '🎯 5-Level स्पीड प्रैक्टिस', en: '5-Level Practice Drills', hinglish: '5-Level Drills' }, icon: '🎯', color: 'from-emerald-500 to-teal-600' },
      ];

    case 'TYPE_F':
    default:
      return [
        { key: 'trend', label: { hi: '📊 10-Year PYQ एनालिसिस', en: '10-Year PYQ Trends', hinglish: '10-Year Trend Analysis' }, icon: '📊', color: 'from-blue-500 to-indigo-600' },
        { key: 'trick', label: { hi: '⚡ सुपर शॉर्टकट ट्रिक', en: 'Super Short Trick', hinglish: 'Super Fast Trick' }, icon: '⚡', color: 'from-amber-500 to-amber-600' },
        { key: 'formula', label: { hi: '📐 मास्टर फॉर्मूला व कॉन्सेप्ट', en: 'Master Formulas', hinglish: 'Master Formulas' }, icon: '📐', color: 'from-cyan-500 to-teal-600' },
        { key: 'pyq', label: { hi: '🏆 सॉल्व्ड PYQ बैंक', en: 'Solved PYQ Bank', hinglish: 'Solved PYQ Bank' }, icon: '🏆', color: 'from-emerald-500 to-green-600' },
      ];
  }
}

/**
 * Returns type metadata badge and label
 */
export function getTopicTypeMeta(type: TopicType) {
  switch (type) {
    case 'TYPE_A':
      return {
        typeBadge: 'TYPE A: FORMULA & NUMERICAL',
        typeIcon: '📐',
        typeLabel: {
          hi: 'फॉर्मूला एवं न्यूमेरिकल (70% ट्रिक्स + 20% PYQ)',
          en: 'Formula & Numerical Master (70% Tricks + 20% PYQ)',
          hinglish: 'Formula & Numerical (70% Shortcuts + 20% PYQ)',
        },
      };
    case 'TYPE_B':
      return {
        typeBadge: 'TYPE B: THEORY + DIAGRAM',
        typeIcon: '🔬',
        typeLabel: {
          hi: 'सिद्धांत एवं सचित्र विज्ञान (30% Mermaid डायग्राम + 30% संकल्पना)',
          en: 'Theory & Visual Diagram (30% Mermaid Infographic + 30% Concept)',
          hinglish: 'Theory + Diagram (30% Mermaid Diagram + Process)',
        },
      };
    case 'TYPE_C':
      return {
        typeBadge: 'TYPE C: STORY + ACTIVITY (Kids)',
        typeIcon: '🎈',
        typeLabel: {
          hi: 'मज़ेदार बाल कहानी एवं सचित्र खेल (कक्षा 1-5 विशेष)',
          en: 'Fun Story & Activity Learning (Class 1-5 Special)',
          hinglish: 'Fun Kahani & Activity (No dry rote theory!)',
        },
      };
    case 'TYPE_D':
      return {
        typeBadge: 'TYPE D: FACT & TIMELINE (History/Polity)',
        typeIcon: '⏳',
        typeLabel: {
          hi: 'समय चक्र (Timeline) एवं याद करने की ट्रिक (Mnemonics)',
          en: 'Timeline Chronology & Mnemonic Memory Hacks',
          hinglish: 'Timeline & Mnemonics (History & Constitution Focus)',
        },
      };
    case 'TYPE_E':
      return {
        typeBadge: 'TYPE E: LOGIC & PUZZLE (Reasoning)',
        typeIcon: '🧩',
        typeLabel: {
          hi: 'तर्कशक्ति एवं स्पीड पैटर्न (10-Second Logic Maps)',
          en: 'Reasoning Logic & 10-Second Speed Tricks',
          hinglish: 'Logic & Puzzle Pattern (Speed Drills)',
        },
      };
    case 'TYPE_F':
    default:
      return {
        typeBadge: 'TYPE F: EXAM PYQ HEAVY (Competitive)',
        typeIcon: '🏆',
        typeLabel: {
          hi: 'प्रतियोगी परीक्षा उच्च अंक PYQ बैंक (10-Year Weightage)',
          en: 'High-Yield Competitive PYQ Engine (10-Year Weightage)',
          hinglish: 'Competitive Exam PYQ Heavy (Direct Rank Booster)',
        },
      };
  }
}

/**
 * Pre-baked Adaptive 360 Dataset for instant 0ms latency tests requested by user:
 * 1. "पूर्णांकों के जोड़ घटाव" (TYPE A: Maths)
 * 2. "Class 2 - My Family" (TYPE C: Story + Activity)
 * 3. General Synthesis for any other topic
 */
export function synthesizeAdaptive360(
  topicName: string,
  subject: string,
  chapter: string,
  classLevel?: number,
  examType?: string
): Adaptive360Data {
  const topicType = classifyTopic(topicName, subject, chapter, classLevel, examType);
  const tabsConfig = getAdaptiveTabsConfig(topicType);
  const meta = getTopicTypeMeta(topicType);

  // 1. SPECIFIC PRE-BAKED: Class 1 - A for Apple (TYPE C: Story + Activity)
  if (
    topicName.toLowerCase().includes('apple') ||
    topicName.includes('सेब') ||
    topicName.toLowerCase().includes('a for apple') ||
    topicName.includes('ए फॉर एप्पल')
  ) {
    return {
      topicType: 'TYPE_C',
      typeBadge: 'TYPE C: बाल कहानी एवं सचित्र ज्ञान (Class 1-5)',
      typeIcon: '🍎',
      typeLabel: {
        hi: 'बाल कहानी, सचित्र ज्ञान एवं खेल (कक्षा 1 विशेष)',
        en: 'Fun Story, Picture & Activity (Class 1 Special)',
        hinglish: 'Kids Story & Activity (Zero Rote Learning)',
      },
      tabsConfig: getAdaptiveTabsConfig('TYPE_C'),
      typeC_Kids: {
        story: {
          title: {
            hi: 'मीठे लाल सेब और नन्ही चिड़िया की कहानी 🍎🌳',
            en: 'The Sweet Red Apple & Little Sparrow 🍎🌳',
            hinglish: 'Lal Seb aur Chidiya ki Kahani 🍎',
          },
          characters: ['नन्ही चिंटू (प्यारा बच्चा)', 'मीठू तोता (पक्षी मित्र)', 'बड़ा सेब का पेड़ (Apple Tree)'],
          narrative: {
            hi: 'एक हरे-भरे बगीचे में सेब का एक बड़ा पेड़ था। उस पेड़ पर लाल-लाल, गोल-मटोल और मीठे सेब लटके हुए थे। एक दिन चिंटू बगीचे में आया और उसने देखा कि एक सेब जमीन पर गिरा हुआ है। तभी मीठू तोता उड़कर आया और बोला—"चिंटू! A for Apple होता है! सेब खाने से हम मजबूत, ताकतवर और होशियार बनते हैं!" चिंटू ने सेब को धोकर खाया और खुशी से नाचने लगा। रोज एक सेब खाओ और डॉक्टर को दूर भगाओ!',
            en: 'In a lush green garden stood a grand Apple tree with shiny, red, juicy apples. Little Chintu visited the garden and saw a ripe apple on the ground. A friendly parrot flew down and chirped: "A for Apple! Eating an apple everyday makes you strong, sharp and healthy!" Chintu washed the apple, took a crunchy bite, and danced with joy. An apple a day keeps the doctor away!',
            hinglish: 'Ek sundar garden me Apple ka tree tha. Lal lal meethe seb lage the. Chintu ne seb khaya aur bola - A for Apple, roz ek seb khao aur healthy bano!',
          },
          moralLesson: {
            hi: 'सीख: ताजे फल खाने से हमारा शरीर स्वस्थ, दिमाग तेज और आंखें चमकदार रहती हैं।',
            en: 'Moral: Fresh fruits provide vital vitamins, keeping our body strong and mind sharp.',
            hinglish: 'Roz taaze phal khane se body strong aur brain super active rehta hai!',
          },
        },
        visualCartoon: {
          visualEmojiScene: '🌳 🍎 🍏 🦜 👦 🧺 ☀️ 🌈 🐝',
          visualDesc: {
            hi: 'बगीचे में एक बड़ा हरा पेड़ जिस पर रसीले लाल सेब लगे हैं, चिंटू टोकरी लेकर सेब चुन रहा है और मीठू तोता गा रहा है!',
            en: 'A sunny garden scene with a big apple tree full of shiny red apples, Chintu with a basket and a happy parrot singing.',
            hinglish: 'Bageeche me apple ka tree, lal seb aur chintu ki basket!',
          },
          keyLabels: [
            { name: 'A for Apple (सेब)', funFact: 'सेब का रंग लाल या हरा होता है और यह बहुत मीठा व कुरकुरा होता है!', icon: '🍎' },
            { name: 'सेब का पेड़ (Apple Tree)', funFact: 'सेब ठंडे पहाड़ी इलाकों जैसे कश्मीर और हिमाचल प्रदेश में उगते हैं!', icon: '🌳' },
            { name: 'स्वस्थ शरीर (Healthy Body)', funFact: '"An Apple a day keeps the Doctor away!" - रोज एक सेब खाने से डॉक्टर के पास नहीं जाना पड़ता!', icon: '💪' },
          ],
          colorTheme: 'from-red-500 via-rose-500 to-amber-500',
        },
        funActivity: {
          activityName: {
            hi: 'रंग भरो खेल व सेब की बाल पहेली (Apple Game & Riddle)',
            en: 'Color the Apple Game & Fun Riddle',
            hinglish: 'Apple Activity & Riddle',
          },
          steps: {
            hi: [
              '1. अपनी ड्राइंग बुक में एक गोल घेरा बनाएं और ऊपर एक छोटी डंडी व पत्ता बनाएं 🍎',
              '2. उसमें गहरा लाल या हरा मोम का रंग (Crayon) भरें!',
              '3. ज़ोर से बोलें: "A-P-P-L-E = APPLE (सेब)!"',
            ],
            en: [
              '1. Draw a round circle with a little stem and leaf on top 🍎',
              '2. Fill it with bright red or crisp green crayon color!',
              '3. Spell aloud: "A-P-P-L-E = APPLE!"',
            ],
            hinglish: [
              '1. Drawing book me apple ka chitra banayein.',
              '2. Lal rang bharein.',
              '3. Zor se bolein: A for Apple!',
            ],
          },
          funRiddle: {
            question: {
              hi: 'पहेली: "लाल-लाल हूं, मीठा-मीठा हूं, पेड़ पर लटकता हूं, रोज़ मुझे जो खाता है डॉक्टर से दूर रहता है, बताओ मैं कौन हूं?"',
              en: 'Riddle: "I am round, red and sweet, hanging on a tree. An apple a day keeps the doctor away! Who am I?"',
              hinglish: 'Paheli: Lal rang ka gol phal jo roz khane se doctor door rehta hai, kaun hai?',
            },
            answer: {
              hi: 'उत्तर: सेब (Apple)! 🍎✨',
              en: 'Answer: Apple! 🍎✨',
              hinglish: 'Answer: Apple (सेब)!',
            },
            hint: {
              hi: 'संकेत: इसका नाम अंग्रेजी के पहले अक्षर "A" से शुरू होता है!',
              en: 'Hint: Starts with letter "A"!',
              hinglish: 'Hint: Letter "A" se start hota hai.',
            },
          },
        },
        kidsQuiz: [
          {
            question: {
              hi: 'A फॉर क्या होता है? (What does letter A stand for?) 🔤',
              en: 'What starts with the letter A? 🔤',
              hinglish: 'Letter A se kya hota hai?',
            },
            emojiOptions: [
              { label: 'Apple (सेब)', emoji: '🍎' },
              { label: 'Ball (गेंद)', emoji: '⚽' },
              { label: 'Cat (बिल्ली)', emoji: '🐱' },
              { label: 'Dog (कुत्ता)', emoji: '🐶' },
            ],
            correctIndex: 0,
            funCelebration: 'शाबाश! A for Apple बिल्कुल सही! ⭐⭐⭐',
          },
          {
            question: {
              hi: 'पके हुए मीठे सेब का रंग कैसा होता है? 🎨',
              en: 'What is the color of a ripe sweet apple?',
              hinglish: 'Pakke hue seb ka rang kaisa hota hai?',
            },
            emojiOptions: [
              { label: 'लाल (Red) या हरा', emoji: '🍎' },
              { label: 'नीला (Blue)', emoji: '🔵' },
              { label: 'काला (Black)', emoji: '⚫' },
              { label: 'बैंगनी (Purple)', emoji: '🟣' },
            ],
            correctIndex: 0,
            funCelebration: 'बहुत खूब! लाल सेब सबसे मीठा होता है! 🎈🌟',
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'mindmap',
        title: {
          hi: 'A for Apple - बाल सचित्र माइंडमैप',
          en: 'A for Apple - Kids Concept Blueprint',
          hinglish: 'Apple Mindmap',
        },
        diagramCode: `graph TD
    A["🍎 A for Apple (सेब)"] --> B["🔴 रंग: चमकीला लाल"]
    A --> C["🌳 पेड़ पर उगता है"]
    A --> D["💪 सेहत और ताकत"]
    A --> E["😋 मीठा और रसीला स्वाद"]
    style A fill:#ef4444,stroke:#b91c1c,stroke-width:3px,color:#fff
    style B fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff
    style C fill:#22c55e,stroke:#15803d,stroke-width:2px,color:#fff
    style D fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    style E fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: 'A for Apple phonics song animated nursery rhyme Hindi kids',
        title: {
          hi: 'A for Apple - बाल कविता व एनिमेटेड कार्टून वीडियो',
          en: 'A for Apple - Kids Phonics & Cartoon Song',
          hinglish: 'A for Apple Cartoon Rhymes',
        },
        recommendedChannels: ['ChuChu TV', 'Infobells Hindi', 'Pebbles Kids', 'Cocomelon Hindi'],
        scenesScript: [
          {
            timestamp: '00:00',
            visual: '🍎 Giant shiny 3D Apple rolling onto screen with happy music',
            narration: {
              hi: 'A for Apple! ए फॉर एप्पल! सेब होता है लाल-लाल, खाने में बड़ा कमाल!',
              en: 'A is for Apple, crunchy, sweet and bright red!',
              hinglish: 'A for Apple! Meetha aur rasila seb!',
            },
            keyConcept: 'Letter A Recognition',
          },
        ],
      },
    };
  }

  // 2. SPECIFIC PRE-BAKED: Class 5 Maths - जोड़ घटाव (TYPE A: Formula & Numerical)
  if (
    topicName.includes('पूर्णांक') ||
    topicName.toLowerCase().includes('integer') ||
    (topicName.includes('जोड़') && topicName.includes('घटाव')) ||
    topicName.toLowerCase().includes('addition and subtraction')
  ) {
    return {
      topicType: 'TYPE_A',
      typeBadge: meta.typeBadge,
      typeIcon: meta.typeIcon,
      typeLabel: meta.typeLabel,
      tabsConfig,
      typeA_Maths: {
        masterFormulas: [
          {
            name: {
              hi: 'समान चिन्ह नियम (Rule of Same Signs)',
              en: 'Same Signs Addition Rule',
              hinglish: 'Same Signs Rule',
            },
            formula: '(+a) + (+b) = +(a + b)  एवं  (-a) + (-b) = -(a + b)',
            explanation: {
              hi: 'जब दोनों संख्याओं के चिन्ह समान हों (दोनों + या दोनों -), तो संख्याओं को सीधे जोड़ें और वही सामान्य चिन्ह लगा दें।',
              en: 'When signs are identical, simply add their absolute values and attach the common sign.',
              hinglish: 'Jab dono number ka sign same ho, dono ko add karo aur wahi sign lagao.',
            },
            example: '(-5) + (-8) = -(5 + 8) = -13  |  (+7) + (+3) = +10',
          },
          {
            name: {
              hi: 'विपरीत चिन्ह नियम (Rule of Opposite Signs)',
              en: 'Opposite Signs Subtraction Rule',
              hinglish: 'Opposite Signs Rule',
            },
            formula: '(+a) + (-b) = बड़े अंक का चिन्ह और (बड़ा - छोटा)',
            explanation: {
              hi: 'जब एक संख्या (+) और दूसरी (-) हो, तो हमेशा बड़ी संख्या में से छोटी संख्या को घटाएं और चिन्ह बड़ी संख्या का लगाएं।',
              en: 'When signs differ, subtract the smaller value from the larger value and keep the sign of the larger magnitude.',
              hinglish: 'Ek plus ek minus hone par bade me se chota ghatao aur sign bade number ka lagao.',
            },
            example: '(-15) + (+20) = +(20 - 15) = +5  |  (+6) + (-14) = -(14 - 6) = -8',
          },
          {
            name: {
              hi: 'घटाव को जोड़ में बदलना (Subtraction into Addition)',
              en: 'Additive Inverse Rule',
              hinglish: 'Sign Multiplication Rule',
            },
            formula: 'a - (-b) = a + b  एवं  a - (+b) = a - b',
            explanation: {
              hi: 'दो लगातार माइनस मिलकर प्लस बन जाते हैं: (-)(-) = (+)',
              en: 'Subtracting a negative number is equivalent to adding a positive number: -(-x) = +x.',
              hinglish: 'Do minus lagataar aane par plus ban jaate hain: a - (-b) = a + b.',
            },
            example: '12 - (-7) = 12 + 7 = 19  |  -8 - (-5) = -8 + 5 = -3',
          },
        ],
        jitomniSpeedTrick: {
          title: {
            hi: 'JITOMNI "बैंक बैलेंस एवं कर्ज" 10-सेकंड मेंटल ट्रिक',
            en: 'JITOMNI "Bank Balance & Debt" 10-Second Mental Shortcut',
            hinglish: 'JITOMNI 10s Bank Balance Super Trick',
          },
          trickFormulaOrLogic: 'Positive (+) = आपकी जेब का पैसा (Pocket Cash) | Negative (-) = दुकानदार का उधार/कर्ज (Debt)',
          steps: [
            {
              hi: 'स्टेप 1: प्रश्न देखें जैसे "-18 + 25 - 7 + 10"',
              en: 'Step 1: Inspect the expression e.g. "-18 + 25 - 7 + 10"',
              hinglish: 'Step 1: Total plus (cash) aur total minus (debt) alag alag jodo.',
            },
            {
              hi: 'स्टेप 2: सारा पैसा (Cash) जोड़ें: +25 + 10 = +35 रुपये जेब में।',
              en: 'Step 2: Sum all positives: +25 + 10 = +35 Cash.',
              hinglish: 'Step 2: Total Cash = 25 + 10 = 35 Rs.',
            },
            {
              hi: 'स्टेप 3: सारा उधार (Debt) जोड़ें: -18 और -7 = -25 रुपये उधार।',
              en: 'Step 3: Sum all negatives: -18 + -7 = -25 Debt.',
              hinglish: 'Step 3: Total Udhaar = 18 + 7 = 25 Rs.',
            },
            {
              hi: 'स्टेप 4: हिसाब करें: 35 रुपये जेब में - 25 रुपये उधार चुकाया = +10 रुपये बचे! (उत्तर: +10)',
              en: 'Step 4: Balance: +35 cash - 25 debt = +10 remaining. Answer = +10 in 5 seconds!',
              hinglish: 'Step 4: 35 me se 25 udhar chukaya -> +10 bacha! 10 second me answer!',
            },
          ],
          timeSavings: 'पारंपरिक 60 सेकंड से घटकर मात्र 8 सेकंड!',
          proTip: {
            hi: 'एग्जाम प्रो-टिप: संख्या रेखा खींचने में समय बर्बाद न करें, सीधे Cash vs Debt जोड़ें!',
            en: 'Exam Pro-Tip: Avoid drawing long number lines; directly segregate Total Cash vs Total Debt.',
            hinglish: 'Kabhi number line mat banao exam me, seedhe Total Plus aur Total Minus calculate karo.',
          },
        },
        stepExamples: [
          {
            problem: {
              hi: 'उदाहरण 1: मान ज्ञात कीजिए: (-23) + (+45) - (-12) - (+18)',
              en: 'Example 1: Evaluate: (-23) + (+45) - (-12) - (+18)',
              hinglish: 'Example 1: (-23) + (+45) - (-12) - (+18) solve kijiye',
            },
            basicMethodSteps: [
              { hi: 'चिन्ह सरल करें: -23 + 45 + 12 - 18', en: 'Simplify signs: -23 + 45 + 12 - 18', hinglish: 'Signs simplify karein: -23 + 45 + 12 - 18' },
              { hi: 'धनात्मक संख्याएं: 45 + 12 = +57', en: 'Positives: 45 + 12 = +57', hinglish: 'Plus wale: 45 + 12 = 57' },
              { hi: 'ऋणात्मक संख्याएं: -23 - 18 = -41', en: 'Negatives: -23 - 18 = -41', hinglish: 'Minus wale: 23 + 18 = 41 udhar' },
              { hi: 'अंतर: 57 - 41 = +16', en: 'Net result: 57 - 41 = +16', hinglish: 'Net: 57 - 41 = +16' },
            ],
            trickMethodStep: {
              hi: '10s मेंटल ट्रिक: जेब में (45 + 12 = 57), कुल उधारी (23 + 18 = 41) -> 57 - 41 = +16 उत्तर!',
              en: '10s Mental: Pocket (45+12=57), Debt (23+18=41) -> Net = +16.',
              hinglish: 'Cash 57 - Udhar 41 = +16 directly!',
            },
            answer: '+16',
          },
          {
            problem: {
              hi: 'उदाहरण 2: एक पनडुब्बी समुद्र तल से 350 मीटर नीचे (-350m) है। यह 120 मीटर ऊपर उठती है और फिर 80 मीटर नीचे जाती है। अब इसकी स्थिति क्या है?',
              en: 'Example 2: A submarine is at -350m depth. It ascends 120m and descends 80m. What is its current position?',
              hinglish: 'Submarine -350m par hai, +120m upar aayi, -80m niche gayi. Current position?',
            },
            basicMethodSteps: [
              { hi: 'आरंभिक गहराई = -350m', en: 'Initial Depth = -350m', hinglish: 'Initial = -350m' },
              { hi: 'ऊपर आना (+) = +120m -> -350 + 120 = -230m', en: 'Ascend = +120m -> -350 + 120 = -230m', hinglish: 'Ascend = -350 + 120 = -230m' },
              { hi: 'नीचे जाना (-) = -80m -> -230 - 80 = -310m', en: 'Descend = -80m -> -230 - 80 = -310m', hinglish: 'Descend = -230 - 80 = -310m' },
            ],
            trickMethodStep: {
              hi: 'सीधा हिसाब: कुल नीचे (-350 - 80 = -430m) + ऊपर (+120m) = -310m (समुद्र तल से 310 मीटर नीचे)',
              en: 'Total down (-430) + up (+120) = -310m depth.',
              hinglish: 'Seedha: -350 - 80 + 120 = -310m.',
            },
            answer: '-310 मीटर (310m Below Sea Level)',
          },
        ],
        pyqPractice: [
          {
            question: {
              hi: 'यदि x = (-14) और y = (-9), तो (x - y) का मान क्या होगा? (MP Board / NCERT Class 6 PYQ)',
              en: 'If x = (-14) and y = (-9), what is the value of (x - y)?',
              hinglish: 'Agar x = -14 aur y = -9 hai, to (x - y) kya hoga?',
            },
            options: ['-5', '+5', '-23', '+23'],
            correctIndex: 0,
            trickExplanation: {
              hi: 'x - y = (-14) - (-9) = -14 + 9 = -(14 - 9) = -5.',
              en: 'x - y = (-14) - (-9) = -14 + 9 = -5.',
              hinglish: '-14 - (-9) = -14 + 9 = -5.',
            },
            examTag: 'NCERT / State Board PYQ',
          },
          {
            question: {
              hi: 'संख्या रेखा पर (-3) से 7 इकाई दाईं (Right) ओर चलने पर कौन सी संख्या प्राप्त होगी?',
              en: 'Moving 7 units to the right from (-3) on the number line lands on which integer?',
              hinglish: 'Number line par -3 se 7 steps right side jaane par kya milega?',
            },
            options: ['+4', '-10', '+10', '-4'],
            correctIndex: 0,
            trickExplanation: {
              hi: 'दाईं ओर चलना = जोड़ना (+). (-3) + (+7) = +4.',
              en: 'Moving right means adding: -3 + 7 = +4.',
              hinglish: 'Right jana = Plus: -3 + 7 = +4.',
            },
            examTag: 'Maths Olympiad & School Level',
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'flowchart',
        title: {
          hi: 'पूर्णांक जोड़-घटाव मास्टर डिसीजन फ्लोचार्ट',
          en: 'Integers Arithmetic Master Decision Flowchart',
          hinglish: 'Integers Sign Flowchart',
        },
        diagramCode: `graph TD
    A["🔢 दो पूर्णांक (Two Integers)"] --> B{"चिन्ह कैसे हैं? (Signs)"}
    B -->|"समान चिन्ह (+ + या - -)"| C["➕ दोनों को जोड़ें (Add Both)"]
    C --> D["वही सामान्य चिन्ह लगाएं (Common Sign)"]
    D --> E1["उदा: (-5) + (-4) = -9"]
    B -->|"विपरीत चिन्ह (+ - या - +)"| F["➖ बड़े में से छोटा घटाएं (Subtract)"]
    F --> G["बड़ी संख्या का चिन्ह लगाएं (Larger Sign)"]
    G --> E2["उदा: (-12) + (+15) = +3"]
    style A fill:#102447,stroke:#f59e0b,stroke-width:2px,color:#fff
    style B fill:#0a1931,stroke:#38bdf8,stroke-width:2px,color:#fff
    style C fill:#065f46,stroke:#10b981,stroke-width:2px,color:#fff
    style F fill:#831843,stroke:#f43f5e,stroke-width:2px,color:#fff
    style E1 fill:#0f172a,stroke:#eab308,stroke-width:1px,color:#fef08a
    style E2 fill:#0f172a,stroke:#eab308,stroke-width:1px,color:#fef08a`,
      },
      youtubeVideo: {
        searchQuery: 'Addition and subtraction of integers class 6 Maths NCERT Hindi',
        title: {
          hi: 'पूर्णांकों का जोड़-घटाव: 10 सेकंड शॉर्ट ट्रिक वीडियो',
          en: 'Addition and Subtraction of Integers - Mental Tricks',
          hinglish: 'Integers Addition Subtraction Tricks Video',
        },
        recommendedChannels: ['NCERT Official', 'Khan Academy India', 'Dear Sir Maths', 'Physics Wallah Foundation'],
        scenesScript: [
          {
            timestamp: '00:00',
            visual: '🎬 3D Number line floating in space with positive numbers on right and negative on left',
            narration: {
              hi: 'नमस्ते दोस्तों! आज हम पूर्णांकों (Integers) के जोड़ और घटाव को जिंदगी भर कभी न भूलने वाली बैंक ट्रिक से सीखेंगे!',
              en: 'Hello students! Today we master addition and subtraction of integers with our zero-memorization bank trick!',
              hinglish: 'Dosto aaj integers ke plus minus ka darr hamesha ke liye khatam karenge!',
            },
            keyConcept: 'Number Line Intro',
          },
          {
            timestamp: '00:45',
            visual: '💰 Cash vs Debt balance scale moving up and down',
            narration: {
              hi: 'याद रखें: प्लस (+) मतलब आपकी जेब में नकद रुपया, और माइनस (-) मतलब दुकानदार का उधार!',
              en: 'Remember: Positive (+) means cash in your pocket, negative (-) means debt to be paid.',
              hinglish: 'Positive matlab pocket cash, Negative matlab udhari!',
            },
            keyConcept: 'Bank Balance Rule',
          },
        ],
      },
    };
  }

  // 2. SPECIFIC PRE-BAKED: Class 2 - My Family (TYPE C)
  if (
    topicName.toLowerCase().includes('my family') ||
    topicName.includes('मेरा परिवार') ||
    (topicName.toLowerCase().includes('family') && (classLevel === 1 || classLevel === 2))
  ) {
    return {
      topicType: 'TYPE_C',
      typeBadge: meta.typeBadge,
      typeIcon: meta.typeIcon,
      typeLabel: meta.typeLabel,
      tabsConfig,
      typeC_Kids: {
        story: {
          title: {
            hi: 'रोहन का प्यारा और खुशहाल परिवार 🏡',
            en: "Rohan's Lovely & Happy Family 🏡",
            hinglish: 'Rohan ka Pyara Parivar 🏡',
          },
          characters: ['रोहन (7 साल का प्यारा बच्चा)', 'दादाजी व दादीजी (कहानी सुनाने वाले)', 'मम्मी (डॉक्टर व स्वादिष्ट खाना बनाने वाली)', 'पापा (टीचर व खेल सिखाने वाले)', 'पिंकी (रोहन की छोटी बहन)', 'टॉमी (पालतू कुत्ता 🐶)'],
          narrative: {
            hi: 'रोहन कक्षा 2 में पढ़ता है। उसके घर में 6 सदस्य और एक प्यारा पिल्ला टॉमी रहते हैं। सुबह दादाजी रोहन को बगीचे में सैर कराते हैं और दादीजी मीठी-मीठी परियों की कहानियां सुनाती हैं। मम्मी और पापा मिलकर घर का सारा काम संभालते हैं और बच्चों को पढ़ाई में मदद करते हैं। शाम को पूरा परिवार एक साथ बैठकर हंसता-खेलता है और रात का खाना साथ खाता है। रोहन कहता है—"मेरा परिवार ही मेरी सबसे बड़ी ताकत और खुशी है!"',
            en: 'Rohan studies in Class 2. In his house live grandparents, parents, his sister Pinky, and puppy Tommy. Grandfather teaches gardening while grandmother narrates magical bedtime tales. Mom and dad take care of the household with endless love. Every evening, the entire family sits together for delicious food and joyful laughter. Rohan proudly says: "My family is my world!"',
            hinglish: 'Rohan Class 2 me padhta hai. Uske ghar me Dadaji, Dadiji, Mummy, Papa aur choti behen Pinky rehte hain. Sham ko sab milkar baatein karte hain aur ek dusre ki madad karte hain!',
          },
          moralLesson: {
            hi: 'नैतिक सीख: परिवार में सब एक-दूसरे से प्यार करते हैं, मदद करते हैं और सुख-दुख में साथ निभाते हैं।',
            en: 'Moral: In a family, everyone loves, shares, cares, and supports one another through thick and thin.',
            hinglish: 'Family me hamesha sabka aadar karna chahiye aur mil-julkar rehna chahiye.',
          },
        },
        visualCartoon: {
          visualEmojiScene: '🏡 👴 👵 👨 👩 👦 👧 🐶 🌳 ✨',
          visualDesc: {
            hi: 'एक सुंदर हरा-भरा घर, जहां दादा-दादी, माता-पिता, भाई-बहन और पालतू कुत्ता प्यार से साथ रहते हैं।',
            en: 'A bright, colorful house where grandparents, parents, siblings, and their joyful pet live together happily.',
            hinglish: 'Sundar ghar jisme sabhi parivar ke sadasya khushiyon ke sath rehte hain.',
          },
          keyLabels: [
            { name: 'दादाजी व दादीजी (Grandparents)', funFact: 'परिवार के सबसे बड़े मार्गदर्शक और प्यारी कहानियों का खजाना!', icon: '👴👵' },
            { name: 'माता-पिता (Parents)', funFact: 'हमारा पालन-पोषण करने वाले और हर जरूरत पूरी करने वाले!', icon: '👨👩' },
            { name: 'भाई-बहन (Siblings)', funFact: 'हमारे सबसे पहले और पक्के दोस्त, जिनके साथ हम खेलते हैं!', icon: '👦👧' },
            { name: 'संयुक्त परिवार vs एकल परिवार', funFact: 'छोटा परिवार = माता-पिता + बच्चे | बड़ा परिवार = दादा-दादी + चाचा-चाची + कजिन्स!', icon: '🏡' },
          ],
          colorTheme: 'from-amber-400 via-rose-400 to-pink-500',
        },
        funActivity: {
          activityName: {
            hi: 'उंगली कठपुतली खेल व मज़ेदार पहेली (Finger Puppet & Riddle)',
            en: 'Family Finger Puppet Game & Fun Riddle',
            hinglish: 'Family Activity & Paheli',
          },
          steps: {
            hi: [
              '1. अपने हाथ के अंगूठे को "पापा", तर्जनी को "मम्मी", मध्यमा को "दादाजी", अनामिका को "दादीजी" और कनिष्ठिका को "आप" मानें।',
              '2. "फैमिली फिंगर" गाना गाते हुए एक-एक उंगली को हिलाएं!',
              '3. अपने परिवार के सभी सदस्यों के नाम एक सुंदर चित्र बनाकर लिखें।',
            ],
            en: [
              '1. Assign each finger: Thumb is Daddy, Index is Mommy, Middle is Grandpa, Ring is Grandma, Pinky is You!',
              '2. Sing "Finger Family" rhyme and wiggle each finger!',
              '3. Draw a colorful family tree in your drawing book!',
            ],
            hinglish: [
              '1. Apne haath ki 5 ungliyon par parivar ke sadasyon ke naam likhein.',
              '2. "Daddy Finger, Daddy Finger Where Are You" gaana gayein!',
              '3. Ek pyara sa Family Tree banayein!',
            ],
          },
          funRiddle: {
            question: {
              hi: 'पहेली: "जो आपके पापा के भी पापा हैं, और आपको सुनाते लोरी व मीठी कहानी हैं, बताओ वो कौन हैं?"',
              en: 'Riddle: "Who is your father\'s father, with silver hair and magical bedtime stories?"',
              hinglish: 'Paheli: Papa ke papa jo aapko sundar kahani sunate hain, wo kaun hain?',
            },
            answer: {
              hi: 'उत्तर: प्यारे दादाजी (Grandfather)! 👴✨',
              en: 'Answer: Beloved Grandfather! 👴✨',
              hinglish: 'Answer: Dadaji (Grandfather)!',
            },
            hint: {
              hi: 'संकेत: वो चश्मा लगाते हैं और लाठी लेकर सैर पर जाते हैं।',
              en: 'Hint: Wears glasses and goes on morning walks with a walking stick.',
              hinglish: 'Hint: Chashma lagate hain aur walk par le jate hain.',
            },
          },
        },
        kidsQuiz: [
          {
            question: {
              hi: 'एक परिवार में जिसमें माता-पिता और उनके 2 बच्चे रहते हैं, उसे क्या कहते हैं? 🏡',
              en: 'A family with only parents and their children is called what?',
              hinglish: 'Parents aur unke bacchon wale parivar ko kya kehte hain?',
            },
            emojiOptions: [
              { label: 'एकल/छोटा परिवार (Nuclear Family)', emoji: '👨‍👩‍👧‍👦' },
              { label: 'बड़ा/संयुक्त परिवार (Joint Family)', emoji: '🏡' },
              { label: 'पड़ोसी (Neighbours)', emoji: '🏘️' },
              { label: 'स्कूल (School)', emoji: '🏫' },
            ],
            correctIndex: 0,
            funCelebration: 'शाबाश! आपने बिल्कुल सही पहचाना! ⭐⭐⭐',
          },
          {
            question: {
              hi: 'हमें अपने परिवार के बड़े-बुजुर्गों के साथ कैसा व्यवहार करना चाहिए? ❤️',
              en: 'How should we treat our elders in the family?',
              hinglish: 'Ghar ke badon ke sath kaisa vyavhar karna chahiye?',
            },
            emojiOptions: [
              { label: 'आदर, प्यार और सम्मान से (Respect & Love)', emoji: '🙏' },
              { label: 'लड़ाई-झगड़ा करके', emoji: '😡' },
              { label: 'उनकी बात न मानकर', emoji: '🙈' },
              { label: 'चिल्लाकर', emoji: '📢' },
            ],
            correctIndex: 0,
            funCelebration: 'बहुत खूब! आप एक बहुत अच्छे और संस्कारी बच्चे हैं! 🌟🎈',
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'mindmap',
        title: {
          hi: 'मेरा प्यारा परिवार - माइंडमैप एवं संबंध वृक्ष (Family Tree)',
          en: 'My Family Tree & Relation Mindmap',
          hinglish: 'My Family Tree Mindmap',
        },
        diagramCode: `graph TD
    A["🏡 मेरा परिवार (My Family)"] --> B["👴 दादाजी व 👵 दादीजी"]
    A --> C["👨 पापा व 👩 मम्मी"]
    A --> D["👦 भाई व 👧 बहन"]
    A --> E["🐶 पालतू टॉमी (Pet)"]
    B --> B1["प्यार और कहानियां (Love & Stories)"]
    C --> C1["देखभाल और शिक्षा (Care & Education)"]
    D --> D1["खेल और मस्ती (Play & Joy)"]
    style A fill:#fbbf24,stroke:#d97706,stroke-width:3px,color:#0f172a
    style B fill:#f472b6,stroke:#db2777,stroke-width:2px,color:#fff
    style C fill:#38bdf8,stroke:#0284c7,stroke-width:2px,color:#fff
    style D fill:#4ade80,stroke:#16a34a,stroke-width:2px,color:#fff
    style E fill:#a78bfa,stroke:#7c3aed,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: 'My family Class 2 EVS animated cartoon story Hindi rhymes',
        title: {
          hi: 'मेरा परिवार (My Family) - कक्षा 2 बाल एनिमेटेड कहानी',
          en: 'My Family - Class 2 EVS Animated Cartoon Story',
          hinglish: 'My Family Class 2 Animated Story',
        },
        recommendedChannels: ['Pebbles Kids Learning', 'NCERT Swayam Prabha', 'ChuChu TV Hindi', 'Magnet Brains Kids'],
        scenesScript: [
          {
            timestamp: '00:00',
            visual: '🌈 Colorful cartoon sunshine rising over a pretty countryside home with birds singing',
            narration: {
              hi: 'नमस्ते प्यारे बच्चों! आज हम चलेंगे रोहन के घर और मिलेंगे उसके प्यारे परिवार से!',
              en: 'Welcome dear kids! Today let us visit Rohan\'s happy home and meet his loving family!',
              hinglish: 'Hello pyare baccho! Aaj hum milenge Rohan ke parivar se!',
            },
            keyConcept: 'Welcome to Family World',
          },
          {
            timestamp: '00:30',
            visual: '👵 Grandparents giving cookies to Rohan and Pinky',
            narration: {
              hi: 'दादाजी और दादीजी हमें बहुत प्यार करते हैं और अच्छी-अच्छी बातें सिखाते हैं!',
              en: 'Grandpa and Grandma give endless love and teach wonderful life values!',
              hinglish: 'Dadaji aur Dadiji se hume achhe sanskar aur khushiyan milti hain!',
            },
            keyConcept: 'Elders & Respect',
          },
        ],
      },
    };
  }

  // 3. SPECIFIC PRE-BAKED: SSC Maths - लाभ हानि (Profit & Loss) (TYPE_F: Competitive High-Yield)
  if (
    topicName.includes('लाभ') ||
    topicName.includes('हानि') ||
    topicName.toLowerCase().includes('profit') ||
    topicName.toLowerCase().includes('loss')
  ) {
    return {
      topicType: 'TYPE_F',
      typeBadge: 'TYPE F: SSC / COMPETITIVE PYQ HEAVY',
      typeIcon: '🏆',
      typeLabel: {
        hi: 'लाभ-हानि (Profit & Loss) - SSC/CGL 10s शॉर्टकट व 10-Yr PYQ',
        en: 'Profit & Loss - SSC/CGL 10s Speed Tricks & 10-Yr PYQ Bank',
        hinglish: 'Profit & Loss (High-Yield 10s Tricks & PYQ)',
      },
      tabsConfig: getAdaptiveTabsConfig('TYPE_F'),
      typeF_Competitive: {
        pyq10YearTrend: {
          examFrequency: [
            { exam: 'SSC CGL / CHSL', frequency: 'Every shift (2-3 Questions)', marksWeightage: '4 - 6 Marks' },
            { exam: 'Railway NTPC & Group D', frequency: 'High Weightage', marksWeightage: '3 - 5 Marks' },
            { exam: 'MP Police / Patwari / State SI', frequency: 'Mandatory Core', marksWeightage: '4 Marks' },
          ],
          trendSummary: {
            hi: 'लाभ-हानि SSC और राज्य प्रतियोगी परीक्षाओं का सबसे अधिक अंक देने वाला अध्याय है। 90% प्रश्न रेश्यो मेथड और समतुल्य छूट पर आधारित होते हैं।',
            en: 'Profit & Loss is the highest-weightage chapter in SSC & State Exams. 90% of questions are solved via Ratio Method and Successive Discount shortcuts.',
            hinglish: 'Profit & Loss SSC aur State Exams me 4-6 marks ka fixed weightage rakhta hai.',
          },
          highYieldSubtopics: [
            'बेईमान दुकानदार (Dishonest Dealer)',
            'क्रमिक छूट (Successive Discount)',
            'CP = SP अनुपात (Ratio Method)',
            'समान विक्रय मूल्य (Same SP Concept)',
          ],
        },
        superShortTrick: {
          trickName: {
            hi: '⚡ JITOMNI 10s रेश्यो मेथड (No X, No 100 Formula)',
            en: '10s Universal Ratio Shortcut Method',
            hinglish: '10s Universal Ratio Shortcut',
          },
          formulaPattern: 'प्रतिशत को भिन्न में बदलें: 20% लाभ = +1/5 (CP:SP = 5:6) | 16⅔% हानि = -1/6 (CP:SP = 6:5)',
          executionMethod: {
            hi: 'प्रतिशत लाभ या हानि को भिन्न में बदलें। हर (Denominator) को CP मानें, अंश (Numerator) को लाभ/हानि। सीधे 1 अनुपात में 5 सेकंड में उत्तर निकालें!',
            en: 'Convert % profit/loss into fraction. Let denominator be CP and numerator be Profit/Loss. Solve directly in 5 seconds!',
            hinglish: 'Percentage ko fraction me convert karke CP:SP ratio se 5s me answer nikalein.',
          },
          timeComparison: {
            traditionalTime: '45 से 60 सेकंड (किताबी सूत्र)',
            jitomniTrickTime: '5 से 10 सेकंड (रेश्यो मेथड)',
          },
        },
        masterFormulaConcept: {
          formulas: [
            {
              name: { hi: 'लाभ प्रतिशत सूत्र (Profit %)', en: 'Profit Percentage', hinglish: 'Profit %' },
              formula: 'Profit % = [(SP - CP) / CP] × 100',
              whereUsed: { hi: 'जब विक्रय मूल्य (SP) क्रय मूल्य (CP) से अधिक हो।', en: 'When Selling Price is greater than Cost Price.', hinglish: 'Jab SP > CP ho.' },
            },
            {
              name: { hi: 'समान SP पर x% लाभ व x% हानि ट्रिक', en: 'Same SP with x% Profit and x% Loss', hinglish: 'Same SP Common Loss Formula' },
              formula: 'Net Loss % = (x² / 100)% [सदैव हानि होगी]',
              whereUsed: { hi: 'यदि दो वस्तुएं समान मूल्य पर बेची जाएं (एक पर x% लाभ, दूसरी पर x% हानि)।', en: 'When two articles sold at same SP, one at x% profit and other at x% loss.', hinglish: 'Same SP par hamesha Loss hota hai!' },
            },
            {
              name: { hi: 'बेईमान दुकानदार शॉर्टकट (Dishonest Dealer)', en: 'Dishonest Dealer Weight Shortcut', hinglish: 'Dishonest Dealer Formula' },
              formula: 'Gain % = [Error / (True Value - Error)] × 100',
              whereUsed: { hi: '1 किग्रा के स्थान पर 800 ग्राम तोलने पर लाभ।', en: 'Profit % when cheating on weights (e.g. 800g instead of 1000g).', hinglish: 'Weight cheating profit formula.' },
            },
          ],
          conceptualPillars: [
            '1. CP हमेशा 100% या बेस अनुपात होता है।',
            '2. छूट (Discount) हमेशा अंकित मूल्य (Marked Price - MP) पर दी जाती है।',
            '3. जब विक्रय मूल्य समान हो और लाभ-हानि % बराबर हो, तो हमेशा हानि (x²/100)% होती है।',
          ],
        },
        solvedPyqBank: [
          {
            examYear: 'SSC CGL Tier-1 (2023)',
            question: {
              hi: 'एक दुकानदार किसी वस्तु को ₹1470 में बेचकर 16⅔% का लाभ कमाता है। उस वस्तु का क्रय मूल्य (CP) ज्ञात कीजिए।',
              en: 'A shopkeeper sells an article for ₹1470 and makes a profit of 16⅔%. Find the Cost Price (CP) of the article.',
              hinglish: 'Ek shopkeeper ₹1470 me bechkar 16⅔% profit kamata hai. CP nikalo.',
            },
            options: ['₹1200', '₹1260', '₹1320', '₹1350'],
            correctIndex: 1,
            normalSolution: {
              hi: 'पारंपरिक विधि: SP = CP × (100 + P%)/100 => 1470 = CP × (100 + 50/3)/100 = CP × 350/300 => CP = (1470 × 6)/7 = ₹1260 (लगभग 45-60 सेकंड)।',
              en: 'Traditional method: SP = CP * (1 + 1/6) = 7/6 CP -> CP = 1470 * 6/7 = ₹1260.',
              hinglish: 'Conventional formula lagane se calculation lambi hoti hai.',
            },
            jitomniShortcutSolution: {
              hi: '10s ट्रिक: 16⅔% = 1/6 (CP = 6 यूनिट, लाभ = 1 यूनिट)\nSP = 6 + 1 = 7 यूनिट\n7 यूनिट = ₹1470 => 1 यूनिट = 1470/7 = ₹210\nअतः CP = 6 यूनिट = 6 × ₹210 = ₹1260! (मात्र 5 सेकंड)',
              en: '10s Ratio Trick: 16⅔% = 1/6 -> CP = 6, Profit = 1 -> SP = 7 units.\n7 units = ₹1470 -> 1 unit = ₹210.\nCP = 6 × 210 = ₹1260!',
              hinglish: '16⅔% = 1/6 -> SP = 7 unit = 1470 -> 1 unit = 210 -> CP = 6 * 210 = ₹1260.',
            },
          },
          {
            examYear: 'SSC CPO / CHSL (2022)',
            question: {
              hi: 'दो घड़ियों को प्रत्येक ₹1920 में बेचा जाता है। एक पर 20% का लाभ और दूसरी पर 20% की हानि होती है। पूरे सौदे में कुल लाभ या हानि प्रतिशत क्या है?',
              en: 'Two watches are sold for ₹1920 each. One gives 20% profit and the other 20% loss. What is the net profit or loss percentage in the whole transaction?',
              hinglish: 'Do watches each ₹1920 me bechi gayi. Ek par 20% profit, dusri par 20% loss. Net % kya hai?',
            },
            options: ['4% लाभ', '4% हानि (Loss)', 'कोई लाभ न हानि', '2% हानि'],
            correctIndex: 1,
            normalSolution: {
              hi: 'पारंपरिक विधि: दोनों वस्तुओं का अलग-अलग CP निकालें फिर कुल SP व CP की तुलना करें (1 मिनट से अधिक)।',
              en: 'Standard method: Calculate CP1 and CP2 separately and find overall loss percentage.',
              hinglish: 'Dono ka alag alag CP nikalne me bohot time lagta hai.',
            },
            jitomniShortcutSolution: {
              hi: '10s डायरेक्ट फॉर्मूला: जब SP समान हो और लाभ/हानि % (x) समान हो, तो सदैव हानि होती है!\nNet Loss% = x² / 100 = (20)² / 100 = 400 / 100 = 4% हानि (Loss)!',
              en: 'Direct Formula: When SP is identical and profit/loss % (x) is identical, net result is ALWAYS loss!\nNet Loss % = (20 × 20) / 100 = 4% Loss!',
              hinglish: 'Direct Shortcut: Net Loss = x²/100 = (20)²/100 = 4% Loss.',
            },
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'mindmap',
        title: {
          hi: 'लाभ एवं हानि - 360° मास्टर फॉर्मूला ट्री (Mermaid Blueprint)',
          en: 'Profit & Loss - 360° Master Formula Tree',
          hinglish: 'Profit & Loss Formula Map',
        },
        diagramCode: `graph TD
    A["💰 लाभ-हानि (Profit & Loss)"] --> B["🟢 SP > CP: लाभ = SP - CP"]
    A --> C["🔴 CP > SP: हानि = CP - SP"]
    A --> D["⚡ रेश्यो मेथड: 20% = 1/5"]
    A --> E["⚖️ समान SP ट्रिक: Loss = x²/100"]
    A --> F["🏷️ क्रमिक छूट: a + b - ab/100"]
    style A fill:#f59e0b,stroke:#b45309,stroke-width:3px,color:#000
    style B fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    style C fill:#ef4444,stroke:#b91c1c,stroke-width:2px,color:#fff
    style D fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    style E fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    style F fill:#ec4899,stroke:#be185d,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: 'Profit and Loss short tricks SSC CGL Hindi Gagan Pratap Aditya Ranjan',
        title: {
          hi: 'लाभ हानि (Profit & Loss) - 10-Second शॉर्टकट ट्रिक्स व PYQ',
          en: 'Profit & Loss - 10-Second Shortcut Tricks & PYQ',
          hinglish: 'Profit Loss Super Short Tricks',
        },
        recommendedChannels: ['Gagan Pratap Maths', 'Aditya Ranjan Talks', 'Dear Sir', 'RBE Revolution By Education'],
        scenesScript: [
          {
            timestamp: '00:00',
            visual: '⚡ Neon 10s Timer with Ratio Method formula CP:SP',
            narration: {
              hi: 'नमस्कार साथियों! आज हम प्रॉफिट एंड लॉस के उन 4 सबसे कठिन सवालों को बिना पेन उठाए सिर्फ 10 सेकंड में हल करेंगे!',
              en: 'Hello aspirants! Today we solve the 4 most recurring Profit & Loss questions in just 10 seconds without lifting a pen!',
              hinglish: 'Dosto aaj Profit and Loss ke PYQs ko 10s ratio method se udayenge!',
            },
            keyConcept: 'Ratio Method Revolution',
          },
        ],
      },
    };
  }

  // 4. SPECIFIC PRE-BAKED: Reasoning - रक्त संबंध (Blood Relations) (TYPE_E: Logic & Puzzle)
  if (
    topicName.includes('रक्त संबंध') ||
    topicName.includes('खून') ||
    topicName.toLowerCase().includes('blood relation') ||
    topicName.toLowerCase().includes('family tree')
  ) {
    return {
      topicType: 'TYPE_E',
      typeBadge: 'TYPE E: LOGIC & PUZZLE (Reasoning)',
      typeIcon: '🧩',
      typeLabel: {
        hi: 'रक्त संबंध (Blood Relations) - 10s फैमिली ट्री व लॉजिक नियम',
        en: 'Blood Relations - 10s Family Tree Shortcut & Logic Rules',
        hinglish: 'Blood Relations (10s Family Tree Rules)',
      },
      tabsConfig: getAdaptiveTabsConfig('TYPE_E'),
      typeE_Reasoning: {
        logicRules: {
          title: {
            hi: 'रक्त संबंध के 3 आधारभूत चिन्ह व पीढ़ी नियम (360° Rules)',
            en: '3 Foundational Blood Relation Notations & Generation Rules',
            hinglish: 'Blood Relation Ke 3 Core Rules',
          },
          fundamentalRules: [
            {
              ruleNumber: 1,
              rule: {
                hi: 'जेंडर चिन्ह नियम: पुरुष (Male) = [+] बॉक्स | महिला (Female) = [-] वृत्त। नाम से जेंडर कभी न मानें।',
                en: 'Gender Notation: Male = [+], Female = [-]. Never determine gender by name alone.',
                hinglish: 'Male ke liye [+] aur Female ke liye [-].',
              },
            },
            {
              ruleNumber: 2,
              rule: {
                hi: 'पीढ़ी अंतर नियम: ऊपर की पीढ़ी (माता/पिता) = [↑] | नीचे की पीढ़ी (पुत्र/पुत्री) = [↓] | समान पीढ़ी = [—]।',
                en: 'Generation Gap: Parent generation above [↑], child below [↓], siblings parallel [—].',
                hinglish: 'Parent generation upar, child generation niche.',
              },
            },
            {
              ruleNumber: 3,
              rule: {
                hi: 'वैवाहिक संबंध नियम: पति-पत्नी के लिए दोहरी रेखा (═) और भाई-बहन के लिए एकल रेखा (—)।',
                en: 'Couples use double horizontal link (═), siblings use single line (—).',
                hinglish: 'Married couple ke liye (═) double line.',
              },
            },
          ],
        },
        speedTrick10s: {
          title: {
            hi: '⚡ JITOMNI 10s बैकवर्ड ट्रैवर्सल ट्रिक (Pointing Questions)',
            en: '10s Backward Traversal Shortcut for Pointing Questions',
            hinglish: '10s Pointing Question Shortcut',
          },
          formulaOrPattern: 'वाक्य को "मेरे/मेरी" से शुरू करके अंत से आगे की ओर हल करें (Self Substitution)',
          mentalSteps: [
            {
              hi: '1. वाक्य में "मेरे" या "मेरी" (My) शब्द पर स्वयं को स्थापित करें।',
              en: '1. Substitute yourself at "My" position in the question.',
              hinglish: '1. "Mere" word se khud ko imagine karein.',
            },
            {
              hi: '2. संबंध को पीछे से आगे की ओर जोड़ें (Reverse Linkage)।',
              en: '2. Traverse relations in reverse chronological sequence.',
              hinglish: '2. Reverse direction me relations decode karein.',
            },
            {
              hi: '3. बिना पेन उठाए 5 सेकंड में सही विकल्प चुनें।',
              en: '3. Mark the direct answer in 5 seconds without diagram.',
              hinglish: '3. 5s me direct answer tick karein.',
            },
          ],
          timeSaved: '80% Time Saved (45s to 8s)',
        },
        mermaidVisualMap: {
          code: `graph TD
    GP["👴 दादा/नाना (+) ══ 👵 दादी/नानी (-)"] --> P["👨 पिता (+) ══ 👩 माता (-)"]
    GP --> U["🧔 चाचा/मामा (+)"]
    P --> S["👦 स्वयं (Self)"]
    P --> B["👦 भाई (+) ── 👧 बहन (-)"]
    S --> C["👶 बेटा (+) ── 👧 बेटी (-)"]
    style GP fill:#64748b,stroke:#334155,stroke-width:2px,color:#fff
    style P fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style U fill:#0d9488,stroke:#0f766e,stroke-width:2px,color:#fff
    style S fill:#f59e0b,stroke:#d97706,stroke-width:3px,color:#000
    style B fill:#38bdf8,stroke:#0284c7,stroke-width:2px,color:#fff
    style C fill:#4ade80,stroke:#16a34a,stroke-width:2px,color:#fff`,
          title: {
            hi: 'फैमिली ट्री लॉजिक चार्ट (Blood Relations Visual Map)',
            en: 'Universal Family Tree Logic Blueprint',
            hinglish: 'Family Tree Chart',
          },
          visualType: 'tree',
          explanation: {
            hi: '3 स्तरों का सार्वभौमिक फैमिली ट्री चार्ट जो सभी जटिल संबंधों को स्पष्ट करता है।',
            en: 'Universal 3-level family tree visual architecture.',
            hinglish: '3-level family tree map.',
          },
        },
        practiceDrills5Level: [
          {
            level: 1,
            difficulty: 'Level 1 (Direct)',
            question: {
              hi: 'एक महिला की ओर इशारा करते हुए राहुल ने कहा, "वह मेरी मां के इकलौते पुत्र की पत्नी है।" वह महिला राहुल से किस प्रकार संबंधित है?',
              en: 'Pointing to a woman, Rahul said, "She is the wife of the only son of my mother." How is the woman related to Rahul?',
              hinglish: 'Rahul ne kaha: "Wo meri maa ke iklaute bete ki patni hai." Wo mahila Rahul ki kya lagti hai?',
            },
            options: ['बहन (Sister)', 'पत्नी (Wife)', 'मां (Mother)', 'पुत्री (Daughter)'],
            correctIndex: 1,
            speedExplanation: {
              hi: '10s बैकवर्ड ट्रिक: राहुल की मां का इकलौता पुत्र = स्वयं राहुल। राहुल की पत्नी = वह महिला! अतः संबंध = पत्नी (Wife)!',
              en: '10s Shortcut: Rahul\'s mother\'s only son = Rahul himself. Wife of Rahul = The woman. Answer = Wife!',
              hinglish: 'Maa ka iklauta beta = Rahul. Rahul ki patni = Wife!',
            },
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'mindmap',
        title: {
          hi: 'रक्त संबंध - 360° जनरेशन व सिंबल मैप',
          en: 'Blood Relations - Generation & Symbol Blueprint',
          hinglish: 'Blood Relations Mindmap',
        },
        diagramCode: `graph TD
    A["🧩 रक्त संबंध (Blood Relations)"] --> B["➕ पुरुष (Male)"]
    A --> C["➖ महिला (Female)"]
    A --> D["══ वैवाहिक संबंध (Couple)"]
    A --> E["── भाई-बहन (Siblings)"]
    A --> F["⬆️⬇️ पीढ़ी अंतर (Generations)"]
    style A fill:#6366f1,stroke:#4338ca,stroke-width:3px,color:#fff
    style B fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    style C fill:#ec4899,stroke:#be185d,stroke-width:2px,color:#fff
    style D fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style E fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    style F fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: 'Blood relation short tricks reasoning Hindi Piyush Varshney Sahil Sir',
        title: {
          hi: 'रक्त संबंध (Blood Relations) - 10-Second फैमिली ट्री शॉर्ट ट्रिक्स',
          en: 'Blood Relations - 10-Second Family Tree Reasoning Tricks',
          hinglish: 'Blood Relations Reasoning Tricks',
        },
        recommendedChannels: ['Careerwill Reasoning', 'Wi-Fi Study', 'Adda247 Reasoning', 'Testbook SuperCoaching'],
        scenesScript: [
          {
            timestamp: '00:00',
            visual: '🧩 3-Level Family tree animation drawing with (+) and (-) signs in 5 seconds',
            narration: {
              hi: 'साथियों! आज ब्लड रिलेशन के किसी भी सवाल को फैमिली ट्री बनाकर मात्र 10 सेकंड में हल करना सीखेंगे!',
              en: 'Friends! Today we learn the universal family tree symbol trick to crack any Blood Relation question in 10 seconds!',
              hinglish: 'Aaj Blood Relation ke har question ko family tree se 10s me udayenge!',
            },
            keyConcept: 'Universal Symbol Tree',
          },
        ],
      },
    };
  }

  // 5. GENERAL SYNTHESIS FOR OTHER TOPICS (Tailored by TopicType)
  if (topicType === 'TYPE_B') {
    // Theory + Diagram (Science / Biology)
    return {
      topicType: 'TYPE_B',
      typeBadge: meta.typeBadge,
      typeIcon: meta.typeIcon,
      typeLabel: meta.typeLabel,
      tabsConfig,
      typeB_Science: {
        coreConcept: {
          title: {
            hi: `${topicName}: 360° वैज्ञानिक संकल्पना एवं नियम`,
            en: `${topicName}: Core Scientific Principle & Law`,
            hinglish: `${topicName} Core Scientific Logic`,
          },
          summary: {
            hi: `${topicName}, ${subject} का एक मूलभूत प्राकृतिक सिद्धांत है जो ${chapter} के अंतर्गत आता है। यह नियम बताता है कि कैसे ऊर्जा और पदार्थ परस्पर क्रिया करके संतुलन स्थापित करते हैं।`,
            en: `${topicName} is a foundational governing law in ${subject} (${chapter}), explaining systematic energy and matter transformations.`,
            hinglish: `${topicName} ${subject} ka foundational topic hai jo bina ratey direct logical mechanism se samajh aata hai.`,
          },
          keyPrinciples: {
            hi: ['मूल भौतिक/रासायनिक गुणधर्म और नियम', 'ऊर्जा संरक्षण व प्रणालीगत संतुलन', 'मात्रात्मक एवं प्रयोगात्मक सत्यापन'],
            en: ['Fundamental physical/chemical parameters', 'Conservation laws and thermodynamic balance', 'Quantitative and empirical verification'],
            hinglish: ['Basic physical rule aur structure', 'Energy balance aur working cycle', 'Laboratory aur exam proof'],
          },
          scientificAnalogy: {
            hi: 'सरल उपमा: इसे एक विद्युत परिपथ या जल आपूर्ति नेटवर्क की तरह समझें, जहां इनपुट प्रवाह व्यवस्थित रूप से आउटपुट में बदलता है।',
            en: 'Simple Analogy: Think of it like an electrical circuit or city water grid, flowing under deterministic pressure and rules.',
            hinglish: 'Jaise solar battery me suraj ki roshni store hokar bulb jalati hai!',
          },
        },
        mermaidDiagram: {
          chartType: 'flowchart',
          title: {
            hi: `${topicName} 360° प्रक्रियात्मक डायग्राम (Mermaid Visual)`,
            en: `${topicName} 360° System Architecture Diagram`,
            hinglish: `${topicName} Process Diagram`,
          },
          code: `graph LR
    A["🔵 प्रारंभिक अवस्था (Input / Source)"] --> B["⚡ मुख्य क्रिया (Mechanism)"]
    B --> C["🔬 अंतर्निहित रूपांतरण (Transformation)"]
    C --> D["🌟 उपयोगी परिणाम (Output & Energy)"]
    style A fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style B fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fff
    style C fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff
    style D fill:#581c87,stroke:#a855f7,stroke-width:2px,color:#fff`,
          explanation: {
            hi: 'यह डायग्राम दिखाता है कि इनपुट स्रोत कैसे विभिन्न चरणों से गुजरकर उपयोगी ऊर्जा व उत्पाद में बदलता है।',
            en: 'This architectural blueprint maps the transformation from initial input state to terminal output.',
            hinglish: 'Ye flowchart system ke pure process ko visual roop me explain karta hai.',
          },
          keyComponents: [
            { name: 'इनपुट स्रोत (Input Factor)', desc: 'प्रक्रिया को शुरू करने वाला प्राथमिक ऊर्जा/तत्व स्रोत।' },
            { name: 'रूपांतरण चक्र (Transformation)', desc: 'नियमबद्ध वैज्ञानिक बदलाव जहां भौतिक/रासायनिक अभिक्रिया होती है।' },
            { name: 'स्थिर आउटपुट (Equilibrium Output)', desc: 'अंतिम उत्पाद और संतुलित ऊर्जा स्तर।' },
          ],
        },
        stepProcess: {
          title: {
            hi: `${topicName} की चरणबद्ध कार्यप्रणाली (Step-by-Step Mechanism)`,
            en: `Step-by-Step Operational Mechanism of ${topicName}`,
            hinglish: `${topicName} Step-by-Step Process`,
          },
          stages: [
            {
              stageNumber: 1,
              name: { hi: 'चरण 1: इनपुट व सक्रियण (Activation)', en: 'Stage 1: Input & Activation', hinglish: 'Stage 1: Input Activation' },
              details: { hi: 'प्रारंभिक कारक आवश्यक सक्रियण ऊर्जा प्राप्त करते हैं।', en: 'Initial drivers acquire activation threshold.', hinglish: 'Pehle jaruri energy input milti hai.' },
              inputsOutputs: 'Input: कच्चा माल/ऊर्जा -> Output: सक्रिय अवस्था',
            },
            {
              stageNumber: 2,
              name: { hi: 'चरण 2: मुख्य रूपांतरण (Dynamic Conversion)', en: 'Stage 2: Dynamic Conversion', hinglish: 'Stage 2: Core Reaction' },
              details: { hi: 'सिस्टम के घटक वैज्ञानिक नियमों के अनुसार परस्पर क्रिया करते हैं।', en: 'System components interact according to physical laws.', hinglish: 'System me main conversion perform hota hai.' },
              inputsOutputs: 'Input: सक्रिय अवस्था -> Output: मध्यवर्ती उत्पाद',
            },
            {
              stageNumber: 3,
              name: { hi: 'चरण 3: अंतिम संतुलन व आउटपुट (Equilibrium)', en: 'Stage 3: Equilibrium Output', hinglish: 'Stage 3: Final Output' },
              details: { hi: 'स्थायी और मापने योग्य उत्पाद प्राप्त होता है।', en: 'Sustainable measurable product is achieved.', hinglish: 'Final stable output release hota hai.' },
              inputsOutputs: 'Input: मध्यवर्ती -> Output: अंतिम ऊर्जा/उत्पाद',
            },
          ],
        },
        realApplication: {
          everydayUses: {
            hi: ['दैनिक घरेलू उपकरणों एवं तकनीकों में सीधा उपयोग', 'कृषि, स्वास्थ्य एवं पर्यावरण प्रबंधन', 'औद्योगिक उत्पादन एवं ऊर्जा दक्षता'],
            en: ['Direct utility in smart home technology', 'Agriculture, healthcare diagnostics, and climate systems', 'Industrial fabrication and green energy'],
            hinglish: ['Everyday technology aur smartphones me use', 'Medical science aur agriculture me fayda', 'Clean green energy solutions'],
          },
          industryTech: {
            hi: 'आधुनिक चिपसेट, सोलर सेल और बायोमेडिकल उपकरणों का पूरा ढांचा इसी सिद्धांत पर टिका है।',
            en: 'Next-generation semiconductor fabs and solar grids operate on this foundational model.',
            hinglish: 'High-tech industry aur electronics me ye sabse critical concept hai.',
          },
          futureInnovation: {
            hi: 'भविष्य में क्वांटम कंप्यूटिंग और शून्य-उत्सर्जन हरित ऊर्जा में इसका क्रांतिकारी योगदान होगा।',
            en: 'Crucial for future quantum computing and zero-carbon ecological optimization.',
            hinglish: 'Future AI aur clean energy me iska sabse bada role hoga.',
          },
        },
      },
      mermaidInfographic: {
        diagramType: 'flowchart',
        title: {
          hi: `${topicName} 360° वैज्ञानिक इन्फोग्राफिक`,
          en: `${topicName} 360° Visual Blueprint`,
          hinglish: `${topicName} Mermaid Blueprint`,
        },
        diagramCode: `graph TD
    Core["🔬 ${topicName}"] --> P1["1. मूल सिद्धांत (Core Law)"]
    Core --> P2["2. कार्यप्रणाली (Mechanism)"]
    Core --> P3["3. वास्तविक उपयोग (Real Application)"]
    P1 --> S1["नियम व परिभाषा"]
    P2 --> S2["3-स्टेप प्रोसेस"]
    P3 --> S3["उद्योग व तकनीक"]
    style Core fill:#f59e0b,stroke:#b45309,stroke-width:3px,color:#000
    style P1 fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style P2 fill:#065f46,stroke:#10b981,stroke-width:2px,color:#fff
    style P3 fill:#581c87,stroke:#a855f7,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: `${topicName} ${subject} 3D animation visual explanation Hindi`,
        title: {
          hi: `${topicName} - 3D विजुअल सिमुलेशन एवं व्याख्यान`,
          en: `${topicName} - 3D Visual Animation & Lecture`,
          hinglish: `${topicName} Visual 3D Video`,
        },
        recommendedChannels: ['Physics Wallah', 'Khan Academy India', 'NCERT Official', 'Unacademy'],
      },
    };
  }

  if (topicType === 'TYPE_D') {
    // History / Polity / GK / Facts / Timeline
    return {
      topicType: 'TYPE_D',
      typeBadge: meta.typeBadge,
      typeIcon: meta.typeIcon,
      typeLabel: meta.typeLabel,
      tabsConfig,
      typeD_HistoryGK: {
        timelineMermaid: {
          title: {
            hi: `${topicName} - कालक्रम एवं समय चक्र (Gantt/Timeline)`,
            en: `${topicName} - Chronological Timeline`,
            hinglish: `${topicName} Timeline`,
          },
          code: `gantt
    title ${topicName} Chronology
    dateFormat YYYY
    section प्रमुख कालखंड
    पृष्ठभूमि व कारण : 1750, 1850
    मुख्य ऐतिहासिक घटना : 1857, 1947
    संवैधानिक प्रभाव व परिणाम : 1950, 2024`,
          keyMilestones: [
            {
              yearOrEra: 'आरंभिक काल (Genesis)',
              event: { hi: 'पृष्ठभूमि, सामाजिक-राजनीतिक कारण एवं असंतोष का उदय', en: 'Root socio-political causes and genesis', hinglish: 'Background aur shuruaati causes' },
              impact: { hi: 'आंदोलन और वैचारिक क्रांति की नींव पड़ी।', en: 'Laid ground for decisive historic shift.', hinglish: 'Revolution ki neev rakhi gayi.' },
            },
            {
              yearOrEra: 'चरम बिंदु (Climax)',
              event: { hi: 'प्रमुख संघर्ष, संधियां एवं निर्णायक ऐतिहासिक मोड़', en: 'Major confrontation, treaties, and turning point', hinglish: 'Main turning point aur decisive event' },
              impact: { hi: 'सत्ता और शासन संरचना में दूरगामी परिवर्तन हुआ।', en: 'Structural change in governance.', hinglish: 'System me permanent badlav aaya.' },
            },
            {
              yearOrEra: 'वर्तमान प्रभाव (Modern Impact)',
              event: { hi: 'भारतीय संविधान एवं आधुनिक प्रशासनिक व्यवस्था में समावेशन', en: 'Constitutional codification and modern legacy', hinglish: 'Sanvidhan aur modern system me impact' },
              impact: { hi: 'नागरिक अधिकारों और लोकतांत्रिक संस्थाओं को मजबूती मिली।', en: 'Strengthened democratic institutions.', hinglish: 'Democracy aur rights strong hue.' },
            },
          ],
        },
        mnemonicTricks: [
          {
            trickPhrase: 'JITOMNI "FAST-TRICK" Mnemonic',
            meaning: {
              hi: `${topicName} से जुड़े प्रमुख अनुच्छेदों/घटनाओं को क्रम से याद रखने का शॉर्टकट सूत्र`,
              en: 'Shortcut acronym to effortlessly recall sequential articles or milestones',
              hinglish: 'Sequentially yaad rakhne ka master mnemonic',
            },
            breakdown: [
              { letterOrWord: 'F', standsFor: 'Facts & Foundational Treaty (तथ्य व संधि)' },
              { letterOrWord: 'A', standsFor: 'Articles & Administration (प्रमुख अनुच्छेद)' },
              { letterOrWord: 'S', standsFor: 'Struggle & Significance (महत्व व परिणाम)' },
              { letterOrWord: 'T', standsFor: 'Timeline & PYQ Triggers (परीक्षा बिंदु)' },
            ],
          },
        ],
        keyFactsBreakdown: {
          title: {
            hi: `${topicName} के सर्वाधिक पूछे जाने वाले परीक्षा तथ्य (Direct Score Bullets)`,
            en: `High-Yield Exam Facts for ${topicName}`,
            hinglish: `Key Facts & Provisions of ${topicName}`,
          },
          bulletFacts: {
            hi: [
              'परीक्षा में 100% पूछे जाने वाले प्रमुख वर्ष, तिथियां और स्थान',
              'संबंधित संवैधानिक संशोधन अथवा ऐतिहासिक संधियां',
              'न्यायालय के ऐतिहासिक निर्णय (Landmark Judgments) अथवा आयोग की सिफारिशें',
            ],
            en: [
              'High-frequency dates, locations, and key personalities in competitive exams',
              'Governing constitutional amendments, treaties, or gazettes',
              'Landmark judicial precedents or committee recommendations',
            ],
            hinglish: [
              'Direct exam me aane wale dates aur personalities',
              'Key articles aur amendments list',
              'Landmark cases aur historical outcomes',
            ],
          },
          criticalArticlesOrTreaties: [
            { name: 'प्रमुख प्रावधान / संधि', significance: 'प्रशासनिक स्वायत्तता एवं नागरिक सुरक्षा का मुख्य आधार।' },
            { name: 'ऐतिहासिक घोषणा', significance: 'सामाजिक न्याय एवं कानून के शासन की स्थापना।' },
          ],
        },
        examPyqFocus: {
          frequentAreas: ['UPSC Prelims Statement Questions', 'MPPSC 5-Marker Analytical Questions', 'SSC CGL General Awareness MCQs'],
          pyqQuestions: [
            {
              question: {
                hi: `${topicName} के संदर्भ में निम्नलिखित में से कौन सा कथन ऐतिहासिक व संवैधानिक रूप से सत्य है?`,
                en: `With reference to ${topicName}, which statement is historically and legally accurate?`,
                hinglish: `${topicName} ke bare me kaun sa statement correct hai?`,
              },
              options: ['यह लोकतांत्रिक विकेंद्रीकरण और संस्थागत जवाबदेही को सुनिश्चित करता है', 'यह पूरी तरह अप्रभावी रहा', 'इसका कोई कानूनी आधार नहीं है', 'उपरोक्त में से कोई नहीं'],
              correctIndex: 0,
              examTag: 'UPSC / MPPSC PYQ',
              explanation: {
                hi: 'यह ऐतिहासिक घटना आधुनिक भारतीय लोकतांत्रिक ढांचे और विधि के शासन का मुख्य आधार स्तंभ है।',
                en: 'This historical development forms a core pillar of modern constitutional democracy.',
                hinglish: 'Ye modern governance aur constitutional balance ka backbone hai.',
              },
            },
          ],
        },
      },
      mermaidInfographic: {
        diagramType: 'timeline',
        title: {
          hi: `${topicName} ऐतिहासिक टाइमलाइन`,
          en: `${topicName} Timeline Chronology`,
          hinglish: `${topicName} Timeline Chart`,
        },
        diagramCode: `graph LR
    E1["📜 पृष्ठभूमि (Origin)"] --> E2["⚔️ मुख्य घटना (Turning Point)"]
    E2 --> E3["🏛️ संवैधानिक प्रभाव (Constitutional Legacy)"]
    style E1 fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff
    style E2 fill:#991b1b,stroke:#ef4444,stroke-width:2px,color:#fff
    style E3 fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: `${topicName} UPSC MPPSC History Polity explanation Hindi`,
        title: {
          hi: `${topicName} - संपूर्ण ऐतिहासिक व संवैधानिक विश्लेषण`,
          en: `${topicName} - Complete Historic & Polity Analysis`,
          hinglish: `${topicName} UPSC MPPSC Video`,
        },
        recommendedChannels: ['Drishti IAS', 'StudyIQ IAS', 'Unacademy UPSC', 'Next IAS'],
      },
    };
  }

  if (topicType === 'TYPE_E') {
    // Reasoning / Logic & Puzzle
    return {
      topicType: 'TYPE_E',
      typeBadge: meta.typeBadge,
      typeIcon: meta.typeIcon,
      typeLabel: meta.typeLabel,
      tabsConfig,
      typeE_Reasoning: {
        logicRules: {
          title: {
            hi: `${topicName}: 100% सटीक तर्क नियम (Logic Rules)`,
            en: `Rigorous Logic Rules for ${topicName}`,
            hinglish: `${topicName} Logic & Rules`,
          },
          fundamentalRules: [
            {
              ruleNumber: 1,
              rule: {
                hi: 'मानक दिशा चक्र नियम: उत्तर (North) हमेशा ऊपर, दक्षिण (South) नीचे, पूर्व (East) दाईं ओर, पश्चिम (West) बाईं ओर।',
                en: 'Standard Compass Rule: North Up, South Down, East Right, West Left.',
                hinglish: 'North hamesha upar, South niche, East right, West left.',
              },
              exceptionNote: {
                hi: 'दायां (Right) मोड़ हमेशा 90° Clockwise होता है, और बायां (Left) मोड़ 90° Anti-Clockwise होता है।',
                en: 'Right turn is strictly 90° Clockwise; Left turn is strictly 90° Counter-Clockwise.',
                hinglish: 'Right turn = 90° Ghadi ki disha me, Left turn = 90° Ulta.',
              },
            },
            {
              ruleNumber: 2,
              rule: {
                hi: 'पाइथागोरस न्यूनतम दूरी सूत्र: कर्ण² = लंब² + आधार² (H² = P² + B²)',
                en: 'Shortest Displacement: Distance = √(Vertical² + Horizontal²)',
                hinglish: 'Shortest Distance = √(P² + B²)',
              },
            },
          ],
        },
        speedTrick10s: {
          title: {
            hi: 'JITOMNI "Net Displacement" 10-सेकंड शॉर्टकट',
            en: 'JITOMNI Net Displacement 10s Fast Shortcut',
            hinglish: 'JITOMNI 10s Reasoning Trick',
          },
          formulaOrPattern: 'Net North/South = |North - South|  एवं  Net East/West = |East - West|',
          mentalSteps: [
            { hi: 'सभी उत्तर (N) और दक्षिण (S) को आपस में घटाएं।', en: 'Subtract North from South directly.', hinglish: 'North aur South ka difference nikalo.' },
            { hi: 'सभी पूर्व (E) और पश्चिम (W) को आपस में घटाएं।', en: 'Subtract East from West directly.', hinglish: 'East aur West ka difference nikalo.' },
            { hi: 'बचे हुए दो दिशाओं को जोड़कर तुरंत दिशा व दूरी ज्ञात करें!', en: 'Combine remaining two vectors for instant answer!', hinglish: 'Bache hue vectors se 5 second me answer nikalo!' },
          ],
          timeSaved: 'पारंपरिक 90 सेकंड चित्र बनाने से घटकर मात्र 10 सेकंड!',
        },
        mermaidVisualMap: {
          title: {
            hi: `${topicName} - 8-दिशा एवं तर्क मैपिंग`,
            en: `${topicName} - 8-Direction Reasoning Compass`,
            hinglish: `${topicName} Compass Map`,
          },
          visualType: 'compass',
          code: `graph TD
    N["⬆️ उत्तर (North)"] --- Center["📍 प्रारंभिक बिंदु (Origin)"]
    S["⬇️ दक्षिण (South)"] --- Center
    E["➡️ पूर्व (East)"] --- Center
    W["⬅️ पश्चिम (West)"] --- Center
    NE["↗️ उत्तर-पूर्व (NE)"] --- Center
    NW["↖️ उत्तर-पश्चिम (NW)"] --- Center
    SE["↘️ दक्षिण-पूर्व (SE)"] --- Center
    SW["↙️ दक्षिण-पश्चिम (SW)"] --- Center
    style Center fill:#f59e0b,stroke:#b45309,stroke-width:3px,color:#000
    style N fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style S fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style E fill:#065f46,stroke:#10b981,color:#fff
    style W fill:#065f46,stroke:#10b981,color:#fff`,
          explanation: {
            hi: 'यह दिशा चक्र 8 मुख्य दिशाओं और उनके कोणीय संबंधों को स्पष्ट करता है।',
            en: 'Maps full 8-point compass coordinate vectors.',
            hinglish: '8 directions ka standard reference blueprint.',
          },
        },
        practiceDrills5Level: [
          {
            level: 1,
            difficulty: 'Level 1 (Direct)',
            question: {
              hi: 'एक व्यक्ति उत्तर की ओर 10 किमी चलता है, फिर दाएं मुड़कर 10 किमी चलता है। अब वह अपने प्रारंभिक स्थान से किस दिशा में है?',
              en: 'A person walks 10km North, then turns right and walks 10km. In which direction is he from origin?',
              hinglish: 'Person 10km North gaya, fir right mudkar 10km gaya. Direction from origin?',
            },
            options: ['उत्तर-पूर्व (North-East)', 'उत्तर-पश्चिम (North-West)', 'दक्षिण-पूर्व', 'पूर्व'],
            correctIndex: 0,
            speedExplanation: {
              hi: '10 किमी North + 10 किमी East = उत्तर-पूर्व (North-East).',
              en: '10km North + 10km East = North-East.',
              hinglish: 'North + East = North-East in 2 seconds!',
            },
          },
        ],
      },
      mermaidInfographic: {
        diagramType: 'flowchart',
        title: {
          hi: `${topicName} रीजनिंग डिसीजन ट्री`,
          en: `${topicName} Reasoning Logic Tree`,
          hinglish: `${topicName} Decision Flow`,
        },
        diagramCode: `graph TD
    Start["🧩 प्रश्न पढ़ें"] --> Type{"प्रकार पहचानें"}
    Type -->|"दिशा (Direction)"| D["8-दिशा वेक्टर सूत्र लगाएं"]
    Type -->|"दूरी (Distance)"| Dist["पाइथागोरस सूत्र: H = √(P² + B²)"]
    D --> Sol["⚡ 10 सेकंड में उत्तर"]
    Dist --> Sol
    style Start fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style Type fill:#f59e0b,stroke:#b45309,color:#000
    style Sol fill:#065f46,stroke:#10b981,color:#fff`,
      },
      youtubeVideo: {
        searchQuery: `${topicName} Reasoning short tricks for SSC Railway Hindi`,
        title: {
          hi: `${topicName} - रीजनिंग 10 सेकंड सुपर शॉर्टकट वीडियो`,
          en: `${topicName} - 10s Speed Reasoning Tricks`,
          hinglish: `${topicName} Reasoning Video`,
        },
        recommendedChannels: ['Wi-Fi Study', 'Adda247 Reasoning', 'Dear Sir Reasoning', 'Exampur'],
      },
    };
  }

  // TYPE F / Default Competitive
  return {
    topicType: 'TYPE_F',
    typeBadge: meta.typeBadge,
    typeIcon: meta.typeIcon,
    typeLabel: meta.typeLabel,
    tabsConfig,
    typeF_Competitive: {
      pyq10YearTrend: {
        examFrequency: [
          { exam: 'SSC CGL / CHSL', frequency: '2-3 प्रश्न प्रति शिफ्ट', marksWeightage: '4-6 अंक' },
          { exam: 'MP Police / Patwari', frequency: '2 प्रश्न अनिवार्य', marksWeightage: '2-3 अंक' },
          { exam: 'Railway RRB NTPC', frequency: '3 प्रश्न', marksWeightage: '3 अंक' },
          { exam: 'Banking IBPS/SBI', frequency: '1-2 प्रश्न (डीआई में समाहित)', marksWeightage: '2-5 अंक' },
        ],
        trendSummary: {
          hi: 'पिछले 10 वर्षों के रुझान से स्पष्ट है कि इस विषय पर सीधे फॉर्मूले के बजाय भाषा-आधारित ट्रिकी प्रश्न अधिक पूछे जा रहे हैं।',
          en: '10-Year trends indicate a shift from rote formula recall towards multi-statement speed traps.',
          hinglish: 'Last 10 years me is topic se direct trick-based questions ka weightage 40% badha hai.',
        },
        highYieldSubtopics: ['क्रय-विक्रय व बट्टा संबंध', 'समान लाभ व हानि प्रतिशत स्थिति', 'बेईमान दुकानदार ट्रिक्स', 'क्रमिक छूट (Successive Discount)'],
      },
      superShortTrick: {
        trickName: {
          hi: 'JITOMNI 5-सेकंड सुपर फ्रैक्शन व रेशियो शॉर्टकट',
          en: 'JITOMNI 5-Second Fractional Ratio Shortcut',
          hinglish: 'JITOMNI 5s Super Ratio Trick',
        },
        formulaPattern: 'प्रतिशत को सीधे अनुपात (Fraction) में बदलें: 20% लाभ = +1/5 (CP: 5 -> SP: 6)',
        executionMethod: {
          hi: 'कभी भी x या 100 मानकर लंबा समीकरण न बनाएं। प्रतिशत को भिन्न में बदलें और सीधे अनुपात से उत्तर प्राप्त करें।',
          en: 'Convert percentages directly into irreducible fractions; bypass lengthy algebraic equations.',
          hinglish: 'Percentage ko direct fraction me badlo aur ratio se 5 second me answer nikalo.',
        },
        timeComparison: {
          traditionalTime: 'पारंपरिक x-मेथड: 75 सेकंड',
          jitomniTrickTime: 'JITOMNI रेशियो ट्रिक: मात्र 6 सेकंड',
        },
      },
      masterFormulaConcept: {
        formulas: [
          {
            name: { hi: 'मास्टर अनुपात सूत्र', en: 'Master Ratio Formula', hinglish: 'Master Ratio Formula' },
            formula: 'SP = CP × (100 ± Gain/Loss%) / 100',
            whereUsed: { hi: 'जब क्रय मूल्य और लाभ/हानि प्रतिशत ज्ञात हो।', en: 'Used when CP and Profit/Loss% are provided.', hinglish: 'CP aur profit% pata hone par SP nikalna.' },
          },
        ],
        conceptualPillars: ['लागत मूल्य (CP) हमेशा 100% होता है।', 'लाभ/हानि की गणना सदैव CP पर होती है जब तक स्पष्ट रूप से SP न कहा जाए।', 'छूट (Discount) सदैव अंकित मूल्य (Marked Price) पर दी जाती है।'],
      },
      solvedPyqBank: [
        {
          examYear: 'SSC CGL 2023 Tier-1',
          question: {
            hi: 'एक वस्तु को 10% लाभ पर बेचा गया। यदि इसे 20% कम में खरीदा गया होता और 20 रुपये अधिक में बेचा गया होता, तो 40% का लाभ होता। वस्तु का प्रारंभिक क्रय मूल्य ज्ञात कीजिए।',
            en: 'An article is sold at 10% profit. If purchased at 20% less and sold for Rs. 20 more, gain would be 40%. Find original CP.',
            hinglish: 'Ek article 10% profit par becha gaya... original CP kya hai?',
          },
          options: ['रु 1000', 'रु 800', 'रु 1200', 'रु 500'],
          correctIndex: 0,
          normalSolution: {
            hi: 'माना प्रारंभिक CP = 100x -> SP1 = 110x. नया CP2 = 80x -> नया SP2 = 80x × 1.4 = 112x. अंतर 112x - 110x = 2x = 20 -> x = 10 -> CP = 1000.',
            en: 'Let CP = 100x. SP1 = 110x. New CP = 80x. New SP = 80x * 1.40 = 112x. Difference 2x = 20 => CP = 1000.',
            hinglish: 'CP = 100x -> 110x vs 112x -> 2x = 20 -> CP = 1000.',
          },
          jitomniShortcutSolution: {
            hi: 'मेंटल ट्रिक: 110% vs 80% × 1.4 = 112%. अंतर = 2% = 20 रु -> 100% = 1000 रु. (पेन उठाने की जरूरत नहीं!)',
            en: '10s Mental: Difference is 112% - 110% = 2% = Rs 20 => 100% = Rs 1000.',
            hinglish: '2% = 20 Rs -> 100% = 1000 Rs without pen!',
          },
        },
      ],
    },
    mermaidInfographic: {
      diagramType: 'flowchart',
      title: {
        hi: `${topicName} कॉम्पिटिटिव डिसीजन मैट्रिक्स`,
        en: `${topicName} Competitive Matrix`,
        hinglish: `${topicName} Speed Matrix`,
      },
      diagramCode: `graph TD
    A["🏆 ${topicName} प्रश्न"] --> B{"प्रकार"}
    B --> C["⚡ रेशियो ट्रिक (5 Sec)"]
    B --> D["📊 100% बेस फॉर्मूला"]
    C --> E["🎯 100% सटीकता से हल"]
    D --> E
    style A fill:#f59e0b,stroke:#b45309,color:#000
    style C fill:#065f46,stroke:#10b981,color:#fff
    style E fill:#1e3a8a,stroke:#3b82f6,color:#fff`,
    },
    youtubeVideo: {
      searchQuery: `${topicName} SSC CGL Math short trick Wi-Fi Study Hindi`,
      title: {
        hi: `${topicName} - 10 सेकंड सुपर शॉर्टकट PYQ वीडियो`,
        en: `${topicName} - 10s Speed Shortcut Video`,
        hinglish: `${topicName} Shortcut Video`,
      },
      recommendedChannels: ['Wi-Fi Study', 'RBE Revolution', 'Gagan Pratap Maths', 'Aditya Ranjan Talks'],
    },
  };
}
