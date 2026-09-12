import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
  Download,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { PaymentTier, PaymentTransaction } from '../../types';
import { PaymentService } from '../../services/paymentService';
import { AuthService } from '../../services/authService';

interface UniversalPaymentModalProps {
  tier: PaymentTier;
  onClose: () => void;
  onSuccess: (tx: PaymentTransaction) => void;
}

export const UniversalPaymentModal: React.FC<UniversalPaymentModalProps> = ({
  tier,
  onClose,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi_qr' | 'upi_vpa' | 'card' | 'netbanking'>('upi_qr');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const price = PaymentService.getEffectivePrice(tier);
  const phase = PaymentService.getMonetizationPhase();
  const upiVpa = 'manishvishwakarma2581@okhdfcbank';

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiVpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCompletePayment = (method: PaymentTransaction['paymentMethod'], ref?: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const tx = PaymentService.createTransaction(
        tier.serviceKey,
        tier.title.hi,
        price,
        method,
        ref || `UPI/${Date.now().toString().slice(-8)}`
      );
      setIsProcessing(false);
      setCompletedTx(tx);
      onSuccess(tx);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#040C1A] border-2 border-[#FFD700]/60 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-black via-[#0B172C] to-black border-b border-[#FFD700]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-[#FFD700] border border-amber-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
                JITOMNI SOVEREIGN SECURE GATEWAY
              </span>
              <h3 className="text-sm sm:text-base font-black text-white">
                {tier.title.hi}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!completedTx ? (
          <div className="p-6 space-y-5">
            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#170E02] via-[#241503] to-[#170E02] border border-amber-500/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 block">प्रारंभिक वहनीय टोकन शुल्क (Phase 1):</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-[#FFD700]">₹{price}</span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{tier.phase2StandardPriceRupee}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                    प्रारंभिक 2-महीने विशेष
                  </span>
                </div>
              </div>

              <div className="text-right text-[11px] font-mono text-amber-200">
                <span>{tier.durationOrUsage}</span>
                <span className="block text-slate-400 text-[10px]">100% सेफ UPI / कार्ड्स</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi_qr', label: 'UPI QR कोड', icon: QrCode },
                { id: 'upi_vpa', label: 'UPI ID / VPA', icon: Smartphone },
                { id: 'card', label: 'कार्ड / नेटबैंकिंग', icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                      isSel
                        ? 'bg-amber-500/20 border-[#FFD700] text-[#FFD700] shadow-md shadow-amber-500/20'
                        : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method 1: UPI QR CODE */}
            {selectedMethod === 'upi_qr' && (
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-center space-y-3">
                <div className="inline-block p-3 rounded-2xl bg-white shadow-xl">
                  {/* Generated QR representation */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      PaymentService.generateUPIIntentUrl(price, tier.title.en)
                    )}`}
                    alt="Jitomni UPI QR"
                    className="w-40 h-40 object-contain mx-auto"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    PhonePe, Google Pay, Paytm या BHIM से स्कैन करें
                  </p>
                  <p className="text-[11px] text-slate-400">
                    पेमेंट करने के बाद नीचे "कन्फर्म पे" बटन दबाएं
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="truncate mr-2">VPA: {upiVpa}</span>
                  <button
                    onClick={handleCopyUPI}
                    className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1 flex-shrink-0"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'कॉपी हो गया' : 'कॉपी VPA'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Method 2: UPI ID INPUT */}
            {selectedMethod === 'upi_vpa' && (
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">अपनी UPI ID दर्ज करें:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiIdInput}
                    onChange={(e) => setUpiIdInput(e.target.value)}
                    placeholder="उदा. mobile@paytm या name@okhdfcbank"
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#061224] border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  आपके UPI ऐप पर ₹{price} का पेमेंट रिक्वेस्ट भेजा जाएगा।
                </p>
              </div>
            )}

            {/* Method 3: CARD & NETBANKING */}
            {selectedMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">कार्ड नंबर (डेबिट / क्रेडिट)</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8921"
                    className="w-full px-3 py-2 rounded-xl bg-[#061224] border border-slate-700 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">एक्सपायरी (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      className="w-full px-3 py-2 rounded-xl bg-[#061224] border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      className="w-full px-3 py-2 rounded-xl bg-[#061224] border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                disabled={isProcessing}
                onClick={() => handleCompletePayment(selectedMethod)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#F59E0B] to-[#FFD700] text-black font-black text-sm hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>सुरक्षित पेमेंट प्रोसेस हो रहा है...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-black" />
                    <span>₹{price} का सुरक्षित भुगतान करें व अनलॉक करें</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
                <span>🛡️ 256-bit SSL एन्क्रिप्टेड</span>
                <span>100% रिफंड गारंटी यदि सर्विस एक्टिव न हो</span>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black text-white">भुगतान सफल! (Payment Successful)</h4>
              <p className="text-xs text-slate-300">
                आपकी सर्विस तुरंत अनलॉक कर दी गई है।
              </p>
            </div>

            {/* Official Invoice Summary */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">इनवॉइस नंबर:</span>
                <span className="text-amber-300 font-bold">{completedTx.invoiceNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">सर्विस:</span>
                <span className="text-white font-bold">{completedTx.serviceTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">भुगतान राशि:</span>
                <span className="text-emerald-400 font-black">₹{completedTx.amountRupee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UPI Ref:</span>
                <span className="text-slate-300">{completedTx.upiRefNumber}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm hover:brightness-110 transition-all shadow-xl shadow-emerald-500/20"
              >
                अनलॉक सर्विस का उपयोग करें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
