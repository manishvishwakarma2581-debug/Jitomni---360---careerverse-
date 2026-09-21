export interface GigCategoryItem {
  id: string;
  name: {
    hi: string;
    en: string;
  };
  groupId: 'home' | 'beauty' | 'delivery' | 'education' | 'event' | 'others';
  groupName: {
    hi: string;
    en: string;
  };
  icon: string;
  badge?: string;
  typicalRatePerHour: number;
  typicalJobRateMin: number;
  typicalJobRateMax: number;
  popularJobs: string[];
  description: {
    hi: string;
    en: string;
  };
}

export interface GigWorkerProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  whatsapp: string;
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  photoUrl: string;
  primaryCategoryId: string;
  secondaryCategoryIds: string[];
  experienceYears: number;
  state: string;
  city: string;
  area: string;
  chargePerHour: number;
  chargePerJobMin: number;
  upiId: string;
  rating: number;
  totalReviews: number;
  completedJobsCount: number;
  distanceKm: number;
  etaMinutes: number;
  status: 'available' | 'on_duty' | 'offline';
  verificationBadge: 'gold_verified' | 'silver_verified' | 'pending';
  joinedDate: string;
  languages: string[];
  skillsList: string[];
  policeVerificationNo: string;
}

export interface GigBookingRecord {
  id: string;
  categoryId: string;
  categoryName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  serviceDate: string;
  timeSlot: string;
  problemDescription: string;
  workerId?: string;
  workerName?: string;
  workerPhone?: string;
  workerPhoto?: string;
  totalFare: number;
  workerEarnings: number; // 80%
  adminCommission: number; // 20%
  commissionRate: number; // 0.20
  startOtp: string;
  endOtp: string;
  paymentMethod: 'upi' | 'cash';
  paymentStatus: 'pending' | 'paid_via_upi' | 'cash_collected';
  bookingStatus: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export const GIG_GROUPS = [
  { id: 'all', name: { hi: '🌟 सभी 35+ सेवाएं', en: 'All 35+ Services' } },
  { id: 'home', name: { hi: '🏠 ग्रुप A: होम सर्विसेज', en: 'Group A: Home Services' } },
  { id: 'beauty', name: { hi: '💅 ग्रुप B: ब्यूटी व पर्सनल', en: 'Group B: Beauty & Personal' } },
  { id: 'delivery', name: { hi: '🚚 ग्रुप C: डिलीवरी व ड्राइवर', en: 'Group C: Delivery & Driver' } },
  { id: 'education', name: { hi: '💻 ग्रुप D: एजुकेशन व टेक', en: 'Group D: Education & Tech' } },
  { id: 'event', name: { hi: '🎉 ग्रुप E: इवेंट व पार्टी', en: 'Group E: Event & Party' } },
  { id: 'others', name: { hi: '🛠️ ग्रुप F: अन्य कुशल काम', en: 'Group F: Other Skilled Trades' } }
] as const;

export const ALL_GIG_CATEGORIES: GigCategoryItem[] = [
  // Group A: Home Services (8 categories)
  {
    id: 'electrician',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'इलेक्ट्रीशियन (Electrician)', en: 'Electrician' },
    icon: '⚡',
    badge: 'Urgent in 15 Min',
    typicalRatePerHour: 199,
    typicalJobRateMin: 149,
    typicalJobRateMax: 499,
    popularJobs: ['Wiring Repair', 'Switchboard Replacement', 'MCB Tripping Fix', 'Fan/Light Installation', 'Inverter Fitting'],
    description: {
      hi: 'शॉर्ट सर्किट, पंखा, लाइट, इनवर्टर, गीजर व मीटर वायरिंग के अनुभवी इलेक्ट्रीशियन।',
      en: 'Certified electricians for short-circuit, wiring, switches, fan and inverter setup.'
    }
  },
  {
    id: 'plumber',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'प्लंबर (Plumber)', en: 'Plumber' },
    icon: '🔧',
    badge: 'Popular',
    typicalRatePerHour: 199,
    typicalJobRateMin: 149,
    typicalJobRateMax: 599,
    popularJobs: ['Tap Leakage Fix', 'Pipe Blockage Cleaning', 'Water Tank Overflow Fitting', 'Washbasin & Commode Setup', 'Motor Pump Repair'],
    description: {
      hi: 'नल लीकेज, पाइप फिटिंग, वाटर टैंक, मोटर पंप और ड्रेनेज ब्लॉकेज ठीक करने वाले कुशल प्लंबर।',
      en: 'Expert plumbing for pipe leaks, tap repair, tank overflow, motor pump and drainage.'
    }
  },
  {
    id: 'carpenter',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'कारपेंटर / बढ़ई (Carpenter)', en: 'Carpenter' },
    icon: '🪚',
    typicalRatePerHour: 249,
    typicalJobRateMin: 299,
    typicalJobRateMax: 999,
    popularJobs: ['Door & Window Lock Repair', 'Modular Bed Assembly', 'Cupboard Hinges Fixing', 'Wooden Furniture Polish', 'New Custom Shelves'],
    description: {
      hi: 'दरवाजे, खिड़की, ताले, मॉड्यूलर फर्नीचर, अलमारी और बेड असेंबली के पेशेवर कारपेंटर।',
      en: 'Professional woodwork, door/lock fixing, furniture assembly and polish.'
    }
  },
  {
    id: 'ac_repair',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'AC रिपेयर व सर्विस (AC Repair)', en: 'AC Repair & Service' },
    icon: '❄️',
    badge: 'Summer Special',
    typicalRatePerHour: 349,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1499,
    popularJobs: ['Deep Jet Foam Service', 'Gas Refilling (R32/R410)', 'Cooling Coil Repair', 'PCB Board Fixing', 'AC Installation/Uninstallation'],
    description: {
      hi: 'स्प्लिट व विंडो एसी की जेट पंप सर्विसिंग, गैस रिफिल और कॉलिंग प्रॉब्लम समाधान।',
      en: 'Split & Window AC jet service, gas charging, cooling issue diagnostics.'
    }
  },
  {
    id: 'fridge_repair',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'फ्रिज रिपेयर (Fridge Repair)', en: 'Refrigerator Repair' },
    icon: '🧊',
    typicalRatePerHour: 299,
    typicalJobRateMin: 299,
    typicalJobRateMax: 899,
    popularJobs: ['Not Cooling Fix', 'Compressor Checkup', 'Gas Leakage Fill', 'Thermostat Replacement', 'Door Rubber Gasket Change'],
    description: {
      hi: 'सिंगल डोर व डबल डोर फ्रिज की कूलिंग खराबी, गैस चार्जिंग और कंप्रेसर रिपेयर।',
      en: 'Diagnostics and repair for refrigerator cooling failure, thermostat and gas filling.'
    }
  },
  {
    id: 'washing_machine',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'वाशिंग मशीन रिपेयर (Washing Machine)', en: 'Washing Machine Repair' },
    icon: '🧺',
    typicalRatePerHour: 299,
    typicalJobRateMin: 299,
    typicalJobRateMax: 999,
    popularJobs: ['Drum Not Spinning', 'Water Not Draining', 'Vibration & Noise', 'Motor Belt Fix', 'Front/Top Load PCB Board'],
    description: {
      hi: 'ऑटोमैटिक और सेमी-ऑटोमैटिक वाशिंग मशीन ड्रम, मोटर और मोटर बेल्ट की तुरंत रिपेयर।',
      en: 'Top and front load washing machine repair, drain pump, spin motor troubleshooting.'
    }
  },
  {
    id: 'ro_purifier',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'RO वाटर प्यूरीफायर (RO Repair)', en: 'RO Purifier Service' },
    icon: '💧',
    typicalRatePerHour: 249,
    typicalJobRateMin: 249,
    typicalJobRateMax: 699,
    popularJobs: ['Full Filter Change Kit', 'TDS Level Adjustment', 'Pump Pressure Check', 'Membrane Replacement', 'Water Leakage Fix'],
    description: {
      hi: 'शुद्ध पेयजल हेतु सभी ब्रांड के RO फिल्टर चेंज, मेम्ब्रेन व टीडीएस बैलेंसिंग सर्विस।',
      en: 'RO membrane, sediment filter change, TDS balancing and leakage repair.'
    }
  },
  {
    id: 'painter',
    groupId: 'home',
    groupName: { hi: 'होम सर्विसेज', en: 'Home Services' },
    name: { hi: 'पेंटर व पुट्टी कारीगर (Painter)', en: 'Painter' },
    icon: '🎨',
    typicalRatePerHour: 249,
    typicalJobRateMin: 499,
    typicalJobRateMax: 2499,
    popularJobs: ['1-Room Touchup', 'Full House Waterproofing', 'Putty & Primer Coat', 'Exterior Weather Coating', 'Designer Texture Wall'],
    description: {
      hi: 'दीवारों की पुट्टी, प्राइमर, वॉटरप्रूफिंग और रॉयल इमल्शन पेंटिंग के कुशल कारीगर।',
      en: 'Interior & exterior painting, putty, texture wall, and waterproofing experts.'
    }
  },

  // Group B: Beauty & Personal (4 categories)
  {
    id: 'beautician',
    groupId: 'beauty',
    groupName: { hi: 'ब्यूटी व पर्सनल', en: 'Beauty & Personal' },
    name: { hi: 'ब्यूटिशियन एट होम (Beautician at Home)', en: 'Beautician at Home' },
    icon: '💄',
    badge: 'Women Only Verified',
    typicalRatePerHour: 299,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1499,
    popularJobs: ['Facial & Cleanup', 'Full Body Waxing', 'Threading & Bleach', 'Pedicure & Manicure', 'Party Makeup'],
    description: {
      hi: 'घर पर सुरक्षित व हाइजीनिक फेशियल, वैक्सिंग, मैनीक्योर और पार्टी मेकअप सेवाएं।',
      en: 'Certified female beauticians for hygienic salon services at home.'
    }
  },
  {
    id: 'barber',
    groupId: 'beauty',
    groupName: { hi: 'ब्यूटी व पर्सनल', en: 'Beauty & Personal' },
    name: { hi: 'हेयर कट व ग्रूमिंग (Barber at Home)', en: 'Barber at Home' },
    icon: '✂️',
    typicalRatePerHour: 149,
    typicalJobRateMin: 99,
    typicalJobRateMax: 349,
    popularJobs: ['Men Haircut & Beard Trim', 'Head Massage with Herbal Oil', 'Kids Gentle Haircut', 'Hair Color / Dye', 'Detan Face Pack'],
    description: {
      hi: 'घर पर डिस्पोजेबल टॉवल और सैनिटाइज्ड कैंची से बाल कटिंग, शेविंग व हेड मसाज।',
      en: 'Safe at-home men haircut, beard styling, head massage and face detan.'
    }
  },
  {
    id: 'mehndi_artist',
    groupId: 'beauty',
    groupName: { hi: 'ब्यूटी व पर्सनल', en: 'Beauty & Personal' },
    name: { hi: 'मेहंदी आर्टिस्ट (Mehndi Artist)', en: 'Mehndi Artist' },
    icon: '🌿',
    typicalRatePerHour: 249,
    typicalJobRateMin: 299,
    typicalJobRateMax: 1999,
    popularJobs: ['Bridal Mehndi Design', 'Arabic Hands Mehndi', 'Teej/Karva Chauth Special', 'Family Group Mehndi', 'Baby Shower Art'],
    description: {
      hi: 'दुल्हन मेहंदी, अरेबिक, फ्लोरल और त्योहारों पर प्राकृतिक कोन से मेहंदी लगाने वाले आर्टिस्ट।',
      en: 'Creative henna artists for weddings, festivals, bridal and custom Arabic designs.'
    }
  },
  {
    id: 'massage_therapist',
    groupId: 'beauty',
    groupName: { hi: 'ब्यूटी व पर्सनल', en: 'Beauty & Personal' },
    name: { hi: 'मसाज थेरेपिस्ट (Massage Therapist)', en: 'Massage Therapist' },
    icon: '💆',
    typicalRatePerHour: 399,
    typicalJobRateMin: 499,
    typicalJobRateMax: 1499,
    popularJobs: ['Full Body Swedish Massage', 'Ayurvedic Potli Therapy', 'Elderly Joint Pain Relief', 'Post-Workout Deep Tissue', 'Foot Reflexology'],
    description: {
      hi: 'तनाव मुक्ति, पीठ दर्द व जोड़ों के दर्द हेतु सर्टिफाइड एक्यूप्रेशर व आयुर्वेदिक मालिश।',
      en: 'Certified male & female massage therapists for pain relief, relaxation and reflexology.'
    }
  },

  // Group C: Delivery & Driver (4 categories)
  {
    id: 'delivery_boy',
    groupId: 'delivery',
    groupName: { hi: 'डिलीवरी व ड्राइवर', en: 'Delivery & Driver' },
    name: { hi: 'डिलीवरी बॉय (Delivery Boy)', en: 'Delivery Executive' },
    icon: '📦',
    badge: '15 Min Pickup',
    typicalRatePerHour: 99,
    typicalJobRateMin: 49,
    typicalJobRateMax: 199,
    popularJobs: ['Medicine Urgent Delivery', 'Home Tiffin Delivery', 'Important Document Courier', 'Grocery Purchase & Drop', 'Key/Phone Pickup'],
    description: {
      hi: 'शहर के किसी भी कोने से दवा, टिफिन, चाबी या जरूरी सामान तुरंत पहुंचाने वाले डिलीवरी साथी।',
      en: 'Instant point-to-point courier and delivery for medicines, tiffins, keys and documents.'
    }
  },
  {
    id: 'driver_on_demand',
    groupId: 'delivery',
    groupName: { hi: 'डिलीवरी व ड्राइवर', en: 'Delivery & Driver' },
    name: { hi: 'ड्राइवर ऑन डिमांड (Driver on Demand)', en: 'Driver on Demand' },
    icon: '🚘',
    badge: 'Hourly / Daily',
    typicalRatePerHour: 149,
    typicalJobRateMin: 299,
    typicalJobRateMax: 1199,
    popularJobs: ['Night Outstation Driving', 'City Shopping / Hospital Driver', 'Party Return Safe Driver', 'Airport Pickup/Drop Pilot', 'SUV & Luxury Car Driver'],
    description: {
      hi: 'अपनी खुद की कार के लिए पुलिस वेरिफाइड, ट्रेंड ड्राइवर—लोकल या आउटस्टेशन सफर हेतु।',
      en: 'Verified experienced drivers to drive your personal car for local or outstation trips.'
    }
  },
  {
    id: 'packers_movers',
    groupId: 'delivery',
    groupName: { hi: 'डिलीवरी व ड्राइवर', en: 'Delivery & Driver' },
    name: { hi: 'पैकर्स एंड मूवर्स (Packers & Movers)', en: 'Packers & Movers' },
    icon: '🚚',
    typicalRatePerHour: 499,
    typicalJobRateMin: 1499,
    typicalJobRateMax: 7999,
    popularJobs: ['1BHK / 2BHK House Shifting', 'Bubble Wrap & Carton Packing', 'Office Relocation', 'Heavy Furniture Loading/Unloading', 'Intercity Moving'],
    description: {
      hi: 'घर और ऑफिस का सामान सुरक्षित बबल-रैप पैकिंग और टेम्पो लोडिंग के साथ शिफ्टिंग।',
      en: 'Reliable packing, loading, moving and transit protection for home or office relocation.'
    }
  },
  {
    id: 'tempo_transport',
    groupId: 'delivery',
    groupName: { hi: 'डिलीवरी व ड्राइवर', en: 'Delivery & Driver' },
    name: { hi: 'छोटा हाथी / टेम्पो भाड़ा (Tempo Transport)', en: 'Goods Tempo / Mini Truck' },
    icon: '🛺',
    typicalRatePerHour: 299,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1899,
    popularJobs: ['Construction Material Transport', 'Commercial Goods Delivery', 'Appliance Shifting', 'Farm Produce to Mandi', 'Local Heavy Load'],
    description: {
      hi: 'लोकल माल ढुलाई, बाजार से सामान व निर्माण सामग्री लाने हेतु छोटा हाथी व पिकअप।',
      en: 'Mini-truck and tempo for local logistics, construction goods and farm produce.'
    }
  },

  // Group D: Education & Tech (5 categories)
  {
    id: 'home_tutor',
    groupId: 'education',
    groupName: { hi: 'एजुकेशन व टेक', en: 'Education & Tech' },
    name: { hi: 'होम ट्यूटर (Home Tutor 1-12)', en: 'Home Tutor (Class 1-12)' },
    icon: '📚',
    typicalRatePerHour: 199,
    typicalJobRateMin: 199,
    typicalJobRateMax: 499,
    popularJobs: ['Class 9-10 Maths & Science', 'Class 1-5 All Subjects', 'Class 11-12 Physics/Chemistry', 'CBSE/State Board Exam Prep', 'Spoken English & Reading'],
    description: {
      hi: 'कक्षा 1 से 12 तक के बच्चों को घर आकर व्यक्तिगत ध्यान देकर पढ़ाने वाले योग्य शिक्षक।',
      en: 'Qualified home tutors for primary, secondary and senior secondary school students.'
    }
  },
  {
    id: 'computer_repair',
    groupId: 'education',
    groupName: { hi: 'एजुकेशन व टेक', en: 'Education & Tech' },
    name: { hi: 'कंप्यूटर / लैपटॉप रिपेयर (PC/Laptop)', en: 'Computer & Laptop Repair' },
    icon: '💻',
    typicalRatePerHour: 249,
    typicalJobRateMin: 249,
    typicalJobRateMax: 799,
    popularJobs: ['Windows OS Installation & Formatting', 'RAM & SSD Speed Upgrade', 'Slow PC & Virus Cleaning', 'Screen / Keyboard Replacement', 'Data Recovery'],
    description: {
      hi: 'लैपटॉप हैंग, वायरस, विंडोज इंस्टॉलेशन, एसएसडी अपग्रेड और डेटा रिकवरी घर पर।',
      en: 'Doorstep PC formatting, hardware replacement, SSD upgrade and virus elimination.'
    }
  },
  {
    id: 'mobile_repair',
    groupId: 'education',
    groupName: { hi: 'एजुकेशन व टेक', en: 'Education & Tech' },
    name: { hi: 'मोबाइल रिपेयर (Mobile Repair)', en: 'Mobile & Tablet Repair' },
    icon: '📱',
    typicalRatePerHour: 249,
    typicalJobRateMin: 199,
    typicalJobRateMax: 899,
    popularJobs: ['Touch Screen Display Replacement', 'Charging Port Jack Fix', 'Battery Health Replacement', 'Mic / Speaker Cleaning', 'Water Damage Revival'],
    description: {
      hi: 'स्मार्टफोन की टूटी स्क्रीन, चार्जिंग जैक, बैटरी रिप्लेसमेंट व सॉफ्टवेयर समाधान।',
      en: 'Display screen replacement, charging port fix, battery health and software restore.'
    }
  },
  {
    id: 'cctv_wifi',
    groupId: 'education',
    groupName: { hi: 'एजुकेशन व टेक', en: 'Education & Tech' },
    name: { hi: 'CCTV व वाई-फाई इंस्टॉलेशन (CCTV/WiFi)', en: 'CCTV & WiFi Installation' },
    icon: '📹',
    typicalRatePerHour: 249,
    typicalJobRateMin: 349,
    typicalJobRateMax: 1299,
    popularJobs: ['Security Camera Setup & Wiring', 'DVR/NVR Mobile App Linking', 'WiFi Router Range Extender', 'LAN Cable Crimping', 'Home Smart Bell Install'],
    description: {
      hi: 'घर, दुकान व ऑफिस में सुरक्षा कैमरे, डीवीआर ऑनलाइन मोबाइल व्यू और हाई-स्पीड वाईफाई।',
      en: 'CCTV installation, mobile live stream setup, router configuration and networking.'
    }
  },
  {
    id: 'data_entry',
    groupId: 'education',
    groupName: { hi: 'एजुकेशन व टेक', en: 'Education & Tech' },
    name: { hi: 'डाटा एंट्री व टाइपिंग (Data Entry)', en: 'Data Entry & Typist' },
    icon: '⌨️',
    typicalRatePerHour: 149,
    typicalJobRateMin: 99,
    typicalJobRateMax: 399,
    popularJobs: ['Hindi / English Document Typing', 'Excel Sheet Data Formulation', 'PDF to Word Conversion', 'Billing & Invoice Entry', 'Govt Form Online Submission'],
    description: {
      hi: 'हिंदी व अंग्रेजी फास्ट टाइपिंग, एमएस एक्सेल शीट तैयार करना और बिलिंग डाटा एंट्री ऑपरेटर।',
      en: 'Professional typists for Hindi/English typing, Excel entry, form filing and digitizing.'
    }
  },

  // Group E: Event Services (6 categories)
  {
    id: 'photographer',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'फोटोग्राफर (Photographer)', en: 'Photographer' },
    icon: '📷',
    typicalRatePerHour: 499,
    typicalJobRateMin: 999,
    typicalJobRateMax: 4999,
    popularJobs: ['Birthday & Anniversary Shoot', 'Family Portrait & Outdoor', 'Pre-Wedding Shoot', 'Shop / Business Product Photos', 'Instant Edited Album'],
    description: {
      hi: 'DSLR कैमरे से जन्मदिन, शादी, सगाई, पारिवारिक समारोह व प्रोडक्ट फोटोग्राफी।',
      en: 'High-res photography for birthdays, corporate meets, pre-weddings and celebrations.'
    }
  },
  {
    id: 'videographer',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'वीडियोग्राफर व ड्रोन पायलट (Videographer)', en: 'Videographer & Drone' },
    icon: '🎥',
    typicalRatePerHour: 699,
    typicalJobRateMin: 1499,
    typicalJobRateMax: 6999,
    popularJobs: ['4K Event Video Recording', 'Drone Aerial Video Shoot', 'Cinematic Wedding Teaser', 'Instagram Reels Creator', 'YouTube Video Editing'],
    description: {
      hi: '4K सिनेमैटिक वीडियो, ड्रोन एरियल कवरेज और सोशल मीडिया रील्स शूट करने वाले एक्सपर्ट।',
      en: '4K video shoots, drone coverage, wedding cinematics, and viral reel productions.'
    }
  },
  {
    id: 'dj_sound',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'DJ साउंड व लाइटिंग (DJ Sound)', en: 'DJ Sound & Lighting' },
    icon: '🎧',
    typicalRatePerHour: 599,
    typicalJobRateMin: 1999,
    typicalJobRateMax: 7999,
    popularJobs: ['Full Party Bass Speaker Setup', 'Wireless Mic & Stage Audio', 'Dance Floor Laser Lights', 'Baraat / Sangeet DJ Music', 'House Party Portable Sound'],
    description: {
      hi: 'शादी, बारात, बर्थडे पार्टी और संगीत हेतु धमाकेदार साउंड सिस्टम और लेजर लाइट।',
      en: 'High-bass DJ sound, digital mixer, party lighting, and wireless microphone setup.'
    }
  },
  {
    id: 'cook_at_home',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'कुक व हलवाई (Cook at Home)', en: 'Cook at Home / Chef' },
    icon: '👨‍🍳',
    badge: 'Hygiene Verified',
    typicalRatePerHour: 249,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1999,
    popularJobs: ['Small Party 15-50 Guests Meal', 'Daily Home Cook (Lunch/Dinner)', 'Traditional Sweets & Snacks', 'South Indian & North Indian Delicacies', 'Special Fasting/Vrat Food'],
    description: {
      hi: 'घर की पार्टी, किटी, पूजा या दैनिक भोजन हेतु स्वादिष्ट और शुद्ध भोजन बनाने वाले रसोइए।',
      en: 'Experienced home chefs and halwais for daily meals, rituals and party catering.'
    }
  },
  {
    id: 'event_decoration',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'इवेंट डेकोरेशन (Decoration)', en: 'Party & Stage Decorator' },
    icon: '🎈',
    typicalRatePerHour: 349,
    typicalJobRateMin: 699,
    typicalJobRateMax: 3499,
    popularJobs: ['Balloon Arch & Theme Backdrop', 'Fresh Flower Stage Decor', 'LED Fairy Lights Installation', 'Baby Welcome Home Theme', 'Haldi/Mehndi Yellow Theme'],
    description: {
      hi: 'बर्थडे बैलून डेकोरेशन, हल्दी-मेहंदी थीम, फूलों की सजावट व रंग-बिरंगी रोशनी।',
      en: 'Balloon arches, fresh floral stages, LED backdrop themes for all celebrations.'
    }
  },
  {
    id: 'waiter_catering',
    groupId: 'event',
    groupName: { hi: 'इवेंट व पार्टी', en: 'Event & Party' },
    name: { hi: 'वेटर व कैटरिंग स्टाफ (Waiter Staff)', en: 'Event Waiter & Catering' },
    icon: '🍽️',
    typicalRatePerHour: 149,
    typicalJobRateMin: 299,
    typicalJobRateMax: 799,
    popularJobs: ['Guest Welcome & Starter Serving', 'Buffet Counter Management', 'Water & Drink Distribution', 'Table Cleaning & Dish Clearance', 'Tea/Snacks Hospitality Staff'],
    description: {
      hi: 'समारोहों में मेहमानों के स्वागत, भोजन परोसने और स्वच्छता बनाए रखने वाले सभ्य वेटर।',
      en: 'Polite, uniformed waiters and hospitality staff for guest service and buffet management.'
    }
  },

  // Group F: Others & Skilled Trades (7 categories)
  {
    id: 'deep_cleaning',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'होम डीप क्लीनिंग (Cleaning Service)', en: 'Home Deep Cleaning' },
    icon: '🧹',
    typicalRatePerHour: 249,
    typicalJobRateMin: 499,
    typicalJobRateMax: 2499,
    popularJobs: ['Bathroom Tiles Descaling', 'Kitchen Chimney & Greasy Slabs', 'Sofa & Mattress Vacuum', 'Full House Festival Cleaning', 'Balcony & Floor Buffing'],
    description: {
      hi: 'बाथरूम, किचन, टाइल्स और पूरे घर की मशीन से केमिकल-फ्री डीप क्लीनिंग।',
      en: 'Intensive mechanized cleaning for greasy kitchens, bathrooms, tiles and sofas.'
    }
  },
  {
    id: 'car_cleaning',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'कार व बाइक वॉश (Car/Bike Cleaning)', en: 'Car & Bike Wash at Doorstep' },
    icon: '🚗',
    typicalRatePerHour: 149,
    typicalJobRateMin: 99,
    typicalJobRateMax: 499,
    popularJobs: ['Doorstep Car Exterior Foam Wash', 'Interior Vacuum & Dashboard Polish', 'Two-Wheeler Pressure Wash', 'Windshield Ceramic Coating', 'Tire Dressing & Air Check'],
    description: {
      hi: 'घर के दरवाजे पर हाई प्रेशर फोम वॉश, इंटीरियर वैक्यूम और वैक्स पॉलिश।',
      en: 'Doorstep high-pressure car foam wash, interior vacuuming and dashboard polish.'
    }
  },
  {
    id: 'gardener',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'माली / गार्डनर (Gardener at Home)', en: 'Gardener / Mali' },
    icon: '🌱',
    typicalRatePerHour: 149,
    typicalJobRateMin: 199,
    typicalJobRateMax: 599,
    popularJobs: ['Lawn Grass Trimming', 'Pot Repotting with Fresh Soil', 'Insecticide & Fertilizer Spray', 'Plant Pruning & Shape Cut', 'Terrace Garden Maintenance'],
    description: {
      hi: 'गमलों की मिट्टी बदलना, पौधों की कटाई-छंटाई, जैविक खाद डालना और लॉन की देखभाल।',
      en: 'Pruning, repotting, organic fertilizer supply, lawn trimming and plant healthcare.'
    }
  },
  {
    id: 'welder',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'वेल्डर व फैब्रिकेशन (Welder)', en: 'Welder & Iron Fabrication' },
    icon: '👨‍🏭',
    typicalRatePerHour: 249,
    typicalJobRateMin: 249,
    typicalJobRateMax: 899,
    popularJobs: ['Main Gate Hinge Welding', 'Balcony Grill Repair', 'Iron Bed Frame Fix', 'Tin Shed Fabrication', 'Staircase Handrail Strengthening'],
    description: {
      hi: 'लोहे के गेट, ग्रिल, शेड, रेलिंग व टूटे हुए मेटल सामान की मजबूत आर्क वेल्डिंग।',
      en: 'Arc welding for iron gates, balcony grills, railings, tin sheds and frame repairs.'
    }
  },
  {
    id: 'mason_mistry',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'राजमिस्त्री (Mason / Mistry)', en: 'Mason / Rajmistry' },
    icon: '🧱',
    typicalRatePerHour: 249,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1499,
    popularJobs: ['Broken Wall Brickwork', 'Plaster Crack Repair', 'Floor Tile Replacement', 'Bathroom Slope Adjustment', 'Cement Boundary Wall Repair'],
    description: {
      hi: 'ईंट चुनाई, प्लास्टर, टूटी टाइल बदलना और फर्श लेवलिंग के कुशल राजमिस्त्री।',
      en: 'Brick masonry, cement plaster crack patching, floor tiling and civil repair.'
    }
  },
  {
    id: 'pest_control',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'पेस्ट कंट्रोल (Pest Control)', en: 'Pest Control Specialist' },
    icon: '🐜',
    typicalRatePerHour: 299,
    typicalJobRateMin: 499,
    typicalJobRateMax: 1899,
    popularJobs: ['Cockroach Gel Treatment', 'Termite (दीमक) Drill & Fill', 'Bedbug (खटमल) Spray', 'Mosquito Fogging in Garden', 'Rat / Rodent Trapping'],
    description: {
      hi: 'कॉकरोच, दीमक, खटमल, चूहे और मच्छरों से 100% छुटकारा दिलाने वाला सुरक्षित पेस्ट कंट्रोल।',
      en: 'Odorless pest control for termites, cockroaches, bedbugs and mosquitoes.'
    }
  },
  {
    id: 'sofa_cleaning',
    groupId: 'others',
    groupName: { hi: 'अन्य कुशल काम', en: 'Other Skilled Trades' },
    name: { hi: 'सोफा व कारपेट ड्राई क्लीनिंग (Sofa Dry Clean)', en: 'Sofa & Carpet Cleaning' },
    icon: '🛋️',
    typicalRatePerHour: 249,
    typicalJobRateMin: 399,
    typicalJobRateMax: 1499,
    popularJobs: ['5-Seater Sofa Shampoo Wash', 'Carpet Stain Removal', 'Mattress Sanitization', 'Dining Chair Fabric Polish', 'Leather Couch Conditioning'],
    description: {
      hi: 'सोफा, गद्दे और कालीनों के जिद्दी दाग निकालने हेतु शैम्पू वॉश व वैक्यूम ड्राई क्लीनिंग।',
      en: 'Fabric shampooing, stain extraction and sanitization for sofas, carpets and mattresses.'
    }
  }
];

