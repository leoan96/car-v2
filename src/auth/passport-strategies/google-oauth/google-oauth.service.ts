import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { CONFIGURATION_SERVICE } from '../../../configuration/configuration.constants';

import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CONFIGURATION_SERVICE)
    protected readonly configurationService: ConfigurationInterface,
  ) {
    super({
      clientID: configurationService.getGoogleClientId(),
      clientSecret: configurationService.getGoogleClientSecret(),
      callbackURL: configurationService.getGoogleClientCallbackUrl(),
      scope: ['email', 'profile'],
    });
  }

  // https://dev.to/imichaelowolabi/how-to-implement-login-with-google-in-nest-js-2aoa
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
