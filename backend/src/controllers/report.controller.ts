 import { Request, Response } from 'express';

  export const reportController = {
    async list(req: Request, res: Response) {
      res.json({ message: 'List reports' });
    },
    async create(req: Request, res: Response) {
      res.status(201).json({ message: 'Create report' });
    },
    async getById(req: Request, res: Response) {
      res.json({ message: 'Get report by id' });
    },
  };
