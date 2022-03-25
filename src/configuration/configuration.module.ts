import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configuration';
import { CONFIGURATION_SERVICE } from './configuration.constants';
import { AwsParameterStoreModule } from './aws-parameter-store/aws-parameter-store.module';
import { LocalDevelopmentEnvironmentConfigurationModule } from './local-development-environment-configuration/local-development-environment-configuration.module';
import { LocalDevelopmentEnvironmentConfigurationService } from './local-development-environment-configuration/local-development-environment-configuration.service';
import { AwsParameterStoreService } from './aws-parameter-store/aws-parameter-store.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    AwsParameterStoreModule,
    LocalDevelopmentEnvironmentConfigurationModule,
  ],
  providers: [
    {
      provide: CONFIGURATION_SERVICE,
      useClass:
        process.env.NODE_ENV === 'development'
          ? LocalDevelopmentEnvironmentConfigurationService
          : AwsParameterStoreService,
    },
  ],
  exports: [CONFIGURATION_SERVICE],
})
export class ConfigurationModule {}
