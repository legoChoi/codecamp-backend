import { InputType, OmitType } from '@nestjs/graphql';
import User from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['userPoint', 'bookmarks', 'createdAt', 'updatedAt', 'deletedAt'],
  InputType,
) {}
