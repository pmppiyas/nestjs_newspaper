import { Body, Controller, Post, Res } from '@nestjs/common';
import express from 'express';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto, RegisterDto } from '@/modules/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const result = await this.authService.register(body);
    return {
      success: true,
      message: 'User created successfully!',
      data: result,
    };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(body);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return { accessToken, refreshToken, message: 'User login successfully!' };
  }
}
