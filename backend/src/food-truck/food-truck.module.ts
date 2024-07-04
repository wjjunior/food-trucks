import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodTruck } from './food-truck.entity';
import { FoodTruckResolver } from './food-truck.resolver';
import { FoodTruckService } from './food-truck.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([FoodTruck]), ScheduleModule.forRoot()],
  providers: [FoodTruckService, FoodTruckResolver],
})
export class FoodTruckModule {}
