import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  //
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  //
  async create({ impUid, amount, currentUser }) {
    //
    //
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    //
    // transaction 시작
    // 실패하면 rollback 성공하면 commit
    await queryRunner.startTransaction();

    try {
      //
      // 1. pointTransaction 테이블에 거래기록 1줄 생성
      // create: DB에 올리지 않고 객체만 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointTransactionRepository.save(pointTransaction); // DB에 등록
      await queryRunner.manager.save(pointTransaction); // transaction 등록

      // throw new Error('강제 에러 발생 테스트');

      //
      // 2. 유저 조회
      const user = await this.userRepository.findOne({ id: currentUser.id });

      //
      // 3. 유저 돈 업데이트
      // save: 해당하는 ID 존재하면 수정 없으면 새로 생성, 업데이트 된 결과 객체 반환
      // update: 업데이트 된 결과 개수 반환
      // this.userRepository.update(
      //   { id: user.id }, //
      //   { point: user.point + amount },
      // );

      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      //
      // transaction 성공
      // commit
      await queryRunner.commitTransaction();

      //
      // 4. 최종 결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      //
      // 실패
      // rollback
      await queryRunner.rollbackTransaction();
    } finally {
      //
      // 연결 종료
      await queryRunner.release();
    }
  }
}
