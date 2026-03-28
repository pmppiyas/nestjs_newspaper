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
}
