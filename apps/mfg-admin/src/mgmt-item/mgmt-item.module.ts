import { Module } from '@nestjs/common';
import { LibsModule } from '@app/libs';

import { MgmtItemService } from './mgmt-item.service';
import { MgmtItemController } from './mgmt-item.controller';
import { MgmtItemRepository } from './mgmt-item.repository';

@Module({
  imports: [LibsModule],
  controllers: [MgmtItemController],
  providers: [MgmtItemService, MgmtItemRepository],
  exports: [MgmtItemService, MgmtItemRepository],
})
export class MgmtItemModule {}
