import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
    });
  }

  validate(payload) {
    console.log(payload);

    return {
      userId: payload.userId,
      id: payload.id,
    };
  }
}
