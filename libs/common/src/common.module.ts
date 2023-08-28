import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { LoggerModule } from './logger';

@Module({
  imports: [ConfigModule, LoggerModule],
  exports: [ConfigModule, LoggerModule],
})
export class CommonModule {}
