import React, { useState } from 'react';
import { BookOpen, Star, Clock, ExternalLink, Filter, CheckCircle2, Award } from 'lucide-react';
import { COURSES_CATALOG } from '../data/mockData';

export default function CourseCatalog({ aiAnalysis }) {
  const [filterSkill, setFilterSkill] = useState('All');

  const identifiedGaps = aiAnalysis?.skillGaps?.map(g => g.skill) || [
    'System Design', 'Docker & Kubernetes', 'Microservices', 'Unit Testing & CI/CD'
  ];

  const filteredCourses = filterSkill === 'All'
    ? COURSES_CATALOG
    : COURSES_CATALOG.filter(c => c.skillAddressed.toLowerCase().includes(filterSkill.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#D69E4E] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-[#E7B46A]" />
              <span>Targeted Skill Remediation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">AI-Recommended Online Courses & Certifications</h2>
            <p className="text-xs text-slate-600 mt-1">
              Handpicked learning paths from Swayam, Coursera, NPTEL, Udemy & Pluralsight to fill your exact skill gaps.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Filter Gap:
            </span>
            <button
              onClick={() => setFilterSkill('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                filterSkill === 'All' 
                  ? 'bg-[#E7B46A] text-slate-900' 
                  : 'bg-[#DFDFE3] text-slate-700 hover:bg-slate-300'
              }`}
            >
              All Recommended
            </button>
            {identifiedGaps.map((gap, i) => (
              <button
                key={i}
                onClick={() => setFilterSkill(gap)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  filterSkill === gap 
                    ? 'bg-[#E7B46A] text-slate-900' 
                    : 'bg-[#DFDFE3] text-slate-700 hover:bg-slate-300'
                }`}
              >
                {gap.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-slate-300 hover:border-[#E7B46A] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Course Header Banner */}
              <div className="h-36 relative overflow-hidden bg-slate-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 bg-[#E7B46A] text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Matches Gap: {course.skillAddressed}
                </span>

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-300 shadow-sm">
                  {course.provider}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#D69E4E] transition-colors leading-snug">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-slate-900 font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#E7B46A] text-[#E7B46A]" />
                    {course.rating} / 5.0
                  </span>
                  <span className="bg-[#DFDFE3] px-2 py-0.5 rounded-md text-slate-800 font-bold text-[11px]">
                    {course.level}
                  </span>
                </div>

                <div className="bg-[#DFDFE3]/50 border border-slate-300 p-3 rounded-xl text-xs text-slate-700 leading-relaxed">
                  <div className="font-bold text-slate-900 mb-0.5">Why AI Recommends This:</div>
                  Directly bridges your shortfall in <strong>{course.skillAddressed}</strong> to increase your Employability Index by ~8%.
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-200 mt-2">
              <span className="text-[11px] text-slate-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A3AA5A]" /> Verified Certification
              </span>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F1A17E] hover:bg-[#e68d68] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                <span>Enroll Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
