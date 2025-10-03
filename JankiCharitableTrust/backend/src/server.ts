import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import path from 'path';
import { contactRouter } from './routes/contact';
import { donateRouter } from './routes/donate';
import { metricsRouter } from './routes/metrics';
import { authRouter } from './routes/auth';
import { requireAuth } from './middleware/auth';
import { volunteerRouter } from './routes/volunteer';
import { volunteerAdminRouter } from './routes/volunteerAdmin';
import { connectMongo } from './db';

// Load environment variables (resolve .env relative to project backend root)
config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
connectMongo().catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);
app.use('/api/donate', donateRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/volunteer', volunteerRouter);
app.use('/api/admin/volunteers', volunteerAdminRouter);

// Protect sensitive routes (example): donations list and stats
app.use('/api/donate/list', requireAuth);
app.use('/api/donate/stats', requireAuth);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});
// In backend/src/server.ts
const PORT = process.env.PORT || 3500; // Changed from 3000 to 3500

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
});