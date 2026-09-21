import React from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Award,
  Crown,
  Building2,
  Plane,
  Clock,
  ArrowRight,
  Phone,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import medicalCarePosterImg from '../../assets/images/medical_sathi_care_1789979237924.jpg';
import { CustomerTier } from '../../types';

interface MedicalSathiServicePosterProps {
  onSelectTierAndBook: (tier: CustomerTier) => void;
  onOpenSOS?: () => void;
}

export const MedicalSathiServicePoster: React.FC<MedicalSathiServicePosterProps> = ({
  onSelectTierAndBook,
  onOpenSOS
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Visual Poster Card */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0A1931] via-[#07132B] to-[#040E24] border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl relative">
        {/* Top Floating Badge Bar */}
        <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-md border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#D4AF37] text-slate-950 uppercase tracking-wider font-mono shadow-md">
              OFFICIAL SERVICE POSTER
            </span>
            <span className="text-xs font-bold text-slate-200">
              JITOMNI 360 • HUMARA MEDICAL SATHI
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Police & UIDAI Verified Staff
            </span>
            {onOpenSOS && (
              <button
                onClick={onOpenSOS}
                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>24/7 SOS</span>
              </button>
            )}
          </div>
        </div>

        {/* Poster Body: Image + Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          {/* Left: Photorealistic Poster Visual */}
          <div className="lg:col-span-5 relative group">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-2xl shadow-blue-950/80 bg-slate-950 relative">
              <img
                src={medicalCarePosterImg}
                alt="Compassionate Medical Sathi Nurse and Doctor attending patient with bedside care"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#FFD700]">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>Compassionate Bedside & In-Transit Care</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  डॉक्टर और सर्टिफाइड नर्स का पूरा ध्यान सिर्फ मरीज की सेहत और आराम पर।
                </p>
              </div>
            </div>

            {/* AIIMS & CMC Standard Watermark Tag */}
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-xl bg-[#0A1931] border border-[#D4AF37] text-[10px] font-mono font-bold text-[#FFD700] shadow-lg">
              AIIMS & CMC PROTOCOLS
            </div>
          </div>

          {/* Right: Pitch & Headlines */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                Zero Commission • 100% Sovereign Quality
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mt-1">
                Railway Station / Home Se Hospital Tak — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-yellow-400">
                  Nurse + Doctor Ki Nigrani Me
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                दूर-दराज से भोपाल AIIMS, हमीदिया, नागपुर AIIMS या रीवा आने वाले बुजुर्गों, गंभीर मरीजों और परिवारों के लिए 
                भारत की सबसे भरोसेमंद मेडिकल एस्कॉर्ट व होम केयर सेवा।
              </p>
            </div>

            {/* 3 Tier Quick Comparison Strips */}
            <div className="space-y-2.5">
              {/* Middle */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs">
                    M
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Middle Class (मध्यम वर्ग)</h4>
                    <p className="text-[11px] text-slate-400">नर्स ₹800 से • डॉक्टर विजिट ₹1,500 • पारदर्शी घरेलू केयर</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTierAndBook('middle')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors"
                >
                  चुनें
                </button>
              </div>

              {/* Business */}
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    B
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">Business Class (बिजनेस क्लास)</h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/30 text-blue-300 font-mono font-bold">
                        Hotel/Office Visit + GST Bill
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">नर्स ₹1,500 से • 24x7 टीम ₹15,000 • ICU एट होम ₹8,000</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTierAndBook('business')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md transition-colors"
                >
                  चुनें
                </button>
              </div>

              {/* Royal */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 to-yellow-950/60 border border-[#D4AF37] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-slate-950 font-black text-xs">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#FFD700]">Royal Family (राजसी परिवार)</h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#D4AF37]/30 text-[#FFD700] font-mono font-black border border-[#D4AF37]/40">
                        100% Private + Same Staff + Jet Escort
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-200">24x7 टीम ₹25,000 • रॉयल कंसीयर्ज ₹1.8L-2.5L/माह • प्राइवेट विंग</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTierAndBook('royal')}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#ffe033] text-slate-950 text-xs font-black shadow-md transition-colors"
                >
                  चुनें
                </button>
              </div>
            </div>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-300 font-bold block">100% Empanelled</span>
                <span className="text-[9px] text-slate-400">AIIMS / Hamidia Trained</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <Clock className="w-4 h-4 text-[#FFD700] mx-auto mb-1" />
                <span className="text-[10px] text-slate-300 font-bold block">Guaranteed On-Time</span>
                <span className="text-[9px] text-slate-400">Platform & Doorstep Pickup</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <Award className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-300 font-bold block">SSMC Barred Filter</span>
                <span className="text-[9px] text-slate-400">Zero Compromise Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
