import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { AuthService } from '@/modules/auth/auth.service';
import { ZodValidationPipe } from '@/common/pipes/zod_validation.pipe';
import {
  registerSchema,
  type RegisterDto,
} from '@/modules/auth/dto/create.dto';
import { AuthGuard } from '@nestjs/passport';
import { env } from '@/common/config/env.config';
import { loginSchema, type LoginDto } from '@/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema)) body: RegisterDto,
  ) {
    const result = await this.authService.register(body);
    return {
      success: true,
      message: 'User created successfully!',
      data: result,
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body(new ZodValidationPipe(loginSchema)) body: LoginDto,
    @Res({ passthrough: true })
    res: express.Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(body);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, refreshToken, message: 'User login successfully!' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const result = await this.authService.googleLogin(req);

    return res.redirect(
      `http://localhost:3001/login-success?token=${result.accessToken}`,
    );
  }
}
