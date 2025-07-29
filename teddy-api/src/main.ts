/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { EnvConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvConfig>);
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  // Enable CORS
  app.enableCors();
  
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  const port = configService.get('PORT');
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🗄️  Database: ${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`
  );
}

bootstrap();
