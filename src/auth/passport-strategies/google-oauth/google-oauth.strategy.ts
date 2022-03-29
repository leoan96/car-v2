import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { CONFIGURATION_SERVICE } from '../../../configuration/configuration.constants';

import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CONFIGURATION_SERVICE)
    private readonly configurationService: ConfigurationInterface,
  ) {
    super({
      clientID: configurationService.getGoogleClientId(),
      clientSecret: configurationService.getGoogleClientSecret(),
      callbackURL: configurationService.getGoogleClientCallbackUrl(),
      scope: ['email', 'profile'],
    });
  }
}
