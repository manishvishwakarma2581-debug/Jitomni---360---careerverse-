export type AutoRideType = 'instant' | 'rental';

export type AutoRideStatus = 
  | 'searching'
  | 'driver_assigned'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type AutoDriverStatus = 'active' | 'pending' | 'rejected' | 'blocked';

export type TShirtSize = 'M' | 'L' | 'XL' | 'XXL';

export interface AutoDriver {
  royalId: string;             // Format: JS-[CITY_CODE]-[4 DIGIT NUMBER] e.g. JS-RWA-0001
  cityCode: string;            // e.g. RWA, JBP, BPL, IND, SAT, DEL, etc.
  cityName: string;            // e.g. Rewa, Jabalpur, Bhopal
  name: string;
  phone: string;
  autoNumber: string;          // e.g. MP 17 RA 4592
  aadharNumber: string;        // 12 digits
  licenseNumber: string;       // e.g. MP17 20210045892
  address: string;
  photoUrl: string;
  autoPhotoUrl: string;
  isAadharVerified: boolean;
  isLicenseVerified: boolean;
  isPoliceVerified: boolean;
  status: AutoDriverStatus;
  rating: number;              // e.g. 4.85
  totalRides: number;
  currentLocation: {
    lat: number;
    lng: number;
    landmark: string;
  };
  qrCodeUrl?: string;
  joiningDate: string;
  tShirtSize: TShirtSize;
  languages: string[];
  isOnline: boolean;
  todayEarnings: number;
  todayRidesCount: number;
  sosStatus: 'safe' | 'alert' | 'active_emergency';
  joiningFeePaid: boolean;     // Rs 1,499
  subscriptionPaid: boolean;   // Rs 299 / month
  subscriptionValidTill?: string; // e.g. 2026-10-24
  vehicleRcNumber?: string;    // e.g. RC-MP17-2022-9018
}

// ===================================================
// BRIDGE NETWORK, DEMAND TOWER & DEMAND PARTNERS
// ===================================================

export type OrderServiceType = 'auto' | 'food' | 'royalService';

export type BridgeOrderStatus = 
  | 'pending'
  | 'assigned_royal'
  | 'assigned_partner'
  | 'accepted'
  | 'in_progress'
  | 'delivered'
  | 'escalated'
  | 'cancelled';

export type BridgePriorityLevel = 1 | 2 | 3; // 1: Own Royal Worker (90s), 2: Demand Partner (60s), 3: Admin Escalated

export interface BridgeCommissionSplit {
  totalAmount: number;
  workerOrPartnerCut: number; // 90% if Royal Worker, 80% if Demand Partner
  platformCut: number;        // 10% if Royal Worker, 20% if Demand Partner (Bridge Fee)
  model: '90_10' | '80_20';
  commissionPercent: number;  // 10 or 20
  description: string;
  isPartnerFulfillment?: boolean;
}

export type DemandPartnerType = 'restaurant' | 'auto_provider' | 'local_service' | 'local_agency';

export interface MenuItem {
  id: string;
  name: string;
  hindiName: string;
  price: number;
  isVeg: boolean;
  category: string;
  prepTimeMins: number;
  description: string;
  photoUrl?: string;
}

export type DemandPartnerMenuItem = MenuItem;

export interface DemandPartner {
  id: string;                  // e.g. PRT-RWA-REST-01
  partnerRoyalId: string;      // e.g. JS-RWA-P001
  name: string;                // e.g. श्री कृष्णा भोजनालय (Shree Krishna)
  type: DemandPartnerType;
  cityName: string;
  cityCode: string;
  distanceKm: number;
  phone: string;
  rating: number;
  address: string;
  photoUrl: string;
  isVerified: boolean;
  activeOrdersCount: number;
  totalEarned80: number;
  totalOrdersCompleted: number;
  menuItems?: MenuItem[];
  vehicleFleetCount?: number;
  isOpen: boolean;
  qrCodeUrl?: string;
}

export interface BridgeOrder {
  orderId: string;             // e.g. ORD-RWA-9821
  type: OrderServiceType;      // 'auto' | 'food' | 'royalService'
  serviceTitle: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  drop: {
    address: string;
    lat: number;
    lng: number;
  };
  items?: { name: string; quantity: number; price: number }[];
  totalAmount?: number;
  status: BridgeOrderStatus;
  priorityLevel: BridgePriorityLevel; // 1: Own Royal Worker (90s), 2: Nearest Partner (60s), 3: Admin Escalated
  assignedRoyalId?: string;
  assignedRoyalName?: string;
  assignedWorkerName?: string;
  assignedPartnerId?: string;
  assignedPartnerName?: string;
  assignedPartnerType?: DemandPartnerType;
  timers: {
    royalWorkerTimeoutSec: number; // 90 seconds
    partnerTimeoutSec: number;     // 60 seconds
    elapsedSec: number;
    currentCountdown: number;      // starts at 90s in P1, 60s in P2
    activeTimerStage: 'royal' | 'partner' | 'escalated' | 'completed';
  };
  commissionSplit: BridgeCommissionSplit;
  createdAt: string;
  acceptedAt?: string;
  deliveredAt?: string;
  deliveryOtp: string;
  sosTriggered?: boolean;
  notes?: string;
}

// 9 Royal Sovereign Services
export interface RoyalServiceItem {
  id: string;
  serviceNumber: number; // 1 to 9
  name: string;
  hindiName: string;
  icon: string;
  badge: string;
  tagline: string;
  description: string;
  baseHourlyRate: number;
  minHours: number;
  recommendedHours: number;
  popularUse: string[];
  bgGradient: string;
}

export interface AutoRide {
  rideId: string;              // e.g. RIDE-RWA-9821
  rideType: AutoRideType;      // 'instant' | 'rental'
  customerId: string;
  customerName: string;
  customerPhone: string;
  driverRoyalId: string;
  driverName: string;
  driverPhone: string;
  driverAutoNumber: string;
  driverPhoto: string;
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  drop: {
    address: string;
    lat: number;
    lng: number;
  };
  rentalPackageHours?: number; // 2, 4, or 8 hours for rental mode
  fare: number;
  distanceKm: number;
  estimatedMins: number;
  status: AutoRideStatus;
  startOtp: string;            // 4 digit OTP e.g. 5824
  sosTriggered: boolean;
  timestamp: string;
  paymentMode: 'cash' | 'upi';
  paymentStatus: 'pending' | 'paid';
  commissionAmount: number;    // Rs 10 flat per ride
  ratingGiven?: number;
  feedback?: string;
}

export interface AutoSOSTicket {
  ticketId: string;
  rideId: string;
  driverRoyalId: string;
  driverName: string;
  customerName: string;
  customerPhone: string;
  triggeredBy: 'customer' | 'driver' | 'ai_safety_system';
  reason: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  audioRecordingSimulated: boolean;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
  nearestPoliceStation: string;
  notes?: string;
}

export interface CityCodeInfo {
  code: string;
  name: string;
  state: string;
  defaultLat: number;
  defaultLng: number;
  keyLandmarks: string[];
}
