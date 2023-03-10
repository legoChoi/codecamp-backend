import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: Boolean;

  // @Column({ nullable: true })
  // @Field(() => Date)
  // deletedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: false }) // 디폴트 값 설정
  @Field(() => Boolean)
  isSoldout: boolean;

  // FK 상품 거래 위치
  @JoinColumn()
  @OneToOne(() => ProductSaleslocation) // 관계 설정 : 1 대 1 관계
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // 다 대 다
  // 인자 1 : 내가 가리키는 것
  // 인자 2 : 상대가 가리키는 것
  @JoinTable() // 다 대 다는 Product or ProductTag 중 아무곳이나 @JoinTable() 해야 함
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @UpdateDateColumn()
  updatedAt: Date;
}
