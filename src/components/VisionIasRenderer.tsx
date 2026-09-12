import React, { useState } from 'react';
import { 
  FileDown, 
  Printer, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { exportStylishVisionIasPdf } from '../utils/stylishPdfExporter';

interface VisionIasRendererProps {
  content: string;
  title?: string;
  lang?: Language;
  onNavigateTab?: (tab: string) => void;
  className?: string;
  showExportPdf?: boolean;
}

export const VisionIasRenderer: React.FC<VisionIasRendererProps> = ({
  content,
  title = 'JITOMNI 360° Vision IAS Editorial',
  lang = 'hi',
  onNavigateTab,
  className = '',
  showExportPdf = true,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakText(content.slice(0, 300), lang);
      setIsSpeaking(true);
    }
  };

  const handleExportPdf = () => {
    exportStylishVisionIasPdf({
      title: title || 'JITOMNI 360° Sovereign AI Dossier',
      markdownContent: content,
      lang,
      authorBadge: 'JITOMNI 360° SOVEREIGN AI • VISION IAS EDITORIAL STANDARD',
      paperLinkage: 'EXHAUSTIVE EXAM STUDY MATERIAL & DOSSIER',
    });
  };

  // Parse lines into structured tokens
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let currentList: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];
  let isInsideTable = false;
  let blockquoteLines: string[] = [];
  let isInsideBlockquote = false;

  const flushList = () => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`list-${renderedElements.length}`} className="my-3 space-y-2 pl-2">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (currentTableRows.length > 0) {
      const header = currentTableRows[0];
      const rows = currentTableRows.slice(1);
      renderedElements.push(
        <div key={`table-${renderedElements.length}`} className="my-4 overflow-x-auto rounded-2xl border border-slate-700/80 shadow-xl bg-[#030B1E]">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border-b border-amber-500/40">
                {header.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 text-amber-300 font-bold uppercase tracking-wider font-heading">
                    {renderInlineFormatted(col.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors odd:bg-[#030B1E] even:bg-[#0A1931]/60">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-slate-200 leading-relaxed font-medium">
                      {renderInlineFormatted(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
      isInsideTable = false;
    }
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      const combined = blockquoteLines.join(' ');
      const match = combined.match(/^\s*(📌\s*[\w\s\/\-_]+|CORE CONCEPT|MUST-KNOW|KEY TAKEAWAY|EXAM TIP|HIGH-YIELD)[:\s]*/i);
      let header = '📌 CORE CONCEPT / MUST-KNOW EXAM FACT';
      let body = combined;
      if (match) {
        header = match[0].replace(/[:\s]+$/, '');
        body = combined.slice(match[0].length);
      }

      renderedElements.push(
        <div 
          key={`callout-${renderedElements.length}`}
          className="my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0A1931] to-[#030B1E] border-l-4 border-amber-400 border-t border-r border-b border-amber-500/30 shadow-lg shadow-amber-500/10 space-y-1.5"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-wide text-amber-300 uppercase">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{renderInlineFormatted(header)}</span>
          </div>
          <div className="text-xs sm:text-sm text-amber-100/90 leading-relaxed pl-6">
            {renderInlineFormatted(body)}
          </div>
        </div>
      );
      blockquoteLines = [];
      isInsideBlockquote = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Blockquote
    if (trimmed.startsWith('>')) {
      flushList();
      flushTable();
      isInsideBlockquote = true;
      blockquoteLines.push(trimmed.replace(/^>\s*/, ''));
      continue;
    } else if (isInsideBlockquote) {
      flushBlockquote();
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      flushBlockquote();
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        continue; // skip separator row
      }
      const cells = trimmed.slice(1, -1).split('|');
      currentTableRows.push(cells);
      isInsideTable = true;
      continue;
    } else if (isInsideTable) {
      flushTable();
    }

    // Empty line
    if (!trimmed) {
      flushList();
      flushTable();
      flushBlockquote();
      continue;
    }

    // Sequential Flow Chain with ➔ or ->
    if (trimmed.includes('➔') || (trimmed.includes('->') && !trimmed.startsWith('#'))) {
      flushList();
      flushTable();
      flushBlockquote();
      const separator = trimmed.includes('➔') ? '➔' : '->';
      const steps = trimmed.split(separator).map((s) => s.trim()).filter(Boolean);
      if (steps.length >= 2) {
        renderedElements.push(
          <div key={`flow-${renderedElements.length}`} className="my-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#030B1E] border border-cyan-500/30 shadow-md">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 mb-2 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>विज़ुअल फ्लो चेनिंग (Sequential Workflow):</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border-l-2 border-cyan-400 border-t border-r border-b border-slate-700 text-xs sm:text-sm font-bold text-slate-100 shadow-sm flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span>{renderInlineFormatted(step)}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-amber-400 font-bold text-base select-none">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
        continue;
      }
    }

    // Heading 1 (# ...)
    if (trimmed.startsWith('# ')) {
      flushList();
      flushTable();
      flushBlockquote();
      const headingText = trimmed.replace(/^#\s+/, '');
      renderedElements.push(
        <div key={`h1-${renderedElements.length}`} className="my-5 pt-2 pb-1 border-b-2 border-amber-500/40">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black text-[10px] tracking-wider uppercase border border-amber-500/40 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Vision IAS Standard</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-heading uppercase tracking-wide">
            {renderInlineFormatted(headingText)}
          </h1>
        </div>
      );
      continue;
    }

    // Heading 2 (## ...)
    if (trimmed.startsWith('## ')) {
      flushList();
      flushTable();
      flushBlockquote();
      const headingText = trimmed.replace(/^##\s+/, '');
      renderedElements.push(
        <div key={`h2-${renderedElements.length}`} className="mt-5 mb-2 flex items-center gap-2 border-b border-slate-800 pb-1.5">
          <span className="text-amber-400 text-base">✦</span>
          <h2 className="text-base sm:text-lg font-black text-amber-300 tracking-wide">
            {renderInlineFormatted(headingText)}
          </h2>
        </div>
      );
      continue;
    }

    // Heading 3 (### ...)
    if (trimmed.startsWith('### ')) {
      flushList();
      flushTable();
      flushBlockquote();
      const headingText = trimmed.replace(/^###\s+/, '');
      renderedElements.push(
        <h3 key={`h3-${renderedElements.length}`} className="mt-4 mb-1 text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>{renderInlineFormatted(headingText)}</span>
        </h3>
      );
      continue;
    }

    // Bullet list item
    if (/^([✦➔■✔•\-\*]|\d+\.)\s+/.test(trimmed)) {
      flushTable();
      flushBlockquote();
      const match = trimmed.match(/^([✦➔■✔•\-\*]|\d+\.)\s+/);
      const symbol = match ? match[1] : '✦';
      const itemContent = trimmed.replace(/^([✦➔■✔•\-\*]|\d+\.)\s+/, '');

      let bulletIcon = <span className="text-amber-400 font-bold text-xs select-none">✦</span>;
      if (symbol === '✔') {
        bulletIcon = <span className="text-emerald-400 font-bold text-xs select-none">✔</span>;
      } else if (symbol === '➔') {
        bulletIcon = <span className="text-cyan-400 font-bold text-xs select-none">➔</span>;
      } else if (symbol === '■') {
        bulletIcon = <span className="text-amber-300 font-bold text-[10px] select-none">■</span>;
      }

      currentList.push(
        <li key={`li-${currentList.length}`} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <span className="mt-1 shrink-0">{bulletIcon}</span>
          <span className="flex-1">{renderInlineFormatted(itemContent)}</span>
        </li>
      );
      continue;
    } else {
      flushList();
    }

    // Standard Paragraph
    renderedElements.push(
      <p key={`p-${renderedElements.length}`} className="my-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed text-justify">
        {renderInlineFormatted(trimmed)}
      </p>
    );
  }

  flushList();
  flushTable();
  flushBlockquote();

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Top Action Utility Toolbar */}
      {showExportPdf && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#030B1E]/90 border border-amber-500/30 shadow-md">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/30 to-blue-500/30 border border-amber-500/40 text-amber-300 font-bold text-[11px] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Vision IAS Standard Format</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline-block">
              हाई-कंट्रास्ट मैगज़ीन लेआउट
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportPdf}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              title="Download or print publication-ready PDF with stylish fonts, callout boxes and tables"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>📄 स्टाइलिश PDF / प्रिंट</span>
            </button>

            <button
              onClick={handleAudio}
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Voice narration"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Copy formatted text"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Styled Article Canvas */}
      <div className="vision-ias-content-area space-y-1">
        {renderedElements}
      </div>
    </div>
  );
};

/**
 * Format inline elements like **bold**, `code`, and key labels
 */
function renderInlineFormatted(text: string): React.ReactNode {
  if (!text) return null;

  // Split by bold (**...**)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-amber-200 underline decoration-amber-500/30 decoration-1 underline-offset-2">
          {boldText}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeText = part.slice(1, -1);
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-black/60 border border-amber-500/30 text-amber-300 font-mono text-xs">
          {codeText}
        </code>
      );
    }
    return part;
  });
}
