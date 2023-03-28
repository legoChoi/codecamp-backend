import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userId') userId: string, //
    @Args('pwd') pwd: string,
  ) {
    // 1. 로그인
    const user = await this.userService.findOne({ userId });

    // 1-1. 일치하는 유저 없으면 에러
    if (!user)
      throw new UnprocessableEntityException(
        '해당하는 아이디로 가입된 계정이 없습니다.',
      );

    const isAuth = await bcrypt.compare(pwd, user.pwd);
    if (!isAuth) throw new UnprocessableEntityException('틀린 비밀번호');

    // 2. 일치하는 유저 존재하는 경우 액세스 토큰(JWT)을 만들어서 전달
    return this.authService.getAccessToken({ user });
  }
}
