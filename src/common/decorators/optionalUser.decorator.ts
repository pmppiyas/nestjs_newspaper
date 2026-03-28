import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OptionalCurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: IJwtPayload = request?.user;

    return user;
  },
);
