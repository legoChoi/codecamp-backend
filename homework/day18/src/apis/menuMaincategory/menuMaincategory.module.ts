import { Module } from '@nestjs/common';
import { MenuMainCategoryResolver } from './menuMaincategory.resolver';
import { MenuMainCategoryService } from './menuMaincategory.service';

@Module({ providers: [MenuMainCategoryResolver, MenuMainCategoryService] })
export class MenuMainCategoryModule {}
