import { Module } from '@nestjs/common';

import { MgmtTypeService } from './mgmt-type.service';
import { MgmtTypeController } from './mgmt-type.controller';
import { MgmtTypeRepository } from './mgmt-type.repository';
import { LibsModule } from '@app/libs';

@Module({
  imports: [LibsModule],
  controllers: [MgmtTypeController],
  providers: [MgmtTypeService, MgmtTypeRepository],
  exports: [MgmtTypeService, MgmtTypeRepository],
})
export class MgmtTypeModule {}
