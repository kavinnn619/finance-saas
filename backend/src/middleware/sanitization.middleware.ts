import xss from 'xss';
  import { Request, Response, NextFunction } from 'express';

  const sanitize = (obj: any): any => {
    if (typeof obj === 'string') return xss(obj);
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: sanitize(v) }), {});
    }
    return obj;
  };

  export const sanitizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    next();
  };
