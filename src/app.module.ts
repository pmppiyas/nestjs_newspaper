import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { PostController } from '@/modules/post/post.controller';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [AuthModule, PostModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(PostController);
  }
}
