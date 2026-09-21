import {
  FranchiseApplication,
  FranchiseCity,
  CityWorker,
  CityBooking,
  WithdrawalRequest,
  FranchiseSettings,
  PanIndiaCityPresence,
} from './franchiseTypes';

export const DEFAULT_FRANCHISE_SETTINGS: FranchiseSettings = {
  franchiseFee: 75000,
  ownerCommissionRate: 70,
  headOfficeCommissionRate: 30,
  monthlyBrandFee: 3000,
  headOfficeCity: 'Rewa',
  headOfficeState: 'Madhya Pradesh',
  headOfficeContact: '9399608239',
  headOfficeDirector: 'Manish Vishwakarma',
};

// 10 Pan-India Presence Cities
export const PAN_INDIA_CITIES_PRESENCE: PanIndiaCityPresence[] = [
  {
    id: 'rewa',
    name: 'रीवा (Rewa)',
    state: 'मध्य प्रदेश (HQ)',
    tagline: 'सेंट्रल हेड ऑफिस & ट्रेनिंग एकेडमी (Training Hub)',
    establishedYear: '2024',
    type: 'head_office',
    icon: '👑',
    activeWorkers: 184,
    monthlyBookings: 2450,
    badge: 'HEAD OFFICE',
  },
  {
    id: 'bhopal',
    name: 'भोपाल (Bhopal)',
    state: 'मध्य प्रदेश',
    tagline: 'कैपिटल मेट्रो हब • 35+ सर्विसेज एक्टिव',
    establishedYear: '2025',
    type: 'metro_hub',
    icon: '🏛️',
    activeWorkers: 142,
    monthlyBookings: 1890,
    badge: 'ACTIVE METRO',
  },
  {
    id: 'indore',
    name: 'इंदौर (Indore)',
    state: 'मध्य प्रदेश',
    tagline: 'कमर्शियल कैपिटल • 24x7 ऑन-डिमांड साथी',
    establishedYear: '2025',
    type: 'metro_hub',
    icon: '⚡',
    activeWorkers: 168,
    monthlyBookings: 2140,
    badge: 'ACTIVE METRO',
  },
  {
    id: 'jabalpur',
    name: 'जबलपुर (Jabalpur)',
    state: 'मध्य प्रदेश',
    tagline: 'महाकौशल जोनल हब • संस्कारधानी',
    establishedYear: '2025',
    type: 'tier2_hub',
    icon: '🌊',
    activeWorkers: 96,
    monthlyBookings: 1280,
    badge: 'ACTIVE HUB',
  },
  {
    id: 'gwalior',
    name: 'ग्वालियर (Gwalior)',
    state: 'मध्य प्रदेश',
    tagline: 'चंबल संभाग मुख्य केंद्र',
    establishedYear: '2025',
    type: 'tier2_hub',
    icon: '🏰',
    activeWorkers: 78,
    monthlyBookings: 980,
    badge: 'ACTIVE HUB',
  },
  {
    id: 'varanasi',
    name: 'वाराणसी (Varanasi)',
    state: 'उत्तर प्रदेश',
    tagline: 'पूर्वांचल जोनल हब • काशी क्षेत्र',
    establishedYear: '2025',
    type: 'tier2_hub',
    icon: '🪔',
    activeWorkers: 110,
    monthlyBookings: 1560,
    badge: 'ACTIVE HUB',
  },
  {
    id: 'prayagraj',
    name: 'प्रयागराज (Prayagraj)',
    state: 'उत्तर प्रदेश',
    tagline: 'संगम नगरी • लीगल & मेडिकल साथी',
    establishedYear: '2025',
    type: 'tier2_hub',
    icon: '🛶',
    activeWorkers: 85,
    monthlyBookings: 1120,
    badge: 'ACTIVE HUB',
  },
  {
    id: 'lucknow',
    name: 'लखनऊ (Lucknow)',
    state: 'उत्तर प्रदेश',
    tagline: 'अवध मेट्रो रीजन • 100% पुलिस वेरिफाइड',
    establishedYear: '2025',
    type: 'metro_hub',
    icon: '🌸',
    activeWorkers: 135,
    monthlyBookings: 1750,
    badge: 'ACTIVE METRO',
  },
  {
    id: 'patna',
    name: 'पटना (Patna)',
    state: 'बिहार',
    tagline: 'मगध सेंट्रल रीजन • होम सर्विसेज & ट्यूटर्स',
    establishedYear: '2025',
    type: 'metro_hub',
    icon: '📜',
    activeWorkers: 94,
    monthlyBookings: 1310,
    badge: 'ACTIVE METRO',
  },
  {
    id: 'delhi-ncr',
    name: 'दिल्ली NCR (Delhi NCR)',
    state: 'राष्ट्रीय राजधानी क्षेत्र',
    tagline: 'एक्सप्रेस ऑन-डिमांड गिग नेटवर्क',
    establishedYear: '2025',
    type: 'metro_hub',
    icon: '🦁',
    activeWorkers: 210,
    monthlyBookings: 3200,
    badge: 'ACTIVE MEGA HUB',
  },
];

