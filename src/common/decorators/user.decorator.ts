import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: IJwtPayload = request.user;
    if (!user) {
      throw new UnauthorizedException('You are not authenticate');
    }

    return user;
  },
);
