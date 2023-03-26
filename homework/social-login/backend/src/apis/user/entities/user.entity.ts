import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '고유 번호' })
  id: string;

  @Column({ comment: '회원 ID' })
  userId: string;

  @Column({ comment: '회원 비밀번호' })
  pwd: string;

  @Column({ comment: '회원 닉네임' })
  nickname: string;

  @Column({ comment: '회원 생일' })
  birthday: string;

  @Column({ comment: '회원 성별 0 남 / 1 여' })
  gender: number;

  @Column({ comment: '소셜 아이디 코드 0 카카오 / 1 네이버 / 2 구글' })
  social_type: number;
}
