import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const JWT_GUARD = 'jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_GUARD) {}
