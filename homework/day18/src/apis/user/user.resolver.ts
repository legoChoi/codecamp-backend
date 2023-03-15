import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import User from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //
  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  //
  @Query(() => User)
  fetchUser(
    @Args('id') id: string, //
  ) {
    return this.userService.findOne({ id });
  }

  //
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({ createUserInput });
  }

  createBookmarkedStore(
    @Args('userId') userId: string,
    @Args('storeId') storeId: string,
  ) {
    return this.userService.likeStore({ userId, storeId });
  }
}
