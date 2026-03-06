import { env } from '@/common/config/env';
import jwt, { SignOptions } from 'jsonwebtoken';

export const jwtTokenGen = async (payload: { id: string; email: string }) => {
  const accessToken = jwt.sign(
    { id: payload.id, email: payload.email },
    env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '5h',
    },
  ) as SignOptions;

  const refreshToken = jwt.sign(
    { id: payload.id, email: payload.email },
    env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '30d',
    },
  ) as SignOptions;

  return {
    accessToken,
    refreshToken,
  };
};
