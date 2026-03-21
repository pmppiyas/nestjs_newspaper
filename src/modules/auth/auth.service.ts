import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { prisma } from '../../common/config/prisma';
import bcryptjs from 'bcryptjs';
import { env } from '../../common/config/env.config';
import { jwtTokenGen } from '@/common/helper/jwtTokenGen';
import { RegisterDto } from '@/modules/auth/dto/create.dto';

@Injectable()
export class AuthService {
  async validateUser(email: string, pass: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isPassCorrect = await bcryptjs.compare(pass, user.password);

    if (!isPassCorrect) {
      throw new NotAcceptableException('Invalid Password!');
    }

    const { password, ...result } = user;
    return result;
  }
  async register(userData: RegisterDto) {
    const { email, password, ...rest } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('User with this email already exists!');
    }

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

    const { password: _, ...result } = user;

    return result;
  }

  async login(payload: any) {
    const user = await prisma.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not exist');
    }

    const { accessToken, refreshToken } = await jwtTokenGen({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, refreshToken };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new BadRequestException('No user from google');
    }

    let user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: req.user.email,
          name: req.user?.name,
          picture: req.user?.picture,
          password: '',
        },
      });
    }

    const { id, email, role } = user;

    return this.login({ id, email, role });
  }
}
