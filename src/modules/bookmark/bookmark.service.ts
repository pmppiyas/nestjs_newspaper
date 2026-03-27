import { prisma } from '@/common/config/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookmarkService {
  async toggleBookmark(payload: { newsId: string; userId: string }) {
    const { newsId, userId } = payload;

    const isNewsExist = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!isNewsExist) {
      throw new NotFoundException('Targeted news not found');
    }

    const isExistBookmark = await prisma.bookmark.findFirst({
      where: {
        newsId,
        userId,
      },
    });

    if (isExistBookmark) {
      await prisma.bookmark.delete({
        where: {
          userId_newsId: {
            userId,
            newsId,
          },
        },
      });

      return {
        message: 'Bookmark removed',
      };
    } else {
      await prisma.bookmark.create({
        data: {
          newsId,
          userId,
        },
      });

      return {
        message: 'Bokkmark added',
      };
    }
  }

  async getMyBookmarks({ userId, order }: { userId: string; order: string }) {
    return await prisma.bookmark.findMany({
      where: {
        userId,
      },

      select: {
        id: true,
        news: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            publishedAt: true,
            category: {
              select: { name: true },
            },
          },
        },
      },

      orderBy: {
        id: order as Prisma.SortOrder,
      },
    });
  }

  async bookmarkCheck({ newsId, userId }: { newsId: string; userId: string }) {
    const bookmark = await prisma.bookmark.findFirst({
      where: { newsId, userId },
    });

    return !!bookmark;
  }
}
