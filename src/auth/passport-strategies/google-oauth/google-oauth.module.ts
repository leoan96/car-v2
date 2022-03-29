import { Module } from '@nestjs/common';

import { GOOGLE_OAUTH_CONFIGURATION_SERVICE } from './google-oauth.constants';
import { CONFIGURATION_SERVICE } from '../../../configuration/configuration.constants';
import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { ConfigurationModule } from '../../../configuration/configuration.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.service';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [ConfigurationModule, JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [
    GoogleOauthStrategy,
    {
      provide: GOOGLE_OAUTH_CONFIGURATION_SERVICE,
      useFactory: async (configurationService: ConfigurationInterface) => {
        const clientId = await configurationService.getGoogleClientId();
        const clientSecret = await configurationService.getGoogleClientSecret();
        const cliecntCallbackUrl =
          await configurationService.getGoogleClientCallbackUrl();

        const configs = {
          getGoogleClientId: () => clientId,
          getGoogleClientSecret: () => clientSecret,
          getGoogleClientCallbackUrl: () => cliecntCallbackUrl,
        };
        return configs;
      },
      inject: [CONFIGURATION_SERVICE],
    },
  ],
})
export class GoogleOauthModule {}
