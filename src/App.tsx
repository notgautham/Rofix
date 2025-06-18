import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';

type Page = 'landing' | 'login' | 'dashboard' | 'upload' | 'results' | 'profile' | '404';

interface User {
  email: string;
  name: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ email, name: email.split('@')[0] });
    setCurrentPage('dashboard');
  };

  const handleSignup = (email: string, password: string, confirmPassword: string) => {
    // Simulate signup
    if (password !== confirmPassword) {
      return false;
    }
    setUser({ email, name: email.split('@')[0] });
    setCurrentPage('dashboard');
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleViewResults = (road: any) => {
    setSelectedRoad(road);
    setCurrentPage('results');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSignup={handleSignup} onBack={() => setCurrentPage('landing')} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            onViewResults={handleViewResults}
          />
        );
      case 'upload':
        return (
          <UploadPage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'results':
        return (
          <ResultsPage
            user={user}
            road={selectedRoad}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            onUpdateUser={setUser}
          />
        );
      case '404':
        return <NotFoundPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {renderPage()}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#f1f5f9',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </div>
  );
}

export default App;