import { ConflictException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  getHello(): string {
    return 'Hello';
  }

  async findOne({ userId }) {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async create({ userId, hashedPassword: pwd, nick, phone }) {
    const user = await this.findOne({ userId });
    if (user) throw new ConflictException('이미 등록된 계정입니다.'); // 예외 처리

    return await this.userRepository.save({
      userId,
      pwd,
      nick,
      phone,
    });
  }

  // async create({ userId, hashedPassword: pw, name, age }) {
  //   const user = await this.userRepository.findOne({ where: { userId } });

  //   if (user) throw new ConflictException('이미 등록된 계정입니다.');

  //   return await this.userRepository.save({
  //     userId,
  //     password: pw,
  //     name,
  //     age,
  //   });
  // }
}
