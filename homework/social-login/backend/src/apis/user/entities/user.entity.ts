import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '고유 번호' })
  @Field(() => String)
  id: string;

  @Column({ comment: '회원 ID' })
  @Field(() => String)
  userId: string;

  @Column({ comment: '회원 비밀번호' })
  @Field(() => String)
  pwd: string;

  @Column({ comment: '회원 닉네임' })
  @Field(() => String)
  nick: string;

  @Column({ comment: '회원 생일' })
  @Field(() => String)
  birthday: string;

  @Column({ comment: '회원 휴대폰 번호' })
  @Field(() => String)
  phone: string;

  @Column({ comment: '회원 성별 0 남 / 1 여' })
  @Field(() => Int)
  gender: number;

  @Column({ comment: '소셜 아이디 코드 0 카카오 / 1 네이버 / 2 구글' })
  @Field(() => Int)
  social_type: number;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일' })
  deletedAt: Date;
}
