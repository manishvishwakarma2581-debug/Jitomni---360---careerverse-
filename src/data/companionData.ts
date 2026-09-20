import { 
  CompanionServiceCategory, 
  CompanionWorker, 
  RideVehiclePartner, 
  RidePlatformFeeRecord,
  CompanionTaskCommissionRecord,
  CompanionNotification,
  SovereignTaskRateCard,
  SovereignTaskServiceId,
  CompanionVehicleMode
} from '../types';

export const companionCategories: CompanionServiceCategory[] = [
  {
    id: 'hospital_care',
    title: {
      hi: '🚑 HUMARA Medical Sathi - Complete Hospital Escort Service',
      en: '🚑 HUMARA Medical Sathi - Complete Hospital Escort Service',
      hinglish: '🚑 HUMARA Medical Sathi - Complete Hospital Escort Service'
    },
    tagline: {
      hi: 'Railway Station / Home Se Hospital Tak — Nurse + Doctor Ki Nigrani Me (3-Level Premium Escort)',
      en: 'Railway Station / Home to Hospital Escort — Supervised by Certified Nurse + Private Doctor (3-Level Premium Escort)',
      hinglish: 'Railway Station / Home se Hospital tak — Nurse + Doctor ki nigrani me complete medical escort.'
    },
    icon: '🚑',
    visualAnchorBadge: 'ALL INDIA SERVICE • 24x7 ON-DEMAND • 3-LEVEL MEDICAL ESCORT',
    themeColor: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      border: 'border-[#FFD700]/70 hover:border-[#FFD700]',
      bgGlow: 'from-[#06142E] via-[#040C1A] to-[#02060F]',
      gradient: 'from-[#0B1E3B] via-[#07132B] to-[#040C1A]',
      accent: '#FFD700'
    },
    baseHourlyRate: 150,
    subServices: [
      {
        id: 'med_level_1',
        name: {
          hi: 'LEVEL 1: BASIC SATHI ESCORT',
          en: 'LEVEL 1: BASIC SATHI ESCORT',
          hinglish: 'LEVEL 1: BASIC SATHI ESCORT'
        },
        desc: {
          hi: 'ट्रेन/बस स्टेशन पिकअप, लगेज हेल्प, ऑटो/टैक्सी बुकिंग, हॉस्पिटल काउंटर व ओपीडी कतार सहायता।',
          en: 'Station pickup, luggage help, auto/taxi booking, hospital counter assistance & OPD queue support.',
          hinglish: 'Station pickup, luggage, taxi booking, hospital counter & OPD line help.'
        },
        icon: '🧳',
        recommendedHours: 3
      },
      {
        id: 'med_level_2',
        name: {
          hi: 'LEVEL 2: SATHI + NURSE SUPPORT [MOST POPULAR]',
          en: 'LEVEL 2: SATHI + NURSE SUPPORT [MOST POPULAR]',
          hinglish: 'LEVEL 2: SATHI + NURSE SUPPORT [MOST POPULAR]'
        },
        desc: {
          hi: 'लेवल 1 की सभी सुविधाएं + व्हीलचेयर सपोर्ट, रास्ते में बीपी/शुगर जांच, प्राथमिक चिकित्सा व दवा सहायता, बुजुर्ग व महिला मरीज स्पेशल केयर।',
          en: 'Everything in Level 1 + Wheelchair Support, BP/Sugar Check On The Way, First-Aid & Medicine Help, Elderly & Female Patient Special Care.',
          hinglish: 'Level 1 + Wheelchair support, BP/Sugar check on the way, first-aid, medicine & elderly care.'
        },
        icon: '👩‍⚕️',
        recommendedHours: 4
      },
      {
        id: 'med_level_3',
        name: {
          hi: 'LEVEL 3: SATHI + NURSE + PRIVATE DOCTOR SUPERVISION [PREMIUM]',
          en: 'LEVEL 3: SATHI + NURSE + PRIVATE DOCTOR SUPERVISION [PREMIUM]',
          hinglish: 'LEVEL 3: SATHI + NURSE + PRIVATE DOCTOR SUPERVISION [PREMIUM]'
        },
        desc: {
          hi: 'लेवल 1 और 2 की सभी सुविधाएं + प्राइवेट डॉक्टर सुपरविजन, रास्ते में प्राइमरी हेल्थ केयर चेकअप, ट्रांजिट कंसल्टेशन, इमरजेंसी हैंडलिंग व रिपोर्ट पूर्ति।',
          en: 'Everything in Level 1 & 2 + Private Doctor Supervision, Primary Health Care Checkup On The Way, Initial Consultation in Transit, Emergency Handling & Full Task Fulfill.',
          hinglish: 'Level 1 & 2 + Private Doctor Supervision, Transit Health Checkup, Emergency Handling & Full Task Fulfill.'
        },
        icon: '🩺',
        recommendedHours: 4
      },
      {
        id: 'hosp_bedside',
        name: {
          hi: 'अस्पताल बेडसाइड अटेंडेंट (दिन/रात ड्यूटी)',
          en: 'Hospital Bedside Patient Attendant (Day/Night)',
          hinglish: 'Hospital Bedside Attendant (Day/Night)'
        },
        desc: {
          hi: 'मरीज को समय पर पानी, खाना, सहारा व मॉनिटरिंग सहायता।',
          en: 'Attentive bedside support, mobility help, water/food & monitoring.',
          hinglish: 'Patient ko timely assistance, water, food aur care.'
        },
        icon: '🛏️',
        recommendedHours: 8
      }
    ],
    quickRequirements: [
      'Level 1: Railway station to AIIMS escort with luggage assistance',
      'Level 2: Wheelchair patient with nurse for BP/Sugar check on the way',
      'Level 3: Outstation patient with full doctor + nurse supervision & primary care',
      'Dharamshala booking and medicine runner assistance',
      'Return drop to railway station after doctor consultation'
    ]
  },
  {
    id: 'event_wedding',
    title: {
      hi: '🪔 विवाह एवं इवेंट मैनेजमेंट साथी',
      en: '🪔 Event & Wedding Management Crew',
      hinglish: '🪔 Wedding & Event Coordination Squad'
    },
    tagline: {
      hi: 'अतिथि सत्कार, बारात समन्वय, शगुन काउंटर व स्टेज प्रबंधन हेतु सुसज्जित एवं विश्वसनीय युवा।',
      en: 'Reliable, well-groomed youth coordinators for guest hospitality, stage & gifts desk.',
      hinglish: 'Shaadi-byah, stage, guest welcome aur shagun desk ke liye reliable squad.'
    },
    icon: '🪔',
    visualAnchorBadge: 'WEDDINGS, BANQUETS & EVENTS • MIN 3H',
    themeColor: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      border: 'border-amber-500/50 hover:border-amber-400',
      bgGlow: 'from-amber-950/40 via-[#1C1205] to-[#0A0702]',
      gradient: 'from-amber-500 to-orange-600',
      accent: '#F59E0B'
    },
    baseHourlyRate: 140,
    subServices: [
      {
        id: 'evt_guest_hospitality',
        name: {
          hi: 'अतिथि स्वागत एवं माला-आरती डेस्क',
          en: 'Guest Welcome & Traditional Aarti Desk',
          hinglish: 'Guest Hospitality & Welcome Aarti'
        },
        desc: {
          hi: 'पारंपरिक वेशभूषा में मेहमानों का स्वागत, पुष्प वर्षा व तिलक अर्पण।',
          en: 'Warm traditional Indian hospitality, floral welcome and badge distribution.',
          hinglish: 'Traditional attire me guests ka grand welcome aur assistance.'
        },
        icon: '💐',
        recommendedHours: 5
      },
      {
        id: 'evt_shagun_counter',
        name: {
          hi: 'शगुन व उपहार रजिस्टर प्रबंधन',
          en: 'Shagun, Gift Counter & Ledger Manager',
          hinglish: 'Shagun & Gift Counter Management'
        },
        desc: {
          hi: 'सटीक डिजिटल/डायरी प्रविष्टि, लिफाफा टोकन व सुरक्षित अभिरक्षा।',
          en: 'Meticulous gift recording, cash envelope indexing and safe keeping.',
          hinglish: 'Gift register entry, token allocation aur safe desk handling.'
        },
        icon: '🎁',
        recommendedHours: 6
      },
      {
        id: 'evt_stage_crew',
        name: {
          hi: 'स्टेज व बारात समन्वय दल (Boys/Girls)',
          en: 'Stage & Baraat Coordination Squad',
          hinglish: 'Stage & Baraat Coordination Squad'
        },
        desc: {
          hi: 'वर-माला स्टेज व्यवस्था, फोटोग्राफर टाइमिंग व परिजनों का मार्गदर्शन।',
          en: 'Varmala stage flow, group photography queues & immediate family coordination.',
          hinglish: 'Varmala, stage crowd management aur coordinator support.'
        },
        icon: '👑',
        recommendedHours: 6
      },
      {
        id: 'evt_vip_catering',
        name: {
          hi: 'वीआईपी डाइनिंग व बुफे फ्लो सुपरवाइजर',
          en: 'VIP Dining & Buffet Flow Supervisor',
          hinglish: 'VIP Dining & Catering Flow Coordinator'
        },
        desc: {
          hi: 'विशिष्ट अतिथियों की प्लेट व जल सेवा, बुफे रीफिल व स्वच्छता समन्वय।',
          en: 'Ensuring immaculate food replenishment, VIP table service and hygiene.',
          hinglish: 'VIP tables par prompt attention aur catering flow coordination.'
        },
        icon: '🍽️',
        recommendedHours: 5
      }
    ],
    quickRequirements: [
      'Need 2 boys in formal blazers for stage & guest coordination',
      'Need 2 girls in ethnic wear for traditional Aarti & Tilak welcome',
      'Need 1 coordinator for Shagun gift counter entry & safe ledger',
      'Need 4 energetic boys for Baraat coordination & safety perimeter',
      'Full evening wedding reception duty (6:00 PM to 12:00 Midnight)'
    ]
  },
  {
    id: 'senior_citizen',
    title: {
      hi: '🧓 बुजुर्ग देखभाल एवं सहयोग साथी',
      en: '🧓 Senior Citizen Support & Companionship',
      hinglish: '🧓 Senior Citizen Care & Buddy'
    },
    tagline: {
      hi: 'पार्क सैर, बैंक/पेंशन कार्य, स्मार्टफोन प्रशिक्षण व आत्मीय संवाद हेतु धैर्यवान मित्र।',
      en: 'Patient, respectful companions for morning walks, pension work, tech coaching & conversation.',
      hinglish: 'Morning walk, Bank work, Jeevan Pramaan Patra aur tech coaching buddy.'
    },
    icon: '🧓',
    visualAnchorBadge: 'ELDERLY CARE & COMPANION • MIN 2H',
    themeColor: {
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      border: 'border-cyan-500/50 hover:border-cyan-400',
      bgGlow: 'from-cyan-950/40 via-[#061524] to-[#02070D]',
      gradient: 'from-cyan-500 to-blue-600',
      accent: '#06B6D4'
    },
    baseHourlyRate: 120,
    subServices: [
      {
        id: 'snr_park_walk',
        name: {
          hi: 'सुबह/शाम पार्क सैर एवं आत्मीय साथी',
          en: 'Morning/Evening Park Walk Companion',
          hinglish: 'Park Morning/Evening Walk Companion'
        },
        desc: {
          hi: 'हाथ थामकर सैर, ताजी हवा, योग सहायता व सुख-दुख की मधुर बातें।',
          en: 'Assisted park walking, gentle gait support, warm listening & companionship.',
          hinglish: 'Gentle walk, fresh air companion aur empathetic conversation.'
        },
        icon: '🌳',
        recommendedHours: 2
      },
      {
        id: 'snr_bank_govt',
        name: {
          hi: 'बैंक, पेंशन एवं डिजिटल जीवन प्रमाण पत्र सहायक',
          en: 'Bank, Pension & Life Certificate Assistant',
          hinglish: 'Bank, Pension & Jeevan Pramaan Escort'
        },
        desc: {
          hi: 'बैंक शाखा तक ले जाना, फॉर्म भरना, बायोमेट्रिक ई-केवाईसी व पासबुक प्रिंट।',
          en: 'Escort to bank branch, pension slip submission, Aadhaar face-auth DLC.',
          hinglish: 'Bank visit, pension documentation aur Jeevan Pramaan submission.'
        },
        icon: '🏛️',
        recommendedHours: 3
      },
      {
        id: 'snr_smartphone_tutor',
        name: {
          hi: 'स्मार्टफोन, व्हाट्सएप व यूपीआई डिजिटल गुरु',
          en: 'Smartphone, WhatsApp & UPI Patient Tutor',
          hinglish: 'Senior Smartphone & UPI Digital Tutor'
        },
        desc: {
          hi: 'बच्चों से वीडियो कॉल, यूट्यूब भजन, सुरक्षित ऑनलाइन बिल भरना सिखाना।',
          en: 'Patient step-by-step guidance on video calls, online bills, avoiding scams.',
          hinglish: 'WhatsApp video call, YouTube bhajan aur safe UPI payments sikhana.'
        },
        icon: '📱',
        recommendedHours: 2
      },
      {
        id: 'snr_reading_vitals',
        name: {
          hi: 'समाचार पत्र वाचन, दवा स्मरण व बीपी चेक',
          en: 'Newspaper Reading, Medicine Reminder & BP Log',
          hinglish: 'Newspaper Reading & Medicine Reminder'
        },
        desc: {
          hi: 'हिंदी/अंग्रेजी दैनिक अखबार सुनाना, दवाइयां समय पर याद दिलाना।',
          en: 'Reading favorite literature, news updates, recording digital BP/Pulse.',
          hinglish: 'Daily newspaper reading, timely medicines and health journal update.'
        },
        icon: '📖',
        recommendedHours: 2
      }
    ],
    quickRequirements: [
      'Polite and patient companion for elderly father evening walk (2 hrs)',
      'Need companion to accompany mother to SBI bank for pension KYC',
      'Teach elderly couple how to use WhatsApp video call & Google Pay safely',
      'Need compassionate companion for 4 hours of reading & medicine reminder',
      'Wheelchair push & mobility assistance for park visit'
    ]
  },
  {
    id: 'daily_errands',
    title: {
      hi: '🛒 दैनिक कार्य एवं घरेलू सहायता साथी',
      en: '🛒 Daily Errands & Household Task Assistant',
      hinglish: '🛒 Daily Errands & Smart Errand Runner'
    },
    tagline: {
      hi: 'सब्जी मंडी, कतार में लगना, भारी सामान शिफ्टिंग, कूरियर व स्थानीय कार्यों हेतु चुस्त युवा।',
      en: 'Agile verified runners for mandi produce, bill payment queues, document pickup & shifting.',
      hinglish: 'Mandi shopping, bill queue standing, document runner aur shifting tasks.'
    },
    icon: '🛒',
    visualAnchorBadge: 'ERRANDS & RAPID TASKS • MIN 1H',
    themeColor: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      border: 'border-emerald-500/50 hover:border-emerald-400',
      bgGlow: 'from-emerald-950/40 via-[#061F13] to-[#020A06]',
      gradient: 'from-emerald-500 to-teal-600',
      accent: '#10B981'
    },
    baseHourlyRate: 100,
    subServices: [
      {
        id: 'err_mandi_grocery',
        name: {
          hi: 'ताजा सब्जी मंडी व किराना खरीदारी धावक',
          en: 'Fresh Mandi & Supermarket Grocery Shopper',
          hinglish: 'Mandi & Grocery Shopping Runner'
        },
        desc: {
          hi: 'थोक मंडी से ताजी हरी सब्जियां, फल व घरेलू सामान की सही भाव में खरीद।',
          en: 'Selective hand-picking of fresh vegetables, wholesale mandi price negotiation.',
          hinglish: 'Fresh sabzi mandi se lana aur quality check ke saath delivery.'
        },
        icon: '🥦',
        recommendedHours: 2
      },
      {
        id: 'err_queue_standing',
        name: {
          hi: 'सरकारी कार्यालय / बिजली बिल कतार सहायक',
          en: 'Govt Office & Utility Queue Standing Proxy',
          hinglish: 'Govt Office / RTO Queue Stand-in'
        },
        desc: {
          hi: 'नगर निगम, विद्युत मंडल, आरटीओ या रजिस्ट्री कार्यालय की कतार में लगना।',
          en: 'Standing in tedious queues on your behalf, holding spot until your arrival.',
          hinglish: 'Municipal / Electricity / RTO line me khade hokar number lagana.'
        },
        icon: '⏳',
        recommendedHours: 3
      },
      {
        id: 'err_heavy_shifting',
        name: {
          hi: 'घरेलू सामान शिफ्टिंग व फर्नीचर व्यवस्था',
          en: 'Home Furniture Shifting & Heavy Lifting',
          hinglish: 'Household Shifting & Heavy Lifting'
        },
        desc: {
          hi: 'अलमारी, वॉशिंग मशीन, भारी बक्से एक कमरे से दूसरे कमरे में जमाना।',
          en: 'Careful relocation of heavy domestic appliances, boxes and furniture.',
          hinglish: 'Heavy boxes, cooler, fridge shifting aur room organization.'
        },
        icon: '📦',
        recommendedHours: 3
      },
      {
        id: 'err_document_dispatch',
        name: {
          hi: 'गोपनीय दस्तावेज व पार्सल पिक-एंड-ड्रॉप',
          en: 'Confidential Document & Parcel Transit',
          hinglish: 'Document & Parcel Delivery Runner'
        },
        desc: {
          hi: 'वकील, सीए, बैंक या कार्यालय तक महत्वपूर्ण फाइलों की सुरक्षित डिलीवरी।',
          en: 'Secure point-to-point courier with OTP-verified handover and live track.',
          hinglish: 'Important legal / CA documents ki direct point-to-point delivery.'
        },
        icon: '📄',
        recommendedHours: 2
      }
    ],
    quickRequirements: [
      'Need a runner with two-wheeler for 2 hours mandi grocery shopping',
      'Need strong boy to help shift sofa and cooler up to 2nd floor',
      'Stand in line at electricity board office for billing correction',
      'Collect signed property documents from advocate chamber & deliver to home',
      'Help in packing and sealing 10 cartons for household shifting'
    ]
  },
  {
    id: 'ride_travel',
    title: {
      hi: '🚗 कार व 🏍️ बाइक यात्रा साथी (Ride & Travel Booking)',
      en: '🚗 Car & 🏍️ Bike Travel Partner (Local & Outstation)',
      hinglish: '🚗 Car & Bike Ride Booking (Rapido/Ola se behtar)'
    },
    tagline: {
      hi: 'लोकल शहर व आउटस्टेशन यात्रा हेतु त्वरित बाइक टैक्सी व कार कैब। पारदर्शी 10% प्लेटफ़ॉर्म व प्रबंधन शुल्क (90% चालक की सीधी कमाई • 10% ऐप सर्वर, 24/7 SOS सुरक्षा व मेंटेनेंस), नो सर्ज प्राइसिंग, डायरेक्ट ड्राइवर कॉल।',
      en: 'Instant bike taxi & car cab for city & outstation travel. Fair 10% platform management fee (90% driver earnings • 10% app operations & 24/7 SOS safety), zero surge pricing, direct driver calls.',
      hinglish: 'Bike taxi, City Car, Intercity Travel. 90% Driver direct earning, 10% fair app management fee, 0% surge pricing aur direct contact.'
    },
    icon: '🚗',
    visualAnchorBadge: 'BIKE & CAR TRAVEL • BASE ₹30 + ₹10/KM',
    themeColor: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      border: 'border-amber-500/50 hover:border-amber-400',
      bgGlow: 'from-amber-950/40 via-[#1C1205] to-[#0A0702]',
      gradient: 'from-amber-500 to-yellow-600',
      accent: '#F59E0B'
    },
    baseHourlyRate: 30,
    subServices: [
      {
        id: 'ride_bike_express',
        name: {
          hi: '🏍️ सुपरफास्ट बाइक टैक्सी (Bike Express)',
          en: '🏍️ Superfast Bike Taxi (Solo Rider Express)',
          hinglish: '🏍️ Fast Bike Taxi (Rapido Alternative)'
        },
        desc: {
          hi: 'ट्रैफिक से बचकर तेज और सबसे सस्ती यात्रा। हेलमेट उपलब्ध, सुरक्षित राइड। ₹6-8/किमी।',
          en: 'Beat traffic jams swiftly at lowest cost. Sanitized helmet provided. ₹6-8/km.',
          hinglish: 'Traffic se bachiye, sabse sasti & fast ride. Helmet provided.'
        },
        icon: '🏍️',
        recommendedHours: 1
      },
      {
        id: 'ride_car_city',
        name: {
          hi: '🚗 सिटी कैब व कार राइड (AC Hatchback / Sedan)',
          en: '🚗 City Cab & Car Ride (AC Hatchback / Sedan)',
          hinglish: '🚗 City Car Ride (AC Comfort)'
        },
        desc: {
          hi: 'परिवार व लगेज के साथ आरामदायक लोकल यात्रा। साफ-सुथरी कार, नो सर्ज रेट। ₹11-14/किमी।',
          en: 'Comfortable air-conditioned city transit with family & luggage. ₹11-14/km.',
          hinglish: 'Comfortable AC car ride, fair pricing, no surge charges.'
        },
        icon: '🚗',
        recommendedHours: 2
      },
      {
        id: 'ride_car_outstation',
        name: {
          hi: '🚙 आउटस्टेशन व इंटरसिटी कार/SUV (गाँव से शहर व लंबी दूरी)',
          en: '🚙 Outstation & Intercity Car/SUV (Town to City & Long Distance)',
          hinglish: '🚙 Outstation & Rural-to-City Long Travel'
        },
        desc: {
          hi: '50 से 350+ किलोमीटर की अंतर-शहरी व ग्रामीण यात्रा। वन-वे व राउंड ट्रिप दोनों।',
          en: '50 km to 350+ km intercity and rural transit with verified drivers.',
          hinglish: 'Long distance travel, outstation & rural connectivity.'
        },
        icon: '🚙',
        recommendedHours: 5
      },
      {
        id: 'ride_women_safe',
        name: {
          hi: '👩‍🦰 पिंक राइड (महिला पायलट व सुरक्षित यात्रा साथी)',
          en: '👩‍🦰 Pink Safe Ride (Verified Female Bike/Car Partner)',
          hinglish: '👩‍🦰 Women Special Safe Ride'
        },
        desc: {
          hi: 'महिला यात्रियों और छात्राओं हेतु समर्पित सत्यापित महिला टू-व्हीलर / कार पायलट।',
          en: 'Dedicated police-verified female bike/car pilot for female passengers & students.',
          hinglish: 'Female passenger ke liye dedicated female driver partner.'
        },
        icon: '👩‍🦰',
        recommendedHours: 2
      }
    ],
    quickRequirements: [
      'Need urgent bike ride from MP Nagar to BHEL (12 km)',
      'Book AC car for 4 passengers to Bhopal Airport (22 km)',
      'Outstation car needed for Bhopal to Indore one-way (190 km)',
      'Need female bike rider for college drop & pickup (daily)',
      'Emergency car for railway station with 3 heavy suitcases'
    ]
  }
];

