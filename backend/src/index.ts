 import express from 'express';
  import helmet from 'helmet';
  import { env } from './config/env';
  import { prisma } from './config/database';
  import { redisClient } from './config/redis';
  import { corsConfig } from './config/cors';
  import { errorMiddleware } from './middleware/error.middleware';
  import { sanitizationMiddleware } from './middleware/sanitization.middleware';
  import authRoutes from './routes/auth.routes';
  import transactionRoutes from './routes/transaction.routes';
  import accountRoutes from './routes/account.routes';
  import reportRoutes from './routes/report.routes';
  import healthRoutes from './routes/health.routes';

  const app = express();

  app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } } }));
  app.use(corsConfig);
  app.use(express.json({ limit: '10kb' }));
  app.use(sanitizationMiddleware);

  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/accounts', accountRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/health', healthRoutes);

  app.use(errorMiddleware);

  const start = async () => {
    await prisma.$connect();
    await redisClient.connect();
    app.listen(env.PORT, () => console.log(`Finance SaaS backend running on ${env.PORT}`));
  };

  start().catch((err) => { console.error('Startup failed:', err); process.exit(1); });
  process.on('SIGTERM', async () => { await prisma.$disconnect(); await redisClient.quit(); process.exit(0); });
