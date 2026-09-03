import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  Sparkles, 
  Award, 
  ArrowUpRight, 
  ShieldCheck, 
  BarChart3, 
  Layers,
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../../types';
import { KISAN_CROPS_GUIDE } from '../../data/kisanData';

interface KisanMarketDemandProps {
  lang: Language;
}

export const KisanMarketDemand: React.FC<KisanMarketDemandProps> = ({ lang }) => {
  const [calcCrop, setCalcCrop] = useState<string>(KISAN_CROPS_GUIDE[2].id); // Garlic default
  const [calcAcreage, setCalcAcreage] = useState<number>(2);
  const [customCostPerAcre, setCustomCostPerAcre] = useState<number>(35000);
  const [customYieldQuintal, setCustomYieldQuintal] = useState<number>(45);
  const [customRatePerQuintal, setCustomRatePerQuintal] = useState<number>(12000);

  const selectedCropObj = KISAN_CROPS_GUIDE.find(c => c.id === calcCrop) || KISAN_CROPS_GUIDE[0];

  const handleCropChange = (cropId: string) => {
    setCalcCrop(cropId);
    const c = KISAN_CROPS_GUIDE.find(item => item.id === cropId);
    if (c) {
      setCustomCostPerAcre(c.costPerAcre);
      if (cropId === 'crop-garlic') {
        setCustomYieldQuintal(45);
        setCustomRatePerQuintal(12000);
      } else if (cropId === 'crop-wheat') {
        setCustomYieldQuintal(24);
        setCustomRatePerQuintal(2400);
      } else if (cropId === 'crop-paddy') {
        setCustomYieldQuintal(28);
        setCustomRatePerQuintal(2600);
      } else if (cropId === 'crop-mustard') {
        setCustomYieldQuintal(12);
        setCustomRatePerQuintal(6000);
      } else if (cropId === 'crop-sugarcane') {
        setCustomYieldQuintal(550);
        setCustomRatePerQuintal(380);
      } else if (cropId === 'crop-dragonfruit') {
        setCustomYieldQuintal(80);
        setCustomRatePerQuintal(15000);
      } else if (cropId === 'crop-tomato') {
        setCustomYieldQuintal(300);
        setCustomRatePerQuintal(1800);
      } else if (cropId === 'crop-moringa') {
        setCustomYieldQuintal(220);
        setCustomRatePerQuintal(3500);
      }
    }
  };

  const totalCost = customCostPerAcre * calcAcreage;
  const totalRevenue = customYieldQuintal * customRatePerQuintal * calcAcreage;
  const netProfit = totalRevenue - totalCost;
  const roiPercentage = totalCost > 0 ? Math.round((netProfit / totalCost) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C11] via-[#02130B] to-[#000000] border-2 border-emerald-500/50 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>मार्केट डिमांड व हाई-प्रॉफिट फसल अर्थशास्त्र</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
          किन फसलों में है सबसे ज्यादा मांग और 3 गुना कमाई?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          परंपरागत खेती से आगे बढ़कर हाई-डिमांड व एक्सपोर्ट क्वालिटी नकदी फसलें (लहसुन रियावन, ड्रैगन फ्रूट, सहजन मोरिंगा, हाइब्रिड टमाटर, सरसों) लगाएं और प्रति एकड़ ₹3 लाख से ₹10 लाख तक शुद्ध मुनाफा कमाएं।
        </p>
      </div>

      {/* Live Market Demand Matrix Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>2026 हाई-डिमांड व लखपति फसलें (Demand Index)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-bold">बाजार मांग स्कोर आधारित</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KISAN_CROPS_GUIDE.map((crop) => (
            <div
              key={crop.id}
              onClick={() => handleCropChange(crop.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                calcCrop === crop.id
                  ? 'bg-gradient-to-br from-emerald-950/90 to-[#02130B] border-emerald-400 shadow-xl ring-2 ring-emerald-400/30'
                  : 'bg-[#02110A] border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#031A10]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{crop.icon}</span>
                  <div>
                    <h4 className="text-base font-black text-white">{crop.name.hi}</h4>
                    <p className="text-xs text-slate-400">{crop.season}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/30">
                  {crop.demandScore}/10
                </span>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-black/50 border border-emerald-500/15 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">मांग स्थिति:</span>
                  <span className="text-amber-300 font-bold">{crop.demandTrend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">शुद्ध मुनाफा / एकड़:</span>
                  <span className="text-emerald-300 font-black">{crop.netProfitPerAcre}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCropChange(crop.id);
                }}
                className="mt-3 w-full py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/30 transition-all flex items-center justify-center gap-1"
              >
                <span>मुनाफा कैलकुलेट करें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Crop ROI & Profit Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl sm:text-2xl font-black text-white">
                किसान मुनाफा व लागत कैलकुलेटर (ROI Calculator)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              अपनी जमीन (एकड़), लागत और अनुमानित बाजार भाव डालकर सटीक शुद्ध लाभ देखें।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">चयनित फसल:</span>
            <select
              value={calcCrop}
              onChange={(e) => handleCropChange(e.target.value)}
              className="bg-[#010D08] border border-emerald-400 rounded-xl px-3 py-2 text-xs font-bold text-emerald-300 focus:outline-none"
            >
              {KISAN_CROPS_GUIDE.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#010D08] text-white">
                  {c.icon} {c.name.hi}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Acreage Input */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              1. खेती का रकबा (एकड़ में):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={20}
                value={calcAcreage}
                onChange={(e) => setCalcAcreage(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <span className="text-lg font-black text-emerald-400 w-12 text-right">
                {calcAcreage} एकड़
              </span>
            </div>
          </div>

          {/* Cost Per Acre */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              2. प्रति एकड़ कुल लागत (खाद/बीज/मजदूरी):
            </label>
            <div className="relative">
              <input
                type="number"
                value={customCostPerAcre}
                onChange={(e) => setCustomCostPerAcre(Number(e.target.value))}
                className="w-full bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">₹/एकड़</span>
            </div>
          </div>

          {/* Expected Yield */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              3. अनुमानित उत्पादन प्रति एकड़:
            </label>
            <div className="relative">
              <input
                type="number"
                value={customYieldQuintal}
                onChange={(e) => setCustomYieldQuintal(Number(e.target.value))}
                className="w-full bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">क्विंटल</span>
            </div>
          </div>

          {/* Market Selling Price */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              4. संभावित बाजार भाव / क्विंटल:
            </label>
            <div className="relative">
              <input
                type="number"
                value={customRatePerQuintal}
                onChange={(e) => setCustomRatePerQuintal(Number(e.target.value))}
                className="w-full bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">₹/क्विंटल</span>
            </div>
          </div>
        </div>

        {/* Results Banner Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#032014] to-[#010D08] border-2 border-emerald-400">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-slate-400 block font-bold">कुल लागत ({calcAcreage} एकड़)</span>
            <span className="text-xl sm:text-2xl font-black text-red-400">₹{totalCost.toLocaleString()}</span>
          </div>

          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-slate-400 block font-bold">कुल सकल आय (Gross Revenue)</span>
            <span className="text-xl sm:text-2xl font-black text-cyan-300">₹{totalRevenue.toLocaleString()}</span>
          </div>

          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-emerald-300 block font-bold">शुद्ध मुनाफा (Net Profit)</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">₹{netProfit.toLocaleString()}</span>
          </div>

          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-amber-300 block font-bold">रिटर्न ऑन इनवेस्टमेंट (ROI)</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">+{roiPercentage}%</span>
          </div>
        </div>

        {/* Smart Selling Recommendation */}
        <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>विशेषज्ञ मार्केटिंग व एफपीओ (FPO) सलाह:</span>
          </div>
          <p className="leading-relaxed">
            {selectedCropObj.marketSellingTip.hi}
          </p>
        </div>
      </div>
    </div>
  );
};
