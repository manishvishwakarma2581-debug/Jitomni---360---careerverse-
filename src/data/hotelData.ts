// ============================================================================
// JITOMNI 360° — PAN-INDIA HOTEL & STAY DIRECTORY DATA
// "100% Verified Stays Across Indian Cities, Hospitals & Railway Stations"
// Zero Hidden Charges • Instant QR Voucher Confirmation • 0% Surge
// ============================================================================

export type HotelStayCategory = 
  | 'all'
  | 'budget' 
  | 'luxury' 
  | 'near_hospital' 
  | 'near_station' 
  | 'transit_hourly' 
  | 'dharamshala' 
  | 'homestay';

export interface HotelRoomType {
  id: string;
  name: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  pricePerHourTransit?: number; // e.g. 4-hour transit rate
  features: string[];
  isAvailable: boolean;
  image: string;
}

export interface HotelProperty {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  landmark: string;
  category: 'budget' | 'luxury' | 'near_hospital' | 'near_station' | 'transit_hourly' | 'dharamshala' | 'homestay';
  rating: number;
  reviewsCount: number;
  distanceHospitalKm: number;
  hospitalName: string;
  distanceStationKm: number;
  stationName: string;
  phone: string;
  whatsapp?: string;
  startingPrice: number;
  image: string;
  galleryImages: string[];
  amenities: string[];
  isVerified: boolean;
  verifiedBadge: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  roomTypes: HotelRoomType[];
}

export interface HotelBookingRecord {
  bookingId: string; // e.g. JIT-HTL-84920
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelPhone: string;
  hotelAddress: string;
  roomTypeId: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  bookingType: 'nightly' | 'hourly_transit';
  transitHours?: number;
  guestName: string;
  guestPhone: string;
  guestAadhaarMasked: string;
  guestCount: number;
  roomCount: number;
  totalNights: number;
  roomRate: number;
  totalRoomCharge: number;
  platformFee: number;
  taxGst: number;
  totalPayable: number;
  paymentStatus: 'paid_online' | 'pay_at_hotel';
  paymentMethod: 'upi' | 'card' | 'pay_at_hotel';
  bookingStatus: 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  otpCheckIn: string;
  qrVerificationPayload: string;
  createdAt: string;
  specialRequests?: string;
}

