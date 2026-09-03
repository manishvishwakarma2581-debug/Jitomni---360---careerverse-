// Comprehensive Knowledge Base & Practical SOPs for Indian Farmers (किसान संपूर्ण समाधान केंद्र)

export interface KisanCropGuideItem {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  category: 'अनाज (Cereals)' | 'दलहन एवं तिलहन (Pulses/Oilseeds)' | 'नकदी फसलें (Cash Crops)' | 'सब्जियां (Vegetables)' | 'बागवानी व फल (Horticulture/Fruits)' | 'हाई-प्रॉफिट व औषधीय (High Profit & Medicinal)';
  season: 'खरीफ (Kharif)' | 'रबी (Rabi)' | 'जायद (Zaid)' | 'सालभर (Year-Round)';
  icon: string;
  demandScore: number; // 1 to 10
  demandTrend: '🔥 बहुत भारी मांग (Surging)' | '📈 निरंतर मांग (High Demand)' | '⚖️ स्थिर बाजार (Stable)' | '🚀 एक्सपोर्ट मांग (Export Boom)';
  durationDays: string;
  costPerAcre: number;
  expectedYieldPerAcre: string;
  marketRateAvg: string;
  netProfitPerAcre: string;
  soilRequirement: { hi: string; en: string; hinglish?: string };
  bestVarieties: string[];
  seedRateAndTreatment: { hi: string; en: string; hinglish?: string };
  sowingTechnique: { hi: string; en: string; hinglish?: string };
  fertilizerSchedule: {
    basal: { hi: string; en: string };
    firstTopDressing: { hi: string; en: string };
    secondTopDressing: { hi: string; en: string };
    nanoFertilizer: { hi: string; en: string };
  };
  irrigationSchedule: { hi: string; en: string }[];
  keyPestsAndRemedies: {
    pestName: string;
    symptoms: string;
    chemicalDose: string;
    organicDose: string;
  }[];
  harvestingAndStorage: { hi: string; en: string };
  marketSellingTip: { hi: string; en: string };
  intercroppingTip: { hi: string; en: string };
}

export interface KisanGovtSchemeItem {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  dept: string;
  subsidyRange: string;
  badge: string;
  tagline: { hi: string; en: string };
  objective: { hi: string; en: string };
  financialBenefit: { hi: string; en: string };
  eligibility: string[];
  documentsRequired: string[];
  howToApplySteps: string[];
  portalUrl: string;
  helpline: string;
  icon: string;
}

export interface KisanQAItem {
  id: string;
  category: 'फसल में रोग व कीट' | 'खाद व उर्वरक' | 'बीज व बुवाई' | 'कम पानी में खेती' | 'सरकारी योजना व सब्सिडी' | 'ज्यादा मुनाफे वाली फसल' | 'जैविक व प्राकृतिक खेती';
  question: { hi: string; en: string; hinglish: string };
  answer: { hi: string; en: string; hinglish: string };
  quickSteps: string[];
  audioKeywords: string[];
  verifiedBy: string;
}

export interface KisanWeatherAdvisory {
  zone: string;
  states: string;
  temperature: string;
  humidity: string;
  rainfallForecast: string;
  windSpeed: string;
  riskAlert: 'सामान्य' | 'सावधानी' | 'भारी वर्षा/आंधी चेतावनी' | 'पाला/शीतलहर चेतावनी' | 'लू चेतावनी';
  cropAdvisory: {
    crop: string;
    recommendation: string;
    spraySafe: boolean;
    irrigationNeeded: boolean;
  }[];
}

export interface FarmEquipmentRental {
  id: string;
  name: { hi: string; en: string };
  category: 'ड्रोन स्प्रे' | 'जुताई व समतलीकरण' | 'बुवाई व रोपाई' | 'कटाई व थ्रेशिंग' | 'सिंचाई उपकरण';
  ratePerAcreOrHour: string;
  govtSubsidy: string;
  workCapacity: string;
  benefits: string[];
  icon: string;
}

