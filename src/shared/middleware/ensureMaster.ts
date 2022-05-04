import { AppError } from '@shared/error/AppError';
import { Request, Response, NextFunction } from 'express';

export function ensureMaster(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { user } = request;

  if (!user) {
    throw new AppError('Usuário sem autenticação.', 403);
  }

  if (!user.isMaster) {
    throw new AppError('Usuário sem permissão.', 403);
  }

  return next();
}
