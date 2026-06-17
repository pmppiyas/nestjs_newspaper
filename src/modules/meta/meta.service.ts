import { prisma } from '@/common/config/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetaService {
  async getAdminStats() {
    const newsCount = await prisma.news.count();

    const readerCount = await prisma.user.count({
      where: {
        role: 'READER',
      },
    });

    const journalistCount = await prisma.user.count({
      where: {
        role: 'JOURNALIST',
      },
    });

    const viewCount = await prisma.news.aggregate({
      _sum: {
        viewCount: true,
      },
    });

    const pendingJournalist = await prisma.request.count({
      where: {
        status: 'PENDING',
      },
    });

    return {
      news: newsCount,
      reader: readerCount,
      journalist: journalistCount,
      views: viewCount._sum.viewCount || 0,
      pendingJournalist,
    };
  }

  async getReaderStats(userId: string) {
    const readNewsCount = await prisma.readingHistory.count({
      where: {
        userId,
      },
    });

    const commentCount = await prisma.comment.count({
      where: {
        authorId: userId,
      },
    });

    const bookmarkCount = await prisma.bookmark.count({
      where: {
        userId,
      },
    });

    return {
      readNews: readNewsCount,
      comments: commentCount,
      bookmarks: bookmarkCount,
    };
  }

  async getJournalistStats(userId: string) {
    const approvedCount = await prisma.news.count({
      where: {
        authorId: userId,
        status: 'APPROVED',
      },
    });

    const pendingCount = await prisma.news.count({
      where: {
        authorId: userId,
        status: 'PENDING',
      },
    });

    const rejectedCount = await prisma.news.count({
      where: {
        authorId: userId,
        status: 'REJECTED',
      },
    });

    const totalNews = approvedCount + pendingCount + rejectedCount || 0;

    const myNewsViews = await prisma.news.aggregate({
      where: {
        authorId: userId,
        status: 'APPROVED',
      },
      _sum: {
        viewCount: true,
      },
    });

    const totalViews = myNewsViews._sum.viewCount || 0;

    return {
      total: totalNews,
      approve: approvedCount,
      pending: pendingCount,
      reject: rejectedCount,
      views: totalViews,
    };
  }
}
