import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { FoodTruckService } from './food-truck.service';
import { FoodTruck } from './food-truck.entity';

@Resolver(FoodTruck)
export class FoodTruckResolver {
  constructor(private foodTruckService: FoodTruckService) {}

  @Query(() => [FoodTruck])
  async foodTrucks(): Promise<FoodTruck[]> {
    return await this.foodTruckService.findAll();
  }

  @Mutation(() => Boolean)
  async updateFoodTrucks(): Promise<boolean> {
    try {
      await this.foodTruckService.updateFoodTrucks();
      return true;
    } catch (error) {
      console.error('Failed to update food trucks:', error);
      return false;
    }
  }
}
