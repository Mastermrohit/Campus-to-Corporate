import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, Sparkles, User, GraduationCap, Award } from 'lucide-react';
import { CAREER_TARGETS } from '../data/mockData';

export default function ProfileUploadModal({ isOpen, onClose, studentProfile, onSaveProfile }) {
  const [formData, setFormData] = useState({ ...studentProfile });
  const [resumeText, setResumeText] = useState(studentProfile.resumeText || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      ...formData,
      resumeText
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#DFDFE3]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Academic & Skill Profile</h3>
              <p className="text-xs text-slate-600 font-medium">Update your details or upload your transcript/resume for AI evaluation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-[#DFDFE3] text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Career Role</label>
              <select
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A]"
              >
                {CAREER_TARGETS.map(t => (
                  <option key={t.id} value={t.title}>{t.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree & Major</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic CGPA / Score</label>
              <input
                type="text"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#E7B46A]"
                required
              />
            </div>
          </div>

          {/* Academic Marksheet / Resume Text Extractor */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
              <span>Paste Resume Text or Marksheet Transcript</span>
              <span className="text-[10px] text-[#D69E4E] font-extrabold">AI will parse missing skills automatically</span>
            </label>
            <textarea
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your raw resume summary, course grades, or project achievements here..."
              className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#E7B46A] font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#DFDFE3] hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Save & Re-run AI Analysis</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
