import React from 'react';
import Sidebar from './Sidebar';
import { FileText, Book, Code, Download, ExternalLink, Search, ChevronRight } from 'lucide-react';

interface DocumentationPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({ user, onNavigate, onLogout }) => {
  const documentationSections = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        'Quick Start Guide',
        'System Requirements',
        'Installation Instructions',
        'First Analysis Tutorial'
      ]
    },
    {
      title: 'User Guide',
      icon: FileText,
      items: [
        'Dashboard Overview',
        'Uploading Data',
        'Understanding Results',
        'Exporting Reports'
      ]
    },
    {
      title: 'API Reference',
      icon: Code,
      items: [
        'Authentication',
        'Upload Endpoints',
        'Analysis API',
        'Webhook Integration'
      ]
    },
    {
      title: 'Advanced Features',
      icon: Search,
      items: [
        'Batch Processing',
        'Custom Filters',
        'Data Export Options',
        'Integration Examples'
      ]
    }
  ];

  const quickLinks = [
    { title: 'API Documentation', url: '#', icon: ExternalLink },
    { title: 'Download SDK', url: '#', icon: Download },
    { title: 'GitHub Repository', url: '#', icon: Code },
    { title: 'Community Forum', url: '#', icon: ExternalLink }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="documentation"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Documentation</h1>
          <p className="text-slate-400">Comprehensive guides and API reference for Rofix</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-all duration-300">
                      <link.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-slate-100 font-medium text-sm">{link.title}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Documentation Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documentationSections.map((section, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                      <section.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-100">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="w-full flex items-center justify-between p-3 glass-button rounded-xl text-slate-300 hover:text-slate-100 transition-all duration-200 group"
                      >
                        <span>{item}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-8 glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    question: 'What video formats are supported?',
                    answer: 'Rofix supports MP4, AVI, and MOV video formats. Videos should be recorded at 720p or higher resolution for optimal analysis.'
                  },
                  {
                    question: 'How accurate is the pothole detection?',
                    answer: 'Our AI model achieves 95% accuracy in pothole detection under normal lighting conditions. Accuracy may vary in extreme weather or lighting conditions.'
                  },
                  {
                    question: 'Can I integrate Rofix with my existing systems?',
                    answer: 'Yes, Rofix provides a comprehensive REST API that allows integration with existing fleet management and maintenance systems.'
                  },
                  {
                    question: 'How long does analysis take?',
                    answer: 'Analysis time depends on video length and quality. Typically, a 10-minute video takes 2-3 minutes to process.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                    <h3 className="text-slate-100 font-medium mb-2">{faq.question}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;