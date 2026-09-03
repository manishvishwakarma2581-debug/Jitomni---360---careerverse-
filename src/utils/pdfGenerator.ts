import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from 'pdf-lib';
import { Language, MockExamConfig, QuizQuestion, TopicItem } from '../types';

function cleanPdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[^\x00-\x7F]/g, (char) => {
      if (char === '°') return ' Deg';
      if (char === '•' || char === '●' || char === '▪') return '- ';
      if (char === '’' || char === '‘') return "'";
      if (char === '“' || char === '”') return '"';
      if (char === '—' || char === '–') return '-';
      if (char === '₹') return 'Rs.';
      if (char === '✓') return '[OK]';
      if (char === '✦' || char === '★') return '*';
      if (char === '⚠️') return '[!]';
      return ' ';
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function getTextForLang(item: { hi?: string; en?: string; hinglish?: string } | undefined, lang: Language): string {
  if (!item) return '';
  if (lang === 'hinglish') return item.hinglish || item.en || item.hi || '';
  if (lang === 'en') return item.en || item.hinglish || item.hi || '';
  return item.hinglish || item.hi || item.en || '';
}

function getArrayForLang(item: any, lang: Language): string[] {
  if (!item) return [];
  if (Array.isArray(item)) {
    return item.map((opt) => {
      if (typeof opt === 'string') return opt;
      if (opt && typeof opt === 'object') {
        if (lang === 'hinglish') return opt.hinglish || opt.en || opt.hi || '';
        if (lang === 'en') return opt.en || opt.hinglish || opt.hi || '';
        return opt.hi || opt.hinglish || opt.en || '';
      }
      return String(opt);
    });
  }
  if (typeof item === 'object') {
    if (lang === 'hinglish') return item.hinglish || item.en || item.hi || [];
    if (lang === 'en') return item.en || item.hinglish || item.hi || [];
    return item.hi || item.hinglish || item.en || [];
  }
  return [];
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  return lines;
}

// Helper to draw standard header ribbon on content pages
function drawContentPageHeader(
  page: PDFPage,
  fontBold: PDFFont,
  fontRegular: PDFFont,
  topicTitle: string,
  tabBadge: string,
  lang: Language,
  themeColor: { r: number; g: number; b: number }
) {
  const { width, height } = page.getSize();

  // Background light clean canvas
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.97, 0.98, 1.0),
  });

  // Top Dark Navy Bar
  page.drawRectangle({
    x: 0,
    y: height - 55,
    width,
    height: 55,
    color: rgb(0.01, 0.04, 0.12),
  });

  // Color Accent Strip
  page.drawRectangle({
    x: 0,
    y: height - 59,
    width,
    height: 4,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });

  // Brand and Topic
  page.drawText('JITOMNI 360°', {
    x: 35,
    y: height - 28,
    size: 14,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04), // Gold
  });

  page.drawText(cleanPdfText(topicTitle).slice(0, 45), {
    x: 140,
    y: height - 28,
    size: 11,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(`LANG: ${lang.toUpperCase()}`, {
    x: width - 115,
    y: height - 28,
    size: 9.5,
    font: fontBold,
    color: rgb(0.9, 0.9, 0.95),
  });

  // Sub-header tab dimension badge bar
  page.drawRectangle({
    x: 35,
    y: height - 92,
    width: width - 70,
    height: 25,
    color: rgb(0.04, 0.10, 0.22),
  });

  page.drawText(tabBadge, {
    x: 45,
    y: height - 85,
    size: 10,
    font: fontBold,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });

  // Bottom Footer
  page.drawLine({
    start: { x: 35, y: 35 },
    end: { x: width - 35, y: 35 },
    thickness: 1,
    color: rgb(0.8, 0.85, 0.9),
  });

  page.drawText('JITOMNI 360° Education Platform • Stop Rote Learning • 100% Conceptual Mastery', {
    x: 35,
    y: 20,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.3, 0.35, 0.45),
  });
}

