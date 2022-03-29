import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FrontendConfig } from '../config/frontend';
import { GoogleOauthConfig } from '../config/google_oauth';
import { ServerConfig } from '../config/server';
import { TypeOrmConfig } from '../config/type_orm';
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

  public getTypeOrmHost(): string {
    return this.configService.get<TypeOrmConfig>('typeOrm').host;
  }

  public getTypeOrmPort(): number {
    return this.configService.get<TypeOrmConfig>('typeOrm').port;
  }

  public getTypeOrmUsername(): string {
    return this.configService.get<TypeOrmConfig>('typeOrm').username;
  }

  public getTypeOrmPassword(): string {
    return this.configService.get<TypeOrmConfig>('typeOrm').password;
  }

  public getTypeOrmDatabase(): string {
    return this.configService.get<TypeOrmConfig>('typeOrm').database;
  }

  public getGoogleClientId(): string {
    return this.configService.get<GoogleOauthConfig>('googleOauth').client_id;
  }
  public getGoogleClientSecret(): string {
    return this.configService.get<GoogleOauthConfig>('googleOauth')
      .client_secret;
  }
  public getGoogleClientCallbackUrl(): string {
    return this.configService.get<GoogleOauthConfig>('googleOauth')
      .client_callback_url;
  }
}
