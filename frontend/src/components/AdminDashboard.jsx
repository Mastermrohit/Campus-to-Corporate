import React from 'react';
import { ShieldCheck, Users, GraduationCap, Award, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { DEMO_USERS } from '../services/auth';

export default function AdminDashboard({ onSelectStudent }) {
  const studentUsers = DEMO_USERS.filter(u => u.role === 'student');

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7B46A] flex items-center justify-center text-slate-900 shadow-sm font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">Institutional Placement Analytics Portal</h2>
                <span className="bg-[#F1A17E] text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  College Placement Cell View
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Batch-wide skill gap intelligence & employability metrics for campus placement officers.
              </p>
            </div>
          </div>

          <div className="bg-[#DFDFE3] border border-slate-300 px-3 py-1.5 rounded-xl text-xs text-slate-800 font-bold">
            Active Academic Batch: <strong className="text-slate-900 font-extrabold">2026 Graduating Class</strong>
          </div>
        </div>
      </div>

      {/* High level metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-bold">Total Students Tracked</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1,240</div>
          <div className="text-[11px] text-slate-800 font-bold mt-1 flex items-center gap-1">
            <span className="text-[#A3AA5A]">↑</span> 98% Profile Upload Rate
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-bold">Batch Employability Avg</span>
            <Award className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">79.4%</div>
          <div className="text-[11px] text-slate-900 font-extrabold mt-1">Ready for Tier-1 Placement</div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-bold">Primary Skill Shortfall</span>
            <AlertTriangle className="w-4 h-4 text-[#F1A17E]" />
          </div>
          <div className="text-base font-extrabold text-slate-900">System Design</div>
          <div className="text-[11px] text-slate-600 mt-1 font-medium">Affecting 42% of CS Students</div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-bold">Mock Interviews Done</span>
            <TrendingUp className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">3,850+</div>
          <div className="text-[11px] text-slate-800 font-bold mt-1">Avg Score: 81/100</div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#E7B46A]" />
              <span>Student Candidate Employability Roster</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">Select any candidate to inspect their individual JWT profile, skill gaps, and AI career roadmap.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-xs text-slate-600 font-bold uppercase tracking-wider bg-[#DFDFE3]/50">
                <th className="py-3 px-4 rounded-tl-xl">Student Candidate</th>
                <th className="py-3 px-4">Degree & Major</th>
                <th className="py-3 px-4">Target Career Path</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Employability Score</th>
                <th className="py-3 px-4 text-right rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {studentUsers.map((st) => (
                <tr key={st.id} className="hover:bg-[#DFDFE3]/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#E7B46A] text-slate-900 font-bold flex items-center justify-center text-xs shadow-xs">
                        {st.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{st.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{st.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{st.degree}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{st.targetRole}</td>
                  <td className="py-3 px-4 text-slate-700 font-bold">{st.cgpa}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 bg-[#A3AA5A]/25 text-slate-900 font-extrabold px-2.5 py-0.5 rounded-full border border-[#A3AA5A]/50">
                      84% Ready
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectStudent(st)}
                      className="px-3 py-1.5 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl font-bold shadow-xs text-xs inline-flex items-center gap-1 transition-all"
                    >
                      <span>Inspect Candidate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
