import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';
import learnRoutes from './routes/learn.routes';
import interviewRoutes from './routes/interview.routes';
import askRoutes from './routes/ask.routes';
import { logRequest } from './utils/logger';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logRequest);

// Routes
app.use('/api/learn', learnRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/ask', askRoutes);

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler
app.use((err: any, _req: any, res: any) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
