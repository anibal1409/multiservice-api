import {
  DataSource,
  getConnectionOptions,
} from 'typeorm';

import { ConfigModule } from '@nestjs/config';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { RepositoriesModule } from './repositories';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.prod', '.env.local'],
        }),
        TypeOrmModule.forRootAsync({
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
        }),
        RepositoriesModule,
        AuthModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
