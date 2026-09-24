// ============================================================================
// TROJAN BRIDGE STORAGE & INTELLIGENT ROUTING ENGINE
// Handles Orders, Royal Sathis, Tied-up Providers, Real-time Cascade & Settlements
// ============================================================================

import { 
  TrojanOrder, 
  RoyalSathiWorker, 
  TiedUpProvider, 
  CityCodeConfig, 
  CategoryCommissionSetting, 
  TrojanAnalytics,
  CommissionBreakdown,
  ServiceMainCategory,
  ProviderCategory,
  FulfillmentType,
  ForwardedPartnerInfo
} from './trojanTypes';
import { TrojanRealtime } from './supabaseClient';

const STORAGE_KEYS = {
  ORDERS: 'jitomni_trojan_orders_v1',
  SATHIS: 'jitomni_trojan_sathis_v1',
  PROVIDERS: 'jitomni_trojan_providers_v1',
  COMMISSION_SETTINGS: 'jitomni_trojan_commissions_v1',
  CITY_CODES: 'jitomni_trojan_cities_v1',
  ACTIVE_USER_ID: 'jitomni_trojan_active_sathi_id',
};

// Seed City Codes (Pan-India Coverage across all Regions & States)
const DEFAULT_CITIES: CityCodeConfig[] = [
  // CENTRAL (HQ & Sovereign Sathi Hubs)
  { code: 'JS-RWA', cityName: 'रीवा (Rewa - HQ)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'direct_hub', isActive: true, activeSathisCount: 18, activeProvidersCount: 42 },
  { code: 'JS-BPL', cityName: 'भोपाल (Bhopal)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'direct_hub', isActive: true, activeSathisCount: 34, activeProvidersCount: 78 },
  { code: 'JS-IND', cityName: 'इंदौर (Indore)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'direct_hub', isActive: true, activeSathisCount: 45, activeProvidersCount: 95 },
  { code: 'JS-JBP', cityName: 'जबलपुर (Jabalpur)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'direct_hub', isActive: true, activeSathisCount: 22, activeProvidersCount: 50 },
  { code: 'JS-GWL', cityName: 'ग्वालियर (Gwalior)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'direct_hub', isActive: true, activeSathisCount: 16, activeProvidersCount: 38 },
  { code: 'JS-STN', cityName: 'सतना (Satna)', state: 'Madhya Pradesh', region: 'Central', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 28, forwardingPartnerNetworks: ['सतना व्यापारी सिंडिकेट', 'लोकल ऑटो-टैक्सी यूनियन'] },
  { code: 'JS-RPR', cityName: 'रायपुर (Raipur)', state: 'Chhattisgarh', region: 'Central', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 46, forwardingPartnerNetworks: ['छत्तीसगढ़ क्विक किराना नेटवर्क', 'लोकल केयरटेकर एजेंसी'] },

  // NORTH
  { code: 'JS-DEL', cityName: 'दिल्ली NCR (Delhi)', state: 'Delhi NCR', region: 'North', zoneType: 'direct_hub', isActive: true, activeSathisCount: 65, activeProvidersCount: 140 },
  { code: 'JS-LKO', cityName: 'लखनऊ (Lucknow)', state: 'Uttar Pradesh', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 72, forwardingPartnerNetworks: ['अवध सर्विस पार्टनर्स', 'लखनऊ किराना फ्लीट'] },
  { code: 'JS-KNP', cityName: 'कानपुर (Kanpur)', state: 'Uttar Pradesh', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 55, forwardingPartnerNetworks: ['कानपुर ट्रेडर्स नेटवर्क'] },
  { code: 'JS-VNS', cityName: 'वाराणसी (Varanasi)', state: 'Uttar Pradesh', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 48, forwardingPartnerNetworks: ['काशी सेवा प्रदाता समिति'] },
  { code: 'JS-PRY', cityName: 'प्रयागराज (Prayagraj)', state: 'Uttar Pradesh', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 42, forwardingPartnerNetworks: ['संगम सिटी डिलीवरी नेटवर्क'] },
  { code: 'JS-JPR', cityName: 'जयपुर (Jaipur)', state: 'Rajasthan', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 65, forwardingPartnerNetworks: ['गुलाबी नगर किराना व कैब पार्टनर'] },
  { code: 'JS-PAT', cityName: 'पटना (Patna)', state: 'Bihar', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 54, forwardingPartnerNetworks: ['बिहार ऑन-डिमांड एसोसिएट्स'] },
  { code: 'JS-CHD', cityName: 'चंडीगढ़ (Chandigarh)', state: 'Punjab/Haryana', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 38, forwardingPartnerNetworks: ['ट्राईसिटी क्विक लॉजिस्टिक्स'] },
  { code: 'JS-DDN', cityName: 'देहरादून (Dehradun)', state: 'Uttarakhand', region: 'North', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 32, forwardingPartnerNetworks: ['दून वैली केयरटेकर्स'] },

  // WEST
  { code: 'JS-MUM', cityName: 'मुंबई (Mumbai)', state: 'Maharashtra', region: 'West', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 165, forwardingPartnerNetworks: ['मुंबई डब्बावाला व मर्चेंट नेटवर्क', 'महा-केयर प्रोवाइडर्स'] },
  { code: 'JS-PUN', cityName: 'पुणे (Pune)', state: 'Maharashtra', region: 'West', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 96, forwardingPartnerNetworks: ['पुणे एक्सप्रेस टास्क सिंडिकेट'] },
  { code: 'JS-AMD', cityName: 'अहमदाबाद (Ahmedabad)', state: 'Gujarat', region: 'West', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 82, forwardingPartnerNetworks: ['गुजरात व्यापारी फ्लीट'] },
  { code: 'JS-SRT', cityName: 'सूरत (Surat)', state: 'Gujarat', region: 'West', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 58, forwardingPartnerNetworks: ['सूरत किराना व होम सर्विसेज'] },
  { code: 'JS-NGP', cityName: 'नागपुर (Nagpur)', state: 'Maharashtra', region: 'West', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 50, forwardingPartnerNetworks: ['विदर्भ लोकल टास्क फोर्स'] },

  // SOUTH
  { code: 'JS-BLR', cityName: 'बेंगलुरु (Bengaluru)', state: 'Karnataka', region: 'South', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 145, forwardingPartnerNetworks: ['सिलिकॉन वैली हाइपरलोकल फ्लीट', 'बेंगलुरु केयर नेटवर्क'] },
  { code: 'JS-HYD', cityName: 'हैदराबाद (Hyderabad)', state: 'Telangana', region: 'South', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 115, forwardingPartnerNetworks: ['दक्कन एक्सप्रेस डिलीवरी पार्टनर'] },
  { code: 'JS-CHN', cityName: 'चेन्नई (Chennai)', state: 'Tamil Nadu', region: 'South', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 88, forwardingPartnerNetworks: ['तमिलनाडु लोकल टास्क एजेंसी'] },
  { code: 'JS-KOC', cityName: 'कोच्चि (Kochi)', state: 'Kerala', region: 'South', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 42, forwardingPartnerNetworks: ['केरल क्विक लॉजिस्टिक्स'] },

  // EAST & NORTHEAST
  { code: 'JS-KOL', cityName: 'कोलकाता (Kolkata)', state: 'West Bengal', region: 'East', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 104, forwardingPartnerNetworks: ['कोलकाता सिटी मर्चेंट नेटवर्क'] },
  { code: 'JS-BBI', cityName: 'भुवनेश्वर (Bhubaneswar)', state: 'Odisha', region: 'East', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 40, forwardingPartnerNetworks: ['कलिंगा टास्क सर्विसेज'] },
  { code: 'JS-RNC', cityName: 'रांची (Ranchi)', state: 'Jharkhand', region: 'East', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 35, forwardingPartnerNetworks: ['झारखंड लोकल डिलीवरी फ्लीट'] },
  { code: 'JS-GAU', cityName: 'गुवाहाटी (Guwahati)', state: 'Assam', region: 'NorthEast', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 30, forwardingPartnerNetworks: ['असम व पूर्वोत्तर हाइपरलोकल नेटवर्क'] },

  // PAN-INDIA UNIVERSAL
  { code: 'JS-PAN', cityName: 'संपूर्ण भारत / अन्य जिला (Pan-India Any PIN)', state: 'All India', region: 'Central', zoneType: 'pan_india_forward', isActive: true, activeSathisCount: 0, activeProvidersCount: 650, forwardingPartnerNetworks: ['राष्ट्रीय सेवा प्रदाता ग्रिड (National Provider Grid)'] },
];

// Seed Commission Rates
const DEFAULT_COMMISSIONS: CategoryCommissionSetting[] = [
  { category: 'hourly_sathi', title: 'घंटे के अनुसार साथी (Hourly Sathi)', defaultCommissionPercent: 10, minPercent: 5, maxPercent: 15 },
  { category: 'food_restaurant', title: 'फूड व रेस्टोरेंट (Zomato Replacement)', defaultCommissionPercent: 20, minPercent: 12, maxPercent: 25 },
  { category: 'grocery_kirana', title: '10 मिनट किराना (Blinkit Replacement)', defaultCommissionPercent: 15, minPercent: 10, maxPercent: 20 },
  { category: 'home_service', title: 'प्लंबर, इलेक्ट्रीशियन (Urban Company Replacement)', defaultCommissionPercent: 20, minPercent: 15, maxPercent: 25 },
  { category: 'ride_transport', title: 'ऑटो व टैक्सी (Ola/Uber Replacement)', defaultCommissionPercent: 12, minPercent: 8, maxPercent: 18 },
  { category: 'medical_pharma', title: 'दवाई व मेडिकल स्टोर (Pharmeasy Replacement)', defaultCommissionPercent: 15, minPercent: 10, maxPercent: 20 },
  { category: 'courier_logistics', title: 'लोकल पार्सल व कुरियर (Dunzo Replacement)', defaultCommissionPercent: 15, minPercent: 10, maxPercent: 20 },
];

// Seed Royal Sathis (Our Internal Pool - 90/10 Model)
const DEFAULT_SATHIS: RoyalSathiWorker[] = [
  {
    id: 'sathi_1',
    royalId: 'JS-RWA-1042',
    name: 'राहुल पटेल (Rahul Patel)',
    phone: '+91 98261 44521',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    aadharMasked: 'XXXX-XXXX-4912',
    isPoliceVerified: true,
    policeVerificationRef: 'MP-POL-CID-RWA-88410',
    status: 'online',
    subscriptionActive: true,
    subscriptionPlan: '₹299/month',
    subscriptionExpiry: '28 Nov 2026',
    rating: 4.9,
    totalTasksCompleted: 142,
    walletBalance: 3280,
    totalEarningsGross: 36400,
    totalPlatformCut10: 3640,
    totalNetWithdrawn: 33120,
    bankAccountMasked: 'SBI A/C ...4819 (IFSC: SBIN0001289)',
    currentLat: 24.5362,
    currentLng: 81.3037,
  },
  {
    id: 'sathi_2',
    royalId: 'JS-BPL-2031',
    name: 'पूजा विश्वकर्मा (Pooja Vishwakarma)',
    phone: '+91 94250 88123',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    cityCode: 'JS-BPL',
    cityName: 'Bhopal',
    aadharMasked: 'XXXX-XXXX-8021',
    isPoliceVerified: true,
    policeVerificationRef: 'MP-POL-CID-BPL-91204',
    status: 'online',
    subscriptionActive: true,
    subscriptionPlan: '₹299/month',
    subscriptionExpiry: '15 Dec 2026',
    rating: 5.0,
    totalTasksCompleted: 198,
    walletBalance: 4520,
    totalEarningsGross: 51200,
    totalPlatformCut10: 5120,
    totalNetWithdrawn: 46680,
    bankAccountMasked: 'PNB A/C ...9901 (IFSC: PUNB0124400)',
    currentLat: 23.2599,
    currentLng: 77.4126,
  },
  {
    id: 'sathi_3',
    royalId: 'JS-RWA-1099',
    name: 'वीरेन्द्र शुक्ला (Virendra Shukla)',
    phone: '+91 98270 33412',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    aadharMasked: 'XXXX-XXXX-2144',
    isPoliceVerified: true,
    policeVerificationRef: 'MP-POL-CID-RWA-77215',
    status: 'online',
    subscriptionActive: true,
    subscriptionPlan: '₹299/month',
    subscriptionExpiry: '04 Dec 2026',
    rating: 4.8,
    totalTasksCompleted: 98,
    walletBalance: 1850,
    totalEarningsGross: 24200,
    totalPlatformCut10: 2420,
    totalNetWithdrawn: 22350,
    bankAccountMasked: 'BOB A/C ...3109 (IFSC: BARB0REWAXX)',
    currentLat: 24.5411,
    currentLng: 81.2984,
  },
  {
    id: 'sathi_4',
    royalId: 'JS-IND-3088',
    name: 'अमित शर्मा (Amit Sharma)',
    phone: '+91 97551 66209',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    cityCode: 'JS-IND',
    cityName: 'Indore',
    aadharMasked: 'XXXX-XXXX-9932',
    isPoliceVerified: true,
    policeVerificationRef: 'MP-POL-CID-IND-44109',
    status: 'busy',
    subscriptionActive: true,
    subscriptionPlan: '₹299/month',
    subscriptionExpiry: '19 Jan 2027',
    rating: 4.9,
    totalTasksCompleted: 215,
    walletBalance: 5100,
    totalEarningsGross: 61000,
    totalPlatformCut10: 6100,
    totalNetWithdrawn: 55900,
    bankAccountMasked: 'HDFC A/C ...7721 (IFSC: HDFC0001044)',
    currentLat: 22.7196,
    currentLng: 75.8577,
  },
];

// Seed Tied-Up Service Providers (The Trojan Bridge - 80/20 Model)
const DEFAULT_PROVIDERS: TiedUpProvider[] = [
  {
    id: 'PRV-RWA-01',
    businessName: 'श्री कृष्णा भोजनालय व थाली हाउस',
    category: 'food_restaurant',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'कॉलेज चौराहा, सिरमौर रोड, रीवा',
    ownerName: 'श्याम सुंदर तिवारी',
    phone: '+91 94251 77210',
    email: 'krishnabhog.rewa@gmail.com',
    agreedCommissionPercent: 20,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '12 Aug 2026',
    rating: 4.8,
    totalOrdersReceived: 184,
    totalSettlementPaid: 58880, // 80%
    totalPlatformKept: 14720,   // 20%
    isOpen: true,
  },
  {
    id: 'PRV-RWA-02',
    businessName: 'वर्मा सुपर किराना स्टोर (10 Min Store)',
    category: 'grocery_kirana',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'शिल्पी प्लाजा ब्लॉक बी, जयस्तंभ चौक, रीवा',
    ownerName: 'महेश वर्मा',
    phone: '+91 98262 11904',
    email: 'verma.kirana@gmail.com',
    agreedCommissionPercent: 15,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '18 Aug 2026',
    rating: 4.9,
    totalOrdersReceived: 312,
    totalSettlementPaid: 106080,
    totalPlatformKept: 18720,
    isOpen: true,
  },
  {
    id: 'PRV-RWA-03',
    businessName: 'संजीवनी मेडिकल व 24x7 सर्जिकल',
    category: 'medical_pharma',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'संजय गांधी मेमोरियल हॉस्पिटल रोड, रीवा',
    ownerName: 'डॉ. पी. के. मिश्रा',
    phone: '+91 94253 44819',
    agreedCommissionPercent: 15,
    integrationMode: 'api_webhook',
    webhookUrl: 'https://api.sanjeevanimed.in/webhooks/jitomni-orders',
    apiKeyMasked: 'sk_live_jit_sanj_8829...91',
    approvalStatus: 'approved',
    registrationDate: '01 Sep 2026',
    rating: 4.9,
    totalOrdersReceived: 145,
    totalSettlementPaid: 61625,
    totalPlatformKept: 10875,
    isOpen: true,
  },
  {
    id: 'PRV-RWA-04',
    businessName: 'रीवा ऑटो-टैक्सी वेलफेयर यूनियन',
    category: 'ride_transport',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'न्यू बस स्टैंड, रीवा',
    ownerName: 'सरदार बलवंत सिंह',
    phone: '+91 98272 55001',
    agreedCommissionPercent: 12,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '15 Sep 2026',
    rating: 4.7,
    totalOrdersReceived: 260,
    totalSettlementPaid: 57200,
    totalPlatformKept: 7800,
    isOpen: true,
  },
  {
    id: 'PRV-RWA-05',
    businessName: 'रीवा फास्ट प्लंबिंग व इलेक्ट्रीशियन एसोसिएट्स',
    category: 'home_service',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'समान नाका, बोड़ा बाग रोड, रीवा',
    ownerName: 'अनिल कुशवाहा',
    phone: '+91 97541 22890',
    agreedCommissionPercent: 20,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '20 Sep 2026',
    rating: 4.8,
    totalOrdersReceived: 92,
    totalSettlementPaid: 29440,
    totalPlatformKept: 7360,
    isOpen: true,
  },
  {
    id: 'PRV-BPL-06',
    businessName: 'मालवा सुपरमार्ट (10 Min Quick Store)',
    category: 'grocery_kirana',
    cityCode: 'JS-BPL',
    cityName: 'Bhopal',
    address: 'एमपी नगर जोन 2, भोपाल',
    ownerName: 'दीपक पाटीदार',
    phone: '+91 98260 77123',
    agreedCommissionPercent: 15,
    integrationMode: 'api_webhook',
    webhookUrl: 'https://partner.malwamart.com/api/jitomni',
    apiKeyMasked: 'sk_live_malwa_9901...32',
    approvalStatus: 'approved',
    registrationDate: '05 Sep 2026',
    rating: 4.9,
    totalOrdersReceived: 420,
    totalSettlementPaid: 160650,
    totalPlatformKept: 28350,
    isOpen: true,
  },
  {
    id: 'PRV-RWA-07',
    businessName: 'चौहान कैफे व पिज्जा हब',
    category: 'food_restaurant',
    cityCode: 'JS-RWA',
    cityName: 'Rewa',
    address: 'यूनिवर्सिटी रोड, रीवा',
    ownerName: 'अमन चौहान',
    phone: '+91 96178 99012',
    agreedCommissionPercent: 20,
    integrationMode: 'manual_panel',
    approvalStatus: 'pending_review',
    registrationDate: '23 Oct 2026',
    rating: 4.6,
    totalOrdersReceived: 0,
    totalSettlementPaid: 0,
    totalPlatformKept: 0,
    isOpen: false,
  },
  // PAN-INDIA FORWARDING PARTNERS (Existing Local/National Providers Across India)
  {
    id: 'PRV-MUM-08',
    businessName: 'मुंबई दादर मर्चेंट व क्विक डब्बावाला सिंडिकेट',
    category: 'food_restaurant',
    cityCode: 'JS-MUM',
    cityName: 'Mumbai',
    address: 'दादर वेस्ट, मुंबई, महाराष्ट्र',
    ownerName: 'संजय तांबडे',
    phone: '+91 98200 44102',
    email: 'mumbai.syndicate@jitomni-network.in',
    agreedCommissionPercent: 20,
    integrationMode: 'api_webhook',
    webhookUrl: 'https://api.mumbaimerchants.in/jitomni/dispatch',
    apiKeyMasked: 'sk_live_mum_8819...40',
    approvalStatus: 'approved',
    registrationDate: '10 Aug 2026',
    rating: 4.9,
    totalOrdersReceived: 540,
    totalSettlementPaid: 216000,
    totalPlatformKept: 54000, // 20% JITOMNI commission
    isOpen: true,
  },
  {
    id: 'PRV-BLR-09',
    businessName: 'बेंगलुरु एल्डरकेयर व होम असिस्ट नेटवर्क',
    category: 'home_service',
    cityCode: 'JS-BLR',
    cityName: 'Bengaluru',
    address: 'कोरमंगला 4th ब्लॉक, बेंगलुरु, कर्नाटक',
    ownerName: 'वेंकटेश राव',
    phone: '+91 98450 77192',
    email: 'contact@bangalore-eldercare.org',
    agreedCommissionPercent: 20,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '14 Aug 2026',
    rating: 4.9,
    totalOrdersReceived: 380,
    totalSettlementPaid: 152000,
    totalPlatformKept: 38000, // 20% JITOMNI commission
    isOpen: true,
  },
  {
    id: 'PRV-LKO-10',
    businessName: 'अवध एक्सप्रेस किराना व हाइपरलोकल मार्ट',
    category: 'grocery_kirana',
    cityCode: 'JS-LKO',
    cityName: 'Lucknow',
    address: 'हजरतगंज, लखनऊ, उत्तर प्रदेश',
    ownerName: 'तारिक अंसारी',
    phone: '+91 94150 22891',
    agreedCommissionPercent: 15,
    integrationMode: 'api_webhook',
    webhookUrl: 'https://awadhexpress.in/api/v1/orders',
    apiKeyMasked: 'sk_live_lko_5541...19',
    approvalStatus: 'approved',
    registrationDate: '22 Aug 2026',
    rating: 4.8,
    totalOrdersReceived: 290,
    totalSettlementPaid: 98600,
    totalPlatformKept: 17400, // 15% JITOMNI commission
    isOpen: true,
  },
  {
    id: 'PRV-JPR-11',
    businessName: 'जयपुर प्लंबिंग व इलेक्ट्रीशियन एसोसिएट्स',
    category: 'home_service',
    cityCode: 'JS-JPR',
    cityName: 'Jaipur',
    address: 'एमआई रोड, जयपुर, राजस्थान',
    ownerName: 'राजेन्द्र सिंह शेखावत',
    phone: '+91 98290 88410',
    agreedCommissionPercent: 20,
    integrationMode: 'manual_panel',
    approvalStatus: 'approved',
    registrationDate: '01 Sep 2026',
    rating: 4.7,
    totalOrdersReceived: 175,
    totalSettlementPaid: 56000,
    totalPlatformKept: 14000, // 20% JITOMNI commission
    isOpen: true,
  }
];

// Seed Initial Orders
const DEFAULT_ORDERS: TrojanOrder[] = [
  {
    orderId: 'JIT-ORD-9102',
    customerName: 'अशोक चतुर्वेदी',
    customerPhone: '+91 98261 11200',
    mainCategory: 'hourly_sathi',
    subCategory: 'sathi_medical',
    serviceTitle: 'अस्पताल व डॉक्टर विज़िट साथी (4 घंटे)',
    taskDetails: 'संजय गांधी अस्पताल में बुजुर्ग पिताजी का रूटीन चेकअप और ब्लड टेस्ट कराना है। साथ देने हेतु रॉयल साथी चाहिए।',
    location: {
      address: 'मकान 14, सिविल लाइंस, रीवा',
      landmark: 'कमिश्नर बंगले के पास',
      city: 'Rewa',
      cityCode: 'JS-RWA',
      state: 'Madhya Pradesh',
      zoneType: 'direct_hub',
      lat: 24.5381,
      lng: 81.3021,
    },
    destinationLocation: {
      address: 'संजय गांधी मेमोरियल हॉस्पिटल, रीवा',
      city: 'Rewa',
      cityCode: 'JS-RWA',
    },
    hourlyDurationHours: 4,
    totalAmount: 349,
    paymentMethod: 'upi_mock',
    paymentStatus: 'paid',
    status: 'in_progress',
    fulfillmentType: 'royal_sathi',
    isPanIndiaForwarded: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    routingStage: 1,
    assignedSathiId: 'JS-RWA-1042',
    assignedSathiName: 'राहुल पटेल (Rahul Patel)',
    assignedSathiPhone: '+91 98261 44521',
    assignedSathiPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    startOtp: '7419',
    endOtp: '2804',
    commission: {
      totalAmount: 349,
      fulfillmentType: 'royal_sathi',
      model: '90_10',
      platformFeePercent: 10,
      platformFeeAmount: 34.9,
      payoutToWorkerOrProvider: 314.1,
      gstAmount: 18,
      safetyAssuranceFee: 15,
    },
  },
  // PAN-INDIA FORWARDED ORDER EXAMPLE (MUMBAI - Non-Direct Zone)
  {
    orderId: 'JIT-ORD-8820',
    customerName: 'प्रिया कुलकर्णी',
    customerPhone: '+91 98201 99420',
    mainCategory: 'task_based',
    subCategory: 'task_senior_help',
    serviceTitle: 'सीनियर सिटीजन दवा व सहायता (मुंबई)',
    taskDetails: 'दादर में बुजुर्ग माताजी के लिए मेडिकल स्टोर से आवश्यक दवाएं लाना और बीपी चेकअप में सहायता करना।',
    location: {
      address: 'फ्लैट 402, गोखले रोड, दादर वेस्ट, मुंबई',
      city: 'Mumbai',
      cityCode: 'JS-MUM',
      state: 'Maharashtra',
      zoneType: 'pan_india_forward',
      pincode: '400028',
      lat: 19.0178,
      lng: 72.8478,
    },
    totalAmount: 299,
    paymentMethod: 'upi_mock',
    paymentStatus: 'paid',
    status: 'forwarded_to_partner',
    fulfillmentType: 'pan_india_forwarded',
    isPanIndiaForwarded: true,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    routingStage: 2,
    forwardedPartnerInfo: {
      partnerName: 'मुंबई दादर मर्चेंट व केयर सिंडिकेट (PRV-MUM-08)',
      partnerType: 'स्थानीय केयर व सर्विस पार्टनर (Local Partner Syndicate)',
      contactPhone: '+91 98200 44102',
      dispatchChannel: 'api_webhook',
      forwardedAt: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
      commissionPercent: 20,
      platformCommissionKept: 59.8, // JITOMNI 20% commission
      partnerNetPayout: 239.2,      // Net to Partner
      dispatchStatus: 'acknowledged',
      whatsappPayloadText: '📢 JITOMNI 360 PAN-INDIA ORDER #JIT-ORD-8820\n📍 दादर वेस्ट, मुंबई\n🛠️ सीनियर सिटीजन सहायता\n💰 पेआउट: ₹239.2 (JITOMNI कमिशन: ₹59.8)',
    },
    assignedProviderId: 'PRV-MUM-08',
    assignedProviderName: 'मुंबई दादर मर्चेंट व केयर सिंडिकेट',
    assignedProviderPhone: '+91 98200 44102',
    startOtp: '4819',
    endOtp: '9133',
    commission: {
      totalAmount: 299,
      fulfillmentType: 'pan_india_forwarded',
      model: 'pan_india_commission',
      platformFeePercent: 20,
      platformFeeAmount: 59.8,
      payoutToWorkerOrProvider: 239.2,
      gstAmount: 18,
      safetyAssuranceFee: 15,
    },
  },
  {
    orderId: 'JIT-ORD-9103',
    customerName: 'सुनीता द्विवेदी',
    customerPhone: '+91 94250 44910',
    mainCategory: 'quick_commerce',
    subCategory: 'quick_kirana',
    serviceTitle: '10 मिनट सुपर किराना व आवश्यक वस्तुएं',
    taskDetails: 'आशीर्वाद आटा 5kg, अमूल दूध 2L, टाटा नमक, फॉर्च्यून तेल 1L',
    location: {
      address: 'फ्लैट 302, कनक हाइट्स, शिल्पी प्लाजा, रीवा',
      city: 'Rewa',
      cityCode: 'JS-RWA',
      state: 'Madhya Pradesh',
      zoneType: 'direct_hub',
      lat: 24.5369,
      lng: 81.3045,
    },
    items: [
      { id: 'itm_1', name: 'आशीर्वाद एमपी चक्की आटा (5kg)', quantity: 1, price: 235 },
      { id: 'itm_2', name: 'अमूल ताज़ा फ्रेश मिल्क (1L)', quantity: 2, price: 68 },
      { id: 'itm_3', name: 'टाटा आयोडाइज्ड नमक (1kg)', quantity: 1, price: 28 },
      { id: 'itm_4', name: 'फॉर्च्यून रिफाइंड सोयाबीन तेल (1L)', quantity: 1, price: 145 },
    ],
    totalAmount: 544,
    paymentMethod: 'upi_mock',
    paymentStatus: 'paid',
    status: 'provider_accepted',
    fulfillmentType: 'tied_up_provider',
    isPanIndiaForwarded: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    routingStage: 2,
    assignedProviderId: 'PRV-RWA-02',
    assignedProviderName: 'वर्मा सुपर किराना स्टोर (10 Min Store)',
    assignedProviderCategory: 'grocery_kirana',
    assignedProviderPhone: '+91 98262 11904',
    startOtp: '5192',
    endOtp: '8301',
    commission: {
      totalAmount: 544,
      fulfillmentType: 'tied_up_provider',
      model: '80_20',
      platformFeePercent: 15,
      platformFeeAmount: 81.6,
      payoutToWorkerOrProvider: 462.4,
      gstAmount: 20,
      safetyAssuranceFee: 10,
    }
  },
  {
    orderId: 'JIT-ORD-9104',
    customerName: 'रोहित वर्मा',
    customerPhone: '+91 97551 22891',
    mainCategory: 'task_based',
    subCategory: 'task_bill_pay',
    serviceTitle: 'बिजली बिल भुगतान व रसीद डिलीवरी',
    taskDetails: 'मध्य क्षेत्र विद्युत वितरण कंपनी रीवा ऑफिस जाकर ₹3,420 का बिल जमा करना और सील लगी रसीद घर लाना।',
    location: {
      address: 'वार्ड 8, बिछिया, रीवा',
      city: 'Rewa',
      cityCode: 'JS-RWA',
      state: 'Madhya Pradesh',
      zoneType: 'direct_hub',
    },
    totalAmount: 149,
    paymentMethod: 'cod',
    paymentStatus: 'pending_cod',
    status: 'notified_sathi',
    fulfillmentType: 'royal_sathi',
    isPanIndiaForwarded: false,
    createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
    sathiBroadcastExpiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
    routingStage: 1,
    startOtp: '3941',
    endOtp: '6720',
    commission: {
      totalAmount: 149,
      fulfillmentType: 'royal_sathi',
      model: '90_10',
      platformFeePercent: 10,
      platformFeeAmount: 14.9,
      payoutToWorkerOrProvider: 134.1,
      gstAmount: 10,
      safetyAssuranceFee: 10,
    }
  }
];

export const TrojanStorage = {
  // Orders
  getOrders(): TrojanOrder[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('TrojanStorage getOrders err:', e);
    }
    this.setOrders(DEFAULT_ORDERS);
    return DEFAULT_ORDERS;
  },

  setOrders(orders: TrojanOrder[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('TrojanStorage setOrders err:', e);
    }
  },

  // Sathis
  getSathis(): RoyalSathiWorker[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SATHIS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('TrojanStorage getSathis err:', e);
    }
    this.setSathis(DEFAULT_SATHIS);
    return DEFAULT_SATHIS;
  },

  setSathis(sathis: RoyalSathiWorker[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.SATHIS, JSON.stringify(sathis));
    } catch (e) {
      console.warn('TrojanStorage setSathis err:', e);
    }
  },

  // Providers
  getProviders(): TiedUpProvider[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('TrojanStorage getProviders err:', e);
    }
    this.setProviders(DEFAULT_PROVIDERS);
    return DEFAULT_PROVIDERS;
  },

  setProviders(providers: TiedUpProvider[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
    } catch (e) {
      console.warn('TrojanStorage setProviders err:', e);
    }
  },

  // Commissions
  getCommissions(): CategoryCommissionSetting[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMISSION_SETTINGS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    this.setCommissions(DEFAULT_COMMISSIONS);
    return DEFAULT_COMMISSIONS;
  },

  setCommissions(commissions: CategoryCommissionSetting[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMISSION_SETTINGS, JSON.stringify(commissions));
    } catch (e) {}
  },

  // City Codes
  getCities(): CityCodeConfig[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CITY_CODES);
      if (data) return JSON.parse(data);
    } catch (e) {}
    this.setCities(DEFAULT_CITIES);
    return DEFAULT_CITIES;
  },

  setCities(cities: CityCodeConfig[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CITY_CODES, JSON.stringify(cities));
    } catch (e) {}
  },

  // Active Sathi ID
  getActiveSathiId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'JS-RWA-1042';
  },

  setActiveSathiId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, id);
  },

  // ==========================================================================
  // INTELLIGENT ROUTING & ORDER CREATION LOGIC (PAN-INDIA MATRIX)
  // RULE 1: Direct Hubs (Rewa, Bhopal, Indore, Jabalpur, Gwalior, Delhi) -> Sathi Pool first (90s window) -> Cascade to Provider
  // RULE 2: Pan-India Forwarding Zones (All other cities, states, custom PIN codes) ->
  //         Where JITOMNI doesn't have direct Sathis, automatically forward demand to
  //         existing service providers in that city -> JITOMNI earns platform commission!
  // ==========================================================================
  createOrder(orderInput: {
    customerName: string;
    customerPhone: string;
    mainCategory: ServiceMainCategory;
    subCategory: any;
    serviceTitle: string;
    taskDetails: string;
    location: any;
    destinationLocation?: any;
    items?: any[];
    hourlyDurationHours?: number;
    totalAmount: number;
    paymentMethod: 'upi_mock' | 'cod' | 'razorpay_mock';
  }): TrojanOrder {
    const orders = this.getOrders();
    const providers = this.getProviders();
    const commissions = this.getCommissions();
    const cities = this.getCities();
    
    const cityCode = orderInput.location.cityCode || 'JS-RWA';
    const cityMeta = cities.find((c) => c.code === cityCode);
    const cityName = cityMeta ? cityMeta.cityName : (orderInput.location.city || 'Pan-India');
    const stateName = cityMeta?.state || orderInput.location.state || 'All India';

    // Direct Sovereign Sathi Hub vs Pan-India Demand Forwarding Zone
    const isDirectHub = cityMeta ? cityMeta.zoneType === 'direct_hub' : (
      cityCode === 'JS-RWA' || cityCode === 'JS-BPL' || cityCode === 'JS-IND' || 
      cityCode === 'JS-JBP' || cityCode === 'JS-GWL' || cityCode === 'JS-DEL'
    );
    const isPanIndiaForwarded = !isDirectHub;

    const orderId = `JIT-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const startOtp = String(Math.floor(1000 + Math.random() * 9000));
    const endOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Commission Calculation & Routing Assignment
    let commission: CommissionBreakdown;
    let initialStatus: TrojanOrder['status'] = 'notified_sathi';
    let fulfillmentType: FulfillmentType = 'royal_sathi';
    let routingStage: 1 | 2 | 3 = 1;
    let forwardedPartnerInfo: ForwardedPartnerInfo | undefined = undefined;
    let assignedProviderId: string | undefined = undefined;
    let assignedProviderName: string | undefined = undefined;
    let assignedProviderCategory: ProviderCategory | undefined = undefined;
    let assignedProviderPhone: string | undefined = undefined;

    if (isPanIndiaForwarded) {
      // ========================================================================
      // PAN-INDIA DEMAND FORWARDING (हमे कमिशन मिलेगा, पार्टनर सेवा देंगे)
      // ========================================================================
      initialStatus = 'forwarded_to_partner';
      fulfillmentType = 'pan_india_forwarded';
      routingStage = 2;

      let commPercent = 20; // Default 20% on Services
      if (orderInput.mainCategory === 'quick_commerce') commPercent = 15;
      else if (orderInput.mainCategory === 'task_based' && String(orderInput.subCategory).includes('ride')) commPercent = 12;

      const platformCut = Math.round((orderInput.totalAmount * commPercent) / 100);
      const partnerNetPayout = orderInput.totalAmount - platformCut;

      commission = {
        totalAmount: orderInput.totalAmount,
        fulfillmentType: 'pan_india_forwarded',
        model: 'pan_india_commission',
        platformFeePercent: commPercent,
        platformFeeAmount: platformCut,
        payoutToWorkerOrProvider: partnerNetPayout,
        gstAmount: 18,
        safetyAssuranceFee: 15,
      };

      // Match against local registered providers or create automated partner syndicate
      const matchedProvider = providers.find((p) => p.cityCode === cityCode && p.isOpen) 
        || providers.find((p) => p.cityCode === cityCode)
        || providers.find((p) => p.isOpen && (p.category === 'home_service' || p.category === 'food_restaurant' || p.category === 'grocery_kirana'))
        || providers[0];

      const partnerName = matchedProvider ? matchedProvider.businessName : `${cityName} स्थानीय सेवा प्रदाता नेटवर्क (Local Partner Syndicate)`;
      const partnerPhone = matchedProvider?.phone || '+91 98110 54321';
      const dispatchChannel = matchedProvider?.integrationMode === 'api_webhook' ? 'api_webhook' : 'whatsapp_dispatch';

      assignedProviderId = matchedProvider?.id;
      assignedProviderName = partnerName;
      assignedProviderPhone = partnerPhone;
      assignedProviderCategory = matchedProvider?.category || 'home_service';

      const whatsappText = 
        `📢 JITOMNI 360° ALL-INDIA DEMAND FORWARD\n` +
        `🆔 आर्डर: #${orderId}\n` +
        `📍 स्थान: ${cityName}, ${stateName} (${orderInput.location.address || 'Address'})\n` +
        `🛠️ सेवा: ${orderInput.serviceTitle}\n` +
        `📝 कार्य निर्देश: ${orderInput.taskDetails}\n` +
        `💵 कुल ग्राहक भुगतान: ₹${orderInput.totalAmount}\n` +
        `💰 पार्टनर को शुद्ध पेआउट: ₹${partnerNetPayout}\n` +
        `🛡️ JITOMNI प्लेटफ़ॉर्म कमिशन: ₹${platformCut} (ऑटो-डिडक्टेड)\n` +
        `🔑 स्टार्ट OTP: ${startOtp} | एंड OTP: ${endOtp}\n` +
        `📞 ग्राहक मोबाइल: ${orderInput.customerPhone}`;

      forwardedPartnerInfo = {
        partnerName,
        partnerType: 'सत्यापित स्थानीय व राष्ट्रीय सेवा नेटवर्क (Verified Syndicate)',
        contactPhone: partnerPhone,
        dispatchChannel,
        forwardedAt: new Date().toISOString(),
        commissionPercent: commPercent,
        platformCommissionKept: platformCut,
        partnerNetPayout,
        dispatchStatus: matchedProvider?.integrationMode === 'api_webhook' ? 'acknowledged' : 'dispatched',
        whatsappPayloadText: whatsappText,
      };
    } else {
      // ========================================================================
      // DIRECT SOVEREIGN SATHI HUB (रीवा, भोपाल, इंदौर, जबलपुर, ग्वालियर, दिल्ली)
      // ========================================================================
      const isDirectProvider = orderInput.mainCategory === 'quick_commerce';
      const isSathiPoolFirst = !isDirectProvider;

      if (isSathiPoolFirst) {
        // 90/10 Model for Royal Sathi Pool
        const platformFee = Math.round(orderInput.totalAmount * 0.10);
        commission = {
          totalAmount: orderInput.totalAmount,
          fulfillmentType: 'royal_sathi',
          model: '90_10',
          platformFeePercent: 10,
          platformFeeAmount: platformFee,
          payoutToWorkerOrProvider: orderInput.totalAmount - platformFee,
          gstAmount: 18,
          safetyAssuranceFee: 15,
        };
        initialStatus = 'notified_sathi';
        fulfillmentType = 'royal_sathi';
        routingStage = 1;
      } else {
        // Direct to Tied-up Provider (Blinkit/Zomato bridge model)
        const catSetting = commissions.find((c) => c.category === 'grocery_kirana') || { defaultCommissionPercent: 15 };
        const platformFee = Math.round((orderInput.totalAmount * catSetting.defaultCommissionPercent) / 100);
        commission = {
          totalAmount: orderInput.totalAmount,
          fulfillmentType: 'tied_up_provider',
          model: '80_20',
          platformFeePercent: catSetting.defaultCommissionPercent,
          platformFeeAmount: platformFee,
          payoutToWorkerOrProvider: orderInput.totalAmount - platformFee,
          gstAmount: 18,
          safetyAssuranceFee: 10,
        };
        initialStatus = 'cascaded_to_provider';
        fulfillmentType = 'tied_up_provider';
        routingStage = 2;

        const match = providers.find((p) => p.cityCode === cityCode && p.isOpen && (p.category === 'grocery_kirana' || p.category === 'food_restaurant')) || providers[1];
        if (match) {
          assignedProviderId = match.id;
          assignedProviderName = match.businessName;
          assignedProviderCategory = match.category;
          assignedProviderPhone = match.phone;
        }
      }
    }

    const newOrder: TrojanOrder = {
      orderId,
      customerName: orderInput.customerName,
      customerPhone: orderInput.customerPhone,
      mainCategory: orderInput.mainCategory,
      subCategory: orderInput.subCategory,
      serviceTitle: orderInput.serviceTitle,
      taskDetails: orderInput.taskDetails,
      location: orderInput.location,
      destinationLocation: orderInput.destinationLocation,
      items: orderInput.items,
      hourlyDurationHours: orderInput.hourlyDurationHours,
      totalAmount: orderInput.totalAmount,
      paymentMethod: orderInput.paymentMethod,
      paymentStatus: orderInput.paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      status: initialStatus,
      fulfillmentType,
      isPanIndiaForwarded,
      forwardedPartnerInfo,
      createdAt: new Date().toISOString(),
      sathiBroadcastExpiresAt: !isPanIndiaForwarded && initialStatus === 'notified_sathi' ? new Date(Date.now() + 90 * 1000).toISOString() : undefined,
      providerBroadcastExpiresAt: isPanIndiaForwarded || initialStatus === 'cascaded_to_provider' ? new Date(Date.now() + 60 * 1000).toISOString() : undefined,
      routingStage,
      assignedProviderId,
      assignedProviderName,
      assignedProviderCategory,
      assignedProviderPhone,
      startOtp,
      endOtp,
      commission,
    };

    orders.unshift(newOrder);
    this.setOrders(orders);

    // Broadcast Real-time event
    if (isPanIndiaForwarded) {
      TrojanRealtime.broadcast('ORDER_FORWARDED_PAN_INDIA', newOrder);
    } else {
      TrojanRealtime.broadcast('NEW_ORDER', newOrder);
    }

    return newOrder;
  },

  // Sathi accepts order (90/10 split)
  acceptOrderBySathi(orderId: string, sathiId: string): boolean {
    const orders = this.getOrders();
    const sathis = this.getSathis();
    const orderIdx = orders.findIndex((o) => o.orderId === orderId);
    const sathi = sathis.find((s) => s.royalId === sathiId || s.id === sathiId);

    if (orderIdx === -1 || !sathi) return false;

    orders[orderIdx].status = 'sathi_accepted';
    orders[orderIdx].fulfillmentType = 'royal_sathi';
    orders[orderIdx].assignedSathiId = sathi.royalId;
    orders[orderIdx].assignedSathiName = sathi.name;
    orders[orderIdx].assignedSathiPhone = sathi.phone;
    orders[orderIdx].assignedSathiPhoto = sathi.photoUrl;

    this.setOrders(orders);
    TrojanRealtime.broadcast('ORDER_ACCEPTED_SATHI', orders[orderIdx]);
    return true;
  },

  // Cascades to Tied-up Provider if Sathi didn't accept or timed out (80/20 split)
  cascadeOrderToProvider(orderId: string, specificProviderId?: string): boolean {
    const orders = this.getOrders();
    const providers = this.getProviders();
    const orderIdx = orders.findIndex((o) => o.orderId === orderId);

    if (orderIdx === -1) return false;

    const order = orders[orderIdx];
    order.routingStage = 2;
    order.status = 'cascaded_to_provider';
    order.fulfillmentType = 'tied_up_provider';
    order.providerBroadcastExpiresAt = new Date(Date.now() + 60 * 1000).toISOString();

    // Determine target provider
    let provider: TiedUpProvider | undefined;
    if (specificProviderId) {
      provider = providers.find((p) => p.id === specificProviderId);
    } else {
      // Match by category
      let targetCategory: ProviderCategory = 'home_service';
      if (order.mainCategory === 'quick_commerce') targetCategory = 'grocery_kirana';
      else if (order.subCategory.includes('plumber') || order.subCategory.includes('repair')) targetCategory = 'home_service';
      else if (order.subCategory.includes('delivery')) targetCategory = 'courier_logistics';
      else targetCategory = 'home_service';

      provider = providers.find((p) => p.cityCode === order.location.cityCode && p.category === targetCategory && p.isOpen) 
        || providers.find((p) => p.cityCode === order.location.cityCode && p.isOpen)
        || providers.find((p) => p.isOpen && p.category === targetCategory)
        || providers[0];
    }

    if (provider) {
      order.assignedProviderId = provider.id;
      order.assignedProviderName = provider.businessName;
      order.assignedProviderCategory = provider.category;
      order.assignedProviderPhone = provider.phone;

      // Adjust commission to provider agreement
      const cutPercent = provider.agreedCommissionPercent || 20;
      const platformCut = Math.round((order.totalAmount * cutPercent) / 100);
      order.commission = {
        totalAmount: order.totalAmount,
        fulfillmentType: 'tied_up_provider',
        model: '80_20',
        platformFeePercent: cutPercent,
        platformFeeAmount: platformCut,
        payoutToWorkerOrProvider: order.totalAmount - platformCut,
        gstAmount: 18,
        safetyAssuranceFee: 10,
      };
    }

    this.setOrders(orders);
    TrojanRealtime.broadcast('ORDER_CASCADED_PROVIDER', order);
    return true;
  },

  // Forwarded Pan-India Partner accepts order
  acceptOrderByForwardedPartner(orderId: string, partnerName?: string): boolean {
    const orders = this.getOrders();
    const orderIdx = orders.findIndex((o) => o.orderId === orderId);
    if (orderIdx === -1) return false;

    orders[orderIdx].status = 'provider_accepted';
    if (orders[orderIdx].forwardedPartnerInfo) {
      orders[orderIdx].forwardedPartnerInfo!.dispatchStatus = 'acknowledged';
      if (partnerName) orders[orderIdx].forwardedPartnerInfo!.partnerName = partnerName;
    }
    this.setOrders(orders);
    TrojanRealtime.broadcast('ORDER_ACCEPTED_PROVIDER', orders[orderIdx]);
    return true;
  },

  // Provider accepts order
  acceptOrderByProvider(orderId: string, providerId: string): boolean {
    const orders = this.getOrders();
    const providers = this.getProviders();
    const orderIdx = orders.findIndex((o) => o.orderId === orderId);
    const provider = providers.find((p) => p.id === providerId);

    if (orderIdx === -1 || !provider) return false;

    orders[orderIdx].status = 'provider_accepted';
    orders[orderIdx].fulfillmentType = 'tied_up_provider';
    orders[orderIdx].assignedProviderId = provider.id;
    orders[orderIdx].assignedProviderName = provider.businessName;
    orders[orderIdx].assignedProviderPhone = provider.phone;

    this.setOrders(orders);
    TrojanRealtime.broadcast('ORDER_ACCEPTED_PROVIDER', orders[orderIdx]);
    return true;
  },

  // Start Task (OTP verified)
  startTask(orderId: string, enteredOtp: string): { success: boolean; message: string } {
    const orders = this.getOrders();
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return { success: false, message: 'ऑर्डर नहीं मिला' };

    if (order.startOtp !== enteredOtp.trim()) {
      return { success: false, message: 'गलत स्टार्ट OTP! कृपया ग्राहक से 4-अंकीय OTP पूछें।' };
    }

    order.status = 'in_progress';
    this.setOrders(orders);
    TrojanRealtime.broadcast('TASK_STARTED', order);
    return { success: true, message: 'टास्क सफलतापूर्वक प्रारंभ हुआ!' };
  },

  // Complete Task (Photo proof + End OTP + Wallet Settlement)
  completeTask(orderId: string, enteredOtp: string, proofPhotoUrl?: string): { success: boolean; message: string } {
    const orders = this.getOrders();
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return { success: false, message: 'ऑर्डर नहीं मिला' };

    if (order.endOtp !== enteredOtp.trim()) {
      return { success: false, message: 'गलत एंड OTP! कृपया ग्राहक से कार्य समाप्ति OTP लें।' };
    }

    order.status = 'completed';
    order.paymentStatus = 'paid';
    order.proofPhotoUrl = proofPhotoUrl || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=400&q=80';

    // Credit Sathi or Provider
    if (order.fulfillmentType === 'royal_sathi' && order.assignedSathiId) {
      const sathis = this.getSathis();
      const sathi = sathis.find((s) => s.royalId === order.assignedSathiId);
      if (sathi) {
        const netEarning = order.commission.payoutToWorkerOrProvider;
        const platformCut = order.commission.platformFeeAmount;
        sathi.walletBalance += netEarning;
        sathi.totalEarningsGross += order.totalAmount;
        sathi.totalPlatformCut10 += platformCut;
        sathi.totalTasksCompleted += 1;
        this.setSathis(sathis);
      }
    } else if (order.fulfillmentType === 'tied_up_provider' && order.assignedProviderId) {
      const providers = this.getProviders();
      const provider = providers.find((p) => p.id === order.assignedProviderId);
      if (provider) {
        const netSettlement = order.commission.payoutToWorkerOrProvider;
        const platformCut = order.commission.platformFeeAmount;
        provider.totalOrdersReceived += 1;
        provider.totalSettlementPaid += netSettlement;
        provider.totalPlatformKept += platformCut;
        this.setProviders(providers);
      }
    }

    this.setOrders(orders);
    TrojanRealtime.broadcast('TASK_COMPLETED', order);
    return { success: true, message: 'कार्य पूर्ण! भुगतान व कमीशन सफलतापूर्वक सेटल हुआ।' };
  },

  // Provider Registration
  registerProvider(input: {
    businessName: string;
    category: ProviderCategory;
    cityCode: string;
    cityName: string;
    address: string;
    ownerName: string;
    phone: string;
    email?: string;
    agreedCommissionPercent?: number;
    integrationMode: 'manual_panel' | 'api_webhook';
    webhookUrl?: string;
  }): TiedUpProvider {
    const providers = this.getProviders();
    const count = providers.length + 1;
    const id = `PRV-${input.cityCode.replace('JS-', '')}-${String(count).padStart(2, '0')}`;

    const newProvider: TiedUpProvider = {
      id,
      businessName: input.businessName,
      category: input.category,
      cityCode: input.cityCode,
      cityName: input.cityName,
      address: input.address,
      ownerName: input.ownerName,
      phone: input.phone,
      email: input.email,
      agreedCommissionPercent: input.agreedCommissionPercent || 20,
      integrationMode: input.integrationMode,
      webhookUrl: input.webhookUrl,
      apiKeyMasked: input.integrationMode === 'api_webhook' ? `sk_live_jit_${Math.random().toString(36).substring(2, 10)}` : undefined,
      approvalStatus: 'approved', // instant approval for demo, editable in admin
      registrationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      rating: 4.8,
      totalOrdersReceived: 0,
      totalSettlementPaid: 0,
      totalPlatformKept: 0,
      isOpen: true,
    };

    providers.unshift(newProvider);
    this.setProviders(providers);
    TrojanRealtime.broadcast('PROVIDER_REGISTERED', newProvider);
    return newProvider;
  },

  // Provider Status toggle by Admin
  updateProviderStatus(providerId: string, status: TiedUpProvider['approvalStatus']) {
    const providers = this.getProviders();
    const p = providers.find((item) => item.id === providerId);
    if (p) {
      p.approvalStatus = status;
      this.setProviders(providers);
      TrojanRealtime.broadcast('CONFIG_UPDATED', { providerId, status });
    }
  },

  // Sathi Subscription Renewal (Rs 299/month)
  renewSathiSubscription(royalId: string): boolean {
    const sathis = this.getSathis();
    const s = sathis.find((item) => item.royalId === royalId);
    if (s) {
      s.subscriptionActive = true;
      const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      s.subscriptionExpiry = nextMonth.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      this.setSathis(sathis);
      TrojanRealtime.broadcast('CONFIG_UPDATED', { royalId, action: 'RENEWED_SUB' });
      return true;
    }
    return false;
  },

  // Trojan Analytics & "Apps Deleted" metric
  getAnalytics(): TrojanAnalytics {
    const orders = this.getOrders();
    const sathis = this.getSathis();
    const providers = this.getProviders();

    const totalOrdersPlaced = orders.length;
    const ordersFulfilledBySathis = orders.filter((o) => o.fulfillmentType === 'royal_sathi' && (o.status === 'completed' || o.status === 'in_progress')).length;
    const ordersFulfilledByProviders = orders.filter((o) => o.fulfillmentType === 'tied_up_provider' && (o.status === 'completed' || o.status === 'provider_accepted')).length;
    const panIndiaForwardedOrders = orders.filter((o) => o.fulfillmentType === 'pan_india_forwarded' || o.isPanIndiaForwarded).length;

    let totalGrossOrderValue = 0;
    let totalPlatformRevenueEarned = 0;
    let panIndiaCommissionEarned = 0;

    orders.forEach((o) => {
      totalGrossOrderValue += o.totalAmount;
      if (o.commission?.platformFeeAmount) {
        totalPlatformRevenueEarned += o.commission.platformFeeAmount;
        if (o.fulfillmentType === 'pan_india_forwarded' || o.isPanIndiaForwarded) {
          panIndiaCommissionEarned += o.commission.platformFeeAmount;
        }
      }
    });

    // Add subscription fees from sathis
    const totalSathiSubsRevenue = sathis.filter((s) => s.subscriptionActive).length * 299;
    totalPlatformRevenueEarned += totalSathiSubsRevenue;

    // Unique customer phones
    const phoneSet = new Set(orders.map((o) => o.customerPhone));
    const totalCustomers = Math.max(phoneSet.size, 8);

    // Multi-service repeat customers: users who ordered in > 1 category
    const customerCategories: Record<string, Set<string>> = {};
    orders.forEach((o) => {
      if (!customerCategories[o.customerPhone]) customerCategories[o.customerPhone] = new Set();
      customerCategories[o.customerPhone].add(o.mainCategory);
    });

    let repeatMultiServiceCustomers = 0;
    Object.values(customerCategories).forEach((cats) => {
      if (cats.size >= 2) repeatMultiServiceCustomers++;
    });

    // "Apps Deleted" calculation: each multi-service user typically deletes 4-6 apps (Zomato, Blinkit, Urban Company, Ola, Dunzo)
    const estimatedAppsDeleted = (totalCustomers * 3) + (repeatMultiServiceCustomers * 4);

    return {
      totalCustomers,
      repeatMultiServiceCustomers,
      estimatedAppsDeleted,
      totalOrdersPlaced,
      ordersFulfilledBySathis,
      ordersFulfilledByProviders,
      panIndiaForwardedOrders,
      totalGrossOrderValue,
      totalPlatformRevenueEarned,
      panIndiaCommissionEarned,
      totalCitiesCovered: 540,
      totalStatesCovered: 36,
      averageFulfillmentTimeMins: 18,
    };
  }
};
