import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 20, comment: '메뉴 이름' })
  menuName: string;

  @Column({ type: 'mediumint', unsigned: true, comment: '메뉴 가격' })
  price: number;

  @Column({ type: 'varchar', length: 150, comment: '메뉴 설명' })
  description: string;

  @Column({ type: 'tinyint', comment: '메뉴 품절 상태' })
  isSoldout: number;
}
