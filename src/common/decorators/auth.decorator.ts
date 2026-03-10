import { Roles } from '@/common/decorators/roles.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../../prisma/generated/prisma/client';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
