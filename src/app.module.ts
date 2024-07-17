import { join } from 'path';
import {
  DataSource,
  getConnectionOptions,
} from 'typeorm';

import {
  Global,
  Module,
} from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { RepositoriesModule } from './repositories/repositories.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.prod', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          charset: 'utf8mb4',
          timezone: 'Z',
          ssl: process.env.TYPEORM_SSL === 'true',
          extra: {
            connectionLimit: 100,
            ssl:
              process.env.TYPEORM_SSL === 'true'
                ? {
                    rejectUnauthorized: false,
                  }
                : null,
          },
        }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
      inject: [ConfigService],
    }),
    RepositoriesModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      exclude: ['/api/(.*)'],
      serveRoot: '/public',
      renderPath: 'public',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
