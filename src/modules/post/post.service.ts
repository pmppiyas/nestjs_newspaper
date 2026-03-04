import { prisma } from '@/config/prisma';
import { IJwtPayload } from '@/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async createPost(postData: any, user: IJwtPayload) {
    const IAM = await prisma.user.findUnique({
      where: {
        id: user.id,
        email: user.email,
      },
    });
    const news = await prisma.news.create({
      data: {
        authorId: IAM?.id,
        ...postData,
      },
    });

    return news;
  }
}