export const INITIAL_FRANCHISE_CITIES: FranchiseCity[] = [
  {
    id: 'rewa',
    cityName: 'रीवा (Rewa)',
    state: 'मध्य प्रदेश',
    ownerName: 'मनीष विश्वकर्मा (Director / Head Office)',
    ownerMobile: '9399608239',
    ownerEmail: 'rewa.ho@jitomni.in',
    loginPasscode: 'rewa75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2024-01-15',
    isHeadOffice: true,
    totalBookings: 2450,
    totalRevenue: 367500,
    totalWorkers: 184,
    monthlyBrandFeePaid: true,
    officeAddress: 'Jitomni Sovereign Bhavan, Civil Lines, Rewa (M.P.) - 486001',
    trainedStaffCount: { girls: 4, boys: 8 },
  },
  {
    id: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    state: 'मध्य प्रदेश',
    ownerName: 'अमित कुमार सक्सेना (Bhopal Franchise Head)',
    ownerMobile: '9826112233',
    ownerEmail: 'bhopal@jitomni.in',
    loginPasscode: 'bhopal75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-02-10',
    isHeadOffice: false,
    totalBookings: 1890,
    totalRevenue: 283500,
    totalWorkers: 142,
    monthlyBrandFeePaid: true,
    officeAddress: 'Plot 42, MP Nagar Zone 2, Bhopal (M.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'indore',
    cityName: 'इंदौर (Indore)',
    state: 'मध्य प्रदेश',
    ownerName: 'राजेश पाटीदार (Indore Partner)',
    ownerMobile: '9893044556',
    ownerEmail: 'indore@jitomni.in',
    loginPasscode: 'indore75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-03-01',
    isHeadOffice: false,
    totalBookings: 2140,
    totalRevenue: 321000,
    totalWorkers: 168,
    monthlyBrandFeePaid: true,
    officeAddress: 'Vijaynagar Square, Business Park, Indore (M.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'jabalpur',
    cityName: 'जबलपुर (Jabalpur)',
    state: 'मध्य प्रदेश',
    ownerName: 'संदीप श्रीवास्तव',
    ownerMobile: '9425178901',
    ownerEmail: 'jabalpur@jitomni.in',
    loginPasscode: 'jbp75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-04-12',
    isHeadOffice: false,
    totalBookings: 1280,
    totalRevenue: 192000,
    totalWorkers: 96,
    monthlyBrandFeePaid: true,
    officeAddress: 'Wright Town, Jabalpur (M.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'gwalior',
    cityName: 'ग्वालियर (Gwalior)',
    state: 'मध्य प्रदेश',
    ownerName: 'विकास तोमर',
    ownerMobile: '9827011223',
    ownerEmail: 'gwalior@jitomni.in',
    loginPasscode: 'gwl75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-05-18',
    isHeadOffice: false,
    totalBookings: 980,
    totalRevenue: 147000,
    totalWorkers: 78,
    monthlyBrandFeePaid: true,
    officeAddress: 'City Centre, Gwalior (M.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'varanasi',
    cityName: 'वाराणसी (Varanasi)',
    state: 'उत्तर प्रदेश',
    ownerName: 'प्रमोद कुमार चौबे',
    ownerMobile: '9450123456',
    ownerEmail: 'varanasi@jitomni.in',
    loginPasscode: 'vns75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-06-01',
    isHeadOffice: false,
    totalBookings: 1560,
    totalRevenue: 234000,
    totalWorkers: 110,
    monthlyBrandFeePaid: true,
    officeAddress: 'Sigra Road, Varanasi (U.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'prayagraj',
    cityName: 'प्रयागराज (Prayagraj)',
    state: 'उत्तर प्रदेश',
    ownerName: 'अखिलेश मिश्रा',
    ownerMobile: '9415123789',
    ownerEmail: 'prayagraj@jitomni.in',
    loginPasscode: 'pry75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-06-20',
    isHeadOffice: false,
    totalBookings: 1120,
    totalRevenue: 168000,
    totalWorkers: 85,
    monthlyBrandFeePaid: true,
    officeAddress: 'Civil Lines, Prayagraj (U.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'lucknow',
    cityName: 'लखनऊ (Lucknow)',
    state: 'उत्तर प्रदेश',
    ownerName: 'मयंक वाजपेयी',
    ownerMobile: '9455123999',
    ownerEmail: 'lucknow@jitomni.in',
    loginPasscode: 'lko75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-07-05',
    isHeadOffice: false,
    totalBookings: 1750,
    totalRevenue: 262500,
    totalWorkers: 135,
    monthlyBrandFeePaid: true,
    officeAddress: 'Hazratganj, Lucknow (U.P.)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'patna',
    cityName: 'पटना (Patna)',
    state: 'बिहार',
    ownerName: 'राजीव रंजन सिंह',
    ownerMobile: '9334123456',
    ownerEmail: 'patna@jitomni.in',
    loginPasscode: 'patna75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-07-22',
    isHeadOffice: false,
    totalBookings: 1310,
    totalRevenue: 196500,
    totalWorkers: 94,
    monthlyBrandFeePaid: true,
    officeAddress: 'Boring Road, Patna (Bihar)',
    trainedStaffCount: { girls: 1, boys: 2 },
  },
  {
    id: 'delhi-ncr',
    cityName: 'दिल्ली NCR (Delhi NCR)',
    state: 'राष्ट्रीय राजधानी क्षेत्र',
    ownerName: 'गौरव कपूर',
    ownerMobile: '9811099887',
    ownerEmail: 'delhi@jitomni.in',
    loginPasscode: 'delhi75000',
    status: 'active',
    franchiseFeePaid: true,
    franchiseFeeAmount: 75000,
    joinedDate: '2025-08-10',
    isHeadOffice: false,
    totalBookings: 3200,
    totalRevenue: 480000,
    totalWorkers: 210,
    monthlyBrandFeePaid: true,
    officeAddress: 'Sector 62, Noida / Connaught Place, New Delhi',
    trainedStaffCount: { girls: 2, boys: 4 },
  },
];

