import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, LogIn, LogOut, UserCheck, Command } from 'lucide-react';
import LoginModal from '../auth/LoginModal';
import { subscribeToAuth, logoutUser } from '../../services/authService';

export default function Header({ searchQuery, setSearchQuery, activeTab }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  return (
    <header className="h-16 border-b border-[#1c2436] bg-[#090c13]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#00f0ff]/10 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] font-mono font-bold text-sm shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            TR
          </div>
          <div>
            <h1 className="font-display text-base font-bold tracking-wider text-slate-100 uppercase flex items-center gap-2">
              TrendRadar
              <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                v2.04
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Middle: Cyber Search Bar */}
      <div className="relative flex-1 max-w-md mx-8">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#00f0ff] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="QUERY SYSTEM..."
            className="w-full bg-[#0d121c] border border-[#1e283d] focus:border-[#00f0ff] text-slate-200 text-xs font-mono pl-10 pr-16 py-2 rounded-sm outline-none transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          />
          <div className="absolute right-3 flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-[#161d2d] px-1.5 py-0.5 rounded border border-[#242f47]">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: User Profile or Google Sign In Button */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded border border-[#1e283d] text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 bg-[#0d121c] transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff0055] animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#0e131d] border border-[#232d44] shadow-2xl rounded p-3 text-xs font-mono z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#1a2336] text-[#00f0ff]">
                <span className="uppercase font-bold text-[11px]">// SYSTEM ALERTS</span>
                <span className="text-[10px] text-slate-500">LIVE FEED</span>
              </div>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                <div className="p-2 bg-[#141b29] border-l-2 border-[#ff0055] rounded-r">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className="text-[#ff0055] font-bold">ALERT</span>
                    <span>11:38:04</span>
                  </div>
                  <p className="text-slate-200 mt-1">#RustForQuantum reached critical velocity threshold.</p>
                </div>
                <div className="p-2 bg-[#141b29] border-l-2 border-[#00f0ff] rounded-r">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className="text-[#00f0ff] font-bold">SIGNAL</span>
                    <span>11:35:12</span>
                  </div>
                  <p className="text-slate-200 mt-1">Agentic Workflows trend momentum +24% increase.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-[#1d273a]" />

        {/* Auth Section: Logged In User vs Google Login Button */}
        {currentUser ? (
          <div className="relative">
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 bg-[#0d121c] border border-[#00f0ff]/40 hover:border-[#00f0ff] px-3 py-1.5 rounded-sm transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]"
            >
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Avatar" className="w-7 h-7 rounded-full border border-[#00f0ff]" />
              ) : (
                <div className="w-7 h-7 rounded bg-gradient-to-tr from-[#ff0055] to-[#7000ff] text-white flex items-center justify-center font-mono font-bold text-xs">
                  {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                </div>
              )}
              <div className="text-left font-mono">
                <div className="text-[11px] font-semibold text-slate-200 leading-none truncate max-w-[120px]">
                  {currentUser.displayName || 'OPERATOR_01'}
                </div>
                <div className="text-[9px] text-[#00ffa3] tracking-tight mt-0.5 flex items-center gap-1">
                  <UserCheck className="w-2.5 h-2.5 inline" />
                  GOOGLE AUTH
                </div>
              </div>
            </button>

            {/* User Account Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0e131d] border border-[#232d44] shadow-2xl rounded p-3 text-xs font-mono z-50 space-y-2">
                <div className="pb-2 border-b border-[#1a2336]">
                  <p className="text-white font-bold truncate">{currentUser.displayName}</p>
                  <p className="text-slate-400 text-[10px] truncate">{currentUser.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left p-2 rounded hover:bg-[#1a2336] text-pink-400 flex items-center gap-2 text-xs"
                >
                  <LogOut className="w-3.5 h-3.5" /> SIGN OUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setLoginModalOpen(true)}
            className="btn-cyber text-xs py-1.5 px-3 flex items-center gap-2 border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff] hover:text-black font-bold transition-all"
          >
            <LogIn className="w-3.5 h-3.5" /> CONTINUE WITH GOOGLE
          </button>
        )}
      </div>

      {/* Google OAuth Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </header>
  );
}
