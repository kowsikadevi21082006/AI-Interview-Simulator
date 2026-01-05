import { Request, Response, NextFunction } from 'express';

export function logRequest(req: Request, _res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log(`${req.method} ${req.path}`);
  next();
}
