import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { userId: user.userId, sub: user.id }, // 데이터
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '20s' }, // 옵션
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { userId: user.userId, sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async loginOAuth({ req, res, social_type }) {
    console.log('social type :', social_type);

    // 1. 가입 확인
    let user = await this.userService.findOne({ userId: req.user.userId });

    // 2. 회원 가입
    if (!user) {
      const { pwd, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: pwd };
      user = await this.userService.create({ ...createUser });
    }

    this.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/homework/social-login/frontend/social-login.html',
    );
  }
}