// 1. ALL CROP PRACTICAL PACKAGE OF PRACTICES (फसल उगाने का 100% सही वैज्ञानिक तरीका)
export const KISAN_CROPS_GUIDE: KisanCropGuideItem[] = [
  {
    id: 'crop-paddy',
    name: { hi: 'धान (Paddy/Rice)', en: 'Paddy / Basmati & Hybrid Rice', hinglish: 'Dhan ki Vaigyanik Kheti' },
    category: 'अनाज (Cereals)',
    season: 'खरीफ (Kharif)',
    icon: '🌾',
    demandScore: 9.5,
    demandTrend: '📈 निरंतर मांग (High Demand)',
    durationDays: '115 - 140 दिन',
    costPerAcre: 16000,
    expectedYieldPerAcre: '25 - 32 क्विंटल',
    marketRateAvg: '₹2,300 - ₹4,500 / क्विंटल (बासमती ₹4,000+)',
    netProfitPerAcre: '₹40,000 - ₹75,000',
    soilRequirement: {
      hi: 'चिकनी मटियार या दोमट मिट्टी जिसमें पानी रोकने की अच्छी क्षमता हो, pH 6.0 से 7.5।',
      en: 'Clay loam to heavy clay soil with high water retention capacity, pH 6.0-7.5.',
      hinglish: 'Clay loam ya matityar mitti jisme paani rukne ki capacity acchi ho.'
    },
    bestVarieties: ['पूसा 1509 (कम अवधि बासमती)', 'पूसा 1121 (प्रीमियम बासमती)', 'PR-126 (पंजाब/हरियाणा 120 दिन)', 'Arize 6444 Gold (हाइब्रिड उच्च उपज)', 'स्वर्णा (MTU 7029)'],
    seedRateAndTreatment: {
      hi: 'हाइब्रिड: 6-7 किग्रा/एकड़, सामान्य: 12-15 किग्रा/एकड़। बीजोपचार: 17 ग्राम कार्बेन्डाजिम + 1 ग्राम स्ट्रेप्टोसाइक्लिन को 10 लीटर पानी में घोलकर 24 घंटे भिगोएं, फिर छाया में सुखाएं।',
      en: 'Hybrid: 6-7 kg/acre. Seed treatment with Carbendazim (1.5g/kg) + Streptocycline (0.1g/kg) soaked for 24 hrs.',
      hinglish: 'Hybrid: 6-7 kg/acre. Carbendazim + Streptocycline ghol me beej ko 24 ghante bhigokar sukhayein.'
    },
    sowingTechnique: {
      hi: 'नर्सरी बुवाई: मई अंत से जून मध्य। रोपाई 20-25 दिन की पौध की 20x15 सेमी दूरी पर 2-3 पौध प्रति हिल करें। लेजर लैंड लेवलिंग अनिवार्य है।',
      en: 'Nursery in late May-June. Transplant 21-day seedlings at 20x15cm spacing. Prefer SRI or DSR where water is scarce.',
      hinglish: '21 din ki nursery ko 20x15 cm par ropai karein. 2-3 paudha per thala.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'खेत तैयारी में 1 बोरी DAP (50 किग्रा) + 1 बोरी MOP (30 किग्रा) + 10 किग्रा जिंक सल्फेट 33% मिट्टी में मिलाएं।',
        en: '1 bag DAP + 30kg MOP + 10kg Zinc Sulphate 33% at final puddling.'
      },
      firstTopDressing: {
        hi: 'रोपाई के 20-25 दिन बाद: 1 बोरी यूरिया (45 किग्रा) + 5 किग्रा जाइम/माइकोराइजा।',
        en: '20-25 DAT: 45kg Urea + 5kg Zyme/Mycorrhiza granules.'
      },
      secondTopDressing: {
        hi: 'रोपाई के 40-45 दिन बाद (कल्ले फूटने के बाद): 30 किग्रा यूरिया या 500 मिली नैनो यूरिया स्प्रे।',
        en: '40-45 DAT: 30kg Urea or 500ml Nano Urea foliar spray.'
      },
      nanoFertilizer: {
        hi: 'गभोट (Panicle Initiation) अवस्था पर 500ml नैनो DAP + 100g 0-52-34 (NPK) प्रति 150 लीटर पानी में स्प्रे करें।',
        en: 'Booting stage: 500ml Nano DAP + 1kg 0:52:34 foliar spray.'
      }
    },
    irrigationSchedule: [
      { hi: 'रोपाई के पहले 15 दिन: खेत में 2-3 सेमी हल्का पानी बनाए रखें।', en: 'First 15 days: 2-3cm thin water film.' },
      { hi: 'कल्ले फूटने के समय (Tillering 25-45 दिन): खेत को हल्का सूखा-गीला (AWD) रखें।', en: 'Tillering stage: Alternate Wetting and Drying.' },
      { hi: 'बालियां निकलने व दाना भरने के समय: खेत में नमी कभी कम न होने दें।', en: 'Flowering & Grain Filling: Never allow moisture stress.' },
      { hi: 'कटाई से 10-12 दिन पहले: पानी पूरी तरह निकाल दें।', en: 'Drain water 10-12 days before harvest.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'तना छेदक (Stem Borer / डेड हार्ट)',
        symptoms: 'केंद्रीय गोभ सूखना और बालियां सफेद पड़ना (White head)।',
        chemicalDose: 'क्लोरेंट्रानिलिप्रोल (Coragen) 60 मिली प्रति एकड़ या कार्टाप हाइड्रोक्लोराइड 4G 7.5 किग्रा दानेदार।',
        organicDose: 'ट्राइकोग्रामा कार्ड 20,000 अंडे/एकड़ + 5% नीम तेल (Azadirachtin 10,000 ppm) 400 मिली/एकड़।'
      },
      {
        pestName: 'शीथ ब्लाइट व झुलसा (Blast & Sheath Blight)',
        symptoms: 'पत्तियों पर आंख के आकार के धब्बे व तने पर भूरे चकत्ते।',
        chemicalDose: 'एजॉक्सीस्ट्रोबिन + डाइफेनोकोनाजोल (Amistar Top) 200 मिली प्रति 150 लीटर पानी।',
        organicDose: 'स्यूडोमोनास फ्लोरोसेंस 1 किग्रा/एकड़ गोबर की खाद में मिलाकर डालें।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब बालियों के 85% दाने सुनहरे पीले हो जाएं और नमी 20% के आसपास हो, कंबाइन या रीपर से काटें। सुखाकर नमी 14% पर भंडारण करें।',
      en: 'Harvest when 85% grains turn golden. Dry to 14% moisture before storage.'
    },
    marketSellingTip: {
      hi: 'बासमती धान को तुरंत गीला न बेचें; सुखाकर और ग्रेडिंग करके FPO या e-NAM पर बेचें, ₹300-500/क्विंटल अधिक मिलता है।',
      en: 'Grade and dry basmati paddy before selling on e-NAM to earn ₹300-500/qtl premium.'
    },
    intercroppingTip: {
      hi: 'धान की मेड़ों पर अरहर (Tur) या सनई लगाएं, जिससे अतिरिक्त आमदनी और नाइट्रोजन स्थिरीकरण होता है।',
      en: 'Plant Pigeon pea or Sesbania on paddy bunds for extra income.'
    }
  },
  {
    id: 'crop-wheat',
    name: { hi: 'गेहूं (Wheat)', en: 'High-Yield Wheat (HD-2967/3226)', hinglish: 'Gehu ki Unnat Kheti' },
    category: 'अनाज (Cereals)',
    season: 'रबी (Rabi)',
    icon: '🌾',
    demandScore: 9.8,
    demandTrend: '🔥 बहुत भारी मांग (Surging)',
    durationDays: '120 - 145 दिन',
    costPerAcre: 13500,
    expectedYieldPerAcre: '22 - 28 क्विंटल',
    marketRateAvg: '₹2,275 (MSP) - ₹2,700 / क्विंटल',
    netProfitPerAcre: '₹35,000 - ₹60,000',
    soilRequirement: {
      hi: 'बलुई दोमट से चिकनी दोमट मिट्टी जिसमें जल निकास उत्तम हो, pH 6.5 से 8.0।',
      en: 'Well-drained sandy loam to clay loam soils with pH 6.5-8.0.',
      hinglish: 'Balui domat ya loam soil jisme drainage acchi ho.'
    },
    bestVarieties: ['HD-3226 (पूसा यशस्वी - उच्च प्रोटीन)', 'HD-2967 (हर क्षेत्र के लिए अनुकूल)', 'DBW-187 (करन वंदना - 30 क्विंटल क्षमता)', 'DBW-303 (करन वैष्णवी)', 'PBW-824'],
    seedRateAndTreatment: {
      hi: 'समय पर बुवाई: 40 किग्रा/एकड़, पिछेती बुवाई: 50 किग्रा/एकड़। बीजोपचार: 2 ग्राम टेबुकोनाजोल (Raxil Easy) + 5 मिली इमिडाक्लोप्रिड प्रति किग्रा बीज।',
      en: 'Seed rate: 40 kg/acre timely, 50 kg late. Treat with Tebuconazole 2% DS (2g/kg).'
    },
    sowingTechnique: {
      hi: '1 से 20 नवंबर सर्वोत्तम समय। सुपर सीडर या हैप्पी सीडर द्वारा पराली प्रबंधन के साथ 20 सेमी कतार दूरी पर 4-5 सेमी गहराई पर बोएं।',
      en: 'Sow between Nov 1-20 using Super Seeder or Happy Seeder at 20cm row spacing.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'बुवाई के समय: 1 बोरी DAP (50 किग्रा) + 1 बोरी MOP (25 किग्रा) + 10 किग्रा जिंक सल्फेट 33%।',
        en: '1 bag DAP + 25kg MOP + 10kg Zinc 33% at sowing.'
      },
      firstTopDressing: {
        hi: 'पहली सिंचाई (CRI स्टेज 21 दिन) पर: 1 बोरी यूरिया (45 किग्रा) + 2 किग्रा सल्फर 90% WDG।',
        en: 'First irrigation (21 DAS): 45kg Urea + 2kg Sulphur 90%.'
      },
      secondTopDressing: {
        hi: 'दूसरी सिंचाई (40-45 दिन) पर: 30 किग्रा यूरिया या 500 मिली नैनो यूरिया स्प्रे।',
        en: 'Second irrigation: 30kg Urea or 1 bottle Nano Urea spray.'
      },
      nanoFertilizer: {
        hi: 'झंडा पत्ती (Flag Leaf) अवस्था पर 1 किग्रा 13-0-45 (पोटैशियम नाइट्रेट) + 100ml बोरॉन 20% का फोलियर स्प्रे दाने का वजन बढ़ाता है।',
        en: 'Flag leaf stage: 1kg 13:0:45 + 100g Boron 20% spray.'
      }
    },
    irrigationSchedule: [
      { hi: '1. सीआरआई स्टेज (CRI Stage): 21 दिन बाद (सबसे महत्वपूर्ण सिंचाई)।', en: '1. CRI Stage: 20-22 DAS (Crucial).' },
      { hi: '2. कल्ले फूटते समय (Tillering): 40-45 दिन बाद।', en: '2. Tillering Stage: 40-45 DAS.' },
      { hi: '3. गांठ बनते समय (Jointing): 60-65 दिन बाद।', en: '3. Jointing Stage: 60-65 DAS.' },
      { hi: '4. फूल आने पर (Flowering): 80-85 दिन बाद (इस समय तेज हवा में पानी न दें)।', en: '4. Flowering Stage: 80-85 DAS.' },
      { hi: '5. दुग्ध व दाना भराव (Milking/Dough): 100-105 दिन बाद।', en: '5. Milking/Dough Stage: 100-105 DAS.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'पीला रतुआ (Yellow Rust / हल्दी रोग)',
        symptoms: 'पत्तियों पर पीले रंग की हल्दी जैसी धारियां, हाथ लगाने पर पीला पाउडर लगना।',
        chemicalDose: 'प्रोपिकोनाजोल 25% EC (Tilt) 200 मिली प्रति 150-200 लीटर पानी में तुरंत स्प्रे करें।',
        organicDose: 'खट्टी छाछ (5 लीटर) + हींग 50 ग्राम प्रति 150 लीटर पानी में स्प्रे।'
      },
      {
        pestName: 'गुलाबी तना भेदक व माहू (Aphids)',
        symptoms: 'पत्तियों और बालियों से रस चूसना, पौधे का काला पड़ना।',
        chemicalDose: 'थायामेथोक्सम 25% WG 100 ग्राम या इमिडाक्लोप्रिड 17.8% SL 50 मिली प्रति एकड़।',
        organicDose: 'नीम का काढ़ा या वर्मीवॉश 10 लीटर प्रति एकड़ स्प्रे।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब दाने कठोर हो जाएं और दबाने पर टूटने की आवाज आए (नमी 12% से कम), कंबाइन से कटाई करें।',
      en: 'Harvest when moisture is below 12%.'
    },
    marketSellingTip: {
      hi: 'सरकारी खरीद केंद्रों (MSP) पर स्लॉट बुक करें या आटा मिलों को सीधे ग्रेड 1 गेहूं ₹200 प्रीमियम पर बेचें।',
      en: 'Direct sell to flour mills or MSP procurement mandis.'
    },
    intercroppingTip: {
      hi: 'गेहूं के साथ हर 8-9 कतार के बाद 1 कतार सरसों (Mustard) बोने से कीट नियंत्रण और ₹8,000 अतिरिक्त मुनाफा होता है।',
      en: 'Intercrop 1 row of Mustard every 9 rows of wheat.'
    }
  },
  {
    id: 'crop-garlic',
    name: { hi: 'लहसुन (Garlic - G2 / रियावन)', en: 'High-Profit Garlic (Riyawan / Ooty)', hinglish: 'Lahsun ki Bumper Kamai' },
    category: 'सब्जियां (Vegetables)',
    season: 'रबी (Rabi)',
    icon: '🧄',
    demandScore: 9.9,
    demandTrend: '🔥 बहुत भारी मांग (Surging)',
    durationDays: '130 - 150 दिन',
    costPerAcre: 35000,
    expectedYieldPerAcre: '40 - 55 क्विंटल (सूखा कंद)',
    marketRateAvg: '₹8,000 - ₹22,000 / क्विंटल (औसत ₹12,000)',
    netProfitPerAcre: '₹3,00,000 - ₹7,00,000 (1 एकड़ में लखपति)',
    soilRequirement: {
      hi: 'जीवांश युक्त रेतीली दोमट या काली भुरभुरी मिट्टी जिसमें जलभराव न हो, pH 6.0-7.5।',
      en: 'Rich, fertile sandy loam with high organic matter and good drainage.',
      hinglish: 'Bhurbhuri domat ya kali mitti jisme drainage badiya ho.'
    },
    bestVarieties: ['रियावन सिल्वर (Riyawan Garlic - MP का किंग, सफेद बड़ा कंद)', 'G-2 (यमुना सफेद 2)', 'G-323', 'ऊटी-1 (पहाड़ी/दक्षिण क्षेत्र)', 'भीमा ओंकार'],
    seedRateAndTreatment: {
      hi: 'कली (Cloves): 200 - 250 किग्रा प्रति एकड़। बीजोपचार: 2.5 ग्राम मैंकोजेब + 2 मिली क्लोरपायरीफॉस प्रति किग्रा कली से उपचारित करके बोएं।',
      en: 'Seed cloves: 200-250 kg/acre. Treat with Mancozeb (2.5g/kg) + Chlorpyrifos.'
    },
    sowingTechnique: {
      hi: 'सितंबर अंत से अक्टूबर सर्वोत्तम। कतार से कतार 15 सेमी और कली से कली 8-10 सेमी की दूरी पर, कली का नुकीला भाग ऊपर रखकर 2-3 सेमी गहराई पर लगाएं। ड्रिप व मल्चिंग से 30% अधिक उपज।',
      en: 'Plant in Oct at 15x8cm spacing. Pointed end upwards. Drip + silver-black mulch yields 30% more.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'खेत तैयारी में 5 ट्रॉली सड़ी गोबर खाद + 1 बोरी DAP + 1 बोरी पोटाश (MOP) + 25 किग्रा सिंगल सुपर फॉस्फेट (SSP) + 10 किग्रा सल्फर 90%।',
        en: 'FYM + 1 bag DAP + 1 bag MOP + 25kg SSP + 10kg Sulphur 90%.'
      },
      firstTopDressing: {
        hi: 'बुवाई के 30-35 दिन बाद: 30 किग्रा यूरिया + 5 किग्रा माइक्रोन्यूट्रिएंट मिश्रण।',
        en: '30 DAS: 30kg Urea + 5kg Micronutrient mix.'
      },
      secondTopDressing: {
        hi: 'बुवाई के 60 दिन बाद: 25 किग्रा यूरिया + 1 किग्रा 19-19-19 फोलियर स्प्रे।',
        en: '60 DAS: 25kg Urea + 1kg 19:19:19 spray.'
      },
      nanoFertilizer: {
        hi: 'कंद बनते समय (85-90 दिन): 0-0-50 (सल्फेट ऑफ पोटाश) 1.5 किग्रा + बोरॉन 20% 150 ग्राम + कल्टार/चमत्कार (PGR) 50ml स्प्रे करने से कंद का साइज दोगुना हो जाता है।',
        en: 'Bulbing stage (85 DAS): 0:0:50 (1.5kg) + Boron (150g) + PGR spray for jumbo bulb size.'
      }
    },
    irrigationSchedule: [
      { hi: 'बुवाई के तुरंत बाद पहली हल्की सिंचाई दें।', en: 'Light irrigation immediately after planting.' },
      { hi: 'शुरुआती 30 दिन: 7-8 दिन के अंतराल पर सिंचाई।', en: 'First 30 days: 7-8 day intervals.' },
      { hi: 'कंद बनते समय: 10-12 दिन के अंतराल पर नमी बनाए रखें।', en: 'Bulb formation: Maintain uniform moisture.' },
      { hi: 'खुदाई से 15-20 दिन पहले: सिंचाई पूरी तरह बंद कर दें ताकि कंद का छिलका मजबूत बने।', en: 'Stop water 15-20 days before harvest.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'थ्रिप्स (Thrips - पत्तियां पीली व मुड़ना)',
        symptoms: 'पत्तियों पर सफेद-चांदी जैसी धारियां व नोक का सूखना।',
        chemicalDose: 'फिप्रोनिल 5% SC (Regent) 300 मिली या स्पिनेटोरम (Delegate) 180 मिली प्रति 150 लीटर पानी।',
        organicDose: 'नीला चिपचिपा ट्रैप (Blue Sticky Trap) 15 प्रति एकड़ + 10,000 ppm नीम ऑयल 3 मिली/लीटर।'
      },
      {
        pestName: 'पर्पल ब्लॉच व जड़ सड़न (Purple Blotch & Root Rot)',
        symptoms: 'पत्तियों पर बैंगनी धब्बे और नीचे से कंद का सड़ना।',
        chemicalDose: 'कस्टोडिया (Azoxystrobin + Tebuconazole) 250 मिली प्रति एकड़ स्प्रे।',
        organicDose: 'ट्राइकोडर्मा विरिडी 2 किग्रा/एकड़ गोबर खाद में मिलाकर बुवाई पूर्व मिट्टी में डालें।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब 70% पौधे ऊपर से सूखकर झुक जाएं, हाथ से या ट्रैक्टर डिगर से निकालें। 3-4 दिन छाया में सुखाएं और डंठल 2 सेमी छोड़कर काटें। हवादार गोदाम में 6-8 महीने तक सुरक्षित रहता है।',
      en: 'Harvest when 70% tops fall over. Cure in shade for 4 days before grading.'
    },
    marketSellingTip: {
      hi: 'लहसुन को कभी भी खुदाई के तुरंत बाद सस्ते में न बेचें। ग्रेडिंग (सुपर बोल्ड, मीडियम, गोला) करके मई-जून या दिवाली के आसपास बेचें जब भाव ₹15,000-20,000/क्विंटल तक पहुंचता है।',
      en: 'Store and sell during festive off-season (May-Oct) for 2x to 3x price appreciation.'
    },
    intercroppingTip: {
      hi: 'लहसुन के चारों तरफ गेंदा (Marigold) लगाएं जिससे नेमाटोड और थ्रिप्स कीट नहीं आते।',
      en: 'Border crop with Marigold to repel nematodes and thrips.'
    }
  },
  {
    id: 'crop-sugarcane',
    name: { hi: 'गन्ना (Sugarcane - ट्रेंच विधि)', en: 'Sugarcane (Trench & Ring Pit Tech)', hinglish: 'Ganna ki Trench Kheti' },
    category: 'नकदी फसलें (Cash Crops)',
    season: 'सालभर (Year-Round)',
    icon: '🎋',
    demandScore: 9.4,
    demandTrend: '📈 निरंतर मांग (High Demand)',
    durationDays: '10 - 12 महीने',
    costPerAcre: 32000,
    expectedYieldPerAcre: '450 - 650 क्विंटल (ट्रेंच विधि)',
    marketRateAvg: '₹370 - ₹400 / क्विंटल (मिल एडवाइज्ड रेट)',
    netProfitPerAcre: '₹1,20,000 - ₹2,00,000',
    soilRequirement: {
      hi: 'गहरी दोमट मिट्टी जिसमें जीवांश अधिक हो और जल निकास उत्तम हो, pH 6.5 से 7.5।',
      en: 'Deep alluvial or loamy soil with high organic content.'
    },
    bestVarieties: ['Co-0238 (करण 4 - उच्च चीनी)', 'Co-15023 (अगेती उच्च रिकवरी)', 'CoLk-14201', 'Co-0118', 'Co-98014'],
    seedRateAndTreatment: {
      hi: 'दो आंख के 15,000 टुकड़े प्रति एकड़। बीजोपचार: 200 ग्राम कार्बेन्डाजिम + 100 ग्राम इमिडाक्लोप्रिड को 100 लीटर पानी में घोलकर 15 मिनट गंडे भिगोएं।',
      en: '15,000 two-bud setts/acre. Treat with Carbendazim (0.2%) + Imidacloprid.'
    },
    sowingTechnique: {
      hi: 'ट्रेंच विधि: ट्रेंच ओपनर से 4 से 5 फीट की दूरी पर 30 सेमी गहरी नाली बनाएं। सेट को नाली में रखकर 2 इंच मिट्टी से ढकें। ड्रिप इरिगेशन से 50% पानी बचता है और 150 क्विंटल उपज बढ़ती है।',
      en: 'Trench method: 4-5 feet row spacing, 30cm trench depth. Drip fertigation.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'बुवाई के समय: 2 बोरी DAP + 1 बोरी MOP + 25 किग्रा जिंक सल्फेट + 10 किग्रा फेरस सल्फेट + 5 किग्रा फिपरोनिल (दीमक नियंत्रण)।',
        en: '2 bags DAP + 1 bag MOP + 25kg Zinc + 5kg Fipronil granules.'
      },
      firstTopDressing: {
        hi: '45 दिन पर (कल्ले फूटते समय): 1 बोरी यूरिया + 5 किग्रा बायो-जाइम।',
        en: '45 DAP: 45kg Urea + 5kg Bio-zyme.'
      },
      secondTopDressing: {
        hi: '90 दिन पर (मिट्टी चढ़ाते समय): 1 बोरी यूरिया + 25 किग्रा पोटाश।',
        en: '90 DAP: 45kg Urea + 25kg Potash during earthing up.'
      },
      nanoFertilizer: {
        hi: '120-150 दिन पर नैनो यूरिया + नैनो DAP (4ml/L) का ड्रोन द्वारा छिड़काव।',
        en: 'Foliar drone spray of Nano Urea at grand growth stage.'
      }
    },
    irrigationSchedule: [
      { hi: 'गर्मियों में 8-10 दिन के अंतराल पर और सर्दियों में 15-20 दिन पर सिंचाई करें।', en: '8-10 days interval in summer.' },
      { hi: 'मिट्टी चढ़ाने के बाद नालियों में ही पानी दें, पूरे खेत में जलभराव न करें।', en: 'Irrigate only inside trenches.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'टॉप बोरर व कंसुआ (Early Shoot Borer)',
        symptoms: 'गोभ सूखना और पौधे का विकास रुकना।',
        chemicalDose: 'कोराजन (Chlorantraniliprole) 150 मिली प्रति एकड़ को 400 लीटर पानी में घोलकर गन्ने की जड़ों के पास ड्रेन्चिंग करें।',
        organicDose: 'फेरोमोन ट्रैप 10 प्रति एकड़ + ट्राइकोग्रामा चिलोनिस कार्ड।'
      },
      {
        pestName: 'रेड रॉट (लाल सड़न रोग - गन्ने का कैंसर)',
        symptoms: 'पत्तियों की मध्य शिरा लाल होना और तना फाड़ने पर शराब जैसी गंध।',
        chemicalDose: 'रोगग्रस्त पौधों को उखाड़कर नष्ट करें; बीजोपचार कार्बेन्डाजिम से अनिवार्य है।',
        organicDose: 'ट्राइकोडर्मा हारजिएनम 5 किग्रा/एकड़ गोबर खाद में मिलाकर खेत में फैलाएं।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब सुक्रोज ब्रिक्स 18-20% हो जाए, जमीन की सतह से सटाकर धारदार दरांती से काटें।',
      en: 'Cut flush to ground level when brix reaches 18-20%.'
    },
    marketSellingTip: {
      hi: 'शुगर मिल को समय पर सप्लाई टोकन से दें या सीधे गुड़ (Jaggery / Organic Shakkar) बनाकर ₹60-80/किग्रा बेचें, जिससे 40% अतिरिक्त लाभ होता है।',
      en: 'Produce chemical-free organic jaggery/shakkar to earn 40% more than mill price.'
    },
    intercroppingTip: {
      hi: '4-5 फीट चौड़ी ट्रेंच के बीच आलू, गोभी, लहसुन, धनिया या उड़द/मूंग की सह-फसली खेती करें। गन्ने की पूरी लागत सह-फसल से निकल जाती है!',
      en: 'Intercrop Potato, Garlic, or Green gram in 5-foot trenches to offset 100% cultivation cost.'
    }
  },
  {
    id: 'crop-mustard',
    name: { hi: 'सरसों (Mustard - पीली व काली)', en: 'High-Oil Mustard / Rapeseed', hinglish: 'Sarson ki Unnat Kheti' },
    category: 'दलहन एवं तिलहन (Pulses/Oilseeds)',
    season: 'रबी (Rabi)',
    icon: '🌼',
    demandScore: 9.6,
    demandTrend: '🔥 बहुत भारी मांग (Surging)',
    durationDays: '110 - 135 दिन',
    costPerAcre: 9000,
    expectedYieldPerAcre: '10 - 14 क्विंटल',
    marketRateAvg: '₹5,650 (MSP) - ₹6,500 / क्विंटल',
    netProfitPerAcre: '₹45,000 - ₹75,000',
    soilRequirement: {
      hi: 'बलुई दोमट से मटियार मिट्टी, कम पानी वाले क्षेत्रों के लिए वरदान, pH 6.5 से 8.0।',
      en: 'Light to heavy loam, drought-tolerant, pH 6.5-8.0.'
    },
    bestVarieties: ['RH-725 (हरियाणा - 12-14 क्विंटल)', 'पूसा मस्टर्ड 31 (कैनोला टाइप 41% तेल)', 'गिरिराज (DRMRIJ-31)', 'पायनियर 45S46 (हाइब्रिड)', 'NRCHB-101'],
    seedRateAndTreatment: {
      hi: '1.5 से 2.0 किग्रा प्रति एकड़। बीजोपचार: 3 ग्राम थीरम या कार्बेंडाजिम + 6 ग्राम इमिडाक्लोप्रिड प्रति किग्रा बीज।',
      en: '1.5-2 kg/acre. Seed treatment with Thiram + Imidacloprid.'
    },
    sowingTechnique: {
      hi: '25 सितंबर से 20 अक्टूबर सर्वोत्तम। कतार से कतार 30-45 सेमी और पौधे से पौधे 10-15 सेमी की दूरी पर 3-4 सेमी गहराई पर बोएं।',
      en: 'Sow between Sep 25 - Oct 20 at 45x15cm spacing.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'बुवाई के समय: 1 बोरी SSP (सिंगल सुपर फॉस्फेट 50 किग्रा) + 25 किग्रा DAP + 15 किग्रा पोटाश + 10 किग्रा बेंटोनाइट सल्फर 90% (सल्फर तेल की मात्रा 3-5% बढ़ाता है)।',
        en: '1 bag SSP + 25kg DAP + 15kg MOP + 10kg Sulphur 90% (boosts oil content).'
      },
      firstTopDressing: {
        hi: 'पहली सिंचाई (30-35 दिन) पर: 35 किग्रा यूरिया प्रति एकड़।',
        en: 'First irrigation: 35kg Urea.'
      },
      secondTopDressing: {
        hi: 'फूल आने से पहले: नैनो यूरिया (4ml/L) + 0-52-34 (1 किग्रा/एकड़) का स्प्रे।',
        en: 'Pre-flowering: Nano Urea + 0:52:34 foliar spray.'
      },
      nanoFertilizer: {
        hi: 'फलियां बनते समय बोरॉन 20% 100 ग्राम प्रति 150 लीटर पानी में स्प्रे करें।',
        en: 'Siliqua formation: Boron 20% (100g) foliar spray.'
      }
    },
    irrigationSchedule: [
      { hi: '1. पहली सिंचाई: बुवाई के 30-35 दिन बाद (शाखाएं निकलते समय)।', en: '1. Branching stage: 30-35 DAS.' },
      { hi: '2. दूसरी सिंचाई: बुवाई के 60-65 दिन बाद (फूल से फली बनते समय)।', en: '2. Pod formation: 60-65 DAS.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'माहू / चेपा (Mustard Aphid)',
        symptoms: 'शाखाओं व फूलों पर काले-हरे कीड़ों का झुंड रस चूसना, फलियां न बनना।',
        chemicalDose: 'डाइमेथोएट 30% EC 300 मिली या थायामेथोक्सम 25% WG 80 ग्राम प्रति 150 लीटर पानी में शाम के समय स्प्रे करें।',
        organicDose: '5% नीम बीज अर्क (NSKE) या साबुन के घोल के साथ नीम तेल 5 मिली/लीटर।'
      },
      {
        pestName: 'सफेद रतुआ (White Rust) व अल्टरनेरिया झुलसा',
        symptoms: 'पत्तियों की निचली सतह पर सफेद फफोले और फलियों का विकृत होना।',
        chemicalDose: 'रिडोमिल गोल्ड (Metalaxyl + Mancozeb) 400 ग्राम प्रति 200 लीटर पानी।',
        organicDose: 'कॉपर ऑक्सीक्लोराइड 500 ग्राम + गाय का मट्ठा 5 लीटर प्रति एकड़।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब फलियां 75% पीली पड़ जाएं, सुबह के समय कटाई करें ताकि फलियां चटक कर बीज न गिरें।',
      en: 'Harvest in early morning when 75% pods turn golden yellow.'
    },
    marketSellingTip: {
      hi: 'सरसों का तेल खुद निकलवाकर शुद्ध कच्ची घानी मस्टर्ड ऑयल के रूप में ₹160-190/लीटर बेचें और खली (Mustard cake) पशुपालकों को ₹2,800/क्विंटल बेचें। मुनाफा 50% बढ़ जाएगा।',
      en: 'Extract virgin cold-pressed mustard oil and sell directly for 50% extra profit.'
    },
    intercroppingTip: {
      hi: 'चने के साथ 6:1 अनुपात में सरसों बोने से दोनों फसलों में रोग कम होते हैं और परागण बढ़ता है।',
      en: 'Intercrop with Chickpea in 6:1 row ratio.'
    }
  },
  {
    id: 'crop-dragonfruit',
    name: { hi: 'ड्रैगन फ्रूट (Dragon Fruit / कमलम)', en: 'Super-Profit Dragon Fruit Orchard', hinglish: 'Dragon Fruit ki Lakhpati Kheti' },
    category: 'हाई-प्रॉफिट व औषधीय (High Profit & Medicinal)',
    season: 'सालभर (Year-Round)',
    icon: '🌵',
    demandScore: 9.9,
    demandTrend: '🚀 एक्सपोर्ट मांग (Export Boom)',
    durationDays: '25-30 साल तक लगातार फल',
    costPerAcre: 350000, // One-time setup
    expectedYieldPerAcre: '8 - 12 टन / एकड़ (तीसरे साल से)',
    marketRateAvg: '₹120 - ₹250 / किग्रा',
    netProfitPerAcre: '₹7,00,000 - ₹14,00,000 प्रति वर्ष',
    soilRequirement: {
      hi: 'रेतीली दोमट मिट्टी जिसमें जलभराव बिल्कुल न हो, pH 5.5 से 7.0, कम पानी व शुष्क जलवायु के लिए उत्तम।',
      en: 'Sandy loam with excellent drainage, pH 5.5-7.0, drought tolerant.'
    },
    bestVarieties: ['रॉयल रेड (Royal Red - अंदर से लाल, सबसे मीठा)', 'सफेद गूदा (White Flesh - वियतनाम)', 'सियाम रेड', 'पीला ड्रैगन (Yellow Dragon - सबसे महंगा ₹350/kg)'],
    seedRateAndTreatment: {
      hi: 'प्रति एकड़ 500 सीमेंट पोल (RCC Pole) + 2000 पौधे (प्रत्येक पोल पर 4 कटिंग)। पौधे फंगसरोधी घोल में डुबोकर लगाएं।',
      en: '500 poles/acre with 4 cuttings per pole = 2000 plants/acre.'
    },
    sowingTechnique: {
      hi: 'पोल से पोल दूरी 10x8 फीट। 6.5 फीट का सीमेंट पोल गाड़कर ऊपर गोल रिंग या टायर लगाएं। पौधे को पोल से बांधें। ड्रिप इरिगेशन अनिवार्य है।',
      en: 'Trellis system with 10x8ft pole spacing. Circular top ring for canopy support.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'प्रति पोल 15 किग्रा सड़ी गोबर खाद + 100g DAP + 100g पोटाश + 50g नीम खली साल में 3 बार (फरवरी, जून, अक्टूबर)।',
        en: '15kg FYM + 100g DAP + 100g MOP per pole 3 times a year.'
      },
      firstTopDressing: {
        hi: 'फूल आते समय (मई से अक्टूबर): 19-19-19 ड्रिप द्वारा 3 किग्रा/एकड़ प्रति सप्ताह।',
        en: 'Fertigation with 19:19:19 (3kg/acre/week) during flowering season.'
      },
      secondTopDressing: {
        hi: 'फल का वजन बढ़ाते समय: 0-0-50 + बोरॉन 20% का ड्रिप व फोलियर स्प्रे।',
        en: '0:0:50 + Boron drip during fruit sizing.'
      },
      nanoFertilizer: {
        hi: 'नैनो यूरिया + सीवीड एक्सट्रैक्ट (Seaweed) का महीने में एक बार छिड़काव।',
        en: 'Seaweed extract + Nano Urea monthly foliar spray.'
      }
    },
    irrigationSchedule: [
      { hi: 'कैक्टस प्रजाति होने के कारण बहुत कम पानी चाहिए; ड्रिप से 1-2 घंटे हफ्ते में 2 बार पर्याप्त है।', en: 'Low water requirement. Drip irrigation 2 hours twice weekly.' },
      { hi: 'बरसात में जलभराव न होने दें; पानी रुकने से जड़ें सड़ जाती हैं।', en: 'Ensure zero waterlogging.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'एंथ्रेक्नोज व तना सड़न (Stem Rot & Canker)',
        symptoms: 'तने पर भूरे-काले धब्बे और पीलापन।',
        chemicalDose: 'कॉपर ऑक्सीक्लोराइड 3 ग्राम/लीटर या हेक्साकोनाजोल 2 मिली/लीटर का छिड़काव।',
        organicDose: 'बोर्डो मिश्रण (1%) या स्यूडोमोनास 10 ग्राम/लीटर स्प्रे।'
      },
      {
        pestName: 'चींटियां व फल मक्खी (Ants & Fruit Fly)',
        symptoms: 'फूलों की कलियों को काटना और फलों पर डंक मारना।',
        chemicalDose: 'क्लोरोपायरीफॉस का पोल के नीचे घेरा बनाएं; मिथाइल यूजेनॉल ट्रैप लगाएं।',
        organicDose: 'पोल के निचले हिस्से पर चिपचिपा गोंद या ग्रीस लगाएं।'
      }
    ],
    harvestingAndStorage: {
      hi: 'फूल खिलने के 30-35 दिन बाद फल का रंग हरा से गहरा गुलाबी हो जाता है। सुबह तोड़कर ग्रेडिंग करें; 15 दिन तक ताजा रहता है।',
      en: 'Harvest 30 days after flowering when skin turns deep pink.'
    },
    marketSellingTip: {
      hi: 'सुपरमार्केट (Reliance Fresh, BigBasket), होटल चेन्स और एक्सपोर्टर्स से सीधे एग्रीमेंट करें। ग्रेडिंग करके ₹150/kg न्यूनतम सुरक्षित मिलता है।',
      en: 'Direct tie-ups with organic stores, supermarkets, and B2B buyers.'
    },
    intercroppingTip: {
      hi: 'शुरुआती 2 साल में पोलों के बीच खाली जगह में तरबूज, पपीता, लहसुन, मिर्च या खीरा लगाकर ₹1.5 लाख अतिरिक्त कमाएं।',
      en: 'Intercrop Watermelon, Papaya, or Garlic in open spaces during first 2 years.'
    }
  },
  {
    id: 'crop-tomato',
    name: { hi: 'टमाटर (Tomato - ओपन व पॉलीहाउस)', en: 'High-Yield Hybrid Tomato', hinglish: 'Tamatar ki Adhunik Kheti' },
    category: 'सब्जियां (Vegetables)',
    season: 'सालभर (Year-Round)',
    icon: '🍅',
    demandScore: 9.7,
    demandTrend: '🔥 बहुत भारी मांग (Surging)',
    durationDays: '120 - 150 दिन',
    costPerAcre: 35000,
    expectedYieldPerAcre: '250 - 350 क्विंटल (पॉलीहाउस में 600 क्विंटल+)',
    marketRateAvg: '₹1,200 - ₹3,500 / क्विंटल (ऑफ सीजन ₹5,000+)',
    netProfitPerAcre: '₹1,50,000 - ₹4,50,000',
    soilRequirement: {
      hi: 'बलुई दोमट या मटियार दोमट, उत्तम जल निकास, pH 6.0 से 7.0।',
      en: 'Well-drained loamy soil rich in organic matter, pH 6.0-7.0.'
    },
    bestVarieties: ['अभिनव (Seminis Abhinav - कठोर फल, लंबी दूरी परिवहन)', 'साहो (Syngenta Saho - 3251)', 'अर्का रक्षक (F1 - त्रिविध प्रतिरोधी)', 'हिमसोना', 'US-440'],
    seedRateAndTreatment: {
      hi: '40 - 50 ग्राम प्रति एकड़ हाइब्रिड बीज। प्रो-ट्रे (Pro-tray) में कोकोपीट और वर्मीक्यूलाइट के साथ नर्सरी तैयार करें।',
      en: '40-50g/acre hybrid seed. Raise seedlings in pro-trays with cocopeat.'
    },
    sowingTechnique: {
      hi: 'बेड बनाकर (3 फीट चौड़ी, 1 फीट ऊंची), 25 माइक्रोन सिल्वर-ब्लैक मल्चिंग शीट बिछाएं। पौधे से पौधा 1.5 फीट और लाइन से लाइन 4 फीट पर लगाएं। तार-बांस स्टेकिंग (Staking) अनिवार्य है।',
      en: 'Raised bed with 25 micron silver-black mulch + drip irrigation + bamboo staking.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'बेड बनाते समय 10 टन गोबर खाद + 50 किग्रा DAP + 40 किग्रा पोटाश + 25 किग्रा मैग्नीशियम सल्फेट + 10 किग्रा नीम खली।',
        en: '10 tons FYM + 50kg DAP + 40kg MOP + 25kg MgSO4.'
      },
      firstTopDressing: {
        hi: 'ड्रिप द्वारा 19-19-19 (3 किग्रा/एकड़) सप्ताह में 2 बार रोपाई के 10वें दिन से 40वें दिन तक।',
        en: 'Fertigate 19:19:19 (3kg/acre) twice weekly from 10 to 40 DAT.'
      },
      secondTopDressing: {
        hi: 'फूल व फल बनते समय 12-61-00 और 0-52-34 (4 किग्रा/एकड़) + कैल्शियम नाइट्रेट 3 किग्रा।',
        en: 'Flowering: 12:61:00 + Calcium Nitrate to prevent blossom end rot.'
      },
      nanoFertilizer: {
        hi: 'फल चमक व वजन के लिए 0-0-50 + बोरॉन 20% (1g/L) का फोलियर स्प्रे।',
        en: 'Foliar spray of 0:0:50 + Boron for fruit shine and firmness.'
      }
    },
    irrigationSchedule: [
      { hi: 'ड्रिप इरिगेशन द्वारा प्रतिदिन 45 मिनट से 1 घंटा पानी दें।', en: 'Drip irrigation 45-60 mins daily.' },
      { hi: 'फल पकते समय अधिक जलभराव न होने दें वर्ना फल फटने (Cracking) लगते हैं।', en: 'Avoid sudden flooding during fruit ripening to prevent cracking.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'फल छेदक इल्ली (Helicoverpa / Fruit Borer)',
        symptoms: 'फलों में छेद करना और अंदर से खाना।',
        chemicalDose: 'एमामेक्टिन बेंजोएट 5% SG 80 ग्राम या फेम (Flubendiamide) 50 मिली प्रति 150 लीटर पानी।',
        organicDose: 'फेरोमोन ट्रैप (हेलिल्यूर) 8 प्रति एकड़ + BT (बैसिलस थुरिंजिएंसिस) 2 ग्राम/लीटर स्प्रे।'
      },
      {
        pestName: 'पत्ती मरोड़ विषाणु (Leaf Curl Virus - सफेद मक्खी द्वारा)',
        symptoms: 'पत्तियां ऊपर की तरफ मुड़ना, पीली पड़ना और झाड़ीनुमा होना।',
        chemicalDose: 'सफेद मक्खी नियंत्रण के लिए एसिटामिप्रिड 20% SP 100 ग्राम या डाइफेंथियूरॉन 50% WP 250 ग्राम प्रति एकड़।',
        organicDose: 'पीला चिपचिपा ट्रैप (Yellow Sticky Trap) 20 प्रति एकड़ + वर्टिसिलियम लेकानी 5 ग्राम/लीटर।'
      }
    ],
    harvestingAndStorage: {
      hi: 'दूर की मंडियों के लिए ब्रेकर स्टेज (हल्का लाल-गुलाबी) और स्थानीय बिक्री के लिए पूरा लाल फल तोड़ें। प्लास्टिक क्रेट में रखें।',
      en: 'Harvest at breaker stage for distant transport; full red for local mandis.'
    },
    marketSellingTip: {
      hi: 'टमाटर सॉस कंपनियों, कैचप फैक्ट्रियों या बिगबास्केट से सीधे कॉन्ट्रैक्ट करें; कोल्ड स्टोरेज में 12°C पर 3 हफ्ते तक रोककर ऑफ-सीजन में 3 गुना रेट पर बेचें।',
      en: 'Cold store at 12°C to sell during off-season price spikes.'
    },
    intercroppingTip: {
      hi: 'टमाटर के साथ गेंदे (Marigold) की बॉर्डर लाइन लगाने से नेमाटोड और फल छेदक इल्ली 70% कम हो जाती है।',
      en: 'Trap crop with African Marigold reduces fruit borer by 70%.'
    }
  },
  {
    id: 'crop-moringa',
    name: { hi: 'सहजन / मोरिंगा (Drumstick / ODC-3)', en: 'Superfood Moringa (Drumstick)', hinglish: 'Sahjan ki Kam Paani me Bumper Kamai' },
    category: 'हाई-प्रॉफिट व औषधीय (High Profit & Medicinal)',
    season: 'सालभर (Year-Round)',
    icon: '🌿',
    demandScore: 9.8,
    demandTrend: '🚀 एक्सपोर्ट मांग (Export Boom)',
    durationDays: '6 महीने में पहली तुड़ाई, 8-10 साल तक फलन',
    costPerAcre: 22000,
    expectedYieldPerAcre: '200 - 300 क्विंटल फली + पत्तियां',
    marketRateAvg: '₹30 - ₹90 / किग्रा फली (सूखी पत्ती पाउडर ₹400/kg)',
    netProfitPerAcre: '₹2,50,000 - ₹5,50,000 प्रति वर्ष',
    soilRequirement: {
      hi: 'बंजर, कंकरीली या रेतीली किसी भी मिट्टी में उग सकता है; सूखा सहन करने की गजब क्षमता, pH 6.0 से 8.5।',
      en: 'Thrives in barren, sandy, or semi-arid soils. Highly drought resistant.'
    },
    bestVarieties: ['ODC-3 (ऑडियंस - साल में 2 बार बंपर फलन)', 'PKM-1 (तमिलनाडु कृषि वि.वि.)', 'PKM-2', 'रोहित-1', 'सिद्धिविनायक'],
    seedRateAndTreatment: {
      hi: '350 - 400 ग्राम प्रति एकड़। बीजोपचार: बीजों को 12 घंटे पानी में भिगोकर 2 ग्राम बाविस्टिन से उपचारित करें।',
      en: '350-400g seed/acre. Soak for 12 hrs in water before sowing.'
    },
    sowingTechnique: {
      hi: 'पौधे से पौधा 6 फीट और लाइन से लाइन 10 फीट की दूरी पर 1x1 फीट का गड्ढा खोदकर लगाएं। 3 फीट ऊंचाई होने पर शीर्ष कलिका (Pruning) काटें ताकि अधिक शाखाएं फूटें।',
      en: 'Plant at 10x6ft spacing. Mandatory topping/pruning at 3ft and 6ft height for heavy branching.'
    },
    fertilizerSchedule: {
      basal: {
        hi: 'प्रति गड्ढा 10 किग्रा गोबर खाद + 50g सिंगल सुपर फॉस्फेट + 20g नीम खली।',
        en: '10kg FYM + 50g SSP per pit.'
      },
      firstTopDressing: {
        hi: 'कटाई/प्रूनिंग के बाद प्रति पेड़ 100g यूरिया + 50g पोटाश।',
        en: 'Post-pruning: 100g Urea + 50g MOP per tree.'
      },
      secondTopDressing: {
        hi: 'फूल आते समय 0-52-34 (2g/L) का फोलियर स्प्रे।',
        en: 'Flowering: 0:52:34 foliar spray.'
      },
      nanoFertilizer: {
        hi: 'नैनो यूरिया + बोरॉन का फोलियर स्प्रे फलियों की लंबाई 2.5 फीट तक बढ़ाता है।',
        en: 'Nano Urea + Boron spray increases pod length.'
      }
    },
    irrigationSchedule: [
      { hi: 'गर्मियों में 10-15 दिन में एक बार और सर्दियों में 25-30 दिन में पानी दें।', en: 'Irrigate every 10-15 days in summer.' },
      { hi: 'फूल आते समय अधिक पानी न दें वर्ना फूल झड़ जाते हैं।', en: 'Avoid over-irrigation during flowering to prevent flower drop.' }
    ],
    keyPestsAndRemedies: [
      {
        pestName: 'रोयेंदार इल्ली (Hairy Caterpillar) व फली मक्खी',
        symptoms: 'पत्तियां खाना और फलियों में सड़न पैदा करना।',
        chemicalDose: 'क्विनालफॉस 25% EC 2 मिली/लीटर पानी या प्रोफेनोफॉस 2 मिली/लीटर।',
        organicDose: 'नीम तेल 5 मिली + 10 ग्राम लहसुन-मिर्च पेस्ट प्रति लीटर पानी।'
      },
      {
        pestName: 'गोंद निकलना व तना गलन (Stem Gummosis)',
        symptoms: 'तने से चिपचिपा गोंद निकलना और छाल फटना।',
        chemicalDose: 'बोर्डो पेस्ट (1:1:10) तने पर लेप करें और कॉपर ऑक्सीक्लोराइड का छिड़काव करें।',
        organicDose: 'गाय का गोबर + गोमूत्र + चूना का लेप तने पर लगाएं।'
      }
    ],
    harvestingAndStorage: {
      hi: 'जब फलियां गोल, मुलायम और 1.5 से 2 फीट लंबी हों, दरांती से डंठल सहित तोड़ें।',
      en: 'Harvest tender, fleshy 1.5-2ft pods before seed hardening.'
    },
    marketSellingTip: {
      hi: 'फलियां सीधे सब्जी मंडी भेजें। अतिरिक्त पत्तियों को छाया में सुखाकर मोरिंगा लीफ पाउडर बनाकर ₹400-800/किग्रा हेल्थ सप्लीमेंट के रूप में ऑनलाइन (Amazon/Flipkart) बेचें।',
      en: 'Sell fresh drumsticks in mandis and dehydrate leaves into Moringa powder for export.'
    },
    intercroppingTip: {
      hi: '10x6 फीट की खाली जगह में तरबूज, उड़द, मूंग, चना या प्याज की खेती से दोहरा लाभ प्राप्त करें।',
      en: 'Intercrop Pulses, Onion, or Melons between rows.'
    }
  }
];

