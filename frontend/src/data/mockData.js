export const DEFAULT_STUDENT_PROFILE = {
  name: "Rohan Sharma",
  email: "rohan.sharma@example.edu",
  college: "Institute of Technology & Science",
  degree: "B.Tech in Computer Science & Engineering",
  year: "Final Year (8th Semester)",
  cgpa: "8.4 / 10",
  targetRole: "Software Engineer (Backend)",
  sector: "technical",
  skills: [
    { name: "Data Structures & Algorithms", level: 85, category: "Core CS" },
    { name: "Java / Python", level: 80, category: "Languages" },
    { name: "SQL & Databases", level: 75, category: "Backend" },
    { name: "REST APIs", level: 70, category: "Backend" },
    { name: "Git & Version Control", level: 80, category: "Tools" },
    { name: "System Design", level: 40, category: "Architecture" },
    { name: "Docker & Kubernetes", level: 35, category: "DevOps" },
    { name: "Microservices", level: 45, category: "Backend" },
    { name: "Unit Testing & CI/CD", level: 30, category: "DevOps" },
    { name: "Communication & Soft Skills", level: 75, category: "Behavioral" }
  ],
  academicHistory: [
    { subject: "Data Structures & Algorithms", grade: "A+", credits: 4 },
    { subject: "Database Management Systems", grade: "A", credits: 4 },
    { subject: "Operating Systems", grade: "B+", credits: 3 },
    { subject: "Computer Networks", grade: "A", credits: 3 },
    { subject: "Software Engineering Principles", grade: "A", credits: 3 },
    { subject: "Distributed Systems (Elective)", grade: "B", credits: 3 }
  ],
  resumeText: `Rohan Sharma | Full Stack & Backend Enthusiast
Education: B.Tech Computer Science (8.4 CGPA)
Projects:
- E-Commerce REST API built with Express.js and PostgreSQL. Implemented JWT auth and Redis caching.
- Student Management Portal in React and Firebase with real-time updates.
Skills: Java, Python, JavaScript, Express.js, PostgreSQL, Git, React`
};

export const CAREER_TARGETS = [
  // TECHNICAL SECTOR
  {
    id: "backend-dev",
    category: "technical",
    title: "Software Engineer (Backend)",
    description: "Designs, builds, and maintains server-side web applications, databases, and microservices architecture.",
    averageSalary: "₹12,00,000 - ₹24,00,000 / yr",
    benchmarkSkills: {
      "Data Structures & Algorithms": 90,
      "Java / Python": 85,
      "SQL & Databases": 85,
      "REST APIs": 90,
      "Git & Version Control": 85,
      "System Design": 80,
      "Docker & Kubernetes": 70,
      "Microservices": 75,
      "Unit Testing & CI/CD": 70,
      "Communication & Soft Skills": 80
    }
  },
  {
    id: "data-scientist",
    category: "technical",
    title: "Data Scientist / AI Engineer",
    description: "Extracts insights from large datasets, builds ML models, and deploys predictive AI pipelines.",
    averageSalary: "₹14,00,000 - ₹28,00,000 / yr",
    benchmarkSkills: {
      "Data Structures & Algorithms": 75,
      "Java / Python": 95,
      "SQL & Databases": 90,
      "REST APIs": 60,
      "Git & Version Control": 80,
      "System Design": 65,
      "Docker & Kubernetes": 60,
      "Microservices": 50,
      "Unit Testing & CI/CD": 65,
      "Communication & Soft Skills": 85
    }
  },
  {
    id: "fullstack-dev",
    category: "technical",
    title: "Full-Stack Web Developer",
    description: "Builds complete web applications covering frontend user interfaces, backend APIs, and database persistence.",
    averageSalary: "₹10,00,000 - ₹22,00,000 / yr",
    benchmarkSkills: {
      "Data Structures & Algorithms": 80,
      "Java / Python": 80,
      "SQL & Databases": 80,
      "REST APIs": 90,
      "Git & Version Control": 90,
      "System Design": 70,
      "Docker & Kubernetes": 60,
      "Microservices": 60,
      "Unit Testing & CI/CD": 65,
      "Communication & Soft Skills": 85
    }
  },
  {
    id: "devops-engineer",
    category: "technical",
    title: "DevOps & Cloud Engineer",
    description: "Automates software delivery pipelines, manages cloud infrastructure (AWS/GCP/Azure), and maintains reliability.",
    averageSalary: "₹12,00,000 - ₹25,00,000 / yr",
    benchmarkSkills: {
      "Data Structures & Algorithms": 60,
      "Java / Python": 70,
      "SQL & Databases": 70,
      "REST APIs": 70,
      "Git & Version Control": 95,
      "System Design": 85,
      "Docker & Kubernetes": 95,
      "Microservices": 80,
      "Unit Testing & CI/CD": 95,
      "Communication & Soft Skills": 80
    }
  },

  // NON-TECHNICAL SECTOR
  {
    id: "product-manager",
    category: "non-technical",
    title: "Product Manager / Business Analyst",
    description: "Defines product roadmaps, gathers business requirements, leads cross-functional teams, and analyzes user metrics.",
    averageSalary: "₹12,00,000 - ₹22,00,000 / yr",
    benchmarkSkills: {
      "Communication & Soft Skills": 95,
      "SQL & Databases": 70,
      "System Design": 65,
      "Git & Version Control": 60,
      "Data Structures & Algorithms": 50,
      "Java / Python": 50
    }
  },
  {
    id: "uiux-designer",
    category: "non-technical",
    title: "UI/UX & Product Designer",
    description: "Crafts intuitive user experiences, design systems, wireframes, and interactive prototypes for web & mobile apps.",
    averageSalary: "₹8,00,000 - ₹18,00,000 / yr",
    benchmarkSkills: {
      "Communication & Soft Skills": 90,
      "REST APIs": 60,
      "Git & Version Control": 60,
      "Data Structures & Algorithms": 40,
      "Java / Python": 40
    }
  },

  // GOVERNMENT SECTOR
  {
    id: "psu-officer",
    category: "government",
    title: "Public Sector Enterprise Officer (PSU)",
    description: "Technical & managerial role in government enterprises (C-DAC, NIC, BEL, BHEL, ISRO, NTPC).",
    averageSalary: "₹9,00,000 - ₹16,00,000 / yr",
    benchmarkSkills: {
      "Data Structures & Algorithms": 85,
      "Java / Python": 80,
      "SQL & Databases": 80,
      "Communication & Soft Skills": 85,
      "System Design": 75,
      "Unit Testing & CI/CD": 60
    }
  },
  {
    id: "govt-digital-infra",
    category: "government",
    title: "Government Digital Infrastructure Specialist",
    description: "Manages public digital infrastructure, e-governance portals, data security, and citizen service backends.",
    averageSalary: "₹8,00,000 - ₹15,00,000 / yr",
    benchmarkSkills: {
      "SQL & Databases": 85,
      "REST APIs": 80,
      "Docker & Kubernetes": 75,
      "Communication & Soft Skills": 85,
      "System Design": 80,
      "Git & Version Control": 80
    }
  }
];

