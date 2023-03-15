import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepostiory: Repository<User>,
  ) {}

  async create({ createUserInput }) {
    return await this.userRepostiory.save({
      ...createUserInput,
    });
  }

  async findOne({ id }) {
    return await this.userRepostiory.findOne({
      where: { id: id },
    });
  }

  async findAll() {
    return await this.userRepostiory.find();
  }
}