export const verifiedCompanionWorkersPool: CompanionWorker[] = [
  {
    id: 'cmp-01',
    name: 'Pooja Vishwakarma',
    gender: 'female',
    age: 23,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 184,
    tasksCompleted: 142,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-88419',
    aadhaareKYCVerified: true,
    specialization: {
      hi: 'अस्पताल अटेंडेंट, बुजुर्ग देखभाल व प्राथमिक चिकित्सा (B.Sc Nursing Student)',
      en: 'Hospital Attendant, Elderly Care & First Aid (B.Sc Nursing Student)',
      hinglish: 'Hospital Patient Care & Senior Support (Trained)'
    },
    languages: ['Hindi', 'English', 'Bundelkhandi'],
    distanceKm: 1.4,
    etaMinutes: 12,
    hourlyRate: 199,
    city: 'Bhopal (MP Nagar Zone 2)',
    phone: '+91 98261 44520',
    availableNow: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    badgeTitle: '🌟 Gold Verified Companion',
    bio: 'Diligent final-year nursing scholar with 2+ years of hospital bedside experience. Known for gentle empathy, absolute safety, and patience.',
    documents: {
      aadhaar: {
        number: 'XXXX-XXXX-3829',
        docName: 'Aadhaar_Pooja_Card.pdf',
        status: 'verified',
        uploadedAt: '2026-07-10T10:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: 'MP-BPL-CID-2026-88419',
        policeStation: 'MP Nagar PS, Bhopal',
        docName: 'Police_Clearance_Certificate.pdf',
        status: 'verified',
        uploadedAt: '2026-07-11T12:30:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: 'BG-BPL-8891',
        agency: 'TruthFirst Background Verification Labs',
        docName: 'Background_Verification_Report.pdf',
        status: 'verified',
        uploadedAt: '2026-07-12T16:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 4680,
      pendingWeeklyPayout: 4680,
      totalEarnings: 28400,
      upiId: 'pooja.v@okhdfcbank',
      bankAccountNumber: '5010049281920',
      bankIfsc: 'HDFC0001029',
      bankName: 'HDFC Bank'
    }
  },
  {
    id: 'cmp-02',
    name: 'Rohit Verma',
    gender: 'male',
    age: 24,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewsCount: 165,
    tasksCompleted: 128,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-44102',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'इवेंट स्टेज समन्वय, शगुन डेस्क व अतिथि सत्कार (NCC ‘C’ Certificate)',
      en: 'Event Stage Coordinator, Shagun Desk & Guest Hospitality (NCC ‘C’ Holder)',
      hinglish: 'Wedding Stage Coordinator & VIP Guest Desk Manager'
    },
    languages: ['Hindi', 'English'],
    distanceKm: 2.1,
    etaMinutes: 16,
    hourlyRate: 189,
    city: 'Bhopal (Arera Colony)',
    phone: '+91 94250 88219',
    availableNow: true,
    badgeTitle: '🎖️ NCC Cadre Sovereign Coordinator',
    bio: 'Disciplined NCC cadet and sports captain. Exceptional leadership at banquets, weddings, stage cues, and crowd control.',
    documents: {
      aadhaar: {
        number: 'XXXX-XXXX-4412',
        docName: 'Aadhaar_Rohit_Verma.pdf',
        status: 'verified',
        uploadedAt: '2026-07-15T09:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: 'MP-BPL-CID-2026-44102',
        policeStation: 'Arera Colony Habibganj PS',
        docName: 'Police_Clearance_Habibganj.pdf',
        status: 'verified',
        uploadedAt: '2026-07-16T11:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: 'BG-MP-7721',
        agency: 'TruthFirst Background Verification Labs',
        docName: 'BG_Report_Rohit.pdf',
        status: 'verified',
        uploadedAt: '2026-07-17T14:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 3780,
      pendingWeeklyPayout: 3780,
      totalEarnings: 24200,
      upiId: 'rohit.verma@axisbank',
      bankAccountNumber: '918204928190',
      bankIfsc: 'UTIB0001829',
      bankName: 'Axis Bank'
    }
  },
  {
    id: 'cmp-03',
    name: 'Anjali Sharma',
    gender: 'female',
    age: 22,
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewsCount: 112,
    tasksCompleted: 94,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-30291',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'विवाह स्वागत आरती, पारंपरिक सत्कार व शगुन लेजर (B.Com Honors)',
      en: 'Wedding Aarti Reception, Ethnic Welcome & Shagun Ledger (B.Com)',
      hinglish: 'Wedding Guest Aarti Desk & Cash Register Entry'
    },
    languages: ['Hindi', 'English', 'Malwi'],
    distanceKm: 2.8,
    etaMinutes: 20,
    hourlyRate: 179,
    city: 'Bhopal (Shahpura)',
    phone: '+91 97524 11802',
    availableNow: true,
    badgeTitle: '🪔 Hospitality Lead',
    bio: 'Polite, articulate communicator with impeccable track record in managing wedding reception counters, gift indexing, and traditional Indian welcome.'
  },
  {
    id: 'cmp-04',
    name: 'Suresh Patidar',
    gender: 'male',
    age: 26,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewsCount: 220,
    tasksCompleted: 186,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-99321',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'वरिष्ठ नागरिक सैर, बैंक पेंशन कार्य व दवा प्रबंधन (Red Cross First Responder)',
      en: 'Senior Citizen Walking Buddy, Pension Escort & Red Cross Certified',
      hinglish: 'Senior Citizen Walking & Bank Documentation Expert'
    },
    languages: ['Hindi', 'Malwi'],
    distanceKm: 1.8,
    etaMinutes: 14,
    hourlyRate: 159,
    city: 'Bhopal (Kolar Road)',
    phone: '+91 98930 77123',
    availableNow: true,
    badgeTitle: '🧓 Certified Senior Companion',
    bio: 'Warm, respectful conversationalist with calm temperament. Certified by Red Cross in basic elder CPR, mobility assistance, and wheelchair guidance.'
  },
  {
    id: 'cmp-05',
    name: 'Amitabh Sen',
    gender: 'male',
    age: 25,
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    rating: 4.91,
    reviewsCount: 147,
    tasksCompleted: 119,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-55190',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'स्मार्टफोन डिजिटल गुरु, यूपीआई प्रशिक्षण व सरकारी कतार सहायक (BCA Graduate)',
      en: 'Elderly Smartphone Coach, Safe UPI & Queue Proxy (BCA Graduate)',
      hinglish: 'Smartphone Coaching, Video Call Setup & Fast Queue Proxy'
    },
    languages: ['Hindi', 'English', 'Bengali'],
    distanceKm: 3.2,
    etaMinutes: 22,
    hourlyRate: 149,
    city: 'Bhopal (Habibganj)',
    phone: '+91 91114 62890',
    availableNow: true,
    badgeTitle: '📱 Digital Literacy Ambassador',
    bio: 'Patient tech coach helping senior citizens navigate smartphones with ease. Trusted by dozens of retired government officers.'
  },
  {
    id: 'cmp-06',
    name: 'Vikas Kushwaha',
    gender: 'male',
    age: 23,
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    rating: 4.94,
    reviewsCount: 260,
    tasksCompleted: 215,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-11883',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'सब्जी मंडी खरीदारी, घरेलू शिफ्टिंग व त्वरित दस्तावेज धावक (Own 2-Wheeler)',
      en: 'Fresh Mandi Shopper, Parcel Runner & Home Shifting (Licensed 2-Wheeler)',
      hinglish: 'Mandi Shopping, Fast Document Delivery & Shifting Help'
    },
    languages: ['Hindi', 'Bundelkhandi'],
    distanceKm: 0.9,
    etaMinutes: 8,
    hourlyRate: 139,
    city: 'Bhopal (New Market)',
    phone: '+91 96302 81920',
    availableNow: true,
    badgeTitle: '⚡ Superfast Errand Runner',
    bio: 'Super-punctual errand specialist with clean driving record and sharp wholesale market bargaining skills. 200+ five-star reviews.'
  },
  {
    id: 'cmp-07',
    name: 'Sneha Pandey',
    gender: 'female',
    age: 24,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    rating: 4.97,
    reviewsCount: 198,
    tasksCompleted: 156,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-66281',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    specialization: {
      hi: 'अस्पताल रात्रि ड्यूटी, आईसीयू अटेंडेंट व महिला मरीज देखभाल (GNM Nursing)',
      en: 'Hospital Night Shifts, ICU Patient Watch & GNM Certified',
      hinglish: 'Hospital Night Attendant & Dedicated Lady Companion'
    },
    languages: ['Hindi', 'English'],
    distanceKm: 2.5,
    etaMinutes: 18,
    hourlyRate: 219,
    city: 'Bhopal (Hamidia Area)',
    phone: '+91 97701 54321',
    availableNow: true,
    badgeTitle: '🩺 Certified Healthcare Attendant',
    bio: 'Registered nursing assistant with ICU post-op observation training. Compassionate, trustworthy for overnight hospital stays.'
  },
  {
    id: 'cmp-08',
    name: 'Deepak Ahirwar',
    gender: 'male',
    age: 25,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    rating: 4.89,
    reviewsCount: 138,
    tasksCompleted: 104,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-77340',
    aadhaareKYCVerified: true,
    specialization: {
      hi: 'बारात सुरक्षा, स्टेज कोऑर्डिनेशन व पार्किंग प्रबंधन (Sports Fitness Coach)',
      en: 'Baraat Security, Stage Flow & Parking Guidance (Fitness Coach)',
      hinglish: 'Baraat & Stage Coordination & Logistics'
    },
    languages: ['Hindi'],
    distanceKm: 1.7,
    etaMinutes: 15,
    hourlyRate: 179,
    city: 'Bhopal (BHEL Subhash Nagar)',
    phone: '+91 99812 34567',
    availableNow: true,
    verificationStatus: 'verified_active',
    isFlagged: false,
    badgeTitle: '🛡️ Sovereign Event Safety Lead',
    bio: 'Physically fit, courteous youth specialized in maintaining calm decorum, stage crowds, and valet logistics at large banquets.',
    documents: {
      aadhaar: {
        number: 'XXXX-XXXX-9182',
        docName: 'Aadhaar_Deepak_FrontBack.pdf',
        status: 'verified',
        uploadedAt: '2026-08-10T11:20:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: 'MP-BPL-CID-2026-77340',
        policeStation: 'BHEL Govindpura PS',
        docName: 'Police_Clearance_Deepak.pdf',
        status: 'verified',
        uploadedAt: '2026-08-11T14:30:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: 'BG-MP-9941',
        agency: 'TruthFirst Background Verification Labs',
        docName: 'Background_Check_Deepak.pdf',
        status: 'verified',
        uploadedAt: '2026-08-12T09:15:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 3120,
      pendingWeeklyPayout: 3120,
      totalEarnings: 18450,
      upiId: 'deepak.ahirwar@okaxis',
      bankAccountNumber: '382910401928',
      bankIfsc: 'SBIN0004120',
      bankName: 'State Bank of India'
    }
  },
  {
    id: 'cmp-09',
    name: 'Kavita Chandel',
    gender: 'female',
    age: 23,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 0,
    tasksCompleted: 0,
    policeVerified: false,
    policeVerificationId: 'MP-IND-CID-2026-PENDING-44',
    aadhaareKYCVerified: true,
    verificationStatus: 'pending_approval',
    isFlagged: false,
    specialization: {
      hi: 'अस्पताल अटेंडेंट एवं वरिष्ठ महिला देखभाल (B.Sc Home Science)',
      en: 'Hospital Attendant & Senior Care (B.Sc Home Science)',
      hinglish: 'Hospital Attendant & Elderly Care Applicant'
    },
    languages: ['Hindi', 'English'],
    distanceKm: 2.0,
    etaMinutes: 15,
    hourlyRate: 180,
    city: 'Bhopal (Saket Nagar)',
    phone: '+91 94065 19284',
    availableNow: false,
    badgeTitle: '⏳ Verification Pending (In Review)',
    bio: 'Aspiring healthcare companion. Applied with verified UIDAI Aadhaar, Crime record clearance from Saket Nagar police, awaiting Sovereign Admin approval.',
    documents: {
      aadhaar: {
        number: 'XXXX-XXXX-4819',
        docName: 'Aadhaar_Kavita_Card.pdf',
        status: 'pending',
        uploadedAt: '2026-09-02T10:14:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: 'MP-IND-CID-2026-PENDING-44',
        policeStation: 'Saket Nagar PS, Bhopal',
        docName: 'Police_Clearance_SaketNagar_Kavita.pdf',
        status: 'pending',
        uploadedAt: '2026-09-02T10:20:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: 'BG-BPL-2026-8812',
        agency: 'Sovereign Integrity e-Verification Cell',
        docName: 'Criminal_Background_Clearance.pdf',
        status: 'pending',
        uploadedAt: '2026-09-02T10:25:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 0,
      pendingWeeklyPayout: 0,
      totalEarnings: 0,
      upiId: 'kavita.chandel@ybl',
      bankAccountNumber: '918230192840',
      bankIfsc: 'PUNB0182900',
      bankName: 'Punjab National Bank'
    }
  },
  {
    id: 'cmp-10',
    name: 'Manish Rathore',
    gender: 'male',
    age: 26,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    rating: 3.75, // Dropped below 4.0 - Auto Flagged!
    reviewsCount: 32,
    tasksCompleted: 28,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-10294',
    aadhaareKYCVerified: true,
    verificationStatus: 'verified_active',
    isFlagged: true,
    flagReason: 'Low Rating Alert: Average dropped to 3.75★ (< 4.0★ threshold). Account under quality audit.',
    specialization: {
      hi: 'दैनिक कार्य एवं त्वरित धावक (Errands Runner)',
      en: 'Daily Errands & Fast Courier Proxy',
      hinglish: 'Errand Runner & Delivery Assistant'
    },
    languages: ['Hindi'],
    distanceKm: 4.1,
    etaMinutes: 28,
    hourlyRate: 140,
    city: 'Bhopal (Old City)',
    phone: '+91 97551 88201',
    availableNow: true,
    badgeTitle: '⚠️ Quality Warning Flagged (<4.0★)',
    bio: 'Errand runner flagged for late arrivals on recent tasks. Needs mandatory retraining before high-priority bookings.',
    documents: {
      aadhaar: {
        number: 'XXXX-XXXX-6610',
        docName: 'Aadhaar_Manish.pdf',
        status: 'verified',
        uploadedAt: '2026-07-15T09:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: 'MP-BPL-CID-2026-10294',
        policeStation: 'Mangalwara PS',
        docName: 'Police_Clearance_Manish.pdf',
        status: 'verified',
        uploadedAt: '2026-07-16T12:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: 'BG-BPL-5510',
        agency: 'TruthFirst Background Verification Labs',
        docName: 'Background_Clearance_Manish.pdf',
        status: 'verified',
        uploadedAt: '2026-07-17T15:00:00Z',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 1240,
      pendingWeeklyPayout: 1240,
      totalEarnings: 8400,
      upiId: 'manish.rathore@paytm',
      bankAccountNumber: '102938475610',
      bankIfsc: 'BARB0NEWBHU',
      bankName: 'Bank of Baroda'
    }
  }
];

// Initial available tasks for Worker Job Radar
export interface WorkerRadarTask {
  id: string;
  category: 'hospital_care' | 'event_wedding' | 'senior_citizen' | 'daily_errands';
  taskTitle: string;
  customerName: string;
  customerPhone: string;
  location: string;
  landmark: string;
  distanceKm: number;
  durationHours: number;
  hourlyRate: number;
  totalCustomerFee: number;
  workerEarnings80: number; // 80% split
  platformFee20: number; // 20% split
  requirements: string;
  genderPreference: 'any' | 'female' | 'male';
  startOtp: string;
  endOtp: string;
  expiresInSeconds: number;
  createdAt: string;
}

export const initialAvailableRadarTasks: WorkerRadarTask[] = [
  {
    id: 'TASK-RADAR-101',
    category: 'hospital_care',
    taskTitle: 'Hospital Bedside & Medicine Support',
    customerName: 'Dr. Rajesh Saxena',
    customerPhone: '+91 98260 11904',
    location: 'Bhopal Memorial Hospital & Research Centre, Ward 5 Bed 12',
    landmark: 'Karond Bypass, Near OPD Gate 1',
    distanceKm: 1.8,
    durationHours: 6,
    hourlyRate: 199,
    totalCustomerFee: 1194,
    workerEarnings80: 955, // 80%
    platformFee20: 239, // 20%
    requirements: 'Need attentive attendant to assist elderly post-surgery patient with dinner, medicine intake, and night vigilance.',
    genderPreference: 'female',
    startOtp: '4829',
    endOtp: '9103',
    expiresInSeconds: 52,
    createdAt: new Date().toISOString()
  },
  {
    id: 'TASK-RADAR-102',
    category: 'event_wedding',
    taskTitle: 'Wedding Stage & Shagun Desk Coordinator',
    customerName: 'Smt. Vandana Agrawal',
    customerPhone: '+91 94251 77312',
    location: 'Shubh Kesar Banquet Hall, Hoshangabad Road',
    landmark: 'Opposite Aashima Mall',
    distanceKm: 2.4,
    durationHours: 4,
    hourlyRate: 189,
    totalCustomerFee: 756,
    workerEarnings80: 605, // 80%
    platformFee20: 151, // 20%
    requirements: 'Shagun envelope register indexing, guest traditional Aarti welcome, stage VIP crowd queue management.',
    genderPreference: 'any',
    startOtp: '7721',
    endOtp: '3340',
    expiresInSeconds: 38,
    createdAt: new Date().toISOString()
  },
  {
    id: 'TASK-RADAR-103',
    category: 'senior_citizen',
    taskTitle: 'Senior Citizen Bank KYC & Walking Escort',
    customerName: 'Shri R.K. Mathur (Retd. Chief Engineer)',
    customerPhone: '+91 98930 22419',
    location: 'Arera Colony E-7 / 44',
    landmark: 'Near Ravishankar Shukla Market',
    distanceKm: 1.2,
    durationHours: 3,
    hourlyRate: 159,
    totalCustomerFee: 477,
    workerEarnings80: 382, // 80%
    platformFee20: 95, // 20%
    requirements: 'Escort 78-yr senior citizen to SBI Bank branch for Life Certificate (Jeevan Pramaan) biometric update & evening park walk.',
    genderPreference: 'any',
    startOtp: '6190',
    endOtp: '8401',
    expiresInSeconds: 70,
    createdAt: new Date().toISOString()
  },
  {
    id: 'TASK-RADAR-104',
    category: 'daily_errands',
    taskTitle: 'Wholesale Mandi Grocery & Registry Proxy',
    customerName: 'Kunal Singhal',
    customerPhone: '+91 96300 44109',
    location: 'Karond Krishi Upaj Mandi to 10 No. Market',
    landmark: 'Gate No. 3 Loading Area',
    distanceKm: 3.1,
    durationHours: 2,
    hourlyRate: 140,
    totalCustomerFee: 280,
    workerEarnings80: 224, // 80%
    platformFee20: 56, // 20%
    requirements: 'Purchase 25kg bulk flour, spices, and fresh vegetables list from wholesale rates and deliver safely to flat.',
    genderPreference: 'male',
    startOtp: '3512',
    endOtp: '7920',
    expiresInSeconds: 45,
    createdAt: new Date().toISOString()
  }
];

// Initial platform commission records - Daily Hisab Sheet with 10% - 20% Dynamic Commission
export const initialPlatformCommissionRecords: CompanionTaskCommissionRecord[] = [
  {
    id: 'COMM-HISAB-901',
    taskId: 'JIT-CMP-84910',
    taskTitle: 'हॉस्पिटल सहायक (Hospital Sahayak - OPD व दवा)',
    customerName: 'Anil Sharma (AIIMS Patient)',
    workerId: 'cmp-01',
    workerName: 'Pooja Vishwakarma',
    hours: 2,
    hourlyRate: 180,
    bikeKm: 6,
    bikeKmCharge: 60,
    waitingCharge: 0,
    grossFee: 360,
    billFormulaBreakdown: '2hr x ₹180 = ₹360 (Hospital Bike Sahayak)',
    platformCommissionPercent: 20, // 20% for hospital task
    platformShareAmount: 72,
    workerShareAmount: 288,
    workerShare80: 288,
    platformShare20: 72,
    status: 'credited',
    timestamp: '2026-10-24T10:45:00Z',
    dateStr: 'Today, 24 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2332° N, 77.4344° E • AIIMS OPD Gate 2, Bhopal',
    endPhotoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2330° N, 77.4342° E • AIIMS Pharmacy, Bhopal'
  },
  {
    id: 'COMM-HISAB-902',
    taskId: 'JIT-CMP-84882',
    taskTitle: 'बुजुर्ग साथी (Buzurg Sathi - मंदिर व देखभाल)',
    customerName: 'Smt. Gayatri Devi (Arera Colony)',
    workerId: 'cmp-02',
    workerName: 'Rohit Verma',
    hours: 2,
    hourlyRate: 150,
    bikeKm: 6,
    bikeKmCharge: 60,
    waitingCharge: 0,
    grossFee: 360,
    billFormulaBreakdown: '2hr x 150 = 300 + 6km bike 60 = 360',
    platformCommissionPercent: 18, // 18% for senior care
    platformShareAmount: 65,
    workerShareAmount: 295,
    workerShare80: 295,
    platformShare20: 65,
    status: 'credited',
    timestamp: '2026-10-24T09:15:00Z',
    dateStr: 'Today, 24 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2140° N, 77.4310° E • Arera Colony E-3, Bhopal',
    endPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2180° N, 77.4350° E • Birla Mandir complex, Bhopal'
  },
  {
    id: 'COMM-HISAB-903',
    taskId: 'JIT-CMP-84850',
    taskTitle: 'सुरक्षित यात्रा साथी (Surakshit Yatra - Station Escort)',
    customerName: 'Priya Chouhan (Bhopal Jn.)',
    workerId: 'cmp-03',
    workerName: 'Sunita Mehra',
    hours: 1,
    hourlyRate: 200,
    bikeKm: 8,
    bikeKmCharge: 40, // 4km free rule (4km x 10)
    waitingCharge: 0,
    grossFee: 240,
    billFormulaBreakdown: '1hr x ₹200 = ₹200 + 8km bike (4km free = 4km x 10) ₹40 = ₹240',
    platformCommissionPercent: 20, // 20% for women safe transit
    platformShareAmount: 48,
    workerShareAmount: 192,
    workerShare80: 192,
    platformShare20: 48,
    status: 'credited',
    timestamp: '2026-10-24T07:30:00Z',
    dateStr: 'Today, 24 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2680° N, 77.4110° E • Bhopal Jn Platform 1',
    endPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2350° N, 77.4290° E • MP Nagar Zone 2'
  },
  {
    id: 'COMM-HISAB-904',
    taskId: 'JIT-CMP-84729',
    taskTitle: 'बैंक एवं सरकारी सहायक (Bank KYC & Challan)',
    customerName: 'Gita Devi (Pensioner)',
    workerId: 'cmp-04',
    workerName: 'Suresh Patidar',
    hours: 2,
    hourlyRate: 150,
    bikeKm: 0,
    bikeKmCharge: 0,
    waitingCharge: 50,
    grossFee: 350,
    billFormulaBreakdown: '2hr x ₹150 = ₹300 + Waiting (30 min extra) ₹50 = ₹350',
    platformCommissionPercent: 15, // 15% for bank task
    platformShareAmount: 52,
    workerShareAmount: 298,
    workerShare80: 298,
    platformShare20: 52,
    status: 'settled',
    timestamp: '2026-10-23T14:10:00Z',
    dateStr: 'Yesterday, 23 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2450° N, 77.4100° E • SBI Main Branch TT Nagar',
    endPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2452° N, 77.4102° E • SBI Main Branch TT Nagar'
  },
  {
    id: 'COMM-HISAB-905',
    taskId: 'JIT-CMP-84610',
    taskTitle: 'लोकल सामान व इमरजेंसी टास्क (Local Delivery)',
    customerName: 'Rameshwar Lodhi',
    workerId: 'cmp-06',
    workerName: 'Vikas Kushwaha',
    hours: 1,
    hourlyRate: 140,
    bikeKm: 7,
    bikeKmCharge: 30, // 4km free rule (3km x 10)
    waitingCharge: 0,
    grossFee: 170,
    billFormulaBreakdown: '1hr x ₹140 = ₹140 + 7km bike (4km free = 3km x 10) ₹30 = ₹170',
    platformCommissionPercent: 10, // 10% for delivery task
    platformShareAmount: 17,
    workerShareAmount: 153,
    workerShare80: 153,
    platformShare20: 17,
    status: 'settled',
    timestamp: '2026-10-23T16:20:00Z',
    dateStr: 'Yesterday, 23 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2800° N, 77.4000° E • Karond Mandi Gate 3',
    endPhotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2200° N, 77.4300° E • 10 No. Market Bhopal'
  },
  {
    id: 'COMM-HISAB-906',
    taskId: 'JIT-CMP-84501',
    taskTitle: 'सिर्फ राइड सर्विस (SIRF Ride - Rapido Model)',
    customerName: 'Kunal Singhal',
    workerId: 'cmp-06',
    workerName: 'Vikas Kushwaha',
    hours: 0,
    hourlyRate: 30,
    bikeKm: 9,
    bikeKmCharge: 90,
    waitingCharge: 0,
    grossFee: 120,
    billFormulaBreakdown: 'Base ₹30 + 9km x ₹10 = ₹120',
    platformCommissionPercent: 10, // 10% for pure ride
    platformShareAmount: 12,
    workerShareAmount: 108,
    workerShare80: 108,
    platformShare20: 12,
    status: 'settled',
    timestamp: '2026-10-23T18:40:00Z',
    dateStr: 'Yesterday, 23 Oct',
    startPhotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    startGpsLocation: '23.2350° N, 77.4290° E • MP Nagar Zone 1',
    endPhotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    endGpsLocation: '23.2010° N, 77.4420° E • Kolar Road Mandakini'
  }
];

export const sovereignSafetyProtocols = {
  policeControlRoom: '112',
  sovereignEmergencyHelpline: '1800-JITOMNI-SOS (1800-548-6664)',
  womenSafetyHelpline: '1090',
  ambulanceDial: '108',
  insuranceCoverage: '₹2,00,000 Sovereign Accidental & Task Liability Insurance',
  verificationCriteria: [
    '100% Aadhaar Biometric / Face-Auth eKYC Verified',
    'Local Police Station Crime & Character Clearance Certificate',
    'Jitomni 360° In-Person Behavioral & Soft Skills Interview'
  ]
};

// Aliases for admin and worker portal modules
export const initialVerifiedWorkers = verifiedCompanionWorkersPool;

export const initialRidePartnersPool: RideVehiclePartner[] = [
  {
    id: 'ride-p-01',
    name: 'Dharmendra Sharma',
    phone: '+91 98261 58210',
    whatsapp: '+91 98261 58210',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 28,
    vehicleType: 'bike',
    vehicleName: 'Hero Splendor Plus (Black/Silver)',
    vehicleNumber: 'MP 04 ZB 7824',
    seatingCapacity: 1,
    serviceArea: 'MP Nagar, Habibganj, Shahpura se Mandideep & BHEL',
    operatingCity: 'Bhopal',
    routeCoverage: 'MP Nagar, Railway Station, Kolar, BHEL, Mandideep Industrial Area (0-40 km)',
    maxKilometers: 45,
    ratePerKm: 7,
    baseFare: 25,
    helmetProvided: true,
    availableNow: true,
    rating: 4.94,
    reviewsCount: 218,
    tripsCompleted: 342,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-TRAF-2026-9921',
    dlNumber: 'MP04-2018-0048291',
    rcVerified: true,
    aadhaarVerified: true,
    bio: '5+ years safe two-wheeler driving in Bhopal. Sanitized spare helmet provided, zero rash driving, fair meter.'
  },
  {
    id: 'ride-p-02',
    name: 'Pooja Vishwakarma',
    phone: '+91 98261 44520',
    whatsapp: '+91 98261 44520',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    gender: 'female',
    age: 24,
    vehicleType: 'scooter',
    vehicleName: 'TVS Jupiter 125 (Matte Blue)',
    vehicleNumber: 'MP 04 SK 4109',
    seatingCapacity: 1,
    serviceArea: 'Arera Colony, MP Nagar, Nutan College, Bittan Market, BHEL',
    operatingCity: 'Bhopal',
    routeCoverage: 'South Bhopal, MP Nagar, Colleges & Hostels, Safe Corridor for Female Passengers (0-30 km)',
    maxKilometers: 35,
    ratePerKm: 8,
    baseFare: 30,
    helmetProvided: true,
    availableNow: true,
    rating: 4.98,
    reviewsCount: 194,
    tripsCompleted: 280,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-WSAFE-2026-7714',
    dlNumber: 'MP04-2021-0081944',
    rcVerified: true,
    aadhaarVerified: true,
    isFemaleDriver: true,
    bio: 'Dedicated safe ride partner for women, college girls & elderly. High empathy, punctual and safe.'
  },
  {
    id: 'ride-p-03',
    name: 'Vikram Singh Rajput',
    phone: '+91 94250 88319',
    whatsapp: '+91 94250 88319',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 32,
    vehicleType: 'car_hatchback',
    vehicleName: 'Maruti Suzuki WagonR VXI (White - Clean AC)',
    vehicleNumber: 'MP 04 CA 3218',
    seatingCapacity: 4,
    serviceArea: 'Bhopal City, Raja Bhoj Airport, Rani Kamlapati Station, Kolar, Sehore',
    operatingCity: 'Bhopal',
    routeCoverage: 'All Bhopal Local, Airport Express, Station Drop & Sehore (0-75 km)',
    maxKilometers: 80,
    ratePerKm: 12,
    baseFare: 70,
    acAvailable: true,
    availableNow: true,
    rating: 4.91,
    reviewsCount: 310,
    tripsCompleted: 490,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-TRAF-2026-3841',
    dlNumber: 'MP04-2015-0019283',
    rcVerified: true,
    aadhaarVerified: true,
    bio: 'Commercial badge driver with clean record. Chilled AC, quiet ride, carrier for heavy luggage.'
  },
  {
    id: 'ride-p-04',
    name: 'Kailash Patel',
    phone: '+91 98932 77102',
    whatsapp: '+91 98932 77102',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 36,
    vehicleType: 'car_sedan',
    vehicleName: 'Maruti Suzuki Dzire Tour (Silver AC)',
    vehicleNumber: 'MP 04 CC 9012',
    seatingCapacity: 4,
    serviceArea: 'Bhopal to Indore, Ujjain, Hoshangabad, Raisen, Sagar Highway',
    operatingCity: 'Bhopal & Outstation',
    routeCoverage: 'Bhopal-Indore Highway (195 km), Ujjain Mahakal (220 km), Hoshangabad / Narmadapuram (75 km)',
    maxKilometers: 350,
    ratePerKm: 13,
    baseFare: 120,
    acAvailable: true,
    availableNow: true,
    rating: 4.96,
    reviewsCount: 420,
    tripsCompleted: 612,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-6629',
    dlNumber: 'MP04-2012-0004921',
    rcVerified: true,
    aadhaarVerified: true,
    bio: 'Specialist in outstation & intercity highway travel. Fastag enabled, smooth driving, comfortable sedan.'
  },
  {
    id: 'ride-p-05',
    name: 'Mahesh Lodhi',
    phone: '+91 97551 22890',
    whatsapp: '+91 97551 22890',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 34,
    vehicleType: 'car_suv',
    vehicleName: 'Maruti Suzuki Ertiga 7-Seater (Pearl White AC)',
    vehicleNumber: 'MP 04 TZ 8190',
    seatingCapacity: 6,
    serviceArea: 'Bhopal, Pachmarhi, Indore, Jabalpur, Wedding & Family Outings',
    operatingCity: 'Bhopal / MP Statewide',
    routeCoverage: 'City group travel, wedding airport shuttle & outstation pilgrimage (Pachmarhi, Sanchi, Omkareshwar) up to 400 km',
    maxKilometers: 400,
    ratePerKm: 16,
    baseFare: 200,
    acAvailable: true,
    availableNow: true,
    rating: 4.95,
    reviewsCount: 180,
    tripsCompleted: 295,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-CID-2026-5510',
    dlNumber: 'MP04-2014-0010928',
    rcVerified: true,
    aadhaarVerified: true,
    bio: 'Spacious 7-seater SUV with roof carrier. Ideal for big families, luggage, and comfortable long highway trips.'
  },
  {
    id: 'ride-p-06',
    name: 'Amit Malviya',
    phone: '+91 96301 44192',
    whatsapp: '+91 96301 44192',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 25,
    vehicleType: 'bike',
    vehicleName: 'Bajaj Pulsar 150 (Neon Yellow/Black)',
    vehicleNumber: 'MP 04 NA 5519',
    seatingCapacity: 1,
    serviceArea: 'Old Bhopal, Bhopal Junction Railway Station, Karond, Ayodhya Bypass',
    operatingCity: 'Bhopal',
    routeCoverage: 'North Bhopal, Nadra Bus Stand, Old City, Karond & Ayodhya Bypass (0-25 km)',
    maxKilometers: 30,
    ratePerKm: 6,
    baseFare: 20,
    helmetProvided: true,
    availableNow: true,
    rating: 4.88,
    reviewsCount: 145,
    tripsCompleted: 210,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-TRAF-2026-1182',
    dlNumber: 'MP04-2020-0038102',
    rcVerified: true,
    aadhaarVerified: true,
    bio: 'Super agile bike pilot. Know all shortcuts to reach railway station and bus stand without traffic delay.'
  },
  {
    id: 'ride-p-07',
    name: 'Sourabh Sen',
    phone: '+91 91114 88203',
    whatsapp: '+91 91114 88203',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 26,
    vehicleType: 'electric_ev',
    vehicleName: 'Ather 450X Electric Scooter (White)',
    vehicleNumber: 'MP 04 EV 1024',
    seatingCapacity: 1,
    serviceArea: 'MP Nagar, 10 Number Market, Chuna Bhatti, Shahpura Lake, Kolar Road',
    operatingCity: 'Bhopal',
    routeCoverage: 'Central & New Bhopal, Green Eco Corridor, Zero Emission (0-35 km)',
    maxKilometers: 40,
    ratePerKm: 6.5,
    baseFare: 20,
    helmetProvided: true,
    availableNow: true,
    rating: 4.97,
    reviewsCount: 120,
    tripsCompleted: 165,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-TRAF-2026-4402',
    dlNumber: 'MP04-2019-0022941',
    rcVerified: true,
    aadhaarVerified: true,
    bio: '100% Electric, silent and smooth ride. Pocket-friendly, eco-friendly, and always on time.'
  },
  {
    id: 'ride-p-08',
    name: 'Mohit Chouhan',
    phone: '+91 98270 66491',
    whatsapp: '+91 98270 66491',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    gender: 'male',
    age: 29,
    vehicleType: 'car_hatchback',
    vehicleName: 'Hyundai Grand i10 Nios (Titan Grey AC)',
    vehicleNumber: 'MP 04 CE 6720',
    seatingCapacity: 4,
    serviceArea: 'Bhopal Airport, Lalghati, VIP Road, TT Nagar, Bairagarh',
    operatingCity: 'Bhopal',
    routeCoverage: 'West Bhopal, Airport corridor, Sehore Bypass & City Centre (0-60 km)',
    maxKilometers: 60,
    ratePerKm: 12,
    baseFare: 65,
    acAvailable: true,
    availableNow: true,
    rating: 4.93,
    reviewsCount: 240,
    tripsCompleted: 380,
    policeVerified: true,
    policeVerificationId: 'MP-BPL-TRAF-2026-8820',
    dlNumber: 'MP04-2017-0091029',
    rcVerified: true,
    aadhaarVerified: true,
    bio: 'Punctual airport transfers with flight tracking. Clean interiors, phone charger and chilled bottled water.',
    platformFeePlan: 'percentage_10',
    totalFareGenerated: 45600,
    platformFeePaid: 4560,
    platformFeePending: 0
  }
];

export const initialRidePlatformFeeRecords: RidePlatformFeeRecord[] = [
  {
    id: 'RIDE-FEE-101',
    rideId: 'RIDE-948102',
    driverName: 'Vikram Rajput',
    driverPhone: '+91 98260 11928',
    vehicleType: 'bike',
    vehicleNumber: 'MP 04 MN 4821',
    route: 'MP Nagar Zone-1 → Mandideep Industrial Area',
    distanceKm: 18,
    totalFare: 151,
    driverPayout: 136, // 90%
    platformFee: 15, // 10%
    date: '2026-09-06 09:15 AM',
    status: 'collected'
  },
  {
    id: 'RIDE-FEE-102',
    rideId: 'RIDE-947883',
    driverName: 'Rameshwar Sahu',
    driverPhone: '+91 94250 88192',
    vehicleType: 'car_sedan',
    vehicleNumber: 'MP 04 ZA 9920',
    route: 'Bhopal Raja Bhoj Airport → TT Nagar',
    distanceKm: 16,
    totalFare: 292,
    driverPayout: 263, // 90%
    platformFee: 29, // 10%
    date: '2026-09-06 08:30 AM',
    status: 'collected'
  },
  {
    id: 'RIDE-FEE-103',
    rideId: 'RIDE-946712',
    driverName: 'Sourabh Sen',
    driverPhone: '+91 91114 88203',
    vehicleType: 'electric_ev',
    vehicleNumber: 'MP 04 EV 1024',
    route: 'Bittan Market → Shahpura Lake',
    distanceKm: 6.5,
    totalFare: 62,
    driverPayout: 56, // 90%
    platformFee: 6, // 10%
    date: '2026-09-05 07:45 PM',
    status: 'collected'
  },
  {
    id: 'RIDE-FEE-104',
    rideId: 'RIDE-945901',
    driverName: 'Sunita Mehra (Women Safe)',
    driverPhone: '+91 98930 77412',
    vehicleType: 'scooter',
    vehicleNumber: 'MP 04 SQ 2209',
    route: 'Barkatullah University → 10 No. Market',
    distanceKm: 8,
    totalFare: 84,
    driverPayout: 76, // 90%
    platformFee: 8, // 10%
    date: '2026-09-05 05:20 PM',
    status: 'collected'
  },
  {
    id: 'RIDE-FEE-105',
    rideId: 'RIDE-944210',
    driverName: 'Mahesh Lodhi',
    driverPhone: '+91 97551 22890',
    vehicleType: 'car_suv',
    vehicleNumber: 'MP 04 TZ 8190',
    route: 'Bhopal → Sanchi Stupa Day Outing',
    distanceKm: 96,
    totalFare: 1736,
    driverPayout: 1562, // 90%
    platformFee: 174, // 10%
    date: '2026-09-04 11:00 AM',
    status: 'collected'
  }
];

// ============================================================================
// 8 SOVEREIGN TASK SERVICES & 3 FIXED MANDATORY RULES
// ============================================================================

export const SOVEREIGN_TASK_SERVICES: SovereignTaskRateCard[] = [
  {
    id: 'buzurg_sathi',
    taskNumber: 1,
    name: {
      hi: 'बुजुर्ग साथी (Buzurg Sathi)',
      en: 'Elderly Companion (Buzurg Sathi)',
      hinglish: 'Buzurg Sathi (Baat, ghoomana, khana)'
    },
    desc: {
      hi: 'बातचीत, पार्क में टहलाना, भोजन में सहायता व आत्मीय देखभाल।',
      en: 'Companionship, emotional support, assisted walking & feeding.',
      hinglish: 'Baat-cheet, park me walk, khana khilana aur care.'
    },
    icon: '👴',
    badge: 'MIN 2 HOUR • 18% COMM • CARE & COMPANION',
    category: 'senior_citizen',
    withoutBikeRatePerHour: 120,
    withoutBikeNote: {
      hi: 'पैदल, पार्क या घर पर सेवा',
      en: 'Walking, park or home care',
      hinglish: 'Walking, park ya ghar par care'
    },
    withBikeRatePerHour: 150,
    withBikeNote: {
      hi: 'पास की दुकान/मंदिर तक बाइक से सुरक्षित ले जाना',
      en: 'Bike ride to nearby temple/shop included',
      hinglish: 'Paas ki dukaan/mandir tak bike se'
    },
    minBookingHours: 2,
    platformCommissionPercent: 18,
    importanceLevel: 'high',
    managementEffortReason: {
      hi: 'बुजुर्गों की देखभाल व संवेदनशीलता (दवा समय, आत्मीय सुरक्षा व निरंतर मॉनिटरिंग)',
      en: 'Elderly care & sensitivity (medicine schedule, emotional safety & active support)'
    },
    hasFourKmFreeRule: false,
    hasWaitingChargeRule: false
  },
  {
    id: 'hospital_sahayak',
    taskNumber: 2,
    name: {
      hi: 'हॉस्पिटल सहायक (Hospital Sahayak)',
      en: 'Hospital Attendant & Queue Escort',
      hinglish: 'Hospital Sahayak (Line, dawai, report)'
    },
    desc: {
      hi: 'ओपीडी पर्ची, लंबी कतार में खड़ा होना, दवाइयां लाना व टेस्ट रिपोर्ट संकलन।',
      en: 'OPD slip token, doctor line standing, medicine collection & test reports.',
      hinglish: 'Hospital OPD line, pharmacy se dawai aur reports collection.'
    },
    icon: '🏥',
    badge: 'MIN 2 HOUR • 20% COMM • WAITING RULE',
    category: 'hospital_care',
    withoutBikeRatePerHour: 150,
    withoutBikeNote: {
      hi: 'अस्पताल वार्ड व ओपीडी कतार में सहायता',
      en: 'Hospital ward & queue assistance',
      hinglish: 'Hospital ward aur line support'
    },
    withBikeRatePerHour: 180,
    withBikeNote: {
      hi: 'मेडिकल स्टोर व बाहर से दवा/जांच लाने हेतु बाइक',
      en: 'Medical shop / diagnostics bike transit',
      hinglish: 'Medical shop tak bike transit'
    },
    minBookingHours: 2,
    platformCommissionPercent: 20,
    importanceLevel: 'critical',
    managementEffortReason: {
      hi: 'उच्चतम जिम्मेदारी: OPD कतार, गंभीर मरीज वार्ड सपोर्ट, दवा चेकिंग व 24x7 इमरजेंसी सहायता',
      en: 'Critical responsibility: OPD queue, serious patient bedside care, pharmacy runner & 24x7 emergency backup'
    },
    hasFourKmFreeRule: false,
    hasWaitingChargeRule: true,
    waitingFreeHours: 1,
    waitingChargePer30Min: 50
  },
  {
    id: 'bank_sarkari',
    taskNumber: 3,
    name: {
      hi: 'बैंक एवं सरकारी सहायक (Bank & Sarkari Sahayak)',
      en: 'Bank & Govt Office Assistant',
      hinglish: 'Bank & Sarkari Sahayak (Form, line)'
    },
    desc: {
      hi: 'बैंक चालान, KYC फॉर्म भरना, तहसील, कलेक्ट्रेट व दफ्तरों में कतार में खड़ा होना।',
      en: 'Challan, KYC forms, tehsil, collectorate queue & document assistance.',
      hinglish: 'Bank form bharna, line me lagna aur govt office tasks.'
    },
    icon: '🏛️',
    badge: 'MIN 2 HOUR • 15% COMM • WAITING RULE',
    category: 'daily_errands',
    withoutBikeRatePerHour: 150,
    withoutBikeNote: {
      hi: 'दफ्तर में फॉर्म व कतार सहायता',
      en: 'Counter & queue assistance',
      hinglish: 'Counter aur line me khada hona'
    },
    withBikeRatePerHour: 180,
    withBikeNote: {
      hi: 'नोटरी, फोटोकॉपी व बैंक शाखाओं के बीच बाइक मूवमेंट',
      en: 'Bike transit between notary, Xerox & bank',
      hinglish: 'Notary, xerox aur branch bike transit'
    },
    minBookingHours: 2,
    platformCommissionPercent: 15,
    importanceLevel: 'high',
    managementEffortReason: {
      hi: 'दस्तावेज गोपनीयता, बैंक टोकन, चालान एवं कानूनी/सरकारी कार्य सुरक्षा',
      en: 'Document confidentiality, bank token & statutory compliance safety'
    },
    hasFourKmFreeRule: false,
    hasWaitingChargeRule: true,
    waitingFreeHours: 1,
    waitingChargePer30Min: 50
  },
  {
    id: 'sheher_guide',
    taskNumber: 4,
    name: {
      hi: 'शहर गाइड + हॉस्टल नेविगेटर (City Guide)',
      en: 'City Guide & Student Hostel Navigator',
      hinglish: 'Sheher Guide + Hostel Navigator'
    },
    desc: {
      hi: 'नए छात्रों व आगंतुकों को कोचिंग हब, सुरक्षित हॉस्टल, रूम व शहर दिखाना।',
      en: 'Navigating coaching hubs, safe student hostels, room finding & city transit.',
      hinglish: 'Coaching centers, safe hostels aur room hunting companion.'
    },
    icon: '🧭',
    badge: 'MIN 1 HOUR • 12% COMM • 4 KM FREE RIDE',
    category: 'daily_errands',
    withoutBikeRatePerHour: 120,
    withoutBikeNote: {
      hi: 'पैदल / लोकल ऑटो में साथ चलना',
      en: 'Walking / public transport escort',
      hinglish: 'Paidal / local transit ke saath'
    },
    withBikeRatePerHour: 160,
    withBikeNote: {
      hi: 'बाइक राइड + ₹10/KM (पहले 4 KM मुफ्त)',
      en: 'Bike ride + ₹10/KM (First 4 KM Free)',
      hinglish: 'Bike ride + ₹10/KM (0-4 KM Free)'
    },
    minBookingHours: 1,
    platformCommissionPercent: 12,
    importanceLevel: 'standard',
    managementEffortReason: {
      hi: 'नए छात्रों की सुरक्षा, हॉस्टल सत्यापन व शहर नेविगेशन सहायता',
      en: 'Student security, verified hostel finding & transit guidance'
    },
    hasFourKmFreeRule: true,
    ridePerKmDayRate: 10,
    hasWaitingChargeRule: false
  },
  {
    id: 'local_delivery',
    taskNumber: 5,
    name: {
      hi: 'लोकल सामान व इमरजेंसी टास्क (Local Delivery)',
      en: 'Local Errand & Emergency Task Delivery',
      hinglish: 'Local Saman & Emergency Task (Delivery)'
    },
    desc: {
      hi: 'मंडी से सामान, चाबी, पार्सल, टिफिन या कोई भी तात्कालिक वस्तु पहुंचाना।',
      en: 'Grocery pickup, keys, parcel, tiffin box, or urgent local deliveries.',
      hinglish: 'Urgent parcel, keys, grocery ya saman laana/pahunchana.'
    },
    icon: '📦',
    badge: 'MIN 1 HOUR • 10% COMM • 4 KM FREE RIDE',
    category: 'daily_errands',
    withoutBikeRatePerHour: 100,
    withoutBikeNote: {
      hi: 'ऑटो चार्ज कस्टमर देगा',
      en: 'Auto charge to be paid by customer directly',
      hinglish: 'Auto charge customer dega'
    },
    withBikeRatePerHour: 140,
    withBikeNote: {
      hi: 'बाइक डिलीवरी + ₹10/KM (0-4 KM Free)',
      en: 'Bike delivery + ₹10/KM (0-4 KM Free)',
      hinglish: 'Bike delivery + ₹10/KM (0-4 KM Free)'
    },
    minBookingHours: 1,
    platformCommissionPercent: 10,
    importanceLevel: 'standard',
    managementEffortReason: {
      hi: 'तात्कालिक पार्सल डिलीवरी एवं ओटीपी हैंडओवर ट्रैकिंग',
      en: 'Quick parcel logistics & secure OTP handover management'
    },
    hasFourKmFreeRule: true,
    ridePerKmDayRate: 10,
    hasWaitingChargeRule: false
  },
  {
    id: 'surakshit_yatra',
    taskNumber: 6,
    name: {
      hi: 'सुरक्षित यात्रा साथी (Surakshit Yatra Sathi)',
      en: 'Safe Transit Escort (Women / Elderly Companion)',
      hinglish: 'Surakshit Yatra Sathi (Akele ladki/buzurg ke saath)'
    },
    desc: {
      hi: 'अकेली महिला, छात्रा या बुजुर्ग के साथ बस/ऑटो या बाइक पर सुरक्षित यात्रा।',
      en: '100% verified escort for solo women/elderly on bus/auto or safe pillion bike ride.',
      hinglish: 'Late night ya station se ghar tak safe transit companion.'
    },
    icon: '🛡️',
    badge: 'MIN 1 HOUR • 20% COMM • RAPIDO STYLE RIDE',
    category: 'ride_travel',
    withoutBikeRatePerHour: 120,
    withoutBikeNote: {
      hi: 'बस / ऑटो से साथ यात्रा',
      en: 'Bus / Auto transit escort',
      hinglish: 'Bus / Auto se'
    },
    withBikeRatePerHour: 200,
    withBikeNote: {
      hi: 'बाइक पे पीछे बिठाके - Rapido Style (0-4 KM Free, फिर ₹10/KM)',
      en: 'Pillion bike escort Rapido style (0-4 KM Free, then ₹10/KM)',
      hinglish: 'Bike pe piche bithake - Rapido Style (0-4 KM Free)'
    },
    minBookingHours: 1,
    platformCommissionPercent: 20,
    importanceLevel: 'critical',
    managementEffortReason: {
      hi: 'उच्चतम सुरक्षा: महिला व बुजुर्ग सुरक्षा, लाइव पुलिस रडार, 24x7 SOS व आपातकालीन बैकअप',
      en: 'Critical protection: Women & senior transit security, live police radar, 24x7 SOS monitoring'
    },
    hasFourKmFreeRule: true,
    ridePerKmDayRate: 10,
    hasWaitingChargeRule: false
  },
  {
    id: 'event_parivarik',
    taskNumber: 7,
    name: {
      hi: 'इवेंट एवं पारिवारिक सहायक (Event Sahayak)',
      en: 'Event & Family Function Coordinator',
      hinglish: 'Event & Parivarik Sahayak (Shaadi/Function)'
    },
    desc: {
      hi: 'शादी, सगाई या पारिवारिक उत्सव में मेहमान स्वागत, शगुन व खानपान समन्वय।',
      en: 'Guest welcome, shagun counter, catering coordination & stage support.',
      hinglish: 'Shaadi, function me guest welcome, shagun aur stage coordination.'
    },
    icon: '🪔',
    badge: 'MIN 3 HOUR • 15% COMM • FUNCTION SQUAD',
    category: 'event_wedding',
    withoutBikeRatePerHour: 140,
    withoutBikeNote: {
      hi: 'इवेंट स्थल पर पूर्ण प्रबंधन',
      en: 'Venue coordination',
      hinglish: 'Venue coordination'
    },
    withBikeRatePerHour: 170,
    withBikeNote: {
      hi: 'मार्केट से पूजा/सजावट सामान त्वरित लाने हेतु बाइक सहित',
      en: 'With bike for urgent market pickups',
      hinglish: 'Market errands ke liye bike sahayak'
    },
    minBookingHours: 3,
    platformCommissionPercent: 15,
    importanceLevel: 'high',
    managementEffortReason: {
      hi: 'शगुन रजिस्टर, उपहार सुरक्षा व स्टेज अनुशासन समन्वय',
      en: 'Shagun cash counter, gift custody & stage coordination'
    },
    hasFourKmFreeRule: false,
    hasWaitingChargeRule: false
  },
  {
    id: 'rapido_ride',
    taskNumber: 8,
    name: {
      hi: 'सिर्फ राइड सर्विस (SIRF Ride - Rapido jaisi)',
      en: 'Express Bike Taxi (Direct Transit Only)',
      hinglish: 'SIRF Ride Service (Rapido jaisi)'
    },
    desc: {
      hi: 'त्वरित पॉइंट-टू-पॉइंट बाइक टैक्सी। दिन में ₹10/KM, रात 9pm-6am में ₹12/KM।',
      en: 'Point-to-point swift bike taxi. Day ₹10/KM, Night 9pm-6am ₹12/KM.',
      hinglish: 'Instant bike taxi. Din ₹10/KM, Raat 9pm-6am ₹12/KM.'
    },
    icon: '🏍️',
    badge: 'BASE ₹30 + ₹10/KM (DIN) / ₹12/KM (RAAT) • 10% COMM',
    category: 'ride_travel',
    withoutBikeRatePerHour: null, // Ride only
    withoutBikeNote: {
      hi: 'यह सेवा केवल बाइक पर उपलब्ध है',
      en: 'Available with bike only',
      hinglish: 'Sirf bike par uplabdh'
    },
    withBikeRatePerHour: 30, // Base fare
    withBikeNote: {
      hi: 'Base ₹30 + ₹10/KM (Din) / ₹12/KM (Raat 9pm-6am)',
      en: 'Base ₹30 + ₹10/KM (Day) / ₹12/KM (Night 9pm-6am)',
      hinglish: 'Base ₹30 + ₹10/KM (Din) / ₹12/KM (Raat 9pm-6am)'
    },
    minBookingHours: 0,
    isRideService: true,
    rideBaseFare: 30,
    ridePerKmDayRate: 10,
    ridePerKmNightRate: 12,
    platformCommissionPercent: 10,
    importanceLevel: 'standard',
    managementEffortReason: {
      hi: 'रैपिडो मॉडल: पॉइंट-टू-पॉइंट राइड सुरक्षा, डिजिटल हेलमेट वेरिफिकेशन',
      en: 'Rapido style: Point-to-point transit tracking & digital safety compliance'
    },
    hasFourKmFreeRule: false,
    hasWaitingChargeRule: false
  }
];

export const SOVEREIGN_COMPANION_RULES = [
  {
    ruleNumber: 1,
    title: {
      hi: '4 KM फ्री राइड नियम (4 KM Free Rule)',
      en: '4 KM Free Ride Rule',
      hinglish: '4 KM Free Rule (Kaam 4, 5, 6)'
    },
    appliesTo: 'काम नं. 4 (शहर गाइड), 5 (सामान डिलीवरी), 6 (सुरक्षित यात्रा)',
    desc: {
      hi: 'काम नं. 4, 5 और 6 में पहले 4 किलोमीटर का कोई पैसा नहीं (₹0)। 4 KM के बाद ही ₹10/KM का चार्ज लगेगा। इससे छोटे व नजदीकी कार्यों में ग्राहक को सेवा बहुत किफायती पड़ती है।',
      en: 'For Tasks 4, 5, and 6, the first 4 kilometers of bike travel are completely free (₹0). The ₹10/KM charge applies only after 4 KM.',
      hinglish: 'Kaam No. 4,5,6 me pehle 4 KM ka koi paisa nahi. Uske baad hi ₹10/KM lagega. Isse chhote kaam me customer ko mehenga nahi lagega.'
    },
    formula: 'Distance Cost = Max(0, Total KM - 4 KM) × ₹10/KM',
    icon: '🎁'
  },
  {
    ruleNumber: 2,
    title: {
      hi: 'वेटिंग चार्ज नियम (Waiting Charge Rule)',
      en: 'Waiting Charge Rule',
      hinglish: 'Waiting Charge (Hospital & Bank)'
    },
    appliesTo: 'काम नं. 2 (हॉस्पिटल सहायक) एवं 3 (बैंक व सरकारी दफ्तर)',
    desc: {
      hi: 'यदि साथी को अस्पताल की ओपीडी/दवा लाइन या बैंक में 1 घंटे से ज्यादा खड़ा होना पड़ा, तो हर 30 मिनट का ₹50 अतिरिक्त वेटिंग चार्ज लगेगा। (पहला 1 घंटा सामान्य बुकिंग में शामिल रहता है)।',
      en: 'If the companion has to wait in bank/hospital lines for more than 1 hour, an extra waiting charge of ₹50 per 30 minutes applies.',
      hinglish: 'Agar Sathi ko bank/hospital me 1 ghante se zyada khada hona pada, toh har 30 min ka ₹50 extra.'
    },
    formula: 'Waiting Cost = Max(0, ceil((Waiting Mins - 60) / 30)) × ₹50',
    icon: '⏳'
  },
  {
    ruleNumber: 3,
    title: {
      hi: 'नाइट राइड एवं न्यूनतम बुकिंग संरक्षण (Night Tariff & Min Hours)',
      en: 'Night Tariff & Minimum Booking Guarantee',
      hinglish: 'Night Tariff & Min Hours Protection'
    },
    appliesTo: 'सभी 8 सेवाएं एवं बाइक राइड सर्विस',
    desc: {
      hi: 'SIRF Ride Service (काम नं. 8) में दिन (सुबह 6 से रात 9 बजे) ₹10/KM और रात (9pm - 6am) ₹12/KM दर लागू होगी। साथ ही सभी सेवाओं में न्यूनतम बुकिंग (1, 2 या 3 घंटे) अनिवार्य है ताकि साथी का समय व ईंधन सुरक्षित रहे।',
      en: 'Bike Ride Service charges ₹10/KM during the day (6 AM - 9 PM) and ₹12/KM at night (9 PM - 6 AM). Minimum booking hours (1h, 2h, 3h) protect companion earnings.',
      hinglish: 'Base ₹30 + ₹10/KM (Din) / ₹12/KM (Raat 9pm-6am). Aur sabhi services me Minimum Booking strictly guaranteed.'
    },
    formula: 'Day Ride: Base ₹30 + (KM × 10) | Night Ride: Base ₹30 + (KM × 12)',
    icon: '🌙'
  }
];

export function calculateSovereignTaskQuote(params: {
  taskId: SovereignTaskServiceId;
  vehicleMode: CompanionVehicleMode;
  hours: number;
  distanceKm?: number;
  waitingMinutes?: number;
  isNightRide?: boolean;
  workerCount?: number;
}) {
  const task = SOVEREIGN_TASK_SERVICES.find((t) => t.id === params.taskId) || SOVEREIGN_TASK_SERVICES[0];
  const workerCount = Math.max(1, params.workerCount || 1);
  const effectiveHours = Math.max(task.minBookingHours, params.hours || task.minBookingHours);

  let baseHourlyRate = 0;
  let baseHourlyTotal = 0;
  let distanceCharge = 0;
  let fourKmDiscount = 0;
  let waitingCharge = 0;

  if (task.isRideService) {
    const baseFare = task.rideBaseFare || 30;
    const km = Math.max(0, params.distanceKm || 5);
    const perKmRate = params.isNightRide ? (task.ridePerKmNightRate || 12) : (task.ridePerKmDayRate || 10);
    distanceCharge = km * perKmRate;
    baseHourlyTotal = baseFare;
    baseHourlyRate = baseFare;
  } else {
    baseHourlyRate =
      params.vehicleMode === 'with_bike'
        ? task.withBikeRatePerHour
        : (task.withoutBikeRatePerHour || 120);

    baseHourlyTotal = baseHourlyRate * effectiveHours * workerCount;

    if (params.vehicleMode === 'with_bike' && (params.distanceKm || 0) > 0) {
      const km = params.distanceKm || 0;
      if (task.hasFourKmFreeRule) {
        const chargeableKm = Math.max(0, km - 4);
        distanceCharge = chargeableKm * (task.ridePerKmDayRate || 10);
        fourKmDiscount = Math.min(km, 4) * (task.ridePerKmDayRate || 10);
      } else {
        distanceCharge = 0;
      }
    }

    if (task.hasWaitingChargeRule && (params.waitingMinutes || 0) > 60) {
      const extraMinutes = (params.waitingMinutes || 0) - 60;
      const extraSlots = Math.ceil(extraMinutes / 30);
      waitingCharge = extraSlots * (task.waitingChargePer30Min || 50);
    }
  }

  const subtotal = baseHourlyTotal + distanceCharge + waitingCharge;
  const safetyInsuranceFee = 29;
  const gstTax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + safetyInsuranceFee + gstTax;

  const commissionPercent = task.platformCommissionPercent || 15;
  const platformCommissionAmount = Math.round(subtotal * (commissionPercent / 100));
  const workerPayoutAmount = subtotal - platformCommissionAmount;

  // Generate clear user-facing formula breakdown (e.g. "2hr x ₹150 = ₹300 + 6km bike ₹60 = ₹360")
  let formulaParts: string[] = [];
  if (task.isRideService) {
    const km = Math.max(0, params.distanceKm || 5);
    const rate = params.isNightRide ? 12 : 10;
    formulaParts.push(`Base ₹${baseHourlyTotal} + ${km}km x ₹${rate} = ₹${subtotal}`);
  } else {
    formulaParts.push(`${effectiveHours}hr x ₹${baseHourlyRate} = ₹${baseHourlyTotal}`);
    if (distanceCharge > 0) {
      formulaParts.push(`+ ${params.distanceKm || 0}km bike (chargeable) ₹${distanceCharge}`);
    } else if (fourKmDiscount > 0) {
      formulaParts.push(`+ ${params.distanceKm || 0}km bike (0-4km Free = ₹0)`);
    }
    if (waitingCharge > 0) {
      formulaParts.push(`+ Waiting ₹${waitingCharge}`);
    }
    formulaParts.push(`= ₹${subtotal}`);
  }
  const billFormulaBreakdown = formulaParts.join(' ');

  return {
    task,
    effectiveHours,
    baseHourlyRate,
    baseHourlyTotal,
    distanceCharge,
    fourKmDiscount,
    waitingCharge,
    safetyInsuranceFee,
    gstTax,
    grandTotal,
    commissionPercent,
    platformCommissionAmount,
    workerPayoutAmount,
    billFormulaBreakdown
  };
}

// =======================================================
// HUMARA MEDICAL SATHI 3-LEVEL SERVICE PACKAGES & NETWORK
// =======================================================

export interface HumaraMedicalPackageConfig {
  id: 'level1' | 'level2' | 'level3';
  levelNumber: 1 | 2 | 3;
  name: string;
  tagline: string;
  badge?: string;
  minPrice: number;
  maxPrice: number;
  defaultPrice: number;
  iconName: 'luggage' | 'nurse' | 'doctor';
  features: string[];
  bestFor: string;
  ctaText: string;
  nurseIncluded: boolean;
  doctorIncluded: boolean;
  primaryCareIncluded: boolean;
  colorTheme: {
    border: string;
    bgGradient: string;
    badgeBg: string;
    ctaGradient: string;
    accent: string;
  };
}

export const HUMARA_MEDICAL_PACKAGES: HumaraMedicalPackageConfig[] = [
  {
    id: 'level1',
    levelNumber: 1,
    name: 'LEVEL 1: BASIC SATHI ESCORT',
    tagline: 'स्टेशन से अस्पताल तक सामान्य मरीज हेतु भरोसेमंद साथी',
    minPrice: 100,
    maxPrice: 250,
    defaultPrice: 150,
    iconName: 'luggage',
    features: [
      'Train / Bus Station Pickup at Platform / Gate',
      'Luggage & Baggage Carrying Help',
      'Auto / Taxi / Cab Booking Assistance',
      'Hospital Counter & Registration Desk tak le jana',
      'Doctor Token & OPD Line me khada hona aur help'
    ],
    bestFor: 'Normal patients who can walk without wheelchair assistance',
    ctaText: 'Book Basic Sathi',
    nurseIncluded: false,
    doctorIncluded: false,
    primaryCareIncluded: false,
    colorTheme: {
      border: 'border-blue-500/50 hover:border-blue-400',
      bgGradient: 'from-[#071938] via-[#040E20] to-[#020710]',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      ctaGradient: 'from-blue-600 via-blue-500 to-indigo-600 text-white',
      accent: '#3B82F6'
    }
  },
  {
    id: 'level2',
    levelNumber: 2,
    name: 'LEVEL 2: SATHI + NURSE SUPPORT',
    tagline: 'व्हीलचेयर, बीपी/शुगर मॉनिटरिंग व सर्टिफाइड नर्स केयर',
    badge: 'MOST POPULAR',
    minPrice: 500,
    maxPrice: 700,
    defaultPrice: 550,
    iconName: 'nurse',
    features: [
      'Everything in Level 1 (Station Pickup, Luggage, Taxi, Line)',
      'Wheelchair Support (प्लेटफॉर्म से वार्ड/ओपीडी तक)',
      'BP / Sugar / Pulse Check On The Way in transit',
      'First-Aid, Injections & On-Time Medicine Help',
      'Elderly & Female Patient Special Dedicated Care'
    ],
    bestFor: 'Bujurg (Senior Citizens), Wheelchair & semi-bedridden patients',
    ctaText: 'Book Sathi + Nurse',
    nurseIncluded: true,
    doctorIncluded: false,
    primaryCareIncluded: true,
    colorTheme: {
      border: 'border-[#FFD700] hover:border-amber-300 shadow-[0_0_25px_rgba(255,215,0,0.25)]',
      bgGradient: 'from-[#0E1B38] via-[#081229] to-[#030814]',
      badgeBg: 'bg-[#FFD700] text-slate-950 font-black border-[#FFD700]',
      ctaGradient: 'from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black',
      accent: '#FFD700'
    }
  },
  {
    id: 'level3',
    levelNumber: 3,
    name: 'LEVEL 3: SATHI + NURSE + PRIVATE DOCTOR SUPERVISION',
    tagline: 'एमबीबीएस/एमडी डॉक्टर की लाइव निगरानी में गंभीर व बाहरी मरीज एस्कॉर्ट',
    badge: 'PREMIUM MEDICAL TEAM',
    minPrice: 1200,
    maxPrice: 1800,
    defaultPrice: 1400,
    iconName: 'doctor',
    features: [
      'Everything in Level 1 & 2 (Sathi + GNM Nurse Support)',
      'Private Doctor Supervision (MBBS/MD Specialist On Transit)',
      'Primary Health Care Checkup On The Way (ECG/O2/Vitals)',
      'Initial Clinical Consultation in Transit (Pre-OPD Prep)',
      'Emergency Handling & Critical Transit Protocol',
      'Medical Reports Review & Full Task Fulfill Guaranteed'
    ],
    bestFor: 'Serious patients & outstation patients arriving at Bhopal, Nagpur AIIMS, Rewa, Jabalpur',
    ctaText: 'Book Premium Medical Team',
    nurseIncluded: true,
    doctorIncluded: true,
    primaryCareIncluded: true,
    colorTheme: {
      border: 'border-emerald-500 hover:border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      bgGradient: 'from-[#05241D] via-[#031713] to-[#010B09]',
      badgeBg: 'bg-emerald-500 text-slate-950 font-black border-emerald-400',
      ctaGradient: 'from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black',
      accent: '#10B981'
    }
  }
];

export const POPULAR_PICKUP_STATIONS = [
  'Bhopal Junction Railway Station (Platform 1 / 6)',
  'Rani Kamlapati Railway Station (RKMP Platform 1 / 5)',
  'Nagpur Junction Railway Station (PF 1 / Main Gate)',
  'Rewa Railway Station (Main Concourse)',
  'Jabalpur Junction Railway Station',
  'Indore Junction Railway Station',
  'Hazrat Nizamuddin / New Delhi Station',
  'Home Address (Doorstep Pickup)'
];

export const POPULAR_DESTINATION_HOSPITALS = [
  'AIIMS Bhopal (Saket Nagar, OPD Gate 1)',
  'Hamidia Hospital & Gandhi Medical College (Royal Market)',
  'Bansal Hospital (Shahpura, Bhopal)',
  'BMHRC (Bhopal Memorial Hospital, Karond)',
  'Chirayu Health & Medicare (Bairagarh Bhopal)',
  'Narmada Trauma Centre (E-3 Arera Colony)',
  'AIIMS Nagpur (MIHAN Campus, Nagpur)',
  'Sanjay Gandhi Memorial Hospital & Rewa Medical College',
  'Netaji Subhash Chandra Bose Medical College, Jabalpur'
];

export const NETWORK_SATHI_STAFF = [
  {
    id: 'stf-sathi-01',
    name: 'Rohit Verma',
    phone: '+91 98260 14820',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'SATHI-BPL-8812',
    role: 'companion' as const,
    qualification: 'Senior Patient Escort & Luggage Specialist',
    rating: 4.9,
    experienceYears: 4
  },
  {
    id: 'stf-sathi-02',
    name: 'Pooja Vishwakarma',
    phone: '+91 98261 44520',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'SATHI-BPL-9901',
    role: 'companion' as const,
    qualification: 'Certified GDA (General Duty Assistant) & Attendant',
    rating: 5.0,
    experienceYears: 3
  },
  {
    id: 'stf-sathi-03',
    name: 'Deepak Ahirwar',
    phone: '+91 97701 54321',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'SATHI-BPL-7734',
    role: 'companion' as const,
    qualification: 'Wheelchair Mobility & Station Runner',
    rating: 4.8,
    experienceYears: 5
  }
];

export const NETWORK_NURSE_STAFF = [
  {
    id: 'stf-nurse-01',
    name: 'Sister Sunita Minz',
    phone: '+91 94250 88214',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'NURSE-MPNC-8491',
    role: 'nurse' as const,
    qualification: 'B.Sc Nursing (Registered with MP Nursing Council)',
    specialty: 'ICU Vitals, Wheelchair Escort & Emergency Medication',
    registrationNumber: 'MPNC-2018-8491',
    rating: 4.95,
    experienceYears: 7
  },
  {
    id: 'stf-nurse-02',
    name: 'Sister Anjali Tiwari',
    phone: '+91 98930 41209',
    photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'NURSE-MPNC-5512',
    role: 'nurse' as const,
    qualification: 'GNM & Critical Transit Care Certified',
    specialty: 'Elderly Gentle Bedside & Diabetic Sugar/BP Monitoring',
    registrationNumber: 'MPNC-2020-5512',
    rating: 4.9,
    experienceYears: 5
  }
];

export const NETWORK_DOCTOR_STAFF = [
  {
    id: 'stf-doc-01',
    name: 'Dr. Rajesh Sharma, MD',
    phone: '+91 98263 77410',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'DOC-MCI-14209',
    role: 'doctor' as const,
    qualification: 'MD (Internal Medicine) • Ex-Senior Resident AIIMS',
    specialty: 'Clinical Diagnosis, Emergency In-Transit Care & Vitals Stabilization',
    registrationNumber: 'MPMC-14209',
    rating: 5.0,
    experienceYears: 12
  },
  {
    id: 'stf-doc-02',
    name: 'Dr. Neha Patel, MBBS, DNB',
    phone: '+91 94251 22987',
    photoUrl: 'https://images.unsplash.com/photo-1594824813583-22830f0f9b69?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'DOC-MCI-18754',
    role: 'doctor' as const,
    qualification: 'MBBS, DNB (Emergency & Critical Medicine)',
    specialty: 'Trauma Escort, Cardiac Primary Checkup & Specialist Referral',
    registrationNumber: 'MPMC-18754',
    rating: 4.9,
    experienceYears: 9
  }
];

