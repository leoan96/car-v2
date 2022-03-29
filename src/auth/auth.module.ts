import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthModule } from './passport-strategies/google-oauth/google-oauth.module';
import { JwtAuthModule } from './passport-strategies/jwt-auth/jwt-auth.module';

@Module({
  providers: [AuthService],
  imports: [GoogleOauthModule, JwtAuthModule],
})
export class AuthModule {}
