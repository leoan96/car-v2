import { Module } from '@nestjs/common';
import { LocalDevelopmentEnvironmentConfigurationService } from './local-development-environment-configuration.service';

@Module({
  providers: [LocalDevelopmentEnvironmentConfigurationService],
  exports: [LocalDevelopmentEnvironmentConfigurationService],
})
export class LocalDevelopmentEnvironmentConfigurationModule {}
