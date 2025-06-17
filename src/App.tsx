import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';

type Page = 'landing' | 'login' | 'dashboard' | 'upload' | 'results';

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
      alert('Passwords do not match');
      return;
    }
    setUser({ email, name: email.split('@')[0] });
    setCurrentPage('dashboard');
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
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {renderPage()}
    </div>
  );
}

export default App;