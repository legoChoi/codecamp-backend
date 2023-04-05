import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as authTool from 'src/common/tools/auth.tool';
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
      { secret: 'testAccessKey', expiresIn: '20s' }, // 옵션
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { userId: user.userId, sub: user.id },
      { secret: 'testRefreshKey', expiresIn: '2w' },
    );

    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getSmsToken(): string {
    return authTool.getSmsToken(6);
  }

  async check(to: string, token: string) {
    return authTool.sendSmsTokenToSMS(to, token);
  }

  async loginOAuth({ req, res }) {
    console.log(req.user);

    // 1. 가입 확인
    let user = await this.userService.findOne({ userName: req.user.userName });

    // 2. 회원 가입
    if (!user) {
      user = await this.userService.social_create({ ...req.user });
    }

    this.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/homework/social-login/frontend/social-login.html',
    );
  }
}
