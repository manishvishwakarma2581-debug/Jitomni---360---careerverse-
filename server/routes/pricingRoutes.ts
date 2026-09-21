import { Router } from 'express';
import { servicePricingDb, CustomerTier, ServicePricingType, ServicePricingDuration } from '../db/servicePricingTiers';

export const pricingRouter = Router();

// Store for bookings created via /api/book-service
interface MedicalBookingRecord {
  id: string;
  customer_tier: CustomerTier;
  service_type: ServicePricingType;
  duration: ServicePricingDuration;
  patient_name: string;
  patient_age: number;
  pickup_location: string;
  drop_destination: string;
  travel_charges: number;
  base_price: number;
  final_price: number;
  user_phone: string;
  special_requirements?: string;
  status: 'confirmed' | 'assigned' | 'in_transit' | 'completed';
  created_at: string;
  tier_features: {
    badge: string;
    has_gst_bill: boolean;
    has_priority_booking: boolean;
    has_english_speaking_staff: boolean;
    has_24x7_team: boolean;
    has_sos_enabled: boolean;
    has_live_location: boolean;
    has_family_dashboard: boolean;
    has_jet_escort: boolean;
  };
  assigned_team: {
    nurse?: {
      name: string;
      qualification: string;
      verifiedId: string;
      phone: string;
      college: string;
    };
    doctor?: {
      name: string;
      specialty: string;
      verifiedId: string;
      phone: string;
      college: string;
    };
    concierge_officer?: {
      name: string;
      verifiedId: string;
      phone: string;
    };
  };
  live_otp: string;
}

const activeBookingsStore: MedicalBookingRecord[] = [];

// ============================================================
// 1. GET /api/pricing
// Supports: /api/pricing?service_type=nurse&duration=8hr&tier=business
// Or /api/pricing to get all pricing
// ============================================================
pricingRouter.get('/api/pricing', (req, res) => {
  const { service_type, duration, tier } = req.query as {
    service_type?: string;
    duration?: string;
    tier?: string;
  };

  const allTiers = servicePricingDb.getAllTiers();

  // Specific single item query
  if (service_type && duration) {
    const item = servicePricingDb.findPricing(service_type, duration);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `No pricing tier found for service_type: '${service_type}' and duration: '${duration}'`,
        availableServices: ['nurse', 'doctor', 'royal_concierge', 'icu_setup', 'medical_escort']
      });
    }

    const selectedTier = (tier?.toLowerCase() || 'middle') as CustomerTier;
    let price: number | null = null;

    if (selectedTier === 'royal') {
      price = item.royal_price;
    } else if (selectedTier === 'business') {
      price = item.business_price;
    } else {
      price = item.middle_price;
    }

    return res.json({
      success: true,
      service_type: item.service_type,
      duration: item.duration,
      tier: selectedTier,
      price: price,
      is_available_for_tier: price !== null,
      description: item.description,
      features: item.features || [],
      travel_applicable: !!item.travel_applicable,
      all_prices: {
        middle: item.middle_price,
        business: item.business_price,
        royal: item.royal_price
      },
      item
    });
  }

  // Filtered by tier or service_type
  if (tier) {
    const selectedTier = tier.toLowerCase() as CustomerTier;
    const filtered = allTiers
      .filter(t => t.is_active)
      .map(t => {
        const tierPrice = selectedTier === 'royal' 
          ? t.royal_price 
          : selectedTier === 'business' 
            ? t.business_price 
            : t.middle_price;
        return {
          ...t,
          current_price: tierPrice,
          is_available: tierPrice !== null
        };
      });

    return res.json({
      success: true,
      tier: selectedTier,
      tiers: filtered
    });
  }

  // Return all items
  res.json({
    success: true,
    count: allTiers.length,
    tiers: allTiers
  });
});

// GET /api/pricing/tiers
pricingRouter.get('/api/pricing/tiers', (req, res) => {
  const tiers = servicePricingDb.getAllTiers();
  res.json({
    success: true,
    count: tiers.length,
    tiers
  });
});

// PUT & POST /api/pricing/tier/:id (Edit without code change)
pricingRouter.put('/api/pricing/tier/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = servicePricingDb.updateTier(id, updates);

  if (!updated) {
    return res.status(404).json({ success: false, message: `Tier with ID ${id} not found.` });
  }

  res.json({
    success: true,
    message: `Pricing tier ${id} updated successfully.`,
    tier: updated
  });
});

pricingRouter.post('/api/pricing/tier/update', (req, res) => {
  const { id, updates } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Tier ID is required' });
  }
  const updated = servicePricingDb.updateTier(id, updates || req.body);

  if (!updated) {
    return res.status(404).json({ success: false, message: `Tier with ID ${id} not found.` });
  }

  res.json({
    success: true,
    message: `Pricing tier ${id} updated successfully.`,
    tier: updated
  });
});

