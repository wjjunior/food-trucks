import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ApiConfig } from './api.config';
import { INestApplication } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<ApiConfig>>(ConfigService);

  setupCors(app, configService);

  await app.listen(3000);
}
bootstrap();

function setupCors(
  app: INestApplication,
  configService: ConfigService<ApiConfig>,
): void {
  app.enableCors({
    origin: configService.getOrThrow('WHITELIST_ORIGINS'),
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders:
      'X-Requested-With, content-type, Authorization, Origin,Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-credentials, apollo-require-preflight',
    credentials: true,
  });
}
