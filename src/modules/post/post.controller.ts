import { multerOptions } from '@/common/config/multer.config';
import { Auth } from '@/common/decorators/auth.decorator';
import { OptionalCurrentUser } from '@/common/decorators/optionalUser.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { OptionalAuthGuard } from '@/common/guards/optional-auth.guard';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { ZodValidationPipe } from '@/common/pipes/zod_validation.pipe';
import {
  type CreateNewsDto,
  createNewsSchema,
} from '@/modules/post/dto/create.dto';
import {
  type UpdateNewsDto,
  updateNewsSchema,
} from '@/modules/post/dto/update.dto';
import { PostService } from '@/modules/post/post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostStatus, Role } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @Auth(Role.ADMIN, Role.JOURNALIST)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(createNewsSchema)) body: CreateNewsDto,
    @CurrentUser() user: IJwtPayload,
  ) {
    const imageUrl = file?.path;

    const result = await this.postService.createPost(
      { ...body, imageUrl },
      user,
    );
    return {
      message: 'News posted successfully!',
      data: result,
    };
  }

  @Get('')
  async getAllNews(
    @Query('section') section?: string,
    @Query('category') category?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit = '10',
    @Query('page') page = '1',
    @Query('sortBy') sortBy = 'publishedAt',
    @Query('sortOrder') sortOrder = 'desc',
    @Query('authorId') authorId?: string,
    @Query("status") status?: string,
  ) {
    const tagsArray = tags ? tags.split(',') : undefined;

    if (section === 'latest') {
      sortBy = 'publishedAt';
      sortOrder = 'desc';
      limit = "5";
    }

    if (section === 'popular') {
      sortBy = 'viewCount';
      sortOrder = 'desc';
      limit = "5"
    }

    const result = await this.postService.getAllNews({
      category,
      tags: tagsArray,
      status,
      limit: parseInt(limit),
      page: parseFloat(page),
      sortBy,
      sortOrder,
      authorId
    });
    return {
      success: true,
      message: 'News restrieved successfully!',
      data: result,
    };
  }

  @Get('my')
  @Auth(Role.JOURNALIST, Role.ADMIN)
  async getMyPost(
    @CurrentUser() user: IJwtPayload,
    @Query('status') status = PostStatus.APPROVED,
  ) {
    const result = await this.postService.getMyPost({
      userId: user.id,
      status,
    });

    return {
      message: 'My news retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  @UseGuards(new OptionalAuthGuard())
  async getById(
    @Param('id') newsId: string,
    @OptionalCurrentUser() user: IJwtPayload,
  ) {
    const userId = user?.id;

    const news = await this.postService.getById({ newsId, userId });

    return {
      message: 'Single news retrieved successfully!',
      data: news,
    };
  }

  @Patch('edit')
  @Auth(Role.ADMIN, Role.JOURNALIST)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateNews(
    @CurrentUser() user: IJwtPayload,
    @Body(new ZodValidationPipe(updateNewsSchema)) body: UpdateNewsDto,
    @Query('newsId') newsId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file?.path;

    const result = await this.postService.updateNews(user, newsId, {
      ...(body as Record<string, unknown>),
      imageUrl,
    });
    return {
      success: true,
      message: 'News updated successfully!',
      data: result,
    };
  }

  @Delete('delete')
  @Auth(Role.ADMIN, Role.JOURNALIST)
  async deleteNews(
    @CurrentUser() user: IJwtPayload,
    @Query('newsId') newsId: string,
  ) {
    await this.postService.deleteNews(user, newsId);

    return {
      message: 'News deleted successfully!',
    };
  }
}
