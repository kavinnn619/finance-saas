import { Request, Response, NextFunction } from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import crypto from 'crypto';
  import { prisma } from '../config/database';
  import { env } from '../config/env';
  import { BadRequestError, NotFoundError } from '../utils/errors';

  export const authController = {
    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.passwordHash)) {
          throw new BadRequestError('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRY });
        const refreshToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRY });
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        await prisma.session.create({
          data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
        });
        res.json({ accessToken: token, refreshToken, user: { id: user.id, email: user.email, role: user.role } });
      } catch (err) { next(err); }
    },

    async register(req: Request, res: Response, next: NextFunction) {
      try {
        const { email, password, firstName, lastName } = req.body;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new BadRequestError('Email already exists');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { email, passwordHash, firstName, lastName },
        });
        res.status(201).json({ message: 'User created', userId: user.id });
      } catch (err) { next(err); }
    },

    async refreshToken(req: Request, res: Response, next: NextFunction) {
      try {
        const { refreshToken } = req.body;
        const payload = jwt.verify(refreshToken, env.JWT_SECRET) as { userId: string };
        const newToken = jwt.sign({ userId: payload.userId }, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRY });
        res.json({ accessToken: newToken });
      } catch (err) { next(err); }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
      try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
          await prisma.session.updateMany({ where: { tokenHash }, data: { isRevoked: true } });
        }
        res.json({ message: 'Logged out' });
      } catch (err) { next(err); }
    },
  };
