export interface FranchiseApplication {
  id: string;
  name: string;
  city: string;
  state: string;
  mobile: string;
  email: string;
  investmentReady: 'yes' | 'need_support' | 'no';
  reason: string;
  experience?: string;
  status: 'pending' | 'approved' | 'rejected';
  feePaid: boolean;
  appliedDate: string;
  assignedCityId?: string;
  notes?: string;
}

export interface FranchiseCity {
  id: string;
  cityName: string;
  state: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail: string;
  loginPasscode: string;
  status: 'active' | 'pending_training' | 'blocked';
  franchiseFeePaid: boolean;
  franchiseFeeAmount: number;
  joinedDate: string;
  isHeadOffice?: boolean;
  totalBookings: number;
  totalRevenue: number;
  totalWorkers: number;
  monthlyBrandFeePaid: boolean;
  lastRoyaltyTransferDate?: string;
  officeAddress?: string;
  trainedStaffCount?: {
    girls: number;
    boys: number;
  };
}

export interface CityWorker {
  id: string;
  cityId: string;
  cityName: string;
  name: string;
  mobile: string;
  serviceCategory: string;
  skillName: string;
  experienceYears: number;
  status: 'active' | 'pending_verification' | 'blocked';
  aadhaarVerified: boolean;
  policeVerified: boolean;
  rating: number;
  totalTasksCompleted: number;
  dailyEarningsToday: number;
  joinedDate: string;
}

export interface CityBooking {
  id: string;
  cityId: string;
  cityName: string;
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  serviceName: string;
  category: string;
  date: string;
  time: string;
  totalAmount: number;
  franchiseShare70: number;
  headOfficeShare30: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  assignedWorkerMobile?: string;
  notes?: string;
  otp?: string;
}

export interface WithdrawalRequest {
  id: string;
  cityId: string;
  cityName: string;
  amount: number;
  upiIdOrBank: string;
  accountHolderName: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  transactionRef?: string;
}

export interface FranchiseSettings {
  franchiseFee: number; // default 75000
  ownerCommissionRate: number; // default 70
  headOfficeCommissionRate: number; // default 30
  monthlyBrandFee: number; // default 3000
  headOfficeCity: string; // 'Rewa'
  headOfficeState: string; // 'Madhya Pradesh'
  headOfficeContact: string; // '9399608239'
  headOfficeDirector: string; // 'Manish Vishwakarma'
}

export interface PanIndiaCityPresence {
  id: string;
  name: string;
  state: string;
  tagline: string;
  establishedYear: string;
  type: 'head_office' | 'metro_hub' | 'tier2_hub';
  icon: string;
  activeWorkers: number;
  monthlyBookings: number;
  badge: string;
}
