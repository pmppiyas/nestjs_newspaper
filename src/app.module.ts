import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [AuthModule, PostModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
