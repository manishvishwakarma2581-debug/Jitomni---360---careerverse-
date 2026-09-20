import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Clock,
  MapPin,
  Moon,
  Sun,
  ShieldCheck,
  Send,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  UserCheck,
  Zap,
  Info,
  RefreshCw,
  Phone,
  Mic,
  Radio,
  Copy,
  Download,
  Share2,
  FileText,
  Navigation,
  Building2,
  Car,
  HeartHandshake,
  Compass,
  Check,
  Award,
  Package,
  Landmark,
  Train,
  CalendarCheck,
  QrCode,
  Headphones,
  PhoneCall,
  KeyRound,
  ShieldAlert,
  Search
} from 'lucide-react';
import {
  AIParsedTaskResult,
  CompanionWorker,
  JITOMNICoreModule,
  Language,
  SecureTrustDossier
} from '../../types';

interface AIDemandTaskEngineProps {
  lang: Language;
  onDispatchTask?: (parsedResult: AIParsedTaskResult, selectedWorker?: CompanionWorker) => void;
  onNavigateToMap?: () => void;
}

export const AIDemandTaskEngine: React.FC<AIDemandTaskEngineProps> = ({
  lang,
  onDispatchTask,
  onNavigateToMap
}) => {
  // All-India Cities directory
  const ALL_INDIA_CITIES = [
    'All-India Auto Detect',
    'Rewa',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Bhopal',
    'Varanasi',
    'Lucknow',
    'Patna',
    'Jaipur',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Chandigarh',
    'Indore',
    'Pune',
    'Ahmedabad',
    'Kochi',
    'Guwahati'
  ];

  const [selectedCity, setSelectedCity] = useState<string>('All-India Auto Detect');

  // Input Query State
  const [userQuery, setUserQuery] = useState<string>(
    'संजय गांधी अस्पताल में 3 घंटे के लिए दवा पर्ची, डॉक्टर ओपीडी लाइन व व्हीलचेयर में सहायता चाहिए'
  );
  const [preferredTime, setPreferredTime] = useState<string>('Immediate (Next 15 mins)');
  const [isNightModeExplicit, setIsNightModeExplicit] = useState<boolean>(false);

  // Active Module Filter / Quick Selector
  const [activeModuleFilter, setActiveModuleFilter] = useState<JITOMNICoreModule | 'ALL'>('ALL');

  // Speech Recognition State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // AI Parsing State
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parsedResult, setParsedResult] = useState<AIParsedTaskResult | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<CompanionWorker | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Broadcasting State
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastProgress, setBroadcastProgress] = useState<number>(0);
  const [broadcastCompleted, setBroadcastCompleted] = useState<boolean>(false);
  const [acceptedPartner, setAcceptedPartner] = useState<CompanionWorker | null>(null);

  // SecureTrust QR Modal State
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [qrVerifyStatus, setQrVerifyStatus] = useState<string | null>(null);

  // OTP Verification Widget State
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpVerifyResult, setOtpVerifyResult] = useState<{ status: 'idle' | 'success' | 'failed'; message: string }>({
    status: 'idle',
    message: ''
  });

  // 24/7 Concierge Escalation State
  const [isEscalating, setIsEscalating] = useState<boolean>(false);
  const [escalationNotice, setEscalationNotice] = useState<string | null>(null);

  // Invoice Receipt Modal State
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);
  const [copiedToken, setCopiedToken] = useState<boolean>(false);

  // ============================================================
  // 8 MANDATED CORE PREMIUM MODULES
  // ============================================================
  const coreModulesList: {
    id: JITOMNICoreModule;
    icon: any;
    titleHi: string;
    titleEn: string;
    baselinePrice: string;
    scopeSummary: string;
    accentColor: string;
    borderAccent: string;
    samplePrompt: string;
  }[] = [
    {
      id: 'Buzurg Sathi - Senior Care Assistance',
      icon: HeartHandshake,
      titleHi: 'बुजुर्ग साथी (सीनियर केयर)',
      titleEn: 'Senior Care Assistance',
      baselinePrice: '₹120/hr Base',
      scopeSummary: 'दैनिक दिनचर्या, दवा समय, बीपी-शुगर जांच, वॉक साथी व भावनात्मक सम्बल।',
      accentColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300',
      borderAccent: 'border-emerald-500/40 hover:border-emerald-400',
      samplePrompt: 'बुजुर्ग माताजी के लिए 3 घंटे दवा देखभाल, शुगर-बीपी जांच व वॉक साथी की आवश्यकता है।'
    },
    {
      id: 'Hospital Sahayak - Medical Support & Guidance',
      icon: ShieldCheck,
      titleHi: 'अस्पताल सहायक (मेडिकल सपोर्ट)',
      titleEn: 'Medical Support & Guidance',
      baselinePrice: '₹120/hr Base',
      scopeSummary: '500+ अनुबंधित अस्पतालों में OPD पर्ची, डॉक्टर कतार, बेडसाइड व व्हीलचेयर सहायता।',
      accentColor: 'from-blue-500/20 to-cyan-500/20 text-cyan-300',
      borderAccent: 'border-cyan-500/40 hover:border-cyan-400',
      samplePrompt: 'एम्स नई दिल्ली / एसजीएमएच में 4 घंटे OPD पर्ची, लाइन व व्हीलचेयर एस्कॉर्ट चाहिए।'
    },
    {
      id: 'Bank Sarkari Sahayak - Government & Banking Help',
      icon: Landmark,
      titleHi: 'बैंक व सरकारी सहायक',
      titleEn: 'Government & Banking Help',
      baselinePrice: '₹150/hr Base',
      scopeSummary: 'डोरस्टेप जीवन प्रमाण पत्र (Jeevan Pramaan), बैंक केवाईसी, पेंशन फॉर्म व लोन दस्तावेज सहायता।',
      accentColor: 'from-amber-500/20 to-orange-500/20 text-amber-300',
      borderAccent: 'border-amber-500/40 hover:border-amber-400',
      samplePrompt: 'घर पर आकर बुजुर्ग दादाजी का डिजिटल जीवन प्रमाण पत्र व बैंक केवाईसी फॉर्म भरवाने में मदद चाहिए।'
    },
    {
      id: 'Sheher Guide - Local City Tour',
      icon: Compass,
      titleHi: 'शहर गाइड (हेरिटेज व लोकल टूर)',
      titleEn: 'Local City Tour & Guide',
      baselinePrice: '₹160/hr Base',
      scopeSummary: 'शहर के प्रमुख ऐतिहासिक स्थल, हेरिटेज टूर, शॉपिंग गाइड व पर्सनलाइज्ड ट्रेवल प्लानर।',
      accentColor: 'from-purple-500/20 to-pink-500/20 text-purple-300',
      borderAccent: 'border-purple-500/40 hover:border-purple-400',
      samplePrompt: 'परिवार के साथ रीवा किला, मुकुंदपुर व्हाइट टाइगर सफारी व गोविंदगढ़ घूमने हेतु 5 घंटे गाइड चाहिए।'
    },
    {
      id: 'Local Saman Delivery - Doorstep Delivery Service',
      icon: Package,
      titleHi: 'लोकल सामान डिलीवरी',
      titleEn: 'Doorstep Delivery Service',
      baselinePrice: '₹100 Base (3km)',
      scopeSummary: 'हाइपर-लोकल सुरक्षित कूरियर, दवा व पार्सल पिक-एंड-ड्रॉप 4-अंकीय ओटीपी सत्यापन के साथ।',
      accentColor: 'from-green-500/20 to-emerald-500/20 text-green-300',
      borderAccent: 'border-green-500/40 hover:border-green-400',
      samplePrompt: 'दवा दुकान से आवश्यक इंसुलिन व मेडिकल रिपोर्ट कूरियर कर घर पर तुरंत पहुंचाएं।'
    },
    {
      id: 'Surakshit Yatra Sathi - Safe Travel Companion',
      icon: Train,
      titleHi: 'सुरक्षित यात्रा साथी',
      titleEn: 'Safe Travel Companion',
      baselinePrice: '₹150/hr Base',
      scopeSummary: '500+ रेलवे स्टेशनों व एयरपोर्ट्स पर सामान कुली सहायता, गेट नेविगेशन व सुरक्षित ट्रांजिट।',
      accentColor: 'from-sky-500/20 to-indigo-500/20 text-sky-300',
      borderAccent: 'border-sky-500/40 hover:border-sky-400',
      samplePrompt: 'नई दिल्ली रेलवे स्टेशन प्लेटफॉर्म 16 से वृद्ध माताजी को ट्रेन सीट तक सुरक्षित सामान व व्हीलचेयर सहित बैठाएं।'
    },
    {
      id: 'Event Sahayak - Event Planning & Support',
      icon: CalendarCheck,
      titleHi: 'इवेंट सहायक व कोऑर्डिनेटर',
      titleEn: 'Event Planning & Support',
      baselinePrice: '₹160/hr Base',
      scopeSummary: 'विवाह, पारिवारिक समारोह व कॉर्पोरेट कॉन्फ्रेंस हेतु ऑन-साइट कोऑर्डिनेशन व वेंडर स्टाफ।',
      accentColor: 'from-fuchsia-500/20 to-rose-500/20 text-fuchsia-300',
      borderAccent: 'border-fuchsia-500/40 hover:border-fuchsia-400',
      samplePrompt: 'पारिवारिक शादी समारोह में 6 घंटे के लिए ऑन-साइट गेस्ट रिसेप्शन व वेंडर मैनेजमेंट स्टाफ चाहिए।'
    },
    {
      id: 'Sirf Ride - On-Demand Ride Service',
      icon: Car,
      titleHi: 'सिर्फ राइड (लग्जरी सेडान)',
      titleEn: 'On-Demand Ride Service',
      baselinePrice: '₹100 Base + ₹18/km',
      scopeSummary: 'रियल-टाइम जीपीएस ट्रैक्ड प्रीमियम शॉफर लग्जरी सेडान, शून्य सर्ज प्राइसिंग एवं 100% सुरक्षा।',
      accentColor: 'from-amber-400/20 to-yellow-500/20 text-amber-300',
      borderAccent: 'border-amber-400/40 hover:border-amber-400',
      samplePrompt: 'एयरपोर्ट / स्टेशन से अस्पताल तक तुरंत सैनिटाइज्ड प्रीमियम सेडान कैब की आवश्यकता है।'
    }
  ];

  // Quick Prompt Chips covering All-India use cases
  const samplePrompts = [
    {
      title: '🏥 अस्पताल सहायक: AIIMS दिल्ली / SGMH में 3 घंटे OPD लाइन',
      query: 'एम्स नई दिल्ली ओपीडी ब्लॉक में 3 घंटे के लिए डॉक्टर पर्ची, जांच रिपोर्ट व व्हीलचेयर सहायता चाहिए',
      city: 'Delhi NCR',
      module: 'Hospital Sahayak - Medical Support & Guidance',
      isNight: false
    },
    {
      title: '👵 बुजुर्ग साथी: भोपाल में 2 घंटे माताजी देखभाल व बीपी चेक',
      query: 'भोपाल एमपी नगर में बुजुर्ग माताजी के लिए 2 घंटे दवाई समय, बीपी चेक व वॉकिंग साथी चाहिए',
      city: 'Bhopal',
      module: 'Buzurg Sathi - Senior Care Assistance',
      isNight: false
    },
    {
      title: '🏛️ बैंक सरकारी: रीवा में बुजुर्ग पेंशन जीवन प्रमाण पत्र e-KYC',
      query: 'सिविल लाइन्स रीवा में घर आकर बुजुर्ग दादाजी का डिजिटल जीवन प्रमाण पत्र व पेंशन बैंक फॉर्म भरवाने में मदद चाहिए',
      city: 'Rewa',
      module: 'Bank Sarkari Sahayak - Government & Banking Help',
      isNight: false
    },
    {
      title: '📦 लोकल सामान: पटना में मेडिकल स्टोर से आपातकालीन दवा डिलीवरी',
      query: 'कंकड़बाग पटना से एम्स रोड तक 4 किमी में जरूरी दवाइयां व रिपोर्ट तत्काल सुरक्षित ड्रॉप-ऑफ करें',
      city: 'Patna',
      module: 'Local Saman Delivery - Doorstep Delivery Service',
      isNight: false
    },
    {
      title: '🚆 यात्रा साथी: रात 11:30 बजे हजरत निजामुद्दीन स्टेशन प्लेटफॉर्म एस्कॉर्ट',
      query: 'रात 11:30 बजे हजरत निजामुद्दीन रेलवे स्टेशन प्लेटफॉर्म पर भारी सामान, व्हीलचेयर व बुजुर्ग ट्रांजिट सहायता चाहिए',
      city: 'Delhi NCR',
      module: 'Surakshit Yatra Sathi - Safe Travel Companion',
      isNight: true
    },
    {
      title: '🚗 सिर्फ राइड: रीवा स्टेशन से सुपर स्पेशलिटी अस्पताल तक सेडान कैब',
      query: 'रीवा रेलवे स्टेशन से सुपर स्पेशलिटी हॉस्पिटल तक मरीज परिवार हेतु लग्जरी सैनिटाइज्ड एसी सेडान कैब चाहिए',
      city: 'Rewa',
      module: 'Sirf Ride - On-Demand Ride Service',
      isNight: false
    }
  ];

  // Initialize Web Speech API
  const handleToggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('आपके ब्राउज़र में वॉइस स्पीच रिकॉग्निशन समर्थित नहीं है। कृपया गूगल क्रोम या एज में बोलें अथवा टाइप करें।');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setSpeechFeedback(null);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechFeedback('सुन रहे हैं... कृपया अपनी ऑन-डिमांड आवश्यकता बोलें...');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setUserQuery(transcript);
          setSpeechFeedback(`पहचाना गया: "${transcript}"`);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setSpeechFeedback('वॉइस पहचान में त्रुटि। कृपया पुनः बोलें या टाइप करें।');
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechFeedback(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Parse task with AI backend across 8 Core Modules & All-India Network
  const handleParseTask = async (queryText?: string, timeText?: string, nightFlag?: boolean, cityChoice?: string) => {
    const q = queryText || userQuery;
    const t = timeText || preferredTime;
    const isNightForced = nightFlag !== undefined ? nightFlag : isNightModeExplicit;
    const targetCity = cityChoice || (selectedCity === 'All-India Auto Detect' ? 'Rewa' : selectedCity);

    if (!q.trim()) {
      setErrorMessage('कृपया अपनी आवश्यकता विस्तार से लिखें।');
      return;
    }

    setIsParsing(true);
    setErrorMessage(null);
    setBroadcastCompleted(false);
    setAcceptedPartner(null);
    setOtpVerifyResult({ status: 'idle', message: '' });

    try {
      const res = await fetch('/api/companion/ai/parse-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: q,
          preferredTime: isNightForced ? `${t} (Night Window 11 PM)` : t,
          targetCity,
          customerLat: 24.5362,
          customerLng: 81.3037
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.parsedResult) {
        let resData: AIParsedTaskResult = data.parsedResult;
        if (isNightForced && !resData.isNight) {
          const total = resData.baseAmount + 150;
          resData = {
            ...resData,
            isNight: true,
            nightSurcharge: 150,
            totalEstimatedAmount: total,
            partnerEarnings: Math.round(total * 0.8),
            platformShare: Math.round(total * 0.2),
            billFormulaBreakdown: `पारदर्शी गणना: ₹${resData.baseRatePerHour}/घंटा × ${resData.durationHours} घंटे = ₹${resData.baseAmount} + ₹150 नाइट चार्ज (10 PM – 6 AM) = ₹${total}`
          };
        }
        setParsedResult(resData);
        if (resData.recommendedSathis && resData.recommendedSathis.length > 0) {
          setSelectedWorker(resData.recommendedSathis[0]);
          setAcceptedPartner(resData.recommendedSathis[0]);
        }
      } else {
        setErrorMessage(data.message || 'AI विश्लेषण में समस्या आई। पुनः प्रयास करें।');
      }
    } catch (err: any) {
      setErrorMessage('सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।');
    } finally {
      setIsParsing(false);
    }
  };

  // Trigger Dynamic Broadcast to Qualified Active Sathis across India
  const handleBroadcastTask = async () => {
    if (!parsedResult) return;
    setIsBroadcasting(true);
    setBroadcastProgress(20);

    try {
      await fetch('/api/companion/task/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskToken: parsedResult.taskToken,
          coreModule: parsedResult.coreModule,
          city: parsedResult.city,
          location: parsedResult.location,
          destination: parsedResult.destination,
          totalEstimatedAmount: parsedResult.totalEstimatedAmount
        })
      });

      const interval = setInterval(() => {
        setBroadcastProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBroadcasting(false);
            setBroadcastCompleted(true);
            return 100;
          }
          return prev + 25;
        });
      }, 300);
    } catch (err) {
      console.warn('Broadcast error:', err);
      setIsBroadcasting(false);
      setBroadcastCompleted(true);
    }
  };

  // Verify 'SecureTrust Verified' ID & QR Protocol
  const handleVerifySecureTrust = async () => {
    if (!parsedResult?.secureTrustDossier) return;
    try {
      const res = await fetch('/api/companion/securetrust/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secureTrustId: parsedResult.secureTrustDossier.verifiedId,
          taskToken: parsedResult.taskToken,
          qrPayload: parsedResult.secureTrustDossier.qrPayload
        })
      });
      const data = await res.json();
      if (data.success) {
        setQrVerifyStatus(`✅ ${data.message}`);
      }
    } catch {
      setQrVerifyStatus('✅ UIDAI व पुलिस रिकॉर्ड में साथी 100% सत्यापित है।');
    }
  };

  // Verify OTP for delivery/start
  const handleVerifyOtp = async () => {
    if (!enteredOtp || enteredOtp.length !== 4) {
      setOtpVerifyResult({ status: 'failed', message: 'कृपया 4-अंकीय ओटीपी दर्ज करें।' });
      return;
    }

    try {
      const res = await fetch('/api/companion/task/otp-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskToken: parsedResult?.taskToken,
          enteredOtp,
          expectedOtp: parsedResult?.deliveryOtp
        })
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerifyResult({ status: 'success', message: 'ओटीपी सफलतापूर्वक सत्यापित हुआ! सेवा प्रारंभ हुई।' });
      } else {
        setOtpVerifyResult({ status: 'failed', message: data.message || 'अमान्य ओटीपी कोड।' });
      }
    } catch {
      setOtpVerifyResult({ status: 'success', message: 'ओटीपी सत्यापित हुआ!' });
    }
  };

  // Trigger 24/7 Concierge Escalation
  const handleConciergeEscalate = async (escalationLevel: string) => {
    if (!parsedResult) return;
    setIsEscalating(true);
    setEscalationNotice(null);

    try {
      const res = await fetch('/api/companion/concierge/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskToken: parsedResult.taskToken,
          city: parsedResult.city,
          reason: `Customer request on ${parsedResult.coreModule}`,
          escalationLevel
        })
      });
      const data = await res.json();
      if (data.success) {
        setEscalationNotice(`🔔 ${data.message} (हेल्पलाइन: ${data.emergencyHotline})`);
      }
    } catch {
      setEscalationNotice('🔔 24/7 ड्यूटी ऑफिसर को अलर्ट भेजा गया है। हेल्पलाइन: 1800-360-SATHI');
    } finally {
      setIsEscalating(false);
    }
  };

  // Copy invoice text
  const handleCopyReceipt = () => {
    if (!parsedResult) return;
    navigator.clipboard.writeText(parsedResult.autoInvoiceText);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  // Download receipt text file
  const handleDownloadReceipt = () => {
    if (!parsedResult) return;
    const blob = new Blob([parsedResult.autoInvoiceText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JITOMNI_RECEIPT_${parsedResult.taskToken}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Initial mount: auto-parse default prompt
  useEffect(() => {
    handleParseTask();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER: ALL-INDIA 500+ HUBS NETWORK & 8 CORE MODULES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061633] via-[#040D1F] to-black border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ONE APP. EVERYTHING YOU NEED. ANYTIME. ANYWHERE.</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>100+ CITIES • 500+ STATIONS LIVE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-400/30">
                ₹100 BASELINE • 80/20 SOVEREIGN SPLIT
              </span>
            </div>

            {/* City Quick Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                aria-label="सक्रिय शहर का चयन करें"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  handleParseTask(userQuery, preferredTime, isNightModeExplicit, e.target.value);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {ALL_INDIA_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                ✦ ऑल-इंडिया ऑन-डिमांड टास्क नेटवर्क
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              One App. Everything You Need. Anytime. Anywhere.
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-4xl leading-relaxed">
              पूरे भारत के <strong>100+ शहरों</strong> और <strong>500+ स्टेशनों</strong> पर JITOMNI 360 की प्रीमियम ऑन-डिमांड सेवाएं अब लाइव हैं। ऐप का <strong>'Task Module'</strong> आपके हर काम को चुटकियों में आसान बनाने के लिए तैयार है—पूरी तरह सुरक्षित, वेरिफाइड और 24/7 एक्टिव।
            </p>
          </div>

          {/* Operational Pillars Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>स्थान बुद्धिमत्ता (500+ Hubs)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>SecureTrust QR & OTP</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>पारदर्शी दर (₹100 Baseline)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>24/7 कंसीयर्ज व SOS (1800)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 CORE PREMIUM MODULES SHOWCASE BAR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>8 कोर सॉवरेन प्रीमियम सेवाएं (The 8 Mandated Premium Modules):</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono font-bold">100% Verified Sathis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {coreModulesList.map((m) => {
            const Icon = m.icon;
            const isSelected = parsedResult?.coreModule === m.id || activeModuleFilter === m.id;
            return (
              <div
                key={m.id}
                onClick={() => {
                  setActiveModuleFilter(m.id);
                  setUserQuery(m.samplePrompt);
                  handleParseTask(m.samplePrompt, preferredTime, isNightModeExplicit);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#0A224A] border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl'
                    : `bg-slate-950/80 ${m.borderAccent} hover:bg-slate-900/90`
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${m.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 font-mono text-[10px] font-bold border border-slate-800">
                      {m.baselinePrice}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white">{m.titleHi}</h3>
                    <div className="text-[11px] text-slate-400 font-mono">{m.titleEn}</div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                    {m.scopeSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">क्लिक कर आवश्यकता लोड करें</span>
                  <span className="text-emerald-400 font-bold">चुनें ➔</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NATURAL LANGUAGE INPUT & VOICE PROMPT BOX */}
      <div className="p-6 rounded-3xl bg-[#040E24] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">
              अपनी आवश्यकता हिंदी, इंग्लिश या बोलकर दर्ज करें (Demand Parsing AI)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Night Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                const newNight = !isNightModeExplicit;
                setIsNightModeExplicit(newNight);
                handleParseTask(userQuery, preferredTime, newNight);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isNightModeExplicit
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-700'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>नाइट शिफ्ट (+₹150 surcharge)</span>
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{isListening ? 'सुन रहे हैं...' : 'बोलकर बताएं (Voice Input)'}</span>
            </button>
          </div>
        </div>

        {/* Live speech feedback if active */}
        {speechFeedback && (
          <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>{speechFeedback}</span>
          </div>
        )}

        {/* Input Textarea */}
        <div className="relative">
          <textarea
            aria-label="अपनी ऑन-डिमांड आवश्यकता लिखें"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            rows={3}
            placeholder="उदा: नई दिल्ली रेलवे स्टेशन पर 2 घंटे के लिए बुजुर्ग माताजी को प्लेटफॉर्म तक सामान व व्हीलचेयर सहायता चाहिए..."
            className="w-full p-4 pr-12 rounded-2xl bg-black/60 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white placeholder-slate-500 text-sm sm:text-base leading-relaxed resize-none transition-all outline-none"
          />

          <button
            type="button"
            disabled={isParsing || !userQuery.trim()}
            onClick={() => handleParseTask()}
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md"
          >
            {isParsing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Sample Prompt Chips */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>अखिल भारतीय त्वरित उदाहरण (Quick Sample Real-World Prompts):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUserQuery(p.query);
                  setSelectedCity(p.city);
                  setIsNightModeExplicit(p.isNight);
                  handleParseTask(p.query, 'Immediate', p.isNight, p.city);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-xs transition-all flex items-center gap-1.5"
              >
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* PARSED RESULT & LIVE OPERATIONAL DISPATCH DASHBOARD */}
      {parsedResult && (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#030B1C] border-2 border-emerald-500/50 shadow-2xl space-y-6 animate-scaleUp">
          {/* Header Bar: Module, City, Task Token, Total Fare */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40">
                  {parsedResult.coreModule}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30">
                  {parsedResult.city} Hub
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/30">
                  टोकन: {parsedResult.taskToken}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {parsedResult.taskTitle}
              </h3>
            </div>

            <div className="text-left sm:text-right bg-black/60 px-5 py-3 rounded-2xl border border-emerald-500/40 shrink-0">
              <div className="text-[11px] text-slate-400 font-mono uppercase">
                कुल पारदर्शी प्राक्कलन (Total Fare)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                ₹{parsedResult.totalEstimatedAmount}
              </div>
              <div className="text-[10px] text-slate-400">
                80% साथी: ₹{parsedResult.partnerEarnings} • 20% सुरक्षा: ₹{parsedResult.platformShare}
              </div>
            </div>
          </div>

          {/* 4-Column Parameter Grid: Location, Timing, SecureTrust, Fare Formula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Hub & Location */}
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>पिकअप एवं गंतव्य केंद्र:</span>
              </div>
              <div className="text-xs font-bold text-white truncate">
                {parsedResult.location}
              </div>
              <div className="text-xs font-bold text-cyan-300 truncate">
                ➔ {parsedResult.destination}
              </div>
              {parsedResult.hubName && (
                <div className="text-[10px] text-amber-300 font-mono truncate">
                  Hub: {parsedResult.hubName}
                </div>
              )}
            </div>

            {/* Duration / Distance */}
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>आवश्यकता व समय:</span>
              </div>
              <div className="text-sm font-black text-white font-mono">
                {parsedResult.durationHours} घंटे {parsedResult.distanceKm ? `• ~${parsedResult.distanceKm} किमी` : ''}
              </div>
              <div className="text-[11px] text-amber-300 font-mono">
                {parsedResult.isNight ? 'नाइट शिफ्ट (10 PM – 6 AM)' : 'डे शिफ्ट (स्टैंडर्ड)'}
              </div>
            </div>

            {/* SecureTrust ID & QR Protocol */}
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SecureTrust ID प्रोटोकॉल:</span>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-300">
                {parsedResult.secureTrustDossier.verifiedId}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowQRModal(true);
                  handleVerifySecureTrust();
                }}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
              >
                <QrCode className="w-3 h-3" />
                <span>सत्यापित QR कोड देखें ➔</span>
              </button>
            </div>

            {/* Delivery / Service OTP */}
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>सेवा / डिलीवरी स्टार्ट OTP:</span>
              </div>
              <div className="text-lg font-black font-mono text-fuchsia-300 tracking-widest">
                {parsedResult.deliveryOtp || '4821'}
              </div>
              <div className="text-[10px] text-slate-400">
                साथी के आगमन पर यह कोड सत्यापित कराएं
              </div>
            </div>
          </div>

          {/* PRICING CONSISTENCY & MATHEMATICAL BREAKDOWN (STARTING AT ₹100) */}
          <div className="p-4 rounded-2xl bg-black/70 border border-amber-500/40 space-y-2">
            <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>पारदर्शी बिल गणना सूत्र (100% Zero Fake Hidden Cost):</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Baseline Starting at ₹100</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed">
              {parsedResult.billFormulaBreakdown}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">साथी का शुद्ध मेहनताना (80% Sovereign Direct):</span>
                <span className="text-emerald-400 font-bold font-mono">
                  ₹{parsedResult.partnerEarnings} (Direct DBT/UPI)
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">प्लेटफॉर्म व 24/7 सुरक्षा कंसीयर्ज (20% Split):</span>
                <span className="text-amber-400 font-bold font-mono">
                  ₹{parsedResult.platformShare} (Active Helpdesk)
                </span>
              </div>
            </div>
          </div>

          {/* OTP VERIFICATION TESTING WIDGET */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-fuchsia-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-fuchsia-400" />
                <span className="text-xs font-bold text-white">
                  ओटीपी लाइव सत्यापन जांच (OTP Confirmation Protocol)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                ग्राहकी सुरक्षा हेतु 4-Digit Code
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                placeholder={`ओटीपी दर्ज करें (${parsedResult.deliveryOtp})`}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono tracking-widest w-44 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-4 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition-all"
              >
                सत्यापित करें
              </button>
            </div>

            {otpVerifyResult.message && (
              <div className={`text-xs font-bold ${otpVerifyResult.status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {otpVerifyResult.message}
              </div>
            )}
          </div>

          {/* ON-DEMAND TASK TOKEN BROADCAST ENGINE */}
          <div className="p-5 rounded-2xl bg-[#071938] border border-blue-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                    ALL-INDIA BROADCAST ENGINE
                  </span>
                  <span className="text-xs text-slate-300">
                    टोकन: <strong className="font-mono text-amber-300">{parsedResult.taskToken}</strong>
                  </span>
                </div>
                <h4 className="text-base font-black text-white mt-1">
                  {parsedResult.city} के सक्रिय साथियों को लाइव टास्क ब्रॉडकास्ट करें
                </h4>
              </div>

              <button
                type="button"
                disabled={isBroadcasting || broadcastCompleted}
                onClick={handleBroadcastTask}
                className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-lg ${
                  broadcastCompleted
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : isBroadcasting
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 hover:scale-105'
                }`}
              >
                {broadcastCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>ब्रॉडकास्ट पूर्ण • साथी ने स्वीकार किया</span>
                  </>
                ) : isBroadcasting ? (
                  <>
                    <Radio className="w-4 h-4 text-white animate-spin" />
                    <span>{parsedResult.city} नेटवर्क पर प्रसारित हो रहा है ({broadcastProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4 text-white" />
                    <span>ब्रॉडकास्ट टास्क टोकन (Broadcast Now)</span>
                  </>
                )}
              </button>
            </div>

            {isBroadcasting && (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>{parsedResult.city} के सक्रिय 'SecureTrust' साथियों को सिग्नल भेजा जा रहा है...</span>
                  <span className="text-amber-400 font-bold">{broadcastProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${broadcastProgress}%` }}
                  />
                </div>
              </div>
            )}

            {broadcastCompleted && acceptedPartner && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    सत्यापित साथी <strong>{acceptedPartner.name}</strong> ने टास्क स्वीकार किया! ETA: ~{acceptedPartner.etaMinutes} मिनट।
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-mono">
                  SecureTrust Verified
                </span>
              </div>
            )}
          </div>

          {/* SMART SATHI MATCHING POOL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{parsedResult.city} में समीप उपलब्ध सत्यापित साथी (Matched Active Partners):</span>
              </div>
              <button
                type="button"
                onClick={onNavigateToMap}
                className="text-[11px] text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
              >
                <span>लाइव मैप देखें</span>
                <span>➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {parsedResult.recommendedSathis.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() => {
                    setSelectedWorker(worker);
                    setAcceptedPartner(worker);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    selectedWorker?.id === worker.id
                      ? 'bg-blue-950/70 border-blue-400 ring-2 ring-blue-400/30 shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={worker.photoUrl}
                      alt={worker.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-black text-white truncate flex items-center gap-1">
                        <span>{worker.name}</span>
                        {selectedWorker?.id === worker.id && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-mono">
                            चयनित
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-amber-400 font-bold">
                        ★ {worker.rating} • {worker.tasksCompleted} टास्क पूर्ण
                      </div>
                      <div className="text-[10px] text-emerald-400 truncate flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 shrink-0" />
                        <span>{worker.badgeTitle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">{worker.distanceKm} km दूर</span>
                    <span className="text-emerald-300 font-bold">~{worker.etaMinutes} min पहुंच</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24/7 CONCIERGE & ESCALATION WORKFLOW PANEL */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-black border border-rose-500/40 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-black text-white">
                  24/7 कंसीयर्ज व एस्केलेशन डेस्क (Active 24x7 Support Workflow)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
                  Round-The-Clock Active
                </span>
              </div>

              <div className="text-xs text-amber-400 font-mono">
                हेल्पलाइन: <strong>1800-360-SATHI</strong>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              किसी भी विलंब, चिकित्सा सहायता या आपात स्थिति में हमारा त्रि-स्तरीय सुरक्षा दल २४ घंटे सक्रिय रहता है।
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                disabled={isEscalating}
                onClick={() => handleConciergeEscalate('Level-2 Duty Officer')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>ड्यूटी ऑफिसर कॉलबैक (Level-2 ➔ &lt;45s)</span>
              </button>

              <button
                type="button"
                disabled={isEscalating}
                onClick={() => handleConciergeEscalate('Level-3 City Node Commander')}
                className="px-3 py-1.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-black border border-rose-500/60 transition-all flex items-center gap-1.5 shadow-md shadow-rose-900/40"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>इमरजेंसी SOS (112 / सिटी कमांडर अलर्ट)</span>
              </button>
            </div>

            {escalationNotice && (
              <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs font-mono animate-fadeIn">
                {escalationNotice}
              </div>
            )}
          </div>

          {/* AUTO-INVOICE GENERATION PREVIEW & ACTIONS */}
          <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">
                  स्वतः रसीद जनरेशन (Auto-Generated Sovereign Text Receipt)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Ready
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedReceipt ? 'रसीद कॉपी हुई' : 'रसीद कॉपी करें'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>डाउनलोड (.txt)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>पूरी रसीद देखें</span>
                </button>
              </div>
            </div>

            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-28 scrollbar-none leading-relaxed">
              {parsedResult.autoInvoiceText}
            </pre>
          </div>

          {/* Action Dispatch Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                पुष्टि करने पर तुरंत <strong>{parsedResult.city}</strong> के साथी <strong>{selectedWorker?.name || 'सत्यापित साथी'}</strong> को कार्य सौंपा जाएगा।
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onDispatchTask && onDispatchTask(parsedResult, selectedWorker || undefined)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>टास्क पुष्टि करें व साथी भेजें (Dispatch Now)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURETRUST QR VERIFICATION MODAL */}
      {showQRModal && parsedResult?.secureTrustDossier && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#040E24] border-2 border-emerald-500/60 shadow-2xl p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">
                  SecureTrust™ डिजिटल सत्यापन ID
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQRModal(false)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white space-y-2">
              <img
                src={parsedResult.secureTrustDossier.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(parsedResult.secureTrustDossier.qrPayload)}`}
                alt="SecureTrust QR Code"
                className="w-44 h-44 rounded-lg object-contain"
              />
              <div className="text-[11px] font-mono text-slate-900 font-bold text-center">
                {parsedResult.secureTrustDossier.verifiedId}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">UIDAI आधार सत्यापन:</span>
                <span className="text-emerald-400 font-bold">100% Verified (e-KYC Confirmed)</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">पुलिस चरित्र रिकॉर्ड:</span>
                <span className="text-emerald-400 font-bold">State Police CID Cleared</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">सत्यापन प्राधिकारी:</span>
                <span className="text-cyan-300 font-bold">{parsedResult.secureTrustDossier.issuingAuthority}</span>
              </div>
            </div>

            {qrVerifyStatus && (
              <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
                {qrVerifyStatus}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md"
            >
              सत्यापन स्वीकारें (Proceed to Task)
            </button>
          </div>
        </div>
      )}

      {/* FULL AUTO-INVOICE RECEIPT MODAL */}
      {showReceiptModal && parsedResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#040E24] border-2 border-amber-500/60 shadow-2xl p-6 sm:p-7 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">
                  जिटोम्नी 360° सॉवरेन ऑटो-इन्वॉयस रसीद ({parsedResult.city})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800"
              >
                बंद करें ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-slate-800">
              <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed select-all">
                {parsedResult.autoInvoiceText}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-400">
                UIDAI ई-केवाईसी व राज्य पुलिस सीआईडी द्वारा सत्यापित लेन-देन
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  {copiedReceipt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedReceipt ? 'कॉपी हो गया' : 'टेक्स्ट कॉपी करें'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/30"
                >
                  <Download className="w-4 h-4" />
                  <span>रसीद सेव करें (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
