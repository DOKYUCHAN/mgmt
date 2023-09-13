import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleInNest } from '@nestjs/config';

import { ConfigService } from './config.service';
import { configurations } from './configurations';

@Global()
@Module({
  imports: [
    ConfigModuleInNest.forRoot({
      load: [configurations],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
