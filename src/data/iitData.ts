export interface IITInstitute {
  id: string;
  name: string;
  location: string;
  state: string;
  established: number;
  nirfRank2024: number | string;
  campusAreaAcres: number;
  motto: string;
  flagshipBranches: string[];
  iconicLabs: string[];
  highestPackage: string;
  medianPackageBTech: string;
  notableAlumni: { name: string; role: string }[];
  incubationCell: string;
  overview: { hi: string; en: string; hinglish: string };
  imagePlaceholder?: string;
}

export interface IITBranchDetail {
  id: string;
  code: string;
  name: { hi: string; en: string; hinglish: string };
  duration: string;
  overview: { hi: string; en: string; hinglish: string };
  coreSubjects: string[];
  emergingSubFields: string[];
  topRecruiters: string[];
  avgPackageLPA: string;
  careerPaths: string[];
  icon: string;
}

export interface JEESubjectStrategy {
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  weightagePercentage: string;
  highYieldChapters: {
    name: string;
    questionsAvg: number;
    difficulty: 'Conceptual & High Calculus' | 'Formula & Memory Heavy' | 'Multi-Concept Matrix';
    coreFormulasOrKeys: string[];
  }[];
  masteryTips: string[];
  icon: string;
}

export interface IITMockAdvancedQuestion {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  questionType: 'Single Correct' | 'Multiple Correct (Partial Marking)' | 'Numerical / Integer Type';
  question: { hi: string; en: string };
  options?: { hi: string; en: string }[];
  correctAnswer: string | number | number[];
  solutionExplanation: { hi: string; en: string };
}

