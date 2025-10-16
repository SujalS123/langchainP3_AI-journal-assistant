import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Journal from './pages/Journal';
import Chat from './pages/Chat';
import Reflections from './pages/Reflections';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [activeTab, setActiveTab] = useState('journal');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const { isAuthenticated } = useAuthStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'journal':
        return <Journal />;
      case 'chat':
        return <Chat />;
      case 'reflections':
        return <Reflections />;
      case 'history':
        return <History />;
      default:
        return <Journal />;
    }
  };

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <Login 
        onLogin={() => setActiveTab('journal')}
        switchToRegister={() => setAuthMode('register')}
      />
    ) : (
      <Register 
        onRegister={() => setActiveTab('journal')}
        switchToLogin={() => setAuthMode('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;