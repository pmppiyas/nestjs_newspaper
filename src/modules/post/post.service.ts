import { prisma } from '@/config/prisma';
import { IJwtPayload } from '@/interfaces';
import { Injectable } from '@nestjs/common';

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
            connectOrCreate: tags.map((name: string) => ({
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
      success: true,
      message: 'News retrieved successfully!',
      data: {
        news,
        meta: {
          total,
          inPage,
          page,
          sortBy,
          sortOrder,
        },
      },
    };
  }
}
