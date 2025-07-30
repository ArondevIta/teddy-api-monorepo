/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('Teddy API')
    .setDescription('API documentation for Teddy URL Shortener and User Management')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get('PORT');
  await app.listen(port);

  Logger.log(`🚀 Application is running on port: ${port}`);
  Logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  Logger.log(
    `🗄️  Database: ${configService.get('DB_HOST')}:${configService.get(
      'DB_PORT'
    )}/${configService.get('DB_NAME')}`
  );
}

bootstrap();
