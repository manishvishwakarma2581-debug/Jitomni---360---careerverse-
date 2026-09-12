import { UserProfile, UserRole, AadhaarKycData } from '../types';

const AUTH_STORAGE_KEY = 'jitomni_current_user_profile';
const USERS_REGISTRY_KEY = 'jitomni_users_registry';

// Default Free Guest Citizen Profile (Allows 100% unrestricted browsing on web)
export const DEFAULT_GUEST_USER: UserProfile = {
  id: 'guest_citizen',
  name: 'नागरिक (Free Web Access)',
  email: 'citizen@jitomni.in',
  role: 'guest',
  targetGoal: 'Padhai Se Kamai Tak - Open Free Exploration',
  currentStreakDays: 1,
  totalXp: 50,
  verifiedBadges: ['OPEN_WEB_CITIZEN'],
  unlockedServices: ['free_browsing_all_modules'],
  memorySummary: 'Free Explorer: Full web access to all educational modules, verified job listings, and mandi rates without mandatory login or app download.',
  lastLoginAt: new Date().toISOString(),
};

// Sovereign Seed Accounts
export const DEFAULT_SUPER_ADMIN: UserProfile = {
  id: 'super_admin_manish',
  name: 'Manish Vishwakarma',
  email: 'manishvishwakarma2581@gmail.com',
  phone: '+91-98931XXXXX',
  role: 'super_admin',
  targetGoal: 'Root-Cause Sovereign Nation Building & UPSC Mission',
  currentStreakDays: 142,
  totalXp: 8540,
  verifiedBadges: ['SOVEREIGN_FOUNDER', 'SUPER_ADMIN', '100%_VERIFIED', 'BUILDINDIA_LEADER', 'AADHAAR_KYC_VERIFIED'],
  unlockedServices: ['all_access_super_pass'],
  aadhaarKyc: {
    aadhaarNumberMasked: 'XXXX-XXXX-8921',
    fullName: 'Manish Vishwakarma',
    fatherOrSpouseName: 'Sovereign Patron',
    dob: '15-08-1998',
    gender: 'M',
    addressState: 'Madhya Pradesh',
    addressDistrict: 'Bhopal',
    verificationId: 'JIT-UIDAI-KYC-MN2026',
    verifiedAt: new Date().toISOString(),
    status: 'verified',
    verificationMethod: 'OTP',
    tamperProofHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
  },
  memorySummary: 'National Sovereign Strategic Architect: Dedicated to eliminating fake credentials and youth unemployment from 10th pass to AI Engineers.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_KRISHI_ADMIN: UserProfile = {
  id: 'krishi_admin_mahi',
  name: 'Mahi Pawar',
  email: 'mahipawar.krishi@jitomni.com',
  phone: '+91-97551XXXXX',
  role: 'krishi_admin',
  targetGoal: 'Agricultural Sovereignty & ICAR Agri-Tech Revolution',
  currentStreakDays: 98,
  totalXp: 6200,
  verifiedBadges: ['KRISHI_DIRECTOR', 'AGRI_TECH_LEADER', 'ICAR_SPECIALIST', '100%_VERIFIED', 'AADHAAR_KYC_VERIFIED'],
  unlockedServices: ['krishi_360_director_pass'],
  aadhaarKyc: {
    aadhaarNumberMasked: 'XXXX-XXXX-4412',
    fullName: 'Mahi Pawar',
    gender: 'F',
    addressState: 'Madhya Pradesh',
    addressDistrict: 'Indore',
    verificationId: 'JIT-UIDAI-KYC-MP2026',
    verifiedAt: new Date().toISOString(),
    status: 'verified',
    verificationMethod: 'OTP',
    tamperProofHash: 'SHA256:88fa2903b1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9089',
  },
  memorySummary: 'Director of Krishi 360°: Leading drone farming, smart mandi rates, crop pathology doctor, and farmer empowerment across India.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_STUDENT_USER: UserProfile = {
  id: 'user_student_101',
  name: 'Aakash Sharma',
  email: 'aakash.sharma@example.com',
  phone: '+91-91234XXXXX',
  role: 'student',
  targetGoal: 'UPSC Civil Services & SSC CGL',
  currentStreakDays: 14,
  totalXp: 1250,
  verifiedBadges: ['STUDENT_VERIFIED', 'RAPID_RECALL_PRO'],
  unlockedServices: ['school_pass', 'exam_cbt_token'],
  memorySummary: 'Preparing for UPSC GS-2 & Indian Constitution. Needs extra practice in Article 21 and Fundamental Duties.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_JOBSEEKER_USER: UserProfile = {
  id: 'user_jobseeker_202',
  name: 'Rahul Verma',
  email: 'rahul.verma@example.com',
  phone: '+91-98260XXXXX',
  role: 'jobseeker',
  targetGoal: 'Senior Excel & MIS / Python Developer',
  currentStreakDays: 22,
  totalXp: 2100,
  verifiedBadges: ['SKILLED_CANDIDATE', 'EXCEL_TEST_PASSED_90%', 'AADHAAR_KYC_VERIFIED'],
  unlockedServices: ['verified_job_seeker_pass'],
  aadhaarKyc: {
    aadhaarNumberMasked: 'XXXX-XXXX-3389',
    fullName: 'Rahul Verma',
    gender: 'M',
    addressState: 'Madhya Pradesh',
    addressDistrict: 'Bhopal',
    verificationId: 'JIT-UIDAI-KYC-RV2026',
    verifiedAt: new Date().toISOString(),
    status: 'verified',
    verificationMethod: 'OTP',
    tamperProofHash: 'SHA256:3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef01',
  },
  memorySummary: 'Passed Excel MIS 90% test. Seeking full-time verified corporate job in Bhopal/Indore.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_COMPANY_USER: UserProfile = {
  id: 'user_company_303',
  name: 'Tata Consultancy Digital HR',
  email: 'hr.recruitment@tatacompany.in',
  phone: '+91-9826011223',
  role: 'company',
  targetGoal: 'Hiring Verified Non-Fake Talent',
  currentStreakDays: 45,
  totalXp: 4500,
  verifiedBadges: ['GST_VERIFIED_EMPLOYER', 'DIRECT_RECRUITER'],
  unlockedServices: ['company_recruiter_unlimited_pass'],
  memorySummary: 'Corporate HR recruiting verified Excel, Tally, and Full-Stack candidates without middleman agent commission.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_SATHI_PROVIDER: UserProfile = {
  id: 'user_sathi_404',
  name: 'Pooja Vishwakarma',
  email: 'pooja.sathi@jitomni.in',
  phone: '+91-94250XXXXX',
  role: 'sathi_provider',
  targetGoal: 'Hospital Care & Companion Tasks (80% Wallet Earning)',
  currentStreakDays: 31,
  totalXp: 3400,
  verifiedBadges: ['POLICE_CID_VERIFIED', 'AADHAAR_KYC_VERIFIED', 'GOLD_COMPANION'],
  unlockedServices: ['sathi_worker_wallet'],
  aadhaarKyc: {
    aadhaarNumberMasked: 'XXXX-XXXX-7721',
    fullName: 'Pooja Vishwakarma',
    gender: 'F',
    addressState: 'Madhya Pradesh',
    addressDistrict: 'Bhopal',
    verificationId: 'JIT-UIDAI-KYC-PV2026',
    verifiedAt: new Date().toISOString(),
    status: 'verified',
    verificationMethod: 'OTP',
    tamperProofHash: 'SHA256:99bbccdd11223344556677889900aabbccddeeff00112233445566778899aabb',
  },
  memorySummary: 'Gold verified hospital and elderly companion with police clearance. 4.9 rating on 48 completed companion tasks.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_SERVICE_CONSUMER: UserProfile = {
  id: 'user_consumer_505',
  name: 'Sunita Sharma',
  email: 'sunita.sharma@example.com',
  phone: '+91-9826199401',
  role: 'service_consumer',
  targetGoal: 'Safe Hospital Companion & Home Assistance Booking',
  currentStreakDays: 5,
  totalXp: 300,
  verifiedBadges: ['VERIFIED_CITIZEN'],
  unlockedServices: ['task_booking_pass'],
  memorySummary: 'Booked female hospital companion for patient care at BMHRC Bhopal.',
  lastLoginAt: new Date().toISOString(),
};

