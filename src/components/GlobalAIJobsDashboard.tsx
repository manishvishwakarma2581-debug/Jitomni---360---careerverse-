import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  DollarSign, 
  Laptop, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  ExternalLink, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  Zap, 
  Clock, 
  Layers, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Video, 
  Mic, 
  FileText, 
  Code2, 
  Coins, 
  Calendar, 
  Compass, 
  HelpCircle, 
  CreditCard, 
  Send, 
  RefreshCw, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { 
  Language, 
  GlobalAIJobCard, 
  QualificationRoadmap, 
  AIToolItem, 
  RemoteLiveVacancy 
} from '../types';
import { SingaporeGlobalTechHub } from './SingaporeGlobalTechHub';

interface GlobalAIJobsDashboardProps {
  lang: Language;
}

export const GlobalAIJobsDashboard: React.FC<GlobalAIJobsDashboardProps> = ({ lang }) => {
  const [activeSection, setActiveSection] = useState<'job_types' | 'roadmaps' | 'tools_lab' | 'freelancing_masterclass' | 'live_vacancies' | 'singapore_hub'>('singapore_hub');
  const [qualificationFilter, setQualificationFilter] = useState<'10th Pass' | '12th Pass' | 'Graduate'>('12th Pass');
  const [activeRoadmapDay, setActiveRoadmapDay] = useState<number>(1);
  const [activeToolCategory, setActiveToolCategory] = useState<string>('all');
  const [liveJobs, setLiveJobs] = useState<RemoteLiveVacancy[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProposalRole, setSelectedProposalRole] = useState<string>('AI Prompt Engineer');
  const [copiedProposal, setCopiedProposal] = useState<boolean>(false);

  // SECTION 1: Standard Global AI Jobs Data
  const globalJobCards: GlobalAIJobCard[] = [
    {
      id: 'job-1',
      title: 'AI Prompt Engineer',
      icon: '🧠',
      hourlyDollar: 25,
      hourlyRupee: 2087,
      monthlyEstimateRupee: '₹2.5 लाख - ₹5 लाख / महीना',
      qualificationLevel: 'Graduate',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Easy (Beginner)',
      descriptionHindi: 'AI टूल्स (ChatGPT, Claude, Gemini) को सटीक कमांड और प्रॉम्प्ट देकर कंपनियों के लिए डेटा, कोड और रिपोर्ट तैयार करना। किसी कोडिंग की जरूरत नहीं।',
      descriptionEnglish: 'Craft high-converting prompts and instructions for LLMs to generate automated business reports and copy without writing code.',
      skillsNeeded: ['Smart Questioning', 'Logic & Problem Solving', 'English Basics', 'ChatGPT Advanced Prompting'],
      recommendedTools: ['ChatGPT Plus', 'Claude 3.5', 'Notion AI', 'Midjourney'],
      topHiringPlatforms: ['Upwork', 'Outlier AI', 'Fiverr', 'Turing'],
      firstOrderDays: 5
    },
    {
      id: 'job-2',
      title: 'Data Entry & AI Data Labeling',
      icon: '📊',
      hourlyDollar: 15,
      hourlyRupee: 1252,
      monthlyEstimateRupee: '₹1.5 लाख - ₹2.5 लाख / महीना',
      qualificationLevel: '10th Pass',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Easy (Beginner)',
      descriptionHindi: 'AI मॉडल्स को ट्रेन करने के लिए टेक्स्ट, फोटो और ऑडियो डेटा को लेबल करना और एक्सेल में एंट्री करना। 10वीं पास छात्रों के लिए सबसे आसान एंट्री।',
      descriptionEnglish: 'Label, classify, and clean datasets for machine learning companies and execute high-speed spreadsheet data management.',
      skillsNeeded: ['Typing Speed (30+ WPM)', 'Attention to Detail', 'Google Sheets', 'Basic English'],
      recommendedTools: ['Google Sheets', 'Appen', 'Remotasks', 'Scale AI'],
      topHiringPlatforms: ['Appen Global', 'Remotasks', 'Freelancer.com', 'Clickworker'],
      firstOrderDays: 3
    },
    {
      id: 'job-3',
      title: 'ChatGPT & Content Automation Specialist',
      icon: '✍️',
      hourlyDollar: 20,
      hourlyRupee: 1670,
      monthlyEstimateRupee: '₹2 लाख - ₹3.8 लाख / महीना',
      qualificationLevel: '12th Pass',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Easy (Beginner)',
      descriptionHindi: 'विदेशी कंपनियों और ब्लॉगर्स के लिए AI से 10 मिनट में 2000 शब्दों के SEO ब्लॉग, ईमेल न्यूज़लेटर और सोशल मीडिया पोस्ट ऑटोमेशन बनाना।',
      descriptionEnglish: 'Automate long-form SEO blog writing, email campaigns, and social media posting using AI pipelines.',
      skillsNeeded: ['Content Ideation', 'Grammar Check', 'SEO Keywords Basics', 'Zapier Automation'],
      recommendedTools: ['ChatGPT', 'Jasper AI', 'Notion AI', 'Grammarly'],
      topHiringPlatforms: ['Upwork', 'Fiverr', 'LinkedIn Remote', 'ProBlogger'],
      firstOrderDays: 4
    },
    {
      id: 'job-4',
      title: 'AI Video Editor & Faceless Channels (CapCut, Pictory)',
      icon: '🎬',
      hourlyDollar: 30,
      hourlyRupee: 2505,
      monthlyEstimateRupee: '₹3 लाख - ₹6.5 लाख / महीना',
      qualificationLevel: '12th Pass',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Medium',
      descriptionHindi: 'YouTube Shorts, Instagram Reels और TikTok के लिए AI से ऑटो-कैप्शन, B-Roll क्लिप्स और वॉयसओवर जोड़कर वायरल वीडियो एडिट करना।',
      descriptionEnglish: 'Create high-engagement vertical short-form reels with automated captions, sound effects, and B-rolls for creators.',
      skillsNeeded: ['CapCut Video Timing', 'Sound FX Mixing', 'Viral Hook Writing', 'Subtitles Animation'],
      recommendedTools: ['CapCut Desktop', 'Pictory AI', 'Opus Clip', 'ElevenLabs'],
      topHiringPlatforms: ['Fiverr Pro', 'Upwork', 'Twitter/X DM Outreach', 'YouTube Creator Agencies'],
      firstOrderDays: 3
    },
    {
      id: 'job-5',
      title: 'Voice Over & AI Audio Dubbing Specialist',
      icon: '🎙️',
      hourlyDollar: 18,
      hourlyRupee: 1503,
      monthlyEstimateRupee: '₹1.8 लाख - ₹3.2 लाख / महीना',
      qualificationLevel: '10th Pass',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Easy (Beginner)',
      descriptionHindi: 'ElevenLabs और AI वॉयस टूल्स से विदेशी पॉडकास्ट, ई-लर्निंग कोर्स और ऑडियोबुक्स को हिंदी और 20+ भाषाओं में डब व क्लोन करना।',
      descriptionEnglish: 'Generate human-like voiceovers and multilingual audio dubs for audiobooks, explainer videos, and corporate tutorials.',
      skillsNeeded: ['Clear Pronunciation', 'Audio Noise Removal', 'ElevenLabs Tuning', 'Audacity Basics'],
      recommendedTools: ['ElevenLabs', 'Audacity', 'Lovo AI', 'Descript'],
      topHiringPlatforms: ['Voices.com', 'Fiverr', 'Upwork', 'ACX (Amazon Audiobooks)'],
      firstOrderDays: 4
    },
    {
      id: 'job-6',
      title: 'AI-Powered Virtual Assistant (VA)',
      icon: '💼',
      hourlyDollar: 22,
      hourlyRupee: 1837,
      monthlyEstimateRupee: '₹2.2 लाख - ₹4.2 लाख / महीना',
      qualificationLevel: '12th Pass',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Easy (Beginner)',
      descriptionHindi: 'विदेशी बिज़नेस ओनर्स के ईमेल मैनेज करना, AI से मीटिंग के नोट्स बनाना, कैलेंडर शेड्यूल करना और कस्टमर सपोर्ट चैट संभालना।',
      descriptionEnglish: 'Provide high-efficiency remote executive assistance with AI-assisted email triage, calendar scheduling, and CRM management.',
      skillsNeeded: ['Professional Email Writing', 'Google Calendar', 'Slack / Zoom', 'Quick Problem Solving'],
      recommendedTools: ['ChatGPT', 'Zapier', 'Notion', 'Calendly', 'Canva'],
      topHiringPlatforms: ['Upwork', 'OnlineJobs.ph', 'Virtual Assistant Talent', 'LinkedIn'],
      firstOrderDays: 6
    },
    {
      id: 'job-7',
      title: 'No-Code Website & Landing Page Builder (Framer, Wix AI)',
      icon: '🌐',
      hourlyDollar: 35,
      hourlyRupee: 2922,
      monthlyEstimateRupee: '₹3.5 लाख - ₹8 लाख / महीना',
      qualificationLevel: 'Graduate',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Medium',
      descriptionHindi: 'Framer AI और Wix Studio से बिना 1 लाइन कोडिंग लिखे 1 घंटे में सुंदर, मोबाइल-फ्रेंडली वेबसाइट्स बनाकर $300-$1000 प्रति वेबसाइट चार्ज करना।',
      descriptionEnglish: 'Build stunning, ultra-fast landing pages and business sites in hours with AI builders like Framer and Webflow.',
      skillsNeeded: ['Visual Layout Sense', 'Color Pairing', 'Framer AI Basics', 'Domain & Hosting Setup'],
      recommendedTools: ['Framer AI', 'Wix Studio', 'Relume AI', 'Canva'],
      topHiringPlatforms: ['Framer Community', 'Upwork', 'Fiverr Web Design', 'Direct Local Agency'],
      firstOrderDays: 7
    },
    {
      id: 'job-8',
      title: 'Global Freelancing Consultant (Upwork & Fiverr)',
      icon: '🏆',
      hourlyDollar: 40,
      hourlyRupee: 3340,
      monthlyEstimateRupee: '₹4 लाख - ₹10 लाख / महीना',
      qualificationLevel: 'Graduate',
      noCodingRequired: true,
      workFromHome: true,
      difficulty: 'Advanced',
      descriptionHindi: 'अमेरिका, दुबई, यूके के क्लाइंट्स को मल्टीपल AI सर्विसेज (कंटेंट + डिजाइन + वीडियो) का पैकेज सेल करना और डॉलर में बड़ी कमाई करना।',
      descriptionEnglish: 'Package multiple AI services into high-ticket monthly retainers for clients in the US, UK, and UAE.',
      skillsNeeded: ['Proposal Pitching', 'Client Closing', 'Payoneer Setup', 'Project Delivery'],
      recommendedTools: ['Upwork Plus', 'Fiverr Pro', 'Loom Video Pitch', 'Wise / Payoneer'],
      topHiringPlatforms: ['Upwork Enterprise', 'Fiverr Pro', 'LinkedIn Cold Outreach', 'Contra'],
      firstOrderDays: 7
    }
  ];

  // SECTION 2: 7-Day Roadmaps by Qualification
  const qualificationRoadmaps: Record<'10th Pass' | '12th Pass' | 'Graduate', QualificationRoadmap> = {
    '10th Pass': {
      qualification: '10th Pass',
      suitableRoles: ['Data Entry & Labeling ($15/hr)', 'AI Voice Dubbing ($18/hr)', 'Image Background Remover & Editor ($12/hr)'],
      summary: '10वीं पास छात्र बिना अंग्रेजी में कठिन ग्रामर या कोडिंग के, सीधे डेटा लेबलिंग, ऑडियो क्लोनिंग और इमेज टूल्स से डॉलर कमाना शुरू कर सकते हैं।',
      roadmap: [
        {
          day: 1,
          title: 'Day 1: AI Data Labeling & Google Sheets मास्टरी',
          objective: 'Google Sheets में 40 WPM टाइपिंग और AI डेटा क्लासिफिकेशन नियम सीखना।',
          actionItems: ['Google Sheets पर फ्री प्रैक्टिस शीट बनाएं', 'Appen और Remotasks पर फ्री अकाउंट रजिस्टर करें', '50 इमेज और टेक्स्ट लेबल्स का मॉक टेस्ट पूरा करें'],
          estimatedHours: '2 घंटे',
          outcome: 'डेटा एंट्री की बेसिक स्पीड और एक्यूरेसी तैयार'
        },
        {
          day: 2,
          title: 'Day 2: ElevenLabs वॉइस AI टूल सीखना',
          objective: 'फ्री में किसी भी टेक्स्ट को रियलिस्टिक ह्यूमन आवाज में बदलना और ऑडियो फाइल डाउनलोड करना।',
          actionItems: ['ElevenLabs.io पर फ्री अकाउंट बनाएं', 'हिंदी और अंग्रेजी में 5 अलग-अलग वॉइस सैंपल्स बनाएं', 'Audacity (फ्री सॉफ्टवेयर) में बैकग्राउंड नॉइज़ हटाना सीखें'],
          estimatedHours: '2.5 घंटे',
          outcome: '5 प्रोफेशनल वॉइस-ओवर MP3 डेमो सैंपल्स तैयार'
        },
        {
          day: 3,
          title: 'Day 3: Canva AI इमेज क्लीनअप & बैकग्राउंड रिमूव',
          objective: 'ई-कॉमर्स प्रोडक्ट्स की फोटो से 1 क्लिक में बैकग्राउंड हटाना और वाइट बैकग्राउंड सेट करना।',
          actionItems: ['Canva.com पर Magic Studio AI टूल्स चलाएं', 'Amazon/Flipkart जैसे 10 प्रोडक्ट इमेजेस एडिट करें', 'पोर्टफोलियो के लिए "Before / After" फोटो ग्रिड बनाएं'],
          estimatedHours: '2 घंटे',
          outcome: 'ई-कॉमर्स फोटो एडिटिंग पोर्टफोलियो रेडी'
        },
        {
          day: 4,
          title: 'Day 4: Fiverr पर पहला Gig बनाना (100% फ्री)',
          objective: 'Fiverr.com पर 3 अट्रैक्टिव गिग्स पब्लिश करना।',
          actionItems: ['Fiverr सेलर प्रोफाइल बनाएं (Professional Photo + Bio)', 'Gig 1: "I will do accurate AI Data Entry & Labeling in 24 Hours"', 'Gig 2: "I will generate AI Voice Over in Indian English & Hindi"'],
          estimatedHours: '3 घंटे',
          outcome: 'Fiverr पर गिग्स लाइव और पूरी दुनिया को दृश्यमान'
        },
        {
          day: 5,
          title: 'Day 5: Upwork पर प्रोफाइल & पहला $10 प्रपोजल',
          objective: 'Upwork पर 100% कम्प्लीट प्रोफाइल और फ्री कनेक्ट्स से 2 जॉब्स पर अप्लाई करना।',
          actionItems: ['Upwork.com पर फ्री अकाउंट और स्किल्स टैग्स जोड़ें', 'JITOMNI प्रपोजल टेम्प्लेट कॉपी करके क्लाइंट को भेजें', 'सैंपल वर्क गूगल ड्राइव लिंक अटैच करें'],
          estimatedHours: '2.5 घंटे',
          outcome: 'पहला इंटरनेशनल जॉब एप्लीकेशन सबमिट'
        },
        {
          day: 6,
          title: 'Day 6: Payoneer बैंक अकाउंट सेटअप (डॉलर से रुपया)',
          objective: 'विदेश से आने वाले डॉलर को सीधे अपने भारतीय बैंक (SBI, HDFC, PNB आदि) में ट्रांसफर करने का सेटअप।',
          actionItems: ['Payoneer.com पर फ्री अकाउंट बनाएं (PAN + Bank A/C लिंक करें)', 'Fiverr और Upwork से Payoneer विथड्रॉल कनेक्ट करें'],
          estimatedHours: '1.5 घंटे',
          outcome: 'पेमेंट गेटवे 100% एक्टिव (0% रिस्क)'
        },
        {
          day: 7,
          title: 'Day 7: फर्स्ट क्लाइंट चैट & वर्क डिलीवरी प्रोटोकॉल',
          objective: 'क्लाइंट के मैसेज का 5 मिनट में जवाब देना और 5-स्टार रेटिंग लेना।',
          actionItems: ['फोन में Fiverr & Upwork App डाउनलोड करके नोटिफिकेशन On रखें', 'ChatGPT से क्लाइंट रिप्लाई ड्राफ्ट करने का सीक्रेट प्रॉम्प्ट सेव करें', 'रिव्यू मांगने का पोलाइट मैसेज टेम्प्लेट तैयार रखें'],
          estimatedHours: '2 घंटे',
          outcome: 'फर्स्ट अर्निंग और 5-स्टार रेटिंग के लिए तैयार'
        }
      ]
    },
    '12th Pass': {
      qualification: '12th Pass',
      suitableRoles: ['AI Video Editor (CapCut/Pictory) ($30/hr)', 'ChatGPT Content Automation ($20/hr)', 'AI Virtual Assistant ($22/hr)'],
      summary: '12वीं पास छात्रों के पास सबसे ज्यादा हाई-डिमांड क्रिएटिव रोल्स हैं—शॉर्ट-फॉर्म वीडियो एडिटिंग और कंटेंट राइटिंग में विदेशी क्लाइंट्स तुरंत $20-$35 प्रति घंटा देते हैं।',
      roadmap: [
        {
          day: 1,
          title: 'Day 1: CapCut AI & वायरल शॉर्ट्स एडिटिंग',
          objective: 'YouTube Shorts और Reels के लिए 9:16 रेश्यो में ऑटो-कैप्शन और ज़ूम इफेक्ट्स सीखना।',
          actionItems: ['CapCut Desktop इंस्टॉल करें', 'Auto-Captions फीचर से सबटाइटल्स जनरेट करें', '3 वायरल पॉडकास्ट क्लिप्स एडिट करके 60-सेकंड रील बनाएं'],
          estimatedHours: '3 घंटे',
          outcome: '3 हाई-क्वालिटी शॉर्ट्स वीडियो पोर्टफोलियो'
        },
        {
          day: 2,
          title: 'Day 2: ChatGPT प्लस SEO कंटेंट ऑटोमेशन',
          objective: 'किसी भी टॉपिक पर 10 मिनट में 1500-शब्द का हाई-रैंकिंग आर्टिकल लिखना।',
          actionItems: ['ChatGPT में "Persona Prompting" और "Outline Generation" सीखें', 'Notion AI में टेबल और बुलेट समरी फॉर्मेट करना सीखें', 'Grammarly से 100% त्रुटिहीन अंग्रेजी सुनिश्चित करें'],
          estimatedHours: '2.5 घंटे',
          outcome: '2 रेडी-टू-पब्लिश ब्लॉग आर्टिकल्स'
        },
        {
          day: 3,
          title: 'Day 3: वर्चुअल असिस्टेंट AI टूल्स (Gmail, Zapier, Calendar)',
          objective: 'क्लाइंट्स के 100 ईमेल्स को 5 मिनट में समराइज़ और शेड्यूल करना।',
          actionItems: ['Zapier पर फ्री अकाउंट बनाकर "Gmail to Google Sheets" ऑटोमेशन बनाएं', 'ChatGPT से 5 प्रोफेशनल क्लाइंट ईमेल टेम्प्लेट्स सेव करें'],
          estimatedHours: '2 घंटे',
          outcome: 'एग्जीक्यूटिव वर्चुअल असिस्टेंट स्किल रेडी'
        },
        {
          day: 4,
          title: 'Day 4: वीडियो शोरील & Google Drive पोर्टफोलियो',
          objective: 'विदेशी क्लाइंट्स को इम्प्रेस करने वाला 1-पेज शोरील लिंक तैयार करना।',
          actionItems: ['Google Drive में "Video Portfolio - [Your Name]" फोल्डर बनाएं', 'Loom.com पर 60-सेकंड का स्क्रीन-रिकॉर्डेड वीडियो इंट्रोडक्शन बनाएं', 'लिंक को "Anyone with link can view" पर सेट करें'],
          estimatedHours: '2.5 घंटे',
          outcome: 'क्लाइंट-कन्वर्टिंग वीडियो पोर्टफोलियो'
        },
        {
          day: 5,
          title: 'Day 5: Upwork Pro प्रोफाइल & 3 कस्टम प्रपोजल बिडिंग',
          objective: 'Upwork पर AI Video Editor और Content Writer की 3 लाइव जॉब्स पर बिड करना।',
          actionItems: ['Upwork पर 100% प्रोफाइल स्कोर पूरा करें', 'जॉब डिस्क्रिप्शन के मुख्य शब्दों को प्रपोजल के पहले 2 वाक्यों में लिखें', 'Loom वीडियो लिंक और 3 बेस्ट सैंपल्स अटैच करें'],
          estimatedHours: '3 घंटे',
          outcome: '3 एक्टिव हाई-टिकट प्रपोजल्स सेंट'
        },
        {
          day: 6,
          title: 'Day 6: दुबई, सिंगापुर व US क्लाइंट्स को डायरेक्ट ईमेल / DM',
          objective: 'बिना बिडिंग फीस के Instagram और LinkedIn पर यूट्यूबर्स और पॉडकास्टर्स को संपर्क करना।',
          actionItems: ['10 यूट्यूबर्स की एक लंबी वीडियो से 1-1 फ्री शॉर्ट्स रील बनाएं', 'उन्हें ईमेल या Instagram DM पर भेजें: "Hey, I edited this viral short for you for free!"', 'रेट: "$250 for 10 Reels/Month" ऑफर करें'],
          estimatedHours: '3 घंटे',
          outcome: '10 डायरेक्ट वॉर्म लीड्स आउटरीच'
        },
        {
          day: 7,
          title: 'Day 7: Payoneer / Wise Dollar बैंक अकाउंट & क्लोजिंग',
          objective: 'डॉलर में पेमेंट रिसीव करना और इनवॉइस जनरेट करना।',
          actionItems: ['Payoneer या Wise अकाउंट एक्टिवेट करें', 'क्लाइंट के लिए इनवॉइस जनरेट करने का तरीका समझें'],
          estimatedHours: '1.5 घंटे',
          outcome: 'मंथली $1,000+ (₹83,000+) कमाई का रास्ता खुला'
        }
      ]
    },
    'Graduate': {
      qualification: 'Graduate',
      suitableRoles: ['AI Prompt Engineer ($25-$45/hr)', 'No-Code Website Builder ($35-$70/hr)', 'Global Freelance Consultant ($40/hr)'],
      summary: 'ग्रेजुएट छात्र हाई-टिकट AI सिस्टम्स, नो-कोड वेबसाइट्स (Framer) और बिजनेस प्रोसेस ऑटोमेशन बेचकर महीने के ₹3 लाख से ₹8 लाख तक कमा सकते हैं।',
      roadmap: [
        {
          day: 1,
          title: 'Day 1: एडवांस्ड प्रॉम्प्ट इंजीनियरिंग (Few-Shot & Chain-of-Thought)',
          objective: 'LLMs से 0% हेल्युसिनेशन के साथ जटिल बिजनेस रिपोर्ट और कोड आउटपुट निकलवाना।',
          actionItems: ['Chain-of-Thought (CoT) और System Instructions प्रॉम्प्टिंग सीखें', 'Outlier AI और Scale AI के इवैल्यूएटर टेस्ट की प्रैक्टिस करें', '10 जटिल बिजनेस केस स्टडीज प्रॉम्प्ट्स बनाएं'],
          estimatedHours: '3.5 घंटे',
          outcome: 'प्रॉम्प्ट इंजीनियरिंग मास्टर सर्टिफिकेट लेवल नॉलेज'
        },
        {
          day: 2,
          title: 'Day 2: Framer AI नो-कोड वेबसाइट डेवलपमेंट',
          objective: 'Framer.com पर बिना कोडिंग के 45 मिनट में हाई-कन्वर्टिंग लैंडिंग पेज बनाना।',
          actionItems: ['Framer AI पर 1 SaaS प्रोडक्ट और 1 रियल-एस्टेट वेबसाइट बनाएं', 'मोबाइल रिस्पॉन्सिव लेआउट और एनिमेशन ट्यून करें', 'Framer का फ्री सबडोमेन लाइव पब्लिश करें'],
          estimatedHours: '3.5 घंटे',
          outcome: '2 लाइव इंटरएक्टिव वेबसाइट्स पोर्टफोलियो'
        },
        {
          day: 3,
          title: 'Day 3: Make.com / Zapier बिजनेस ऑटोमेशन पाइपलाइन',
          objective: 'लीड जेनरेशन, CRM अपडेट और व्हाट्सएप/ईमेल ऑटोमेशन को AI से जोड़ना।',
          actionItems: ['Make.com पर "New Form Lead → AI Email Draft → Slack Alert" ऑटोमेशन बनाएं', 'दुबई और यूएस स्टार्टअप्स के लिए ऑटोमेशन डेमो वीडियो रिकॉर्ड करें'],
          estimatedHours: '3 घंटे',
          outcome: 'हाई-टिकट ऑटोमेशन कंसल्टिंग स्किल रेडी'
        },
        {
          day: 4,
          title: 'Day 4: LinkedIn पर्सनल ब्रांडिंग & इनबाउंड क्लाइंट फनल',
          objective: 'LinkedIn पर रोजाना 2 वैल्युएबल AI पोस्ट्स डालकर विदेशी फाउंडर्स से इनबाउंड लीड्स पाना।',
          actionItems: ['LinkedIn हेडलाइन: "AI Workflow & Framer Specialist | Helping US/EU Startups Save 20 hrs/week"', '3 केस स्टडी कैरोसेल पोस्ट्स शेड्यूल करें', 'यूएस और यूएई के 50 स्टार्टअप फाउंडर्स को कनेक्शन रिक्वेस्ट भेजें'],
          estimatedHours: '3 घंटे',
          outcome: 'ग्लोबल B2B लीड जनरेशन फनल रेडी'
        },
        {
          day: 5,
          title: 'Day 5: Upwork Top-Rated स्ट्रेटेजी & $500+ फिक्स्ड प्राइस जॉब्स',
          objective: 'बड़े प्रोजेक्ट्स ($500 - $2,500) पर बिड करके पहले हफ्ते में पहला कॉन्ट्रैक्ट जीतना।',
          actionItems: ['Upwork पर Specialty Profile ("No-Code Development" & "AI Prompting") सेट करें', 'JITOMNI के हाई-टिकट प्रपोजल टेम्प्लेट से 4 जॉब्स पर अप्लाई करें', 'Loom वीडियो में क्लाइंट की वेबसाइट का लाइव ऑडिट पेश करें'],
          estimatedHours: '3 घंटे',
          outcome: '4 हाई-टिकट Enterprise प्रपोजल्स सबमिट'
        },
        {
          day: 6,
          title: 'Day 6: Payoneer / Wise / Stripe Atlas क्रॉस-बॉर्डर टैक्स अनुपालन',
          objective: 'FIRC (Foreign Inward Remittance Certificate) और 0% GST एक्सपोर्ट बेनिफिट समझना।',
          actionItems: ['Payoneer / Wise कमर्शियल रिसीविंग अकाउंट्स लिंक करें', 'LUT (Letter of Undertaking) का बेसिक ज्ञान समझें'],
          estimatedHours: '2 घंटे',
          outcome: '100% लीगल, टैक्स-फ्रेंडली इंटरनेशनल डॉलर पेमेंट इंफ्रास्ट्रक्चर'
        },
        {
          day: 7,
          title: 'Day 7: $3,000/महीना रिकरिंग रिटेनर मॉडल',
          objective: '1-टाइम प्रोजेक्ट्स को मंथली रिटेनर ($1,000/महीना प्रति क्लाइंट) में बदलना।',
          actionItems: ['3 क्लाइंट्स को "AI Maintenance & Continuous Updates" पैकेज पिच करें', 'मंथली इनवॉइसिंग सिस्टम ऑटोमेट करें'],
          estimatedHours: '2 घंटे',
          outcome: 'स्थायी $3,000 (₹2.5 लाख+) मंथली इनकम सिस्टम स्थापित'
        }
      ]
    }
  };

  // SECTION 3: AI Tools Lab Data
  const aiToolsLabList: AIToolItem[] = [
    {
      id: 'tool-chatgpt',
      name: 'ChatGPT 4o & Canvas',
      category: 'Text & Logic',
      icon: '🤖',
      badge: '100% Must Have',
      whatItDoes: {
        hi: 'कंटेंट राइटिंग, कोडिंग, ट्रांसलेशन, रिसर्च और बिजनेस ईमेल्स को चुटकियों में तैयार करने वाला दुनिया का सबसे लोकप्रिय AI।',
        en: 'Generates blogs, copy, logic, email templates, and automated workflows in seconds.'
      },
      freePlanDetails: 'GPT-4o Mini & Free Web Access 100% मुफ्त उपलब्ध',
      officialFreeLink: 'https://chatgpt.com',
      quickTutorialSteps: [
        'chatgpt.com पर फ्री गूगल अकाउंट से लॉगिन करें।',
        'प्रॉम्प्ट में रोल बताएं: "You are an expert copywriter for a US SaaS client..."',
        'आउटपुट को कॉपी करके क्लाइंट रिपोर्ट में पेस्ट करें।'
      ],
      sampleMonetizationTrick: 'Upwork पर "Content Repurposing" के $25/घंटा चार्ज करें।'
    },
    {
      id: 'tool-canva-ai',
      name: 'Canva Magic Studio AI',
      category: 'Design & Graphics',
      icon: '🎨',
      badge: 'Zero Design Skill',
      whatItDoes: {
        hi: 'सोशल मीडिया पोस्ट्स, थंबनेल्स, इन्फोग्राफिक्स और प्रेजेंटेशन को 1 क्लिक में AI से डिजाइन करना।',
        en: 'Automated thumbnail design, background removal, and vector graphics with one-click AI.'
      },
      freePlanDetails: 'फ्री टियर में 50+ AI फीचर्स और हजारों फ्री टेम्प्लेट्स',
      officialFreeLink: 'https://www.canva.com',
      quickTutorialSteps: [
        'Canva खोलें और "Magic Design" सर्च करें।',
        'अपने विषय का नाम लिखें (उदा: "Fitness Instagram Carousel")।',
        'AI द्वारा बने 5 रेडीमेड पोस्ट्स डाउनलोड करके एक्सपोर्ट करें।'
      ],
      sampleMonetizationTrick: 'Fiverr पर "30 Instagram Posts Design" का $100 चार्ज करें।'
    },
    {
      id: 'tool-capcut-ai',
      name: 'CapCut Desktop AI',
      category: 'Video Editing',
      icon: '🎬',
      badge: 'Viral Reels Machine',
      whatItDoes: {
        hi: 'ऑटो-कैप्शन, वॉयस एनहांसर, बैकग्राउंड रिमूवर और B-Rolls को सेकंडों में जोड़ने वाला वीडियो एडिटर।',
        en: 'Auto captions generator, smart cuts, and dynamic subtitles for TikTok & YouTube Shorts.'
      },
      freePlanDetails: 'डेस्कटॉप सॉफ्टवेयर 100% फ्री बिना किसी वॉटरमार्क के',
      officialFreeLink: 'https://www.capcut.com',
      quickTutorialSteps: [
        'CapCut Desktop डाउनलोड करें और वीडियो इंपोर्ट करें।',
        '"Text" टैब पर जाकर "Auto Captions" पर 1 क्लिक करें।',
        'येलो/ब्लू स्टाइल फॉन्ट चुनें और 1080p एक्सपोर्ट करें।'
      ],
      sampleMonetizationTrick: 'यूट्यूबर्स को 10 शॉर्ट्स एडिट करने के $300 (₹25,000) चार्ज करें।'
    },
    {
      id: 'tool-elevenlabs',
      name: 'ElevenLabs Voice AI',
      category: 'Voice & Audio',
      icon: '🎙️',
      badge: 'Ultra Realistic Voice',
      whatItDoes: {
        hi: 'किसी भी भाषा (हिंदी/इंग्लिश/स्पैनिश) में 100% असली इंसानी जैसी आवाज और वॉयस क्लोनिंग तैयार करना।',
        en: 'The industry gold standard for human-like emotional AI voice generation and voice cloning.'
      },
      freePlanDetails: 'हर महीने 10,000 कैरेक्टर्स 100% फ्री',
      officialFreeLink: 'https://elevenlabs.io',
      quickTutorialSteps: [
        'elevenlabs.io पर जाएं और "Speech Synthesis" चुनें।',
        '"Adam" या "Rachel" वॉइस सेलेक्ट करके टेक्स्ट पेस्ट करें।',
        '"Generate" दबाएं और MP3 फाइल डाउनलोड करें।'
      ],
      sampleMonetizationTrick: 'ऑडियोबुक्स और ई-लर्निंग वॉइसओवर के $50/प्रोजेक्ट चार्ज करें।'
    },
    {
      id: 'tool-notion-ai',
      name: 'Notion AI & Docs',
      category: 'Productivity & VA',
      icon: '📝',
      badge: 'Executive Assistant',
      whatItDoes: {
        hi: 'मीटिंग नोट्स, प्रोजेक्ट ट्रैकर, क्लाइंट CRM और टू-डू लिस्ट्स को ऑटो-ऑर्गनाइज़ करने वाला वर्कस्पेस।',
        en: 'AI-driven documentation, project management, and automated client wikis.'
      },
      freePlanDetails: 'पर्सनल वर्कस्पेस 100% फ्री',
      officialFreeLink: 'https://www.notion.so',
      quickTutorialSteps: [
        'Notion पर फ्री अकाउंट बनाएं।',
        'स्पेस बार दबाकर AI से कहें: "Summarize this meeting into action items"',
        'क्लाइंट को डायरेक्ट वेब लिंक शेयर करें।'
      ],
      sampleMonetizationTrick: 'स्टार्टअप्स के लिए "Notion Workspace Setup" का $250 लें।'
    },
    {
      id: 'tool-pictory',
      name: 'Pictory AI',
      category: 'Text-to-Video',
      icon: '⚡',
      badge: 'Faceless YouTube',
      whatItDoes: {
        hi: 'किसी भी आर्टिकल या टेक्स्ट स्क्रिप्ट को ऑटोमैटिक वीडियो और स्टॉक फुटेज में बदलने वाला टूल।',
        en: 'Converts blog posts and scripts into auto-edited video sequences with matching stock B-rolls.'
      },
      freePlanDetails: '3 फ्री वीडियो प्रोजेक्ट्स ट्रायल',
      officialFreeLink: 'https://pictory.ai',
      quickTutorialSteps: [
        'Pictory पर स्क्रिप्ट पेस्ट करें।',
        'AI ऑटोमैटिक हर लाइन के अनुसार वीडियो क्लिप्स ढूंढकर टाइमलाइन बनाएगा।',
        'वॉइसओवर लगाकर रेंडर करें।'
      ],
      sampleMonetizationTrick: 'बिना चेहरा दिखाए यूट्यूब चैनल चलाएं और एडसेंस से डॉलर कमाएं।'
    },
    {
      id: 'tool-leonardo',
      name: 'Leonardo AI',
      category: 'AI Art & Assets',
      icon: '✨',
      badge: 'High-Res Graphics',
      whatItDoes: {
        hi: 'गेमिंग एसेट्स, बुक कवर्स, लोगो और 4K फोटोरियलिस्टिक आर्ट बनाने वाला पावरफुल इमेज जनरेटर।',
        en: 'Generates stunning game assets, book covers, and concept art with daily free tokens.'
      },
      freePlanDetails: 'रोज़ाना 150 फ्री टोकन्स (हर दिन रीसेट होते हैं)',
      officialFreeLink: 'https://leonardo.ai',
      quickTutorialSteps: [
        'leonardo.ai पर जाएं और "PhotoReal" मॉडल सेलेक्ट करें।',
        'प्रॉम्प्ट लिखें: "Cinematic portrait of a warrior, 8k resolution, photorealistic"',
        'इमेज को अपस्केल करके डाउनलोड करें।'
      ],
      sampleMonetizationTrick: 'Amazon KDP ई-बुक कवर्स बनाकर $40 प्रति कवर बेचें।'
    }
  ];

  // Proposal Templates for Section 4
  const proposalTemplates: Record<string, { subject: string; body: string }> = {
    'AI Prompt Engineer': {
      subject: 'Proposal: High-Precision Prompt Optimization & LLM Pipeline for [Client Company]',
      body: `Hi [Client Name],

I noticed you are looking for an AI Prompt Engineer to streamline your [specific task/workflow].

I specialize in crafting high-accuracy system prompts, chain-of-thought instructions, and zero-hallucination pipelines using ChatGPT-4o, Claude 3.5, and Midjourney.

Here is what I will deliver for your project:
1. Custom-tuned prompts with 99%+ consistent output format (JSON / Markdown).
2. Complete documentation and test cases for edge scenarios.
3. Rapid 24-48 hour turnaround with unlimited fine-tuning.

You can view a sample of my recent prompt engineering benchmarks here: [Insert Google Drive / Notion Link]

Are you available for a quick 5-minute chat to discuss your exact requirements?

Best regards,
[Your Name]
AI Prompt & Workflow Specialist`
    },
    'AI Video Editor (CapCut)': {
      subject: 'Proposal: Viral Short-Form Video Editing (Reels & Shorts) with Dynamic Captions',
      body: `Hi [Client Name],

I saw your recent content and loved the topic! I can turn your long-form footage into high-retention, viral vertical reels that hook viewers in the first 3 seconds.

What you get with each video:
- Alex Hormozi style animated subtitles (High contrast, emojis, color highlights).
- Fast-paced zoom cuts, sound effects (whooshes, pops), and matching B-rolls.
- 100% copyright-free background music.

I edited a 30-second free sample from your latest video so you can see my work: [Insert Link]

Let’s connect and create your next 10 viral videos!

Best,
[Your Name]`
    },
    'Data Entry & AI Labeling': {
      subject: 'Proposal: 100% Accurate Data Entry, Cleaning & AI Annotation Services',
      body: `Dear [Client Name],

I am writing to apply for your Data Entry & Labeling project. With over 40+ WPM typing speed and meticulous attention to detail, I guarantee 100% accurate data formatting in Google Sheets / Excel.

Why hire me?
- Zero error guarantee (Every row double-checked before submission).
- Quick communication and daily progress reports.
- Flexible with US/UK/Dubai time zones.

I am ready to start right now and can complete a 10-row free test sample immediately.

Looking forward to working with you.

Regards,
[Your Name]`
    }
  };

  // Fetch Live Global Remote Jobs from Backend
  const fetchLiveGlobalJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch('/api/global-jobs/live');
      const data = await res.json();
      if (data.success && data.jobs) {
        setLiveJobs(data.jobs);
      }
    } catch (err) {
      console.error('Error fetching global jobs:', err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleRefreshGlobalJobs = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/global-jobs/refresh', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.jobs) {
        setLiveJobs(data.jobs);
      }
    } catch (err) {
      console.error('Error refreshing global jobs:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveGlobalJobs();
  }, []);

  const filteredLiveJobs = liveJobs.filter((j) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      j.jobTitle.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const activeRoadmap = qualificationRoadmaps[qualificationFilter];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Mega Banner: 9.7 Crore Worldwide Vacancies */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0A1F18] to-[#04120D] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wide">
              <Globe2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>9.7 CRORE+ GLOBAL REMOTE VACANCIES • WORK FROM HOME • EARN IN DOLLARS ($$)</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-wide leading-tight">
              {lang === 'hi' ? '🌍 ग्लोबल AI जॉब्स - घर बैठे डॉलर कमाओ' : '🌍 Global AI & Freelancing Career Hub'}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'कक्षा 10वीं पास से लेकर ग्रेजुएट तक हर भारतीय के लिए बिना कोडिंग सीखे अमेरिका, दुबई, यूरोप की कंपनियों में रिमोट काम और हर महीने ₹1.5 लाख से ₹8 लाख तक की सुरक्षित आय।'
                : 'Empowering every student and professional to tap into 9.7 Crore worldwide remote openings, mastering zero-code AI tools and earning directly in USD.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Trust Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>1 USD = ₹83.50 INR Direct Bank Payout</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                <span>No Coding Required</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="bg-black/60 border border-emerald-500/40 rounded-2xl p-5 w-full lg:w-80 shrink-0 space-y-3 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Worldwide AI Jobs</span>
              <span className="text-sm font-black text-emerald-400">9.7 Crore+</span>
            </div>
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Avg Hourly Rate</span>
              <span className="text-sm font-black text-amber-400">$20 - $45 / hr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Starting Time</span>
              <span className="text-xs font-bold text-cyan-300">7 Days Blueprint</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Section Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-700/80 no-scrollbar">
        <button
          onClick={() => setActiveSection('job_types')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'job_types'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>💼</span>
          <span>1. Top AI Job Roles ($20-$45/hr)</span>
        </button>

        <button
          onClick={() => setActiveSection('roadmaps')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'roadmaps'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>🎯</span>
          <span>2. 7-Day Roadmap (10th/12th/Grad)</span>
        </button>

        <button
          onClick={() => setActiveSection('tools_lab')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'tools_lab'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>🛠️</span>
          <span>3. Practical AI Tools Lab</span>
        </button>

        <button
          onClick={() => setActiveSection('freelancing_masterclass')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'freelancing_masterclass'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>💰</span>
          <span>4. Freelancing & Dollar Payout</span>
        </button>

        <button
          onClick={() => setActiveSection('live_vacancies')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'live_vacancies'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50'
              : 'bg-[#0A1931] text-slate-300 border border-slate-700 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>5. Live Remote Openings Feed</span>
        </button>

        <button
          onClick={() => setActiveSection('singapore_hub')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-black whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'singapore_hub'
              ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50 scale-[1.02]'
              : 'bg-[#0A1931] text-cyan-300 border border-cyan-500/40 hover:text-white'
          }`}
        >
          <span>🇸🇬</span>
          <span>6. 🇸🇬 सिंगापुर व ग्लोबल AI हब (S$6k-S$14k)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 text-[10px] font-bold">100% Demand</span>
        </button>
      </div>

      {/* ================= SECTION 6: SINGAPORE & GLOBAL AI TECH HUB ================= */}
      {activeSection === 'singapore_hub' && (
        <SingaporeGlobalTechHub lang={lang} />
      )}

      {/* ================= SECTION 1: TOP JOB TYPES ================= */}
      {activeSection === 'job_types' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <span>8 सबसे लोकप्रिय AI रिमोट रोल्स (Top In-Demand Jobs)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                इनमें से किसी भी रोल में कोडिंग की जरूरत नहीं है। डॉलर और भारतीय रुपये में अनुमानित कमाई देखें:
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
              100% Work From Home (WFH)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
            {globalJobCards.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-[#0A1F18] via-[#071712] to-[#030D0A] border border-emerald-500/30 hover:border-emerald-400/70 rounded-3xl p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-emerald-950/50 flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black/60 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                        {job.icon}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                          {job.qualificationLevel}
                        </span>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-white mt-1 group-hover:text-emerald-300 transition-colors">
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      <span className="text-base sm:text-lg font-black text-emerald-400">
                        ${job.hourlyDollar}/hr
                      </span>
                      <p className="text-[10px] text-slate-400 font-medium">₹{job.hourlyRupee}/hr</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {lang === 'hi' ? job.descriptionHindi : job.descriptionEnglish}
                  </p>

                  {/* Monthly Income Metric Box */}
                  <div className="bg-[#020A07] border border-emerald-500/20 rounded-2xl p-3.5 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-slate-300 font-bold">अनुमानित मासिक आय:</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-emerald-300 font-mono">
                      {job.monthlyEstimateRupee}
                    </span>
                  </div>

                  {/* Skills & Tools Tags */}
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Skills:</span>
                      {job.skillsNeeded.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-200">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Tools:</span>
                      {job.recommendedTools.map((tool, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-black/60 border border-slate-700 text-[11px] text-cyan-300 font-mono">
                          ⚡ {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-950 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>First Client: <strong>{job.firstOrderDays} Days</strong></span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSection('roadmaps');
                      if (job.qualificationLevel === '10th Pass') setQualificationFilter('10th Pass');
                      else if (job.qualificationLevel === 'Graduate') setQualificationFilter('Graduate');
                      else setQualificationFilter('12th Pass');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-400/40 text-xs font-black flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>7-Day Blueprint देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: 7-DAY ROADMAPS ================= */}
      {activeSection === 'roadmaps' && (
        <div className="space-y-6">
          <div className="bg-[#0A1F18] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Step-by-Step Learning Engine
                </span>
                <h2 className="text-2xl font-heading font-black text-white mt-1">
                  🎯 अपनी योग्यता चुनें (Select Your Qualification)
                </h2>
              </div>

              {/* Qualification Filter Buttons */}
              <div className="flex gap-2 p-1.5 rounded-2xl bg-black/60 border border-emerald-500/40 shrink-0">
                {(['10th Pass', '12th Pass', 'Graduate'] as const).map((qual) => (
                  <button
                    key={qual}
                    onClick={() => {
                      setQualificationFilter(qual);
                      setActiveRoadmapDay(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      qualificationFilter === qual
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {qual}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeRoadmap.summary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-500/20">
              <span className="text-xs text-slate-400 font-bold">आपके लिए बेस्ट रोल्स:</span>
              {activeRoadmap.suitableRoles.map((role, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  ✓ {role}
                </span>
              ))}
            </div>
          </div>

          {/* 7-Day Timeline Controller */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>7-Day "Zero to Earning" स्टेप-बाय-स्टेप टाइमलाइन</span>
            </h3>

            {/* Day Selector Strip */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
              {activeRoadmap.roadmap.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveRoadmapDay(d.day)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    activeRoadmapDay === d.day
                      ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30 font-black'
                      : 'bg-[#0A1F18] text-slate-300 border-slate-700 hover:border-emerald-500/50'
                  }`}
                >
                  <p className="text-[10px] uppercase font-bold tracking-wider">Day</p>
                  <p className="text-lg sm:text-xl font-heading font-black">{d.day}</p>
                </button>
              ))}
            </div>

            {/* Active Day Detail Card */}
            {(() => {
              const currentDay = activeRoadmap.roadmap.find((d) => d.day === activeRoadmapDay) || activeRoadmap.roadmap[0];
              return (
                <div className="bg-gradient-to-br from-[#0A1F18] to-[#04120D] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
                        Day {currentDay.day} Task
                      </span>
                      <h4 className="text-xl sm:text-2xl font-heading font-black text-white mt-2">
                        {currentDay.title}
                      </h4>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-cyan-300 font-mono font-bold shrink-0">
                      ⏱️ अनुमानित समय: {currentDay.estimatedHours}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">मुख्य लक्ष्य (Objective):</h5>
                    <p className="text-sm font-medium text-slate-200 mt-1">{currentDay.objective}</p>
                  </div>

                  <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-emerald-500/20">
                    <h5 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>आज के जरूरी एक्शन स्टेप्स (Action Items):</span>
                    </h5>
                    <ul className="space-y-2">
                      {currentDay.actionItems.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 border border-emerald-500/30">
                            {idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">दिन के अंत का परिणाम (Daily Outcome):</span>
                      <p className="text-xs sm:text-sm font-bold text-emerald-300">{currentDay.outcome}</p>
                    </div>

                    {activeRoadmapDay < 7 && (
                      <button
                        onClick={() => setActiveRoadmapDay((prev) => prev + 1)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 hover:bg-emerald-400"
                      >
                        <span>अगला दिन (Day {activeRoadmapDay + 1})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: TOOLS LAB ================= */}
      {activeSection === 'tools_lab' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <span>AI टूल्स लैब (Practical Learning & Free Access)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                इन टूल्स को सीखने के लिए कोई पैसे नहीं देने होते। 100% फ्री में सीखें और डायरेक्ट क्लाइंट्स को सेवाएं दें:
              </p>
            </div>
            <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
              7 Industry Gold-Standard Tools
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {aiToolsLabList.map((tool) => (
              <div
                key={tool.id}
                className="bg-gradient-to-br from-[#0A1F18] to-[#030E0A] border border-emerald-500/30 hover:border-cyan-400/60 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-black/60 border border-slate-700 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform shrink-0">
                      {tool.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-black text-white mt-3">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">{tool.category}</span>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {lang === 'hi' ? tool.whatItDoes.hi : tool.whatItDoes.en}
                  </p>

                  {/* Free Plan Details */}
                  <div className="bg-black/50 border border-slate-800 rounded-xl p-2.5 mt-3 text-[11px] text-emerald-300 font-medium">
                    🎁 {tool.freePlanDetails}
                  </div>

                  {/* Step Tutorial */}
                  <div className="mt-3 space-y-1.5 bg-[#020A07] p-3 rounded-xl border border-emerald-500/20">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">2-मिनट क्विक स्टेप्स:</span>
                    <ol className="space-y-1">
                      {tool.quickTutorialSteps.map((st, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">{idx + 1}.</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-emerald-950">
                  <div className="text-[11px] text-amber-300 font-bold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                    💡 कमाई ट्रिक: {tool.sampleMonetizationTrick}
                  </div>

                  <a
                    href={tool.officialFreeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all text-center"
                  >
                    <span>फ्री टूल खोलें (Open Free Link)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: FREELANCING MASTERCLASS ================= */}
      {activeSection === 'freelancing_masterclass' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-950 via-[#0A1F18] to-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-2">
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
              <DollarSign className="w-7 h-7 text-amber-400" />
              <span>फ्रीलांसिंग मास्टरक्लास: Upwork, Fiverr & डॉलर पेमेंट</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              स्टेप-बाय-स्टेप गाइड: प्रोफाइल बनाने से लेकर विदेश से डॉलर में कमाई सीधे भारतीय बैंक खाते (SBI, HDFC आदि) में लाने तक।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step 1 & 2 Cards */}
            <div className="space-y-6">
              {/* Upwork / Fiverr Setup Guide */}
              <div className="bg-[#0A1F18] border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-lg border border-emerald-500/40">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base sm:text-lg">
                      Upwork & Fiverr पर प्रोफाइल कैसे बनाएं
                    </h3>
                    <p className="text-xs text-slate-400">100% अप्रूवल गारंटी फॉर्मूला</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">प्रोफेशनल हेडलाइन: </strong>
                      "General Freelancer" न लिखें। "AI Prompt Engineer & Video Automation Expert" लिखें।
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">शुरुआती आवरली रेट: </strong>
                      पहले 2 ऑर्डर्स के लिए $15 - $20/hr रखें ताकि विदेशी क्लाइंट तुरंत ऑर्डर दे।
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">पोर्टफोलियो अटैचमेंट: </strong>
                      Google Drive या Loom वीडियो का लिंक प्रोफाइल में अवश्य लगाएं।
                    </div>
                  </div>
                </div>
              </div>

              {/* Payoneer / Wise Dollar Payment Setup */}
              <div className="bg-[#0A1F18] border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg border border-amber-500/40">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base sm:text-lg">
                      विदेश से डॉलर पेमेंट सीधे बैंक खाते में कैसे लें
                    </h3>
                    <p className="text-xs text-slate-400">Payoneer & Wise Setup (भारत के लिए)</p>
                  </div>
                </div>

                <div className="bg-black/50 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-bold text-amber-300">⚡ 3-स्टेप बैंक ट्रांसफर प्रोसेस:</p>
                  <ol className="space-y-1.5 list-decimal pl-4">
                    <li>Payoneer.com पर फ्री अकाउंट बनाएं (PAN कार्ड + बैंक पासबुक फोटो)।</li>
                    <li>Payoneer आपको US और UK का वर्चुअल बैंक अकाउंट नंबर देगा।</li>
                    <li>Upwork और Fiverr में उस अकाउंट को लिंक करें—डॉलर ऑटोमैटिक ₹ रूपयों में आपके बैंक में जमा हो जाएगा।</li>
                  </ol>
                  <p className="text-[11px] text-emerald-400 pt-2 border-t border-slate-800">
                    ✓ RBI अनुमोदित व 100% लीगल फॉरेक्स ट्रांसफर (24 घंटे में क्रेडिट)।
                  </p>
                </div>
              </div>

              {/* Dubai, Singapore & Middle East Outreach */}
              <div className="bg-[#0A1F18] border border-emerald-500/30 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-lg border border-cyan-500/40">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base sm:text-lg">
                      दुबई, सिंगापुर और US कंपनियों को डायरेक्ट अप्रोच
                    </h3>
                    <p className="text-xs text-slate-400">Zero Commission Direct Clients</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  दुबई और सिंगापुर की मार्केटिंग एजेंसियों को LinkedIn पर खोजें। उन्हें कहें: "I can handle your daily video reels and AI copy at 50% cost of local agencies." वे तुरंत $500-$1000 का मंथली कॉन्ट्रैक्ट देते हैं।
                </p>
              </div>
            </div>

            {/* Winning Proposal Templates Interactive Lab */}
            <div className="bg-gradient-to-br from-[#0A1F18] to-[#020A07] border-2 border-emerald-500/40 rounded-3xl p-6 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-white text-lg flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-400" />
                    <span>क्लाइंट-कन्वर्टिंग प्रपोजल टेम्प्लेट्स (Copy & Paste)</span>
                  </h3>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {Object.keys(proposalTemplates).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedProposalRole(role);
                        setCopiedProposal(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                        selectedProposalRole === role
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-black/60 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <div className="bg-black/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-[11px] text-slate-400 font-mono">
                    <strong className="text-emerald-400">Subject: </strong>
                    {proposalTemplates[selectedProposalRole].subject}
                  </div>
                  <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2">
                    {proposalTemplates[selectedProposalRole].body}
                  </pre>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${proposalTemplates[selectedProposalRole].subject}\n\n${proposalTemplates[selectedProposalRole].body}`
                  );
                  setCopiedProposal(true);
                  setTimeout(() => setCopiedProposal(false), 3000);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{copiedProposal ? '✓ प्रपोजल कॉपी हो गया (Copied!)' : 'कॉपी करें और क्लाइंट को भेजें (Copy Template)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LIVE GLOBAL VACANCIES ================= */}
      {activeSection === 'live_vacancies' && (
        <div className="space-y-6">
          <div className="bg-[#0A1F18] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Live Verified Feed • Upwork, LinkedIn & RemoteOK
              </span>
              <h2 className="text-xl sm:text-3xl font-heading font-black text-white">
                🌍 लाइव इंटरनेशनल रिमोट नौकरियां (Indians Eligible)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                ये नौकरियां अमेरिकी और विदेशी कंपनियों द्वारा पोस्ट की गई हैं, जिनमें भारत से घर बैठे काम करने की अनुमति है।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={handleRefreshGlobalJobs}
                disabled={isRefreshing}
                className="px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-slate-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
                <span>{isRefreshing ? 'AI लाइव जॉब्स खोज रहा है...' : 'रोज़ाना लाइव अपडेट्स'}</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="जॉब या स्किल खोजें (उदा: Prompt, Video, Data, ChatGPT)..."
              className="w-full bg-[#0A1F18] border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Live Openings Grid */}
          {isLoadingJobs ? (
            <div className="bg-[#0A1F18] border border-slate-800 rounded-3xl p-16 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-white">ग्लोबल रिमोट नौकरियों का लाइव डेटा लोड हो रहा है...</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {filteredLiveJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gradient-to-br from-[#0A1F18] via-[#071712] to-[#030D0A] border border-emerald-500/30 hover:border-emerald-400/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                            {job.source}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {job.location}
                          </span>
                        </div>
                        <h3 className="text-lg font-heading font-black text-white mt-1 group-hover:text-emerald-300 transition-colors">
                          {job.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-300 font-medium">{job.company}</p>
                      </div>

                      <span className="px-2.5 py-1 rounded-lg bg-black/60 text-emerald-400 text-xs font-black border border-emerald-500/40 shrink-0">
                        {job.salaryInDollar}
                      </span>
                    </div>

                    <div className="bg-[#020A07] border border-emerald-500/20 rounded-xl p-2.5 mt-3">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">भारतीय रुपयों में भुगतान:</span>
                      <p className="text-xs font-bold text-emerald-300 font-mono">{job.salaryInRupees}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-black/60 border border-slate-800 text-[11px] text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-950 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">{job.postedAgo}</span>

                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all text-center"
                    >
                      <span>Apply on {job.source}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
