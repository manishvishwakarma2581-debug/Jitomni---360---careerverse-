import React, { useState, useRef } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Star, 
  Award, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Mic, 
  MicOff, 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  Users, 
  Layers, 
  Cpu, 
  Globe2, 
  TrendingUp, 
  Building2, 
  Download, 
  MessageSquare,
  BadgeCheck,
  Zap,
  PhoneCall,
  Lock,
  ChevronDown,
  RotateCcw,
  Bot
} from 'lucide-react';
import { 
  Language, 
  KritiPillarId, 
  KritiContractRole, 
  KritiContractApplication, 
  KritiSamadhanMessage 
} from '../../types';
import { 
  KRITI_PILLARS_DATA, 
  KRITI_PROBLEM_SOLVING_BENEFITS, 
  INITIAL_SAMPLE_CONTRACTS, 
  INITIAL_SAMADHAN_CHATS 
} from '../../data/kritiData';

interface KritiFaaSModuleProps {
  lang: Language;
  onNavigateAgriTab?: (tab: string) => void;
}

export const KritiFaaSModule: React.FC<KritiFaaSModuleProps> = ({ onNavigateAgriTab }) => {
  // Navigation between the 3 Interconnected Phases
  const [activePhase, setActivePhase] = useState<'explainer' | 'contracts' | 'samadhan'>('explainer');
  
  // Selected Pillar for detailed view
  const [selectedPillarId, setSelectedPillarId] = useState<KritiPillarId>('faas_model');

  // Profit Sharing Interactive Calculator State (Model 1)
  const [calcAcreage, setCalcAcreage] = useState<number>(2);
  const [calcCrop, setCalcCrop] = useState<'tomato' | 'capsicum' | 'garlic' | 'dragonfruit' | 'cucumber'>('capsicum');

  // Contract Application Workflow State (Phase 2)
  const [contractsList, setContractsList] = useState<KritiContractApplication[]>(INITIAL_SAMPLE_CONTRACTS);
  const [selectedRole, setSelectedRole] = useState<KritiContractRole>('tech_agent');
  const [contractStep, setContractStep] = useState<1 | 2 | 3 | 4>(1);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantAadhaar, setApplicantAadhaar] = useState('');
  const [applicantState, setApplicantState] = useState('उत्तर प्रदेश');
  const [applicantDistrict, setApplicantDistrict] = useState('');
  const [applicantVillageCluster, setApplicantVillageCluster] = useState('');
  const [applicantLandDetails, setApplicantLandDetails] = useState('');
  const [consultationDate, setConsultationDate] = useState('2026-09-18');
  const [consultationSlot, setConsultationSlot] = useState('11:00 AM - 12:30 PM');
  const [consultationMode, setConsultationMode] = useState<'video_call' | 'hub_visit' | 'on_field_visit'>('video_call');
  const [isKycSimulated, setIsKycSimulated] = useState(false);
  const [activeCreatedContract, setActiveCreatedContract] = useState<KritiContractApplication | null>(null);
  const [signatureText, setSignatureText] = useState('');
  const [isAgreementSigned, setIsAgreementSigned] = useState(false);

  // Kisan Samadhan Chat State (Phase 3)
  const [chatMessages, setChatMessages] = useState<KritiSamadhanMessage[]>(INITIAL_SAMADHAN_CHATS);
  const [inputQuery, setInputQuery] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [isExpertResponding, setIsExpertResponding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop Profit Multipliers for Calculator
  const CROP_CALC_DATA = {
    capsicum: {
      name: 'शिमला मिर्च (Color Capsicum)',
      durationDays: 150,
      traditionalYieldQuintalPerAcre: 60,
      traditionalGrossPerAcre: 180000,
      traditionalCostPerAcre: 100000,
      kritiFaaSYieldQuintalPerAcre: 140,
      kritiFaaSGrossPerAcre: 560000,
      platformManagedTechCost: 160000,
      icon: '🫑'
    },
    garlic: {
      name: 'रियावन जी-2 लहसुन (Garlic)',
      durationDays: 140,
      traditionalYieldQuintalPerAcre: 25,
      traditionalGrossPerAcre: 250000,
      traditionalCostPerAcre: 90000,
      kritiFaaSYieldQuintalPerAcre: 55,
      kritiFaaSGrossPerAcre: 715000,
      platformManagedTechCost: 175000,
      icon: '🧄'
    },
    tomato: {
      name: 'हाइब्रिड टमाटर (Export Grade Tomato)',
      durationDays: 120,
      traditionalYieldQuintalPerAcre: 120,
      traditionalGrossPerAcre: 180000,
      traditionalCostPerAcre: 80000,
      kritiFaaSYieldQuintalPerAcre: 280,
      kritiFaaSGrossPerAcre: 448000,
      platformManagedTechCost: 110000,
      icon: '🍅'
    },
    dragonfruit: {
      name: 'ड्रैगन फ्रूट (Dragon Fruit Super Crop)',
      durationDays: 365,
      traditionalYieldQuintalPerAcre: 0,
      traditionalGrossPerAcre: 0,
      traditionalCostPerAcre: 0,
      kritiFaaSYieldQuintalPerAcre: 60,
      kritiFaaSGrossPerAcre: 900000,
      platformManagedTechCost: 280000,
      icon: '🐉'
    },
    cucumber: {
      name: 'पॉलीहाउस खीरा (Seedless English Cucumber)',
      durationDays: 90,
      traditionalYieldQuintalPerAcre: 70,
      traditionalGrossPerAcre: 140000,
      traditionalCostPerAcre: 65000,
      kritiFaaSYieldQuintalPerAcre: 180,
      kritiFaaSGrossPerAcre: 450000,
      platformManagedTechCost: 120000,
      icon: '🥒'
    }
  };

  const selectedCropStats = CROP_CALC_DATA[calcCrop];
  const totalGrossKriti = selectedCropStats.kritiFaaSGrossPerAcre * calcAcreage;
  const platformTechCost = selectedCropStats.platformManagedTechCost * calcAcreage;
  const totalNetProfit = totalGrossKriti - platformTechCost;
  const farmerShare85 = Math.round(totalNetProfit * 0.85);
  const platformShare15 = Math.round(totalNetProfit * 0.15);
  const traditionalNetProfit = (selectedCropStats.traditionalGrossPerAcre - selectedCropStats.traditionalCostPerAcre) * calcAcreage;
  const extraGainFarmer = Math.max(0, farmerShare85 - traditionalNetProfit);

  // Handle Voice Recording Simulation
  const toggleVoiceRecording = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      setHasVoiceNote(true);
    } else {
      setIsRecordingVoice(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 6) {
            clearInterval(timer);
            setIsRecordingVoice(false);
            setHasVoiceNote(true);
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Image Upload handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send Farmer Message in Kisan Samadhan Hub
  const handleSendSamadhanMessage = (customText?: string, presetImg?: string, cropTag?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() && !uploadedImagePreview && !presetImg && !hasVoiceNote) return;

    const newFarmerMsg: KritiSamadhanMessage = {
      id: 'msg-' + Date.now(),
      sender: 'farmer',
      senderName: applicantName ? `${applicantName} (किसान / आवेदक)` : 'प्रगतिशील किसान (सत्यापित सदस्य)',
      text: textToSend || (hasVoiceNote ? '🎤 [स्थानीय बोली में रिकॉर्ड किया गया वॉयस प्रश्न / Voice Note - 6s]' : 'कृपया संलग्न फसल की फोटो देखकर तुरंत निदान बताएं।'),
      imageUrl: presetImg || uploadedImagePreview || undefined,
      voiceNoteUrl: hasVoiceNote ? 'audio-blob-recorded' : undefined,
      voiceDurationSeconds: hasVoiceNote ? recordingSeconds || 6 : undefined,
      cropTag: cropTag || (calcCrop ? CROP_CALC_DATA[calcCrop].name : 'फसल स्वास्थ्य'),
      timestamp: 'अभी, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      routingStatus: 'analyzed_by_ai'
    };

    setChatMessages(prev => [...prev, newFarmerMsg]);
    setInputQuery('');
    setUploadedImagePreview(null);
    setHasVoiceNote(false);
    setRecordingSeconds(0);
    setIsExpertResponding(true);

    // Fetch live expert advice from Mahi Pawar desk API, with instant fallback
    fetch('/api/kriti/samadhan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: textToSend,
        cropType: cropTag || (calcCrop ? CROP_CALC_DATA[calcCrop].name : 'सब्जी / फसल'),
        farmerName: applicantName || 'प्रगतिशील किसान',
        district: applicantDistrict || 'भारत',
        state: applicantState || 'अखिल भारतीय'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.reply) {
          const expertReply: KritiSamadhanMessage = {
            id: 'reply-' + Date.now(),
            sender: 'mahi_desk',
            senderName: data.expert || 'Mahi Pawar (Chief Strategic Architect & Central Expert Desk)',
            text: data.reply,
            timestamp: 'अभी, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            routingStatus: 'resolved',
            expertBadge: data.badge || 'Mahi Pawar Verified Desk'
          };
          setChatMessages(prev => [...prev, expertReply]);
          setIsExpertResponding(false);
          return;
        }
        throw new Error('Fallback required');
      })
      .catch(() => {
        let adviceText = `नमस्ते! आपकी समस्या का विश्लेषण सीधे केंद्रीय कृषि तकनीकी डेस्क पर किया गया है।\n\n1. प्राथमिक निरीक्षण: यह समस्या मिट्टी में जलभराव एवं रसचूसक कीटों/फफूंद की शुरुआती सक्रियता से संबंधित प्रतीत होती है।\n2. तत्काल समाधान: कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/लीटर) के साथ स्ट्रेप्टोसाइक्लिन (1 ग्राम प्रति 15 लीटर) का तने के पास ड्रेंचिंग करें।\n3. हाइब्रिड सपोर्ट: आपके गांव क्लस्टर के "माही टेक एजेंट" को अलर्ट भेज दिया गया है, वे 24 घंटे के भीतर खेत का प्रत्यक्ष निरीक्षण कर डिजिटल डायरी में लॉग करेंगे।\n\nकृषि रक्षा एवं समृद्धि आपकी पहली प्राथमिकता है!`;
        
        if (textToSend.toLowerCase().includes('बाय-बैक') || textToSend.toLowerCase().includes('buy back') || textToSend.toLowerCase().includes('कहाँ बेचे') || textToSend.toLowerCase().includes('मंडी')) {
          adviceText = `कृषि 360° बाय-बैक गारंटी के अंतर्गत आपकी ए-ग्रेड फसल का पूर्व-निर्धारित मूल्य अनुबंध सुनिश्चित है। फसल कटाई से 3 दिन पूर्व ऐप पर हार्वेस्ट अलर्ट दबाएं, हमारी रेफ्रिजरेटेड कोल्ड-वैन सीधे आपके खेत से उपज उठाएगी। कोई मंडी दलाली नहीं, 24 घंटे में सीधे बैंक खाते में भुगतान!`;
        } else if (textToSend.toLowerCase().includes('खाद') || textToSend.toLowerCase().includes('यूरिया') || textToSend.toLowerCase().includes('npk')) {
          adviceText = `पारंपरिक रासायनिक खाद के बजाय सॉइल टेस्ट आधारित संतुलित पोषण अपनाएं। नैनो डीएपी (4 मिली/लीटर) और समुद्री शैवाल अर्क का छिड़काव करने से 30% लागत घटेगी और कल्ले 40% अधिक निकलेंगे। लोकल हब पर ये सभी इनपुट सब्सिडी रेट पर उपलब्ध हैं।`;
        }

        const expertReply: KritiSamadhanMessage = {
          id: 'reply-' + Date.now(),
          sender: 'mahi_desk',
          senderName: 'Mahi Pawar (Chief Strategic Architect & Central Expert Desk)',
          text: adviceText,
          timestamp: 'अभी, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          routingStatus: 'resolved',
          expertBadge: 'Mahi Pawar Verified Desk'
        };

        setChatMessages(prev => [...prev, expertReply]);
        setIsExpertResponding(false);
      });
  };

  // Preset Dilemmas to try
  const PRESET_DILEMMAS = [
    {
      title: 'टमाटर में पत्ती सिकुड़न व पीलापन',
      tag: 'टमाटर (Tomato Leaf Curl)',
      text: 'मेरी टमाटर की पत्तियों में सिकुड़न आ रही है और नई पत्तियां छोटी व पीली निकल रही हैं। क्या यह वायरस है? तुरंत उपचार बताएं।'
    },
    {
      title: 'शिमला मिर्च में फूल व फल गिरना',
      tag: 'शिमला मिर्च (Flower Drop)',
      text: 'तापमान बढ़ने से शिमला मिर्च में फूल खिलते ही गिर रहे हैं और फल नहीं टिक पा रहे। किस माइक्रोन्यूट्रिएंट का स्प्रे करूं?'
    },
    {
      title: 'लहसुन में कंद का आकार नहीं बढ़ना',
      tag: 'लहसुन (Bulb Size Issue)',
      text: 'लहसुन 90 दिन का हो चुका है पर तना मोटा नहीं हो रहा और कंद का विकास धीमा है। कौन सा पोटाश स्प्रे सबसे असरदार रहेगा?'
    },
    {
      title: 'बाय-बैक और एक्सपोर्ट की शर्तें क्या हैं?',
      tag: 'बाय-बैक लिंकेज (Export)',
      text: 'यदि मैं कृषि 360° के तहत 2 एकड़ में रंगीन शिमला मिर्च उगाऊं, तो बाय-बैक का भुगतान कितने दिन में होगा और ग्रेडिंग के नियम क्या हैं?'
    }
  ];

  // Initiate Contract Creation Flow
  const handleInitiateContract = (role: KritiContractRole) => {
    setSelectedRole(role);
    setActivePhase('contracts');
    setContractStep(2);
  };

  // Complete Step 2: In-App KYC
  const handleCompleteKYC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim() || !applicantAadhaar.trim()) {
      alert('कृपया नाम, मोबाइल नंबर और आधार संख्या दर्ज करें।');
      return;
    }
    setIsKycSimulated(true);
    setContractStep(3);
  };

  // Complete Step 3: Consultation Scheduling & Generate Contract
  const handleGenerateAgreement = () => {
    const agreementNum = `KRITI-${selectedRole === 'tech_agent' ? 'AGENT' : 'HUB'}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newContract: KritiContractApplication = {
      id: 'app-' + Date.now(),
      role: selectedRole,
      fullName: applicantName,
      phone: applicantPhone,
      aadhaarNumber: `XXXX-XXXX-${applicantAadhaar.slice(-4) || '9876'}`,
      state: applicantState,
      district: applicantDistrict || 'केंद्रीय कृषि परिक्षेत्र',
      villageCluster: applicantVillageCluster || '5-10 ग्राम क्लस्टर',
      pinCode: '202601',
      landOrPremisesDetails: applicantLandDetails || '2.0 एकड़ कृषि भूमि',
      proposedLandAcres: 2.0,
      consultationDate: consultationDate,
      consultationSlot: consultationSlot,
      consultationMode: consultationMode,
      status: 'contract_issued',
      agreementNumber: agreementNum,
      authorizedBy: 'Mahi Pawar (Chief Strategic Architect & Director of Agri 360°)',
      issuedAt: new Date().toISOString(),
      notes: `${selectedRole === 'tech_agent' ? 'कृषि उद्यमी टेक एजेंट' : 'लोकल हाइब्रिड इनपुट हब'} अनुबंध ड्राफ्ट जारी।`
    };

    setActiveCreatedContract(newContract);
    setContractsList(prev => [newContract, ...prev]);
    setContractStep(4);
    setIsAgreementSigned(false);
    setSignatureText(applicantName);
  };

  // Sign Digital Agreement (e-Sign)
  const handleSignAgreement = () => {
    if (!signatureText.trim()) {
      alert('कृपया डिजिटल हस्ताक्षर हेतु अपना पूरा नाम दर्ज करें।');
      return;
    }

    const signedTime = new Date().toISOString();
    const digitalHash = `SHA256:KRITI-${Math.random().toString(36).substring(2, 12).toUpperCase()}-${Date.now()}`;

    if (activeCreatedContract) {
      const updated: KritiContractApplication = {
        ...activeCreatedContract,
        status: 'signed_active',
        signedAt: signedTime,
        digitalSignatureHash: digitalHash
      };
      setActiveCreatedContract(updated);
      setContractsList(prev => prev.map(c => c.id === updated.id ? updated : c));

      // Asynchronously push to backend registry
      fetch('/api/kriti/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: updated.fullName,
          mobile: updated.phone,
          state: updated.state,
          district: updated.district,
          village: updated.villageCluster,
          modelType: updated.role,
          landAcreage: updated.proposedLandAcres || 0,
          education: updated.landOrPremisesDetails,
          panAadhaarRef: updated.aadhaarNumber,
          signatureConsent: true
        })
      }).catch(err => console.warn('[KRITI CONTRACT SYNC]', err));
    }
    setIsAgreementSigned(true);
  };

  return (
    <div id="kriti-360-faas-module" className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Sovereign Flagship Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#021810] via-[#01110B] to-[#000000] border-2 border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.18)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/40">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>KRISHI 360° (कृषि 360°) • FARMING-AS-A-SERVICE (FaaS) • 100% TRANSPARENT</span>
              </div>

              {/* Authorized Director Badge */}
              <div className="flex items-center">
                <div 
                  id="kriti-mahi-pawar-badge"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#060D17] border-2 border-[#FFD700] shadow-[0_0_24px_rgba(255,215,0,0.35)] text-white text-xs sm:text-sm font-bold tracking-wide"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FFD700] fill-[#FFD700]/20 shrink-0" />
                  <span className="font-extrabold text-white">
                    Mahi Pawar: Chief Strategic Architect & Director of Agri 360°
                  </span>
                  <Star className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700] shrink-0" />
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white font-heading tracking-tight">
                कृषि 360° (KRISHI 360° FaaS)
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
                <strong>“खेत किसान का, खेती माही की”</strong> — देश का पहला संपूर्ण <strong>FaaS (Farming-as-a-Service)</strong> मॉडल। 
                ₹0 अग्रिम लागत पर 85% किसान और 15% प्लेटफॉर्म लाभ-साझाकरण, गांव-क्लस्टर में शिक्षित युवाओं को “माही टेक एजेंट” बनाकर रोजगार, 
                और 100% बाय-बैक गारंटी के साथ ग्लोबल एक्सपोर्ट लिंकेज।
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => {
                  setSelectedRole('tech_agent');
                  setActivePhase('contracts');
                  setContractStep(1);
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 border border-emerald-300"
              >
                <FileText className="w-5 h-5 text-slate-950" />
                <span>✍️ अनुबंध हेतु आवेदन (Apply for Contract)</span>
              </button>

              <button
                onClick={() => setActivePhase('samadhan')}
                className="px-6 py-3.5 rounded-2xl bg-[#031D12] hover:bg-[#062B1C] text-emerald-300 font-bold text-sm border border-emerald-400/40 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>💬 किसान समाधान व चर्चा हब (Ask Mahi)</span>
              </button>
            </div>
          </div>

          {/* 3 Interconnected Phases Switcher Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => setActivePhase('explainer')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activePhase === 'explainer'
                  ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-black/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/30 text-emerald-300">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">चरण 1 (Phase 1)</span>
                <span className="text-sm font-black text-white">5 स्तंभ एवं कार्यप्रणाली</span>
              </div>
            </button>

            <button
              onClick={() => setActivePhase('contracts')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activePhase === 'contracts'
                  ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-black/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-teal-500/30 text-teal-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 block">चरण 2 (Phase 2)</span>
                <span className="text-sm font-black text-white">डिजिटल अनुबंध व ऑनबोर्डिंग</span>
              </div>
            </button>

            <button
              onClick={() => setActivePhase('samadhan')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activePhase === 'samadhan'
                  ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-black/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-amber-500/30 text-amber-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block">चरण 3 (Phase 3)</span>
                <span className="text-sm font-black text-white">किसान समाधान व चर्चा हब</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 1: EDUCATIONAL & MECHANISM EXPLAINER (5 CORE PILLARS & BENEFITS)     */}
      {/* ========================================================================= */}
      {activePhase === 'explainer' && (
        <div className="space-y-10 animate-in fade-in">
          
          {/* Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/30 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                CORE PILLARS OF KRISHI 360°
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                कृषि 360° के 5 आधारस्तंभ (The 5 Core Pillars)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              खेत किसान का • वैज्ञानिक प्रबंधन प्लेटफॉर्म का
            </span>
          </div>

          {/* 5 Pillars Horizontal Navigation / Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {KRITI_PILLARS_DATA.map((pillar) => {
              const isSelected = selectedPillarId === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-950/80 to-black border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-black/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs flex items-center justify-center border border-emerald-400/40">
                        0{pillar.pillarNumber}
                      </span>
                      {pillar.id === 'faas_model' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[9px]">
                          85/15 शेयर
                        </span>
                      )}
                      {(pillar.id === 'agri_entrepreneurs' || pillar.id === 'hybrid_model') && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 font-black text-[9px]">
                          अनुबंध उपलब्ध
                        </span>
                      )}
                      {pillar.id === 'export_market_linkage' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px]">
                          100% बाय-बैक
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-white leading-snug">
                      {pillar.titleHi}
                    </h4>

                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                      {pillar.taglineHi}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>विस्तार से देखें</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-emerald-300' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Detailed Spotlight */}
          {(() => {
            const activePillar = KRITI_PILLARS_DATA.find(p => p.id === selectedPillarId) || KRITI_PILLARS_DATA[0];
            return (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021A11] via-[#01120B] to-black border-2 border-emerald-500/40 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <span>स्तंभ 0{activePillar.pillarNumber}</span>
                      <span>•</span>
                      <span>{activePillar.titleEn}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {activePillar.titleHi}
                    </h3>
                    <p className="text-sm text-emerald-300 font-semibold italic">
                      {activePillar.taglineHi}
                    </p>
                  </div>

                  {/* Actions according to Pillar */}
                  {(activePillar.id === 'agri_entrepreneurs' || activePillar.id === 'hybrid_model') && (
                    <button
                      onClick={() => handleInitiateContract(activePillar.id === 'agri_entrepreneurs' ? 'tech_agent' : 'hybrid_hub')}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 shrink-0"
                    >
                      <FileText className="w-4 h-4 text-slate-950" />
                      <span>{activePillar.actionLabel || 'अनुबंध हेतु आवेदन करें'}</span>
                    </button>
                  )}

                  {activePillar.id === 'export_market_linkage' && (
                    <button
                      onClick={() => {
                        setActivePhase('samadhan');
                        handleSendSamadhanMessage('नमस्ते माही सर, मैं कृषि 360° के तहत अपनी सब्जी का 100% बाय-बैक अनुबंध करना चाहता हूँ। कृपया मुझे पूरी प्रक्रिया व न्यूनतम रकबे के बारे में बताएं।');
                      }}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950" />
                      <span>बाय-बैक सहायता डेस्क से पूछें</span>
                    </button>
                  )}
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {activePillar.summaryHi}
                </p>

                {/* Key Features Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {activePillar.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Specific Metrics / Financial Split Cards */}
                {activePillar.financialStructure && (
                  <div className="p-4 sm:p-6 rounded-2xl bg-black/70 border-2 border-emerald-400/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">किसान का शेयर (Farmer Share)</span>
                      <span className="text-lg font-black text-emerald-300 block">{activePillar.financialStructure.farmerShare}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">प्लेटफॉर्म शुल्क (Platform Share)</span>
                      <span className="text-lg font-black text-teal-300 block">{activePillar.financialStructure.platformShare}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">अग्रिम लागत (Initial Cost)</span>
                      <span className="text-lg font-black text-amber-300 block">{activePillar.financialStructure.upfrontCost}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">किसान जोखिम (Farmer Risk)</span>
                      <span className="text-lg font-black text-cyan-300 block">{activePillar.financialStructure.riskFactor}</span>
                    </div>
                  </div>
                )}

                {activePillar.commissionModel && (
                  <div className="p-4 sm:p-6 rounded-2xl bg-black/70 border-2 border-teal-400/40 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">एजेंट कमिशन मॉडल</span>
                      <span className="text-base sm:text-lg font-black text-teal-300 block">{activePillar.commissionModel.agentCommission}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">क्लस्टर पैमाना</span>
                      <span className="text-base sm:text-lg font-black text-emerald-300 block">{activePillar.commissionModel.clusterScale}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">अनुमानित मासिक आजीविका</span>
                      <span className="text-base sm:text-lg font-black text-amber-300 block">{activePillar.commissionModel.monthlyEarningEstimate}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* INTERACTIVE FaaS PROFIT-SHARING & RETURN CALCULATOR (PILAR 1 DEEP INTERACTION) */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021810] via-[#010E09] to-black border-2 border-emerald-500/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  INTERACTIVE PROFIT-SHARING SIMULATOR
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  पारंपरिक बनाम कृषि 360° FaaS मुनाफा कैलकुलेटर
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30">
                85% किसान को • 15% प्लेटफॉर्म को
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-5">
                {/* Crop Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">फसल का चयन करें:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Object.keys(CROP_CALC_DATA) as Array<keyof typeof CROP_CALC_DATA>).map((key) => {
                      const item = CROP_CALC_DATA[key];
                      const isSel = calcCrop === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setCalcCrop(key)}
                          className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center gap-2 ${
                            isSel
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black'
                              : 'bg-black/60 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="truncate">{item.name.split('(')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Acreage Slider */}
                <div className="space-y-2 bg-black/50 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">खेत का क्षेत्रफल (Land Size):</span>
                    <span className="text-emerald-400 font-black text-sm">{calcAcreage} एकड़ (Acres)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={calcAcreage}
                    onChange={(e) => setCalcAcreage(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>1 एकड़</span>
                    <span>5 एकड़</span>
                    <span>10 एकड़</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-emerald-300 block">💡 FaaS शून्य-लागत प्रतिज्ञा:</span>
                  <p>किसान से ₹0 अग्रिम लागत ली जाती है। उन्नत हाइब्रिड बीज, मल्चिंग, वैज्ञानिक न्यूट्रिएंट्स व विशेषज्ञ परामर्श प्लेटफॉर्म प्रबंधित करता है।</p>
                </div>
              </div>

              {/* Right Output Comparison Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Traditional Method */}
                <div className="p-5 rounded-3xl bg-black/60 border border-slate-800 space-y-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] uppercase">
                    पारंपरिक तरीका (High Risk)
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">कुल पारंपरिक उत्पादन:</span>
                    <h4 className="text-xl font-black text-slate-200">
                      {selectedCropStats.traditionalYieldQuintalPerAcre * calcAcreage} क्विंटल
                    </h4>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-slate-800/80 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>सकल बिक्री:</span>
                      <span className="font-semibold text-slate-300">₹{(selectedCropStats.traditionalGrossPerAcre * calcAcreage).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>किसान की लागत:</span>
                      <span className="font-semibold text-rose-400">-₹{(selectedCropStats.traditionalCostPerAcre * calcAcreage).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 block">किसान का शुद्ध मुनाफा:</span>
                    <span className="text-xl font-black text-slate-100">
                      ₹{traditionalNetProfit.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-rose-400 block pt-1">
                      ⚠️ मौसम व मंडी गिरावट का 100% जोखिम किसान पर
                    </span>
                  </div>
                </div>

                {/* Kriti 360° FaaS Method */}
                <div className="p-5 rounded-3xl bg-gradient-to-b from-emerald-950/60 to-black border-2 border-emerald-400/60 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase">
                      कृषि 360° FaaS (Zero Risk)
                    </span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-300 font-bold">वैज्ञानिक उच्चतम उत्पादन:</span>
                    <h4 className="text-xl font-black text-white">
                      {selectedCropStats.kritiFaaSYieldQuintalPerAcre * calcAcreage} क्विंटल
                    </h4>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-emerald-500/20 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>सकल एक्सपोर्ट/बाय-बैक बिक्री:</span>
                      <span className="font-bold text-white">₹{totalGrossKriti.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>अग्रिम किसान लागत:</span>
                      <span className="font-bold text-emerald-400">₹0 (Zero Initial)</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/40 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-emerald-300">किसान का 85% शुद्ध शेयर:</span>
                      <span className="text-2xl font-black text-emerald-400">
                        ₹{farmerShare85.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>प्लेटफॉर्म 15% शेयर:</span>
                      <span className="font-semibold text-teal-300">₹{platformShare15.toLocaleString()}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-[11px] font-black mt-2 text-center border border-emerald-400/30">
                      🎉 अतिरिक्त शुद्ध लाभ: +₹{extraGainFarmer.toLocaleString()} (शून्य रिस्क)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PART 2: THE WORKING MECHANISM & PROBLEM SOLVING LOGIC (DEDICATED BENEFITS) */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="border-b border-emerald-500/30 pb-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                PART 2: THE WORKING MECHANISM & PROBLEM SOLVING LOGIC
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                कृषि 360° किसान की रोजमर्रा की समस्याओं का अंत कैसे करता है?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {KRITI_PROBLEM_SOLVING_BENEFITS.map((b) => (
                <div 
                  key={b.id}
                  className="p-6 rounded-3xl bg-gradient-to-br from-[#021810] to-black border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/30">
                        {b.badge}
                      </span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>

                    <h4 className="text-lg font-black text-white leading-snug">
                      {b.titleHi}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {b.descriptionHi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span>100% सॉवरेन गारंटी</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action to Launch Phase 2 & 3 */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-black to-[#021810] border-2 border-emerald-400/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                क्या आप कृषि उद्यमी या लोकल हब शुरू करना चाहते हैं?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                अपने गांव-क्लस्टर में “माही टेक एजेंट” बनें या लोकल इनपुट फ्रेंचाइजी हब स्थापित करें। 
                डिजिटल ई-हस्ताक्षर के साथ आधिकारिक पार्टनरशिप एग्रीमेंट तुरंत जारी होता है।
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedRole('tech_agent');
                setActivePhase('contracts');
                setContractStep(1);
              }}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 shrink-0 flex items-center gap-2"
            >
              <span>उद्यमी अनुबंध शुरू करें (Phase 2)</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 2: INTERACTIVE APPLICATION & CONTRACT DIGITALIZATION WORKFLOW        */}
      {/* ========================================================================= */}
      {activePhase === 'contracts' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Header & Steps Tracker */}
          <div className="p-6 rounded-3xl bg-black/60 border border-emerald-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  PHASE 2: DIGITAL CONTRACT SIGNING & ONBOARDING WORKFLOW
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  डिजिटल अनुबंध व ऑनबोर्डिंग कार्यप्रवाह
                </h2>
              </div>
              <button
                onClick={() => setActivePhase('explainer')}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
              >
                <span>← 5 स्तंभों पर वापस जाएं</span>
              </button>
            </div>

            {/* Steps Progress Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {[
                { step: 1, label: '1. भूमिका चयन (Role)' },
                { step: 2, label: '2. ई-केवाईसी व खेत विवरण' },
                { step: 3, label: '3. परामर्श शेड्यूलिंग' },
                { step: 4, label: '4. डिजिटल अनुबंध ई-हस्ताक्षर' },
              ].map(s => (
                <div
                  key={s.step}
                  onClick={() => {
                    if (s.step <= contractStep) setContractStep(s.step as any);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer border ${
                    contractStep === s.step
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-md'
                      : contractStep > s.step
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-black/50 text-slate-500 border-slate-800'
                  }`}
                >
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: ROLE SELECTION */}
          {contractStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white text-center">
                कृपया अपने सहयोग का प्रकार (Role) चुनें:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Role 1: Tech Agent */}
                <div
                  onClick={() => {
                    setSelectedRole('tech_agent');
                    setContractStep(2);
                  }}
                  className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer group space-y-4 ${
                    selectedRole === 'tech_agent'
                      ? 'bg-gradient-to-b from-emerald-950/80 to-black border-emerald-400 shadow-2xl scale-[1.02]'
                      : 'bg-black/60 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 font-black text-xs">
                      5-10% कमिशन
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white">
                    1. कृषि उद्यमी टेक एजेंट (Mahi’s Tech Agent)
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    5 से 10 गांवों के क्लस्टर में स्थानीय शिक्षित युवाओं के लिए। डिजिटल ऐप, सॉइल टेस्टिंग किट और मौसम सलाह देकर किसानों की मदद करें तथा इनपुट्स व फसल बिक्री पर 5% से 10% स्थायी कमिशन अर्जित करें।
                  </p>

                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>गांव में रहकर ₹25,000 - ₹50,000+ प्रतिमाह आय</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>माही पवार द्वारा प्रत्यक्ष डिजिटल प्रशिक्षण व किट</span>
                    </li>
                  </ul>

                  <button className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2">
                    <span>टेक एजेंट अनुबंध चुनें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Role 2: Hybrid Hub */}
                <div
                  onClick={() => {
                    setSelectedRole('hybrid_hub');
                    setContractStep(2);
                  }}
                  className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer group space-y-4 ${
                    selectedRole === 'hybrid_hub'
                      ? 'bg-gradient-to-b from-teal-950/80 to-black border-teal-400 shadow-2xl scale-[1.02]'
                      : 'bg-black/60 border-slate-800 hover:border-teal-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 group-hover:scale-110 transition-transform">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-teal-400 text-slate-950 font-black text-xs">
                      फ्रेंचाइजी केंद्र
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white">
                    2. लोकल हाइब्रिड इनपुट हब (Local Branded Hub)
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    ब्लॉक या तहसील स्तर पर छोटा ब्रांडेड केंद्र स्थापित करें। किसानों को सिंगापुर/चीन ग्रेड के किफायती टूल्स, मल्चिंग पेपर, ड्रिप किट व हाइब्रिड बीज उपलब्ध कराएं तथा कम्युनिटी मशीनरी रेंटल संचालित करें।
                  </p>

                  <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>स्थानीय इनपुट सप्लायर व कस्टम हायरिंग का अधिकार</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>बाय-बैक एवं कोल्ड-चेन एकत्रीकरण केंद्र</span>
                    </li>
                  </ul>

                  <button className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2">
                    <span>लोकल हब अनुबंध चुनें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: IN-APP KYC & LOCATION/LAND DETAILS */}
          {contractStep === 2 && (
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021810] to-black border-2 border-emerald-500/40 space-y-6">
              <div className="border-b border-emerald-500/20 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">कदम 2 / Step 2</span>
                <h3 className="text-xl font-black text-white">
                  आवेदक ई-केवाईसी (e-KYC) एवं क्षेत्र/भूमि विवरण
                </h3>
                <p className="text-xs text-slate-300">
                  चुनी गई भूमिका: <strong>{selectedRole === 'tech_agent' ? 'कृषि उद्यमी टेक एजेंट' : 'लोकल हाइब्रिड इनपुट हब'}</strong>
                </p>
              </div>

              <form onSubmit={handleCompleteKYC} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">पूरा नाम (आधार अनुसार)*</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. अमित कुमार मौर्य"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">मोबाइल नंबर (OTP सत्यापन)*</label>
                    <input
                      type="tel"
                      required
                      placeholder="10 अंकों का फोन नंबर"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">12 अंकों की आधार संख्या (UIDAI Masked)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. 4589 1234 5678"
                    value={applicantAadhaar}
                    onChange={(e) => setApplicantAadhaar(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">UIDAI सर्वर से इन-ऐप तत्काल बायोमेट्रिक/OTP ई-केवाईसी सत्यापन होगा।</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">राज्य (State)*</label>
                    <select
                      value={applicantState}
                      onChange={(e) => setApplicantState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    >
                      {['उत्तर प्रदेश', 'मध्य प्रदेश', 'बिहार', 'राजस्थान', 'महाराष्ट्र', 'हरियाणा', 'पंजाब', 'गुजरात', 'छत्तीसगढ़', 'अन्य अखिल भारतीय राज्य'].map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">जिला (District)*</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. वाराणसी / प्रयागराज / इंदौर"
                      value={applicantDistrict}
                      onChange={(e) => setApplicantDistrict(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">ग्राम क्लस्टर / प्रस्तावित गांव (5-10 गांव)*</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. पिंडरा क्लस्टर (गांव 1, गांव 2, गांव 3...)"
                    value={applicantVillageCluster}
                    onChange={(e) => setApplicantVillageCluster(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">उपलब्ध भूमि / कार्यालय परिसर विवरण</label>
                  <textarea
                    rows={2}
                    placeholder="उदा. 2 एकड़ पैतृक सिंचित भूमि / मुख्य मार्ग पर 800 वर्गफीट गोदाम परिसर"
                    value={applicantLandDetails}
                    onChange={(e) => setApplicantLandDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setContractStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    पीछे
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <span>ई-केवाईसी सत्यापित करें व आगे बढ़ें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: CONSULTATION SCHEDULING */}
          {contractStep === 3 && (
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021810] to-black border-2 border-emerald-500/40 space-y-6">
              <div className="border-b border-emerald-500/20 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">कदम 3 / Step 3</span>
                <h3 className="text-xl font-black text-white">
                  स्वचालित डिजिटल/भौतिक परामर्श शेड्यूलिंग
                </h3>
                <p className="text-xs text-slate-300">
                  अनुबंध निष्पादन से पूर्व तकनीकी टीम एवं माही पवार परामर्श डेस्क से समय निर्धारित करें।
                </p>
              </div>

              <div className="space-y-4">
                {/* Consultation Mode */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">परामर्श का माध्यम (Consultation Mode):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'video_call', label: '📹 वीडियो कॉन्फ्रेंसिंग', desc: 'Google Meet / इन-ऐप वीडियो' },
                      { id: 'hub_visit', label: '🏛️ स्थानीय हब विज़िट', desc: 'निकटतम अधिकृत केंद्र पर' },
                      { id: 'on_field_visit', label: '🌾 ऑन-फील्ड फॉर्म विज़िट', desc: 'कृषि वैज्ञानिक खेत पर आएंगे' }
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setConsultationMode(m.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          consultationMode === m.id
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                            : 'bg-black/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-black block">{m.label}</span>
                        <span className="text-[10px] opacity-80 block pt-0.5">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">परामर्श तिथि (Preferred Date)</label>
                    <input
                      type="date"
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">समय स्लॉट (Time Slot)</label>
                    <select
                      value={consultationSlot}
                      onChange={(e) => setConsultationSlot(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                    >
                      {['10:00 AM - 11:30 AM', '11:30 AM - 01:00 PM', '02:00 PM - 03:30 PM', '04:00 PM - 05:30 PM'].map(sl => (
                        <option key={sl} value={sl}>{sl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 block">ऑटोमेटेड कंसल्टेशन पास:</span>
                    <p>
                      तिथि व स्लॉट तय होने पर डिजिटल पार्टनरशिप अनुबंध का आधिकारिक ड्राफ्ट स्वतः जनरेट हो जाएगा, जिसे आप डिजिटल साइन कर सकते हैं।
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setContractStep(2)}
                    className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    पीछे
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateAgreement}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <span>डिजिटल अनुबंध तैयार करें (Generate Contract)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GENERATED CONTRACT AGREEMENT & E-SIGNATURE PAD */}
          {contractStep === 4 && activeCreatedContract && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Official Agreement Certificate Paper Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-[#08120B] border-4 border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.25)] relative text-slate-100 space-y-6 font-serif">
                
                {/* Header Seal */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-emerald-500/40 pb-6 gap-4">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-sans font-black tracking-widest text-emerald-400 uppercase">
                      GOVERNMENT RECOGNIZED AGRITECH ALLIANCE • JITOMNI SOVEREIGN PLATFORM
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      कृषि 360° आधिकारिक साझेदारी अनुबंध
                    </h2>
                    <span className="text-xs font-sans text-slate-400 block">
                      KRISHI 360° DIGITAL PARTNERSHIP CONTRACT AGREEMENT
                    </span>
                  </div>

                  <div className="text-center sm:text-right font-sans">
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-400/40 inline-block">
                      अनुबंध क्र.: {activeCreatedContract.agreementNumber}
                    </div>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      दिनांक: {new Date().toLocaleDateString('hi-IN')}
                    </span>
                  </div>
                </div>

                {/* Authorized Signatory Authority Header */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-[#FFD700]/40 flex items-center justify-between font-sans">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-xs font-bold text-white">
                      अधिकृत प्राधिकारी: <strong>Mahi Pawar</strong> (Chief Strategic Architect & Director of Agri 360°)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFD700] text-slate-950 font-black text-[10px]">
                    सत्यापित प्राधिकृत
                  </span>
                </div>

                {/* Parties Details */}
                <div className="font-sans text-xs space-y-3 bg-black/40 p-4 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block">प्रथम पक्ष (Platform):</span>
                      <strong className="text-emerald-300">कृषि 360° / FaaS Agri-Tech Network</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">द्वितीय पक्ष (आवेदक / उद्यमी):</span>
                      <strong className="text-white">{activeCreatedContract.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">सहयोग भूमिका:</span>
                      <span className="text-white font-bold">
                        {activeCreatedContract.role === 'tech_agent' ? 'कृषि उद्यमी टेक एजेंट (Mahi’s Tech Agent)' : 'लोकल हाइब्रिड इनपुट हब (Branded Hub)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">सत्यापित आधार / मोबाइल:</span>
                      <span className="text-white font-mono">{activeCreatedContract.aadhaarNumber} • {activeCreatedContract.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">अधिकार क्षेत्र / क्लस्टर:</span>
                      <span className="text-white font-bold">{activeCreatedContract.villageCluster} ({activeCreatedContract.district}, {activeCreatedContract.state})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">शेड्यूल परामर्श समय:</span>
                      <span className="text-emerald-300 font-bold">{activeCreatedContract.consultationDate} ({activeCreatedContract.consultationSlot})</span>
                    </div>
                  </div>
                </div>

                {/* Core Contract Terms */}
                <div className="font-sans text-xs space-y-2 text-slate-300 leading-relaxed">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
                    अनुबंध की मुख्य शर्तें एवं प्रतिज्ञाएं (Terms & Covenants):
                  </h4>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li>
                      <strong>शून्य वित्तीय जोखिम (Zero Financial Risk):</strong> किसान अथवा स्थानीय उद्यमी से कोई अग्रिम लागत नहीं ली जाएगी। 85% अतिरिक्त शुद्ध मुनाफा किसान को एवं 5% से 10% कमिशन एजेंट को देय होगा।
                    </li>
                    <li>
                      <strong>बाय-बैक गारंटी (100% Buy-Back Pledge):</strong> उत्पादित सभी ए-ग्रेड फसलों को पूर्व-निर्धारित पारदर्शी दरों पर सीधे खेत से उठाने की गारंटी प्रथम पक्ष की होगी।
                    </li>
                    <li>
                      <strong>पारदर्शिता व डिजिटल लॉग:</strong> प्रत्येक गांव के खेतों का सॉइल टेस्ट, फसल स्वास्थ्य एवं ड्रोन स्प्रे डेटा कृषि 360° मोबाइल ऐप पर निरंतर अपडेट रखा जाएगा।
                    </li>
                  </ol>
                </div>

                {/* Digital Signature Box */}
                <div className="pt-4 border-t-2 border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
                  {/* Left: Platform Director Seal */}
                  <div className="text-center sm:text-left space-y-1">
                    <div className="p-3 rounded-2xl bg-black/60 border border-emerald-400/40 inline-block text-center">
                      <div className="font-serif italic font-bold text-emerald-400 text-sm">
                        Mahi Pawar
                      </div>
                      <span className="text-[9px] text-slate-400 block">Digital Certificate Authority</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      निदेशक, कृषि 360° (ई-प्रमाणित डिजिटल सील)
                    </span>
                  </div>

                  {/* Right: Applicant Digital e-Sign */}
                  <div className="w-full sm:w-auto text-center sm:text-right space-y-2">
                    {isAgreementSigned ? (
                      <div className="p-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 space-y-1">
                        <div className="flex items-center justify-center sm:justify-end gap-1 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>सफलतापूर्वक ई-हस्ताक्षरित (e-Signed)</span>
                        </div>
                        <span className="font-serif italic text-base font-black text-white block">
                          {signatureText}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block">
                          {activeCreatedContract.digitalSignatureHash}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 block">
                          डिजिटल ई-हस्ताक्षर (अपना नाम टाइप करें):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="पूरा नाम दर्ज करें"
                            value={signatureText}
                            onChange={(e) => setSignatureText(e.target.value)}
                            className="px-3 py-2 rounded-xl bg-black border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleSignAgreement}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs hover:scale-105 transition-all shrink-0"
                          >
                            ई-हस्ताक्षर करें
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-between items-center gap-3">
                <button
                  onClick={() => setContractStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  नया अनुबंध शुरू करें
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 hover:bg-emerald-950/40"
                  >
                    <Download className="w-4 h-4" />
                    <span>अनुबंध डाउनलोड / प्रिंट करें</span>
                  </button>

                  <button
                    onClick={() => setActivePhase('samadhan')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2"
                  >
                    <span>समाधान हब पर जाएं</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List of Previous Contracts in System */}
          <div className="space-y-3 pt-6 border-t border-slate-800">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>प्लेटफॉर्म पर जारी हालिया अनुबंध रिकॉर्ड्स (Contract Registry)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contractsList.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-400">{c.agreementNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      c.status === 'signed_active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                    }`}>
                      {c.status === 'signed_active' ? '✓ हस्ताक्षरित व सक्रिय' : 'लंबित ई-हस्ताक्षर'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-bold">{c.fullName}</span>
                    <span className="text-slate-400">{c.role === 'tech_agent' ? 'उद्यमी टेक एजेंट' : 'लोकल हब'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    क्षेत्र: {c.villageCluster} • {c.district}, {c.state}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 3: KISAN SAMADHAN & DISCUSSION CHAT HUB (DIRECT WITH MAHI PAWAR)     */}
      {/* ========================================================================= */}
      {activePhase === 'samadhan' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Header */}
          <div className="p-6 rounded-3xl bg-black/60 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-400/40">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>PHASE 3: DIRECT RESOLUTION & EXPERT DESK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                किसान समाधान व चर्चा हब (Kisan Samadhan Hub)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                फसल में बीमारी, कीट, पोषण, जैविक उपचार या 100% बाय-बैक संबंधी कोई भी प्रश्न <strong>फोटो अपलोड करके</strong> या <strong>बोलकर (Voice Note)</strong> सीधे माही पवार व केंद्रीय विशेषज्ञ डेस्क से पूछें।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#060D17] border border-[#FFD700]/50 text-xs shrink-0 space-y-1">
              <span className="font-bold text-[#FFD700] block">⚡ लाइव विशेषज्ञ डेस्क:</span>
              <span className="text-slate-300 text-[11px] block">Mahi Pawar Verified Team</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] block text-center">
                ● डेस्क ऑनलाइन सक्रिय
              </span>
            </div>
          </div>

          {/* Preset Common Dilemmas Quick Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 block">त्वरित समाधान हेतु सामान्य प्रश्न (Quick Presets):</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {PRESET_DILEMMAS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleSendSamadhanMessage(d.text, undefined, d.tag)}
                  className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{d.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log Container */}
          <div className="p-4 sm:p-6 rounded-3xl bg-black/80 border-2 border-emerald-500/30 min-h-[450px] max-h-[600px] overflow-y-auto space-y-4">
            {chatMessages.map((msg) => {
              const isFarmer = msg.sender === 'farmer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isFarmer ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                    <span className="font-bold text-slate-300">{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                    {msg.cropTag && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 font-semibold">
                        {msg.cropTag}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-3xl max-w-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                      isFarmer
                        ? 'bg-gradient-to-r from-emerald-900/70 to-emerald-950/90 text-white rounded-br-sm border border-emerald-500/40'
                        : 'bg-gradient-to-br from-[#041B12] via-[#02130C] to-black text-slate-100 rounded-bl-sm border-2 border-[#FFD700]/50 shadow-xl'
                    }`}
                  >
                    {!isFarmer && (
                      <div className="flex items-center gap-2 pb-2 border-b border-[#FFD700]/20 text-xs font-bold text-[#FFD700]">
                        <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                        <span>Mahi Pawar (Chief Strategic Architect)</span>
                      </div>
                    )}

                    {/* Render Image if attached */}
                    {msg.imageUrl && (
                      <div className="relative rounded-2xl overflow-hidden border border-emerald-400/40 max-h-60">
                        <img 
                          src={msg.imageUrl} 
                          alt="फसल रोग फोटो" 
                          className="w-full h-auto object-cover" 
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-white font-mono">
                          फसल रोग फोटो (Leaf Sample)
                        </span>
                      </div>
                    )}

                    {/* Render Voice Note indicator if present */}
                    {msg.voiceNoteUrl && (
                      <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-400/40 flex items-center gap-3 text-xs">
                        <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-300 block">वॉयस नोट (स्थानीय बोली में प्रश्न)</span>
                          <span className="text-[10px] text-slate-400">अवधि: {msg.voiceDurationSeconds || 6} सेकंड • स्पष्ट ऑडियो ट्रांसक्रिप्ट</span>
                        </div>
                      </div>
                    )}

                    <p className="whitespace-pre-line">
                      {msg.text}
                    </p>

                    {!isFarmer && (
                      <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="text-emerald-400 font-bold">✓ केंद्रीय विशेषज्ञ डेस्क द्वारा निस्तारित</span>
                        <span className="font-mono">सत्यापित परामर्श</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Simulated Live Typing Indicator */}
            {isExpertResponding && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#041B12] border border-[#FFD700]/30 text-xs text-amber-300 w-fit animate-pulse">
                <Bot className="w-4 h-4 animate-spin" />
                <span>माही पवार एवं विशेषज्ञ डेस्क आपके प्रश्न और फसल फोटो का विश्लेषण कर रहे हैं...</span>
              </div>
            )}
          </div>

          {/* Active Image Attachment Preview Bar */}
          {uploadedImagePreview && (
            <div className="p-3 rounded-2xl bg-black/80 border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={uploadedImagePreview} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-emerald-400" />
                <span className="text-xs font-bold text-white">फसल फोटो संलग्न की गई (Leaf Inspection Attached)</span>
              </div>
              <button
                onClick={() => setUploadedImagePreview(null)}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold px-3 py-1"
              >
                हटाएं ✕
              </button>
            </div>
          )}

          {/* Active Voice Recording Bar */}
          {isRecordingVoice && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500 text-xs text-white flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2 font-bold">
                <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>बोलकर पूछें (अपनी स्थानीय बोली में बोलें)... {recordingSeconds}s / 6s</span>
              </div>
              <button
                onClick={toggleVoiceRecording}
                className="px-3 py-1 rounded-xl bg-rose-500 text-white font-bold text-xs"
              >
                रिकॉर्डिंग समाप्त करें ✓
              </button>
            </div>
          )}

          {hasVoiceNote && !isRecordingVoice && (
            <div className="p-3 rounded-2xl bg-black/80 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-emerald-400" />
                <span>वॉयस नोट तैयार है ({recordingSeconds || 6}s)</span>
              </div>
              <button
                onClick={() => { setHasVoiceNote(false); setRecordingSeconds(0); }}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold"
              >
                हटाएं ✕
              </button>
            </div>
          )}

          {/* Multimodal Input Form */}
          <div className="p-4 rounded-3xl bg-black/90 border border-emerald-500/40 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendSamadhanMessage();
                }}
                placeholder="फसल में बीमारी, दवा की सही मात्रा या बाय-बैक संबंधी सवाल यहाँ लिखें..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-white text-xs sm:text-sm focus:border-emerald-400 focus:outline-none"
              />

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              {/* Upload Image Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="रोगग्रस्त पत्ती/फसल की फोटो अपलोड करें"
                className="p-3 rounded-2xl bg-black/60 border border-slate-700 hover:border-emerald-400 text-emerald-400 hover:scale-105 transition-all"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              {/* Voice Note Button */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                title="बोलकर पूछें (Voice Note)"
                className={`p-3 rounded-2xl border transition-all ${
                  isRecordingVoice
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-black/60 border-slate-700 hover:border-emerald-400 text-emerald-400 hover:scale-105'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendSamadhanMessage()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:scale-105 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <span>भेजें</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1">
              <span>🌾 <strong>मल्टीमॉडल इनपुट:</strong> टेक्स्ट, फोटो अपलोड अथवा एक-टैप वॉयस नोट।</span>
              <span className="text-emerald-400 font-bold">24x7 सॉवरेन किसान हेल्पलाइन</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
