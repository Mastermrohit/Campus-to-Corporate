import React, { useState } from 'react';
import { FileCheck, Sparkles, AlertCircle, CheckCircle2, RefreshCw, Copy, Check } from 'lucide-react';
import { reviewResumeATS } from '../services/gemini';

export default function ResumeEnhancer({ studentProfile, apiKey }) {
  const [resumeText, setResumeText] = useState(studentProfile.resumeText || '');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole);
  const [isScanning, setIsScanning] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleScanResume = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    const result = await reviewResumeATS(resumeText, targetRole, apiKey);
    setAtsResult(result);
    setIsScanning(false);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E7B46A] flex items-center justify-center text-slate-900 shadow-sm font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">AI ATS Resume Reviewer & Bullet Enhancer</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Scans resume against target role ATS benchmarks and auto-rewrites bullet points using the STAR method.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Column */}
        <div className="lg:col-span-6 bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 mb-2">Target Role & Resume Input</h3>
          
          <form onSubmit={handleScanResume} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Raw Resume Text / Bullet Points</label>
              <textarea
                rows={9}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your current resume bullet points here..."
                className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-mono leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-3 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning ATS & Enhancing...' : 'Run ATS Resume Audit'}</span>
            </button>
          </form>
        </div>

        {/* Right Audit Results Column */}
        <div className="lg:col-span-6 bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 mb-2">ATS Audit Results & STAR Rewrites</h3>

          {!atsResult ? (
            <div className="h-72 flex flex-col items-center justify-center text-center p-6 bg-[#DFDFE3]/40 rounded-xl border border-slate-300">
              <FileCheck className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-xs text-slate-600 font-medium">Click "Run ATS Resume Audit" to analyze ATS compatibility and generate optimized metric-driven bullet points.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* ATS Score Header Card */}
              <div className="bg-[#DFDFE3]/60 p-4 rounded-xl border border-slate-300 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-600 font-medium">ATS Match Score</div>
                  <div className="text-2xl font-extrabold text-slate-900">{atsResult.atsScore} / 100</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-600 font-medium">Formatting Rating</div>
                  <div className="text-xs font-extrabold text-[#A3AA5A] bg-white px-2 py-1 rounded-md border border-slate-300">{atsResult.formattingRating}</div>
                </div>
              </div>

              {/* Missing ATS Keywords */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#F1A17E]" />
                  <span>Missing High-Impact ATS Keywords:</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="bg-[#F1A17E]/20 text-slate-900 text-[11px] px-2.5 py-0.5 rounded-md font-bold border border-[#F1A17E]/50">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet Rewrites */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-800">AI Suggested STAR Bullet Rewrites:</label>
                {atsResult.improvements.map((imp, idx) => (
                  <div key={idx} className="bg-[#DFDFE3]/40 p-3 rounded-xl border border-slate-300 space-y-2 text-xs">
                    <div className="text-rose-600 line-through text-[11px] font-medium">
                      Original: {imp.original}
                    </div>
                    <div className="text-slate-900 font-bold bg-[#A3AA5A]/20 p-2.5 rounded-lg border border-[#A3AA5A]/40 flex items-start justify-between gap-2">
                      <span>Suggested: {imp.suggested}</span>
                      <button
                        onClick={() => handleCopy(imp.suggested, idx)}
                        className="text-slate-600 hover:text-slate-900 p-1 shrink-0"
                        title="Copy text"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-slate-900 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 italic font-medium">Reason: {imp.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
