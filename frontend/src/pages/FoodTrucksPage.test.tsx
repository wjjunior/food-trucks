import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import FoodTrucksPage from "./FoodTrucksPage";
import { GET_FOOD_TRUCKS } from "../queries/foodTrucks";
import { describe, it, expect } from "vitest";
import { mockData } from "../common/test.utils";

const mocks = [
  {
    request: {
      query: GET_FOOD_TRUCKS,
    },
    result: {
      data: {
        foodTrucks: mockData,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_FOOD_TRUCKS,
    },
    error: new Error("An error occurred"),
  },
];

describe("FoodTrucksPage", () => {
  it("should render loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FoodTrucksPage />
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render error state", async () => {
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <FoodTrucksPage />
      </MockedProvider>
    );

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("An error occurred");
  });

  it("should render food trucks list and map when data is loaded", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FoodTrucksPage />
      </MockedProvider>
    );

    const truckNames = mockData.map((truck) => truck.name);
    for (const name of truckNames) {
      expect(await screen.findByText(name)).toBeInTheDocument();
    }

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });
});
