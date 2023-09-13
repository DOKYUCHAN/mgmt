import { Module } from '@nestjs/common';

import { LibsModule } from '@app/libs';

import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { DeptRepository } from './dept.repository';

@Module({
  imports: [LibsModule],
  controllers: [DeptController],
  providers: [DeptService, DeptRepository],
  exports: [DeptService, DeptRepository],
})
export class DeptModule {}
