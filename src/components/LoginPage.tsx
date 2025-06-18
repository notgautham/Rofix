import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Shield, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, confirmPassword: string) => boolean;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup, onBack }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (activeTab === 'signup' && !confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (activeTab === 'login') {
      toast.success('Welcome back!');
      onLogin(email, password);
    } else {
      const success = onSignup(email, password, confirmPassword);
      if (success) {
        toast.success('Account created successfully!');
      } else {
        toast.error('Passwords do not match');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-teal-500/6 to-emerald-500/6 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-slate-400 hover:text-slate-300 transition-all duration-200 text-sm group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-xl animate-pulse-slow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
            Welcome to Rofix
          </h1>
          <p className="text-slate-400">Road Repair Analytics System</p>
        </div>

        {/* Main Card */}
        <div className="glass-card p-8 rounded-2xl shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex glass-nav-tabs rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            {activeTab === 'signup' && (
              <div className="group animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 mb-3 group-focus-within:text-cyan-400 transition-colors">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 glass-input rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                activeTab === 'login' ? 'Login' : 'Create Account'
              )}
            </button>

            {/* Forgot Password */}
            {activeTab === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                  onClick={() => toast('Password reset functionality coming soon!')}
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;