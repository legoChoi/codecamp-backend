import { Store } from 'src/apis/store/entities/store.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MainCategory extends DateEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  id: string;

  @Column({ type: 'varchar', length: '10', comment: '카테고리 명' })
  name: string;

  @Column({ type: 'varchar', length: '20', comment: '카테고리 설명' })
  description: string;

  @Column({ type: 'tinyint', comment: '포함된 메뉴 수량' })
  menuCount: number;

  @ManyToOne(() => Store)
  store: Store;
}