export const IIT_INSTITUTES_DATA: IITInstitute[] = [
  {
    id: 'iit_madras',
    name: 'IIT Madras (Indian Institute of Technology Madras)',
    location: 'Chennai',
    state: 'Tamil Nadu',
    established: 1959,
    nirfRank2024: 1,
    campusAreaAcres: 617,
    motto: 'Siddhirbhavati Karmaja (Success is born of action)',
    flagshipBranches: ['Computer Science & Engineering', 'Electrical Engineering', 'Data Science & AI', 'Aerospace Engineering'],
    iconicLabs: [
      'Robert Bosch Centre for Data Science & AI (RBCDSAI)',
      'IITM Research Park (India’s 1st University Research Park)',
      'National Centre for Combustion R&D (NCCRD)',
      'Centre for Innovation (CFI - Student-led innovation hub)'
    ],
    highestPackage: '₹2.14 Crore / annum (International) | ₹1.31 Crore (Domestic)',
    medianPackageBTech: '₹22.5 LPA (Overall) | ₹41.5 LPA (CSE)',
    notableAlumni: [
      { name: 'Dr. Kris Gopalakrishnan', role: 'Co-founder, Infosys' },
      { name: 'Sridhar Vembu', role: 'Founder & CEO, Zoho Corporation' },
      { name: 'Pawan Goenka', role: 'Former MD, Mahindra & Mahindra & Chairman IN-SPACe' }
    ],
    incubationCell: 'IITM Incubation Cell & Nirmaan (Over 350+ deep-tech startups incubated, including Ather Energy, Agnikul Cosmos, Hyperverge)',
    overview: {
      hi: 'आईआईटी मद्रास भारत का लगातार शीर्ष #1 संस्थान (NIRF ओवरऑल रैंकिंग) है। यहां देश का सबसे बड़ा और सफलतम यूनिवर्सिटी रिसर्च पार्क एवं डीप-टेक स्टार्टअप इकोसिस्टम सक्रिय है।',
      en: 'Ranked #1 in NIRF consistently, IIT Madras houses India’s premier university research park, producing world-class breakthroughs in electric mobility, space-tech, and AI.',
      hinglish: 'IIT Madras NIRF #1 institute hai, jahan India ka sabse bada Research Park, Agnikul Cosmos rocket startup aur Ather Energy jaisi world-class companies paida hui hain.'
    }
  },
  {
    id: 'iit_delhi',
    name: 'IIT Delhi (Indian Institute of Technology Delhi)',
    location: 'Hauz Khas, New Delhi',
    state: 'Delhi NCR',
    established: 1961,
    nirfRank2024: 2,
    campusAreaAcres: 320,
    motto: 'Yogah Karmasu Kaushalam (Excellence in action is Yoga)',
    flagshipBranches: ['Computer Science & Engineering', 'Electrical Engineering', 'Mathematics & Computing', 'Mechanical Engineering'],
    iconicLabs: [
      'Yardi School of Artificial Intelligence (ScAI)',
      'Centre for Automotive Research and Tribology (CART)',
      'Nanoscale Research Facility (NRF - Class 100 cleanroom)',
      'Central Research Facility (CRF)'
    ],
    highestPackage: '₹2.4 Crore / annum (Jane Street / Quant HFTs) | ₹1.45 Crore (Domestic)',
    medianPackageBTech: '₹25.8 LPA (Overall) | ₹46.0 LPA (CSE)',
    notableAlumni: [
      { name: 'Deepinder Goyal & Pankaj Chaddah', role: 'Founders, Zomato' },
      { name: 'Sachin Bansal & Binny Bansal', role: 'Founders, Flipkart' },
      { name: 'Vidit Aatrey & Sanjeev Barnwal', role: 'Founders, Meesho' },
      { name: 'Vinod Khosla', role: 'Co-founder, Sun Microsystems & Khosla Ventures' }
    ],
    incubationCell: 'Foundation for Innovation and Technology Transfer (FITT) - Unicorn Factory of India',
    overview: {
      hi: 'आईआईटी दिल्ली भारत की स्टार्टअप राजधानी का दिल है, जिसने देश को सर्वाधिक यूनिकॉर्न फाउंडर्स (Flipkart, Zomato, Meesho, Blinkit) और वर्ल्ड-क्लास रिसर्च दी है।',
      en: 'Located in the national capital, IIT Delhi is India’s unicorn engine, renowned for exceptional academic rigor, cutting-edge AI research, and top HFT placements.',
      hinglish: 'IIT Delhi startup founders ki sabse badi nursery hai. Zomato, Flipkart, Meesho ke founders yahan se hain aur CSE median packages highest in India hain.'
    }
  },
  {
    id: 'iit_bombay',
    name: 'IIT Bombay (Indian Institute of Technology Bombay)',
    location: 'Powai, Mumbai',
    state: 'Maharashtra',
    established: 1958,
    nirfRank2024: 3,
    campusAreaAcres: 550,
    motto: 'Jnanam Paramam Dhyeyam (Knowledge is the supreme goal)',
    flagshipBranches: ['Computer Science & Engineering', 'Electrical Engineering', 'Aerospace Engineering', 'Engineering Physics'],
    iconicLabs: [
      'Centre of Studies in Resources Engineering (CSRE)',
      'National Centre for Aerospace Innovation & Research (NCAIR - with Boeing)',
      'Wadhwani Centre for AI (WCAIR)',
      'CRNTS (Nanotechnology Center)'
    ],
    highestPackage: '₹3.67 Crore / annum (International High-Frequency Trading) | ₹1.68 Crore (Domestic)',
    medianPackageBTech: '₹26.2 LPA (Overall) | ₹48.0 LPA (CSE Top 50 Rankers)',
    notableAlumni: [
      { name: 'Nandan Nilekani', role: 'Co-founder Infosys & Architect of Aadhaar' },
      { name: 'Bhavish Aggarwal & Ankit Bhati', role: 'Founders, Ola Cabs & Ola Electric' },
      { name: 'Parag Agrawal', role: 'Former CEO, Twitter' },
      { name: 'Kailash Satyarthi (Affiliated)', role: 'Nobel Peace Laureate' }
    ],
    incubationCell: 'Society for Innovation and Entrepreneurship (SINE) - Over 220+ high-tech companies incubated',
    overview: {
      hi: 'आईआईटी बॉम्बे जेईई एडवांस्ड के टॉप 100 रैंकर्स की पहली पसंद (Dream Destination) है। पवई झील के किनारे स्थित यह कैम्पस अत्याधुनिक शोध और वैश्विक प्लेसमेंट का केंद्र है।',
      en: 'The prime choice for Top 100 JEE Advanced rankers, IIT Bombay offers iconic academic culture, SINE incubation, and unmatched global Wall Street / Silicon Valley recruitment.',
      hinglish: 'JEE Advanced ke top 100 students ka #1 choice IIT Bombay CSE hai. Powai campus, Mood Indigo cultural fest aur tech ecosystem unbeatable hai.'
    }
  },
  {
    id: 'iit_kanpur',
    name: 'IIT Kanpur (Indian Institute of Technology Kanpur)',
    location: 'Kanpur',
    state: 'Uttar Pradesh',
    established: 1959,
    nirfRank2024: 4,
    campusAreaAcres: 1055,
    motto: 'Tamaso Ma Jyotirgamaya (Lead me from darkness to light)',
    flagshipBranches: ['Computer Science & Engineering', 'Aerospace Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
    iconicLabs: [
      'National Wind Tunnel Facility (NWTF - India’s largest wind tunnel for ISRO/DRDO)',
      'C3iHub (National Cybersecurity Innovation Hub)',
      'Flight Laboratory (Airstrip with private research aircraft)',
      'Samtel Centre for Display Technologies'
    ],
    highestPackage: '₹2.15 Crore / annum (International) | ₹1.35 Crore (Domestic)',
    medianPackageBTech: '₹21.8 LPA (Overall) | ₹42.0 LPA (CSE)',
    notableAlumni: [
      { name: 'Arvind Krishna', role: 'Chairman & CEO, IBM Global' },
      { name: 'Narayan Murthy', role: 'Founder, Infosys (M.Tech from IITK)' },
      { name: 'Mukesh Bansal', role: 'Founder, Myntra & Cult.fit' },
      { name: 'Ashoke Sen', role: 'World-renowned String Theorist & Breakthrough Prize Winner' }
    ],
    incubationCell: 'Startup Innovation and Incubation Centre (SIIC IITK) - World class drone, med-tech, cyber security incubations',
    overview: {
      hi: 'आईआईटी कानपुर भारत में कंप्यूटर साइंस की शिक्षा का जनक है (1963 में पहली CS लैब स्थापित)। इसका अपना हवाई अड्डा (Airstrip), फ्लाइट लैब और विशाल विंड टनल है।',
      en: 'Pioneer of Computer Science education in India, IIT Kanpur boasts its own airstrip, world-class aerospace wind tunnels, and the C3iHub cyber security center.',
      hinglish: 'IIT Kanpur ne India me sabse pehle Computer Science education shuru kiya. Iska apna airport/airstrip hai aur Aerospace engineering me No.1 hai.'
    }
  },
  {
    id: 'iit_kharagpur',
    name: 'IIT Kharagpur (First Indian Institute of Technology - 1951)',
    location: 'Kharagpur',
    state: 'West Bengal',
    established: 1951,
    nirfRank2024: 5,
    campusAreaAcres: 2100,
    motto: 'Yogah Karmasu Kaushalam (Excellence in action is Yoga)',
    flagshipBranches: ['Computer Science', 'Electronics & Electrical Communication', 'Mechanical', 'Ocean Engg & Naval Architecture', 'Mining & Metallurgy'],
    iconicLabs: [
      'Advanced Technology Development Centre (ATDC)',
      'School of Medical Science & Technology (SMST)',
      'Centre for Railway Research (CRR)',
      'PARAM Shakti Supercomputing Facility (1.66 PFLOPS)'
    ],
    highestPackage: '₹2.6 Crore / annum (International) | ₹1.25 Crore (Domestic)',
    medianPackageBTech: '₹19.5 LPA (Overall) | ₹38.5 LPA (CSE)',
    notableAlumni: [
      { name: 'Sundar Pichai', role: 'CEO, Alphabet & Google' },
      { name: 'Arjun Malhotra', role: 'Co-founder, HCL Technologies' },
      { name: 'Vinod Gupta', role: 'Founder, InfoUSA & Philanthropist' },
      { name: 'Duvvuri Subbarao', role: 'Former Governor, Reserve Bank of India' }
    ],
    incubationCell: 'STEP (Science and Technology Entrepreneurs Park - India’s first STEP since 1986)',
    overview: {
      hi: 'भारत का पहला आईआईटी (1951 में हिजली डिटेंशन कैंप की ऐतिहासिक भूमि पर स्थापित), 2100 एकड़ का देश का सबसे विशाल आईआईटी कैम्पस जहां से गूगल के सीईओ सुंदर पिचाई पढ़े हैं।',
      en: 'The birthplace of the IIT system (1951), boasting a massive 2,100-acre township campus and producing global leaders like Google CEO Sundar Pichai.',
      hinglish: 'India ka pehla IIT Kharagpur (1951) hai jahan Google CEO Sundar Pichai ne Metallurgy padhi. 2100 acre ka sprawling campus aur 18+ departments hain.'
    }
  },
  {
    id: 'iit_roorkee',
    name: 'IIT Roorkee (Oldest Technical Institution in Asia - 1847 / IIT 2001)',
    location: 'Roorkee',
    state: 'Uttarakhand',
    established: 1847,
    nirfRank2024: 6,
    campusAreaAcres: 365,
    motto: 'Shramam Bina Na Kimapi Sadhyam (Nothing is achieved without hard work)',
    flagshipBranches: ['Civil Engineering', 'Computer Science & Engineering', 'Data Science', 'Earthquake Engineering', 'Hydrology'],
    iconicLabs: [
      'Department of Earthquake Engineering (Only one in India)',
      'PARAM Ganga Supercomputing Facility',
      'Alternate Hydro Energy Centre (AHEC)',
      'Water Resources Development and Management (WRD&M)'
    ],
    highestPackage: '₹2.05 Crore / annum | ₹1.30 Crore (Domestic)',
    medianPackageBTech: '₹18.8 LPA (Overall) | ₹36.0 LPA (CSE)',
    notableAlumni: [
      { name: 'Sir Ganga Ram', role: 'Father of Modern Lahore Architecture & Renowned Civil Engineer' },
      { name: 'Naveen Jain', role: 'Founder, Moon Express & InfoSpace' },
      { name: 'Pankaj Bansal', role: 'Founder, PeopleStrong' }
    ],
    incubationCell: 'TIDES (Technology Incubation & Development of Entrepreneurs Society)',
    overview: {
      hi: 'एशिया का सबसे पुराना तकनीकी संस्थान (थॉमसन कॉलेज 1847), जो सिविल, भूकंप इंजीनियरिंग, जल संसाधन एवं कंप्यूटर साइंस में विश्व विख्यात है।',
      en: 'Asia’s oldest technical institution (Est. 1847), internationally celebrated for Civil, Earthquake Engineering, and supercomputing capabilities.',
      hinglish: '1847 me established Asia ka oldest engineering college. Civil engineering, Earthquake simulation aur AI me pioneering research center.'
    }
  },
  {
    id: 'iit_guwahati',
    name: 'IIT Guwahati (Indian Institute of Technology Guwahati)',
    location: 'Guwahati',
    state: 'Assam',
    established: 1994,
    nirfRank2024: 7,
    campusAreaAcres: 700,
    motto: 'Jnanam Sarvavabodhakam (Knowledge illuminating everything)',
    flagshipBranches: ['Computer Science & Engineering', 'Design (B.Des - World Class)', 'Electronics & Electrical', 'Chemical & Bio-Tech'],
    iconicLabs: [
      'Centre for Nanotechnology',
      'PARAM Kamrupa Supercomputing Facility (838 TFLOPS)',
      'Centre for Indian Knowledge Systems',
      'BioNEST Incubator'
    ],
    highestPackage: '₹2.4 Crore / annum (International) | ₹1.2 Crore (Domestic)',
    medianPackageBTech: '₹19.2 LPA (Overall) | ₹37.5 LPA (CSE)',
    notableAlumni: [
      { name: 'Rahul Varma', role: 'Co-founder, Unbxd' },
      { name: 'Gaurav Shrivastava', role: 'Co-founder, FarEye' }
    ],
    incubationCell: 'Technology Incubation Centre (TIC IITG) & BioNEST',
    overview: {
      hi: 'ब्रह्मपुत्र नदी के सुरम्य तट पर स्थित, भारत का सबसे सुंदर कैम्पस। यह देश का एकमात्र आईआईटी है जो वर्ल्ड-क्लास बैचलर ऑफ डिजाइन (B.Des) और सुपरकंप्यूटिंग की पेशकश करता है।',
      en: 'Renowned as India’s most scenic campus along the Brahmaputra River, housing India’s top Department of Design (B.Des) and advanced Nano-biotech hubs.',
      hinglish: 'Brahmaputra nadi ke paas India ka most beautiful campus. Top CSE, Electronics aur India ka best Design (B.Des) program offer karta hai.'
    }
  },
  {
    id: 'iit_hyderabad',
    name: 'IIT Hyderabad (Indian Institute of Technology Hyderabad)',
    location: 'Kandi, Sangareddy',
    state: 'Telangana',
    established: 2008,
    nirfRank2024: 8,
    campusAreaAcres: 576,
    motto: 'Inventing and Innovating in Technology',
    flagshipBranches: ['Artificial Intelligence (1st in India)', 'Computer Science', 'VLSI & Microelectronics', 'Biomedical Engineering'],
    iconicLabs: [
      'TiHAN (India’s 1st Autonomous Navigation Testbed for Unmanned Aerial & Terrestrial Vehicles)',
      'Centre for Healthcare Entrepreneurship (CfHE)',
      'Fabless Semiconductor Design Lab'
    ],
    highestPackage: '₹2.1 Crore / annum | ₹1.15 Crore (Domestic)',
    medianPackageBTech: '₹20.0 LPA (Overall) | ₹40.5 LPA (CSE & AI)',
    notableAlumni: [
      { name: 'Leading Next-Gen Founders & Japan Collab Innovators', role: 'Deep Japanese Academic & Industry Collaboration (JICA)' }
    ],
    incubationCell: 'i-TIC Foundation (40+ deep tech ventures funded under TiHAN and CfHE)',
    overview: {
      hi: '2008 के नए आईआईटी में सबसे तेज उभरता संस्थान, जिसने भारत में सबसे पहले बी.टेक इन आर्टिफिशियल इंटेलिजेंस (AI) शुरू किया और जापानी विश्वविद्यालयों व उद्योग (JICA) के साथ गहरा तालमेल है।',
      en: 'Fastest rising 2nd gen IIT, first in India to launch B.Tech in AI, with deep Japanese academic partnership (JICA) and autonomous vehicle testbeds (TiHAN).',
      hinglish: '2nd Gen IITs me Top-Ranked. India me pehli baar B.Tech in AI launch kiya. TiHAN drone/autonomous car testbed aur Japanese tie-ups best hain.'
    }
  }
];

export const JEE_MASTER_STRATEGY: JEESubjectStrategy[] = [
  {
    subject: 'Physics',
    weightagePercentage: '33.33% (100 Marks JEE Main / Approx 120-130 Marks JEE Advanced)',
    highYieldChapters: [
      {
        name: 'Electrodynamics (Electrostatics, Gauss Law, Current, Capacitors, EMI, AC)',
        questionsAvg: 6,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'Gauss Law: ∮ E·dA = Q_enclosed / ε₀',
          'Capacitance with dielectric slab: C = ε₀A / (d - t + t/k)',
          'Faraday EMI: ε = -dΦ/dt; Self Inductance Energy U = (1/2) L I²',
          'LCR Resonance: ω₀ = 1/√(LC); Quality factor Q = (1/R) √(L/C)'
        ]
      },
      {
        name: 'Rotational Motion & System of Particles (Moment of Inertia, Torque, Angular Momentum)',
        questionsAvg: 4,
        difficulty: 'Conceptual & High Calculus',
        coreFormulasOrKeys: [
          'Parallel Axis Theorem: I = I_cm + Md²',
          'Conservation of Angular Momentum: τ_ext = 0 ⟹ L_initial = L_final (I₁ω₁ = I₂ω₂)',
          'Pure Rolling on inclined plane: a = (g sin θ) / (1 + I_cm/(MR²))'
        ]
      },
      {
        name: 'Modern Physics & Nuclear Physics (Photoelectric, De-Broglie, Bohr Atom, Radioactivity)',
        questionsAvg: 4,
        difficulty: 'Formula & Memory Heavy',
        coreFormulasOrKeys: [
          'Einstein Photoelectric: hν = Φ + (1/2)mv_max²',
          'De-Broglie wavelength: λ = h / p = h / √(2mE)',
          'Bohr Orbit Radius: r_n = 0.529 (n²/Z) Å; Energy E_n = -13.6 (Z²/n²) eV',
          'Radioactive Decay: N(t) = N₀ e^(-λt); T_half = 0.693 / λ'
        ]
      },
      {
        name: 'Thermodynamics, Calorimetry & Kinetic Theory of Gases (KTG)',
        questionsAvg: 3,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'First Law of Thermo: ΔQ = ΔU + W; ΔU = n C_v ΔT',
          'Work in Isothermal: W = nRT ln(V₂/V₁); Work in Adiabatic: W = (P₁V₁ - P₂V₂) / (γ - 1)',
          'Carnot Engine Efficiency: η = 1 - (T_sink / T_source)'
        ]
      },
      {
        name: 'Wave Optics & Ray Optics (Interference, Diffraction, Lens Maker, Prisms)',
        questionsAvg: 3,
        difficulty: 'Conceptual & High Calculus',
        coreFormulasOrKeys: [
          'YDSE Fringe Width: β = (λD) / d; Path difference Δx = d sin θ ≈ dy/D',
          'Lens Maker Formula: 1/f = (μ - 1) (1/R₁ - 1/R₂)',
          'Prism Minimum Deviation: μ = sin[(A + δ_m)/2] / sin(A/2)'
        ]
      }
    ],
    masteryTips: [
      'Draw clean Free Body Diagrams (FBD) for every mechanics and rotation problem before writing equations.',
      'Always verify dimensional correctness and check boundary conditions (e.g., θ = 0°, θ = 90°, t ➔ ∞).',
      'In JEE Advanced, multi-concept questions mix Electrodynamics with SHM or Thermodynamics with Mechanics. Solve Irodov and Pathfinder selected questions.'
    ],
    icon: '⚡'
  },
  {
    subject: 'Chemistry',
    weightagePercentage: '33.33% (Fastest Scoring Subject - Maximize 90+ Score in 40 Mins)',
    highYieldChapters: [
      {
        name: 'Organic Chemistry: Reaction Mechanisms, Carbonyl Compounds (Aldehydes, Ketones) & Biomolecules',
        questionsAvg: 8,
        difficulty: 'Conceptual & High Calculus',
        coreFormulasOrKeys: [
          'Nucleophilic Addition: Aldol Condensation, Cannizzaro Reaction, Grignard Reagent synthesis',
          'Electrophilic Aromatic Substitution (EAS): Friedel-Crafts, Nitration, Halogenation on benzene ring',
          'Stereochemistry: Enantiomers, Diastereomers, R/S configurations, Optical rotation'
        ]
      },
      {
        name: 'Coordination Compounds & Chemical Bonding (CFT, VBT, Isomerism, Hybridization, MOT)',
        questionsAvg: 6,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'Crystal Field Splitting Energy (CFSE) for Octahedral (Δ_o) and Tetrahedral (Δ_t = 4/9 Δ_o)',
          'Magnetic Moment: μ = √[n(n+2)] Bohr Magnetons (where n = unpaired electrons)',
          'Molecular Orbital Theory (MOT): Bond Order = (N_b - N_a)/2'
        ]
      },
      {
        name: 'Physical Chemistry: Thermodynamics, Chemical & Ionic Equilibrium, Electrochemistry, Kinetics',
        questionsAvg: 7,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'Nernst Equation: E_cell = E°_cell - (0.0591/n) log Q',
          'Gibbs Free Energy: ΔG° = -n F E°_cell = -RT ln K_eq',
          'First Order Kinetics: k = (2.303/t) log(A₀/A_t); t_1/2 = 0.693 / k',
          'Buffer Solution pH (Henderson): pH = pKa + log([Conjugate Base]/[Acid])'
        ]
      },
      {
        name: 'Inorganic Chemistry: Periodic Table, p-Block, d & f-Block Elements, Metallurgy',
        questionsAvg: 5,
        difficulty: 'Formula & Memory Heavy',
        coreFormulasOrKeys: [
          'Lanthanide Contraction & its impact on covalent radii (Zr ≈ Hf)',
          'Oxoacids of Phosphorus & Sulphur structures, reducing nature of H₃PO₂',
          'Ellingham Diagram interpretation for metal oxide reduction'
        ]
      }
    ],
    masteryTips: [
      'Read NCERT Chemistry line-by-line 5 times. 90% of JEE Main and 60% of JEE Advanced Inorganic questions come directly from NCERT tables and footnotes.',
      'Maintain an Organic Reaction Flowchart with reagents (PCC, LiAlH₄, NaBH₄, DIBAL-H, KMnO₄, Ozonolysis).',
      'Practice physical chemistry calculations without calculators to build numerical speed.'
    ],
    icon: '🧪'
  },
  {
    subject: 'Mathematics',
    weightagePercentage: '33.33% (Rank Decider - Demands Deep Algebra & Calculus Mastery)',
    highYieldChapters: [
      {
        name: 'Calculus: Definite Integration, Maxima-Minima, Continuity & Differentiability, Differential Equations',
        questionsAvg: 9,
        difficulty: 'Conceptual & High Calculus',
        coreFormulasOrKeys: [
          'King’s Property: ∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx',
          'Leibniz Rule of Differentiation under Integral Sign',
          'Linear Differential Equation: dy/dx + P(x)y = Q(x) ⟹ Integrating Factor IF = e^(∫ P dx)',
          'Lagrange’s & Rolle’s Mean Value Theorem'
        ]
      },
      {
        name: 'Vectors & 3D Geometry (Lines, Planes, Shortest Distance, Dot/Cross/Scalar Triple Product)',
        questionsAvg: 5,
        difficulty: 'Formula & Memory Heavy',
        coreFormulasOrKeys: [
          'Shortest Distance between Skew Lines: d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|',
          'Scalar Triple Product: [a b c] = a · (b × c) = Volume of Parallelepiped',
          'Vector Triple Product: a × (b × c) = (a · c)b - (a · b)c (BAC - CAB rule)'
        ]
      },
      {
        name: 'Coordinate Geometry (Conics: Parabola, Ellipse, Hyperbola, Circles)',
        questionsAvg: 6,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'Parabola y² = 4ax: Tangent in slope form y = mx + a/m; Focus (a, 0)',
          'Ellipse x²/a² + y²/b² = 1: Tangent y = mx ± √(a²m² + b²); Eccentricity e = √(1 - b²/a²)',
          'Hyperbola: Asymptotes, rectangular hyperbola xy = c² parametric point (ct, c/t)'
        ]
      },
      {
        name: 'Algebra: Matrices & Determinants, Probability & Bayes Theorem, Complex Numbers, Sequences',
        questionsAvg: 7,
        difficulty: 'Multi-Concept Matrix',
        coreFormulasOrKeys: [
          'Bayes Theorem: P(A_i|B) = [P(A_i)P(B|A_i)] / ∑ [P(A_k)P(B|A_k)]',
          'Complex Numbers: Euler’s form e^(iθ) = cos θ + i sin θ; Cube roots of unity (1, ω, ω²)',
          'Properties of Determinants, Cayley-Hamilton Theorem, System of Linear Equations (Cramer’s Rule)'
        ]
      }
    ],
    masteryTips: [
      'In JEE Advanced Maths, question selection is key: Identify 40-50% solvable questions first to secure top 1000 rank.',
      'Graph sketching (Curve Tracing) turns 5-minute calculus problems into 30-second geometric insights.',
      'Solve previous 15 years JEE Advanced papers under timed 3-hour exam conditions.'
    ],
    icon: '📐'
  }
];

