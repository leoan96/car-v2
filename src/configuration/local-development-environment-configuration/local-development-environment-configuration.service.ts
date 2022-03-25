import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FrontendConfig } from '../config/frontend';

import { ServerConfig } from '../config/server';
import { ConfigurationInterface } from '../configuration.interface';

@Injectable()
export class LocalDevelopmentEnvironmentConfigurationService
  implements ConfigurationInterface
{
  constructor(private readonly configService: ConfigService) {}

  public getServerPort(): number {
    return +this.configService.get<ServerConfig>('server').port;
  }

  public getFrontendUrl(): string {
    return this.configService.get<FrontendConfig>('frontend').url;
  }
}
