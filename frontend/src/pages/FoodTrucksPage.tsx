import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import FoodTrucksList from "../components/FoodTruckList/FoodTruckList";
import FoodTrucksMap from "../components/FoodTrucksMap/FoodTrucksMap";
import { GET_FOOD_TRUCKS } from "../queries/foodTrucks";
import { GetFoodTrucksData } from "../types/FoodTruck";

const FoodTrucksPage: React.FC = () => {
  const { loading, error, data } = useQuery<GetFoodTrucksData>(GET_FOOD_TRUCKS);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const rows = useMemo(
    () =>
      data?.foodTrucks.map((truck) => ({
        id: truck.id,
        name: truck.name,
        description: truck.description,
        latitude: truck.latitude,
        longitude: truck.longitude,
        locationId: truck.locationId,
      })) || [],
    [data]
  );

  const currentData = useMemo(
    () =>
      rows.slice(
        paginationModel.page * paginationModel.pageSize,
        (paginationModel.page + 1) * paginationModel.pageSize
      ),
    [rows, paginationModel]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Food Trucks
      </Typography>
      <Grid container spacing={2} style={{ width: "80vw" }}>
        <Grid item xs={12} md={6}>
          <FoodTrucksList
            rows={rows}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FoodTrucksMap currentData={currentData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FoodTrucksPage;
