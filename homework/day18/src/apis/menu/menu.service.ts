import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MenuMainCategory } from '../menuMaincategory/entities/menuMaincategory.entity';
import { Store } from '../store/entities/store.entity';
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

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async find({ id }) {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  async findMenusWithCTGFromStore({ storeId }) {
    // 한 번에 다 join?
    // 스토어에 존재하는 메인 카테고리 얻고 해당 카테고리 내의 메뉴 얻기를 반복?
    // 1. 스토어에 포함되는 메인 카테고리 가져오기
    // 2. 메인 카테고리에 포함되는 메뉴 가져오기
  }

  async create({ createMenuInput, mainCategoryId }) {
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

  async update({ menuId, updateMenuInput }) {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
    });

    const updatedMenu = {
      ...menu,
      id: menuId,
      ...updateMenuInput,
    };

    return await this.menuRepository.save(updatedMenu);
  }
}
