import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, PostModule, CategoryModule, CommentModule, UserModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
