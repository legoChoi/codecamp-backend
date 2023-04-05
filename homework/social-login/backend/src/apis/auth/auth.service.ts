import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as authTool from 'src/common/tools/auth.tool';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsToken } from './entities/smsToken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,

    @InjectRepository(SmsToken)
    private readonly smsTokenRepository: Repository<SmsToken>,
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

  async sendSMS(to: string) {
    const token = authTool.getSmsToken(6);

    authTool.sendSmsTokenToSMS(to, token);

    return await this.smsTokenRepository.save({
      phone: to,
      token,
    });
  }

  // TODO:
  async authSMS({ phone, token }) {
    // 1. 유효한 검증 토큰 찾기
    const row = await this.smsTokenRepository.findOne({
      where: { phone, isValid: true },
    });

    //
    // 2. 토큰 비교
    // 2-1. 토큰 검증 성공
    if (row.token == token) {
    } //
    else {
      // 2-2. 토큰 검증 실패
      const result = false;
    }

    await this.smsTokenRepository
      .createQueryBuilder()
      .update()
      .set({ isAuth: true })
      .where('phone = :phone', { phone })
      .andWhere('tokne = :token', { token })
      .andWhere('isValid = :isValid', { isValid: 1 })
      .returning('*')
      .execute();

    return row;
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
