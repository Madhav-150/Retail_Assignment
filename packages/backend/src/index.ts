import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './api/auth/auth.routes';
import projectRoutes from './api/projects/project.routes';
import aiRoutes from './api/ai/ai.routes';
import adminRoutes from './api/admin/admin.routes';
import settingsRoutes from './api/settings/settings.routes';

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Trust first proxy if behind a reverse proxy (e.g., nginx)
app.set('trust proxy', 1);

// CORS configuration - more permissive for development
const corsOptions = {
  origin: process.env.CLIENT_URL || true, // Use env var in production, allow all in dev
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie'],
  maxAge: 3600 // 1 hour
};
app.use(cors(corsOptions));

// Session configuration
const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || 'dev-secret-key-123',
  name: 'retail-media.sid',
  resave: true,
  saveUninitialized: false,
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' as const,
    path: '/',
    // Don't set domain for localhost to work properly
    domain: process.env.NODE_ENV === 'production' ? 'yourdomain.com' : undefined
  },
  rolling: true,
  // In-memory store for development (not for production)
  store: new session.MemoryStore()
};

// In production, you might want to use a session store like Redis
// For development, we'll use the default MemoryStore
app.use(session(sessionConfig));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Retail Media API is running',
    documentation: 'Please use the API endpoints starting with /api',
    time: new Date().toISOString()
  });
});

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n--- New ${req.method} ${req.path} ---`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('-------------------\n');
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

export default app;
