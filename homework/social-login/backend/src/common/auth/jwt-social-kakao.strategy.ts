import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import 'dotenv/config';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.OAUTH_KAKAO_ID,
      clientSecret: process.env.OAUTH_KAKAO_SECRET,
      callbackURL: process.env.OAUTH_KAKAO_CALLBACK,
      scope: ['account_email', 'profile_nickname'],
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
      userId: profile._json.kakao_account.email,
      userName: profile.displayName,
      social_type: 0,
    };
  }
}
