import { Field, Int, ObjectType } from '@nestjs/graphql';
import User from 'src/apis/user/entities/user.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Point extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  @Field(() => String)
  id: string;

  @Column({ type: 'tinyint', comment: '적립 / 차감 / 소멸' })
  @Field(() => Int)
  status: number;

  @Column({ type: 'int', comment: '포인트 값' })
  @Field(() => Int)
  value: number;

  @Column({ type: 'int', comment: '잔여 포인트' })
  @Field(() => Int)
  remainPoint: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
