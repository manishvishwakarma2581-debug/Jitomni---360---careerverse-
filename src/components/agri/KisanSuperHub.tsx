import React from 'react';
import { 
  Sprout, 
  Bot, 
  Building2, 
  TrendingUp, 
  CloudRain, 
  Tractor, 
  FlaskConical, 
  Bug, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  PhoneCall,
  Calendar,
  Layers,
  Award,
  Globe2,
  BookOpen
} from 'lucide-react';
import { Language, AgriTabSection } from '../../types';
import { KISAN_CROPS_GUIDE, KISAN_GOVT_SCHEMES_LIST, AI_KISAN_QA_PRESETS, KISAN_WEATHER_ADVISORIES } from '../../data/kisanData';

interface KisanSuperHubProps {
  lang: Language;
  onNavigateSection: (section: AgriTabSection) => void;
}

export const KisanSuperHub: React.FC<KisanSuperHubProps> = ({ lang, onNavigateSection }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Mega Hero Portal Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#021C11] via-[#01140C] to-[#000000] border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/40">
                <Sprout className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>किसान संपूर्ण समाधान एवं उन्नति केंद्र • 100% निशुल्क सेवा</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white font-heading tracking-tight">
                अन्नदाता का संपूर्ण मार्गदर्शक
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
                एक किसान की सभी जरूरतों की पूर्ति एक ही स्थान पर: <strong>फसल उगाने का सही तरीका</strong>, <strong>मार्केट डिमांड व लखपति फसलें</strong>, <strong>AI किसान मित्र (बोलकर सवाल पूछें)</strong>, <strong>60-90% सरकारी सब्सिडी</strong> एवं <strong>लाइव मौसम व मंडी भाव</strong>।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onNavigateSection('ai_kisan_mitra')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5 text-slate-950" />
                <span>🎤 AI किसान मित्र से पूछें</span>
              </button>

              <button
                onClick={() => onNavigateSection('crop_calendar_guide')}
                className="px-6 py-3.5 rounded-2xl bg-[#031D12] hover:bg-[#062B1C] text-emerald-300 font-bold text-sm border border-emerald-400/40 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>🌾 वैज्ञानिक फसल कैलेंडर</span>
              </button>
            </div>
          </div>

          {/* Real-Time Live Ticker Bar */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <CloudRain className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>मौसम अलर्ट:</strong> उत्तर-पश्चिम भारत में वर्षा के संकेत; कपास व धान में जल निकास नालियां खुली रखें।</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>मंडी ट्रेंड:</strong> सरसों व लहसुन में जोरदार तेजी; ग्रेडिंग करके बेचने पर ₹500/क्विंटल प्रीमियम।</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><strong>सब्सिडी अलर्ट:</strong> कुसुम सोलर पंप बुकिंग पोर्टल लाइव; 90% सब्सिडी हेतु तुरंत टोकन लें।</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Functional Modules Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>किसान सेवा केंद्र (Core Farmer Modules)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Module 1: AI Kisan Mitra */}
          <div
            onClick={() => onNavigateSection('ai_kisan_mitra')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
                आवाज़ व चैट AI
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              🤖 AI किसान मित्र (Q&A)
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              फसल में पीलापन, रोग, दवा की सटीक मात्रा, खाद का विकल्प या कोई भी सवाल बोलकर या लिखकर पूछें। तुरंत डॉक्टर जैसी सलाह।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>सवाल पूछें व सुनें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Crop Selection SOP */}
          <div
            onClick={() => onNavigateSection('crop_calendar_guide')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Sprout className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                SOP गाइड
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              🌾 फसल उगाने का सही तरीका
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              धान, गेहूं, लहसुन, गन्ना, सरसों, टमाटर, ड्रैगन फ्रूट — खेत तैयारी से लेकर बीजोपचार, खाद शेड्यूल व मंडी तक पूरी नियमावली।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>वैज्ञानिक विधि देखें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Market Demand & Profits */}
          <div
            onClick={() => onNavigateSection('market_demand_profit')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px]">
                3x मुनाफा
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              📈 मार्केट डिमांड व लखपति फसलें
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              2026 में किन फसलों में है सबसे ज्यादा मांग? 1 एकड़ से ₹3-10 लाख कमाने का पूरा अर्थशास्त्र और ROI कैलकुलेटर।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>मुनाफा कैलकुलेट करें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Govt Schemes & Subsidies */}
          <div
            onClick={() => onNavigateSection('govt_schemes')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
                60-90% सब्सिडी
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              🏛️ सरकारी योजनाएं व सब्सिडी
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              कुसुम सोलर पंप, 80% ड्रिप सब्सिडी, पीएम किसान ₹6,000, ट्रैक्टर यंत्रीकरण और 4% ब्याज KCC लोन — स्टेप-बाय-स्टेप ऑनलाइन आवेदन।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>सब्सिडी गाइड खोलें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 5: Weather & Crop Alerts */}
          <div
            onClick={() => onNavigateSection('weather_advisory')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <CloudRain className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-400 text-slate-950 font-black text-[10px]">
                IMD वेदर लाइव
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              🌦️ लाइव मौसम व कृषि रक्षा सलाह
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              वर्षा, आंधी, तापमान व हवा की गति के आधार पर फसल सुरक्षा, सिंचाई शेड्यूलिंग और स्प्रे सेफ्टी इंडेक्स।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>मौसम सलाह देखें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 6: Custom Hiring & Drone Rentals */}
          <div
            onClick={() => onNavigateSection('farm_equipment')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#031E13] to-[#010D08] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl hover:scale-[1.02] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Tractor className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-400 text-slate-950 font-black text-[10px]">
                CHC सेवा
              </span>
            </div>

            <h4 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              🚜 कृषि यंत्र व AI ड्रोन बुकिंग
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              मात्र ₹350/एकड़ में 7 मिनट में ड्रोन स्प्रे, लेजर लैंड लेवलर, सुपर सीडर व कंबाइन हार्वेस्टर नजदीकी CHC से किराए पर लें।
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 pt-1">
              <span>ड्रोन व मशीन बुक करें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* High-Profit Exotic Crops Showcase Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#042416] via-[#02180F] to-black border-2 border-emerald-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              💰 लखपति किसान मॉडल
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              कम जमीन में सबसे ज्यादा कमाई देने वाली फसलें
            </h3>
          </div>
          <button
            onClick={() => onNavigateSection('market_demand_profit')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <span className="text-3xl">🧄</span>
            <h4 className="text-base font-black text-white">रियावन / G2 लहसुन</h4>
            <p className="text-xs text-slate-300">1 एकड़ में 50 क्विंटल उत्पादन, ₹12,000/क्विंटल पर ₹5 लाख+ शुद्ध मुनाफा।</p>
            <span className="text-xs font-bold text-emerald-400 block">अवधि: 140 दिन</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <span className="text-3xl">🌵</span>
            <h4 className="text-base font-black text-white">ड्रैगन फ्रूट (कमलम)</h4>
            <p className="text-xs text-slate-300">सूखे व बंजर क्षेत्र में वरदान। एक बार पौधे लगाएं, 25 साल तक ₹8-12 लाख सालाना कमाई।</p>
            <span className="text-xs font-bold text-emerald-400 block">कम पानी, भारी मुनाफा</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <span className="text-3xl">🌿</span>
            <h4 className="text-base font-black text-white">सहजन / मोरिंगा (ODC-3)</h4>
            <p className="text-xs text-slate-300">साल में 2 बार फलन + पत्ती का पाउडर। मात्र 4 सिंचाइयों में ₹3-5 लाख प्रति वर्ष।</p>
            <span className="text-xs font-bold text-emerald-400 block">सुपरफूड एक्सपोर्ट डिमांड</span>
          </div>
        </div>
      </div>

      {/* ICAR Academic & Advanced Global Tech Bar */}
      <div className="p-6 rounded-3xl bg-[#010D08] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-black text-white flex items-center justify-center sm:justify-start gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>ICAR डिग्री छात्र व एग्री-उद्यमी सेक्शन</span>
          </h4>
          <p className="text-xs text-slate-400">
            B.Sc/M.Sc ICAR 6D सिलेबस, सिंगापुर वर्टिकल फार्मिंग, चीन बेइदोऊ रोबोटिक्स व ICAR/NABARD मॉक टेस्ट।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSection('curriculum')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 transition-all"
          >
            📚 ICAR सिलेबस
          </button>
          <button
            onClick={() => onNavigateSection('global_tech')}
            className="px-4 py-2.5 rounded-xl bg-[#051C14] hover:bg-[#07291D] text-emerald-300 text-xs font-bold border border-emerald-400/40 transition-all"
          >
            🌏 ग्लोबल फार्मिंग
          </button>
        </div>
      </div>

    </div>
  );
};
