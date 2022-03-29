import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JWT_CONFIGURATION_SERVICE } from './jwt-auth.constants';
import { CONFIGURATION_SERVICE } from '../../../configuration/configuration.constants';
import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { ConfigurationModule } from '../../../configuration/configuration.module';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationInterface) => {
        const secret = await configurationService.getJwtSecret();
        const expiresIn = await configurationService.getJwtExpiresIn();
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
      inject: [CONFIGURATION_SERVICE],
    }),
  ],
  providers: [
    JwtAuthStrategy,
    JwtAuthService,
    {
      provide: JWT_CONFIGURATION_SERVICE,
      useFactory: async (configurationService: ConfigurationInterface) => {
        const secret = await configurationService.getJwtSecret();
        return {
          getJwtSecret: () => secret,
        };
      },
      inject: [CONFIGURATION_SERVICE],
    },
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
