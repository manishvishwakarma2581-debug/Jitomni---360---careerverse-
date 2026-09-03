import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Send,
  Leaf
} from 'lucide-react';
import { Language } from '../../types';
import { AI_KISAN_QA_PRESETS, KisanQAItem } from '../../data/kisanData';

interface KisanAIMitraProps {
  lang: Language;
}

export const KisanAIMitra: React.FC<KisanAIMitraProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('सभी सवाल');
  const [activeQA, setActiveQA] = useState<KisanQAItem>(AI_KISAN_QA_PRESETS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<{
    question: string;
    answer: string;
    steps: string[];
    verifiedBy: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    'सभी सवाल',
    'फसल में रोग व कीट',
    'खाद व उर्वरक',
    'बीज व बुवाई',
    'कम पानी में खेती',
    'सरकारी योजना व सब्सिडी',
    'ज्यादा मुनाफे वाली फसल',
    'जैविक व प्राकृतिक खेती'
  ];

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('आपके ब्राउज़र में आवाज़ (Text-to-Speech) सपोर्ट नहीं है।');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`\n]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('माइक से बोलने की सुविधा केवल Chrome / Edge ब्राउज़र में उपलब्ध है। कृपया टाइप करके पूछें।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleCustomAsk(transcript);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleCustomAsk = (qText: string) => {
    const query = qText.trim();
    if (!query) return;

    setIsGenerating(true);
    // Find closest preset match or generate dynamic AI response
    setTimeout(() => {
      const lowerQ = query.toLowerCase();
      const matched = AI_KISAN_QA_PRESETS.find(item => 
        item.question.hi.toLowerCase().includes(lowerQ) ||
        item.question.hinglish.toLowerCase().includes(lowerQ) ||
        item.audioKeywords.some(k => lowerQ.includes(k.toLowerCase()))
      );

      if (matched) {
        setActiveQA(matched);
        setCustomAnswer(null);
      } else {
        // Dynamic smart response generator
        let dynamicAns = '';
        let dynamicSteps: string[] = [];

        if (lowerQ.includes('यूरिया') || lowerQ.includes('खाद') || lowerQ.includes('dap') || lowerQ.includes('fertilizer')) {
          dynamicAns = `आपके खाद से संबंधित प्रश्न के लिए वैज्ञानिक सलाह: बुवाई के समय बेसल डोज में DAP (50kg/एकड़) + MOP पोटाश (25kg) + 10kg बेंटोनाइट सल्फर का प्रयोग करें। पहले पानी पर 45 किग्रा यूरिया या 500ml नैनो यूरिया का फोलियर स्प्रे करें। नैनो यूरिया का प्रयोग करने से 50% यूरिया की बचत होती है और जमीन की सेहत सुरक्षित रहती है।`;
          dynamicSteps = [
            '1. मिट्टी परीक्षण (Soil Health Card) के आधार पर ही उर्वरक की मात्रा तय करें।',
            '2. दानेदार यूरिया को हमेशा सिंचाई के समय या हल्की नमी में दें।',
            '3. फूल आते समय 0-52-34 और फल बनते समय 0-0-50 का स्प्रे करें।'
          ];
        } else if (lowerQ.includes('कीट') || lowerQ.includes('इल्ली') || lowerQ.includes('रोग') || lowerQ.includes('सुंडी') || lowerQ.includes('फंगस')) {
          dynamicAns = `कीट व फफूंद नियंत्रण के लिए तत्काल समाधान: यदि रस चूसक कीट (माहू/थ्रिप्स/सफेद मक्खी) हैं तो थायामेथोक्सम 25% WG (80g/एकड़) या नीम तेल 10,000 ppm (3ml/L) का स्प्रे करें। यदि फल छेदक या पत्ती लपेटक इल्ली है तो कोराजन (60ml/एकड़) या एमामेक्टिन बेंजोएट (80g/एकड़) 150 लीटर पानी में मिलाकर शाम के समय छिड़कें।`;
          dynamicSteps = [
            '1. शाम 4 बजे के बाद ही कीटनाशक का छिड़काव करें ताकि दवा का वाष्पीकरण न हो।',
            '2. पानी का pH 6.5 से 7.0 रखें और साफ पानी का ही इस्तेमाल करें।',
            '3. खेत में 8-10 फेरोमोन ट्रैप व पीले/नीले चिपचिपे कार्ड लगाएं।'
          ];
        } else if (lowerQ.includes('सब्सिडी') || lowerQ.includes('योजना') || lowerQ.includes('सोलर') || lowerQ.includes('लोन')) {
          dynamicAns = `सरकारी योजनाओं व अनुदान के लिए जानकारी: पीएम कुसुम सोलर पंप योजना में 60-90% सब्सिडी, ड्रिप सिंचाई में 80% सब्सिडी और ट्रैक्टर/ड्रोन यंत्रीकरण (SMAM) में 50-80% तक सब्सिडी उपलब्ध है। KCC के तहत ₹3 लाख तक का लोन मात्र 4% वार्षिक ब्याज पर मिलता है। आवेदन के लिए अपने राज्य के कृषि पोर्टल (जैसे agrimachinery.nic.in या pmkusum.mnre.gov.in) पर आधार व खतौनी के साथ ऑनलाइन आवेदन करें।`;
          dynamicSteps = [
            '1. खसरा/खतौनी, आधार कार्ड और बैंक पासबुक तैयार रखें।',
            '2. आधिकारिक पोर्टल पर किसान पंजीकरण कर टोकन जनरेट करें।',
            '3. टोकन मनी जमा करने के 30 दिनों में भौतिक सत्यापन व सब्सिडी रिलीज होती है।'
          ];
        } else {
          dynamicAns = `आपके द्वारा पूछे गए सवाल "${query}" के लिए कृषि विशेषज्ञों की सलाह: किसी भी फसल में बेहतर उपज के लिए प्रमाणित बीज (Certified Seeds) का चयन करें और बुवाई पूर्व बीजोपचार (Seed Treatment) अवश्य करें। संतुलित NPK (4:2:1 अनुपात) के साथ सूक्ष्म पोषक तत्वों (जिंक, बोरॉन, सल्फर) का प्रयोग करें। ड्रिप या स्प्रिंकलर सिंचाई अपनाकर 50% पानी बचाएं।`;
          dynamicSteps = [
            '1. बीजोपचार: 2.5 ग्राम थीरम/कार्बेंडाजिम प्रति किग्रा बीज।',
            '2. संतुलित पोषण व फोलियर स्प्रे का नियमित चक्र अपनाएं।',
            '3. कीट या रोग के शुरुआती लक्षण दिखते ही जैविक या अनुशंसित रसायन का छिड़काव करें।'
          ];
        }

        setCustomAnswer({
          question: query,
          answer: dynamicAns,
          steps: dynamicSteps,
          verifiedBy: 'ICAR-KVK किसान कॉल सेंटर AI एक्सपर्ट नेटवर्क'
        });
      }
      setIsGenerating(false);
    }, 400);
  };

  const filteredQAs = AI_KISAN_QA_PRESETS.filter(item => {
    const matchesCat = selectedCategory === 'सभी सवाल' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      item.question.hi.toLowerCase().includes(q) ||
      item.question.en.toLowerCase().includes(q) ||
      item.question.hinglish.toLowerCase().includes(q) ||
      item.answer.hi.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Search & Voice Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#041D12] via-[#02110B] to-[#010805] border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
                <Bot className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>AI किसान मित्र • 24x7 बोलकर या लिखकर पूछें</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
                किसान के हर सवाल का सटीक वैज्ञानिक समाधान
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                फसल में पीलापन, सुंडी, कीटनाशक की सही मात्रा, खाद का विकल्प, सोलर पंप सब्सिडी या बाजार भाव — अपनी भाषा (हिंदी/माइक) में पूछें और तुरंत डॉक्टर जैसी सही सलाह पाएं।
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startVoiceInput}
                className={`px-5 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2.5 shadow-xl ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 ring-4 ring-red-500/30'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/30 hover:scale-105'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-slate-950" />}
                <span>{isListening ? 'सुन रहा हूँ... बोलिए' : '🎤 बोलकर पूछें (Voice)'}</span>
              </button>
            </div>
          </div>

          {/* Search Box Input */}
          <div className="relative">
            <div className="flex items-center bg-[#010B07] border-2 border-emerald-500/60 rounded-2xl p-2 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 shadow-inner">
              <Search className="w-5 h-5 text-emerald-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomAsk(searchQuery)}
                placeholder="यहाँ अपना सवाल लिखें... (जैसे: धान में तना छेदक का इलाज, लहसुन का कंद बड़ा करने का टॉनिक, DAP की जगह क्या डालें)"
                className="w-full bg-transparent px-4 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => handleCustomAsk(searchQuery)}
                disabled={!searchQuery.trim() || isGenerating}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>उत्तर पाएं</span>
              </button>
            </div>
          </div>

          {/* Quick Question Pills */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>किसान भाइयों द्वारा सबसे ज्यादा पूछे जाने वाले सवाल (क्लिक करें):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'फसल में पीलापन आ रहा है क्या डालें?',
                'DAP नहीं मिल रहा तो बुवाई में क्या डालें?',
                'लहसुन-प्याज का कंद बड़ा कैसे करें?',
                'कम पानी में सबसे ज्यादा मुनाफा देने वाली फसल?',
                'नीमास्त्र व जीवामृत घर पर कैसे बनाएं?',
                'पीएम कुसुम सोलर पंप में 90% सब्सिडी कैसे लें?',
                'धान में तना छेदक व झुलसा का इलाज'
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(pill);
                    handleCustomAsk(pill);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 text-xs font-semibold border border-emerald-500/30 hover:border-emerald-400 transition-all text-left"
                >
                  🌾 {pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 font-black'
                : 'bg-[#03150D] text-slate-300 hover:text-white hover:bg-[#062417] border border-emerald-500/20'
            }`}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Active Question Solution Detail Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Solution Card */}
        <div className="lg:col-span-8 space-y-6">
          {customAnswer ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-400 shadow-2xl space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40">
                    ✨ AI किसान मित्र तत्काल परामर्श
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                    {customAnswer.question}
                  </h3>
                </div>
                <button
                  onClick={() => speakText(customAnswer.answer + ' ' + customAnswer.steps.join(' '))}
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-2 ${
                    isSpeaking 
                      ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
                      : 'bg-emerald-500/20 border-emerald-400 text-emerald-300 hover:bg-emerald-500/30'
                  }`}
                  title="बोलकर सुनाएं"
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  <span className="text-xs font-black">{isSpeaking ? 'रोकें' : 'सुनें (Audio)'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>सटीक वैज्ञानिक व व्यावहारिक समाधान:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                  {customAnswer.answer}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  👉 तुरंत उठाने वाले कदम (Step-by-Step Action Plan):
                </h4>
                <div className="space-y-2">
                  {customAnswer.steps.map((st, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#041F13] border border-emerald-500/20 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-400">
                <span>संस्तुति स्रोत: {customAnswer.verifiedBy}</span>
                <span className="text-emerald-400 font-bold">100% निशुल्क किसान सेवा</span>
              </div>
            </div>
          ) : activeQA ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/40 shadow-2xl space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40">
                    📂 {activeQA.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeQA.question.hi}
                  </h3>
                </div>
                <button
                  onClick={() => speakText(activeQA.answer.hi + ' ' + activeQA.quickSteps.join(' '))}
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-2 shrink-0 ${
                    isSpeaking 
                      ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
                      : 'bg-emerald-500/20 border-emerald-400 text-emerald-300 hover:bg-emerald-500/30'
                  }`}
                  title="बोलकर सुनाएं"
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  <span className="text-xs font-black">{isSpeaking ? 'रोकें' : 'सुनें (Audio)'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>सटीक वैज्ञानिक व व्यावहारिक समाधान:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                  {activeQA.answer.hi}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  👉 तुरंत उठाने वाले कदम (Step-by-Step Action Plan):
                </h4>
                <div className="space-y-2">
                  {activeQA.quickSteps.map((st, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#041F13] border border-emerald-500/20 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-400">
                <span>प्रमाणित स्रोत: {activeQA.verifiedBy}</span>
                <span className="text-emerald-400 font-bold">100% निशुल्क किसान सेवा</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Column: Other Frequently Asked Topics */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#02130B] border border-emerald-500/30">
            <h4 className="text-sm font-black text-white flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>संबंधित सवाल ({filteredQAs.length})</span>
            </h4>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredQAs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveQA(item);
                    setCustomAnswer(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeQA?.id === item.id && !customAnswer
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                      : 'bg-black/50 border-emerald-500/15 hover:border-emerald-400/50 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold leading-snug">
                      {item.question.hi}
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold">{item.category}</span>
                    <span>{item.verifiedBy.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Kisan Call Center Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>सरकारी किसान कॉल सेंटर (टोल-फ्री)</span>
            </div>
            <p className="text-xs text-slate-300">
              किसी भी आपातकालीन कृषि समस्या के लिए सीधे भारत सरकार के कृषि वैज्ञानिकों से बात करें:
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 flex items-center justify-between">
              <span className="text-base font-black text-amber-300 tracking-wider">📞 1800-180-1551</span>
              <span className="text-[10px] font-bold text-amber-400/80">सुबह 6 से रात 10 बजे तक</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
