import { prisma } from '@/common/config/prisma';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../prisma/generated/prisma/client';

@Injectable()
export class CategoryService {
  async createCategory(payload: Prisma.CategoryCreateInput) {
    const isExist = await prisma.category.findFirst({
      where: {
        name: payload.name,
      },
    });
    if (isExist) {
      throw new ConflictException('Category with this name is already exist!');
    }
    return await prisma.category.create({
      data: {
        ...payload,
      },
    });
  }

  async updateCategory(id: string, payload: Prisma.CategoryUpdateInput) {
    const isExist = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new NotFoundException('Targeted news is not found!');
    }

    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteCategory(id: string) {
    const isExist = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new NotFoundException('Targeted category is not found!');
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
