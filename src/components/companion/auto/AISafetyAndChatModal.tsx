import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  Mic, 
  Send, 
  MessageSquare, 
  Bot, 
  X, 
  MapPin, 
  FileText 
} from 'lucide-react';
import { audioAlertService } from './audioAlerts';

interface AISafetyAndChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'sos' | 'ai_check' | 'ai_chat';
  rideId?: string;
  driverRoyalId?: string;
  driverName?: string;
  locationAddress?: string;
  onConfirmSOS: (reason: string, audioRecorded: boolean) => void;
  userType: 'customer' | 'driver';
}

export const AISafetyAndChatModal: React.FC<AISafetyAndChatModalProps> = ({
  isOpen,
  onClose,
  mode,
  rideId = 'RIDE-RWA-1092',
  driverRoyalId = 'JS-RWA-0001',
  driverName = 'रमेश विश्वकर्मा',
  locationAddress = 'Rewa Bypass Road, Near Toll',
  onConfirmSOS,
  userType,
}) => {
  // SOS States
  const [countdown, setCountdown] = useState<number>(30);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDone, setRecordingDone] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('अपरिचित मार्ग / रूट डेविएशन');
  const [sosSent, setSosSent] = useState<boolean>(false);

  // AI Chat States
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `नमस्ते! मैं जिटोम्नी 360° AI रॉयल ऑटो सेफ्टी असिस्ट हूँ। आपकी यात्रा पूर्णतः एन्क्रिप्टेड व GPS ट्रैक पर है। मैं आपकी क्या सहायता कर सकता हूँ?`,
      time: 'Just now',
    },
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');

  // Start siren & countdown on SOS or AI check
  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'sos' || mode === 'ai_check') {
      audioAlertService.playSOSSiren();
      setIsRecording(true);
      const recordTimer = setTimeout(() => {
        setIsRecording(false);
        setRecordingDone(true);
      }, 5000); // 5 sec simulated audio capture

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoEscalate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(recordTimer);
      };
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleAutoEscalate = () => {
    setSosSent(true);
    onConfirmSOS('Auto-Escalated: No response to safety prompt within 30s', true);
  };

  const handleManualSOS = () => {
    setSosSent(true);
    onConfirmSOS(selectedReason, true);
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputMsg('');

    // AI smart reply logic
    setTimeout(() => {
      let reply = 'आपकी लोकेशन हमारे 24x7 सेंट्रल कंट्रोल रूम से लाइव सिंक है। कोई भी समस्या हो तो तुरंत SOS दबाएं।';
      const lower = userText.toLowerCase();
      if (lower.includes('fare') || lower.includes('किराया') || lower.includes('पैसा') || lower.includes('rate')) {
        reply = 'रॉयल ऑटो में ज़ीरो सर्ज गारंटी है। बेस किराया ₹30 (पहले 1.5 किमी) + ₹12/किमी है। ड्राइवर आपसे इससे ज्यादा नहीं मांग सकता।';
      } else if (lower.includes('lost') || lower.includes('सामान') || lower.includes('छूट गया')) {
        reply = `यदि आपका सामान ऑटो में छूट गया है, तो तुरंत ड्राइवर (${driverRoyalId}) को कॉल करें या एडमिन रूम को टिकट भेजें।`;
      } else if (lower.includes('police') || lower.includes('पुलिस') || lower.includes('emergency')) {
        reply = 'इमरजेंसी की स्थिति में लाल SOS बटन दबाएं। नजदीकी 112 डायल पुलिस वाहन और कंट्रोल रूम तुरंत हरकत में आएगा।';
      } else if (lower.includes('otp') || lower.includes('ओटीपी')) {
        reply = 'सुरक्षा के लिए, जब तक आप ऑटो में बैठ न जाएं और ड्राइवर की रॉयल आईडी का मिलान न कर लें, तब तक 4-अंकों का स्टार्ट OTP ड्राइवर को न बताएं।';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1931] border-2 border-red-500/80 shadow-2xl overflow-hidden text-white">
        {/* Header Ribbon */}
        <div className="p-4 bg-gradient-to-r from-red-950 via-red-900 to-slate-900 border-b border-red-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg animate-pulse">
              {mode === 'ai_chat' ? <Bot className="w-5 h-5 text-[#D4AF37]" /> : <ShieldAlert className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {mode === 'ai_check'
                  ? '⚠️ AI सुरक्षा चेतावनी (Are You Safe?)'
                  : mode === 'sos'
                  ? '🚨 SOS EMERGENCY DISPATCH (पुलिस 112)'
                  : '🤖 AI रॉयल ऑटो 24x7 सपोर्ट'}
              </h2>
              <p className="text-[11px] text-red-200 font-mono">
                RIDE ID: {rideId} • DRIVER: {driverRoyalId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on Mode */}
        {mode === 'ai_check' && !sosSent && (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-black border border-amber-500/40">
                AI ANOMALY DETECTED (&gt;500m ROUTE DEVIATION)
              </span>
              <h3 className="text-lg font-black text-white">
                क्या आप सुरक्षित हैं? (Are you safe?)
              </h3>
              <p className="text-xs text-slate-300">
                ऑटो अपने निर्धारित जीपीएस रूट से विचलित हुआ है या 10 मिनट से सुनसान स्थान पर रुका है। कृपया <strong>{countdown} सेकंड</strong> में पुष्टि करें।
              </p>
              <div className="text-3xl font-mono font-black text-red-400 animate-pulse">
                00:{countdown.toString().padStart(2, '0')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>हाँ, मैं सुरक्षित हूँ (I am Safe)</span>
              </button>
              <button
                type="button"
                onClick={handleManualSOS}
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/40 animate-pulse"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>खतरे में हूँ (Trigger SOS 112)</span>
              </button>
            </div>
          </div>
        )}

        {mode === 'sos' && !sosSent && (
          <div className="p-6 space-y-5">
            {/* Live Audio Record Simulation */}
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${isRecording ? 'bg-red-600 animate-ping' : 'bg-emerald-600'} flex items-center justify-center text-white`}>
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">
                    {isRecording ? 'स्वचालित 30-सेकंड ऑडियो रिकॉर्डिंग जारी...' : 'ऑडियो साक्ष्य सुरक्षित'}
                  </div>
                  <div className="text-[10px] text-slate-300">
                    सबूत के तौर पर कंट्रोल रूम में स्वतः अपलोड होगा
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-red-400">
                {isRecording ? 'LIVE REC' : 'SAVED'}
              </span>
            </div>

            {/* Reason selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                समस्या का प्रकार चुनें:
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-red-500"
              >
                <option value="अपरिचित मार्ग / रूट डेविएशन">अपरिचित मार्ग / रूट डेविएशन (Route Deviation)</option>
                <option value="चालक का अनुचित व्यवहार / झगड़ा">चालक का अनुचित व्यवहार / झगड़ा</option>
                <option value="सवारी का अनुचित व्यवहार">सवारी का अनुचित व्यवहार</option>
                <option value="वाहन दुर्घटना / खराबी">वाहन दुर्घटना / खराबी</option>
                <option value="चिकित्सा आपातकाल (Medical Emergency)">चिकित्सा आपातकाल (Medical Emergency)</option>
              </select>
            </div>

            {/* Current Geo Anchor */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="font-bold text-white">वर्तमान जीपीएस:</span> {locationAddress} (नजदीकी थाना: 1.8 km)
              </div>
            </div>

            {/* Trigger Button */}
            <button
              type="button"
              onClick={handleManualSOS}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:brightness-110 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-600/50"
            >
              <AlertTriangle className="w-5 h-5 text-white" />
              <span>तुरंत पुलिस 112 एवं कंट्रोल रूम को अलर्ट भेजें</span>
            </button>
          </div>
        )}

        {sosSent && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                🚨 SOS अलर्ट प्रसारित कर दिया गया है!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                आपकी लाइव लोकेशन, ऑडियो साक्ष्य, ड्राइवर रॉयल आईडी (<strong>{driverRoyalId}</strong>) और वाहन नंबर सीधे <strong>पुलिस हेल्पलाइन 112</strong> और <strong>जिटोम्नी 360° सुपर एडमिन रूम</strong> को भेज दी गई है।
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-[#D4AF37]/40 text-left text-xs space-y-1.5 font-mono">
              <div className="text-[#D4AF37] font-bold">📲 SMS / WHATSAPP DISPATCH PREVIEW:</div>
              <div className="text-slate-200 text-[11px]">
                "[EMERGENCY ALERT] JITOMNI Royal Auto Ride {rideId} reported emergency at {locationAddress}. Driver: {driverName} ({driverRoyalId}). Live police patrol dispatched."
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              खिड़की बंद करें
            </button>
          </div>
        )}

        {/* Mode: AI Chat Support */}
        {mode === 'ai_chat' && (
          <div className="flex flex-col h-96">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                      m.sender === 'user'
                        ? 'bg-[#D4AF37] text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="किराया, सुरक्षा या समस्या के बारे में पूछें..."
                className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="p-2 rounded-xl bg-[#D4AF37] text-slate-950 hover:brightness-110 shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