export const INITIAL_HOTELS_POOL: HotelProperty[] = [
  // --- REWA HOTELS ---
  {
    id: 'htl-rwa-01',
    name: 'होटल कृष्णा रेजीडेंसी (Hotel Krishna Residency)',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    address: 'सिरमौर चौराहा, सिविल लाइन्स, रीवा',
    landmark: 'संजय गांधी अस्पताल से मात्र 800 मीटर',
    category: 'near_hospital',
    rating: 4.8,
    reviewsCount: 342,
    distanceHospitalKm: 0.8,
    hospitalName: 'संजय गांधी स्मृति अस्पताल (SGMH)',
    distanceStationKm: 2.5,
    stationName: 'रीवा रेलवे स्टेशन',
    phone: '+91 98261 77201',
    whatsapp: '+91 98261 77201',
    startingPrice: 899,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['24x7 एसी (AC)', 'फ्री हाई-स्पीड वाईफाई', 'लिफ्ट सुविधा', 'गर्म पानी (Geyser)', 'शुद्ध शाकाहारी भोजनालय', 'अस्पताल व्हीलचेयर सहायता'],
    isVerified: true,
    verifiedBadge: 'JITOMNI Gold Verified • Hospital Empanelled',
    description: 'मरीजों के परिजनों और डॉक्टरों के लिए विशेष रियायती दर पर स्वच्छ, शांत और आरामदायक कमरों की सुविधा। 24 घंटे गर्म पानी और शुद्ध भोजन उपलब्ध।',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'rwa01-std',
        name: 'स्टैंडर्ड एसी रूम (Standard AC Room)',
        capacity: 2,
        bedType: '1 Double Bed',
        pricePerNight: 899,
        pricePerHourTransit: 349,
        features: ['AC', 'Attached Western Washroom', 'TV', 'Free WiFi'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'rwa01-dlx',
        name: 'डीलक्स फैमिली रूम (Deluxe Family Room - 3 Bed)',
        capacity: 4,
        bedType: '1 King Bed + 1 Single Bed',
        pricePerNight: 1399,
        pricePerHourTransit: 499,
        features: ['AC', 'Spacious Seating', 'Balcony', 'Geyser', 'Electric Kettle'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'htl-rwa-02',
    name: 'संजय गांधी सेवा सदन व धर्मशाला (SGMH Seva Sadan Dharamshala)',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    address: 'मेडिकल कॉलेज गेट नं. 2 के सामने, अस्पताल रोड, रीवा',
    landmark: 'SGMH इमरजेंसी वार्ड के ठीक सामने (100 मीटर)',
    category: 'dharamshala',
    rating: 4.6,
    reviewsCount: 512,
    distanceHospitalKm: 0.1,
    hospitalName: 'संजय गांधी स्मृति अस्पताल (SGMH)',
    distanceStationKm: 3.2,
    stationName: 'रीवा रेलवे स्टेशन',
    phone: '+91 94250 88910',
    startingPrice: 350,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['अति-सस्ता कमरा व डॉर्मिटरी', 'आरओ पेयजल', 'स्वच्छ शौचालय', 'कंबल व गद्दे', '24 घंटे खुला', 'ताला चाबी लॉकर'],
    isVerified: true,
    verifiedBadge: 'Sovereign Public Trust • Zero Profit Charity',
    description: 'अस्पताल में भर्ती मरीजों के तीमारदारों के लिए स्वच्छ और न्यूनतम शुल्क में सुरक्षित आश्रय। दिन-रात 24 घंटे चेक-इन सुविधा।',
    checkInTime: '24 Hours Open',
    checkOutTime: 'Flexible 24 Hours',
    roomTypes: [
      {
        id: 'rwa02-dorm',
        name: 'सिंगल डॉर्मिटरी बेड (Dormitory Single Bed)',
        capacity: 1,
        bedType: 'Single Bed with Locker',
        pricePerNight: 150,
        pricePerHourTransit: 99,
        features: ['Clean Mattress & Pillow', 'Locker', 'Common Clean Washroom', 'RO Water'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'rwa02-pvt',
        name: 'प्राइवेट फैमिली रूम (Non-AC Private Room)',
        capacity: 3,
        bedType: '2 Beds',
        pricePerNight: 350,
        pricePerHourTransit: 199,
        features: ['Attached Washroom', 'Ceiling Fan', 'Lockable Door', 'Power Backup'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'htl-rwa-03',
    name: 'रॉयल रीवा स्टेशन पैलेस (Royal Rewa Station Inn)',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    address: 'रेलवे स्टेशन रोड, पन्ना नाका तिराहा, रीवा',
    landmark: 'रीवा रेलवे स्टेशन मुख्य द्वार से 200 मीटर',
    category: 'near_station',
    rating: 4.7,
    reviewsCount: 228,
    distanceHospitalKm: 2.8,
    hospitalName: 'सुपर स्पेशलिटी अस्पताल रीवा',
    distanceStationKm: 0.2,
    stationName: 'रीवा रेलवे स्टेशन (REWA WCR)',
    phone: '+91 98263 11840',
    startingPrice: 750,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['रेलवे प्लेटफॉर्म से पैदल दूरी', '24 घंटे चेक-इन', 'एसी रूम्स', 'फ्री वाईफाई', 'टैक्सी/ऑटो स्टैंड नजदीक', 'रूम सर्विस'],
    isVerified: true,
    verifiedBadge: 'Station Transit Hub Verified',
    description: 'ट्रेन यात्रियों के लिए सर्वाधिक सुविधाजनक। रात में आने वाली आनंद विहार-रीवा एक्सप्रेस या महाकौशल एक्सप्रेस के यात्रियों के लिए विशेष फ्रेश-अप सुविधा।',
    checkInTime: '24 Hours Flexible',
    checkOutTime: '12:00 PM',
    roomTypes: [
      {
        id: 'rwa03-std',
        name: 'डीलक्स एसी रूम (Deluxe AC Room)',
        capacity: 2,
        bedType: 'Queen Bed',
        pricePerNight: 750,
        pricePerHourTransit: 299,
        features: ['AC', 'LED TV', 'Hot Water', 'Desk & Chairs'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'rwa03-transit',
        name: '4-घंटे फ्रेश-अप ट्रांजिट रूम (4-Hour Transit Fresh-up)',
        capacity: 2,
        bedType: 'Double Bed',
        pricePerNight: 750,
        pricePerHourTransit: 299,
        features: ['Shower & Washroom', 'AC', 'Towel & Soap Kit', 'Rest Bed'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'htl-rwa-04',
    name: 'होटल ग्रैंड विंध्या (Hotel Grand Vindhya)',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    address: 'शिल्पी प्लाजा मार्केट के पास, कॉलेज रोड, रीवा',
    landmark: 'मार्केट व शॉपिंग मॉल से 5 मिनट की दूरी',
    category: 'luxury',
    rating: 4.9,
    reviewsCount: 418,
    distanceHospitalKm: 1.5,
    hospitalName: 'संजय गांधी स्मृति अस्पताल (SGMH)',
    distanceStationKm: 2.1,
    stationName: 'रीवा रेलवे स्टेशन',
    phone: '+91 98260 99402',
    startingPrice: 1899,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['4-स्टार सुविधाएं', 'मल्टीकुजीन रेस्टोरेंट', 'कॉन्फ्रेंस हॉल', 'फ्री वैले पार्किंग', 'बाथरूम बाथटब', '24 घंटे कैब सपोर्ट'],
    isVerified: true,
    verifiedBadge: 'Vindhya Premium Hospitality',
    description: 'बिजनेस एक्जीक्यूटिव्स, टूरिस्ट्स व फैमिली के लिए रीवा का प्रतिष्ठित होटल। शानदार इंटीरियर्स और त्वरित सेवा।',
    checkInTime: '01:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'rwa04-exec',
        name: 'एक्जीक्यूटिव किंग सुइट (Executive King Suite)',
        capacity: 2,
        bedType: 'King Size Bed',
        pricePerNight: 1899,
        pricePerHourTransit: 799,
        features: ['Central AC', 'Work Desk', 'Mini Fridge', 'Free Breakfast', 'Smart TV'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // --- BHOPAL HOTELS ---
  {
    id: 'htl-bpl-01',
    name: 'होटल रॉयल रीजेंसी भोपाल (Hotel Royal Regency Bhopal)',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    address: 'एमपी नगर जोन 1, बैंक स्ट्रीट, भोपाल',
    landmark: 'रानी कमलापति (हबीबगंज) रेलवे स्टेशन से 1.2 किमी',
    category: 'near_station',
    rating: 4.85,
    reviewsCount: 680,
    distanceHospitalKm: 3.5,
    hospitalName: 'एम्स भोपाल (AIIMS Bhopal)',
    distanceStationKm: 1.2,
    stationName: 'रानी कमलापति स्टेशन (RKMP)',
    phone: '+91 755 4289011',
    startingPrice: 1199,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['एसी डीलक्स रूम', 'फास्ट वाईफाई', 'लिफ्ट', '24 घंटे इन-हाउस किचन', 'टैक्सी पिकअप', 'एम्स व स्टेशन कनेक्टिविटी'],
    isVerified: true,
    verifiedBadge: 'JITOMNI Diamond Verified • Capital Hub',
    description: 'रानी कमलापति स्टेशन व एम्स भोपाल के बीच स्थित प्रीमियम बजट होटल। स्वच्छ वातावरण और सुरक्षित माहौल।',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'bpl01-dlx',
        name: 'प्रीमियर एसी डबल रूम (Premier AC Double)',
        capacity: 2,
        bedType: 'Double Bed',
        pricePerNight: 1199,
        pricePerHourTransit: 449,
        features: ['AC', 'WiFi', 'Geyser', 'Breakfast Option', 'Daily Housekeeping'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'htl-bpl-02',
    name: 'एम्स केयर होमस्टे व गेस्ट हाउस (AIIMS Care Guest House Bhopal)',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    address: 'साकेत नगर, एम्स अस्पताल मुख्य द्वार के पास, भोपाल',
    landmark: 'एम्स भोपाल ओपीडी से केवल 400 मीटर',
    category: 'near_hospital',
    rating: 4.75,
    reviewsCount: 390,
    distanceHospitalKm: 0.4,
    hospitalName: 'एम्स भोपाल (AIIMS Bhopal)',
    distanceStationKm: 4.8,
    stationName: 'रानी कमलापति स्टेशन',
    phone: '+91 98261 44520',
    startingPrice: 650,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['एम्स से वॉकिंग डिस्टेंस', 'मरीज स्पेशल खिचड़ी व सादा भोजन', 'व्हीलचेयर फ्रेंडली', 'लिफ्ट', '24 घंटे गर्म पानी', 'नर्स ऑन कॉल'],
    isVerified: true,
    verifiedBadge: 'Medical Companion Certified Hub',
    description: 'एम्स भोपाल में इलाज कराने आने वाले मरीजों व उनके परिवारों के लिए विशेष रूप से डिज़ाइन किया गया सुरक्षित गेस्ट हाउस।',
    checkInTime: '24 Hours Open',
    checkOutTime: '12:00 PM',
    roomTypes: [
      {
        id: 'bpl02-std',
        name: 'पेशेंट कम्फर्ट एसी रूम (Patient Comfort AC Room)',
        capacity: 2,
        bedType: 'Medical Grade Clean Beds',
        pricePerNight: 650,
        pricePerHourTransit: 299,
        features: ['AC', 'Low Height Beds', 'Grab Rails in Washroom', 'Quiet Environment'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // --- INDORE HOTELS ---
  {
    id: 'htl-ind-01',
    name: 'होटल एम्पायर इंदौर (Hotel Empire Indore)',
    city: 'Indore',
    state: 'Madhya Pradesh',
    address: 'छोटी ग्वालटोली, इंदौर रेलवे स्टेशन के सामने, इंदौर',
    landmark: 'इंदौर जंक्शन रेलवे स्टेशन से 150 मीटर',
    category: 'near_station',
    rating: 4.8,
    reviewsCount: 840,
    distanceHospitalKm: 2.1,
    hospitalName: 'एमवाय अस्पताल इंदौर (MY Hospital)',
    distanceStationKm: 0.15,
    stationName: 'इंदौर जंक्शन (INDB)',
    phone: '+91 731 2541090',
    startingPrice: 999,
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['स्टेशन से 2 मिनट पैदल', 'स्वच्छ एसी रूम', '24x7 सर्विस', 'फ्री वाईफाई', 'इंदौर सराफा बाजार नजदीक', 'पार्किंग'],
    isVerified: true,
    verifiedBadge: 'JITOMNI Verified Partner',
    description: 'इंदौर शहर के केंद्र में स्टेशन और सराफा फूड मार्केट के पास सबसे सुविधाजनक व किफायती ठहराव।',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'ind01-std',
        name: 'सुपीरियर एसी रूम (Superior AC Room)',
        capacity: 2,
        bedType: 'Double Bed',
        pricePerNight: 999,
        pricePerHourTransit: 399,
        features: ['AC', 'Free WiFi', 'Room Service', 'Geyser'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // --- PRAYAGRAJ / ALLAHABAD HOTELS ---
  {
    id: 'htl-pry-01',
    name: 'त्रिवेणी संगम इन (Triveni Sangam Inn Prayagraj)',
    city: 'Prayagraj',
    state: 'Uttar Pradesh',
    address: 'सिविल लाइन्स, सुभाष चौराहा, प्रयागराज',
    landmark: 'प्रयागराज जंक्शन रेलवे स्टेशन से 800 मीटर',
    category: 'near_station',
    rating: 4.82,
    reviewsCount: 720,
    distanceHospitalKm: 1.8,
    hospitalName: 'एसआरएन अस्पताल प्रयागराज (SRN Hospital)',
    distanceStationKm: 0.8,
    stationName: 'प्रयागराज जंक्शन (PRYJ)',
    phone: '+91 94520 11982',
    startingPrice: 850,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['संगम स्नान व बोटिंग टूर गाइड', 'एसी रूम्स', 'फ्री वाईफाई', 'शुद्ध शाकाहारी भोजन', '24 घंटे ऑटो व टैक्सी सपोर्ट'],
    isVerified: true,
    verifiedBadge: 'Tirth Yatra Certified Stay',
    description: 'संगम स्नान, हाईकोर्ट कार्य व स्टेशन यात्रियों के लिए सुरक्षित और स्वच्छ स्टे। रीवा-प्रयागराज रूट यात्रियों की पहली पसंद।',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'pry01-std',
        name: 'डीलक्स एसी रूम (Deluxe AC Room)',
        capacity: 2,
        bedType: 'Double Bed',
        pricePerNight: 850,
        pricePerHourTransit: 349,
        features: ['AC', 'Geyser', 'TV', 'Clean Linen', 'WiFi'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // --- VARANASI / KASHI HOTELS ---
  {
    id: 'htl-vns-01',
    name: 'काशी विश्वनाथ हेरिटेज होम (Kashi Vishwanath Heritage Stay)',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'गोदौलिया चौराहा, दशाश्वमेध घाट रोड, वाराणसी',
    landmark: 'श्री काशी विश्वनाथ मंदिर कॉरिडोर से 300 मीटर',
    category: 'near_station',
    rating: 4.9,
    reviewsCount: 950,
    distanceHospitalKm: 3.2,
    hospitalName: 'सर सुंदरलाल अस्पताल बीएचयू (IMS BHU)',
    distanceStationKm: 3.5,
    stationName: 'वाराणसी कैंट रेलवे स्टेशन (BSB)',
    phone: '+91 94152 88201',
    startingPrice: 1250,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['मंदिर कॉरिडोर से 3 मिनट पैदल', 'गंगा आरती दर्शन सहायता', '24 घंटे एसी', 'शुद्ध सात्विक रसोई', 'सुरक्षित फैमिली लॉज'],
    isVerified: true,
    verifiedBadge: 'Kashi Yatra Empanelled',
    description: 'बाबा विश्वनाथ दर्शन व गंगा आरती के लिए सर्वोत्तम स्थान। विंध्य व पूर्वांचल के श्रद्धालुओं के लिए विशेष सत्कार।',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    roomTypes: [
      {
        id: 'vns01-std',
        name: 'हेरिटेज एसी रूम (Heritage AC Room)',
        capacity: 2,
        bedType: 'Queen Bed',
        pricePerNight: 1250,
        pricePerHourTransit: 499,
        features: ['AC', 'Free Ganga View Balcony Access', 'WiFi', 'Geyser'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // --- DELHI NCR HOTELS ---
  {
    id: 'htl-del-01',
    name: 'एम्स न्यू दिल्ली केयर सराय (AIIMS Delhi Care Sarai)',
    city: 'Delhi NCR',
    state: 'Delhi',
    address: 'गौतम नगर, एम्स अस्पताल के पास, नई दिल्ली',
    landmark: 'एम्स मुख्य द्वार से 500 मीटर (सफदरजंग अस्पताल नजदीक)',
    category: 'near_hospital',
    rating: 4.8,
    reviewsCount: 1140,
    distanceHospitalKm: 0.5,
    hospitalName: 'एम्स नई दिल्ली (AIIMS New Delhi)',
    distanceStationKm: 7.2,
    stationName: 'नई दिल्ली रेलवे स्टेशन (NDLS)',
    phone: '+91 11 26598012',
    startingPrice: 799,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['एम्स व सफदरजंग के पास', 'एसी रूम्स व डॉर्मिटरी', 'लिफ्ट', '24 घंटे पावर बैकअप', 'मरीज सहायता डेस्क', 'किचन सुविधा'],
    isVerified: true,
    verifiedBadge: 'National Apex Medical Stay Verified',
    description: 'पूरे भारत से एम्स नई दिल्ली में गंभीर इलाज के लिए आने वाले परिवारों के लिए सुरक्षित, स्वच्छ और उचित दर का विश्राम गृह।',
    checkInTime: '24 Hours Open',
    checkOutTime: '12:00 PM',
    roomTypes: [
      {
        id: 'del01-std',
        name: 'मेडिकल फैमिली एसी रूम (Medical Family AC Room)',
        capacity: 3,
        bedType: '1 Double + 1 Single',
        pricePerNight: 799,
        pricePerHourTransit: 349,
        features: ['AC', 'Clean Linen', 'RO Water', 'Hot Shower', 'Lift Access'],
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const ALL_INDIAN_HOTEL_CITIES = [
  'Rewa',
  'Bhopal',
  'Indore',
  'Jabalpur',
  'Prayagraj',
  'Varanasi',
  'Ayodhya',
  'Satna',
  'Delhi NCR',
  'Mumbai',
  'Jaipur',
  'Lucknow',
  'Chitrakoot',
  'Maihar'
];
