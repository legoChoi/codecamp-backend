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
    console.log('access: ', accessToken);
    console.log('refresh: ', refreshToken);
    console.log(profile);

    return {
      userId: profile.emails[0].value,
      userName: profile.displayName,
      social_type: 1,
    };
  }
}
