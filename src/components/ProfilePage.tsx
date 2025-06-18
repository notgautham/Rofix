import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { User, Mail, Lock, Save, Trash2, Eye, EyeOff } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateUser: (user: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onLogout, onUpdateUser }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!name || !email) {
      toast.error('Name and email are required');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword && !currentPassword) {
      toast.error('Current password is required to change password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user data
    onUpdateUser({ ...user, name, email });
    
    toast.success('Profile updated successfully!');
    setIsLoading(false);
    
    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not implemented in this demo');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="profile"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information and preferences</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              {/* Profile Picture Section */}
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100 mb-1">{user?.name}</h2>
                  <p className="text-slate-400">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Change Password</h3>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-11 pr-12 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800/50">
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 bg-red-500/10 text-red-400 rounded-xl font-medium transition-all duration-300 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;