// PAN-INDIA STATES & CITIES DIRECTORY
export interface StateCityRecord {
  state: string;
  cities: string[];
}

export const PAN_INDIA_LOCATIONS: StateCityRecord[] = [
  {
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    cities: ['Bhopal', 'Indore', 'Rewa', 'Jabalpur', 'Gwalior', 'Ujjain', 'Satna', 'Sagar', 'Chhindwara', 'Ratlam', 'Singrauli']
  },
  {
    state: 'Delhi NCR (दिल्ली एनसीआर)',
    cities: ['New Delhi', 'Noida', 'Gurugram', 'Ghaziabad', 'Faridabad', 'Greater Noida']
  },
  {
    state: 'Maharashtra (महाराष्ट्र)',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur']
  },
  {
    state: 'Uttar Pradesh (उत्तर प्रदेश)',
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Gorakhpur', 'Bareilly', 'Aligarh']
  },
  {
    state: 'Rajasthan (राजस्थान)',
    cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Bhilwara']
  },
  {
    state: 'Gujarat (गुजरात)',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar']
  },
  {
    state: 'Karnataka (कर्नाटक)',
    cities: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi']
  },
  {
    state: 'Telangana & AP (तेलंगाना व आंध्र)',
    cities: ['Hyderabad', 'Warangal', 'Visakhapatnam', 'Vijayawada', 'Guntur']
  },
  {
    state: 'Bihar & Jharkhand (बिहार व झारखंड)',
    cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Ranchi', 'Jamshedpur', 'Dhanbad']
  },
  {
    state: 'Punjab & Haryana (पंजाब व हरियाणा)',
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Panipat', 'Karnal', 'Ambala']
  },
  {
    state: 'West Bengal (पश्चिम बंगाल)',
    cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol']
  }
];

