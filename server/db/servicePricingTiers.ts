import fs from 'fs';
import path from 'path';

export type ServicePricingType = 
  | 'nurse' 
  | 'doctor' 
  | 'royal_concierge' 
  | 'icu_setup' 
  | 'medical_escort';

export type ServicePricingDuration = 
  | '4hr' 
  | '8hr' 
  | '12hr' 
  | '24hr' 
  | '1_visit' 
  | 'monthly_retainer'
  | 'per_trip'
  | 'per_day'
  | 'monthly';

export type CustomerTier = 'middle' | 'business' | 'royal';

export interface ServicePricingTierRow {
  id: string;
  service_type: ServicePricingType;
  duration: ServicePricingDuration;
  middle_price: number | null;
  business_price: number | null;
  royal_price: number | null;
  description: string;
  is_active: boolean;
  features?: string[];
  travel_applicable?: boolean;
}

// Initial Database Seed Rows as per specification:
// - Nurse 4hr: Middle 800, Business 1500, Royal 3000
// - Nurse 8hr: Middle 1200, Business 2200, Royal 4500
// - Nurse 12hr/Night: Middle 1800, Business 3500, Royal 7000
// - Doctor 1 Visit: Middle 1500, Business 2500, Royal 5000
// - Doctor Monthly Retainer: Middle 15000, Business 25000, Royal 60000
// - 24x7 Nurse+Doctor Team per day: Business 15000, Royal 25000 (Middle NULL)
// - ICU at Home per day: Business 8000, Royal 15000 (Middle NULL)
// - Medical Escort per trip: Business 5000 + travel, Royal 12000 + travel (Middle NULL)
// - Full Royal Concierge monthly: Royal 180000 to 250000 (Middle NULL, Business NULL)
const INITIAL_TIER_ROWS: ServicePricingTierRow[] = [
  {
    id: 'spt-nurse-4hr',
    service_type: 'nurse',
    duration: '4hr',
    middle_price: 800,
    business_price: 1500,
    royal_price: 3000,
    description: '4-Hour Dedicated GNM/B.Sc Registered Nurse Shift for Post-Operative, Wound & Vitals Care',
    is_active: true,
    features: ['Vitals check (BP, Sugar, SpO2)', 'Wound Dressing & Injections', 'Bedside hygiene & mobility support']
  },
  {
    id: 'spt-nurse-8hr',
    service_type: 'nurse',
    duration: '8hr',
    middle_price: 1200,
    business_price: 2200,
    royal_price: 4500,
    description: '8-Hour Complete Nursing & Vitals Care Shift with Medication Timing & Mobility Escort',
    is_active: true,
    features: ['8hr Continuous clinical monitoring', 'IV infusion & Medication administration', 'Patient meal & rehabilitation support']
  },
  {
    id: 'spt-nurse-12hr',
    service_type: 'nurse',
    duration: '12hr',
    middle_price: 1800,
    business_price: 3500,
    royal_price: 7000,
    description: '12-Hour Night/Day ICU Support, Tracheostomy Care & Emergency Medication Shift',
    is_active: true,
    features: ['12hr Day/Night dedicated vigilance', 'Critical care monitoring', 'Immediate emergency physician alert']
  },
  {
    id: 'spt-doctor-1visit',
    service_type: 'doctor',
    duration: '1_visit',
    middle_price: 1500,
    business_price: 2500,
    royal_price: 5000,
    description: 'Single Comprehensive Home / Hotel / Hospital Bedside Consultation by MD Specialist',
    is_active: true,
    features: ['Complete clinical examination', 'Prescription & digital health records', 'Hospital admission guidance if required']
  },
  {
    id: 'spt-doctor-monthly',
    service_type: 'doctor',
    duration: 'monthly_retainer',
    middle_price: 15000,
    business_price: 25000,
    royal_price: 60000,
    description: 'Monthly Family Physician Retainer with Weekly Scheduled Visits & 24/7 Teleconsults',
    is_active: true,
    features: ['Weekly in-person home visits', '24/7 Direct priority call access', 'Specialist coordination & diet management']
  },
  {
    id: 'spt-team-24x7',
    service_type: 'nurse',
    duration: '24hr',
    middle_price: null, // Middle is NULL
    business_price: 15000,
    royal_price: 25000,
    description: '24x7 Nurse + Doctor Dual Team per day (Continuous bedside nursing + On-call MD Doctor)',
    is_active: true,
    features: ['24-Hour dual medical coverage', 'Full-time bedside nurse + Doctor visits', 'Daily clinical prognosis reports']
  },
  {
    id: 'spt-icu-home',
    service_type: 'icu_setup',
    duration: '24hr',
    middle_price: null, // Middle is NULL
    business_price: 8000,
    royal_price: 15000,
    description: 'ICU at Home per day (Multi-Para Monitor, Syringe Pump, BiPAP/CPAP, Oxygen Concentrator)',
    is_active: true,
    features: ['Hospital-grade ICU setup at home', 'Emergency power backup & oxygen cylinders', 'Trained ICU technician on-site']
  },
  {
    id: 'spt-medical-escort',
    service_type: 'medical_escort',
    duration: 'per_trip',
    middle_price: null, // Middle is NULL
    business_price: 5000,
    royal_price: 12000,
    description: 'Specialized Medical Transit Escort per trip (Station/Airport to Hospital + Travel Charges)',
    is_active: true,
    travel_applicable: true,
    features: ['Platform/Airport gate meet & assist', 'Oxygen cylinder & wheelchair in transit', 'Ambulance or luxury escort vehicle coordination']
  },
  {
    id: 'spt-royal-concierge',
    service_type: 'royal_concierge',
    duration: 'monthly_retainer',
    middle_price: null, // Middle is NULL
    business_price: null, // Business is NULL
    royal_price: 200000, // Royal 180000 to 250000
    description: 'Full Royal Concierge Monthly: 24x7 Private Medical Wing, Dedicated Staff, Air Ambulance / Jet Option (₹1,80,000 - ₹2,50,000)',
    is_active: true,
    features: ['100% Private Same Staff Team', 'Private Jet / Air Ambulance Priority Charter', 'Dedicated VVIP Health Concierge Butler', 'Global Apex Specialist Second Opinions']
  }
];

