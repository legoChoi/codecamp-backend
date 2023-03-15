import { Module } from '@nestjs/common';
import { MenuMaincategoryResolver } from './menuMaincategory.resolver';
import { MenuMaincategoryService } from './menuMaincategory.service';

@Module({ providers: [MenuMaincategoryResolver, MenuMaincategoryService] })
export class MenuMaincategoryModule {}
