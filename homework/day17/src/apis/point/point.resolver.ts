import { Query, Resolver } from '@nestjs/graphql';
import { PointService } from './point.service';

@Resolver()
export class PointResolver {
  constructor(private readonly pointService: PointService) {}

  @Query(() => String)
  getPointTest() {
    return 'point test';
  }
}