// In-Memory & File-Backed Persistence Engine
const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'service_pricing_tiers.json');

class ServicePricingTiersDatabase {
  private tiers: ServicePricingTierRow[] = [];

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.tiers = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read existing pricing file, initializing default seed:', e);
    }
    this.tiers = [...INITIAL_TIER_ROWS];
    this.persist();
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.tiers, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write service_pricing_tiers.json:', e);
    }
  }

  public getAllTiers(): ServicePricingTierRow[] {
    return this.tiers;
  }

  public getActiveTiers(): ServicePricingTierRow[] {
    return this.tiers.filter(t => t.is_active);
  }

  public getTierById(id: string): ServicePricingTierRow | undefined {
    return this.tiers.find(t => t.id === id);
  }

  public findPricing(service_type: string, duration: string): ServicePricingTierRow | undefined {
    return this.tiers.find(
      t => t.service_type.toLowerCase() === service_type.toLowerCase() && 
           (t.duration.toLowerCase() === duration.toLowerCase() || 
            (duration === '24hr' && t.duration === 'per_day') ||
            (duration === 'per_day' && t.duration === '24hr'))
    );
  }

  public updateTier(
    id: string, 
    updates: Partial<Omit<ServicePricingTierRow, 'id'>>
  ): ServicePricingTierRow | null {
    const idx = this.tiers.findIndex(t => t.id === id);
    if (idx === -1) return null;

    this.tiers[idx] = {
      ...this.tiers[idx],
      ...updates,
      middle_price: updates.middle_price !== undefined ? updates.middle_price : this.tiers[idx].middle_price,
      business_price: updates.business_price !== undefined ? updates.business_price : this.tiers[idx].business_price,
      royal_price: updates.royal_price !== undefined ? updates.royal_price : this.tiers[idx].royal_price,
    };
    this.persist();
    return this.tiers[idx];
  }

  public resetToDefault(): ServicePricingTierRow[] {
    this.tiers = [...INITIAL_TIER_ROWS];
    this.persist();
    return this.tiers;
  }

  /**
   * SSMC Verification Filter
   * Auto-rejects if college matches SSMC (Shyam Shah Medical College / Sanjay Gandhi)
   */
  public checkCollegeEligibility(collegeName: string): { isEligible: boolean; reason?: string } {
    if (!collegeName) return { isEligible: true };
    const normalized = collegeName.toLowerCase();
    const bannedKeywords = ['ssmc', 'shyam shah', 'sanjay gandhi memorial', 'ssmc rewa'];

    for (const kw of bannedKeywords) {
      if (normalized.includes(kw)) {
        return {
          isEligible: false,
          reason: 'SSMC Not Eligible: Auto-rejected. Shyam Shah / Sanjay Gandhi Medical College credentials require state board re-audit and are barred from VIP/Metro tiers.'
        };
      }
    }
    return { isEligible: true };
  }
}

export const servicePricingDb = new ServicePricingTiersDatabase();
