// ============================================================================
// JITOMNI 360° — ON-DEMAND SATHI & TASK MODULE: TROJAN BRIDGE ARCHITECTURE
// Color Palette: Royal Navy Blue (#0A1931) + Gold (#FFD700 / #D4AF37) + White
// Tagline: "6 App Delete Karo, 1 App Rakho"
// ============================================================================

export type ServiceMainCategory = 'hourly_sathi' | 'task_based' | 'quick_commerce';

export type SubCategoryType = 
  | 'sathi_senior'
  | 'sathi_medical'
  | 'sathi_bank_govt'
  | 'sathi_shopping'
  | 'sathi_chaperone'
  | 'task_bill_pay'
  | 'task_delivery'
  | 'task_senior_help'
  | 'task_doc_pickup'
  | 'task_repair_plumber'
  | 'task_electrician'
  | 'quick_kirana'
  | 'quick_dairy_veggies'
  | 'quick_medicine'
  | 'quick_food_meal';

export type ProviderCategory = 
  | 'food_restaurant' 
  | 'grocery_kirana' 
  | 'ride_transport' 
  | 'home_service' 
  | 'medical_pharma' 
  | 'courier_logistics';

export type OrderStatus = 
  | 'pending_routing'      // Looking for Royal Sathi or Provider
  | 'notified_sathi'       // Pushed to Royal Sathi Pool (90s window)
  | 'cascaded_to_provider' // Sathi didn't accept -> forwarded to nearest tied-up provider
  | 'forwarded_to_partner' // Forwarded to Pan-India partner network (in non-direct zones)
  | 'provider_accepted'    // Provider accepted
  | 'sathi_accepted'       // Royal Sathi accepted
  | 'in_progress'          // Task started (OTP verified)
  | 'completed'            // Task ended (Photo proof + End OTP)
  | 'cancelled';

export type FulfillmentType = 'royal_sathi' | 'tied_up_provider' | 'pan_india_forwarded';

export interface LocationPoint {
  address: string;
  landmark?: string;
  city: string;
  cityCode: string; // e.g. JS-RWA, JS-BPL, JS-PAN
  state?: string;
  pincode?: string;
  lat?: number;
  lng?: number;
  zoneType?: 'direct_hub' | 'pan_india_forward';
}

export interface ForwardedPartnerInfo {
  partnerName: string;
  partnerType: string; // e.g. "Local Verified Sathi Network", "City Restaurant Syndicate", "Quick Kirana Hub", "Technicians Guild"
  contactPhone?: string;
  dispatchChannel: 'api_webhook' | 'whatsapp_dispatch' | 'portal_feed';
  forwardedAt: string;
  commissionPercent: number;
  platformCommissionKept: number;
  partnerNetPayout: number;
  dispatchStatus: 'dispatched' | 'acknowledged' | 'in_delivery' | 'delivered';
  whatsappPayloadText?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit?: string;
}

export interface CommissionBreakdown {
  totalAmount: number;
  fulfillmentType: FulfillmentType;
  model: '90_10' | '80_20' | 'pan_india_commission' | 'custom';
  platformFeePercent: number; // e.g. 10% for Sathi, 20% for Provider, 15-20% for Pan-India forward
  platformFeeAmount: number;
  payoutToWorkerOrProvider: number;
  gstAmount: number;
  safetyAssuranceFee: number;
}

export interface TrojanOrder {
  orderId: string; // e.g. JIT-ORD-8492
  customerName: string;
  customerPhone: string;
  mainCategory: ServiceMainCategory;
  subCategory: SubCategoryType;
  serviceTitle: string;
  taskDetails: string;
  location: LocationPoint;
  destinationLocation?: LocationPoint; // for delivery/rides
  items?: OrderItem[];
  hourlyDurationHours?: number; // 2, 4, or 8 hours
  totalAmount: number;
  paymentMethod: 'upi_mock' | 'cod' | 'razorpay_mock';
  paymentStatus: 'paid' | 'pending_cod';
  status: OrderStatus;
  fulfillmentType?: FulfillmentType;
  isPanIndiaForwarded?: boolean;
  forwardedPartnerInfo?: ForwardedPartnerInfo;
  
