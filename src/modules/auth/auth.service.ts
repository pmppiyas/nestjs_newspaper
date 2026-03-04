import { Injectable } from '@nestjs/common';
import { prisma } from '../../config/prisma';
import bcryptjs from 'bcryptjs';
import { env } from '../../config/env';
import { jwtTokenGen } from '@/helper/jwtTokenGen';
import { LoginDto, RegisterDto } from '@/modules/auth/auth.dto';

@Injectable()
export class AuthService {
  async register(userData: RegisterDto) {
    const { email, password, ...rest } = userData;

    const hasedPass = await bcryptjs.hash(
      password,
      Number(env.BCRYPT.SALT_NUMBER),
    );

    const user = await prisma.user.create({
      data: {
        email,
        password: hasedPass,
        ...rest,
      },
    });

    return user;
  }

  async login(userData: LoginDto) {
    const { email, password } = userData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found!',
      };
    }

    const isPassCorrect = await bcryptjs.compare(password, user.password);

    if (!isPassCorrect) {
      return {
        success: false,
        message: 'Invalid Password',
      };
    }

    const { accessToken, refreshToken } = await jwtTokenGen({
      id: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken };
  }
}
