import { CategoryDto } from '@/modules/category/category.dto';
import { CategoryService } from '@/modules/category/category.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() body: CategoryDto) {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
