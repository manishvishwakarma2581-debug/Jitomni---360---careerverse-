import { AgriSubject, GlobalAgriTech, CropDiseaseItem } from '../types';

export const AGRI_SUBJECTS: AgriSubject[] = [
  {
    id: 'agronomy',
    name: {
      hi: 'सस्य विज्ञान एवं फसल कार्यिकी (Agronomy & Crop Physiology)',
      en: 'Agronomy & Crop Physiology',
      hinglish: 'Agronomy & Crop Physiology (Fasal Vigyan)',
    },
    code: 'AGRON-101',
    icon: '🌾',
    badge: 'Core ICAR Pillar',
    description: {
      hi: 'फसल उत्पादन के सिद्धांत, मौसम विज्ञान, जल प्रबंधन, खरपतवार नियंत्रण एवं फसल कार्यिकी की 360° समझ।',
      en: 'Principles of crop production, agrometeorology, irrigation science, weed management, and photosynthetic efficiency.',
      hinglish: 'Crop production ke core principles, water management, weed control aur photosynthesis mechanisms.',
    },
    chaptersCount: 6,
    icarWeightage: '28% ICAR / NABARD / JRF',
    chapters: [
      {
        id: 'agron-ch1',
        title: {
          hi: 'अध्याय 1: सघन धान प्रणाली (SRI) एवं डायरेक्ट सीडेड राइस (DSR)',
          en: 'Chapter 1: System of Rice Intensification (SRI) & Direct Seeded Rice (DSR)',
          hinglish: 'Chapter 1: SRI System & Direct Seeded Rice (DSR)',
        },
        keyConcepts: ['SRI 25x25cm Spacing', '8-12 Day Old Seedlings', 'Cono-Weeder Aeration', '40% Water Saving', 'Methane Emission Reduction'],
        framework360: {
          what: {
            hi: 'धान की ऐसी उन्नत खेती जिसमें पारंपरिक जल-भराव के बजाय 8-12 दिन की एक-एक पौध को 25x25 सेमी की दूरी पर चौकोर रोपा जाता है।',
            en: 'SRI is an agro-ecological methodology for rice farming that uses single young seedlings (8-12 days) with wide square spacing and intermittent wetting.',
            hinglish: 'Dhan ki aisi scientific technique jisme 8-12 din ki single seedling ko 25x25 cm ki square spacing me ropte hain.',
          },
          why: {
            hi: 'पारंपरिक धान में 1 किलो चावल के लिए 3000-5000 लीटर पानी लगता है। SRI में 40% पानी बचता है और 30-50% उपज बढ़ती है।',
            en: 'Traditional flooded paddy consumes 3000-5000L water/kg grain. SRI slashes water use by 40%, cuts seed requirement by 85%, and hikes yields by 30-50%.',
            hinglish: 'Traditional paddy me bohot paani waste hota hai. SRI 40% water bachaata hai aur yield 30-50% badha deta hai.',
          },
          how: {
            hi: 'कोनो-वीडर द्वारा खेत में 10 दिन के अंतराल पर 4 बार निराई की जाती है जिससे जड़ों को ऑक्सीजन मिलती है और टिलरिंग (कल्ले) 50-80 तक पहुंचते हैं।',
            en: 'Roots stay aerobic via intermittent drying and mechanical cono-weeder churning, stimulating root biomass, microbial nitrogen fixation, and 50-80 tillers/hill.',
            hinglish: 'Cono-weeder se aeration hota hai jisse roots ko oxygen milti hai aur ek paudhe me 50-80 tillers aate hain.',
          },
          application: {
            hi: 'भारत के शुष्क व अर्ध-शुष्क क्षेत्रों, भूजल संकट वाले राज्यों (पंजाब, हरियाणा, तमिलनाडु) में क्रांतिकारी परिणाम।',
            en: 'Critical adoption across water-stressed regions of Punjab, Telangana, Tamil Nadu, and rainfed Eastern India belts.',
            hinglish: 'Water scarcity wale areas jaise Punjab, Haryana, Tamil Nadu me groundwater bachane ke liye use hota hai.',
          },
          challenges: {
            hi: 'शुरुआत में अधिक मजदूरी, खेत का सटीक समतलीकरण (लेजर लैंड लेवलिंग) की अनिवार्यता और खरपतवार की प्रारंभिक चुनौती।',
            en: 'High initial labor for precise planting, weed competition before canopy closure, and strict laser land leveling necessity.',
            hinglish: 'Initial labor lagti hai aur laser leveling ki zarurat hoti hai.',
          },
          solutionFuture: {
            hi: 'AI-गाइडेड ऑटोनॉमस ट्रांसप्लांटर्स, DSR सीड ड्रिल विथ प्री-इमर्जेंस हर्बीसाइड सेंसर और सैटेलाइट सॉइल मॉइश्चर शेड्यूलिंग।',
            en: 'AI-guided robotic transplanters with micro-camera depth sensors, Beidou RTK-guided DSR seed drills, and IoT soil tensiometer smart fertigation.',
            hinglish: 'AI drones and auto-transplanters se labor zero ho jayegi aur exact soil moisture maintain hoga.',
          },
        },
        aiCaseStudy: 'China & Punjab DSR Drone-Seeding Pilot: 38% water cut with zero yield drop.',
        globalBenchmark: 'China Beidou RTK Autonomous Rice Transplanter vs Traditional Flooding.',
      },
      {
        id: 'agron-ch2',
        title: {
          hi: 'अध्याय 2: नैनो यूरिया, नैनो डीएपी एवं फोलियर न्यूट्रिशन साइंस',
          en: 'Chapter 2: Nano Urea, Nano DAP & Foliar Nutrient Dynamics',
          hinglish: 'Chapter 2: Nano Urea, Nano DAP & Foliar Spray Technology',
        },
        keyConcepts: ['20-50nm Particle Size', '80%+ Nutrient Use Efficiency (NUE)', 'Stomatal Penetration', 'Soil Acidification Prevention', 'Zero Nitrogen Leaching'],
        framework360: {
          what: {
            hi: 'पारंपरिक 45 किग्रा यूरिया की बोरी के स्थान पर 500 मिली नैनो तरल यूरिया जिसमें 4% नैनो-स्केल (20-50nm) नाइट्रोजन कण होते हैं।',
            en: 'Liquid nanotechnology-engineered fertilizer formulation containing 4% atomic nitrogen particles (20-50nm) directly sprayed onto crop canopy.',
            hinglish: '45kg ke heavy urea bag ki jagah 500ml liquid nano bottle jo seedha leaves ke stomata me absorb hoti hai.',
          },
          why: {
            hi: 'पारंपरिक दानेदार यूरिया की दक्षता केवल 30-35% होती है (65% जमीन में घुलकर भूजल प्रदूषित करता है)। नैनो यूरिया की दक्षता 80-90% है।',
            en: 'Granular urea suffers 65-70% losses via volatilization and nitrate leaching. Nano-urea achieves >80% absorption directly through plant stomata.',
            hinglish: 'Normal urea ka 65% zameen me behta hai. Nano urea 85%+ plant me absorb hota hai aur soil acidify nahi hoti.',
          },
          how: {
            hi: 'पौधे की पत्तियों के रंध्रों (स्टोमेटा) और प्लास्मोडेस्माटा के माध्यम से सीधे कोशिकाओं में प्रवेश कर फोटोसिंथेसिस को तेज करता है।',
            en: 'Penetrates through leaf stomatal pores and hydrophilic channels, directly assimilating inside chloroplasts via phloem translocation.',
            hinglish: 'Leaves ke microscopic pores (stomata) se direct andar jaake cell division aur chlorophyll badhata hai.',
          },
          application: {
            hi: 'गेहूं, धान, मक्का, कपास और सब्जियों में वानस्पतिक वृद्धि (Vegetative Stage) और कल्ले फूटने के समय 2-4 मिली/लीटर पानी का स्प्रे।',
            en: 'Foliar application at tillering and pre-flowering stages across cereals, pulses, and high-value cash crops.',
            hinglish: 'Wheat, Paddy, Cotton aur Sabjiyo me 2-4 ml/L dose me drone ya sprayer se spray kiya jata hai.',
          },
          challenges: {
            hi: 'किसानों की पुरानी दानेदार यूरिया पर निर्भरता, सही समय पर पत्तियों के गीले होने पर स्प्रे न कर पाना और हार्ड वॉटर का प्रभाव।',
            en: 'Farmer mindset inertia for green bulk bags, spray drift in high winds, and hard water incompatibility causing flocculation.',
            hinglish: 'Farmers ko dhabbe dar urea ki aadat hai aur hard water me mix karne me careful rehna padta hai.',
          },
          solutionFuture: {
            hi: 'AI एग्रीकल्चरल ड्रोन (DJI T50 / XAG) जो सेंट्रीफ्यूगल नोजल से 50-100 माइक्रोन की बूंदों में 100% एकसमान छिड़काव करते हैं।',
            en: 'AgTech drone swarms using ultrasonic droplet sensors to auto-calibrate micron size according to leaf canopy density and humidity.',
            hinglish: 'Smart Spraying Drones NDVI map scan karke sirf wahi spray karte hain jahan kami hoti hai.',
          },
        },
      },
    ],
  },
  {
    id: 'soil_science',
    name: {
      hi: 'मृदा विज्ञान एवं पादप पोषण (Soil Science & Plant Nutrition)',
      en: 'Soil Science & Plant Nutrition',
      hinglish: 'Soil Science & Plant Nutrition (Mitti Vigyan)',
    },
    code: 'SOIL-201',
    icon: '🧪',
    badge: 'Analytical Lab Core',
    description: {
      hi: 'मृदा भौतिकी, रासायनिक संतुलन (pH/EC), सूक्ष्म जीव विज्ञान, बायोचार, कार्बन चक्र और सटीक उर्वरक संस्तुतियां।',
      en: 'Soil pedology, cation exchange capacity (CEC), rhizosphere microbiome, biochar carbon sequestration, and precision fertigation.',
      hinglish: 'Soil pH, EC, Organic Carbon, Micro-nutrients testing aur balanced fertilizer calculations.',
    },
    chaptersCount: 5,
    icarWeightage: '22% ICAR Exam Weightage',
    chapters: [
      {
        id: 'soil-ch1',
        title: {
          hi: 'अध्याय 1: मृदा स्वास्थ्य कार्ड, सीएसी (CEC) एवं लवण-क्षार सुधार',
          en: 'Chapter 1: Soil Health Card, Cation Exchange Capacity (CEC) & Saline-Alkali Reclamation',
          hinglish: 'Chapter 1: Soil Health Card, pH/EC Balance & Usar Sudhar',
        },
        keyConcepts: ['Cation Exchange Capacity (CEC)', 'Soil pH (6.5-7.5 Ideal)', 'Gypsum Requirement (GR)', 'Pyrite Application', 'Organic Carbon (SOC > 0.75%)'],
        framework360: {
          what: {
            hi: 'मिट्टी की 12 आवश्यक पोषक तत्वों (N, P, K, S, Zn, Fe, Cu, Mn, B, pH, EC, OC) की जांच और क्षारीय मृदा को जिप्सम से उपजाऊ बनाना।',
            en: 'Comprehensive diagnostic protocol testing 12 critical chemical parameters and deploying calcium sulfate (gypsum) to displace exchangeable sodium.',
            hinglish: 'Soil ke 12 parameters ki laboratory testing aur usar/khari mitti ko gypsum daal kar theek karna.',
          },
          why: {
            hi: 'भारत में 6.74 मिलियन हेक्टेयर भूमि लवणीय/क्षारीय है। अत्यधिक रसायनों से ऑर्गेनिक कार्बन 0.3% तक गिर चुका है (होना चाहिए > 0.75%)।',
            en: 'Over 6.74 million ha in India is degraded salt-affected soil. Chemical overuse collapsed SOC below 0.35%, crippling nutrient uptake.',
            hinglish: 'India me lakho hectare zameen banjar ho rahi hai. Carbon gir gaya hai jisse khad kaam nahi karti.',
          },
          how: {
            hi: 'क्षारीय मिट्टी में जिप्सम (CaSO4) डालते हैं; Ca++ आयन मिट्टी से Na+ आयन को विस्थापित कर लीचिंग द्वारा बाहर निकाल देते हैं।',
            en: 'Gypsum supplies soluble Ca2+ that exchanges with Na+ on colloidal clay surfaces, forming soluble Na2SO4 that leaches down with drainage.',
            hinglish: 'Gypsum ka Calcium mitti ke Sodium ko replace karke paani ke sath zameen ke niche baha deta hai.',
          },
          application: {
            hi: 'उत्तर प्रदेश (ऊसर सुधार), हरियाणा, पंजाब और गुजरात के तटीय लवणीय क्षेत्रों में बंपर पैदावार की पुनर्बहाली।',
            en: 'Massive land reclamation drives across Gangetic plains, canal-irrigated black soils, and coastal Gujarat.',
            hinglish: 'UP, Haryana aur Punjab ke banjar kheto ko fir se green karne me.',
          },
          challenges: {
            hi: 'पारंपरिक मृदा परीक्षण में 15 दिन की देरी, लैब्स की दूरी और किसानों द्वारा केवल यूरिया डालने की आदत।',
            en: '15-day laboratory turnaround lag, logistics barriers for soil samples, and non-compliance with balanced NPK ratios.',
            hinglish: 'Soil lab dur hona aur report aane me bohot time lagna.',
          },
          solutionFuture: {
            hi: 'NIR स्पेक्ट्रोस्कोपी आधारित हैंडहेल्ड IoT सॉइल प्रोब जो 90 सेकंड में बिना किसी केमिकल के सटीक NPK और कार्बन रिपोर्ट फोन पर देता है।',
            en: 'Near-Infrared (NIR) optical spectrometer probes providing instant 90-second electrochemical soil profiling synced to cloud AI.',
            hinglish: 'Handheld NIR laser sensor jo 1 minute me live mobile par NPK aur pH bata deta hai.',
          },
        },
      },
    ],
  },
  {
    id: 'horticulture_protected',
    name: {
      hi: 'उद्यानिकी एवं संरक्षित खेती (Horticulture & Protected Cultivation)',
      en: 'Horticulture & Protected Cultivation',
      hinglish: 'Horticulture & Polyhouse Protected Farming',
    },
    code: 'HORT-301',
    icon: '🍓',
    badge: 'High-Value Commercial Ag',
    description: {
      hi: 'पॉलीहाउस, हाइड्रोपोनिक्स, वर्टिकल फार्मिंग, डच बकेट सिस्टम, उच्च घनत्व बागवानी (HDP) एवं निर्यात-गुणवत्ता उत्पादन।',
      en: 'Naturally ventilated polyhouses, climate-controlled greenhouses, vertical towers, Dutch bucket systems, and high-density orchards.',
      hinglish: 'Polyhouse, Hydroponics, Vertical Farming, Dutch Buckets aur export quality sabzi/phool production.',
    },
    chaptersCount: 6,
    icarWeightage: '20% ICAR / Agribusiness',
    chapters: [
      {
        id: 'hort-ch1',
        title: {
          hi: 'अध्याय 1: जलवायु-नियंत्रित पॉलीहाउस एवं डच बकेट हाइड्रोपोनिक्स',
          en: 'Chapter 1: Climate-Controlled Polyhouses & Dutch Bucket Hydroponics',
          hinglish: 'Chapter 1: Polyhouse & Dutch Bucket Hydroponics Mastery',
        },
        keyConcepts: ['Dutch Bucket System', 'Cocopeat + Perlite 70:30', 'EC 1.8-2.5 mS/cm', 'pH 5.8-6.2', 'VPD (Vapor Pressure Deficit) Control'],
        framework360: {
          what: {
            hi: 'मिट्टी-रहित माध्यम (कोकोपीट + परलाइट) में ड्रिप-फर्टिगेशन द्वारा नियंत्रित तापमान और आर्द्रता में रंगीन शिमला मिर्च, चेरी टमाटर और खीरे का उत्पादन।',
            en: 'Soil-less substrate cultivation utilizing inert media (70% cocopeat + 30% perlite) with automated recirculating nutrient drip loops.',
            hinglish: 'Bina mitti ke cocopeat buckets me sensor-driven nutrient paani dekar exotic vegetables ugana.',
          },
          why: {
            hi: 'खुले खेत की तुलना में 5 से 8 गुना अधिक उत्पादन (प्रति एकड़ 40-60 टन), 90% कम कीटनाशक और ऑफ-सीजन में 3 गुना अधिक बाजार भाव।',
            en: 'Yields 5-8x open field capacity, eliminates soil-borne nematodes, cuts water by 85%, and captures premium off-season pricing.',
            hinglish: 'Open field se 6 guna zyada yield aur off-season me ₹80-120/kg ka high rate milta hai.',
          },
          how: {
            hi: 'सेंसर आधारित ऑटोमेशन: फॉगर्स और फैन-पैड सिस्टम से तापमान 24-28°C और VPD 0.8-1.2 kPa पर स्थिर रखा जाता है।',
            en: 'IoT sensor mesh coordinates cooling evaporative pads, shade nets, and micro-dosers to maintain optimal canopy VPD and nutrient EC.',
            hinglish: 'Sensors se fan-pad aur foggers automatic chalte hain jisse garmi me bhi andar thandak rehti hai.',
          },
          application: {
            hi: 'मेट्रो शहरों (मुंबई, दिल्ली, बेंगलुरु) के आसपास पेरी-अर्बन फार्मिंग, एक्सपोर्ट हॉर्टिकल्चर और एग्री-स्टार्टअप्स में सर्वाधिक सफल।',
            en: 'Peri-urban belts around Tier-1 cities, supermarket supply chains, and high-margin export clusters.',
            hinglish: 'Tier-1 cities ke pass fresh exotic sabzi supply karke 40-60% profit margin.',
          },
          challenges: {
            hi: 'उच्च प्रारंभिक पूंजी (₹30-40 लाख/एकड़), बिजली कटौती और पोषण घोल (Nutrient Formulation) की तकनीकी समझ की कमी।',
            en: 'High CapEx (₹30-40L/acre), power backup dependence for cooling, and microbial contamination risks in recirculating loops.',
            hinglish: 'Initial setup cost zyada hona aur correct EC/pH formula ki knowledge zaruri hona.',
          },
          solutionFuture: {
            hi: 'सिंगापुर व हॉलैंड की तरह AI क्लाइमेट कंप्यूटर जो मौसम के पूर्वानुमान को देखकर 4 घंटे पहले ही पॉलीहाउस का तापमान अनुकूलित कर देता है।',
            en: 'Predictive neural network microclimate controllers that adjust LED supplementary lighting and CO2 enrichment based on satellite weather forecasts.',
            hinglish: 'AI Climate Engine jo weather forecast dekhkar automatic temperature adjust kar deta hai.',
          },
        },
      },
    ],
  },
  {
    id: 'plant_pathology_entomology',
    name: {
      hi: 'पादप रोग विज्ञान एवं कीट प्रबंधन (Plant Pathology & IPM)',
      en: 'Plant Pathology & Integrated Pest Management',
      hinglish: 'Plant Pathology & Pest Management (Kitak Vigyan)',
    },
    code: 'PATH-401',
    icon: '🔬',
    badge: 'Crop Protection Matrix',
    description: {
      hi: 'कवक, जीवाणु, वायरस, नेमाटोड और कीटों की पहचान, फेरोमोन ट्रैप, ट्राइकोग्रामा बायो-कंट्रोल और सटीक रासायनिक छिड़काव।',
      en: 'Pathogen etiology, epidemiological disease forecasting, pheromone trapping, Trichoderma biocontrol, and targeted chemistries.',
      hinglish: 'Pests aur fungal/viral bimariyo ki identification, organic remedies aur chemical prescriptions.',
    },
    chaptersCount: 5,
    icarWeightage: '18% ICAR Exam Weightage',
    chapters: [
      {
        id: 'path-ch1',
        title: {
          hi: 'अध्याय 1: समेकित कीट प्रबंधन (IPM) एवं फेरोमोन बायो-सेंसिंग',
          en: 'Chapter 1: Integrated Pest Management (IPM) & Pheromone Bio-Sensing',
          hinglish: 'Chapter 1: IPM Strategy, Pheromone Traps & Bio-Pesticides',
        },
        keyConcepts: ['Economic Threshold Level (ETL)', 'Pheromone Funnel Traps', 'Trichoderma viride', 'Neem Azadirachtin 10000 PPM', 'Yellow Sticky Traps'],
        framework360: {
          what: {
            hi: 'कीटनाशकों के अंधाधुंध छिड़काव के बजाय जैविक, भौतिक, यांत्रिक और सटीक रासायनिक विधियों का समग्र संयोजन।',
            en: 'Ecological pest suppression strategy combining cultural practices, biological parasitoids, optical lures, and threshold-gated green chemistries.',
            hinglish: 'Kide marne ke liye chemical ke bajaye biological traps aur safe organic methods ka use karna.',
          },
          why: {
            hi: 'अंधाधुंध कीटनाशकों से कीटों में प्रतिरोधक क्षमता (Resistance) आ गई है, मित्र कीट (मधुमक्खी, लेडीबर्ड) मर रहे हैं और इंसानों में कैंसर का खतरा बढ़ा है।',
            en: 'Chemical treadmill causes secondary pest resurgence, pollinator collapse, and pesticide residue export bans.',
            hinglish: 'Over-spraying se cancer ka khatra badha hai aur kide chemical ke adi ho chuke hain.',
          },
          how: {
            hi: 'खेत में प्रति एकड़ 8-10 फेरोमोन ट्रैप लगाते हैं जो नर पतंगों को आकर्षित कर प्रजनन चक्र तोड़ देते हैं। ईटीएल (ETL) पार होने पर ही टारगेटेड दवा देते हैं।',
            en: 'Female sex pheromone lures trap male moths breaking reproductive cycles. Spraying is triggered only when ETL (Economic Threshold Level) is breached.',
            hinglish: 'Pheromone smell se male insects trap me fas jate hain jisse ande banna band ho jate hain.',
          },
          application: {
            hi: 'कपास (गुलाबी सुंडी / Pink Bollworm), चना (फली छेदक), टमाटर (टुटा एब्सोल्यूटा) और मक्का (फॉल आर्मीवर्म) में अनिवार्य।',
            en: 'Critical defense for Cotton Bollworm, Tomato Tuta absoluta, and Fall Armyworm in Maize.',
            hinglish: 'Cotton me Gulabi Sundi aur Tomato me Tuta insect ko control karne ke liye.',
          },
          challenges: {
            hi: 'किसानों में धैर्य की कमी—वे तुरंत 100% नॉक-डाउन केमिकल चाहते हैं; बायो-कंट्रोल एजेंट्स की शेल्फ-लाइफ कम होना।',
            en: 'Farmer impatience for instant chemical knockdown and poor cold-chain logistics for living bioagents.',
            hinglish: 'Farmers ko turant asar chahiye hota hai isliye wo toxic chemicals daal dete hain.',
          },
          solutionFuture: {
            hi: 'स्मार्ट IoT फेरोमोन ट्रैप जिसमें बिल्ट-इन कैमरा और AI विज़न सेंसर कीटों की गिनती कर किसान के फोन पर ऑटोमैटिक अलर्ट भेजता है।',
            en: 'Solar-powered optical AI insect traps that automatically classify pests, calculate ETL densities, and alert farmers on mobile.',
            hinglish: 'AI Camera Trap jo kido ki photo scan karke mobile par alert bhej deta hai ki kab spray karna hai.',
          },
        },
      },
    ],
  },
];