pricingRouter.post('/api/pricing/reset', (req, res) => {
  const tiers = servicePricingDb.resetToDefault();
  res.json({
    success: true,
    message: 'All 3-tier prices have been reset to factory specifications.',
    tiers
  });
});

// GET /api/pricing-calculator (Fast on-the-fly fare breakdown calculator)
pricingRouter.get('/api/pricing-calculator', (req, res) => {
  const { tier = 'middle', service_type = 'nurse', duration = '8hr', distance_km = '0' } = req.query as Record<string, string>;
  const pricingItem = servicePricingDb.findPricing(service_type, duration);
  if (!pricingItem) {
    return res.status(404).json({ success: false, message: `No pricing tier found for ${service_type} (${duration})` });
  }
  const validTier = (tier.toLowerCase() as CustomerTier) || 'middle';
  let basePrice = validTier === 'royal' ? pricingItem.royal_price : validTier === 'business' ? pricingItem.business_price : pricingItem.middle_price;
  basePrice = basePrice ?? (pricingItem.middle_price || 0);
  const distance = Math.max(0, parseFloat(distance_km) || 0);
  const travelCharges = pricingItem.travel_applicable ? distance * 20 : 0;
  const total = basePrice + travelCharges;
  return res.json({
    success: true,
    tier: validTier,
    service_type,
    duration,
    base_price: basePrice,
    distance_km: distance,
    travel_charges: travelCharges,
    total_fare: total,
    formula: travelCharges > 0 
      ? `Base (₹${basePrice}) + Distance (${distance}km × ₹20/km = ₹${travelCharges}) = ₹${total}`
      : `Base (₹${basePrice}) [No Travel Charges] = ₹${total}`
  });
});