export const INITIAL_FRANCHISE_APPLICATIONS: FranchiseApplication[] = [
  {
    id: 'app-101',
    name: 'दिनेश कुमार त्रिपाठी',
    city: 'सतना (Satna)',
    state: 'मध्य प्रदेश',
    mobile: '9826781234',
    email: 'dinesh.satna@gmail.com',
    investmentReady: 'yes',
    reason: 'रीवा हेड ऑफिस के नजदीक होने के कारण मैं सतना में पूरी टीम को रीवा भेजकर ट्रेनिंग कराकर तुरंत 35+ सर्विसेज और साथी सेवा शुरू करना चाहता हूँ। ₹75,000 की राशि तैयार है।',
    experience: '5 वर्ष का स्थानीय लॉजिस्टिक्स व हार्डवेयर स्टोर संचालन का अनुभव।',
    status: 'pending',
    feePaid: false,
    appliedDate: '2026-09-18',
  },
  {
    id: 'app-102',
    name: 'रोहित वर्मा',
    city: 'कानपुर (Kanpur)',
    state: 'उत्तर प्रदेश',
    mobile: '9452098765',
    email: 'rohit.kanpur@yahoo.com',
    investmentReady: 'yes',
    reason: 'कानपुर एक विशाल औद्योगिक शहर है जहां इलेक्ट्रीशियन, प्लंबर, अस्पताल साथी और एसी रिपेयर की भारी मांग है। 70-30 का मॉडल बहुत आकर्षक है।',
    experience: 'स्थानीय सर्विस सेंटर मैनेजर (3 वर्ष)।',
    status: 'pending',
    feePaid: false,
    appliedDate: '2026-09-19',
  },
  {
    id: 'app-103',
    name: 'सुनील कुमार गुप्ता',
    city: 'सीधी (Sidhi)',
    state: 'मध्य प्रदेश',
    mobile: '9893456789',
    email: 'sunil.sidhi@gmail.com',
    investmentReady: 'yes',
    reason: 'सीधी में बुजुर्गों के लिए मेडिकल साथी और ग्रामीण किसानों के लिए ऑन-डिमांड हेल्प की सख्त जरूरत है।',
    experience: 'कॉमन सर्विस सेंटर (CSC VLE) संचालक।',
    status: 'pending',
    feePaid: false,
    appliedDate: '2026-09-20',
  },
  {
    id: 'app-104',
    name: 'प्रियंका कुमारी',
    city: 'रांची (Ranchi)',
    state: 'झारखंड',
    mobile: '9431123456',
    email: 'priyanka.ranchi@outlook.com',
    investmentReady: 'need_support',
    reason: 'रांची में विमेन होम ब्यूटीशियन और होम ट्यूटर नेटवर्क स्थापित करना चाहती हूँ।',
    experience: 'शिक्षा एवं कौशल विकास NGO समन्वयक।',
    status: 'pending',
    feePaid: false,
    appliedDate: '2026-09-21',
  },
];

