import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LibsModule } from '@app/libs';
import { ResponseInterceptor } from '@app/interceptors';
import { AllExceptionsFilter } from '@app/filters';

import { DeptModule } from './dept/dept.module';
import { TeamModule } from './team/team.module';
import { MgmtTypeModule } from './mgmt-type/mgmt-type.module';
import { MgmtItemModule } from './mgmt-item/mgmt-item.module';
import { ManagerModule } from './manager/manager.module';

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
