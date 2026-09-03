import React, { useState } from 'react';
import { 
  Sprout, 
  Leaf, 
  Droplets, 
  FlaskConical, 
  Bug, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Search, 
  ArrowRight, 
  Sparkles, 
  DollarSign,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../../types';
import { KISAN_CROPS_GUIDE, KisanCropGuideItem } from '../../data/kisanData';

interface KisanCropGuideProps {
  lang: Language;
}

export const KisanCropGuide: React.FC<KisanCropGuideProps> = ({ lang }) => {
  const [selectedCrop, setSelectedCrop] = useState<KisanCropGuideItem>(KISAN_CROPS_GUIDE[0]);
  const [selectedSeason, setSelectedSeason] = useState<string>('सभी मौसम');
  const [selectedCategory, setSelectedCategory] = useState<string>('सभी श्रेणियां');
  const [searchCrop, setSearchCrop] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sop' | 'fertilizer' | 'irrigation' | 'pests' | 'economics'>('sop');

  const seasons = ['सभी मौसम', 'खरीफ (Kharif)', 'रबी (Rabi)', 'जायद (Zaid)', 'सालभर (Year-Round)'];
  const categories = [
    'सभी श्रेणियां',
    'अनाज (Cereals)',
    'दलहन एवं तिलहन (Pulses/Oilseeds)',
    'नकदी फसलें (Cash Crops)',
    'सब्जियां (Vegetables)',
    'हाई-प्रॉफिट व औषधीय (High Profit & Medicinal)'
  ];

  const filteredCrops = KISAN_CROPS_GUIDE.filter(c => {
    const matchSeason = selectedSeason === 'सभी मौसम' || c.season === selectedSeason;
    const matchCat = selectedCategory === 'सभी श्रेणियां' || c.category === selectedCategory;
    const q = searchCrop.toLowerCase();
    const matchSearch = !searchCrop || 
      c.name.hi.toLowerCase().includes(q) || 
      c.name.en.toLowerCase().includes(q) ||
      c.name.hinglish.toLowerCase().includes(q);
    return matchSeason && matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C11] via-[#02130B] to-[#000000] border-2 border-emerald-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>वैज्ञानिक खेती संपूर्ण नियमावली (PACKAGE OF PRACTICES)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
              फसल उगाने का 100% सही वैज्ञानिक व व्यावहारिक तरीका
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              खेत तैयारी, उन्नत किस्में, बीजोपचार, बेसल खाद, सिंचाई के मुख्य चरण, कीट रोकथाम और कटाई से लेकर मंडी में सबसे ऊंचा भाव पाने के गुप्त टिप्स।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-center shrink-0">
            <span className="text-xs text-emerald-300 font-bold block">कुल प्रमाणित फसलें</span>
            <span className="text-3xl font-black text-white">{KISAN_CROPS_GUIDE.length}+</span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">ICAR मान्यता प्राप्त SOP</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              placeholder="फसल खोजें (जैसे: गेहूं, लहसुन, ड्रैगन फ्रूट, टमाटर)..."
              className="w-full bg-[#010D08] border border-emerald-500/40 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Season Filter */}
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-emerald-300 focus:outline-none focus:border-emerald-400 font-bold"
          >
            {seasons.map((s, i) => (
              <option key={i} value={s} className="bg-[#010D08] text-white">{s}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#010D08] border border-emerald-500/40 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-emerald-300 focus:outline-none focus:border-emerald-400 font-bold"
          >
            {categories.map((c, i) => (
              <option key={i} value={c} className="bg-[#010D08] text-white">{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Crop Selector + Crop Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Crop List Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>उपलब्ध फसलें ({filteredCrops.length})</span>
            <span className="text-emerald-400">फसल चुनें ➔</span>
          </div>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCrop.id === crop.id
                    ? 'bg-gradient-to-r from-emerald-950 via-[#042416] to-[#02130B] border-emerald-400 shadow-xl ring-2 ring-emerald-400/30'
                    : 'bg-[#02110A] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#031A10]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{crop.icon}</span>
                    <div>
                      <h4 className="text-base font-black text-white">
                        {crop.name.hi}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {crop.category} • {crop.season}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] border border-emerald-400/30">
                    ⭐ {crop.demandScore}/10
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/15 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">शुद्ध मुनाफा / एकड़:</span>
                    <span className="text-emerald-300 font-black">{crop.netProfitPerAcre}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">औसत अवधि:</span>
                    <span className="text-amber-300 font-bold">{crop.durationDays}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Comprehensive Step-by-Step SOP Dashboard */}
        <div className="lg:col-span-8 space-y-6">
          {selectedCrop && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/50 shadow-2xl space-y-6">
              
              {/* Crop Hero Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#032014] to-[#010D08] border border-emerald-500/40">
                <div className="flex items-center gap-4">
                  <span className="text-5xl p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
                    {selectedCrop.icon}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                        {selectedCrop.season}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                        {selectedCrop.demandTrend}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {selectedCrop.name.hi}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {selectedCrop.name.en} • {selectedCrop.durationDays}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1 bg-black/40 p-3 rounded-xl border border-emerald-500/20">
                  <span className="text-[11px] text-slate-400 block">अनुमानित शुद्ध मुनाफा</span>
                  <span className="text-xl font-black text-emerald-400 block">{selectedCrop.netProfitPerAcre}</span>
                  <span className="text-[10px] text-slate-400">लागत: ₹{selectedCrop.costPerAcre.toLocaleString()}/एकड़</span>
                </div>
              </div>

              {/* Sub-Navigation Tabs inside Crop Card */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-emerald-500/20 pb-3">
                {[
                  { id: 'sop', label: '🌱 खेत तैयारी व बीजोपचार', icon: '🌾' },
                  { id: 'fertilizer', label: '🧪 खाद व उर्वरक शेड्यूल', icon: '🌱' },
                  { id: 'irrigation', label: '💧 सिंचाई के मुख्य चरण', icon: '💧' },
                  { id: 'pests', label: '🐛 कीट व रोग नियंत्रण', icon: '🔬' },
                  { id: 'economics', label: '💰 लागत, मुनाफा व मंडी टिप्स', icon: '📈' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeTab === t.id
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                        : 'bg-black/50 text-slate-300 hover:text-white hover:bg-emerald-950/40 border border-emerald-500/20'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: SOP, SEEDS & SOWING */}
              {activeTab === 'sop' && (
                <div className="space-y-5 animate-in fade-in">
                  {/* Soil Requirement */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Layers className="w-4 h-4" />
                      <span>1. उपयुक्त भूमि व जलवायु (Soil & Climate):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedCrop.soilRequirement.hi}
                    </p>
                  </div>

                  {/* Best High-Yielding Varieties */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Award className="w-4 h-4" />
                      <span>2. टॉप उन्नत व सर्वाधिक उपज देने वाली किस्में (Top High-Yield Varieties):</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {selectedCrop.bestVarieties.map((variety, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#03180F] border border-emerald-500/20 text-xs font-bold text-emerald-200 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{variety}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seed Rate & Treatment */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <FlaskConical className="w-4 h-4" />
                      <span>3. बीज दर एवं बीजोपचार की सही विधि (Seed Rate & Seed Treatment):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedCrop.seedRateAndTreatment.hi}
                    </p>
                  </div>

                  {/* Sowing Technique */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Calendar className="w-4 h-4" />
                      <span>4. बुवाई का समय, विधि व दूरी (Sowing SOP):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedCrop.sowingTechnique.hi}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: FERTILIZER SCHEDULE */}
              {activeTab === 'fertilizer' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>संतुलित पोषण से उपज 30% बढ़ती है और लागत 20% घटती है। नैनो उर्वरकों का प्रयोग करें।</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Basal Dose */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                        1. बुवाई के समय बेसल डोज (Basal Dose at Sowing)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                        {selectedCrop.fertilizerSchedule.basal.hi}
                      </p>
                    </div>

                    {/* First Top Dressing */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs">
                        2. पहली टॉप ड्रेसिंग (First Top Dressing)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                        {selectedCrop.fertilizerSchedule.firstTopDressing.hi}
                      </p>
                    </div>

                    {/* Second Top Dressing */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                        3. दूसरी टॉप ड्रेसिंग (Second Top Dressing)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                        {selectedCrop.fertilizerSchedule.secondTopDressing.hi}
                      </p>
                    </div>

                    {/* Nano & Micronutrient Foliar Spray */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#032014] to-black border border-emerald-400 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-xs">
                        ✨ नैनो यूरिया व माइक्रोन्यूट्रिएंट फोलियर स्प्रे (Booster)
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-200 mt-1 leading-relaxed font-semibold">
                        {selectedCrop.fertilizerSchedule.nanoFertilizer.hi}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: IRRIGATION STAGES */}
              {activeTab === 'irrigation' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Droplets className="w-4 h-4" />
                      <span>सिंचाई के क्रांतिक चरण (Critical Irrigation Stages):</span>
                    </h4>
                    <div className="space-y-2.5 mt-2">
                      {selectedCrop.irrigationSchedule.map((irri, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#03180F] border border-emerald-500/20 flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {irri.hi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-black border border-blue-500/30 text-xs text-blue-200 space-y-1">
                    <span className="font-black text-blue-300 block">💡 ड्रिप व फव्वारा सिंचाई अपनाएं:</span>
                    <p>ड्रिप सिंचाई से 70% पानी बचता है और 80% सरकारी सब्सिडी मिलती है। उर्वरक को ड्रिप द्वारा देने से (Fertigation) खाद की 35% बचत होती है।</p>
                  </div>
                </div>
              )}

              {/* TAB 4: PESTS & DISEASES */}
              {activeTab === 'pests' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-3">
                    {selectedCrop.keyPestsAndRemedies.map((pest, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                            <Bug className="w-4 h-4 text-amber-400" />
                            <span>{pest.pestName}</span>
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                            तत्काल नियंत्रण आवश्यक
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          <strong>लक्षण (Symptoms):</strong> {pest.symptoms}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
                          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 space-y-1">
                            <span className="text-emerald-300 font-black block">🧪 रासायनिक समाधान (Chemical):</span>
                            <span className="text-slate-200">{pest.chemicalDose}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#042013] border border-emerald-400/20 space-y-1">
                            <span className="text-emerald-400 font-black block">🌿 जैविक व देसी समाधान (Organic):</span>
                            <span className="text-slate-200">{pest.organicDose}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ECONOMICS & MARKET SELLING TIPS */}
              {activeTab === 'economics' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Cost & Revenue Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-center">
                      <span className="text-[10px] text-slate-400 block">कुल लागत / एकड़</span>
                      <span className="text-base font-black text-red-400">₹{selectedCrop.costPerAcre.toLocaleString()}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-center">
                      <span className="text-[10px] text-slate-400 block">औसत उत्पादन</span>
                      <span className="text-base font-black text-amber-300">{selectedCrop.expectedYieldPerAcre}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-center">
                      <span className="text-[10px] text-slate-400 block">औसत बाजार भाव</span>
                      <span className="text-base font-black text-cyan-300">{selectedCrop.marketRateAvg}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400 text-center">
                      <span className="text-[10px] text-emerald-300 block font-bold">शुद्ध मुनाफा / एकड़</span>
                      <span className="text-base font-black text-emerald-400">{selectedCrop.netProfitPerAcre}</span>
                    </div>
                  </div>

                  {/* Harvesting & Storage */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Calendar className="w-4 h-4" />
                      <span>सही समय पर कटाई व भंडारण (Harvesting & Storage):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedCrop.harvestingAndStorage.hi}
                    </p>
                  </div>

                  {/* Market Selling Secret Tip */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-black border border-amber-500/40 space-y-2">
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5 uppercase">
                      <TrendingUp className="w-4 h-4" />
                      <span>💡 मंडी में सबसे ऊंचा भाव पाने का तरीका (Market Pro Tip):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
                      {selectedCrop.marketSellingTip.hi}
                    </p>
                  </div>

                  {/* Intercropping Multiplier */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-black border border-emerald-400/40 space-y-2">
                    <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>🌿 सह-फसली खेती से डबल मुनाफा (Intercropping Secret):</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedCrop.intercroppingTip.hi}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
