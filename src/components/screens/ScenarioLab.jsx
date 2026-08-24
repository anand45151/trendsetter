import React, { useState } from 'react';
import Card from '../common/Card';
import Sparkline from '../common/Sparkline';
import { Cpu, Play, History, Plus, CheckCircle, Sparkles, Copy, Clock, Target, Layers } from 'lucide-react';

export default function ScenarioLab() {
  const [targetConcept, setTargetConcept] = useState('Nostalgia Core x Sustainable Tech');
  const [sectors, setSectors] = useState(['Gen Z', 'Millennials', 'Tech Adapters']);
  const [platformVector, setPlatformVector] = useState('Multi-Channel Synapse');
  const [newTag, setNewTag] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedHook, setCopiedHook] = useState(null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !sectors.includes(newTag.trim())) {
      setSectors([...sectors, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  const hooks = [
    {
      id: 'h1',
      tag: 'HOOK_01 // AGGRESSIVE',
      content: '"Why your \'sustainable\' gadgets are already obsolete. We\'re rebuilding tech like it\'s 1990."',
      selected: false
    },
    {
      id: 'h2',
      tag: 'HOOK_02 // NOSTALGIC (SELECTED)',
      content: '"Remember when things were built to last? The retro-tech movement saving the planet."',
      selected: true
    }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(id);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[#00f0ff] uppercase">// PREDICTIVE LAB</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-100 uppercase tracking-wide flex items-center gap-3">
            AI LAB // SCENARIO ANALYZER
            <span className="font-mono text-xs font-normal px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
              SYS_ID: TR-X.04
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Loading recent scenario history logs...")}
            className="btn-cyber-outline text-xs flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" /> RECENT SCENARIOS
          </button>
          <button 
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="btn-cyber-solid text-xs flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ANALYZING...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" /> RUN ANALYSIS
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid: Parameters & Resonance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parameters Input Card */}
        <Card codeTag="INPUT_PAR_04" title="PARAMETERS">
          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs text-slate-400 block mb-1.5 uppercase">TARGET CONCEPT</label>
              <input 
                type="text"
                value={targetConcept}
                onChange={(e) => setTargetConcept(e.target.value)}
                className="cyber-input"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-slate-400 block mb-1.5 uppercase">DEMOGRAPHIC SECTORS</label>
              <div className="flex flex-wrap gap-2 items-center mb-2">
                {sectors.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded bg-[#162032] text-[#00f0ff] border border-[#00f0ff]/30 flex items-center gap-1.5">
                    #{tag}
                    <button 
                      onClick={() => setSectors(sectors.filter(s => s !== tag))}
                      className="hover:text-pink-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddTag} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Add sector tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="cyber-input py-1 text-xs"
                />
                <button type="submit" className="btn-cyber py-1 px-3">
                  <Plus className="w-3 h-3" /> ADD
                </button>
              </form>
            </div>

            <div>
              <label className="font-mono text-xs text-slate-400 block mb-1.5 uppercase">PLATFORM VECTORS</label>
              <input 
                type="text"
                value={platformVector}
                onChange={(e) => setPlatformVector(e.target.value)}
                className="cyber-input"
              />
            </div>
          </div>
        </Card>

        {/* Resonance Metrics Gauge Card */}
        <Card codeTag="RESONANCE_METRICS" title="RESONANCE METRICS">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
            {/* Circular Gauge Score */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="58" stroke="#1c2638" strokeWidth="10" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="58" 
                  stroke="#00f0ff" 
                  strokeWidth="10" 
                  strokeDasharray={364}
                  strokeDashoffset={364 * (1 - 0.75)}
                  strokeLinecap="round"
                  fill="transparent" 
                  className="transition-all duration-1000 shadow-[0_0_15px_#00f0ff]"
                />
              </svg>
              <div className="absolute text-center font-mono">
                <div className="text-3xl font-extrabold text-white">75%</div>
                <div className="text-[9px] text-[#00f0ff] uppercase tracking-wider font-bold">MATCH PROBABILITY</div>
              </div>
            </div>

            {/* Metrics Checklist */}
            <div className="space-y-3 font-mono text-xs flex-1 w-full">
              <div className="flex items-center justify-between p-2.5 bg-[#090c14] rounded border border-[#192336]">
                <span className="text-slate-400">VIRALITY INDEX:</span>
                <span className="text-[#00ffa3] font-bold">8.4 / 10</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090c14] rounded border border-[#192336]">
                <span className="text-slate-400">SATURATION:</span>
                <span className="text-[#00f0ff] font-bold">MODERATE</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090c14] rounded border border-[#192336]">
                <span className="text-slate-400">SENTIMENT:</span>
                <span className="text-[#00ffa3] font-bold">POSITIVE</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid: AI Hooks & Optimal Timing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Hooks Generator Card */}
        <Card codeTag="GEN_HOOKS_V4" title="AI HOOKS">
          <div className="space-y-3">
            {hooks.map((h) => (
              <div 
                key={h.id} 
                className={`p-4 rounded border transition-all ${
                  h.selected 
                    ? 'bg-[#131b2b] border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                    : 'bg-[#090c14] border-[#1a2336]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className={h.selected ? 'text-[#00f0ff] font-bold' : 'text-slate-400'}>
                    {h.tag}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(h.content, h.id)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px]"
                  >
                    {copiedHook === h.id ? (
                      <span className="text-[#00ffa3]">COPIED!</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> COPY
                      </>
                    )}
                  </button>
                </div>
                <p className="font-sans text-slate-200 text-sm italic">{h.content}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Optimal Timing Bell Curve Chart Card */}
        <Card codeTag="TIMING_WND_02" title="OPTIMAL TIMING">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">OPTIMAL DEPLOYMENT WINDOW:</span>
              <span className="text-[#00f0ff] font-bold">PEAK DEPLOY (T-4)</span>
            </div>

            <div className="bg-[#080b12] p-4 rounded border border-[#192233] relative">
              {/* Bell curve distribution representation */}
              <Sparkline 
                data={[5, 12, 30, 85, 120, 85, 30, 12, 5]} 
                color="#00f0ff" 
                height={110} 
                fillGradient={true} 
                strokeWidth={3} 
                showDots={true}
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-2 border-t border-[#141b29] mt-2">
                <span>-24H</span>
                <span>-12H</span>
                <span className="text-[#00f0ff] font-bold">PEAK (T-4)</span>
                <span>+12H</span>
                <span>+24H</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
