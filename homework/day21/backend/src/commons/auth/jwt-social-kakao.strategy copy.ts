import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
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
    console.log('카카오 프로필: ', profile);

    return {
      email: profile._json.kakao_account.email,
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
