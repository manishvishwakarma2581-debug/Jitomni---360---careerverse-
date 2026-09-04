import { CompanionServiceCategory, CompanionWorker } from '../types';

export const companionCategories: CompanionServiceCategory[] = [
  {
    id: 'hospital_care',
    title: {
      hi: '🏥 अस्पताल देखभाल एवं साथी सेवा',
      en: '🏥 Hospital Care & Companionship',
      hinglish: '🏥 Hospital Care & Attendant Service'
    },
    tagline: {
      hi: 'ओपीडी, वार्ड, रात्रि ड्यूटी व दवाओं की कतार के लिए 100% पुलिस-वेरिफाइड संवेदनशील साथी।',
      en: '100% police-verified compassionate companions for OPD, patient bedside care & night shifts.',
      hinglish: 'OPD, Patient Care, Night Hospital Stay ke liye verified attendant companion.'
    },
    icon: '🏥',
    visualAnchorBadge: 'HOSPITAL & MEDICAL CARE',
    themeColor: {
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      border: 'border-rose-500/50 hover:border-rose-400',
      bgGlow: 'from-rose-950/40 via-[#18080E] to-[#0D0407]',
      gradient: 'from-rose-600 to-red-700',
      accent: '#F43F5E'
    },
    baseHourlyRate: 199,
    subServices: [
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
      },
      {
        id: 'hosp_opd_escort',
        name: {
          hi: 'ओपीडी व डॉक्टर कतार सहायक',
          en: 'OPD Doctor Appointment & Queue Escort',
          hinglish: 'OPD & Doctor Line Queue Escort'
        },
        desc: {
          hi: 'पर्ची कटवाना, लंबी कतारों में खड़ा होना व डॉक्टर कक्ष तक ले जाना।',
          en: 'Token generation, queue management & accompanying inside chamber.',
          hinglish: 'Registration slip, long queue standing aur doctor room escort.'
        },
        icon: '🩺',
        recommendedHours: 4
      },
      {
        id: 'hosp_reports_pharmacy',
        name: {
          hi: 'दवा व जांच रिपोर्ट संकलन धावक',
          en: 'Pharmacy & Diagnostic Reports Runner',
          hinglish: 'Medicine & Test Reports Runner'
        },
        desc: {
          hi: 'अस्पताल परिसर में ब्लड टेस्ट रिपोर्ट, एक्स-रे व दवाइयों का त्वरित संकलन।',
          en: 'Swift dispatch to collect pathology reports, radiology & prescriptions.',
          hinglish: 'Pharmacy se medicine lana aur test reports collect karna.'
        },
        icon: '💊',
        recommendedHours: 2
      },
      {
        id: 'hosp_female_companion',
        name: {
          hi: 'महिला मरीज हेतु विशेष महिला साथी',
          en: 'Specialized Female Companion for Female Patient',
          hinglish: 'Female Patient Companion (Dedicated Woman Attendant)'
        },
        desc: {
          hi: 'सम्मानजनक, सुरक्षित व संवेदनशील महिला परिचारिका (GDA/Nursing trained)।',
          en: 'Dignified, 100% verified female companion trained in basic nursing/GDA.',
          hinglish: 'Dignified & safe female companion for overnight or day hospital stay.'
        },
        icon: '👩‍⚕️',
        recommendedHours: 6
      }
    ],
    quickRequirements: [
      'Need a female companion for hospital stay (रात की ड्यूटी)',
      'Need male attendant for wheelchair push & ward transfer',
      'Doctor appointment line standing & OPD token escort (3-4 hrs)',
      'Emergency medicine pickup from outside pharmacy',
      'Bilingual attendant (Hindi + English) to communicate with specialist'
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
    visualAnchorBadge: 'WEDDINGS, BANQUETS & EVENTS',
    themeColor: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      border: 'border-amber-500/50 hover:border-amber-400',
      bgGlow: 'from-amber-950/40 via-[#1C1205] to-[#0A0702]',
      gradient: 'from-amber-500 to-orange-600',
      accent: '#F59E0B'
    },
    baseHourlyRate: 179,
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
    visualAnchorBadge: 'ELDERLY CARE & ASSISTANCE',
    themeColor: {
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      border: 'border-cyan-500/50 hover:border-cyan-400',
      bgGlow: 'from-cyan-950/40 via-[#061524] to-[#02070D]',
      gradient: 'from-cyan-500 to-blue-600',
      accent: '#06B6D4'
    },
    baseHourlyRate: 149,
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
    visualAnchorBadge: 'ERRANDS & RAPID TASKS',
    themeColor: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      border: 'border-emerald-500/50 hover:border-emerald-400',
      bgGlow: 'from-emerald-950/40 via-[#061F13] to-[#020A06]',
      gradient: 'from-emerald-500 to-teal-600',
      accent: '#10B981'
    },
    baseHourlyRate: 129,
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

// Initial platform commission records
export const initialPlatformCommissionRecords = [
  {
    id: 'COMM-TX-901',
    taskId: 'JIT-CMP-84910',
    taskTitle: 'Hospital Overnight Duty',
    customerName: 'Anil Sharma',
    workerId: 'cmp-01',
    workerName: 'Pooja Vishwakarma',
    hours: 8,
    hourlyRate: 199,
    grossFee: 1592,
    workerShare80: 1274,
    platformShare20: 318,
    status: 'settled' as const,
    timestamp: '2026-09-03T18:30:00Z'
  },
  {
    id: 'COMM-TX-902',
    taskId: 'JIT-CMP-84882',
    taskTitle: 'Wedding Baraat & Stage Flow',
    customerName: 'Sunil Jain',
    workerId: 'cmp-02',
    workerName: 'Rohit Verma',
    hours: 5,
    hourlyRate: 189,
    grossFee: 945,
    workerShare80: 756,
    platformShare20: 189,
    status: 'settled' as const,
    timestamp: '2026-09-02T22:15:00Z'
  },
  {
    id: 'COMM-TX-903',
    taskId: 'JIT-CMP-84729',
    taskTitle: 'Senior Citizen Pension Escort',
    customerName: 'Gita Devi',
    workerId: 'cmp-04',
    workerName: 'Suresh Patidar',
    hours: 4,
    hourlyRate: 159,
    grossFee: 636,
    workerShare80: 509,
    platformShare20: 127,
    status: 'settled' as const,
    timestamp: '2026-09-01T14:10:00Z'
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

