export interface ITITrade {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  code: string;
  duration: '1 Year (2 Semesters)' | '2 Years (4 Semesters)';
  category: 'Engineering Trade' | 'Non-Engineering Trade';
  eligibility: string;
  certification: 'NCVT (National Council for Vocational Training) / SCVT';
  icon: string;
  badgeColor: string;
  overview: { hi: string; en: string; hinglish: string };
  coreSyllabus: {
    semesterOrYear: string;
    tradeTheory: string[];
    tradePractical: string[];
    workshopCalcScience: string[];
    engineeringDrawingOrIT: string[];
  }[];
  keyToolsAndEquipment: string[];
  govtJobOpportunities: string[];
  privateSectorJobs: string[];
  selfEmploymentPotential: { hi: string; en: string; hinglish: string };
  averageSalary: { freshApprentice: string; experiencedTechnician: string; govtGradePay: string };
  citsInstructorScope: string;
}

export interface ITIGovtExamRoadmap {
  id: string;
  organization: string;
  postName: string;
  eligibility: string;
  selectionProcess: string[];
  examPattern: {
    tier1: string;
    tier2TradeTest: string;
    skillTest: string;
  };
  salaryStructure: string;
  officialPortal: string;
  preparationStrategy: string[];
  icon: string;
}

export interface ITIWorkshopTool {
  id: string;
  name: { hi: string; en: string; hinglish: string };
  category: 'Precision Measuring' | 'Cutting & Striking' | 'Electrical & Diagnostic' | 'Welding & Thermal' | 'Work Holding';
  leastCountOrRating: string;
  useCase: { hi: string; en: string; hinglish: string };
  safetyRule: { hi: string; en: string; hinglish: string };
  icon: string;
}

export interface ITIMockQuestion {
  id: string;
  trade: 'Electrician' | 'Fitter' | 'Welder' | 'COPA' | 'WCS (Workshop Calc)' | 'Employability Skills';
  question: { hi: string; en: string };
  options: { hi: string; en: string }[];
  correctAnswer: number;
  explanation: { hi: string; en: string };
}

