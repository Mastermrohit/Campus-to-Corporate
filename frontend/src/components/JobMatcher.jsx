import React from 'react';
import { Briefcase, MapPin, DollarSign, CheckCircle2, ArrowUpRight, Zap, Building2 } from 'lucide-react';
import { JOB_OPPORTUNITIES } from '../data/mockData';

export default function JobMatcher({ studentProfile }) {
  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#D69E4E] uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4 text-[#E7B46A]" />
              <span>Smart Match Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Internships & Job Opportunities</h2>
            <p className="text-xs text-slate-600 mt-1">
              Contextual matching engine pairing student skill profiles with verified open positions.
            </p>
          </div>
          <span className="bg-[#A3AA5A]/20 text-slate-900 border border-[#A3AA5A]/50 px-3 py-1.5 rounded-xl text-xs font-extrabold">
            3 High Match Opportunities Found
          </span>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {JOB_OPPORTUNITIES.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-slate-300 hover:border-[#E7B46A] rounded-2xl p-6 shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
          >
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DFDFE3] border border-slate-300 flex items-center justify-center text-slate-800 font-bold">
                  <Building2 className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#D69E4E] transition-colors">
                    {job.title}
                  </h3>
                  <div className="text-xs text-slate-600 flex items-center gap-2 font-medium">
                    <span className="font-bold text-slate-800">{job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tag Details */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-[#DFDFE3] text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-300">
                  {job.type}
                </span>
                <span className="bg-[#A3AA5A]/20 text-slate-900 font-extrabold px-2.5 py-1 rounded-lg border border-[#A3AA5A]/40">
                  {job.salary}
                </span>
              </div>

              {/* Key Skills Met */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 text-[11px] font-medium">Key Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.requirements.map((req, i) => (
                    <span key={i} className="bg-[#DFDFE3]/70 text-slate-800 px-2.5 py-0.5 rounded text-[11px] font-bold border border-slate-300">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Match Score & Action */}
            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-200 gap-3 shrink-0">
              <div className="flex items-center gap-1.5 bg-[#A3AA5A]/20 border border-[#A3AA5A]/50 px-3 py-1 rounded-xl">
                <Zap className="w-4 h-4 text-slate-900 fill-[#A3AA5A]" />
                <span className="text-xs font-extrabold text-slate-900">{job.matchScore}% Match Score</span>
              </div>

              <a
                href={job.link}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F1A17E] hover:bg-[#e68d68] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