// 2. CENTRAL & STATE GOVT SCHEMES (सरकारी योजनाएं एवं 80% तक सब्सिडी)
export const KISAN_GOVT_SCHEMES_LIST: KisanGovtSchemeItem[] = [
  {
    id: 'pm-kusum-solar',
    name: { hi: 'पीएम कुसुम योजना (PM Kusum Solar Pump Subsidy)', en: 'PM Kusum Solar Pump Subsidy Scheme', hinglish: 'PM Kusum Solar Pump Yojna' },
    dept: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE)',
    subsidyRange: '60% से 90% सब्सिडी',
    badge: '⚡ फ्री बिजली व सोलर पंप',
    tagline: { hi: 'डीजल और बिजली के भारी बिल से आजादी, खेत में लगाएं 3HP से 10HP सोलर पंप मात्र 10% लागत पर!', en: 'Install 3HP to 10HP DC/AC Solar Pumps with up to 90% direct government subsidy.' },
    objective: {
      hi: 'किसानों को दिन के समय सिंचाई के लिए मुफ्त सौर ऊर्जा उपलब्ध कराना और अतिरिक्त बिजली ग्रिड को बेचकर प्रतिवर्ष ₹50,000 तक अतिरिक्त आमदनी।',
      en: 'Provide daytime irrigation power and enable farmers to sell surplus solar power to DISCOMs.'
    },
    financialBenefit: {
      hi: 'केन्द्र सरकार द्वारा 30% सब्सिडी + राज्य सरकार द्वारा 30% से 60% सब्सिडी। किसान को केवल 10% से 20% अंशदान जमा करना होता है (नाबार्ड लोन उपलब्ध)।',
      en: '30% Central Subsidy + 30-60% State Subsidy. Farmer pays only 10-20% margin money.'
    },
    eligibility: [
      'आवेदक के नाम पर कृषि भूमि (खतौनी/जमाबंदी) होनी चाहिए।',
      'खेत में पहले से कोई विद्युत कृषि कनेक्शन नहीं होना चाहिए (कंपोनेंट-B के लिए)।',
      'सिंचाई के लिए बोरवेल/कुआं या तालाब उपलब्ध होना चाहिए।'
    ],
    documentsRequired: ['आधार कार्ड', 'खसरा/खतौनी (जमीन का पर्चा)', 'बैंक पासबुक (Aadhaar Linked)', 'मोबाइल नंबर', 'पासपोर्ट साइज फोटो', 'भूमि का नक्शा'],
    howToApplySteps: [
      '1. अपने राज्य के कृषि ऊर्जा/उद्यान पोर्टल (जैसे pmkusum.mnre.gov.in या upagriculture.com) पर जाएं।',
      '2. "PM KUSUM सोलर पंप योजना" लिंक पर क्लिक कर किसान पंजीकरण संख्या दर्ज करें।',
      '3. पंप क्षमता चुनें (2 HP, 3 HP, 5 HP, 7.5 HP या 10 HP - AC/DC सबमर्सिबल या सरफेस)।',
      '4. अपनी जमीन का रकबा और बैंक विवरण भरकर फॉर्म सबमिट करें।',
      '5. चयन होने पर चालान द्वारा किसान अंशदान (10-20%) ऑनलाइन जमा करें। 30 दिन में वेंडर आपके खेत पर सोलर पैनल व पंप इंस्टाल करेगा।'
    ],
    portalUrl: 'https://pmkusum.mnre.gov.in',
    helpline: '1800-180-3333 (टोल फ्री)',
    icon: '☀️'
  },
  {
    id: 'pm-kisan-samman',
    name: { hi: 'पीएम किसान सम्मान निधि (PM-KISAN)', en: 'PM Kisan Samman Nidhi Yojana', hinglish: 'PM Kisan ₹6000 Har Saal' },
    dept: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    subsidyRange: '₹6,000 प्रति वर्ष (₹2,000 की 3 किस्तें)',
    badge: '💰 डायरेक्ट बैंक ट्रांसफर (DBT)',
    tagline: { hi: 'हर 4 महीने में सीधे बैंक खाते में ₹2,000, खाद-बीज खरीदने के लिए आर्थिक संबल।', en: 'Guaranteed direct income support of ₹6,000 per year directly in farmer bank accounts.' },
    objective: {
      hi: 'छोटे एवं सीमांत किसानों को खेती की शुरुआती लागत और घरेलू जरूरतों के लिए सुनिश्चित आर्थिक सहायता प्रदान करना।',
      en: 'Provide direct financial support to all landholding farmer families across India.'
    },
    financialBenefit: {
      hi: 'प्रतिवर्ष ₹6,000 की नकद राशि 3 समान किस्तों में (अप्रैल-जुलाई, अगस्त-नवंबर, दिसंबर-मार्च) सीधे बैंक खाते में।',
      en: '₹2,000 every 4 months directly transferred via Aadhaar-based DBT.'
    },
    eligibility: [
      'भारत का कोई भी नागरिक जिसके नाम पर कृषि योग्य भूमि पंजीकृत हो।',
      'संस्थागत भूमि धारक, सरकारी कर्मचारी या ₹10,000 से अधिक पेंशनभोगी पात्र नहीं हैं।'
    ],
    documentsRequired: ['आधार कार्ड', 'बैंक खाता (Aadhaar Seeding व NPCI Active)', 'भूमि का खतौनी/भूलेख रिकॉर्ड', 'मोबाइल नंबर'],
    howToApplySteps: [
      '1. आधिकारिक पोर्टल pmkisan.gov.in पर जाएं।',
      '2. "Farmers Corner" में जाकर "New Farmer Registration" पर क्लिक करें।',
      '3. आधार नंबर और मोबाइल नंबर डालकर OTP सत्यापित करें।',
      '4. राज्य, जिला, ब्लॉक, गांव और जमीन का खसरा नंबर भरकर सबमिट करें।',
      '5. eKYC अनिवार्य है (Portal पर OTP या CSC सेंटर पर बायोमेट्रिक द्वारा करें)।'
    ],
    portalUrl: 'https://pmkisan.gov.in',
    helpline: '155261 / 011-24300606',
    icon: '💳'
  },
  {
    id: 'smam-agri-mechanization',
    name: { hi: 'कृषि यंत्रीकरण एवं ट्रैक्टर-ड्रोन सब्सिडी (SMAM Yojana)', en: 'Agricultural Mechanization (SMAM Subsidy)', hinglish: 'Tractor & Drone Subsidy 40-80%' },
    dept: 'कृषि एवं सहकारिता विभाग',
    subsidyRange: '40% से 80% तक सब्सिडी',
    badge: '🚜 ट्रैक्टर, रोटावेटर, कंबाइन व ड्रोन',
    tagline: { hi: 'नया ट्रैक्टर, रोटावेटर, लेजर लेवलर, सुपर सीडर या कृषि ड्रोन खरीदने पर ₹50,000 से ₹5,00,000 तक की सीधी सब्सिडी!', en: 'Purchase modern farm implements, tractors, super seeders, and drones with massive government subsidies.' },
    objective: {
      hi: 'खेती में आधुनिक मशीनों के प्रयोग को बढ़ावा देकर मजदूरी लागत कम करना और समय की बचत करना।',
      en: 'Promote farm mechanization to reduce labor costs and increase agricultural productivity.'
    },
    financialBenefit: {
      hi: 'सामान्य किसान: 40-50% सब्सिडी। महिला, SC/ST एवं छोटे किसान: 50% से 80% सब्सिडी। कस्टम हायरिंग सेंटर (CHC) खोलने पर ₹10 लाख तक की 80% सब्सिडी।',
      en: '40-50% subsidy for individual farmers; up to 80% (max ₹10 Lakh) for establishing Custom Hiring Centres.'
    },
    eligibility: [
      'कृषि भूमि का स्वामित्व।',
      'पिछले 3-5 वर्षों में उसी उपकरण पर पहले कोई सरकारी सब्सिडी न ली हो।'
    ],
    documentsRequired: ['आधार कार्ड', 'खतौनी नकल', 'बैंक पासबुक व कैंसल चेक', 'कोटेशन (अधिकृत डीलर से)', 'जाति प्रमाण पत्र (यदि लागू हो)'],
    howToApplySteps: [
      '1. agrimachinery.nic.in पोर्टल पर जाएं।',
      '2. "Registration" टैब में "Farmer" विकल्प चुनें।',
      '3. आधार नंबर से ई-केवाईसी पूरा करें और भूमि विवरण दर्ज करें।',
      '4. जिस मशीन (ट्रैक्टर, रोटावेटर, ड्रोन आदि) पर सब्सिडी चाहिए उसे सेलेक्ट करें।',
      '5. डीलर का बिल/कोटेशन अपलोड करें। स्वीकृति के बाद टोकन मनी जमा कर मशीन खरीदें।'
    ],
    portalUrl: 'https://agrimachinery.nic.in',
    helpline: '1800-180-1551',
    icon: '🚜'
  },
  {
    id: 'per-drop-more-crop-drip',
    name: { hi: 'ड्रिप व स्प्रिंकलर सिंचाई सब्सिडी (Per Drop More Crop - PMKSY)', en: 'Micro-Irrigation Drip & Sprinkler Subsidy', hinglish: 'Drip Sinchai par 80% Subsidy' },
    dept: 'प्रधानमंत्री कृषि सिंचाई योजना (PMKSY)',
    subsidyRange: '70% से 85% सब्सिडी',
    badge: '💧 70% पानी बचत + 40% ज्यादा उपज',
    tagline: { hi: 'खेत में ड्रिप पाइपलाइन या फव्वारा सिंचाई लगाएं, सरकार देगी 80% तक खर्च!', en: 'Install high-efficiency Drip and Sprinkler irrigation systems with up to 85% subsidy.' },
    objective: {
      hi: 'कम पानी में अधिक क्षेत्र की सिंचाई करना, उर्वरक को सीधे जड़ों तक पहुंचाना (Fertigation) और मजदूरी कम करना।',
      en: 'Maximize water use efficiency, reduce weed growth, and automate liquid fertilizer delivery.'
    },
    financialBenefit: {
      hi: 'छोटे व सीमांत किसान: 75% से 85% सब्सिडी। बड़े किसान: 60% से 70% सब्सिडी। लागत का केवल 15-20% किसान को देना होता है।',
      en: 'Up to 85% subsidy for small and marginal farmers; 70% for large landholders.'
    },
    eligibility: [
      'कृषि योग्य भूमि का स्वामित्व और सुनिश्चित जल स्रोत (बोरवेल/पंप)।',
      'बागवानी, गन्ना, कपास, सब्जी या किसी भी फसल के किसान पात्र हैं।'
    ],
    documentsRequired: ['आधार कार्ड', 'जमीन की खतौनी व नक्शा', 'बैंक पासबुक', 'जल स्रोत का प्रमाण (बोरवेल फोटो)', 'पंजीकृत कंपनी का एस्टीमेट'],
    howToApplySteps: [
      '1. अपने राज्य के उद्यान विभाग (Horticulture Department) के पोर्टल पर जाएं।',
      '2. "सूक्ष्म सिंचाई / ड्रिप-स्प्रिंकलर योजना" में ऑनलाइन आवेदन भरें।',
      '3. फील्ड सर्वे के बाद उद्यान अधिकारी द्वारा स्वीकृति दी जाएगी।',
      '4. अधिकृत कंपनी (जैसे Jain Irrigation, Netafim) आपके खेत में सिस्टम लगाएगी और सब्सिडी सीधे कंपनी/बैंक खाते में जाएगी।'
    ],
    portalUrl: 'https://pmksy.gov.in',
    helpline: '1800-180-1551',
    icon: '💧'
  },
  {
    id: 'pm-fasal-bima-pmfby',
    name: { hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)', en: 'Pradhan Mantri Fasal Bima Yojana', hinglish: 'Fasal Bima - Barish/Sukha Suraksha' },
    dept: 'कृषि मंत्रालय, भारत सरकार',
    subsidyRange: 'प्रीमियम का 80-90% सरकार देती है',
    badge: '🛡️ सूखा, बाढ़, ओलावृष्टि व कीट सुरक्षा',
    tagline: { hi: 'मात्र 1.5% से 2% प्रीमियम पर पूरी फसल का बीमा, प्राकृतिक आपदा में पूरा मुआवजा गारंटीड!', en: 'Comprehensive crop insurance covering drought, unseasonal rain, hailstorms, and pests at minimal 1.5-2% premium.' },
    objective: {
      hi: 'मौसम की अनिश्चितता, ओलावृष्टि, बाढ़, कीट प्रकोप या आग लगने पर किसानों के वित्तीय नुकसान की 100% भरपाई करना।',
      en: 'Provide financial safety net against natural disasters, weather aberrations, and pest attacks.'
    },
    financialBenefit: {
      hi: 'खरीफ फसल: मात्र 2% प्रीमियम, रबी फसल: मात्र 1.5% प्रीमियम, वाणिज्यिक/बागवानी फसल: 5% प्रीमियम। शेष 90% प्रीमियम सरकार वहन करती है।',
      en: 'Farmers pay only 1.5% to 2% premium; rest is paid by Central & State govts.'
    },
    eligibility: ['सभी अधिसूचित फसलों के किसान (बटाईदार किसान भी पात्र हैं)।'],
    documentsRequired: ['आधार कार्ड', 'बैंक खाता (Aadhaar linked)', 'बुवाई प्रमाण पत्र / खतौनी', 'फसल बुवाई का स्व-घोषणा पत्र'],
    howToApplySteps: [
      '1. pmfby.gov.in पर जाएं या नजदीकी CSC सेंटर या बैंक शाखा जाएं।',
      '2. "Farmer Corner" पर क्लिक कर फसल का नाम और रकबा दर्ज करें।',
      '3. प्रीमियम राशि का ऑनलाइन भुगतान करें और पावती रसीद प्राप्त करें।',
      '4. आपदा आने पर 72 घंटे के अंदर "Crop Insurance App" या टोल फ्री नंबर पर दावा दर्ज करें।'
    ],
    portalUrl: 'https://pmfby.gov.in',
    helpline: '14447 (फसल बीमा हेल्पलाइन)',
    icon: '🛡️'
  },
  {
    id: 'kcc-kisan-credit-card',
    name: { hi: 'किसान क्रेडिट कार्ड (KCC Loan 4% ब्याज पर)', en: 'Kisan Credit Card (4% Interest Loan)', hinglish: 'KCC Loan ₹3 Lakh @ 4%' },
    dept: 'नाबार्ड (NABARD) एवं सभी वाणिज्यिक/ग्रामीण बैंक',
    subsidyRange: '3% ब्याज छूट (Effective Rate 4%)',
    badge: '💳 ₹3 लाख तक बिना गारंटी ऋण',
    tagline: { hi: 'खाद, बीज, कीटनाशक व पशुपालन के लिए ₹3,00,000 तक का सस्ता कर्ज सिर्फ 4% सालाना ब्याज पर!', en: 'Get up to ₹3,00,000 short-term credit at an ultra-low effective interest rate of 4% p.a.' },
    objective: {
      hi: 'किसानों को साहूकारों के भारी ब्याज चक्रव्यूह से बचाकर संस्थागत सस्ता ऋण उपलब्ध कराना।',
      en: 'Free farmers from private moneylenders with ultra-subsidized agricultural credit.'
    },
    financialBenefit: {
      hi: 'सामान्य ब्याज 7% होता है, समय पर चुकाने पर 3% की अतिरिक्त सब्सिडी (Interest Subvention) मिलती है, जिससे ब्याज दर मात्र 4% रह जाती है। ₹1.60 लाख तक बिना किसी बंधक (No Collateral) ऋण मिलता है।',
      en: 'Effective 4% p.a. interest rate upon timely repayment. Zero collateral up to ₹1.60 Lakh.'
    },
    eligibility: ['खेती योग्य भूमि के मालिक, पट्टेदार या पशुपालक/मत्स्यपालक किसान।'],
    documentsRequired: ['आधार कार्ड', 'पैन कार्ड', 'खतौनी की नकल', '2 पासपोर्ट फोटो', 'बैंक में KCC फॉर्म'],
    howToApplySteps: [
      '1. अपने बैंक की नजदीकी शाखा या CSC सेंटर जाएं।',
      '2. एक पेज का सरल KCC आवेदन फॉर्म भरें।',
      '3. जमीन की खतौनी और आधार कार्ड संलग्न करें।',
      '4. बैंक 14 दिनों के अंदर KCC कार्ड और लिमिट जारी करने के लिए बाध्य है।'
    ],
    portalUrl: 'https://pmkisan.gov.in/KCC.aspx',
    helpline: '1800-11-5526',
    icon: '🏦'
  }
];

