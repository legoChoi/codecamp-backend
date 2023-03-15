import { Resolver } from '@nestjs/graphql';
import { MenuMaincategoryService } from './menuMaincategory.service';

@Resolver()
export class MenuMaincategoryResolver {
  constructor(
    private readonly menuMaincategoryService: MenuMaincategoryService,
  ) {}

  getTest() {
    return 'menu main category test';
  }
}
