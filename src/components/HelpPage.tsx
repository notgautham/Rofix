import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { HelpCircle, MessageCircle, Mail, Phone, Send, ExternalLink, Book, Video, Users } from 'lucide-react';

interface HelpPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ user, onNavigate, onLogout }) => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Support ticket submitted successfully!');
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      available: true,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      action: 'Send Email',
      available: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Phone Support',
      description: 'Call us during business hours',
      icon: Phone,
      action: 'Call Now',
      available: false,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const resources = [
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: Video,
      link: '#'
    },
    {
      title: 'Documentation',
      description: 'Complete user manual and API docs',
      icon: Book,
      link: '#'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Users,
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="help"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Help & Support</h1>
          <p className="text-slate-400">Get assistance and find answers to your questions</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mb-4`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{option.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{option.description}</p>
                  <button
                    onClick={() => toast(option.available ? `${option.action} feature coming soon!` : 'Currently unavailable')}
                    disabled={!option.available}
                    className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                      option.available
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg'
                        : 'glass-button text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {option.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center">
                <Send className="w-6 h-6 mr-3 text-cyan-400" />
                Contact Support
              </h2>
              
              <form onSubmit={handleSubmitContact} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Priority
                    </label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                      className="w-full px-4 py-3 glass-input rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 resize-none"
                    placeholder="Please describe your issue in detail..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Ticket
                </button>
              </form>
            </div>

            {/* Resources */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-6">Self-Help Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="flex items-center p-4 glass-button rounded-xl hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                      <resource.icon className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-100 font-medium text-sm">{resource.title}</h3>
                      <p className="text-slate-400 text-xs">{resource.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Status & Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">API Services</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-emerald-400 text-sm">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Analysis Engine</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-emerald-400 text-sm">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">File Upload</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-yellow-400 text-sm">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Support Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Monday - Friday</span>
                    <span className="text-slate-400">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Saturday</span>
                    <span className="text-slate-400">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Sunday</span>
                    <span className="text-slate-400">Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-400 text-xs">
                      Emergency support available 24/7 for critical issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;