import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async login(
    @Args('userId') userId: string, //
    @Args('pwd') pwd: string,
  ) {
    //
    // 1. 유저 존재 확인
    const user = await this.userService.findOne({ userId });

    if (!user) throw new UnprocessableEntityException('아이디 없음');

    //
    // 2. 비밀번호 확인

    //
    // 3. 전달
    return 'test';
  }
}
