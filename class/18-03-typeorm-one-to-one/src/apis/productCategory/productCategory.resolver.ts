import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  //
  // 카테고리 등록 API
  @Mutation(() => ProductCategory) // 리턴 타입 지정
  createProductCategory(
    @Args('name') name: string, //
  ) {
    // API 반환 값
    // 등록한 객체를 반환  best!
    // or
    // 성공 메세지 반환
    return this.productCategoryService.create({ name });
  }
}
