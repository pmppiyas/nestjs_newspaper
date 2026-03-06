import { ZodValidationPipe } from '@/common/pipes/zod_validation.pipe';
import { CategoryService } from '@/modules/category/category.service';
import {
  categoryCreateSchema,
  type CategoryCreateDto,
} from '@/modules/category/dto/create.dto';
import {
  type CategoryUpdateDto,
  categoryUpdateSchema,
} from '@/modules/category/dto/update.dto';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body(new ZodValidationPipe(categoryCreateSchema)) body: CategoryCreateDto,
  ) {
    const result = await this.categoryService.createCategory(body);
    return {
      message: 'Category created successfully!',
      data: result,
    };
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(categoryUpdateSchema)) body: CategoryUpdateDto,
  ) {
    const result = await this.categoryService.updateCategory(id, body);

    return {
      message: 'Category updated successfully!',
      data: result,
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);

    return {
      message: 'Category deleted successfully!',
    };
  }
}
