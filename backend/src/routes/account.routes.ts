import { Router } from 'express';
  import { authMiddleware } from '../middleware/auth.middleware';
  import * as accountController from '../controllers/account.controller';

  const router = Router();

  router.use(authMiddleware);
  router.get('/', accountController.list);
  router.post('/', accountController.create);
  router.get('/:id', accountController.getById);
  router.put('/:id', accountController.update);
  router.delete('/:id', accountController.remove);

  export default router;