export const INITIAL_CITY_WORKERS: CityWorker[] = [
  // Bhopal Workers
  {
    id: 'wrk-bhopal-1',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    name: 'कमलेश कुशवाहा',
    mobile: '9826145678',
    serviceCategory: 'Home Services',
    skillName: 'सीनियर इलेक्ट्रीशियन & AC टेक्नीशियन',
    experienceYears: 6,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 4.9,
    totalTasksCompleted: 142,
    dailyEarningsToday: 1650,
    joinedDate: '2025-02-15',
  },
  {
    id: 'wrk-bhopal-2',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    name: 'अंजलि शर्मा',
    mobile: '9826198765',
    serviceCategory: 'Medical & Companion Sathi',
    skillName: 'मेडिकल साथी & बुजुर्ग केयरटेकर',
    experienceYears: 4,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 5.0,
    totalTasksCompleted: 98,
    dailyEarningsToday: 1200,
    joinedDate: '2025-02-20',
  },
  {
    id: 'wrk-bhopal-3',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    name: 'अब्दुल रऊफ',
    mobile: '9826133445',
    serviceCategory: 'Home Services',
    skillName: 'मास्टर प्लंबर & RO वाटर स्पेशलिस्ट',
    experienceYears: 5,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 4.8,
    totalTasksCompleted: 114,
    dailyEarningsToday: 1400,
    joinedDate: '2025-03-05',
  },
  {
    id: 'wrk-bhopal-4',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    name: 'दीपक मालवीय',
    mobile: '9826177889',
    serviceCategory: 'Delivery & Driver',
    skillName: 'एक्सप्रेस डिलीवरी & ऑन-डिमांड राइडर',
    experienceYears: 3,
    status: 'pending_verification',
    aadhaarVerified: true,
    policeVerified: false,
    rating: 4.5,
    totalTasksCompleted: 18,
    dailyEarningsToday: 650,
    joinedDate: '2026-09-15',
  },

  // Indore Workers
  {
    id: 'wrk-indore-1',
    cityId: 'indore',
    cityName: 'इंदौर (Indore)',
    name: 'जितेंद्र पाटीदार',
    mobile: '9893011223',
    serviceCategory: 'Home Services',
    skillName: 'इलेक्ट्रीशियन & होम अप्लायंसेज',
    experienceYears: 7,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 4.9,
    totalTasksCompleted: 165,
    dailyEarningsToday: 1800,
    joinedDate: '2025-03-10',
  },
  {
    id: 'wrk-indore-2',
    cityId: 'indore',
    cityName: 'इंदौर (Indore)',
    name: 'सुधा तिवारी',
    mobile: '9893055667',
    serviceCategory: 'Beauty & Personal Care',
    skillName: 'होम सैलून & ब्यूटीशियन एक्सपर्ट',
    experienceYears: 5,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 5.0,
    totalTasksCompleted: 120,
    dailyEarningsToday: 2100,
    joinedDate: '2025-03-18',
  },

  // Rewa Head Office Workers
  {
    id: 'wrk-rewa-1',
    cityId: 'rewa',
    cityName: 'रीवा (Rewa)',
    name: 'सत्यम साकेत',
    mobile: '9399611223',
    serviceCategory: 'Medical & Companion Sathi',
    skillName: 'संजय गांधी अस्पताल साथी & बुजुर्ग सेवक',
    experienceYears: 4,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 5.0,
    totalTasksCompleted: 210,
    dailyEarningsToday: 1500,
    joinedDate: '2024-02-01',
  },
  {
    id: 'wrk-rewa-2',
    cityId: 'rewa',
    cityName: 'रीवा (Rewa)',
    name: 'अरुण कोल',
    mobile: '9399622334',
    serviceCategory: 'Home Services',
    skillName: 'इलेक्ट्रीशियन, मोटर & इन्वर्टर रिपेयर',
    experienceYears: 6,
    status: 'active',
    aadhaarVerified: true,
    policeVerified: true,
    rating: 4.9,
    totalTasksCompleted: 195,
    dailyEarningsToday: 1750,
    joinedDate: '2024-02-10',
  },
];

