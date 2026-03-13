import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from '@/common/filters/globalExceptionFilter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { env } from '@/common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    Origin: [env.FRONTEND_URL1],
    Methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credential: true,
  });

  app.use(cookieParser());

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
