import { NextFunction, Request, Response } from 'express';
import { jwtConfig } from '@config/auth';
import AppError from '@shared/erros/AppError';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing!', 401);
  }

  // Bearer stringToken
  const [Bearer, token] = authHeader.split(' ');

  try {
    const { secret } = jwtConfig;

    if (secret) {
      verify(token, secret);
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token.', 401);
  }
}