export async function generateTopicPdf(topic: TopicItem, lang: Language): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const navyColor = rgb(0.01, 0.04, 0.12);
  const deepCardBlue = rgb(0.04, 0.10, 0.22);
  const goldColor = rgb(0.96, 0.62, 0.04);
  const lightGold = rgb(0.99, 0.90, 0.54);
  const whiteColor = rgb(1, 1, 1);
  const darkGray = rgb(0.15, 0.20, 0.30);

  const topicTitleRaw = getTextForLang(topic.name, lang);
  const topicTitleClean = cleanPdfText(topicTitleRaw);
  const fw = topic.framework;

  // ==========================================
  // PAGE 1: COVER PAGE (Royal Dark Blue + Gold)
  // ==========================================
  const coverPage = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = coverPage.getSize();

  // Dark Navy Background
  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: navyColor,
  });

  // Gold Top Accent
  coverPage.drawRectangle({
    x: 30,
    y: height - 55,
    width: width - 60,
    height: 6,
    color: goldColor,
  });

  // Border Box
  coverPage.drawRectangle({
    x: 30,
    y: 35,
    width: width - 60,
    height: height - 90,
    borderColor: goldColor,
    borderWidth: 1.5,
    color: deepCardBlue,
    opacity: 0.92,
  });

  // App Logo
  coverPage.drawText('J I T O M N I   3 6 0', {
    x: 55,
    y: height - 110,
    size: 26,
    font: fontBold,
    color: goldColor,
  });

  coverPage.drawText('NATIONAL 360° CRITICAL EDUCATION BLUEPRINT', {
    x: 55,
    y: height - 132,
    size: 10,
    font: fontBold,
    color: lightGold,
  });

  coverPage.drawLine({
    start: { x: 55, y: height - 148 },
    end: { x: width - 55, y: height - 148 },
    thickness: 1.5,
    color: goldColor,
  });

  // Title Box
  coverPage.drawText('OFFICIAL 360 DEGREE CONCEPT MASTER FILE', {
    x: 55,
    y: height - 185,
    size: 11,
    font: fontBold,
    color: goldColor,
  });

  const titleLines = wrapText(topicTitleClean, 28);
  let curTitleY = height - 225;
  for (const line of titleLines) {
    coverPage.drawText(line, {
      x: 55,
      y: curTitleY,
      size: 24,
      font: fontBold,
      color: whiteColor,
    });
    curTitleY -= 30;
  }

  // Metadata Card
  const metaY = curTitleY - 20;
  coverPage.drawRectangle({
    x: 55,
    y: metaY - 75,
    width: width - 110,
    height: 85,
    color: rgb(0.02, 0.06, 0.16),
    borderColor: rgb(0.2, 0.4, 0.7),
    borderWidth: 1,
  });

  const classExamLabel = topic.classLevel
    ? `Class: ${topic.classLevel} (${topic.board || 'MP Board / CBSE / NCERT'})`
    : `Target Exam: ${topic.examType || 'Competitive Exams'}`;

  coverPage.drawText(`SUBJECT   : ${cleanPdfText(topic.subject)}`, {
    x: 70,
    y: metaY - 15,
    size: 11,
    font: fontBold,
    color: lightGold,
  });

  coverPage.drawText(`CHAPTER   : ${cleanPdfText(topic.chapter)}`, {
    x: 70,
    y: metaY - 35,
    size: 10,
    font: fontRegular,
    color: whiteColor,
  });

  coverPage.drawText(`TARGET    : ${classExamLabel} | DIFFICULTY: ${topic.difficulty}`, {
    x: 70,
    y: metaY - 55,
    size: 10,
    font: fontRegular,
    color: rgb(0.75, 0.85, 0.98),
  });

  // 6 Core Dimensions Summary Box
  const summaryBoxY = metaY - 245;
  coverPage.drawRectangle({
    x: 55,
    y: summaryBoxY,
    width: width - 110,
    height: 155,
    color: rgb(0.06, 0.12, 0.24),
    borderColor: goldColor,
    borderWidth: 1,
  });

  coverPage.drawText('THE 6 CORE DIMENSIONS OF UNDERSTANDING:', {
    x: 70,
    y: summaryBoxY + 130,
    size: 11,
    font: fontBold,
    color: goldColor,
  });

  const dimensions = [
    'TAB 1: KYA / WHAT       - Core Definition, Concept & Foundational Analogy',
    'TAB 2: KYU / WHY        - Critical Importance & Planetary Significance',
    'TAB 3: KAISE / HOW      - Step-by-Step Mechanism & Working Stages',
    'TAB 4: KIS LIYE / PURPOSE - Real-World Applications & Practical Cases',
    'TAB 5: CURRENT PROBLEM  - Ground Realities, Real News/Data & Exam Pitfalls',
    'TAB 6: BEST SOLUTION   - 360 Innovations, Govt Schemes & Action Takeaways',
    'END  : QUIZ & ANALYSIS - Real Time Concept Check with Answer Keys',
  ];

  let dimY = summaryBoxY + 105;
  for (const d of dimensions) {
    coverPage.drawText(d, {
      x: 70,
      y: dimY,
      size: 9,
      font: fontRegular,
      color: whiteColor,
    });
    dimY -= 15;
  }

  coverPage.drawText('Universal Village & Urban Access - Zero Rote Learning Guarantee', {
    x: 55,
    y: 50,
    size: 9,
    font: fontOblique,
    color: lightGold,
  });

  // ==========================================
  // PAGE 2: TAB 1 - KYA / WHAT
  // ==========================================
  const pageKya = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageKya,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 1 OF 6: KYA / WHAT (FOUNDATIONAL CONCEPT)',
    lang,
    { r: 0.96, g: 0.62, b: 0.04 }
  );

  let p2Y = height - 125;

  // Title Box
  pageKya.drawRectangle({
    x: 35,
    y: p2Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageKya.drawText(`1. ${cleanPdfText(getTextForLang(fw.kya.title, lang))}`, {
    x: 45,
    y: p2Y - 18,
    size: 13,
    font: fontBold,
    color: goldColor,
  });

  p2Y -= 55;

  // Core Content Paragraph
  pageKya.drawText('Core Definition & Conceptual Framework:', {
    x: 35,
    y: p2Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p2Y -= 18;

  const kyaContent = cleanPdfText(getTextForLang(fw.kya.content, lang));
  const wrappedKya = wrapText(kyaContent, 76);
  for (const line of wrappedKya) {
    pageKya.drawText(line, {
      x: 35,
      y: p2Y,
      size: 10,
      font: fontRegular,
      color: darkGray,
    });
    p2Y -= 15;
  }

  p2Y -= 15;

  // Key Pillars
  const pillars = getArrayForLang(fw.kya.bulletPoints, lang);
  if (pillars.length > 0) {
    pageKya.drawRectangle({
      x: 35,
      y: p2Y - (pillars.length * 28 + 25),
      width: width - 70,
      height: pillars.length * 28 + 30,
      color: rgb(0.92, 0.95, 0.99),
      borderColor: rgb(0.7, 0.8, 0.95),
      borderWidth: 1,
    });

    pageKya.drawText('KEY PILLARS & ESSENTIAL PRINCIPLES:', {
      x: 50,
      y: p2Y - 10,
      size: 10.5,
      font: fontBold,
      color: rgb(0.04, 0.10, 0.22),
    });

    let pilY = p2Y - 30;
    for (const pil of pillars) {
      const wrappedPil = wrapText(cleanPdfText(pil), 70);
      for (let i = 0; i < wrappedPil.length; i++) {
        pageKya.drawText(i === 0 ? `* ${wrappedPil[i]}` : `  ${wrappedPil[i]}`, {
          x: 50,
          y: pilY,
          size: 9.5,
          font: fontRegular,
          color: darkGray,
        });
        pilY -= 13;
      }
      pilY -= 2;
    }

    p2Y = pilY - 20;
  }

  // Everyday Analogy Box
  const analogy = cleanPdfText(getTextForLang(fw.kya.analogy, lang));
  if (analogy && p2Y > 100) {
    pageKya.drawRectangle({
      x: 35,
      y: p2Y - 80,
      width: width - 70,
      height: 80,
      color: rgb(1.0, 0.97, 0.88),
      borderColor: goldColor,
      borderWidth: 1,
    });

    pageKya.drawText('EVERYDAY INTUITIVE ANALOGY (Visual Concept):', {
      x: 50,
      y: p2Y - 18,
      size: 10,
      font: fontBold,
      color: rgb(0.8, 0.4, 0.0),
    });

    const wrappedAnalogy = wrapText(analogy, 72);
    let anaY = p2Y - 35;
    for (const aline of wrappedAnalogy.slice(0, 3)) {
      pageKya.drawText(aline, {
        x: 50,
        y: anaY,
        size: 9.5,
        font: fontOblique,
        color: rgb(0.2, 0.2, 0.25),
      });
      anaY -= 14;
    }
  }

  // ==========================================
  // PAGE 3: TAB 2 - KYU / WHY
  // ==========================================
  const pageKyu = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageKyu,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 2 OF 6: KYU / WHY (CRITICAL SIGNIFICANCE)',
    lang,
    { r: 0.2, g: 0.4, b: 0.9 }
  );

  let p3Y = height - 125;

  pageKyu.drawRectangle({
    x: 35,
    y: p3Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageKyu.drawText(`2. ${cleanPdfText(getTextForLang(fw.kyu.title, lang))}`, {
    x: 45,
    y: p3Y - 18,
    size: 13,
    font: fontBold,
    color: rgb(0.4, 0.7, 1.0),
  });

  p3Y -= 55;

  pageKyu.drawText('Why is this concept fundamental? (Deep Analytical Reasoning):', {
    x: 35,
    y: p3Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p3Y -= 18;

  const kyuContent = cleanPdfText(getTextForLang(fw.kyu.content, lang));
  const wrappedKyu = wrapText(kyuContent, 76);
  for (const line of wrappedKyu) {
    pageKyu.drawText(line, {
      x: 35,
      y: p3Y,
      size: 10,
      font: fontRegular,
      color: darkGray,
    });
    p3Y -= 15;
  }

  p3Y -= 20;

  // Critical Planetary & Human Significance Box
  const critReason = cleanPdfText(getTextForLang(fw.kyu.criticalReason, lang));
  if (critReason) {
    pageKyu.drawRectangle({
      x: 35,
      y: p3Y - 120,
      width: width - 70,
      height: 120,
      color: rgb(0.93, 0.96, 1.0),
      borderColor: rgb(0.2, 0.5, 0.9),
      borderWidth: 1.5,
    });

    pageKyu.drawText('CRITICAL & PLANETARY SIGNIFICANCE:', {
      x: 50,
      y: p3Y - 20,
      size: 10.5,
      font: fontBold,
      color: rgb(0.1, 0.3, 0.7),
    });

    const wrappedCrit = wrapText(critReason, 72);
    let critY = p3Y - 40;
    for (const cline of wrappedCrit) {
      pageKyu.drawText(cline, {
        x: 50,
        y: critY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.1, 0.15, 0.25),
      });
      critY -= 14;
    }

    p3Y -= 150;
  }

  // Why Rote Learning Fails Box
  pageKyu.drawRectangle({
    x: 35,
    y: p3Y - 90,
    width: width - 70,
    height: 90,
    color: rgb(0.98, 0.94, 0.94),
    borderColor: rgb(0.9, 0.3, 0.3),
    borderWidth: 1,
  });

  pageKyu.drawText('WHY ROTE LEARNING FAILS HERE (Examiner Trap):', {
    x: 50,
    y: p3Y - 20,
    size: 10,
    font: fontBold,
    color: rgb(0.8, 0.2, 0.2),
  });

  const trapText = wrapText(
    'Students who simply memorize definitions cannot solve application-based questions or explain consequences. Understanding WHY creates permanent neurological connections.',
    72
  );
  let trapY = p3Y - 38;
  for (const tline of trapText) {
    pageKyu.drawText(tline, {
      x: 50,
      y: trapY,
      size: 9,
      font: fontRegular,
      color: darkGray,
    });
    trapY -= 13;
  }

  // ==========================================
  // PAGE 4: TAB 3 - KAISE / HOW
  // ==========================================
  const pageKaise = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageKaise,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 3 OF 6: KAISE / HOW (STEP-BY-STEP MECHANISM)',
    lang,
    { r: 0.1, g: 0.7, b: 0.4 }
  );

  let p4Y = height - 125;

  pageKaise.drawRectangle({
    x: 35,
    y: p4Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageKaise.drawText(`3. ${cleanPdfText(getTextForLang(fw.kaise.title, lang))}`, {
    x: 45,
    y: p4Y - 18,
    size: 13,
    font: fontBold,
    color: rgb(0.3, 0.9, 0.5),
  });

  p4Y -= 55;

  pageKaise.drawText('Sequential Operational Mechanism & Process Breakdown:', {
    x: 35,
    y: p4Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p4Y -= 20;

  for (const step of fw.kaise.steps) {
    if (p4Y < 90) break;

    const stepTitle = cleanPdfText(getTextForLang(step.title, lang));
    const stepDesc = cleanPdfText(getTextForLang(step.description, lang));

    pageKaise.drawRectangle({
      x: 35,
      y: p4Y - 65,
      width: width - 70,
      height: 65,
      color: rgb(0.94, 0.98, 0.95),
      borderColor: rgb(0.2, 0.6, 0.3),
      borderWidth: 1,
    });

    pageKaise.drawText(`STEP ${step.stepNumber}: ${stepTitle}`, {
      x: 50,
      y: p4Y - 18,
      size: 10.5,
      font: fontBold,
      color: rgb(0.05, 0.4, 0.2),
    });

    const wrappedDesc = wrapText(stepDesc, 72);
    let sY = p4Y - 34;
    for (const dline of wrappedDesc.slice(0, 2)) {
      pageKaise.drawText(dline, {
        x: 50,
        y: sY,
        size: 9.5,
        font: fontRegular,
        color: darkGray,
      });
      sY -= 13;
    }

    p4Y -= 75;
  }

  // ==========================================
  // PAGE 5: TAB 4 - KIS LIYE / PURPOSE
  // ==========================================
  const pageKisLiye = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageKisLiye,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 4 OF 6: KIS LIYE / PURPOSE (PRACTICAL APPLICATIONS)',
    lang,
    { r: 0.6, g: 0.2, b: 0.8 }
  );

  let p5Y = height - 125;

  pageKisLiye.drawRectangle({
    x: 35,
    y: p5Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageKisLiye.drawText(`4. ${cleanPdfText(getTextForLang(fw.kisLiye.title, lang))}`, {
    x: 45,
    y: p5Y - 18,
    size: 13,
    font: fontBold,
    color: rgb(0.8, 0.5, 1.0),
  });

  p5Y -= 55;

  pageKisLiye.drawText('Real-World, Industrial & Everyday Applications:', {
    x: 35,
    y: p5Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p5Y -= 20;

  const apps = getArrayForLang(fw.kisLiye.applications, lang);
  for (const app of apps) {
    if (p5Y < 120) break;

    pageKisLiye.drawRectangle({
      x: 35,
      y: p5Y - 40,
      width: width - 70,
      height: 40,
      color: rgb(0.96, 0.94, 0.99),
      borderColor: rgb(0.5, 0.2, 0.7),
      borderWidth: 1,
    });

    const wrappedApp = wrapText(cleanPdfText(app), 70);
    let appLineY = p5Y - 16;
    for (let i = 0; i < wrappedApp.length; i++) {
      pageKisLiye.drawText(i === 0 ? `[+] ${wrappedApp[i]}` : `    ${wrappedApp[i]}`, {
        x: 50,
        y: appLineY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.15, 0.1, 0.25),
      });
      appLineY -= 13;
    }
    p5Y -= 48;
  }

  // Real-Life Concrete Case Study Box
  const realLife = cleanPdfText(getTextForLang(fw.kisLiye.realLifeExample, lang));
  if (realLife && p5Y > 100) {
    p5Y -= 10;
    pageKisLiye.drawRectangle({
      x: 35,
      y: p5Y - 100,
      width: width - 70,
      height: 100,
      color: rgb(0.93, 0.90, 0.98),
      borderColor: rgb(0.6, 0.2, 0.8),
      borderWidth: 1.5,
    });

    pageKisLiye.drawText('PRACTICAL CASE STUDY / CONCRETE EXAMPLE:', {
      x: 50,
      y: p5Y - 20,
      size: 10.5,
      font: fontBold,
      color: rgb(0.4, 0.1, 0.6),
    });

    const wrappedReal = wrapText(realLife, 72);
    let realY = p5Y - 38;
    for (const rline of wrappedReal.slice(0, 4)) {
      pageKisLiye.drawText(rline, {
        x: 50,
        y: realY,
        size: 9.5,
        font: fontRegular,
        color: darkGray,
      });
      realY -= 14;
    }
  }

  // ==========================================
  // PAGE 6: TAB 5 - CURRENT PROBLEM (Real News & Data)
  // ==========================================
  const pageProblem = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageProblem,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 5 OF 6: CURRENT PROBLEM (REAL NEWS & GROUND DATA)',
    lang,
    { r: 0.9, g: 0.2, b: 0.2 }
  );

  let p6Y = height - 125;

  pageProblem.drawRectangle({
    x: 35,
    y: p6Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageProblem.drawText(`5. ${cleanPdfText(getTextForLang(fw.currentProblem.title, lang))}`, {
    x: 45,
    y: p6Y - 18,
    size: 13,
    font: fontBold,
    color: rgb(1.0, 0.4, 0.4),
  });

  p6Y -= 55;

  pageProblem.drawText('Ground Realities, Statistical Data & Environmental/Practical Issues:', {
    x: 35,
    y: p6Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p6Y -= 20;

  const issues = getArrayForLang(fw.currentProblem.issues, lang);
  for (const issue of issues) {
    if (p6Y < 140) break;

    pageProblem.drawRectangle({
      x: 35,
      y: p6Y - 48,
      width: width - 70,
      height: 48,
      color: rgb(0.99, 0.93, 0.93),
      borderColor: rgb(0.85, 0.2, 0.2),
      borderWidth: 1,
    });

    const wrappedIssue = wrapText(cleanPdfText(issue), 70);
    let issueY = p6Y - 16;
    for (let i = 0; i < wrappedIssue.length; i++) {
      pageProblem.drawText(i === 0 ? `[!] ${wrappedIssue[i]}` : `    ${wrappedIssue[i]}`, {
        x: 50,
        y: issueY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.3, 0.05, 0.05),
      });
      issueY -= 13;
    }
    p6Y -= 56;
  }

  // Misconception & Myth Buster Box
  const misc = cleanPdfText(getTextForLang(fw.currentProblem.misconceptions, lang));
  if (misc && p6Y > 100) {
    p6Y -= 10;
    pageProblem.drawRectangle({
      x: 35,
      y: p6Y - 110,
      width: width - 70,
      height: 110,
      color: rgb(1.0, 0.95, 0.88),
      borderColor: rgb(0.9, 0.5, 0.0),
      borderWidth: 1.5,
    });

    pageProblem.drawText('COMMON STUDENT MISCONCEPTION & MYTH BUSTER:', {
      x: 50,
      y: p6Y - 20,
      size: 10.5,
      font: fontBold,
      color: rgb(0.8, 0.3, 0.0),
    });

    const wrappedMisc = wrapText(misc, 72);
    let miscY = p6Y - 40;
    for (const mline of wrappedMisc.slice(0, 4)) {
      pageProblem.drawText(mline, {
        x: 50,
        y: miscY,
        size: 9.5,
        font: fontRegular,
        color: darkGray,
      });
      miscY -= 14;
    }
  }

  // ==========================================
  // PAGE 7: TAB 6 - BEST SOLUTION
  // ==========================================
  const pageSolution = pdfDoc.addPage([595.28, 841.89]);
  drawContentPageHeader(
    pageSolution,
    fontBold,
    fontRegular,
    topicTitleClean,
    'DIMENSION 6 OF 6: BEST SOLUTION (360° INNOVATION & REFORM)',
    lang,
    { r: 0.96, g: 0.62, b: 0.04 }
  );

  let p7Y = height - 125;

  pageSolution.drawRectangle({
    x: 35,
    y: p7Y - 30,
    width: width - 70,
    height: 35,
    color: rgb(0.04, 0.10, 0.22),
  });

  pageSolution.drawText(`6. ${cleanPdfText(getTextForLang(fw.bestSolution.title, lang))}`, {
    x: 45,
    y: p7Y - 18,
    size: 13,
    font: fontBold,
    color: goldColor,
  });

  p7Y -= 55;

  pageSolution.drawText('Actionable Innovations, Scientific Reforms & Govt Initiatives:', {
    x: 35,
    y: p7Y,
    size: 11,
    font: fontBold,
    color: rgb(0.04, 0.10, 0.22),
  });
  p7Y -= 20;

  const innovations = getArrayForLang(fw.bestSolution.innovations, lang);
  for (const inno of innovations) {
    if (p7Y < 140) break;

    pageSolution.drawRectangle({
      x: 35,
      y: p7Y - 48,
      width: width - 70,
      height: 48,
      color: rgb(0.95, 0.98, 0.95),
      borderColor: rgb(0.2, 0.65, 0.3),
      borderWidth: 1,
    });

    const wrappedInno = wrapText(cleanPdfText(inno), 70);
    let innoY = p7Y - 16;
    for (let i = 0; i < wrappedInno.length; i++) {
      pageSolution.drawText(i === 0 ? `[*] ${wrappedInno[i]}` : `    ${wrappedInno[i]}`, {
        x: 50,
        y: innoY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.05, 0.25, 0.1),
      });
      innoY -= 13;
    }
    p7Y -= 56;
  }

  // Student Actionable Takeaway Box
  const takeaway = cleanPdfText(getTextForLang(fw.bestSolution.actionableTakeaway, lang));
  if (takeaway && p7Y > 100) {
    p7Y -= 10;
    pageSolution.drawRectangle({
      x: 35,
      y: p7Y - 110,
      width: width - 70,
      height: 110,
      color: rgb(1.0, 0.97, 0.88),
      borderColor: goldColor,
      borderWidth: 1.5,
    });

    pageSolution.drawText('STUDENT ACTIONABLE RESOLUTION & STRATEGY:', {
      x: 50,
      y: p7Y - 20,
      size: 10.5,
      font: fontBold,
      color: rgb(0.8, 0.4, 0.0),
    });

    const wrappedTakeaway = wrapText(takeaway, 72);
    let takeY = p7Y - 40;
    for (const tline of wrappedTakeaway.slice(0, 4)) {
      pageSolution.drawText(tline, {
        x: 50,
        y: takeY,
        size: 9.5,
        font: fontRegular,
        color: darkGray,
      });
      takeY -= 14;
    }
  }

  // ==========================================
  // PAGE 8+: QUIZ & EXPLANATION KEY AT END
  // ==========================================
  const quizQuestions = topic.quiz || [];
  if (quizQuestions.length > 0) {
    const pageQuiz = pdfDoc.addPage([595.28, 841.89]);
    drawContentPageHeader(
      pageQuiz,
      fontBold,
      fontRegular,
      topicTitleClean,
      '360° CONCEPT MASTERY QUIZ & EXPLANATION KEY',
      lang,
      { r: 0.96, g: 0.62, b: 0.04 }
    );

    let p8Y = height - 125;

    pageQuiz.drawRectangle({
      x: 35,
      y: p8Y - 30,
      width: width - 70,
      height: 35,
      color: rgb(0.04, 0.10, 0.22),
    });

    pageQuiz.drawText('CRITICAL 360° TEST QUESTIONS & DETAILED ANSWERS', {
      x: 45,
      y: p8Y - 18,
      size: 12,
      font: fontBold,
      color: goldColor,
    });

    p8Y -= 55;

    for (let i = 0; i < quizQuestions.length; i++) {
      if (p8Y < 120) break;

      const q = quizQuestions[i];
      const qText = cleanPdfText(getTextForLang(q.question, lang));
      const opts = getArrayForLang(q.options, lang);
      const explanation = cleanPdfText(getTextForLang(q.explanation, lang));

      // Question Box
      pageQuiz.drawRectangle({
        x: 35,
        y: p8Y - 120,
        width: width - 70,
        height: 120,
        color: rgb(0.95, 0.97, 1.0),
        borderColor: rgb(0.7, 0.8, 0.95),
        borderWidth: 1,
      });

      pageQuiz.drawText(`Q${i + 1}: ${qText.slice(0, 80)}`, {
        x: 45,
        y: p8Y - 18,
        size: 10,
        font: fontBold,
        color: rgb(0.05, 0.15, 0.35),
      });

      let optY = p8Y - 34;
      const optLabels = ['A', 'B', 'C', 'D'];
      const cIdx = q.correctIndex !== undefined ? q.correctIndex : (q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : 0);
      for (let oi = 0; oi < Math.min(opts.length, 4); oi++) {
        const isCorrect = oi === cIdx;
        const optText = cleanPdfText(opts[oi] || '');
        pageQuiz.drawText(`(${optLabels[oi] || 'A'}) ${optText.slice(0, 42)}`, {
          x: oi % 2 === 0 ? 45 : 300,
          y: oi < 2 ? optY : optY - 14,
          size: 8.5,
          font: isCorrect ? fontBold : fontRegular,
          color: isCorrect ? rgb(0.05, 0.5, 0.15) : darkGray,
        });
      }

      optY -= 32;

      // Correct Answer & Explanation
      pageQuiz.drawText(`CORRECT: Option (${optLabels[cIdx] || 'A'})`, {
        x: 45,
        y: optY,
        size: 8.5,
        font: fontBold,
        color: rgb(0.05, 0.5, 0.15),
      });

      const expLines = wrapText(`Explanation: ${explanation}`, 70);
      let expY = optY - 13;
      for (const el of expLines.slice(0, 2)) {
        pageQuiz.drawText(el, {
          x: 45,
          y: expY,
          size: 8,
          font: fontOblique,
          color: rgb(0.2, 0.25, 0.35),
        });
        expY -= 11;
      }

      p8Y -= 135;
    }
  }

  return await pdfDoc.save();
}

export async function generateMockExamAnalysisPdf(
  config: MockExamConfig,
  score: number,
  totalMarks: number,
  correctCount: number,
  wrongCount: number,
  unattemptedCount: number,
  rank: number,
  totalCandidates: number,
  questions: QuizQuestion[],
  userAnswers: Record<string, number>,
  lang: Language
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Page 1: Official Scorecard & Performance Diagnostic
  let page = pdfDoc.addPage([595.28, 841.89]);
  let { width, height } = page.getSize();

  // Dark Navy + Gold Header Banner
  page.drawRectangle({
    x: 0,
    y: height - 105,
    width,
    height: 105,
    color: rgb(0.01, 0.04, 0.12),
  });

  page.drawRectangle({
    x: 0,
    y: height - 108,
    width,
    height: 3,
    color: rgb(0.96, 0.62, 0.04), // Gold line
  });

  page.drawText('JITOMNI 360° EDUCATION - CBT MOCK TEST SCORECARD', {
    x: 30,
    y: height - 38,
    size: 15,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  const examTitleText = getTextForLang(config?.title, lang) || config?.examName || 'Competitive Exam';

  page.drawText(`Target Exam: ${cleanPdfText(examTitleText)}`, {
    x: 30,
    y: height - 60,
    size: 11,
    font: fontRegular,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Candidate: Aspirant | Date: ${new Date().toLocaleDateString()} | Language: ${lang.toUpperCase()}`, {
    x: 30,
    y: height - 80,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.75, 0.82, 0.95),
  });

  // Score & Rank Big Diagnostic Box
  let y = height - 130;
  page.drawRectangle({
    x: 30,
    y: y - 120,
    width: width - 60,
    height: 120,
    color: rgb(0.96, 0.98, 1.0),
    borderColor: rgb(0.96, 0.62, 0.04),
    borderWidth: 1.5,
  });

  page.drawText(`YOUR TOTAL SCORE: ${score.toFixed(2)} / ${totalMarks.toFixed(2)}`, {
    x: 48,
    y: y - 28,
    size: 16,
    font: fontBold,
    color: rgb(0.05, 0.15, 0.45),
  });

  page.drawText(`ESTIMATED ALL-INDIA RANK: #${rank.toLocaleString()} (in ${totalCandidates.toLocaleString()} Aspirants)`, {
    x: 48,
    y: y - 52,
    size: 12,
    font: fontBold,
    color: rgb(0.85, 0.35, 0.0),
  });

  // 3 Colored Sub-boxes for Kitne Sahi, Kitne Galat, Chhute Hue
  const boxWidth = (width - 120) / 3;
  
  // Correct Box (Green)
  page.drawRectangle({
    x: 48,
    y: y - 110,
    width: boxWidth,
    height: 46,
    color: rgb(0.9, 0.98, 0.92),
    borderColor: rgb(0.15, 0.6, 0.25),
    borderWidth: 1,
  });
  page.drawText('KITNE SAHI', { x: 56, y: y - 80, size: 8.5, font: fontBold, color: rgb(0.1, 0.5, 0.2) });
  page.drawText(`${correctCount} Questions`, { x: 56, y: y - 98, size: 12, font: fontBold, color: rgb(0.05, 0.4, 0.15) });

  // Wrong Box (Red)
  page.drawRectangle({
    x: 48 + boxWidth + 12,
    y: y - 110,
    width: boxWidth,
    height: 46,
    color: rgb(1.0, 0.93, 0.93),
    borderColor: rgb(0.8, 0.2, 0.2),
    borderWidth: 1,
  });
  page.drawText('KITNE GALAT', { x: 56 + boxWidth + 12, y: y - 80, size: 8.5, font: fontBold, color: rgb(0.8, 0.1, 0.1) });
  page.drawText(`${wrongCount} Questions`, { x: 56 + boxWidth + 12, y: y - 98, size: 12, font: fontBold, color: rgb(0.7, 0.05, 0.05) });

  // Unattempted Box (Gray)
  page.drawRectangle({
    x: 48 + (boxWidth + 12) * 2,
    y: y - 110,
    width: boxWidth,
    height: 46,
    color: rgb(0.95, 0.95, 0.97),
    borderColor: rgb(0.5, 0.55, 0.65),
    borderWidth: 1,
  });
  page.drawText('CHHUTE HUE', { x: 56 + (boxWidth + 12) * 2, y: y - 80, size: 8.5, font: fontBold, color: rgb(0.35, 0.4, 0.5) });
  page.drawText(`${unattemptedCount} Questions`, { x: 56 + (boxWidth + 12) * 2, y: y - 98, size: 12, font: fontBold, color: rgb(0.25, 0.3, 0.4) });

  y -= 145;

  page.drawText('360° COMPREHENSIVE QUESTION-BY-QUESTION SOLUTIONS & ANALYSIS:', {
    x: 30,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.01, 0.04, 0.12),
  });

  y -= 20;

  // Render question solutions with multi-page handling
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const userAns = userAnswers[q.id];
    const isCorrect = userAns === q.correctIndex;
    const isUnattempted = userAns === undefined;

    // Check if we need a new page
    if (y < 120) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - 50;

      // Small top banner for continuation pages
      page.drawRectangle({
        x: 0,
        y: height - 40,
        width,
        height: 40,
        color: rgb(0.01, 0.04, 0.12),
      });

      page.drawText(`JITOMNI 360° - ${cleanPdfText(examTitleText)} (Analysis Page)`, {
        x: 30,
        y: height - 25,
        size: 10,
        font: fontBold,
        color: rgb(0.96, 0.62, 0.04),
      });
      y = height - 65;
    }

    const statusBadge = isCorrect
      ? 'CORRECT (+Marks)'
      : isUnattempted
      ? 'UNATTEMPTED (0 Marks)'
      : 'INCORRECT / NEGATIVE MARKED';
    
    const badgeColor = isCorrect
      ? rgb(0.05, 0.5, 0.2)
      : isUnattempted
      ? rgb(0.4, 0.45, 0.55)
      : rgb(0.8, 0.1, 0.1);

    // Question Number & Text
    const qText = getTextForLang(q.question, lang) || (typeof q.question === 'string' ? q.question : '');
    const qLines = wrapText(`Q${i + 1}. ${cleanPdfText(qText)}`, 78);
    for (const ql of qLines) {
      page.drawText(ql, {
        x: 30,
        y,
        size: 9.5,
        font: fontBold,
        color: rgb(0.05, 0.1, 0.2),
      });
      y -= 12;
    }

    // Status Line
    page.drawText(`Status: ${statusBadge}`, {
      x: 38,
      y,
      size: 8.5,
      font: fontBold,
      color: badgeColor,
    });

    const opts = getArrayForLang(q.options, lang);
    const correctOptText = opts[q.correctIndex] || (Array.isArray(q.options) ? String(q.options[q.correctIndex] || '') : '');
    page.drawText(` | Correct Option: ${String.fromCharCode(65 + q.correctIndex)}. ${cleanPdfText(correctOptText)}`, {
      x: 38 + fontBold.widthOfTextAtSize(`Status: ${statusBadge}`, 8.5) + 4,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.1, 0.15, 0.25),
    });
    y -= 12;

    if (!isCorrect && !isUnattempted) {
      const chosenOptText = opts[userAns] || (Array.isArray(q.options) ? String(q.options[userAns] || '') : '');
      page.drawText(`Your Marked Choice: Option ${String.fromCharCode(65 + userAns)}. ${cleanPdfText(chosenOptText)} (Mistake/Trap)`, {
        x: 38,
        y,
        size: 8,
        font: fontRegular,
        color: rgb(0.7, 0.1, 0.1),
      });
      y -= 11;
    }

    // 360° Explanation
    const expText = getTextForLang(q.explanation, lang) || (typeof q.explanation === 'string' ? q.explanation : '');
    const expLines = wrapText(`360° Solution: ${cleanPdfText(expText)}`, 78);
    for (const el of expLines) {
      page.drawText(el, {
        x: 38,
        y,
        size: 8,
        font: fontRegular,
        color: rgb(0.25, 0.3, 0.4),
      });
      y -= 10.5;
    }

    y -= 10; // Spacing between questions
  }

  return await pdfDoc.save();
}

export function downloadPdfBlob(pdfBytes: Uint8Array, filename: string) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