export const COURSES_CATALOG = [
  {
    id: "c1",
    title: "Distributed Systems & System Design Fundamentals",
    provider: "Coursera / NPTEL",
    duration: "8 Weeks",
    level: "Advanced",
    rating: 4.8,
    skillAddressed: "System Design",
    link: "https://www.coursera.org",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
  },
  {
    id: "c2",
    title: "Docker & Kubernetes: The Complete Developer Guide",
    provider: "Udemy / EdX",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.9,
    skillAddressed: "Docker & Kubernetes",
    link: "https://www.udemy.com",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=80"
  },
  {
    id: "c3",
    title: "Microservices Architecture with Node.js and Java",
    provider: "Pluralsight",
    duration: "5 Weeks",
    level: "Intermediate",
    rating: 4.7,
    skillAddressed: "Microservices",
    link: "https://www.pluralsight.com",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80"
  },
  {
    id: "c4",
    title: "CI/CD Pipelines & Automated Testing Best Practices",
    provider: "Swayam / LinkedIn Learning",
    duration: "4 Weeks",
    level: "Beginner-Intermediate",
    rating: 4.6,
    skillAddressed: "Unit Testing & CI/CD",
    link: "https://swayam.gov.in",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80"
  }
];

export const JOB_OPPORTUNITIES = [
  {
    id: "j1",
    title: "Junior Backend Engineer",
    company: "CloudScale Technologies",
    location: "Remote / Bengaluru, KA",
    type: "Full-Time",
    salary: "₹10,00,000 - ₹14,00,000 / yr",
    matchScore: 92,
    requirements: ["REST APIs", "Node.js/Python", "SQL", "Git"],
    link: "#"
  },
  {
    id: "j2",
    title: "Software Engineering Intern (Summer)",
    company: "DataDrive Labs",
    location: "Gurugram, HR (Hybrid)",
    type: "Internship",
    salary: "₹35,000 / month",
    matchScore: 88,
    requirements: ["Data Structures", "Java or Python", "Basic SQL"],
    link: "#"
  },
  {
    id: "j3",
    title: "Associate Cloud & DevOps Specialist",
    company: "Nexus Infrastructure",
    location: "Pune, MH / Hyderabad",
    type: "Full-Time",
    salary: "₹8,50,000 - ₹12,00,000 / yr",
    matchScore: 74,
    requirements: ["Linux", "Docker", "Git", "CI/CD fundamentals"],
    link: "#"
  }
];

export const PUBLIC_GOVT_OPPORTUNITIES = [
  {
    id: "g1",
    title: "National Digital Talent Apprenticeship Program",
    agency: "Department of Education & Technology",
    stipend: "₹25,000 / month",
    duration: "12 Months",
    eligibility: "Final year students & fresh graduates in CS/IT/STEM",
    deadline: "Oct 30, 2026",
    category: "Apprenticeship",
    details: "Paid government-backed apprenticeship providing industry hands-on experience in public digital infrastructure projects."
  },
  {
    id: "g2",
    title: "Junior Information Systems Specialist",
    agency: "Federal Technology & Innovation Council",
    stipend: "₹7,50,000 / annum",
    duration: "Permanent",
    eligibility: "Bachelor's Degree in CS/Software Engineering (Minimum 8.0 CGPA)",
    deadline: "Nov 15, 2026",
    category: "Public Sector Job",
    details: "Entry-level public service technology position focusing on secure database management and cloud software maintenance."
  },
  {
    id: "g3",
    title: "Cybersecurity & Data Governance Fellowship",
    agency: "National Science & Research Foundation",
    stipend: "₹45,000 / month",
    duration: "6 Months",
    eligibility: "Undergraduate / Graduate STEM students",
    deadline: "Dec 01, 2026",
    category: "Research Fellowship",
    details: "Mentored research fellowship developing AI-driven cybersecurity tools for public utility protection."
  }
];
