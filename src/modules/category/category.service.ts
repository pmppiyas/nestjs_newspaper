import { prisma } from '@/config/prisma';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  async createCategory(payload: Prisma.CategoryCreateInput) {
    return await prisma.category.create({
      data: {
        ...payload,
      },
    });
  }

  async updateCategory(id: string, payload: Prisma.CategoryUpdateInput) {
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
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
