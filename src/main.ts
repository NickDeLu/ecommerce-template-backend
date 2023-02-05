import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logStream = fs.createWriteStream(
    path.join(__dirname, '../../src/logs/api.log'),
    {
      flags: 'a', //append
    },
  );
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(morgan('combined', { stream: logStream }));
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use('/api', express.static('templates'));
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  const config = new DocumentBuilder()
    .setTitle('ECOM API')
    .setDescription('An API used as the backend for ecommerce templates')
    .addTag('Ecommerce')
    .addCookieAuth('Authentication')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);
  app.use(cookieParser());
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('http.port'));
}
bootstrap();
