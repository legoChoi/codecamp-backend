import { Controller, Get, Req, Res } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'userId' | 'pwd' | 'nickname'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }
}