export const IIT_BRANCHES_DATA: IITBranchDetail[] = [
  {
    id: 'cse_ai',
    code: 'CSE & AI',
    name: {
      hi: 'कंप्यूटर साइंस व आर्टिफिशियल इंटेलिजेंस (CSE & AI)',
      en: 'Computer Science, AI & Data Science',
      hinglish: 'Computer Science & AI (CSE)'
    },
    duration: '4 Years (B.Tech) / 5 Years (Dual Degree B.Tech + M.Tech)',
    overview: {
      hi: 'एल्गोरिदम, डेटा स्ट्रक्चर्स, ऑपरेटिंग सिस्टम, कंपाइलर डिजाइन, डिस्ट्रीब्यूटेड सिस्टम, लार्ज लैंग्वेज मॉडल (LLMs), कंप्यूटर विजन एवं क्वांटम कंप्यूटिंग का गहन अध्ययन।',
      en: 'Foundations of computation, distributed cloud architectures, advanced deep learning models, cyber security, and autonomous systems.',
      hinglish: 'Algorithms, OS, Cloud Systems, Machine Learning, Neural Networks aur High-Frequency Trading systems ka world-class program.'
    },
    coreSubjects: [
      'Data Structures and Algorithms (DSA)',
      'Computer Systems Organization & Architecture',
      'Operating Systems & Distributed Cloud Architecture',
      'Theory of Computation & Compiler Construction',
      'Database Management Systems & SQL/NoSQL Internals',
      'Deep Learning, Natural Language Processing & LLMs',
      'Computer Networks & Cryptography'
    ],
    emergingSubFields: [
      'Generative AI & Agentic Workflows',
      'Quantum Computing Algorithms (Qiskit)',
      'Zero-Knowledge Cryptography & Blockchain Protocols',
      'Neuromorphic & Edge AI Chip Computing'
    ],
    topRecruiters: [
      'Google, Microsoft, Apple, Meta, Amazon',
      'High Frequency Trading Firms: Jane Street, Citadel, Graviton, Quadeye, Tower Research',
      'OpenAI, Anthropic, Nvidia, Databricks, Uber'
    ],
    avgPackageLPA: '₹35.0 - ₹48.0 LPA (Domestic Median) | ₹1.2 Cr - ₹2.4 Cr (Top International Offers)',
    careerPaths: [
      'Principal Software Engineer & Distributed Systems Architect',
      'Quantitative Researcher & High-Frequency Algo Trader',
      'AI Research Scientist (Google DeepMind / OpenAI)',
      'Tech Founder & Deep-Tech Venture Creator'
    ],
    icon: '💻'
  },
  {
    id: 'electrical_vlsi',
    code: 'EE & ECE (VLSI)',
    name: {
      hi: 'इलेक्ट्रिकल व इलेक्ट्रॉनिक्स (VLSI & सेमीकंडक्टर)',
      en: 'Electrical Engineering & Semiconductor VLSI Design',
      hinglish: 'Electrical & VLSI Semiconductor Engineering'
    },
    duration: '4 Years B.Tech',
    overview: {
      hi: 'माइक्रोचिप डिजाइन (VLSI), सेमीकंडक्टर फैब्रिकेशन, डिजिटल सिग्नल प्रोसेसिंग (DSP), 5G/6G वायरलेस कम्युनिकेशन, पावर इलेक्ट्रॉनिक्स और रोबोटिक्स कंट्रोल सिस्टम।',
      en: 'Covers silicon chip architecture, FPGA design, semiconductor physics, RF communication, power grids, and autonomous robotics control.',
      hinglish: 'Chip design (ASIC/FPGA), semiconductor fabrication, 5G RF communication aur India Semiconductor Mission ke tehat high-demand career.'
    },
    coreSubjects: [
      'Digital & Analog Integrated Circuit (IC) Design',
      'Semiconductor Device Physics & Microelectronics',
      'Signals and Systems & Digital Signal Processing (DSP)',
      'Electromagnetic Fields & Waves, Antennas & RF Engineering',
      'Power Electronics, Renewable Grid Integration & Drives',
      'Control Systems Engineering & Embedded Microcontrollers'
    ],
    emergingSubFields: [
      'RISC-V Open-Source Processor Architecture',
      'Silicon Photonics & Quantum Hardware Interfaces',
      'GaN & SiC High-Voltage Power Semiconductors for EVs',
      'Sub-2nm FinFET & Gate-All-Around (GAA) Transistor Design'
    ],
    topRecruiters: [
      'Nvidia, Qualcomm, Intel, AMD, Texas Instruments, Apple Hardware',
      'TSMC, Micron, Applied Materials, Synopsys, Cadence',
      'ISRO, DRDO, Tata Electronics Semiconductor Fab'
    ],
    avgPackageLPA: '₹24.0 - ₹38.0 LPA (Domestic Median)',
    careerPaths: [
      'Silicon Design Engineer & ASIC Verification Specialist',
      'RF/Microwave & 6G Wireless Hardware Architect',
      'Embedded Firmware & Hardware Security Engineer',
      'Semiconductor Fab Process Integration Engineer'
    ],
    icon: '⚡'
  },
  {
    id: 'mech_aerospace',
    code: 'ME & Aerospace',
    name: {
      hi: 'मैकेनिकल व एयरोस्पेस इंजीनियरिंग (रॉकेट व रोबोटिक्स)',
      en: 'Mechanical & Aerospace Engineering',
      hinglish: 'Mechanical & Aerospace Engineering'
    },
    duration: '4 Years B.Tech',
    overview: {
      hi: 'थर्मो-फ्लूइड डायनेमिक्स, रॉकेट प्रणोदन (Propulsion), सीएफडी (CFD), ऑटोमेशन, रोबोटिक्स, 3D मेटल प्रिंटिंग एवं आधुनिक इलेक्ट्रिक मोबिलिटी सिस्टम।',
      en: 'Encompasses aerodynamics, rocket propulsion, continuum mechanics, computational fluid dynamics (CFD), robotics, and next-gen electric aerospace vehicles.',
      hinglish: 'Aerodynamics, Rocket Propulsion, CFD simulations, Robotics aur Spacecraft design ka flagship mechanical program.'
    },
    coreSubjects: [
      'Fluid Mechanics & Aerodynamics',
      'Thermodynamics & IC/Rocket Propulsion Systems',
      'Mechanics of Solids, Finite Element Analysis (FEA)',
      'Kinematics & Dynamics of Machinery and Robotics',
      'Manufacturing Science, CNC Machining & Additive 3D Printing',
      'Control of Aerospace Vehicles & Flight Dynamics'
    ],
    emergingSubFields: [
      'Reusable Space Launch Vehicles & Cryogenic Engines',
      'Autonomous Drone Swarms & Hypersonic Flight Aerodynamics',
      'Solid-State Battery & Thermal Runaway Mitigation in EVs',
      'Bio-Mechanics & Exoskeleton Robotic Systems'
    ],
    topRecruiters: [
      'ISRO, DRDO, HAL, Boeing, Airbus, GE Aerospace, Rolls-Royce',
      'Agnikul Cosmos, Skyroot Aerospace, Pixxel, Bellatrix Aerospace',
      'Tesla, Tata Motors, Mahindra R&D, L&T Defense'
    ],
    avgPackageLPA: '₹18.0 - ₹28.0 LPA',
    careerPaths: [
      'Rocket Propulsion Scientist & Aerospace Aerodynamicist',
      'Robotics & Autonomous Motion Planning Engineer',
      'Computational Fluid Dynamics (CFD) Specialist',
      'EV Powertrain & Thermal Systems Architect'
    ],
    icon: '🚀'
  }
];