// INITIAL SEED GIG WORKERS POOL (ALL-INDIA 100% AADHAAR VERIFIED)
export const INITIAL_GIG_WORKERS_POOL: GigWorkerProfile[] = [
  {
    id: 'gw-01',
    name: 'Rameshwar Sahu',
    gender: 'male',
    phone: '+91 98261 44520',
    whatsapp: '+91 98261 44520',
    aadhaarNumber: 'XXXX-XXXX-9421',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'electrician',
    secondaryCategoryIds: ['ac_repair', 'ro_purifier'],
    experienceYears: 7,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Bhopal',
    area: 'MP Nagar Zone 2 / Shivaji Nagar',
    chargePerHour: 199,
    chargePerJobMin: 149,
    upiId: 'rameshwar.sahu@upi',
    rating: 4.9,
    totalReviews: 218,
    completedJobsCount: 412,
    distanceKm: 1.4,
    etaMinutes: 12,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-04-10',
    languages: ['Hindi', 'Hinglish'],
    skillsList: ['Wiring', 'MCB Tripping', 'Fan Installation', 'Inverter Setup'],
    policeVerificationNo: 'MP-CID-ELEC-4920'
  },
  {
    id: 'gw-02',
    name: 'Mohammad Imran Ansari',
    gender: 'male',
    phone: '+91 94250 88214',
    whatsapp: '+91 94250 88214',
    aadhaarNumber: 'XXXX-XXXX-5512',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'plumber',
    secondaryCategoryIds: ['ro_purifier'],
    experienceYears: 9,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Bhopal',
    area: 'Arera Colony / 10 No. Market',
    chargePerHour: 199,
    chargePerJobMin: 149,
    upiId: 'imran.ansari@oksbi',
    rating: 4.8,
    totalReviews: 184,
    completedJobsCount: 389,
    distanceKm: 2.1,
    etaMinutes: 18,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-02-14',
    languages: ['Hindi', 'Urdu'],
    skillsList: ['Pipe Leaks', 'Motor Pump', 'Tank Overflow', 'Sanitary Fitting'],
    policeVerificationNo: 'MP-CID-PLUM-3382'
  },
  {
    id: 'gw-03',
    name: 'Sunita Sharma',
    gender: 'female',
    phone: '+91 98932 11943',
    whatsapp: '+91 98932 11943',
    aadhaarNumber: 'XXXX-XXXX-1084',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'beautician',
    secondaryCategoryIds: ['mehndi_artist'],
    experienceYears: 6,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Bhopal',
    area: 'Kolar Road / Chuna Bhatti',
    chargePerHour: 299,
    chargePerJobMin: 399,
    upiId: 'sunita.beauty@paytm',
    rating: 5.0,
    totalReviews: 310,
    completedJobsCount: 540,
    distanceKm: 2.8,
    etaMinutes: 22,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-01-08',
    languages: ['Hindi', 'English'],
    skillsList: ['Facial', 'Bridal Waxing', 'Threading', 'Party Makeup'],
    policeVerificationNo: 'MP-CID-BEAUTY-7719'
  },
  {
    id: 'gw-04',
    name: 'Vikram Rajput',
    gender: 'male',
    phone: '+91 94065 72201',
    whatsapp: '+91 94065 72201',
    aadhaarNumber: 'XXXX-XXXX-6629',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'ac_repair',
    secondaryCategoryIds: ['fridge_repair', 'washing_machine'],
    experienceYears: 8,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Rewa',
    area: 'Civil Lines / Sirmour Chowk',
    chargePerHour: 349,
    chargePerJobMin: 399,
    upiId: 'vikram.ac@ybl',
    rating: 4.9,
    totalReviews: 142,
    completedJobsCount: 290,
    distanceKm: 1.8,
    etaMinutes: 15,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-03-21',
    languages: ['Hindi', 'Bagheli'],
    skillsList: ['Jet Pump Cleaning', 'Gas R32 Refill', 'PCB Repair', 'Installation'],
    policeVerificationNo: 'MP-RW-AC-9102'
  },
  {
    id: 'gw-05',
    name: 'Santosh Vishwakarma',
    gender: 'male',
    phone: '+91 93996 08239',
    whatsapp: '+91 93996 08239',
    aadhaarNumber: 'XXXX-XXXX-8239',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'carpenter',
    secondaryCategoryIds: ['welder', 'painter'],
    experienceYears: 12,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Rewa',
    area: 'Bodabag / Rewa Fort Road',
    chargePerHour: 249,
    chargePerJobMin: 299,
    upiId: 'santosh.carpenter@upi',
    rating: 5.0,
    totalReviews: 298,
    completedJobsCount: 610,
    distanceKm: 0.9,
    etaMinutes: 10,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2024-11-01',
    languages: ['Hindi', 'Bagheli'],
    skillsList: ['Lock Fixing', 'Bed Assembly', 'Modular Kitchen', 'Wood Polish'],
    policeVerificationNo: 'MP-RW-CARP-0021'
  },
  {
    id: 'gw-06',
    name: 'Pankaj Tiwari',
    gender: 'male',
    phone: '+91 98263 77410',
    whatsapp: '+91 98263 77410',
    aadhaarNumber: 'XXXX-XXXX-4491',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'driver_on_demand',
    secondaryCategoryIds: ['delivery_boy'],
    experienceYears: 10,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Indore',
    area: 'Vijay Nagar / Palasia',
    chargePerHour: 149,
    chargePerJobMin: 299,
    upiId: 'pankaj.driver@oksbi',
    rating: 4.9,
    totalReviews: 240,
    completedJobsCount: 520,
    distanceKm: 3.1,
    etaMinutes: 20,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-02-01',
    languages: ['Hindi', 'English', 'Malwi'],
    skillsList: ['Manual & Automatic', 'Night Highway Safe', 'Commercial Badge', 'Airport Escort'],
    policeVerificationNo: 'MP-IND-DRV-6120'
  },
  {
    id: 'gw-07',
    name: 'Anjali Saxena',
    gender: 'female',
    phone: '+91 97110 34821',
    whatsapp: '+91 97110 34821',
    aadhaarNumber: 'XXXX-XXXX-2194',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'home_tutor',
    secondaryCategoryIds: ['data_entry'],
    experienceYears: 5,
    state: 'Delhi NCR (दिल्ली एनसीआर)',
    city: 'New Delhi',
    area: 'Lajpat Nagar / South Ext',
    chargePerHour: 249,
    chargePerJobMin: 249,
    upiId: 'anjali.tutor@paytm',
    rating: 4.9,
    totalReviews: 124,
    completedJobsCount: 210,
    distanceKm: 2.2,
    etaMinutes: 16,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-05-12',
    languages: ['English', 'Hindi'],
    skillsList: ['Class 6-10 Maths', 'Science', 'NCERT Solutions', 'English Fluency'],
    policeVerificationNo: 'DL-CID-TUTR-9912'
  },
  {
    id: 'gw-08',
    name: 'Akash Deep Verma',
    gender: 'male',
    phone: '+91 98104 55902',
    whatsapp: '+91 98104 55902',
    aadhaarNumber: 'XXXX-XXXX-7734',
    aadhaarVerified: true,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    primaryCategoryId: 'computer_repair',
    secondaryCategoryIds: ['cctv_wifi', 'mobile_repair'],
    experienceYears: 7,
    state: 'Delhi NCR (दिल्ली एनसीआर)',
    city: 'Noida',
    area: 'Sector 62 / Sector 18',
    chargePerHour: 249,
    chargePerJobMin: 299,
    upiId: 'akash.tech@ybl',
    rating: 4.8,
    totalReviews: 176,
    completedJobsCount: 340,
    distanceKm: 3.5,
    etaMinutes: 24,
    status: 'available',
    verificationBadge: 'gold_verified',
    joinedDate: '2025-03-01',
    languages: ['Hindi', 'English'],
    skillsList: ['Windows Formatting', 'SSD Upgrade', 'Data Recovery', 'WiFi Mesh Setup'],
    policeVerificationNo: 'UP-NOIDA-PC-4819'
  }
];
