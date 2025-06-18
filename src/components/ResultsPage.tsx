import React from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { Play, MapPin, Download, ArrowLeft, AlertTriangle, BarChart3, Ruler, Clock, Calendar } from 'lucide-react';

interface ResultsPageProps {
  user: any;
  road: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ user, road, onNavigate, onLogout }) => {
  const mockStats = {
    totalPotholes: road?.potholeCount || 12,
    severityDistribution: {
      high: 4,
      medium: 5,
      low: 3
    },
    distanceAffected: road?.distance || '2.5 km',
    avgSeverity: 'Medium',
    uploadTime: '14:30',
    analysisTime: '2.3 minutes'
  };

  const handleDownloadReport = () => {
    toast.success('Report download started!');
    // TODO: Implement report download logic
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="results"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="mr-4 p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-slate-100">Analysis Results</h1>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {road?.location || 'Main Street, Downtown'}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {road?.date || '2024-01-15'}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {mockStats.uploadTime} - Analysis: {mockStats.analysisTime}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleDownloadReport}
                className="flex items-center px-4 py-2 glass-button rounded-xl text-slate-100 hover:scale-105 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <QuickStat label="Avg. Severity" value={mockStats.avgSeverity} color="text-yellow-400" />
            <QuickStat label="Upload Time" value={mockStats.uploadTime} color="text-cyan-400" />
            <QuickStat label="Analysis Time" value={mockStats.analysisTime} color="text-emerald-400" />
            <QuickStat label="Total Distance" value={mockStats.distanceAffected} color="text-blue-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Video Player */}
            <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-red-400" />
                Dashcam Footage
              </h2>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl aspect-video flex items-center justify-center border border-slate-700/30 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <Play className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="text-slate-300 font-medium">Video Player</p>
                  <p className="text-xs text-slate-500">Dashcam footage with pothole markers</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} className="flex-1 h-10 glass-button rounded-lg flex items-center justify-center text-xs text-slate-400 hover:text-slate-300 hover:scale-105 transition-all duration-200">
                    {i}:30
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                Pothole Locations
              </h2>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl aspect-video flex items-center justify-center border border-slate-700/30">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <MapPin className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-slate-300 font-medium">Interactive Map</p>
                  <p className="text-xs text-slate-500">GPS route with pothole markers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Potholes"
              value={mockStats.totalPotholes}
              icon={AlertTriangle}
              gradient="from-red-500 to-orange-500"
              description="Detected in analysis"
            />
            <StatCard
              title="Severity Distribution"
              value={`${mockStats.severityDistribution.high}H/${mockStats.severityDistribution.medium}M/${mockStats.severityDistribution.low}L`}
              icon={BarChart3}
              gradient="from-yellow-500 to-orange-500"
              description="High/Medium/Low severity"
            />
            <StatCard
              title="Distance Affected"
              value={mockStats.distanceAffected}
              icon={Ruler}
              gradient="from-blue-500 to-cyan-500"
              description="Total road distance"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickStatProps {
  label: string;
  value: string;
  color: string;
}

const QuickStat: React.FC<QuickStatProps> = ({ label, value, color }) => {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  gradient: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, gradient, description }) => {
  return (
    <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-100">{value}</div>
          <div className="text-xs text-slate-400">{description}</div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
    </div>
  );
};

export default ResultsPage;