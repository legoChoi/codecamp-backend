import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateMenuInput } from './dto/createMenu.input';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => String)
  createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput, //
  ) {
    return this.menuService.create({ createMenuInput });
  }
}
