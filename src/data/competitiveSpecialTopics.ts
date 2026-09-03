import { CompetitiveTopicDetail } from '../types';

export const competitiveSpecialTopics: Record<string, CompetitiveTopicDetail> = {
  'profit-loss': {
    id: 'profit-loss',
    name: {
      hi: 'लाभ और हानि (Profit & Loss Mastery)',
      en: 'Profit & Loss (Speed & Short Tricks)',
      hinglish: 'Profit & Loss (Formula & Fast Tricks)',
    },
    subjectCategory: 'quant',
    subjectName: 'Quantitative Aptitude (Maths)',
    chapterName: 'Commercial Arithmetic',
    targetExam: 'SSC',
    examDemand: {
      summary: {
        hi: 'SSC CGL/CHSL में पिछले 10 साल में 14 बार पूछा गया। MP पुलिस में 9 बार, रेलवे NTPC में 11 बार। यह 100% गारंटीड 2-3 प्रश्नों (4-6 अंक) वाला टॉपिक है।',
        en: 'Asked 14 times in SSC CGL/CHSL over the last 10 years, 9 times in MP Police, and 11 times in Railway NTPC. Guarantees 2-3 questions (4-6 marks).',
        hinglish: 'SSC me 10 saal me 14 baar pucha gaya, MP Police me 9 baar, Railway me 11 baar. Average 2-3 questions guaranteed in every shift.',
      },
      frequencyStats: [
        { exam: 'SSC CGL / CHSL', frequency: '2-3 Questions per shift', marksWeightage: '4 - 6 Marks' },
        { exam: 'MP Police / Vyapam', frequency: '2 Questions guaranteed', marksWeightage: '2 Marks' },
        { exam: 'RRB NTPC / Group D', frequency: '2-3 Questions', marksWeightage: '2 - 3 Marks' },
        { exam: 'Banking (IBPS / SBI)', frequency: '1-2 Questions in Arithmetic', marksWeightage: '1 - 2 Marks' },
        { exam: 'MP Patwari', frequency: '2 Questions', marksWeightage: '2 Marks' },
      ],
      expectedQuestions: '2 - 3 Questions (100% Probability)',
      difficultyLevel: 'High Speed',
    },
    bestFormulaBox: {
      title: {
        hi: 'लाभ-हानि के 3 मास्टर फॉर्मूले (जिससे 90% प्रश्न हल होते हैं)',
        en: '3 Master Formulas of Profit & Loss (Solves 90% Exam Questions)',
        hinglish: 'Top 3 Master Formulas for 90% Profit & Loss Questions',
      },
      formulaList: [
        {
          name: {
            hi: '1. CP से SP डायरेक्ट मल्टीप्लायर',
            en: '1. CP to SP Direct Multiplier',
            hinglish: '1. CP to SP Direct Multiplier',
          },
          formula: 'SP = CP × (100 ± P/L)%  या  SP = CP × (1 + P/100)',
          whereUsed: {
            hi: 'जब क्रय मूल्य (CP) दिया हो और लाभ/हानि प्रतिशत दिया हो।',
            en: 'When Cost Price (CP) and Profit/Loss% are given.',
            hinglish: 'Jab CP aur Profit/Loss% diya ho aur SP nikalna ho.',
          },
          exampleTip: {
            hi: '20% लाभ का मतलब SP = CP × 6/5 (या 1.20) होता है।',
            en: '20% profit directly means SP = CP × 6/5 (or 1.20).',
            hinglish: '20% profit = CP × 6/5, 25% loss = CP × 3/4 direct multiply karein.',
          },
        },
        {
          name: {
            hi: '2. दो वस्तुओं का समान SP और बराबर % लाभ/% हानि',
            en: '2. Same SP with Equal % Profit and % Loss',
            hinglish: '2. Same SP with Equal % P and % L',
          },
          formula: 'सदा कुल हानि % = (x / 10)² %   (जहाँ x = उभयनिष्ठ प्रतिशत)',
          whereUsed: {
            hi: 'जब दो वस्तुओं को समान मूल्य पर बेचा जाए, एक पर x% लाभ और दूसरी पर x% हानि हो।',
            en: 'When two articles are sold at the same price with x% profit on one and x% loss on another.',
            hinglish: 'Jab do cheezein same SP par bikti hain aur profit%/loss% barabar hota hai.',
          },
          exampleTip: {
            hi: 'यदि 20% लाभ और 20% हानि है, तो कुल हानि = (20/10)² = 4% हानि (बिना पेन उठाए 2 सेकंड में)।',
            en: 'For 20% profit and 20% loss, Total Loss = (20/10)² = 4% Loss (zero calculation time).',
            hinglish: '20% P aur 20% L = (20/10)^2 = 4% Loss direct 2 second me.',
          },
        },
        {
          name: {
            hi: '3. बेईमान दुकानदार (Dishonest Shopkeeper / Faulty Weight)',
            en: '3. Dishonest Dealer / False Weight Percentage',
            hinglish: '3. Dishonest Shopkeeper Faulty Weight',
          },
          formula: 'लाभ % = [ (सत्य भार - गलत भार) / गलत भार ] × 100',
          whereUsed: {
            hi: 'जब दुकानदार 1 किग्रा के स्थान पर 800 ग्राम या 900 ग्राम के गलत बाट का प्रयोग करे।',
            en: 'When a trader uses false weight (e.g. 800g instead of 1000g) claiming to sell at cost price.',
            hinglish: 'Jab dukandar 1kg ki jagah 800g ya 900g use kare aur CP par bechne ka daawa kare.',
          },
          exampleTip: {
            hi: '1000g की जगह 800g तोलने पर लाभ = (200 / 800) × 100 = 25% लाभ।',
            en: '1000g replaced by 800g yields profit = (200/800) × 100 = 25% profit.',
            hinglish: '(Error / True Value - Error) * 100 = (200/800)*100 = 25% Profit.',
          },
        },
      ],
    },
    bestMethodVsShortTrick: {
      problemStatement: {
        hi: 'प्रश्न: एक दुकानदार किसी वस्तु को ₹1,800 में बेचकर 20% का लाभ कमाता है। यदि वह इसे 10% की हानि पर बेचना चाहे, तो नया विक्रय मूल्य (SP) क्या होना चाहिए?',
        en: 'Problem: A shopkeeper sells an article for ₹1,800 earning a 20% profit. If he wants to sell it at a 10% loss, what should be the new selling price (SP)?',
        hinglish: 'Question: Ek dukandar kisi item ko ₹1,800 me bechkar 20% profit kamata hai. Agar use 10% loss par bechna ho to new SP kya hoga?',
      },
      basicMethod: {
        title: {
          hi: 'बेसिक विधि (स्कूल वाला 3-स्टेप तरीका - समय: 60-90 सेकंड)',
          en: 'Basic Method (School 3-Step Algebra - Time: 60-90 seconds)',
          hinglish: 'Basic Method (School 3-Step Method - Time: 60-90s)',
        },
        steps: [
          {
            hi: 'चरण 1: माना कि वस्तु का क्रय मूल्य = x रुपये।',
            en: 'Step 1: Let the Cost Price (CP) = x.',
            hinglish: 'Step 1: Maana CP = x.',
          },
          {
            hi: 'चरण 2: SP1 = CP + 20% of CP => 1800 = x + 0.20x => 1.20x = 1800 => x = 1800 / 1.20 = ₹1,500 (CP)।',
            en: 'Step 2: SP1 = x + 0.20x => 1.20x = 1800 => x = ₹1,500 (Cost Price).',
            hinglish: 'Step 2: 1800 = 1.20x => x = ₹1,500 CP calculate kiya.',
          },
          {
            hi: 'चरण 3: नया SP2 = CP - 10% of CP => SP2 = 1500 - 150 = ₹1,350।',
            en: 'Step 3: New SP2 = 1500 - (10% of 1500) = 1500 - 150 = ₹1,350.',
            hinglish: 'Step 3: New SP2 = 1500 - 150 = ₹1,350.',
          },
        ],
        timeTaken: '75 Seconds (Calculation Heavy)',
      },
      jitomniFastTrick: {
        title: {
          hi: 'JITOMNI सुपर फास्ट ट्रिक (एग्जाम हॉल 10 सेकंड तरीका)',
          en: 'JITOMNI Super Fast Trick (Exam Hall 10-Second Method)',
          hinglish: 'JITOMNI 10-Second Ratio Trick (No CP needed)',
        },
        trickFormulaOrLogic: 'नया SP = दिया गया SP × (100 - नई हानि %) / (100 + पुराना लाभ %)',
        executionStep: {
          hi: 'नया SP = 1800 × (90 / 120) = 1800 × (3 / 4) = ₹1,350 (सीधे 8 सेकंड में उत्तर बिना CP निकाले!)',
          en: 'New SP = 1800 × (90 / 120) = 1800 × (3 / 4) = ₹1,350 (Direct 8-second mental calculation without finding CP!)',
          hinglish: 'New SP = 1800 * (90/120) = 1800 * (3/4) = ₹1,350. CP nikalne ki zarurat hi nahi padi!',
        },
        timeTaken: '8-10 Seconds',
        proTip: {
          hi: 'एग्जाम प्रो टिप: 120% का मान ₹1,800 है, तो 90% का मान = 1800/120 × 90 = 15 × 90 = ₹1,350।',
          en: 'Exam Pro Tip: 120% represents ₹1,800. Therefore, 90% = (1800/120) × 90 = ₹1,350.',
          hinglish: 'Direct Unitary Percentage: 120% = ₹1,800 => 90% = ₹1,350 in single line.',
        },
      },
    },
    pyqBank: [
      {
        id: 'pyq-pl-2023-ssc',
        yearTag: 'PYQ 2023 SSC CGL Tier-1',
        exam: 'SSC CGL 2023',
        question: {
          hi: 'एक व्यक्ति दो घड़ियों को ₹1,200 प्रत्येक में बेचता है। एक पर उसे 20% का लाभ होता है और दूसरी पर 20% की हानि होती है। पूरे सौदे में उसका शुद्ध लाभ या हानि प्रतिशत क्या है?',
          en: 'A person sells two watches for ₹1,200 each. On one he gains 20% and on the other he loses 20%. What is his net profit or loss percentage in the whole transaction?',
          hinglish: 'Ek person do ghadiyon ko ₹1,200 each me bechta hai. Ek par 20% profit aur dusri par 20% loss hota hai. Overall net profit ya loss % kya hoga?',
        },
        options: {
          hi: ['ना लाभ ना हानि', '4% लाभ', '4% हानि', '2% हानि'],
          en: ['No profit no loss', '4% Profit', '4% Loss', '2% Loss'],
          hinglish: ['No profit no loss', '4% Profit', '4% Loss', '2% Loss'],
        },
        correctIndex: 2,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: CP1 = 1200 / 1.20 = ₹1,000. CP2 = 1200 / 0.80 = ₹1,500. कुल CP = 1000 + 1500 = ₹2,500. कुल SP = 1200 + 1200 = ₹2,400. कुल हानि = ₹100. हानि % = (100 / 2500) × 100 = 4% हानि। (समय: 60s)',
          en: 'Basic Method: CP1 = 1200/1.2 = 1000. CP2 = 1200/0.8 = 1500. Total CP = 2500. Total SP = 2400. Loss = 100. Loss% = (100/2500)*100 = 4% Loss. (Time: 60s)',
          hinglish: 'CP1 = ₹1000, CP2 = ₹1500. Total CP = ₹2500, Total SP = ₹2400. Net Loss = 4%. (60 seconds).',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: जब विक्रय मूल्य (SP) समान हो और % लाभ = % हानि = x हो, तो सदा हानि होती है = (x / 10)² % = (20 / 10)² = 2² = 4% हानि (समय: 3 सेकंड)।',
          en: 'JITOMNI Super Trick: When SP is identical and % Profit = % Loss = x, always Net Loss = (x/10)² % = (20/10)² = 4% Loss (Time: 3 seconds).',
          hinglish: 'Direct Trick: Loss % = (x/10)^2 = (20/10)^2 = 4% Loss in 3 seconds flat.',
        },
        timeSaveSeconds: 57,
        formulaUsed: 'Loss % = (x / 10)²',
      },
      {
        id: 'pyq-pl-2022-mp-police',
        yearTag: 'PYQ 2022 MP Police Constable',
        exam: 'MP Police Constable 2022',
        question: {
          hi: 'यदि 15 वस्तुओं का क्रय मूल्य (CP) 12 वस्तुओं के विक्रय मूल्य (SP) के बराबर है, तो लाभ प्रतिशत ज्ञात कीजिए?',
          en: 'If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percentage?',
          hinglish: 'Agar 15 articles ka Cost Price (CP) 12 articles ke Selling Price (SP) ke barabar hai, to profit % kitna hoga?',
        },
        options: {
          hi: ['20%', '25%', '30%', '16.66%'],
          en: ['20%', '25%', '30%', '16.66%'],
          hinglish: ['20%', '25%', '30%', '16.66%'],
        },
        correctIndex: 1,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: माना 1 वस्तु का CP = ₹1. तो 15 वस्तुओं का CP = ₹15 = 12 वस्तुओं का SP. 1 वस्तु का SP = 15 / 12 = ₹1.25. लाभ = 1.25 - 1 = ₹0.25. लाभ % = (0.25 / 1) × 100 = 25%.',
          en: 'Basic Method: Let CP of 1 item = ₹1. CP of 15 items = ₹15 = SP of 12 items. SP of 1 item = 15/12 = 1.25. Profit% = (0.25/1)*100 = 25%.',
          hinglish: 'Let CP of 1 = 1. SP of 1 = 15/12 = 1.25. Profit % = 25%.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: 15 CP = 12 SP => CP / SP = 12 / 15 = 4 / 5. CP = 4, SP = 5. लाभ = 1. लाभ % = (1 / 4) × 100 = 25% (समय: 5 सेकंड)।',
          en: 'JITOMNI Super Trick: 15 CP = 12 SP => CP/SP = 12/15 = 4/5. Profit = 5 - 4 = 1. Profit% = 1/4 = 25% (Time: 5 seconds).',
          hinglish: 'Ratio Trick: CP/SP = 12/15 = 4/5. Profit = 1 on base 4 = 1/4 = 25% instantly.',
        },
        timeSaveSeconds: 45,
        formulaUsed: 'CP / SP = SP_Quantity / CP_Quantity',
      },
      {
        id: 'pyq-pl-2021-rrb-ntpc',
        yearTag: 'PYQ 2021 RRB NTPC Stage-1',
        exam: 'RRB NTPC 2021',
        question: {
          hi: 'एक बेईमान व्यापारी अपनी वस्तुओं को क्रय मूल्य पर बेचने का दावा करता है परंतु वह 1 किग्रा के स्थान पर 900 ग्राम के गलत बाट का प्रयोग करता है। उसका वास्तविक लाभ % क्या है?',
          en: 'A dishonest merchant claims to sell his goods at cost price but uses a false weight of 900 grams instead of 1 kg. What is his actual profit percentage?',
          hinglish: 'Ek dishonest dealer CP par bechne ka claim karta hai lekin 1kg ki jagah 900g weight use karta hai. Uska actual profit % kya hoga?',
        },
        options: {
          hi: ['10%', '11.11% (11 1/9%)', '9.09%', '12.5%'],
          en: ['10%', '11.11% (11 1/9%)', '9.09%', '12.5%'],
          hinglish: ['10%', '11.11% (11 1/9%)', '9.09%', '12.5%'],
        },
        correctIndex: 1,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: माना 1 ग्राम की लागत = ₹1. 1000 ग्राम का दावा = ₹1000 SP. दिया केवल 900 ग्राम = ₹900 CP. लाभ = ₹100. लाभ % = (100 / 900) × 100 = 11.11%.',
          en: 'Basic Method: 1000g SP = ₹1000. 900g CP = ₹900. Gain = 100. Profit% = (100/900)*100 = 11.11%.',
          hinglish: 'CP for 900g = 900. SP collected for 1000g = 1000. Profit = (100/900)*100 = 11.11%.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: त्रुटि / गलत भार = 100g / 900g = 1/9 = 11.11% (सीधे 1/9 का प्रतिशत मान 11.11% होता है, 4 सेकंड में उत्तर)।',
          en: 'JITOMNI Super Trick: Error / False Weight = 100g / 900g = 1/9 = 11.11% (Direct fraction to percentage table, 4s).',
          hinglish: 'Direct Fraction: Error/Actual Given = 100/900 = 1/9 = 11.11% in 4 seconds.',
        },
        timeSaveSeconds: 40,
        formulaUsed: 'Profit % = (Error / False Weight) × 100',
      },
      {
        id: 'pyq-pl-2020-banking-ibps',
        yearTag: 'PYQ 2020 Banking IBPS PO',
        exam: 'IBPS PO Prelims 2020',
        question: {
          hi: 'किसी वस्तु का अंकित मूल्य (Marked Price) उसके क्रय मूल्य से 40% अधिक रखा जाता है और 20% की छूट दी जाती है। कुल लाभ प्रतिशत कितना है?',
          en: 'The Marked Price (MP) of an article is set 40% above its Cost Price (CP) and a discount of 20% is allowed. What is the net profit percentage?',
          hinglish: 'Kisi item ka MP uske CP se 40% upar mark kiya gaya aur 20% discount diya gaya. Net profit % kya hoga?',
        },
        options: {
          hi: ['20%', '12%', '16%', '15%'],
          en: ['20%', '12%', '16%', '15%'],
          hinglish: ['20%', '12%', '16%', '15%'],
        },
        correctIndex: 1,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: CP = ₹100. MP = ₹140. छूट = 20% of 140 = ₹28. SP = 140 - 28 = ₹112. लाभ = 112 - 100 = ₹12 = 12% लाभ।',
          en: 'Basic Method: CP = 100. MP = 140. Discount = 20% of 140 = 28. SP = 112. Profit = 112 - 100 = 12%.',
          hinglish: 'CP = 100, MP = 140, SP = 140 * 0.8 = 112. Profit = 12%.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक (सक्सेसिव फॉर्मूला): कुल प्रभाव = a - b - (a × b)/100 = 40 - 20 - (40 × 20)/100 = 20 - 8 = +12% लाभ (6 सेकंड)।',
          en: 'JITOMNI Super Trick (Successive Formula): Net % = a - b - (ab/100) = 40 - 20 - (40*20/100) = 20 - 8 = 12% Profit (6 seconds).',
          hinglish: 'Successive % Formula: 40 - 20 - 8 = +12% profit in 6s.',
        },
        timeSaveSeconds: 35,
        formulaUsed: 'Net % = a - b - (ab / 100)',
      },
      {
        id: 'pyq-pl-2019-mp-patwari',
        yearTag: 'PYQ 2019 MP Patwari / Vyapam',
        exam: 'MP Patwari Exam 2019',
        question: {
          hi: 'एक रेडियो को ₹990 में बेचने पर 10% का लाभ होता है। यदि इसे ₹890 में बेचा जाए, तो कितने प्रतिशत का लाभ या हानि होगी?',
          en: 'Selling a radio for ₹990 yields a profit of 10%. If it is sold for ₹890, what will be the percentage of profit or loss?',
          hinglish: 'Ek radio ko ₹990 me bechne par 10% profit hota hai. Agar use ₹890 me becha jaye to kitna % profit ya loss hoga?',
        },
        options: {
          hi: ['₹10 हानि (1.11% हानि)', '10% हानि', '₹20 लाभ', '1.11% लाभ'],
          en: ['₹10 Loss (1.11% loss)', '10% Loss', '₹20 Profit', '1.11% Profit'],
          hinglish: ['₹10 Loss (1.11% loss)', '10% Loss', '₹20 Profit', '1.11% Profit'],
        },
        correctIndex: 0,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: SP1 = ₹990, लाभ = 10%. CP = 990 / 1.10 = ₹900. नया SP = ₹890. हानि = 900 - 890 = ₹10. हानि % = (10 / 900) × 100 = 1.11% हानि।',
          en: 'Basic Method: SP1 = 990, Profit = 10%. CP = 990/1.1 = ₹900. New SP = 890. Loss = 900 - 890 = ₹10 = (10/900)*100 = 1.11% Loss.',
          hinglish: 'CP = 990 / 1.1 = ₹900. SP2 = 890 => ₹10 Loss (1.11%).',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: 110% = 990 => 1% = ₹9. तो ₹900 = 100% (CP). ₹890 = 890/9 = 98.89%. 100% - 98.89% = 1.11% हानि (₹10 हानि) (समय: 6 सेकंड)।',
          en: 'JITOMNI Super Trick: 110% = ₹990 => 1% = ₹9. So CP = 100% = ₹900. ₹890 represents ₹10 below CP = 1.11% Loss.',
          hinglish: '110% = 990 => 1% = 9. CP = 900. Loss = 900 - 890 = ₹10 Loss.',
        },
        timeSaveSeconds: 30,
        formulaUsed: 'CP = SP / (1 + P%)',
      },
    ],
    mathsCalculationMatrix: {
      title: {
        hi: 'गणित स्पीड कैलकुलेशन - फ्रैक्शन टू परसेंटेज टेबल (10 सेकंड में हल करने का सीक्रेट)',
        en: 'Maths Speed Calculation - Fraction to Percentage Table (Secret to 10s Solving)',
        hinglish: 'Fraction to Percentage Speed Matrix',
      },
      fractionTable: [
        { fraction: '1 / 2', percentage: '50%', decimal: '0.50' },
        { fraction: '1 / 3', percentage: '33.33% (33 1/3%)', decimal: '0.333' },
        { fraction: '1 / 4', percentage: '25%', decimal: '0.25' },
        { fraction: '1 / 5', percentage: '20%', decimal: '0.20' },
        { fraction: '1 / 6', percentage: '16.66% (16 2/3%)', decimal: '0.166' },
        { fraction: '1 / 7', percentage: '14.28% (14 2/7%)', decimal: '0.1428' },
        { fraction: '1 / 8', percentage: '12.50% (12 1/2%)', decimal: '0.125' },
        { fraction: '1 / 9', percentage: '11.11% (11 1/9%)', decimal: '0.111' },
        { fraction: '1 / 10', percentage: '10%', decimal: '0.10' },
        { fraction: '1 / 11', percentage: '9.09% (9 1/11%)', decimal: '0.0909' },
        { fraction: '1 / 12', percentage: '8.33% (8 1/3%)', decimal: '0.0833' },
        { fraction: '1 / 16', percentage: '6.25% (6 1/4%)', decimal: '0.0625' },
      ],
      speedMultiplierTricks: [
        { name: '20% Profit', trick: 'Multiply CP by 6/5', example: 'CP ₹500 => SP = 500 × 6/5 = ₹600' },
        { name: '25% Profit', trick: 'Multiply CP by 5/4', example: 'CP ₹800 => SP = 800 × 5/4 = ₹1,000' },
        { name: '16.66% Profit', trick: 'Multiply CP by 7/6', example: 'CP ₹600 => SP = 600 × 7/6 = ₹700' },
        { name: '12.5% Loss', trick: 'Multiply CP by 7/8', example: 'CP ₹800 => SP = 800 × 7/8 = ₹700' },
      ],
    },
    practiceSet20: [
      {
        id: 'pl-q1',
        yearTag: 'PYQ 2023 SSC CGL',
        question: {
          hi: 'एक दुकानदार 25% का लाभ कमाता है यदि वह किसी वस्तु को ₹750 में बेचता है। वस्तु का क्रय मूल्य क्या है?',
          en: 'A shopkeeper makes a 25% profit when selling an article for ₹750. What is the Cost Price (CP)?',
          hinglish: 'Ek shopkeeper ₹750 me bechkar 25% profit kamata hai. CP kya hoga?',
        },
        options: {
          hi: ['₹600', '₹550', '₹625', '₹580'],
          en: ['₹600', '₹550', '₹625', '₹580'],
          hinglish: ['₹600', '₹550', '₹625', '₹580'],
        },
        correctIndex: 0,
        explanation: {
          hi: '25% लाभ = 5/4 गुणा। CP = 750 × 4/5 = ₹600।',
          en: '25% profit implies SP = CP × 5/4. CP = 750 × 4/5 = ₹600.',
          hinglish: 'CP = 750 * (4/5) = ₹600 directly.',
        },
      },
      {
        id: 'pl-q2',
        yearTag: 'PYQ 2022 MP Police',
        question: {
          hi: '20 वस्तुओं का लागत मूल्य 25 वस्तुओं के विक्रय मूल्य के बराबर है। प्रतिशत हानि क्या है?',
          en: 'The cost price of 20 articles equals the selling price of 25 articles. What is the loss percentage?',
          hinglish: '20 articles ka CP 25 articles ke SP ke barabar hai. Loss % kya hoga?',
        },
        options: {
          hi: ['25%', '20%', '15%', '10%'],
          en: ['25%', '20%', '15%', '10%'],
          hinglish: ['25%', '20%', '15%', '10%'],
        },
        correctIndex: 1,
        explanation: {
          hi: 'CP/SP = 25/20 = 5/4. हानि = (1/5) × 100 = 20% हानि।',
          en: 'CP/SP = 25/20 = 5/4. Loss = 1 unit on 5 = 1/5 = 20% Loss.',
          hinglish: 'CP/SP = 5/4. Loss = 1/5 = 20% Loss.',
        },
      },
      {
        id: 'pl-q3',
        yearTag: 'PYQ 2021 RRB NTPC',
        question: {
          hi: '₹1 में 6 टॉफियां खरीदी गईं। 20% का लाभ कमाने के लिए ₹1 में कितनी टॉफियां बेची जानी चाहिए?',
          en: 'Toffees are bought at 6 for ₹1. How many for ₹1 must be sold to gain 20% profit?',
          hinglish: '₹1 me 6 toffees khareedi gayi. 20% profit ke liye ₹1 me kitni toffees bechni chahiye?',
        },
        options: {
          hi: ['5', '4', '3', '5.5'],
          en: ['5', '4', '3', '5.5'],
          hinglish: ['5', '4', '3', '5.5'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'मात्रा का अनुपात कीमत के व्युत्क्रमानुपाती होता है। मात्रा = 6 × (100 / 120) = 5 टॉफियां।',
          en: 'Quantity ratio is inverse of price ratio. Quantity to sell = 6 × (100/120) = 5 toffees.',
          hinglish: 'Direct formula: Old Qty * 100 / (100 + P%) = 6 * 100/120 = 5 toffees.',
        },
      },
      {
        id: 'pl-q4',
        yearTag: 'PYQ 2020 Banking',
        question: {
          hi: 'दो क्रमागत छूट (Successive Discounts) 20% और 10% का एकल समतुल्य बट्टा क्या होगा?',
          en: 'What is the single equivalent discount of two successive discounts of 20% and 10%?',
          hinglish: '20% aur 10% ka single equivalent discount kya hoga?',
        },
        options: {
          hi: ['30%', '28%', '25%', '27%'],
          en: ['30%', '28%', '25%', '27%'],
          hinglish: ['30%', '28%', '25%', '27%'],
        },
        correctIndex: 1,
        explanation: {
          hi: 'समतुल्य बट्टा = a + b - (ab/100) = 20 + 10 - 2 = 28%।',
          en: 'Equivalent discount = 20 + 10 - (200/100) = 28%.',
          hinglish: 'Formula: a + b - ab/100 = 20 + 10 - 2 = 28%.',
        },
      },
      {
        id: 'pl-q5',
        yearTag: 'Expected 2025 High-Yield',
        question: {
          hi: 'एक वस्तु को ₹450 में बेचने पर 10% की हानि होती है। 20% का लाभ कमाने के लिए इसे किस मूल्य पर बेचा जाए?',
          en: 'Selling an article for ₹450 incurs a 10% loss. At what price must it be sold to gain 20%?',
          hinglish: '₹450 me bechne par 10% loss hota hai. 20% profit ke liye kis price par bechein?',
        },
        options: {
          hi: ['₹500', '₹600', '₹550', '₹620'],
          en: ['₹500', '₹600', '₹550', '₹620'],
          hinglish: ['₹500', '₹600', '₹550', '₹620'],
        },
        correctIndex: 1,
        explanation: {
          hi: 'नया SP = 450 × (120 / 90) = 450 × 4/3 = ₹600।',
          en: 'New SP = 450 × (120/90) = 450 × 4/3 = ₹600.',
          hinglish: 'New SP = 450 * (120/90) = ₹600 in 5 seconds.',
        },
      },
    ],
  },

  'direction-test': {
    id: 'direction-test',
    name: {
      hi: 'दिशा एवं दूरी परीक्षण (Direction & Distance Logic)',
      en: 'Direction & Distance (Diagram & Logic Tree)',
      hinglish: 'Direction & Distance (Compass & Logic Tree)',
    },
    subjectCategory: 'reasoning',
    subjectName: 'Logical Reasoning (Mental Ability)',
    chapterName: 'Verbal & Analytical Reasoning',
    targetExam: 'MP Police',
    examDemand: {
      summary: {
        hi: 'MP पुलिस कांस्टेबल और SI में हर एक शिफ्ट में 2-3 प्रश्न (100% गारंटीड)। SSC में 1-2 प्रश्न, रेलवे में 2 प्रश्न। यह शुद्ध डायग्राम और पाइथागोरस प्रमेय पर आधारित सबसे तेज स्कोरिंग टॉपिक है।',
        en: 'Appears 2-3 times in every single shift of MP Police Constable & SI. 1-2 Qs in SSC, 2 Qs in Railway NTPC. 100% guaranteed scoring topic.',
        hinglish: 'MP Police ki har single shift me 2-3 questions guaranteed. SSC aur Banking me bhi high frequency. Zero calculation error topic.',
      },
      frequencyStats: [
        { exam: 'MP Police Constable & SI', frequency: '2-3 Questions per shift (100%)', marksWeightage: '2 - 3 Marks' },
        { exam: 'SSC CGL / CHSL / MTS', frequency: '1-2 Questions', marksWeightage: '2 - 4 Marks' },
        { exam: 'Banking (IBPS / SBI Clerk)', frequency: '2-3 Questions (Coded Direction)', marksWeightage: '2 - 3 Marks' },
        { exam: 'RRB NTPC / Group D', frequency: '2 Questions', marksWeightage: '2 Marks' },
        { exam: 'MP Patwari & Vyapam', frequency: '2 Questions', marksWeightage: '2 Marks' },
      ],
      expectedQuestions: '2 - 3 Questions Guaranteed',
      difficultyLevel: 'Easy-Moderate',
    },
    bestFormulaBox: {
      title: {
        hi: 'दिशा परीक्षण के 3 मास्टर नियम एवं पाइथागोरस प्रमेय',
        en: '3 Master Rules of Direction Sense & Pythagoras Theorem',
        hinglish: 'Top 3 Master Direction Rules & Logic Trees',
      },
      formulaList: [
        {
          name: {
            hi: '1. पाइथागोरस न्यूनतम दूरी सूत्र (Shortest Distance)',
            en: '1. Pythagoras Shortest Displacement Formula',
            hinglish: '1. Pythagoras Shortest Distance',
          },
          formula: 'न्यूनतम दूरी (Hypotenuse) = √(लंब² + आधार²)  =>  H = √(P² + B²)',
          whereUsed: {
            hi: 'जब प्रारंभिक बिंदु से अंतिम बिंदु की सीधी (न्यूनतम) दूरी ज्ञात करनी हो।',
            en: 'To calculate straight-line displacement from starting point to endpoint.',
            hinglish: 'Starting point se final point ki direct shortest distance nikalne ke liye.',
          },
          exampleTip: {
            hi: 'ट्रिपलेट्स याद रखें: (3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17) बिना गणना उत्तर देते हैं।',
            en: 'Pythagorean Triplets: (3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17) give instant answers.',
            hinglish: 'Triplets yaad rakhein: 3-4 ka resultant 5 hota hai, 6-8 ka 10, 5-12 ka 13.',
          },
        },
        {
          name: {
            hi: '2. दायां (Right) और बायां (Left) का 90° घूर्णन नियम',
            en: '2. Right vs Left 90° Turn Rule',
            hinglish: '2. Right (Clockwise) & Left (Anti-Clockwise) Rule',
          },
          formula: 'दायां मुड़ना = 90° दक्षिणावर्त (Clockwise) | बायां मुड़ना = 90° वामावर्त (Anticlockwise)',
          whereUsed: {
            hi: 'जब भी प्रश्न में केवल "दाएं" या "बाएं" मुड़ने को कहा जाए (बिना कोण दिए)।',
            en: 'When a turn is instructed as just "Right" or "Left" without explicit angle specification.',
            hinglish: 'Right turn = 90 deg clockwise, Left turn = 90 deg anti-clockwise.',
          },
          exampleTip: {
            hi: 'उत्तर का दायां = पूर्व | दक्षिण का दायां = पश्चिम | पूर्व का दायां = दक्षिण | पश्चिम का दायां = उत्तर।',
            en: 'North right = East | South right = West | East right = South | West right = North.',
            hinglish: 'North face karke right = East, left = West.',
          },
        },
        {
          name: {
            hi: '3. सूर्योदय और सूर्यास्त परछाई नियम (Shadow Logic)',
            en: '3. Sunrise & Sunset Shadow Logic',
            hinglish: '3. Sunrise & Sunset Shadow Direction Rules',
          },
          formula: 'सूर्योदय (सुबह): परछाई सदा पश्चिम में | सूर्यास्त (शाम): परछाई सदा पूर्व में',
          whereUsed: {
            hi: 'जब सुबह या शाम के समय दो व्यक्ति आमने-सामने बात कर रहे हों और परछाई दी गई हो।',
            en: 'When two people face each other during sunrise or sunset with given shadow side.',
            hinglish: 'Morning shadow = West side, Evening shadow = East side.',
          },
          exampleTip: {
            hi: 'यदि सुबह किसी व्यक्ति की परछाई उसके बाएं पड़ रही है, तो उसका मुख "उत्तर" दिशा में है।',
            en: 'If during morning your shadow falls to your left, you are facing North.',
            hinglish: 'Morning shadow on Left = Person is facing North.',
          },
        },
      ],
    },
    bestMethodVsShortTrick: {
      problemStatement: {
        hi: 'प्रश्न: रोहन उत्तर दिशा की ओर 10 किमी चलता है। वहां से वह दाएं मुड़कर 6 किमी चलता है, फिर दाएं मुड़कर 2 किमी चलता है। अब वह अपने प्रारंभिक बिंदु से किस दिशा में और कितनी दूरी पर है?',
        en: 'Problem: Rohan walks 10 km towards North. Then he turns right and walks 6 km, then turns right and walks 2 km. In which direction and at what distance is he from his starting point?',
        hinglish: 'Question: Rohan North me 10 km chalta hai. Fir Right turn lekar 6 km chalta hai, fir Right turn lekar 2 km chalta hai. Starting point se direction aur distance kya hai?',
      },
      basicMethod: {
        title: {
          hi: 'बेसिक विधि (पूरा ग्राफ पेपर डायग्राम बनाकर नापना - समय: 60-80 सेकंड)',
          en: 'Basic Method (Full Graph Paper Compass Plotting - Time: 60-80s)',
          hinglish: 'Basic Compass Drawing Step-by-Step',
        },
        steps: [
          {
            hi: 'चरण 1: बिंदु (0,0) से उत्तर की ओर Y-अक्ष पर (0,10) तक रेखा खींचें।',
            en: 'Step 1: Draw vector from (0,0) to (0,10) North.',
            hinglish: 'Step 1: Point (0,0) se (0,10) North line draw karein.',
          },
          {
            hi: 'चरण 2: दायां (पूर्व) मुड़कर (6,10) तक 6 किमी रेखा खींचें।',
            en: 'Step 2: Turn right (East) and draw 6 km to (6,10).',
            hinglish: 'Step 2: East me 6 km draw karke (6,10) par pahuchein.',
          },
          {
            hi: 'चरण 3: फिर दायां (दक्षिण) मुड़कर 2 किमी नीचे (6,8) पर आएं। प्रारंभिक बिंदु (0,0) से (6,8) की दूरी पाइथागोरस से निकालें।',
            en: 'Step 3: Turn South 2 km reaching (6,8). Calculate distance from (0,0) to (6,8) using Pythagoras.',
            hinglish: 'Step 3: South me 2 km aakar (6,8) coordinates mile.',
          },
        ],
        timeTaken: '70 Seconds',
      },
      jitomniFastTrick: {
        title: {
          hi: 'JITOMNI N-E-S-W नेट वेक्टर ट्रिक (बिना डायग्राम बनाए 10 सेकंड में)',
          en: 'JITOMNI N-E-S-W Net Vector Trick (Zero Diagram 10-Second Method)',
          hinglish: 'JITOMNI N-E-S-W Linear Vector Trick (Zero Drawing)',
        },
        trickFormulaOrLogic: 'N = 10, E = 6, S = 2, W = 0 => Net North = N - S = 10 - 2 = 8 km | Net East = 6 km',
        executionStep: {
          hi: 'दूरी = √(Net North² + Net East²) = √(8² + 6²) = √(64 + 36) = √100 = 10 किमी। दिशा = उत्तर-पूर्व (North-East)!',
          en: 'Distance = √(8² + 6²) = √(64 + 36) = √100 = 10 km. Direction = North-East (Direct 8-second mental calculation without drawing single line!)',
          hinglish: 'Net N = 8 km, Net E = 6 km. Direct (6, 8, 10) triplet => Distance = 10 km, Direction = North-East.',
        },
        timeTaken: '8-10 Seconds',
        proTip: {
          hi: 'एग्जाम प्रो टिप: North और South आपस में घटते हैं (N - S), East और West आपस में घटते हैं (E - W)। शेष बची दिशाएं उत्तर-पूर्व या दक्षिण-पश्चिम बनती हैं।',
          en: 'Exam Pro Tip: North & South cancel each other (N - S), East & West cancel each other (E - W). The remnants give the resultant quadrant.',
          hinglish: 'Linear formula: Opposite directions cancel out (N-S, E-W). Bacha hua vector direct answer deta hai.',
        },
      },
    },
    pyqBank: [
      {
        id: 'pyq-dir-2023-ssc',
        yearTag: 'PYQ 2023 SSC CGL Tier-1',
        exam: 'SSC CGL 2023',
        question: {
          hi: 'एक व्यक्ति पश्चिम की ओर मुख करके खड़ा है। वह 45° दक्षिणावर्त (Clockwise), फिर 180° उसी दिशा में और फिर 270° वामावर्त (Anticlockwise) घूमता है। अब उसका मुख किस दिशा में है?',
          en: 'A man is facing West. He turns 45° in the clockwise direction, then another 180° in the same direction, and then 270° in the anticlockwise direction. Which direction is he facing now?',
          hinglish: 'Ek man West face kar raha hai. Wo 45° CW, fir 180° CW aur fir 270° ACW ghumta hai. Ab uska face kis direction me hai?',
        },
        options: {
          hi: ['दक्षिण-पश्चिम (South-West)', 'उत्तर-पश्चिम (North-West)', 'दक्षिण-पूर्व (South-East)', 'उत्तर-पूर्व (North-East)'],
          en: ['South-West', 'North-West', 'South-East', 'North-East'],
          hinglish: ['South-West', 'North-West', 'South-East', 'North-East'],
        },
        correctIndex: 0,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: वृत्त बनाकर हर कोण पर सुई घुमाएं: 45° CW + 180° CW = 225° CW. फिर 270° ACW घुमाएं. नेट कोण = 270° ACW - 225° CW = 45° ACW. पश्चिम से 45° वामावर्त = दक्षिण-पश्चिम (South-West)। (समय: 55s)',
          en: 'Basic Method: Draw circle compass. Net rotation = (45° + 180°) CW - 270° ACW = 225° CW - 270° ACW = 45° ACW from West = South-West. (55s)',
          hinglish: 'Compass draw karke manual turning count karein. Result = South-West.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: CW = + (प्लस), ACW = - (माइनस). नेट = (+45° + 180°) - 270° = +225° - 270° = -45° (अर्थात 45° ACW). पश्चिम से 45° पीछे = दक्षिण-पश्चिम (South-West) (समय: 4 सेकंड)।',
          en: 'JITOMNI Super Trick: Net Angle = (+45 + 180) - 270 = -45° (Anticlockwise). Turn 45° ACW from West => South-West in 4 seconds.',
          hinglish: 'CW (+) & ACW (-): Net = 225 - 270 = -45° ACW from West = South-West in 4 seconds flat.',
        },
        timeSaveSeconds: 51,
        formulaUsed: 'Net Angle = Σ(Clockwise) - Σ(Anticlockwise)',
      },
      {
        id: 'pyq-dir-2022-mp-police',
        yearTag: 'PYQ 2022 MP Police Constable',
        exam: 'MP Police Constable 2022',
        question: {
          hi: 'अमित पूर्व की ओर 5 किमी चलता है, फिर बाएं मुड़कर 12 किमी चलता है। वह अपने प्रारंभिक बिंदु से कितनी दूरी पर है?',
          en: 'Amit walks 5 km East, then turns left and walks 12 km. How far is he from his starting point?',
          hinglish: 'Amit East me 5 km chalta hai, fir Left turn lekar 12 km chalta hai. Starting point se uski direct distance kitni hai?',
        },
        options: {
          hi: ['17 किमी', '13 किमी', '15 किमी', '10 किमी'],
          en: ['17 km', '13 km', '15 km', '10 km'],
          hinglish: ['17 km', '13 km', '15 km', '10 km'],
        },
        correctIndex: 1,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: लंब = 12 किमी, आधार = 5 किमी. दूरी = √(12² + 5²) = √(144 + 25) = √169 = 13 किमी।',
          en: 'Basic Method: Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 km.',
          hinglish: 'Pythagoras theorem: H = √(144 + 25) = 13 km.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI सुपर ट्रिक: डायरेक्ट पाइथागोरियन ट्रिपलेट (5, 12, 13) देखते ही 2 सेकंड में 13 किमी टिक करें!',
          en: 'JITOMNI Super Trick: Direct recognition of (5, 12, 13) Pythagorean triplet gives 13 km in 2 seconds without calculation!',
          hinglish: 'Direct Triplet (5, 12, 13) => 13 km in 2 seconds without pen.',
        },
        timeSaveSeconds: 35,
        formulaUsed: 'Pythagorean Triplet (5, 12, 13)',
      },
      {
        id: 'pyq-dir-2021-rrb-ntpc',
        yearTag: 'PYQ 2021 RRB NTPC Stage-1',
        exam: 'RRB NTPC 2021',
        question: {
          hi: 'एक सुबह सूर्योदय के बाद, सुरेश एक खंभे की ओर देख रहा था। खंभे की परछाई ठीक सुरेश के दाईं ओर पड़ रही थी। सुरेश का मुख किस दिशा में था?',
          en: 'One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. Which direction was Suresh facing?',
          hinglish: 'Morning me sunrise ke baad Suresh ek pole ki taraf face kar raha tha. Pole ki shadow Suresh ke right side pad rahi thi. Suresh ka face kis direction me tha?',
        },
        options: {
          hi: ['दक्षिण (South)', 'उत्तर (North)', 'पूर्व (East)', 'पश्चिम (West)'],
          en: ['South', 'North', 'East', 'West'],
          hinglish: ['South', 'North', 'East', 'West'],
        },
        correctIndex: 0,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: सुबह सूर्य पूर्व में होता है, इसलिए सभी परछाइयां पश्चिम में पड़ेंगी। खंभे की परछाई पश्चिम में है और यह सुरेश के दाईं ओर है। यदि दायां हाथ पश्चिम में है, तो मुख दक्षिण दिशा की ओर होगा।',
          en: 'Basic Method: In morning, sun is in East, so shadows fall West. Shadow is to Suresh’s right. When right hand points West, you face South.',
          hinglish: 'Morning shadow = West. Right side = West means Suresh is facing South.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI शैडो ट्रिक: सुबह परछाई = पश्चिम (W). दायां = पश्चिम => मुख = दक्षिण (South) (समय: 3 सेकंड में उत्तर)।',
          en: 'JITOMNI Shadow Trick: Morning shadow = West. Right = West => Face = South (3 seconds).',
          hinglish: 'Morning Shadow = West. Right side = West => Facing South.',
        },
        timeSaveSeconds: 30,
        formulaUsed: 'Morning Shadow Rule (Shadow = West)',
      },
      {
        id: 'pyq-dir-2020-banking-ibps',
        yearTag: 'PYQ 2020 Banking IBPS PO',
        exam: 'IBPS PO Prelims 2020',
        question: {
          hi: 'बिंदु A बिंदु B के 10 मीटर उत्तर में है। बिंदु C बिंदु B के 12 मीटर पूर्व में है। बिंदु D बिंदु C के 10 मीटर दक्षिण में है। बिंदु D बिंदु A से किस दिशा में है?',
          en: 'Point A is 10 m North of Point B. Point C is 12 m East of Point B. Point D is 10 m South of Point C. In which direction is Point D with respect to Point A?',
          hinglish: 'Point A Point B ke 10m North me hai. Point C Point B ke 12m East me hai. Point D Point C ke 10m South me hai. Point D Point A ke respect me kis direction me hai?',
        },
        options: {
          hi: ['दक्षिण-पूर्व (South-East)', 'उत्तर-पूर्व (North-East)', 'पूर्व (East)', 'दक्षिण (South)'],
          en: ['South-East', 'North-East', 'East', 'South'],
          hinglish: ['South-East', 'North-East', 'East', 'South'],
        },
        correctIndex: 0,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: A(0,10), B(0,0), C(12,0), D(12,-10). A से D का वेक्टर = (12 - 0) East, (-10 - 10) = -20 South. दिशा = दक्षिण-पूर्व (South-East)।',
          en: 'Basic Method: Plot points on Cartesian coordinates. Vector A to D = (12, -20) => South-East.',
          hinglish: 'Coordinate plotting: A is at (0,10), D is at (12,-10). Direction = South-East.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI बॉक्स ट्रिक: A ऊपर उत्तर में है और D नीचे दक्षिण तथा दाईं ओर पूर्व में है => उत्तर से नीचे और दाएं = दक्षिण-पूर्व (South-East) (समय: 5 सेकंड)।',
          en: 'JITOMNI Box Trick: Relative to A, D is both Below (South) and Right (East) => South-East in 5s.',
          hinglish: 'A se D = Down (South) + Right (East) = South-East.',
        },
        timeSaveSeconds: 35,
        formulaUsed: 'Vector Relative Direction (South + East = South-East)',
      },
      {
        id: 'pyq-dir-2019-mp-patwari',
        yearTag: 'PYQ 2019 MP Patwari / Vyapam',
        exam: 'MP Patwari Exam 2019',
        question: {
          hi: 'एक घड़ी में 4:30 बज रहे हैं। यदि मिनट की सुई पूर्व दिशा की ओर इशारा कर रही है, तो घंटे की सुई किस दिशा की ओर इशारा करेगी?',
          en: 'A clock shows 4:30. If the minute hand points towards East, in which direction will the hour hand point?',
          hinglish: 'Clock me 4:30 baje hain. Agar minute hand East point kar rahi hai, to hour hand kis direction me point karegi?',
        },
        options: {
          hi: ['उत्तर-पूर्व (North-East)', 'दक्षिण-पूर्व (South-East)', 'उत्तर (North)', 'उत्तर-पश्चिम (North-West)'],
          en: ['North-East', 'South-East', 'North', 'North-West'],
          hinglish: ['North-East', 'South-East', 'North', 'North-West'],
        },
        correctIndex: 0,
        basicMethodSolution: {
          hi: 'बेसिक तरीका: 4:30 पर मिनट की सुई सामान्यतः दक्षिण (6 पर) होती है। लेकिन प्रश्न में इसे पूर्व (90° वामावर्त घूर्णन) कहा गया है। 4:30 पर घंटे की सुई 4 और 5 के बीच (दक्षिण-पूर्व) में होती है। दक्षिण-पूर्व को 90° वामावर्त घुमाने पर "उत्तर-पूर्व" प्राप्त होता है।',
          en: 'Basic Method: At 4:30, minute hand is at 6 (normally South), turned 90° ACW to East. Hour hand at 4:30 is South-East. Rotating South-East 90° ACW yields North-East.',
          hinglish: 'Standard 4:30 minute hand = South. Shifted 90° ACW to East. Hour hand (South-East) shifted 90° ACW = North-East.',
        },
        shortTrickSolution: {
          hi: 'JITOMNI क्लॉक शिफ्ट ट्रिक: मिनट की सुई South -> East (90° ACW घूमी). तो घंटे की सुई South-East -> 90° ACW घूमेगी = उत्तर-पूर्व (North-East) (समय: 6 सेकंड)।',
          en: 'JITOMNI Clock Shift Trick: Minute hand turned South -> East (90° ACW). Shift Hour hand by same 90° ACW: South-East + 90° ACW = North-East.',
          hinglish: 'Equal Angle Rotation: Shift hour hand by exactly same 90° ACW => North-East in 6 seconds.',
        },
        timeSaveSeconds: 30,
        formulaUsed: 'Clock Direction Shift Invariant Rule',
      },
    ],
    reasoningDiagram: {
      type: 'direction_compass',
      title: {
        hi: 'तर्कशक्ति आरेख: 8-दिशा कम्पास एवं कोण चक्र (Diagram & Logic Tree)',
        en: 'Reasoning Diagram: 8-Direction Compass & Angular Logic Matrix',
        hinglish: '8-Direction Compass & Logic Tree',
      },
      compassNodes: [
        { dir: 'N', angle: 0, label: 'North', hiLabel: 'उत्तर (0° / 360°)' },
        { dir: 'NE', angle: 45, label: 'North-East', hiLabel: 'उत्तर-पूर्व (45°)' },
        { dir: 'E', angle: 90, label: 'East', hiLabel: 'पूर्व (90°)' },
        { dir: 'SE', angle: 135, label: 'South-East', hiLabel: 'दक्षिण-पूर्व (135°)' },
        { dir: 'S', angle: 180, label: 'South', hiLabel: 'दक्षिण (180°)' },
        { dir: 'SW', angle: 225, label: 'South-West', hiLabel: 'दक्षिण-पश्चिम (225°)' },
        { dir: 'W', angle: 270, label: 'West', hiLabel: 'पश्चिम (270°)' },
        { dir: 'NW', angle: 315, label: 'North-West', hiLabel: 'उत्तर-पश्चिम (315°)' },
      ],
      logicRules: [
        {
          hi: 'दायां मुड़ना = +90° क्लॉकवाइज (घड़ी की सुई की दिशा)',
          en: 'Right Turn = +90° Clockwise direction',
          hinglish: 'Right turn = +90 deg Clockwise (CW)',
        },
        {
          hi: 'बायां मुड़ना = -90° एंटी-क्लॉकवाइज (घड़ी की विपरीत दिशा)',
          en: 'Left Turn = -90° Anti-Clockwise direction',
          hinglish: 'Left turn = -90 deg Anti-Clockwise (ACW)',
        },
        {
          hi: 'विपरीत दिशा = 180° घुमाव (जैसे उत्तर का विपरीत दक्षिण, पूर्व का पश्चिम)',
          en: 'Opposite Direction = 180° inversion (North <-> South, East <-> West)',
          hinglish: 'Opposite = 180 deg reverse turn',
        },
      ],
    },
    practiceSet20: [
      {
        id: 'dir-q1',
        yearTag: 'PYQ 2023 SSC CGL',
        question: {
          hi: 'एक व्यक्ति दक्षिण की ओर 30 मीटर चलता है। फिर दाएं मुड़कर 30 मीटर चलता है, फिर बाएं मुड़कर 20 मीटर चलता है और अंत में बाएं मुड़कर 30 मीटर चलता है। वह प्रारंभिक बिंदु से कितनी दूरी पर है?',
          en: 'A person walks 30 m South. Then turns right and walks 30 m, then turns left and walks 20 m, then turns left and walks 30 m. How far is he from the start?',
          hinglish: 'South me 30m, Right 30m, Left 20m, Left 30m. Starting point se distance kitni hai?',
        },
        options: {
          hi: ['50 मीटर', '60 मीटर', '30 मीटर', '80 मीटर'],
          en: ['50 m', '60 m', '30 m', '80 m'],
          hinglish: ['50 m', '60 m', '30 m', '80 m'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'Net South = 30 + 20 = 50 मीटर। पश्चिम 30m और पूर्व 30m आपस में कट गए। दूरी = 50 मीटर दक्षिण।',
          en: 'Net South = 30 + 20 = 50 m. West 30m and East 30m cancel out. Distance = 50 m.',
          hinglish: 'West 30m and East 30m cancel out. Net South = 30 + 20 = 50m.',
        },
      },
      {
        id: 'dir-q2',
        yearTag: 'PYQ 2022 MP Police',
        question: {
          hi: 'यदि दक्षिण-पश्चिम उत्तर बन जाए, तो उत्तर-पूर्व क्या बनेगा?',
          en: 'If South-West becomes North, what will North-East become?',
          hinglish: 'Agar South-West North ban jaye, to North-East kya banega?',
        },
        options: {
          hi: ['दक्षिण (South)', 'पश्चिम (West)', 'उत्तर (North)', 'पूर्व (East)'],
          en: ['South', 'West', 'North', 'East'],
          hinglish: ['South', 'West', 'North', 'East'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'दक्षिण-पश्चिम का ठीक विपरीत उत्तर-पूर्व होता है। यदि दक्षिण-पश्चिम उत्तर बना, तो उत्तर का विपरीत "दक्षिण" उत्तर-पूर्व का मान होगा।',
          en: 'North-East is directly opposite South-West. Since SW became North, opposite of North is South.',
          hinglish: 'Opposite rule: SW opposite is NE. If SW = North, then NE = South.',
        },
      },
      {
        id: 'dir-q3',
        yearTag: 'PYQ 2021 RRB NTPC',
        question: {
          hi: 'प्रिया पूर्व दिशा में 8 किमी चलती है, फिर उत्तर की ओर 6 किमी चलती है। प्रारंभिक बिंदु से उसकी न्यूनतम दूरी कितनी है?',
          en: 'Priya walks 8 km East, then 6 km North. What is the shortest displacement from start?',
          hinglish: 'Priya East me 8 km aur North me 6 km chalti hai. Shortest distance kitni hai?',
        },
        options: {
          hi: ['10 किमी', '14 किमी', '12 किमी', '8 किमी'],
          en: ['10 km', '14 km', '12 km', '8 km'],
          hinglish: ['10 km', '14 km', '12 km', '8 km'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'पाइथागोरस प्रमेय: √(8² + 6²) = √(64 + 36) = √100 = 10 किमी। ट्रिपलेट (6, 8, 10)।',
          en: 'Pythagoras: √(8² + 6²) = √100 = 10 km. Standard (6, 8, 10) triplet.',
          hinglish: 'Direct triplet: √(64 + 36) = 10 km.',
        },
      },
      {
        id: 'dir-q4',
        yearTag: 'PYQ 2020 Banking',
        question: {
          hi: 'शाम 6 बजे सूर्यास्त के समय, दो मित्र रोहन और सोहन आमने-सामने खड़े होकर बात कर रहे थे। यदि रोहन की परछाई सोहन के ठीक दाईं ओर थी, तो सोहन का मुख किस दिशा में था?',
          en: 'At sunset (6 PM), Rohan and Sohan were talking face-to-face. If Rohan’s shadow was exactly to Sohan’s right, which direction was Sohan facing?',
          hinglish: 'Sunset ke time Rohan aur Sohan face to face baat kar rahe the. Rohan ki shadow Sohan ke right me thi. Sohan ka face kis taraf tha?',
        },
        options: {
          hi: ['उत्तर (North)', 'दक्षिण (South)', 'पूर्व (East)', 'पश्चिम (West)'],
          en: ['North', 'South', 'East', 'West'],
          hinglish: ['North', 'South', 'East', 'West'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'शाम के समय सभी परछाइयां पूर्व (East) में होती हैं। सोहन का दायां हाथ = पूर्व => सोहन का मुख "उत्तर" की ओर है।',
          en: 'At sunset, shadows fall East. Sohan’s right is East => Sohan faces North.',
          hinglish: 'Evening shadow = East. Sohan’s Right = East => Sohan is facing North.',
        },
      },
      {
        id: 'dir-q5',
        yearTag: 'Expected 2025 High-Yield',
        question: {
          hi: 'एक व्यक्ति उत्तर की ओर 15 मीटर जाता है, फिर दाएं मुड़कर 20 मीटर, फिर दाएं मुड़कर 15 मीटर जाता है। वह आरंभिक स्थान से किस दिशा में और कितने मीटर दूर है?',
          en: 'A man goes 15 m North, then turns right 20 m, then turns right 15 m. In which direction and at what distance is he from the start?',
          hinglish: 'North 15m, Right 20m, Right 15m. Start se direction aur distance kya hai?',
        },
        options: {
          hi: ['20 मीटर पूर्व', '20 मीटर पश्चिम', '15 मीटर पूर्व', '30 मीटर उत्तर'],
          en: ['20 m East', '20 m West', '15 m East', '30 m North'],
          hinglish: ['20 m East', '20 m West', '15 m East', '30 m North'],
        },
        correctIndex: 0,
        explanation: {
          hi: 'उत्तर 15m और दक्षिण 15m कट गए। शेष बचा 20 मीटर पूर्व (East)।',
          en: 'North 15m and South 15m cancel out. Result = 20 m East.',
          hinglish: 'North 15m & South 15m cancel. Left with 20m East.',
        },
      },
    ],
  },
};

// Aliases for convenient indexing
competitiveSpecialTopics['comp-profit-loss'] = competitiveSpecialTopics['profit-loss'];
competitiveSpecialTopics['comp-direction-distance'] = competitiveSpecialTopics['direction-distance'];

/**
 * Helper to get or dynamically synthesize a CompetitiveTopicDetail from any TopicItem
 */
export function getCompetitiveTopicDetail(
  topicName: string,
  subjectCategory: 'quant' | 'reasoning' | 'science' | 'gk_gs' | 'general' = 'quant',
  targetExam: string = 'SSC'
): CompetitiveTopicDetail | null {
  const lower = topicName.toLowerCase();
  
  if (lower.includes('profit') || lower.includes('loss') || lower.includes('लाभ') || lower.includes('हानि')) {
    return competitiveSpecialTopics['profit-loss'];
  }
  if (lower.includes('direction') || lower.includes('distance') || lower.includes('दिशा') || lower.includes('दूरी')) {
    return competitiveSpecialTopics['direction-distance'];
  }
  
  // Return pre-baked if direct key exists
  if (competitiveSpecialTopics[topicName]) {
    return competitiveSpecialTopics[topicName];
  }
  
  return null;
}

