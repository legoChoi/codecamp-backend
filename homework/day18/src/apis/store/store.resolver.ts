import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { CreateStoreInput } from './dto/createStoreInput';
import { Store } from './entities/store.entity';

@Resolver()
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Query(() => Store)
  fetchStore(
    @Args('id') id: string, //
  ) {
    return this.storeService.findOne({ id });
  }

  @Query(() => [Store])
  fetchStores() {
    return this.storeService.findAll();
  }

  @Mutation(() => Store)
  createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput, //
  ) {
    return this.storeService.create({ createStoreInput });
  }
}
