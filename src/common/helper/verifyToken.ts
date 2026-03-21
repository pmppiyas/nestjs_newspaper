import { env } from '@/common/config/env.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyTokenPayload {
  id: string;
  email: string;
  role: string
}

export const verifyToken = (token: string): MyTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

  return {
    id: (decoded as any).id,
    email: (decoded as any).email,
    role: decoded.role,
  };
};
