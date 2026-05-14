import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';


async function bootstrap() {
  const config = appConfig();
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: config.logger,
  });

  // Enable cors
  app.enableCors();
  // sử dụng global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // cấu hình validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // xoá các field không có trong dto
    forbidNonWhitelisted: true, // ném lỗi nếu có field không có trong dto
    transform: true, // tự động transform dữ liệu
    exceptionFactory: (error) => {
      return new BadRequestException({
        success: false,
        message: 'Validation false',
        errors: error
      });
    }
  }));

  // cấu hình global interceptor
  app.useGlobalInterceptors(new TransformInterceptor);
  const publicPath = join(__dirname, '..', 'public');
  if (!existsSync(publicPath)) mkdirSync(publicPath);
  app.useStaticAssets(publicPath, {
    prefix: '/public/',
  });
  app.setGlobalPrefix(config.apiPrefix);
  await app.listen(config.port);
  logger.log(
    `Application is running on: http://localhost:${config.port}/${config.apiPrefix}`,
  );
  
}
bootstrap();
