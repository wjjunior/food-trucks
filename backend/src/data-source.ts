import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DatabaseConfig } from './database.config';

export function createDataSourceOptions(): DataSourceOptions &
  TypeOrmModuleOptions {
  const configService = new ConfigService<DatabaseConfig>();
  const maxPoolSize = Number(configService.get('DB_MAX_POOL_SIZE') ?? 50);

  return {
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: Number(configService.getOrThrow('DB_PORT')),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    namingStrategy: new SnakeNamingStrategy(),
    poolSize: maxPoolSize,
    extra: {
      max: maxPoolSize,
    },
    ssl:
      process.env.NODE_ENV === 'localhost'
        ? undefined
        : { ca: process.env.DB_SSL_CERT },
  };
}

const dataSourceOptions = createDataSourceOptions();

export const AppDataSource = new DataSource(dataSourceOptions);
