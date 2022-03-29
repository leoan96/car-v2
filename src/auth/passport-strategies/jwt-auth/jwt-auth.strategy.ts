import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigurationInterface } from '../../../configuration/configuration.interface';
import { JWT_CONFIGURATION_SERVICE } from './jwt-auth.constants';

import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = { sub: number; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JWT_CONFIGURATION_SERVICE)
    protected readonly configurationService: ConfigurationInterface,
  ) {
    super({
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt'];
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      ignoreExpiration: false,
      secretOrKey: configurationService.getJwtSecret(),
    });
  }
  public async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
