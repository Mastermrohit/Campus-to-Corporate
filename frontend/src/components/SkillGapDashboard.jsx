import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  Award, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  Clock, 
  TrendingUp,
  RefreshCw,
  Zap
} from 'lucide-react';
import { CAREER_TARGETS } from '../data/mockData';

export default function SkillGapDashboard({ 
  studentProfile, 
  aiAnalysis, 
  onSelectTargetRole, 
  onNavigateTab, 
  isAnalyzing,
  onReAnalyze,
  onOpenSurveyModal
}) {
  const currentTarget = CAREER_TARGETS.find(t => t.title === studentProfile.targetRole) || CAREER_TARGETS[0];

  // Radar data
  const radarData = (studentProfile.skills || []).map(skill => {
    const benchmark = currentTarget.benchmarkSkills[skill.name] || 75;
    return {
      skill: skill.name.length > 18 ? skill.name.substring(0, 16) + '...' : skill.name,
      fullName: skill.name,
      StudentLevel: skill.level,
      IndustryRequired: benchmark,
      gap: Math.max(0, benchmark - skill.level)
    };
  });

  // Calculate dynamic employability score %
  const totalWeight = radarData.reduce((acc, curr) => acc + curr.IndustryRequired, 0);
  const studentAchieved = radarData.reduce((acc, curr) => acc + Math.min(curr.StudentLevel, curr.IndustryRequired), 0);
  const calculatedEmployabilityScore = totalWeight > 0 ? Math.round((studentAchieved / totalWeight) * 100) : 78;

  const activeScore = aiAnalysis?.employabilityScore || calculatedEmployabilityScore;

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'High Readiness', color: 'bg-[#A3AA5A]/25 text-slate-900 border-[#A3AA5A]' };
    if (score >= 60) return { label: 'Moderate Readiness', color: 'bg-[#E7B46A]/25 text-slate-900 border-[#E7B46A]' };
    return { label: 'Needs Preparation', color: 'bg-[#F1A17E]/25 text-slate-900 border-[#F1A17E]' };
  };

  const badgeInfo = getScoreBadge(activeScore);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome & Role Selector Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#E7B46A]" />
              <span>Campus to Corporate AI Employability Navigator</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Welcome back, {studentProfile.name.split(' ')[0]}!</span>
              <span className="text-xs bg-[#E7B46A]/30 text-slate-900 font-bold px-2.5 py-0.5 rounded-full border border-[#E7B46A]">
                CGPA {studentProfile.cgpa}
              </span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Live AI skill-gap diagnosis and industry alignment for <span className="text-slate-900 font-bold">{studentProfile.targetRole}</span>.
            </p>
          </div>

          {/* Role Dropdown Selector */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Target Role</div>
              <div className="text-xs font-bold text-slate-900">{currentTarget.title}</div>
            </div>
            <select
              value={studentProfile.targetRole}
              onChange={(e) => onSelectTargetRole(e.target.value)}
              className="bg-[#DFDFE3] border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A] cursor-pointer"
            >
              {CAREER_TARGETS.map(t => (
                <option key={t.id} value={t.title}>
                  {t.title}
                </option>
              ))}
            </select>
            <button
              onClick={onOpenSurveyModal}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Survey</span>
            </button>
            <button
              onClick={onReAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F1A17E] hover:bg-[#e28a65] text-slate-900 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Re-Run AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row: Employability Score Gauge + Skill Gap Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Employability Score Gauge Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E7B46A]" />
                <span>Employability Readiness Index</span>
              </h3>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeInfo.color}`}>
                {badgeInfo.label}
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-[#DFDFE3] stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-[#A3AA5A] stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * activeScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-slate-900 tracking-tight">{activeScore}%</span>
                  <span className="text-xs text-slate-600 font-bold mt-0.5">Industry Match</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-[#DFDFE3]/50 border border-slate-200 p-3.5 rounded-xl leading-relaxed">
              {aiAnalysis?.overallSummary || `Candidate profile aligns well with junior ${studentProfile.targetRole} expectations. Addressing key skill shortfalls in System Design & DevOps will increase hiring probability by 25%.`}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-200 text-center">
            <div className="bg-[#DFDFE3]/40 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-600 uppercase">Avg Compensation</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{currentTarget.averageSalary}</div>
            </div>
            <div className="bg-[#DFDFE3]/40 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-600 uppercase">Identified Gaps</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">
                {aiAnalysis?.skillGaps?.length || 4} Key Shortfalls
              </div>
            </div>
          </div>
        </div>

        {/* Skill Gap Radar Chart Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Radar className="w-4 h-4 text-[#A3AA5A]" />
                  <span>Competency Matrix vs Industry Benchmark</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Visual overlay comparing student proficiency against target role industry standards.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#A3AA5A] inline-block"></span>
                  <span className="text-slate-800">Your Skill</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#E7B46A] inline-block"></span>
                  <span className="text-slate-800">Industry Required</span>
                </div>
              </div>
            </div>

            {/* Radar Chart Container */}
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#CBD0D8" />
                  <PolarAngleAxis dataKey="skill" stroke="#4A4E58" tick={{ fill: '#1C1E23', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#A0A5AF" />
                  <Radar
                    name="Your Skill Level"
                    dataKey="StudentLevel"
                    stroke="#838A3A"
                    fill="#A3AA5A"
                    fillOpacity={0.55}
                  />
                  <Radar
                    name="Industry Benchmark"
                    dataKey="IndustryRequired"
                    stroke="#D69E4E"
                    fill="#E7B46A"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD0D8', borderRadius: '12px', color: '#1C1E23' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FFFBEB] border border-[#E7B46A]/50 rounded-xl text-xs text-slate-800 mt-2">
            <span className="flex items-center gap-2 font-bold">
              <Zap className="w-4 h-4 text-[#F1A17E] shrink-0" />
              <span>Highest priority skill shortfall detected in <strong>System Design & Architecture</strong>.</span>
            </span>
            <button
              onClick={() => onNavigateTab('courses')}
              className="flex items-center gap-1 text-slate-900 hover:text-[#d69e4e] font-bold underline underline-offset-2 shrink-0"
            >
              <span>View Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Identified Skill Gaps Breakdown Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F1A17E]" />
              <span>Identified Skill Shortfalls & AI Recommendations</span>
            </h3>
            <p className="text-xs text-slate-600">
              Competency gaps extracted by AI analysis of student transcript and industry job requisitions.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('courses')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#DFDFE3] hover:bg-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-700" />
            <span>Browse Matching Courses</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {(aiAnalysis?.skillGaps || []).map((gap, index) => {
            const isHigh = gap.urgency === 'High';
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E7B46A]"></span>
                      <span>{gap.skill}</span>
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isHigh ? 'bg-[#F1A17E]/30 text-slate-900 border-[#F1A17E]' : 'bg-[#E7B46A]/30 text-slate-900 border-[#E7B46A]'
                    }`}>
                      {gap.urgency || 'High'} Priority
                    </span>
                  </div>

                  {/* Level Progress */}
                  <div className="space-y-1 my-3">
                    <div className="flex justify-between text-xs text-slate-600 font-bold">
                      <span>Current Proficiency: {gap.currentLevel}%</span>
                      <span>Required Benchmark: {gap.requiredLevel}%</span>
                    </div>
                    <div className="w-full bg-[#DFDFE3] rounded-full h-2 overflow-hidden flex">
                      <div 
                        className="bg-[#A3AA5A] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${gap.currentLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 bg-[#DFDFE3]/40 p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900 font-bold">AI Recommendation:</strong> {gap.recommendation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('courses')}
                    className="flex items-center gap-1.5 text-xs text-slate-900 hover:text-[#d69e4e] font-bold"
                  >
                    <span>Remediate Skill</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized AI Career Roadmap Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-[#A3AA5A]" />
            <span>Structured Path to Employability</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Personalized Step-by-Step Career Roadmap
          </h3>
          <p className="text-xs text-slate-600">
            Sequential progression roadmap to transform from campus student to corporate-ready candidate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(aiAnalysis?.personalizedRoadmap || []).map((phase, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl p-5 relative flex flex-col justify-between shadow-sm hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E7B46A] text-slate-900 font-bold text-xs flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-900 font-bold bg-[#DFDFE3] px-2.5 py-1 rounded-full border border-slate-300">
                    <Clock className="w-3 h-3 text-slate-700" />
                    <span>{phase.timeframe}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-0.5">{phase.phase}</h4>
                <div className="text-xs text-slate-700 font-bold mb-3">{phase.focusArea}</div>

                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  {phase.actionItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A3AA5A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Module Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => onNavigateTab('resume')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">AI ATS Resume Enhancer</h4>
          <p className="text-xs text-slate-600">Scan resume against ATS rules & auto-rewrite bullet points into STAR metrics.</p>
        </div>

        <div 
          onClick={() => onNavigateTab('mock-interview')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F1A17E] text-slate-900 flex items-center justify-center mb-3">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Interactive AI Mock Interview</h4>
          <p className="text-xs text-slate-600">Practice speech/text technical interviews with live AI scoring & model answers.</p>
        </div>

        <div 
          onClick={() => onNavigateTab('jobs')}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#A3AA5A] text-slate-900 flex items-center justify-center mb-3">
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Smart Job & Internship Matcher</h4>
          <p className="text-xs text-slate-600">Filter jobs and apprenticeships based on your candidate match score.</p>
        </div>
      </div>
    </div>
  );
}
