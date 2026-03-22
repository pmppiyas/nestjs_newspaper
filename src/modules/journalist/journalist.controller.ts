import { JournalistService } from '@/modules/journalist/journalist.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('journalist')
export class JournalistController {
  constructor(private readonly journalistService: JournalistService) {}

  @Get()
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
}
