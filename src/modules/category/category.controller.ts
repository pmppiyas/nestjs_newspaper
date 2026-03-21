import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
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
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Auth(Role.ADMIN)
  async createCategory(
    @Body(new ZodValidationPipe(categoryCreateSchema)) body: CategoryCreateDto,
  ) {
    const result = await this.categoryService.createCategory(body);
    return {
      message: 'Category created successfully!',
      data: result,
    };
  }

  @Get('')
  async getAllCategories() {
    const result = await this.categoryService.getAllCategories();

    return {
      message: 'All categories retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);

    return {
      message: 'Category deleted successfully!',
    };
  }
}
