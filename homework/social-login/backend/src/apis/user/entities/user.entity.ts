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

  // @Column({ comment: '회원 비밀번호' })
  // // @Field(() => String)
  // pwd: string;

  @Column({ comment: '회원 이름', default: '' })
  @Field(() => String)
  userName: string;

  @Column({ comment: '회원 닉네임', default: '' })
  @Field(() => String)
  nick: string;

  @Column({ comment: '회원 생일', default: '' })
  @Field(() => String)
  birthday: string;

  @Column({ comment: '회원 휴대폰 번호', default: '' })
  @Field(() => String)
  phone: string;

  @Column({
    type: 'tinyint',
    width: 1,
    comment: '회원 성별 0 남 / 1 여',
    default: 0,
  })
  @Field(() => Int)
  gender: number;

  @Column({
    type: 'tinyint',
    width: 1,
    comment: '소셜 아이디 코드 0 카카오 / 1 네이버 / 2 구글',
  })
  @Field(() => Int)
  social_type: number;

  @Column({
    type: Boolean,
    comment: '회원가입 추가정보 입력 완료',
    default: false,
  })
  @Field(() => Boolean)
  isCompleted: boolean;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일' })
  deletedAt: Date;
}
