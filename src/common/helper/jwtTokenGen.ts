import { env } from '@/common/config/env.config';
import jwt from 'jsonwebtoken';

export const jwtTokenGen = async (payload: {
  id: string;
  email: string;
  role: string;
}) => {
  const accessToken = jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '5h',
    }
  );

  const refreshToken = jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '30d',
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};
