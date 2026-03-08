import { CurrentUser } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
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
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

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
  @UseGuards(AuthGuard)
  async deleteCategory(
    @Param('id') id: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    console.log(id);
    await this.categoryService.deleteCategory(user, id);

    return {
      message: 'Category deleted successfully!',
    };
  }
}
