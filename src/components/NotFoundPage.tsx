import React from 'react';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-teal-500/6 to-emerald-500/6 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-md mx-auto text-center relative z-10">
        <div className="glass-card p-8 rounded-2xl">
          {/* 404 Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <FileQuestion className="w-12 h-12 text-slate-400" />
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Page Not Found</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('landing')}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="w-full glass-button text-slate-100 py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <p className="text-xs text-slate-500">
              If you believe this is an error, please contact support or try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;