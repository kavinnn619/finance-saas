import { Request, Response, NextFunction } from 'express';
  import { transactionService } from '../services/transaction.service';

  export const transactionController = {
    async list(req: Request, res: Response) {
      const result = await transactionService.list(req.user.id, req.query.cursor as string);
      res.json(result);
    },
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await transactionService.create(req.user.id, req.body.accountId, req.body);
        res.status(201).json(result);
      } catch (err) { next(err); }
    },
    async getById(req: Request, res: Response) {
      res.json({ message: 'Get transaction by id' });
    },
    async update(req: Request, res: Response) {
      res.json({ message: 'Update transaction' });
    },
    async remove(req: Request, res: Response) {
      res.json({ message: 'Delete transaction' });
    },
  };
