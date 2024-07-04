import { render, screen } from "@testing-library/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import FoodTrucksList from "./FoodTruckList";
import { describe, it, expect, vi } from "vitest";
import { mockData } from "../../common/test.utils";

import "@testing-library/jest-dom";

const mockPaginationModel: GridPaginationModel = {
  pageSize: 10,
  page: 0,
};

const mockSetPaginationModel = vi.fn();

describe("FoodTrucksList", () => {
  it("should render the FoodTrucksList component", () => {
    render(
      <FoodTrucksList
        rows={mockData}
        paginationModel={mockPaginationModel}
        setPaginationModel={mockSetPaginationModel}
      />
    );

    expect(screen.getByText("Truck 1")).toBeInTheDocument();
    expect(screen.getByText("Best tacos")).toBeInTheDocument();
    expect(screen.getByText("Truck 2")).toBeInTheDocument();
    expect(screen.getByText("Amazing burgers")).toBeInTheDocument();
    expect(screen.getByText("Truck 3")).toBeInTheDocument();
    expect(screen.getByText("Delicious sushi")).toBeInTheDocument();
  });
});
