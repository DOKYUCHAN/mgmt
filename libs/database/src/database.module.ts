import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ConfigModule, ConfigService } from '@app/common/config';
import { ENVIRONMENT } from '@app/constants';

import { getEntities } from './entities';
import { repoProvider } from './repo.prorivder.';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATA_SOURCE',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const appConfig = configService.getAppConfig();
        const database = configService.getDatabaseConfig();
        const dataSource = new DataSource({
          type: database.DB_TYPE as any,
          host: database.DB_HOST,
          port: +database.DB_PORT,
          username: database.DB_USER,
          password: database.DB_PASSWORD,
          database: database.DB_NAME,
          synchronize: false,
          logging: appConfig.ENV === ENVIRONMENT.LOCAL,
          entities: getEntities(), // build가 된 파일을 기준으로하기 때문에 entity의 경로를 js로 해주어야 함
        });

        return dataSource.initialize();
      },
    },
    ...repoProvider,
  ],
  exports: ['DATA_SOURCE', ...repoProvider],
})
export class DatabaseModule {}
