import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { signInWithGoogle } from '../../services/authService';

export default function LoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    const { user, error } = await signInWithGoogle();
    setLoading(false);

    if (error) {
      setErrorMsg(error);
    } else if (user) {
      if (onAuthSuccess) onAuthSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e131d] border border-[#00f0ff]/50 rounded-sm max-w-md w-full p-6 relative shadow-[0_0_40px_rgba(0,240,255,0.2)]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded bg-[#162032]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-[#1c273c]">
          <div className="w-12 h-12 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff] flex items-center justify-center mx-auto mb-3 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Lock className="w-6 h-6" />
          </div>
          <span className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest block">// AUTHENTICATION GATEWAY</span>
          <h2 className="font-display text-2xl font-bold text-white uppercase mt-1">ACCESS TRENDRADAR</h2>
          <p className="text-slate-400 text-xs mt-1 font-sans">Authenticate to sync real-time telemetry and saved AI scenarios across devices.</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Google OAuth Action Button */}
        <div className="my-6 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-sans font-semibold text-sm py-3 px-4 rounded flex items-center justify-center gap-3 transition-all shadow-lg group hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Modal Footer Security Badges */}
        <div className="pt-4 border-t border-[#1c273c] flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#00ffa3]" /> AES-256 ENCRYPTED
          </span>
          <span>FIREBASE OAUTH v2</span>
        </div>
      </div>
    </div>
  );
}
