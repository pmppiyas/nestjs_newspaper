import { CategoryDto } from '@/modules/category/category.dto';
import { CategoryService } from '@/modules/category/category.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() body: CategoryDto) {
    const result = await this.categoryService.createCategory(body);
    return {
      message: 'Category created successfully!',
      data: result,
    };
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() body: CategoryDto) {
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
