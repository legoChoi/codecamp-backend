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

  async sendSmsAuthRequest(to: string) {
    const token = authTool.getSmsToken(6);

    //
    // 1. 유효한 검증 토큰 찾기

    //
    // 2. 유효한 토큰 있으면 isValid false로 업데이트

    //
    // 3. 새로운 유효 검증 토큰 발급

    // authTool.sendSmsTokenToSMS(to, token);

    return await this.smsTokenRepository.save({
      phone: to,
      token,
    });
  }

  async getLast() {
    const row = await this.smsTokenRepository.findOne({
      where: { phone: '01051275208', isValid: true },
    });

    // console.log(tmp.isValid);
    // console.log(`${tmp.isValid}와 true 비교: ${tmp.isValid === true}`);
    // console.log(`${tmp.isValid}와 false 비교: ${tmp.isValid === false}`);

    return row;
  }

  // TODO:
  async checkSmsAuthResponse({ phone, token }) {
    //
    // 1. 유효한 검증 토큰 찾기
    const row = await this.smsTokenRepository.findOne({
      where: { phone, isValid: true },
    });

    //
    // 2. 유효한 토큰 있으면 isValid false로 업데이트

    //
    // 3. 새로운 유효 검증 토큰 발급

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

  /*
    소셜 로그인 로직
    1. 소셜 로그인

    2. sms 인증

    3. 추가 정보 입력
      + 유저 이름 입력 받아야 할 듯
      닉네임
      생년월일
      성별
  */
}
