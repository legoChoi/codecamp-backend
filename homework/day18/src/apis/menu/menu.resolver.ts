import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './dto/createMenu.input';
import { UpdateMenuInput } from './dto/updateMenu.input';
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

  @Query(() => [Menu])
  fetchStoreMenus(@Args('storeId') storeId: string) {
    return this.menuService.findMenusWithCTGFromStore({ storeId });
  }

  @Mutation(() => Menu)
  createMenu(
    @Args('mainCategoryId') mainCategoryId: String,
    @Args('createMenuInput') createMenuInput: CreateMenuInput, //
  ) {
    return this.menuService.create({ createMenuInput, mainCategoryId });
  }

  @Mutation(() => Menu)
  updateMenu(
    @Args('menuId') menuId: string, //
    @Args('updateMenuInput') updateMenuInput: UpdateMenuInput,
  ) {
    return this.menuService.update({ menuId, updateMenuInput });
  }
}
