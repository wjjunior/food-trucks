import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FoodTruckConfig {
  @Expose()
  @IsNotEmpty()
  SF_GOV_FOOD_TRUCKS_LIST_URL!: string;
}
