import { Field, ObjectType } from '@nestjs/graphql';
import User from 'src/apis/user/entities/user.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Store extends DateEntity {
  @PrimaryColumn({ comment: '매장 id' })
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 15, comment: '매장 이름' })
  @Field(() => String)
  storeName: string;

  @Column({ type: 'varchar', length: 15, comment: '매장 비밀번호' })
  @Field(() => String)
  password: string;

  @Column({ type: 'varchar', length: 300, comment: '매장 설명' })
  @Field(() => String)
  storeDescription: string;

  @Column({ type: 'varchar', length: 10, comment: '매장 소유자' })
  @Field(() => String)
  ownerName: string;

  @Column({ type: 'char', length: 11, comment: '매장 전화번호' })
  @Field(() => String)
  storePhone: string;

  @ManyToMany(() => User, (users) => users.bookmarks)
  @Field(() => [User])
  users: User[];
}
