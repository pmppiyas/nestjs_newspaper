import { prisma } from '@/common/config/prisma';
import { verifyToken } from '@/common/helper/verifyToken';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken =
      request.cookies['accessToken'] ||
      request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('No Token Received!');
    }

    try {
      const decoded = verifyToken(accessToken);

      if (!decoded.id || !decoded.email) {
        throw new UnauthorizedException('You are unauthorized!');
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id, email: decoded.email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found!');
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(' Invalid or expired token');
    }
  }
}
