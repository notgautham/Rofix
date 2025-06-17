import React from 'react';
import Sidebar from './Sidebar';
import RoadTable from './RoadTable';
import { MapPin, Activity } from 'lucide-react';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewResults: (road: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout, onViewResults }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 p-5">
          <h1 className="text-xl font-semibold text-slate-100 mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm">Monitor road conditions and analytics</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 space-y-5">
          {/* Interactive Map Placeholder */}
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-violet-400" />
                Road Network Overview
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Live Data</span>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg h-72 flex items-center justify-center border border-slate-700/50">
              <div className="text-center">
                <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-base font-medium text-slate-100 mb-1">Interactive Map</h3>
                <p className="text-sm text-slate-400">Real-time road condition visualization</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Roads Analyzed" value="247" change="+12%" />
            <StatCard title="Potholes Detected" value="1,834" change="+8%" />
            <StatCard title="Critical Issues" value="23" change="-15%" />
          </div>

          {/* Road Analytics Table */}
          <RoadTable onViewResults={onViewResults} />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center">
          <Activity className="w-4 h-4 text-violet-400" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
        }`}>
          {change}
        </span>
      </div>
      <div className="text-xl font-bold text-slate-100 mb-1">{value}</div>
      <div className="text-sm text-slate-400">{title}</div>
    </div>
  );
};

export default Dashboard;