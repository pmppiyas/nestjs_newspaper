import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from '@/common/filters/globalExceptionFilter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { env } from '@/common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(env);

  app.enableCors({
    origin: [env.FRONTEND_URL1, env.FRONTEND_URL2],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
