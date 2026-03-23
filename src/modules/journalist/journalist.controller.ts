import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { JournalistService } from '@/modules/journalist/journalist.service';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RequestStatus, Role, User } from '@prisma/client';

@Controller('journalist')
export class JournalistController {
  constructor(private readonly journalistService: JournalistService) {}

  @Get()
  @Auth(Role.ADMIN)
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('sortby') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query('rich') rich: 'highest' | 'lowest',
    @Query('searchTerm') searchTerm?: string,
  ) {
    const result = await this.journalistService.getAll({
      page,
      limit,
      sortBy,
      sortOrder,
      rich,
      searchTerm,
    });

    return {
      success: true,
      message: 'All journalist retrieved successfully',
      data: result,
    };
  }

  @Post('request')
  @Auth(Role.READER)
  async beAJournalist(@CurrentUser() user: IJwtPayload) {
    const result = await this.journalistService.beAJournalist(user);

    return {
      message: 'Journalist request sending successfully',
      data: result,
    };
  }

  @Get('requests')
  @Auth(Role.ADMIN)
  async getAllRequests(
    @Query('status') status: RequestStatus,
    @Query('limit') limit = 20,
    @Query('page') page = 1,
  ) {
    const result = await this.journalistService.getAllRequests({
      status,
      limit,
      page,
    });

    return {
      success: true,
      message: 'All journalist requests retrieved successfully',
      data: result,
    };
  }

  @Get('handle')
  @Auth(Role.ADMIN)
  async handleBeAjournalist(
    @Param('id') targetId: string,
    @Query('status') status: RequestStatus,
  ) {
    const result = await this.journalistService.handleBeAJournalist({
      targetId,
      status,
    });

    return {
      message: 'Request handle successfully',
      data: result,
    };
  }
}
