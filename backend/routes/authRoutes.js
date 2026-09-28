import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'hackathon_campus_to_corporate_jwt_secret_2026';

// In-Memory Database of Users
const USERS = [
  {
    id: 'usr_rohan',
    name: 'Rohan Sharma',
    email: 'rohan@campus.edu',
    password: 'password123',
    role: 'student',
    userTitle: 'Final Year Computer Science Student',
    degree: 'B.Tech in Computer Science & Engineering',
    year: 'Final Year (8th Sem)',
    cgpa: '8.4 / 10',
    targetRole: 'Software Engineer (Backend)',
    avatarBg: 'bg-[#E7B46A]',
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
      { subject: "Database Management Systems", grade: "A", credits: 4 }
    ],
    resumeText: "Rohan Sharma | Full Stack & Backend Enthusiast. Education: B.Tech Computer Science (8.4 CGPA)."
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Jenkins',
    email: 'sarah@campus.edu',
    password: 'password123',
    role: 'student',
    userTitle: 'Senior Data Science & AI Major',
    degree: 'B.S. in Data Science & Machine Learning',
    year: 'Senior Year',
    cgpa: '9.1 / 10',
    targetRole: 'Data Scientist / AI Engineer',
    avatarBg: 'bg-[#A3AA5A]',
    skills: [
      { name: "Data Structures & Algorithms", level: 75, category: "Core CS" },
      { name: "Java / Python", level: 95, category: "Languages" },
      { name: "SQL & Databases", level: 90, category: "Backend" },
      { name: "REST APIs", level: 60, category: "Backend" },
      { name: "Git & Version Control", level: 85, category: "Tools" },
      { name: "System Design", level: 60, category: "Architecture" },
      { name: "Docker & Kubernetes", level: 50, category: "DevOps" },
      { name: "Microservices", level: 40, category: "Backend" },
      { name: "Unit Testing & CI/CD", level: 55, category: "DevOps" },
      { name: "Communication & Soft Skills", level: 85, category: "Behavioral" }
    ],
    academicHistory: [
      { subject: "Machine Learning & Neural Networks", grade: "A+", credits: 4 },
      { subject: "Probability & Applied Statistics", grade: "A+", credits: 4 }
    ],
    resumeText: "Sarah Jenkins | AI & Data Science Specialist. High proficiency in Python, PyTorch, SQL, Pandas, & Scikit-Learn."
  },
  {
    id: 'usr_alex',
    name: 'Alex Rivera',
    email: 'alex@campus.edu',
    password: 'password123',
    role: 'student',
    userTitle: 'Web Applications & Cloud Enthusiast',
    degree: 'B.Tech in Information Technology',
    year: 'Final Year',
    cgpa: '7.9 / 10',
    targetRole: 'Full-Stack Web Developer',
    avatarBg: 'bg-[#F1A17E]',
    skills: [
      { name: "Data Structures & Algorithms", level: 70, category: "Core CS" },
      { name: "Java / Python", level: 75, category: "Languages" },
      { name: "SQL & Databases", level: 80, category: "Backend" },
      { name: "REST APIs", level: 90, category: "Backend" },
      { name: "Git & Version Control", level: 85, category: "Tools" },
      { name: "System Design", level: 65, category: "Architecture" },
      { name: "Docker & Kubernetes", level: 60, category: "DevOps" },
      { name: "Microservices", level: 55, category: "Backend" },
      { name: "Unit Testing & CI/CD", level: 60, category: "DevOps" },
      { name: "Communication & Soft Skills", level: 80, category: "Behavioral" }
    ],
    academicHistory: [
      { subject: "Web Engineering & Node.js", grade: "A", credits: 4 }
    ],
    resumeText: "Alex Rivera | Full Stack Developer proficient in React, Tailwind, Express.js, MongoDB, and AWS S3."
  },
  {
    id: 'usr_admin',
    name: 'Dr. Anita Verma',
    email: 'admin@college.edu',
    password: 'admin123',
    role: 'admin',
    userTitle: 'Head of Training & Placement Cell',
    degree: 'Ph.D. in Computer Science',
    year: 'Faculty Administrator',
    cgpa: 'N/A',
    targetRole: 'College Placement Administrator',
    avatarBg: 'bg-[#E7B46A]',
    skills: [],
    academicHistory: [],
    resumeText: "Head of Training & Placement Cell overseeing 1,200+ engineering candidates annually."
  }
];

// Get Demo Personas
router.get('/personas', (req, res) => {
  res.json({
    success: true,
    users: USERS.map(({ password, ...u }) => u)
  });
});

// Register New User (Records data in database & issues JWT)
router.post('/register', (req, res) => {
  const { name, email, password, targetRole, degree, cgpa } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
  }

  const existing = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: 'User with this email already exists' });
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email,
    password,
    role: email.includes('admin') ? 'admin' : 'student',
    userTitle: 'Registered Candidate',
    degree: degree || 'B.Tech in Computer Science',
    year: 'Final Year',
    cgpa: cgpa || '8.0 / 10',
    targetRole: targetRole || 'Software Engineer (Backend)',
    avatarBg: 'bg-[#E7B46A]',
    skills: [
      { name: "Data Structures & Algorithms", level: 75, category: "Core CS" },
      { name: "Java / Python", level: 70, category: "Languages" },
      { name: "SQL & Databases", level: 65, category: "Backend" },
      { name: "REST APIs", level: 60, category: "Backend" },
      { name: "Git & Version Control", level: 75, category: "Tools" }
    ],
    academicHistory: [
      { subject: "Core Computer Science", grade: "A", credits: 4 }
    ],
    resumeText: `${name} | Candidate seeking ${targetRole} opportunities.`
  };

  USERS.push(newUser);

  const payload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    degree: newUser.degree,
    targetRole: newUser.targetRole
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  const { password: _, ...userWithoutPassword } = newUser;

  res.json({
    success: true,
    message: 'User registered and authenticated successfully',
    token,
    user: userWithoutPassword
  });
});

// Login Endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials provided' });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    degree: user.degree,
    targetRole: user.targetRole
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    token,
    user: userWithoutPassword
  });
});

// Verify Token Endpoint
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const fullUser = USERS.find(u => u.id === decoded.id);
    if (!fullUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const { password: _, ...userWithoutPassword } = fullUser;
    res.json({ success: true, valid: true, user: userWithoutPassword, decoded });
  } catch (err) {
    res.status(403).json({ success: false, valid: false, error: 'Token expired or invalid' });
  }
});

export default router;
