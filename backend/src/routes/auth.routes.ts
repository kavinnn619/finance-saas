import { Router } from 'express';
  import { rateLimiter } from '../middleware/rate-limit.middleware';
  import { authMiddleware } from '../middleware/auth.middleware';
  import * as authController from '../controllers/auth.controller';

  const router = Router();

  router.post('/login', rateLimiter, authController.login);
  router.post('/register', rateLimiter, authController.register);
  router.post('/refresh', rateLimiter, authController.refreshToken);
  router.post('/logout', authMiddleware, authController.logout);

  export default router;
