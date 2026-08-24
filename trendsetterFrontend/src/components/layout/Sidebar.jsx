import React from 'react';
import { LayoutDashboard, TrendingUp, Cpu, Settings, Database, Terminal, Activity } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard, tag: 'LIVE' },
    { id: 'trends', label: 'TRENDS', icon: TrendingUp, tag: 'STREAM' },
    { id: 'ailab', label: 'AI LAB', icon: Cpu, tag: 'BETA' },
    { id: 'datasources', label: 'DATA SOURCES', icon: Database, tag: 'PIPE' },
    { id: 'settings', label: 'SETTINGS', icon: Settings, tag: null },
  ];

  return (
    <aside className="w-64 border-r border-[#1c2436] bg-[#090c13] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none z-30">
      <div className="p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4 px-3 flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-[#00f0ff]" />
          <span>NAVIGATION // MODULES</span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm font-mono text-xs tracking-wider transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-[#121927] text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.12)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e1420] border border-transparent'
                }`}
              >
                {/* Active Left Neon Marker Line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff] rounded-r shadow-[0_0_8px_#00f0ff]" />
                )}

                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-[#00f0ff] scale-110' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="font-semibold">{item.label}</span>
                </div>

                {item.tag && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                    isActive 
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/40' 
                      : 'bg-[#151c2b] text-slate-400 border-[#202a40]'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Mini Widget at Bottom of Sidebar */}
      <div className="p-4 border-t border-[#1a2336] bg-[#0b0e16]">
        <div className="bg-[#0f1522] border border-[#1d273a] p-3 rounded-sm">
          <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#00f0ff] animate-pulse" />
              NODE STATUS
            </span>
            <span className="text-[#00ffa3] font-bold">ONLINE</span>
          </div>
          
          <div className="w-full bg-[#161e30] h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-[#00f0ff] h-full w-[84%] rounded-full shadow-[0_0_6px_#00f0ff]" />
          </div>

          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>MEM: 4.2 GB</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
