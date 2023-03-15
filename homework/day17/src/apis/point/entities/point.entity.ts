import User from 'src/apis/user/entities/user.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Point extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  id: string;

  @Column({ type: 'tinyint', comment: '적립 / 차감 / 소멸' })
  status: number;

  @Column({ type: 'int', comment: '포인트 값' })
  value: number;

  @Column({ type: 'int', comment: '잔여 포인트' })
  remainPoint: number;

  @ManyToOne(() => User)
  user: User;
}
