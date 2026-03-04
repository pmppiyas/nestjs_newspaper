import { prisma } from '@/config/prisma';
import { IJwtPayload } from '@/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async createPost(postData: any, user: IJwtPayload) {
    return await prisma.$transaction(async (tx) => {
      const IAM = await tx.user.findUnique({
        where: {
          id: user.id,
          email: user.email,
        },
      });
      const news = await tx.news.create({
        data: {
          authorId: IAM?.id,
          ...postData,
        },
      });

      return news;
    });
  }

  async getAllNews() {
    const result = await prisma.news.findMany({});

    return {
      success: true,
      message: 'News retrieved successfullt!',
      news: result,
    };
  }
}