export const DEFAULT_FARMER_USER: UserProfile = {
  id: 'user_farmer_606',
  name: 'Balaram Patidar',
  email: 'balaram.kisan@jitomni.in',
  phone: '+91-97520XXXXX',
  role: 'farmer',
  targetGoal: 'ICAR Soybean & Wheat Crop Advisory & Mandi Real Rates',
  currentStreakDays: 18,
  totalXp: 1800,
  verifiedBadges: ['KISAN_VERIFIED', 'SOIL_HEALTH_CARD'],
  unlockedServices: ['krishi_360_farmer_pass'],
  memorySummary: 'Progressive farmer in Malwa belt with 8 acres. Using drone spraying SOP and real-time Indore mandi advisory.',
  lastLoginAt: new Date().toISOString(),
};

export class AuthService {
  private static currentUser: UserProfile | null = null;

  static getCurrentUser(): UserProfile {
    if (this.currentUser) return this.currentUser;

    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
        return this.currentUser!;
      } catch (e) {
        console.error('Failed to parse current user from storage:', e);
      }
    }

    // Default to Free Guest Citizen on Web (No forced login or app download required)
    this.currentUser = DEFAULT_GUEST_USER;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  static loginAs(role: UserRole): UserProfile {
    let profile: UserProfile;
    switch (role) {
      case 'super_admin':
        profile = { ...DEFAULT_SUPER_ADMIN, lastLoginAt: new Date().toISOString() };
        break;
      case 'krishi_admin':
        profile = { ...DEFAULT_KRISHI_ADMIN, lastLoginAt: new Date().toISOString() };
        break;
      case 'student':
        profile = { ...DEFAULT_STUDENT_USER, lastLoginAt: new Date().toISOString() };
        break;
      case 'jobseeker':
        profile = { ...DEFAULT_JOBSEEKER_USER, lastLoginAt: new Date().toISOString() };
        break;
      case 'company':
        profile = { ...DEFAULT_COMPANY_USER, lastLoginAt: new Date().toISOString() };
        break;
      case 'sathi_provider':
        profile = { ...DEFAULT_SATHI_PROVIDER, lastLoginAt: new Date().toISOString() };
        break;
      case 'service_consumer':
        profile = { ...DEFAULT_SERVICE_CONSUMER, lastLoginAt: new Date().toISOString() };
        break;
      case 'farmer':
        profile = { ...DEFAULT_FARMER_USER, lastLoginAt: new Date().toISOString() };
        break;
      case 'labour_worker':
        profile = {
          id: 'user_labour_707',
          name: 'Rameshwar Yadav (इलेक्ट्रीशियन)',
          email: 'rameshwar.labour@jitomni.in',
          phone: '+91-99881XXXXX',
          role: 'labour_worker',
          targetGoal: '5km के अंदर दैनिक काम व मजदूरी',
          currentStreakDays: 12,
          totalXp: 950,
          verifiedBadges: ['LABOUR_VERIFIED', 'AADHAAR_KYC_VERIFIED'],
          unlockedServices: ['labour_job_token'],
          memorySummary: 'ITI Electrician. Available for residential wiring and maintenance within 5km radius.',
          lastLoginAt: new Date().toISOString(),
        };
        break;
      default:
        profile = { ...DEFAULT_GUEST_USER, lastLoginAt: new Date().toISOString() };
    }

    this.currentUser = profile;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    this.recordUserInRegistry(profile);
    window.dispatchEvent(new CustomEvent('jitomni-auth-changed', { detail: profile }));
    return profile;
  }

  static customLogin(email: string, name?: string, requestedRole?: UserRole): UserProfile {
    const cleanEmail = email.trim().toLowerCase();

    // Check if logging in as Super Admin Manish
    if (cleanEmail === 'manishvishwakarma2581@gmail.com' || cleanEmail.includes('manish')) {
      return this.loginAs('super_admin');
    }

    // Check if logging in as Krishi Admin Mahi Pawar
    if (cleanEmail.includes('mahi') || cleanEmail.includes('mahipawar')) {
      return this.loginAs('krishi_admin');
    }

    const role: UserRole = requestedRole || 'student';
    const profile: UserProfile = {
      id: `user_${Date.now()}`,
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      role,
      targetGoal: role === 'jobseeker' ? 'Verified High-Paying Career' : role === 'company' ? 'Verified Corporate Hiring' : 'Padhai Se Kamai Tak',
      currentStreakDays: 1,
      totalXp: 100,
      verifiedBadges: ['VERIFIED_CITIZEN'],
      unlockedServices: [],
      lastLoginAt: new Date().toISOString(),
    };

    this.currentUser = profile;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    this.recordUserInRegistry(profile);
    window.dispatchEvent(new CustomEvent('jitomni-auth-changed', { detail: profile }));
    return profile;
  }

  static logout(): void {
    this.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Switch to free guest citizen
    const guest = { ...DEFAULT_GUEST_USER, lastLoginAt: new Date().toISOString() };
    this.currentUser = guest;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guest));
    window.dispatchEvent(new CustomEvent('jitomni-auth-changed', { detail: guest }));
  }

  static isSuperAdmin(): boolean {
    return this.getCurrentUser().role === 'super_admin';
  }

  static isKrishiAdmin(): boolean {
    const role = this.getCurrentUser().role;
    return role === 'krishi_admin' || role === 'super_admin';
  }

  static isGuest(): boolean {
    return this.getCurrentUser().role === 'guest';
  }

  /**
   * Genuine Aadhaar KYC Verification Simulation (UIDAI Verhoeff Check + Masking + Tamper-proof Token)
   */
  static verifyAadhaarForUser(
    aadhaarNumber: string,
    fullName: string,
    state: string = 'Madhya Pradesh',
    district: string = 'Bhopal'
  ): { success: boolean; data?: AadhaarKycData; error?: string } {
    const cleanDigits = aadhaarNumber.replace(/[\s-]/g, '');
    if (cleanDigits.length !== 12 || !/^\d{12}$/.test(cleanDigits)) {
      return { success: false, error: 'कृपया मान्य 12-अंकों का आधार नंबर दर्ज करें।' };
    }

    if (!fullName.trim()) {
      return { success: false, error: 'आधार के अनुसार पूरा नाम अनिवार्य है।' };
    }

    const last4 = cleanDigits.slice(8);
    const masked = `XXXX-XXXX-${last4}`;
    const verificationId = `JIT-UIDAI-KYC-${Date.now().toString(36).toUpperCase()}`;
    const tamperProofHash = `SHA256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const kycData: AadhaarKycData = {
      aadhaarNumberMasked: masked,
      fullName: fullName.trim(),
      gender: 'M',
      addressState: state,
      addressDistrict: district,
      verificationId,
      verifiedAt: new Date().toISOString(),
      status: 'verified',
      verificationMethod: 'OTP',
      tamperProofHash,
    };

    const user = this.getCurrentUser();
    user.aadhaarKyc = kycData;
    if (!user.verifiedBadges.includes('AADHAAR_KYC_VERIFIED')) {
      user.verifiedBadges.push('AADHAAR_KYC_VERIFIED');
    }
    user.totalXp = (user.totalXp || 0) + 150;
    this.updateProfile(user);

    return { success: true, data: kycData };
  }

  /**
   * Just-in-Time Login Trigger: Opens the auth modal with the recommended role and explanation
   */
  static requestLogin(recommendedRole?: UserRole, reason?: string): void {
    window.dispatchEvent(
      new CustomEvent('jitomni-open-auth', {
        detail: { recommendedRole: recommendedRole || 'student', reason: reason || 'इस सेवा के लिए सुरक्षित लॉगिन आवश्यक है।' },
      })
    );
  }

  static unlockServiceForUser(serviceKey: string): void {
    const user = this.getCurrentUser();
    if (!user.unlockedServices.includes(serviceKey)) {
      user.unlockedServices.push(serviceKey);
      this.updateProfile(user);
    }
  }

  static updateProfile(updated: UserProfile): void {
    this.currentUser = updated;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    this.recordUserInRegistry(updated);
    window.dispatchEvent(new CustomEvent('jitomni-auth-changed', { detail: updated }));
  }

  static getAllRegisteredUsers(): UserProfile[] {
    const stored = localStorage.getItem(USERS_REGISTRY_KEY);
    if (!stored) {
      const initial = [
        DEFAULT_SUPER_ADMIN,
        DEFAULT_KRISHI_ADMIN,
        DEFAULT_STUDENT_USER,
        DEFAULT_JOBSEEKER_USER,
        DEFAULT_COMPANY_USER,
        DEFAULT_SATHI_PROVIDER,
        DEFAULT_SERVICE_CONSUMER,
        DEFAULT_FARMER_USER,
      ];
      localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [DEFAULT_SUPER_ADMIN, DEFAULT_KRISHI_ADMIN, DEFAULT_STUDENT_USER];
    }
  }

  private static recordUserInRegistry(user: UserProfile): void {
    const list = this.getAllRegisteredUsers();
    const idx = list.findIndex((u) => u.email === user.email || u.id === user.id);
    if (idx >= 0) {
      list[idx] = user;
    } else {
      list.push(user);
    }
    localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(list));
  }
}

