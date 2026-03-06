import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    console.log('CTx', ctx);

    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    return user;
  },
);
