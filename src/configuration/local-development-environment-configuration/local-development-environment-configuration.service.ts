import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServerConfig } from '../config/server';
import { ConfigurationInterface } from '../configuration.interface';

@Injectable()
export class LocalDevelopmentEnvironmentConfigurationService
  implements ConfigurationInterface
{
  constructor(private readonly configService: ConfigService) {}

  public getServerPort(): number | Promise<number> {
    return +this.configService.get<ServerConfig>('server').port;
  }
}
