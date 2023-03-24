import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver';
import 'dotenv/config';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.OAUTH_NAVER_ID,
      clientSecret: process.env.OAUTH_NAVER_SECRET,
      callbackURL: process.env.OAUTH_NAVER_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };

    // console.log(payload); // email, sub: [userid]
    // return {
    //   email: payload.email,
    //   id: payload.sub,
    // };
  }
}
