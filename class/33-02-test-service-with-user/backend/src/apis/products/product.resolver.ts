import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  //
  // 상품 등록 API
  @Mutation(() => Product) // 리턴 타입 지정
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    //
    // 엘라스틱서치 등록 연습
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct03',
    //   document: {
    //     ...createProductInput,
    //   },
    // });

    //
    // 엘라스틱서치에 등록해보기 위한 주석
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
  async fetchProducts(
    @Args({
      name: 'search',
      nullable: true,
    })
    search: string,
  ) {
    //
    // 엘라스틱서치에서 조회하기 연습
    const result = await this.elasticsearchService.search({
      index: 'myproduct0333',
      query: {
        bool: {
          should: [{ prefix: { name: search } }],
        },
      },
    });

    console.log(JSON.stringify(result, null, ' '));

    //
    // 엘라스틱서치에서 조회하기 위한 주석
    // return this.productService.findAll();
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

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
