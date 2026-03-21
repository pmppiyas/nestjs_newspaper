import { CurrentUser } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { UserService } from '@/modules/user/user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() userInfo: any) {
    return {
      success: true,
      message: 'Self inforetrieved successfully',
      data: userInfo,
    };
  }
}
