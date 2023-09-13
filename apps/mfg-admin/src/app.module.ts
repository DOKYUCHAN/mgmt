import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { LibsModule } from '@app/libs';
import { ResponseInterceptor } from '@app/interceptors';
import { AllExceptionsFilter } from '@app/filters';

import { DeptModule } from './dept';
import { TeamModule } from './team';
import { MgmtTypeModule } from './mgmt-type';
import { MgmtItemModule } from './mgmt-item';
import { ManagerModule } from './manager';

@Module({
  imports: [LibsModule, DeptModule, TeamModule, MgmtTypeModule, MgmtItemModule, ManagerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
