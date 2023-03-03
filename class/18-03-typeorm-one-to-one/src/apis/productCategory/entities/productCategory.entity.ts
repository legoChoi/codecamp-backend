import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid') // 타입 스크립트 타입
  @Field(() => String) // gql 타입
  id: string;

  @Column({ unique: true })
  @Field(() => String) // gql 타입
  name: string;
}
