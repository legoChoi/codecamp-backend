import { DateEntity } from '../../../common/entities/entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Store } from 'src/apis/store/entities/store.entity';

@Entity()
export default class User extends DateEntity {
  @PrimaryColumn({ comment: '유저 id' })
  id: string;

  // 이름
  @Column({ type: 'varchar', length: 10, comment: '유저 이름' })
  userName: string;

  // 닉네임
  @Column({ type: 'varchar', length: 10, comment: '유저 닉네임' })
  userNick: string;

  // 전화번호
  @Column({ type: 'char', length: 11, comment: '유저 전화번호' })
  userPhone: string;

  // 패스워드
  @Column({ type: 'varchar', length: 15, comment: '유저 패스워드' })
  password: string;

  // 나이
  @Column({ type: 'tinyint', width: 2, zerofill: true, comment: '유저 나이' })
  age: number;

  // 잔여 포인트
  @Column({ type: 'int', unsigned: true, comment: '잔여 포인트' })
  userPoint: number;

  @ManyToMany(() => Store, (bookmarks) => bookmarks.users)
  @JoinTable()
  bookmarks: Store[];
}
