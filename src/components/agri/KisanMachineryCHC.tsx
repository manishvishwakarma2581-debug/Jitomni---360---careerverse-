import React, { useState } from 'react';
import { 
  Tractor, 
  Plane, 
  Settings, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign, 
  PhoneCall, 
  Calendar, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { KISAN_FARM_EQUIPMENT, FarmEquipmentRental } from '../../data/kisanData';

interface KisanMachineryCHCProps {
  lang: Language;
}

export const KisanMachineryCHC: React.FC<KisanMachineryCHCProps> = ({ lang }) => {
  const [selectedEquip, setSelectedEquip] = useState<FarmEquipmentRental>(KISAN_FARM_EQUIPMENT[0]);
  const [bookingAcreage, setBookingAcreage] = useState<number>(3);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBookNow = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C11] via-[#02130B] to-[#000000] border-2 border-emerald-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
              <Tractor className="w-4 h-4 text-emerald-400" />
              <span>कस्टम हायरिंग सेंटर (CHC) व ड्रोन सेवा बुकिंग</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
              आधुनिक कृषि यंत्र व AI ड्रोन किराए पर लें
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              महंगी मशीनें खरीदने की जरूरत नहीं! मात्र ₹350/एकड़ में AI स्प्रे ड्रोन, लेजर लैंड लेवलर, सुपर सीडर व कंबाइन हार्वेस्टर नजदीकी CHC केंद्र से बुक करें।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-center shrink-0">
            <span className="text-xs text-emerald-300 font-bold block">ड्रोन स्प्रे स्पीड</span>
            <span className="text-2xl sm:text-3xl font-black text-white">7 मिनट / एकड़</span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">90% पानी की बचत</span>
          </div>
        </div>
      </div>

      {/* Equipment List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Equipment Cards */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-black text-white px-1">
            उपलब्ध आधुनिक कृषि उपकरण ({KISAN_FARM_EQUIPMENT.length})
          </h3>

          <div className="space-y-3">
            {KISAN_FARM_EQUIPMENT.map((eq) => (
              <div
                key={eq.id}
                onClick={() => setSelectedEquip(eq)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedEquip.id === eq.id
                    ? 'bg-gradient-to-r from-emerald-950 via-[#042416] to-[#02130B] border-emerald-400 shadow-xl ring-2 ring-emerald-400/30'
                    : 'bg-[#02110A] border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#031A10]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{eq.icon}</span>
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        {eq.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white mt-1">
                        {eq.name.hi}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-500/15 text-xs">
                  <span className="text-emerald-300 font-bold">{eq.ratePerAcreOrHour}</span>
                  <span className="text-slate-400 text-[11px]">क्षमता: {eq.workCapacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Equipment Detail & Booking Simulation */}
        <div className="lg:col-span-7 space-y-6">
          {selectedEquip && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/50 shadow-2xl space-y-6">
              
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#032014] to-black border border-emerald-500/40">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedEquip.icon}</span>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-xs">
                      {selectedEquip.category}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                      {selectedEquip.name.hi}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">किराया दर</span>
                  <span className="text-base font-black text-emerald-400">{selectedEquip.ratePerAcreOrHour}</span>
                </div>
              </div>

              {/* Subsidy Alert */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>सरकारी सब्सिडी:</strong> {selectedEquip.govtSubsidy}</span>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  ✨ इस मशीन/ड्रोन के मुख्य फायदे:
                </h4>
                <div className="space-y-2">
                  {selectedEquip.benefits.map((b, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Request Box */}
              <div className="p-5 rounded-2xl bg-black/80 border border-emerald-400/40 space-y-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>तुरंत CHC ऑपरेटर / ड्रोन पायलट स्लॉट बुक करें:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block font-bold mb-1">खेत का रकबा (एकड़):</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={bookingAcreage}
                      onChange={(e) => setBookingAcreage(Number(e.target.value))}
                      className="w-full bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block font-bold mb-1">अनुमानित कुल किराया:</label>
                    <div className="p-2 rounded-xl bg-[#031A10] border border-emerald-500/30 text-sm font-black text-emerald-300">
                      ₹{(bookingAcreage * 400).toLocaleString()} (लगभग)
                    </div>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>स्लॉट बुक हो गया! नजदीकी CHC ऑपरेटर आपके पंजीकृत नंबर पर 15 मिनट में संपर्क करेगा।</span>
                  </div>
                ) : (
                  <button
                    onClick={handleBookNow}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>🚜 ऑपरेटर स्लॉट बुक करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
