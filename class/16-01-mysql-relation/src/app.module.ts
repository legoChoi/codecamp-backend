import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';

@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '0100',
      database: 'myproject03',
      entities: [__dirname + '/apis/**/*.entity.*'], // entity.ts로 끝나는 모든 파일
      synchronize: true, // entity와 테이블 동기화
      logging: true, // 쿼리문 로그 띄워 줌
    }),
  ],
})
export class AppModule {}
