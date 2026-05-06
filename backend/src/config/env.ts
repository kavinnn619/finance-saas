import { z } from 'zod';

  const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
    JWT_ACCESS_EXPIRY: z.string().default('15m'),
    JWT_REFRESH_EXPIRY: z.string().default('7d'),
    REDIS_URL: z.string().url(),
    ENCRYPTION_KEY: z.string().length(32),
    ALLOWED_ORIGINS: z.string().transform((o) => o.split(',')),
  });
