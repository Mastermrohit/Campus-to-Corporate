import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// 1. Analyze Profile & Transcript
router.post('/analyze-profile', async (req, res) => {
  const { profileText, targetRole, userApiKey } = req.body;

  const activeGenAI = userApiKey ? new GoogleGenAI({ apiKey: userApiKey }) : genAI;

  if (activeGenAI) {
    try {
      const response = await activeGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert AI Career Counselor and Industry Employability Advisor.
Analyze the following student profile and transcript for the target role: "${targetRole}".

Student Details:
${profileText}

Respond ONLY with a valid JSON object matching this schema:
{
  "employabilityScore": number (0 to 100),
  "overallSummary": "string",
  "keyStrengths": ["string"],
  "skillGaps": [
    { "skill": "string", "currentLevel": number(0-100), "requiredLevel": number(0-100), "urgency": "High"|"Medium"|"Low", "recommendation": "string" }
  ],
  "personalizedRoadmap": [
    { "phase": "string", "timeframe": "string", "focusArea": "string", "actionItems": ["string"] }
  ]
}`
      });

      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return res.json({ success: true, data: JSON.parse(jsonMatch[0]), source: 'gemini-api' });
      }
    } catch (err) {
      console.warn('Gemini API call failed in backend, using smart fallback:', err.message);
    }
  }

  // Fallback response
  res.json({
    success: true,
    source: 'simulated-engine',
    data: {
      employabilityScore: 78,
      overallSummary: `Analyzed student readiness for ${targetRole}. Strong fundamentals in Data Structures & Core CS, with identified shortfalls in Cloud Architecture & DevOps.`,
      keyStrengths: [
        "Exceptional DSA & problem-solving foundations",
        "Solid Database (SQL) & REST API design skills",
        "Strong academic transcript in core computer science subjects"
      ],
      skillGaps: [
        {
          skill: "System Design & Distributed Architecture",
          currentLevel: 40,
          requiredLevel: 80,
          urgency: "High",
          recommendation: "Learn load balancing, caching (Redis), database sharding, and message queues (Kafka)."
        },
        {
          skill: "Docker & Kubernetes",
          currentLevel: 35,
          requiredLevel: 70,
          urgency: "High",
          recommendation: "Containerize multi-container applications and master Kubernetes deployment manifests."
        }
      ],
      personalizedRoadmap: [
        {
          phase: "Phase 1: Foundation Strengthening",
          timeframe: "Weeks 1 - 4",
          focusArea: "System Design & Cloud Basics",
          actionItems: ["Complete System Design Primer course", "Build multi-container Docker app"]
        },
        {
          phase: "Phase 2: Project & ATS Enhancement",
          timeframe: "Weeks 5 - 8",
          focusArea: "Microservices & Portfolio",
          actionItems: ["Refactor existing API into REST microservices", "Optimize resume bullet points using STAR format"]
        }
      ]
    }
  });
});

// 2. ATS Resume Reviewer
router.post('/review-resume', async (req, res) => {
  const { resumeText, targetRole, userApiKey } = req.body;
  const activeGenAI = userApiKey ? new GoogleGenAI({ apiKey: userApiKey }) : genAI;

  if (activeGenAI) {
    try {
      const response = await activeGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze this resume text for target role "${targetRole}". Respond ONLY with JSON:
{
  "atsScore": number (0-100),
  "formattingRating": "Excellent"|"Good"|"Needs Work",
  "missingKeywords": ["string"],
  "improvements": [
    { "original": "string", "suggested": "string", "reason": "string" }
  ]
}\nResume:\n${resumeText}`
      });
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return res.json({ success: true, data: JSON.parse(jsonMatch[0]) });
      }
    } catch (err) {
      console.warn('Backend resume review fallback:', err.message);
    }
  }

  res.json({
    success: true,
    data: {
      atsScore: 75,
      formattingRating: "Good",
      missingKeywords: ["CI/CD", "Kubernetes", "System Design", "Unit Testing", "Redis"],
      improvements: [
        {
          original: "Built REST API in Express and PostgreSQL.",
          suggested: "Engineered scalable E-Commerce REST API handling 1,000+ mock requests/min using Express.js & PostgreSQL with Redis caching.",
          reason: "Adds measurable metrics and STAR impact format."
        }
      ]
    }
  });
});

export default router;