export const GLOBAL_AGRI_BENCHMARKS: GlobalAgriTech[] = [
  {
    id: 'singapore_sky_greens',
    country: 'Singapore',
    flag: '🇸🇬',
    title: {
      hi: 'सिंगापुर: स्काई ग्रीन्स हाइड्रोलिक ए-फ्रेम वर्टिकल फार्मिंग',
      en: 'Singapore: Sky Greens Hydraulic A-Frame Vertical Towers',
      hinglish: 'Singapore Sky Greens: Hydraulic Vertical A-Frame Towers',
    },
    subtitle: {
      hi: '30x30 फूड सिक्योरिटी मिशन — 0.5L पानी से 1.7 टन टावर का घूर्णन',
      en: 'Singapore 30x30 Food Security Strategy — Gravity Water-Driven Zero Carbon Rotating Towers',
      hinglish: 'Singapore 30x30 Food Mission: Zero Electricity Water-Driven Vertical Farming',
    },
    category: 'Vertical Farming & CEA',
    coreMechanism: {
      hi: '9 मीटर ऊंचे एल्युमिनियम ए-फ्रेम टावर जो बिना किसी मोटर/बिजली के केवल पानी के गुरुत्वाकर्षण और सूक्ष्म हाइड्रोलिक दबाव से धीरे-धीरे घूमते हैं। पौधों को दिनभर 360° प्राकृतिक धूप और नीचे पानी मिलता है।',
      en: 'Patented 9-meter rotating aluminium A-frame towers powered entirely by a closed-loop micro-hydraulic gravity water wheel. Plants rotate continually to capture uniform natural sunlight.',
      hinglish: '9 meter uncha rotating aluminum tower jo bina motor/electricity ke sirf paani ke flow se rotate hota hai taaki sabhi paudho ko barabar dhoop mile.',
    },
    keyMetrics: [
      { label: 'Yield vs Land', value: '10x Higher', impact: '1 एकड़ जमीन में 10 एकड़ जितनी सब्जियां' },
      { label: 'Energy Consumption', value: '0.5L Water / 40W', impact: 'एक लाइट बल्ब से भी कम ऊर्जा खपत' },
      { label: 'Water Recycling', value: '95% Efficiency', impact: 'पारंपरिक खेती से 95% कम पानी' },
      { label: 'Labor Requirement', value: '75% Reduced', impact: 'ऑटोमेटेड बॉटम-हार्वेस्टिंग ट्रे' },
    ],
    implementationSteps: [
      'Phase 1: 9-meter A-frame modular aluminum structural erection with UV-stabilized composite troughs.',
      'Phase 2: Closed-loop hydraulic siphon manifold installation requiring just 0.5 kWh power per day.',
      'Phase 3: Automated bottom tray seeding and harvest ergonomic station.',
      'Phase 4: Organic bio-liquid nutrient fertigation injector integration.',
    ],
    indiaReplicationStrategy: {
      hi: 'भारत के घने शहरों (दिल्ली, मुंबई, बेंगलुरु, हैदराबाद) के छतों और उपनगरीय खाली गोदामों में स्थानीय एमएसएमई द्वारा कम लागत वाले लोहे/पीवीसी फ्रेम से निर्माण।',
      en: 'Deployable on urban rooftop real estate in Delhi NCR, Mumbai, and Bangalore using low-cost indigenous steel alloys fabricated by local MSMEs.',
      hinglish: 'India ke metro cities ke rooftops aur warehouses me low-cost MSME frames se implement kiya ja sakta hai.',
    },
    techArchitecture: ['Micro-Hydraulic Siphon Loop', 'A-Frame Modular Extrusions', 'Sub-Irrigation Troughs', 'Gravity Return Manifold'],
    icon: '🏙️',
    badgeColor: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
  },
  {
    id: 'singapore_bsf_circular',
    country: 'Singapore',
    flag: '🇸🇬',
    title: {
      hi: 'सिंगापुर: ब्लैक सोल्जर फ्लाई (BSF) सर्कुलर प्रोटीन बायो-इकोनॉमी',
      en: 'Singapore: Black Soldier Fly (BSF) Circular Protein Bio-Economy',
      hinglish: 'Singapore BSF: Waste to 45% Protein Animal Feed & Organic Frass',
    },
    subtitle: {
      hi: 'कचरा प्रबंधन से ₹120/किलो हाई-प्रोटीन एक्वाकल्चर फीड और बायो-फर्टिलाइजर',
      en: 'Upcycling Food Waste into 45% Crude Protein Insect Meal & Organic Frass Bio-fertilizer',
      hinglish: 'Food waste ko 12 din me high-grade protein feed aur powerful organic khad me convert karna',
    },
    category: 'Circular Eco-Farming',
    coreMechanism: {
      hi: 'काली सैनिक मक्खी (Hermetia illucens) के लार्वा 12 दिनों में 1 टन गीले कचरे को खाकर 200 किग्रा उच्च-प्रोटीन (45% प्रोटीन, 35% वसा) लार्वा और 300 किग्रा फ्रॉस (बेहतरीन जैविक खाद) में बदल देते हैं।',
      en: 'Black Soldier Fly larvae consume municipal organic waste with extreme bio-conversion efficiency, producing 45% crude protein feed meal for fish/poultry and pathogen-free organic frass fertilizer.',
      hinglish: 'BSF ke larvae 12 din me food waste ko khakar 45% protein animal feed aur zardast organic khad bana dete hain.',
    },
    keyMetrics: [
      { label: 'Waste Conversion', value: '1000kg to 200kg Protein', impact: '12 दिनों में 80% कचरे का खात्मा' },
      { label: 'Protein Content', value: '45% Pure Crude Protein', impact: 'सोयाबीन और मछली के चूरे से बेहतर' },
      { label: 'Methane Reduction', value: '92% Less GHG', impact: 'लैंडफिल में सड़ने से पैदा होने वाली गैस रुकी' },
      { label: 'Frass NPK Value', value: '3.5 - 2.8 - 2.1 + Chitin', impact: 'पौधों में इम्युनिटी बढ़ाने वाला चिटिन' },
    ],
    implementationSteps: [
      'Breeding Colony Setup with 28-30°C temperature and 70% humidity LED mating chambers.',
      'Egg collection v-groove wooden slats harvesting 500-800 eggs per female fly.',
      '5-day nursery feeding on homogenized fruit and brewery mash substrates.',
      'Automated sieving separation of mature larvae and frass packaging.',
    ],
    indiaReplicationStrategy: {
      hi: 'सब्जी मंडियों (आजादपुर, वाशी, कोयम्बेडु) के सड़े फल-सब्जियों और डेयरी गोबर से पोल्ट्री व मछली पालकों के लिए सस्ता आहार बनाना।',
      en: 'Co-locating BSF bioconversion plants adjacent to major APMC mandis (Azadpur, Vashi) to slash poultry feed costs for Indian farmers by 40%.',
      hinglish: 'APMC Sabzi Mandi ke waste ko use karke poultry aur fish farmers ke liye bohot sasta protein feed banaya ja sakta hai.',
    },
    techArchitecture: ['Automated Climate Breeding Bioreactor', 'Opto-Mechanical Larvae Sifter', 'Low-Temp Vacuum Microwave Dryer', 'Frass Pulverizer'],
    icon: '🪰',
    badgeColor: 'border-amber-500 bg-amber-950/40 text-amber-300',
  },
  {
    id: 'china_beidou_autonomous_swarms',
    country: 'China',
    flag: '🇨🇳',
    title: {
      hi: 'चीन: बेइदोऊ सैटेलाइट आरटीके एवं ऑटोनॉमस अनमैन्ड ट्रैक्टर फ्लीट्स',
      en: 'China: Beidou Satellite RTK Autonomous Unmanned Tractor Fleets',
      hinglish: 'China Autonomous Swarms: Beidou 2.5cm Precision Driverless Farming',
    },
    subtitle: {
      hi: '2.5 सेमी सेंटीमीटर-स्तरीय सटीकता — 24/7 बिना ड्राइवर के जुताई, बुवाई व कटाई',
      en: 'Heilongjiang & Xinjiang Mega-Farms: 2.5cm Centimeter Accuracy Driverless Tractor & Harvester Fleets',
      hinglish: 'Beidou Satellite se jud kar 24 ghante bina driver ke chalne wale smart tractors',
    },
    category: 'Autonomous Robotics & AI',
    coreMechanism: {
      hi: 'बेइदोऊ (BeiDou) सैटेलाइट नेविगेशन और 5G RTK बेस स्टेशनों से जुड़े बिना ड्राइवर वाले भारी इलेक्ट्रिक/डीजल ट्रैक्टर। लेजर LiDAR और AI कंप्यूटर विज़न से खेत की सटीक जुताई और सीधी कतार में बुवाई।',
      en: 'Fleet orchestration of driverless heavy tractors and combine harvesters guided by BeiDou-3 GNSS differential RTK ground stations, achieving 2.5cm pass-to-pass accuracy and autonomous headland turning.',
      hinglish: 'Satellite GPS aur 5G sensors se bina driver ke tractor seedhi line me 2.5cm accuracy ke sath jhutai aur buwai karte hain.',
    },
    keyMetrics: [
      { label: 'Operational Accuracy', value: '2.5 cm RTK Precision', impact: 'जीरो ओवरलैप और शून्य बीज बर्बादी' },
      { label: 'Night Operation', value: '24/7 Continuous Plowing', impact: 'दिन-रात लगातार बिना थके काम' },
      { label: 'Fuel/Energy Saving', value: '22% Efficiency Gain', impact: 'सटीक पाथ प्लानिंग से ईंधन की बचत' },
      { label: 'Yield Boost', value: '+12% per Hectare', impact: 'कतारों में समान धूप और हवा' },
    ],
    implementationSteps: [
      'RTK GNSS Base Station Network deployment across 50km radius coverage.',
      'Electric Steer-by-Wire motor retrofit on standard tractor steering columns.',
      'Dual Antenna GNSS + IMU heading sensors mounted on cabin roof.',
      'Cloud Mission Planning App defining boundary geofences and obstacle avoidance zones.',
    ],
    indiaReplicationStrategy: {
      hi: 'भारत के ISRO NavIC सैटेलाइट सिस्टम का उपयोग करके महिंद्रा, स्वराज और सोनालिका ट्रैक्टरों में ₹50,000 का ऑटो-स्टीयर किट लगाना।',
      en: 'Retrofitting indigenous Indian tractors (Mahindra, Sonalika) with ISRO NavIC-compatible steering actuators under Custom Hiring Centers (CHCs).',
      hinglish: 'ISRO NavIC satellite ke sath Indian tractors me low-cost auto-steer kit lagakar CHC centers se rent par chalana.',
    },
    techArchitecture: ['BeiDou/NavIC L1/L5 Dual Frequency GNSS', 'CAN-Bus Electronic Actuator Unit', 'LiDAR 3D Obstacle Scanner', 'Cloud Telematics Hub'],
    icon: '🚜',
    badgeColor: 'border-red-500 bg-red-950/40 text-red-300',
  },
  {
    id: 'china_shouguang_solar_greenhouse',
    country: 'China',
    flag: '🇨🇳',
    title: {
      hi: 'चीन: शौगुआंग पैसिव सोलर थर्मल ग्रीनहाउस (The Shouguang Model)',
      en: 'China: Shouguang Passive Solar Thermal Greenhouse (Zero Fossil Fuel)',
      hinglish: 'China Shouguang Model: Thick Earth Wall Solar Greenhouses (-20°C Proof)',
    },
    subtitle: {
      hi: 'शून्य बिजली हीटिंग — 4 मीटर मोटी मिट्टी की दीवार जो दिन की धूप रात में छोड़ती है',
      en: 'Zero Heating Fuel: 4-Meter Earthen Thermal Battery Walls Growing Vegetables at -25°C Winter',
      hinglish: 'Bina heater ke -20°C barf me bhi tamatar aur shimla mirch ugane wali Chinese Technology',
    },
    category: 'Solar Greenhouses',
    coreMechanism: {
      hi: 'पूर्व-पश्चिम दिशा में बने विशेष ग्रीनहाउस। उत्तर दिशा में 3-4 मीटर मोटी मिट्टी/पत्थर की दीवार दिन की धूप की गर्मी को सोख लेती है और कड़ाके की ठंड (-20°C) वाली रात में यह दीवार बिना हीटर के अंदर 15°C तापमान बनाए रखती है।',
      en: 'East-West oriented asymmetric solar greenhouses with a monolithic northern earthen wall (3-4m thick) acting as a passive thermal storage battery, covered by automated thermal insulation blankets.',
      hinglish: 'Thick mitti ki thermal wall din me dhoop store karti hai aur raat me heater ki tarah heat chhodti hai.',
    },
    keyMetrics: [
      { label: 'Winter Temperature', value: 'Interior > 15°C at -20°C ext', impact: 'बिना कोयला/गैस जलाए शून्य लागत हीटिंग' },
      { label: 'Vegetable Yield', value: '120-150 Tons/Hectare', impact: 'वर्ष में 365 दिन ताजी सब्जियां' },
      { label: 'Carbon Emissions', value: '0% Fossil Heating', impact: '100% पर्यावरण अनुकूल' },
      { label: 'Construction Cost', value: '60% Cheaper than Dutch Glass', impact: 'यूरोपीय ग्लास ग्रीनहाउस से 60% सस्ता' },
    ],
    implementationSteps: [
      'Compacted subsoil northern wall construction with 45-degree solar inclination angle.',
      'Light-transmitting PO anti-fog film on south curved frame.',
      'Automated motorized thermal cotton quilt rolling system operating on twilight sensors.',
      'Underground geothermal heat-exchange duct network installation.',
    ],
    indiaReplicationStrategy: {
      hi: 'लद्दाख, कश्मीर, हिमाचल और उत्तराखंड के अत्यधिक ठंडे हिमालयी क्षेत्रों में सर्दियों में ताजी सब्जियों के उत्पादन हेतु सर्वश्रेष्ठ।',
      en: 'Game-changing blueprint for cold desert zones in Ladakh, Spiti Valley, Himachal Pradesh, and Jammu & Kashmir for winter food sovereignty.',
      hinglish: 'Ladakh, Kashmir aur Himachal ke thande ilaqo me winter me fresh sabzi ke liye perfect model.',
    },
    techArchitecture: ['Passive Earthen Thermal Storage Mass', 'Motorized Multi-Layer Thermal Quilt', 'PO Anti-Drip Solar Film', 'IoT Microclimate Sensor Matrix'],
    icon: '☀️',
    badgeColor: 'border-yellow-500 bg-yellow-950/40 text-yellow-300',
  },
  {
    id: 'china_rice_duck_fish_circular',
    country: 'China',
    flag: '🇨🇳',
    title: {
      hi: 'चीन: राइस-डक-फिश-अजोला सिम्बायोटिक सर्कुलर एग्रो-इकोलॉजी',
      en: 'China: Rice-Duck-Fish-Azolla Symbiotic Circular Agro-Ecology',
      hinglish: 'China Rice-Duck-Fish: 100% Organic Zero Chemical Farming System',
    },
    subtitle: {
      hi: 'शून्य कीटनाशक व शून्य खरपतवारनाशी — बत्तख, मछली और एजोला से 4 गुना मुनाफा',
      en: 'Zero Synthetic Chemicals: Ancient Heritage Scaled with Modern Sensors Producing 4 Incomes from 1 Acre',
      hinglish: '1 khet se 4 income: Chawal + Duck Meat + Fish + Azolla Bio-fertilizer',
    },
    category: 'Circular Eco-Farming',
    coreMechanism: {
      hi: 'धान के खेत में पानी भरकर मछली और बत्तखों के बच्चे छोड़े जाते हैं। बत्तखें कीड़े और खरपतवार खाती हैं, उनके पैरों की हलचल से मिट्टी में ऑक्सीजन घुलती है, उनकी बीट (मल) से पौधों को प्राकृतिक नाइट्रोजन मिलती है और पानी में एजोला हवा से नाइट्रोजन सोखता है।',
      en: 'Integrated closed-loop co-culture where ducks eat insect pests and weeds, aerate rhizosphere soil with webbed feet, and excrete nitrogenous manure, while fish control mosquito larvae and Azolla fixes atmospheric nitrogen.',
      hinglish: 'Ducks kide aur ghas khati hain, fish paani saaf rakhti hai aur inka gobar natural nitrogen khad banta hai.',
    },
    keyMetrics: [
      { label: 'Chemical Savings', value: '100% Zero Pesticides', impact: 'कीटनाशक और यूरिया का खर्च शून्य' },
      { label: 'Farmer Income', value: '3.5x Multi-Revenue', impact: 'चावल + बत्तख के अंडे/मांस + मछली की बिक्री' },
      { label: 'Soil Health', value: '+45% Organic Carbon', impact: 'केंचुए और मित्र जीवाणुओं की भारी वृद्धि' },
      { label: 'Premium Price', value: '+80% Organic Certified', impact: 'केमिकल-फ्री चावल का दोगुना बाजार मूल्य' },
    ],
    implementationSteps: [
      'Paddy field border bunding (50cm height) and perimeter predator fencing.',
      'Field flooding and transplanting wide-spaced tall sturdy rice cultivars.',
      'Release of 15-day-old ducklings (200-300 ducks/hectare) and fingerlings (Carp/Tilapia).',
      'Inoculation of Azolla pinnata bio-blanket across water surface.',
    ],
    indiaReplicationStrategy: {
      hi: 'असम, पश्चिम बंगाल, ओडिशा, केरल और बिहार के बाढ़-प्रवण व तटीय धान क्षेत्रों के छोटे किसानों के लिए अत्यंत लाभकारी।',
      en: 'Ideal for smallholder farm families across Assam, West Bengal, Odisha, Kerala, and Coastal Andhra Pradesh.',
      hinglish: 'Assam, Bengal, Odisha aur Bihar ke farmers ke liye sabse best low-investment high-profit system.',
    },
    techArchitecture: ['Symbiotic Multi-Trophic Aquaculture', 'Biological Weed Suppression', 'Bio-Atmospheric Nitrogen Fixing', 'Water DO Aeration'],
    icon: '🦆',
    badgeColor: 'border-cyan-500 bg-cyan-950/40 text-cyan-300',
  },
];

