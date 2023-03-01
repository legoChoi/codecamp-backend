import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSlaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  // FK 상품 거래 위치
  @JoinColumn()
  @OneToOne(() => ProductSlaleslocation) // 관계 설정 : 1 대 1 관계
  productSaleslocation: ProductSlaleslocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  // 다 대 다
  // 인자 1 : 내가 가리키는 것
  // 인자 2 : 상대가 가리키는 것
  @JoinTable() // 다 대 다는 Product or ProductTag 중 아무곳이나 @JoinTable() 해야 함
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
