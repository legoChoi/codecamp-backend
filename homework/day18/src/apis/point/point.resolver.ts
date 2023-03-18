import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlusPointInput } from './dto/plusPoint.input';
import { PointService } from './point.service';

@Resolver()
export class PointResolver {
  constructor(private readonly pointService: PointService) {}

  @Mutation(() => String)
  plusPoint(
    @Args('pointValue') pointValue: number, //
    @Args('userId') userId: string,
  ) {
    return this.pointService.plus({ pointValue, userId });
  }
}