// 3. AI KISAN MITRA KNOWLEDGE BASE (हर सवाल का सटीक वैज्ञानिक व व्यावहारिक समाधान)
export const AI_KISAN_QA_PRESETS: KisanQAItem[] = [
  {
    id: 'qa-yellow-leaves',
    category: 'फसल में रोग व कीट',
    question: {
      hi: 'फसल की पत्तियां पीली पड़ रही हैं और पौधे की बढ़वार रुक गई है, क्या डालें?',
      en: 'Crop leaves are turning yellow and growth has stalled. What should I apply?',
      hinglish: 'Fasal ki pattiya peeli ho rahi hain aur growth ruk gayi hai, kya dalein?'
    },
    answer: {
      hi: 'पत्तियों में पीलापन 3 मुख्य कारणों से आता है: 1. नाइट्रोजन की कमी (निचली पत्तियां पहले पीली पड़ती हैं) - इसके लिए 500 मिली नैनो यूरिया या 20 किग्रा यूरिया प्रति एकड़ दें। 2. जिंक या आयरन की कमी (ऊपरी नई पत्तियां पीली पड़ती हैं और नसें हरी रहती हैं) - इसके लिए 500 ग्राम चिलेटेड जिंक (Chelated Zinc EDTA 12%) + 1 किग्रा 19-19-19 को 150 लीटर पानी में घोलकर स्प्रे करें। 3. जलभराव या जड़ सड़न - पानी तुरंत निकालें और 500 ग्राम कॉपर ऑक्सीक्लोराइड से जड़ों के पास छिड़काव करें।',
      en: 'Yellowing is typically due to: 1. Nitrogen deficiency (lower leaves) -> Apply Nano Urea (4ml/L). 2. Zinc/Iron deficiency (interveinal yellowing of upper leaves) -> Spray Chelated Zinc EDTA 12% (1g/L) + 19:19:19 (5g/L). 3. Waterlogging -> Ensure drainage.',
      hinglish: 'Agar neeche ki pattiya peeli hain to Nano Urea 500ml/acre spray karein. Agar upar ki nayi pattiya peeli hain to Chelated Zinc EDTA (500g) + 19-19-19 (1kg) 150L paani me spray karein.'
    },
    quickSteps: [
      '1. जांचें कि पीलापन पुरानी निचली पत्तियों में है या ऊपरी नई पत्तियों में।',
      '2. यदि नई पत्तियां पीली हैं तो चिलेटेड जिंक EDTA 12% (1 ग्राम/लीटर) + 19-19-19 का स्प्रे करें।',
      '3. यदि निचली पत्तियां पीली हैं तो नैनो यूरिया (4 मिली/लीटर पानी) का फोलियर स्प्रे करें।',
      '4. खेत में जलभराव हो तो तत्काल पानी निकासी करें।'
    ],
    audioKeywords: ['पीलापन', 'पत्तियां पीली', 'जिंक की कमी', 'यूरिया', 'ग्रोथ टॉनिक', 'yellow leaves'],
    verifiedBy: 'ICAR-IARI नई दिल्ली वैज्ञानिक संस्तुति'
  },
  {
    id: 'qa-dap-alternative',
    category: 'खाद व उर्वरक',
    question: {
      hi: 'बाजार में DAP नहीं मिल रहा है, तो बुवाई के समय DAP की जगह क्या विकल्प डालें?',
      en: 'DAP is out of stock in the market. What is the best alternative fertilizer for sowing?',
      hinglish: 'DAP nahi mil raha to buwai ke time DAP ki jagah kya dalein?'
    },
    answer: {
      hi: 'DAP (18:46:0) की जगह सबसे बेहतरीन और सस्ता विकल्प है: "सिंगल सुपर फॉस्फेट (SSP) + यूरिया"। 1 बोरी DAP (50 किग्रा) के बराबर पोषक तत्व पाने के लिए: "3 बोरी SSP (150 किग्रा) + 20 किग्रा यूरिया" डालें। इसका सबसे बड़ा फायदा यह है कि SSP में फॉस्फोरस (16%) के साथ-साथ 11% सल्फर और 19% कैल्शियम भी फ्री में मिलता है, जो DAP में बिल्कुल नहीं होता! इसके अलावा दूसरा विकल्प NPK (12:32:16) की 1.5 बोरी प्रति एकड़ डालना है।',
      en: 'Best DAP substitute: 1 bag DAP (50kg) = 3 bags Single Super Phosphate (SSP 150kg) + 20kg Urea. SSP provides extra 11% Sulphur and 19% Calcium for superior root growth.',
      hinglish: '1 bori DAP ki jagah 3 bori SSP (Single Super Phosphate) + 20 kg Urea dalein. SSP me 11% Sulphur aur 19% Calcium free milta hai jo DAP me nahi hota!'
    },
    quickSteps: [
      '1. 1 बोरी DAP = 3 बोरी SSP (सिंगल सुपर फॉस्फेट) + 20 किग्रा यूरिया।',
      '2. या 1.5 बोरी NPK (12:32:16) का प्रयोग करें।',
      '3. तिलहन और दलहन में SSP डालने से तेल और प्रोटीन 15% बढ़ जाता है।'
    ],
    audioKeywords: ['डीएपी विकल्प', 'DAP alternative', 'SSP', 'सिंगल सुपर फॉस्फेट', 'खाद की किल्लत'],
    verifiedBy: 'कृषि विभाग उर्वरक नियंत्रण सेल'
  },
  {
    id: 'qa-low-water-crops',
    category: 'कम पानी में खेती',
    question: {
      hi: 'मेरे पास पानी की बहुत कमी है, कम पानी में सबसे ज्यादा मुनाफा देने वाली फसलें कौन सी हैं?',
      en: 'I have acute water scarcity. Which high-profit crops require minimal water?',
      hinglish: 'Kam paani me sabse jyada munafa dene wali faslein kaun si hain?'
    },
    answer: {
      hi: 'कम पानी और सूखे क्षेत्रों के लिए शीर्ष 5 लखपति फसलें:\n1. सहजन (Moringa ODC-3): 1 एकड़ में साल में सिर्फ 4-5 हल्की सिंचाई चाहिए और मुनाफा ₹3 लाख से ₹5 लाख प्रति वर्ष है।\n2. ड्रैगन फ्रूट (Dragon Fruit): कैक्टस कुल का पौधा है, हफ्ते में 1 बार ड्रिप चाहिए, ₹8-12 लाख सालाना मुनाफा।\n3. सरसों (Mustard) व तारामीरा: सिर्फ 2 सिंचाइयों में ₹50,000 प्रति एकड़ शुद्ध लाभ।\n4. चना (Chickpea) व मसूर: केवल 1 से 2 सिंचाइयों में तैयार।\n5. औषधीय फसलें (अश्वगंधा, चिया सीड्स, तुलसी): इनमें रोग भी नहीं लगते और पानी न्यूनतम लगता है, मुनाफा ₹1.5 से ₹2.5 लाख/एकड़।',
      en: 'Top 5 high-profit drought-tolerant crops: 1. Moringa (ODC-3) ₹3-5L/acre. 2. Dragon Fruit ₹8-12L/acre. 3. Mustard (RH-725) ₹50k/acre with only 2 irrigations. 4. Chickpea. 5. Ashwagandha & Chia seeds.',
      hinglish: 'Kam paani ke liye: 1. Sahjan (Moringa), 2. Dragon Fruit, 3. Sarson (RH-725), 4. Chana, 5. Ashwagandha & Chia Seeds. Ye kam paani me lakho deti hain.'
    },
    quickSteps: [
      '1. ड्रिप इरिगेशन अपनाएं (सरकार से 80% सब्सिडी लें)।',
      '2. धान और गन्ने की जगह सहजन, सरसों या ड्रैगन फ्रूट लगाएं।',
      '3. खेत में मल्चिंग शीट या सूखी घास बिछाएं ताकि वाष्पीकरण 70% रुक जाए।'
    ],
    audioKeywords: ['कम पानी', 'सूखा', 'ड्रैगन फ्रूट', 'सहजन', 'अश्वगंधा', 'low water crops'],
    verifiedBy: 'CAZRI जोधपुर (केंद्रीय शुष्क क्षेत्र अनुसंधान संस्थान)'
  },
  {
    id: 'qa-garlic-onion-bulb-size',
    category: 'ज्यादा मुनाफे वाली फसल',
    question: {
      hi: 'लहसुन और प्याज का कंद बड़ा (Jumbo Size) कैसे करें और चमक कैसे लाएं?',
      en: 'How to increase garlic and onion bulb size to jumbo grade and improve skin shine?',
      hinglish: 'Lahsun aur Pyaj ka kand bada aur chamakdar kaise karein?'
    },
    answer: {
      hi: 'लहसुन व प्याज में कंद का साइज और वजन 40% बढ़ाने का 4 सूत्रीय फॉर्मूला:\n1. 60 दिन के बाद यूरिया देना पूरी तरह बंद कर दें (यूरिया देने से केवल पत्ते बढ़ते हैं, कंद छोटा रह जाता है)।\n2. 75-80 दिन की अवस्था पर: 0-0-50 (सल्फेट ऑफ पोटाश) 1.5 किग्रा + बोरॉन 20% 150 ग्राम को 150 लीटर पानी में घोलकर स्प्रे करें (पोटाश कंद में भोजन जमा करता है और बोरॉन छिलके को चमकदार बनाता है)।\n3. 85-90 दिन पर: चमत्कार (Mepiquat Chloride) 300 मिली या कल्टार (Paclobutrazol) 50-80 मिली प्रति एकड़ स्प्रे करें। यह पौधे की ऊपर की वृद्धि रोककर सारा भोजन कंद में भेज देता है।\n4. खुदाई से 15 दिन पहले सिंचाई बिल्कुल बंद कर दें।',
      en: '4-step formula for Jumbo Garlic/Onion: 1. Stop Urea after 60 DAS. 2. Spray 0:0:50 (1.5kg) + Boron 20% (150g) at 75 DAS. 3. Spray Plant Growth Regulator (Chamatkar 300ml/acre) at 85 DAS. 4. Stop irrigation 15 days before harvest.',
      hinglish: '60 din baad Urea band karein. 75 din par 0-0-50 (1.5kg) + Boron 20% (150g) spray karein. 85 din par Chamatkar (300ml) PGR spray karein. Kand jumbo banega.'
    },
    quickSteps: [
      '1. 60 दिन के बाद दानेदार यूरिया बिल्कुल न डालें।',
      '2. 75 दिन: 0-0-50 (1.5 किग्रा) + बोरॉन 20% (150 ग्राम) प्रति एकड़ स्प्रे।',
      '3. 85 दिन: कल्टार (80 मिली) या चमत्कार (300 मिली) का स्प्रे।',
      '4. खुदाई से 15 दिन पहले पानी पूरी तरह बंद करें।'
    ],
    audioKeywords: ['लहसुन कंद बड़ा', 'प्याज का साइज', '0-0-50', 'बोरॉन', 'कल्टार', 'PGR', 'garlic bulb'],
    verifiedBy: 'राष्ट्रीय बागवानी अनुसंधान एवं विकास प्रतिष्ठान (NHRDF)'
  },
  {
    id: 'qa-organic-neemastra-jeevamrit',
    category: 'जैविक व प्राकृतिक खेती',
    question: {
      hi: 'घर पर बिना पैसे खर्च किए सबसे असरदार जैविक कीटनाशक (नीमास्त्र व जीवामृत) कैसे बनाएं?',
      en: 'How to prepare zero-cost organic pesticide (Neemastra) and bio-fertilizer (Jeevamrit) at home?',
      hinglish: 'Ghar par organic keetnashak Neemastra aur Jeevamrit kaise banayein?'
    },
    answer: {
      hi: '1. नीमास्त्र (सभी प्रकार के रस चूसक कीट, माहू, थ्रिप्स व इल्ली के लिए):\n- 200 लीटर पानी में 5 किग्रा नीम की पत्ती की चटनी + 5 लीटर देसी गाय का गोमूत्र + 2 किग्रा ताजा गाय का गोबर मिलाएं। 48 घंटे छाया में रखें, दिन में 2 बार डंडे से हिलाएं। कपड़े से छानकर 1 एकड़ में स्प्रे करें।\n\n2. जीवामृत (1 एकड़ के लिए प्राकृतिक खाद):\n- 200 लीटर पानी में 10 किग्रा देसी गाय का गोबर + 10 लीटर गोमूत्र + 2 किग्रा गुड़ + 2 किग्रा बेसन + 1 मुट्ठी खेत की सजीव मिट्टी मिलाएं। 4 दिन फर्मेंट होने दें। सिंचाई के पानी के साथ नाली में बहाएं। 1 ग्राम जीवामृत में करोड़ों लाभकारी बैक्टीरिया होते हैं जो मिट्टी को उपजाऊ बनाते हैं।',
      en: '1. Neemastra: 5kg crushed neem leaves + 5L cow urine + 2kg cow dung in 200L water. Ferment for 48 hrs and spray. 2. Jeevamrit: 10kg dung + 10L urine + 2kg jaggery + 2kg gram flour in 200L water. Ferment for 4 days and apply with irrigation.',
      hinglish: 'Neemastra: 5kg neem patte + 5L gomutra + 2kg gobar ko 200L paani me 48 ghante rakhein aur spray karein. Jeevamrit: 10kg gobar + 10L gomutra + 2kg gud + 2kg besan ko 4 din gholkar sinchai ke sath chalayein.'
    },
    quickSteps: [
      '1. नीमास्त्र: नीम पत्ती + गोमूत्र + गोबर का घोल 48 घंटे सड़ाकर स्प्रे करें।',
      '2. जीवामृत: गोबर + गोमूत्र + गुड़ + बेसन का 4 दिन का घोल सिंचाई के साथ दें।',
      '3. रासायनिक खाद का खर्च 80% कम और मिट्टी का केंचुआ सक्रिय हो जाता है।'
    ],
    audioKeywords: ['नीमास्त्र', 'जीवामृत', 'जैविक खाद', 'जीरो बजट खेती', 'organic pest control'],
    verifiedBy: 'प्राकृतिक कृषि मिशन (Subhash Palekar Natural Farming Model)'
  },
  {
    id: 'qa-kusum-solar-application',
    category: 'सरकारी योजना व सब्सिडी',
    question: {
      hi: 'पीएम कुसुम सोलर पंप योजना के लिए ऑनलाइन फॉर्म कैसे भरें और कितनी सब्सिडी मिलेगी?',
      en: 'How to apply online for PM Kusum Solar Pump and how much subsidy will I get?',
      hinglish: 'PM Kusum Solar pump ka form kaise bharein aur kitni subsidy milegi?'
    },
    answer: {
      hi: 'पीएम कुसुम योजना में 3 HP, 5 HP और 7.5 HP सोलर सबमर्सिबल पंप पर 60% से 90% सब्सिडी मिलती है। 3 लाख के 5 HP सोलर पंप के लिए किसान को मात्र ₹35,000 से ₹50,000 अंशदान देना होता है।\n\nआवेदन की प्रक्रिया:\n1. अपने राज्य के कृषि ऊर्जा या उद्यान विभाग पोर्टल (जैसे upagriculture.com, rajkisan.rajasthan.gov.in या pmkusum.mnre.gov.in) पर जाएं।\n2. किसान पंजीकरण संख्या डालकर "सोलर पंप बुकिंग" विकल्प चुनें।\n3. पंप क्षमता (HP) और मोटर प्रकार (AC/DC) चुनें।\n4. ₹5,000 का ऑनलाइन टोकन मनी जमा करें।\n5. जमीन व बोरवेल का सत्यापन होने के बाद शेष किसान अंशदान का बैंक ड्राफ्ट/चालान जमा करें। 30 दिनों में सोलर पैनल व पंप लग जाएगा।',
      en: 'PM Kusum provides 60-90% subsidy on 3-10 HP solar pumps. Farmer pays 10-20% margin. Apply through your State Agriculture/Energy portal with land records, Aadhaar, and borewell proof.',
      hinglish: 'State ke agri portal par jakar Solar Pump booking karein. 5000 token money jama karein. Verification ke baad 10-20% balance jama karein, 30 din me solar pump install ho jata hai.'
    },
    quickSteps: [
      '1. आधार कार्ड, खतौनी और बैंक पासबुक तैयार रखें।',
      '2. राज्य कृषि पोर्टल पर जाकर टोकन जनरेट करें।',
      '3. बोरवेल सत्यापन के बाद शेष किसान अंशदान जमा करें।'
    ],
    audioKeywords: ['कुसुम सोलर पंप', 'solar pump subsidy', 'solar form', 'सोलर बोरवेल'],
    verifiedBy: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE)'
  }
];

