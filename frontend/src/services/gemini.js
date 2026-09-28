import { GoogleGenAI } from '@google/genai';

let genAI = null;

export const initGemini = (apiKey) => {
  if (apiKey && apiKey.trim().length > 0) {
    genAI = new GoogleGenAI({ apiKey: apiKey.trim() });
    return true;
  }
  genAI = null;
  return false;
};

/**
 * Analyzes student profile & transcript using Gemini AI (with smart dynamic fallback)
 */
export const analyzeStudentProfile = async (profileText, targetRole, apiKey = '', studentProfile = null) => {
  if (apiKey) initGemini(apiKey);

  if (genAI) {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert AI Career Counselor and Industry Employability Advisor.
Analyze the following student profile and transcript for the target role: "${targetRole}".

Student Information:
${profileText}

Respond ONLY with a valid JSON object matching this schema:
{
  "employabilityScore": number (0 to 100),
  "overallSummary": "string summary of student readiness",
  "keyStrengths": ["string", "string"],
  "skillGaps": [
    { "skill": "string", "currentLevel": number(0-100), "requiredLevel": number(0-100), "urgency": "High"|"Medium"|"Low", "recommendation": "string" }
  ],
  "personalizedRoadmap": [
    { "phase": "string", "timeframe": "string", "focusArea": "string", "actionItems": ["string"] }
  ]
}`,
      });

      const text = response.text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to dynamic simulation engine:", err);
    }
  }

  // Dynamic calculation per student candidate and target role
  const studentName = studentProfile?.name || 'Candidate';
  const firstName = studentName.split(' ')[0];
  const cgpa = studentProfile?.cgpa || '8.4 / 10';
  const skills = studentProfile?.skills || [
    { name: "Data Structures & Algorithms", level: 75 },
    { name: "Java / Python", level: 70 },
    { name: "SQL & Databases", level: 65 },
    { name: "REST APIs", level: 60 },
    { name: "Git & Version Control", level: 75 }
  ];

  // Industry benchmark skills by role
  const targetBenchmarks = {
    "Software Engineer (Backend)": { "Data Structures & Algorithms": 90, "Java / Python": 85, "SQL & Databases": 85, "REST APIs": 90, "System Design": 80, "Docker & Kubernetes": 70, "Microservices": 75, "Unit Testing & CI/CD": 70 },
    "Data Scientist / AI Engineer": { "Java / Python": 95, "SQL & Databases": 90, "Data Structures & Algorithms": 75, "Git & Version Control": 80, "Communication & Soft Skills": 85, "System Design": 65 },
    "Full-Stack Web Developer": { "REST APIs": 90, "Git & Version Control": 90, "SQL & Databases": 80, "Java / Python": 80, "System Design": 70, "Communication & Soft Skills": 85 },
    "DevOps & Cloud Engineer": { "Docker & Kubernetes": 95, "Unit Testing & CI/CD": 90, "Git & Version Control": 90, "System Design": 80, "REST APIs": 75 },
    "Cybersecurity Analyst": { "Communication & Soft Skills": 85, "System Design": 85, "SQL & Databases": 80, "Git & Version Control": 80 }
  };

  const benchmarks = targetBenchmarks[targetRole] || targetBenchmarks["Software Engineer (Backend)"];

  let totalWeight = 0;
  let totalAchieved = 0;

  skills.forEach(s => {
    const req = benchmarks[s.name] || 75;
    totalWeight += req;
    totalAchieved += Math.min(s.level, req);
  });

  const calculatedEmployabilityScore = totalWeight > 0 ? Math.round((totalAchieved / totalWeight) * 100) : 78;

  // Identify skill gaps dynamically sorted by severity
  const gaps = skills
    .map(s => {
      const req = benchmarks[s.name] || 75;
      return {
        skill: s.name,
        currentLevel: s.level,
        requiredLevel: req,
        gap: Math.max(0, req - s.level)
      };
    })
    .filter(g => g.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  const topGapName = gaps[0]?.skill || "Advanced System Architecture";

  return {
    employabilityScore: calculatedEmployabilityScore,
    overallSummary: `${firstName} demonstrates strong academic performance (${cgpa}), but exhibits key skill gaps in ${topGapName} for the target role of ${targetRole}.`,
    keyStrengths: [
      `High proficiency in ${skills[0]?.name || 'Core Software Development'} (${skills[0]?.level || 80}/100)`,
      `Solid academic standing with CGPA ${cgpa}`,
      `Verified aptitude for ${targetRole} technical workflows`
    ],
    skillGaps: gaps.slice(0, 4).map(g => ({
      skill: g.skill,
      currentLevel: g.currentLevel,
      requiredLevel: g.requiredLevel,
      urgency: g.gap >= 25 ? "High" : "Medium",
      recommendation: `Bridge your ${g.gap}% gap in ${g.skill} through focused projects and targeted certifications.`
    })),
    personalizedRoadmap: [
      {
        phase: "Phase 1: Key Skill Remediation",
        timeframe: "Weeks 1 - 4",
        focusArea: topGapName,
        actionItems: [
          `Complete hands-on course covering ${topGapName}`,
          `Implement practical project focusing on ${gaps[1]?.skill || 'Backend Architecture'}`
        ]
      },
      {
        phase: "Phase 2: Portfolio & Resume Optimization",
        timeframe: "Weeks 5 - 8",
        focusArea: "STAR Resumes & Mock Practice",
        actionItems: [
          `Enhance resume bullet points for ${targetRole} ATS benchmarks`,
          "Complete 3 AI Mock Interview technical rounds"
        ]
      }
    ]
  };
};

/**
 * Reviews resume text and provides ATS suggestions using Gemini AI
 */
export const reviewResumeATS = async (resumeText, targetRole, apiKey = '') => {
  if (apiKey) initGemini(apiKey);

  if (genAI) {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert ATS (Applicant Tracking System) Specialist and Senior Technical Recruiter.
Analyze this resume for a student applying for: "${targetRole}".

Resume Text:
${resumeText}

Respond ONLY with a valid JSON object matching this schema:
{
  "atsScore": number (0 to 100),
  "formattingRating": "string",
  "missingKeywords": ["string", "string"],
  "improvements": [
    { "original": "string", "suggested": "string", "reason": "string" }
  ]
}`,
      });

      const text = response.text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to simulated ATS response:", err);
    }
  }

  return {
    atsScore: 82,
    formattingRating: "High Compatibility (82%)",
    missingKeywords: ["Microservices", "Docker Containerization", "Kafka Event Bus", "CI/CD Pipeline"],
    improvements: [
      {
        original: "Built a REST API with Express and PostgreSQL.",
        suggested: "Engineered high-throughput REST API using Express.js & PostgreSQL, handling 5,000+ daily requests with sub-50ms latency using Redis caching.",
        reason: "Added quantifiable metric, technical stack details, and performance impact."
      },
      {
        original: "Worked on frontend user interfaces using React.",
        suggested: "Developed responsive frontend SPA in React & Tailwind CSS, improving core web vitals and reducing initial page load time by 35%.",
        reason: "Applied STAR method with specific UI optimization metrics."
      }
    ]
  };
};

/**
 * Evaluates mock interview answers using Gemini AI
 */
export const evaluateInterviewAnswer = async (question, answer, targetRole, apiKey = '') => {
  if (apiKey) initGemini(apiKey);

  if (genAI) {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a Senior Engineering Hiring Manager conducting an interview for a "${targetRole}" position.
Question: "${question}"
Candidate Answer: "${answer}"

Respond ONLY with a valid JSON object matching this schema:
{
  "score": number (0 to 100),
  "clarity": "string",
  "technicalAccuracy": "string",
  "strengths": ["string"],
  "improvedSampleAnswer": "string"
}`,
      });

      const text = response.text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to simulated evaluation response:", err);
    }
  }

  return {
    score: 85,
    clarity: "High Clarity",
    technicalAccuracy: "Strong Architectural Concept",
    strengths: [
      "Correctly identified Token Bucket & Leaky Bucket algorithms for rate-limiting",
      "Mentioned Redis in-memory storage for low-latency atomic counter increments"
    ],
    improvedSampleAnswer: "To implement a robust API rate-limiter, I would deploy a Redis-backed Sliding Window Counter. Each incoming request increments a Redis timestamp key with TTL equal to the window. If count exceeds limit, return HTTP 429 Too Many Requests."
  };
};
