import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from '../../guards/google-oauth.guard';

import { Request } from 'express';

@Controller('auth/google')
export class GoogleOauthController {
  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    return req['user'];
  }
}
