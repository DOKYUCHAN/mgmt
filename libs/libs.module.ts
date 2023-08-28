import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common';
import { DatabaseModule } from '@app/database';
import { LoggerModule } from '@app/common/logger';

@Module({
  imports: [CommonModule, DatabaseModule, LoggerModule],
  exports: [CommonModule, DatabaseModule, LoggerModule],
})
export class LibsModule {}
