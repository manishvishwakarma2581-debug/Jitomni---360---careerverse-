import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 my-4 rounded-3xl bg-[#030B1E] border-2 border-amber-500/50 text-white shadow-2xl max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              {this.props.fallbackTitle || 'मॉड्यूल में अप्रत्याशित समस्या आई (Crash Protected)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              आपकी स्क्रीन सुरक्षित है। JITOMNI का सॉवरेन एरर रिकवरी सिस्टम सक्रिय है।
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                if (this.props.onReset) this.props.onReset();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-600 text-black font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>पुनः प्रयास करें (Reset & Retry)</span>
            </button>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-600 flex items-center gap-2 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>होम डैशबोर्ड पर जाएं</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
