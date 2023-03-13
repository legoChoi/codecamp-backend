import { InputType, OmitType } from '@nestjs/graphql';
import { Starbucks } from '../entities/starbucks.entity';

@InputType()
export class CreateStarbucksInput extends OmitType(
  Starbucks,
  ['id'],
  InputType,
) {}
