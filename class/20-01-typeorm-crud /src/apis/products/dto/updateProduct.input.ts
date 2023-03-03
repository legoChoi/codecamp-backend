import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

/*
    PartialType
        전체를 다 물음표로 : 전부 입력 가능하게
    PickType
        선택한 것만 얻어냄
    OmitType
        선택한 것만 제외시킴
*/
