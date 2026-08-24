import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Sparkline from '../common/Sparkline';
import { TrendingUp, Flame, Activity, ArrowUpRight, Search, ExternalLink, RefreshCw, X, ChevronRight, BarChart2, GitBranch, MessageCircle, Newspaper, Radio } from 'lucide-react';
import { aggregateLiveTrends } from '../../services/trendAnalyzer';

export default function TrendsFeed({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('ALL_SIGNALS');
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [liveStreamData, setLiveStreamData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['ALL_SIGNALS', 'AI_MODELS', 'NEO_INFRA', 'DEV_TOOLS'];

  const loadLiveData = async () => {
    setIsRefreshing(true);
    const data = await aggregateLiveTrends();
    setLiveStreamData(data);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadLiveData();
  }, []);

  const defaultTrends = [
    {
      id: 'llm-agent',
      tag: '#LLMAgentArchitecture',
      category: 'AI_MODELS',
      code: 'SN_Y.40',
      sparkData: [30, 42, 38, 75, 62, 90, 84, 110],
      velocity: '1.8k vol/hr',
      sentiment: 'BULLISH',
      color: '#00f0ff',
      source: 'GitHub / X Stream',
      description: 'Multi-agent orchestration protocols seeing 310% weekly expansion across open-source repositories and X streams.'
    },
    {
      id: 'zk-proofs',
      tag: '#ZeroKnowledgeProofs',
      category: 'NEO_INFRA',
      code: 'SN_Z.22',
      sparkData: [45, 30, 55, 48, 85, 78, 92, 105],
      velocity: '1.2k vol/hr',
      sentiment: 'STABLE',
      color: '#00ffa3',
      source: 'LinkedIn / Tech News',
      description: 'zk-SNARK rollups and hardware-accelerated prover networks surging in web3 privacy stacks.'
    },
    {
      id: 'spatial-comp',
      tag: '#SpatialComputing',
      category: 'DEV_TOOLS',
      code: 'SN_S.08',
      sparkData: [20, 35, 25, 50, 40, 68, 75, 98],
      velocity: '940 vol/hr',
      sentiment: 'MODERATE',
      color: '#9d4edd',
      source: 'Substack Newsletters',
      description: 'WebXR and spatial shader compilers trending among next-gen spatial OS software builders.'
    }
  ];

  const filteredTrends = defaultTrends.filter(t => {
    const matchesCategory = activeCategory === 'ALL_SIGNALS' || t.category === activeCategory;
    const matchesSearch = !searchQuery || t.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-[#00f0ff] rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <h2 className="font-display text-2xl font-bold tracking-wider text-slate-100 uppercase">
              TRENDS.LIVE
            </h2>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 uppercase">
              ● MULTI-SOURCE INGESTION
            </span>
          </div>
          <div className="font-mono text-xs text-slate-400 flex items-center gap-4">
            <span>SYS.TICK: <strong className="text-slate-200">170942.07</strong></span>
            <span>TOTAL_TRACKED: <strong className="text-[#00f0ff]">{liveStreamData?.totalTracked || 8402}</strong></span>
          </div>
        </div>

        {/* Category Filter Tabs & Manual Ingestion Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={loadLiveData}
            disabled={isRefreshing}
            className="btn-cyber-outline text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#00f0ff]' : ''}`} />
            FETCH LATEST PIPELINE
          </button>

          <div className="flex items-center gap-1.5 bg-[#0d121c] p-1 rounded border border-[#1d273a] font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#00f0ff] text-[#05070a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#151c2b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Source Telemetry Active Data Ingestion Stream Cards Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-3 bg-[#0d131f] border border-[#1c273e] rounded flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-[#00f0ff]" />
          <div>
            <div className="text-white font-bold">GitHub Telemetry</div>
            <div className="text-[10px] text-slate-400">{liveStreamData?.github?.length || 6} repos tracked</div>
          </div>
        </div>
        <div className="p-3 bg-[#0d131f] border border-[#1c273e] rounded flex items-center gap-3">
          <Radio className="w-5 h-5 text-[#00ffa3]" />
          <div>
            <div className="text-white font-bold">X / Twitter Stream</div>
            <div className="text-[10px] text-slate-400">45k posts / 24h</div>
          </div>
        </div>
        <div className="p-3 bg-[#0d131f] border border-[#1c273e] rounded flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-[#9d4edd]" />
          <div>
            <div className="text-white font-bold">News & Substack</div>
            <div className="text-[10px] text-slate-400">HackerNews + TLDR</div>
          </div>
        </div>
        <div className="p-3 bg-[#0d131f] border border-[#1c273e] rounded flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-[#ff0055]" />
          <div>
            <div className="text-white font-bold">LinkedIn Pulse</div>
            <div className="text-[10px] text-slate-400">CTO & Dev Signal</div>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Sparkline Signal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTrends.map((trend) => (
          <Card 
            key={trend.id} 
            codeTag={trend.code}
            headerRight={
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162030] text-[#00f0ff] border border-[#24334d]">
                {trend.velocity}
              </span>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-lg text-slate-100 tracking-tight hover:text-[#00f0ff] transition-colors cursor-pointer" onClick={() => setSelectedSignal(trend)}>
                  {trend.tag}
                </h4>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#121927] text-slate-400 rounded border border-[#1f2b42]">
                  {trend.source}
                </span>
              </div>

              {/* Sparkline curve */}
              <div className="py-2 bg-[#090c14] rounded border border-[#182133] p-2">
                <Sparkline data={trend.sparkData} color={trend.color} height={65} fillGradient={true} strokeWidth={2.5} />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                <span>SENTIMENT: <strong className="text-[#00ffa3]">{trend.sentiment}</strong></span>
                <button 
                  onClick={() => setSelectedSignal(trend)}
                  className="btn-cyber text-[10px] py-1 px-2.5"
                >
                  ANALYZE SIGNAL <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Featured Large Critical Mass Beta Cluster Card */}
      <Card variant="critical" className="p-8 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#ff0055]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/40 font-semibold uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              BETA-CLUSTER.ALPHA // CRITICAL MASS
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">NODE_ID: #4092-QC</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-3xl font-extrabold text-white tracking-tight">
              #RustForQuantum
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-sans">
              Cross-platform data aggregation from GitHub repositories, X posts, and Substack tech newsletters detected an anomaly cross-referencing memory-safe systems languages with quantum circuit optimization libraries.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs">
              <div className="bg-[#121622] border border-[#252f44] px-3 py-2 rounded">
                <span className="text-slate-500 block text-[10px]">VELOCITY</span>
                <span className="text-lg font-bold text-white">2.4k vol/hr</span>
              </div>
              <div className="bg-[#121622] border border-[#252f44] px-3 py-2 rounded">
                <span className="text-slate-500 block text-[10px]">SENTIMENT</span>
                <span className="text-lg font-bold text-[#00ffa3]">BULLISH</span>
              </div>
              <div className="bg-[#121622] border border-[#252f44] px-3 py-2 rounded">
                <span className="text-slate-500 block text-[10px]">CROSS-PLATFORM SCORE</span>
                <span className="text-lg font-bold text-[#00f0ff]">98.4 / 100</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-center">
            <button 
              onClick={() => setSelectedSignal({
                id: 'rust-quantum',
                tag: '#RustForQuantum',
                category: 'NEO_INFRA',
                code: 'BETA-CLUSTER.ALPHA',
                sparkData: [15, 30, 20, 60, 45, 95, 120, 160],
                velocity: '2.4k vol/hr',
                sentiment: 'BULLISH',
                color: '#ff0055',
                source: 'GitHub + X + Newsletters',
                description: 'Anomaly detected in developer discourse cross-referencing memory-safe systems languages with quantum circuit optimization libraries.'
              })}
              className="btn-cyber-solid text-sm py-3 px-6 shadow-[0_0_25px_rgba(255,0,85,0.4)] border-[#ff0055] bg-[#ff0055] hover:bg-[#ff2a75] text-white"
            >
              INITIATE DEEP DIVE <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Deep Dive Signal Modal Drawer */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131e] border border-[#00f0ff]/50 rounded-sm max-w-2xl w-full p-6 space-y-6 relative shadow-[0_0_35px_rgba(0,240,255,0.2)]">
            <button 
              onClick={() => setSelectedSignal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded bg-[#161f30]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#1c273c] pb-4">
              <span className="font-mono text-xs text-[#00f0ff] uppercase">// MULTI-SOURCE SIGNAL INSPECTOR</span>
              <h2 className="font-display text-2xl font-bold text-white mt-1">{selectedSignal.tag}</h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">{selectedSignal.description}</p>

            <div className="bg-[#080b12] p-4 rounded border border-[#192233]">
              <span className="font-mono text-xs text-slate-400 block mb-2">TELEMETRY SPARKLINE TRAJECTORY</span>
              <Sparkline data={selectedSignal.sparkData} color={selectedSignal.color} height={100} fillGradient={true} strokeWidth={3} showDots={true} />
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#131b2b] rounded border border-[#202d47]">
                <span className="text-slate-500 block text-[10px]">INGESTION SOURCE</span>
                <span className="text-white font-bold">{selectedSignal.source}</span>
              </div>
              <div className="p-3 bg-[#131b2b] rounded border border-[#202d47]">
                <span className="text-slate-500 block text-[10px]">VELOCITY</span>
                <span className="text-[#00f0ff] font-bold">{selectedSignal.velocity}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedSignal(null)}
                className="btn-cyber-outline"
              >
                CLOSE INSPECTOR
              </button>
              <button 
                onClick={() => {
                  alert(`Exporting multi-source data for ${selectedSignal.tag}...`);
                  setSelectedSignal(null);
                }}
                className="btn-cyber-solid"
              >
                EXPORT SIGNAL DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
