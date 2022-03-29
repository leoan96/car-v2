import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { GoogleOauthGuard } from '../../guards/google-oauth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

import { Request, Response } from 'express';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  public async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken);
    return res.redirect('/auth/google/profile');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Req() req) {
    return req.user;
  }
}
