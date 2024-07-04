import { render, screen } from "@testing-library/react";
import FoodTrucksMap from "./FoodTrucksMap";
import { describe, it, expect } from "vitest";
import { mockData } from "../../common/test.utils";

describe("FoodTrucksMap", () => {
  it("should render the map container", () => {
    render(<FoodTrucksMap currentData={mockData} />);

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });
});
