import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // 다 대 다
  // 인자 1 : 내가 가리키는 것
  // 인자 2 : 상대가 가리키는 것
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
