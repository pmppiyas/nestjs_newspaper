import { multerOptions } from '@/common/config/multer.config';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
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
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Role } from '../../../prisma/generated/prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
    @Query('category') category?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit = '10',
    @Query('page') page = '1',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder = 'desc',
    @Query('authorId') authorId?: string,
  ) {
    const tagsArray = tags ? tags.split(',') : undefined;

    const result = await this.postService.getAllNews({
      category,
      tags: tagsArray,
      limit: parseInt(limit),
      page: parseFloat(page),
      sortBy,
      sortOrder,
      authorId,
    });
    return {
      message: 'News restrieved successfully!',
      data: result,
    };
  }

  @Patch('edit')
  @Auth(Role.ADMIN, Role.JOURNALIST)
  async updateNews(
    @CurrentUser() user: IJwtPayload,
    @Body(new ZodValidationPipe(updateNewsSchema)) body: UpdateNewsDto,
    @Query('newsId') newsId: string,
  ) {
    const result = await this.postService.updateNews(user, newsId, body);
    return {
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
