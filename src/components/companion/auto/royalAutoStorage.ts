import { 
  AutoDriver, 
  AutoRide, 
  AutoSOSTicket, 
  CityCodeInfo,
  DemandPartner,
  BridgeOrder,
  RoyalServiceItem,
  BridgeCommissionSplit
} from './royalAutoTypes';

export const POPULAR_INDIAN_CITIES: CityCodeInfo[] = [
  {
    code: 'RWA',
    name: 'Rewa',
    state: 'Madhya Pradesh',
    defaultLat: 24.5362,
    defaultLng: 81.3037,
    keyLandmarks: [
      'Rewa Railway Station',
      'Rewa New Bus Stand',
      'Civil Lines Rewa',
      'Sanjay Gandhi Memorial Hospital & Medical College',
      'Rewa Fort & Venkat Bhawan',
      'Pili Kothi & Shilpi Plaza',
      'Chorhatta Industrial Area',
      'APS University Campus',
    ],
  },
  {
    code: 'JBP',
    name: 'Jabalpur',
    state: 'Madhya Pradesh',
    defaultLat: 23.1815,
    defaultLng: 79.9864,
    keyLandmarks: [
      'Jabalpur Main Railway Station',
      'Madan Mahal Station',
      'Bhedaghat Dhuandhar Falls',
      'Ghamapur Chowk',
      'Russel Chowk & Wright Town',
      'Netaji Subhash Chandra Bose Medical College',
    ],
  },
  {
    code: 'BPL',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    defaultLat: 23.2599,
    defaultLng: 77.4126,
    keyLandmarks: [
      'Rani Kamlapati Station (RKMP)',
      'Bhopal Junction',
      'MP Nagar Zone 1 & 2',
      'AIIMS Bhopal',
      'New Market / TT Nagar',
      'Upper Lake Boat Club',
    ],
  },
  {
    code: 'IND',
    name: 'Indore',
    state: 'Madhya Pradesh',
    defaultLat: 22.7196,
    defaultLng: 75.8577,
    keyLandmarks: [
      'Indore Junction Railway Station',
      'Rajwada Palace & Sarafa',
      'Vijay Nagar / C21 Mall',
      'Bhawarkua Square',
      'Chappan Dukan',
      'Devi Ahilya Bai Holkar Airport',
    ],
  },
  {
    code: 'SAT',
    name: 'Satna',
    state: 'Madhya Pradesh',
    defaultLat: 24.5828,
    defaultLng: 80.8292,
    keyLandmarks: [
      'Satna Railway Station',
      'Bharhut Nagar',
      'Dhawa Mandi & Bus Stand',
      'Maihar Bypass',
      'Pannilal Chowk',
    ],
  },
  {
    code: 'DEL',
    name: 'Delhi NCR',
    state: 'Delhi',
    defaultLat: 28.6139,
    defaultLng: 77.209,
    keyLandmarks: [
      'New Delhi Railway Station (NDLS)',
      'Old Delhi Station',
      'Connaught Place',
      'AIIMS New Delhi',
      'ISBT Kashmere Gate',
    ],
  },
  {
    code: 'LKO',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    defaultLat: 26.8467,
    defaultLng: 80.9462,
    keyLandmarks: [
      'Charbagh Railway Station',
      'Hazratganj',
      'Gomti Nagar',
      'KGMU Hospital',
      'Chowk Lucknow',
    ],
  },
  {
    code: 'VAR',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    defaultLat: 25.3176,
    defaultLng: 82.9739,
    keyLandmarks: [
      'Varanasi Cantt Station',
      'Kashi Vishwanath Temple Corridor',
      'Assi Ghat',
      'BHU Trauma Center',
      'Godowlia Chowk',
    ],
  },
  {
    code: 'PRY',
    name: 'Prayagraj',
    state: 'Uttar Pradesh',
    defaultLat: 25.4358,
    defaultLng: 81.8463,
    keyLandmarks: [
      'Prayagraj Junction',
      'Civil Lines High Court',
      'Sangam Ghat',
      'Swaroop Rani Nehru Hospital',
      'Allahabad University',
    ],
  },
];

// Helper to deduce a 3-letter city code for ANY city in India
export function getCityCode(cityName: string): string {
  const clean = cityName.trim().toUpperCase();
  const found = POPULAR_INDIAN_CITIES.find(
    (c) => c.name.toUpperCase() === clean || clean.includes(c.name.toUpperCase())
  );
  if (found) return found.code;

  // Otherwise generate 3 consonants or letters
  const lettersOnly = clean.replace(/[^A-Z]/g, '');
  if (lettersOnly.length >= 3) {
    return lettersOnly.slice(0, 3);
  }
  return (lettersOnly + 'IND').slice(0, 3);
}

