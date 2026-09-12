import { PaymentTier, PaymentTransaction } from '../types';
import { AuthService } from './authService';

const TRANSACTIONS_STORAGE_KEY = 'jitomni_payment_transactions';
const MONETIZATION_PHASE_KEY = 'jitomni_monetization_phase';

export const NOMINAL_PAYMENT_TIERS: PaymentTier[] = [
  {
    id: 'tier_skill_dossier',
    serviceKey: 'verified_skill_test',
    title: {
      hi: '🏢 100% वेरिफाइड स्किल डोज़ियर व AI सर्टिफिकेट',
      en: '🏢 100% Verified Skill Dossier & AI Certificate',
    },
    categoryBadge: 'Hiring & Jobs',
    nominalPriceRupee: 19,
    phase2StandardPriceRupee: 149,
    durationOrUsage: '1-Time Certification & Dossier Download',
    features: [
      '10 MCQ स्किल टेस्ट सर्टिफिकेशन',
      'Aadhaar & Degree नॉन-टैम्परेबल QR कोड बैज',
      'कंपनियों को डायरेक्ट प्रिफर्ड लिस्टिंग',
      'फर्जी प्रोफाइल से 100% सुरक्षा',
    ],
    icon: 'ShieldCheck',
    popular: true,
  },
  {
    id: 'tier_ai_interview',
    serviceKey: 'ai_interview_badge',
    title: {
      hi: '🎥 AI वीडियो इंटरव्यू इवैल्यूएशन व प्रो बैज',
      en: '🎥 AI Video Interview Evaluation & Pro Badge',
    },
    categoryBadge: 'High-Profile Careers',
    nominalPriceRupee: 29,
    phase2StandardPriceRupee: 199,
    durationOrUsage: 'Full 10-Min Video Mock Interview',
    features: [
      'रियल-टाइम AI वॉइस व कैमरा असेसमेंट',
      'कॉन्फिडेंस, टेक्निकल एक्यूरेसी व बॉडी लैंग्वेज स्कोरिंग',
      'कंपनी डायरेक्ट एचआर रिपोर्ट',
      '₹50,000+ पैकेज हेतु प्रो-बैज',
    ],
    icon: 'Video',
  },
  {
    id: 'tier_kisan_prescription',
    serviceKey: 'kisan_soil_prescription',
    title: {
      hi: '🌾 किसान सॉइल हेल्थ व फसल डॉक्टर प्रिस्क्रिप्शन',
      en: '🌾 Kisan Soil Health & Crop Doctor Prescription',
    },
    categoryBadge: 'Krishi 360°',
    nominalPriceRupee: 9,
    phase2StandardPriceRupee: 49,
    durationOrUsage: '1 Full Crop Season Prescription',
    features: [
      'NPK न्यूट्रिएंट व बीमारी निदान प्रिस्क्रिप्शन PDF',
      'स्मार्ट मंडी भाव व स्थानीय मौसम अलर्ट्स',
      'ICAR एग्रोनॉमिस्ट व माही पवार डेस्क प्राथमिकता',
      'CHC मशीनरी बुकिंग पर 5% विशेष छूट',
    ],
    icon: 'Sprout',
    popular: true,
  },
  {
    id: 'tier_companion_booking',
    serviceKey: 'companion_service_token',
    title: {
      hi: '🤝 ऑन-डिमांड साथी बुकिंग सुरक्षा टोकन',
      en: '🤝 On-Demand Companion Booking Safety Token',
    },
    categoryBadge: 'Companion & Tasks',
    nominalPriceRupee: 25,
    phase2StandardPriceRupee: 99,
    durationOrUsage: 'Per Booking Verification & SOS Coverage',
    features: [
      '100% पुलिस व आधार वेरिफाइड युवा साथी',
      'लाइव जीपीएस लोकेशन रडार व 1-टैप SOS 112',
      '80/20 पारदर्शी रेवेन्यू स्प्लिट गारंटी',
      'अस्पताल व बुजुर्ग सहायता हेतु सुरक्षित बीमा',
    ],
    icon: 'HeartHandshake',
  },
  {
    id: 'tier_cbt_mock_rank',
    serviceKey: 'cbt_mock_exam_rank',
    title: {
      hi: '🏆 ऑल इंडिया CBT मॉक टेस्ट व वीकनेस डायग्नोस्टिक',
      en: '🏆 All India CBT Mock Test & Weakness Diagnostic',
    },
    categoryBadge: 'UPSC / SSC / JEE / ITI',
    nominalPriceRupee: 15,
    phase2StandardPriceRupee: 99,
    durationOrUsage: 'Full Timed CBT Exam + All India Rank',
    features: [
      'वास्तविक परीक्षा पैटर्न व नेगेटिव मार्किंग',
      'सटीक ऑल इंडिया रैंक अनुमान',
      'AI वीकनेस रडार व 360° सलूशन रोडमैप',
      'डाउनलोड करने योग्य ऑफिशियल आंसर की',
    ],
    icon: 'Award',
  },
  {
    id: 'tier_prime_monthly',
    serviceKey: 'prime_ai_monthly_pass',
    title: {
      hi: '🧠 JITOMNI PRIME AI अनलिमिटेड मंथली पास',
      en: '🧠 JITOMNI PRIME AI Unlimited Monthly Pass',
    },
    categoryBadge: 'Autonomous AI',
    nominalPriceRupee: 49,
    phase2StandardPriceRupee: 299,
    durationOrUsage: '30 Days Full Access',
    features: [
      '6 ऑटोनोमस AI एजेंट्स अनलिमिटेड एक्सेस',
      'अनलिमिटेड 360° PDF एवं क्विज जनरेशन',
      'वॉइस कमांड एवं लॉन्ग-टर्म AI मेमोरी',
      'कक्षा 1 से 12 एवं सभी प्रतियोगी परीक्षाओं की तैयारी',
    ],
    icon: 'BrainCircuit',
  },
  {
    id: 'tier_global_ai_upwork',
    serviceKey: 'global_ai_upwork_kit',
    title: {
      hi: '🌍 ग्लोबल AI जॉब्स Upwork & प्रॉम्प्टिंग ब्लूप्रिंट',
      en: '🌍 Global AI Jobs Upwork & Prompting Blueprint',
    },
    categoryBadge: 'USD Remote Jobs',
    nominalPriceRupee: 19,
    phase2StandardPriceRupee: 149,
    durationOrUsage: 'Lifetime Kit & Winning Proposal Templates',
    features: [
      'Upwork/Fiverr $25-$45/hr प्रपोजल टेम्पलेट्स',
      'Outlier AI & Scale AI टेस्ट पासिंग गाइड',
      'Payoneer/Wise 0% फॉरेक्स विथड्रॉल गाइड',
      '7-दिवसीय अर्निंग मास्टरक्लास',
    ],
    icon: 'Globe2',
  },
];

