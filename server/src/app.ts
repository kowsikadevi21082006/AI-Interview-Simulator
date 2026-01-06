import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDB from './config/db';
import learnRoutes from './routes/learn.routes';
import interviewRoutes from './routes/interview.routes';
import askRoutes from './routes/ask.routes';
import { logRequest } from './utils/logger';

const app = express();

// Connect to DB
connectDB();

// Middlewares
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like curl/postman) or from configured frontend
    if (!origin || origin === FRONTEND_URL) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json());
app.use(logRequest);

// Routes
app.use('/api/learn', learnRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/ask', askRoutes);

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Root — helpful message for browser visits to '/'
app.get('/', (_req, res) => {
  res.send('Interview Prep API is running. See /health or /api endpoints.');
});

// Error handler (must have 4 args so Express recognizes it as an error handler)
app.use((err: any, _req: any, res: any, _next: any) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
