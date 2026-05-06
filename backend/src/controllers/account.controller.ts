 import { Request, Response } from 'express';

  export const accountController = {
    async list(req: Request, res: Response) {
      res.json({ message: 'List accounts' });
    },
    async create(req: Request, res: Response) {
      res.status(201).json({ message: 'Create account' });
    },
    async getById(req: Request, res: Response) {
      res.json({ message: 'Get account by id' });
    },
    async update(req: Request, res: Response) {
      res.json({ message: 'Update account' });
    },
    async remove(req: Request, res: Response) {
      res.json({ message: 'Delete account' });
    },
  };
