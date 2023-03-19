import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Menu extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 20, comment: '메뉴 이름' })
  @Field(() => String)
  menuName: string;

  @Column({ type: 'mediumint', unsigned: true, comment: '메뉴 가격' })
  @Field(() => Int)
  price: number;

  @Column({ type: 'varchar', length: 150, comment: '메뉴 설명' })
  @Field(() => String)
  description: string;

  @Column({ type: 'tinyint', default: 0, comment: '메뉴 품절 상태' })
  @Field(() => Int)
  isSoldout: number;
}
