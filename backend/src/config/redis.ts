import { createClient } from 'redis';
  export const redisClient = createClient({ url: env.REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis error:', err));
