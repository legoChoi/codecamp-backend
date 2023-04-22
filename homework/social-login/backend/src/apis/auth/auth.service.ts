import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as authTool from 'src/common/tools/auth.tool';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsToken } from './entities/smsToken.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { interval } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,

    @InjectRepository(SmsToken)
    private readonly smsTokenRepository: Repository<SmsToken>,
  ) {}

  getAccessToken({ user }): String {
    return this.jwtService.sign(
      { userId: user.userId, sub: user.id }, // 데이터
      { secret: 'testAccessKey', expiresIn: '20s' }, // 옵션
    );
  }

  setRefreshToken({ user, res }): void {
    const refreshToken = this.jwtService.sign(
      { userId: user.userId, sub: user.id },
      { secret: 'testRefreshKey', expiresIn: '2w' },
    );

    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async requestSmsAuth(to: string): Promise<SmsToken> {
    //
    // 1. 유효한 검증 토큰 찾기
    const validToken = await this.smsTokenRepository.findOne({
      where: { isValid: true },
    });

    //
    // 1-1. 유효한 토큰 있으면 isValid false로 업데이트
    if (validToken) {
      const { id, ...rest } = validToken;
      await this.smsTokenRepository.update({ id }, { isValid: false });
    }

    //
    // 2. 새로운 유효 검증 토큰 발급
    const token = authTool.getSmsToken(6);

    // authTool.sendSmsTokenToSMS(to, token); // SMS 발송 API 호출

    return await this.smsTokenRepository.save({
      phone: to,
      token,
    });
  }

  //
  // TODO: Error 처리
  async getLast({ phone }): Promise<SmsToken> {
    return await this.smsTokenRepository
      .createQueryBuilder('sms_token')
      .select('*')
      .where('sms_token.phone = :phone', { phone })
      .andWhere('sms_token.isValid = :isValid', { isValid: true })
      .getRawOne();

    return await this.smsTokenRepository.findOne({
      where: { phone, isValid: true },
    });
  }

  //
  // SMS 검증 : 토큰 비교
  async responseSmsAuth({ phone, token }): Promise<SmsToken> {
    //
    // 1. 유효한 검증 토큰 찾기
    const data = await this.smsTokenRepository.findOne({
      where: { phone, isValid: true },
    });

    console.log(data);

    //
    // 2. 토큰 비교 : 토큰 검증 성공 시 데이터 update
    if (data.token == token) {
      data.isAuth = true;
      data.isValid = false;

      await this.smsTokenRepository.save(data);
    }

    return data;
  }

  async loginOAuth({ req, res }): Promise<void> {
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
