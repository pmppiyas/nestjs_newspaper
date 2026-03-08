import { prisma } from '@/common/config/prisma';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { CommentCreateDto } from '@/modules/comment/dto/create.dto';
import { CommentUpdateDto } from '@/modules/comment/dto/update.sto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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

  async updateComment(user: IJwtPayload, payload: CommentUpdateDto) {
    const { commentId, content } = payload;
    const existComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existComment) {
      throw new NotFoundException('Targeted comment is not found!');
    }

    if (existComment.authorId !== user.id) {
      throw new UnauthorizedException('You are not authorized');
    }

    return await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });
  }

  async deleteComment(user: IJwtPayload, commnetId: string) {
    const existNews = await prisma.comment.findUnique({
      where: {
        id: commnetId,
      },
    });

    if (!existNews) {
      throw new NotFoundException('Targeted comment not found!');
    }

    if (existNews.authorId !== user.id) {
      throw new UnauthorizedException('You are not authorized for this');
    }

    await prisma.comment.delete({
      where: {
        id: commnetId,
      },
    });

    return null;
  }
}