  // Routing tracking
  createdAt: string;
  sathiBroadcastExpiresAt?: string; // 90 sec after creation for Sathi
  providerBroadcastExpiresAt?: string;
  routingStage: 1 | 2 | 3; // 1: Sathi Pool (90s), 2: Provider Cascade / Forwarding, 3: Completed/Escalated
  
  // Assigned Worker
  assignedSathiId?: string; // e.g. JS-RWA-1042
  assignedSathiName?: string;
  assignedSathiPhone?: string;
  assignedSathiPhoto?: string;
  
  // Assigned Provider
  assignedProviderId?: string; // e.g. PRV-RWA-01
  assignedProviderName?: string;
  assignedProviderCategory?: ProviderCategory;
  assignedProviderPhone?: string;
  
  // Security OTPs & Verification
  startOtp: string;
  endOtp: string;
  proofPhotoUrl?: string;
  
  // Financial Settlement
  commission: CommissionBreakdown;
  
  // Customer review
  rating?: number;
  review?: string;
}

export interface RoyalSathiWorker {
  id: string;
  royalId: string; // e.g. JS-RWA-1042
  name: string;
  phone: string;
  photoUrl: string;
  cityCode: string;
  cityName: string;
  aadharMasked: string;
  isPoliceVerified: boolean;
  policeVerificationRef: string;
  status: 'online' | 'offline' | 'busy';
  subscriptionActive: boolean;
  subscriptionPlan: '₹299/month';
  subscriptionExpiry: string;
  rating: number;
  totalTasksCompleted: number;
  walletBalance: number;
  totalEarningsGross: number;
  totalPlatformCut10: number;
  totalNetWithdrawn: number;
  bankAccountMasked: string;
  currentLat?: number;
  currentLng?: number;
}

export interface TiedUpProvider {
  id: string; // e.g. PRV-RWA-01
  businessName: string;
  category: ProviderCategory;
  cityCode: string;
  cityName: string;
  address: string;
  ownerName: string;
  phone: string;
  email?: string;
  agreedCommissionPercent: number; // default 20%
  integrationMode: 'manual_panel' | 'api_webhook';
  webhookUrl?: string;
  apiKeyMasked?: string;
  approvalStatus: 'approved' | 'pending_review' | 'rejected' | 'suspended';
  registrationDate: string;
  rating: number;
  totalOrdersReceived: number;
  totalSettlementPaid: number;
  totalPlatformKept: number;
  isOpen: boolean;
}

export interface CityCodeConfig {
  code: string; // e.g. JS-RWA, JS-MUM, JS-BLR
  cityName: string; // Rewa
  state: string; // Madhya Pradesh
  region: 'Central' | 'North' | 'South' | 'West' | 'East' | 'NorthEast';
  zoneType: 'direct_hub' | 'pan_india_forward';
  isActive: boolean;
  activeSathisCount: number;
  activeProvidersCount: number;
  forwardingPartnerNetworks?: string[]; // e.g. ["Local Sathi Syndicate", "Zomato/Swiggy Fleet Hub", "City Kirana Network"]
}

export interface CategoryCommissionSetting {
  category: ProviderCategory | 'hourly_sathi';
  title: string;
  defaultCommissionPercent: number;
  minPercent: number;
  maxPercent: number;
}

export interface TrojanAnalytics {
  totalCustomers: number;
  repeatMultiServiceCustomers: number; // Trojan Metric
  estimatedAppsDeleted: number; // e.g. Zomato, Blinkit, UC, Ola
  totalOrdersPlaced: number;
  ordersFulfilledBySathis: number; // 90/10 model
  ordersFulfilledByProviders: number; // 80/20 model
  panIndiaForwardedOrders: number; // Pan-India Non-Direct Forwarding
  totalGrossOrderValue: number;
  totalPlatformRevenueEarned: number; // From 10% sathi + 20% provider cuts + Pan-India commission + Rs 299 subs
  panIndiaCommissionEarned: number;
  totalCitiesCovered: number;
  totalStatesCovered: number;
  averageFulfillmentTimeMins: number;
}
