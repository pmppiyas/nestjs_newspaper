import { prisma } from '@/common/config/prisma';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { CommentCreateDto } from '@/modules/comment/dto/create.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentService {
  async createComment(user: IJwtPayload, payload: CommentCreateDto) {
    const { content, newsId } = payload;

    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new NotFoundException('Targeted news not found!');
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        newsId,
        authorId: user.id,
      },
    });

    return comment;
  }
}
