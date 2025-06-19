import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, MapPin, BarChart3, Zap, ChevronDown, Github, FileText, Users, Play, CheckCircle, Clock, Sun, Moon } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isDarkMode, onToggleTheme }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} overflow-x-hidden transition-colors duration-300`}>
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 ${isDarkMode ? 'bg-gradient-to-br from-cyan-500/8 to-blue-500/8' : 'bg-gradient-to-br from-cyan-500/4 to-blue-500/4'} rounded-full blur-3xl animate-float`}></div>
        <div className={`absolute top-1/2 -left-40 w-80 h-80 ${isDarkMode ? 'bg-gradient-to-br from-teal-500/6 to-emerald-500/6' : 'bg-gradient-to-br from-teal-500/3 to-emerald-500/3'} rounded-full blur-3xl animate-float-delayed`}></div>
        <div className={`absolute bottom-0 right-1/4 w-72 h-72 ${isDarkMode ? 'bg-gradient-to-br from-indigo-500/5 to-violet-500/5' : 'bg-gradient-to-br from-indigo-500/3 to-violet-500/3'} rounded-full blur-3xl animate-pulse-slow`}></div>
        <div className={`absolute top-1/4 left-1/3 w-64 h-64 ${isDarkMode ? 'bg-gradient-to-br from-slate-600/4 to-slate-500/4' : 'bg-gradient-to-br from-slate-400/2 to-slate-300/2'} rounded-full blur-3xl animate-drift`}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-slate-100 to-slate-300' : 'bg-gradient-to-r from-slate-800 to-slate-600'} bg-clip-text text-transparent`}>Rofix</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleTheme}
                className={`p-2.5 glass-button ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} rounded-xl transition-all duration-300 hover:scale-105`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => onNavigate('login')}
                className={`px-5 py-2.5 glass-button ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} rounded-xl transition-all duration-300 text-sm font-medium hover:scale-105`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className={`inline-flex items-center px-4 py-2 glass-badge rounded-full text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-8`}>
              <Zap className="w-4 h-4 mr-2 text-cyan-400" />
              AI-Powered Road Analytics
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className={`${isDarkMode ? 'bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-200' : 'bg-gradient-to-r from-slate-800 via-cyan-600 to-blue-600'} bg-clip-text text-transparent`}>
              Rofix
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-10 max-w-3xl mx-auto opacity-0 animate-fade-in-up leading-relaxed`} style={{ animationDelay: '0.6s' }}>
            Advanced road repair analytics system powered by computer vision and GPS tracking technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => onNavigate('login')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`px-8 py-4 glass-button ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} rounded-xl font-medium transition-all duration-300 hover:scale-105`}>
              <Play className="w-4 h-4 mr-2 inline" />
              View Demo
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-6`}>
              Intelligent Road Analysis
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto leading-relaxed`}>
              Leverage cutting-edge technology to detect, analyze, and prioritize road repairs with unprecedented accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Pothole Detection"
              description="Advanced computer vision algorithms automatically identify and classify road defects from dashcam footage with 95% accuracy"
              delay="0.2s"
              gradient="from-red-500/10 to-orange-500/10"
              iconColor="text-red-400"
              isDarkMode={isDarkMode}
            />
            <FeatureCard
              icon={BarChart3}
              title="GPS Mapping"
              description="Precise geolocation tracking correlates defects with exact coordinates for targeted repairs and route optimization"
              delay="0.4s"
              gradient="from-blue-500/10 to-cyan-500/10"
              iconColor="text-blue-400"
              isDarkMode={isDarkMode}
            />
            <FeatureCard
              icon={Zap}
              title="Repair Insights"
              description="Data-driven analytics provide actionable insights for maintenance prioritization and resource allocation strategies"
              delay="0.6s"
              gradient="from-emerald-500/10 to-teal-500/10"
              iconColor="text-emerald-400"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 glass-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-6`}>
              How It Works
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Simple workflow, powerful results
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload Data', desc: 'Submit dashcam video and GPS logs', icon: '📤', color: 'from-cyan-500 to-blue-500' },
              { step: '02', title: 'AI Analysis', desc: 'Computer vision processes footage', icon: '🤖', color: 'from-violet-500 to-purple-500' },
              { step: '03', title: 'Generate Report', desc: 'Comprehensive analytics dashboard', icon: '📊', color: 'from-emerald-500 to-teal-500' },
              { step: '04', title: 'Take Action', desc: 'Prioritize and schedule repairs', icon: '🔧', color: 'from-orange-500 to-red-500' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>{item.step}</div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-3`}>{item.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-6`}>
              Professional Dashboard
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Comprehensive analytics and reporting tools
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-all duration-500">
            <div className={`${isDarkMode ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50' : 'bg-gradient-to-br from-slate-200/50 to-slate-300/50'} rounded-xl h-96 flex items-center justify-center ${isDarkMode ? 'border border-slate-700/30' : 'border border-slate-300/30'}`}>
              <div className="text-center">
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10'} rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-slow`}>
                  <BarChart3 className="w-12 h-12 text-cyan-400" />
                </div>
                <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-3`}>Dashboard Preview</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-lg`}>Interactive analytics and reporting interface</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24 px-6 glass-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-6`}>
              Resources & Documentation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ResourceCard
              icon={FileText}
              title="Documentation"
              description="Comprehensive guides and API documentation"
              gradient="from-blue-500/10 to-cyan-500/10"
              isDarkMode={isDarkMode}
            />
            <ResourceCard
              icon={Github}
              title="Open Source"
              description="View source code and contribute to the project"
              gradient="from-slate-500/10 to-slate-600/10"
              isDarkMode={isDarkMode}
            />
            <ResourceCard
              icon={Users}
              title="Community"
              description="Join our community of developers and researchers"
              gradient="from-emerald-500/10 to-teal-500/10"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 ${isDarkMode ? 'border-t border-slate-800/50' : 'border-t border-slate-300/50'} glass-section`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-slate-100 to-slate-300' : 'bg-gradient-to-r from-slate-800 to-slate-600'} bg-clip-text text-transparent`}>Rofix</span>
                <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Road Analytics System</p>
              </div>
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              © 2024 Rofix. Advanced road repair analytics system.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  delay: string;
  gradient: string;
  iconColor: string;
  isDarkMode: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, gradient, iconColor, isDarkMode }) => {
  return (
    <div 
      className="group glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-4`}>{title}</h3>
      <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>{description}</p>
    </div>
  );
};

interface ResourceCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  isDarkMode: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon: Icon, title, description, gradient, isDarkMode }) => {
  return (
    <div className="group glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
        <Icon className={`w-8 h-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`} />
      </div>
      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} mb-3`}>{title}</h3>
      <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
    </div>
  );
};

export default LandingPage;