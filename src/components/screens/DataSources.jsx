import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { GitBranch, Radio, Newspaper, MessageCircle, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Activity, Zap } from 'lucide-react';
import { aggregateLiveTrends } from '../../services/trendAnalyzer';

export default function DataSources() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  const load = async () => {
    setLoading(true);
    const result = await aggregateLiveTrends();
    setData(result);
    setLastFetched(new Date().toISOString().split('T')[1].slice(0, 8) + ' UTC');
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const sourceConfigs = [
    {
      id: 'github',
      name: 'GitHub Trending',
      icon: GitBranch,
      color: '#00f0ff',
      description: 'Monitors trending repositories by topic (ai, developer-tools, quantum). Pulls star velocity and language breakdown.',
      apiRef: 'api.github.com/search/repositories',
      authNote: 'Set VITE_GITHUB_TOKEN for 5,000 req/hr',
      items: data?.github || [],
      renderItem: (item) => (
        <div key={item.id} className="p-3 bg-[#090c14] border border-[#192336] rounded space-y-1">
          <div className="flex items-start justify-between">
            <span className="font-display font-bold text-white text-sm">{item.tag}</span>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#00f0ff]">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 pt-1">
            <span>⭐ {item.stars?.toLocaleString()}</span>
            <span>LANG: <strong className="text-[#00f0ff]">{item.language}</strong></span>
            <span>VEL: <strong className="text-[#00ffa3]">{item.velocity}</strong></span>
          </div>
        </div>
      )
    },
    {
      id: 'social',
      name: 'X / LinkedIn Social Streams',
      icon: Radio,
      color: '#00ffa3',
      description: 'Aggregates hashtag volume and developer thought-leadership discourse from X (Twitter) public stream and LinkedIn enterprise engagement.',
      apiRef: 'X API v2 / LinkedIn Signal (Simulated)',
      authNote: 'X API Bearer Token — Contact for Enterprise access',
      items: data?.social || [],
      renderItem: (item) => (
        <div key={item.id} className="p-3 bg-[#090c14] border border-[#192336] rounded space-y-1">
          <div className="flex items-start justify-between">
            <span className="font-display font-bold text-white text-sm">{item.tag}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#162032] text-slate-400 border border-[#23314c]">{item.source}</span>
          </div>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 pt-1">
            <span>👁 {item.impressions}</span>
            <span>♻ {item.reposts}</span>
            <span>VEL: <strong className="text-[#00ffa3]">{item.velocity}</strong></span>
            <span className="text-[#00ffa3] font-bold">{item.sentiment}</span>
          </div>
        </div>
      )
    },
    {
      id: 'news',
      name: 'Tech News & Substack Newsletters',
      icon: Newspaper,
      color: '#9d4edd',
      description: 'Parses top stories from Hacker News, TLDR Tech, and Substack developer newsletters. Aggregates upvote velocity and comment thread density.',
      apiRef: 'hacker-news.firebaseio.com/v0/topstories',
      authNote: 'Public API — no key required',
      items: data?.news || [],
      renderItem: (item) => (
        <div key={item.id} className="p-3 bg-[#090c14] border border-[#192336] rounded space-y-1">
          <div className="flex items-start justify-between">
            <span className="font-display font-bold text-white text-sm leading-snug">{item.title}</span>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#9d4edd] ml-2 flex-shrink-0">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 pt-1">
            <span>▲ {item.score}</span>
            <span>💬 {item.comments}</span>
            <span>VEL: <strong className="text-[#9d4edd]">{item.velocity}</strong></span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1c2436]">
        <div>
          <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-wider">// INGESTION MANAGEMENT</span>
          <h2 className="font-display text-2xl font-bold text-slate-100 uppercase tracking-wide flex items-center gap-3">
            DATA PIPELINE SOURCES
            <span className="font-mono text-xs font-normal px-2 py-0.5 rounded bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/30">
              {data ? 'CONNECTED' : 'LOADING...'}
            </span>
          </h2>
          {lastFetched && (
            <p className="font-mono text-xs text-slate-500 mt-1">LAST INGESTION: <strong className="text-slate-400">{lastFetched}</strong></p>
          )}
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="btn-cyber-solid text-xs py-2.5 px-5 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'INGESTING...' : 'REFRESH ALL PIPELINES'}
        </button>
      </div>

      {/* Pipeline Status Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card hasCorners={false} className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#00ffa3] animate-pulse" />
            <div>
              <div className="font-mono text-xs text-slate-400">TOTAL SIGNALS</div>
              <div className="font-display text-xl font-bold text-white">{data?.totalTracked?.toLocaleString() || '—'}</div>
            </div>
          </div>
        </Card>
        <Card hasCorners={false} className="py-3 px-4">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-[#00f0ff]" />
            <div>
              <div className="font-mono text-xs text-slate-400">GITHUB REPOS</div>
              <div className="font-display text-xl font-bold text-white">{data?.github?.length || '—'}</div>
            </div>
          </div>
        </Card>
        <Card hasCorners={false} className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#00ffa3]" />
            <div>
              <div className="font-mono text-xs text-slate-400">SOCIAL STREAMS</div>
              <div className="font-display text-xl font-bold text-white">{data?.social?.length || '—'}</div>
            </div>
          </div>
        </Card>
        <Card hasCorners={false} className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-[#9d4edd]" />
            <div>
              <div className="font-mono text-xs text-slate-400">NEWS ITEMS</div>
              <div className="font-display text-xl font-bold text-white">{data?.news?.length || '—'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Per-Source Sections */}
      {sourceConfigs.map((source) => {
        const Icon = source.icon;
        const hasData = source.items.length > 0;

        return (
          <Card key={source.id} className="space-y-4">
            {/* Source Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded border border-[#1c273c] bg-[#0d121c]" style={{ color: source.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">{source.name}</h3>
                  <p className="font-mono text-[10px] text-slate-500">{source.apiRef}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasData ? (
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> {source.items.length} RECORDS INGESTED
                  </span>
                ) : (
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> AWAITING DATA
                  </span>
                )}
              </div>
            </div>

            {/* Description & Auth Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <p className="text-slate-400 font-sans leading-relaxed">{source.description}</p>
              <div className="p-3 bg-[#090c14] border border-[#1a2336] rounded font-mono text-[10px] text-slate-400 flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0 mt-0.5" />
                <span><strong className="text-slate-300">AUTH:</strong> {source.authNote}</span>
              </div>
            </div>

            {/* Items Grid */}
            {hasData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {source.items.map(source.renderItem)}
              </div>
            ) : (
              <div className="text-center py-8 font-mono text-xs text-slate-500 border border-dashed border-[#1c2436] rounded">
                {loading ? 'INGESTING DATA STREAM...' : 'NO DATA — click REFRESH ALL PIPELINES'}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
