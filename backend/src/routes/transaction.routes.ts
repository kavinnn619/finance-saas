import { Router } from 'express';
  import { authMiddleware } from '../middleware/auth.middleware';
  import * as transactionController from '../controllers/transaction.controller';

  const router = Router();

  router.use(authMiddleware);
  router.get('/', transactionController.list);
  router.post('/', transactionController.create);
  router.get('/:id', transactionController.getById);
  router.put('/:id', transactionController.update);
  router.delete('/:id', transactionController.remove);

  export default router;
