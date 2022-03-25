import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServerConfig } from './config/server';

type ENVIRONMENT = 'development' | 'staging' | 'production';

@Injectable()
export class ConfigurationService {
  private NODE_ENV: ENVIRONMENT;

  constructor(protected readonly configService: ConfigService) {
    this.NODE_ENV = configService.get<ServerConfig>('server')
      .environment as ENVIRONMENT;
  }
}
