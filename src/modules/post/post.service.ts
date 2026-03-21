import { prisma } from '@/common/config/prisma';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class PostService {
  async createPost(postData: any, user: IJwtPayload) {
    const { tags, ...restData } = postData;

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
          ...restData,
          tags: {
            connectOrCreate: tags?.map((name: string) => ({
              where: { name },
              create: { name },
            })),
          },
        },

        include: {
          tags: true,
          category: true,
          author: true,
        },
      });

      return news;
    });
  }

  async getAllNews(filters?: {
    category?: string;
    tags?: string[];
    limit: number;
    page: number;
    sortBy: string;
    sortOrder: string;
    authorId?: string;
  }) {
    const {
      category,
      tags,
      limit = 10,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      authorId = '',
    } = filters || {};

    const where: any = {};

    if (category) {
      where.category = {
        name: category,
      };
    }

    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          name: { in: tags },
        },
      };
    }

    if (authorId) {
      where.authorId = authorId;
    }

    const skip = (page - 1) * limit;

    const news = await prisma.news.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },

      include: {
        category: true,
        tags: true,
      },
    });

    const total = await prisma.news.count({
      where,
    });

    const inPage = await prisma.news.count({
      where,
      skip,
      take: limit,
    });

    return {
      news,
      meta: {
        total,
        inPage,
        page,
        limit,
        sortBy,
        sortOrder,
      },
    };
  }

  async getById(newsId: string) {
    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new NotFoundException('Targeted news not founded!');
    }

    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return news;
  }

  async updateNews(user: IJwtPayload, newsId: string, payload: any) {
    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new NotFoundException('Targeted news not found!');
    }

    const isOwner = (news.authorId = user.id);

    if (!isOwner || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not authorized!');
    }

    const update = await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });

    return update;
  }

  async deleteNews(user: IJwtPayload, newsId: string) {
    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new NotFoundException('Targeted news not found!');
    }

    const isOwner = (news.authorId = user.id);

    if (!isOwner) {
      throw new UnauthorizedException('You are not authorized');
    }

    await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return null;
  }
}
