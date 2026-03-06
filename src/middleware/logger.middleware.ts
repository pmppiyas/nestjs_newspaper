import { prisma } from '@/config/prisma';
import { verifyToken } from '@/helper/verifyToken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken =
        req.cookies['accessToken'] || req.headers.authorization?.split(' ')[1];

      if (!accessToken) {
        throw new UnauthorizedException('No Token Received!');
      }

      const decoded = verifyToken(accessToken);
      if (!decoded.id || !decoded.email) {
        throw new UnauthorizedException('You are unauthorized!');
      }

      const isExist = await prisma.user.findUnique({
        where: {
          id: decoded.id,
          email: decoded.email,
        },
      });

      if (!isExist) {
        throw new UnauthorizedException('You are unauthorized!');
      }

      req.user = decoded;

      next();
    } catch (err) {
      next(err);
    }
  }
}
