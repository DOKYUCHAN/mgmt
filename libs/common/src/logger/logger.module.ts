import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { ENVIRONMENT } from '@app/constants';

import { LoggerService } from './logger.service';
import { ConfigModule, ConfigService } from '../config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { ENV, SERVER_NAME } = configService.getAppConfig();

        return {
          transports:
            ENV !== ENVIRONMENT.TEST // ! test 환경에서 transports options 관련 호환이 되지 않아 관련 처리 진행
              ? [
                  new winston.transports.Console({
                    level: ENV !== ENVIRONMENT.PRODUCTION ? 'silly' : 'info',
                    format: winston.format.combine(
                      winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                      }),
                      utilities.format.nestLike(SERVER_NAME, {
                        prettyPrint: ENV === ENVIRONMENT.LOCAL ? true : false,
                        colors: ENV === ENVIRONMENT.LOCAL ? true : false,
                      }),
                    ),
                  }),
                ]
              : [],
        };
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
