import express from 'express';

const router = express.Router();

const JOBS = [
  {
    id: "j1",
    title: "Junior Backend Engineer",
    company: "CloudScale Technologies",
    location: "Remote / Hybrid",
    type: "Full-Time",
    salary: "$85,000 - $100,000",
    matchScore: 92,
    requirements: ["REST APIs", "Node.js/Python", "SQL", "Git"]
  },
  {
    id: "j2",
    title: "Software Engineering Intern (Summer)",
    company: "DataDrive Labs",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    salary: "$45 / hour",
    matchScore: 88,
    requirements: ["Data Structures", "Java or Python", "Basic SQL"]
  }
];

const GOVT_SCHEMES = [
  {
    id: "g1",
    title: "National Digital Talent Apprenticeship Program",
    agency: "Department of Higher Education & Technology",
    stipend: "$1,200 / month",
    duration: "12 Months",
    eligibility: "Final year students & fresh graduates in CS/IT/STEM",
    deadline: "Oct 30, 2026",
    category: "Apprenticeship"
  },
  {
    id: "g2",
    title: "MP Rojgar Digital Apprenticeship Initiative",
    agency: "Government of Madhya Pradesh",
    stipend: "₹15,000 / month",
    duration: "6 Months",
    eligibility: "Graduates from MP State Recognized Colleges",
    deadline: "Nov 15, 2026",
    category: "State Apprenticeship"
  }
];

router.get('/jobs', (req, res) => {
  res.json({ success: true, jobs: JOBS });
});

router.get('/govt-schemes', (req, res) => {
  res.json({ success: true, schemes: GOVT_SCHEMES });
});

export default router;
