import React from 'react';
import { Shield, LayoutDashboard, Upload, LogOut, User, Settings } from 'lucide-react';

interface SidebarProps {
  user: any;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload', icon: Upload },
  ];

  return (
    <div className="w-64 glass-sidebar flex flex-col border-r border-slate-800/50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Rofix</h1>
            <p className="text-xs text-slate-500">Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-slate-100 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center mb-3 p-3 glass-card rounded-xl hover:scale-105 transition-all duration-200 ${
            currentPage === 'profile' ? 'ring-2 ring-cyan-500/50' : ''
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-100 truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </button>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 mr-3 text-slate-500 group-hover:text-red-400" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;