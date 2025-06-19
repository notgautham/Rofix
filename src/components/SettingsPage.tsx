import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { Settings, Bell, Moon, Sun, Globe, Shield, Database, Palette, Save } from 'lucide-react';

interface SettingsPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onNavigate, onLogout, isDarkMode, onToggleTheme }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    analysis: true,
    reports: true
  });
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setNotifications({
        email: true,
        push: false,
        analysis: true,
        reports: true
      });
      setLanguage('en');
      setAutoSave(true);
      setDataRetention('90');
      toast.success('Settings reset to default values');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="settings"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Settings</h1>
          <p className="text-slate-400">Manage your application preferences and account settings</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Appearance Settings */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-6">
                <Palette className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-bold text-slate-100">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-100 font-medium">Theme</h3>
                    <p className="text-slate-400 text-sm">Choose your preferred color scheme</p>
                  </div>
                  <button
                    onClick={onToggleTheme}
                    className="flex items-center px-4 py-2 glass-button rounded-xl text-slate-100 hover:scale-105 transition-all duration-200"
                  >
                    {isDarkMode ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-bold text-slate-100">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <ToggleSetting
                  title="Email Notifications"
                  description="Receive updates via email"
                  checked={notifications.email}
                  onChange={(checked) => setNotifications({...notifications, email: checked})}
                />
                <ToggleSetting
                  title="Push Notifications"
                  description="Browser push notifications"
                  checked={notifications.push}
                  onChange={(checked) => setNotifications({...notifications, push: checked})}
                />
                <ToggleSetting
                  title="Analysis Complete"
                  description="Notify when road analysis is finished"
                  checked={notifications.analysis}
                  onChange={(checked) => setNotifications({...notifications, analysis: checked})}
                />
                <ToggleSetting
                  title="Weekly Reports"
                  description="Receive weekly summary reports"
                  checked={notifications.reports}
                  onChange={(checked) => setNotifications({...notifications, reports: checked})}
                />
              </div>
            </div>

            {/* General Settings */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-bold text-slate-100">General</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-100 font-medium">Language</h3>
                    <p className="text-slate-400 text-sm">Select your preferred language</p>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="glass-input rounded-xl px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <ToggleSetting
                  title="Auto-save"
                  description="Automatically save your work"
                  checked={autoSave}
                  onChange={setAutoSave}
                />
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-bold text-slate-100">Data & Privacy</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-100 font-medium">Data Retention</h3>
                    <p className="text-slate-400 text-sm">How long to keep analysis data</p>
                  </div>
                  <select
                    value={dataRetention}
                    onChange={(e) => setDataRetention(e.target.value)}
                    className="glass-input rounded-xl px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="text-slate-100 font-medium mb-2">Privacy Notice</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your data is encrypted and stored securely. We never share your personal information or analysis data with third parties. 
                    You can export or delete your data at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </button>
              
              <button
                onClick={handleResetSettings}
                className="px-6 py-3 glass-button text-slate-100 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToggleSettingProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ title, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-slate-100 font-medium">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-cyan-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsPage;