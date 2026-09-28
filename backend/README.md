# Campus to Corporate (C2C) - Backend API

Express REST API server powering the **AI-Powered Career Readiness & Employability Platform**.

## 🚀 Quick Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env configuration
cp .env.example .env

# 4. Start backend server
npm start
# Server runs at: http://localhost:5000
```

## 📡 API Endpoints

### 1. Healthcheck
- `GET /api/health` -> Check server status

### 2. Authentication (JWT)
- `POST /api/auth/login` -> Authenticate & return signed JWT token
- `GET /api/auth/verify` -> Validate JWT token header (`Authorization: Bearer <token>`)
- `GET /api/auth/personas` -> Get pre-configured demo user personas

### 3. AI Services (Google Gemini 2.5 Flash API)
- `POST /api/ai/analyze-profile` -> Academic transcript parsing & skill-gap diagnosis
- `POST /api/ai/review-resume` -> ATS resume audit & STAR bullet point rewriter

### 4. Jobs & Government Opportunities
- `GET /api/jobs` -> Matched entry-level positions & internships
- `GET /api/govt-schemes` -> MP Rojgar, NATS, and NCS public schemes
