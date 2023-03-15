import { Module } from '@nestjs/common';
import { MainCategoryResolver } from './mainCategory.resolver';
import { MainCategoryService } from './mainCategory.service';

@Module({ providers: [MainCategoryResolver, MainCategoryService] })
export class MainCategoryModule {}
