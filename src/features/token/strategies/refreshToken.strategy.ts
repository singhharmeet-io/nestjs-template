import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from '../../../@config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: Record<string, any>) {
    const refreshToken = req.get('Authorization')!.replace('Bearer', '').trim();
    if (!refreshToken) throw new UnauthorizedException();
    return { ...payload, refreshToken };
  }
}
