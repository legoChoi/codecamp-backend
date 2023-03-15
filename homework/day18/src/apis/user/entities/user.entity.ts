import { DateEntity } from '../../../common/entities/entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Store } from 'src/apis/store/entities/store.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export default class User extends DateEntity {
  @PrimaryColumn({ comment: '유저 id' })
  @Field(() => String)
  id: string;

  // 이름
  @Column({ type: 'varchar', length: 20, comment: '유저 이름' })
  @Field(() => String)
  userName: string;

  // 닉네임
  @Column({ type: 'varchar', length: 20, unique: true, comment: '유저 닉네임' })
  @Field(() => String)
  userNick: string;

  // 전화번호
  @Column({ type: 'char', length: 11, comment: '유저 전화번호' })
  @Field(() => String)
  userPhone: string;

  // 패스워드
  @Column({ type: 'varchar', length: 15, comment: '유저 패스워드' })
  @Field(() => String)
  password: string;

  // 나이
  @Column({ type: 'tinyint', width: 2, zerofill: true, comment: '유저 나이' })
  @Field(() => Int)
  age: number;

  // 잔여 포인트
  @Column({ type: 'int', unsigned: true, default: 0, comment: '잔여 포인트' })
  @Field(() => Int)
  userPoint: number;

  @JoinTable()
  @ManyToMany(() => Store, (bookmarks) => bookmarks.users)
  @Field(() => [Store])
  bookmarks: Store[];
}
