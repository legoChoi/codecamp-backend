import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  aaa() {
    return 'aac';
  }

  @Mutation(() => String)
  login() {
    return '로그인 성공';
  }
}
