import { SyllabusSubjectNode, SyllabusChapterNode, SyllabusTreeNode, CompetitiveExam } from '../types';

// Helper to generate 5 topics per chapter with bilingual names
export function createTopics(prefix: string, topicNames: { hi: string; en: string; hinglish?: string }[]): SyllabusTreeNode[] {
  return (topicNames || []).map((t, idx) => {
    const hi = t?.hi || t?.en || 'विषय';
    const en = t?.en || t?.hi || 'Topic';
    const hinglish = t?.hinglish || `${en} (${hi})`;
    return {
      id: `${prefix}-t${idx + 1}`,
      name: {
        hi,
        en,
        hinglish,
      },
      isCovered: false,
    };
  });
}

// --------------------------------------------------------------------------
// 1. CLASS 1 TO 4 (5 Subjects * 10 Chapters * 5 Topics = 1000 Topics Tree)
// --------------------------------------------------------------------------
const class1to4SubjectTemplates = [
  {
    name: { hi: 'हिंदी (रिमझिम / भाषा)', en: 'Hindi (Rimjhim / Bhasha)', hinglish: 'Hindi Language & Stories' },
    icon: '📖',
    chapters: [
      { name: { hi: 'झूला और खेल कूद', en: 'The Swing & Playgrounds' }, topics: ['झूले का आनंद', 'पार्क के साथी', 'कूदना और भागना', 'खुले में खेल', 'कविता का लयबद्ध पाठ'] },
      { name: { hi: 'आम की कहानी व फल ज्ञान', en: 'Story of Mango & Fruits' }, topics: ['मीठा रसीला आम', 'कच्चा व पक्का फल', 'पेड़ों की देखभाल', 'फलों के रंग व स्वाद', 'फल बेचने वाला'] },
      { name: { hi: 'पत्ते ही पत्ते व प्रकृति', en: 'All Kinds of Leaves' }, topics: ['पत्ते का आकार', 'हरा रंग और क्लोरोफिल', 'औषधीय पत्ते', 'पत्ते की छाप कला', 'पतझड़ का मौसम'] },
      { name: { hi: 'पकौड़ी और रसोई का संसार', en: 'Snacks & Kitchen Wonders' }, topics: ['गरम पकौड़ी की खुशबू', 'रसोई के बर्तन', 'साफ-सफाई के नियम', 'संतुलित आहार की महत्ता', 'परिवार के साथ भोजन'] },
      { name: { hi: 'रसोईघर और सब्जियां', en: 'Kitchen & Vegetables' }, topics: ['हरी पत्तेदार सब्जियां', 'गाजर, मूली और कंद', 'विटामिन और पोषण', 'सब्जी उगाना', 'स्वस्थ खानपान की आदतें'] },
      { name: { hi: 'चूहो! म्याऊं सो रही है', en: 'Mice & Cat Tales' }, topics: ['बिल्ली की चालाकी', 'चूहे की होशियारी', 'पंचतंत्र की सीख', 'जानवरों के आवास', 'दोस्ती और सूझबूझ'] },
      { name: { hi: 'बंदर और गिलहरी की मित्रता', en: 'Monkey & Squirrel' }, topics: ['पेड़ पर रहने वाले जीव', 'गिलहरी की पूंछ', 'आपसी सहायता', 'जंगल का वातावरण', 'प्राणियों के प्रति दया'] },
      { name: { hi: 'पतंग और आकाश का भ्रमण', en: 'The Kite & Open Sky' }, topics: ['रंग-बिरंगी पतंग', 'हवा की दिशा', 'मकर संक्रांति पर्व', 'उड़ान का विज्ञान', 'सुरक्षित मांझा व पक्षी सुरक्षा'] },
      { name: { hi: 'गेंद-बल्ला और खेल भावना', en: 'Bat & Ball Sports' }, topics: ['क्रिकेट के नियम', 'टीम भावना व सहयोग', 'शारीरिक व्यायाम', 'हार-जीत को स्वीकारना', 'खेल का मैदान'] },
      { name: { hi: 'सात पूंछ का चूहा व हास्य कथाएं', en: 'Seven-Tailed Mouse' }, topics: ['अनोखी लोककथा', 'दूसरों की बातों में न आना', 'आत्मविश्वास की शक्ति', 'हास्य और विनोद', 'कहानी से नैतिक शिक्षा'] },
    ],
  },
  {
    name: { hi: 'गणित (गणित का जादू)', en: 'Mathematics (Math-Magic)', hinglish: 'Fun Mathematics' },
    icon: '🔢',
    chapters: [
      { name: { hi: 'आकार और स्थान की समझ', en: 'Shapes & Spatial Understanding' }, topics: ['अंदर और बाहर की पहचान', 'छोटा, बड़ा और सबसे बड़ा', 'गोल, चौकोर और तिकोना', 'ऊपर और नीचे की स्थिति', 'वस्तुओं को लुढ़काना और खिसकाना'] },
      { name: { hi: '1 से 9 तक की संख्याएं', en: 'Numbers from 1 to 9' }, topics: ['गिनती और मिलान', 'उंगलियों पर गणना', 'संख्याओं का बढ़ता क्रम', 'शून्य (0) की संकल्पना', 'गिनकर चित्र बनाना'] },
      { name: { hi: 'जोड़ का मूलभूत ज्ञान', en: 'Introduction to Addition' }, topics: ['वस्तुओं को मिलाकर गिनना', 'जोड़ का चिन्ह (+)', 'एक अंकीय जोड़', 'दैनिक जीवन में जोड़', 'मानसिक जोड़ खेल'] },
      { name: { hi: 'घटाव की सहज समझ', en: 'Introduction to Subtraction' }, topics: ['वस्तुओं को हटाना/बांटना', 'घटाव का चिन्ह (-)', 'एक अंकीय घटाव', 'बचे हुए की गिनती', 'जोड़ और घटाव का संबंध'] },
      { name: { hi: '10 से 20 तक की संख्याएं व दहाई', en: 'Numbers 10 to 20 & Tens' }, topics: ['10 का बंडल बनाना', 'इकाई और दहाई की पहचान', 'संख्या पट्टी पर गिनती', 'तुलना (कम, ज्यादा, बराबर)', 'स्थानीय मान की पहली समझ'] },
      { name: { hi: 'समय और दिनचर्या', en: 'Time & Daily Routine' }, topics: ['सुबह, दोपहर और शाम', 'घड़ी के कांटे की पहचान', 'सप्ताह के 7 दिन', 'मौसम और महीने', 'समय प्रबंधन की आदत'] },
      { name: { hi: 'मापन: लंबा, छोटा, भारी, हल्का', en: 'Measurement & Comparison' }, topics: ['हाथ की बालिश्त से नापना', 'कदमों से दूरी नापना', 'तराजू और वजन की तुलना', 'बर्तन की धारिता (Capacity)', 'सटीक मापक फीता परिचय'] },
      { name: { hi: 'संख्याएं 21 से 50 व पैटर्न', en: 'Numbers 21 to 50 & Patterns' }, topics: ['21 से 50 तक क्रमबद्ध गिनती', 'संख्या रेखा पर छलांग', 'रंग और आकृति पैटर्न', 'संख्याओं में सम और विषम', 'मिसिंग नंबर पहेली'] },
      { name: { hi: 'डेटा और सूचना सारणी', en: 'Data Handling for Kids' }, topics: ['पसंदीदा फलों की गिनती', 'तालिका बनाना (Tally Marks)', 'चित्र आलेख (Pictograph)', 'सबसे अधिक और सबसे कम', 'निष्कर्ष निकालना'] },
      { name: { hi: 'पैसे और मुद्रा की समझ', en: 'Money & Currency' }, topics: ['भारतीय सिक्के (₹1, ₹2, ₹5, ₹10)', 'करेंसी नोट की पहचान', 'खरीददारी और भुगतान', 'बचत की गुल्लक', 'सिक्कों का इतिहास'] },
    ],
  },
  {
    name: { hi: 'अंग्रेजी (English Marigold)', en: 'English (Marigold & Grammar)', hinglish: 'English Phonics & Stories' },
    icon: '🔤',
    chapters: [
      { name: { hi: 'Phonics, Alphabet & Sounds', en: 'Phonics & Alphabet Sounds' }, topics: ['Letter A-Z Phonic Sounds', 'Vowels vs Consonants (A, E, I, O, U)', 'Rhyming Words (Cat, Bat, Hat)', 'Sight Words Mastery', 'Uppercase vs Lowercase Writing'] },
      { name: { hi: 'My Family, Home & Myself', en: 'My Family, Home & Myself' }, topics: ['Self Introduction in English', 'Family Members (Father, Mother, Siblings)', 'Rooms in My House', 'Good Morning & Golden Manners', 'My Daily Routine Sentences'] },
      { name: { hi: 'Animals, Birds & Nature', en: 'Animals, Birds & Nature' }, topics: ['Domestic vs Wild Animals', 'Animal Sounds & Homes', 'Common Birds Around Us', 'Flowers and Garden Plants', 'Animal Baby Names (Puppy, Kitten)'] },
      { name: { hi: 'Action Words & Verbs', en: 'Action Words & Verbs' }, topics: ['Everyday Actions (Eat, Play, Sleep, Read)', 'Present Continuous (-ing Words)', 'Body Movement Commands (Jump, Run)', 'Opposite Actions (Open vs Close)', 'Sentence Framing with Actions'] },
      { name: { hi: 'Colors, Shapes & Clothes', en: 'Colors, Shapes & Clothes' }, topics: ['Rainbow Colors & Descriptions', 'Naming Everyday Objects by Shape', 'Summer & Winter Clothes', 'Dressing Up Politeness', 'Color Mixing Magic'] },
      { name: { hi: 'Food, Health & Kitchen', en: 'Food, Health & Kitchen' }, topics: ['Healthy Meals & Fruits Names', 'Table Manners & Dining Phrases', 'Breakfast, Lunch & Dinner', 'Utensils in English', 'Cleanliness Habits'] },
      { name: { hi: 'Transport & Community Helpers', en: 'Transport & Community Helpers' }, topics: ['Vehicles on Land, Water & Air', 'Doctor, Teacher, Police, Postman', 'Traffic Lights (Red, Yellow, Green)', 'Emergency Numbers (112, 108)', 'Road Safety Rules'] },
      { name: { hi: 'Feelings & Social Courtesies', en: 'Feelings & Social Courtesies' }, topics: ['Happy, Sad, Angry, Excited', 'Magic Words: Please, Thank You, Sorry', 'Asking for Permission (May I?)', 'Helping Others & Empathy', 'Expressing Needs Confidently'] },
      { name: { hi: 'Simple Prepositions & Positions', en: 'Simple Prepositions (In, On, Under)' }, topics: ['In, On, Under, Near Concept', 'Above and Below', 'In Front of vs Behind', 'Where is the Ball? Interactive', 'Direction Sentences (Left, Right)'] },
      { name: { hi: 'Short Stories & Dialogue Practice', en: 'Short Stories & Dialogue Practice' }, topics: ['The Thirsty Crow Moral Story', 'The Lion and the Mouse', 'Two Friends Talking Dialogue', 'Classroom Conversation', 'Picture Description Skills'] },
    ],
  },
  {
    name: { hi: 'पर्यावरण अध्ययन (Looking Around / EVS)', en: 'Environmental Studies (EVS)', hinglish: 'Our Environment & Science' },
    icon: '🌱',
    chapters: [
      { name: { hi: 'हमारा शरीर और ज्ञानेंद्रियां', en: 'Our Body & Sense Organs' }, topics: ['5 ज्ञानेंद्रियां (आंख, कान, नाक, जीभ, त्वचा)', 'शारीरिक स्वच्छता व हाथ धोना', 'दांतों की सफाई व देखभाल', 'व्यायाम व विश्राम का महत्व', 'अच्छा स्पर्श और बुरा स्पर्श (Safe Touch)'] },
      { name: { hi: 'पेड़-पौधे और हरियाली', en: 'Plants, Trees & Greenery' }, topics: ['पौधे के भाग (जड़, तना, पत्ती, फूल, फल)', 'पौधों को क्या चाहिए? (धूप, पानी, हवा)', 'पेड़ों से मिलने वाले लाभ', 'तुलसी, नीम और औषधीय पौधे', 'पौधा लगाने का संकल्प'] },
      { name: { hi: 'जीव-जंतुओं की अनोखी दुनिया', en: 'The Animal Kingdom' }, topics: ['पालतू और जंगली जानवर', 'पशु-पक्षियों का भोजन', 'पक्षियों के घोंसले और पंख', 'जलीय जीव और मछलियां', 'कीट-पतंगे और तितलियां'] },
      { name: { hi: 'जल: जीवन की अनमोल बूंद', en: 'Water: The Precious Resource' }, topics: ['पानी के स्रोत (नदी, कुआं, वर्षा)', 'पीने के पानी की स्वच्छता', 'पानी की बर्बादी रोकना', 'वर्षा जल संचयन की महत्ता', 'पानी के तीन रूप (बर्फ, जल, वाष्प)'] },
      { name: { hi: 'हमारा भोजन और पोषण', en: 'Our Food & Nutrition' }, topics: ['अनाज, दालें और सब्जियां', 'दूध और दुग्ध उत्पाद', 'जंक फूड के नुकसान', 'भोजन की बर्बादी रोकना', 'पारंपरिक भारतीय भोजन'] },
      { name: { hi: 'हमारा घर और आस-पड़ोस', en: 'Our Home & Neighborhood' }, topics: ['कच्चा घर व पक्का घर', 'घर की सफाई और कचरा प्रबंधन', 'पड़ोसी और सामाजिक सहयोग', 'डाकघर, बैंक और अस्पताल', 'गांव और शहर का अंतर'] },
      { name: { hi: 'त्योहार, संस्कृति और मेले', en: 'Festivals, Culture & Fairs' }, topics: ['राष्ट्रीय पर्व (15 अगस्त, 26 जनवरी)', 'दीपावली, ईद, होली, क्रिसमस', 'मध्य प्रदेश के लोक उत्सव', 'पारंपरिक वेशभूषा', 'एकता में अनेकता'] },
      { name: { hi: 'ऋतुएं और मौसम चक्र', en: 'Seasons & Weather' }, topics: ['ग्रीष्म ऋतु और लू से बचाव', 'वर्षा ऋतु और इंद्रधनुष', 'शीत ऋतु और गर्म वस्त्र', 'वसंत ऋतु की बहार', 'मौसम के अनुसार फल और फसलें'] },
      { name: { hi: 'यातायात के साधन व सुरक्षा', en: 'Transport & Safety Rules' }, topics: ['सड़क पर चलने के नियम', 'जेब्रा क्रॉसिंग का उपयोग', 'बस, ट्रेन और हवाई जहाज', 'प्रदूषण मुक्त साइकिल', 'सड़क संकेत की पहचान'] },
      { name: { hi: 'प्रकृति संरक्षण व पृथ्वी रक्षा', en: 'Nature Conservation & Earth' }, topics: ['प्लास्टिक का उपयोग बंद करना', 'कूड़ेदान (हरा और नीला) का उपयोग', 'ऊर्जा और बिजली बचाना', 'स्वच्छ भारत अभियान', 'पृथ्वी दिवस का संदेश'] },
    ],
  },
  {
    name: { hi: 'कला, शिल्प एवं सृजन (Arts & Craft)', en: 'Arts, Crafts & Creativity', hinglish: 'Arts & Creative Craft' },
    icon: '🎨',
    chapters: [
      { name: { hi: 'रेखाएं और मूल आकृतियां', en: 'Lines & Fundamental Shapes' }, topics: ['सीधी, तिरछी और घुमावदार रेखाएं', 'सर्कल, स्क्वायर और ट्रायंगल आर्ट', 'पैटर्न और बॉर्डर डिजाइन', 'रंगोली के बुनियादी डिजाइन', 'मुक्त हस्त चित्रकला (Freehand)'] },
      { name: { hi: 'रंगों का संसार व संयोजन', en: 'Color Theory & Blending' }, topics: ['प्राथमिक रंग (लाल, पीला, नीला)', 'द्वितीयक रंग बनाना (हरा, नारंगी, बैंगनी)', 'हल्के और गहरे शेड्स', 'प्राकृतिक रंगों का निर्माण', 'फिंगर प्रिंटिंग आर्ट'] },
      { name: { hi: 'ओरिगामी और कागज शिल्प', en: 'Origami & Paper Crafts' }, topics: ['कागज की नाव और हवाई जहाज', 'कागज का पंखा और फूल', 'मास्क और टोपी बनाना', 'कागज की कतरन से कोलाज', 'ग्रीटिंग कार्ड डिजाइन'] },
      { name: { hi: 'मिट्टी और क्ले मॉडलिंग', en: 'Clay Modeling & Pottery' }, topics: ['मिट्टी गूंथना और आकार देना', 'मिट्टी के फल और सब्जियां', 'दीया और खिलौने बनाना', 'टेराकोटा कला का परिचय', 'पर्यावरण अनुकूल क्ले'] },
      { name: { hi: 'प्रकृति की छाप और प्रिंटिंग', en: 'Nature Leaf & Block Printing' }, topics: ['पत्तियों की छाप से चित्र', 'भिंडी और आलू से ब्लॉक प्रिंटिंग', 'कपड़े पर प्रिंटिंग कला', 'सिक्कों की पेंसिल फ्रॉटेज', 'छाया चित्र (Silhouette)'] },
      { name: { hi: 'कबाड़ से जुगाड़ (Best Out of Waste)', en: 'Best Out of Waste Crafts' }, topics: ['खाली डिब्बों से पेन स्टैंड', 'आइसक्रीम स्टिक से फोटो फ्रेम', 'बोतल के ढक्कन से खिलौने', 'पुराने कपड़ों से थैला', 'पुनर्चक्रण की आदत'] },
      { name: { hi: 'भारतीय लोक कलाएं (Tribal & Folk Art)', en: 'Indian Folk & Tribal Art' }, topics: ['मध्य प्रदेश की गोंड कला (Gond Art)', 'पिथौरा भित्ति चित्रकला', 'वारली कला के सरल रूप', 'मधुबनी कला की सीमा रेखाएं', 'मांडना और अल्पना'] },
      { name: { hi: 'मुखौटे और कठपुतली निर्माण', en: 'Masks & Puppet Making' }, topics: ['जानवरों के फेस मास्क', 'उंगली कठपुतली (Finger Puppet)', 'मोजे से पपेट बनाना', 'कठपुतली का छोटा नाटक', 'आवाज और भाव अभिव्यक्ति'] },
      { name: { hi: 'त्योहारी सजावट और तोरण', en: 'Festive Decor & Toran Making' }, topics: ['कागज की लड़ी और कंदील', 'फूलों की माला और रंगोली', 'राखी और दीया डेकोरेशन', 'विंड चाइम निर्माण', 'पारिवारिक उत्सव सजावट'] },
      { name: { hi: 'डिजिटल कला एवं विजुअल थिंकिंग', en: 'Digital Art & Visual Thinking' }, topics: ['स्क्रीन पर ड्राइंग के मूल टूल', 'आकृतियों से कार्टून बनाना', 'माइंड मैप को रंगों से सजाना', 'भावनाओं को चित्रों में उकेरना', 'अपनी कला का प्रदर्शन'] },
    ],
  },
];

