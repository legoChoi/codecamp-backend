import { InputType, OmitType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';

@InputType()
export class CreateStoreInput extends OmitType(
  Store,
  ['createdAt', 'updatedAt', 'deletedAt', 'users'],
  InputType,
) {}
