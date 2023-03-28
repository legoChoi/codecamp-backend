import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Query(() => String)
  getHello() {
    return this.userService.getHello();
  }

  @Mutation(() => User)
  async createUser(
    @Args('userId') userId: string,
    @Args('pwd') pwd: string,
    @Args('nick') nick: string,
    @Args('phone') phone: string,
  ) {
    const hashedPassword = await bcrypt.hash(pwd, 10); // 비밀번호 bcrypt 해싱

    return this.userService.create({
      userId,
      hashedPassword,
      nick,
      phone,
    });
  }
}
