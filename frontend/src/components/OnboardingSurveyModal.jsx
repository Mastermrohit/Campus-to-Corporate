import React, { useState } from 'react';
import { 
  Sparkles, 
  Code, 
  Briefcase, 
  Landmark, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  BrainCircuit,
  Check,
  Building2,
  FileCheck
} from 'lucide-react';
import { CAREER_TARGETS } from '../data/mockData';

export default function OnboardingSurveyModal({ isOpen, onClose, studentProfile, onCompleteSurvey }) {
  const [step, setStep] = useState(1);
  const [selectedSector, setSelectedSector] = useState(studentProfile?.sector || 'technical');
  const [targetRole, setTargetRole] = useState(studentProfile?.targetRole || 'Software Engineer (Backend)');
  
  // Sector-specific survey answers
  const [techAnswers, setTechAnswers] = useState({
    primaryLang: 'Java / Python',
    biggestGap: 'System Design',
    expectedPackage: '₹12 - ₹24 LPA'
  });

  const [nonTechAnswers, setNonTechAnswers] = useState({
    primaryTool: 'Figma & User Research',
    coreStrength: 'Communication & Stakeholder Mgmt',
    expectedPackage: '₹10 - ₹18 LPA'
  });

  const [govtAnswers, setGovtAnswers] = useState({
    govtDomain: 'Public Sector Enterprise Officer (PSU)',
    examPrepStatus: 'Direct Campus Recruitment / GATE',
    minCgpa: '8.0+ CGPA Verified'
  });

  // Resume PDF Upload state
  const [resumeFile, setResumeFile] = useState(null);
  const [extractedResumeText, setExtractedResumeText] = useState(studentProfile?.resumeText || '');
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const [isProcessingAi, setIsProcessingAi] = useState(false);

  if (!isOpen) return null;

  // Filter available target roles based on selected sector
  const availableRoles = CAREER_TARGETS.filter(t => t.category === selectedSector);

  const handleSectorSelect = (sectorKey) => {
    setSelectedSector(sectorKey);
    const rolesForSector = CAREER_TARGETS.filter(t => t.category === sectorKey);
    if (rolesForSector.length > 0) {
      setTargetRole(rolesForSector[0].title);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setIsReadingPdf(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      // Extract clean text content from file
      let cleanedText = '';
      if (typeof content === 'string') {
        cleanedText = content;
      } else {
        // Fallback text extraction for binary buffers
        const dec = new TextDecoder('utf-8');
        cleanedText = dec.decode(content).replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      }

      if (cleanedText.trim().length < 20) {
        cleanedText = `${studentProfile?.name || 'Candidate'} | ${selectedSector.toUpperCase()} Candidate\nFile: ${file.name}\nTarget Role: ${targetRole}\nEducation: ${studentProfile?.degree || 'B.Tech CS'} (${studentProfile?.cgpa || '8.4 CGPA'})\nProjects & Skills: ${selectedSector === 'technical' ? 'Java, Python, SQL, REST APIs, Git' : selectedSector === 'non-technical' ? 'Figma, Agile, Business Analysis, Product Strategy' : 'Core Engineering, PSU Technical Standards, Cyber Governance'}`;
      }

      setExtractedResumeText(cleanedText);
      setIsReadingPdf(false);
    };

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFinalSubmit = () => {
    setIsProcessingAi(true);

    setTimeout(() => {
      const updatedProfile = {
        ...studentProfile,
        sector: selectedSector,
        targetRole: targetRole,
        resumeText: extractedResumeText || `${studentProfile?.name} | Candidate seeking ${targetRole} opportunities.`
      };

      onCompleteSurvey(updatedProfile);
      setIsProcessingAi(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-white border border-slate-300 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Wizard Progress Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#DFDFE3]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center font-bold shadow-xs">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>AI Onboarding Career Survey</span>
                <span className="text-[10px] bg-[#A3AA5A]/30 text-slate-900 font-extrabold px-2 py-0.5 rounded-full border border-[#A3AA5A]/50">
                  Step {step} of 3
                </span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">Customize your target career pathway & run live AI diagnosis</p>
            </div>
          </div>
          
          {/* Step Pill Indicators */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  step === s ? 'bg-[#E7B46A] w-6' : step > s ? 'bg-[#A3AA5A]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: SECTOR SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                  Which Job Sector Do You Want To Pursue?
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Select your primary career interest to personalize your skill benchmarks, courses, & job matcher.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Technical Card */}
                <button
                  type="button"
                  onClick={() => handleSectorSelect('technical')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 shadow-xs ${
                    selectedSector === 'technical'
                      ? 'bg-[#E7B46A]/20 border-[#E7B46A] ring-2 ring-[#E7B46A]'
                      : 'bg-[#DFDFE3]/30 border-slate-300 hover:bg-[#DFDFE3]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#E7B46A] text-slate-900 flex items-center justify-center font-bold">
                      <Code className="w-5 h-5" />
                    </div>
                    {selectedSector === 'technical' && <CheckCircle2 className="w-5 h-5 text-slate-900 fill-[#E7B46A]" />}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Technical Job Sector</div>
                    <div className="text-[11px] text-slate-600 mt-1 font-medium">Software, AI/ML, Full-Stack, Cloud & DevOps</div>
                  </div>
                </button>

                {/* Non-Technical Card */}
                <button
                  type="button"
                  onClick={() => handleSectorSelect('non-technical')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 shadow-xs ${
                    selectedSector === 'non-technical'
                      ? 'bg-[#F1A17E]/20 border-[#F1A17E] ring-2 ring-[#F1A17E]'
                      : 'bg-[#DFDFE3]/30 border-slate-300 hover:bg-[#DFDFE3]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#F1A17E] text-slate-900 flex items-center justify-center font-bold">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    {selectedSector === 'non-technical' && <CheckCircle2 className="w-5 h-5 text-slate-900 fill-[#F1A17E]" />}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Non-Technical Sector</div>
                    <div className="text-[11px] text-slate-600 mt-1 font-medium">Product Mgmt, UI/UX Design, Business Analytics</div>
                  </div>
                </button>

                {/* Government Card */}
                <button
                  type="button"
                  onClick={() => handleSectorSelect('government')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 shadow-xs ${
                    selectedSector === 'government'
                      ? 'bg-[#A3AA5A]/25 border-[#A3AA5A] ring-2 ring-[#A3AA5A]'
                      : 'bg-[#DFDFE3]/30 border-slate-300 hover:bg-[#DFDFE3]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#A3AA5A] text-slate-900 flex items-center justify-center font-bold">
                      <Landmark className="w-5 h-5" />
                    </div>
                    {selectedSector === 'government' && <CheckCircle2 className="w-5 h-5 text-slate-900 fill-[#A3AA5A]" />}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Government Sector</div>
                    <div className="text-[11px] text-slate-600 mt-1 font-medium">PSU Technical Officers, Digital Infrastructure</div>
                  </div>
                </button>
              </div>

              {/* Target Role Dropdown for Sector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Target Position in {selectedSector.toUpperCase()}:</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-[#DFDFE3]/50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#E7B46A]"
                >
                  {availableRoles.map(r => (
                    <option key={r.id} value={r.title}>{r.title}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY-SPECIFIC SURVEY QUESTIONNAIRE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                  <span>{selectedSector.toUpperCase()} Sector Preference Survey</span>
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Help the AI engine fine-tune your competency benchmarks and interview prep modules.
                </p>
              </div>

              {/* TECHNICAL SURVEY */}
              {selectedSector === 'technical' && (
                <div className="space-y-3.5 bg-[#DFDFE3]/40 p-4 rounded-2xl border border-slate-300">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Primary Programming Stack:</label>
                    <select
                      value={techAnswers.primaryLang}
                      onChange={(e) => setTechAnswers({ ...techAnswers, primaryLang: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    >
                      <option value="Java / Python">Java / Python</option>
                      <option value="JavaScript / Node.js">JavaScript / Node.js / React</option>
                      <option value="C++ / Data Structures">C++ / High Performance Computing</option>
                      <option value="Go / Rust / Cloud">Go / Rust / Cloud Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Area of Biggest Skill Shortfall:</label>
                    <select
                      value={techAnswers.biggestGap}
                      onChange={(e) => setTechAnswers({ ...techAnswers, biggestGap: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    >
                      <option value="System Design">System Design & Distributed Architecture</option>
                      <option value="Docker & Kubernetes">Docker & Kubernetes Containerization</option>
                      <option value="Microservices">Microservices & Event-Driven Architecture</option>
                      <option value="Unit Testing & CI/CD">Unit Testing & CI/CD Pipelines</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Target Annual Compensation (INR):</label>
                    <input
                      type="text"
                      value={techAnswers.expectedPackage}
                      onChange={(e) => setTechAnswers({ ...techAnswers, expectedPackage: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>
              )}

              {/* NON-TECHNICAL SURVEY */}
              {selectedSector === 'non-technical' && (
                <div className="space-y-3.5 bg-[#DFDFE3]/40 p-4 rounded-2xl border border-slate-300">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Primary Analytical / Design Tools Known:</label>
                    <select
                      value={nonTechAnswers.primaryTool}
                      onChange={(e) => setNonTechAnswers({ ...nonTechAnswers, primaryTool: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    >
                      <option value="Figma & User Research">Figma, Wireframing & User Testing</option>
                      <option value="SQL & PowerBI">SQL, Excel & Data Visualization (PowerBI/Tableau)</option>
                      <option value="Jira & Agile">Jira, Product Roadmapping & Agile Methodology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Core Professional Strength:</label>
                    <select
                      value={nonTechAnswers.coreStrength}
                      onChange={(e) => setNonTechAnswers({ ...nonTechAnswers, coreStrength: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    >
                      <option value="Communication & Stakeholder Mgmt">Communication & Stakeholder Management</option>
                      <option value="User Empathy & Research">User Empathy & Product Prototyping</option>
                      <option value="Data-Driven Decision Making">Data-Driven Business Decision Making</option>
                    </select>
                  </div>
                </div>
              )}

              {/* GOVERNMENT SURVEY */}
              {selectedSector === 'government' && (
                <div className="space-y-3.5 bg-[#DFDFE3]/40 p-4 rounded-2xl border border-slate-300">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Preferred Public Agency Sector:</label>
                    <select
                      value={govtAnswers.govtDomain}
                      onChange={(e) => setGovtAnswers({ ...govtAnswers, govtDomain: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                    >
                      <option value="Public Sector Enterprise Officer (PSU)">PSU Technical Officers (C-DAC, NIC, BEL, BHEL, ISRO)</option>
                      <option value="Government Digital Infrastructure Specialist">State/National e-Governance & Digital Infra</option>
                      <option value="Cybersecurity Fellowship">National Cybersecurity & Defense R&D Fellowship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Academic Criteria Confirmation:</label>
                    <input
                      type="text"
                      disabled
                      value={govtAnswers.minCgpa}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-extrabold"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PDF / DOCUMENT RESUME UPLOAD */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#E7B46A]" />
                  <span>Upload Resume (PDF / TXT Format)</span>
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Upload your candidate resume file so the AI engine can extract your actual skills and generate your STAR improvement plan.
                </p>
              </div>

              {/* Dropzone File Picker */}
              <div className="border-2 border-dashed border-slate-300 hover:border-[#E7B46A] bg-[#DFDFE3]/30 rounded-2xl p-6 text-center space-y-3 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="w-12 h-12 rounded-2xl bg-[#E7B46A] text-slate-900 mx-auto flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>

                <div>
                  <div className="text-xs font-extrabold text-slate-900">
                    {resumeFile ? resumeFile.name : 'Click to Upload Resume (PDF / Text)'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB • File Loaded` : 'Supports PDF, TXT, DOCX formats'}
                  </div>
                </div>
              </div>

              {/* Extracted Resume Text Box */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Parsed Resume Text Content:</span>
                  <span className="text-[10px] text-[#D69E4E] font-extrabold">Ready for AI Engine</span>
                </label>
                <textarea
                  rows={4}
                  value={extractedResumeText}
                  onChange={(e) => setExtractedResumeText(e.target.value)}
                  placeholder="Extracted text from uploaded PDF/document will appear here..."
                  className="w-full bg-[#DFDFE3]/40 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#E7B46A]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Wizard Navigation Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-[#DFDFE3]/50 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-[#E7B46A] hover:bg-[#d69e4e] text-slate-900 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all ml-auto"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isProcessingAi}
              className="px-6 py-2.5 bg-[#F1A17E] hover:bg-[#e28a65] text-slate-900 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-2 transition-all disabled:opacity-50 ml-auto"
            >
              <Sparkles className={`w-4 h-4 ${isProcessingAi ? 'animate-spin' : ''}`} />
              <span>{isProcessingAi ? 'Running AI Career Engine...' : 'Complete Survey & Run AI Diagnosis'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
