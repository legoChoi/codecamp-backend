import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser } from 'src/common/auth/gql-user.param';
import { SmsToken } from './entities/smsToken.entity';

@Resolver()
export class AuthResolver {
  constructor(
    // private readonly userService: UserService, //
    private readonly authService: AuthService, //
  ) {}

  //
  //
  @Mutation(() => SmsToken)
  startSMSAuth(
    @Args('phone') phone: string, //
  ) {
    return this.authService.sendSMS(phone);
  }

  //
  //
  @Mutation(() => SmsToken)
  endSMSAuth(
    @Args('phone') phone: string, //
    @Args('token') token: string,
  ) {
    return this.authService.authSMS({ phone, token });
  }

  //
  //
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreRefreshToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
