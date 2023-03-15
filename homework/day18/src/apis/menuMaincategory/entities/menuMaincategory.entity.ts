import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Menu } from 'src/apis/menu/entities/menu.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MenuMainCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => MainCategory)
  @Field(() => MainCategory)
  mainCategory: MainCategory;

  @ManyToOne(() => Menu)
  @Field(() => Menu)
  menu: Menu;

  @Column({ type: 'tinyint', default: 0, comment: '메뉴 순서' })
  @Field(() => Int)
  menuOrder: number;
}
