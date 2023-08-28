import { Module } from '@nestjs/common';

import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { DeptRepository } from './dept.repository';
import { LibsModule } from '@app/libs';

@Module({
  imports: [LibsModule],
  controllers: [DeptController],
  providers: [DeptService, DeptRepository],
  exports: [DeptService, DeptRepository],
})
export class DeptModule {}
