import React from 'react';
import { Landmark, Calendar, DollarSign, ExternalLink, ShieldCheck, Award, Filter } from 'lucide-react';
import { PUBLIC_GOVT_OPPORTUNITIES } from '../data/mockData';

export default function GovtOpportunities() {
  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#D69E4E] uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4 text-[#E7B46A]" />
              <span>Public Sector & Government Career Pathways</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Government Job Openings & Apprenticeships</h2>
            <p className="text-xs text-slate-600 mt-1">
              Curated official government technological initiatives, national apprenticeships, and public enterprise careers.
            </p>
          </div>
          <span className="bg-[#A3AA5A]/20 text-slate-900 border border-[#A3AA5A]/50 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#A3AA5A]" /> Official Public Listings
          </span>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PUBLIC_GOVT_OPPORTUNITIES.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-300 hover:border-[#E7B46A] rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="bg-[#E7B46A] text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-xs">
                  {item.category}
                </span>
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Deadline: {item.deadline}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#D69E4E] transition-colors leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs text-slate-600 font-medium mt-0.5">{item.agency}</div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="bg-[#A3AA5A]/20 text-slate-900 font-extrabold px-2.5 py-1 rounded-lg border border-[#A3AA5A]/40">
                  {item.stipend}
                </span>
                <span className="bg-[#DFDFE3] text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-300">
                  Duration: {item.duration}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-[#DFDFE3]/50 p-3 rounded-xl border border-slate-300 font-medium">
                {item.details}
              </p>

              <div className="text-[11px] text-slate-600 font-medium">
                <strong className="text-slate-900 font-bold">Eligibility:</strong> {item.eligibility}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => alert(`Redirecting to official government portal for ${item.title}`)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F1A17E] hover:bg-[#e68d68] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                <span>View Official Notification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
