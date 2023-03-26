import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { userId: user.userId, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '10s' },
    );
  }

  loginOAuth({ req, res }) {
    //
    // 1. 가입 확인
    //
    // 2. 회원 가입
    //
    // 3. 로그인
  }
}
