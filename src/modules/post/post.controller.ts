import { IJwtPayload } from '@/interfaces';
import { PostService } from '@/modules/post/post.service';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import express from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  createPost(@Body() body: any, @Req() req: express.Request) {
    const result = this.postService.createPost(body, req.user as IJwtPayload);
    return result;
  }

  @Get('')
  getAllNews(
    @Query('category') category?: string,
    @Query('tags') tags?: string,
    @Query('limit') limit = '10',
    @Query('page') page = '1',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder = 'desc',
    @Query('authorId') authorId?: string,
  ) {
    const tagsArray = tags ? tags.split(',') : undefined;

    const result = this.postService.getAllNews({
      category,
      tags: tagsArray,
      limit: parseInt(limit),
      page: parseFloat(page),
      sortBy,
      sortOrder,
      authorId,
    });
    return result;
  }
}
