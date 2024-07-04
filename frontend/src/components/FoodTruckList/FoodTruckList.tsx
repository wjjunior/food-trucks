// src/components/FoodTruckList.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FOOD_TRUCKS } from "../../queries/foodTrucks";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { GetFoodTrucksData } from "../../types/FoodTruck";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StyledDataGridContainer } from "./FoodTruckList.styles";

const FoodTruckList: React.FC = () => {
  const { loading, error, data } = useQuery<GetFoodTrucksData>(GET_FOOD_TRUCKS);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "latitude", headerName: "Latitude", width: 150 },
    { field: "longitude", headerName: "Longitude", width: 150 },
  ];

  const rows = data?.foodTrucks.map((truck) => ({
    id: truck.id,
    name: truck.name,
    description: truck.description,
    latitude: truck.latitude,
    longitude: truck.longitude,
  }));

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Food Trucks
      </Typography>
      <StyledDataGridContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </StyledDataGridContainer>
    </Container>
  );
};

export default FoodTruckList;
