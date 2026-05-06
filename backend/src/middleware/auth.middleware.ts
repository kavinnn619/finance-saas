import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';
  import crypto from 'crypto';
  import { prisma } from '../config/database';
  import { env } from '../config/env';
  import { UnauthorizedError } from '../utils/errors';

  declare global { namespace Express { interface Request { user?: any } } }

  export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedError('No token provided');

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      const session = await prisma.session.findFirst({
        where: { tokenHash, userId: payload.userId, isRevoked: false, expiresAt: { gt: new Date() } },
      });
      if (!session) throw new UnauthorizedError('Invalid session');

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, role: true, isActive: true },
      });
      if (!user?.isActive) throw new UnauthorizedError('User inactive');

      req.user = user;
      next();
    } catch (err) { next(err); }
  };
