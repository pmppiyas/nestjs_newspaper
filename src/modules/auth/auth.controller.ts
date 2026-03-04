import { IUser } from '@/modules/auth/auth.interface';
import { AuthService } from '@/modules/auth/auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHi(): string {
    return this.authService.getHi();
  }

  @Post('register')
  register(@Body() body: IUser) {
    const result = this.authService.register(body);
    return result;
  }
}
