import { IUser } from '@/modules/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { prisma } from '../../config/prisma';
import bcryptjs from 'bcryptjs';
import { env } from '../../config/env';

@Injectable()
export class AuthService {
  getHi(): string {
    return 'Hello Auth';
  }

  async register(userData: IUser) {
    const { email, password, ...rest } = userData;

    const hasedPass = await bcryptjs.hash(password, Number(env.BCRYPT.SALT));

    const user = await prisma.user.create({
      data: {
        email,
        password: hasedPass,
        ...rest,
      },
    });

    return user;
  }
}