// Initial Verified Driver Seed Data
const INITIAL_DRIVERS: AutoDriver[] = [
  {
    royalId: 'JS-RWA-0001',
    cityCode: 'RWA',
    cityName: 'Rewa',
    name: 'रमेश विश्वकर्मा (Ramesh Vishwakarma)',
    phone: '+91 93996 08239',
    autoNumber: 'MP 17 RA 4592',
    aadharNumber: '8921-4432-1092',
    licenseNumber: 'MP17 20180045892',
    address: 'वार्ड 12, सिविल लाइन्स, रीवा (म.प्र.)',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.9,
    totalRides: 482,
    currentLocation: {
      lat: 24.5362,
      lng: 81.3037,
      landmark: 'Rewa Railway Station Auto Stand',
    },
    joiningDate: '2026-01-15',
    tShirtSize: 'L',
    languages: ['Hindi', 'Bagheli', 'English (Basic)'],
    isOnline: true,
    todayEarnings: 840,
    todayRidesCount: 7,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
  {
    royalId: 'JS-RWA-0002',
    cityCode: 'RWA',
    cityName: 'Rewa',
    name: 'सोनू साकेत (Sonu Saket)',
    phone: '+91 98261 44521',
    autoNumber: 'MP 17 RB 2289',
    aadharNumber: '6743-9821-3412',
    licenseNumber: 'MP17 20200098321',
    address: 'बोदाबाग रोड, रीवा',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.8,
    totalRides: 312,
    currentLocation: {
      lat: 24.542,
      lng: 81.311,
      landmark: 'Sanjay Gandhi Hospital Gate 1',
    },
    joiningDate: '2026-02-10',
    tShirtSize: 'XL',
    languages: ['Hindi', 'Bagheli'],
    isOnline: true,
    todayEarnings: 610,
    todayRidesCount: 5,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
  {
    royalId: 'JS-RWA-0003',
    cityCode: 'RWA',
    cityName: 'Rewa',
    name: 'राजेश पटेल (Rajesh Patel)',
    phone: '+91 94250 88712',
    autoNumber: 'MP 17 RA 9910',
    aadharNumber: '5512-8712-4409',
    licenseNumber: 'MP17 20190012480',
    address: 'शिल्पी प्लाजा, बाजार, रीवा',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.75,
    totalRides: 290,
    currentLocation: {
      lat: 24.531,
      lng: 81.298,
      landmark: 'New Bus Stand Rewa',
    },
    joiningDate: '2026-03-01',
    tShirtSize: 'M',
    languages: ['Hindi', 'Bagheli'],
    isOnline: true,
    todayEarnings: 730,
    todayRidesCount: 6,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
  {
    royalId: 'JS-JBP-0015',
    cityCode: 'JBP',
    cityName: 'Jabalpur',
    name: 'दिनेश कुमार दुबे (Dinesh Dubey)',
    phone: '+91 97551 22390',
    autoNumber: 'MP 20 TA 8841',
    aadharNumber: '4489-0129-8732',
    licenseNumber: 'MP20 20170067123',
    address: 'राइट टाउन, जबलपुर',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.88,
    totalRides: 540,
    currentLocation: {
      lat: 23.1815,
      lng: 79.9864,
      landmark: 'Jabalpur Main Station Platform 1',
    },
    joiningDate: '2026-01-20',
    tShirtSize: 'L',
    languages: ['Hindi', 'English'],
    isOnline: true,
    todayEarnings: 920,
    todayRidesCount: 8,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
  {
    royalId: 'JS-BPL-0034',
    cityCode: 'BPL',
    cityName: 'Bhopal',
    name: 'अकील खान (Aqeel Khan)',
    phone: '+91 91114 55902',
    autoNumber: 'MP 04 RA 3390',
    aadharNumber: '9012-3489-1120',
    licenseNumber: 'MP04 20210088912',
    address: 'एमपी नगर जोन 2, भोपाल',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.95,
    totalRides: 620,
    currentLocation: {
      lat: 23.232,
      lng: 77.433,
      landmark: 'Rani Kamlapati Station Exit Gate',
    },
    joiningDate: '2026-01-05',
    tShirtSize: 'XL',
    languages: ['Hindi', 'Urdu', 'English'],
    isOnline: true,
    todayEarnings: 1150,
    todayRidesCount: 10,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
  {
    royalId: 'JS-IND-0089',
    cityCode: 'IND',
    cityName: 'Indore',
    name: 'शुभम जाट (Shubham Jat)',
    phone: '+91 99812 77034',
    autoNumber: 'MP 09 EA 7721',
    aadharNumber: '3201-9988-7712',
    licenseNumber: 'MP09 20220033190',
    address: 'भंवरकुआं मेन रोड, इंदौर',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces',
    autoPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isAadharVerified: true,
    isLicenseVerified: true,
    isPoliceVerified: true,
    status: 'active',
    rating: 4.82,
    totalRides: 410,
    currentLocation: {
      lat: 22.7196,
      lng: 75.8577,
      landmark: 'Rajwada Square Indore',
    },
    joiningDate: '2026-02-14',
    tShirtSize: 'L',
    languages: ['Hindi', 'Malwi', 'English'],
    isOnline: true,
    todayEarnings: 980,
    todayRidesCount: 9,
    sosStatus: 'safe',
    joiningFeePaid: true,
    subscriptionPaid: true,
  },
];

// Initial Demo Rides
const INITIAL_RIDES: AutoRide[] = [
  {
    rideId: 'RIDE-RWA-1092',
    rideType: 'instant',
    customerId: 'CUST-8812',
    customerName: 'अमित मिश्रा (Amit Mishra)',
    customerPhone: '+91 94251 09281',
    driverRoyalId: 'JS-RWA-0001',
    driverName: 'रमेश विश्वकर्मा',
    driverPhone: '+91 93996 08239',
    driverAutoNumber: 'MP 17 RA 4592',
    driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    pickup: {
      address: 'Rewa Railway Station, Platform 1 Exit',
      lat: 24.5362,
      lng: 81.3037,
    },
    drop: {
      address: 'Sanjay Gandhi Memorial Hospital OPD',
      lat: 24.542,
      lng: 81.311,
    },
    fare: 75,
    distanceKm: 3.8,
    estimatedMins: 11,
    status: 'completed',
    startOtp: '5824',
    sosTriggered: false,
    timestamp: '2026-09-23 09:15 AM',
    paymentMode: 'upi',
    paymentStatus: 'paid',
    commissionAmount: 10,
    ratingGiven: 5,
    feedback: 'Very safe driving, verified driver uniform with Royal ID.',
  },
  {
    rideId: 'RIDE-RWA-1093',
    rideType: 'rental',
    customerId: 'CUST-3490',
    customerName: 'सुनीता सिंह (Sunita Singh)',
    customerPhone: '+91 98260 12093',
    driverRoyalId: 'JS-RWA-0002',
    driverName: 'सोनू साकेत',
    driverPhone: '+91 98261 44521',
    driverAutoNumber: 'MP 17 RB 2289',
    driverPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    pickup: {
      address: 'Civil Lines, Rewa',
      lat: 24.538,
      lng: 81.305,
    },
    drop: {
      address: 'Maihar Devi Darshan & Local Shopping (Rental 4 Hrs)',
      lat: 24.265,
      lng: 80.755,
    },
    rentalPackageHours: 4,
    fare: 650,
    distanceKm: 28.0,
    estimatedMins: 240,
    status: 'completed',
    startOtp: '9142',
    sosTriggered: false,
    timestamp: '2026-09-23 11:30 AM',
    paymentMode: 'cash',
    paymentStatus: 'paid',
    commissionAmount: 10,
    ratingGiven: 5,
    feedback: 'Family friendly driver. Kept auto clean and safe.',
  },
];

// Initial SOS Tickets
const INITIAL_SOS_TICKETS: AutoSOSTicket[] = [
  {
    ticketId: 'SOS-9901',
    rideId: 'RIDE-RWA-1088',
    driverRoyalId: 'JS-RWA-0001',
    driverName: 'रमेश विश्वकर्मा',
    customerName: 'प्रिया शर्मा',
    customerPhone: '+91 98265 99012',
    triggeredBy: 'customer',
    reason: 'Test safety check drill at Rewa Bypass road',
    location: {
      lat: 24.529,
      lng: 81.295,
      address: 'Chorhatta Bypass, Rewa',
    },
    audioRecordingSimulated: true,
    timestamp: '2026-09-22 08:45 PM',
    status: 'resolved',
    nearestPoliceStation: 'Chorhatta Thana (2.1 km)',
    notes: 'Safe drill resolved in 3 mins. Driver and passenger verified OK.',
  },
];

// ==========================================================
// 9 ROYAL SOVEREIGN SERVICES SPECIFICATION & DEMAND REGISTRY
// ==========================================================
export const NINE_ROYAL_SERVICES: RoyalServiceItem[] = [
  {
    id: 'hospital_sahayak',
    serviceNumber: 1,
    name: 'Humara Medical Sathi & Patient Escort',
    hindiName: 'अस्पताल सहायक व पेशेंट एस्कॉर्ट',
    icon: '🏥',
    badge: 'LIFE SUPPORT • 3-LEVEL ESCORT',
    tagline: 'अस्पताल पर्ची, OPD लाइन, व्हीलचेयर, दवा व वार्ड में अपना पारिवारिक सदस्य जैसा साथ',
    description: 'संजय गांधी या किसी भी मेडिकल कॉलेज/हॉस्पिटल में मरीजों व अकेले बुजुर्गों के साथ खड़े रहकर हर प्रक्रिया आसान कराना।',
    baseHourlyRate: 199,
    minHours: 2,
    recommendedHours: 4,
    popularUse: ['OPD लाइन में खड़ा होना', 'दवा पर्ची व बिलिंग काउंटर', 'व्हीलचेयर सहायता', 'जांच रिपोर्ट कलेक्शन'],
    bgGradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
  },
  {
    id: 'buzurg_sathi',
    serviceNumber: 2,
    name: 'Buzurg Care & Senior Citizen Sathi',
    hindiName: 'बुजुर्ग साथी व दैनिक केयर',
    icon: '🧓',
    badge: '100% POLICE VERIFIED • CARING SATHI',
    tagline: 'अकेले रहने वाले माता-पिता व बुजुर्गों के साथ बातचीत, मॉर्निंग वॉक, पार्क व भावनात्मक सहारा',
    description: 'शारीरिक रूप से असमर्थ या अकेलेपन से जूझ रहे वरिष्ठ नागरिकों के लिए विनम्र, शिक्षित और पुलिस-वेरिफाइड साथी।',
    baseHourlyRate: 149,
    minHours: 2,
    recommendedHours: 3,
    popularUse: ['पार्क में टहलना', 'अखबार/किताब पढ़कर सुनाना', 'समय पर दवा याद दिलाना', 'हल्की खरीदारी में साथ'],
    bgGradient: 'from-amber-600/20 via-yellow-600/10 to-transparent',
  },
  {
    id: 'bank_sarkari',
    serviceNumber: 3,
    name: 'Bank & Sarkari Office Sahayak',
    hindiName: 'बैंक व सरकारी कार्यालय सहायक',
    icon: '🏛️',
    badge: 'ZERO RUNAROUND • FAST PROCESSING',
    tagline: 'तहसील, कलेक्ट्रेट, नगर निगम, बैंक में फॉर्म भरना, लाइन लगाना व फाइल ट्रैकिंग',
    description: 'सरकारी दफ्तरों व बैंकों में बिना बिचौलियों के नियमों के अनुसार काम करवाने वाला जानकार व भरोसेमंद सहायक।',
    baseHourlyRate: 149,
    minHours: 1,
    recommendedHours: 2,
    popularUse: ['केवाईसी व बैंक फॉर्म भरना', 'पेंशन जीवित प्रमाण पत्र लाइन', 'तहसील नकल व रजिस्ट्री कतार', 'बिजली/पानी बिल काउंटर'],
    bgGradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
  },
  {
    id: 'sheher_guide',
    serviceNumber: 4,
    name: 'Sheher Guide & Student Relocation',
    hindiName: 'शहर गाइड व हॉस्टल/रूम नेविगेटर',
    icon: '🧭',
    badge: 'NEWCOMER SAFEGUARD • ZERO BROKERAGE',
    tagline: 'नए छात्र, प्रतियोगी परीक्षा अभ्यर्थी व परिवारों को स्टेशन पर रिसीव करना व सही लॉज/हॉस्टल दिलाना',
    description: 'रीवा, भोपाल या किसी भी नए शहर में आने वाले छात्रों व परिवारों को स्टेशन से सुरक्षित रिसीव कर सुरक्षित ठिकाने तक पहुंचाना।',
    baseHourlyRate: 129,
    minHours: 2,
    recommendedHours: 3,
    popularUse: ['रेलवे स्टेशन/बस स्टैंड पर पिकअप', 'सस्ते व सुरक्षित पीजी/हॉस्टल ढूंढना', 'कोचिंग एरिया नेविगेशन', 'लोकल सिम व राशन गाइड'],
    bgGradient: 'from-cyan-600/20 via-sky-600/10 to-transparent',
  },
  {
    id: 'local_delivery',
    serviceNumber: 5,
    name: 'Local Saman & Urgent Parcel Runner',
    hindiName: 'लोकल पार्सल व जरूरी सामान रनर',
    icon: '📦',
    badge: 'EXPRESS DISPATCH • 30 MIN RUNNER',
    tagline: 'दुकान से दवा, घर से भूली हुई चाबी/दस्तावेज या पार्सल तुरंत लेकर सुरक्षित डिलीवर करना',
    description: 'शहर के किसी भी कोने से 15-30 मिनट में जरूरी सामान, फाइलें या दवाएं लेकर गंतव्य तक पहुंचाने वाला ऑन-डिमांड रनर।',
    baseHourlyRate: 99,
    minHours: 1,
    recommendedHours: 1,
    popularUse: ['मेडिकल स्टोर से दवा मंगवाना', 'ऑफिस में घर की फाइल/चाबी पहुंचाना', 'बाजार से जरूरी किराना/सामान', 'दुकान से स्टेशन पार्सल ड्रॉप'],
    bgGradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
  },
  {
    id: 'surakshit_yatra',
    serviceNumber: 6,
    name: 'Surakshit Yatra & Solo Safe Escort',
    hindiName: 'सुरक्षित यात्रा व महिला/सोलो एस्कॉर्ट',
    icon: '🛡️',
    badge: 'AI LIVE GPS • DIAL 112 DIRECT LINK',
    tagline: 'अकेली महिलाओं, छात्राओं व रात्रि यात्रियों के साथ ट्रेन/बस स्टैंड से घर तक सशस्त्र/सत्यापित सुरक्षा साथ',
    description: 'देर रात या सुनसान रास्तों पर सुरक्षित आवागमन के लिए जीपीएस-ट्रैक्ड, पारिवारिक पृष्ठभूमि वाला वेरिफाइड गार्ड-कम-साथी।',
    baseHourlyRate: 179,
    minHours: 2,
    recommendedHours: 2,
    popularUse: ['देर रात 11 PM-5 AM स्टेशन पिकअप', 'महिला यात्री एस्कॉर्ट', 'अस्पताल से डिस्चार्ज घर वापसी', 'परीक्षा केंद्र तक सुरक्षित आवागमन'],
    bgGradient: 'from-rose-600/20 via-pink-600/10 to-transparent',
  },
  {
    id: 'event_parivarik',
    serviceNumber: 7,
    name: 'Event, Wedding & Family Manager',
    hindiName: 'इवेंट, शादी व पारिवारिक फंक्शन सहायक',
    icon: '🎉',
    badge: 'ALL-ROUNDER • RELIABLE HELPER',
    tagline: 'शादी-ब्याह, कथा, गृह-प्रवेश या बर्थडे में मेहमानों को रिसीव करना, सामान संभालना व व्यवस्था देखना',
    description: 'पारिवारिक आयोजनों में आपका दायां हाथ बनकर रिश्तेदारों के आदर-सत्कार और जरूरी सामान की दौड़-धूप संभालने वाला सहायक।',
    baseHourlyRate: 149,
    minHours: 3,
    recommendedHours: 5,
    popularUse: ['शादी में स्टेशन से मेहमान रिसीव करना', 'गिफ्ट व स्टेज व्यवस्था', 'बुजुर्ग रिश्तेदारों की देखरेख', 'केटरिंग व पूजा सामग्री सप्लाई'],
    bgGradient: 'from-purple-600/20 via-violet-600/10 to-transparent',
  },
  {
    id: 'royal_auto_ride',
    serviceNumber: 8,
    name: 'Royal Auto Executive Fast Ride',
    hindiName: 'रॉयल ऑटो 0% सर्ज इंस्टेंट राइड',
    icon: '🛺',
    badge: '0% SURGE • UNIQUE ROYAL ID',
    tagline: 'मीटर से सस्ता (Base ₹30 + ₹12/km), वर्दीधारी ड्राइवर, नो-कैंसिलेशन गारंटी व डिजिटल आईडी',
    description: 'ओला/रैपिडो मॉडल पर आधारित लेकिन 0% कमीशन स्टैंड एक्सप्लॉइटेशन के साथ, पूरी तरह स्थानीय ऑटो चालकों का डिजिटल नेटवर्क।',
    baseHourlyRate: 150,
    minHours: 1,
    recommendedHours: 1,
    popularUse: ['प्वाइंट-टू-प्वाइंट शहर यात्रा', '2 घंटे / 15 किमी रेंटल पैकेज', '4 घंटे / 30 किमी दर्शन पैकेज', 'फुल डे 8 घंटे शॉपिंग टूर'],
    bgGradient: 'from-[#D4AF37]/25 via-amber-500/10 to-transparent',
  },
  {
    id: 'food_bridge_meal',
    serviceNumber: 9,
    name: 'Bridge Quick Meal & Food Logistics',
    hindiName: 'ब्रिज मील व टाई-अप रेस्टोरेंट सेवा',
    icon: '🍲',
    badge: 'BRIDGE PLATFORM • 80/20 SOVEREIGN FEE',
    tagline: 'हम खाना नहीं बनाते — हम आपके आर्डर को शहर के बेहतरीन टाई-अप भोजनालयों से 80/20 मॉडल पर डिलीवर करवाते हैं',
    description: 'स्थानीय रेस्टोरेंट और ढाबों को सीधे ग्राहक मांग से जोड़ना। 80% भुगतान रेस्टोरेंट/डिलीवरी को, केवल 20% प्लेटफॉर्म ब्रिज शुल्क।',
    baseHourlyRate: 120,
    minHours: 1,
    recommendedHours: 1,
    popularUse: ['शुद्ध शाकाहारी थाली आर्डर', 'हॉस्टल स्टूडेंट मंथली टिफिन', 'मरीजों के लिए हल्का दलिया/सूप', 'पारिवारिक डिनर पार्सल'],
    bgGradient: 'from-red-600/20 via-rose-600/10 to-transparent',
  },
];

// ==========================================================
// TIE-UP DEMAND PARTNERS (RESTAURANTS, AUTO UNIONS, VENDORS)
// ==========================================================
export const INITIAL_DEMAND_PARTNERS: DemandPartner[] = [
  {
    id: 'PRT-RWA-REST-01',
    partnerRoyalId: 'JS-RWA-P001',
    name: 'श्री कृष्णा शुद्ध शाकाहारी भोजनालय (Shree Krishna Restaurant)',
    type: 'restaurant',
    cityName: 'Rewa',
    cityCode: 'RWA',
    distanceKm: 1.6,
    phone: '+91 94251 33201',
    rating: 4.88,
    address: 'शिल्पी प्लाजा ब्लॉक बी, सिरमौर चौराहा, रीवा',
    photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    isVerified: true,
    activeOrdersCount: 2,
    totalEarned80: 18400,
    totalOrdersCompleted: 142,
    isOpen: true,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-PARTNER-JS-RWA-P001',
    menuItems: [
      {
        id: 'SK-01',
        name: 'Royal Shahi Deluxe Thali',
        hindiName: 'रॉयल शाही डीलक्स थाली',
        price: 150,
        isVeg: true,
        category: 'Thali',
        prepTimeMins: 15,
        description: 'शाही पनीर, दाल मखनी, मिक्स वेज, 4 तवा घी रोटी, जीरा राइस, रायता, सलाद व 1 गुलाब जामुन',
        photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop',
      },
      {
        id: 'SK-02',
        name: 'Paneer Butter Masala (Full)',
        hindiName: 'पनीर बटर मसाला (फुल)',
        price: 180,
        isVeg: true,
        category: 'Main Course',
        prepTimeMins: 18,
        description: 'मलाईदार टमाटर ग्रेवी में ताजा कॉटेज पनीर',
        photoUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop',
      },
      {
        id: 'SK-03',
        name: 'Dal Fry & Jeera Rice Combo',
        hindiName: 'दाल फ्राई व जीरा राइस कॉम्बो',
        price: 110,
        isVeg: true,
        category: 'Combos',
        prepTimeMins: 12,
        description: 'देसी घी तड़का दाल व सुगंधित बासमती जीरा राइस',
        photoUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop',
      },
      {
        id: 'SK-04',
        name: 'Hot Gulab Jamun (2 Pcs)',
        hindiName: 'गरमा-गरम गुलाब जामुन (2 पीस)',
        price: 40,
        isVeg: true,
        category: 'Dessert',
        prepTimeMins: 5,
        description: 'खोया व इलायची चाशनी में डूबा ताजा मीठा',
        photoUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop',
      },
    ],
  },
  {
    id: 'PRT-RWA-AUTO-01',
    partnerRoyalId: 'JS-RWA-P002',
    name: 'रीवा सिटी ऑटो यूनियन एसोसिएशन (Rewa City Auto Union)',
    type: 'auto_provider',
    cityName: 'Rewa',
    cityCode: 'RWA',
    distanceKm: 0.9,
    phone: '+91 98260 77142',
    rating: 4.82,
    address: 'न्यू बस स्टैंड ऑटो स्टैंड रीवा',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isVerified: true,
    activeOrdersCount: 4,
    totalEarned80: 34200,
    totalOrdersCompleted: 238,
    vehicleFleetCount: 45,
    isOpen: true,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-PARTNER-JS-RWA-P002',
  },
  {
    id: 'PRT-RWA-REST-02',
    partnerRoyalId: 'JS-RWA-P003',
    name: 'विंध्य रसोई & टिफिन एक्सप्रेस (Vindhya Rasoi)',
    type: 'restaurant',
    cityName: 'Rewa',
    cityCode: 'RWA',
    distanceKm: 2.3,
    phone: '+91 97551 88402',
    rating: 4.79,
    address: 'संजय गांधी अस्पताल के सामने, रीवा',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop',
    isVerified: true,
    activeOrdersCount: 1,
    totalEarned80: 12100,
    totalOrdersCompleted: 98,
    isOpen: true,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-PARTNER-JS-RWA-P003',
    menuItems: [
      {
        id: 'VR-01',
        name: 'Student Simple Homely Thali',
        hindiName: 'विद्यार्थी घरेलू सादा थाली',
        price: 80,
        isVeg: true,
        category: 'Thali',
        prepTimeMins: 10,
        description: 'अरहर दाल, मौसमी सब्जी, 4 रोटी, चावल व आचार',
        photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop',
      },
      {
        id: 'VR-02',
        name: 'Veg Dum Biryani with Boondi Raita',
        hindiName: 'वेज दम बिरयानी संग बूंदी रायता',
        price: 130,
        isVeg: true,
        category: 'Biryani',
        prepTimeMins: 15,
        description: 'खड़े मसालों में पकी ताजा सब्जियों वाली दम बिरयानी',
        photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop',
      },
      {
        id: 'VR-03',
        name: 'Indori Poha & Jalebi Combo',
        hindiName: 'इंदौरी पोहा संग जलेबी नाश्ता',
        price: 50,
        isVeg: true,
        category: 'Breakfast',
        prepTimeMins: 6,
        description: 'सेव-जीरावन युक्त ताजा पोहा व 2 कुरकुरी जलेबी',
        photoUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop',
      },
    ],
  },
  {
    id: 'PRT-BPL-REST-01',
    partnerRoyalId: 'JS-BPL-P001',
    name: 'भोपाल एमपी नगर रॉयल टेस्ट (Bhopal MP Nagar Quick Bites)',
    type: 'restaurant',
    cityName: 'Bhopal',
    cityCode: 'BPL',
    distanceKm: 2.1,
    phone: '+91 98261 55901',
    rating: 4.85,
    address: 'एमपी नगर जोन 2, भोपाल',
    photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    isVerified: true,
    activeOrdersCount: 2,
    totalEarned80: 24600,
    totalOrdersCompleted: 180,
    isOpen: true,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-PARTNER-JS-BPL-P001',
    menuItems: [
      {
        id: 'BPL-01',
        name: 'Special Dal Bafla Thali',
        hindiName: 'स्पेशल दाल बाफला थाली',
        price: 160,
        isVeg: true,
        category: 'Thali',
        prepTimeMins: 20,
        description: 'घी में डूबे 2 बाफले, पंचमेल दाल, कढ़ी, लड्डू व चटनी',
        photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop',
      },
    ],
  },
  {
    id: 'PRT-BPL-AUTO-01',
    partnerRoyalId: 'JS-BPL-P002',
    name: 'राजधानी भोपाल ऑटो सिंडिकेट (Rajdhani Auto Syndicate)',
    type: 'auto_provider',
    cityName: 'Bhopal',
    cityCode: 'BPL',
    distanceKm: 1.2,
    phone: '+91 98263 99120',
    rating: 4.89,
    address: 'रानी कमलापति स्टेशन प्लेटफॉर्म 1 स्टैंड, भोपाल',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    isVerified: true,
    activeOrdersCount: 5,
    totalEarned80: 51200,
    totalOrdersCompleted: 410,
    vehicleFleetCount: 75,
    isOpen: true,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-PARTNER-JS-BPL-P002',
  },
];

// ==========================================================
// INITIAL BRIDGE ORDERS (DEMONSTRATING 90/10 vs 80/20 MODEL)
// ==========================================================
export const INITIAL_BRIDGE_ORDERS: BridgeOrder[] = [
  {
    orderId: 'ORD-RWA-2026-081',
    type: 'royalService',
    serviceTitle: 'Humara Medical Sathi (Hospital OPD Line & Escort)',
    customerId: 'CUST-8812',
    customerName: 'अमित कुमार द्विवेदी (Amit Dwivedi)',
    customerPhone: '+91 98261 44901',
    pickup: {
      address: 'संजय गांधी मेमोरियल हॉस्पिटल, ओपीडी गेट नं. 2, रीवा',
      lat: 24.542,
      lng: 81.311,
    },
    drop: {
      address: 'हड्डी रोग विभाग, बेड 14, वार्ड 3',
      lat: 24.543,
      lng: 81.312,
    },
    status: 'in_progress',
    priorityLevel: 1,
    assignedRoyalId: 'JS-RWA-0001',
    assignedRoyalName: 'रमेश विश्वकर्मा (Royal Sathi)',
    timers: {
      royalWorkerTimeoutSec: 90,
      partnerTimeoutSec: 60,
      elapsedSec: 25,
      currentCountdown: 65,
      activeTimerStage: 'royal',
    },
    commissionSplit: {
      totalAmount: 398, // 2 hrs @ 199/hr
      workerOrPartnerCut: 358, // 90%
      platformCut: 40, // 10%
      model: '90_10',
      commissionPercent: 10,
      description: 'Own Royal Worker fulfilled in Priority 1: 90% to Worker, 10% to Platform.',
    },
    createdAt: '2026-09-23 10:15 AM',
    acceptedAt: '2026-09-23 10:16 AM',
    deliveryOtp: '4892',
    sosTriggered: false,
    notes: 'Patient father is 68 yrs old, needs wheelchair support.',
  },
  {
    orderId: 'ORD-RWA-2026-082',
    type: 'food',
    serviceTitle: 'Royal Shahi Deluxe Thali (2 Boxes) - Bridge Order',
    customerId: 'CUST-9914',
    customerName: 'सुनील तिवारी (Sunil Tiwari)',
    customerPhone: '+91 94250 88219',
    pickup: {
      address: 'श्री कृष्णा भोजनालय, शिल्पी प्लाजा, रीवा',
      lat: 24.536,
      lng: 81.303,
    },
    drop: {
      address: 'सिविल लाइन्स, बंगला 14, रीवा',
      lat: 24.538,
      lng: 81.305,
    },
    items: [
      { name: 'Royal Shahi Deluxe Thali', quantity: 2, price: 150 },
      { name: 'Hot Gulab Jamun (2 Pcs)', quantity: 1, price: 40 },
    ],
    status: 'assigned_partner',
    priorityLevel: 2,
    assignedPartnerId: 'PRT-RWA-REST-01',
    assignedPartnerName: 'श्री कृष्णा शुद्ध शाकाहारी भोजनालय',
    assignedPartnerType: 'restaurant',
    timers: {
      royalWorkerTimeoutSec: 90,
      partnerTimeoutSec: 60,
      elapsedSec: 15,
      currentCountdown: 45,
      activeTimerStage: 'partner',
    },
    commissionSplit: {
      totalAmount: 340,
      workerOrPartnerCut: 272, // 80% to partner
      platformCut: 68, // 20% to platform
      model: '80_20',
      commissionPercent: 20,
      description: 'Fulfilled by our Verified Demand Partner: Shree Krishna (JS-RWA-P001) • 80% Partner, 20% Bridge Fee.',
    },
    createdAt: '2026-09-23 11:20 AM',
    acceptedAt: '2026-09-23 11:22 AM',
    deliveryOtp: '7104',
    sosTriggered: false,
    notes: 'Hot food delivery with foil seal. Zero surge.',
  },
  {
    orderId: 'ORD-RWA-2026-083',
    type: 'auto',
    serviceTitle: 'Auto Ride Overflow (Rewa Station to APS University)',
    customerId: 'CUST-3310',
    customerName: 'पूजा मिश्रा (Pooja Mishra)',
    customerPhone: '+91 98268 11904',
    pickup: {
      address: 'रीवा रेलवे स्टेशन प्लेटफॉर्म 1',
      lat: 24.5362,
      lng: 81.3037,
    },
    drop: {
      address: 'अवधेश प्रताप सिंह विश्वविद्यालय (APS University Campus)',
      lat: 24.545,
      lng: 81.332,
    },
    status: 'delivered',
    priorityLevel: 2,
    assignedPartnerId: 'PRT-RWA-AUTO-01',
    assignedPartnerName: 'रीवा सिटी ऑटो यूनियन एसोसिएशन',
    assignedPartnerType: 'auto_provider',
    timers: {
      royalWorkerTimeoutSec: 90,
      partnerTimeoutSec: 60,
      elapsedSec: 60,
      currentCountdown: 0,
      activeTimerStage: 'completed',
    },
    commissionSplit: {
      totalAmount: 180,
      workerOrPartnerCut: 144, // 80% to union driver
      platformCut: 36, // 20% Bridge Fee
      model: '80_20',
      commissionPercent: 20,
      description: 'Overflow Demand Forwarded to Nearest Auto Union: 80% Partner, 20% Bridge Fee.',
    },
    createdAt: '2026-09-23 09:00 AM',
    acceptedAt: '2026-09-23 09:02 AM',
    deliveredAt: '2026-09-23 09:28 AM',
    deliveryOtp: '3391',
    sosTriggered: false,
  },
  {
    orderId: 'ORD-RWA-2026-084',
    type: 'royalService',
    serviceTitle: 'Local Saman Urgent Delivery (Medicine from Chorhatta to Medical College)',
    customerId: 'CUST-1049',
    customerName: 'राघवेंद्र शुक्ला (Raghavendra Shukla)',
    customerPhone: '+91 97554 22091',
    pickup: {
      address: 'चोरहटा बाईपास मेडिकल एजेंसी, रीवा',
      lat: 24.529,
      lng: 81.295,
    },
    drop: {
      address: 'संजय गांधी हॉस्पिटल आईसीयू रिसेप्शन',
      lat: 24.542,
      lng: 81.311,
    },
    status: 'escalated',
    priorityLevel: 3,
    timers: {
      royalWorkerTimeoutSec: 90,
      partnerTimeoutSec: 60,
      elapsedSec: 150,
      currentCountdown: 0,
      activeTimerStage: 'escalated',
    },
    commissionSplit: {
      totalAmount: 220,
      workerOrPartnerCut: 198,
      platformCut: 22,
      model: '90_10',
      commissionPercent: 10,
      description: 'Priority 1 (90s) & Priority 2 (60s) timed out. Escalated to Super Admin Control Room for manual assign.',
    },
    createdAt: '2026-09-23 11:45 AM',
    deliveryOtp: '8841',
    sosTriggered: false,
    notes: 'Urgent injection ampoules. Requires urgent manual assignment by admin.',
  },
];

const STORAGE_KEYS = {
  DRIVERS: 'jitomni_royal_auto_drivers_v1',
  RIDES: 'jitomni_royal_auto_rides_v1',
  SOS_TICKETS: 'jitomni_royal_auto_sos_tickets_v1',
  DEMAND_PARTNERS: 'jitomni_demand_partners_v1',
  BRIDGE_ORDERS: 'jitomni_bridge_orders_v1',
};

export class RoyalAutoStorage {
  // --- DRIVERS ---
  static getDrivers(): AutoDriver[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRIVERS);
      if (!data) {
        this.saveDrivers(INITIAL_DRIVERS);
        return INITIAL_DRIVERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DRIVERS;
    }
  }

  static saveDrivers(drivers: AutoDriver[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
    } catch (e) {
      console.error('Failed to save drivers', e);
    }
  }

  // Generate Unique Royal ID: JS-[CITY_CODE]-[4 DIGIT NUMBER]
  static generateRoyalId(cityCode: string): string {
    const drivers = this.getDrivers();
    const cityDrivers = drivers.filter((d) => d.cityCode.toUpperCase() === cityCode.toUpperCase());
    const nextNum = cityDrivers.length + 1;
    const padded = nextNum.toString().padStart(4, '0');
    return `JS-${cityCode.toUpperCase()}-${padded}`;
  }

  // AI Fraud Check: Verify if Aadhaar is already registered
  static checkAadharDuplicate(aadharNumber: string, excludeRoyalId?: string): boolean {
    const clean = aadharNumber.replace(/[^0-9]/g, '');
    const drivers = this.getDrivers();
    return drivers.some((d) => {
      if (excludeRoyalId && d.royalId === excludeRoyalId) return false;
      const existingClean = d.aadharNumber.replace(/[^0-9]/g, '');
      return existingClean === clean && clean.length === 12;
    });
  }

  // Add new driver
  static addDriver(driver: AutoDriver): { success: boolean; message: string; driver?: AutoDriver } {
    if (this.checkAadharDuplicate(driver.aadharNumber)) {
      return {
        success: false,
        message: '⚠️ AI सुरक्षा चेतावनी: यह आधार कार्ड पहले से ही एक अन्य रॉयल आईडी से लिंक है।',
      };
    }
    const drivers = this.getDrivers();
    const updated = [driver, ...drivers];
    this.saveDrivers(updated);
    return { success: true, message: 'ड्राइवर सफलतापूर्वक पंजीकृत हुआ!', driver };
  }

  // Update driver
  static updateDriver(royalId: string, updates: Partial<AutoDriver>): void {
    const drivers = this.getDrivers();
    const updated = drivers.map((d) => (d.royalId === royalId ? { ...d, ...updates } : d));
    this.saveDrivers(updated);
  }

  // Toggle police verification
  static togglePoliceVerification(royalId: string): void {
    const drivers = this.getDrivers();
    const updated = drivers.map((d) => {
      if (d.royalId === royalId) {
        const nextPolice = !d.isPoliceVerified;
        // If police verified, set status active; otherwise if not verified keep pending
        return {
          ...d,
          isPoliceVerified: nextPolice,
          status: (nextPolice && d.isAadharVerified ? 'active' : 'pending') as any,
        };
      }
      return d;
    });
    this.saveDrivers(updated);
  }

  // Toggle driver block status
  static toggleDriverBlock(royalId: string): void {
    const drivers = this.getDrivers();
    const updated = drivers.map((d) => {
      if (d.royalId === royalId) {
        const next = d.status === 'blocked' ? 'active' : 'blocked';
        return { ...d, status: next as any };
      }
      return d;
    });
    this.saveDrivers(updated);
  }

  // --- RIDES ---
  static getRides(): AutoRide[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RIDES);
      if (!data) {
        this.saveRides(INITIAL_RIDES);
        return INITIAL_RIDES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_RIDES;
    }
  }

  static saveRides(rides: AutoRide[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
    } catch (e) {
      console.error('Failed to save rides', e);
    }
  }

  static addRide(ride: AutoRide): void {
    const rides = this.getRides();
    const updated = [ride, ...rides];
    this.saveRides(updated);
  }

  static updateRide(rideId: string, updates: Partial<AutoRide>): void {
    const rides = this.getRides();
    const updated = rides.map((r) => (r.rideId === rideId ? { ...r, ...updates } : r));
    this.saveRides(updated);
  }

  // --- SOS TICKETS ---
  static getSOSTickets(): AutoSOSTicket[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOS_TICKETS);
      if (!data) {
        this.saveSOSTickets(INITIAL_SOS_TICKETS);
        return INITIAL_SOS_TICKETS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SOS_TICKETS;
    }
  }

  static saveSOSTickets(tickets: AutoSOSTicket[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SOS_TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save SOS tickets', e);
    }
  }

  static triggerSOS(ticket: AutoSOSTicket): void {
    const tickets = this.getSOSTickets();
    const updated = [ticket, ...tickets];
    this.saveSOSTickets(updated);

    // Also mark ride as sosTriggered if rideId exists
    if (ticket.rideId) {
      this.updateRide(ticket.rideId, { sosTriggered: true });
    }

    // Update driver SOS status
    this.updateDriver(ticket.driverRoyalId, { sosStatus: 'active_emergency' });
  }

  // --- FARE CALCULATION ENGINE ---
  // Transparent AI Fixed Rate Logic: Base ₹30 + ₹12/km (0% Surge)
  // Rental packages: 2 hrs = ₹350 (up to 15km), 4 hrs = ₹650 (up to 30km), 8 hrs = ₹1,200 (up to 60km)
  static calculateFare(
    type: 'instant' | 'rental',
    distanceKm: number,
    rentalHours?: number
  ): { fare: number; baseFare: number; distanceCharge: number; platformCommission: number } {
    if (type === 'rental') {
      let packageRate = 350;
      if (rentalHours === 4) packageRate = 650;
      if (rentalHours === 8) packageRate = 1200;
      return {
        fare: packageRate,
        baseFare: packageRate - 10,
        distanceCharge: 0,
        platformCommission: 10, // flat Rs 10
      };
    }

    const baseFare = 30; // covers first 1.5 km
    const billableKm = Math.max(0, distanceKm - 1.5);
    const distanceCharge = Math.round(billableKm * 12);
    const totalFare = baseFare + distanceCharge;

    return {
      fare: Math.max(30, totalFare),
      baseFare,
      distanceCharge,
      platformCommission: 10,
    };
  }

  // ==========================================================
  // DEMAND PARTNERS STORAGE & METHODS
  // ==========================================================
  static getDemandPartners(): DemandPartner[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEMAND_PARTNERS);
      if (!data) {
        this.saveDemandPartners(INITIAL_DEMAND_PARTNERS);
        return INITIAL_DEMAND_PARTNERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMAND_PARTNERS;
    }
  }

  static saveDemandPartners(partners: DemandPartner[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DEMAND_PARTNERS, JSON.stringify(partners));
    } catch (e) {
      console.error('Failed to save demand partners', e);
    }
  }

  static addDemandPartner(partner: DemandPartner): void {
    const partners = this.getDemandPartners();
    const updated = [partner, ...partners];
    this.saveDemandPartners(updated);
  }

  static updateDemandPartner(id: string, updates: Partial<DemandPartner>): void {
    const partners = this.getDemandPartners();
    const updated = partners.map((p) => (p.id === id ? { ...p, ...updates } : p));
    this.saveDemandPartners(updated);
  }

  // ==========================================================
  // BRIDGE ORDERS STORAGE & CASCADE ENGINE
  // ==========================================================
  static getOrders(): BridgeOrder[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BRIDGE_ORDERS);
      if (!data) {
        this.saveOrders(INITIAL_BRIDGE_ORDERS);
        return INITIAL_BRIDGE_ORDERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BRIDGE_ORDERS;
    }
  }

  static saveOrders(orders: BridgeOrder[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BRIDGE_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save bridge orders', e);
    }
  }

  static addOrder(order: BridgeOrder): void {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    this.saveOrders(updated);
  }

  static updateOrder(orderId: string, updates: Partial<BridgeOrder>): void {
    const orders = this.getOrders();
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, ...updates } : o));
    this.saveOrders(updated);
  }

  // Commission Calculation Engine (90/10 Own Worker vs 80/20 Demand Partner)
  static calculateCommissionSplit(
    totalAmount: number, 
    isDemandPartner: boolean,
    partnerName?: string,
    partnerRoyalId?: string
  ): BridgeCommissionSplit {
    if (isDemandPartner) {
      const partnerCut = Math.round(totalAmount * 0.80);
      const platformCut = totalAmount - partnerCut; // 20%
      return {
        totalAmount,
        workerOrPartnerCut: partnerCut,
        platformCut,
        model: '80_20',
        commissionPercent: 20,
        description: partnerName 
          ? `Fulfilled by our Verified Demand Partner: ${partnerName} (${partnerRoyalId || 'JS-PRT'}) • 80% to Partner, 20% Platform Bridge Fee`
          : 'Fulfilled by Demand Partner • 80% to Partner, 20% Platform Bridge Fee',
      };
    }

    const workerCut = Math.round(totalAmount * 0.90);
    const platformCut = totalAmount - workerCut; // 10%
    return {
      totalAmount,
      workerOrPartnerCut: workerCut,
      platformCut,
      model: '90_10',
      commissionPercent: 10,
      description: 'Fulfilled by Own Royal Worker • 90% to Worker, 10% Platform Management Fee',
    };
  }

  // Create new Order with initial Priority 1 (90s countdown)
  static createBridgeOrder(params: {
    type: 'auto' | 'food' | 'royalService';
    serviceTitle: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    pickup: { address: string; lat: number; lng: number };
    drop: { address: string; lat: number; lng: number };
    totalAmount: number;
    items?: { name: string; quantity: number; price: number }[];
    preferredDriverId?: string;
    notes?: string;
  }): BridgeOrder {
    const orderId = `ORD-RWA-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // Priority 1: Default to Own Royal Worker (90/10)
    const initialSplit = this.calculateCommissionSplit(params.totalAmount, false);

    const newOrder: BridgeOrder = {
      orderId,
      type: params.type,
      serviceTitle: params.serviceTitle,
      customerId: params.customerId,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      pickup: params.pickup,
      drop: params.drop,
      items: params.items,
      status: 'pending',
      priorityLevel: 1, // Priority 1: Royal Worker Search
      assignedRoyalId: params.preferredDriverId,
      timers: {
        royalWorkerTimeoutSec: 90,
        partnerTimeoutSec: 60,
        elapsedSec: 0,
        currentCountdown: 90,
        activeTimerStage: 'royal',
      },
      commissionSplit: initialSplit,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryOtp,
      notes: params.notes,
    };

    this.addOrder(newOrder);
    return newOrder;
  }

  // Cascade Order to Priority 2: Demand Partner (60s countdown, 80/20 model)
  static forwardOrderToPartner(
    orderId: string, 
    partner: DemandPartner
  ): BridgeOrder | null {
    const orders = this.getOrders();
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return null;

    const partnerSplit = this.calculateCommissionSplit(
      order.commissionSplit.totalAmount,
      true,
      partner.name,
      partner.partnerRoyalId
    );

    const updated: BridgeOrder = {
      ...order,
      status: 'assigned_partner',
      priorityLevel: 2,
      assignedPartnerId: partner.id,
      assignedPartnerName: partner.name,
      assignedPartnerType: partner.type,
      timers: {
        ...order.timers,
        currentCountdown: 60,
        activeTimerStage: 'partner',
      },
      commissionSplit: partnerSplit,
    };

    this.updateOrder(orderId, updated);
    return updated;
  }

  // Escalate Order to Priority 3: Super Admin Desk
  static escalateOrderToAdmin(orderId: string, reason: string): BridgeOrder | null {
    const orders = this.getOrders();
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return null;

    const updated: BridgeOrder = {
      ...order,
      status: 'escalated',
      priorityLevel: 3,
      timers: {
        ...order.timers,
        currentCountdown: 0,
        activeTimerStage: 'escalated',
      },
      notes: (order.notes ? `${order.notes} • ` : '') + `[ESCALATED]: ${reason}`,
    };

    this.updateOrder(orderId, updated);
    return updated;
  }

  // Subscription validation & renew
  static renewDriverSubscription(royalId: string): void {
    const validTill = new Date();
    validTill.setDate(validTill.getDate() + 30);
    const dateStr = validTill.toISOString().split('T')[0];

    this.updateDriver(royalId, {
      subscriptionPaid: true,
      joiningFeePaid: true,
      subscriptionValidTill: dateStr,
      status: 'active',
    });
  }

  static isDriverEligibleToGoLive(driver: AutoDriver): { eligible: boolean; reasons: string[] } {
    const reasons: string[] = [];
    if (!driver.isAadharVerified) reasons.push('Aadhaar OTP verification pending');
    if (!driver.isPoliceVerified) reasons.push('Admin Police CID verification pending');
    if (!driver.subscriptionPaid) reasons.push('Monthly ₹299 subscription expired or unpaid');

    return {
      eligible: reasons.length === 0,
      reasons,
    };
  }
}
