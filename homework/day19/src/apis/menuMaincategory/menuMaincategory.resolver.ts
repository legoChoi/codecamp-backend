import { Resolver } from '@nestjs/graphql';
import { MenuMainCategoryService } from './menuMaincategory.service';

@Resolver()
export class MenuMainCategoryResolver {
  constructor(
    private readonly menuMainCategoryService: MenuMainCategoryService,
  ) {}

  getTest() {
    return 'menu main category test';
  }
}
