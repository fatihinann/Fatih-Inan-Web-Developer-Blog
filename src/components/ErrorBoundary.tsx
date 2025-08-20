'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../../components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback 
          onReset={this.handleReset} 
          error={this.state.error} 
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ 
  onReset, 
  error 
}: { 
  onReset: () => void;
  error?: Error;
}) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-amber-900 mb-2">
            {t('error.title')}
          </h1>
          <p className="text-slate-600 mb-6">
            {t('error.description')}
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={onReset}
            className="bg-slate-700 hover:bg-slate-800 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('error.retry')}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            {t('error.reload')}
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
              Hata Detayları (Geliştirici Modu)
            </summary>
            <pre className="mt-2 p-4 bg-slate-100 rounded text-xs text-slate-700 overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}