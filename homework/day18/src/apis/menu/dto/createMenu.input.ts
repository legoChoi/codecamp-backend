import { InputType, OmitType } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';

@InputType()
export class CreateMenuInput extends OmitType(
  Menu,
  ['createdAt', 'updatedAt', 'deletedAt', 'id', 'isSoldout'],
  InputType,
) {}
