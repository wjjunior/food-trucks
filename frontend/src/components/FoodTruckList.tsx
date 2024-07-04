import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GetFoodTrucksData } from "../types/FoodTruck";

const GET_FOOD_TRUCKS = gql`
  query GetFoodTrucks {
    foodTrucks {
      id
      name
      cuisine
      location
    }
  }
`;

const FoodTruckList: React.FC = () => {
  const { loading, error, data } = useQuery<GetFoodTrucksData>(GET_FOOD_TRUCKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Food Trucks</h1>
      <ul>
        {data?.foodTrucks.map((ft) => (
          <li key={ft.id}>
            {ft.name} - {ft.cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTruckList;
