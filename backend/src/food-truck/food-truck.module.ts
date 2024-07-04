import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodTruck } from './food-truck.entity';
import { FoodTruckResolver } from './food-truck.resolver';
import { FoodTruckService } from './food-truck.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodTruck])],
  providers: [FoodTruckService, FoodTruckResolver],
})
export class FoodTruckModule {}
