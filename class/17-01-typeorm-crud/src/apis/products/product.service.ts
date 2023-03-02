import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //
  // DB에 데이터 넣기
  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      // 스프레드 연산자를 이용한 편리한 방버
      ...createProductInput,

      // 하나하나 직접 나열하는 방법
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });

    return result;
  }

  async find({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async findAll() {
    return await this.productRepository.find();
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
}
