import { sign } from 'jsonwebtoken';

export const jwtConfig = {
  expiresIn: '1d',
  secret: process.env.JWT_SECRET || '',
};

export default function tokenSignature(userId: string): string {
  const token = sign({ data: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: 'HS256',
  });

  return token;
}
