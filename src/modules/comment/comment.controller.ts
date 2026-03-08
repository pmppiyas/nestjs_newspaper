import { CurrentUser } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { ZodValidationPipe } from '@/common/pipes/zod_validation.pipe';
import { CommentService } from '@/modules/comment/comment.service';
import {
  type CommentCreateDto,
  commentCreateSchema,
} from '@/modules/comment/dto/create.dto';
import {
  type CommentUpdateDto,
  commentUpdateSchema,
} from '@/modules/comment/dto/update.sto';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('post')
  @UseGuards(AuthGuard)
  async createComment(
    @CurrentUser() user: IJwtPayload,
    @Body(new ZodValidationPipe(commentCreateSchema)) body: CommentCreateDto,
  ) {
    const result = await this.commentService.createComment(user, body);

    return { message: 'Commented successfully!', data: result };
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  async updateComment(
    @CurrentUser() user: IJwtPayload,
    @Body(new ZodValidationPipe(commentUpdateSchema)) body: CommentUpdateDto,
  ) {
    const result = await this.commentService.updateComment(user, body);

    return {
      message: 'Comment updated successfully',
      data: result,
    };
  }
}
