import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { FileModule } from './apis/file/file.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    PointTransactionModule,
    PaymentMoudle,
    FileModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.115.192.4',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myserver03',
      entities: [__dirname + '/apis/**/*.entity.*'], // entity.ts로 끝나는 모든 파일
      synchronize: true, // entity와 테이블 동기화
      logging: true, // 쿼리문 로그 띄워 줌
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
