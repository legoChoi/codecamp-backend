import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
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
}
