export interface FoodTruck {
  id: number;
  name: string;
  cuisine: string;
  location: string;
}

export interface GetFoodTrucksData {
  foodTrucks: FoodTruck[];
}
