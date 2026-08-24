import React, { useState } from 'react';
import Card from '../common/Card';
import { User, Key, Shield, RefreshCw, Save, Lock, CheckCircle2, Sliders, Globe } from 'lucide-react';

export default function AccountSettings() {
  const [activeSubtab, setActiveSubtab] = useState('ACCOUNT CONFIG');
  const [designation, setDesignation] = useState('Alex Riviera');
  const [commsEmail, setCommsEmail] = useState('alex.r@trendradar.sys');
  const [bio, setBio] = useState('Lead analyst focusing on emerging technological vectors and adversarial AI capabilities.');
  const [authKey, setAuthKey] = useState('TR-KEY-9042-X881-ALPHA-909');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [keyRotated, setKeyRotated] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRotateKey = () => {
    const newKey = 'TR-KEY-' + Math.floor(1000 + Math.random() * 9000) + '-X999-BETA';
    setAuthKey(newKey);
    setKeyRotated(true);
    setTimeout(() => setKeyRotated(false), 2500);
  };

  const subtabs = ['ACCOUNT CONFIG', 'EXTERNAL CONN', 'SYSTEM PREFS'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Profile Operator Header */}
      <Card variant="highlight" className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <div className="w-full h-full bg-[#0d121c] rounded flex items-center justify-center font-display font-bold text-2xl text-[#00f0ff]">
                  AR
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00ffa3] border-2 border-[#090c13]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-bold uppercase">
                  ELITE INTELLIGENCE
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#162032] text-slate-400 border border-[#24334d]">
                  LVL 02 OPERATOR
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white tracking-wide">
                ALEX RIVIERA
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button 
              onClick={handleSave}
              className="btn-cyber-solid text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> DEPLOY CHANGES
            </button>
            <span className="font-mono text-[10px] text-slate-500">
              {savedSuccess ? (
                <span className="text-[#00ffa3] font-bold">CHANGES DEPLOYED SUCCESSFULLY!</span>
              ) : (
                'LAST SYNC: 14:32:09 UTC'
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Subtabs & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Subtab Switcher (1 col) */}
        <div className="space-y-2 font-mono text-xs">
          {subtabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubtab(tab)}
              className={`w-full text-left px-4 py-3 rounded-sm transition-all border ${
                activeSubtab === tab
                  ? 'bg-[#121927] text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.1)] font-bold'
                  : 'bg-[#090c13] text-slate-400 border-[#1c2436] hover:text-white'
              }`}
            >
              // {tab}
            </button>
          ))}
        </div>

        {/* Right Settings Form Cards (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {activeSubtab === 'ACCOUNT CONFIG' && (
            <>
              {/* Personal Details Card */}
              <Card codeTag="SEC_ID.01" title="PERSONAL DETAILS">
                <div className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 block mb-1.5 uppercase">Full Designation</label>
                      <input 
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="cyber-input"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1.5 uppercase">Comms Address (Email)</label>
                      <input 
                        type="email"
                        value={commsEmail}
                        onChange={(e) => setCommsEmail(e.target.value)}
                        className="cyber-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 uppercase">Operational Bio</label>
                    <textarea 
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="cyber-input w-full resize-none"
                    />
                  </div>
                </div>
              </Card>

              {/* Access Control Card */}
              <Card codeTag="SEC_ID.02" title="ACCESS CONTROL">
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336] gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Authentication Key</span>
                      <span className="text-slate-200 font-bold tracking-wider">{authKey}</span>
                    </div>
                    <button 
                      onClick={handleRotateKey}
                      className="btn-cyber text-[10px] py-1.5 px-3 flex items-center gap-1.5 self-start md:self-auto"
                    >
                      <RefreshCw className="w-3 h-3" /> ROTATE KEY
                    </button>
                  </div>
                  {keyRotated && (
                    <div className="p-2 bg-[#00ffa3]/10 border border-[#00ffa3]/30 text-[#00ffa3] text-[10px] rounded">
                      AUTH KEY ROTATED AND RE-ENCRYPTED SUCCESSFULLY.
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336] gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Multi-Factor Protocol</span>
                      <span className="text-[#00ffa3] font-bold">TIME-BASED (TOTP) ACTIVE</span>
                    </div>
                    <button 
                      onClick={() => alert("Re-initializing TOTP Authenticator app...")}
                      className="btn-cyber-outline text-[10px] py-1.5 px-3"
                    >
                      INITIALIZE
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeSubtab === 'EXTERNAL CONN' && (
            <Card codeTag="EXT_CONN" title="EXTERNAL CONNECTIONS">
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336]">
                  <div>
                    <span className="text-white font-bold block">GitHub Developer API</span>
                    <span className="text-slate-400 text-[10px]">Connected as @alex-riviera-sys</span>
                  </div>
                  <span className="text-[#00ffa3] font-bold text-[10px]">CONNECTED</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336]">
                  <div>
                    <span className="text-white font-bold block">X / Twitter API Stream</span>
                    <span className="text-slate-400 text-[10px]">v2 Enterprise Pipeline</span>
                  </div>
                  <span className="text-[#00ffa3] font-bold text-[10px]">CONNECTED</span>
                </div>
              </div>
            </Card>
          )}

          {activeSubtab === 'SYSTEM PREFS' && (
            <Card codeTag="SYS_PREF" title="SYSTEM PREFERENCES">
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336]">
                  <span className="text-slate-300">Audio Telemetry Beeps</span>
                  <span className="text-[#00f0ff] font-bold">ENABLED</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#090c14] rounded border border-[#1a2336]">
                  <span className="text-slate-300">Holographic Glow Effects</span>
                  <span className="text-[#00ffa3] font-bold">ENABLED</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
