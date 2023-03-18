import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../user/entities/user.entity';
import { Point } from './entities/point.entity';
import { PointResolver } from './point.resolver';
import { PointService } from './point.service';

@Module({
  imports: [TypeOrmModule.forFeature([Point, User])],
  providers: [PointResolver, PointService],
})
export class PointModule {}
