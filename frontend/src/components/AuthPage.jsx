import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  UserPlus, 
  LogIn
} from 'lucide-react';
import { registerUser, loginUser } from '../services/auth';
import { CAREER_TARGETS } from '../data/mockData';

export default function AuthPage({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer (Backend)');
  const [degree, setDegree] = useState('B.Tech in Computer Science & Engineering');
  const [cgpa, setCgpa] = useState('8.4 / 10');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter your email address and password.');
      return;
    }

    if (isSignUp) {
      const cleanName = name.trim() || cleanEmail.split('@')[0];
      const res = registerUser(cleanName, cleanEmail, cleanPassword, targetRole, degree, cgpa);
      if (res.success) {
        onAuthSuccess(res.user, res.token);
      } else {
        setError(res.error);
      }
    } else {
      const res = loginUser(cleanEmail, cleanPassword);
      if (res.success) {
        onAuthSuccess(res.user, res.token);
      } else {
        setError(res.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#DFDFE3] flex flex-col justify-center items-center p-4 selection:bg-[#E7B46A] selection:text-slate-900 font-sans">
      {/* Brand & Platform Header */}
      <div className="text-center max-w-md mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm text-xs font-extrabold text-slate-900">
          <Sparkles className="w-4 h-4 text-[#E7B46A]" />
          <span>MPOnline Idea & Innovation Hackathon 2026</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus to Corporate <span className="text-[#D69E4E]">(C2C)</span>
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          AI-Powered Career Readiness Platform • Sign in to access your personalized dashboard.
        </p>
      </div>

      {/* Main Single Centered Form Card */}
      <div className="bg-white border border-slate-300 rounded-3xl shadow-xl max-w-md w-full p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              {isSignUp ? 'User Registration & Sign In' : 'Candidate Sign In'}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {isSignUp ? 'Enter your details to register & record user data.' : 'Enter your credentials to access your session.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-xs font-extrabold text-slate-900 bg-[#E7B46A] hover:bg-[#d69e4e] px-3.5 py-1.5 rounded-xl shadow-xs transition-all shrink-0 ml-2"
          >
            {isSignUp ? 'Sign In' : 'Register'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-[#F1A17E]/20 border border-[#F1A17E] rounded-xl text-xs text-slate-900 font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#F1A17E] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" /> Username / Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-medium"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" /> Email ID *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@campus.edu"
              className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-500" /> Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-medium"
              required
            />
          </div>

          {isSignUp && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Career Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A]"
                >
                  {CAREER_TARGETS.map(t => (
                    <option key={t.id} value={t.title}>{t.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech CS"
                    className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CGPA</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="8.4 / 10"
                    className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A]"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 font-extrabold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-4"
          >
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{isSignUp ? 'Register & Record User Data' : 'Sign In & Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