export const CROP_DISEASES_DB: CropDiseaseItem[] = [
  {
    id: 'paddy_blast',
    cropName: { hi: 'धान (Paddy/Rice)', en: 'Paddy (Rice)', hinglish: 'Dhan (Paddy)' },
    diseaseName: { hi: 'ब्लास्ट रोग (झोंका रोग - Magnaporthe oryzae)', en: 'Rice Blast (Magnaporthe oryzae)', hinglish: 'Paddy Blast Disease (Jhonka Rog)' },
    pathogenType: 'Fungal',
    severity: 'Critical',
    symptoms: {
      hi: 'पत्तियों पर नाव या आंख के आकार के धब्बे जिनके किनारे भूरे और केंद्र राख जैसे भूरे होते हैं; बाली की गर्दन काली होकर टूट जाती है।',
      en: 'Spindle-shaped elliptical lesions on leaves with greyish centers and dark brown margins; blackening of neck nodes causing panicle collapse.',
      hinglish: 'Leaves par naav jaise spindle spots bante hain aur baali ki gardan kali hokar toot jati hai.',
    },
    causeAndSpread: {
      hi: 'अधिक नाइट्रोजन खाद (यूरिया), 90% से अधिक आर्द्रता और 20-28°C तापमान में कवक के बीजाणु हवा से तेजी से फैलते हैं।',
      en: 'Excessive synthetic urea application, relative humidity >90%, and temperatures between 20-28°C accelerating airborne spore dispersion.',
      hinglish: 'Zyada urea daalne aur nami wale mausam me ye fungus hawa se bohot tezi se failta hai.',
    },
    chemicalControl: {
      medicine: 'Tricyclazole 75% WP (बाण / Beam) या Isoprothiolane 40% EC',
      dose: '0.6 ग्राम/लीटर पानी (120 ग्राम प्रति एकड़) 150-200 लीटर पानी में मिलाकर',
      stage: 'शुरुआती लक्षण दिखते ही अथवा बाली निकलने से पूर्व',
    },
    organicControl: {
      medicine: 'Trichoderma viride 1% WP + 5% नीम तेल (Azadirachtin 10000 PPM)',
      preparation: '5 ग्राम ट्राइकोडर्मा + 3 मिली नीम तेल प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें।',
    },
    preventiveTips: [
      'बीज उपचार: कार्बेन्डाजिम (2g/kg) या ट्राइकोडर्मा (10g/kg) से अनिवार्य उपचार करें।',
      'यूरिया को एक साथ डालने के बजाय 3-4 भागों में बांटकर (Split application) दें।',
      'प्रतिरोधी किस्में (Pusa Basmati 1637, MTU 1010) चुनें।',
    ],
    yieldLossRisk: '40% से 80% फसल बर्बाद हो सकती है',
    icon: '🌾',
  },
  {
    id: 'cotton_pink_bollworm',
    cropName: { hi: 'कपास (Cotton)', en: 'Cotton', hinglish: 'Kapas (Cotton)' },
    diseaseName: { hi: 'गुलाबी सुंडी (Pink Bollworm - Pectinophora gossypiella)', en: 'Pink Bollworm (Pectinophora gossypiella)', hinglish: 'Cotton Pink Bollworm (Gulabi Sundi)' },
    pathogenType: 'Pest Infestation',
    severity: 'Critical',
    symptoms: {
      hi: 'फूल रोसेट (गुलाब के फूल की तरह बंद) हो जाते हैं; टिंडे (Bolls) के अंदर सुंडी बीज खाती है और रुई पर पीले-भूरे दाग पड़ जाते हैं।',
      en: 'Rosetted flowers that fail to open; larvae bore directly inside developing green bolls, destroying seeds and lint fibers.',
      hinglish: 'Phool rosette ban jate hain aur bolls ke andar sundi ghuskar seeds aur rui ko kharab kar deti hai.',
    },
    causeAndSpread: {
      hi: 'बीटी कॉटन (Cry1Ac/Cry2Ab) के प्रति सुंडी में प्रतिरोधक क्षमता विकसित होना और पुरानी कपास की पराली को खेत में छोड़ना।',
      en: 'Evolution of pest resistance against Cry toxin in Bt Cotton and non-destruction of residual stalks post-harvest.',
      hinglish: 'Purani fasal ke residues khet me rehne se larva zinda rehta hai.',
    },
    chemicalControl: {
      medicine: 'Profenofos 50% EC या Emamectin Benzoate 5% SG (प्रोक्लेम)',
      dose: 'Emamectin 0.5 ग्राम/लीटर पानी (100 ग्राम प्रति एकड़) अथवा Profenofos 2 मिली/लीटर',
      stage: 'प्रति ट्रैप 8 पतंगे लगातार 3 दिन दिखने पर (ETL)',
    },
    organicControl: {
      medicine: 'फेरोमोन ट्रैप (Pherolure Gossyplure) + Beauveria bassiana 1% WP',
      preparation: 'प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं + 5 ग्राम ब्यूवेरिया बासियाना प्रति लीटर पानी का स्प्रे।',
    },
    preventiveTips: [
      'खेत के चारों ओर 5 कतारें नॉन-बीटी कपास की रिफ्यूज (Refuge) के रूप में लगाएं।',
      'ट्राइकोग्रामा किलोनिस (Trichogramma chilonis) परजीवी अंडे के कार्ड 1.5 लाख/हेक्टेयर लगाएं।',
      'दिसंबर के बाद फसल को लंबा न खींचें (Terminated by Dec).',
    ],
    yieldLossRisk: '50% से 70% लिंट क्वालिटी व वजन में गिरावट',
    icon: '☁️',
  },
  {
    id: 'tomato_early_blight',
    cropName: { hi: 'टमाटर (Tomato)', en: 'Tomato', hinglish: 'Tamatar (Tomato)' },
    diseaseName: { hi: 'अगेती झुलसा रोग (Early Blight - Alternaria solani)', en: 'Early Blight (Alternaria solani)', hinglish: 'Tomato Early Blight (Ageti Jhulsa)' },
    pathogenType: 'Fungal',
    severity: 'Moderate',
    symptoms: {
      hi: 'निचली पत्तियों पर गोल भूरे धब्बे जिनमें संकेंद्री छल्ले (Target Board Rings / बुल आई) दिखते हैं; तने पर काले घाव और फल सड़ना।',
      en: 'Characteristic target-board concentric dark brown rings on older lower leaves, stem cankers, and black leathery sunken spots on fruits.',
      hinglish: 'Neeche ki leaves par target board jaise concentric rings wale dhabbe bante hain aur patte sookh jate hain.',
    },
    causeAndSpread: {
      hi: 'उच्च तापमान (24-30°C) के साथ पत्तियों पर 8-10 घंटे तक नमी का रहना और मिट्टी में पहले से मौजूद कवक अवशेष।',
      en: 'Warm humid weather (24-30°C) with prolonged leaf wetness allowing Alternaria conidia to penetrate epidermis.',
      hinglish: 'Drip ke bajaye upar se paani chhidakne se leaves geeli rehti hain aur fungus lagta hai.',
    },
    chemicalControl: {
      medicine: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (एमिस्टार टॉप)',
      dose: '1 मिली/लीटर पानी (200 मिली प्रति एकड़) 200 लीटर पानी में',
      stage: 'निचली 3 पत्तियों पर पहला छल्ला दिखते ही',
    },
    organicControl: {
      medicine: 'तांबा आधारित बोर्डो मिश्रण (1%) या स्यूडोमोनास फ्लोरोसेंस (Pseudomonas fluorescens)',
      preparation: '5 ग्राम स्यूडोमोनास + 2 ग्राम गुड़ का घोल प्रति लीटर पानी में मिलाकर छिड़कें।',
    },
    preventiveTips: [
      'पौधों को जमीन से ऊपर सहारा (Staking/Treillising) दें ताकि पत्तियां मिट्टी को न छुएं।',
      'ड्रिप इरीगेशन का उपयोग करें; कभी भी स्प्रिंकलर से पत्तियों पर पानी न गिराएं।',
      'फसल चक्र (Crop Rotation) अपनाएं; सोलेनेसी कुल (आलू, बैंगन) के बाद टमाटर न लगाएं।',
    ],
    yieldLossRisk: '30% से 50% फल सड़न व पत्ता झुलस',
    icon: '🍅',
  },
  {
    id: 'wheat_yellow_rust',
    cropName: { hi: 'गेहूं (Wheat)', en: 'Wheat', hinglish: 'Gehu (Wheat)' },
    diseaseName: { hi: 'पीला रतुआ रोग (Yellow / Stripe Rust - Puccinia striiformis)', en: 'Yellow Stripe Rust (Puccinia striiformis)', hinglish: 'Wheat Yellow Rust (Peela Ratua)' },
    pathogenType: 'Fungal',
    severity: 'Critical',
    symptoms: {
      hi: 'पत्तियों की शिराओं के समानांतर पीली-नारंगी पाउडर जैसी धारियां; छूने पर अंगुलियों पर हल्दी जैसा पीला पाउडर चिपक जाता है।',
      en: 'Linear yellow-orange pustules arranged in parallel stripes along leaf veins; easily rubbing off as turmeric-like powder on fingertips.',
      hinglish: 'Leaves par haldi jaise peele powder ki lambi lines ban jati hain.',
    },
    causeAndSpread: {
      hi: 'हिमालयी तलहटी से ठंडी नम हवाएं (तापमान 10-15°C) और कोहरा/बादल छाए रहना।',
      en: 'Airborne urediniospores carried by north-westerly winds during cool cloudy winters (10-15°C with dew).',
      hinglish: 'Thand aur kohre wale mausam me hawa se poore khet me 48 ghante me failta hai.',
    },
    chemicalControl: {
      medicine: 'Propiconazole 25% EC (टिल्ट / Tilt)',
      dose: '1 मिली/लीटर पानी (200 मिली प्रति एकड़) 200 लीटर पानी में',
      stage: 'खेत में पीले धब्बे का एक भी पैच दिखते ही पूरे खेत में तुरंत स्प्रे करें',
    },
    organicControl: {
      medicine: 'खट्टी छाछ (Sour Buttermilk 15 दिन पुरानी) + हींग घोल',
      preparation: '5 लीटर खट्टी छाछ + 50 ग्राम हींग को 100 लीटर पानी में मिलाकर स्प्रे करें।',
    },
    preventiveTips: [
      'पीला रतुआ प्रतिरोधी किस्में (DBW 187, DBW 222, HD 3226, PBW 725) लगाएं।',
      'खेत में अत्यधिक पानी भरने से बचें।',
      'पड़ोसी खेतों की निगरानी रखें; हवा के रुख के साथ स्प्रे करें।',
    ],
    yieldLossRisk: '70% से 100% (पूरी फसल बर्बाद हो सकती है)',
    icon: '🌾',
  },
];

