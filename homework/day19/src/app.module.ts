import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';
import { MenuModule } from './apis/menu/menu.module';
import { MenuMainCategoryModule } from './apis/menuMaincategory/menuMaincategory.module';
import { PointModule } from './apis/point/point.module';
import { StoreModule } from './apis/store/store.module';
import User from './apis/user/entities/user.entity';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    StoreModule,
    MenuModule,
    MainCategoryModule,
    MenuMainCategoryModule,
    UserModule,
    PointModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      database: 'day18',
      port: 3306,
      username: 'root',
      password: 'root',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
