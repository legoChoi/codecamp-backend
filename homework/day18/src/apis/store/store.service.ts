import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create({ createStoreInput }) {
    return await this.storeRepository.save({
      ...createStoreInput,
    });
  }

  async findOne({ id }) {
    return await this.storeRepository.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.storeRepository.find();
  }
}