export function generateClass1to4Tree(classLevel: number): SyllabusSubjectNode[] {
  return class1to4SubjectTemplates.map((subj, sIdx) => ({
    id: `c${classLevel}-s${sIdx + 1}`,
    name: subj.name,
    icon: subj.icon,
    chapters: subj.chapters.map((ch, cIdx) => ({
      id: `c${classLevel}-s${sIdx + 1}-ch${cIdx + 1}`,
      name: ch.name,
      topics: createTopics(
        `c${classLevel}-s${sIdx + 1}-ch${cIdx + 1}`,
        ch.topics.map((tName) => ({
          hi: `${tName} (कक्षा ${classLevel})`,
          en: `${tName} (Class ${classLevel})`,
          hinglish: `${tName} - 360° Concept`,
        }))
      ),
    })),
  }));
}

// --------------------------------------------------------------------------
// 2. CLASS 5 TO 8 (6 Subjects: Hindi, English, Sanskrit, Maths, Science, Social Science)
// --------------------------------------------------------------------------
export function generateClass5to8Tree(classLevel: number): SyllabusSubjectNode[] {
  return [
    {
      id: `c${classLevel}-maths`,
      name: { hi: 'गणित (Mathematics)', en: 'Mathematics', hinglish: 'Mathematics & Logic' },
      icon: '📐',
      chapters: [
        { name: { hi: 'पूर्णांक एवं परिमेय संख्याएं', en: 'Integers & Rational Numbers' }, topics: ['पूर्णांकों के जोड़ घटाव', 'संख्या रेखा पर निरूपण', 'परिमेय संख्याओं के गुणधर्म', 'दशमलव और भिन्न तुलना', 'दैनिक जीवन में ऋणात्मक संख्याएं'] },
        { name: { hi: 'सरल समीकरण और बीजगणित', en: 'Simple Equations & Algebra' }, topics: ['चर और अचर की पहचान', 'एक चर वाले रैखिक समीकरण', 'समीकरण हल करने की विधियां', 'इबारती प्रश्न (Word Problems)', 'बीजगणितीय व्यंजक'] },
        { name: { hi: 'रेखाएं, कोण और ज्यामिति', en: 'Lines, Angles & Practical Geometry' }, topics: ['पूरक और संपूरक कोण', 'शीर्षाभिमुख कोण और तिर्यक रेखा', 'त्रिभुज और उसके गुणधर्म', 'पाइथागोरस प्रमेय का अनुप्रयोग', 'परकार से कोण निर्माण'] },
        { name: { hi: 'राशियों की तुलना और प्रतिशत', en: 'Comparing Quantities & Percentage' }, topics: ['अनुपात और समानुपात', 'प्रतिशत की गणना व अनुप्रयोग', 'लाभ और हानि के सूत्र', 'साधारण ब्याज (Simple Interest)', 'छूट और कर (Discount & Tax)'] },
        { name: { hi: 'क्षेत्रमिति (Mensuration): परिमाप व क्षेत्रफल', en: 'Mensuration: Perimeter & Area' }, topics: ['आयत और वर्ग का परिमाप', 'समानांतर चतुर्भुज का क्षेत्रफल', 'वृत्त की परिधि और क्षेत्रफल', 'घन और घनाभ का आयतन', 'व्यावहारिक क्षेत्रमिति सवाल'] },
        { name: { hi: 'घातांक, घात और वर्गमूल', en: 'Exponents, Powers & Square Roots' }, topics: ['घातांक के नियम', 'मानक रूप में बड़ी संख्याएं', 'वर्ग और वर्गमूल ज्ञात करना', 'घन और घनमूल की गणना', 'वैदिक गणित द्वारा त्वरित गणना'] },
        { name: { hi: 'आंकड़ों का प्रबंधन और प्रायिकता', en: 'Data Handling & Probability' }, topics: ['माध्य, माध्यक और बहुलक', 'दण्ड आलेख (Bar Graph)', 'वृत्त आलेख (Pie Chart)', 'प्रायिकता (Probability) की मूल समझ', 'सर्वेक्षण और डेटा विश्लेषण'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-maths-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-maths-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-science`,
      name: { hi: 'विज्ञान (Science & Discovery)', en: 'General Science', hinglish: 'Science & Discovery' },
      icon: '🔬',
      chapters: [
        { name: { hi: 'पादपों व जंतुओं में पोषण', en: 'Nutrition in Plants & Animals' }, topics: ['प्रकाश संश्लेषण (Photosynthesis)', 'विषमपोषी व सहजीवी पोषण', 'मानव पाचन तंत्र (Digestive System)', 'आहार नाल और एंजाइम', 'पौधों में परिवहन'] },
        { name: { hi: 'पदार्थ, अम्ल, क्षारक और लवण', en: 'Acids, Bases & Salts' }, topics: ['अम्ल और क्षार की पहचान', 'प्राकृतिक सूचक (लिटमस, हल्दी)', 'उदासीनीकरण अभिक्रिया (Neutralization)', 'दैनिक जीवन में अम्ल-क्षार', 'रासायनिक परिवर्तन'] },
        { name: { hi: 'गति, बल और दाब', en: 'Motion, Force & Pressure' }, topics: ['दूरी, समय और चाल', 'चाल-समय ग्राफ', 'बल के प्रकार (संपर्क व असंपर्क)', 'घर्षण बल और उसका महत्व', 'वायुमंडलीय दाब'] },
        { name: { hi: 'प्रकाश, छाया और परावर्तन', en: 'Light, Shadows & Reflection' }, topics: ['प्रकाश का ऋजुरेखीय संचरण', 'समतल दर्पण में परावर्तन', 'गोलीय दर्पण (उत्तल व अवतल)', 'लेंस और उनके उपयोग', 'श्वेत प्रकाश और स्पेक्ट्रम'] },
        { name: { hi: 'विद्युत धारा और इसके प्रभाव', en: 'Electric Current & Effects' }, topics: ['विद्युत परिपथ के घटक', 'विद्युत धारा का ऊष्मीय प्रभाव', 'विद्युत फ्यूज की सुरक्षा', 'विद्युत चुंबक (Electromagnet)', 'विद्युत घंटी की कार्यप्रणाली'] },
        { name: { hi: 'कोशिका: संरचना एवं प्रकार्य', en: 'Cell: Structure & Functions' }, topics: ['कोशिका की खोज व सिद्धांत', 'पादप व जंतु कोशिका अंतर', 'कोशिकांग (माइटोकॉन्ड्रिया, केंद्रक)', 'ऊतक (Tissue) का निर्माण', 'सूक्ष्मजीव: मित्र एवं शत्रु'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-sci-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-sci-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-social`,
      name: { hi: 'सामाजिक विज्ञान (Social Science)', en: 'Social Science', hinglish: 'Social Science (History, Geo, Civics)' },
      icon: '🌍',
      chapters: [
        { name: { hi: 'हमारा अतीत व मध्यकालीन भारत', en: 'Our Past & Medieval India' }, topics: ['नए राजा और उनके राज्य', 'दिल्ली सल्तनत का प्रशासन', 'मुगल साम्राज्य का विस्तार', 'स्थापत्य कला और स्मारक', 'भक्ति और सूफी आंदोलन'] },
        { name: { hi: 'हमारा पर्यावरण और पृथ्वी', en: 'Our Environment & Earth Dynamics' }, topics: ['पृथ्वी की आंतरिक संरचना', 'चट्टानें और खनिज', 'वायुमंडल की परतें और पवन', 'महासागरीय जलधाराएं', 'प्राकृतिक वनस्पति एवं वन्य जीवन'] },
        { name: { hi: 'सामाजिक एवं राजनीतिक जीवन (Civics)', en: 'Social & Political Life' }, topics: ['समानता और लोकतंत्र', 'स्वास्थ्य में सरकार की भूमिका', 'राज्य शासन कैसे काम करता है?', 'जेंडर और समाज की रूढ़िवादिता', 'संसदीय व्यवस्था और कानून'] },
        { name: { hi: 'संसाधन एवं विकास (Geography)', en: 'Resources & Development' }, topics: ['प्राकृतिक एवं मानव संसाधन', 'मृदा, जल और भूमि संरक्षण', 'कृषि के प्रकार और मुख्य फसलें', 'खनिज और ऊर्जा संसाधन', 'उद्योग और परिवहन'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-sst-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-sst-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-hindi`,
      name: { hi: 'हिंदी (वसंत / भाषा भारती)', en: 'Hindi (Vasant / Bhasha)', hinglish: 'Hindi Literature & Grammar' },
      icon: '📚',
      chapters: [
        { name: { hi: 'कविताएं और देशप्रेम', en: 'Nationalist Poetry & Lyrics' }, topics: ['वह चिड़िया जो (कविता)', 'हम पंछी उन्मुक्त गगन के', 'पुष्प की अभिलाषा', 'मातृभूमि का वंदन', 'काव्य रस और छंद'] },
        { name: { hi: 'गद्य, संस्मरण और कहानियां', en: 'Prose & Indian Stories' }, topics: ['दादी मां (संस्मरण)', 'हिमालय की बेटियां', 'मिठाईवाला (कहानी)', 'रक्त और हमारा शरीर', 'प्रेमचंद की अमर कहानियां'] },
        { name: { hi: 'व्याकरण: संधि, समास और अलंकार', en: 'Hindi Grammar Mastery' }, topics: ['स्वर और व्यंजन संधि', 'समास के छह भेद', 'उपसर्ग और प्रत्यय', 'अलंकार (अनुप्रास, उपमा, रूपक)', 'मुहावरे और लोकोक्तियां'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-hindi-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-hindi-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-english`,
      name: { hi: 'अंग्रेजी (Honeycomb / Grammar)', en: 'English (Honeycomb & Grammar)', hinglish: 'English Literature & Composition' },
      icon: '📖',
      chapters: [
        { name: { hi: 'Stories & Inspirational Prose', en: 'Stories & Inspirational Prose' }, topics: ['Three Questions by Leo Tolstoy', 'A Gift of Chappals', 'Gopal and the Hilsa Fish', 'The Ashes That Made Trees Bloom', 'Expert Detectives'] },
        { name: { hi: 'English Grammar & Syntax', en: 'English Grammar & Syntax' }, topics: ['Tenses (Present, Past, Future)', 'Active & Passive Voice', 'Direct and Indirect Speech', 'Subject-Verb Agreement', 'Modals and Conditionals'] },
        { name: { hi: 'Writing Skills & Letter Drafting', en: 'Writing Skills & Composition' }, topics: ['Formal and Informal Letter Writing', 'Notice and Diary Entry', 'Paragraph and Essay Writing', 'Comprehension Unseen Passage', 'Story Writing from Prompts'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-eng-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-eng-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-sanskrit`,
      name: { hi: 'संस्कृत (रुचिरा / सुरभि)', en: 'Sanskrit (Ruchira)', hinglish: 'Sanskrit Language & Shlokas' },
      icon: '🕉️',
      chapters: [
        { name: { hi: 'सुभाषितानि एवं नीति श्लोक', en: 'Subhashitani & Moral Shlokas' }, topics: ['सत्यमेव जयते श्लोक', 'विद्या धनं सर्वधनं प्रधानम्', 'मित्रता और सदाचार', 'पर्यावरण रक्षणम् श्लोक', 'संस्कृत उच्चारण शुद्धता'] },
        { name: { hi: 'संस्कृत व्याकरण एवं धातु रूप', en: 'Sanskrit Grammar & Dhatu Roop' }, topics: ['लकार (लट्, लृट्, लङ्, लोट्)', 'शब्द रूप (राम, लता, फल)', 'कारक एवं विभक्ति नियम', 'संख्यावाची शब्दाः (1 से 100)', 'संस्कृत में सरल वाक्य निर्माण'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-sk-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-sk-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ];
}

// --------------------------------------------------------------------------
// 3. CLASS 9 & 10 (Maths, Science [Phy/Chem/Bio], SST [His/Geo/Civ/Eco], Hindi, English)
// --------------------------------------------------------------------------
export function generateClass9to10Tree(classLevel: number): SyllabusSubjectNode[] {
  return [
    {
      id: `c${classLevel}-science`,
      name: { hi: 'विज्ञान (Science - Phy, Chem, Bio)', en: 'Science (Phy, Chem, Bio)', hinglish: 'NCERT Science Core' },
      icon: '⚡',
      chapters: [
        { name: { hi: 'रासायनिक अभिक्रियाएं एवं समीकरण', en: 'Chemical Reactions & Equations' }, topics: ['संयोजन और वियोजन अभिक्रियाएं', 'विस्थापन एवं द्विविस्थापन अभिक्रियाएं', 'उपचयन और अपचयन (Redox)', 'दैनिक जीवन में संक्षारण (Corrosion)', 'विकृतगंधिता (Rancidity)'] },
        { name: { hi: 'अम्ल, क्षारक एवं लवण', en: 'Acids, Bases & Salts' }, topics: ['pH पैमाना और दैनिक जीवन में महत्व', 'सोडियम हाइड्रोक्साइड (Chlor-Alkali)', 'विरंजक चूर्ण (Bleaching Powder)', 'बेकिंग सोडा एवं धावन सोडा', 'प्लास्टर ऑफ पेरिस और जिप्सम'] },
        { name: { hi: 'धातु एवं अधातु', en: 'Metals & Non-metals' }, topics: ['धातुओं के भौतिक व रासायनिक गुण', 'सक्रियता श्रेणी (Reactivity Series)', 'आयनिक यौगिकों का निर्माण', 'धातु निष्कर्षण (Metallurgy)', 'मिश्रधातुएं और जंग से सुरक्षा'] },
        { name: { hi: 'कार्बन एवं उसके यौगिक', en: 'Carbon & its Compounds' }, topics: ['सहसंयोजी आबंध और कार्बन की सर्वतोमुखी प्रकृति', 'समजातीय श्रेणी (Homologous Series)', 'IUPAC नामकरण पद्धति', 'एथेनॉल और एथेनॉइक अम्ल', 'साबुन और अपमार्जक की सफाई क्रिया'] },
        { name: { hi: 'जैव प्रक्रम (Life Processes)', en: 'Life Processes (Biology)' }, topics: ['स्वपोषी एवं विषमपोषी पोषण', 'श्वसन: वायवीय और अवायवीय', 'मानव हृदय और दोहरा परिसंचरण', 'पौधों में जल व भोजन का संवहन', 'वृक्काणु (Nephron) और उत्सर्जन'] },
        { name: { hi: 'नियंत्रण एवं समन्वय', en: 'Control & Coordination' }, topics: ['तंत्रिका तंत्र और न्यूरॉन की संरचना', 'प्रतिवर्ती क्रिया (Reflex Arc)', 'मानव मस्तिष्क के भाग व कार्य', 'पादप हार्मोन (ऑक्सिन, जिबरेलिन)', 'अंतःस्रावी ग्रंथियां और हार्मोन'] },
        { name: { hi: 'जीव जनन कैसे करते हैं?', en: 'How do Organisms Reproduce?' }, topics: ['अलैंगिक जनन (विखंडन, मुकुलन)', 'पुष्प की संरचना और परागण', 'मानव में नर एवं मादा जनन तंत्र', 'निषेचन एवं भ्रूण का विकास', 'प्रजनन स्वास्थ्य और जनसंख्या नियंत्रण'] },
        { name: { hi: 'आनुवंशिकता एवं जैव विकास', en: 'Heredity & Evolution' }, topics: ['मेंडल के वंशागति के नियम', 'एकल व द्विसंकर संकरण (Monohybrid)', 'मानव में लिंग निर्धारण (Sex Determination)', 'डीएनए (DNA) और आनुवंशिक भिन्नताएं', 'जीवाश्म और विकास के प्रमाण'] },
        { name: { hi: 'प्रकाश - परावर्तन तथा अपवर्तन', en: 'Light - Reflection & Refraction' }, topics: ['दर्पण सूत्र और आवर्धन', 'गोलीय दर्पणों द्वारा प्रतिबिंब निर्माण', 'स्नेल का नियम और अपवर्तनांक', 'लेंस सूत्र और लेंस की क्षमता', 'दैनिक जीवन में अपवर्तन की घटनाएं'] },
        { name: { hi: 'मानव नेत्र तथा रंगबिरंगा संसार', en: 'Human Eye & Colorful World' }, topics: ['नेत्र की समंजन क्षमता', 'दृष्टि दोष (निकट, दूर, जरा-दृष्टि) व निवारण', 'कांच के प्रिज्म द्वारा प्रकाश का विक्षेपण', 'वायुमंडलीय अपवर्तन (तारों का टिमटिमाना)', 'प्रकाश का प्रकीर्णन (टिंडल प्रभाव, आकाश का नीला रंग)'] },
        { name: { hi: 'विद्युत (Electricity)', en: 'Electricity' }, topics: ['विद्युत धारा और विभव की परिभाषा', "ओम का नियम (Ohm's Law) और प्रतिरोध", 'प्रतिरोधों का श्रेणीक्रम संयोजन', 'प्रतिरोधों का समानांतर क्रम संयोजन', "जूल का ऊष्मीय नियम व विद्युत शक्ति (P=VI)"] },
        { name: { hi: 'विद्युत धारा के चुंबकीय प्रभाव', en: 'Magnetic Effects of Electric Current' }, topics: ['चुंबकीय क्षेत्र और क्षेत्र रेखाएं', 'दाएं हाथ के अंगूठे का नियम', 'विद्युत मोटर का सिद्धांत', 'विद्युत चुंबकीय प्रेरण (Faraday)', 'घरेलू विद्युत परिपथ और भू-तार'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-sci-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-sci-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-maths`,
      name: { hi: 'गणित (Mathematics)', en: 'Mathematics', hinglish: 'Maths Core' },
      icon: '📐',
      chapters: [
        { name: { hi: 'वास्तविक संख्याएं', en: 'Real Numbers' }, topics: ['यूक्लिड विभाजन प्रमेयिका', 'अंकगणित की आधारभूत प्रमेय', 'अपरिमेय संख्याओं का सत्यापन (√2, √3)', 'दशमलव प्रसार (शांत/अशांत)', 'ल.स. और म.स. का संबंध'] },
        { name: { hi: 'बहुपद (Polynomials)', en: 'Polynomials' }, topics: ['बहुपद के शून्यकों का ज्यामितीय अर्थ', 'शून्यकों और गुणांकों में संबंध', 'द्विघात बहुपद का निर्माण', 'विभाजन एल्गोरिथ्म', 'त्रिघात बहुपद के शून्यक'] },
        { name: { hi: 'दो चर वाले रैखिक समीकरण युग्म', en: 'Pair of Linear Equations in Two Variables' }, topics: ['ग्राफीय विधि से हल', 'प्रतिस्थापन विधि (Substitution)', 'विलोपन विधि (Elimination)', 'वज्र-गुणन विधि', 'समीकरणों में बदले जा सकने वाले समीकरण'] },
        { name: { hi: 'द्विघात समीकरण', en: 'Quadratic Equations' }, topics: ['गुणनखंडन द्वारा द्विघात समीकरण हल', 'पूर्ण वर्ग बनाकर हल करना', 'द्विघाती सूत्र (श्रीधराचार्य सूत्र)', 'विविक्तकर (Discriminant) और मूलों की प्रकृति', 'व्यावहारिक इबारती सवाल'] },
        { name: { hi: 'समानांतर श्रेढ़ी (AP)', en: 'Arithmetic Progressions (AP)' }, topics: ['AP का प्रथम पद और सार्व अंतर', 'AP का nवां पद (an = a + (n-1)d)', 'AP के प्रथम n पदों का योग', 'दैनिक जीवन में AP के उपयोग', 'AP के महत्वपूर्ण सिद्ध प्रश्न'] },
        { name: { hi: 'त्रिकोणमिति का परिचय एवं अनुप्रयोग', en: 'Introduction to Trigonometry & Heights' }, topics: ['त्रिकोणमितीय अनुपात (sin, cos, tan)', 'विशिष्ट कोणों के त्रिकोणमितीय मान', 'त्रिकोणमितीय सर्वसमिकाएं (sin²θ + cos²θ = 1)', 'उन्नयन एवं अवनमन कोण', 'ऊंचाई और दूरी (Heights & Distances)'] },
        { name: { hi: 'निर्देशांक ज्यामिति', en: 'Coordinate Geometry' }, topics: ['दूरी सूत्र (Distance Formula)', 'विभाजन सूत्र (Section Formula)', 'मध्य बिंदु सूत्र', 'त्रिभुज का क्षेत्रफल सूत्र', 'संरेखीय बिंदुओं की जांच'] },
        { name: { hi: 'वृत्त और स्पर्श रेखाएं', en: 'Circles & Tangents' }, topics: ['वृत्त की स्पर्श रेखा की परिभाषा', 'स्पर्श बिंदु पर त्रिज्या का लंब होना', 'बाह्य बिंदु से स्पर्श रेखाओं की लंबाई की समानता', 'वृत्त से संबंधित क्षेत्रफल (त्रिज्यखंड, वृत्तखंड)', 'संयोजित आकृतियों का क्षेत्रफल'] },
        { name: { hi: 'पृष्ठीय क्षेत्रफल और आयतन', en: 'Surface Areas & Volumes' }, topics: ['शंकु, छिन्नक (Frustum) का आयतन', 'गोले और अर्धगोले का संपूर्ण पृष्ठीय क्षेत्रफल', 'ठोसों के संयोजन का पृष्ठीय क्षेत्रफल', 'एक ठोस का दूसरे में रूपांतरण', 'जल प्रवाह और पाइप वाले सवाल'] },
        { name: { hi: 'सांख्यिकी और प्रायिकता', en: 'Statistics & Probability' }, topics: ['प्रत्यक्ष विधि से माध्य', 'कल्पित माध्य विधि (Assumed Mean)', 'बहुलक (Mode) का सूत्र', 'माध्यक (Median) का सूत्र', 'सैद्धांतिक प्रायिकता के प्रश्न'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-maths-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-maths-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-social`,
      name: { hi: 'सामाजिक विज्ञान (Social Science)', en: 'Social Science (His, Geo, Civ, Eco)', hinglish: 'SST 4-Pillars' },
      icon: '🏛️',
      chapters: [
        { name: { hi: 'यूरोप और भारत में राष्ट्रवाद का उदय', en: 'Rise of Nationalism in Europe & India' }, topics: ['फ्रांसीसी क्रांति और राष्ट्र का विचार', 'इटली और जर्मनी का एकीकरण', 'महात्मा गांधी का सत्याग्रह और असहयोग आंदोलन', 'सविनय अवज्ञा आंदोलन और दांडी मार्च', 'सामूहिक अपनेपन का भाव'] },
        { name: { hi: 'संसाधन, वन, जल एवं कृषि', en: 'Resources, Forests, Water & Agriculture' }, topics: ['संसाधनों का नियोजन और वर्गीकरण', 'वन और वन्य जीव संरक्षण (चिपको आंदोलन)', 'बहुउद्देशीय नदी घाटी परियोजनाएं', 'भारतीय कृषि के प्रकार और मुख्य फसलें', 'भूदान-ग्रामदान आंदोलन'] },
        { name: { hi: 'सत्ता की साझेदारी एवं संघवाद', en: 'Power Sharing & Federalism' }, topics: ['बेल्जियम और श्रीलंका की केस स्टडी', 'सत्ता के क्षैतिज व ऊर्ध्वाधर वितरण', 'भारतीय संघवाद की प्रमुख विशेषताएं', 'केंद्र-राज्य संबंध और भाषा नीति', 'भारत में विकेंद्रीकरण (पंचायती राज)'] },
        { name: { hi: 'विकास, भारतीय अर्थव्यवस्था के क्षेत्रक', en: 'Development & Economic Sectors' }, topics: ['प्रति व्यक्ति आय और मानव विकास सूचकांक (HDI)', 'प्राथमिक, द्वितीयक और तृतीयक क्षेत्रक', 'संगठित बनाम असंगठित क्षेत्रक', 'मुद्रा और साख (Formal/Informal Credit)', 'वैश्वीकरण और भारतीय अर्थव्यवस्था'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-sst-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-sst-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ];
}

// --------------------------------------------------------------------------
// 4. CLASS 11 & 12 (Science Streams: PCM, PCB, Commerce, Arts)
// --------------------------------------------------------------------------
export function generateClass11to12Tree(classLevel: number): SyllabusSubjectNode[] {
  return [
    {
      id: `c${classLevel}-phy`,
      name: { hi: 'भौतिकी (Physics)', en: 'Physics', hinglish: 'Physics NCERT' },
      stream: 'Science (PCM/PCB)',
      icon: '⚛️',
      chapters: [
        { name: { hi: 'गति के नियम एवं कार्य ऊर्जा', en: 'Laws of Motion & Work-Energy' }, topics: ["न्यूटन के गति के तीनों नियम", "रेखीय संवेग संरक्षण का नियम", "घर्षण बल और वृत्तीय गति", "कार्य-ऊर्जा प्रमेय (Work-Energy Theorem)", "प्रत्यास्थ और अप्रत्यास्थ संघट्ट (Collisions)"] },
        { name: { hi: 'गुरुत्वाकर्षण एवं द्रव्य के तापीय गुण', en: 'Gravitation & Thermodynamics' }, topics: ["केप्लर के ग्रहीय गति के नियम", "सार्वत्रिक गुरुत्वाकर्षण स्थिरांक (G)", "पलायन वेग (Escape Velocity)", "ऊष्मागतिकी का प्रथम व द्वितीय नियम", "कार्नो इंजन और दक्षता"] },
        { name: { hi: 'विद्युत आवेश, क्षेत्र एवं विभव', en: 'Electrostatics & Potential' }, topics: ["कूलॉम का नियम (Coulomb's Law)", "विद्युत द्विध्रुव और अक्षीय/निरक्षीय क्षेत्र", "गाउस का नियम (Gauss Law) और अनुप्रयोग", "संधारित्र और धारिता (Capacitance)", "परावैद्युत माध्यम का प्रभाव"] },
        { name: { hi: 'धारा विद्युत एवं चुंबकत्व', en: 'Current Electricity & Magnetism' }, topics: ["किरचॉफ के नियम (Kirchhoff's Laws)", "व्हीटस्टोन सेतु और मीटर सेतु", "बायो-सावर्ट का नियम (Biot-Savart Law)", "एम्पीयर का परिपथीय नियम", "चल कुंडली धारामापी (Galvanometer)"] },
        { name: { hi: 'प्रकाशिकी (Ray & Wave Optics)', en: 'Optics (Ray & Wave)' }, topics: ["गोलीय पृष्ठों पर अपवर्तन व लेंस मेकर सूत्र", "प्रिज्म द्वारा विचलन और वर्ण विक्षेपण", "खगोलीय दूरदर्शी और सूक्ष्मदर्शी", "हाइगेंस का तरंग सिद्धांत", "यंग का द्वि-स्लिट प्रयोग (Interference)"] },
        { name: { hi: 'आधुनिक भौतिकी एवं अर्धचालक', en: 'Modern Physics & Semiconductors' }, topics: ["प्रकाश विद्युत प्रभाव (Photoelectric Effect)", "डी-ब्रॉगली तरंगदैर्घ्य (Matter Waves)", "बोर का परमाणु मॉडल", "p-n संधि डायोड और दिष्टकारी (Rectifier)", "लॉजिक गेट्स और सोलर सेल"] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-phy-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-phy-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-chem`,
      name: { hi: 'रसायन विज्ञान (Chemistry)', en: 'Chemistry', hinglish: 'Chemistry Physical/Inorganic/Organic' },
      stream: 'Science (PCM/PCB)',
      icon: '🧪',
      chapters: [
        { name: { hi: 'परमाणु संरचना एवं रासायनिक आबंधन', en: 'Atomic Structure & Chemical Bonding' }, topics: ['क्वांटम संख्याएं और ऑर्बिटल', 'हाइजेनबर्ग का अनिश्चितता सिद्धांत', 'VSEPR सिद्धांत और संकरण (Hybridization)', 'आण्विक कक्षक सिद्धांत (MOT)', 'हाइड्रोजन आबंधन'] },
        { name: { hi: 'विलयन एवं विद्युत रसायन', en: 'Solutions & Electrochemistry' }, topics: ["राउल्ट का नियम (Raoult's Law)", "अणुसंख्य गुणधर्म (Colligative Properties)", "नेर्नस्ट समीकरण (Nernst Equation)", "कोलराउश का नियम (Kohlrausch Law)", "विद्युत रासायनिक सेल और बैटरियां"] },
        { name: { hi: 'रासायनिक बलगतिकी (Chemical Kinetics)', en: 'Chemical Kinetics' }, topics: ['अभिक्रिया की कोटि और आण्विकता', 'शून्य और प्रथम कोटि अभिक्रिया का समाकलित वेग', 'आरहेनियस समीकरण और सक्रियण ऊर्जा', 'संघट्ट सिद्धांत (Collision Theory)', 'उत्प्रेरक का प्रभाव'] },
        { name: { hi: 'd एवं f-ब्लॉक के तत्व व उपसहसंयोजन', en: 'd/f-Block Elements & Coordination Compounds' }, topics: ['संक्रमण तत्वों के सामान्य लक्षण', 'लैंथेनाइड आकुंचन (Lanthanoid Contraction)', "वर्नर का उपसहसंयोजन सिद्धांत", 'क्रिस्टल क्षेत्र सिद्धांत (CFT)', 'उपसहसंयोजक यौगिकों का IUPAC नामकरण'] },
        { name: { hi: 'कार्बनिक रसायन (Organic Chemistry)', en: 'Organic Chemistry & Reaction Mechanisms' }, topics: ["SN1 और SN2 नाभिकरागी प्रतिस्थापन क्रियाविधि", "एल्डिहाइड, कीटोन और कार्बाक्सिलिक अम्ल", "एल्डोल संघनन और कैनिजारो अभिक्रिया", "ऐमीन और डाइएजोनियम लवण", "जैव अणु (कार्बोहाइड्रेट, प्रोटीन, DNA)"] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-chem-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-chem-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-bio`,
      name: { hi: 'जीव विज्ञान (Biology - Botany/Zoology)', en: 'Biology (Botany & Zoology)', hinglish: 'Biology NCERT Core' },
      stream: 'Science (PCB / NEET)',
      icon: '🧬',
      chapters: [
        { name: { hi: 'पादप एवं मानव कार्यिकी', en: 'Plant & Human Physiology' }, topics: ['C3 एवं C4 चक्र (Photosynthesis)', 'श्वसन एवं क्रेब्स चक्र (Krebs Cycle)', 'मानव तंत्रिका तंत्र एवं अंतःस्रावी ग्रंथियां', 'हृदय की कार्यप्रणाली और ECG', 'पाचन एवं अवशोषण क्रियाविधि'] },
        { name: { hi: 'आनुवंशिकी और आणविक आधार', en: 'Genetics & Molecular Basis of Inheritance' }, topics: ['मेंडेलियन वंशागति एवं अपूर्ण प्रभाविता', 'DNA की द्विकुंडली संरचना (Watson-Crick)', 'DNA प्रतिकृतियन (Replication)', 'अनुलेखन (Transcription) एवं अनुवाद (Translation)', 'मानव जीनोम परियोजना (HGP)'] },
        { name: { hi: 'जैव प्रौद्योगिकी (Biotechnology)', en: 'Biotechnology: Principles & Applications' }, topics: ['प्रतिबंधन एंजाइम (Restriction Enzymes)', 'पुनर्योगज DNA तकनीक (rDNA Technology)', 'पीसीआर (PCR) तकनीक', 'Bt-कपास और ट्रांसजेनिक पौधे', 'जीन थेरेपी और इंसुलिन उत्पादन'] },
        { name: { hi: 'पारिस्थितिकी एवं पर्यावरण', en: 'Ecology & Environment' }, topics: ['पारिस्थितिक तंत्र और ऊर्जा प्रवाह', 'जैव विविधता के स्तर और संरक्षण के उपाय', 'रेड डाटा बुक और हॉटस्पॉट्स', 'ग्रीनहाउस प्रभाव और जलवायु परिवर्तन', 'ओजोन क्षरण और रोकथाम'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-bio-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-bio-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-maths`,
      name: { hi: 'गणित (Higher Mathematics)', en: 'Higher Mathematics', hinglish: 'Maths Calculus & Vectors' },
      stream: 'Science (PCM / JEE)',
      icon: '📐',
      chapters: [
        { name: { hi: 'संबंध, फलन एवं आव्यूह', en: 'Relations, Functions, Matrices & Determinants' }, topics: ['संबंधों के प्रकार (स्वतुल्य, सममित, संक्रामक)', 'प्रतिलोम त्रिकोणमितीय फलन (ITF)', 'आव्यूह के प्रकार और गुणन', 'सारणिक के गुणधर्म', 'आव्यूह का व्युत्क्रम और समीकरण निकाय हल'] },
        { name: { hi: 'सांतत्य, अवकलनीयता एवं अवकलज के अनुप्रयोग', en: 'Calculus: Continuity & Differentiation' }, topics: ['सांतत्य एवं अवकलनीयता की जांच', 'श्रृंखला नियम (Chain Rule)', 'उच्चिष्ठ एवं निम्निष्ठ (Maxima & Minima)', 'स्पर्श रेखा और अभिलंब', 'रोले और लैग्रेंज का मध्यमान प्रमेय'] },
        { name: { hi: 'समाकलन एवं अवकल समीकरण', en: 'Integrals & Differential Equations' }, topics: ['प्रतिस्थापन और खंडशः समाकलन (By Parts)', 'निश्चित समाकलनों के गुणधर्म', 'वक्रों के अंतर्गत क्षेत्रफल (Area under Curves)', 'प्रथम कोटि एवं प्रथम घात के अवकल समीकरण', 'रैखिक अवकल समीकरण'] },
        { name: { hi: 'सदिश एवं त्रिविमीय ज्यामिति', en: 'Vectors & 3D Geometry' }, topics: ['सदिशों का अदिश (Dot) एवं सदिश (Cross) गुणनफल', 'अंतरिक्ष में रेखा का समीकरण', 'दो रेखाओं के बीच न्यूनतम दूरी', 'समतल का समीकरण (Equation of Plane)', 'प्रायिकता और बेज़ प्रमेय (Bayes Theorem)'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-maths-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-maths-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-commerce`,
      name: { hi: 'वाणिज्य (Accountancy & Business)', en: 'Commerce & Economics', hinglish: 'Commerce Stream' },
      stream: 'Commerce',
      icon: '💼',
      chapters: [
        { name: { hi: 'लेखाशास्त्र (Accountancy)', en: 'Accountancy & Financial Statements' }, topics: ['साझेदारी फर्म का पुनर्गठन व ख्याति', 'कंपनी में अंशों और ऋणपत्रों का निर्गमन', 'वित्तीय विवरणों का विश्लेषण', 'रोकड़ प्रवाह विवरण (Cash Flow Statement)', 'लेखांकन अनुपात (Ratios)'] },
        { name: { hi: 'व्यवसाय अध्ययन (Business Studies)', en: 'Business Studies & Management' }, topics: ['प्रबंध के सिद्धांत (Fayol & Taylor)', 'नियोजन, संगठन, नियुक्तिकरण', 'निर्देशन और नियंत्रण', 'वित्तीय प्रबंधन और पूंजी संरचना', 'विपणन प्रबंधन और उपभोक्ता संरक्षण'] },
        { name: { hi: 'अर्थशास्त्र (Micro & Macro Economics)', en: 'Economics (Macro & Indian Economy)' }, topics: ['राष्ट्रीय आय की गणना विधियां', 'मुद्रा और बैंकिंग (RBI की मौद्रिक नीति)', 'सरकारी बजट और अर्थव्यवस्था', 'भुगतान संतुलन और विदेशी विनिमय', '1991 के आर्थिक सुधार और नीति आयोग'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-comm-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-comm-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: `c${classLevel}-arts`,
      name: { hi: 'कला / मानविकी (Polity, History, Geo)', en: 'Humanities & Arts', hinglish: 'Arts / Humanities Stream' },
      stream: 'Arts / Humanities',
      icon: '🏛️',
      chapters: [
        { name: { hi: 'राजनीति विज्ञान (Political Science)', en: 'Political Science & Constitution' }, topics: ['भारतीय संविधान का निर्माण और मौलिक अधिकार', 'चुनाव प्रणाली और कार्यपालिका/न्यायपालिका', 'समकालीन विश्व में शीतयुद्ध का दौर', 'अंतर्राष्ट्रीय संगठन (UN और सुरक्षा परिषद)', 'स्वतंत्र भारत में राजनीति और दल प्रणाली'] },
        { name: { hi: 'इतिहास (Themes in Indian History)', en: 'Themes in Indian History' }, topics: ['हड़प्पा सभ्यता (ईंटें, मनके तथा अस्थियां)', 'आरंभिक राज्य और अर्थव्यवस्थाएं (मौर्य साम्राज्य)', 'भक्ति-सूफी परंपराएं और विजयनगर साम्राज्य', '1857 का विद्रोह और राष्ट्रीय आंदोलन', 'संविधान निर्माण की प्रक्रिया'] },
        { name: { hi: 'भूगोल (Physical & Human Geography)', en: 'Physical & Human Geography' }, topics: ['मानव भूगोल की प्रकृति और विषय क्षेत्र', 'विश्व जनसंख्या वितरण, घनत्व और वृद्धि', 'प्राथमिक, द्वितीयक एवं तृतीयक क्रियाएं', 'मानव बस्तियां और नगरीकरण', 'भारत में जल और खनिज संसाधन'] },
      ].map((ch, cIdx) => ({
        id: `c${classLevel}-arts-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`c${classLevel}-arts-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ];
}

// --------------------------------------------------------------------------
// 5. COMPETITIVE EXAMS SYLLABUS TREE (UPSC, MPPSC, SSC, Banking, Railway, NEET, JEE, CUET, NDA, Police, Patwari, CTET)
// --------------------------------------------------------------------------
export const competitiveExamsSyllabusTree: Record<CompetitiveExam, SyllabusSubjectNode[]> = {
  NEET: [
    {
      id: 'neet-bio',
      name: { hi: 'NEET जीव विज्ञान (Botany + Zoology)', en: 'NEET Biology (Botany + Zoology)', hinglish: 'NEET Biology 360 Marks' },
      icon: '🧬',
      chapters: [
        { name: { hi: 'पादप कार्यिकी (Plant Physiology)', en: 'Plant Physiology (Botany)' }, topics: ['Photosynthesis in Higher Plants', 'Respiration in Plants & ATP Yield', 'Plant Growth & Phytohormones', 'Mineral Nutrition in Plants', 'Transport in Plants & Xylem/Phloem'] },
        { name: { hi: 'मानव कार्यिकी (Human Physiology)', en: 'Human Physiology (Zoology)' }, topics: ['Digestion & Absorption Mechanisms', 'Breathing & Gas Exchange Regulation', 'Body Fluids & Double Circulation', 'Excretory Products & Nephron Function', 'Neural Control & Endocrine Coordination'] },
        { name: { hi: 'आनुवंशिकी एवं जैव विकास', en: 'Genetics & Evolutionary Biology' }, topics: ['Mendelian Genetics & Linkage', 'Molecular Basis of Inheritance (DNA/RNA)', 'Gene Expression & Lac Operon', 'Human Genome Project & DNA Fingerprinting', 'Darwinism, Neo-Darwinism & Hardy-Weinberg'] },
        { name: { hi: 'जैव प्रौद्योगिकी एवं पारिस्थितिकी', en: 'Biotechnology & Ecology' }, topics: ['rDNA Technology & Restriction Enzymes', 'Biotechnology Applications (Medicine & Agro)', 'Organisms and Populations (Adaptations)', 'Ecosystem Dynamics & Energy Flow', 'Biodiversity Hotspots & Conservation Strategies'] },
      ].map((ch, cIdx) => ({
        id: `neet-bio-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`neet-bio-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'neet-chem',
      name: { hi: 'NEET रसायन विज्ञान (Physical, Inorganic, Organic)', en: 'NEET Chemistry (Physical, Inorganic, Organic)', hinglish: 'NEET Chemistry 180 Marks' },
      icon: '🧪',
      chapters: [
        { name: { hi: 'Physical Chemistry NEET High Yield', en: 'Physical Chemistry High Yield' }, topics: ['Mole Concept & Stoichiometry Calculations', 'Thermodynamics & Gibbs Free Energy', 'Chemical & Ionic Equilibrium (pH, Buffer)', 'Electrochemistry & Nernst Equation', 'Chemical Kinetics & Arrhenius Equation'] },
        { name: { hi: 'Inorganic Chemistry & Periodic Table', en: 'Inorganic Chemistry & Coordination' }, topics: ['Chemical Bonding & Hybridization (VSEPR)', 'Periodic Trends & Electronic Configuration', 'Coordination Compounds & Crystal Field Theory', 'p-Block & d/f-Block Elements Chemistry', 'Metallurgy Extraction Principles'] },
        { name: { hi: 'Organic Chemistry & Reaction Mechanisms', en: 'Organic Chemistry & Mechanisms' }, topics: ['General Organic Chemistry (Inductive/Resonance)', 'Hydrocarbons & Electrophilic Substitution', 'Haloalkanes & Haloarenes (SN1/SN2)', 'Aldehydes, Ketones & Carboxylic Acids', 'Biomolecules & Polymer Chemistry'] },
      ].map((ch, cIdx) => ({
        id: `neet-chem-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`neet-chem-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'neet-phy',
      name: { hi: 'NEET भौतिकी (Mechanics, Optics, Modern Physics)', en: 'NEET Physics Core', hinglish: 'NEET Physics 180 Marks' },
      icon: '⚛️',
      chapters: [
        { name: { hi: 'Mechanics & Rotational Motion', en: 'Mechanics & Rotational Dynamics' }, topics: ['Kinematics 1D & 2D Projectile Motion', 'Newton Laws of Motion & Friction', 'Work Energy Power & Collisions', 'System of Particles & Moment of Inertia', 'Gravitation & Satellite Motion'] },
        { name: { hi: 'Electrodynamics & Magnetism', en: 'Electrodynamics & Magnetism' }, topics: ['Electrostatics & Gauss Law Applications', 'Capacitors in Series & Parallel', 'Current Electricity & Kirchhoff Rules', 'Magnetic Force on Moving Charges', 'Electromagnetic Induction & AC Circuits'] },
        { name: { hi: 'Optics & Modern Physics', en: 'Optics & Modern Physics' }, topics: ['Ray Optics: Lens Maker Formula & Prism', 'Wave Optics: Interference & Diffraction', 'Dual Nature of Radiation & Matter', 'Atoms & Nuclei Mass Defect', 'Semiconductor Diodes & Logic Gates'] },
      ].map((ch, cIdx) => ({
        id: `neet-phy-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`neet-phy-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  JEE: [
    {
      id: 'jee-maths',
      name: { hi: 'JEE गणित (Mathematics)', en: 'JEE Mathematics', hinglish: 'JEE Advanced Mathematics' },
      icon: '📐',
      chapters: [
        { name: { hi: 'Calculus: Differential & Integral', en: 'Calculus: Differential & Integral' }, topics: ['Limits, Continuity & Differentiability', 'Applications of Derivatives (Maxima/Minima)', 'Definite Integration & Area Under Curves', 'Differential Equations Formations & Solution', 'Functions & Inverse Trigonometric Functions'] },
        { name: { hi: 'Algebra & Coordinate Geometry', en: 'Algebra & Coordinate Geometry' }, topics: ['Complex Numbers & Quadratic Equations', 'Matrices & Determinants Properties', 'Permutations, Combinations & Probability', 'Straight Lines & Circles System', 'Conic Sections: Parabola, Ellipse, Hyperbola'] },
      ].map((ch, cIdx) => ({
        id: `jee-maths-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`jee-maths-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'jee-phy',
      name: { hi: 'JEE भौतिकी (Physics)', en: 'JEE Physics Core', hinglish: 'JEE Physics' },
      icon: '⚛️',
      chapters: [
        { name: { hi: 'Advanced Mechanics & Waves', en: 'Advanced Mechanics & Waves' }, topics: ['Rigid Body Dynamics & Angular Momentum', 'Simple Harmonic Motion & Damped Waves', 'Fluid Mechanics: Bernoulli & Viscosity', 'Thermodynamics & Heat Transfer Cycles', 'Sound Waves & Doppler Effect'] },
        { name: { hi: 'Electromagnetism & Wave Optics', en: 'Electromagnetism & Wave Optics' }, topics: ['Gauss Law & Potential Energy Systems', 'RC & RLC Alternating Current Circuits', 'Electromagnetic Waves & Maxwell Equations', 'Polarization & Resolving Power', 'Nuclear Physics & Binding Energy'] },
      ].map((ch, cIdx) => ({
        id: `jee-phy-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`jee-phy-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'jee-chem',
      name: { hi: 'JEE रसायन विज्ञान (Chemistry)', en: 'JEE Chemistry', hinglish: 'JEE Chemistry Core' },
      icon: '🧪',
      chapters: [
        { name: { hi: 'Physical & Inorganic Chemistry', en: 'Physical & Inorganic Chemistry' }, topics: ['Quantum Mechanics & Orbital Filling', 'Solid State & Liquid Solutions', 'Ionic Equilibrium & Solubility Product', 'Coordination Compounds & Isomerism', 'Transition Metals & Qualitative Analysis'] },
        { name: { hi: 'Organic Chemistry Synthesis', en: 'Organic Chemistry Synthesis' }, topics: ['Reaction Intermediates (Carbocation/Carbanion)', 'Named Reactions (Aldol, Cannizzaro, Grignard)', 'Aromatic Electrophilic Substitution', 'Polymers & Environmental Chemistry', 'Stereochemistry & Optical Activity'] },
      ].map((ch, cIdx) => ({
        id: `jee-chem-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`jee-chem-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  UPSC: [
    {
      id: 'upsc-polity',
      name: { hi: 'भारतीय राजव्यवस्था एवं संविधान (Polity & Governance)', en: 'Indian Polity & Governance', hinglish: 'Polity & Constitution GS2' },
      icon: '⚖️',
      chapters: [
        { name: { hi: 'संवैधानिक ढांचा एवं मूल अधिकार', en: 'Constitutional Framework & Rights' }, topics: ['संविधान की प्रस्तावना (Preamble) का दर्शन', 'मौलिक अधिकार (अनुच्छेद 12-35) का 360° विश्लेषण', 'राज्य के नीति निर्देशक तत्व (DPSP)', 'मूल कर्तव्य एवं संवैधानिक संशोधन (Article 368)', 'मूल संरचना का सिद्धांत (Kesavananda Bharati)'] },
        { name: { hi: 'संसद, कार्यपालिका एवं न्यायपालिका', en: 'Parliament, Executive & Judiciary' }, topics: ['राष्ट्रपति एवं राज्यपाल की शक्तियां', 'संसदीय समितियां एवं विधायी प्रक्रिया', 'उच्चतम न्यायालय एवं न्यायिक समीक्षा (Judicial Review)', 'जनहित याचिका (PIL) और न्यायिक सक्रियता', 'केंद्र-राज्य वित्तीय संबंध एवं वित्त आयोग'] },
      ].map((ch, cIdx) => ({
        id: `upsc-polity-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`upsc-polity-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'upsc-history',
      name: { hi: 'इतिहास एवं कला-संस्कृति (History & Art & Culture)', en: 'History & Art & Culture', hinglish: 'History & Culture GS1' },
      icon: '🏛️',
      chapters: [
        { name: { hi: 'भारतीय कला, स्थापत्य एवं विरासत', en: 'Indian Art & Architecture' }, topics: ['हड़प्पा नगर नियोजन एवं मुहरें', 'मौर्य एवं गुप्तकालीन स्थापत्य कला', 'द्रविड़ एवं नागर मंदिर स्थापत्य', 'शास्त्रीय नृत्य एवं संगीत शैलियां', 'भक्ति एवं सूफी आंदोलन का प्रभाव'] },
        { name: { hi: 'आधुनिक भारत एवं स्वतंत्रता संग्राम', en: 'Modern India & Freedom Movement' }, topics: ['1857 का महासंग्राम एवं ब्रिटिश नीतियां', 'भारतीय राष्ट्रीय कांग्रेस की स्थापना', 'गांधीवादी चरण (असहयोग, सविनय अवज्ञा, भारत छोड़ो)', 'क्रांतिकारी आंदोलन (भगत सिंह, आजाद)', 'स्वतंत्रता एवं रियासतों का एकीकरण'] },
      ].map((ch, cIdx) => ({
        id: `upsc-hist-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`upsc-hist-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'upsc-economy',
      name: { hi: 'भारतीय अर्थव्यवस्था एवं पर्यावरण (Economy & Environment)', en: 'Economy, Environment & Tech', hinglish: 'Economy & Environment GS3' },
      icon: '📈',
      chapters: [
        { name: { hi: 'भारतीय अर्थव्यवस्था एवं राजकोषीय नीति', en: 'Indian Economy & Fiscal Policy' }, topics: ['समावेशी विकास एवं GDP वृद्धि', 'मुद्रास्फीति (Inflation) एवं RBI मौद्रिक नीति', 'GST परिषद एवं राजकोषीय संघवाद', 'कृषि मूल्य नीति (MSP) एवं खाद्य सुरक्षा', 'डिजिटल इंडिया एवं UPI क्रांति'] },
        { name: { hi: 'पर्यावरण, जैव विविधता एवं आपदा प्रबंधन', en: 'Environment & Disaster Management' }, topics: ['जलवायु परिवर्तन (UNFCCC COP लक्ष्य)', 'जैव विविधता हॉटस्पॉट एवं वन्यजीव संरक्षण', 'कार्बन क्रेडिट एवं नवीकरणीय ऊर्जा (Solar/Green Hydrogen)', 'आपदा प्रबंधन तंत्र (NDMA/SDRF)', 'अंतरिक्ष एवं रक्षा प्रौद्योगिकी (ISRO, DRDO)'] },
      ].map((ch, cIdx) => ({
        id: `upsc-eco-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`upsc-eco-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  MPPSC: [
    {
      id: 'mppsc-mp-gk',
      name: { hi: 'मध्य प्रदेश विशेष सामान्य ज्ञान (MP GK & Culture)', en: 'MP GK, History & Culture', hinglish: 'MPPSC MP Special' },
      icon: '🏔️',
      chapters: [
        { name: { hi: 'मध्य प्रदेश का इतिहास व स्वतंत्रता संग्राम', en: 'MP History & Freedom Struggle' }, topics: ['चंदेल, परमार और गोंड राजवंश', 'रानी दुर्गावती एवं रानी अवंतीबाई का बलिदान', 'मध्य प्रदेश के प्रमुख स्वतंत्रता सेनानी', 'मध्य प्रदेश की स्थापत्य कला (खजुराहो, सांची, मांडू)', 'मध्य प्रदेश की प्रमुख जनजातियां (भील, गोंड, बैगा)'] },
        { name: { hi: 'मध्य प्रदेश का भूगोल एवं नदियां', en: 'MP Geography, Rivers & Forests' }, topics: ['नर्मदा नदी तंत्र एवं जलप्रपात', 'सतपुड़ा एवं विंध्याचल पर्वत श्रृंखला', 'कान्हा, बांधवगढ़ व कूनो राष्ट्रीय उद्यान', 'मध्य प्रदेश की जलवायु एवं मिट्टी', 'मध्य प्रदेश में खनिज संपदा (हीरा, तांबा)'] },
      ].map((ch, cIdx) => ({
        id: `mppsc-mp-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`mppsc-mp-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'mppsc-polity',
      name: { hi: 'संवैधानिक व्यवस्था एवं आयोग (MP Governance & Commissions)', en: 'MP Governance & Constitutional Bodies', hinglish: 'MP Governance & Commissions' },
      icon: '📜',
      chapters: [
        { name: { hi: 'संवैधानिक एवं सांविधिक आयोग', en: 'Constitutional & Statutory Commissions' }, topics: ['भारत निर्वाचन आयोग एवं राज्य निर्वाचन आयोग', 'संघ एवं राज्य लोक सेवा आयोग (MPPSC)', 'राष्ट्रीय एवं राज्य मानवाधिकार आयोग', 'महिला आयोग एवं बाल अधिकार संरक्षण आयोग', 'केंद्रीय सतर्कता आयोग (CVC) व लोकायुक्त'] },
      ].map((ch, cIdx) => ({
        id: `mppsc-gov-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`mppsc-gov-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  SSC: [
    {
      id: 'ssc-quant',
      name: { hi: 'मात्रात्मक अभिक्षमता (Quantitative Aptitude)', en: 'Quantitative Aptitude', hinglish: 'SSC Maths Mastery' },
      icon: '📊',
      chapters: [
        { name: { hi: 'अंकगणित एवं संख्या पद्धति', en: 'Arithmetic & Number System' }, topics: ['प्रतिशत, लाभ और हानि (Short Tricks)', 'अनुपात, समानुपात और मिश्रण', 'समय, कार्य और पाइप टंकी', 'समय, चाल और दूरी (ट्रेन/नाव)', 'चक्रवृद्धि एवं साधारण ब्याज'] },
        { name: { hi: 'उन्नत गणित (Advanced Maths for SSC)', en: 'Advanced Maths for SSC' }, topics: ['बीजगणित (Algebraic Identities)', 'त्रिकोणमिति एवं ऊंचाई-दूरी', 'ज्यामिति (Geometry Circles & Triangles)', 'क्षेत्रमिति (2D & 3D Mensuration)', 'डेटा इंटरप्रिटेशन (DI Graphs)'] },
      ].map((ch, cIdx) => ({
        id: `ssc-quant-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`ssc-quant-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'ssc-reasoning',
      name: { hi: 'तार्किक क्षमता (Reasoning Ability)', en: 'General Intelligence & Reasoning', hinglish: 'Reasoning Logic' },
      icon: '🧩',
      chapters: [
        { name: { hi: 'शाब्दिक एवं अशाब्दिक रीजनिंग', en: 'Verbal & Non-Verbal Reasoning' }, topics: ['कोडिंग-डिकोडिंग एवं सादृश्यता', 'रक्त संबंध (Blood Relations)', 'दिशा और दूरी परीक्षण', 'न्याय निगमन (Syllogism)', 'कैलेंडर, घड़ी एवं पासा'] },
      ].map((ch, cIdx) => ({
        id: `ssc-reas-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`ssc-reas-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  Banking: [
    {
      id: 'bank-quant',
      name: { hi: 'बैंकिंग गणित (Banking Quantitative Aptitude)', en: 'Banking Quantitative Aptitude', hinglish: 'Banking Quant Speed' },
      icon: '🏦',
      chapters: [
        { name: { hi: 'Speed Maths & Data Interpretation', en: 'Speed Maths & Data Interpretation' }, topics: ['Simplification & Approximation Tricks', 'Missing & Wrong Number Series', 'Quadratic Equations Comparison (x vs y)', 'Tabular & Radar Data Interpretation', 'Caselet DI & Arithmetic Data Interpretation'] },
      ].map((ch, cIdx) => ({
        id: `bank-quant-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`bank-quant-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
    {
      id: 'bank-reasoning',
      name: { hi: 'बैंकिंग रीजनिंग (Puzzles & Seating)', en: 'Banking Reasoning & Puzzles', hinglish: 'Banking Puzzles' },
      icon: '🧠',
      chapters: [
        { name: { hi: 'High Level Puzzles & Seating Arrangement', en: 'High Level Puzzles & Seating' }, topics: ['Circular & Square Seating (In/Out)', 'Floor, Flat & Box Based Puzzles', 'Inequalities & Coding Inequalities', 'Input-Output Machine Reasoning', 'Critical Reasoning & Statement Assumptions'] },
      ].map((ch, cIdx) => ({
        id: `bank-reas-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`bank-reas-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  Railway: [
    {
      id: 'rly-sci',
      name: { hi: 'रेलवे सामान्य विज्ञान (RRB General Science)', en: 'Railway General Science', hinglish: 'Railway Science CBT' },
      icon: '🚆',
      chapters: [
        { name: { hi: 'भौतिकी एवं रेलवे तकनीकी अनुप्रयोग', en: 'Applied Physics & Technical Science' }, topics: ['विद्युत चुंबकत्व और मोटर प्रणाली', 'कार्य, शक्ति, ऊर्जा और घर्षण', 'तरंग, ध्वनि और डॉपलर प्रभाव', 'प्रकाश और लेंस परावर्तन सूत्र', 'ऑटोमेटिक ट्रेन प्रोटेक्शन (कवच) तकनीक'] },
        { name: { hi: 'रसायन व जीव विज्ञान', en: 'Chemistry & Biology for RRB' }, topics: ['आवर्त सारणी और तत्व वर्गीकरण', 'अम्ल, क्षार और महत्वपूर्ण रासायनिक सूत्र', 'मानव शरीर क्रिया विज्ञान और रोग', 'पादप ऊतक और पोषण', 'विटामिन और उनकी कमी से होने वाले रोग'] },
      ].map((ch, cIdx) => ({
        id: `rly-sci-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`rly-sci-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  CUET: [
    {
      id: 'cuet-gen',
      name: { hi: 'CUET सामान्य परीक्षा (General Test & Domains)', en: 'CUET General Test & Domains', hinglish: 'CUET UG/PG Prep' },
      icon: '🎓',
      chapters: [
        { name: { hi: 'CUET General Test (Current Affairs & Mental Ability)', en: 'CUET General Test' }, topics: ['Current Affairs & National Schemes', 'General Mental Ability & Logical Sequences', 'Numerical Ability & Basic Quant', 'English Reading Comprehension & Vocabulary', 'Domain Subject Quick Revision Framework'] },
      ].map((ch, cIdx) => ({
        id: `cuet-gen-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`cuet-gen-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  NDA: [
    {
      id: 'nda-maths',
      name: { hi: 'NDA गणित एवं सामान्य योग्यता (Maths & GAT)', en: 'NDA Mathematics & GAT', hinglish: 'NDA Defence Exam' },
      icon: '🎖️',
      chapters: [
        { name: { hi: 'NDA Mathematics (Class 11-12 Level)', en: 'NDA Mathematics' }, topics: ['Trigonometric Ratios & Height/Distance', 'Matrices, Determinants & Vector Algebra', 'Differential & Integral Calculus for NDA', 'Probability & Statistics for Defence', 'Analytical Geometry of 2D & 3D'] },
        { name: { hi: 'General Ability Test (GAT) - English & GK', en: 'NDA GAT (English & General Science)' }, topics: ['English Spotting Errors & Idioms', 'Physics: Magnetism, Optics & Mechanics', 'Indian History & National Movement', 'World Geography & Defence Affairs', 'SSB Interview Orientation & Leadership Traits'] },
      ].map((ch, cIdx) => ({
        id: `nda-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`nda-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  'MP Police': [
    {
      id: 'police-gk',
      name: { hi: 'MP पुलिस आरक्षक/SI विशेष (Law, GK & Science)', en: 'MP Police Special GK & Reasoning', hinglish: 'MP Police Prep' },
      icon: '👮',
      chapters: [
        { name: { hi: 'MP पुलिस सामान्य ज्ञान एवं तर्कशक्ति', en: 'MP Police GK & Logical Reasoning' }, topics: ['मध्य प्रदेश पुलिस प्रशासन एवं थाने व्यवस्था', 'भारतीय न्याय संहिता (BNS) की मूल धाराएं', 'मध्य प्रदेश का भूगोल एवं प्रमुख मेले', 'सामान्य विज्ञान एवं अंकगणित ट्रिक्स', 'मानसिक अभिरुचि एवं कानून व्यवस्था'] },
      ].map((ch, cIdx) => ({
        id: `pol-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`pol-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  Patwari: [
    {
      id: 'patwari-rural',
      name: { hi: 'पटवारी ग्रामीण अर्थव्यवस्था व भू-राजस्व', en: 'Patwari Rural Economy & Land Records', hinglish: 'Patwari Special' },
      icon: '🌾',
      chapters: [
        { name: { hi: 'पंचायती राज, खसरा-खतौनी एवं ग्रामीण विकास', en: 'Panchayati Raj & Land Records' }, topics: ['73वां संविधान संशोधन एवं त्रिस्तरीय पंचायत', 'खसरा, खतौनी और नक्शा सीमांकन', 'मध्य प्रदेश भू-राजस्व संहिता (LRC)', 'कृषि योजनाएं एवं फसल बीमा', 'कंप्यूटर जागरूकता एवं ई-गवर्नेंस'] },
      ].map((ch, cIdx) => ({
        id: `pat-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`pat-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  Teacher: [
    {
      id: 'teacher-pedagogy',
      name: { hi: 'शिक्षक भर्ती एवं बाल विकास (Pedagogy & CDP)', en: 'Teacher CDP & Educational Psychology', hinglish: 'Teacher Pedagogy' },
      icon: '👩‍🏫',
      chapters: [
        { name: { hi: 'बाल विकास, मनोविज्ञान एवं शिक्षण शास्त्र', en: 'Child Development & Learning Theories' }, topics: ['जीन पियाजे, कोहलबर्ग और वाइगोत्स्की सिद्धांत', 'समावेशी शिक्षा एवं विशेष आवश्यकता वाले बच्चे', 'राष्ट्रीय शिक्षा नीति (NEP 2020) के प्रमुख लक्ष्य', 'सतत एवं व्यापक मूल्यांकन (CCE)', 'शिक्षण विधियां एवं पाठ योजना (Lesson Plan)'] },
      ].map((ch, cIdx) => ({
        id: `tch-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`tch-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
  CTET: [
    {
      id: 'ctet-pedagogy',
      name: { hi: 'CTET बाल विकास एवं शिक्षण शास्त्र', en: 'CTET Child Development & Pedagogy', hinglish: 'CTET Central Exam' },
      icon: '📝',
      chapters: [
        { name: { hi: 'CTET Paper 1 & 2 Core Pedagogy', en: 'CTET Core Pedagogy' }, topics: ['Child Development & Socialization Process', 'Concepts of Child-Centered & Progressive Education', 'Language & Thought (Chomsky / Vygotsky)', 'Diagnostic & Remedial Teaching Strategies', 'EVS & Mathematics Pedagogy for Primary'] },
      ].map((ch, cIdx) => ({
        id: `ctet-ch${cIdx + 1}`,
        name: ch.name,
        topics: createTopics(`ctet-ch${cIdx + 1}`, ch.topics.map((t) => ({ hi: t, en: t }))),
      })),
    },
  ],
};

// Global accessor helper for all classes & exams
export function getSyllabusTreeForClass(classLevel: number): SyllabusSubjectNode[] {
  if (classLevel >= 1 && classLevel <= 4) {
    return generateClass1to4Tree(classLevel);
  } else if (classLevel >= 5 && classLevel <= 8) {
    return generateClass5to8Tree(classLevel);
  } else if (classLevel >= 9 && classLevel <= 10) {
    return generateClass9to10Tree(classLevel);
  } else {
    return generateClass11to12Tree(classLevel);
  }
}

export function getSyllabusTreeForExam(exam: CompetitiveExam): SyllabusSubjectNode[] {
  return competitiveExamsSyllabusTree[exam] || competitiveExamsSyllabusTree['UPSC'];
}

// Flat list of all uncovered candidate topics across the entire syllabus tree
export function getAllSyllabusCandidateTopics(): {
  name: string;
  subject: string;
  chapter: string;
  classLevel?: number;
  examType?: CompetitiveExam;
  category: string;
}[] {
  const candidates: {
    name: string;
    subject: string;
    chapter: string;
    classLevel?: number;
    examType?: CompetitiveExam;
    category: string;
  }[] = [];

  // Sample from all classes
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((cls) => {
    const subjects = getSyllabusTreeForClass(cls);
    subjects.forEach((subj) => {
      subj.chapters.forEach((ch) => {
        ch.topics.forEach((t) => {
          candidates.push({
            name: t.name.en,
            subject: subj.name.en,
            chapter: ch.name.en,
            classLevel: cls,
            category: `Class ${cls}`,
          });
        });
      });
    });
  });

  // Sample from all competitive exams
  const exams: CompetitiveExam[] = ['NEET', 'JEE', 'UPSC', 'MPPSC', 'SSC', 'Banking', 'Railway', 'CUET', 'NDA', 'MP Police', 'Patwari', 'Teacher', 'CTET'];
  exams.forEach((ex) => {
    const subjects = getSyllabusTreeForExam(ex);
    subjects.forEach((subj) => {
      subj.chapters.forEach((ch) => {
        ch.topics.forEach((t) => {
          candidates.push({
            name: t.name.en,
            subject: subj.name.en,
            chapter: ch.name.en,
            examType: ex,
            category: ex,
          });
        });
      });
    });
  });

  return candidates;
}