export class PaymentService {
  static getMonetizationPhase(): 'phase1_nominal' | 'phase2_sustainable' {
    const stored = localStorage.getItem(MONETIZATION_PHASE_KEY);
    return (stored as any) || 'phase1_nominal';
  }

  static setMonetizationPhase(phase: 'phase1_nominal' | 'phase2_sustainable'): void {
    localStorage.setItem(MONETIZATION_PHASE_KEY, phase);
    window.dispatchEvent(new CustomEvent('jitomni-phase-changed', { detail: phase }));
  }

  static getEffectivePrice(tier: PaymentTier): number {
    const phase = this.getMonetizationPhase();
    return phase === 'phase1_nominal' ? tier.nominalPriceRupee : tier.phase2StandardPriceRupee;
  }

  static getTransactions(): PaymentTransaction[] {
    const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!raw) {
      // Seed with initial sovereign transactions
      const seed: PaymentTransaction[] = [
        {
          id: 'tx_seed_101',
          userId: 'user_student_101',
          userName: 'Aakash Sharma',
          userEmail: 'aakash.sharma@example.com',
          serviceKey: 'verified_skill_test',
          serviceTitle: '🏢 100% वेरिफाइड स्किल डोज़ियर व AI सर्टिफिकेट',
          amountRupee: 19,
          paymentMethod: 'upi_qr',
          upiRefNumber: 'UPI/2026/894729104',
          status: 'success',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          invoiceNo: 'INV-JIT-2026-001',
        },
        {
          id: 'tx_seed_102',
          userId: 'user_kisan_202',
          userName: 'Ramesh Patel (Kisan)',
          userEmail: 'ramesh.kisan@example.com',
          serviceKey: 'kisan_soil_prescription',
          serviceTitle: '🌾 किसान सॉइल हेल्थ व फसल डॉक्टर प्रिस्क्रिप्शन',
          amountRupee: 9,
          paymentMethod: 'upi_vpa',
          upiRefNumber: 'UPI/2026/782194821',
          status: 'success',
          timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
          invoiceNo: 'INV-JIT-2026-002',
        },
        {
          id: 'tx_seed_103',
          userId: 'user_companion_303',
          userName: 'Sunita Verma',
          userEmail: 'sunita.v@example.com',
          serviceKey: 'companion_service_token',
          serviceTitle: '🤝 ऑन-डिमांड साथी बुकिंग सुरक्षा टोकन',
          amountRupee: 25,
          paymentMethod: 'upi_qr',
          upiRefNumber: 'UPI/2026/194819283',
          status: 'success',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          invoiceNo: 'INV-JIT-2026-003',
        },
      ];
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static createTransaction(
    serviceKey: string,
    serviceTitle: string,
    amountRupee: number,
    paymentMethod: PaymentTransaction['paymentMethod'],
    upiRefNumber?: string
  ): PaymentTransaction {
    const user = AuthService.getCurrentUser();
    const invoiceNo = `INV-JIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const tx: PaymentTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      serviceKey,
      serviceTitle,
      amountRupee,
      paymentMethod,
      upiRefNumber: upiRefNumber || `UPI/${Date.now().toString().slice(-8)}`,
      status: 'success',
      timestamp: new Date().toISOString(),
      invoiceNo,
    };

    const current = this.getTransactions();
    current.unshift(tx);
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(current));

    // Unlock service in user profile
    AuthService.unlockServiceForUser(serviceKey);

    window.dispatchEvent(new CustomEvent('jitomni-payment-success', { detail: tx }));
    return tx;
  }

  static getTotalRevenue(): { totalAmount: number; count: number; todayAmount: number } {
    const txs = this.getTransactions().filter((t) => t.status === 'success');
    const totalAmount = txs.reduce((sum, t) => sum + t.amountRupee, 0);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayAmount = txs
      .filter((t) => new Date(t.timestamp) >= todayStart)
      .reduce((sum, t) => sum + t.amountRupee, 0);

    return {
      totalAmount,
      count: txs.length,
      todayAmount,
    };
  }

  static generateUPIIntentUrl(amount: number, note: string): string {
    // Official Sovereign Merchant UPI Link Format
    const upiId = 'manishvishwakarma2581@okhdfcbank';
    const payeeName = encodeURIComponent('Jitomni Careerverse');
    const transactionNote = encodeURIComponent(note);
    return `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}`;
  }
}
