import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Download, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

interface MermaidDiagramProps {
  code: string;
  title?: string;
  chartType?: string;
  className?: string;
  interactive?: boolean;
}

// Initialize mermaid with dark aesthetic theme
let isMermaidInitialized = false;

function initMermaid() {
  if (!isMermaidInitialized) {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#071329',
          primaryColor: '#f59e0b',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#d97706',
          lineColor: '#38bdf8',
          secondaryColor: '#102447',
          tertiaryColor: '#0a1931',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px',
        },
        securityLevel: 'loose',
        logLevel: 'error',
      });
      isMermaidInitialized = true;
    } catch (e) {
      console.warn('Mermaid initialization warning:', e);
    }
  }
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  code,
  title,
  chartType = 'Flowchart',
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    initMermaid();
    let isMounted = true;
    setIsRendering(true);
    setError(null);

    const renderChart = async () => {
      if (!code || !code.trim()) {
        setError('No diagram syntax provided');
        setIsRendering(false);
        return;
      }

      const cleanCode = code.trim();
      const uniqueId = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;

      try {
        const { svg } = await mermaid.render(uniqueId, cleanCode);
        if (isMounted) {
          setSvgContent(svg);
          setIsRendering(false);
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err.message || 'Diagram syntax parsing error');
          setIsRendering(false);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [code]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JITOMNI_Infographic_${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-2xl border border-amber-500/30 bg-[#071329] overflow-hidden flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl bg-[#030B1E] max-w-full max-h-full' : ''
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#030B1E] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Mermaid.js Live SVG</span>
          </span>
          {title && <span className="text-white text-xs sm:text-sm font-bold truncate max-w-md">{title}</span>}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Zoom"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={handleDownloadSvg}
            title="Download SVG Infographic"
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export SVG</span>
          </button>

          <button
            onClick={handleCopyCode}
            title="Copy Mermaid Code"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Diagram Canvas Container */}
      <div
        ref={containerRef}
        className="p-4 sm:p-6 overflow-auto flex-1 min-h-[260px] flex items-center justify-center bg-gradient-to-b from-[#071329] to-[#040c1a]"
      >
        {isRendering ? (
          <div className="flex flex-col items-center gap-2 text-slate-400 py-8">
            <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span className="text-xs">Mermaid.js SVG इन्फोग्राफिक रेंडर हो रहा है...</span>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs max-w-md space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-300">
              <AlertCircle className="w-4 h-4" />
              <span>डायग्राम रेंडरिंग सूचना</span>
            </div>
            <p className="text-slate-300">{error}</p>
            <pre className="p-2 bg-slate-900/90 rounded text-[10px] text-amber-200 overflow-x-auto">{code}</pre>
          </div>
        ) : (
          <div
            className="transition-transform duration-150 origin-center flex items-center justify-center w-full max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#030B1E] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>JITOMNI Dynamic Infographic Engine (Scale: {Math.round(zoomLevel * 100)}%)</span>
        <span className="text-amber-400 font-medium">100% Interactive Vector</span>
      </div>
    </div>
  );
};
