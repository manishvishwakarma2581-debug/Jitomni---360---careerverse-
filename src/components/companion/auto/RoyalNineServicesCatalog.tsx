import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Zap, 
  ArrowRight, 
  Star, 
  DollarSign,
  UserCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { RoyalServiceItem, BridgeOrder } from './royalAutoTypes';
import { NINE_ROYAL_SERVICES, RoyalAutoStorage } from './royalAutoStorage';
import { playAcceptSound } from './audioAlerts';

interface RoyalNineServicesCatalogProps {
  onOrderCreated?: (order: BridgeOrder) => void;
  onNavigateToAuto?: () => void;
  onNavigateToFood?: () => void;
}

export const RoyalNineServicesCatalog: React.FC<RoyalNineServicesCatalogProps> = ({
  onOrderCreated,
  onNavigateToAuto,
  onNavigateToFood,
}) => {
  const [selectedService, setSelectedService] = useState<RoyalServiceItem | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);

  // Booking Form Fields
  const [customerName, setCustomerName] = useState<string>('अमित कुमार (Amit Kumar)');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 98261 44901');
  const [pickupAddress, setPickupAddress] = useState<string>('संजय गांधी हॉस्पिटल गेट 2, रीवा');
  const [destinationAddress, setDestinationAddress] = useState<string>('सिविल लाइन्स, रीवा');
  const [bookingHours, setBookingHours] = useState<number>(2);
  const [specialRequirements, setSpecialRequirements] = useState<string>('समय पर पहुंचें, व्हीलचेयर और पर्ची में सहायता आवश्यक है।');
  const [successOrder, setSuccessOrder] = useState<BridgeOrder | null>(null);

  const handleOpenBooking = (service: RoyalServiceItem) => {
    if (service.id === 'royal_auto_ride' && onNavigateToAuto) {
      onNavigateToAuto();
      return;
    }
    if (service.id === 'food_bridge_meal' && onNavigateToFood) {
      onNavigateToFood();
      return;
    }
    setSelectedService(service);
    setBookingHours(service.minHours || 2);
    setIsBookModalOpen(true);
    setSuccessOrder(null);
  };

  const handleConfirmTaskBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    playAcceptSound();
    const totalAmount = selectedService.baseHourlyRate * bookingHours;

    const newOrder = RoyalAutoStorage.createBridgeOrder({
      type: 'royalService',
      serviceTitle: `${selectedService.hindiName} (${bookingHours} घंटे)`,
      customerId: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      pickup: {
        address: pickupAddress,
        lat: 24.5362,
        lng: 81.3037,
      },
      drop: {
        address: destinationAddress,
        lat: 24.542,
        lng: 81.311,
      },
      totalAmount,
      notes: specialRequirements,
    });

    setSuccessOrder(newOrder);
    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Showcase Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0A1931] via-[#07132B] to-[#0A1931] border-2 border-[#D4AF37]/50 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JITOMNI 360° SOVEREIGN SUITE • 9 ROYAL SERVICES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            9 रॉयल सेवाएं — पढ़ाई से कमाई व सुरक्षित पारिवारिक सहयोग
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            अस्पताल में लाइन लगाने वाले <strong className="text-[#D4AF37]">मेडिकल साथी</strong> से लेकर बुजुर्गों की देखरेख, शहर गाइड और 0% सर्ज ऑटो तक।
            हमारा <strong className="text-emerald-400">डिमांड टॉवर</strong> पहले हमारे वेरिफाइड साथियों को अवसर देता है, फिर 90 सेकंड में निकटतम टाई-अप पार्टनर्स को 80/20 मॉडल पर फॉलबैक करता है।
          </p>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid of 9 Royal Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {NINE_ROYAL_SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl bg-[#07132B] border border-slate-800 hover:border-[#D4AF37]/70 transition-all duration-300 p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 group relative"
          >
            <div className="space-y-4">
              {/* Badge & Service Number */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#D4AF37] px-2 py-0.5 rounded bg-slate-900 border border-[#D4AF37]/30">
                  #{service.serviceNumber} ROYAL
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {service.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {service.hindiName}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                    {service.name}
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {service.tagline}
              </p>

              {/* Popular Use Bullets */}
              <div className="space-y-1 pt-1">
                {service.popularUse.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Booking Action */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">पारदर्शी दर</span>
                <span className="text-sm font-mono font-black text-[#D4AF37]">
                  ₹{service.baseHourlyRate}
                  <span className="text-[10px] text-slate-400 font-normal"> / घंटा</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking(service)}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-md shadow-[#D4AF37]/20 flex items-center gap-1.5 transition-all group-hover:scale-105"
              >
                <span>अभी बुक करें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Dialog Modal */}
      {isBookModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#07132B] border-2 border-[#D4AF37] p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedService.icon}</span>
                <div>
                  <h3 className="text-base font-black text-white">{selectedService.hindiName}</h3>
                  <p className="text-xs text-[#D4AF37] font-bold">
                    ₹{selectedService.baseHourlyRate}/घंटा • न्यूनतम {selectedService.minHours} घंटे
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {successOrder ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black text-lg">
                  ✓
                </div>
                <h4 className="text-sm font-black text-emerald-300">आर्डर सफलतापूर्वक टॉवर में प्रेषित!</h4>
                <p className="text-xs text-slate-300">
                  आर्डर आईडी: <strong className="font-mono text-white">#{successOrder.orderId}</strong>
                  <br />
                  डिमांड टॉवर 90 सेकंड तक निकटतम आंतरिक साथी ढूंढेगा, फिर स्वतः पार्टनर को फॉलबैक करेगा।
                </p>
                <div className="p-3 rounded-lg bg-slate-900 text-left text-xs font-mono space-y-1">
                  <div>कुल देय राशि: ₹{successOrder.commissionSplit.totalAmount}</div>
                  <div>मॉडल: {successOrder.commissionSplit.model}</div>
                  <div>स्टार्ट OTP: <strong className="text-amber-400">{successOrder.deliveryOtp}</strong></div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xs"
                >
                  डिमांड टॉवर में ट्रैक करें
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmTaskBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">आपका नाम *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">मोबाइल नंबर *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">पिकअप / मिलने का स्थान *</label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">कार्य गंतव्य / अस्पताल / पता *</label>
                  <input
                    type="text"
                    required
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-300">आवश्यक समय (Duration)</label>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">{bookingHours} घंटे</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 6, 8].map((hrs) => (
                      <button
                        key={hrs}
                        type="button"
                        onClick={() => setBookingHours(hrs)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          bookingHours === hrs
                            ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {hrs}h
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">विशेष निर्देश (Requirements)</label>
                  <textarea
                    rows={2}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>

                {/* Bill Breakdown */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>आधार दर ({bookingHours} घंटे @ ₹{selectedService.baseHourlyRate}/hr):</span>
                    <span className="font-mono text-white">₹{selectedService.baseHourlyRate * bookingHours}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>प्लेटफॉर्म सुरक्षा व पुलिस वेरिफिकेशन गारंटी:</span>
                    <span className="font-mono text-emerald-400">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-[#D4AF37]">
                    <span>कुल अनुमानित शुल्क:</span>
                    <span className="font-mono">₹{selectedService.baseHourlyRate * bookingHours}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-black text-xs shadow-lg shadow-[#D4AF37]/30 flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>डिमांड टॉवर में साथी खोजें</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
