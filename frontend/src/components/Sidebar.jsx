import React from 'react';
import { 
  LayoutDashboard, 
  Radar, 
  BookOpen, 
  Briefcase, 
  FileCheck, 
  MessageSquareCode, 
  Landmark, 
  UserCog,
  Sparkles,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenProfileModal, onOpenSurveyModal, currentUser }) {
  const isAdmin = currentUser?.role === 'admin';

  const menuItems = [
    { id: 'dashboard', label: 'Skill Gap Dashboard', icon: LayoutDashboard, badge: 'Core' },
    { id: 'skill-matrix', label: 'Competency Radar', icon: Radar },
    { id: 'courses', label: 'AI Course Recommender', icon: BookOpen },
    { id: 'jobs', label: 'Internships & Jobs', icon: Briefcase },
    { id: 'resume', label: 'AI ATS Resume Enhancer', icon: FileCheck },
    { id: 'mock-interview', label: 'AI Mock Interviewer', icon: MessageSquareCode, badge: 'Interactive' },
    { id: 'govt-opportunities', label: 'Public Sector & Govt Jobs', icon: Landmark }
  ];

  if (isAdmin) {
    menuItems.unshift({ id: 'admin-analytics', label: 'Institutional TPO Portal', icon: ShieldCheck, badge: 'Admin' });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)] font-sans">
      <div className="p-4 space-y-6">
        {/* Menu Navigation */}
        <div>
          <div className="px-3 mb-2.5 text-xs font-bold tracking-wider text-slate-500 uppercase">
            Platform Modules
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#E7B46A] text-slate-900 shadow-sm'
                      : 'text-slate-700 hover:bg-[#DFDFE3]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/40 text-slate-900' : 'bg-[#A3AA5A]/20 text-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Re-Analysis & Survey Box */}
        {!isAdmin && (
          <div className="p-4 bg-[#DFDFE3]/50 border border-slate-300 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-[#E7B46A]" />
              <span>AI Profile & Sector Survey</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Update your sector preferences or upload a new PDF resume for live AI analysis.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenSurveyModal}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[#E7B46A] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all hover:bg-[#d69e4e]"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-slate-900" />
                <span>Sector & PDF Survey</span>
              </button>
              <button
                onClick={onOpenProfileModal}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[#F1A17E] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all hover:bg-[#e28a65]"
              >
                <UserCog className="w-3.5 h-3.5" />
                <span>Edit Academic Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500 text-center font-medium">
        Campus to Corporate AI Platform v1.0
      </div>
    </aside>
  );
}
