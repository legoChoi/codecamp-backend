import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../store/entities/store.entity';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create({ createUserInput }) {
    return await this.userRepository.save({
      ...createUserInput,
    });
  }

  async findOne({ id }) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async likeStore({ userId, storeId }) {
    const user = await this.userRepository.findOne({ id: userId });
    const store = await this.storeRepository.findOne({ id: storeId });
  }
}
