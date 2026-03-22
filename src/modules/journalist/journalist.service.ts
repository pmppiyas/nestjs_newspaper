import { prisma } from '@/common/config/prisma';

import { Injectable } from '@nestjs/common';
import { RequestStatus, Role } from '@prisma/client';

@Injectable()
export class JournalistService {
  async getAll(filters?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    searchTerm?: string;
    rich?: 'highest' | 'lowest';
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      searchTerm = '',
      rich,
    } = filters || {};

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      role: Role.JOURNALIST,
    };

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { [sortBy]: sortOrder };

    if (rich) {
      orderBy = {
        news: {
          _count: rich === 'highest' ? 'desc' : 'asc',
        },
      };
    }
    const journalists = await prisma.user.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        _count: {
          select: {
            news: true,
          },
        },
      },
    });

    const total = await prisma.user.count({
      where,
    });

    return {
      data: journalists,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        sortBy,
        sortOrder,
      },
    };
  }

  async getAllRequests(filters?: {
    status?: RequestStatus;
    page?: number;
    limit?: number;
  }) {
    const { status = 'PENDING', page = 1, limit = 20 } = filters || {};

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      status: status,
    };

    const requests = await prisma.request.findMany({
      where,
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            role: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.request.count({ where });

    return {
      data: requests,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        status,
      },
    };
  }
}
