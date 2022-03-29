import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const GOOGLE_OAUTH_GUARD = 'google';

@Injectable()
export class GoogleOauthGuard extends AuthGuard(GOOGLE_OAUTH_GUARD) {}
