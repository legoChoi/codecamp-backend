import { InputType, OmitType } from '@nestjs/graphql';
import { Point } from '../entities/point.entity';

@InputType()
export class PlusPointInput extends OmitType(
  Point,
  ['id', 'createdAt', 'updatedAt', 'deletedAt', 'user'],
  InputType,
) {}
