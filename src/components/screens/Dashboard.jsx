import React, { useState } from 'react';
import Card from '../common/Card';
import Sparkline from '../common/Sparkline';
import { TrendingUp, Activity, Cpu, ArrowUpRight, Zap, GitBranch, MessageSquare, Layers, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState('24H');
  const [isAutoAI, setIsAutoAI] = useState(true);

  // Pulse wave trend data points matching Figma
  const pulseData = [35, 48, 40, 72, 60, 98, 85, 115, 92, 125];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1c2436]">
        <div>
          <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-wider">// SYSTEM OVERVIEW</span>
          <h2 className="font-display text-2xl font-bold text-slate-100 uppercase">
            TRENDRADAR DASHBOARD
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {['1H', '24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded border transition-all ${
                selectedRange === range
                  ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/50'
                  : 'bg-[#0d121c] text-slate-400 border-[#1d273a] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Global Momentum */}
        <Card codeTag="TR-KPI.01" title="GLOBAL MOMENTUM">
          <div className="flex items-end justify-between mt-2">
            <div>
              <div className="font-display text-4xl font-extrabold text-[#00f0ff] tracking-tight flex items-baseline gap-1">
                +24%
              </div>
              <span className="font-mono text-xs text-slate-400 mt-1 block">VS PREVIOUS CYCLE</span>
            </div>
            <div className="w-24">
              <Sparkline data={[20, 35, 25, 60, 45, 80]} color="#00f0ff" height={45} strokeWidth={2} />
            </div>
          </div>
        </Card>

        {/* KPI 2: Active Signals */}
        <Card codeTag="TR-KPI.02" title="ACTIVE SIGNALS">
          <div className="flex items-end justify-between mt-2">
            <div>
              <div className="font-display text-4xl font-extrabold text-white tracking-tight">
                1,240
              </div>
              <span className="font-mono text-xs text-[#00ffa3] mt-1 block">● 94 NEW IN LAST 2H</span>
            </div>
            <div className="flex items-end gap-1.5 h-10 pb-1">
              {[40, 65, 30, 85, 90, 60, 100].map((h, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-[#00f0ff]/80 rounded-t"
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
          </div>
        </Card>

        {/* KPI 3: Viral Potential */}
        <Card codeTag="TR-KPI.03" title="VIRAL POTENTIAL">
          <div className="flex items-end justify-between mt-2">
            <div>
              <div className="font-display text-4xl font-extrabold text-[#ff0055] tracking-tight flex items-baseline gap-2">
                HIGH
                <span className="text-lg text-slate-300 font-mono font-normal">85%</span>
              </div>
              <span className="font-mono text-xs text-slate-400 mt-1 block">CROSS-PLATFORM SPREAD</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-[#ff0055]/30 border-t-[#ff0055] border-r-[#ff0055] flex items-center justify-center font-mono text-xs text-white font-bold">
              85%
            </div>
          </div>
        </Card>
      </div>

      {/* Grid: Agentic Workflows & TrendPulse Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Agentic Workflows Deep Analysis Card (2 cols) */}
        <div className="lg:col-span-2">
          <Card codeTag="FASTEST TREND" variant="highlight" className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/40 font-bold uppercase">
                  #FASTEST_TREND
                </span>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>CONFIDENCE</span>
                  <span className="text-[#00ffa3] font-bold">94.2%</span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                Agentic Workflows
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Autonomous AI agents capable of orchestrating complex, multi-step tasks without human intervention are experiencing a massive surge in developer focus and enterprise adoption discourse.
              </p>

              <div className="space-y-2 pt-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#090c14] rounded border border-[#1a2336]">
                  <span className="text-slate-400 flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5 text-[#00f0ff]" />
                    GitHub Repos:
                  </span>
                  <span className="text-[#00ffa3] font-bold">+340% (90d)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#090c14] rounded border border-[#1a2336]">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#ff0055]" />
                    Dev Forum Vol:
                  </span>
                  <span className="text-white font-bold">HIGH</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1a2336] mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span>GATEWAY:</span>
                <span className="text-[#00f0ff] font-semibold">AI / AUTO</span>
              </div>

              <button 
                onClick={() => alert("Initiating Agentic Workflows Depth Analysis...")}
                className="btn-cyber-solid text-xs py-2 px-4"
              >
                ANALYZE DEPTH <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>

        {/* TrendPulse Real-Time Chart (3 cols) */}
        <div className="lg:col-span-3">
          <Card codeTag="LIVE AGGREGATION" title="TrendPulse // Real-time global signal aggregation" className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#00f0ff]">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                    REAL-TIME VELOCITY
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#162032] text-slate-300 border border-[#23314c]">54</span>
                  <span className="px-2 py-0.5 rounded bg-[#162032] text-slate-300 border border-[#23314c]">84h</span>
                  <span className="px-2 py-0.5 rounded bg-[#162032] text-slate-300 border border-[#23314c]">79</span>
                </div>
              </div>

              {/* Large Smooth Curve Graph */}
              <div className="bg-[#080b12] p-4 rounded border border-[#192233] relative">
                <Sparkline data={pulseData} color="#00f0ff" height={160} fillGradient={true} strokeWidth={3} showDots={true} />
                
                {/* Time Axis Labels */}
                <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-3 border-t border-[#141b29] mt-2">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span className="text-[#00f0ff] font-bold">NOW</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-[#1a2336]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffa3]" />
                DATAFEED: 100% SYNCHRONIZED
              </span>
              <span className="text-slate-500">REFRESH RATE: 500ms</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