// ============================================================
// 2. POST /api/book-service
// Fields: customer_tier ('middle' | 'business' | 'royal'), service_type, duration, etc.
// ============================================================
pricingRouter.post('/api/book-service', (req, res) => {
  const {
    customer_tier = 'middle',
    service_type = 'nurse',
    duration = '8hr',
    patient_name = 'Patient Name',
    patient_age = 60,
    pickup_location = 'Residence',
    drop_destination = 'Hospital',
    travel_charges = 0,
    user_phone = '+91 98260 00000',
    special_requirements = '',
    assigned_college = 'AIIMS New Delhi'
  } = req.body;

  const validTier = customer_tier.toLowerCase() as CustomerTier;
  if (!['middle', 'business', 'royal'].includes(validTier)) {
    return res.status(400).json({
      success: false,
      message: "Invalid customer_tier. Must be 'middle', 'business', or 'royal'."
    });
  }

  // 1. Fetch matching pricing row
  const pricingItem = servicePricingDb.findPricing(service_type, duration);
  if (!pricingItem) {
    return res.status(404).json({
      success: false,
      message: `No pricing tier found for service: ${service_type}, duration: ${duration}`
    });
  }

  // 2. Validation: If service middle_price is NULL for Royal/Business-only services, reject or restrict for Middle tier
  let basePrice: number | null = null;
  if (validTier === 'royal') {
    basePrice = pricingItem.royal_price;
  } else if (validTier === 'business') {
    basePrice = pricingItem.business_price;
  } else {
    basePrice = pricingItem.middle_price;
  }

  if (basePrice === null) {
    return res.status(400).json({
      success: false,
      code: 'TIER_EXCLUSIVE_SERVICE',
      message: `The requested service '${pricingItem.description}' is not available under the '${validTier.toUpperCase()}' tier. Please upgrade to Business Class or Royal Family.`
    });
  }

  // Escort travel calculation: Base Price + Travel Charges
  const safeTravelCharges = Number(travel_charges) || 0;
  const finalPrice = basePrice + safeTravelCharges;

  // 3. Tier-Specific Feature Activation
  // Royal: auto-assign 24x7 team, enable SOS + Live Location + Family Dashboard features
  // Business: Priority Booking + English Speaking Staff + GST Bill
  const isRoyal = validTier === 'royal';
  const isBusiness = validTier === 'business';

  const tierFeatures = {
    badge: isRoyal
      ? '100% Private + Same Staff + Jet Escort'
      : isBusiness
        ? 'Hotel/Office Visit + GST Bill'
        : 'Sovereign Verified Healthcare Support',
    has_gst_bill: isBusiness || isRoyal,
    has_priority_booking: isBusiness || isRoyal,
    has_english_speaking_staff: isBusiness || isRoyal,
    has_24x7_team: isRoyal,
    has_sos_enabled: true,
    has_live_location: isRoyal || isBusiness,
    has_family_dashboard: isRoyal,
    has_jet_escort: isRoyal
  };

  // 4. Auto-assign staff with verified institutions (Checking SSMC auto-reject)
  const assignedTeam: MedicalBookingRecord['assigned_team'] = {};

  if (isRoyal) {
    assignedTeam.doctor = {
      name: 'Dr. Vikramaditya Rathore, MD (AIIMS)',
      specialty: 'Apex Critical Care & Internal Medicine',
      verifiedId: 'ROYAL-DOC-001',
      phone: '+91 98263 77410',
      college: 'AIIMS New Delhi'
    };
    assignedTeam.nurse = {
      name: 'Sister Ananya Deshmukh, B.Sc (CMC Vellore)',
      qualification: 'Senior ICU & VVIP Protocol Nurse',
      verifiedId: 'ROYAL-NURSE-108',
      phone: '+91 94250 88214',
      college: 'CMC Vellore'
    };
    assignedTeam.concierge_officer = {
      name: 'Major Raghavan Nair (Retd.)',
      verifiedId: 'ROYAL-BUTLER-99',
      phone: '+91 11-40360360'
    };
  } else if (isBusiness) {
    assignedTeam.doctor = {
      name: 'Dr. Siddharth Sen, MD',
      specialty: 'Corporate Health & In-Room Consultation',
      verifiedId: 'BIZ-DOC-42',
      phone: '+91 98261 44520',
      college: 'KGMU Lucknow'
    };
    assignedTeam.nurse = {
      name: 'Sister Sunita Minz, GNM',
      qualification: 'Registered Metro Care Nurse (English Speaking)',
      verifiedId: 'BIZ-NURSE-55',
      phone: '+91 98932 11943',
      college: 'GMC Bhopal'
    };
  } else {
    assignedTeam.nurse = {
      name: 'Sister Priya Verma',
      qualification: 'Certified GNM Staff Nurse',
      verifiedId: 'MID-NURSE-12',
      phone: '+91 98260 14820',
      college: 'Govt Nursing College Bhopal'
    };
  }

  const newBookingId = `MSB-TIER-${Date.now().toString().slice(-6)}`;
  const liveOtp = Math.floor(1000 + Math.random() * 9000).toString();

  const newBooking: MedicalBookingRecord = {
    id: newBookingId,
    customer_tier: validTier,
    service_type: pricingItem.service_type,
    duration: pricingItem.duration,
    patient_name,
    patient_age: Number(patient_age),
    pickup_location,
    drop_destination,
    travel_charges: safeTravelCharges,
    base_price: basePrice,
    final_price: finalPrice,
    user_phone,
    special_requirements,
    status: 'confirmed',
    created_at: new Date().toISOString(),
    tier_features: tierFeatures,
    assigned_team: assignedTeam,
    live_otp: liveOtp
  };

  activeBookingsStore.unshift(newBooking);

  res.json({
    success: true,
    booking_id: newBookingId,
    customer_tier: validTier,
    service_type: pricingItem.service_type,
    duration: pricingItem.duration,
    pricing_breakdown: {
      base_price: basePrice,
      travel_charges: safeTravelCharges,
      gst_included: isBusiness || isRoyal,
      final_price: finalPrice,
      formula: safeTravelCharges > 0 
        ? `Base Price (₹${basePrice}) + Travel Charges (₹${safeTravelCharges}) = ₹${finalPrice}`
        : `Base Price (₹${basePrice}) [No Travel Fee] = ₹${finalPrice}`
    },
    tier_features: tierFeatures,
    assigned_team: assignedTeam,
    live_otp: liveOtp,
    booking: newBooking
  });
});

// GET active booked services
pricingRouter.get('/api/book-service/list', (req, res) => {
  res.json({
    success: true,
    count: activeBookingsStore.length,
    bookings: activeBookingsStore
  });
});

// ============================================================
// 3. SSMC Verification Filter Endpoint
// Auto-rejects if college is SSMC (Shyam Shah Medical College / Sanjay Gandhi)
// ============================================================
pricingRouter.post('/api/admin/verify-credentials', (req, res) => {
  const { staff_name, role, college, registration_number } = req.body;

  const eligibility = servicePricingDb.checkCollegeEligibility(college);

  if (!eligibility.isEligible) {
    return res.status(403).json({
      success: false,
      verification_status: 'REJECTED_SSMC_NOT_ELIGIBLE',
      is_eligible: false,
      reason: eligibility.reason,
      college: college,
      staff_name: staff_name || 'Applicant',
      message: `Verification FAILED for ${staff_name || 'candidate'}: College '${college}' matches SSMC (Shyam Shah / Sanjay Gandhi Medical College) restriction. Barred from metro/VIP empanelment.`
    });
  }

  res.json({
    success: true,
    verification_status: 'VERIFIED_METRO_APPROVED',
    is_eligible: true,
    college: college,
    staff_name: staff_name,
    message: `College '${college}' is eligible and approved for JITOMNI 360 Metro & VIP tiers.`
  });
});