export const ITI_TRADES_DATA: ITITrade[] = [
  {
    id: 'electrician',
    name: {
      hi: 'इलेक्ट्रीशियन (Electrician)',
      en: 'Electrician',
      hinglish: 'Electrician Trade (2 Years)'
    },
    code: 'CTS-ELE-01',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Mathematics (Minimum 50% aggregate)',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '⚡',
    badgeColor: 'amber',
    overview: {
      hi: 'इलेक्ट्रीशियन ट्रेड में एसी/डीसी करंट, ट्रांसफार्मर, मोटर वाइंडिंग, घरेलू व औद्योगिक वायरिंग, सोलर पैनल इंस्टॉलेशन और पावर ग्रिड सिस्टम की गहन थ्योरी व वर्कशॉप प्रैक्टिकल सिखाई जाती है।',
      en: 'Electrician trade covers AC/DC electrical systems, transformer maintenance, single/three-phase motors, industrial wiring, solar PV setup, and substation safety.',
      hinglish: 'Electrician me AC/DC circuits, transformer testing, motor starters (DOL/Star-Delta), wiring aur solar installations ka complete practical sikhaya jata hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Foundations & Domestic Systems)',
        tradeTheory: [
          'Safety rules, first aid for electric shock, CPR and fire extinguishers',
          'Ohm’s Law, Kirchhoff’s Laws, Series and Parallel Circuits',
          'Magnetism, Electromagnetism, Inductance & Capacitance in AC Circuits',
          'Cells, Batteries (Lead-Acid & Lithium-ion), Charging & Maintenance',
          'Domestic Wiring: Cleat, CTS, Conduit, PVC casing-capping, Staircase wiring',
          'Earthing systems: Pipe earthing, Plate earthing, Earth resistance measurement (Megger)'
        ],
        tradePractical: [
          'Skinning, twisting, crimping and soldering of electrical cables',
          'Verification of Ohm’s Law and measurement of resistance, voltage and current',
          'Installation of domestic wiring with MCB, RCCB and distribution box',
          'Testing earth resistance using Earth Tester and Megger insulation tester',
          'Assembly and connection of fluorescent tubes, LED drivers and sodium lamps'
        ],
        workshopCalcScience: [
          'Units, fractions, square root, ratio & proportion',
          'Mass, volume, density, work, power and electrical energy (kWh)',
          'Heat & temperature, thermal expansion and specific heat'
        ],
        engineeringDrawingOrIT: [
          'Engineering drawing conventions, electrical symbols (BIS/IEC standards)',
          'Single line diagrams of domestic sub-distribution boards and earthing layouts'
        ]
      },
      {
        semesterOrYear: 'Second Year (Industrial Machines, Power & Automation)',
        tradeTheory: [
          'DC Generators (Shunt, Series, Compound) - Characteristics and EMF Equation',
          'DC Motors: Starters (3-Point, 4-Point), Speed control methods (Ward Leonard)',
          'Single Phase & 3-Phase AC Induction Motors: Squirrel cage and Slip-ring',
          'Motor Starters: Direct-On-Line (DOL), Semi-Automatic Star-Delta, Auto-Transformer',
          'Transformers: Step-up/Step-down, Autotransformer, Losses, Open & Short Circuit Tests',
          'Alternators, Synchronous Motors, Transmission & Distribution Lines, Substation layout',
          'Solar PV Rooftop System, Inverters, UPS, VFD (Variable Frequency Drive) and PLC basics'
        ],
        tradePractical: [
          'Dismantling, overhaul, winding testing and reassembly of 3-Phase Induction Motors',
          'Wiring and troubleshooting of DOL and Automatic Star-Delta Starter panels',
          'Parallel operation of single-phase transformers and calculation of efficiency',
          'Solar Rooftop PV panel installation, inverter grid synchronization and earthing',
          'VFD speed control parameter setting for industrial conveyor motors'
        ],
        workshopCalcScience: [
          'Trigonometry, vectors, power factor (cos φ), active & reactive power (kVA, kVAR)',
          'Friction, elasticity, stress, strain and center of gravity in mechanical loads'
        ],
        engineeringDrawingOrIT: [
          'Schematic diagrams of 3-Phase motor starter panels, substation single-line diagram',
          'Winding diagrams: Lap and Wave winding layouts for DC armatures and AC stators'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Digital Multimeter (True-RMS)',
      'Digital Insulation Tester (Megger 500V/1000V)',
      'Digital Earth Tester',
      'AC/DC Clamp Meter',
      'Phase Sequence Indicator',
      'Wire Stripper, Crimping Plier & Soldering Station',
      'Tachometer (Digital RPM meter)'
    ],
    govtJobOpportunities: [
      'RRB ALP (Assistant Loco Pilot) & Railway Technician Grade-III',
      'State Electricity Boards (UPPCL TG-2, PSPCL, BSEB, Mahadiscom Line Attendant)',
      'ISRO Technician-B (URSC / VSSC / SDSC SHAR)',
      'DRDO CEPTAM Technician-A',
      'BARC / NPCIL Plant Operator & Technician',
      'BHEL, SAIL, IOCL, ONGC, NTPC Technician Apprentice & Regular Posts',
      'Metro Rail Corporations (DMRC, LMRC, NMRC Maintainer)'
    ],
    privateSectorJobs: [
      'Tata Power, Adani Electricity, Schneider Electric',
      'L&T Construction (Electrical Substation Projects)',
      'Solar EPC Companies (Rooftop & Ground Mount Solar Installer)',
      'Maruti Suzuki, Tata Motors (Industrial Automation Technician)',
      'Facility Management & High-Rise Building Maintenance Supervisor'
    ],
    selfEmploymentPotential: {
      hi: 'स्वयं की इलेक्ट्रिकल कांट्रेक्टिंग फर्म, घरेलू व कमर्शियल वायरिंग कांट्रेक्टर, सोलर रूफटॉप इंस्टॉलेशन एजेंसी, मोटर वाइंडिंग व इन्वर्टर रिपेयरिंग वर्कशॉप।',
      en: 'Licensed Electrical Contractor, Solar PV Installation Partner, Motor Rewinding & Panel Board fabrication workshop.',
      hinglish: 'Apna Electrical Contractor License lekar Govt tenders, Solar rooftop setup, motor rewinding aur wiring business start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹8,500 - ₹12,000 / month (NAPS Stipend)',
      experiencedTechnician: '₹22,000 - ₹45,000 / month (Private/MNCs)',
      govtGradePay: 'Level-2 / Level-4 (Pay Scale: ₹19,900 - ₹63,200 + DA/HRA)'
    },
    citsInstructorScope: 'CITS in Electrician Trade from NSTI allows direct recruitment as Junior Instructor in Govt & Private ITIs (Pay Level-6: ₹35,400 basic).'
  },
  {
    id: 'fitter',
    name: {
      hi: 'फिटर (Fitter)',
      en: 'Fitter',
      hinglish: 'Fitter Trade (2 Years)'
    },
    code: 'CTS-FIT-02',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Mathematics (Minimum 50% marks)',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '🔧',
    badgeColor: 'blue',
    overview: {
      hi: 'फिटर ट्रेड मैकेनिकल इंजीनियरिंग की रीढ़ है, जिसमें सूक्ष्म माप (Micrometer/Vernier), धातु कटिंग, फाइलिंग, खराद (Lathe) मशीन, ड्रिलिंग, हाइड्रोलिक्स, न्यूमेटिक्स एवं असेंबली का संपूर्ण प्रैक्टिकल कराया जाता है।',
      en: 'Fitter trade focuses on precision metal machining, bench fitting, lathe operation, drilling, limits-fits-tolerances, pipe assembly, hydraulics, and mechanical machine maintenance.',
      hinglish: 'Fitter trade me metal cutting, filing, micrometer precision measurement, lathe operations, pipe fitting aur industrial machine maintenance ka master level practical hota hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Bench Work, Precision Marking & Basic Machining)',
        tradeTheory: [
          'Workshop safety, hazard identification, 5S system and PPE standards',
          'Linear measurement: Steel rule, Try square, Calipers (Inside & Outside)',
          'Precision instruments: Vernier Caliper (Least count 0.02mm), Micrometer (0.01mm)',
          'Marking tools: Surface plate, Angle plate, V-block, Scribing block, Dot & Center punch',
          'Cutting tools: Hacksaw blades (pitch selection), Chisels, Files (Bastard, Smooth, Dead smooth)',
          'Drilling: Twist drill geometry (cutting angle 118°), Reaming, Tapping & Die threading',
          'Heat treatment of carbon steels: Annealing, Normalizing, Hardening, Tempering'
        ],
        tradePractical: [
          'Filing step-by-step to achieve high flatness, squareness and parallel surfaces within ±0.04mm',
          'Precision marking using Vernier Height Gauge and optical punch locator',
          'Internal and external thread cutting using Hand Taps and Split Dies on mild steel jobs',
          'Drilling, counter-sinking, counter-boring and precision hand reaming operations',
          'Manufacturing standard mating male-female mechanical joints (T-Joint, Dovetail Joint)'
        ],
        workshopCalcScience: [
          'Pythagoras theorem, trigonometry for taper calculation, calculation of drill speed & feed',
          'Specific gravity, stress, strain, shear strength and tensile limits of engineering metals'
        ],
        engineeringDrawingOrIT: [
          'Orthographic projections (1st angle vs 3rd angle projection methods)',
          'Dimensioning systems, geometric tolerance symbols, surface roughness notations (Ra values)'
        ]
      },
      {
        semesterOrYear: 'Second Year (Lathe, Assembly, Hydraulics & Industrial Maintenance)',
        tradeTheory: [
          'Lathe Machine: Parts, accessories (Chucks, Faceplate, Centers), operations (Turning, Facing, Taper, Threading)',
          'Limit, Fit and Tolerance (BIS System): Clearance fit, Transition fit, Interference fit, Hole basis system',
          'Fasteners: Bolts, nuts, studs, locking devices, keys (Gib-head, Woodruff), cotters and pins',
          'Bearings: Plain bushes, Ball bearings, Roller bearings, Needle bearings, mounting and lubrication',
          'Pipes & Pipe fittings: GI, Copper, PVC pipe joints, valves (Gate valve, Globe valve, Check valve)',
          'Hydraulics & Pneumatics: Hydraulic pumps, cylinders, direction control valves (4/2, 5/2 DCV), FRL unit',
          'Preventive, Predictive & Breakdown Maintenance of mechanical machinery'
        ],
        tradePractical: [
          'Plain turning, step turning, chamfering, knurling and taper turning on engine lathe',
          'Metric external V-thread cutting on center lathe with 60° single point tool',
          'Bearing extraction, inspection, cleaning, grease packing and re-fitting using bearing puller',
          'Assembly and pressure testing of industrial hydraulic power pack circuits and pneumatic cylinders',
          'Overhaul of centrifugal water pump, gearbox alignment and laser shaft alignment'
        ],
        workshopCalcScience: [
          'Taper angle calculation: tan θ = (D - d) / 2L; Cutting speed V = (π × D × N) / 1000',
          'Mechanical advantage, velocity ratio and efficiency of gear trains and pulley blocks'
        ],
        engineeringDrawingOrIT: [
          'Assembly drawings of plummer block, screw jack, machine vice, and steam stop valve',
          'Hydraulic and pneumatic circuit schematic symbols (ISO 1219 standards)'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Digital Vernier Caliper (0-150mm / 0.02mm accuracy)',
      'Outside & Inside Micrometer (0-25mm, 25-50mm / 0.01mm)',
      'Dial Test Indicator (DTI with magnetic stand)',
      'Vernier Height Gauge & Bevel Protractor',
      'Thread Pitch Gauge, Feeler Gauge & Radius Gauge',
      'Heavy Duty Engine Lathe Machine & Pillar Drill Press',
      'Hydraulic & Pneumatic Training Trainer Kit'
    ],
    govtJobOpportunities: [
      'Indian Railways (RRB ALP & Technician Grade-3 Mechanical/Workshop/Diesel Shed)',
      'ISRO Technician-B (Mechanical & Rocket Assembly)',
      'DRDO CEPTAM Fitter Technician',
      'BARC / NPCIL Mechanical Maintainer',
      'Ordnance Factory Board (OFB / AVNL / YIL)',
      'BHEL, SAIL, Coal India, NTPC, IOCL Refinery Technician',
      'Indian Navy Apprentice & Naval Dockyard Fitter'
    ],
    privateSectorJobs: [
      'Maruti Suzuki India Ltd, Tata Motors, Hyundai Motors (Assembly Line Tech)',
      'Larsen & Toubro (L&T Heavy Engineering, Hydrocarbon)',
      'JCB India, Mahindra & Mahindra, Bharat Forge',
      'Siemens Energy, Thermax, BEML'
    ],
    selfEmploymentPotential: {
      hi: 'प्रिसिजन लेथ व लेथ-जॉब वर्कशॉप, फैब्रिकेशन यूनिट, बोरवेल पंप रिपेयरिंग, पाइप फिटिंग एवं इंडस्ट्रियल टूल रूम कांट्रेक्टर।',
      en: 'Precision Lathe Machine Workshop, Custom Fabrication Unit, Industrial Maintenance Contractor, Machine Tool Reconditioning.',
      hinglish: 'Lathe machine workshop, fabrication shop, pump repair service aur industrial maintenance contractor agency khol sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹8,000 - ₹11,500 / month (NAPS Stipend)',
      experiencedTechnician: '₹20,000 - ₹42,000 / month (Industry Tech)',
      govtGradePay: 'Level-2 (₹19,900 - ₹63,200 basic + allowances)'
    },
    citsInstructorScope: 'CITS in Fitter Trade from NSTI enables eligibility for ITI Training Officer (TO) / Workshop Instructor posts in state govt.'
  },
  {
    id: 'welder',
    name: {
      hi: 'वेल्डर (Welder - Arc, Gas, TIG, MIG)',
      en: 'Welder',
      hinglish: 'Welder Trade (1 Year)'
    },
    code: 'CTS-WEL-03',
    duration: '1 Year (2 Semesters)',
    category: 'Engineering Trade',
    eligibility: '8th or 10th Pass',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '🔥',
    badgeColor: 'red',
    overview: {
      hi: 'वेल्डर ट्रेड में विभिन्न धातु जोड़ने की तकनीकें सिखाई जाती हैं: शील्डेड मेटल आर्क वेल्डिंग (SMAW), गैस वेल्डिंग, TIG (टंगस्टन इनर्ट गैस), MIG (मेटल इनर्ट गैस), प्लाज्मा कटिंग एवं 6G पाइप वेल्डिंग। विदेश (खाड़ी देशों) में भारी मांग।',
      en: 'Welder trade covers SMAW, Oxy-Acetylene Gas Welding, TIG (GTAW), MIG/MAG (GMAW), Plasma cutting, structural fabrication, 6G pipe welding, and NDT defect inspection.',
      hinglish: 'Welder trade me Arc, Gas, TIG, MIG aur 6G Pipe Welding sikhayi jaati hai. Gulf countries, Shipyards aur Oil Refineries me high package demand hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'Full Year Course (Fabrication, High-Tech Welding & NDT)',
        tradeTheory: [
          'Welding safety, arc flash protection, welding helmets, leather aprons and fume extractors',
          'Oxy-Acetylene Gas Welding: Gas cylinders (Oxygen black, Acetylene maroon), regulators, torches, neutral/oxidizing/reducing flames',
          'Shielded Metal Arc Welding (SMAW): AC/DC welding transformers, inverters, polarity (DCEP/DCEN), electrode coding (AWS A5.1 / IS 814)',
          'TIG Welding (GTAW): Shielding gases (Argon, Helium), tungsten electrode types (Thoriated, Zirconiated), high-frequency arc starter',
          'MIG/MAG Welding (GMAW): Solid & flux-cored wire feeders, CO2 and Argon mixture shielding, dip/spray transfer modes',
          'Pipe Welding: 1G, 2G, 5G, and 6G (45° inclined pipe fixed position) welding techniques',
          'Welding defects (Porosity, Undercut, Slag inclusion, Lack of penetration) and Non-Destructive Testing (DPT, MPT, Radiography, Ultrasonic)'
        ],
        tradePractical: [
          'Setting gas pressures, lighting torch, flame adjustment and edge preparation on sheet metal',
          'Arc welding in Flat (1F/1G), Horizontal (2F/2G), Vertical (3F/3G), and Overhead (4F/4G) positions',
          'TIG welding on Stainless Steel (SS 304/316) and Aluminum alloy sheets with zero spatter',
          'MIG welding of MS structures and vehicle chassis frames with continuous wire feed',
          '6G Pipe welding practice and performing Dye Penetrant Testing (DPT) to detect surface cracks'
        ],
        workshopCalcScience: [
          'Electrode consumption calculation, heat input formula: H = (V × I × 60) / (Travel speed × 1000)',
          'Thermal expansion of metals, melting points of alloys and residual stress relief'
        ],
        engineeringDrawingOrIT: [
          'Standard AWS / BIS welding symbols (Fillet, Butt, Plug, Spot, Seam welding symbols)',
          'Fabrication blueprints and pipe isometry drawing interpretations'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Inverter-Based Multi-Process Welder (SMAW / TIG / MIG)',
      'Oxy-Acetylene Gas Cutting & Welding Set',
      'Auto-Darkening Solar Powered Welding Helmet',
      'Plasma Arc Cutting Machine',
      'Angle Grinder (4-inch & 7-inch) & Chipping Hammer',
      'Dye Penetrant Testing (DPT) Chemical Kit'
    ],
    govtJobOpportunities: [
      'Mazagon Dock, Cochin Shipyard, Garden Reach Shipbuilders (Naval Arc Welder)',
      'Indian Railways (Railway Coach Factory - RCF Kapurthala, ICF Chennai, DLW)',
      'BHEL, SAIL, Bharat Petroleum (BPCL), Indian Oil (IOCL) Refinery Welder',
      'ISRO & DRDO Specialist Aerospace Welder',
      'Nuclear Power Corporation of India (NPCIL)'
    ],
    privateSectorJobs: [
      'Oil & Gas Offshore Rigs, Petrochemical Pipelines (6G Certified Welder)',
      'L&T Heavy Fabrication, Jindal Steel, Tata Steel',
      'Gulf Countries (UAE, Saudi Arabia, Qatar, Oman) Construction & Marine Shipyards'
    ],
    selfEmploymentPotential: {
      hi: 'स्ट्रक्चरल फैब्रिकेशन शेड वर्कशॉप, ग्रिल-गेट-शटर निर्माण, पाइपलाइन सब-कांट्रेक्टर, ऑटोमोबाइल बॉडी फैब्रिकेशन शॉप।',
      en: 'Structural Steel Fabrication Workshop, Industrial Pipeline Subcontractor, Heavy Gate & Truss Manufacturing.',
      hinglish: 'Apna fabrication unit, industrial shed contract, decorative metal welding ya mobile on-site welding service shuru kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹7,700 - ₹10,500 / month',
      experiencedTechnician: '₹25,000 - ₹50,000 / month (India) | ₹75,000 - ₹1,50,000 / month (Gulf 6G Welder)',
      govtGradePay: 'Level-2 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Welder trade opens career as Vocational Instructor in Govt ITIs.'
  },
  {
    id: 'copa',
    name: {
      hi: 'कोपा (COPA - Computer Operator & Programming Assistant)',
      en: 'COPA (Computer Operator & Programming Assistant)',
      hinglish: 'COPA Trade (1 Year)'
    },
    code: 'CTS-COP-04',
    duration: '1 Year (2 Semesters)',
    category: 'Non-Engineering Trade',
    eligibility: '10th Pass from recognized board',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '💻',
    badgeColor: 'cyan',
    overview: {
      hi: 'कोपा ट्रेड छात्रों को कंप्यूटर हार्डवेयर, ऑपरेटिंग सिस्टम (Windows/Linux), MS Office 365, Tally Prime अकाउंटिंग, डेटाबेस (MySQL), वेब डिजाइनिंग (HTML5, CSS, JS), पाइथन प्रोग्रामिंग, साइबर सुरक्षा एवं AI टूल्स का व्यावहारिक ज्ञान देती है।',
      en: 'COPA provides comprehensive training in computer hardware, OS, MS Office automation, Tally Prime accounting, MySQL, Web Development, Python scripting, Cyber Security, and AI productivity tools.',
      hinglish: 'COPA trade me Computer Hardware, MS Office Pro, Tally Prime with GST, HTML/CSS/JS web development, Python programming aur Cyber Security ka practical sikhaya jata hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'Full Year Course (Computer Operations, Coding & Automation)',
        tradeTheory: [
          'Computer Architecture, CPU, Motherboard, BIOS/UEFI, RAM, SSD, Peripheral device interfacing',
          'Operating Systems: Windows 11 configuration and Linux commands (CLI, file permissions, shell)',
          'Office Productivity: Word (Mail merge, macros), Excel (VLOOKUP, XLOOKUP, Pivot Tables, Charts), PowerPoint',
          'Database Management Systems: RDBMS concepts, SQL queries (SELECT, INSERT, UPDATE, JOINs) in MySQL',
          'Computer Networks: LAN, WAN, IP addressing (IPv4/IPv6), DNS, DHCP, Wi-Fi routers and firewall setup',
          'Web Technologies: HTML5, CSS3 styling, JavaScript basics (DOM manipulation, event handling)',
          'Python Programming: Variables, control flow, functions, file I/O, data structures (Lists, Dicts)',
          'Accounting: Tally Prime with GST, Ledger creation, Vouchers, Balance sheet generation',
          'Cyber Security Essentials, data backup strategies, digital certificates and Generative AI tools'
        ],
        tradePractical: [
          'PC assembly, hardware troubleshooting, OS installation and driver configuration',
          'Creating complex automated spreadsheets with advanced Excel formulas, dashboards and data analysis',
          'Designing and deploying responsive multi-page static websites using HTML5, CSS3 and JavaScript',
          'Writing SQL scripts to create schemas, enforce primary/foreign keys and generate business reports',
          'Writing basic Python automation scripts to parse data files and automate routine tasks',
          'GST invoicing, inventory management and bank reconciliation in Tally Prime'
        ],
        workshopCalcScience: [
          'Binary, Octal, Hexadecimal number conversions, Boolean logic gates and data storage metrics'
        ],
        engineeringDrawingOrIT: [
          'Flowcharting, Entity Relationship (ER) diagrams, Network topology layouts and UI wireframes'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'High-Performance Desktop Systems (Core i5/i7, 16GB RAM, NVMe SSD)',
      'MS Office 365 / LibreOffice Suite',
      'Tally Prime Gold Multi-User Accounting Software',
      'VS Code Editor & Python 3.12 Runtime',
      'MySQL Workbench / XAMPP Server',
      'Network Switch, RJ-45 Crimping Tool & Cable Tester'
    ],
    govtJobOpportunities: [
      'Data Entry Operator (DEO) in Central/State Ministries (SSC CHSL, High Courts, Collectorates)',
      'Indian Railways Computer Operator / Ticket Booking Clerk Support',
      'DRDO & ISRO Admin & IT Assistant',
      'Panchayat Sachiv / Gram Rozgar Sahayak IT Operator',
      'Banking Sector Customer Service & Back-Office Operator'
    ],
    privateSectorJobs: [
      'TCS, Infosys, Wipro, HCL (BPO / Back Office / IT Helpdesk Support)',
      'Accounting & GST Billing Specialist in CA firms and retail chains',
      'Junior Web Designer & Digital Content Specialist',
      'E-Commerce Operations Executive (Amazon / Flipkart seller portal manager)'
    ],
    selfEmploymentPotential: {
      hi: 'डिजिटल सेवा केंद्र (CSC - Common Service Center), MP Online / e-Mitra कियोस्क, साइबर कैफे, Tally अकाउंटिंग सर्विस एवं वेब डिजाइनिंग फ्रीलांसिंग।',
      en: 'Common Service Center (CSC), Tax & GST Return Filing Kiosk, Web Design Agency, Cyber Cafe & Printing Hub.',
      hinglish: 'CSC Center, e-Mitra Kiosk, GST billing consultancy, computer repair shop ya freelance web developer ban sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹7,500 - ₹10,000 / month',
      experiencedTechnician: '₹18,000 - ₹35,000 / month',
      govtGradePay: 'Level-2 / Level-4 (₹19,900 - ₹25,500 basic pay)'
    },
    citsInstructorScope: 'CITS in COPA Trade qualifies for ITI Computer Instructor in government vocational training colleges.'
  },
  {
    id: 'diesel_mechanic',
    name: {
      hi: 'डीजल मैकेनिक (Mechanic Diesel)',
      en: 'Mechanic Diesel',
      hinglish: 'Mechanic Diesel Trade (1 Year)'
    },
    code: 'CTS-DES-05',
    duration: '1 Year (2 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '🚜',
    badgeColor: 'emerald',
    overview: {
      hi: 'डीजल इंजन की बनावट, 2-स्ट्रोक व 4-स्ट्रोक इंजन, CRDi फ्यूल इंजेक्शन, टर्बोचार्जर, BS-VI उत्सर्जन प्रणाली, हाइड्रोलिक ब्रेकिंग एवं आधुनिक हाइब्रिड/इलेक्ट्रिक ऑटोमोबाइल तकनीक का पूर्ण प्रशिक्षण।',
      en: 'Mechanic Diesel covers IC engine mechanics, cylinder head/block overhaul, CRDi fuel systems, turbochargers, BS-VI exhaust gas recirculation (EGR), SCR AdBlue systems, and vehicle diagnostics.',
      hinglish: 'Mechanic Diesel me Heavy & Light vehicle diesel engines, fuel injectors, turbochargers, BS-VI sensor diagnostics aur engine overhaul ka live training milta hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'Full Year Course (Engine Overhaul, Fuel Systems & Electricals)',
        tradeTheory: [
          'Safety precautions, hazardous waste disposal (engine oil, coolants), fire safety in garage',
          'Internal Combustion Engine principles: 4-Stroke Diesel cycle, compression ratio, valve timing diagram',
          'Engine components: Cylinder block, liner (wet & dry), piston, rings, connecting rod, crankshaft, flywheel',
          'Cylinder head: Valves, springs, camshaft, rocker arm, overhead valve (OHV) and overhead cam (OHC)',
          'Cooling & Lubrication Systems: Radiator, thermostat, water pump, oil filters, gear pump, multigrade oils',
          'Fuel Injection System: Fuel tank, feed pump, fuel filters, Fuel Injection Pump (Inline & Rotary FIP), CRDi system, Common Rail, Piezo injectors',
          'Intake & Exhaust Systems: Turbocharger, Intercooler, Air cleaners, Catalytic Converter, DPF, SCR (AdBlue) and EGR system for BS-VI compliance',
          'Vehicle Electricals & Diagnostics: Starter motor, Alternator, Battery testing, OBD-II scanner error code diagnosis (DTC codes)'
        ],
        tradePractical: [
          'Dismantling a 4-cylinder diesel engine, inspecting wear using bore gauge and micrometers',
          'Valve lapping, measuring valve clearance (tappet setting using feeler gauge)',
          'Piston ring end gap measurement, connecting rod alignment and bearing replacement',
          'Servicing injectors on test bench: testing opening pressure, spray pattern, chattering and leak-off',
          'Bleeding air from diesel fuel supply lines and setting injection timing',
          'Using OBD-II Diagnostic Scanner to read and clear engine fault codes (Check Engine Light)'
        ],
        workshopCalcScience: [
          'Engine displacement calculation: Swept Volume Vs = (π/4) × D² × L; Total Volume = Vs + Vc',
          'Indicated Horsepower (IHP), Brake Horsepower (BHP), Mechanical Efficiency η = (BHP/IHP) × 100'
        ],
        engineeringDrawingOrIT: [
          'Sectional views of diesel engines, valve timing diagrams, CRDi electronic wiring harness schematics'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Heavy Duty Diesel Engine Test Rigs (4-Cylinder CRDi BS-VI)',
      'Diesel Fuel Injector Testing Machine & Nozzle Tester',
      'OBD-II Automotive Diagnostic Scanner Tablet',
      'Torque Wrench, Cylinder Ridge Reamer & Piston Ring Compressor',
      'Engine Crane / Hydraulic Floor Jack & Jack Stands',
      'Digital Battery Load Tester & Hydrometer'
    ],
    govtJobOpportunities: [
      'Indian Railways (RRB ALP & Technician Grade-III Diesel Loco Shed / Workshop)',
      'State Road Transport Corporations (UPSRTC, MSRTC, HRTC, KSRTC Mechanic)',
      'Indian Army (EME Corps - Vehicle Mechanic)',
      'Border Roads Organisation (BRO GREF Mechanic)',
      'Mining & Port Authorities (Heavy Earthmoving Machinery Maintenance)'
    ],
    privateSectorJobs: [
      'Mahindra & Mahindra, Tata Motors Commercial Vehicles, Ashok Leyland',
      'JCB India, Caterpillar, L&T Construction Equipment',
      'Bosch Diesel Service Centers (Fuel Injection Specialist)',
      'Authorized Car & Commercial Vehicle Dealership Service Workshops'
    ],
    selfEmploymentPotential: {
      hi: 'डीजल सर्विस सेंटर, फ्यूल इंजेक्शन पंप (FIP) टेस्टिंग लैब, ट्रैक्टर व कमर्शियल वाहन गैराज, कार रिपेयर व डायग्नोस्टिक सेंटर।',
      en: 'Commercial Vehicle Diesel Garage, Bosch Certified FIP Calibration Lab, Tractor Service Center.',
      hinglish: 'Commercial vehicle diesel garage, tractor workshop ya CRDi fuel injector testing lab start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹8,000 - ₹11,000 / month',
      experiencedTechnician: '₹22,000 - ₹40,000 / month',
      govtGradePay: 'Level-2 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Mechanic Diesel enables eligibility for Instructor posts in Automobile & Mechanical ITI trades.'
  },
  {
    id: 'turner_machinist',
    name: {
      hi: 'टर्नर व मशीनिस्ट (Turner & Machinist)',
      en: 'Turner & Machinist (CNC / VMC)',
      hinglish: 'Turner & Machinist Trade (2 Years)'
    },
    code: 'CTS-TRN-06',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '⚙️',
    badgeColor: 'purple',
    overview: {
      hi: 'टर्नर व मशीनिस्ट में खराद (Lathe), मिलिंग (Milling), शेपर, ग्राइंडिंग मशीनों के साथ-साथ मॉडर्न CNC (कंप्यूटरीकृत संख्यात्मक नियंत्रण) और VMC मशीनों की G-कोड/M-कोड प्रोग्रामिंग और ऑटोमेशन की ट्रेनिंग दी जाती है।',
      en: 'Covers precision turning, facing, boring, gear hobbing on milling machines, surface/cylindrical grinding, and CNC Lathe / VMC programming using G-codes and M-codes.',
      hinglish: 'Turner aur Machinist trade me Lathe, Universal Milling, Gear cutting aur CNC/VMC programming (G-Code, M-Code) ka advanced practical training hota hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Conventional Turning & Machining)',
        tradeTheory: [
          'Lathe machine anatomy, feed gearbox, lead screw, carriage, cross-slide and compound rest',
          'Single point cutting tool geometry: Rake angles, clearance angles, cutting edge angles',
          'Cutting parameters: Cutting speed, Feed, Depth of cut, Tool life equation',
          'Turning operations: Facing, Plain turning, Step turning, Parting-off, Grooving, Chamfering',
          'Taper turning methods: Form tool, Compound rest swiveling, Tailstock offset, Taper attachment',
          'Thread cutting on lathe: Metric 60°, British BSW 55°, ACME 29°, Square threads, multi-start threads'
        ],
        tradePractical: [
          'Grinding single point HSS turning tools to standard rake and clearance angles on bench grinder',
          'Performing eccentric turning, boring and internal thread cutting in 4-jaw independent chuck',
          'Machining precision taper pins using compound rest swiveling and taper turning attachments',
          'Cutting external and internal metric V-threads with proper pitch matching'
        ],
        workshopCalcScience: [
          'Gear train ratio calculation for thread pitch: Driver/Driven = (Pitch to be cut / Lead screw pitch)',
          'Trigonometric calculations for taper angle and sine bar height'
        ],
        engineeringDrawingOrIT: [
          'Detail and assembly drawings of machine tool spindles, gear blanks, and tailstock assembly'
        ]
      },
      {
        semesterOrYear: 'Second Year (Milling, Grinding & CNC/VMC Programming)',
        tradeTheory: [
          'Milling Machine: Horizontal, Vertical, Universal milling machine, dividing head / indexing mechanism',
          'Gear cutting: Spur gear, helical gear, rack and pinion generation using indexing plate',
          'Grinding Machines: Surface grinder, Cylindrical grinder, Centerless grinding, abrasive wheel selection (Grain, Grade, Structure, Bond)',
          'CNC Technology: Coordinate system (X, Y, Z axes), absolute (G90) vs incremental (G91) programming',
          'CNC Lathe & VMC Programming: G-codes (G00, G01, G02, G03, G71, G72, G76) and M-codes (M03, M05, M06, M08, M30)',
          'CAD/CAM integration: Tool path simulation, offset setting (Work Coordinate System G54-G59, Tool length offset)'
        ],
        tradePractical: [
          'Setting up Universal Dividing Head to cut a 24-teeth spur gear on horizontal milling machine',
          'Precision surface grinding of hardened steel plates to achieve Ra 0.2 µm mirror finish',
          'Writing CNC part programs for contour turning, grooving and threading',
          'Simulating tool paths, setting tool geometry offsets on CNC controller (Fanuc / Siemens)',
          'Machining batch components on CNC lathe with zero tolerance deviation'
        ],
        workshopCalcScience: [
          'Simple and differential indexing calculations: Index Crank Movement = 40 / N',
          'Calculation of machining time in milling and turning operations'
        ],
        engineeringDrawingOrIT: [
          'CNC tool path layout diagrams, coordinate point tables and geometric dimensioning'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Heavy Precision Center Lathe Machines',
      'Universal Milling Machine with Dividing Head & Rotary Table',
      'Precision Surface Grinding Machine',
      'Industrial CNC Turning Center (Fanuc / Siemens Controller)',
      'VMC (Vertical Machining Center 3-Axis)',
      'Sine Bar, Slip Gauge Set (Grade 0), Bore Micrometer'
    ],
    govtJobOpportunities: [
      'ISRO & DRDO (Precision Rocket Component Machinist)',
      'Indian Railways (Railway Workshops - Mechanical Machinist/Turner)',
      'HAL (Hindustan Aeronautics Limited - Aircraft Components)',
      'BARC / NPCIL Nuclear Reactor Component Machinist',
      'BHEL, Ordnance Factories, Heavy Engineering Corporation (HEC)'
    ],
    privateSectorJobs: [
      'CNC Programmer & Operator in Automotive & Aerospace ancillary industries',
      'Tool & Die Making Firms, Plastic Injection Mold Manufacturers',
      'Bosch, Bharat Forge, Godrej Aerospace, Tata Advanced Systems'
    ],
    selfEmploymentPotential: {
      hi: 'CNC जॉब वर्कशॉप, प्रिसिजन टर्नड कंपोनेंट मैन्युफैक्चरिंग, टूल रूम, ऑटो कंपोनेंट सप्लाई यूनिट।',
      en: 'CNC Job Shop, Precision Machining Tool Room, Custom Shaft & Gear Manufacturing.',
      hinglish: 'CNC Turning / VMC Job Shop kholkar industrial parts manufacturing ka business kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹8,500 - ₹12,000 / month',
      experiencedTechnician: '₹24,000 - ₹48,000 / month (CNC Programmer)',
      govtGradePay: 'Level-2 / Level-4'
    },
    citsInstructorScope: 'CITS in Turner/Machinist leads to Instructor jobs in govt technical institutes.'
  },
  {
    id: 'wireman',
    name: {
      hi: 'वायरमैन (Wireman)',
      en: 'Wireman Trade',
      hinglish: 'Wireman Trade (2 Years)'
    },
    code: 'CTS-WRM-07',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '8th / 10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '💡',
    badgeColor: 'amber',
    overview: {
      hi: 'वायरमैन ट्रेड में आंतरिक व बाहरी विद्युत वायरिंग, ओवरहेड ट्रांसमिशन लाइन, अंडरग्राउंड केबल बिछाना, डिस्ट्रीब्यूशन पैनल बोर्ड, 3-फेज लोड बैलेंसिंग और सबस्टेशन स्विचगियर का व्यावहारिक ज्ञान दिया जाता है।',
      en: 'Wireman trade specializes in industrial & residential power wiring, overhead line maintenance, underground HT/LT cabling, distribution panels, and substation switchgear.',
      hinglish: 'Wireman trade me residential aur industrial wiring, HT/LT cable jointing, panel wiring aur overhead line maintenance ki complete training hoti hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Domestic & Commercial Installations)',
        tradeTheory: [
          'Electrical safety rules, Indian Electricity (IE) Rules 1956, shock treatment',
          'Joints in electrical conductors: Married joint, Western Union, Britania, Tee joint',
          'Conduit wiring systems: Concealed & Surface conduit, Trunking, Cable trays',
          'Illumination design: Lumen calculation, LED, CFL, Metal Halide, High-Pressure Sodium fixtures',
          'Earthing: Plate and Pipe earthing, Earth continuity conductor (ECC) testing'
        ],
        tradePractical: [
          'Preparation of straight, T-joint and cross-joints in copper and aluminum conductors',
          'Concealed PVC conduit wiring for 3-bedroom residential apartment with MCB/ELCB',
          'Installation and testing of Staircase, Godown, and Corridor wiring circuits',
          'Installation of earth pits with charcoal, salt and bentonite compound'
        ],
        workshopCalcScience: [
          'Ohm’s Law, Kirchhoff’s Laws, Series-Parallel resistance calculation',
          'Work, Power, Energy (kWh meter calculation) and electrical bills'
        ],
        engineeringDrawingOrIT: [
          'Single line architectural electrical layouts for buildings, standard BIS symbols'
        ]
      },
      {
        semesterOrYear: 'Second Year (Industrial Cabling, Switchgear & Motors)',
        tradeTheory: [
          'Underground HT/LT Cables: Laying methods, straight-through & outdoor termination heat-shrink kits',
          'AC/DC Motor Starters, Control panel wiring, Push-button stations, Relays & Contactors',
          'Substation equipment: Lightning arresters, Isolators, Air Circuit Breakers (ACB), Vacuum Circuit Breakers (VCB)',
          'Overhead Transmission & Distribution: Pole erection, Stay wires, Pin & Suspension insulators',
          'Commercial building load auditing and Power Factor (cos φ) correction capacitor banks'
        ],
        tradePractical: [
          'HT/LT cable jointing using Heat-Shrink and Cold-Shrink kits',
          'Wiring of automatic Star-Delta motor starter panel with overload protection and indicators',
          'Testing insulation resistance and breakdown voltage of transformer oil',
          'Troubleshooting 3-Phase commercial distribution boards and busbar chambers'
        ],
        workshopCalcScience: [
          'Trigonometry, vectors, line current and phase current calculations in Star/Delta systems'
        ],
        engineeringDrawingOrIT: [
          'Schematic and layout drawings of industrial control panels and 11kV/415V substations'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Digital Insulation Tester (Megger 1000V/2500V)',
      'Digital Earth Resistance Tester (4-Terminal)',
      'Hydraulic Cable Crimping Tool (10 to 400 sq mm)',
      'Cable Fault Locator (Thumper / TDR)',
      'Heavy Duty Conduit Bender & Pipe Die Set',
      'True-RMS Digital Clamp Meter'
    ],
    govtJobOpportunities: [
      'State Electricity Boards (UPPCL TG-2, BSPHCL, TANGEDCO, MSEDCL Line Attendant)',
      'Indian Railways (RRB Technician-III Electrical / TRD Overhead Traction)',
      'Military Engineer Services (MES Wireman / Lineman)',
      'Central Public Works Department (CPWD Electrician/Wireman)',
      'BHEL, NTPC, NHPC, Power Grid Corporation of India (PGCIL)'
    ],
    privateSectorJobs: [
      'L&T Construction, Sterling and Wilson, Tata Power',
      'Electrical Maintenance Supervisor in Malls, High-rise Towers & Tech Parks',
      'Solar Farm Cable Installation & Grid Connection Specialist'
    ],
    selfEmploymentPotential: {
      hi: 'अधिकृत इलेक्ट्रिकल कांट्रेक्टर (Electrical Contractor License Class-A/B), बिल्डिंग वायरिंग ठेकेदारी, सोलर पैनल इंस्टॉलेशन फर्म।',
      en: 'Licensed Electrical Contractor, Commercial Wiring Services, Solar Farm EPC Subcontractor.',
      hinglish: 'Electrical contractor license lekar residential/commercial building wiring contract le sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹8,500 - ₹11,500 / month',
      experiencedTechnician: '₹22,000 - ₹45,000 / month',
      govtGradePay: 'Level-2 / Level-4 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Wireman trade qualifies candidates for Govt ITI Wireman / Lineman Instructor posts.'
  },
  {
    id: 'rac_mechanic',
    name: {
      hi: 'आरएसी मैकेनिक (Refrigeration & Air Conditioning)',
      en: 'RAC Mechanic (HVAC & Chiller)',
      hinglish: 'RAC Mechanic Trade (2 Years)'
    },
    code: 'CTS-RAC-08',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '❄️',
    badgeColor: 'cyan',
    overview: {
      hi: 'रेफ्रिजरेशन एवं एयर कंडीशनिंग (RAC) ट्रेड में घरेलू फ्रिज, स्प्लिट/इन्वर्टर एसी, वीआरवी/वीआरएफ (VRV/VRF), कोल्ड स्टोरेज और बड़े कमर्शियल चिलर प्लांट्स (HVAC) की गैस चार्जिंग, कंप्रेसर ओवरहाल और डक्टिंग का प्रैक्टिकल सिखाया जाता है।',
      en: 'Covers domestic refrigerators, split & inverter ACs, VRV/VRF multi-split systems, cold storage plants, AHU ducting, and industrial water-cooled chillers.',
      hinglish: 'RAC trade me Split/Inverter AC, VRV/VRF systems, Cold Storage plants aur Central AC Chiller plants ki gas charging, flaring, brazing aur troubleshooting sikhayi jaati hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Domestic Refrigeration & Split ACs)',
        tradeTheory: [
          'Fundamentals of Thermodynamics: Heat, Temperature, Latent heat, Sensible heat, Pressure-Enthalpy (P-h) charts',
          'Vapour Compression Refrigeration Cycle (VCRC): Compressor, Condenser, Expansion Valve, Evaporator',
          'Refrigerants: R-134a, R-410A, R-32, R-600a, R-290 (Hydrocarbons & GWP/ODP environmental rules)',
          'Compressors: Reciprocating, Rotary, Scroll, BLDC Inverter compressors and inverter PCB electronics',
          'Copper tubing operations: Swaging, Flaring, Bending, Oxy-Acetylene Silver Brazing'
        ],
        tradePractical: [
          'Flaring, swaging, and brazing of copper tubing with nitrogen purging',
          'Leak testing with nitrogen pressure (300 PSI), vacuuming down to 500 microns with 2-stage vacuum pump',
          'Gas charging by weight using digital manifold gauge and electronic charging scale',
          'Installation, pumping down and commissioning of 1.5-Ton Inverter Split AC',
          'Defrost timer, thermostat, and capillary tube replacement in frost-free refrigerators'
        ],
        workshopCalcScience: [
          'Boyle’s Law, Charles’s Law, Specific Heat, Latent heat of vaporization and COP (Coefficient of Performance)'
        ],
        engineeringDrawingOrIT: [
          'Schematic refrigeration circuit diagrams, inverter AC PCB wiring diagrams'
        ]
      },
      {
        semesterOrYear: 'Second Year (Commercial HVAC, VRV/VRF & Cold Storage)',
        tradeTheory: [
          'Commercial Chillers: Water-cooled & Air-cooled Chillers, Screw & Centrifugal compressors',
          'Air Handling Units (AHU), Fan Coil Units (FCU), Cooling Towers, and Psychrometric charts',
          'VRV/VRF Systems: Branch selector boxes, master-slave outdoor units, inverter modulation',
          'Cold Storage Plants: Ammonia (R-717) and Freon systems, blast freezers, defrost methods',
          'Building Management System (BMS), DDC controllers, dampers and HVAC duct sizing'
        ],
        tradePractical: [
          'Servicing and water chemistry treatment of induced draft Cooling Towers',
          'AHU filter cleaning, belt tensioning, blower alignment and chilled water valve testing',
          'VRV/VRF piping flare joints and electronic expansion valve (EEV) calibration',
          'Troubleshooting PCB error codes in commercial multi-split inverter systems'
        ],
        workshopCalcScience: [
          'Cooling load calculations (Ton of Refrigeration - TR = 12,000 BTU/hr = 3.516 kW), CFM airflow sizing'
        ],
        engineeringDrawingOrIT: [
          'HVAC duct layout layouts, chilled water piping schematics and BMS architecture'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Digital 4-Valve Manifold Gauge Set (R-32/R-410A/R-134a)',
      '2-Stage High Vacuum Pump (with Micron Gauge)',
      'Oxy-Acetylene / Oxy-LPG Brazing Torch Kit',
      'Electronic Refrigerant Leak Detector (Sniffer)',
      'Digital Inverter AC PCB Tester',
      'Copper Pipe Flaring & Swaging Kit + Eccentric Flaring Tool',
      'Digital Anemometer & Psychrometer (Air CFM & Humidity meter)'
    ],
    govtJobOpportunities: [
      'Indian Railways (AC Coach Attendant & Train Lighting/Air Conditioning Technician Grade-III)',
      'AIIMS, Central Govt Hospitals & Airport Authority of India (AAI HVAC Plant Operator)',
      'Defence Research & Development Organisation (DRDO / ISRO Environmental Test Facility)',
      'State Secretariats, High Courts & Govt Buildings HVAC Maintenance'
    ],
    privateSectorJobs: [
      'Daikin, Voltas, Blue Star, Carrier, LG, Samsung, Hitachi',
      'Johnson Controls, Trane, Dunham-Bush (Chiller Specialists)',
      'Gulf Countries (UAE, Saudi Arabia, Qatar - High Demand for HVAC Techs)'
    ],
    selfEmploymentPotential: {
      hi: 'एसी रिपेयर एवं इंस्टॉलेशन सर्विस सेंटर, डक्टिंग व कमर्शियल चिलर मेंटेनेंस एजेंसी, फ्रीज-एसी स्पेयर पार्ट्स शॉप।',
      en: 'AC Sales & Service Hub, Cold Storage Maintenance Contractor, HVAC Ducting & AMC Agency.',
      hinglish: 'Split/Inverter AC installation, repair service center ya HVAC AMC contracting business start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹9,000 - ₹13,000 / month',
      experiencedTechnician: '₹28,000 - ₹55,000 / month (HVAC Tech)',
      govtGradePay: 'Level-2 / Level-4 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Mechanic RAC enables teaching in Govt and Private ITIs across India.'
  },
  {
    id: 'electronic_mechanic',
    name: {
      hi: 'इलेक्ट्रॉनिक्स मैकेनिक (Electronic Mechanic)',
      en: 'Electronic Mechanic (IoT & PCB)',
      hinglish: 'Electronic Mechanic Trade (2 Years)'
    },
    code: 'CTS-ELM-09',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '💻',
    badgeColor: 'emerald',
    overview: {
      hi: 'इलेक्ट्रॉनिक्स मैकेनिक में सेमीकंडक्टर, ट्रांजिस्टर, SMPS, इन्वर्टर-UPS, SMD कंपोनेंट सोल्डरिंग, LED टीवी रिपेयर, माइक्रोकंट्रोलर (8051/Arduino/ESP32), IoT डिवाइसेस और बायोमेडिकल उपकरणों का गहन प्रैक्टिकल दिया जाता है।',
      en: 'Covers semiconductor devices, power electronics, SMPS, SMD rework stations, LED/Smart TV servicing, microcontrollers (Arduino/ESP32), IoT sensors, and biomedical equipment.',
      hinglish: 'Electronic Mechanic me SMD component soldering, Smart TV, Inverter PCB, Microcontroller & IoT circuits ki testing aur troubleshooting sikhayi jaati hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Analog Electronics & Power Supplies)',
        tradeTheory: [
          'Passive components: Resistors (Color code, SMD code), Capacitors, Inductors',
          'Semiconductors: PN Junction Diode, Zener Diode, Rectifiers (Half-wave, Full-wave, Bridge), Filters',
          'Transistors (BJT, FET, MOSFET, IGBT): Biasing, Characteristics, Switching applications',
          'Optoelectronics: LEDs, Photodiodes, Optocouplers, 7-Segment displays, LCDs',
          'Linear ICs: Op-Amp 741 (Inverting, Non-inverting, Comparator), Timer IC 555 (Astable, Monostable)',
          'Power supplies: Linear Regulators (78xx/79xx/LM317), SMPS (Flyback/Buck/Boost topologies)'
        ],
        tradePractical: [
          'Testing diodes, transistors, and MOSFETs using digital multimeter and curve tracer',
          'Assembling and testing bridge rectifier with capacitor filter and voltage regulator IC',
          'Soldering and de-soldering SMD chips using Hot Air Rework Station and flux paste',
          'Designing LED flasher and PWM motor speed controller using IC 555 on breadboard & PCB'
        ],
        workshopCalcScience: [
          'Ohm’s law, RC time constant, Ripple factor, Efficiency of rectifiers, Decibels (dB)'
        ],
        engineeringDrawingOrIT: [
          'Electronic schematic symbols, PCB layout design using open-source EDA software'
        ]
      },
      {
        semesterOrYear: 'Second Year (Digital, Embedded, IoT & Consumer Electronics)',
        tradeTheory: [
          'Digital Electronics: Logic Gates, Flip-Flops, Counters, Shift Registers, ADC/DAC',
          'Microcontrollers: Architecture of 8051 & ATmega328, GPIO, Timers, UART serial communication',
          'Sensors & IoT: Temperature (LM35/DHT11), Ultrasonic (HC-SR04), PIR, Gas (MQ-2), Wi-Fi (ESP8266/ESP32)',
          'Consumer Electronics: Smart LED TV (T-Con board, Backlight inverter, Motherboard fault tracing), Inverter/UPS',
          'Industrial Automation: PLC ladder logic basics, SCADA, proximity sensors, optoisolated relays'
        ],
        tradePractical: [
          'SMD IC replacement (QFP, SOIC packages) on multi-layer motherboards using hot air gun',
          'Interfacing sensors and relay modules with Arduino/ESP32 for IoT home automation',
          'Tracing power supply rails (12V, 5V, 3.3V, 1.8V, 1.2V) in LED Smart TV motherboards',
          'Testing waveform and frequency using Digital Storage Oscilloscope (DSO 100MHz)'
        ],
        workshopCalcScience: [
          'Binary, Octal, Hexadecimal number conversions, Boolean algebra simplification'
        ],
        engineeringDrawingOrIT: [
          'Block diagrams of Smart LED TV, Mobile phone circuits, and IoT sensor nodes'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Digital Storage Oscilloscope (DSO 100MHz 2-Channel)',
      'SMD Hot Air Rework Station with Temperature Controller',
      'Microscope for SMD Micro-soldering (Stereo Zoom)',
      'Component Tester & ESR Meter',
      'Variable DC Regulated Power Supply (0-30V / 5A)',
      'Universal IC Programmer / BIOS Flasher (RT809F / CH341A)'
    ],
    govtJobOpportunities: [
      'ISRO & DRDO (Electronics Technician-B / Satellite Telemetry)',
      'BEL (Bharat Electronics Limited) & ECIL (Electronics Corporation of India)',
      'Indian Railways (RRB Technician Grade-III Signal & Telecom - S&T)',
      'Metro Rail (Maintainer S&T - DMRC, LMRC, BMRCL)',
      'Prasar Bharati (Doordarshan & All India Radio Transmission Tech)'
    ],
    privateSectorJobs: [
      'Foxconn, Dixon Technologies, Samsung, Pegatron (Mobile & PCB Manufacturing)',
      'Schneider Electric, ABB, Delta Electronics (Industrial Automation)',
      'Authorized Smart TV & Smartphone Service Centers'
    ],
    selfEmploymentPotential: {
      hi: 'स्मार्ट टीवी व लैपटॉप मदरबोर्ड रिपेयर लैब, सीसीटीवी व सिक्योरिटी सिस्टम इंस्टॉलेशन, ड्रोन व IoT डिवाइसेस सर्विसिंग।',
      en: 'Smart TV & Motherboard Chip-level Repair Lab, CCTV & Home Automation Agency.',
      hinglish: 'Smart TV repair, CCTV installation aur chip-level motherboard repairing lab start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹9,000 - ₹12,500 / month',
      experiencedTechnician: '₹25,000 - ₹48,000 / month',
      govtGradePay: 'Level-2 / Level-4 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Electronic Mechanic opens doors for Training Officer / Instructor jobs in DGT institutions.'
  },
  {
    id: 'plumber',
    name: {
      hi: 'प्लम्बर (Plumber)',
      en: 'Plumber Trade',
      hinglish: 'Plumber Trade (1 Year)'
    },
    code: 'CTS-PLM-10',
    duration: '1 Year (2 Semesters)',
    category: 'Engineering Trade',
    eligibility: '8th / 10th Pass',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '🚰',
    badgeColor: 'blue',
    overview: {
      hi: 'प्लम्बर ट्रेड में घरेलू व कमर्शियल पाइप फिटिंग (CPVC, UPVC, PPR, GI, CI), हाइड्रो-न्यूमैटिक पंपिंग, सोलर वाटर हीटर, सेनेटरी फिटिंग्स, सीवरेज ड्रेनेज और फायर फाइटिंग पाइपलाइन का प्रैक्टिकल सिखाया जाता है।',
      en: 'Covers water supply piping (CPVC/PPR/GI), hydro-pneumatic booster systems, sanitary fixtures, drainage traps, solar water heating, and fire sprinkler plumbing.',
      hinglish: 'Plumber trade me residential & commercial pipe fitting (CPVC, PPR, GI), pressure booster pumps, sanitary fixtures aur firefighting plumbing ka practical sikhaya jata hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First & Second Semester (Complete 1-Year CTS Curriculum)',
        tradeTheory: [
          'Plumbing safety, tools, and pipe materials: PVC, UPVC, CPVC, PPR, GI, CI, Stoneware, HDPE',
          'Pipe joints and fittings: Elbow, Tee, Socket, Reducer, Union, Flange, Push-fit, Solvent cementing',
          'Water supply systems: Direct and Indirect systems, Hydro-pneumatic booster pumping systems',
          'Sanitary fixtures: Water Closets (European/Indian), Wash basins, Urinals, Bathtubs, Concealed Flush tanks',
          'Drainage & Traps: P-trap, S-trap, Gully trap, Nahni trap, Intercepting trap, Single stack system',
          'Hot water systems: Solar water heaters, Electric geysers, Heat pump circulation loops',
          'Firefighting systems: Wet riser, Yard hydrants, Sprinkler pipe connections'
        ],
        tradePractical: [
          'Threading GI pipes using pipe die set and sealing with Teflon tape/yarn',
          'Hot melt fusion welding of PPR pipes and solvent bonding of CPVC/UPVC pipes',
          'Installation of concealed diverter, wall-hung WC with concealed cistern, and shower panels',
          'Hydrostatic pressure testing of plumbing network at 10 bar using manual/electric pressure test pump',
          'Installation and piping of solar water heating system with temperature relief valve'
        ],
        workshopCalcScience: [
          'Volume, pressure (P = ρgh), water flow rate (Q = Av), pipe friction losses and tank capacity calculations'
        ],
        engineeringDrawingOrIT: [
          'Plumbing isometric schematic drawings, water supply and drainage pipe layouts for multi-story buildings'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'PPR Pipe Hot Melt Fusion Welding Machine',
      'Hydraulic Pressure Testing Pump (0-50 Bar)',
      'Heavy Duty Pipe Threading Die Set (1/2" to 2")',
      'Pipe Cutter (Rotary & Scissor type for CPVC/PEX)',
      'Drain Inspection Camera & Pipe Unclogger Snake Machine',
      'Pipe Wrench, Chain Wrench & Basin Wrench'
    ],
    govtJobOpportunities: [
      'Military Engineer Services (MES Plumber / Pipe Fitter)',
      'Central Public Works Department (CPWD / State PWDs)',
      'Indian Railways (Railway Workshops & Station Water Supply Maintenance)',
      'Municipal Corporations & Jal Sansthan (Water Supply Board Operator)',
      'AIIMS & Central Govt Hospitals (Plumbing & Medical Gas Pipeline Maintenance)'
    ],
    privateSectorJobs: [
      'L&T Construction, Shapoorji Pallonji, DLF, Godrej Properties',
      'Plumbing Maintenance Supervisor in 5-Star Hotels & High-Rise Societies',
      'Plumbing Contractor for High-End Bathroom Fit-outs (Kohler, Jaquar, Grohe)'
    ],
    selfEmploymentPotential: {
      hi: 'प्लम्बिंग ठेकेदारी (Plumbing Contractor), बोरवेल व वाटर ट्रीटमेंट (RO/Softener) इंस्टॉलेशन, सेनेटरी शोरूम।',
      en: 'Plumbing Contracting Agency, RO & Water Softener Service, High-end Sanitaryware Installation.',
      hinglish: 'Building plumbing contractor, bathroom renovation service ya water pressure booster pump installation agency.'
    },
    averageSalary: {
      freshApprentice: '₹8,000 - ₹11,000 / month',
      experiencedTechnician: '₹22,000 - ₹45,000 / month',
      govtGradePay: 'Level-2 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in Plumber trade enables eligibility for ITI Plumber Instructor posts.'
  },
  {
    id: 'draughtsman_civil_mech',
    name: {
      hi: 'ड्राफ्ट्समैन (Civil & Mechanical)',
      en: 'Draughtsman (Civil / Mech)',
      hinglish: 'Draughtsman Civil & Mechanical (2 Years)'
    },
    code: 'CTS-DRG-11',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '📐',
    badgeColor: 'indigo',
    overview: {
      hi: 'ड्राफ्ट्समैन ट्रेड में बिल्डिंग आर्किटेक्चर, स्ट्रक्चरल कंक्रीट ड्राइंग, 2D/3D AutoCAD, Revit BIM, 3ds Max, मशीन पार्ट्स की असेंबली ड्राइंग और 3D CAD मॉडलिंग का उच्च स्तरीय प्रशिक्षण दिया जाता है।',
      en: 'Covers architectural plans, RCC structural detailing, 2D AutoCAD, Revit BIM modeling, mechanical assembly drawings, GD&T, and SolidWorks CAD.',
      hinglish: 'Draughtsman trade me Building drawing, RCC structural detailing, AutoCAD 2D/3D, Revit BIM aur Mechanical CAD modeling ka practical sikhaya jata hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Manual Drafting, Geometry & AutoCAD 2D)',
        tradeTheory: [
          'Drafting standards: BIS SP-46, ISO conventions, scales (Full, Enlarged, Reduced)',
          'Orthographic projections (First angle & Third angle), Isometric and Axonometric views',
          'Building materials: Cement, Concrete, Brick masonry, Stone masonry, Foundations',
          'AutoCAD 2D Fundamentals: Draw commands (Line, Polyline, Circle, Arc), Modify commands (Trim, Offset, Array, Fillet)',
          'Layers, Blocks, Dimension styles, Annotations, Plotting & Page setup'
        ],
        tradePractical: [
          'Manual drafting of residential building plan, elevation and cross-sectional details',
          'AutoCAD 2D architectural drafting for duplex house with doors, windows and furniture schedule',
          'Detailing RCC column, beam, footing, and one-way/two-way slab reinforcement schedules',
          'Mechanical 2D assembly drawing of plummer block and screw jack'
        ],
        workshopCalcScience: [
          'Mensuration, area of irregular plots (Simpson’s rule), volume calculation of earthwork and concrete'
        ],
        engineeringDrawingOrIT: [
          'Preparation of submission drawings for municipal approval (Sanction Plan)'
        ]
      },
      {
        semesterOrYear: 'Second Year (3D CAD, Revit BIM, Estimation & Total Station)',
        tradeTheory: [
          '3D Modeling in CAD: Solid modeling, Boolean operations (Union, Subtract, Intersect), Extrude, Revolve, Sweep',
          'BIM (Building Information Modeling) using Autodesk Revit: Walls, Roofs, Curtain systems, Family creation',
          'Structural Steel Detailing: Trusses, Purlins, Column bases, Welded & Bolted connections',
          'Quantity Surveying & Estimation: Abstract of estimates, Bill of Quantities (BOQ), Rate analysis',
          'Topographical mapping and GIS integration basics'
        ],
        tradePractical: [
          'Creating 3D architectural models with realistic materials, lighting and camera rendering',
          'Developing a full Revit BIM model of a commercial shopping complex with BOQ schedules',
          'Preparing complete structural working drawings for multi-story framed buildings',
          'Rate analysis and cost estimation for civil construction projects'
        ],
        workshopCalcScience: [
          'Center of gravity, moment of inertia, structural load distribution on beams and slabs'
        ],
        engineeringDrawingOrIT: [
          'Walkthrough animation generation and walkthrough rendering in BIM/3ds Max'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'High-Performance CAD/BIM Workstation (Intel i7 / 32GB RAM / Dedicated GPU)',
      'Autodesk AutoCAD Architecture & Revit BIM Software',
      'SolidWorks / Creo Parametric 3D CAD',
      'A0 Size Large Format Plotter & Digital Drafting Table',
      'Digital Laser Distance Meter (Range: 100 meters)'
    ],
    govtJobOpportunities: [
      'Indian Railways (RRB Senior Section Engineer / Draughtsman Drawing & Design)',
      'ISRO & DRDO (Draughtsman-B Civil / Mechanical)',
      'Military Engineer Services (MES Draughtsman)',
      'State Irrigation, PWD, and Town Planning Departments',
      'National Highways Authority of India (NHAI / RITES / IRCON)'
    ],
    privateSectorJobs: [
      'Architectural & Civil Engineering Consultancies (L&T, Shapoorji, Atkins, AECOM)',
      'BIM Modeling Companies (BIM Modeler / Detailer)',
      'Mechanical CAD Design ancillary firms and Tool Rooms'
    ],
    selfEmploymentPotential: {
      hi: 'आर्किटेक्चरल डिजाइन स्टूडियो, 2D/3D CAD फ्रीलांसिंग, नगर निगम मैप अप्रूवल कंसल्टेंसी, 3D रेंडरिंग फर्म।',
      en: 'Architectural Drafting Studio, Municipal Map Approval Agency, 3D Architectural Rendering Studio.',
      hinglish: 'Building map design, municipal approval maps aur 3D elevation rendering studio start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹9,500 - ₹14,000 / month',
      experiencedTechnician: '₹28,000 - ₹60,000 / month (BIM Modeler)',
      govtGradePay: 'Level-4 / Level-5 (₹25,500 - ₹81,100 basic)'
    },
    citsInstructorScope: 'CITS in Draughtsman trade leads to permanent instructor jobs in Engineering colleges and ITIs.'
  },
  {
    id: 'mechanic_motor_vehicle',
    name: {
      hi: 'मैकेनिक मोटर व्हीकल (MMV & EV)',
      en: 'Mechanic Motor Vehicle (MMV & EV)',
      hinglish: 'Mechanic Motor Vehicle Trade (2 Years)'
    },
    code: 'CTS-MMV-12',
    duration: '2 Years (4 Semesters)',
    category: 'Engineering Trade',
    eligibility: '10th Pass with Science & Math',
    certification: 'NCVT (National Council for Vocational Training) / SCVT',
    icon: '🚗',
    badgeColor: 'red',
    overview: {
      hi: 'MMV ट्रेड में 4-स्ट्रोक पेट्रोल/डीजल इंजन, ऑटोमैटिक ट्रांसमिशन (AT/DCT/CVT), ABS/ESP ब्रेकिंग, स्टीयरिंग जियोमेट्री, व्हील अलाइनमेंट, OBD-II स्कैनिंग एवं मॉडर्न इलेक्ट्रिक वाहन (EV मोटर, लिथियम बैटरी पैक व BMS) का प्रशिक्षण मिलता है।',
      en: 'Covers petrol/diesel engines, automatic gearboxes (AT/DCT/CVT), ABS brakes, power steering, suspension geometry, OBD-II diagnostic scanning, and Electric Vehicle (EV powertrain, Lithium BMS).',
      hinglish: 'MMV trade me modern cars, MPFi/CRDi engines, automatic transmission, electronic steering, wheel alignment, OBD-2 scanning aur EV technology ka full training hota hai.'
    },
    coreSyllabus: [
      {
        semesterOrYear: 'First Year (Chassis, Transmission, Brakes & Suspension)',
        tradeTheory: [
          'Automotive workshop safety, vehicle chassis layout, frame construction and load distribution',
          'Clutch assemblies: Single plate, Multi-plate, Diaphragm spring, Dual-mass flywheel',
          'Manual & Automatic Transmissions: Synchromesh gearbox, Epicyclic gear train, Torque converter, CVT, DCT',
          'Propeller shaft, Universal joints, Slip joints, Differential (Conventional & Limited-Slip LSD)',
          'Braking Systems: Hydraulic drum & disc brakes, Vacuum booster, Anti-lock Braking System (ABS) & EBD',
          'Steering & Suspension: Rack and pinion, Electric Power Steering (EPS), MacPherson strut, Multi-link suspension'
        ],
        tradePractical: [
          'Dismantling, inspection, and overhaul of synchromesh gearbox and differential assembly',
          'Bleeding hydraulic brake lines and testing ABS wheel speed sensors',
          'Performing computerized 3D 4-Wheel Alignment (Camber, Caster, Toe-in/Toe-out adjustments)',
          'Overhaul of steering rack and testing EPS torque sensor voltages'
        ],
        workshopCalcScience: [
          'Gear ratios, mechanical advantage, brake stopping distance, friction, steering geometry (Ackermann principle)'
        ],
        engineeringDrawingOrIT: [
          'Hydraulic brake layout diagrams, automotive chassis structure blueprints'
        ]
      },
      {
        semesterOrYear: 'Second Year (Engine Management, Diagnostics & EV Powertrains)',
        tradeTheory: [
          'Petrol MPFi & GDi systems: Fuel injectors, High pressure fuel pump, Electronic Throttle Body',
          'Automotive Sensors & Actuators: MAF, MAP, Crankshaft position (CKP), Camshaft (CMP), O2 sensor, Knock sensor',
          'ECU Architecture, CAN-Bus communication network, OBD-II diagnostic trouble codes (DTCs)',
          'Emission Control: Catalytic converter, EGR valve, DPF (Diesel Particulate Filter), SCR AdBlue injection',
          'Electric Vehicles (EV): BLDC & PMSM traction motors, Regenerative braking, Lithium-ion battery packs, BMS, Inverter controllers, High-voltage safety interlocks'
        ],
        tradePractical: [
          'Diagnosing Check Engine light faults using OBD-II scanner, reading live sensor PIDs and freeze frame data',
          'Dismantling, decarbonizing, valve grinding, and assembling 4-cylinder DOHC 16-valve engine',
          'Testing fuel injector spray pattern and ultrasonic cleaning',
          'Safety isolation, HV glove testing, and diagnostics of EV high-voltage battery pack and motor inverter'
        ],
        workshopCalcScience: [
          'Indicated Power (IP), Brake Power (BP), Mechanical Efficiency (η_mech), EV battery capacity (kWh) and motor torque'
        ],
        engineeringDrawingOrIT: [
          'Automotive electrical wiring harness diagrams, CAN-Bus topology schematics'
        ]
      }
    ],
    keyToolsAndEquipment: [
      'Industrial OBD-II / CAN-Bus Diagnostic Scanner Tablet (Launch / Autel)',
      'Computerized 3D 4-Wheel Alignment System & Digital Wheel Balancer',
      'Hydraulic 2-Post Automotive Lift (4-Ton Capacity)',
      'Engine Compression Tester & Cylinder Leak-down Tester',
      'High Voltage (1000V) Insulated Tool Kit & Class-0 EV Safety Gloves',
      'Automotive Oscilloscope (PicoScope 4-Channel) for CAN-Bus waveform analysis'
    ],
    govtJobOpportunities: [
      'Indian Railways (RRB ALP & Technician Grade-III Carriage & Wagon)',
      'State Road Transport Corporations (UPSRTC, MSRTC, KSRTC Master Mechanic)',
      'Indian Army (Corps of EME - Vehicle Mechanic / Technical Grade)',
      'Airport Ground Support Equipment (GSE) Maintenance Authorities',
      'Central Police Organisations (CRPF, BSF, ITBP Motor Transport Fitter)'
    ],
    privateSectorJobs: [
      'Maruti Suzuki, Hyundai, Tata Motors, Mahindra, Toyota, Mercedes-Benz Service Centers',
      'EV Manufacturers (Tata Passenger Electric Mobility, Ola Electric, Ather Energy)',
      'Bosch Car Service & Multi-brand Car Repair Chains'
    ],
    selfEmploymentPotential: {
      hi: 'मल्टी-ब्रांड कार सर्विस स्टेशन, कंप्यूटराइज्ड व्हील अलाइनमेंट हब, ई-रिक्शा व ईवी रिपेयर सेंटर, ऑटो स्पेयर पार्ट्स बिजनेस।',
      en: 'Multi-brand Car Workshop, 3D Wheel Alignment Center, EV Battery & Powertrain Service Lab.',
      hinglish: 'Multi-brand car garage, 3D wheel alignment hub ya EV service center start kar sakte hain.'
    },
    averageSalary: {
      freshApprentice: '₹9,000 - ₹13,500 / month',
      experiencedTechnician: '₹26,000 - ₹55,000 / month (Diagnostic Specialist)',
      govtGradePay: 'Level-2 / Level-4 (₹19,900 - ₹63,200 basic)'
    },
    citsInstructorScope: 'CITS in MMV trade enables appointment as Automobile Instructor in Govt ITIs.'
  }
];

export const ITI_GOVT_JOBS_ROADMAP: ITIGovtExamRoadmap[] = [
  {
    id: 'rrb_alp_technician',
    organization: 'Indian Railways (Railway Recruitment Boards - RRB)',
    postName: 'Assistant Loco Pilot (ALP) & Technician Grade-III',
    eligibility: '10th Pass + ITI in relevant trade (Electrician, Fitter, Diesel Mechanic, Welder, Wireman, Turner, etc.) OR Act Apprenticeship',
    selectionProcess: [
      'CBT-1 (Screening Test - 75 Marks, 60 Minutes)',
      'CBT-2 Part A (Merit determining - 100 Marks, 90 Minutes) + Part B (Qualifying Trade Test - 75 Marks, 60 Minutes - 35% Qualifying Marks)',
      'CBAT (Computer Based Aptitude Test / Psycho Test for ALP only)',
      'Document Verification & Medical Examination (A1 category vision for ALP)'
    ],
    examPattern: {
      tier1: 'Maths (20 Q), Reasoning (25 Q), General Science (20 Q), General Awareness (10 Q) - Total 75 Qs, 1/3 Negative Marking',
      tier2TradeTest: 'Part-B strictly syllabus of DGT/NCVT ITI Trade. Must score min 35% (26.25 marks out of 75) to qualify. Non-negotiable.',
      skillTest: 'Psycho Aptitude Test (Memory, Direction, Depth Perception, Concentration, Battery Test) for ALP'
    },
    salaryStructure: 'Level-2 (Pay Scale: ₹19,900 basic + Running Allowance for ALP ₹40,000 - ₹65,000 / month in-hand)',
    officialPortal: 'rrbcdg.gov.in / indianrailways.gov.in',
    preparationStrategy: [
      'Master DGT ITI trade theory books (Bharat Skills Nimmi portal MCQs) for CBT-2 Part B.',
      'Solve NCERT Class 9th & 10th Physics and Chemistry for Basic Science & Engineering in CBT-2 Part A.',
      'Practice speed arithmetic and non-verbal reasoning daily to score 80+ in Part A.',
      'For ALP aspirants, practice eye reflexes and psycho battery tests 2 months prior to exam.'
    ],
    icon: '🚆'
  },
  {
    id: 'isro_technician_b',
    organization: 'ISRO (Indian Space Research Organisation - URSC, VSSC, SDSC SHAR, LPSC)',
    postName: 'Technician-B / Draughtsman-B',
    eligibility: 'SSLC / 10th Pass + ITI / NTC / NAC in respective trade from NCVT',
    selectionProcess: [
      'Written Test (80 MCQs from Core Trade Theory - 90 Minutes)',
      'Skill Test (Practical Trade Test on Workstation - 100 Marks, Purely Qualifying 60% standard)',
      'Final Merit prepared 100% on Written Test marks among those who pass Skill Test'
    ],
    examPattern: {
      tier1: '80 MCQs with 1 mark each (+1 for right, -0.33 for wrong). 100% focused on ITI Trade Theory, Workshop Calculation & Drawing.',
      tier2TradeTest: 'Go / No-Go (Pass/Fail) Practical Test where candidate is given 2 hours to make a live job on lathe/wiring/welding.',
      skillTest: 'Hands-on practical execution following engineering drawings under ISRO scientist panel observation.'
    },
    salaryStructure: 'Level-3 (Basic Pay ₹21,700, Gross Salary approx ₹38,000 - ₹44,000 / month + ISRO quarters & health)',
    officialPortal: 'isro.gov.in/Careers.html',
    preparationStrategy: [
      'Study NIMMI Bharat Skills question bank and previous 10 years ISRO Technician papers thoroughly.',
      'Pay special attention to precision instruments (Vernier, Micrometer least counts, tolerances).',
      'Practice hands-on wiring/filing/turning jobs in ITI workshop to ace the Skill Test.'
    ],
    icon: '🚀'
  },
  {
    id: 'drdo_ceptam',
    organization: 'DRDO (Defence Research & Development Organisation - CEPTAM)',
    postName: 'Technician-A (Tech-A)',
    eligibility: '10th Class pass from recognized board + ITI certificate in relevant trade',
    selectionProcess: [
      'Tier-I (CBT - Computer Based Test of 120 Questions)',
      'Tier-II (Trade Skill Test - Qualifying nature)',
      'Final selection based purely on Tier-I CBT score'
    ],
    examPattern: {
      tier1: 'Section A: Quantitative Ability, Reasoning, English, General Awareness (40 Qs). Section B: Trade Specific Theory (80 Qs). Total 120 Qs, 90 mins.',
      tier2TradeTest: 'Practical test to assess hands-on workshop capabilities according to NCVT syllabus.',
      skillTest: 'Conducted at DRDO labs across India.'
    },
    salaryStructure: 'Level-2 (Pay Matrix ₹19,900 - ₹63,200 + Central Govt allowances, in-hand ~₹34,000/mo)',
    officialPortal: 'drdo.gov.in',
    preparationStrategy: [
      'Balance non-tech reasoning & maths with in-depth trade theory.',
      'Revise technical terms, SI units, safety regulations and workshop formula handbook.',
      'Simulate 120 questions mock tests within 90 minutes to maintain high accuracy.'
    ],
    icon: '🛡️'
  },
  {
    id: 'barc_npcil',
    organization: 'BARC (Bhabha Atomic Research Centre) / NPCIL / IGCAR',
    postName: 'Stipendiary Trainee Category-II (Technician)',
    eligibility: 'SSC (with Science & Math min 60% marks) + ITI Trade Certificate (NTC)',
    selectionProcess: [
      'Stage 1: Preliminary Test (Screening - 50 Questions)',
      'Stage 2: Advanced Test (Merit List - 50 Questions from Core Trade)',
      'Stage 3: Skill Test (Go / No-Go Practical Test)'
    ],
    examPattern: {
      tier1: 'Stage 1: Math (20 Q), Science (20 Q), GA (10 Q) - 50 Qs (+3, -1). Min 40% (General) / 30% (Reserved) to qualify.',
      tier2TradeTest: 'Stage 2: 50 Trade Theory Questions (+3, -1) - 2 Hours. Merit list for final selection is made on Stage 2 marks.',
      skillTest: 'Stage 3: Candidates called in 1:4 or 1:5 ratio for hands-on workshop test.'
    },
    salaryStructure: '1st Year Stipend ₹20,000/mo, 2nd Year ₹22,000/mo ➔ Absorbed as Scientific Assistant / Technician Level-3 (₹21,700 basic + DA)',
    officialPortal: 'barc.gov.in / npcilcareers.co.in',
    preparationStrategy: [
      'Maintain crystal clear conceptual understanding of 10th Standard Science and Maths for Stage 1.',
      'Deep dive into every chapter of Trade Theory for Stage 2 as negative marking (-1 for 3 marks question) is severe.'
    ],
    icon: '⚛️'
  },
  {
    id: 'state_electricity_boards',
    organization: 'State Power Corporations (UPPCL TG-2, BSPHCL, PSPCL, Mahadiscom, MPPGCL)',
    postName: 'Technician Electrical / Line Attendant / Switchboard Operator',
    eligibility: 'High School with Science & Math + ITI Electrician / Wireman (NCVT/SCVT)',
    selectionProcess: [
      'Computer Knowledge Test (NIELIT CCC Level 50 Questions - Qualifying min 20 marks)',
      'Technical Subject Paper (150 Questions Trade Theory + 50 Non-Tech)',
      'Document Verification'
    ],
    examPattern: {
      tier1: 'Part 1: 50 Computer MCQs (Must score 20 marks, otherwise Part 2 is not evaluated). Part 2: 150 Trade Theory + 20 GK + 15 Hindi + 15 English.',
      tier2TradeTest: 'Merit drawn entirely on Part-2 scores (Total 200 marks).',
      skillTest: 'Pole climbing / wire jointing physical test in some states (Line Attendant)'
    },
    salaryStructure: 'Level-4 (Pay Scale: ₹27,200 - ₹86,100 basic + Power allowance ~₹42,000/mo in-hand)',
    officialPortal: 'uppcl.org / bsphcl.co.in',
    preparationStrategy: [
      'Clear NIELIT CCC Computer syllabus (MS Word, Excel, Email, LibreOffice Writer/Calc shortcuts).',
      'Exhaustively solve previous 10 years UPPCL TG-2 and state electricity board papers.'
    ],
    icon: '⚡'
  }
];

export const ITI_WORKSHOP_TOOLS: ITIWorkshopTool[] = [
  {
    id: 'vernier_caliper',
    name: {
      hi: 'वर्नियर कैलीपर (Vernier Caliper)',
      en: 'Vernier Caliper',
      hinglish: 'Vernier Caliper (0.02 mm)'
    },
    category: 'Precision Measuring',
    leastCountOrRating: 'Least Count: 0.02 mm (Metric) / 0.001 inch (Imperial)',
    useCase: {
      hi: 'किसी भी जॉब का बाहरी व्यास (Outer Diameter), आंतरिक व्यास (Inner Diameter) एवं गहराई (Depth) 0.02 मिमी की शुद्धता तक मापने हेतु।',
      en: 'Used for measuring internal, external dimensions and depth of components with 0.02mm accuracy.',
      hinglish: 'Outer diameter, inner diameter aur depth 0.02mm accuracy ke sath measure karne ke liye use hota hai.'
    },
    safetyRule: {
      hi: 'उपयोग से पहले जीरो एरर (Zero Error) चेक करें; कैलीपर को कभी घूमती हुई मशीन (Lathe spindle) पर न लगाएं।',
      en: 'Check for positive/negative zero error before measurement; never apply caliper on rotating workpiece.',
      hinglish: 'Hamesha zero error check karein aur running machine par use na karein.'
    },
    icon: '📏'
  },
  {
    id: 'micrometer_screw_gauge',
    name: {
      hi: 'माइक्रोमीटर स्क्रू गेज (Outside Micrometer)',
      en: 'Outside Micrometer',
      hinglish: 'Outside Micrometer (0.01 mm)'
    },
    category: 'Precision Measuring',
    leastCountOrRating: 'Least Count: 0.01 mm (Digital: 0.001 mm)',
    useCase: {
      hi: 'तार का व्यास, शीट मेटल की मोटाई एवं शाफ्ट के बाहरी व्यास को 0.01 मिमी की अति-उच्च परिशुद्धता से मापने हेतु।',
      en: 'Precision measurement of wire diameter, sheet thickness, and cylindrical shafts based on screw and nut principle.',
      hinglish: 'Wire diameter, sheet thickness aur precision shafts ko 0.01 mm accuracy se measure karne me.'
    },
    safetyRule: {
      hi: 'अंतिम कसावट हमेशा रैचेट स्टॉप (Ratchet Stop) से 3-क्लिक करके दें, सीधे थिम्बल से जोर न लगाएं।',
      en: 'Always use the ratchet stop for final uniform measuring pressure (listen for 3 clicks); avoid excessive thimble torque.',
      hinglish: 'Final tightening hamesha Ratchet Stop se karein taaki zero error ya spindle bend na ho.'
    },
    icon: '🔬'
  },
  {
    id: 'digital_multimeter',
    name: {
      hi: 'डिजिटल मल्टीमीटर (True RMS Multimeter)',
      en: 'Digital Multimeter',
      hinglish: 'Digital Multimeter'
    },
    category: 'Electrical & Diagnostic',
    leastCountOrRating: 'CAT III 600V / CAT IV 1000V, Resolution 0.1 mV / 0.1 Ω',
    useCase: {
      hi: 'एसी/डीसी वोल्टेज, करंट, प्रतिरोध, कंटिन्यूटी (बीप टेस्ट), डायोड एवं कैपेसिटेंस टेस्टिंग।',
      en: 'Measuring AC/DC voltage, current, resistance, continuity buzzer, diode forward voltage drop, and capacitance.',
      hinglish: 'AC/DC voltage, circuit continuity, resistance aur component checking ke liye primary instrument.'
    },
    safetyRule: {
      hi: 'वोल्टेज मापते समय प्रॉब्स को कभी 10A एम्पीयर सॉकेट में न लगाएं (शॉर्ट सर्किट ब्लास्ट का खतरा)।',
      en: 'Never measure voltage with test leads plugged into the Current (10A) jack to prevent severe short-circuit flashover.',
      hinglish: 'Voltage check karte waqt probe ko current port me na lagayein, fuse blast ho sakta hai.'
    },
    icon: '⚡'
  },
  {
    id: 'megger_insulation_tester',
    name: {
      hi: 'मेगर (इंसुलेशन टेस्टर - 500V/1000V Megger)',
      en: 'Megger (Insulation Resistance Tester)',
      hinglish: 'Megger Insulation Tester'
    },
    category: 'Electrical & Diagnostic',
    leastCountOrRating: 'Test Voltage: 500V / 1000V DC, Range: 0 to 1000 MΩ (Mega-Ohms)',
    useCase: {
      hi: 'मोटर वाइंडिंग, ट्रांसफार्मर, केबल और घरेलू वायरिंग के इंसुलेशन प्रतिरोध की जांच (न्यूनतम 1 Mega-Ohm सुरक्षित मान)।',
      en: 'Testing insulation resistance of electrical cables, motor windings, and transformer coils to prevent earth leakages.',
      hinglish: 'Motor winding aur high voltage cables ka insulation resistance (Mega-ohms) measure karne ke liye.'
    },
    safetyRule: {
      hi: 'मेगर टेस्ट से पहले सर्किट की मुख्य सप्लाई 100% बंद (De-energized) करें और केबल को डिस्चार्ज करें।',
      en: 'Always de-energize the circuit and ground the test conductor to discharge stored capacitance before and after testing.',
      hinglish: 'Live circuit me megger kabhi connect na karein aur test ke baad wire ko discharge karein.'
    },
    icon: '🔌'
  },
  {
    id: 'hydraulic_crimper',
    name: {
      hi: 'हाइड्रोलिक क्रिम्पिंग टूल (Hydraulic Lug Crimper)',
      en: 'Hydraulic Cable Crimper',
      hinglish: 'Hydraulic Cable Crimper (10 - 400 sq mm)'
    },
    category: 'Electrical & Diagnostic',
    leastCountOrRating: 'Pressure: 12-16 Tons, Die Range: 10 sq.mm to 400 sq.mm',
    useCase: {
      hi: 'हाई-वोल्टेज एल्युमिनियम व कॉपर केबल पर लग्स (Cable Lugs/Sockets) को बिना किसी स्पार्क या लूज कनेक्शन के परफेक्ट कसने हेतु।',
      en: 'Crimping copper and aluminum terminal lugs on heavy power cables with uniform hexagonal compression.',
      hinglish: 'Heavy power cables par terminal lugs ko leak-proof hex crimp karne ke liye.'
    },
    safetyRule: {
      hi: 'क्रिम्पिंग करते समय हाथ डाई के बीच न रखें और प्रेशर रिलीफ नॉब को धीरे-धीरे खोलें।',
      en: 'Ensure dies match the exact cable cross-section; release pressure valve smoothly before die change.',
      hinglish: 'Sahi size ki die use karein aur live cable par kabhi crimp na karein.'
    },
    icon: '🗜️'
  },
  {
    id: 'dial_test_indicator',
    name: {
      hi: 'डायल टेस्ट इंडिकेटर (DTI - Plunger Type)',
      en: 'Dial Test Indicator (DTI)',
      hinglish: 'Dial Test Indicator (0.01 mm)'
    },
    category: 'Precision Measuring',
    leastCountOrRating: 'Least Count: 0.01 mm / 0.001 mm (Digital)',
    useCase: {
      hi: 'लेथ चक में जॉब की ट्रूथ (Truing), शाफ्ट की रन-आउट (Runout), और सतह की समतलता (Flatness) चेक करने हेतु।',
      en: 'Checking concentricity, trueness of shafts in lathe 4-jaw chuck, and parallelism of flat surfaces.',
      hinglish: 'Shaft runout aur lathe chuck me job centering ki high accuracy check karne me.'
    },
    safetyRule: {
      hi: 'प्लंजर पर अचानक झटका न दें; मैग्नेटिक बेस को मशीन वाइब्रेशन से सुरक्षित रखें।',
      en: 'Avoid rapid shock loads on the sensitive stylus; clamp magnetic stand securely on clean cast-iron bed.',
      hinglish: 'Stylus ko direct hit na karein aur magnetic stand ko mazbooti se fix karein.'
    },
    icon: '⏲️'
  }
];

export interface ITIBharatSkillsResource {
  id: string;
  tradeName: string;
  tradeCode: string;
  semester: string;
  nimiBookTitle: string;
  questionBankUrl: string;
  cbtSimulatorPortal: string;
  keyTopicsCovered: string[];
}

export const ITI_BHARAT_SKILLS_DATA: ITIBharatSkillsResource[] = [
  {
    id: 'bs_elec',
    tradeName: 'Electrician (इलेक्ट्रीशियन)',
    tradeCode: 'CTS-ELE-01',
    semester: 'Year 1 & Year 2 (Full Syllabus)',
    nimiBookTitle: 'NIMI Trade Theory & Practical 4th Edition (NSQF Level-5)',
    questionBankUrl: 'bharatskills.gov.in/Home/StudyMaterial?Trade=Electrician',
    cbtSimulatorPortal: 'ncvtmis.gov.in / Bharat Skills Question Bank (Module 1 to 14)',
    keyTopicsCovered: [
      'Safety Practice & Hand Tools (NIMI Module 1)',
      'Basic Electricity, Cells & Batteries (NIMI Module 2-3)',
      'AC Circuits, Polyphase & Earthing (NIMI Module 5-7)',
      'DC Machines & AC Motors (Star-Delta Starter) (NIMI Module 9-11)',
      'Transformers & Power Generation (NIMI Module 12-14)'
    ]
  },
  {
    id: 'bs_fit',
    tradeName: 'Fitter (फिटर)',
    tradeCode: 'CTS-FIT-02',
    semester: 'Year 1 & Year 2 (NSQF Level-5)',
    nimiBookTitle: 'NIMI Fitter Trade Theory, Practical & WCS Handbook',
    questionBankUrl: 'bharatskills.gov.in/Home/StudyMaterial?Trade=Fitter',
    cbtSimulatorPortal: 'ncvtmis.gov.in (AITT All India Trade Test Portal)',
    keyTopicsCovered: [
      'Fitting Tools, Files, Hacksaws & Bench Vice (NIMI Module 1)',
      'Precision Measuring: Vernier, Micrometer & Dial Gauges',
      'Drilling, Reaming, Tapping & Thread Cutting (Metric/BSW)',
      'Heat Treatment, Gauges, Fasteners & Sheet Metal',
      'Piping, Valves, Hydraulics & Pneumatics (NIMI Module 8-10)'
    ]
  },
  {
    id: 'bs_rac',
    tradeName: 'RAC Mechanic (आरएसी मैकेनिक)',
    tradeCode: 'CTS-RAC-08',
    semester: 'Year 1 & Year 2',
    nimiBookTitle: 'NIMI Refrigeration & Air Conditioning Technology Guide',
    questionBankUrl: 'bharatskills.gov.in/Home/StudyMaterial?Trade=RAC',
    cbtSimulatorPortal: 'Bharat Skills Mobile App & NIMI Online Exam Portal',
    keyTopicsCovered: [
      'Thermodynamics, P-h Charts & Refrigerants (R-32/R-410A)',
      'Domestic Refrigeration & Frost-free Systems',
      'Inverter Split ACs, BLDC Compressors & PCB Diagnosis',
      'Commercial Chillers, AHUs, FCUs & Cooling Towers',
      'VRV/VRF Multi-split Central Air Conditioning'
    ]
  },
  {
    id: 'bs_copa',
    tradeName: 'COPA (Computer Operator & Programming Assistant)',
    tradeCode: 'CTS-COP-04',
    semester: '1 Year (NSQF Level-3/4)',
    nimiBookTitle: 'NIMI COPA Theory & Python/JavaScript Practical Guide',
    questionBankUrl: 'bharatskills.gov.in/Home/StudyMaterial?Trade=COPA',
    cbtSimulatorPortal: 'ncvtmis.gov.in / NCVT Trainee Marksheet Portal',
    keyTopicsCovered: [
      'Computer Hardware, OS Installation & Networking LAN/WAN',
      'MS Office 365, Advanced Excel Formulas & Macros',
      'Database Management Systems (MySQL & Relational Queries)',
      'Web Development: HTML5, CSS3, JavaScript ES6',
      'Accounting with Tally Prime & GST E-Filing',
      'Python Programming Fundamentals & Cyber Security'
    ]
  }
];

export interface ITIContractorLicense {
  id: string;
  licenseType: string;
  issuingAuthority: string;
  requiredQualifications: string;
  mandatoryTestingEquipment: string[];
  authorizedScope: string;
  securityDeposit: string;
  validityAndRenewal: string;
}

export const ITI_CONTRACTOR_LICENSES_DATA: ITIContractorLicense[] = [
  {
    id: 'elec_class_a',
    licenseType: 'Class "A" High Voltage (HT) Electrical Contractor License',
    issuingAuthority: 'State Directorate of Electrical Safety (विद्युत सुरक्षा निदेशालय) / Chief Electrical Inspector to Govt (CEIG)',
    requiredQualifications: 'ITI Electrician/Wireman with 5 years experience + Certified Electrical Supervisor (Supervisor Certificate of Competency)',
    mandatoryTestingEquipment: [
      '500V / 1000V / 2500V Digital Megger (Insulation Tester)',
      'Digital Earth Resistance Tester (4-spike method)',
      'Phase Sequence Indicator & Tong/Clamp Meter (0-1000A)',
      'High Voltage Rubber Hand Gloves (Tested up to 33kV)',
      'Hydraulic Cable Crimper (up to 400 sq mm)'
    ],
    authorizedScope: 'LT, 11kV, 33kV & 66kV Electrical Substations, High-Rise Buildings, Industrial Power Connections & Transformers.',
    securityDeposit: '₹50,000 to ₹1,00,000 (State Govt Treasury FDR/Challan)',
    validityAndRenewal: 'Valid for 3 Years; Renewable with yearly testing equipment calibration certificates.'
  },
  {
    id: 'elec_class_b',
    licenseType: 'Class "B" Low Voltage (LT) Electrical Contractor License',
    issuingAuthority: 'Electrical Inspectorate (State Energy Department)',
    requiredQualifications: 'ITI Electrician/Wireman (NCVT/SCVT) Certificate + Wireman Permit + 2 Years practical experience',
    mandatoryTestingEquipment: [
      '500V Insulation Megger',
      'Digital Earth Resistance Tester',
      'AC/DC Digital Clamp Meter & Multimeter',
      'Standard Electrician Toolkit (Insulated up to 1000V)'
    ],
    authorizedScope: 'Domestic, Commercial and Low Tension (LT up to 415V/650V) industrial electrical wiring & load connections.',
    securityDeposit: '₹15,000 to ₹25,000 FDR',
    validityAndRenewal: 'Valid for 3 to 5 Years.'
  },
  {
    id: 'solar_rooftop_vendor',
    licenseType: 'PM Surya Ghar / MNRE Solar Rooftop Authorized Vendor Registration',
    issuingAuthority: 'Ministry of New & Renewable Energy (MNRE) / State DISCOM Portal',
    requiredQualifications: 'ITI Electrician / Wireman / Solar Technician with Class-A/B Electrical License',
    mandatoryTestingEquipment: [
      'Solar Irradiance Meter (Pyranometer)',
      'DC Clamp Meter (0-600V DC / 0-100A DC)',
      'MC4 Connector Crimping Tool & Torque Wrench',
      'Solar PV Array Tester & Earth Ground Tester'
    ],
    authorizedScope: 'Installing 1kW to 500kW Grid-Connected Solar Rooftop PV Systems with Govt Subsidies (up to ₹78,000/consumer).',
    securityDeposit: '₹25,000 to ₹50,000 (DISCOM Empanelment)',
    validityAndRenewal: 'Empaneled across DISCOMs with online consumer lead assignment.'
  },
  {
    id: 'pmegp_subsidy_loan',
    licenseType: 'PMEGP / Mudra Loan for ITI Workshop Startups (Lathe/CNC/Fabrication)',
    issuingAuthority: 'KVIC / MSME Department / Nationalized Banks',
    requiredQualifications: 'ITI NCVT Trade Certificate in Fitter / Turner / Welder / Electrician / MMV',
    mandatoryTestingEquipment: [
      'Machinery Quotation (Lathe machine, Welding rectifier, Compressor, Lift, Tool kit)',
      'Detailed Project Report (DPR) prepared with bank manager format'
    ],
    authorizedScope: 'Project funding up to ₹50 Lakhs (Manufacturing) / ₹20 Lakhs (Service sector) with 25% to 35% Govt Subsidy.',
    securityDeposit: '5% to 10% Own Contribution (Beneficiary margin)',
    validityAndRenewal: '5 to 7 Years Bank Term Loan repayment tenure.'
  }
];

export interface ITIWorkshopFormula {
  id: string;
  topic: string;
  formula: string;
  meaning: string;
  practicalExample: string;
}

export const ITI_WORKSHOP_FORMULAS_DATA: ITIWorkshopFormula[] = [
  {
    id: 'ohms_power',
    topic: 'Electrical: Ohm’s Law & Electric Power',
    formula: 'V = I × R  |  P = V × I = I²R = V² / R  |  E = P × t (kWh)',
    meaning: 'V = Voltage (Volts), I = Current (Amperes), R = Resistance (Ohms), P = Power (Watts), E = Electrical Energy (Units / kWh).',
    practicalExample: 'A 2000W geyser on 230V draws: I = P / V = 2000 / 230 = 8.69 Amperes. Wire must be min 2.5 sq mm copper with 16A MCB.'
  },
  {
    id: 'three_phase_power',
    topic: 'Electrical: 3-Phase AC Active & Apparent Power',
    formula: 'P = √3 × VL × IL × cos φ (kW)  |  S = √3 × VL × IL (kVA)  |  kVAR = √3 × VL × IL × sin φ',
    meaning: 'VL = Line-to-Line Voltage (415V), IL = Line Current, cos φ = Power Factor (Target: 0.95 - 0.99).',
    practicalExample: 'A 10 HP motor (7.46 kW) on 415V at 0.85 PF draws: IL = 7460 / (1.732 × 415 × 0.85) ≈ 12.2 Amperes.'
  },
  {
    id: 'lathe_cutting_speed',
    topic: 'Mechanical: Lathe Spindle RPM & Cutting Speed',
    formula: 'V = (π × D × N) / 1000  ➔  N = (1000 × V) / (π × D)',
    meaning: 'V = Cutting Speed (meters/min), D = Job Diameter (mm), N = Spindle RPM.',
    practicalExample: 'Turning a 50mm Mild Steel bar with HSS tool at 30 m/min: N = (1000 × 30) / (3.1416 × 50) = 30000 / 157.08 ≈ 191 RPM.'
  },
  {
    id: 'tapping_drill_size',
    topic: 'Fitter: Tapping Drill Size (TDS) for ISO Metric Threads',
    formula: 'TDS = Major Diameter (D) - Pitch (P)  |  Exact: TDS = D - (2 × Depth of Thread = 2 × 0.6134 × P)',
    meaning: 'D = Nominal bolt size (mm), P = Thread Pitch (mm).',
    practicalExample: 'For M10 × 1.5 tap: TDS = 10 - 1.5 = 8.5 mm drill bit required before tapping.'
  },
  {
    id: 'refrigeration_tr_cop',
    topic: 'RAC / HVAC: Ton of Refrigeration & COP',
    formula: '1 TR = 12,000 BTU/hr = 3.516 kW = 3024 kcal/hr  |  COP = Refrigerating Effect / Compressor Work Input',
    meaning: 'TR = Heat extraction capacity of 1 Ton of ice in 24 hours. Higher COP means higher Star Rating energy efficiency.',
    practicalExample: 'A 1.5 TR Split AC has cooling capacity of 1.5 × 3.516 = 5.27 kW. If it consumes 1.3 kW power, COP = 5.27 / 1.3 = 4.05 (5-Star ISEER rating).'
  },
  {
    id: 'engine_power_formula',
    topic: 'Automobile / MMV: Indicated Power & Brake Power',
    formula: 'IP = (P_m × L × A × n × k × 10) / 6  (kW)  |  Brake Power (BP) = (2 × π × N × T) / 60,000 (kW)',
    meaning: 'P_m = Mean effective pressure (bar), L = Stroke (m), A = Piston area (m²), n = Working cycles (N/2 for 4-stroke), k = Number of cylinders, T = Torque (Nm).',
    practicalExample: 'Engine producing 150 Nm torque at 4000 RPM produces BP = (2 × 3.1416 × 4000 × 150) / 60000 = 62.83 kW (84.2 HP).'
  }
];

export const ITI_MOCK_TEST_QUESTIONS: ITIMockQuestion[] = [
  {
    id: 'q1_elec',
    trade: 'Electrician',
    question: {
      hi: 'विद्युत आग (Class-C / Electrical Fire) को बुझाने के लिए किस प्रकार के अग्निशामक (Fire Extinguisher) का उपयोग किया जाता है?',
      en: 'Which type of fire extinguisher is used to extinguish an electrical fire (Class C/E)?'
    },
    options: [
      { hi: 'जल प्रकार अग्निशामक (Water type)', en: 'Water type extinguisher' },
      { hi: 'फोम प्रकार अग्निशामक (Foam type)', en: 'Foam type extinguisher' },
      { hi: 'कार्बन डाइऑक्साइड (CO2) या शुष्क रासायनिक चूर्ण (DCP/Halon)', en: 'Carbon Dioxide (CO2) or Dry Chemical Powder (DCP/Halon)' },
      { hi: 'गीला रासायनिक अग्निशामक (Wet chemical)', en: 'Wet chemical extinguisher' }
    ],
    correctAnswer: 2,
    explanation: {
      hi: 'विद्युत आग पर पानी या फोम का प्रयोग घातक है क्योंकि वे सुचालक हैं। इसके लिए CO2 या हैलॉन/सीटीसी (CTC) अग्निशामक सुरक्षित है।',
      en: 'Water and foam are conductive and can cause lethal electric shock. CO2 or dry powder/Halon gas is non-conductive and smothers electrical fires safely.'
    }
  },
  {
    id: 'q2_fit',
    trade: 'Fitter',
    question: {
      hi: 'साधारण मीट्रिक वर्नियर कैलीपर (Metric Vernier Caliper) का अल्पतमांक (Least Count) कितना होता है?',
      en: 'What is the least count of a standard metric Vernier Caliper having 49 MSD divided into 50 VSD?'
    },
    options: [
      { hi: '0.1 मिमी (0.1 mm)', en: '0.1 mm' },
      { hi: '0.02 मिमी (0.02 mm)', en: '0.02 mm' },
      { hi: '0.01 मिमी (0.01 mm)', en: '0.01 mm' },
      { hi: '0.001 मिमी (0.001 mm)', en: '0.001 mm' }
    ],
    correctAnswer: 1,
    explanation: {
      hi: 'Least Count = 1 MSD - 1 VSD = 1 mm - (49/50) mm = 1/50 = 0.02 mm। माइक्रोमीटर का अल्पतमांक 0.01 मिमी होता है।',
      en: 'Least Count is 1 MSD minus 1 VSD = 1 mm - (49/50 mm) = 0.02 mm. Standard metric micrometer least count is 0.01 mm.'
    }
  },
  {
    id: 'q3_wcs',
    trade: 'WCS (Workshop Calc)',
    question: {
      hi: 'एक 3-फेज 415V इंडक्शन मोटर 10A करंट लेती है और उसका पावर फैक्टर 0.85 है। मोटर द्वारा ली गई वास्तविक शक्ति (Active Power in kW) क्या होगी? (P = √3 × VL × IL × cos φ)',
      en: 'A 3-phase 415V induction motor draws 10A current at 0.85 power factor. What is the active power drawn by the motor in kW? (Formula: P = √3 × VL × IL × cos φ)'
    },
    options: [
      { hi: '3.52 kW', en: '3.52 kW' },
      { hi: '6.11 kW', en: '6.11 kW' },
      { hi: '8.45 kW', en: '8.45 kW' },
      { hi: '4.15 kW', en: '4.15 kW' }
    ],
    correctAnswer: 1,
    explanation: {
      hi: 'P = √3 × 415 × 10 × 0.85 = 1.732 × 415 × 10 × 0.85 = 6109.8 Watts = 6.11 kW।',
      en: 'P = 1.732 × 415 V × 10 A × 0.85 = 6,109.8 Watts = 6.11 kW.'
    }
  },
  {
    id: 'q4_weld',
    trade: 'Welder',
    question: {
      hi: 'TIG वेल्डिंग (Tungsten Inert Gas Welding) में किस अक्रिय गैस (Shielding Gas) का सर्वाधिक उपयोग किया जाता है?',
      en: 'Which shielding gas is most commonly used in TIG (GTAW) welding of stainless steel and aluminum?'
    },
    options: [
      { hi: 'ऑक्सीजन (Oxygen)', en: 'Oxygen' },
      { hi: 'आर्गन (Argon - 100% Pure)', en: 'Argon (100% Pure)' },
      { hi: 'हाइड्रोजन (Hydrogen)', en: 'Hydrogen' },
      { hi: 'कार्बन मोनोऑक्साइड (CO)', en: 'Carbon Monoxide' }
    ],
    correctAnswer: 1,
    explanation: {
      hi: 'TIG वेल्डिंग में शुद्ध आर्गन गैस पिघले हुए वेल्ड पूल को वायुमंडलीय ऑक्सीजन और नाइट्रोजन के संपर्क से बचाती है।',
      en: '100% pure Argon provides excellent arc stability and shields the molten weld puddle from atmospheric oxidation.'
    }
  },
  {
    id: 'q5_es',
    trade: 'Employability Skills',
    question: {
      hi: 'कार्यस्थल पर 5S प्रणाली में "Seiri" (सॉर्ट - Sort) का क्या अर्थ है?',
      en: 'In the Japanese 5S workplace methodology, what does the first "S" (Seiri / Sort) signify?'
    },
    options: [
      { hi: 'कार्यस्थल की सफाई करना (Shine)', en: 'Cleaning the workstation' },
      { hi: 'आवश्यक और अनावश्यक वस्तुओं को अलग करके फालतू सामान हटाना', en: 'Separating necessary items from unnecessary items and discarding clutter' },
      { hi: 'मानकीकरण करना (Standardize)', en: 'Establishing workplace standards' },
      { hi: 'अनुशासन बनाए रखना (Sustain)', en: 'Maintaining continuous self-discipline' }
    ],
    correctAnswer: 1,
    explanation: {
      hi: '1S (Seiri = Sort / छंटाई): काम की चीजों को रखना और गैर-जरूरी कचरे को वर्कशॉप से हटाना। 2S (Seiton = Set in order), 3S (Seiso = Shine), 4S (Seiketsu = Standardize), 5S (Shitsuke = Sustain)।',
      en: '1S (Seiri = Sort) means separating essential tools from unneeded items and removing clutter to create an efficient workspace.'
    }
  },
  {
    id: 'q6_rac',
    trade: 'Electrician',
    question: {
      hi: 'रेफ्रिजरेंट R-32 का रासायनिक नाम क्या है और इसका ओजोन क्षरण विभव (ODP) कितना है?',
      en: 'What is the chemical name and Ozone Depletion Potential (ODP) of eco-friendly refrigerant R-32?'
    },
    options: [
      { hi: 'डाइफ्लोरोमीथेन (CH2F2) और ODP = 0', en: 'Difluoromethane (CH2F2) and ODP = 0' },
      { hi: 'ट्राइक्लोरोफ्लोरोमीथेन और ODP = 1', en: 'Trichlorofluoromethane and ODP = 1' },
      { hi: 'टेट्राफ्लोरोइथेन और ODP = 0.5', en: 'Tetrafluoroethane and ODP = 0.5' },
      { hi: 'प्रोपेन और ODP = 2', en: 'Propane and ODP = 2' }
    ],
    correctAnswer: 0,
    explanation: {
      hi: 'R-32 का रासायनिक नाम डाइफ्लोरोमीथेन (CH2F2) है। इसका ODP शून्य (0) है और GWP केवल 675 है, जिससे यह पर्यावरण अनुकूल है।',
      en: 'R-32 is Difluoromethane with zero Ozone Depletion Potential (ODP = 0) and low Global Warming Potential (GWP = 675).'
    }
  },
  {
    id: 'q7_copa',
    trade: 'COPA',
    question: {
      hi: 'रिलेशनल डेटाबेस (RDBMS / MySQL) में टेबल से डुप्लिकेट रिकॉर्ड हटाकर यूनिक वैल्यू प्राप्त करने हेतु किस SQL क्लॉज का प्रयोग किया जाता है?',
      en: 'Which SQL keyword is used in a SELECT query to eliminate duplicate records and return only unique values?'
    },
    options: [
      { hi: 'UNIQUE', en: 'UNIQUE' },
      { hi: 'DISTINCT', en: 'DISTINCT' },
      { hi: 'GROUP ALL', en: 'GROUP ALL' },
      { hi: 'FILTER', en: 'FILTER' }
    ],
    correctAnswer: 1,
    explanation: {
      hi: 'SELECT DISTINCT column_name FROM table_name; का प्रयोग डुप्लीकेट पंक्तियों को हटाने के लिए किया जाता है।',
      en: 'The SELECT DISTINCT statement is used to return only distinct (different) values from a database table.'
    }
  }
];
