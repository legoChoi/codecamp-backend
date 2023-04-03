import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser } from 'src/common/auth/gql-user.param';

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
    const hashedPassword = await bcrypt.hash(pwd, 10);

    return this.userService.create({
      userId,
      hashedPassword,
      nick,
      phone,
    });
  }

  @UseGuards(GqlAuthAccessGuard) // 필터링
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: any, //
  ) {
    console.log('test', currentUser);

    return 'test fetchUser';
  }
}
