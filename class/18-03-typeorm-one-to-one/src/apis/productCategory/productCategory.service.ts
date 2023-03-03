import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  //
  // DB에 데이터 넣기
  async create({ name }) {
    // SQL문으로 매핑 됨
    const result = await this.productCategoryRepository.save({
      name,
    });

    console.log(result);

    return result;
  }
}
