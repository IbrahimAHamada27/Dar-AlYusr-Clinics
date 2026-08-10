import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

// Import Routes
import authRoutes from './routes/auth';
import doctorRoutes from './routes/doctor';
import educationRoutes from './routes/education';
import certificateRoutes from './routes/certificates';
import researchRoutes from './routes/research';
import publicationRoutes from './routes/publications';
import conferenceRoutes from './routes/conferences';
import articleRoutes from './routes/articles';
import clinicRoutes from './routes/clinics';
import appointmentRoutes from './routes/appointments';
import socialRoutes from './routes/socialProfiles';
import contactRoutes from './routes/contact';
import settingRoutes from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/education', educationRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/research', researchRoutes);
app.use('/api/v1/publications', publicationRoutes);
app.use('/api/v1/conferences', conferenceRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/clinics', clinicRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/social-profiles', socialRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/settings', settingRoutes);

// Root Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Dr. Ibrahim El Sherqawy Express + SQLite API Server is running.',
    timestamp: new Date().toISOString()
  });
});

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Express REST API server running on http://localhost:${PORT}`);
  console.log(`📁 SQLite Database URL: ${process.env.DATABASE_URL || 'file:./dev.db'}`);
});
