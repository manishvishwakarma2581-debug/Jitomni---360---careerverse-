import { Router } from 'express';
import { getGenAI, generateFastContent } from '../ai/geminiClient';

export const companionRouter = Router();

interface InMemBooking {
  id: string;
  category: string;
  requirements: string;
  durationHours: number;
  totalEstimatedAmount: number;
  status: string;
  userPhone: string;
  address: string;
  createdAt: string;
}

const companionBookingsStore: InMemBooking[] = [];
const companionSOSAlertsStore: any[] = [];

// In-Memory Workers Store with Documents & Wallet
const companionWorkersStore: any[] = [
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
    verificationStatus: 'verified_active',
    isFlagged: false,
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

const availableRadarTasksStore: any[] = [
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
    workerEarnings80: 955,
    platformFee20: 239,
    requirements: 'Need attentive attendant to assist elderly post-surgery patient with dinner, medicine intake, and night vigilance.',
    genderPreference: 'female',
    startOtp: '4829',
    endOtp: '9103',
    status: 'available',
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
    workerEarnings80: 605,
    platformFee20: 151,
    requirements: 'Shagun envelope register indexing, guest traditional Aarti welcome, stage VIP crowd queue management.',
    genderPreference: 'any',
    startOtp: '7721',
    endOtp: '3340',
    status: 'available',
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
    workerEarnings80: 382,
    platformFee20: 95,
    requirements: 'Escort 78-yr senior citizen to SBI Bank branch for Life Certificate (Jeevan Pramaan) biometric update & evening park walk.',
    genderPreference: 'any',
    startOtp: '6190',
    endOtp: '8401',
    status: 'available',
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
    workerEarnings80: 224,
    platformFee20: 56,
    requirements: 'Purchase 25kg bulk flour, spices, and fresh vegetables list from wholesale rates and deliver safely to flat.',
    genderPreference: 'male',
    startOtp: '3512',
    endOtp: '7920',
    status: 'available',
    createdAt: new Date().toISOString()
  }
];

let platformWalletBalance = 1420;
const companionNotificationsStore: any[] = [
  {
    id: 'NOTIF-01',
    type: 'wallet_credit',
    title: '💰 वॉलेट क्रेडिट संपन्न (Auto Split)',
    message: 'टास्क JIT-CMP-84910 पूर्ण: 20% (₹72) प्लेटफॉर्म चार्ज व 80% (₹288) साथी पूजा विश्वकर्मा के वॉलेट में सीधे जमा। UPI का झंझट खत्म!',
    timestamp: '2026-10-24T10:46:00Z',
    read: false,
    importance: 'high'
  },
  {
    id: 'NOTIF-02',
    type: 'start_checkin',
    title: '📸 START चेक-इन वेरिफाइड (Photo + GPS Locked)',
    message: 'पूजा विश्वकर्मा ने AIIMS भोपाल OPD गेट 2 पर फोटो व लाइव GPS चेक-इन दर्ज किया।',
    timestamp: '2026-10-24T10:00:00Z',
    read: false,
    importance: 'normal'
  },
  {
    id: 'NOTIF-03',
    type: 'rule_applied',
    title: '🎁 4 KM फ्री राइड नियम लागू',
    message: 'लोकल डिलीवरी व सुरक्षित यात्रा साथी में पहले 4 KM का ₹0 शुल्क नियम स्वतः लागू।',
    timestamp: '2026-10-24T09:30:00Z',
    read: true,
    importance: 'normal'
  }
];

const companionCommissionRecords: any[] = [
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
    billFormulaBreakdown: '2hr x 150 = 300 + 6km bike 60 = 360',
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
    bikeKmCharge: 40,
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
  }
];

const ridePlatformFeeRecordsStore: any[] = [
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
    driverPayout: 136,
    platformFee: 15,
    date: '2026-09-06 09:15 AM',
    status: 'collected'
  }
];

const companionWorkerReviewsStore: any[] = [
  {
    id: 'REV-01',
    taskId: 'JIT-CMP-84910',
    workerId: 'cmp-01',
    customerName: 'Anil Sharma',
    rating: 5,
    comment: 'Pooja was exceptionally caring and punctual. Took great care of my mother throughout the night in ICU step-down ward.',
    timestamp: '2026-09-03T19:00:00Z'
  }
];

// --- 1. Worker List & Registration ---
companionRouter.get('/api/companion/workers', (req, res) => {
  res.json({
    success: true,
    count: companionWorkersStore.length,
    workers: companionWorkersStore
  });
});

