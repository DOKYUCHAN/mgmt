import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceInNest } from '@nestjs/config';

import { TConfiguration, TAppConfig, TDatabaseConfig } from '@app/types';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: ConfigServiceInNest<TConfiguration>) {}

  getAll(): TConfiguration {
    return {
      APP: this.getAppConfig(),
      DB: this.getDatabaseConfig(),
    };
  }

  getAppConfig(): TAppConfig {
    return this.configService.getOrThrow('APP');
  }

  getDatabaseConfig(): TDatabaseConfig {
    return this.configService.getOrThrow('DB');
  }
}
