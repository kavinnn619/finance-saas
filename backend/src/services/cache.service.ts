 import { redisClient } from '../config/redis';

  export const cacheService = {
    async get<T>(key: string): Promise<T | null> {
      const cached = await redisClient.get(key);
      return cached ? JSON.parse(cached) : null;
    },
    async set(key: string, value: any, ttl = 60) {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    },
    async invalidate(pattern: string) {
      const keys = await redisClient.keys(pattern);
      if (keys.length) await redisClient.del(keys);
    },
  };
