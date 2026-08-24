import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import TrendsFeed from './components/screens/TrendsFeed';
import Dashboard from './components/screens/Dashboard';
import ScenarioLab from './components/screens/ScenarioLab';
import AccountSettings from './components/screens/AccountSettings';
import DataSources from './components/screens/DataSources';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Global Keyboard Shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder="QUERY SYSTEM..."]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'trends':
        return <TrendsFeed searchQuery={searchQuery} />;
      case 'ailab':
        return <ScenarioLab />;
      case 'settings':
        return <AccountSettings />;
      case 'datasources':
        return <DataSources />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] bg-grid text-slate-100 flex flex-col relative selection:bg-[#00f0ff] selection:text-black">
      {/* Scanline subtle CRT effect overlay */}
      <div className="scanline-overlay" />

      {/* Top Header */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeTab={activeTab} />

      {/* Main Body Layout */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto pb-12">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Persistent Bottom Status Bar */}
      <Footer />
    </div>
  );
}
