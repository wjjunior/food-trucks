export interface FoodTruck {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  locationId: number;
}

export interface GetFoodTrucksData {
  foodTrucks: FoodTruck[];
}
