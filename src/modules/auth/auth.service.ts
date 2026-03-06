import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '../../common/config/prisma';
import bcryptjs from 'bcryptjs';
import { env } from '../../common/config/env';
import { jwtTokenGen } from '@/common/helper/jwtTokenGen';
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
      throw new NotFoundException('User not found!');
    }

    const isPassCorrect = await bcryptjs.compare(password, user.password);

    if (!isPassCorrect) {
      throw new NotAcceptableException('Invalid Password!');
    }

    const { accessToken, refreshToken } = await jwtTokenGen({
      id: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken };
  }
}
