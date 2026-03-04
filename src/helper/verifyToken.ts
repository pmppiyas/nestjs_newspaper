import { env } from '@/config/env';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyTokenPayload {
  id: string;
  email: string;
}

export const verifyToken = (token: string): MyTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

  return {
    id: (decoded as any).id,
    email: (decoded as any).email,
  };
};
