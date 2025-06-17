import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, MapPin, BarChart3, Zap, ChevronDown, Github, FileText, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-slate-800/20 to-slate-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-100">Rofix</span>
            </div>
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-all duration-200 text-sm font-medium border border-slate-700 hover:border-slate-600"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 mb-8">
              <Zap className="w-4 h-4 mr-2 text-violet-400" />
              AI-Powered Road Analytics
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Rofix
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Advanced road repair analytics system powered by computer vision and GPS tracking
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => onNavigate('login')}
              className="group px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-medium transition-all duration-200 border border-slate-700 hover:border-slate-600">
              View Demo
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Intelligent Road Analysis
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Leverage cutting-edge technology to detect, analyze, and prioritize road repairs with unprecedented accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Pothole Detection"
              description="Advanced computer vision algorithms automatically identify and classify road defects from dashcam footage"
              delay="0.2s"
            />
            <FeatureCard
              icon={BarChart3}
              title="GPS Mapping"
              description="Precise geolocation tracking correlates defects with exact coordinates for targeted repairs"
              delay="0.4s"
            />
            <FeatureCard
              icon={Zap}
              title="Repair Insights"
              description="Data-driven analytics provide actionable insights for maintenance prioritization and resource allocation"
              delay="0.6s"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400">
              Simple workflow, powerful results
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload Data', desc: 'Submit dashcam video and GPS logs' },
              { step: '02', title: 'AI Analysis', desc: 'Computer vision processes footage' },
              { step: '03', title: 'Generate Report', desc: 'Comprehensive analytics dashboard' },
              { step: '04', title: 'Take Action', desc: 'Prioritize and schedule repairs' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:border-violet-500/50 transition-all duration-300">
                  <span className="text-lg font-bold text-violet-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Professional Dashboard
            </h2>
            <p className="text-lg text-slate-400">
              Comprehensive analytics and reporting tools
            </p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
            <div className="bg-slate-800/50 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Dashboard Preview</h3>
                <p className="text-slate-400">Interactive analytics and reporting interface</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Resources & Documentation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ResourceCard
              icon={FileText}
              title="Documentation"
              description="Comprehensive guides and API documentation"
            />
            <ResourceCard
              icon={Github}
              title="Open Source"
              description="View source code and contribute to the project"
            />
            <ResourceCard
              icon={Users}
              title="Community"
              description="Join our community of developers and researchers"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-100">Rofix</span>
            </div>
            <div className="text-sm text-slate-400">
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
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  return (
    <div 
      className="group p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-all duration-300 opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:border-violet-500/50 transition-all duration-300">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

interface ResourceCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-all duration-300 cursor-pointer">
      <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:border-violet-500/50 transition-all duration-300">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
};

export default LandingPage;