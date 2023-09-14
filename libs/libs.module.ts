import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [CommonModule, DatabaseModule],
  exports: [CommonModule, DatabaseModule],
})
export class LibsModule {}
