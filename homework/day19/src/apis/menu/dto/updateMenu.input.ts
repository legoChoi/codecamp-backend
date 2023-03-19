import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';
import { CreateMenuInput } from './createMenu.input';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {}
