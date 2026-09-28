import React from 'react';
import { Sparkles, KeyRound, Sun, Moon, BrainCircuit } from 'lucide-react';

export default function Header({ 
  currentUser, 
  onOpenLoginModal, 
  onLogout,
  onOpenProfileModal,
  onOpenSurveyModal,
  theme,
  setTheme
}) {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 shadow-sm font-sans">
      {/* Brand & Platform Identity */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center font-bold shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Campus to Corporate
            </h1>
            <span className="bg-[#A3AA5A]/20 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#A3AA5A]/40">
              AI Employability Platform
            </span>
          </div>
          <p className="text-xs text-slate-600">Bridging Academic Learning & Corporate Career Readiness</p>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3">
        {/* Onboarding Sector Survey Trigger */}
        {!isAdmin && (
          <button
            onClick={onOpenSurveyModal}
            title="Re-run Career Sector Survey & AI Resume Upload"
            className="px-3.5 py-2 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <BrainCircuit className="w-4 h-4 text-slate-900" />
            <span className="hidden md:inline">Career Sector Survey</span>
          </button>
        )}

        {/* User JWT Badge & Profile Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={isAdmin ? onOpenLoginModal : onOpenProfileModal}
            className="flex items-center gap-2.5 bg-[#DFDFE3]/60 hover:bg-[#DFDFE3] border border-slate-300 rounded-xl px-3 py-1.5 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E7B46A] text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('') : 'US'}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>{currentUser?.name}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                  isAdmin ? 'bg-[#F1A17E] text-slate-900' : 'bg-[#A3AA5A]/30 text-slate-900'
                }`}>
                  {isAdmin ? 'Admin' : 'JWT Auth'}
                </span>
              </div>
              <div className="text-xs text-slate-600 truncate max-w-[130px] font-medium">{currentUser?.targetRole || currentUser?.email}</div>
            </div>
          </button>

          {/* Switch to Other Account Button */}
          <button
            onClick={onOpenLoginModal}
            title="Switch User / Inspect JWT"
            className="px-3.5 py-2 bg-[#F1A17E] hover:bg-[#e28a65] text-slate-900 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <KeyRound className="w-4 h-4" />
            <span className="hidden sm:inline">Switch to Other Account</span>
          </button>
        </div>

        {/* Top Right Corner Dark / Light Theme Toggle Switch */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 bg-[#DFDFE3]/70 hover:bg-[#DFDFE3] text-slate-900 text-xs font-extrabold transition-all shadow-sm"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-4 h-4 text-[#A3AA5A]" />
              <span className="hidden sm:inline text-xs">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-[#E7B46A]" />
              <span className="hidden sm:inline text-xs">Light</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
