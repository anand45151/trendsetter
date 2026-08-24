import React, { useState, useEffect } from 'react';
import { Wifi, Radio, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].slice(0, 8) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-8 border-t border-[#1c2436] bg-[#06080d] px-6 flex items-center justify-between font-mono text-[10px] text-slate-400 select-none sticky bottom-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse" />
          <span className="text-[#00ffa3] font-semibold tracking-wider">SYSTEM STATUS: OPTIMAL</span>
        </div>
        <span className="text-[#1e283d]">|</span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Radio className="w-3 h-3 text-[#00f0ff]" />
          <span>STREAMING: ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3 h-3 text-[#00ffa3]" />
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
        <span className="text-[#1e283d]">|</span>
        <div className="flex items-center gap-1.5 text-[#00f0ff]">
          <Clock className="w-3 h-3" />
          <span>{time || '11:39:18 UTC'}</span>
        </div>
      </div>
    </footer>
  );
}
