// JWT Authentication & Session Service for Campus to Corporate

const JWT_SECRET = 'hackathon_campus_to_corporate_jwt_secret_2026';

// Registered / Default Demo Accounts
export const DEMO_USERS = [
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
    cgpa: '8.0 / 10',
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

// Helper Base64URL
const base64UrlEncode = (str) => btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return atob(base64);
};

export const generateJWT = (user) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: 'campus-to-corporate-auth',
    sub: user.id,
    iat: now,
    exp: now + 24 * 60 * 60,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      userTitle: user.userTitle,
      degree: user.degree,
      cgpa: user.cgpa,
      targetRole: user.targetRole
    }
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}.${JWT_SECRET}`;
  const signature = base64UrlEncode(signatureInput);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verifyJWT = (token) => {
  if (!token) return { valid: false, error: 'No token provided' };

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, error: 'Invalid token structure' };

    const [headerB64, payloadB64, signatureB64] = parts;
    const expectedSigInput = `${headerB64}.${payloadB64}.${JWT_SECRET}`;
    const expectedSig = base64UrlEncode(expectedSigInput);

    if (signatureB64 !== expectedSig) return { valid: false, error: 'Invalid JWT signature' };

    const payload = JSON.parse(base64UrlDecode(payloadB64));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) return { valid: false, error: 'JWT token has expired' };

    const localUsers = JSON.parse(localStorage.getItem('c2c_registered_users') || '[]');
    const allUsers = [...DEMO_USERS, ...localUsers];

    const fullUser = allUsers.find(u => u.id === payload.user.id) || payload.user;

    return { valid: true, user: fullUser, payload, token };
  } catch (err) {
    return { valid: false, error: 'Failed to decode JWT: ' + err.message };
  }
};

// Register & Record User Data
export const registerUser = (name, email, password, targetRole = 'Software Engineer (Backend)', degree = 'B.Tech in Computer Science', cgpa = '8.2 / 10') => {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const localUsers = JSON.parse(localStorage.getItem('c2c_registered_users') || '[]');
  const allUsers = [...DEMO_USERS, ...localUsers];

  const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    if (existing.password === password) {
      const token = generateJWT(existing);
      localStorage.setItem('c2c_jwt_token', token);
      return { success: true, user: existing, token };
    }
    return { success: false, error: 'An account with this email address already exists. Please sign in.' };
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name: name.trim() || cleanEmail.split('@')[0],
    email: cleanEmail,
    password,
    role: cleanEmail.includes('admin') ? 'admin' : 'student',
    userTitle: 'Registered Candidate',
    degree: degree || 'B.Tech in Computer Science',
    year: 'Final Year',
    cgpa: cgpa || '8.2 / 10',
    targetRole: targetRole || 'Software Engineer (Backend)',
    avatarBg: 'bg-[#E7B46A]',
    skills: [
      { name: "Data Structures & Algorithms", level: 75, category: "Core CS" },
      { name: "Java / Python", level: 70, category: "Languages" },
      { name: "SQL & Databases", level: 65, category: "Backend" },
      { name: "REST APIs", level: 60, category: "Backend" },
      { name: "Git & Version Control", level: 75, category: "Tools" },
      { name: "System Design", level: 45, category: "Architecture" },
      { name: "Docker & Kubernetes", level: 40, category: "DevOps" },
      { name: "Microservices", level: 50, category: "Backend" },
      { name: "Unit Testing & CI/CD", level: 45, category: "DevOps" },
      { name: "Communication & Soft Skills", level: 75, category: "Behavioral" }
    ],
    academicHistory: [
      { subject: "Core Computer Science Principles", grade: "A", credits: 4 }
    ],
    resumeText: `${name || cleanEmail} | Candidate seeking ${targetRole} opportunities.`
  };

  localUsers.push(newUser);
  localStorage.setItem('c2c_registered_users', JSON.stringify(localUsers));

  const token = generateJWT(newUser);
  localStorage.setItem('c2c_jwt_token', token);

  return { success: true, user: newUser, token };
};

// Login with credentials
export const loginUser = (email, password) => {
  const cleanEmail = email.trim().toLowerCase();
  const localUsers = JSON.parse(localStorage.getItem('c2c_registered_users') || '[]');
  const allUsers = [...DEMO_USERS, ...localUsers];

  const user = allUsers.find(
    u => u.email.toLowerCase() === cleanEmail && u.password === password
  );

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const token = generateJWT(user);
  localStorage.setItem('c2c_jwt_token', token);

  return { success: true, user, token };
};

export const getCurrentSession = () => {
  const token = localStorage.getItem('c2c_jwt_token');
  if (!token) return { isAuthenticated: false, user: null, token: null };

  const verification = verifyJWT(token);
  if (verification.valid) {
    return { isAuthenticated: true, user: verification.user, token };
  } else {
    localStorage.removeItem('c2c_jwt_token');
    return { isAuthenticated: false, user: null, token: null };
  }
};

export const logoutSession = () => {
  localStorage.removeItem('c2c_jwt_token');
};
