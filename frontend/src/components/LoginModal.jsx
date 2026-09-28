import React, { useState } from 'react';
import { X, LogIn, Lock, Mail, ShieldCheck, KeyRound, UserCheck, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { DEMO_USERS, loginUser, verifyJWT } from '../services/auth';

export default function LoginModal({ isOpen, onClose, currentToken, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showJWTDetails, setShowJWTDetails] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = loginUser(email, password);
    if (res.success) {
      onLoginSuccess(res.user, res.token);
      onClose();
    } else {
      setError(res.error);
    }
  };

  const handleQuickSwitch = (demoUser) => {
    const res = loginUser(demoUser.email, demoUser.password);
    if (res.success) {
      onLoginSuccess(res.user, res.token);
      onClose();
    }
  };

  const jwtInfo = currentToken ? verifyJWT(currentToken) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#DFDFE3]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>JWT User Authentication</span>
                <span className="text-[10px] bg-[#A3AA5A]/30 text-slate-900 font-extrabold px-2 py-0.5 rounded-full border border-[#A3AA5A]/50">
                  Multi-User Token Auth
                </span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">Log in as different student candidates or placement administrator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-[#DFDFE3] text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick Select Preset User Accounts */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E7B46A]" />
              <span>Select Persona to Issue JWT Token</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEMO_USERS.map((usr) => (
                <button
                  key={usr.id}
                  type="button"
                  onClick={() => handleQuickSwitch(usr)}
                  className="p-3 bg-[#DFDFE3]/40 hover:bg-[#DFDFE3]/80 border border-slate-300 rounded-xl text-left transition-all flex items-center gap-3 group shadow-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E7B46A] text-slate-900 font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                    {usr.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#D69E4E] truncate">
                        {usr.name}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                        usr.role === 'admin' ? 'bg-[#F1A17E] text-slate-900' : 'bg-[#A3AA5A]/30 text-slate-900'
                      }`}>
                        {usr.role === 'admin' ? 'Admin' : 'Student'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium truncate">{usr.targetRole}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-500 uppercase">Or Log In With Credentials</span>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>

          {/* Direct Credentials Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#F1A17E]/20 border border-[#F1A17E] rounded-xl text-slate-900 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F1A17E] shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan@campus.edu"
                  className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Generate JWT Token & Authenticate Session</span>
            </button>
          </form>

          {/* Active JWT Token Decoder Inspector */}
          {currentToken && (
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowJWTDetails(!showJWTDetails)}
                className="w-full flex items-center justify-between text-xs text-slate-900 font-bold py-1"
              >
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#E7B46A]" />
                  <span>Inspect Active JWT Claims & Payload</span>
                </span>
                {showJWTDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>

              {showJWTDetails && jwtInfo && (
                <div className="mt-3 p-3.5 bg-[#DFDFE3]/50 border border-slate-300 rounded-xl space-y-2 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-slate-900 font-extrabold">
                    <span>STATUS: VALID JWT TOKEN</span>
                    <span>EXP: 24 Hours</span>
                  </div>
                  
                  <div className="text-slate-600 font-bold">RAW TOKEN STRING:</div>
                  <div className="bg-white p-2 rounded text-slate-800 text-[10px] break-all border border-slate-300 select-all">
                    {currentToken}
                  </div>

                  <div className="text-slate-600 font-bold mt-2">DECODED JWT PAYLOAD CLAIMS:</div>
                  <pre className="bg-white p-2 rounded text-slate-800 text-[10px] border border-slate-300 overflow-x-auto">
                    {JSON.stringify(jwtInfo.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