// 4. WEATHER ZONAL ADVISORIES (क्षेत्रीय मौसम व कृषि सलाह)
export const KISAN_WEATHER_ADVISORIES: KisanWeatherAdvisory[] = [
  {
    zone: 'उत्तर-पश्चिम मैदानी क्षेत्र (North-Western Plains)',
    states: 'पंजाब, हरियाणा, पश्चिमी उत्तर प्रदेश, दिल्ली, उत्तरी राजस्थान',
    temperature: '32°C / 24°C',
    humidity: '68%',
    rainfallForecast: 'आगामी 48 घंटों में हल्की से मध्यम वर्षा व गरज के साथ छींटे।',
    windSpeed: '14 किमी/घंटा',
    riskAlert: 'सावधानी',
    cropAdvisory: [
      { crop: 'धान (Paddy)', recommendation: 'खेत में अतिरिक्त पानी निकालने का प्रबंध रखें; तना छेदक के लिए फेरोमोन ट्रैप लगाएं।', spraySafe: false, irrigationNeeded: false },
      { crop: 'कपास (Bt Cotton)', recommendation: 'गुलाबी सुंडी (Pink Bollworm) की निगरानी करें; वर्षा रुकने पर ही प्रोफेनोफॉस का स्प्रे करें।', spraySafe: false, irrigationNeeded: false },
      { crop: 'गन्ना (Sugarcane)', recommendation: 'तेज हवा में गन्ने को आपस में बांधें (Propping) ताकि फसल न गिरे।', spraySafe: true, irrigationNeeded: false }
    ]
  },
  {
    zone: 'मध्य भारत पठारी क्षेत्र (Central Plateau)',
    states: 'मध्य प्रदेश, विदर्भ (महाराष्ट्र), छत्तीसगढ़, दक्षिणी राजस्थान',
    temperature: '30°C / 22°C',
    humidity: '75%',
    rainfallForecast: 'अधिकांश स्थानों पर भारी वर्षा की संभावना, आकाशीय बिजली की चेतावनी।',
    windSpeed: '18 किमी/घंटा',
    riskAlert: 'भारी वर्षा/आंधी चेतावनी',
    cropAdvisory: [
      { crop: 'सोयाबीन (Soybean)', recommendation: 'खेतों में जलभराव न होने दें; मेड़ तोड़कर पानी निकालें वर्ना गर्डल बीटल और जड़ सड़न होगी।', spraySafe: false, irrigationNeeded: false },
      { crop: 'लहसुन व प्याज (Garlic/Onion)', recommendation: 'नर्सरी को पॉलीथिन शीट से ढकें; कॉपर फफूंदनाशी का ड्रेन्चिंग करें।', spraySafe: false, irrigationNeeded: false },
      { crop: 'टमाटर व मिर्च', recommendation: 'जल निकास नालियां साफ करें; पत्तियों पर फफूंदनाशक का छिड़काव धूप निकलते ही करें।', spraySafe: false, irrigationNeeded: false }
    ]
  },
  {
    zone: 'पूर्वी मैदानी एवं गंगा कछार (Eastern Gangetic Plains)',
    states: 'पूर्वी उत्तर प्रदेश, बिहार, पश्चिम बंगाल, ओडिशा, झारखंड',
    temperature: '34°C / 26°C',
    humidity: '82%',
    rainfallForecast: 'आंशिक बादल छाए रहेंगे, कहीं-कहीं बूंदाबांदी। तापमान में वृद्धि।',
    windSpeed: '10 किमी/घंटा',
    riskAlert: 'सामान्य',
    cropAdvisory: [
      { crop: 'धान (Paddy)', recommendation: 'नैनो यूरिया (4ml/L) व जिंक सल्फेट का फोलियर स्प्रे करने का सबसे उपयुक्त समय।', spraySafe: true, irrigationNeeded: false },
      { crop: 'मक्का (Maize)', recommendation: 'फॉल आर्मीवॉर्म (FAW) कीट की जांच करें; गोभ में दानेदार दवा डालें।', spraySafe: true, irrigationNeeded: true },
      { crop: 'सब्जियां (Vegetables)', recommendation: 'खरपतवार नियंत्रण के लिए निराई-गुड़ाई करें और कीटनाशक का स्प्रे करें।', spraySafe: true, irrigationNeeded: true }
    ]
  }
];

