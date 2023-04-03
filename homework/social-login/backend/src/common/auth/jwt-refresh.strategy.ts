import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'testRefreshKey',
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
