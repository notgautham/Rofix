import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import ResultsPage from './components/ResultsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import DocumentationPage from './components/DocumentationPage';
import HelpPage from './components/HelpPage';
import NotFoundPage from './components/NotFoundPage';

type Page = 'landing' | 'login' | 'dashboard' | 'upload' | 'results' | 'profile' | 'settings' | 'documentation' | 'help' | '404';

interface User {
  email: string;
  name: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Theme toggle logic would go here
  };

  const toggleTestMode = () => {
    setIsTestMode(!isTestMode);
    // Test mode logic would go here
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSignup={handleSignup} onBack={() => setCurrentPage('landing')} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            onViewResults={handleViewResults}
            isTestMode={isTestMode}
            onToggleTestMode={toggleTestMode}
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
      case 'settings':
        return (
          <SettingsPage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        );
      case 'documentation':
        return (
          <DocumentationPage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case 'help':
        return (
          <HelpPage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case '404':
        return <NotFoundPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'} transition-colors duration-300`}>
      {renderPage()}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(248, 250, 252, 0.95)',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.2)'}`,
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </div>
  );
}

export default App;