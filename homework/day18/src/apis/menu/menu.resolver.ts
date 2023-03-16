import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './dto/createMenu.input';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => Menu)
  fetchMenu(
    @Args('id') id: string, //
  ) {
    return this.menuService.find({ id });
  }

  @Query(() => [Menu])
  fetchMenus() {
    return this.menuService.findAll();
  }

  @Mutation(() => Menu)
  createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput, //
    @Args('mainCategoryId') mainCategoryId: String,
  ) {
    return this.menuService.create({ createMenuInput, mainCategoryId });
  }
}