export const AGRI_MOCK_EXAM_QUESTIONS = [
  {
    id: 'q1',
    question: 'System of Rice Intensification (SRI) में नर्सरी से पौध की रोपाई कितने दिन की आयु में की जाती है?',
    options: ['8 से 12 दिन (Single Seedling)', '21 से 25 दिन', '30 से 35 दिन', '40 से 45 दिन'],
    correctOptionIndex: 0,
    explanation: 'SRI विधि में 8-12 दिन की कोमल सिंगल पौध को 25x25 सेमी की दूरी पर चौकोर रोपा जाता है जिससे जड़ें तेजी से फैलती हैं और 50+ टिलर्स आते हैं।',
    subject: 'Agronomy',
  },
  {
    id: 'q2',
    question: 'सिंगापुर के प्रसिद्ध "Sky Greens" वर्टिकल फार्मिंग टावर की मुख्य तकनीकी विशेषता क्या है?',
    options: [
      'यह बिना बिजली मोटर के केवल सूक्ष्म हाइड्रोलिक जल-प्रवाह से 360° घूमता है',
      'यह परमाणु ऊर्जा से चलता है',
      'इसमें केवल कृत्रिम मिट्टी का उपयोग होता है',
      'यह केवल भूमिगत अंधेरे में काम करता है',
    ],
    correctOptionIndex: 0,
    explanation: 'Sky Greens A-Frame टावर केवल 0.5L पानी के गुरुत्वाकर्षण और सूक्ष्म हाइड्रोलिक दबाव से 1.7 टन टावर को 360° घुमाकर प्राकृतिक धूप सुनिश्चित करता है।',
    subject: 'Global Tech (Singapore)',
  },
  {
    id: 'q3',
    question: 'चीन के शौगुआंग (Shouguang) पैसिव सोलर ग्रीनहाउस कड़ाके की ठंड (-20°C) में बिना हीटर के तापमान कैसे बनाए रखते हैं?',
    options: [
      'उत्तर दिशा की 3-4 मीटर मोटी मिट्टी/पत्थर की दीवार दिन की धूप सोखकर रात में गर्मी छोड़ती है',
      'भूमिगत हीटिंग तार जलाकर',
      'डीजल जनरेटर द्वारा गर्म हवा फेंककर',
      'प्लास्टिक में गर्म पानी भरकर',
    ],
    correctOptionIndex: 0,
    explanation: 'शौगुआंग मॉडल में 3-4 मीटर मोटी मिट्टी की उत्तरी दीवार एक पैसिव थर्मल बैटरी के रूप में कार्य करती है, जिससे बिना किसी जीवाश्म ईंधन के अंदर 15°C तापमान रहता है।',
    subject: 'Global Tech (China)',
  },
  {
    id: 'q4',
    question: 'कपास में गुलाबी सुंडी (Pink Bollworm) की निगरानी हेतु आर्थिक देहली स्तर (ETL) क्या निर्धारित है?',
    options: [
      'लगातार 3 दिन प्रति ट्रैप 8 या अधिक नर पतंगे आना अथवा 10% रोसेट फूल',
      'प्रति पौधा 50 सुंडियां',
      'पूरे खेत में 1 पतंगा दिखना',
      'फसल की कटाई के 1 दिन पहले',
    ],
    correctOptionIndex: 0,
    explanation: 'ETL मानक के अनुसार फेरोमोन ट्रैप में लगातार 3 दिनों तक प्रति ट्रैप 8 पतंगे अथवा 10% रोसेट फूल दिखने पर तुरंत अनुशंसित कीटनाशक/बायो-एजेंट का छिड़काव करना चाहिए।',
    subject: 'Plant Pathology & Entomology',
  },
  {
    id: 'q5',
    question: 'हाइड्रोपोनिक्स में रंगीन शिमला मिर्च और चेरी टमाटर के लिए आदर्श EC (विद्युत चालकता) और pH मान क्या होना चाहिए?',
    options: [
      'EC: 1.8 - 2.5 mS/cm एवं pH: 5.8 - 6.5',
      'EC: 0.1 mS/cm एवं pH: 8.5',
      'EC: 5.0 mS/cm एवं pH: 3.5',
      'EC: 10.0 mS/cm एवं pH: 7.0',
    ],
    correctOptionIndex: 0,
    explanation: 'सोइलेस डच बकेट में न्यूट्रिएंट का EC 1.8 से 2.5 mS/cm और pH 5.8 से 6.5 के बीच होने पर ही पौधे नाइट्रोजन, फॉस्फोरस, पोटैशियम और सूक्ष्म पोषक तत्व अवशोषित कर पाते हैं।',
    subject: 'Horticulture & Protected Cultivation',
  },
];
