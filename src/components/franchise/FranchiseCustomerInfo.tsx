import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  MapPin,
  Calculator,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Zap,
  HelpCircle,
  Clock,
  Crown,
  Lock,
  Download,
  Send,
  FileCheck,
  Percent,
} from 'lucide-react';
import { PAN_INDIA_CITIES_PRESENCE, FranchiseStorage } from './franchiseData';
import { FranchiseApplication } from './franchiseTypes';
import { Language } from '../../types';

interface FranchiseCustomerInfoProps {
  lang?: Language;
  onOpenOwnerLogin?: () => void;
  onOpenSuperAdmin?: () => void;
}

export const FranchiseCustomerInfo: React.FC<FranchiseCustomerInfoProps> = ({
  lang = 'hi',
  onOpenOwnerLogin,
  onOpenSuperAdmin,
}) => {
  // ROI Calculator State
  const [dailyBookings, setDailyBookings] = useState<number>(20);
  const [avgProfitPerBooking, setAvgProfitPerBooking] = useState<number>(150);

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [investmentReady, setInvestmentReady] = useState<'yes' | 'need_support' | 'no'>('yes');
  const [reason, setReason] = useState('');
  const [experience, setExperience] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Calculation Math
  const dailyGross = dailyBookings * avgProfitPerBooking;
  const monthlyGross = dailyGross * 30;
  const monthlyBrandFee = 3000;
  const monthlyNetProfit = Math.max(0, monthlyGross - monthlyBrandFee);
  const daysToRecoverInvestment = Math.ceil(75000 / (dailyGross || 1));

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !city || !mobile) {
      alert('कृपया अपना नाम, शहर और 10 अंकों का मोबाइल नंबर दर्ज करें।');
      return;
    }

    const newApp = FranchiseStorage.addApplication({
      name: applicantName,
      city: city,
      state: stateName || 'मध्य प्रदेश / भारत',
      mobile: mobile,
      email: email || `${mobile}@jitomni.in`,
      investmentReady: investmentReady,
      reason: reason || 'अपने शहर में संप्रभु रोजगार और 35+ ऑन-डिमांड सेवाएं शुरू करना चाहता हूँ।',
      experience: experience || 'स्थानीय व्यापार / सामाजिक नेटवर्किंग',
    });

    setSubmittedAppId(newApp.id);
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-12 text-slate-100">
      {/* 1. HERO BANNER: FRANCHISE LO - APNE SHEHER KE BOSS BANO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061224] via-[#0A1931] to-[#040C1A] border-2 border-[#D4AF37] p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.25)]">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Crown className="w-4 h-4 fill-slate-950" />
              PAN-INDIA SOVEREIGN EXPANSION 2026
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 font-mono">
              ★ REWA HEAD OFFICE AUTHENTIC MODEL
            </span>
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40 font-mono">
              70% OWNER PROFIT
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
              फ्रैंचाइज़ी लो — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#FFF] font-serif">अपने शहर के बॉस बनो!</span>
            </h1>
            <p className="text-base sm:text-xl text-amber-200 font-medium">
              "Jitomni 360° On-Demand Sathi (9 Services) + 35+ Gig Services का अधिकृत सिटी पार्टनर बनें"
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            अब आपको कोई नया ऐप नहीं बनाना, न लाखों रुपये सॉफ्टवेयर में गंवाने हैं। मात्र <strong>₹75,000</strong> में पाएं अपने पूरे शहर का एक्सक्लूसिव डिजिटल कंट्रोल पैनल, रीवा हेड ऑफिस में <strong>1 लड़की + 2 लड़कों</strong> का सम्पूर्ण रेसिडेंशियल स्टाफ ट्रेनिंग सिस्टम, रॉयल बोर्ड डिज़ाइन और पहले ही दिन से <strong>70% शुद्ध मुनाफ़ा</strong>!
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-[#040D1C]/90 border border-[#D4AF37]/50 shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">वन-टाइम इन्वेस्टमेंट</div>
              <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-mono mt-1">₹75,000</div>
              <div className="text-[10px] text-emerald-400 font-semibold">मात्र एकमुश्त निवेश</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#040D1C]/90 border border-[#D4AF37]/50 shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">कमीशन शेयर</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">70% : 30%</div>
              <div className="text-[10px] text-emerald-400 font-semibold">70% ओनर • 30% हेड ऑफिस</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#040D1C]/90 border border-[#D4AF37]/50 shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">स्टाफ ट्रेनिंग (रीवा)</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono mt-1">1👧 + 2👦</div>
              <div className="text-[10px] text-cyan-400 font-semibold">कॉल सपोर्ट + फील्ड सुपरवाइजर</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#040D1C]/90 border border-[#D4AF37]/50 shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">मासिक ब्रांड शुल्क</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1">₹3,000</div>
              <div className="text-[10px] text-slate-400 font-semibold">सर्वर मेंटेनेंस & ऐप अपडेट्स</div>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#apply-form"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-black text-sm hover:brightness-110 shadow-xl shadow-[#D4AF37]/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>अभी फ्रैंचाइज़ी के लिए आवेदन करें</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onOpenOwnerLogin && (
              <button
                type="button"
                onClick={onOpenOwnerLogin}
                className="px-6 py-4 rounded-2xl bg-[#0A1931] hover:bg-[#102447] text-[#D4AF37] font-bold text-sm border-2 border-[#D4AF37]/60 transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>फ्रैंचाइज़ी ओनर लॉगिन (City Panel)</span>
              </button>
            )}

            {onOpenSuperAdmin && (
              <button
                type="button"
                onClick={onOpenSuperAdmin}
                className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
              >
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span>हेड ऑफिस सुपर एडमिन (रीवा)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. WHAT YOU GET (क्या-क्या मिलेगा मात्र ₹75,000 में) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-4 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-black border border-[#D4AF37]/40 uppercase tracking-wider font-mono">
            COMPREHENSIVE FRANCHISE KIT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            मात्र ₹75,000 में आपको क्या-क्या मिलेगा?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            पूरा सिस्टम पहले दिन से रेडी-टू-रन। आपको सिर्फ अपने शहर में लोकल नेटवर्क संभालना है।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Item 1 */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-2xl border border-[#D4AF37]/50 group-hover:scale-110 transition-transform">
              🏛️
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white group-hover:text-[#D4AF37] transition-colors">
                रॉयल बोर्ड & ब्रांडिंग डिज़ाइन
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                मुख्य कार्यालय के लिए 10x4 फ़ीट का रॉयल नेवी+गोल्ड साइनबोर्ड डिज़ाइन, रिसेप्शन स्टैंडी, विज़िटिंग कार्ड, लीगल ऑथराइज़्ड पार्टनर सर्टिफिकेट और प्रचार पंपलेट का मास्टर प्रिंट-रेडी डिज़ाइन।
              </p>
            </div>
            <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>हाई-रेज़ोल्यूशन प्रिंट रेडी फाइल्स</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl border border-blue-500/50 group-hover:scale-110 transition-transform">
              📱
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                आपके शहर का डेडिकेटेड ऐप पैनल
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                आपके शहर का एक्सक्लूसिव फ्रैंचाइज़ी कंट्रोल रूम। आपके शहर के सभी कस्टमर ऑर्डर्स, लोकल गिग व साथी वर्कर्स की लिस्टिंग, टास्क असाइनमेंट और 70% कमाई का रियल-टाइम डिजिटल वॉलेट।
              </p>
            </div>
            <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% सिटी-वाइज़ फ़िल्टर्ड डेटा</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/50 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                रीवा हेड ऑफिस में 3 स्टाफ ट्रेनिंग
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>(1 Girl + 2 Boys सिस्टम):</strong> 1 लड़की को कस्टमर सपोर्ट, कॉल हैंडलिंग और सॉफ्टवेयर ऑपरेटिंग ट्रेनिंग; 2 लड़कों को फील्ड वेरिफिकेशन, पुलिस वेरिफिकेशन व कारीगर मोबिलाइजेशन ट्रेनिंग।
              </p>
            </div>
            <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>प्रमाणित सोवरेन सर्टिफिकेशन</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/50 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                9 साथी + 35+ गिग सेवाएं सेटअप
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                बुजुर्ग साथी, अस्पताल साथी, बैंक सहायक, टूरिस्ट गाइड, पर्सनल डिलीवरी से लेकर इलेक्ट्रीशियन, प्लंबर, कारपेंटर, एसी रिपेयर, होम ट्यूटर, ब्यूटीशियन तक सब कुछ पहले दिन से एक्टिव।
              </p>
            </div>
            <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>रेवेन्यू-रेडी कैटलॉग 24x7</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EARNING MODEL & ROYALTY BREAKDOWN */}
      <div className="rounded-3xl bg-[#061224] border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-black border border-[#D4AF37]/50 font-mono">
              TRANSPARENT REVENUE MODEL
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white mt-1">
              कमाई का गणित (70% : 30% रेवेन्यू शेयरिंग)
            </h3>
            <p className="text-xs text-slate-300">
              हर बुकिंग पर पारदर्शी कमीशन। कोई छिपा हुआ चार्ज नहीं, कोई मनमानी कटौती नहीं।
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
            100% ऑटो-स्प्लिट डिजिटल वॉलेट
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#0A1931] border border-[#D4AF37]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">फ्रैंचाइज़ी ओनर (आप)</span>
              <span className="text-2xl font-black text-[#D4AF37]">70%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              आपके शहर की हर एक बुकिंग, हर गिग टास्क और हर साथी सेवा के प्लेटफॉर्म कमीशन का <strong>70% सीधा आपके बैंक खाते/वॉलेट</strong> में जाएगा।
            </p>
            <div className="text-[11px] text-amber-300/90 font-mono bg-black/40 p-2.5 rounded-lg border border-slate-700">
              उदा. ₹200 कमीशन में से <strong>₹140</strong> सीधा आपका शुद्ध मुनाफ़ा।
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A1931] border border-blue-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">हेड ऑफिस रीवा (म.प्र.)</span>
              <span className="text-2xl font-black text-blue-400">30%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              क्लाउड सर्वर इंफ्रास्ट्रक्चर, AI मैचिंग एल्गोरिदम, नेशनल ब्रांडिंग, पुलिस वेरिफिकेशन एपीआई और 24x7 सेंट्रल टेक्निकल सपोर्ट के लिए।
            </p>
            <div className="text-[11px] text-blue-300/90 font-mono bg-black/40 p-2.5 rounded-lg border border-slate-700">
              उदा. ₹200 कमीशन में से <strong>₹60</strong> रीवा हेड ऑफिस रॉयल्टी।
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0A1931] border border-purple-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">मासिक ब्रांड शुल्क</span>
              <span className="text-2xl font-black text-purple-400">₹3,000</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              सॉफ्टवेयर डेटाबेस बैकअप, एंड्रॉइड ऐप अपडेट्स, न्यू फीचर्स रोलआउट और सेंट्रल हेल्पलाइन संचालन के लिए नाममात्र का मासिक शुल्क।
            </p>
            <div className="text-[11px] text-purple-300/90 font-mono bg-black/40 p-2.5 rounded-lg border border-slate-700">
              हर महीने की 1 तारीख को वॉलेट से ऑटो इनवॉइस जनरेट होता है।
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE ROI CALCULATOR */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A1931] via-[#061224] to-[#040C1A] border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-xl border border-[#D4AF37]/50">
            <Calculator className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              इंटरएक्टिव ROI कैलकुलेटर — जानें अपनी मासिक संभावित कमाई
            </h3>
            <p className="text-xs text-[#D4AF37] font-semibold">
              अपने शहर की आबादी और बुकिंग अनुमान के अनुसार स्लाइडर हिलाकर देखें
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6 bg-[#040D1C] p-5 sm:p-6 rounded-2xl border border-slate-700">
            {/* Slider 1: Daily Bookings */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">प्रतिदिन कुल बुकिंग (आपके शहर में):</span>
                <span className="text-base font-black text-[#D4AF37] font-mono bg-black/50 px-3 py-1 rounded-lg border border-[#D4AF37]/40">
                  {dailyBookings} बुकिंग्स / दिन
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dailyBookings}
                onChange={(e) => setDailyBookings(Number(e.target.value))}
                className="w-full accent-[#D4AF37] h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 बुकिंग/दिन (शुरुआती)</span>
                <span>20 (औसत शहर)</span>
                <span>50 (बड़ा शहर)</span>
                <span>100+ (मेट्रो)</span>
              </div>
            </div>

            {/* Slider 2: Average Profit */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">औसत शुद्ध मुनाफ़ा प्रति बुकिंग (70% शेयर):</span>
                <span className="text-base font-black text-emerald-400 font-mono bg-black/50 px-3 py-1 rounded-lg border border-emerald-500/40">
                  ₹{avgProfitPerBooking} / बुकिंग
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="25"
                value={avgProfitPerBooking}
                onChange={(e) => setAvgProfitPerBooking(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹50 (छोटा काम)</span>
                <span>₹150 (मानक कार्य)</span>
                <span>₹250 (अस्पताल साथी/AC)</span>
                <span>₹400 (फुल डे)</span>
              </div>
            </div>

            {/* Benchmark Note */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
              📌 <strong>स्टैंडर्ड बेंचमार्क उदाहरण:</strong> यदि आपके शहर में सिर्फ <strong>20 बुकिंग्स प्रतिदिन</strong> होती हैं और औसत मुनाफ़ा ₹150 प्रति बुकिंग है, तो ग्रॉस कमाई होती है <strong>₹90,000/माह</strong>!
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#06142B] to-[#040C1A] p-6 rounded-2xl border-2 border-[#D4AF37] text-center space-y-4 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              आपकी शुद्ध अनुमानित मासिक कमाई (Net In-Hand)
            </span>

            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-300 to-white font-mono">
              ₹{monthlyNetProfit.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 block font-sans font-normal mt-1">/ महीना (₹{dailyGross.toLocaleString('en-IN')}/दिन)</span>
            </div>

            <div className="space-y-2 text-xs text-left bg-black/60 p-4 rounded-xl border border-slate-800 font-mono">
              <div className="flex justify-between text-slate-300">
                <span>मासिक कुल ग्रॉस (30 दिन):</span>
                <span className="text-white font-bold">₹{monthlyGross.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>मासिक ब्रांड शुल्क (Fixed):</span>
                <span>- ₹{monthlyBrandFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 pt-1.5 border-t border-slate-700 font-bold">
                <span>शुद्ध मासिक बचत:</span>
                <span>₹{monthlyNetProfit.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/50">
                ⚡ ₹75,000 की पूंजी मात्र {daysToRecoverInvestment} दिनों में वापस!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. OUR PRESENCE - PAN INDIA (10 CITIES LOGOS & SHOWCASE) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black border border-blue-500/40 uppercase tracking-wider font-mono">
            EXPANDING ACROSS BHARAT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            Our Presence — Pan India (10 प्रमुख शहर)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            रीवा हेड ऑफिस से लेकर प्रमुख मेट्रो व जोनल सेंटर्स तक जिटोम्नी नेटवर्क का विस्तार।
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {PAN_INDIA_CITIES_PRESENCE.map((cityItem) => (
            <div
              key={cityItem.id}
              className={`p-4 rounded-2xl transition-all border space-y-2 group relative overflow-hidden ${
                cityItem.type === 'head_office'
                  ? 'bg-gradient-to-b from-[#0A1931] to-[#040C1A] border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-105'
                  : 'bg-[#0A1931]/80 hover:bg-[#0E2242] border-slate-700/60 hover:border-[#D4AF37]/60'
              }`}
            >
              {cityItem.type === 'head_office' && (
                <div className="absolute top-0 right-0 bg-[#D4AF37] text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                  HQ
                </div>
              )}

              <div className="text-3xl">{cityItem.icon}</div>

              <div>
                <h4 className="text-sm font-black text-white group-hover:text-[#D4AF37] transition-colors">
                  {cityItem.name}
                </h4>
                <div className="text-[10px] text-slate-400 font-semibold">{cityItem.state}</div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 text-[10px] space-y-0.5">
                <div className="flex justify-between text-slate-300 font-mono">
                  <span>वर्कर्स:</span>
                  <strong className="text-emerald-400">{cityItem.activeWorkers}+</strong>
                </div>
                <div className="flex justify-between text-slate-300 font-mono">
                  <span>बुकिंग्स/माह:</span>
                  <strong className="text-[#D4AF37]">{cityItem.monthlyBookings}+</strong>
                </div>
              </div>

              <div className="text-[9px] text-center font-bold px-1.5 py-0.5 rounded bg-black/40 text-slate-300 border border-slate-700">
                {cityItem.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. APPLY NOW FORM: APPLY FOR YOUR CITY */}
      <div id="apply-form" className="rounded-3xl bg-[#061224] border-2 border-[#D4AF37] p-6 sm:p-10 space-y-8 shadow-2xl relative">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
            OFFICIAL FRANCHISE APPLICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            अपने शहर की फ्रैंचाइज़ी के लिए आवेदन करें
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            कृपया सही जानकारी भरें। आवेदन सबमिट होते ही यह सीधे रीवा हेड ऑफिस (सुपर एडमिन) के पास अनुमोदन के लिए दर्ज हो जाएगा।
          </p>
        </div>

        {formSubmitted ? (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto border border-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">आवेदन सफलतापूर्वक दर्ज हो गया!</h3>
            <p className="text-sm text-emerald-200">
              धन्यवाद <strong>{applicantName}</strong>! आपके शहर <strong>{city}</strong> के लिए फ्रैंचाइज़ी एप्लीकेशन ID: <strong className="font-mono text-white bg-black/50 px-2 py-0.5 rounded">{submittedAppId}</strong> रीवा हेड ऑफिस में प्राप्त हो चुकी है।
            </p>
            <div className="text-xs text-slate-300 bg-black/40 p-4 rounded-xl border border-emerald-500/30 text-left space-y-1">
              <div>📞 <strong>अगला कदम:</strong> रीवा हेड ऑफिस की टीम (9399608239) अगले 24 घंटे में आपके मोबाइल पर संपर्क करेगी।</div>
              <div>📜 <strong>ट्रेनिंग स्लॉट:</strong> आपके 1 लड़की + 2 लड़कों के स्टाफ की रीवा में 3 दिवसीय ट्रेनिंग का शेड्यूल तय किया जाएगा।</div>
            </div>
            <button
              type="button"
              onClick={() => setFormSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:brightness-110"
            >
              नया आवेदन करें
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="max-w-3xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  आपका पूरा नाम (Full Name) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  10 अंकों का मोबाइल नंबर <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="उदा. 9826012345"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  जिस शहर के लिए फ्रैंचाइज़ी चाहते हैं (City) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सतना / कटनी / सिंगरौली / प्रयागराज"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  राज्य (State)
                </label>
                <input
                  type="text"
                  placeholder="उदा. मध्य प्रदेश / उत्तर प्रदेश / बिहार"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  ईमेल पता (Email ID)
                </label>
                <input
                  type="email"
                  placeholder="उदा. rahul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  क्या आप ₹75,000 फ्रैंचाइज़ी फीस के लिए तैयार हैं? <span className="text-red-400">*</span>
                </label>
                <select
                  value={investmentReady}
                  onChange={(e) => setInvestmentReady(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
                >
                  <option value="yes">हाँ, ₹75,000 राशि तुरंत तैयार है (Immediate Ready)</option>
                  <option value="need_support">हाँ, 7-10 दिनों में तैयार हो जाएगी</option>
                  <option value="no">लोन / EMI सहायता की आवश्यकता है</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">
                आप जिटोम्नी फ्रैंचाइज़ी क्यों लेना चाहते हैं? (Why you want franchise)
              </label>
              <textarea
                rows={3}
                placeholder="अपने शहर में आपकी क्या योजना है? क्या आपके पास कोई दुकान/ऑफिस या पूर्व व्यावसायिक अनुभव है?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#040D1C] border border-slate-700 focus:border-[#D4AF37] focus:outline-none text-white text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-black text-base hover:brightness-110 shadow-xl shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>आवेदन सबमिट करें (Submit to Rewa Head Office)</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 7. REWA HEAD OFFICE SUPPORT STRIP */}
      <div className="p-6 rounded-2xl bg-[#040C1A] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🏛️</div>
          <div>
            <div className="text-sm font-black text-white">सेंट्रल हेड ऑफिस — रीवा (मध्य प्रदेश)</div>
            <div className="text-xs text-slate-400">
              Jitomni Sovereign Bhavan, Civil Lines, Rewa (M.P.) • डायरेक्टर: मनीष विश्वकर्मा
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:9399608239"
            className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 hover:bg-emerald-900"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>हेल्पलाइन: 9399608239</span>
          </a>
        </div>
      </div>
    </div>
  );
};
