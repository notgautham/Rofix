import React from 'react';
import Sidebar from './Sidebar';
import { Play, MapPin, Download, ArrowLeft, AlertTriangle, BarChart3, Ruler } from 'lucide-react';

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
    distanceAffected: road?.distance || '2.5 km'
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
        <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="mr-3 p-1.5 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h1 className="text-xl font-semibold text-slate-100">Analysis Results</h1>
              </div>
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {road?.location || 'Main Street, Downtown'}
                </div>
                <div>{road?.date || '2024-01-15'}</div>
                <div>14:30 - 15:45</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 bg-slate-800 text-slate-100 rounded-lg hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Video Player */}
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-5 border border-slate-800 shadow-lg">
              <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-violet-400" />
                Dashcam Footage
              </h2>
              <div className="bg-slate-800/50 rounded-lg aspect-video flex items-center justify-center border border-slate-700/50 mb-3">
                <div className="text-center">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-7 h-7 text-violet-400" />
                  </div>
                  <p className="text-slate-300 text-sm">Video Player</p>
                  <p className="text-xs text-slate-500">Dashcam footage with pothole markers</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-8 bg-slate-800 rounded-md flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700">
                    {i}:30
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-5 border border-slate-800 shadow-lg">
              <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-violet-400" />
                Pothole Locations
              </h2>
              <div className="bg-slate-800/50 rounded-lg aspect-video flex items-center justify-center border border-slate-700/50">
                <div className="text-center">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-7 h-7 text-violet-400" />
                  </div>
                  <p className="text-slate-300 text-sm">Interactive Map</p>
                  <p className="text-xs text-slate-500">GPS route with pothole markers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Potholes"
              value={mockStats.totalPotholes}
              icon={AlertTriangle}
              color="from-red-500 to-orange-500"
              description="Detected in analysis"
            />
            <StatCard
              title="Severity Distribution"
              value={`${mockStats.severityDistribution.high}H/${mockStats.severityDistribution.medium}M/${mockStats.severityDistribution.low}L`}
              icon={BarChart3}
              color="from-yellow-500 to-orange-500"
              description="High/Medium/Low severity"
            />
            <StatCard
              title="Distance Affected"
              value={mockStats.distanceAffected}
              icon={Ruler}
              color="from-blue-500 to-violet-500"
              description="Total road distance"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, description }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-5 border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-slate-100">{value}</div>
          <div className="text-xs text-slate-400">{description}</div>
        </div>
      </div>
      <h3 className="text-base font-semibold text-slate-100">{title}</h3>
    </div>
  );
};

export default ResultsPage;