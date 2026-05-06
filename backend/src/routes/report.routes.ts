import { Router } from 'express';
  import { authMiddleware } from '../middleware/auth.middleware';
  import * as reportController from '../controllers/report.controller';

  const router = Router();

  router.use(authMiddleware);
  router.get('/', reportController.list);
  router.post('/', reportController.create);
  router.get('/:id', reportController.getById);

  export default router;
