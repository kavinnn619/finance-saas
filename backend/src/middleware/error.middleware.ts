 import { Request, Response, NextFunction } from 'express';
  import { Prisma } from '@prisma/client';
  import { UnauthorizedError, NotFoundError } from '../utils/errors';

  export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = (err as any).status || 500;
    const message = err.message || 'Internal Server Error';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: 'Database error', code: err.code });
    }

    res.status(status).json({ error: message });
  };
