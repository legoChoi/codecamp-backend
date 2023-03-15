import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Menu } from 'src/apis/menu/entities/menu.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuMaincategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MainCategory)
  mainCategory: MainCategory;

  @ManyToOne(() => Menu)
  menu: Menu;

  @Column({ type: 'tinyint', default: 0, comment: '메뉴 순서' })
  menuOrder: number;
}
