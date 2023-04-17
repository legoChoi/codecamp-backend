import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sms_token')
@ObjectType()
export class SmsToken {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column({ comment: '요청 휴대폰 번호' })
  @Field(() => String)
  phone: string;

  @Column({ comment: '발급 토큰' })
  @Field(() => String)
  token: string;

  @Column({ comment: '결과', default: false })
  @Field(() => Boolean)
  isAuth: boolean;

  @Column({ comment: '유효 상태', default: true })
  @Field(() => Boolean)
  isValid: boolean;

  @CreateDateColumn({ comment: '생성 날짜' })
  @Field(() => Date)
  createdAt: Date;
}
