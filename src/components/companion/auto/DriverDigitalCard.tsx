import React from 'react';
import { AutoDriver } from './royalAutoTypes';
import { ShieldCheck, Star, Award, QrCode, Phone, CheckCircle2, AlertTriangle, Printer } from 'lucide-react';

interface DriverDigitalCardProps {
  driver: AutoDriver;
  onClose?: () => void;
  isPrintable?: boolean;
}

export const DriverDigitalCard: React.FC<DriverDigitalCardProps> = ({
  driver,
  onClose,
  isPrintable = false,
}) => {
  const maskedAadhar = driver.aadharNumber
    ? `XXXX-XXXX-${driver.aadharNumber.replace(/[^0-9]/g, '').slice(-4)}`
    : 'XXXX-XXXX-1234';

  const maskedPhone = driver.phone
    ? `${driver.phone.slice(0, 7)}*****`
    : '+91 98261 *****';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative max-w-md mx-auto p-1 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-amber-200 to-[#996515] shadow-2xl">
      <div className="relative rounded-[22px] bg-[#0A1931] text-white p-5 overflow-hidden border border-[#D4AF37]/40">
        {/* Watermark Crest */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-xl pointer-events-none" />
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow">
              🛺
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                JITOMNI 360° SOVEREIGN
              </div>
              <div className="text-xs font-bold text-white tracking-wide">
                ROYAL AUTO EXECUTIVE
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[10px] font-black">
              CITY: {driver.cityCode}
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="mt-4 flex gap-4 items-center">
          {/* Photo & Rating */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 bg-slate-800">
              <img
                src={driver.photoUrl}
                alt={driver.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).src =
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
                }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-[#D4AF37] font-black text-center py-0.5">
                VERIFIED
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs font-black text-[#D4AF37]">{driver.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black text-white leading-tight">
                {driver.name}
              </h3>
            </div>

            {/* Unique Royal ID Highlight */}
            <div className="inline-block bg-gradient-to-r from-amber-500/20 via-[#D4AF37]/30 to-amber-500/20 border border-[#D4AF37] px-2.5 py-1 rounded-lg">
              <span className="text-[10px] text-slate-300 font-medium block">ROYAL DRIVER ID</span>
              <span className="text-sm font-mono font-black text-[#D4AF37] tracking-wider">
                {driver.royalId}
              </span>
            </div>

            <div className="text-[11px] text-slate-300 flex items-center gap-1">
              <span className="text-slate-400">ऑटो नं:</span>
              <span className="font-mono font-bold text-white bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                {driver.autoNumber}
              </span>
            </div>

            <div className="text-[10px] text-slate-300">
              <span className="text-slate-400">लाइसेंस:</span>{' '}
              <span className="font-mono text-slate-200">{driver.licenseNumber}</span>
            </div>
          </div>
        </div>

        {/* Verification Status Pills */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-[10px] font-bold">
          <div
            className={`p-1.5 rounded-lg flex items-center gap-1.5 border ${
              driver.isAadharVerified
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div>
              <div>आधार वेरिफाइड: {driver.isAadharVerified ? 'हाँ (UIDAI)' : 'प्रक्रियाधीन'}</div>
              <div className="text-[9px] font-mono text-slate-400">{maskedAadhar}</div>
            </div>
          </div>

          <div
            className={`p-1.5 rounded-lg flex items-center gap-1.5 border ${
              driver.isPoliceVerified
                ? 'bg-blue-950/40 border-blue-500/50 text-blue-300'
                : 'bg-yellow-950/40 border-yellow-500/50 text-yellow-300'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div>
              <div>पुलिस वेरिफिकेशन: {driver.isPoliceVerified ? 'सत्यापित (CID)' : 'लंबित (Pending)'}</div>
              <div className="text-[9px] text-slate-400">थाना रिकॉर्ड क्लियर</div>
            </div>
          </div>
        </div>

        {/* QR Code & Auto ID Scanning Section */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-900/90 border border-[#D4AF37]/30 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>ग्राहक सुरक्षा QR कोड</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-snug">
              ऑटो में बैठते ही इस QR को स्कैन करें और ड्राइवर का 100% रिकॉर्ड जांचें।
            </p>
            <div className="text-[9px] text-slate-400 font-mono">
              SOS 24x7: पुलिस 112 से सीधे लिंक
            </div>
          </div>

          {/* Realistic QR Canvas / SVG */}
          <div className="p-1.5 bg-white rounded-lg shrink-0 shadow-md">
            <svg
              className="w-16 h-16"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner position markers */}
              <rect width="100" height="100" fill="white" />
              <rect x="5" y="5" width="26" height="26" fill="#0A1931" />
              <rect x="9" y="9" width="18" height="18" fill="white" />
              <rect x="13" y="13" width="10" height="10" fill="#0A1931" />

              <rect x="69" y="5" width="26" height="26" fill="#0A1931" />
              <rect x="73" y="9" width="18" height="18" fill="white" />
              <rect x="77" y="13" width="10" height="10" fill="#0A1931" />

              <rect x="5" y="69" width="26" height="26" fill="#0A1931" />
              <rect x="9" y="73" width="18" height="18" fill="white" />
              <rect x="13" y="77" width="10" height="10" fill="#0A1931" />

              {/* Data blocks */}
              <rect x="36" y="8" width="6" height="6" fill="#0A1931" />
              <rect x="46" y="8" width="8" height="6" fill="#0A1931" />
              <rect x="58" y="8" width="6" height="6" fill="#0A1931" />

              <rect x="36" y="20" width="8" height="8" fill="#0A1931" />
              <rect x="48" y="20" width="6" height="8" fill="#0A1931" />
              <rect x="58" y="20" width="6" height="6" fill="#0A1931" />

              <rect x="8" y="36" width="6" height="6" fill="#0A1931" />
              <rect x="20" y="36" width="8" height="6" fill="#0A1931" />
              <rect x="32" y="36" width="6" height="6" fill="#0A1931" />
              <rect x="42" y="36" width="8" height="6" fill="#0A1931" />
              <rect x="54" y="36" width="6" height="6" fill="#0A1931" />
              <rect x="64" y="36" width="8" height="6" fill="#0A1931" />
              <rect x="76" y="36" width="6" height="6" fill="#0A1931" />
              <rect x="86" y="36" width="6" height="6" fill="#0A1931" />

              <rect x="36" y="48" width="8" height="8" fill="#D4AF37" />
              <rect x="48" y="48" width="8" height="8" fill="#0A1931" />
              <rect x="60" y="48" width="8" height="8" fill="#D4AF37" />

              <rect x="8" y="58" width="6" height="6" fill="#0A1931" />
              <rect x="20" y="58" width="6" height="6" fill="#0A1931" />
              <rect x="36" y="60" width="6" height="6" fill="#0A1931" />
              <rect x="48" y="60" width="6" height="6" fill="#0A1931" />
              <rect x="68" y="60" width="8" height="8" fill="#0A1931" />
              <rect x="80" y="60" width="6" height="6" fill="#0A1931" />

              <rect x="36" y="74" width="8" height="6" fill="#0A1931" />
              <rect x="48" y="74" width="8" height="6" fill="#0A1931" />
              <rect x="60" y="74" width="6" height="6" fill="#0A1931" />
              <rect x="72" y="74" width="8" height="6" fill="#0A1931" />
              <rect x="84" y="74" width="8" height="6" fill="#0A1931" />

              <rect x="36" y="86" width="6" height="6" fill="#0A1931" />
              <rect x="48" y="86" width="8" height="6" fill="#0A1931" />
              <rect x="60" y="86" width="6" height="6" fill="#0A1931" />
              <rect x="74" y="86" width="6" height="6" fill="#0A1931" />
              <rect x="86" y="86" width="6" height="6" fill="#0A1931" />
            </svg>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] text-slate-400">
          <div>
            T-Shirt Size: <span className="font-bold text-white">{driver.tShirtSize}</span> • Rides:{' '}
            <span className="font-bold text-[#D4AF37]">{driver.totalRides}</span>
          </div>
          <div>
            Joined: <span className="font-mono text-slate-300">{driver.joiningDate}</span>
          </div>
        </div>

        {/* Actions for modal or view */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>आईडी कार्ड व ऑटो स्टिकर प्रिंट करें</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              बंद करें
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