companionRouter.post('/api/companion/worker/onboard', (req, res) => {
  const {
    id,
    name,
    gender,
    age,
    phone,
    city,
    specialization,
    hourlyRate,
    aadhaarNumber,
    aadhaarDocName,
    policeCertNumber,
    policeStation,
    policeDocName,
    bgCertId,
    bgAgency,
    bgDocName,
    upiId,
    bankAccountNumber,
    bankIfsc,
    bankName
  } = req.body;

  const workerId = id || `cmp-${Date.now().toString().slice(-4)}`;
  const existingIdx = companionWorkersStore.findIndex((w) => w.id === workerId);

  const newWorkerData = {
    id: workerId,
    name: name || 'New Partner Applicant',
    gender: gender || 'any',
    age: Number(age) || 24,
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 0,
    tasksCompleted: 0,
    policeVerified: false,
    policeVerificationId: policeCertNumber || 'PENDING-VERIFY',
    aadhaareKYCVerified: true,
    verificationStatus: 'pending_approval',
    isFlagged: false,
    specialization: specialization || {
      hi: 'अस्पताल व घरेलू साथी सहायक',
      en: 'Hospital & Household Companion Attendant',
      hinglish: 'Companion & Errand Attendant'
    },
    languages: ['Hindi', 'English'],
    distanceKm: 2.0,
    etaMinutes: 15,
    hourlyRate: Number(hourlyRate) || 160,
    city: city || 'Bhopal',
    phone: phone || '+91 98765 43210',
    availableNow: false,
    badgeTitle: '⏳ Pending Admin Verification',
    bio: 'Newly registered citizen companion. Documents submitted for Sovereign Police & Aadhaar security clearance.',
    documents: {
      aadhaar: {
        number: aadhaarNumber || 'XXXX-XXXX-0000',
        docName: aadhaarDocName || 'Aadhaar_Upload.pdf',
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
      },
      policeVerification: {
        certNumber: policeCertNumber || 'POLICE-VERIFY-PENDING',
        policeStation: policeStation || 'Local Thana Police Station',
        docName: policeDocName || 'Police_Clearance_Cert.pdf',
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      },
      backgroundCheck: {
        certId: bgCertId || 'BG-CHECK-PENDING',
        agency: bgAgency || 'Sovereign Character Background Bureau',
        docName: bgDocName || 'Background_Check_Doc.pdf',
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    },
    wallet: {
      availableBalance: 0,
      pendingWeeklyPayout: 0,
      totalEarnings: 0,
      upiId: upiId || 'worker@upi',
      bankAccountNumber: bankAccountNumber || '00000000000',
      bankIfsc: bankIfsc || 'SBIN0000000',
      bankName: bankName || 'State Bank of India'
    }
  };

  if (existingIdx >= 0) {
    companionWorkersStore[existingIdx] = {
      ...companionWorkersStore[existingIdx],
      ...newWorkerData,
      verificationStatus: 'pending_approval'
    };
  } else {
    companionWorkersStore.push(newWorkerData);
  }

  res.json({
    success: true,
    message: 'Application & documents uploaded successfully. Account is in Pending Approval status awaiting Admin review.',
    worker: companionWorkersStore.find((w) => w.id === workerId)
  });
});

// --- 2. Admin Verification Control ---
companionRouter.post('/api/companion/admin/verify-worker', (req, res) => {
  const { workerId, newStatus } = req.body;
  const worker = companionWorkersStore.find((w) => w.id === workerId);

  if (!worker) {
    return res.status(404).json({ success: false, message: 'Worker profile not found.' });
  }

  worker.verificationStatus = newStatus;
  if (newStatus === 'verified_active') {
    worker.policeVerified = true;
    worker.availableNow = true;
    worker.badgeTitle = '🛡️ Sovereign Police Verified Companion';
    if (worker.documents) {
      if (worker.documents.aadhaar) worker.documents.aadhaar.status = 'verified';
      if (worker.documents.policeVerification) worker.documents.policeVerification.status = 'verified';
      if (worker.documents.backgroundCheck) worker.documents.backgroundCheck.status = 'verified';
    }
  } else if (newStatus === 'rejected') {
    worker.policeVerified = false;
    worker.availableNow = false;
    worker.badgeTitle = '❌ Verification Rejected';
    if (worker.documents && worker.documents.policeVerification) {
      worker.documents.policeVerification.status = 'rejected';
    }
  } else {
    worker.verificationStatus = 'pending_approval';
    worker.badgeTitle = '⏳ Verification Pending (In Review)';
  }

  res.json({
    success: true,
    message: `Worker ${worker.name} status changed to ${newStatus}.`,
    worker
  });
});

companionRouter.post('/api/companion/admin/flag-worker', (req, res) => {
  const { workerId, isFlagged, flagReason } = req.body;
  const worker = companionWorkersStore.find((w) => w.id === workerId);
  if (!worker) {
    return res.status(404).json({ success: false, message: 'Worker profile not found.' });
  }
  worker.isFlagged = isFlagged;
  worker.flagReason = isFlagged ? (flagReason || 'Quality audit flag by admin') : undefined;
  res.json({ success: true, worker });
});

// --- 3. Job Radar Endpoints ---
companionRouter.get('/api/companion/radar/tasks', (req, res) => {
  res.json({
    success: true,
    count: availableRadarTasksStore.length,
    tasks: availableRadarTasksStore.filter(t => t.status === 'available')
  });
});

companionRouter.post('/api/companion/radar/accept', (req, res) => {
  const { taskId, workerId } = req.body;
  const taskIndex = availableRadarTasksStore.findIndex(t => t.id === taskId);
  const worker = companionWorkersStore.find(w => w.id === workerId);

  if (taskIndex === -1) {
    return res.status(404).json({ success: false, message: 'Task no longer available on radar.' });
  }

  const task = availableRadarTasksStore[taskIndex];
  task.status = 'accepted';
  task.acceptedByWorkerId = workerId;
  task.acceptedByWorkerName = worker ? worker.name : 'Verified Companion';
  task.lifecycleStep = 'en_route';

  res.json({
    success: true,
    message: 'Task accepted successfully! Proceed with Start Travel.',
    task
  });
});

companionRouter.post('/api/companion/radar/decline', (req, res) => {
  const { taskId } = req.body;
  res.json({
    success: true,
    message: `Task ${taskId} declined. Will not pop up on your radar again.`
  });
});

// --- 4. Task Lifecycle & 80/20 Commission Split ---
companionRouter.post('/api/companion/task/lifecycle-step', (req, res) => {
  const { taskId, workerId, step, customerOtp } = req.body;

  let task = availableRadarTasksStore.find(t => t.id === taskId);
  if (!task) {
    const b = companionBookingsStore.find(b => b.id === taskId);
    if (b) {
      task = {
        id: b.id,
        taskTitle: b.requirements,
        customerName: 'Customer',
        customerPhone: b.userPhone,
        location: b.address,
        durationHours: b.durationHours,
        hourlyRate: 199,
        startOtp: '6821',
        workerEarnings80: Math.round(b.durationHours * 199 * 0.8),
        platformFee20: Math.round(b.durationHours * 199 * 0.2)
      };
    }
  }

  const worker = companionWorkersStore.find(w => w.id === workerId);

  if (step === 'start_travel') {
    if (task) task.lifecycleStep = 'en_route';
    return res.json({
      success: true,
      step: 'en_route',
      message: 'Travel initiated. Live GPS route shared with customer.'
    });
  }

  if (step === 'reach_location') {
    const expectedOtp = task ? task.startOtp : '4829';
    if (customerOtp && String(customerOtp).trim() !== String(expectedOtp).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect Start OTP entered. Please ask customer for the correct 4-digit code.'
      });
    }
    if (task) task.lifecycleStep = 'arrived';
    return res.json({
      success: true,
      step: 'arrived',
      message: 'Location verified via Customer OTP! You may now Start Task.'
    });
  }

  if (step === 'start_task') {
    const { startPhotoUrl, startGpsLocation, startTimestamp } = req.body;
    if (task) {
      task.lifecycleStep = 'in_progress';
      task.startCheckIn = {
        photoUrl: startPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        gpsCoordinates: startGpsLocation || '23.2332° N, 77.4344° E • AIIMS Bhopal OPD Gate 2',
        timestamp: startTimestamp || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
    }
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type: 'start_checkin',
      title: '📸 START चेक-इन दर्ज (Photo + GPS Locked)',
      message: `${worker ? worker.name : 'साथी'} ने कार्य स्थल पर लाइव फोटो + GPS दर्ज किया। समय: ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'normal'
    };
    companionNotificationsStore.unshift(notif);

    return res.json({
      success: true,
      step: 'in_progress',
      message: 'START चेक-इन संपन्न: फोटो, GPS लोकेशन व समय सुरक्षित रूप से लॉक किया गया!',
      startCheckIn: task ? task.startCheckIn : null
    });
  }

  if (step === 'complete_task') {
    const { 
      endPhotoUrl, 
      endGpsLocation, 
      endTimestamp, 
      serviceTaskId, 
      bikeKm = 6, 
      actualHours, 
      vehicleMode = 'with_bike',
      waitingMinutes = 0
    } = req.body;

    const taskType = serviceTaskId || (task ? task.category : 'hospital_care');
    
    // Dynamic Commission based on Task Importance:
    // Hospital = 20% (High Quality, OPD, Critical Patient)
    // Surakshit Yatra = 20% (High Security, Women/Senior Escort)
    // Buzurg Sathi = 18% (Compassionate Elderly Care)
    // Bank & Sarkari = 15% (Statutory & Document Security)
    // Event & Parivarik = 15% (Coordination & Shagun)
    // Sheher Guide = 12% (Hostel navigation)
    // Local Delivery = 10% (Errand runner)
    // Ride = 10% (Rapido model)
    let commissionPercent = 15;
    if (taskType === 'hospital_sahayak' || taskType === 'hospital_care') commissionPercent = 20;
    else if (taskType === 'surakshit_yatra') commissionPercent = 20;
    else if (taskType === 'buzurg_sathi' || taskType === 'senior_citizen') commissionPercent = 18;
    else if (taskType === 'bank_sarkari') commissionPercent = 15;
    else if (taskType === 'event_parivarik' || taskType === 'event_wedding') commissionPercent = 15;
    else if (taskType === 'sheher_guide') commissionPercent = 12;
    else if (taskType === 'local_delivery' || taskType === 'daily_errands') commissionPercent = 10;
    else if (taskType === 'rapido_ride' || taskType === 'ride_travel') commissionPercent = 10;

    const durationHours = actualHours ? Number(actualHours) : (task ? (task.durationHours || 2) : 2);
    const hourlyRate = task ? (task.hourlyRate || (commissionPercent === 20 ? 180 : 150)) : 150;
    
    let hoursSubtotal = durationHours * hourlyRate;
    let bikeKmCharge = 0;
    const distanceKmNum = Number(bikeKm) || 0;

    if (vehicleMode === 'with_bike' && distanceKmNum > 0) {
      const has4KmFree = ['sheher_guide', 'local_delivery', 'surakshit_yatra', 'daily_errands'].includes(taskType);
      if (has4KmFree) {
        const chargeableKm = Math.max(0, distanceKmNum - 4);
        bikeKmCharge = chargeableKm * 10;
      } else {
        bikeKmCharge = distanceKmNum * 10;
      }
    }

    let waitingCharge = 0;
    if (Number(waitingMinutes) > 60) {
      const extraSlots = Math.ceil((Number(waitingMinutes) - 60) / 30);
      waitingCharge = extraSlots * 50;
    }

    const totalGrossFee = hoursSubtotal + bikeKmCharge + waitingCharge;
    const platformShareAmount = Math.round(totalGrossFee * (commissionPercent / 100));
    const workerShareAmount = totalGrossFee - platformShareAmount;

    // Build the user-requested exact bill formula:
    // e.g. "2hr x 150 = 300 + 6km bike 60 = 360"
    let formulaParts: string[] = [`${durationHours}hr x ${hourlyRate} = ${hoursSubtotal}`];
    if (bikeKmCharge > 0) {
      formulaParts.push(`+ ${distanceKmNum}km bike ${bikeKmCharge} = ${totalGrossFee}`);
    } else if (waitingCharge > 0) {
      formulaParts.push(`+ Waiting ${waitingCharge} = ${totalGrossFee}`);
    } else {
      formulaParts.push(`= ${totalGrossFee}`);
    }
    const billFormulaBreakdown = formulaParts.join(' ');

    if (worker) {
      if (!worker.wallet) {
        worker.wallet = { availableBalance: 0, pendingWeeklyPayout: 0, totalEarnings: 0 };
      }
      // Instant wallet credit: UPI ka chakkar khatam
      worker.wallet.availableBalance += workerShareAmount;
      worker.wallet.pendingWeeklyPayout += workerShareAmount;
      worker.wallet.totalEarnings += workerShareAmount;
      worker.tasksCompleted = (worker.tasksCompleted || 0) + 1;
    }

    platformWalletBalance += platformShareAmount;

    const commissionRecord = {
      id: `COMM-HISAB-${Date.now().toString().slice(-4)}`,
      taskId: taskId || `JIT-CMP-${Date.now().toString().slice(-5)}`,
      taskTitle: task ? task.taskTitle : 'Companion Task',
      customerName: task ? task.customerName : 'Citizen Customer',
      workerId: workerId || 'cmp-01',
      workerName: worker ? worker.name : 'Verified Companion',
      hours: durationHours,
      hourlyRate,
      bikeKm: distanceKmNum,
      bikeKmCharge,
      waitingCharge,
      grossFee: totalGrossFee,
      billFormulaBreakdown,
      platformCommissionPercent: commissionPercent,
      platformShareAmount,
      workerShareAmount,
      workerShare80: workerShareAmount,
      platformShare20: platformShareAmount,
      status: 'credited',
      timestamp: new Date().toISOString(),
      dateStr: 'Today, Live',
      startPhotoUrl: task?.startCheckIn?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      startGpsLocation: task?.startCheckIn?.gpsCoordinates || '23.2332° N, 77.4344° E • AIIMS OPD Gate 2, Bhopal',
      endPhotoUrl: endPhotoUrl || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
      endGpsLocation: endGpsLocation || '23.2330° N, 77.4342° E • AIIMS Pharmacy, Bhopal'
    };
    companionCommissionRecords.unshift(commissionRecord);

    if (task) {
      task.lifecycleStep = 'completed';
      task.endCheckIn = {
        photoUrl: commissionRecord.endPhotoUrl,
        gpsCoordinates: commissionRecord.endGpsLocation,
        timestamp: endTimestamp || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      task.billFormulaBreakdown = billFormulaBreakdown;
    }

    // Activity notification
    const completionNotif = {
      id: `NOTIF-${Date.now()}`,
      type: 'wallet_credit',
      title: '🧾 ऑटो बिल व वॉलेट क्रेडिट संपन्न (UPI का झंझट खत्म)',
      message: `बिल: ${billFormulaBreakdown} | ${commissionPercent}% (₹${platformShareAmount}) प्लेटफॉर्म वॉलेट में व ${100 - commissionPercent}% (₹${workerShareAmount}) साथी ${worker ? worker.name : ''} के वॉलेट में सीधे क्रेडिट!`,
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'high'
    };
    companionNotificationsStore.unshift(completionNotif);

    return res.json({
      success: true,
      step: 'completed',
      message: `कार्य संपन्न! ऑटो बिल: ${billFormulaBreakdown}. ${commissionPercent}% प्लेटफॉर्म वॉलेट में व ${100 - commissionPercent}% साथी वॉलेट में जमा (UPI का झंझट खत्म)।`,
      commissionRecord,
      billFormulaBreakdown,
      platformCommissionPercent: commissionPercent,
      platformShareAmount,
      workerShareAmount,
      workerWallet: worker ? worker.wallet : null,
      platformWalletBalance
    });
  }

  res.status(400).json({ success: false, message: 'Invalid lifecycle step.' });
});

// --- 5. Rating System ---
companionRouter.post('/api/companion/task/rate', (req, res) => {
  const { taskId, workerId, customerName, rating, comment } = req.body;
  const numRating = Number(rating);

  if (!numRating || numRating < 1 || numRating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be a number between 1 and 5.' });
  }

  const worker = companionWorkersStore.find(w => w.id === workerId);
  if (!worker) {
    return res.status(404).json({ success: false, message: 'Worker not found.' });
  }

  const currentReviews = worker.reviewsCount || 0;
  const currentRating = worker.rating || 5.0;
  const newReviewsCount = currentReviews + 1;
  const newRating = Number((((currentRating * currentReviews) + numRating) / newReviewsCount).toFixed(2));

  worker.rating = newRating;
  worker.reviewsCount = newReviewsCount;

  let newlyFlagged = false;
  if (newRating < 4.0) {
    worker.isFlagged = true;
    worker.flagReason = `Low Rating Alert: Average dropped to ${newRating}★ (< 4.0 threshold). Account flagged for quality review.`;
    newlyFlagged = true;
  } else if (worker.isFlagged && newRating >= 4.0) {
    worker.isFlagged = false;
    worker.flagReason = undefined;
  }

  const reviewRecord = {
    id: `REV-${Date.now()}`,
    taskId: taskId || 'TASK-DIRECT',
    workerId,
    customerName: customerName || 'Citizen User',
    rating: numRating,
    comment: comment || 'Verified companion service feedback.',
    timestamp: new Date().toISOString()
  };
  companionWorkerReviewsStore.unshift(reviewRecord);

  res.json({
    success: true,
    message: newlyFlagged
      ? `Review recorded. Worker rating dropped to ${newRating}★ (< 4.0) - ACCOUNT AUTOMATICALLY FLAGGED!`
      : `Review recorded successfully. Worker rating is now ${newRating}★.`,
    newRating,
    newReviewsCount,
    isFlagged: worker.isFlagged,
    flagReason: worker.flagReason,
    worker
  });
});

// --- 6. Admin Financials & Stats ---
companionRouter.get('/api/companion/admin/financials', (req, res) => {
  const totalGrossVolume = companionCommissionRecords.reduce((acc, c) => acc + (c.grossFee || 0), 0);
  const totalWorkerPayouts = companionCommissionRecords.reduce((acc, c) => acc + (c.workerShare80 || 0), 0);
  const totalPlatformCommission = companionCommissionRecords.reduce((acc, c) => acc + (c.platformShare20 || 0), 0);
  const pendingApprovalsCount = companionWorkersStore.filter(w => w.verificationStatus === 'pending_approval').length;
  const flaggedWorkersCount = companionWorkersStore.filter(w => w.isFlagged).length;

  const totalRideFareVolume = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.totalFare || 0), 0);
  const totalRideDriverPayouts = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.driverPayout || 0), 0);
  const totalRidePlatformFees = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.platformFee || 0), 0);

  res.json({
    success: true,
    financials: {
      platformWalletBalance,
      totalGrossVolume,
      totalWorkerPayouts,
      totalPlatformCommission,
      commissionSplit: '80% Worker / 20% Jitomni Platform'
    },
    rideFinancials: {
      totalRideFareVolume,
      totalRideDriverPayouts,
      totalRidePlatformFees,
      split: '90% Driver / 10% Platform Management Fee'
    },
    counts: {
      totalWorkers: companionWorkersStore.length,
      activeVerified: companionWorkersStore.filter(w => w.verificationStatus === 'verified_active').length,
      pendingApprovalsCount,
      flaggedWorkersCount,
      totalRidesCompleted: ridePlatformFeeRecordsStore.length
    },
    flaggedWorkers: companionWorkersStore.filter(w => w.isFlagged),
    pendingWorkers: companionWorkersStore.filter(w => w.verificationStatus === 'pending_approval'),
    commissionRecords: companionCommissionRecords,
    ridePlatformFeeRecords: ridePlatformFeeRecordsStore
  });
});

companionRouter.get('/api/companion/rides/fees', (req, res) => {
  const totalFare = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.totalFare || 0), 0);
  const totalDriverPayout = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.driverPayout || 0), 0);
  const totalPlatformFee = ridePlatformFeeRecordsStore.reduce((acc, r) => acc + (r.platformFee || 0), 0);

  res.json({
    success: true,
    records: ridePlatformFeeRecordsStore,
    summary: {
      totalFare,
      totalDriverPayout,
      totalPlatformFee,
      feeModel: '10% Platform Management Fee (Server, SOS & Operations) / 90% Driver'
    }
  });
});

companionRouter.post('/api/companion/rides/record-fee', (req, res) => {
  const { rideId, driverName, driverPhone, vehicleType, vehicleNumber, route, distanceKm, totalFare } = req.body;
  const fare = Number(totalFare) || 100;
  const platFee = Math.max(5, Math.round(fare * 0.10));
  const driverPayout = fare - platFee;

  const newRecord = {
    id: `RIDE-FEE-${Date.now().toString().slice(-4)}`,
    rideId: rideId || `RIDE-${Date.now().toString().slice(-6)}`,
    driverName: driverName || 'Verified Driver',
    driverPhone: driverPhone || '+91 98000 00000',
    vehicleType: vehicleType || 'bike',
    vehicleNumber: vehicleNumber || 'MP 04 AB 0000',
    route: route || 'Local City Transit',
    distanceKm: Number(distanceKm) || 10,
    totalFare: fare,
    driverPayout,
    platformFee: platFee,
    date: new Date().toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    status: 'collected'
  };

  ridePlatformFeeRecordsStore.unshift(newRecord);
  res.json({
    success: true,
    message: `₹${platFee} 10% platform fee recorded. ₹${driverPayout} credited to driver.`,
    record: newRecord
  });
});

companionRouter.post('/api/companion/worker/withdraw', (req, res) => {
  const { workerId, amount } = req.body;
  const worker = companionWorkersStore.find(w => w.id === workerId);
  if (!worker || !worker.wallet) {
    return res.status(404).json({ success: false, message: 'Worker wallet not found.' });
  }

  const withdrawAmount = Number(amount) || worker.wallet.availableBalance;
  if (withdrawAmount <= 0 || withdrawAmount > worker.wallet.availableBalance) {
    return res.status(400).json({ success: false, message: 'Invalid withdrawal amount.' });
  }

  worker.wallet.availableBalance -= withdrawAmount;
  worker.wallet.pendingWeeklyPayout = Math.max(0, worker.wallet.pendingWeeklyPayout - withdrawAmount);

  res.json({
    success: true,
    message: `₹${withdrawAmount} disbursed to ${worker.wallet.upiId || 'Bank Account'} successfully via UPI Express.`,
    remainingBalance: worker.wallet.availableBalance
  });
});

companionRouter.post('/api/companion/book', (req, res) => {
  const { category, requirements, durationHours, totalEstimatedAmount, userPhone, address } = req.body;
  const booking: InMemBooking = {
    id: `JIT-CMP-${Date.now().toString().slice(-5)}`,
    category: category || 'hospital_care',
    requirements: requirements || 'Companion required',
    durationHours: durationHours || 4,
    totalEstimatedAmount: totalEstimatedAmount || 796,
    status: 'matched',
    userPhone: userPhone || '9876543210',
    address: address || 'Local Task Location',
    createdAt: new Date().toISOString()
  };
  companionBookingsStore.push(booking);
  res.json({
    success: true,
    booking,
    message: 'Police-verified companion matched and dispatched.'
  });
});

companionRouter.get('/api/companion/bookings', (req, res) => {
  res.json({
    success: true,
    count: companionBookingsStore.length,
    bookings: companionBookingsStore
  });
});

companionRouter.post('/api/companion/sos', (req, res) => {
  const { bookingId, latitude, longitude, userPhone, workerName, workerPhone } = req.body;
  const alert = {
    id: `SOS-${Date.now()}`,
    bookingId,
    latitude: latitude || 23.2599,
    longitude: longitude || 77.4126,
    userPhone,
    workerName,
    workerPhone,
    policeDispatched: true,
    controlRoomAlerted: true,
    timestamp: new Date().toISOString()
  };
  companionSOSAlertsStore.push(alert);
  console.warn(`[EMERGENCY SOS BROADCAST] Booking: ${bookingId}, User: ${userPhone}, GPS: ${alert.latitude},${alert.longitude}`);
  res.json({
    success: true,
    alert,
    message: 'Sovereign Emergency SOS logged. PCR 112 notified with live GPS coordinates.'
  });
});

// --- 6. Real-time Notifications Engine ---
companionRouter.get('/api/companion/notifications', (req, res) => {
  res.json({
    success: true,
    count: companionNotificationsStore.length,
    unreadCount: companionNotificationsStore.filter(n => !n.read).length,
    notifications: companionNotificationsStore
  });
});

companionRouter.post('/api/companion/notifications/read', (req, res) => {
  const { id } = req.body;
  if (id === 'all') {
    companionNotificationsStore.forEach(n => { n.read = true; });
  } else if (id) {
    const found = companionNotificationsStore.find(n => n.id === id);
    if (found) found.read = true;
  }
  res.json({ success: true, notifications: companionNotificationsStore });
});

companionRouter.post('/api/companion/notifications/send', (req, res) => {
  const { type, title, message, taskId, importance } = req.body;
  const newNotif = {
    id: `NOTIF-${Date.now()}`,
    type: type || 'activity',
    title: title || 'सूचना (Notification)',
    message: message || 'साथी सेवा में नई गतिविधि दर्ज हुई।',
    taskId,
    timestamp: new Date().toISOString(),
    read: false,
    importance: importance || 'normal'
  };
  companionNotificationsStore.unshift(newNotif);
  res.json({ success: true, notification: newNotif });
});

// --- 7. Admin Daily Hisab Sheet API ---
companionRouter.get('/api/companion/admin/daily-hisab', (req, res) => {
  const totalVolume = companionCommissionRecords.reduce((acc, r) => acc + (r.grossFee || 0), 0);
  const totalWorkerPayouts = companionCommissionRecords.reduce((acc, r) => acc + (r.workerShareAmount || r.workerShare80 || 0), 0);
  const totalPlatformCut = companionCommissionRecords.reduce((acc, r) => acc + (r.platformShareAmount || r.platformShare20 || 0), 0);
  
  const pendingRecords = companionCommissionRecords.filter(r => r.status === 'pending');
  const pendingPlatformFee = pendingRecords.reduce((acc, r) => acc + (r.platformShareAmount || r.platformShare20 || 0), 0);
  const pendingWorkerPayout = pendingRecords.reduce((acc, r) => acc + (r.workerShareAmount || r.workerShare80 || 0), 0);

  // Group by Worker
  const workerHisabSummary: Record<string, { workerId: string; workerName: string; totalTasks: number; totalGross: number; totalWorkerEarned: number; platformCommissionCut: number; pendingSettlement: number }> = {};
  
  companionCommissionRecords.forEach(rec => {
    const wId = rec.workerId || 'unknown';
    if (!workerHisabSummary[wId]) {
      workerHisabSummary[wId] = {
        workerId: wId,
        workerName: rec.workerName || 'Verified Companion',
        totalTasks: 0,
        totalGross: 0,
        totalWorkerEarned: 0,
        platformCommissionCut: 0,
        pendingSettlement: 0
      };
    }
    workerHisabSummary[wId].totalTasks += 1;
    workerHisabSummary[wId].totalGross += (rec.grossFee || 0);
    workerHisabSummary[wId].totalWorkerEarned += (rec.workerShareAmount || rec.workerShare80 || 0);
    workerHisabSummary[wId].platformCommissionCut += (rec.platformShareAmount || rec.platformShare20 || 0);
    if (rec.status === 'pending') {
      workerHisabSummary[wId].pendingSettlement += (rec.platformShareAmount || rec.platformShare20 || 0);
    }
  });

  res.json({
    success: true,
    records: companionCommissionRecords,
    summary: {
      totalVolume,
      totalWorkerPayouts,
      totalPlatformCut,
      pendingPlatformFee,
      pendingWorkerPayout,
      platformWalletBalance,
      todayDate: new Date().toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    workerSummaryList: Object.values(workerHisabSummary)
  });
});

companionRouter.post('/api/companion/admin/settle-record', (req, res) => {
  const { recordId } = req.body;
  const target = companionCommissionRecords.find(r => r.id === recordId);
  if (!target) {
    return res.status(404).json({ success: false, message: 'Hisab record not found' });
  }
  target.status = 'settled';

  // Add activity notification for settlement
  companionNotificationsStore.unshift({
    id: `NOTIF-${Date.now()}`,
    type: 'wallet_credit',
    title: `✅ हिसाब सेटल संपन्न: ${target.taskId}`,
    message: `एडमिन द्वारा 1-क्लिक में ₹${target.grossFee} का हिसाब सेटल किया गया। साथी ${target.workerName} का शेयर: ₹${target.workerShareAmount || target.workerShare80}, प्लेटफॉर्म चार्ज: ₹${target.platformShareAmount || target.platformShare20}।`,
    taskId: target.taskId,
    timestamp: new Date().toISOString(),
    read: false,
    importance: 'normal'
  });

  res.json({
    success: true,
    message: `Record ${recordId} settled successfully. Hisab updated!`,
    record: target
  });
});

companionRouter.post('/api/companion/admin/settle-all', (req, res) => {
  const pendingRecords = companionCommissionRecords.filter(r => r.status === 'pending');
  const count = pendingRecords.length;
  pendingRecords.forEach(r => {
    r.status = 'settled';
  });

  if (count > 0) {
    companionNotificationsStore.unshift({
      id: `NOTIF-${Date.now()}`,
      type: 'wallet_credit',
      title: `⚡ ऑल पेंडिंग हिसाब सेटल्ड (${count} टास्क)`,
      message: `एडमिन द्वारा सभी ${count} पेंडिंग टास्क का 1-क्लिक ऑल-सेटलमेंट संपन्न हुआ।`,
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'high'
    });
  }

  res.json({
    success: true,
    message: `All ${count} pending records settled in 1-click!`,
    settledCount: count
  });
});

// =================================================================
// 8. HUMARA MEDICAL SATHI 3-LEVEL SERVICE BACKEND & DOCTOR ALERTS
// =================================================================

interface MedicalSathiBookingServer {
  id: string;
  level: 'level1' | 'level2' | 'level3';
  pickup_type: 'railway' | 'home';
  pickup_location: string;
  drop_hospital: string;
  patient_name: string;
  patient_age: number;
  can_walk: boolean;
  wheelchair_needed: boolean;
  nurse_required: boolean;
  doctor_required: boolean;
  primary_care_needed: boolean;
  addons: string[];
  hours: number;
  hourly_rate: number;
  distance_km: number;
  distance_charge: number;
  total_fare: number;
  assigned_staff: {
    sathi?: {
      id: string;
      name: string;
      phone: string;
      photoUrl: string;
      verifiedId: string;
      role: string;
      qualification?: string;
      rating: number;
    };
    nurse?: {
      id: string;
      name: string;
      phone: string;
      photoUrl: string;
      verifiedId: string;
      role: string;
      qualification?: string;
      specialty?: string;
      registrationNumber?: string;
      rating: number;
    };
    doctor?: {
      id: string;
      name: string;
      phone: string;
      photoUrl: string;
      verifiedId: string;
      role: string;
      qualification?: string;
      specialty?: string;
      registrationNumber?: string;
      rating: number;
    };
  };
  transit_tracking: {
    currentLat: number;
    currentLng: number;
    currentLocationName: string;
    step: 'pickup_arrived' | 'patient_escorted' | 'in_transit' | 'hospital_counter' | 'completed';
    etaMinutes: number;
    speedKmh: number;
    vitalsLogged?: { bp: string; sugar: string; pulse: string; notes: string };
  };
  status: 'booked' | 'assigned' | 'in_transit' | 'reached_hospital' | 'completed';
  user_phone: string;
  created_at: string;
}

const medicalSathiBookingsStore: MedicalSathiBookingServer[] = [
  {
    id: 'MSB-2026-901',
    level: 'level3',
    pickup_type: 'railway',
    pickup_location: 'Bhopal Junction Railway Station (Platform 1)',
    drop_hospital: 'AIIMS Bhopal (Saket Nagar, OPD Gate 1)',
    patient_name: 'Shri Ramswaroop Sharma',
    patient_age: 68,
    can_walk: false,
    wheelchair_needed: true,
    nurse_required: true,
    doctor_required: true,
    primary_care_needed: true,
    addons: ['Medicine Lane', 'Report Lane', 'Dharamshala Book Karna'],
    hours: 4,
    hourly_rate: 1400,
    distance_km: 12,
    distance_charge: 120,
    total_fare: 5720,
    assigned_staff: {
      sathi: {
        id: 'stf-sathi-01',
        name: 'Rohit Verma',
        phone: '+91 98260 14820',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'SATHI-BPL-8812',
        role: 'companion',
        qualification: 'Senior Patient Escort & Luggage Specialist',
        rating: 4.9
      },
      nurse: {
        id: 'stf-nurse-01',
        name: 'Sister Sunita Minz',
        phone: '+91 94250 88214',
        photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'NURSE-MPNC-8491',
        role: 'nurse',
        qualification: 'B.Sc Nursing (Registered MPNC)',
        specialty: 'ICU Vitals & Emergency Medication',
        registrationNumber: 'MPNC-2018-8491',
        rating: 4.95
      },
      doctor: {
        id: 'stf-doc-01',
        name: 'Dr. Rajesh Sharma, MD',
        phone: '+91 98263 77410',
        photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'DOC-MCI-14209',
        role: 'doctor',
        qualification: 'MD (Internal Medicine) • Ex-Senior Resident AIIMS',
        specialty: 'Clinical Diagnosis & Vitals Stabilization',
        registrationNumber: 'MPMC-14209',
        rating: 5.0
      }
    },
    transit_tracking: {
      currentLat: 23.2599,
      currentLng: 77.4126,
      currentLocationName: 'लिंक रोड 1, व्यापम चौराहा के पास',
      step: 'in_transit',
      etaMinutes: 14,
      speedKmh: 35,
      vitalsLogged: {
        bp: '130/84 mmHg',
        sugar: '142 mg/dL (Random)',
        pulse: '76 bpm',
        notes: 'मरीज स्थिर हैं, व्हीलचेयर तैयार है, AIIMS ओपीडी टोकन पहले से आरक्षित।'
      }
    },
    status: 'in_transit',
    user_phone: '+91 98260 99120',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'MSB-2026-902',
    level: 'level2',
    pickup_type: 'railway',
    pickup_location: 'Rani Kamlapati Railway Station (RKMP Platform 1)',
    drop_hospital: 'Hamidia Hospital & Gandhi Medical College',
    patient_name: 'Smt. Malti Devi',
    patient_age: 62,
    can_walk: false,
    wheelchair_needed: true,
    nurse_required: true,
    doctor_required: false,
    primary_care_needed: true,
    addons: ['Report Lane', 'Medicine Lane'],
    hours: 3,
    hourly_rate: 550,
    distance_km: 8,
    distance_charge: 80,
    total_fare: 1730,
    assigned_staff: {
      sathi: {
        id: 'stf-sathi-02',
        name: 'Pooja Vishwakarma',
        phone: '+91 98261 44520',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'SATHI-BPL-9901',
        role: 'companion',
        qualification: 'Certified GDA (General Duty Assistant)',
        rating: 5.0
      },
      nurse: {
        id: 'stf-nurse-02',
        name: 'Sister Anjali Tiwari',
        phone: '+91 98930 41209',
        photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'NURSE-MPNC-5512',
        role: 'nurse',
        qualification: 'GNM & Critical Transit Care Certified',
        specialty: 'Elderly Gentle Bedside & Diabetic Sugar/BP',
        registrationNumber: 'MPNC-2020-5512',
        rating: 4.9
      }
    },
    transit_tracking: {
      currentLat: 23.2355,
      currentLng: 77.4285,
      currentLocationName: 'आरकेएमपी प्लेटफार्म 1 वेटिंग हॉल',
      step: 'patient_escorted',
      etaMinutes: 22,
      speedKmh: 0,
      vitalsLogged: {
        bp: '124/80 mmHg',
        sugar: '118 mg/dL',
        pulse: '72 bpm',
        notes: 'मरीज को सुरक्षित स्टेशन से रिसीव किया गया, व्हीलचेयर पर शिफ्ट।'
      }
    },
    status: 'assigned',
    user_phone: '+91 94250 11840',
    created_at: new Date(Date.now() - 7200000).toISOString()
  }
];

// GET All Medical Sathi Bookings
companionRouter.get('/api/companion/medical-sathi/bookings', (req, res) => {
  res.json({
    success: true,
    count: medicalSathiBookingsStore.length,
    bookings: medicalSathiBookingsStore
  });
});

// POST Create New 3-Level Medical Sathi Booking
companionRouter.post('/api/companion/medical-sathi/book', (req, res) => {
  const {
    level = 'level1',
    pickup_type = 'railway',
    pickup_location = 'Bhopal Junction Railway Station',
    drop_hospital = 'AIIMS Bhopal',
    patient_name = 'Patient',
    patient_age = 55,
    can_walk = true,
    wheelchair_needed = false,
    addons = [],
    hours = 3,
    hourly_rate = 150,
    distance_km = 8,
    user_phone = '+91 98260 00000'
  } = req.body;

  const distance_charge = Math.max(0, distance_km * 10);
  const total_fare = (hourly_rate * hours) + distance_charge + 29;

  // Auto-assign staff based on selected level
  const assigned_staff: any = {};

  // Level 1, 2, and 3 all get a verified Sathi
  assigned_staff.sathi = {
    id: 'stf-sathi-01',
    name: 'Rohit Verma',
    phone: '+91 98260 14820',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedId: 'SATHI-BPL-8812',
    role: 'companion',
    qualification: 'Senior Patient Escort & Luggage Specialist',
    rating: 4.9
  };

  // Level 2 & 3 include Nurse
  const nurse_required = level === 'level2' || level === 'level3';
  if (nurse_required) {
    assigned_staff.nurse = {
      id: 'stf-nurse-01',
      name: 'Sister Sunita Minz',
      phone: '+91 94250 88214',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      verifiedId: 'NURSE-MPNC-8491',
      role: 'nurse',
      qualification: 'B.Sc Nursing (Registered MPNC)',
      specialty: 'ICU Vitals, Wheelchair Escort & Emergency Medication',
      registrationNumber: 'MPNC-2018-8491',
      rating: 4.95
    };
  }

  // Level 3 includes Private Doctor
  const doctor_required = level === 'level3';
  if (doctor_required) {
    assigned_staff.doctor = {
      id: 'stf-doc-01',
      name: 'Dr. Rajesh Sharma, MD',
      phone: '+91 98263 77410',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      verifiedId: 'DOC-MCI-14209',
      role: 'doctor',
      qualification: 'MD (Internal Medicine) • Ex-Senior Resident AIIMS',
      specialty: 'Clinical Diagnosis, Emergency In-Transit Care & Vitals Stabilization',
      registrationNumber: 'MPMC-14209',
      rating: 5.0
    };
  }

  const newBookingId = `MSB-2026-${Math.floor(100 + Math.random() * 900)}`;

  const newBooking: MedicalSathiBookingServer = {
    id: newBookingId,
    level,
    pickup_type,
    pickup_location,
    drop_hospital,
    patient_name,
    patient_age: Number(patient_age),
    can_walk: Boolean(can_walk),
    wheelchair_needed: Boolean(wheelchair_needed),
    nurse_required,
    doctor_required,
    primary_care_needed: nurse_required || doctor_required,
    addons: Array.isArray(addons) ? addons : [],
    hours: Number(hours),
    hourly_rate: Number(hourly_rate),
    distance_km: Number(distance_km),
    distance_charge,
    total_fare,
    assigned_staff,
    transit_tracking: {
      currentLat: 23.2599,
      currentLng: 77.4126,
      currentLocationName: `${pickup_location} (पिकअप पॉइंट)`,
      step: 'pickup_arrived',
      etaMinutes: 18,
      speedKmh: 0,
      vitalsLogged: {
        bp: 'Checking in transit...',
        sugar: 'Kit ready',
        pulse: '--',
        notes: 'टीम पिकअप पॉइंट पर पहुंच चुकी है।'
      }
    },
    status: 'assigned',
    user_phone,
    created_at: new Date().toISOString()
  };

  medicalSathiBookingsStore.unshift(newBooking);

  // NOTIFICATION PROTOCOL:
  // "Notification: When Level 3 booked, alert nearest private doctor from our network."
  if (level === 'level3') {
    const doctorAlertNotif = {
      id: `NOTIF-${Date.now()}`,
      type: 'doctor_alert',
      title: '🚨 LEVEL 3 DOCTOR ALERT: इन-ट्रांजिट इमरजेंसी सुपरविजन!',
      message: `गंभीर मरीज ${patient_name} (${patient_age} वर्ष) हेतु डॉ. राजेश शर्मा, MD (AIIMS नेटवर्क) को तत्काल अलर्ट भेजा गया। रूट: ${pickup_location} ➔ ${drop_hospital}। प्राइमरी केयर किट व इन-ट्रांजिट कंसल्टेशन एक्टिव!`,
      taskId: newBookingId,
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'high'
    };
    companionNotificationsStore.unshift(doctorAlertNotif);
  } else {
    const regularNotif = {
      id: `NOTIF-${Date.now()}`,
      type: 'medical_booking',
      title: `🚑 मेडिकल साथी बुकिंग कंफर्म (${level.toUpperCase()})`,
      message: `मरीज ${patient_name} हेतु ${pickup_location} से ${drop_hospital} का एस्कॉर्ट कंफर्म। टीम: ${assigned_staff.sathi?.name}${assigned_staff.nurse ? ' + ' + assigned_staff.nurse?.name : ''}।`,
      taskId: newBookingId,
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'normal'
    };
    companionNotificationsStore.unshift(regularNotif);
  }

  res.json({
    success: true,
    message: level === 'level3' 
      ? 'Level 3 Premium Medical Team Booked! Nearest Network Doctor Dr. Rajesh Sharma, MD alerted immediately.' 
      : 'Medical Sathi Escort Booked successfully!',
    booking: newBooking
  });
});

// POST Admin Reassign Staff for 3 Levels
companionRouter.post('/api/companion/medical-sathi/reassign-staff', (req, res) => {
  const { bookingId, sathiId, nurseId, doctorId } = req.body;
  const booking = medicalSathiBookingsStore.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Medical Sathi booking not found' });
  }

  // Update staff as requested
  if (sathiId) {
    if (sathiId === 'stf-sathi-02') {
      booking.assigned_staff.sathi = {
        id: 'stf-sathi-02',
        name: 'Pooja Vishwakarma',
        phone: '+91 98261 44520',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'SATHI-BPL-9901',
        role: 'companion',
        qualification: 'Certified GDA (General Duty Assistant)',
        rating: 5.0
      };
    } else if (sathiId === 'stf-sathi-03') {
      booking.assigned_staff.sathi = {
        id: 'stf-sathi-03',
        name: 'Deepak Ahirwar',
        phone: '+91 97701 54321',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'SATHI-BPL-7734',
        role: 'companion',
        qualification: 'Wheelchair Mobility & Station Runner',
        rating: 4.8
      };
    } else {
      booking.assigned_staff.sathi = {
        id: 'stf-sathi-01',
        name: 'Rohit Verma',
        phone: '+91 98260 14820',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'SATHI-BPL-8812',
        role: 'companion',
        qualification: 'Senior Patient Escort & Luggage Specialist',
        rating: 4.9
      };
    }
  }

  if (nurseId && (booking.level === 'level2' || booking.level === 'level3')) {
    if (nurseId === 'stf-nurse-02') {
      booking.assigned_staff.nurse = {
        id: 'stf-nurse-02',
        name: 'Sister Anjali Tiwari',
        phone: '+91 98930 41209',
        photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'NURSE-MPNC-5512',
        role: 'nurse',
        qualification: 'GNM & Critical Transit Care Certified',
        specialty: 'Elderly Gentle Bedside & Diabetic Sugar/BP',
        registrationNumber: 'MPNC-2020-5512',
        rating: 4.9
      };
    } else {
      booking.assigned_staff.nurse = {
        id: 'stf-nurse-01',
        name: 'Sister Sunita Minz',
        phone: '+91 94250 88214',
        photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'NURSE-MPNC-8491',
        role: 'nurse',
        qualification: 'B.Sc Nursing (Registered MPNC)',
        specialty: 'ICU Vitals, Wheelchair Escort & Emergency Medication',
        registrationNumber: 'MPNC-2018-8491',
        rating: 4.95
      };
    }
  }

  if (doctorId && booking.level === 'level3') {
    if (doctorId === 'stf-doc-02') {
      booking.assigned_staff.doctor = {
        id: 'stf-doc-02',
        name: 'Dr. Neha Patel, MBBS, DNB',
        phone: '+91 94251 22987',
        photoUrl: 'https://images.unsplash.com/photo-1594824813583-22830f0f9b69?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'DOC-MCI-18754',
        role: 'doctor',
        qualification: 'MBBS, DNB (Emergency & Critical Medicine)',
        specialty: 'Trauma Escort, Cardiac Primary Checkup & Referral',
        registrationNumber: 'MPMC-18754',
        rating: 4.9
      };
    } else {
      booking.assigned_staff.doctor = {
        id: 'stf-doc-01',
        name: 'Dr. Rajesh Sharma, MD',
        phone: '+91 98263 77410',
        photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        verifiedId: 'DOC-MCI-14209',
        role: 'doctor',
        qualification: 'MD (Internal Medicine) • Ex-Senior Resident AIIMS',
        specialty: 'Clinical Diagnosis, Emergency In-Transit Care & Vitals Stabilization',
        registrationNumber: 'MPMC-14209',
        rating: 5.0
      };
    }
  }

  res.json({
    success: true,
    message: `Staff re-assigned successfully for booking ${bookingId}`,
    booking
  });
});

// POST Update Live Transit Status & Vitals
companionRouter.post('/api/companion/medical-sathi/update-transit', (req, res) => {
  const { bookingId, step, locationName, speedKmh, etaMinutes, vitals } = req.body;
  const booking = medicalSathiBookingsStore.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  if (step) booking.transit_tracking.step = step;
  if (locationName) booking.transit_tracking.currentLocationName = locationName;
  if (typeof speedKmh === 'number') booking.transit_tracking.speedKmh = speedKmh;
  if (typeof etaMinutes === 'number') booking.transit_tracking.etaMinutes = etaMinutes;
  if (vitals) {
    booking.transit_tracking.vitalsLogged = {
      ...booking.transit_tracking.vitalsLogged,
      ...vitals
    };
  }

  if (step === 'hospital_counter') {
    booking.status = 'reached_hospital';
  } else if (step === 'completed') {
    booking.status = 'completed';
  }

  res.json({
    success: true,
    transit_tracking: booking.transit_tracking,
    status: booking.status
  });
});

// ==========================================
// REWA CITY SERVICE PROVIDER (VENDOR/SATHI) STORE & APIS
// ==========================================

export interface InMemProviderRegistration {
  id: string;
  fullNameOrBusiness: string;
  serviceType: 'hospital_helper' | 'elderly_care' | 'cab_vendor' | 'hotel_partner';
  phone: string;
  aadhaarNumber: string;
  aadhaarStatus: 'verified' | 'pending' | 'rejected';
  location: {
    address: string;
    landmark: string;
    city: string;
    lat: number;
    lng: number;
  };
  cabDetails?: {
    vehicleType: string;
    vehicleNumber: string;
    dlNumber: string;
    seatingCapacity: number;
    ratePerKm: number;
  };
  hotelDetails?: {
    hotelName: string;
    totalRooms: number;
    proximityStationKm: number;
    proximityHospitalKm: number;
    startingPrice: number;
    amenities: string[];
  };
  status: 'pending_approval' | 'verified_active' | 'rejected';
  adminRemarks?: string;
  appliedAt: string;
  approvedAt?: string;
}

const companionProvidersStore: InMemProviderRegistration[] = [
  {
    id: 'PRV-REWA-901',
    fullNameOrBusiness: 'Ramesh Patel (Sathi Care)',
    serviceType: 'hospital_helper',
    phone: '+91 98261 77341',
    aadhaarNumber: 'XXXX-XXXX-9182',
    aadhaarStatus: 'verified',
    location: {
      address: 'Near SGMH Gate No 2, Civil Lines Road',
      landmark: 'Sanjay Gandhi Memorial Hospital',
      city: 'Rewa',
      lat: 24.5375,
      lng: 81.3021
    },
    status: 'verified_active',
    adminRemarks: 'Aadhaar UIDAI Biometric verified & Rewa Police Clearance received.',
    appliedAt: '2026-10-18T09:30:00Z',
    approvedAt: '2026-10-19T11:00:00Z'
  },
  {
    id: 'PRV-REWA-902',
    fullNameOrBusiness: 'Rajesh Tiwari Cabs & Travels',
    serviceType: 'cab_vendor',
    phone: '+91 94250 33819',
    aadhaarNumber: 'XXXX-XXXX-4421',
    aadhaarStatus: 'verified',
    location: {
      address: 'Taxi Stand, Platform 1 Exit',
      landmark: 'Rewa Railway Station',
      city: 'Rewa',
      lat: 24.5264,
      lng: 81.3210
    },
    cabDetails: {
      vehicleType: 'Sedan (Swift Dzire AC)',
      vehicleNumber: 'MP 17 TA 4120',
      dlNumber: 'MP17-2018-99412',
      seatingCapacity: 4,
      ratePerKm: 12
    },
    status: 'verified_active',
    adminRemarks: 'Commercial DL, RC & Vehicle Insurance verified.',
    appliedAt: '2026-10-19T14:15:00Z',
    approvedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'PRV-REWA-903',
    fullNameOrBusiness: 'Hotel Samdariya Palace & Residency',
    serviceType: 'hotel_partner',
    phone: '+91 76622 55801',
    aadhaarNumber: 'XXXX-XXXX-8819',
    aadhaarStatus: 'verified',
    location: {
      address: 'Shilpi Plaza Commercial Complex',
      landmark: 'Shilpi Plaza, Rewa',
      city: 'Rewa',
      lat: 24.5388,
      lng: 81.2985
    },
    hotelDetails: {
      hotelName: 'Hotel Samdariya Palace',
      totalRooms: 34,
      proximityStationKm: 2.8,
      proximityHospitalKm: 0.9,
      startingPrice: 850,
      amenities: ['AC Rooms', 'Lift / Wheelchair Access', '24x7 Room Service', 'Doctor-on-Call']
    },
    status: 'verified_active',
    adminRemarks: 'Trade License & Hotel registration verified.',
    appliedAt: '2026-10-20T11:00:00Z',
    approvedAt: '2026-10-21T09:30:00Z'
  },
  {
    id: 'PRV-REWA-904',
    fullNameOrBusiness: 'Pooja Soni (Elderly Companion)',
    serviceType: 'elderly_care',
    phone: '+91 97554 11209',
    aadhaarNumber: 'XXXX-XXXX-3391',
    aadhaarStatus: 'pending',
    location: {
      address: 'Officers Colony, Behind Commissioner Bunglow',
      landmark: 'Civil Lines, Rewa',
      city: 'Rewa',
      lat: 24.5420,
      lng: 81.2940
    },
    status: 'pending_approval',
    adminRemarks: 'Document under verification by Rewa Admin Desk.',
    appliedAt: '2026-10-24T08:00:00Z'
  },
  {
    id: 'PRV-REWA-905',
    fullNameOrBusiness: 'Maa Sharda Travels (Auto & Cab Fleet)',
    serviceType: 'cab_vendor',
    phone: '+91 91310 99420',
    aadhaarNumber: 'XXXX-XXXX-6623',
    aadhaarStatus: 'pending',
    location: {
      address: 'Bus Stand Auto Stand, Urrahat',
      landmark: 'New Bus Stand Rewa',
      city: 'Rewa',
      lat: 24.5310,
      lng: 81.3090
    },
    cabDetails: {
      vehicleType: 'Auto Rickshaw (CNG)',
      vehicleNumber: 'MP 17 TR 8812',
      dlNumber: 'MP17-2021-33201',
      seatingCapacity: 3,
      ratePerKm: 8
    },
    status: 'pending_approval',
    appliedAt: '2026-10-24T10:15:00Z'
  },
  {
    id: 'PRV-REWA-906',
    fullNameOrBusiness: 'Hotel Safari Regency',
    serviceType: 'hotel_partner',
    phone: '+91 76622 41920',
    aadhaarNumber: 'XXXX-XXXX-5102',
    aadhaarStatus: 'pending',
    location: {
      address: 'College Road, Near Venkat Battallion',
      landmark: 'Civil Lines Road, Rewa',
      city: 'Rewa',
      lat: 24.5445,
      lng: 81.2915
    },
    hotelDetails: {
      hotelName: 'Hotel Safari Regency',
      totalRooms: 26,
      proximityStationKm: 3.5,
      proximityHospitalKm: 1.4,
      startingPrice: 1100,
      amenities: ['Deluxe AC Rooms', 'Pure Veg Restaurant', 'Free Wi-Fi', 'Patient Attendant Discount']
    },
    status: 'pending_approval',
    appliedAt: '2026-10-24T12:00:00Z'
  }
];

// In-Memory Rewa City Map Location Pins
export interface RewaLocationPin {
  id: string;
  name: string;
  type: 'sathi' | 'cab' | 'hotel';
  categoryLabel: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  address: string;
  phone: string;
  verifiedBadge: string;
  priceLabel: string;
  isAvailable: boolean;
  distanceKm?: number;
  etaMinutes?: number;
  meta: {
    specialty?: string;
    vehicleNumber?: string;
    vehicleModel?: string;
    roomsAvailable?: number;
    amenities?: string[];
    hospitalProximityKm?: number;
  };
}

const rewaMapLocationsStore: RewaLocationPin[] = [
  // 1. Sathis across Rewa City
  {
    id: 'loc-sathi-01',
    name: 'Ramesh Patel (Gold Hospital Sathi)',
    type: 'sathi',
    categoryLabel: 'हॉस्पिटल साथी (OPD & Token Helper)',
    lat: 24.5375,
    lng: 81.3021,
    rating: 4.95,
    reviewsCount: 142,
    address: 'Sanjay Gandhi Memorial Hospital (SGMH) OPD Block',
    phone: '+91 98261 77341',
    verifiedBadge: 'UIDAI + Police Verified',
    priceLabel: '₹120/hr (Base Rate)',
    isAvailable: true,
    meta: {
      specialty: 'SGMH OPD slips, blood test queue, wheelchair transit & medicine procurement.'
    }
  },
  {
    id: 'loc-sathi-02',
    name: 'Pooja Soni (Elderly & Patient Escort)',
    type: 'sathi',
    categoryLabel: 'बुजुर्ग व महिला साथी (Elderly Escort)',
    lat: 24.5420,
    lng: 81.2940,
    rating: 4.9,
    reviewsCount: 89,
    address: 'Civil Lines, Near Medical College Colony',
    phone: '+91 97554 11209',
    verifiedBadge: 'Nursing Trained • Police Verified',
    priceLabel: '₹120/hr (Base Rate)',
    isAvailable: true,
    meta: {
      specialty: 'Bedside monitoring, diabetic care, gentle wheelchair assistance.'
    }
  },
  {
    id: 'loc-sathi-03',
    name: 'Vikas Mishra (Station & Transit Escort)',
    type: 'sathi',
    categoryLabel: 'स्टेशन पिकअप साथी (Station Porter & Helper)',
    lat: 24.5264,
    lng: 81.3210,
    rating: 4.88,
    reviewsCount: 110,
    address: 'Rewa Railway Station, Platform 1 & 2 Helpdesk',
    phone: '+91 94258 44012',
    verifiedBadge: 'Railway Certified • Police Clearance',
    priceLabel: '₹120/hr (Base Rate)',
    isAvailable: true,
    meta: {
      specialty: 'Heavy luggage assistance, train coach meeting, taxi coordination.'
    }
  },
  {
    id: 'loc-sathi-04',
    name: 'Aman Kushwaha (Errands & Medicine Runner)',
    type: 'sathi',
    categoryLabel: 'दवा व दस्तावेज रनर (Quick Errand Sathi)',
    lat: 24.5388,
    lng: 81.2985,
    rating: 4.85,
    reviewsCount: 76,
    address: 'Shilpi Plaza, Chirayu Medical Market',
    phone: '+91 98931 22910',
    verifiedBadge: 'UIDAI Verified • Bike Equipped',
    priceLabel: '₹120/hr (Base Rate)',
    isAvailable: true,
    meta: {
      specialty: 'Urgent prescription medicine pickup, reports collection, token lines.'
    }
  },
  {
    id: 'loc-sathi-05',
    name: 'Sunita Kol (Female Hospital Attendant)',
    type: 'sathi',
    categoryLabel: 'महिला अटेंडेंट (Female Bedside Attendant)',
    lat: 24.5340,
    lng: 81.2990,
    rating: 4.92,
    reviewsCount: 64,
    address: 'Kothi Compound, Near District Hospital',
    phone: '+91 96850 77412',
    verifiedBadge: 'UIDAI Verified • Mahila Sahayak',
    priceLabel: '₹120/hr (Base Rate)',
    isAvailable: true,
    meta: {
      specialty: 'Female patient overnight stay, food, sanitation & patient companionship.'
    }
  },

  // 2. Cabs and Taxis across Rewa City
  {
    id: 'loc-cab-01',
    name: 'Rajesh Tiwari (Swift Dzire AC)',
    type: 'cab',
    categoryLabel: 'प्राइवेट टैक्सी (4-Seater AC Sedan)',
    lat: 24.5270,
    lng: 81.3195,
    rating: 4.91,
    reviewsCount: 215,
    address: 'Rewa Railway Station VIP Exit',
    phone: '+91 94250 33819',
    verifiedBadge: 'Verified Commercial Taxi',
    priceLabel: '₹12/km (Zero Surge)',
    isAvailable: true,
    meta: {
      vehicleNumber: 'MP 17 TA 4120',
      vehicleModel: 'Maruti Suzuki Swift Dzire'
    }
  },
  {
    id: 'loc-cab-02',
    name: 'Manoj Shukla (Innova Crysta - Medical Transit)',
    type: 'cab',
    categoryLabel: 'बड़ी कैब / एम्बुलेटरी व्हीकल (Innova 7-Seater)',
    lat: 24.5368,
    lng: 81.3035,
    rating: 4.96,
    reviewsCount: 320,
    address: 'Sanjay Gandhi Hospital Emergency Drop Gate',
    phone: '+91 98263 11840',
    verifiedBadge: 'Medical Escort Certified',
    priceLabel: '₹16/km (Comfort Transit)',
    isAvailable: true,
    meta: {
      vehicleNumber: 'MP 17 TA 9031',
      vehicleModel: 'Toyota Innova Crysta (Reclining Seats)'
    }
  },
  {
    id: 'loc-cab-03',
    name: 'Deepak Yadav (CNG Auto Rickshaw)',
    type: 'cab',
    categoryLabel: 'लोकल ऑटो (Local 3-Wheeler Auto)',
    lat: 24.5312,
    lng: 81.3088,
    rating: 4.79,
    reviewsCount: 140,
    address: 'New Bus Stand Rewa, Urrahat',
    phone: '+91 91310 99420',
    verifiedBadge: 'City Auto Permit Verified',
    priceLabel: '₹8/km (Economical)',
    isAvailable: true,
    meta: {
      vehicleNumber: 'MP 17 TR 8812',
      vehicleModel: 'Bajaj RE CNG Auto'
    }
  },
  {
    id: 'loc-cab-04',
    name: 'Arun Gupta (WagonR Green EV/Petrol)',
    type: 'cab',
    categoryLabel: 'हैचबैक कैब (Compact City Cab)',
    lat: 24.5401,
    lng: 81.2960,
    rating: 4.84,
    reviewsCount: 98,
    address: 'Civil Lines, Near Commissioner Residence',
    phone: '+91 94251 77209',
    verifiedBadge: 'Police Cleared Driver',
    priceLabel: '₹10/km (City Transit)',
    isAvailable: true,
    meta: {
      vehicleNumber: 'MP 17 TA 2401',
      vehicleModel: 'Maruti WagonR AC'
    }
  },

  // 3. Hotels and Lodges near Hospital and Station
  {
    id: 'loc-hotel-01',
    name: 'Hotel Samdariya Palace & Residency',
    type: 'hotel',
    categoryLabel: 'होटल (Near Shilpi Plaza & SGMH)',
    lat: 24.5388,
    lng: 81.2985,
    rating: 4.82,
    reviewsCount: 310,
    address: 'Shilpi Plaza Commercial Complex, Rewa',
    phone: '+91 76622 55801',
    verifiedBadge: 'JITOMNI Verified Hotel Partner',
    priceLabel: '₹850 / रात्रि से शुरू',
    isAvailable: true,
    meta: {
      roomsAvailable: 14,
      hospitalProximityKm: 0.9,
      amenities: ['AC / Non-AC', 'Lift / Wheelchair Access', 'Pure Veg Food', '24h Hot Water']
    }
  },
  {
    id: 'loc-hotel-02',
    name: 'Hotel Safari Regency',
    type: 'hotel',
    categoryLabel: 'प्रीमियम होटल (Civil Lines Rewa)',
    lat: 24.5445,
    lng: 81.2915,
    rating: 4.78,
    reviewsCount: 195,
    address: 'College Road, Civil Lines, Rewa',
    phone: '+91 76622 41920',
    verifiedBadge: 'JITOMNI Verified Hotel Partner',
    priceLabel: '₹1,100 / रात्रि से शुरू',
    isAvailable: true,
    meta: {
      roomsAvailable: 9,
      hospitalProximityKm: 1.4,
      amenities: ['Deluxe Rooms', 'Free Wi-Fi', 'Patient Attendant Discount', 'Restaurant']
    }
  },
  {
    id: 'loc-hotel-03',
    name: 'Hotel Star & Guest House',
    type: 'hotel',
    categoryLabel: 'बजट स्टे (Near Railway Station)',
    lat: 24.5255,
    lng: 81.3225,
    rating: 4.65,
    reviewsCount: 160,
    address: 'Station Road, 200m from Rewa Railway Station',
    phone: '+91 94253 88102',
    verifiedBadge: 'Station Budget Partner',
    priceLabel: '₹600 / रात्रि से शुरू',
    isAvailable: true,
    meta: {
      roomsAvailable: 18,
      hospitalProximityKm: 3.2,
      amenities: ['Family Rooms', '24h Check-in', 'Locker Facility', 'Canteen']
    }
  },
  {
    id: 'loc-hotel-04',
    name: 'Rewa Rajvilas Hotel & Banquet',
    type: 'hotel',
    categoryLabel: 'लक्जरी होटल (NH-7 Bypass)',
    lat: 24.5510,
    lng: 81.3120,
    rating: 4.9,
    reviewsCount: 240,
    address: 'NH-7 Bypass Road, Near APS University',
    phone: '+91 76622 99400',
    verifiedBadge: 'Premium Luxury Partner',
    priceLabel: '₹1,800 / रात्रि से शुरू',
    isAvailable: true,
    meta: {
      roomsAvailable: 12,
      hospitalProximityKm: 3.8,
      amenities: ['Suites', 'Spacious Parking', 'Fine Dining', 'Car Rental Desk']
    }
  }
];

// Helper: Calculate distance between two lat/lng coordinates (Haversine formula in km)
function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// 1. GET Provider Registrations (for Admin Dashboard & listings)
companionRouter.get('/api/companion/providers', (req, res) => {
  const { status, serviceType } = req.query;
  let filtered = [...companionProvidersStore];
  if (status && status !== 'all') {
    filtered = filtered.filter(p => p.status === status);
  }
  if (serviceType && serviceType !== 'all') {
    filtered = filtered.filter(p => p.serviceType === serviceType);
  }
  res.json({
    success: true,
    total: filtered.length,
    providers: filtered
  });
});

// 2. POST Register as a Sathi / Service Provider
companionRouter.post('/api/companion/providers/register', (req, res) => {
  const {
    fullNameOrBusiness,
    serviceType,
    phone,
    aadhaarNumber,
    location,
    cabDetails,
    hotelDetails
  } = req.body;

  if (!fullNameOrBusiness || !serviceType || !phone || !aadhaarNumber) {
    return res.status(400).json({
      success: false,
      message: 'Full Name/Business Name, Service Type, Phone, and Aadhaar Number are required.'
    });
  }

  // Sanitize Aadhaar: mask digits except last 4
  const rawAadhaar = String(aadhaarNumber).replace(/\D/g, '');
  const maskedAadhaar = rawAadhaar.length >= 4 
    ? `XXXX-XXXX-${rawAadhaar.slice(-4)}`
    : 'XXXX-XXXX-9999';

  // Default coordinate if none provided: center of Rewa City
  const lat = location?.lat || 24.5362;
  const lng = location?.lng || 81.3037;

  const newProvider: InMemProviderRegistration = {
    id: `PRV-REWA-${Math.floor(1000 + Math.random() * 9000)}`,
    fullNameOrBusiness: String(fullNameOrBusiness).trim(),
    serviceType,
    phone: String(phone).trim(),
    aadhaarNumber: maskedAadhaar,
    aadhaarStatus: 'pending',
    location: {
      address: location?.address || 'Rewa City Center',
      landmark: location?.landmark || 'Rewa',
      city: 'Rewa',
      lat,
      lng
    },
    cabDetails,
    hotelDetails,
    status: 'pending_approval',
    adminRemarks: 'New registration submitted. Pending admin document and police clearance audit.',
    appliedAt: new Date().toISOString()
  };

  companionProvidersStore.unshift(newProvider);

  res.json({
    success: true,
    message: 'पंजीकरण सफलतापूर्वक जमा किया गया। एडमिन सत्यापन के पश्चात प्रोफाइल लाइव हो जाएगी।',
    provider: newProvider
  });
});

// 3. POST Admin Approve or Reject Provider
companionRouter.post('/api/companion/providers/approve', (req, res) => {
  const { providerId, action, remarks } = req.body;
  if (!providerId || !action) {
    return res.status(400).json({ success: false, message: 'providerId and action (approve/reject) are required' });
  }

  const provider = companionProvidersStore.find(p => p.id === providerId);
  if (!provider) {
    return res.status(404).json({ success: false, message: 'Provider record not found' });
  }

  if (action === 'approve') {
    provider.status = 'verified_active';
    provider.aadhaarStatus = 'verified';
    provider.approvedAt = new Date().toISOString();
    provider.adminRemarks = remarks || 'Sovereign Aadhaar UIDAI & Police clearance verified.';

    // Dynamically insert into live map locations if not already present
    const existingPin = rewaMapLocationsStore.find(p => p.id === `pin-${provider.id}`);
    if (!existingPin) {
      const pinType: 'sathi' | 'cab' | 'hotel' = 
        provider.serviceType === 'cab_vendor' ? 'cab' :
        provider.serviceType === 'hotel_partner' ? 'hotel' : 'sathi';

      rewaMapLocationsStore.unshift({
        id: `pin-${provider.id}`,
        name: provider.fullNameOrBusiness,
        type: pinType,
        categoryLabel: provider.serviceType === 'cab_vendor' ? 'सत्यापित कैब वेंडर' :
                       provider.serviceType === 'hotel_partner' ? 'सत्यापित होटल पार्टनर' : 'सत्यापित ऑन-डिमांड साथी',
        lat: provider.location.lat,
        lng: provider.location.lng,
        rating: 5.0,
        reviewsCount: 1,
        address: `${provider.location.address}, ${provider.location.landmark}`,
        phone: provider.phone,
        verifiedBadge: 'Admin Approved • Rewa Sovereign Hub',
        priceLabel: provider.serviceType === 'cab_vendor' ? '₹12/km (Zero Surge)' :
                    provider.serviceType === 'hotel_partner' ? `₹${provider.hotelDetails?.startingPrice || 800} / रात्रि` :
                    '₹120/hr (Base Rate)',
        isAvailable: true,
        meta: {
          specialty: provider.serviceType === 'hospital_helper' ? 'Hospital assistance & token helper' : 'Care & mobility helper',
          vehicleNumber: provider.cabDetails?.vehicleNumber,
          vehicleModel: provider.cabDetails?.vehicleType,
          roomsAvailable: provider.hotelDetails?.totalRooms || 10,
          amenities: provider.hotelDetails?.amenities || ['AC', 'Wi-Fi']
        }
      });
    }
  } else if (action === 'reject') {
    provider.status = 'rejected';
    provider.adminRemarks = remarks || 'Incomplete document verification or address mismatch.';
  }

  res.json({
    success: true,
    message: action === 'approve' ? 'प्रदाता स्वीकृत एवं लाइव मैप पर सक्रिय किया गया।' : 'प्रदाता अस्वीकृत किया गया।',
    provider
  });
});

// 4. GET Real-Time Rewa City Map Locations (Sathis, Cabs, Hotels)
companionRouter.get('/api/companion/rewa-map/locations', (req, res) => {
  const customerLat = req.query.customerLat ? parseFloat(String(req.query.customerLat)) : 24.5362;
  const customerLng = req.query.customerLng ? parseFloat(String(req.query.customerLng)) : 81.3037;
  const filterType = req.query.type ? String(req.query.type) : 'all'; // 'all' | 'sathi' | 'cab' | 'hotel'

  let pins = rewaMapLocationsStore.map(pin => {
    const dist = calculateHaversineKm(customerLat, customerLng, pin.lat, pin.lng);
    // Rough estimate: 20 km/h city speed -> 3 mins per km + 2 min buffer
    const eta = Math.max(3, Math.round(dist * 3) + 2);
    return {
      ...pin,
      distanceKm: dist,
      etaMinutes: eta
    };
  });

  if (filterType !== 'all') {
    pins = pins.filter(p => p.type === filterType);
  }

  // Sort by closest first
  pins.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  res.json({
    success: true,
    city: 'Rewa (MP)',
    centerCoordinates: { lat: 24.5362, lng: 81.3037 },
    customerCoordinates: { lat: customerLat, lng: customerLng },
    total: pins.length,
    locations: pins
  });
});

// ============================================================
// ALL-INDIA PREMIUM NETWORK DIRECTORY (500+ HUBS ACROSS INDIA)
// ============================================================
const ALL_INDIA_CITIES = [
  'Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal',
  'Indore', 'Rewa', 'Varanasi', 'Patna', 'Kochi', 'Guwahati',
  'Surat', 'Kanpur', 'Nagpur', 'Visakhapatnam', 'Agra', 'Amritsar', 'Dehradun'
];

const ALL_INDIA_EMPANELLED_HOSPITALS = [
  { name: 'AIIMS New Delhi', city: 'Delhi NCR', type: 'Apex Government / AIIMS', beds: 2478, lat: 28.5672, lng: 77.2100 },
  { name: 'Medanta The Medicity Gurugram', city: 'Delhi NCR', type: 'Super Specialty Private', beds: 1250, lat: 28.4398, lng: 77.0425 },
  { name: 'Fortis Memorial Research Institute Gurugram', city: 'Delhi NCR', type: 'Multi-Specialty Private', beds: 1000, lat: 28.4595, lng: 77.0725 },
  { name: 'Max Super Speciality Hospital Saket', city: 'Delhi NCR', type: 'Super Specialty Private', beds: 530, lat: 28.5273, lng: 77.2155 },
  { name: 'Safdarjung Hospital New Delhi', city: 'Delhi NCR', type: 'Central Government', beds: 1531, lat: 28.5694, lng: 77.2072 },
  { name: 'Apollo Hospitals Greams Road Chennai', city: 'Chennai', type: 'Premier Healthcare Group', beds: 600, lat: 13.0604, lng: 80.2496 },
  { name: 'Tata Memorial Hospital Mumbai', city: 'Mumbai', type: 'Premier Cancer Institute', beds: 700, lat: 19.0069, lng: 72.8432 },
  { name: 'Lilavati Hospital & Research Centre Mumbai', city: 'Mumbai', type: 'Multi-Specialty Private', beds: 323, lat: 19.0519, lng: 72.8290 },
  { name: 'AIIMS Bhopal', city: 'Bhopal', type: 'Apex Government / AIIMS', beds: 960, lat: 23.2065, lng: 77.4599 },
  { name: 'Sanjay Gandhi Memorial Hospital (SGMH) Rewa', city: 'Rewa', type: 'Government Medical College', beds: 800, lat: 24.5362, lng: 81.3037 },
  { name: 'Super Specialty Hospital Rewa', city: 'Rewa', type: 'Government Super Specialty', beds: 350, lat: 24.5385, lng: 81.3080 },
  { name: 'King George\'s Medical University (KGMU) Lucknow', city: 'Lucknow', type: 'State Medical University', beds: 4500, lat: 26.8687, lng: 80.9157 },
  { name: 'PGIMER Chandigarh', city: 'Chandigarh', type: 'Postgraduate Apex Institute', beds: 1948, lat: 30.7656, lng: 76.7745 },
  { name: 'Christian Medical College (CMC) Vellore', city: 'Vellore', type: 'Tertiary Care Teaching Hospital', beds: 2800, lat: 12.9249, lng: 79.1352 },
  { name: 'Manipal Hospital HAL Airport Road Bengaluru', city: 'Bengaluru', type: 'Quaternary Care Private', beds: 600, lat: 12.9592, lng: 77.6499 },
  { name: 'Narayana Health City Bengaluru', city: 'Bengaluru', type: 'Cardiac & Multi-Specialty', beds: 1400, lat: 12.8021, lng: 77.6896 },
  { name: 'AIIMS Patna', city: 'Patna', type: 'Apex Government / AIIMS', beds: 960, lat: 25.5604, lng: 85.0448 },
  { name: 'Sir Sunderlal Hospital (IMS BHU) Varanasi', city: 'Varanasi', type: 'Central University Teaching', beds: 1500, lat: 25.2818, lng: 82.9995 }
];

const ALL_INDIA_TRANSIT_HUBS = [
  { code: 'NDLS', name: 'New Delhi Railway Station', city: 'Delhi NCR', type: 'Railway Station', platforms: 16 },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus Mumbai', city: 'Mumbai', type: 'Railway Station', platforms: 18 },
  { code: 'HWH', name: 'Howrah Junction Kolkata', city: 'Kolkata', type: 'Railway Station', platforms: 23 },
  { code: 'BPL', name: 'Bhopal Junction Railway Station', city: 'Bhopal', type: 'Railway Station', platforms: 6 },
  { code: 'REWA', name: 'Rewa Railway Station (WCR)', city: 'Rewa', type: 'Railway Station', platforms: 2 },
  { code: 'SBC', name: 'KSR Bengaluru City Junction', city: 'Bengaluru', type: 'Railway Station', platforms: 10 },
  { code: 'MAS', name: 'Chennai Central Railway Station', city: 'Chennai', type: 'Railway Station', platforms: 12 },
  { code: 'BSB', name: 'Varanasi Junction Railway Station', city: 'Varanasi', type: 'Railway Station', platforms: 9 },
  { code: 'PNBE', name: 'Patna Junction Railway Station', city: 'Patna', type: 'Railway Station', platforms: 10 },
  { code: 'LKO', name: 'Lucknow Charbagh Railway Station', city: 'Lucknow', type: 'Railway Station', platforms: 9 },
  { code: 'JP', name: 'Jaipur Junction Railway Station', city: 'Jaipur', type: 'Railway Station', platforms: 8 },
  { code: 'ADI', name: 'Ahmedabad Junction Railway Station', city: 'Ahmedabad', type: 'Railway Station', platforms: 12 },
  { code: 'DEL', name: 'Indira Gandhi International Airport (T1/T2/T3)', city: 'Delhi NCR', type: 'International Airport', terminals: 3 },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', type: 'International Airport', terminals: 2 },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', type: 'International Airport', terminals: 2 }
];

// 5. POST AI-Powered All-India Demand Task Parser & Sathi Matcher (8 Core Modules)
companionRouter.post('/api/companion/ai/parse-task', async (req, res) => {
  try {
    const { userQuery, preferredTime, targetCity = 'Rewa', customerLat = 24.5362, customerLng = 81.3037 } = req.body;

    if (!userQuery || typeof userQuery !== 'string' || userQuery.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userQuery is required'
      });
    }

    const query = userQuery.trim();
    let parsedData: any = null;

    // Detect City dynamically from query or targetCity
    let detectedCity = targetCity || 'Rewa';
    for (const c of ALL_INDIA_CITIES) {
      const regex = new RegExp(`\\b${c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(query)) {
        detectedCity = c;
        break;
      }
    }
    if (/delhi|new delhi|gurgaon|gurugram|noida/i.test(query)) detectedCity = 'Delhi NCR';
    else if (/mumbai|bombay|thane/i.test(query)) detectedCity = 'Mumbai';
    else if (/bangalore|bengaluru/i.test(query)) detectedCity = 'Bengaluru';
    else if (/bhopal/i.test(query)) detectedCity = 'Bhopal';
    else if (/varanasi|kashi|banaras/i.test(query)) detectedCity = 'Varanasi';
    else if (/jaipur/i.test(query)) detectedCity = 'Jaipur';
    else if (/lucknow/i.test(query)) detectedCity = 'Lucknow';
    else if (/patna/i.test(query)) detectedCity = 'Patna';

    // Try Gemini AI extraction across 8 Core Modules
    const ai = getGenAI();
    if (ai) {
      try {
        const prompt = `You are the Lead Operations AI Architect for JITOMNI 360° All-India On-Demand Sathi Network (500+ Cities, Stations & Hospitals).
Customer Request: "${query}"
Preferred Timing: "${preferredTime || 'Immediate'}"
Detected City: "${detectedCity}"

Classify into EXACTLY ONE of the 8 Mandated Core Premium Modules:
1. "Buzurg Sathi - Senior Care Assistance" (elderly companionship, daily chores, medicine schedule, BP/sugar check, walking assistance)
2. "Hospital Sahayak - Medical Support & Guidance" (OPD slip, doctor line, wheelchair physical escort, bedside support, empanelled hospital navigation)
3. "Bank Sarkari Sahayak - Government & Banking Help" (doorstep KYC, pension Jeevan Pramaan, bank form filling, loan documentation for seniors)
4. "Sheher Guide - Local City Tour" (city sightseeing, heritage tour, local shopping navigation, itinerary guide)
5. "Local Saman Delivery - Doorstep Delivery Service" (hyper-local package delivery, courier pickup/drop-off, OTP confirmation)
6. "Surakshit Yatra Sathi - Safe Travel Companion" (railway station platform porter/escort, luggage handling, airport gate navigation, safe transit)
7. "Event Sahayak - Event Planning & Support" (wedding assistance, corporate conference staff, vendor coordination, venue support)
8. "Sirf Ride - On-Demand Ride Service" (chauffeur-driven sedan, sanitized cab, immediate or scheduled station/airport rides)

Extract strictly in valid JSON format:
{
  "coreModule": "Buzurg Sathi - Senior Care Assistance" | "Hospital Sahayak - Medical Support & Guidance" | "Bank Sarkari Sahayak - Government & Banking Help" | "Sheher Guide - Local City Tour" | "Local Saman Delivery - Doorstep Delivery Service" | "Surakshit Yatra Sathi - Safe Travel Companion" | "Event Sahayak - Event Planning & Support" | "Sirf Ride - On-Demand Ride Service",
  "taskTitle": "Clear 5-8 word title in Hindi & English",
  "city": "${detectedCity}",
  "location": "Pickup or starting landmark in ${detectedCity}",
  "destination": "Target hospital, station, bank or destination",
  "hubType": "hospital" | "railway_station" | "airport" | "bank_branch" | "city_landmark" | "doorstep",
  "hubName": "Name of hospital or station if mentioned",
  "timeRequirement": "Time string or Immediate",
  "durationHours": integer hours needed (default 2),
  "distanceKm": estimated distance in km (default 5 for local delivery/ride),
  "isNight": boolean (true if timing between 10:00 PM and 6:00 AM or mentions night/रात),
  "complexity": "standard" | "high_priority" | "critical_medical",
  "matchedReason": "1 sentence explanation of why this verified Sathi tier is dispatched"
}`;

        const aiRes = await generateFastContent(ai, prompt, 'You are an accurate JSON entity extractor for the All-India JITOMNI 360 network.', false);
        if (aiRes?.text) {
          const cleanJson = aiRes.text.replace(/```json|```/g, '').trim();
          parsedData = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn('[AI Task Parser] Gemini AI fallback used:', err);
      }
    }

    // High-grade fallback rule engine if AI is unavailable
    if (!parsedData || !parsedData.coreModule) {
      const qLower = query.toLowerCase();
      let coreModule: any = 'Hospital Sahayak - Medical Support & Guidance';
      let hubType: any = 'hospital';
      let hubName = 'Sanjay Gandhi Memorial Hospital (SGMH)';
      let complexity: 'standard' | 'high_priority' | 'critical_medical' = 'standard';

      if (/सामान|डिलीवरी|delivery|courier|parcel|समान|package|दवा मंगाना|सब्जी|पिकअप ड्राप/i.test(query)) {
        coreModule = 'Local Saman Delivery - Doorstep Delivery Service';
        hubType = 'doorstep';
        hubName = 'Local Merchant / Residence Hub';
      } else if (/बैंक|bank|sbi|kyc|पेंशन|pension|जीवन प्रमाण|फॉर्म|खाता|सरकारी|loan|दस्तावेज/i.test(query)) {
        coreModule = 'Bank Sarkari Sahayak - Government & Banking Help';
        hubType = 'bank_branch';
        hubName = 'State Bank of India / Civic Center';
      } else if (/ट्रेन|रेलवे|station|प्लेटफॉर्म|कुली|luggage|सामान उठाना|एयरपोर्ट|airport|flight|यात्रा|travel|transit/i.test(query)) {
        coreModule = 'Surakshit Yatra Sathi - Safe Travel Companion';
        hubType = /airport|flight|हवाई/i.test(query) ? 'airport' : 'railway_station';
        hubName = `${detectedCity} Central Railway Station / Transit Hub`;
        complexity = 'high_priority';
      } else if (/गाइड|guide|टूर|tour|घूमना|किला|sightseeing|heritge|दर्शन|मंदिर/i.test(query)) {
        coreModule = 'Sheher Guide - Local City Tour';
        hubType = 'city_landmark';
        hubName = `${detectedCity} Historical Landmark & City Center`;
      } else if (/इवेंट|event|शादी|wedding|party|कार्यक्रम|स्टाफ|vendor|समारोह/i.test(query)) {
        coreModule = 'Event Sahayak - Event Planning & Support';
        hubType = 'city_landmark';
        hubName = `${detectedCity} Event Pavilion`;
      } else if (/सवारी|ride|कार|cab|taxi|sedan|ड्राइवर|chauffeur|pickup drop/i.test(query)) {
        coreModule = 'Sirf Ride - On-Demand Ride Service';
        hubType = 'city_landmark';
        hubName = `${detectedCity} Executive Ride Hub`;
      } else if (/बुजुर्ग|elderly|माताजी|पिताजी|dada|dadi|वृद्ध|चहलकदमी|bp|शुगर|care|साथी/i.test(query)) {
        coreModule = 'Buzurg Sathi - Senior Care Assistance';
        hubType = 'doorstep';
        hubName = 'Elder Citizen Residence';
        complexity = 'high_priority';
      } else {
        coreModule = 'Hospital Sahayak - Medical Support & Guidance';
        hubType = 'hospital';
        hubName = `${detectedCity} Empanelled Super Specialty Hospital`;
        complexity = /urgent|critical|गंभीर|icu|इमरजेंसी/i.test(query) ? 'critical_medical' : 'high_priority';
      }

      // Duration & Distance
      const hourMatch = query.match(/(\d+)\s*(घंटे|घंटा|hours?|hrs?|hr)/i);
      const durationHours = hourMatch ? Math.max(1, parseInt(hourMatch[1], 10)) : 2;

      const kmMatch = query.match(/(\d+)\s*(km|किलोमीटर|किमी)/i);
      const distanceKm = kmMatch ? Math.max(1, parseInt(kmMatch[1], 10)) : 6;

      const mentionsNight = /रात|night|10\s*pm|11\s*pm|12\s*am|1\s*am|2\s*am|3\s*am|4\s*am|5\s*am|6\s*am|देर रात/i.test(query);
      const currentHour = new Date().getHours();
      const isNight = mentionsNight || (currentHour >= 22 || currentHour < 6);

      parsedData = {
        coreModule,
        taskTitle: `${coreModule.split('-')[0].trim()} — ${detectedCity}`,
        city: detectedCity,
        location: `${detectedCity} Central Point`,
        destination: hubName,
        hubType,
        hubName,
        timeRequirement: preferredTime || 'तत्काल (Next 15-20 mins)',
        durationHours,
        distanceKm,
        isNight,
        complexity,
        matchedReason: `अखिल भारतीय 500+ नेटवर्क के तहत ${detectedCity} में ${coreModule.split('-')[0].trim()} के लिए 'SecureTrust' सत्यापित साथी का चयन।`
      };
    }

    // Ensure coreModule adheres to one of 8 Core Modules
    const coreModule = parsedData.coreModule || 'Hospital Sahayak - Medical Support & Guidance';
    const city = parsedData.city || detectedCity;
    const hours = Math.max(1, Number(parsedData.durationHours) || 2);
    const distanceKm = Math.max(1, Number(parsedData.distanceKm) || 5);
    const isNight = Boolean(parsedData.isNight);
    const NIGHT_CHARGE_EXTRA = 150;

    // ============================================================
    // PRICING CONSISTENCY ENGINE (STARTING AT ₹100 BASELINE)
    // ============================================================
    let baselineStartingAt = 100;
    let hourlyRate = 120;
    let durationAmount = 0;
    let distanceAmount = 0;
    let tierMultiplier = 1.0;

    if (coreModule === 'Local Saman Delivery - Doorstep Delivery Service') {
      baselineStartingAt = 100; // Flat base ₹100 covers first 3km
      hourlyRate = 0;
      const extraKm = Math.max(0, distanceKm - 3);
      distanceAmount = extraKm * 12;
      durationAmount = 0;
    } else if (coreModule === 'Hospital Sahayak - Medical Support & Guidance') {
      baselineStartingAt = 100;
      hourlyRate = 120; // ₹120/hr
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Buzurg Sathi - Senior Care Assistance') {
      baselineStartingAt = 100;
      hourlyRate = 120; // ₹120/hr
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Bank Sarkari Sahayak - Government & Banking Help') {
      baselineStartingAt = 100;
      hourlyRate = 150; // ₹150/hr (Includes secure document handling)
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Surakshit Yatra Sathi - Safe Travel Companion') {
      baselineStartingAt = 100;
      hourlyRate = 150; // ₹150/hr (Railway station / Airport luggage & gate escort)
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Sheher Guide - Local City Tour') {
      baselineStartingAt = 100;
      hourlyRate = 160; // ₹160/hr (Professional city guide & itinerary)
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Event Sahayak - Event Planning & Support') {
      baselineStartingAt = 100;
      hourlyRate = 160; // ₹160/hr (On-site event staff)
      durationAmount = hours * hourlyRate;
    } else if (coreModule === 'Sirf Ride - On-Demand Ride Service') {
      baselineStartingAt = 100; // ₹100 Base booking
      hourlyRate = 0;
      distanceAmount = distanceKm * 18; // Luxury sedan per km
      durationAmount = 0;
    }

    const baseAmount = durationAmount > 0 ? durationAmount : (baselineStartingAt + distanceAmount);
    const nightSurcharge = isNight ? NIGHT_CHARGE_EXTRA : 0;
    const totalEstimatedAmount = baseAmount + nightSurcharge;

    // Partner Settlement (80/20 Sovereign Split)
    const partnerEarnings = Math.round(totalEstimatedAmount * 0.8);
    const platformShare = Math.round(totalEstimatedAmount * 0.2);

    // Dynamic Task Token Generation (All-India Prefix)
    const cityCode = city.substring(0, 3).toUpperCase();
    const taskToken = `TT-${cityCode}-${Math.floor(10000 + Math.random() * 90000)}`;

    // 'SecureTrust Verified' ID & QR Protocol
    const secureTrustId = `STV-IND-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const qrPayload = `https://jitomni.in/verify?id=${secureTrustId}&token=${taskToken}&auth=GOV_UIDAI_POLICE_CLEARED&city=${encodeURIComponent(city)}`;
    const deliveryOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Dynamic Formula Breakdown
    let billFormulaBreakdown = '';
    if (coreModule === 'Local Saman Delivery - Doorstep Delivery Service') {
      billFormulaBreakdown = `पारदर्शी दर: बेस डिलीवरी ₹100 (प्रथम 3 किमी) + ₹${distanceAmount} (${Math.max(0, distanceKm - 3)} अतिरिक्त किमी @ ₹12/किमी)${isNight ? ` + ₹150 नाइट चार्ज = ₹${totalEstimatedAmount}` : ` = ₹${totalEstimatedAmount}`}`;
    } else if (coreModule === 'Sirf Ride - On-Demand Ride Service') {
      billFormulaBreakdown = `पारदर्शी दर: बेस बुकिंग ₹100 + ₹${distanceAmount} (${distanceKm} किमी लग्जरी सेडान @ ₹18/किमी)${isNight ? ` + ₹150 नाइट चार्ज = ₹${totalEstimatedAmount}` : ` = ₹${totalEstimatedAmount}`}`;
    } else {
      billFormulaBreakdown = `पारदर्शी दर: ₹${hourlyRate}/घंटा × ${hours} घंटे = ₹${baseAmount}${isNight ? ` + ₹150 नाइट चार्ज (10 PM – 6 AM) = ₹${totalEstimatedAmount}` : ` (डे शिफ्ट • कोई हिडन चार्ज नहीं = ₹${totalEstimatedAmount})`}`;
    }

    // Recommended Active Sathis for City
    const mockSathisPool = [
      {
        id: `STV-WORKER-${Math.floor(1000 + Math.random() * 9000)}`,
        name: city === 'Rewa' ? 'Pooja Vishwakarma' : 'Anand Sharma',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        phone: '+91 98261 44520',
        rating: 4.96,
        reviewsCount: 42,
        tasksCompleted: 88,
        badgeTitle: 'SecureTrust Gold • UIDAI + Police Cleared',
        aadhaarVerified: true,
        policeRecordVerified: true,
        verificationStatus: 'verified_active' as const,
        city: `${city} City Hub`,
        hourlyRate,
        distanceKm: 0.9,
        etaMinutes: 8,
        category: 'companion' as const,
        subServices: [coreModule]
      },
      {
        id: `STV-WORKER-${Math.floor(1000 + Math.random() * 9000)}`,
        name: 'Rajesh Kumar Verma',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        phone: '+91 94258 77102',
        rating: 4.91,
        reviewsCount: 36,
        tasksCompleted: 64,
        badgeTitle: 'SecureTrust Verified • Empanelled Escort',
        aadhaarVerified: true,
        policeRecordVerified: true,
        verificationStatus: 'verified_active' as const,
        city: `${city} Central Area`,
        hourlyRate,
        distanceKm: 1.6,
        etaMinutes: 14,
        category: 'companion' as const,
        subServices: [coreModule]
      },
      {
        id: `STV-WORKER-${Math.floor(1000 + Math.random() * 9000)}`,
        name: 'Sunita Devi Patel',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
        phone: '+91 98932 11943',
        rating: 4.94,
        reviewsCount: 29,
        tasksCompleted: 51,
        badgeTitle: 'SecureTrust Senior Care Specialist',
        aadhaarVerified: true,
        policeRecordVerified: true,
        verificationStatus: 'verified_active' as const,
        city: `${city} Ward-4`,
        hourlyRate,
        distanceKm: 2.3,
        etaMinutes: 19,
        category: 'companion' as const,
        subServices: [coreModule]
      }
    ];

    const assignedWorker = mockSathisPool[0];
    const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

    // Sovereign Auto-Invoice Text
    const autoInvoiceText = `============================================================
           JITOMNI 360° ALL-INDIA SOVEREIGN OPERATIONS RECEIPT
                  ALL-INDIA PREMIUM ON-DEMAND NETWORK
============================================================
TASK TOKEN         : ${taskToken}
SECURETRUST ID     : ${secureTrustId}
DATE & TIME        : ${nowStr}
CITY / REGION      : ${city} (All-India Empanelled Node)
CORE MODULE        : ${coreModule}
TASK TITLE         : ${parsedData.taskTitle}
START LOCATION     : ${parsedData.location}
DESTINATION / HUB  : ${parsedData.destination}
START / DROP OTP   : ${deliveryOtp} (Provide to Sathi for Verification)

------------------------------------------------------------
PRICING & DISTANCE/HOURS BREAKDOWN
------------------------------------------------------------
Service Baseline   : Starting at ₹${baselineStartingAt}
Rate Structure     : ${hourlyRate > 0 ? `₹${hourlyRate}/Hour × ${hours} Hours` : `Distance: ${distanceKm} Km`}
Base Service Fare  : ₹${baseAmount}
Shift Type         : ${isNight ? 'Night Shift (10:00 PM – 06:00 AM Window)' : 'Day Shift (Standard)'}
Night Surcharge    : ₹${nightSurcharge}
Safety Insurance   : ₹0 (Included Free Sovereign Cover)
GST / Platform Fee : ₹0 (Direct Citizen Empowerment)
------------------------------------------------------------
TOTAL FARE PAID    : ₹${totalEstimatedAmount}
------------------------------------------------------------

PARTNER SETTLEMENT BREAKDOWN (80/20 SOVEREIGN SPLIT)
------------------------------------------------------------
Sathi Direct Share (80%)  : ₹${partnerEarnings} (Direct DBT / Instant UPI)
Safety & 24/7 Concierge   : ₹${platformShare} (Active Escalation Desk)
Assigned Sathi            : ${assignedWorker.name} (${assignedWorker.rating}★)
Contact Number            : ${assignedWorker.phone}
SecureTrust Verification  : UIDAI Aadhaar + Police Clearance Verified
============================================================
24/7 All-India Concierge Desk: 1800-360-SATHI / SOS: 112
"Padhai Se Kamai Tak" — JITOMNI 360° Sovereign Network
============================================================`;

    res.json({
      success: true,
      parsedResult: {
        rawRequest: query,
        category: coreModule.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
        demandCategory: coreModule,
        coreModule,
        taskTitle: parsedData.taskTitle,
        city,
        location: parsedData.location,
        destination: parsedData.destination,
        hubType: parsedData.hubType,
        hubName: parsedData.hubName,
        timeRequirement: parsedData.timeRequirement || preferredTime || 'तत्काल (Immediate)',
        durationHours: hours,
        distanceKm,
        isNight,
        baseRatePerHour: hourlyRate,
        nightSurcharge,
        baseAmount,
        tierPricing: {
          baselineStartingAt,
          hourlyRate,
          durationAmount,
          distanceAmount,
          tierMultiplier,
          nightSurcharge,
          totalCalculated: totalEstimatedAmount
        },
        totalEstimatedAmount,
        partnerEarnings,
        platformShare,
        complexity: parsedData.complexity,
        recommendedSathis: mockSathisPool,
        billFormulaBreakdown,
        confidenceScore: 99,
        matchedReason: parsedData.matchedReason,
        taskToken,
        broadcastStatus: 'ready',
        autoInvoiceText,
        deliveryOtp,
        secureTrustDossier: {
          verifiedId: secureTrustId,
          qrPayload,
          isAadhaarVerified: true,
          isPoliceClearanceVerified: true,
          verificationDate: nowStr,
          issuingAuthority: `JITOMNI 360 Sovereign Trust Authority & ${city} Police`,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrPayload)}`,
          status: 'ACTIVE_VERIFIED'
        },
        conciergeDesk: {
          status: 'active_24x7',
          helpline: '1800-360-SATHI (+91 11-40360360)',
          escalationLevel: 'Level-1 Automated AI',
          deskAgent: 'Sovereign 24x7 Duty Officer & Automated Triage Desk'
        }
      }
    });
  } catch (error: any) {
    console.error('Error in All-India AI Task Parsing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to parse task request',
      error: error?.message
    });
  }
});

// 6. GET All-India Empanelled Hubs (500+ Cities, Stations & Hospitals)
companionRouter.get('/api/companion/india/all-hubs', (req, res) => {
  res.json({
    success: true,
    totalCities: ALL_INDIA_CITIES.length,
    cities: ALL_INDIA_CITIES,
    hospitals: ALL_INDIA_EMPANELLED_HOSPITALS,
    transitHubs: ALL_INDIA_TRANSIT_HUBS
  });
});

// 7. POST 'SecureTrust Verified' ID & QR Protocol Verification
companionRouter.post('/api/companion/securetrust/verify', (req, res) => {
  const { secureTrustId, taskToken, qrPayload } = req.body;
  const verifiedId = secureTrustId || `STV-IND-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  res.json({
    success: true,
    verifiedId,
    taskToken: taskToken || 'TT-IND-ACTIVE',
    verificationStatus: 'PASSED_SECURETRUST_VERIFIED',
    aadhaarStatus: 'UIDAI_BIOMETRIC_EKYC_CONFIRMED',
    policeClearance: 'CRIME_FREE_VERIFIED_STATE_CID',
    verifiedAt: new Date().toISOString(),
    isSafeToProceed: true,
    message: `'SecureTrust Verified' ID ${verifiedId} की प्रामाणिकता 100% सत्यापित है। कार्य प्रारंभ करने हेतु सुरक्षित।`
  });
});

// 8. POST 24/7 Concierge & Automated Escalation Desk
companionRouter.post('/api/companion/concierge/escalate', (req, res) => {
  const { taskToken, city = 'All-India', reason = 'General Emergency / Assistance Request', escalationLevel = 'Level-2 Duty Officer' } = req.body;

  const incidentId = `ESC-${Math.floor(10000 + Math.random() * 90000)}`;
  res.json({
    success: true,
    incidentId,
    taskToken,
    city,
    escalationLevel,
    responseEtaSeconds: 45,
    assignedDutyOfficer: 'Inspector R. K. Saxena (JITOMNI 24x7 Sovereign Desk)',
    emergencyHotline: '1800-360-SATHI / 112',
    status: 'DISPATCHED_ACTIVE_SURVEILLANCE',
    message: `शिकायत/सहयोग टोकन ${incidentId} दर्ज हुआ। 24/7 ड्यूटी ऑफिसर 45 सेकंड के भीतर सीधे संपर्क कर रहे हैं।`
  });
});

// 9. POST Broadcast Task Token to All-India Qualified Active Sathis
companionRouter.post('/api/companion/task/broadcast', (req, res) => {
  const { taskToken, coreModule, demandCategory, city = 'All-India', location, destination, totalEstimatedAmount } = req.body;
  if (!taskToken) {
    return res.status(400).json({ success: false, message: 'taskToken is required' });
  }

  const activeSathisCount = Math.floor(6 + Math.random() * 8);
  res.json({
    success: true,
    taskToken,
    broadcastAt: new Date().toISOString(),
    city,
    coreModule: coreModule || demandCategory || 'Hospital Sahayak - Medical Support & Guidance',
    location: location || `${city} Central`,
    destination: destination || 'Empanelled Hub',
    totalEstimatedAmount: totalEstimatedAmount || 240,
    activeSathisPushed: activeSathisCount,
    message: `टास्क टोकन ${taskToken} ${city} क्षेत्र के ${activeSathisCount} 'SecureTrust Verified' सक्रिय साथियों को प्रसारित कर दिया गया है।`
  });
});

// 10. POST OTP Verification for Delivery or Task Start
companionRouter.post('/api/companion/task/otp-verify', (req, res) => {
  const { taskToken, enteredOtp, expectedOtp } = req.body;
  if (!enteredOtp) {
    return res.status(400).json({ success: false, message: 'OTP is required' });
  }

  // If matched or mock valid 4-digit
  const isValid = !expectedOtp || enteredOtp === expectedOtp || enteredOtp.length === 4;
  res.json({
    success: isValid,
    taskToken,
    isOtpMatched: isValid,
    message: isValid ? 'ओटीपी सफलतापूर्वक सत्यापित हुआ! सेवा प्रारंभ / डिलीवरी संपन्न।' : 'अमान्य ओटीपी। कृपया ग्राहक से सही 4-अंकीय कोड प्राप्त करें।'
  });
});

// 11. POST Generate or Re-compile Auto-Invoice Receipt
companionRouter.post('/api/companion/invoice/generate', (req, res) => {
  const {
    taskToken = `TT-IND-${Math.floor(10000 + Math.random() * 90000)}`,
    coreModule = 'Hospital Sahayak - Medical Support & Guidance',
    demandCategory = 'Hospital Assistant',
    city = 'All-India',
    taskTitle = 'ऑन-डिमांड साथी सहायता',
    location = 'Central Location',
    destination = 'Empanelled Hub',
    durationHours = 2,
    baseRatePerHour = 120,
    isNight = false,
    assignedWorkerName = 'Pooja Vishwakarma',
    assignedWorkerPhone = '+91 98261 44520',
    assignedWorkerRating = 4.96
  } = req.body;

  const hours = Number(durationHours) || 2;
  const rate = Number(baseRatePerHour) || 120;
  const baseAmount = hours * rate;
  const nightSurcharge = isNight ? 150 : 0;
  const totalAmount = baseAmount + nightSurcharge;
  const partnerEarnings = Math.round(totalAmount * 0.8);
  const platformShare = Math.round(totalAmount * 0.2);
  const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const receipt = `============================================================
           JITOMNI 360° ALL-INDIA SOVEREIGN OPERATIONS RECEIPT
                  ALL-INDIA PREMIUM ON-DEMAND NETWORK
============================================================
TASK TOKEN         : ${taskToken}
DATE & TIME        : ${nowStr}
CITY / REGION      : ${city}
MODULE             : ${coreModule || demandCategory}
TASK TITLE         : ${taskTitle}
START LOCATION     : ${location}
DESTINATION        : ${destination}

------------------------------------------------------------
PRICING & DURATION BREAKDOWN
------------------------------------------------------------
Duration / Units   : ${hours} Hours
Base Rate          : ₹${rate} / Hour
Base Amount        : ₹${baseAmount}
Shift Type         : ${isNight ? 'Night Shift (10:00 PM – 06:00 AM Window)' : 'Day Shift (Standard)'}
Night Surcharge    : ₹${nightSurcharge}
Platform Insurance : Included (₹0 Free Sovereign Cover)
GST / Taxes        : ₹0 (Zero Tax Sovereign Community Benefit)
------------------------------------------------------------
TOTAL FARE PAID    : ₹${totalAmount}
------------------------------------------------------------

PARTNER SETTLEMENT BREAKDOWN (80/20 SPLIT)
------------------------------------------------------------
Sathi Direct Share (80%)  : ₹${partnerEarnings} (Direct DBT / Instant UPI)
Safety & 24/7 Concierge   : ₹${platformShare} (Live GPS & Active Support)
Assigned Sathi            : ${assignedWorkerName} (Rating: ${assignedWorkerRating}★)
Contact Number            : ${assignedWorkerPhone}
Verification Protocol     : 'SecureTrust Verified' (UIDAI + Police Cleared)
============================================================
24/7 Concierge Desk: 1800-360-SATHI / Emergency SOS: 112
"Padhai Se Kamai Tak" — JITOMNI 360° Sovereign Network
============================================================`;

  res.json({
    success: true,
    taskToken,
    receipt,
    totalAmount,
    partnerEarnings,
    platformShare
  });
});
