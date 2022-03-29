import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../configuration/configuration.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
