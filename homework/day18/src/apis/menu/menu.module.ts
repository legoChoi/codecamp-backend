import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MenuMainCategory } from '../menuMaincategory/entities/menuMaincategory.entity';
import { Menu } from './entities/menu.entity';
import { MenuResolver } from './menu.resolver';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MainCategory, MenuMainCategory])],
  providers: [
    MenuResolver, //
    MenuService,
  ],
})
export class MenuModule {}
