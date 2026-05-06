 import rateLimit from 'express-rate-limit';
  import RedisStore from 'rate-limit-redis';
  import { redisClient } from '../config/redis';

  export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
    keyGenerator: (req) => req.user?.id || req.ip,
  });
