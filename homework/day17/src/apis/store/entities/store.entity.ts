import User from 'src/apis/user/entities/user.entity';
import { DateEntity } from 'src/common/entities/entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Store extends DateEntity {
  @PrimaryColumn({ comment: '매장 id' })
  id: string;

  @Column({ type: 'varchar', length: 15, comment: '매장 이름' })
  storeName: string;

  @Column({ type: 'varchar', length: 15, comment: '매장 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 300, comment: '매장 설명' })
  storeDescription: string;

  @Column({ type: 'varchar', length: 10, comment: '매장 소유자' })
  ownerName: string;

  @Column({ type: 'char', length: 11, comment: '매장 전화번호' })
  storePhone: string;

  @ManyToMany(() => User, (users) => users.bookmarks)
  users: User[];
}
