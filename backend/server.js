import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Campus to Corporate AI Employability Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', jobRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Campus to Corporate Backend Server Running!`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
