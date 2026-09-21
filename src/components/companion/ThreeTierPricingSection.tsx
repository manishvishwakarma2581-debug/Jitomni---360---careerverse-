import React, { useState, useEffect } from 'react';
import {
  Crown,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Plane,
  HeartPulse,
  Stethoscope,
  Clock,
  Car,
  AlertCircle,
  FileCheck,
  Zap
} from 'lucide-react';
import { CustomerTier, ServicePricingTier } from '../../types';
import { TIER_CARD_CONFIGS, INITIAL_SERVICE_PRICING_TIERS } from '../../data/companionData';

interface ThreeTierPricingSectionProps {
  selectedTier: CustomerTier;
  onSelectTier: (tier: CustomerTier) => void;
  onSelectServiceRow: (tier: ServicePricingTier, customerTier: CustomerTier) => void;
  selectedRowId?: string;
}

export const ThreeTierPricingSection: React.FC<ThreeTierPricingSectionProps> = ({
  selectedTier,
  onSelectTier,
  onSelectServiceRow,
  selectedRowId
}) => {
  const [pricingTiers, setPricingTiers] = useState<ServicePricingTier[]>(INITIAL_SERVICE_PRICING_TIERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch dynamic pricing from backend /api/pricing/tiers
  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const res = await fetch('/api/pricing/tiers');
        if (res.ok) {
          const data = await res.json();
          if (data.tiers && Array.isArray(data.tiers)) {
            setPricingTiers(data.tiers);
          }
        }
      } catch (e) {
        console.warn('Using default pricing tier seed', e);
      }
    };
    fetchTiers();
  }, []);

  // Filter rows according to selected tier: hide if price is null for this tier
  const visibleRows = pricingTiers.filter((row) => {
    if (!row.is_active) return false;
    if (selectedTier === 'middle') {
      return row.middle_price !== null;
    }
    if (selectedTier === 'business') {
      return row.business_price !== null;
    }
    if (selectedTier === 'royal') {
      return row.royal_price !== null;
    }
    return true;
  });

  const getPriceForTier = (row: ServicePricingTier, tier: CustomerTier): number | null => {
    if (tier === 'middle') return row.middle_price;
    if (tier === 'business') return row.business_price;
    return row.royal_price;
  };

  return (
    <div className="space-y-8">
      {/* 1. TOP 3 SELECTABLE CARDS (Grey, Blue, Gold) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>1. Choose Service Tier (सेवा श्रेणी चुनें)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold border border-[#D4AF37]/30">
                3-Tier Architecture
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              अपनी आवश्यकता, गोपनीयता और बजट के अनुसार उपयुक्त श्रेणी का चयन करें। दरें स्वचालित रूप से अपडेट होंगी।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIER_CARD_CONFIGS.map((tierConfig) => {
            const isSelected = selectedTier === tierConfig.id;

            return (
              <div
                key={tierConfig.id}
                onClick={() => onSelectTier(tierConfig.id)}
                className={`rounded-3xl p-6 transition-all duration-300 relative cursor-pointer flex flex-col justify-between border-2 ${
                  tierConfig.id === 'middle'
                    ? isSelected
                      ? 'border-slate-400 bg-slate-900 shadow-xl shadow-slate-900/50 scale-[1.02]'
                      : 'border-slate-800 bg-[#07132B]/80 hover:border-slate-700'
                    : tierConfig.id === 'business'
                    ? isSelected
                      ? 'border-blue-400 bg-[#0A1931] shadow-2xl shadow-blue-900/40 scale-[1.02]'
                      : 'border-slate-800 bg-[#07132B]/80 hover:border-blue-800'
                    : isSelected
                    ? 'border-[#D4AF37] bg-gradient-to-b from-[#120E02] via-[#0A1931] to-[#040E24] shadow-2xl shadow-amber-950/60 scale-[1.02]'
                    : 'border-slate-800 bg-[#07132B]/80 hover:border-[#D4AF37]/50'
                }`}
              >
                {/* Floating Badge (Business & Royal) */}
                {tierConfig.badge && (
                  <div className="absolute -top-3.5 right-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg border ${
                        tierConfig.id === 'business'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-[#D4AF37] text-slate-950 border-[#ffe033]'
                      }`}
                    >
                      {tierConfig.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${
                        tierConfig.id === 'middle'
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : tierConfig.id === 'business'
                          ? 'bg-blue-900/50 border-blue-500/40 text-blue-300'
                          : 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                      }`}
                    >
                      {tierConfig.id === 'royal' ? '👑' : tierConfig.id === 'business' ? '💼' : '🛡️'}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Entry From</span>
                      <span
                        className={`text-lg sm:text-xl font-black font-mono ${
                          tierConfig.id === 'royal'
                            ? 'text-[#D4AF37]'
                            : tierConfig.id === 'business'
                            ? 'text-blue-400'
                            : 'text-slate-200'
                        }`}
                      >
                        ₹{(tierConfig.id === 'royal' ? 3000 : tierConfig.id === 'business' ? 1500 : 800).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                      <span>{tierConfig.title}</span>
                      {isSelected && (
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            tierConfig.id === 'royal'
                              ? 'text-[#D4AF37]'
                              : tierConfig.id === 'business'
                              ? 'text-blue-400'
                              : 'text-slate-400'
                          }`}
                        />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {tierConfig.hindiTitle}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    {tierConfig.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            tierConfig.id === 'royal'
                              ? 'bg-[#D4AF37]'
                              : tierConfig.id === 'business'
                              ? 'bg-blue-400'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Footer Button */}
                <div className="pt-5 mt-4 border-t border-slate-800/60">
                  <div
                    className={`w-full py-2.5 rounded-xl font-black text-xs text-center transition-all ${
                      isSelected
                        ? tierConfig.id === 'royal'
                          ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30'
                          : tierConfig.id === 'business'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-700 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelected ? '✓ Selected Tier (सक्रिय श्रेणी)' : 'Select This Tier (यह चुनें)'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ROYAL CONCIERGE BENEFITS SECTION (Visible ONLY when Royal is selected) */}
      {selectedTier === 'royal' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120E02] via-[#0A1931] to-[#1a1300] border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Background watermark */}
          <Crown className="w-64 h-64 text-[#D4AF37]/5 absolute -bottom-10 -right-10 pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-2xl text-[#D4AF37] shadow-lg">
                  👑
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37] text-slate-950 font-black">
                      EXCLUSIVE PRIVILEGE
                    </span>
                    <span className="text-xs text-[#FFD700] font-bold">100% Confidentiality & Sovereign Protocol</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    Royal Concierge VIP Healthcare Wing (राजसी परिवार विशेषाधिकार)
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-amber-300 font-mono font-bold block">Monthly Retainer Range:</span>
                <span className="text-xl sm:text-2xl font-black text-[#D4AF37] font-mono">
                  ₹1,80,000 - ₹2,50,000 / mo
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              राजसी व उच्च-प्रतिष्ठित परिवारों के लिए पूर्णतः निजी, अभेद्य व उच्चतम गुणवत्ता युक्त स्वास्थ्य प्रबंधन। 
              एक ही समर्पित स्टाफ (Same Staff Guarantee) जो परिवार के सदस्यों से परिचित रहता है, बिना किसी अवांछित फेरबदल के।
            </p>

            {/* 5 Royal Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Private & Same Staff Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  हर विजिट या शिफ्ट में वही चुनिंदा सर्टिफाइड स्टाफ तैनात रहेगा। शून्य थर्ड-पार्टी शेयरिंग व सख्त एनडीए (NDA)।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <Plane className="w-4 h-4 text-[#D4AF37]" />
                  <span>Private Jet & Air Ambulance Escort</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  आपात स्थिति में चार्टर प्लेन या एयर एम्बुलेंस द्वारा देश के शीर्ष अस्पतालों (AIIMS Delhi, Medanta Gurgaon, Apollo Chennai) में तुरंत स्थानांतरण।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <Stethoscope className="w-4 h-4 text-[#D4AF37]" />
                  <span>24x7 Dedicated Dual Team (Doctor + Nurse)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  घर पर ही राउंड-द-क्लॉक पर्सनल फिजिशियन और क्रिटिकल केयर आईसीयू नर्स की लाइव निगरानी।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <HeartPulse className="w-4 h-4 text-[#D4AF37]" />
                  <span>Multi-User Family Live Vitals Dashboard</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  विदेश या अन्य शहरों में रह रहे परिजनों के फोन पर मरीज के बीपी, शुगर, ईसीजी व जीपीएस का 24x7 सुरक्षित लाइव टेलीमेट्री।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct Zero-Wait VIP Bed & Suite Allocation</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  अस्पताल पहुंचते ही बिना किसी कतार के सीधे एपेक्स सुपर-स्पेशियलिटी सूट व ओटी एलोकेशन।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                  <span>One-Touch SOS Sovereign Dispatch</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  आपातकालीन बटन दबाते ही निकटतम एम्बुलेंस, डॉक्टर वाहन व सुरक्षा टीम का तत्काल जीपीएस डिस्पैच।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC PRICE LIST BASED ON SELECTED TIER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>2. Verified Services & Transparent Pricing (सत्यापित सेवाएं व दरें)</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold capitalize ${
                  selectedTier === 'royal'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                    : selectedTier === 'business'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                Showing {selectedTier} Class Rates
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              अपनी आवश्यकता अनुसार सेवा चुनें। क्लिक करते ही बुकिंग फॉर्म में दरें और विवरण लोड हो जाएंगे।
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {visibleRows.length} active options for {selectedTier} tier
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleRows.map((row) => {
            const price = getPriceForTier(row, selectedTier);
            const isRowSelected = selectedRowId === row.id;

            return (
              <div
                key={row.id}
                onClick={() => onSelectServiceRow(row, selectedTier)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isRowSelected
                    ? selectedTier === 'royal'
                      ? 'border-[#D4AF37] bg-[#0A1931] shadow-xl shadow-amber-950/50 scale-[1.01]'
                      : selectedTier === 'business'
                      ? 'border-blue-400 bg-[#0A1931] shadow-xl shadow-blue-950/50 scale-[1.01]'
                      : 'border-slate-400 bg-slate-900 shadow-xl'
                    : 'border-slate-800 bg-[#040E24] hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                          row.service_type === 'nurse'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : row.service_type === 'doctor'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : row.service_type === 'royal_concierge'
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                            : row.service_type === 'icu_setup'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {row.service_type === 'nurse' ? '👩‍⚕️' : row.service_type === 'doctor' ? '🩺' : row.service_type === 'royal_concierge' ? '👑' : row.service_type === 'icu_setup' ? '🏥' : '🚆'}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          {row.service_type.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-bold text-white capitalize">
                          Duration: {row.duration.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base sm:text-lg font-black font-mono ${
                          selectedTier === 'royal'
                            ? 'text-[#D4AF37]'
                            : selectedTier === 'business'
                            ? 'text-blue-400'
                            : 'text-white'
                        }`}
                      >
                        ₹{price?.toLocaleString()}
                      </div>
                      {(row.hasTravelCharges || row.travel_applicable) && (
                        <span className="text-[10px] text-slate-400 font-mono block">
                          + Travel Charges
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {row.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Staff</span>
                  </span>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all ${
                      isRowSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : selectedTier === 'royal'
                        ? 'bg-[#D4AF37] hover:bg-[#ffe033] text-slate-950'
                        : selectedTier === 'business'
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>{isRowSelected ? 'Selected ✓' : 'Book Sathi'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
