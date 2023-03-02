import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  //
  // 상품 등록 API
  @Mutation(() => Product) // 리턴 타입 지정
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // API 반환 값
    // 등록한 객체를 반환  best!
    // or
    // 성공 메세지 반환
    return this.productService.create({ createProductInput });
  }

  //
  // 상품 조회 API
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.find({ productId });
  }

  //
  // 상품 모두 조회 API
  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  //
  // 상품 수정 API
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 수정 조건
    // 판매 완료 상품인지 확인
    await this.productService.checkSoldout({ productId });

    // 수정 완료
    return await this.productService.update({ productId, updateProductInput });
  }

  //
  // 상품 삭제 API
  @Mutation(() => Boolean)
  async deletProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
