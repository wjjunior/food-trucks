import React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { StyledDataGridContainer } from "./FoodTruckList.styles";
import { FoodTruck } from "../../types/FoodTruck";

type FoodTrucksListProps = {
  rows: FoodTruck[];
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
};

const FoodTrucksList: React.FC<FoodTrucksListProps> = ({
  rows,
  paginationModel,
  setPaginationModel,
}) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  return (
    <StyledDataGridContainer>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20, 50]}
      />
    </StyledDataGridContainer>
  );
};

export default FoodTrucksList;
