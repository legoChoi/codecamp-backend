import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Store } from 'src/apis/store/entities/store.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MainCategory extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  @Field(() => String)
  id: string;

  @Column({
    type: 'varchar',
    length: '10',
    unique: true,
    comment: '카테고리 명',
  })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: '20', comment: '카테고리 설명' })
  @Field(() => String)
  description: string;

  @Column({ type: 'tinyint', default: 0, comment: '포함된 메뉴 수량' })
  @Field(() => Int)
  menuCount: number;

  @ManyToOne(() => Store)
  @Field(() => Store)
  store: Store;
}
