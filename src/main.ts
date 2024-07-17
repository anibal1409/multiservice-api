import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line prettier/prettier
import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line prettier/prettier
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(' ') || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('MI PROFE')
    .setDescription('The MI PROFE-API description')
    .setVersion('1.0')
    .addCookieAuth()
    .addServer('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const globalPrefix = 'api';

  const port = process.env.PORT || 3333;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
