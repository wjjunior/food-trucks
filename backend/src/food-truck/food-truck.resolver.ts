import { Query, Resolver } from '@nestjs/graphql';
import { FoodTruckService } from './food-truck.service';
import { FoodTruck } from './food-truck.entity';

@Resolver(FoodTruck)
export class FoodTruckResolver {
  constructor(private foodTruckService: FoodTruckService) {}

  @Query(() => [FoodTruck])
  foodTrucks(): Promise<FoodTruck[]> {
    return this.foodTruckService.findAll();
  }
}
