import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { BookmarkService } from '@/modules/bookmark/bookmark.service';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('bookmark')
export class BookmarkController {
  constructor(readonly bookmarkServices: BookmarkService) {}

  @Post('add/:id')
  @Auth('ADMIN', 'JOURNALIST', 'READER')
  async toggleBookmark(
    @CurrentUser() user: IJwtPayload,
    @Param('id') newsId: string,
  ) {
    const result = await this.bookmarkServices.toggleBookmark({
      userId: user.id,
      newsId,
    });

    return {
      message: result.message,
      data: null,
    };
  }

  @Get('my')
  @Auth('ADMIN', 'JOURNALIST', 'READER')
  async getMyBookmark(
    @CurrentUser() user: IJwtPayload,
    @Query('order') order = 'desc',
  ) {
    const result = await this.bookmarkServices.getMyBookmarks({
      userId: user.id,
      order,
    });

    return {
      message: 'Your bookmarks retrieved successfully',
      data: result,
    };
  }

  @Get('check/:id')
  @Auth('ADMIN', 'JOURNALIST', 'READER')
  async bookmarkCheck(
    @Param('id') newsId: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    const isBookmarked = await this.bookmarkServices.bookmarkCheck({
      newsId,
      userId: user.id,
    });
    return {
      message: 'Bookmark check successfully',
      data: isBookmarked,
    };
  }
}
