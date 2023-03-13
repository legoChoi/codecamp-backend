import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './apis/store/store.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    StoreModule,
    UserModule,
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
      entities: [__dirname + '/apis/**/*.entity.ts'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
