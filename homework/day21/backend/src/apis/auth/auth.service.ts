import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발 환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`); // 소셜 로그인 시 path 설정 반드시 필요

    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '10s' },
    );
  }

  async loginOAuth({ req, res }) {
    // 1. 가입확인
    console.log('가입 확인 진행');
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입
    console.log('회원 가입 진행');
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.userService.create({ ...createUser });
    }

    // 3. 로그인
    console.log('로그인 진행');
    this.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/homework/day21/frontend/social-login.html',
    );
  }
}
