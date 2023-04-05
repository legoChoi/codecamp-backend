import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'guard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
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
