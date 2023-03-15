import { Field, InputType, PickType } from '@nestjs/graphql';
import { MainCategory } from '../entities/mainCategory.entity';

@InputType()
export class CreateMainCategoryInput extends PickType(
  MainCategory,
  ['name', 'description'],
  InputType,
) {
  @Field(() => String)
  storeId: String;
}
