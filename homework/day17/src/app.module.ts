import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';
import { MenuModule } from './apis/menu/menu.module';
import { MenuMaincategoryModule } from './apis/menuMaincategory/menuMaincategory.module';
import { PointModule } from './apis/point/point.module';
import { StoreModule } from './apis/store/store.module';
import User from './apis/user/entities/user.entity';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    StoreModule,
    MenuModule,
    MainCategoryModule,
    MenuMaincategoryModule,
    UserModule,
    PointModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      database: 'day17',
      port: 3306,
      username: 'root',
      password: '0100',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