// 5. CUSTOM HIRING CENTER (CHC) & FARM EQUIPMENT (किराए पर उपकरण एवं ड्रोन सेवा)
export const KISAN_FARM_EQUIPMENT: FarmEquipmentRental[] = [
  {
    id: 'eq-drone',
    name: { hi: 'AI एग्रीकल्चरल स्प्रे ड्रोन (10-30 लीटर क्षमता)', en: 'AI Agricultural Spray Drone (DJI/XAG)' },
    category: 'ड्रोन स्प्रे',
    ratePerAcreOrHour: '₹300 - ₹450 / एकड़ (1 एकड़ में मात्र 7 मिनट में स्प्रे)',
    govtSubsidy: 'ड्रोन खरीदने पर 50% से 100% सब्सिडी (FPO/CHC को ₹10 लाख)',
    workCapacity: 'प्रतिदिन 30 से 40 एकड़ स्प्रे',
    benefits: [
      'दवा की 30% बचत और पानी की 90% बचत (मात्र 10 लीटर पानी में 1 एकड़)।',
      'फसलों में बिना घुसे 100% एकसमान छिड़काव (कीटनाशक जहर के सीधे संपर्क से मुक्ति)।',
      'ऊंची फसलों (गन्ना, मक्का, बागवानी) में सबसे ज्यादा असरदार।'
    ],
    icon: '🛸'
  },
  {
    id: 'eq-laser-leveler',
    name: { hi: 'लेजर लैंड लेवलर (Laser Land Leveler)', en: 'Precision Laser Land Leveler' },
    category: 'जुताई व समतलीकरण',
    ratePerAcreOrHour: '₹700 - ₹900 / घंटा',
    govtSubsidy: 'SMAM योजना में 40% से 50% सब्सिडी',
    workCapacity: '1.5 से 2 घंटे में 1 एकड़ का 100% सटीक समतलीकरण',
    benefits: [
      'खेत में 30% सिंचाई जल की बचत और 15-20% उपज में वृद्धि।',
      'हर पौधे को एक बराबर खाद और पानी मिलना।',
      'खरपतवार 40% कम होना।'
    ],
    icon: '🚜'
  },
  {
    id: 'eq-super-seeder',
    name: { hi: 'सुपर सीडर / हैप्पी सीडर (Super Seeder)', en: 'Super Seeder (Zero Tillage)' },
    category: 'बुवाई व रोपाई',
    ratePerAcreOrHour: '₹1,200 - ₹1,500 / एकड़',
    govtSubsidy: 'पराली प्रबंधन योजना में 50% से 80% सब्सिडी',
    workCapacity: '1 घंटे में 1 एकड़ गेहूं की सीधी बुवाई',
    benefits: [
      'पराली जलाने की जरूरत नहीं; धान की खूंटी को मिट्टी में मिलाकर जैविक खाद बनाता है।',
      'जुताई, पाटा और बुवाई तीनों काम एक ही बार में, ₹2500/एकड़ जुताई खर्च की बचत।'
    ],
    icon: '⚙️'
  },
  {
    id: 'eq-combine-harvester',
    name: { hi: 'कंबाइन हार्वेस्टर विथ स्ट्रॉ रीपर (Combine Harvester)', en: 'Combine Harvester with Straw Management' },
    category: 'कटाई व थ्रेशिंग',
    ratePerAcreOrHour: '₹1,800 - ₹2,400 / एकड़',
    govtSubsidy: '40% कृषि यंत्रीकरण सब्सिडी',
    workCapacity: '30-40 मिनट में 1 एकड़ फसल की कटाई व थ्रेशिंग',
    benefits: [
      'मौसम खराब होने पर तुरंत 1 दिन में पूरी फसल कटकर घर पहुंचना।',
      'दाना और भूसा (पशु आहार) दोनों सुरक्षित तैयार होना।'
    ],
    icon: '🌾'
  }
];
