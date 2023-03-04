import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header 에서 access token 뽑기
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    console.log(payload); // email, sub: [userid]
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
