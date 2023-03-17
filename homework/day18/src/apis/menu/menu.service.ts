import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MenuMainCategory } from '../menuMaincategory/entities/menuMaincategory.entity';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,

    @InjectRepository(MenuMainCategory)
    private readonly menuMainCategoryRepository: Repository<MenuMainCategory>,
  ) {}

  async find({ id }) {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  async create({ createMenuInput, mainCategoryId }) {
    console.log(createMenuInput);

    //
    // 1. 메뉴 만들기
    const menu = await this.menuRepository.save({
      ...createMenuInput,
    });

    // 2. 메인 카테고리 불러오기
    const mainCategory = await this.mainCategoryRepository.findOne({
      where: { id: mainCategoryId },
    });

    //
    // 3. 메뉴 & 메인 카테고리 연결
    await this.menuMainCategoryRepository.save({
      menu,
      mainCategory,
    });

    //
    return menu;
  }
}
