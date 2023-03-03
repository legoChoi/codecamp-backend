import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  //
  // DB에 데이터 넣기
  async create({ createProductInput }) {
    // 1. 상품만 등록
    // const result = await this.productRepository.save({
    //   // 스프레드 연산자를 이용한 편리한 방버
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방법
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 거래 위치를 모두 등록
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      // 스프레드 연산자
      ...productSaleslocation,
    });

    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      productCategory: {
        id: productCategoryId,
      },
    });

    return result2;
  }

  async find({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async update({ productId, updateProductInput }) {
    // 상품 수정 시 모든 정보 다 뿌릴수 있게 하기 위해
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    }); // 원본

    const newProduct = {
      ...myproduct, // 원본
      id: productId,
      ...updateProductInput, // 수정본
    };

    // save는 없으면 등록, 있으면 수정함
    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    // 1. 데이터 삭제
    // const result = await this.productRepository.delete({ id: productId });
    //
    // 2. soft delete - 직접 구현 - isDeleted
    // await this.productRepository.update({ id: productId }, { isDeleted: true });
    //
    // 3. 소프트 삭제 - 직접 구현 - deletedAt
    // await this.productRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );
    //
    // 4. 소프트 삭제 - TypeORM 제공 - softRemove
    // await this.productRepository.softRemove({ id: productId });
    //
    // 5. 소프트 삭제 - TypeORM 제공 - softDelete
    // softDelete()는 삭제된 행의 갯수를 반환
    const result = await this.productRepository.softDelete({ id: productId });

    return result.affected ? true : false;
  }
}
