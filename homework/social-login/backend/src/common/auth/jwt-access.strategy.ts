import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'guard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'testAccessKey',
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