export const IIT_MOCK_QUESTIONS: IITMockAdvancedQuestion[] = [
  {
    id: 'jee_adv_p1',
    subject: 'Physics',
    questionType: 'Single Correct',
    question: {
      hi: 'एक ठोस गोला (Solid Sphere) जिसका द्रव्यमान M और त्रिज्या R है, एक क्षैतिज खुरदरी सतह पर बिना फिसले v चाल से लुढ़क रहा है (Pure Rolling)। इसकी कुल गतिज ऊर्जा (Total Kinetic Energy) क्या होगी?',
      en: 'A solid sphere of mass M and radius R rolls without slipping on a horizontal rough surface with velocity of center of mass v. What is its total kinetic energy?'
    },
    options: [
      { hi: '(1/2) M v²', en: '(1/2) M v²' },
      { hi: '(7/10) M v²', en: '(7/10) M v²' },
      { hi: '(3/5) M v²', en: '(3/5) M v²' },
      { hi: '(2/5) M v²', en: '(2/5) M v²' }
    ],
    correctAnswer: 1,
    solutionExplanation: {
      hi: 'ठोस गोले का जड़त्व आघूर्ण (Moment of Inertia) I = (2/5) M R² होता है। शुद्ध लोटनी गति में ω = v/R।\nकुल गतिज ऊर्जा K_total = K_trans + K_rot = (1/2) M v² + (1/2) I ω²\n= (1/2) M v² + (1/2) [(2/5) M R²] (v/R)² = (1/2 + 1/5) M v² = (7/10) M v²। अतः विकल्प (B) सही है।',
      en: 'Moment of inertia of a solid sphere is I_cm = (2/5)MR². In pure rolling, ω = v/R.\nTotal KE = Translational KE + Rotational KE = (1/2)Mv² + (1/2)Iω²\n= (1/2)Mv² + (1/2)(2/5 MR²)(v/R)² = (1/2 + 1/5) Mv² = (7/10) Mv².'
    }
  },
  {
    id: 'jee_adv_m1',
    subject: 'Mathematics',
    questionType: 'Single Correct',
    question: {
      hi: 'निश्चित समाकलन (Definite Integral) I = ∫[0 to π/2] [sin^(2026)(x) / (sin^(2026)(x) + cos^(2026)(x))] dx का मान क्या होगा?',
      en: 'What is the value of the definite integral I = ∫[0 to π/2] [sin^(2026)(x) / (sin^(2026)(x) + cos^(2026)(x))] dx?'
    },
    options: [
      { hi: 'π/2', en: 'π/2' },
      { hi: 'π/4', en: 'π/4' },
      { hi: '1', en: '1' },
      { hi: '0', en: '0' }
    ],
    correctAnswer: 1,
    solutionExplanation: {
      hi: 'King’s Property का प्रयोग करने पर: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx।\nI = ∫[0 to π/2] [cos^(2026)(x) / (cos^(2026)(x) + sin^(2026)(x))] dx।\nदोनों समीकरणों को जोड़ने पर: 2I = ∫[0 to π/2] 1 dx = [x][0 to π/2] = π/2 ⟹ I = π/4। अतः विकल्प (B) सही है।',
      en: 'Applying King’s property ∫[0 to a] f(x) dx = ∫[0 to a] f(a-x) dx:\nI = ∫[0 to π/2] [cos^(2026)(x) / (cos^(2026)(x) + sin^(2026)(x))] dx.\nAdding both equations: 2I = ∫[0 to π/2] 1 dx = π/2 ⟹ I = π/4.'
    }
  },
  {
    id: 'jee_adv_c1',
    subject: 'Chemistry',
    questionType: 'Single Correct',
    question: {
      hi: 'संकुल आयन [Fe(CN)₆]³⁻ में अयुग्मित इलेक्ट्रॉनों (Unpaired Electrons) की संख्या एवं उसका चुंबकीय आघूर्ण (Magnetic Moment) कितना होगा?',
      en: 'In the complex ion [Fe(CN)₆]³⁻, what is the number of unpaired electrons and its spin-only magnetic moment in Bohr Magnetons (BM)?'
    },
    options: [
      { hi: '5 अयुग्मित इलेक्ट्रॉन, μ = 5.92 BM', en: '5 unpaired electrons, μ = 5.92 BM' },
      { hi: '1 अयुग्मित इलेक्ट्रॉन, μ = 1.73 BM', en: '1 unpaired electron, μ = 1.73 BM' },
      { hi: '0 अयुग्मित इलेक्ट्रॉन, μ = 0 BM (Diamagnetic)', en: '0 unpaired electrons, μ = 0 BM (Diamagnetic)' },
      { hi: '3 अयुग्मित इलेक्ट्रॉन, μ = 3.87 BM', en: '3 unpaired electrons, μ = 3.87 BM' }
    ],
    correctAnswer: 1,
    solutionExplanation: {
      hi: 'Fe का परमाणु क्रमांक 26 (3d⁶ 4s²)। [Fe(CN)₆]³⁻ में Fe की ऑक्सीकरण अवस्था +3 है ⟹ Fe³⁺ का विन्यास 3d⁵ है।\nCN⁻ एक प्रबल क्षेत्र लिगैंड (Strong Field Ligand) है, जो इलेक्ट्रॉनों का युग्मन (Pairing) कराता है।\nअतः t_2g⁵ e_g⁰ विन्यास होगा, जिसमें केवल 1 अयुग्मित इलेक्ट्रॉन (n = 1) बचता है।\nचुंबकीय आघूर्ण μ = √[n(n+2)] = √[1(3)] = √3 ≈ 1.73 BM। अतः विकल्प (B) सही है।',
      en: 'Fe has atomic number 26. In [Fe(CN)₆]³⁻, Fe is in +3 state with 3d⁵ configuration.\nCN⁻ is a strong field ligand causing pairing of d-electrons in octahedral field: t_2g⁵ e_g⁰.\nThis leaves 1 unpaired electron (n = 1). Magnetic moment μ = √[1(1+2)] = √3 ≈ 1.73 BM.'
    }
  }
];
