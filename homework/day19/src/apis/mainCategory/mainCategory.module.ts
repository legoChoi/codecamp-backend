import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../store/entities/store.entity';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryResolver } from './mainCategory.resolver';
import { MainCategoryService } from './mainCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  providers: [MainCategoryResolver, MainCategoryService],
})
export class MainCategoryModule {}
