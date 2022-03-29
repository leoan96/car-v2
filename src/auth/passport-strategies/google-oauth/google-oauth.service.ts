import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { GOOGLE_OAUTH_CONFIGURATION_SERVICE } from './google-oauth.constants';

import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GOOGLE_OAUTH_CONFIGURATION_SERVICE)
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
  public async validate(
    _accessToken: string,
    _refreshToken: string,
    profile,
  ): Promise<any> {
    const { id, name, emails } = profile;

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database
    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      username: emails[0].value,
    };
  }
}
