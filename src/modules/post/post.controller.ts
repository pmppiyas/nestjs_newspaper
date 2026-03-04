import { PostService } from '@/modules/post/post.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import express from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  createPost(@Body() body: any, @Req() req: express.Request) {
    const result = this.postService.createPost(body);
    return result;
  }
}
