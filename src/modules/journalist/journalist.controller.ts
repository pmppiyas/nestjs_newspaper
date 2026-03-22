import { Auth } from '@/common/decorators/auth.decorator';
import { JournalistService } from '@/modules/journalist/journalist.service';
import { Controller, Get, Query } from '@nestjs/common';
import { RequestStatus, Role } from '@prisma/client';

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
}
