import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async create({ createMainCategoryInput }) {
    const { storeId, ...mainCategory } = createMainCategoryInput;
    const result = await this.mainCategoryRepository.save({
      ...mainCategory,
      store: {
        id: storeId,
      },
    });

    return result;
  }
}
