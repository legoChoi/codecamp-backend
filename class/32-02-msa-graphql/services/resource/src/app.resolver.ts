import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  //
  @Query(() => String)
  fetchBoards() {
    return 'fetchBoards 데이터 보내기 성공';
  }
}
