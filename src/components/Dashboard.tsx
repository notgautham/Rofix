import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RoadTable from './RoadTable';
import { MapPin, Activity, Search, Calendar, Filter, Settings, HelpCircle, FileText } from 'lucide-react';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onViewResults: (road: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout, onViewResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  const handleDateFilter = (filter: string) => {
    setDateFilter(filter);
    // TODO: Implement date filtering
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    // TODO: Implement status filtering
  };

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
        <div className="glass-header p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 mb-2">Dashboard</h1>
              <p className="text-slate-400">Monitor road conditions and analytics</p>
            </div>
            
            {/* Tools Menu */}
            <div className="relative">
              <button
                onClick={() => setShowToolsMenu(!showToolsMenu)}
                className="flex items-center px-4 py-2 glass-button rounded-xl text-slate-300 hover:text-slate-100 transition-all duration-200"
              >
                <Settings className="w-4 h-4 mr-2" />
                Tools
              </button>
              
              {showToolsMenu && (
                <div className="absolute right-0 top-12 w-48 glass-card rounded-xl p-2 shadow-xl z-10 animate-fade-in">
                  <button className="w-full flex items-center px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                    <FileText className="w-4 h-4 mr-3" />
                    Documentation
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Interactive Map */}
          <div className="glass-card rounded-2xl p-8 hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-100 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-cyan-400" />
                Road Network Overview
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Live Data</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl h-80 flex items-center justify-center border border-slate-700/30">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <MapPin className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Interactive Map</h3>
                <p className="text-slate-400">Real-time road condition visualization</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Roads Analyzed" value="247" change="+12%" color="from-cyan-500 to-blue-500" />
            <StatCard title="Potholes Detected" value="1,834" change="+8%" color="from-emerald-500 to-teal-500" />
            <StatCard title="Critical Issues" value="23" change="-15%" color="from-orange-500 to-red-500" />
          </div>

          {/* Filters and Search */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by Road ID, Location, or Status..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                />
              </div>
              
              {/* Date Filter */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilter(e.target.value)}
                  className="glass-input rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="glass-input rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="critical">Critical</option>
                  <option value="moderate">Moderate</option>
                  <option value="good">Good</option>
                </select>
              </div>
            </div>

            {/* Road Analytics Table */}
            <RoadTable 
              onViewResults={onViewResults}
              searchQuery={searchQuery}
              dateFilter={dateFilter}
              statusFilter={statusFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, color }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
          <Activity className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
          isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
        }`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-100 mb-2">{value}</div>
      <div className="text-slate-400">{title}</div>
    </div>
  );
};

export default Dashboard;