export const INITIAL_CITY_BOOKINGS: CityBooking[] = [
  // Bhopal Bookings
  {
    id: 'bk-bhopal-901',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    customerName: 'डॉ. विवेक अग्निहोत्री',
    customerMobile: '9826011111',
    customerAddress: 'E-7 Arera Colony, Bhopal',
    serviceName: 'AC लीकेज & गैस चार्जिंग सर्विस',
    category: 'Home Services',
    date: '2026-09-21',
    time: '11:30 AM',
    totalAmount: 1200,
    franchiseShare70: 840,
    headOfficeShare30: 360,
    status: 'in_progress',
    assignedWorkerId: 'wrk-bhopal-1',
    assignedWorkerName: 'कमलेश कुशवाहा',
    assignedWorkerMobile: '9826145678',
    otp: '4819',
  },
  {
    id: 'bk-bhopal-902',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    customerName: 'श्रीमती उमा देवी',
    customerMobile: '9826022222',
    customerAddress: 'BHEL Sector B, Bhopal',
    serviceName: 'एम्स भोपाल अस्पताल साथी (4 घंटे)',
    category: 'Medical & Companion Sathi',
    date: '2026-09-21',
    time: '02:00 PM',
    totalAmount: 600,
    franchiseShare70: 420,
    headOfficeShare30: 180,
    status: 'assigned',
    assignedWorkerId: 'wrk-bhopal-2',
    assignedWorkerName: 'अंजलि शर्मा',
    assignedWorkerMobile: '9826198765',
    otp: '7302',
  },
  {
    id: 'bk-bhopal-903',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    customerName: 'राजेश गुप्ता',
    customerMobile: '9826033333',
    customerAddress: 'Kolar Road, Bhopal',
    serviceName: 'बाथरूम पाइप फिटिंग & सिंक लीकेज',
    category: 'Home Services',
    date: '2026-09-21',
    time: '04:30 PM',
    totalAmount: 500,
    franchiseShare70: 350,
    headOfficeShare30: 150,
    status: 'pending',
    notes: 'कस्टमर ने तत्काल शाम को प्लंबर की मांग की है।',
  },
  {
    id: 'bk-bhopal-904',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    customerName: 'नीरज सक्सेना',
    customerMobile: '9826044444',
    customerAddress: 'Shahpura, Bhopal',
    serviceName: 'घर पर हेयरकट & ग्रूमिंग',
    category: 'Beauty & Personal Care',
    date: '2026-09-21',
    time: '09:00 AM',
    totalAmount: 400,
    franchiseShare70: 280,
    headOfficeShare30: 120,
    status: 'completed',
    assignedWorkerId: 'wrk-bhopal-1',
    assignedWorkerName: 'कमलेश कुशवाहा',
    otp: '9182',
  },

  // Rewa Bookings
  {
    id: 'bk-rewa-801',
    cityId: 'rewa',
    cityName: 'रीवा (Rewa)',
    customerName: 'पं. रामकृपाल शुक्ल',
    customerMobile: '9399011222',
    customerAddress: 'समान तिराहा, रीवा',
    serviceName: 'संजय गांधी मेमोरियल हॉस्पिटल चेकअप साथी',
    category: 'Medical & Companion Sathi',
    date: '2026-09-21',
    time: '10:00 AM',
    totalAmount: 800,
    franchiseShare70: 560,
    headOfficeShare30: 240,
    status: 'completed',
    assignedWorkerId: 'wrk-rewa-1',
    assignedWorkerName: 'सत्यम साकेत',
    otp: '5561',
  },
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wth-bhopal-1',
    cityId: 'bhopal',
    cityName: 'भोपाल (Bhopal)',
    amount: 15000,
    upiIdOrBank: 'amit.saksena@oksbi',
    accountHolderName: 'अमित कुमार सक्सेना',
    status: 'paid',
    requestedAt: '2026-09-15 14:20',
    processedAt: '2026-09-15 16:45',
    transactionRef: 'UPI/2026/0915/998124',
  },
  {
    id: 'wth-indore-1',
    cityId: 'indore',
    cityName: 'इंदौर (Indore)',
    amount: 25000,
    upiIdOrBank: 'rajesh.patidar@icici',
    accountHolderName: 'राजेश पाटीदार',
    status: 'paid',
    requestedAt: '2026-09-17 11:10',
    processedAt: '2026-09-17 13:00',
    transactionRef: 'NEFT/IND/776211',
  },
];

