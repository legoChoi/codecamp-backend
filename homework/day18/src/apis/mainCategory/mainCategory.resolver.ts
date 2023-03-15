import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateMainCategoryInput } from './dto/createMainCategory.input';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Mutation(() => MainCategory)
  createMainCategory(
    @Args('createMainCategoryInput')
    createMainCategoryInput: CreateMainCategoryInput,
  ) {
    return this.mainCategoryService.create({ createMainCategoryInput });
  }
}
