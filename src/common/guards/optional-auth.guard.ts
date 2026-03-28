import { prisma } from '@/common/config/prisma';
import { verifyToken } from '@/common/helper/verifyToken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      request.cookies['accessToken'] ||
      request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return true;
    }

    try {
      const decoded = verifyToken(accessToken);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (user) {
        const { password, ...restData } = user;
        request.user = restData;
      }
    } catch (error) {}

    return true;
  }
}
