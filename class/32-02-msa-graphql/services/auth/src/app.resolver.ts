import { AppService } from './app.service';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  //
  @Mutation(() => String)
  login() {
    return '로그인 성공';
  }
}
