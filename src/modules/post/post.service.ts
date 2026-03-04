import { prisma } from '@/config/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async createPost(postData: any) {
    // const news = await prisma.news.create({
    //   data: {
    //     ...postData,
    //   },
    // });

    return {
      postData,
    };
  }
}
