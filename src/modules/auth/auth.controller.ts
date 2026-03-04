import { IUser } from '@/modules/auth/auth.interface';
import { AuthService } from '@/modules/auth/auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: IUser) {
    const result = this.authService.register(body);
    return result;
  }

  @Post('login')
  login(@Body() body: IUser) {
    const result = this.authService.login(body);
    return result;
  }
}
