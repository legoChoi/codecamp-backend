import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {
  // @Field(() => String)
  // address: string;
  // ...
  // => 위처럼 모두 적어야 하지만, PickType 또는 OmitType을 활용하여 타입 재사용
}

// OmitType : 특정 값만을 제외한 나머지 모든 값을 입력으로 받음
