import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './dto/createMenu.input';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => Menu)
  createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput, //
    @Args('mainCategoryId') mainCategoryId: String,
  ) {
    return this.menuService.create({ createMenuInput, mainCategoryId });
  }
}