// Helper functions for persistent state management
const STORAGE_KEYS = {
  APPLICATIONS: 'jitomni_franchise_applications_v1',
  CITIES: 'jitomni_franchise_cities_v1',
  WORKERS: 'jitomni_franchise_workers_v1',
  BOOKINGS: 'jitomni_franchise_bookings_v1',
  WITHDRAWALS: 'jitomni_franchise_withdrawals_v1',
  SETTINGS: 'jitomni_franchise_settings_v1',
};

export const FranchiseStorage = {
  getApplications(): FranchiseApplication[] {
    if (typeof window === 'undefined') return INITIAL_FRANCHISE_APPLICATIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_FRANCHISE_APPLICATIONS;
    } catch {
      return INITIAL_FRANCHISE_APPLICATIONS;
    }
  },

  saveApplications(apps: FranchiseApplication[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (e) {
      console.error(e);
    }
  },

  addApplication(app: Omit<FranchiseApplication, 'id' | 'appliedDate' | 'status' | 'feePaid'>): FranchiseApplication {
    const apps = this.getApplications();
    const newApp: FranchiseApplication = {
      ...app,
      id: `app-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      feePaid: false,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    apps.unshift(newApp);
    this.saveApplications(apps);
    return newApp;
  },

  getCities(): FranchiseCity[] {
    if (typeof window === 'undefined') return INITIAL_FRANCHISE_CITIES;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CITIES);
      return saved ? JSON.parse(saved) : INITIAL_FRANCHISE_CITIES;
    } catch {
      return INITIAL_FRANCHISE_CITIES;
    }
  },

  saveCities(cities: FranchiseCity[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
    } catch (e) {
      console.error(e);
    }
  },

  getWorkers(): CityWorker[] {
    if (typeof window === 'undefined') return INITIAL_CITY_WORKERS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKERS);
      return saved ? JSON.parse(saved) : INITIAL_CITY_WORKERS;
    } catch {
      return INITIAL_CITY_WORKERS;
    }
  },

  saveWorkers(workers: CityWorker[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(workers));
    } catch (e) {
      console.error(e);
    }
  },

  getBookings(): CityBooking[] {
    if (typeof window === 'undefined') return INITIAL_CITY_BOOKINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_CITY_BOOKINGS;
    } catch {
      return INITIAL_CITY_BOOKINGS;
    }
  },

  saveBookings(bookings: CityBooking[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  },

  getWithdrawals(): WithdrawalRequest[] {
    if (typeof window === 'undefined') return INITIAL_WITHDRAWALS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WITHDRAWALS);
      return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
    } catch {
      return INITIAL_WITHDRAWALS;
    }
  },

  saveWithdrawals(withdrawals: WithdrawalRequest[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.WITHDRAWALS, JSON.stringify(withdrawals));
    } catch (e) {
      console.error(e);
    }
  },

  getSettings(): FranchiseSettings {
    if (typeof window === 'undefined') return DEFAULT_FRANCHISE_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_FRANCHISE_SETTINGS;
    } catch {
      return DEFAULT_FRANCHISE_SETTINGS;
    }
  },

  saveSettings(settings: FranchiseSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  },
};
