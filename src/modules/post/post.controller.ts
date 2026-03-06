import { AuthGuard } from '@/guards/auth.guard';
import { IJwtPayload } from '@/interfaces';
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
  async createPost(@Body() body: any, @Req() req: express.Request) {
    const result = await this.postService.createPost(
      body,
      req.user as IJwtPayload,
    );
    return {
      success: true,
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
      success: true,
      message: 'News restrieved successfully!',
      data: result,
    };
  }

  @Patch('edit')
  @UseGuards(AuthGuard)
  async updateNews(
    @Req() req: express.Request,
    @Query('newsId') newsId: string,
  ) {
    const result = await this.postService.updateNews(
      req?.user as IJwtPayload,
      newsId,
      req.body,
    );
    return {
      success: true,
      message: 'News updated successfully!',
      data: result,
    };
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteNews(
    @Req() req: express.Request,
    @Query('newsId') newsId: string,
  ) {
    await this.postService.deleteNews(req?.user as IJwtPayload, newsId);

    return {
      success: true,
      message: 'News deleted successfully!',
    };
  }
}
