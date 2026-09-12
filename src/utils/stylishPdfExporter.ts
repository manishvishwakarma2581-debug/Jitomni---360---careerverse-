import { Language } from '../types';

/**
 * Utility to export AI-generated responses (JITOMNI PRIME & AI MENTOR)
 * into a publication-grade, Vision IAS magazine-styled PDF or printable dossier.
 * Fully supports Hindi (Devanagari), English, callout boxes, comparison tables,
 * and typographic bullet chains.
 */
export function exportStylishVisionIasPdf(options: {
  title: string;
  markdownContent: string;
  lang?: Language;
  authorBadge?: string;
  paperLinkage?: string;
}) {
  const {
    title,
    markdownContent,
    lang = 'hi',
    authorBadge = 'JITOMNI 360° SOVEREIGN AI • VISION IAS EDITORIAL DOSSIER',
    paperLinkage = 'UPSC CSE / STATE PSC / COMPETITIVE EXAM HIGH-YIELD MATERIAL',
  } = options;

  // Convert markdown to clean, styled HTML for publication
  const formattedHtml = convertMarkdownToVisionIasHtml(markdownContent);

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fullDocumentHtml = `<!DOCTYPE html>
<html lang="${lang === 'en' ? 'en' : 'hi'}">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)} - JITOMNI Vision IAS Dossier</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Outfit:wght@400;500;600;700;800&family=Tiro+Devanagari+Hindi:ital@0;1&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 14mm 14mm 16mm 14mm;
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-family: 'Outfit', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 20px;
      font-family: 'Outfit', 'Tiro Devanagari Hindi', -apple-system, sans-serif;
      font-size: 10.5pt;
      line-height: 1.6;
      color: #0f172a;
      background: #ffffff;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
    }

    /* Masthead - Vision IAS Publication Style */
    .masthead {
      border-bottom: 3px double #b45309;
      padding-bottom: 12px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
    }

    .masthead-left {
      flex: 1;
    }

    .badge-ribbon {
      display: inline-block;
      background: #0f172a;
      color: #fbbf24;
      font-family: 'Cinzel', serif;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 1.2px;
      padding: 3px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .main-title {
      font-family: 'Cinzel', 'Tiro Devanagari Hindi', serif;
      font-size: 18pt;
      font-weight: 900;
      color: #0f172a;
      margin: 4px 0;
      line-height: 1.25;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .masthead-meta {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 600;
    }

    .masthead-right {
      text-align: right;
      font-size: 8pt;
      color: #475569;
      border-left: 2px solid #e2e8f0;
      padding-left: 14px;
      line-height: 1.4;
    }

    .verified-seal {
      display: inline-block;
      color: #059669;
      font-weight: 800;
      font-size: 8pt;
      border: 1px solid #10b981;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 4px;
      background: #ecfdf5;
    }

    /* Typography & Hierarchy */
    h1 {
      font-family: 'Cinzel', 'Tiro Devanagari Hindi', serif;
      font-size: 15pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      margin: 20px 0 10px 0;
      border-bottom: 1.5px solid #d97706;
      padding-bottom: 4px;
      page-break-after: avoid;
    }

    h2 {
      font-family: 'Outfit', 'Tiro Devanagari Hindi', sans-serif;
      font-size: 12.5pt;
      font-weight: 800;
      color: #1e293b;
      margin: 16px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      page-break-after: avoid;
    }

    h2::before {
      content: "✦";
      color: #d97706;
      font-size: 11pt;
    }

    h3 {
      font-size: 11pt;
      font-weight: 700;
      color: #334155;
      margin: 12px 0 6px 0;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 10px 0;
      text-align: justify;
      hyphens: auto;
    }

    strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* Vision IAS Callout Box */
    .callout-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-left: 5px solid #d97706;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 14px 0;
      page-break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .callout-box-header {
      font-size: 8.5pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .callout-box-content {
      font-size: 9.5pt;
      color: #78350f;
      line-height: 1.5;
    }

    /* Flow Chains (Sequential Steps) */
    .flow-chain-container {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin: 12px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      page-break-inside: avoid;
    }

    .flow-step-pill {
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-left: 3px solid #0284c7;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }

    .flow-arrow-separator {
      color: #d97706;
      font-weight: 900;
      font-size: 11pt;
    }

    /* Bullet lists */
    ul {
      margin: 6px 0 12px 0;
      padding-left: 18px;
      list-style-type: none;
    }

    li {
      position: relative;
      margin-bottom: 6px;
      padding-left: 6px;
      text-align: justify;
    }

    li::before {
      content: "✦";
      position: absolute;
      left: -14px;
      color: #d97706;
      font-size: 9pt;
      top: 1px;
    }

    /* Comparison Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 9pt;
      page-break-inside: avoid;
    }

    th {
      background: #0f172a;
      color: #fbbf24;
      font-weight: 800;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #1e293b;
      font-family: 'Outfit', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 8.5pt;
    }

    td {
      padding: 7px 10px;
      border: 1px solid #cbd5e1;
      color: #334155;
      line-height: 1.45;
    }

    tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Watermark / Footer */
    .footer-bar {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8pt;
      color: #64748b;
    }

    .no-print-toolbar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #0f172a;
      padding: 10px 16px;
      border-radius: 30px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      display: flex;
      gap: 10px;
      z-index: 9999;
    }

    .print-btn {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #0f172a;
      font-weight: 800;
      font-size: 11pt;
      padding: 8px 18px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .close-btn {
      background: #334155;
      color: #ffffff;
      font-weight: 600;
      font-size: 11pt;
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
    }

    @media print {
      body {
        padding: 0;
      }
      .no-print-toolbar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Masthead -->
    <header class="masthead">
      <div class="masthead-left">
        <div class="badge-ribbon">${escapeHtml(authorBadge)}</div>
        <h1 class="main-title">${escapeHtml(title)}</h1>
        <div class="masthead-meta">
          <span>🏛️ ${escapeHtml(paperLinkage)}</span> • <span>📅 ${currentDate}</span>
        </div>
      </div>
      <div class="masthead-right">
        <div><strong>JITOMNI 360° CAREERVERSE</strong></div>
        <div>Padhai Se Kamai Tak Mission</div>
        <div class="verified-seal">✔ VERIFIED SOVEREIGN DOSSIER</div>
      </div>
    </header>

    <!-- Main Formatted Editorial Content -->
    <main>
      ${formattedHtml}
    </main>

    <!-- Footer Bar -->
    <footer class="footer-bar">
      <div>
        <strong>JITOMNI 360° SOVEREIGN EDUCATION ENGINE</strong> • Empowering 25+ Crore Indian Learners Without Coaching Barrier
      </div>
      <div>
        100% Free & Open Access • Official Gazette Standards
      </div>
    </footer>
  </div>

  <!-- Interactive Print Floating Controls -->
  <div class="no-print-toolbar">
    <button class="print-btn" onclick="window.print()">
      <span>🖨️ प्रिंट करें / PDF सेव करें (Print / Save as PDF)</span>
    </button>
    <button class="close-btn" onclick="window.close()">
      <span>बंद करें (Close)</span>
    </button>
  </div>

  <script>
    // Automatically trigger print dialog after fonts load
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print cancelled or blocked', e);
        }
      }, 700);
    });
  </script>
</body>
</html>`;

  // Try opening popup window first
  try {
    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (printWindow && printWindow.document) {
      printWindow.document.open();
      printWindow.document.write(fullDocumentHtml);
      printWindow.document.close();
      return;
    }
  } catch (err) {
    console.warn('Popup window blocked, falling back to hidden iframe or direct download', err);
  }

  // Fallback 1: Hidden iframe print if popup blocked by browser
  try {
    const hiddenIframe = document.createElement('iframe');
    hiddenIframe.style.position = 'fixed';
    hiddenIframe.style.right = '0';
    hiddenIframe.style.bottom = '0';
    hiddenIframe.style.width = '0';
    hiddenIframe.style.height = '0';
    hiddenIframe.style.border = '0';
    document.body.appendChild(hiddenIframe);

    const doc = hiddenIframe.contentWindow?.document || hiddenIframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(fullDocumentHtml);
      doc.close();
      setTimeout(() => {
        hiddenIframe.contentWindow?.focus();
        hiddenIframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(hiddenIframe);
        }, 1500);
      }, 500);
      return;
    }
  } catch (err) {
    console.warn('Hidden iframe print failed, falling back to blob download', err);
  }

  // Fallback 2: Direct file download (HTML Dossier readable by browser and printable to PDF with Ctrl+P)
  const blob = new Blob([fullDocumentHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeFilename = `JITOMNI_VisionIAS_${title.replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, '_').slice(0, 40)}.html`;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Converts rich markdown into Vision IAS magazine styled HTML elements
 */
function convertMarkdownToVisionIasHtml(markdown: string): string {
  if (!markdown) return '<p>No content available.</p>';

  const lines = markdown.split('\n');
  const outputHtml: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeaderParsed = false;
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check for Blockquote (> 📌 or > )
    if (trimmed.startsWith('>')) {
      if (!inBlockquote) {
        if (inList) { outputHtml.push('</ul>'); inList = false; }
        if (inTable) { outputHtml.push('</table>'); inTable = false; }
        inBlockquote = true;
        blockquoteContent = [];
      }
      const quoteText = trimmed.replace(/^>\s*/, '');
      blockquoteContent.push(quoteText);
      continue;
    } else if (inBlockquote) {
      // Flush blockquote
      inBlockquote = false;
      const combined = blockquoteContent.join(' ');
      const headerMatch = combined.match(/^\s*(📌\s*[\w\s\/\-_]+|CORE CONCEPT|MUST-KNOW|KEY TAKEAWAY|EXAM TIP)[:\s]*/i);
      let headerText = '📌 CORE CONCEPT / MUST-KNOW EXAM FACT';
      let bodyText = combined;
      if (headerMatch) {
        headerText = headerMatch[0].replace(/[:\s]+$/, '');
        bodyText = combined.slice(headerMatch[0].length);
      }
      outputHtml.push(`
        <div class="callout-box">
          <div class="callout-box-header">${formatInline(headerText)}</div>
          <div class="callout-box-content">${formatInline(bodyText)}</div>
        </div>
      `);
      blockquoteContent = [];
    }

    // Empty Line
    if (!trimmed) {
      if (inList) { outputHtml.push('</ul>'); inList = false; }
      if (inTable) { outputHtml.push('</table>'); inTable = false; }
      continue;
    }

    // Table Row Detection (| col 1 | col 2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        if (inList) { outputHtml.push('</ul>'); inList = false; }
        inTable = true;
        tableHeaderParsed = false;
        outputHtml.push('<table>');
      }

      // Check if it's separator row (|---|---|)
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        continue;
      }

      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      if (!tableHeaderParsed) {
        outputHtml.push('<thead><tr>');
        for (const cell of cells) {
          outputHtml.push(`<th>${formatInline(cell)}</th>`);
        }
        outputHtml.push('</tr></thead><tbody>');
        tableHeaderParsed = true;
      } else {
        outputHtml.push('<tr>');
        for (const cell of cells) {
          outputHtml.push(`<td>${formatInline(cell)}</td>`);
        }
        outputHtml.push('</tr>');
      }
      continue;
    } else if (inTable) {
      outputHtml.push('</tbody></table>');
      inTable = false;
    }

    // Flow Chains (Step A ➔ Step B ➔ Step C)
    if (trimmed.includes('➔') || (trimmed.includes('->') && !trimmed.startsWith('#'))) {
      const separator = trimmed.includes('➔') ? '➔' : '->';
      const steps = trimmed.split(separator).map((s) => s.trim()).filter(Boolean);
      if (steps.length >= 2) {
        if (inList) { outputHtml.push('</ul>'); inList = false; }
        outputHtml.push('<div class="flow-chain-container">');
        steps.forEach((step, idx) => {
          outputHtml.push(`<span class="flow-step-pill">${formatInline(step)}</span>`);
          if (idx < steps.length - 1) {
            outputHtml.push('<span class="flow-arrow-separator">➔</span>');
          }
        });
        outputHtml.push('</div>');
        continue;
      }
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      if (inList) { outputHtml.push('</ul>'); inList = false; }
      outputHtml.push(`<h1>${formatInline(trimmed.replace(/^#\s+/, ''))}</h1>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      if (inList) { outputHtml.push('</ul>'); inList = false; }
      outputHtml.push(`<h2>${formatInline(trimmed.replace(/^##\s+/, ''))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      if (inList) { outputHtml.push('</ul>'); inList = false; }
      outputHtml.push(`<h3>${formatInline(trimmed.replace(/^###\s+/, ''))}</h3>`);
      continue;
    }

    // Bullet List Items (✦, ➔, ■, ✔, -, •, *)
    if (/^([✦➔■✔•\-\*]|\d+\.)\s+/.test(trimmed)) {
      if (!inList) {
        outputHtml.push('<ul>');
        inList = true;
      }
      const itemContent = trimmed.replace(/^([✦➔■✔•\-\*]|\d+\.)\s+/, '');
      outputHtml.push(`<li>${formatInline(itemContent)}</li>`);
      continue;
    } else if (inList) {
      outputHtml.push('</ul>');
      inList = false;
    }

    // Standard Paragraph
    outputHtml.push(`<p>${formatInline(trimmed)}</p>`);
  }

  if (inList) outputHtml.push('</ul>');
  if (inTable) outputHtml.push('</tbody></table>');
  if (inBlockquote) {
    const combined = blockquoteContent.join(' ');
    outputHtml.push(`
      <div class="callout-box">
        <div class="callout-box-header">📌 CORE EXAM MUST-KNOW</div>
        <div class="callout-box-content">${formatInline(combined)}</div>
      </div>
    `);
  }

  return outputHtml.join('\n');
}

/**
 * Format inline bolding, italic, code, formulas
 */
function formatInline(text: string): string {
  if (!text) return '';
  return escapeHtml(text)
    // Bold with key term highlight
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Inline Code / Formula
    .replace(/`(.*?)`/g, '<code style="background:#f1f5f9;color:#b45309;padding:1px 5px;border-radius:4px;font-family:monospace;font-size:9pt;border:1px solid #e2e8f0;">$1</code>');
}
