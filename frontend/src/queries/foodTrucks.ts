import { gql } from "@apollo/client";

export const GET_FOOD_TRUCKS = gql`
  query GetFoodTrucks {
    foodTrucks {
      id
      name
      description
      latitude
      longitude
    }
  }
`;
