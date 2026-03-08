import { CurrentUser } from '@/common/decorators/user.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { ZodValidationPipe } from '@/common/pipes/zod_validation.pipe';
import { CommentService } from '@/modules/comment/comment.service';
import {
  type CommentCreateDto,
  commentCreateSchema,
} from '@/modules/comment/dto/create.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async createComment(
    @CurrentUser() user: IJwtPayload,
    @Body(new ZodValidationPipe(commentCreateSchema)) body: CommentCreateDto,
  ) {
    const result = this.commentService.createComment(user, body);

    return result;
  }
}
