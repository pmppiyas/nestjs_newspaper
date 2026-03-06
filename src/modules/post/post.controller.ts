import { CurrentUser } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { PostService } from '@/modules/post/post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import express from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(@Body() body: any, @CurrentUser() user: IJwtPayload) {
    const result = await this.postService.createPost(body, user);
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
  @UseGuards(AuthGuard)
  async updateNews(
    @CurrentUser() user: IJwtPayload,
    @Req() req: express.Request,
    @Query('newsId') newsId: string,
  ) {
    const result = await this.postService.updateNews(user, newsId, req.body);
    return {
      message: 'News updated successfully!',
      data: result,
    };
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
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
