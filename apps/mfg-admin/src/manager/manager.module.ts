import { Module } from '@nestjs/common';

import { LibsModule } from '@app/libs';

import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ManagerRepository } from './manager.repository';

@Module({
  imports: [LibsModule],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository],
  exports: [ManagerService, ManagerRepository],
})
export class ManagerModule {}
