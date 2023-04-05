import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'userId' | 'pwd' | 'phone' | 'birthday' | 'social_type'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res, social_type: 2 });
  }
}
