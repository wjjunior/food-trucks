import { Query, Resolver } from '@nestjs/graphql';
import { FoodTruckService } from './food-truck.service';
import { FoodTruck } from './food-truck.entity';

@Resolver(FoodTruck)
export class FoodTruckResolver {
  constructor(private foodTruckService: FoodTruckService) {}

  @Query(() => [FoodTruck])
  async foodTrucks(): Promise<FoodTruck[]> {
    return await this.foodTruckService.findAll();
  }
}
