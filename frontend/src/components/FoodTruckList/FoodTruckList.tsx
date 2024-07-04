import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOOD_TRUCKS } from "../../queries/foodTrucks";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { GetFoodTrucksData } from "../../types/FoodTruck";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { StyledDataGridContainer } from "./FoodTruckList.styles";

const defaultCenter: LatLngExpression = [37.7749, -122.4194];

const FoodTruckList: React.FC = () => {
  const { loading, error, data } = useQuery<GetFoodTrucksData>(GET_FOOD_TRUCKS);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
    ],
    []
  );

  const rows = useMemo(
    () =>
      data?.foodTrucks.map((truck) => ({
        id: truck.id,
        name: truck.name,
        description: truck.description,
        latitude: truck.latitude,
        longitude: truck.longitude,
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Food Trucks
      </Typography>
      <Grid container spacing={2} style={{ width: "80vw" }}>
        <Grid item xs={12} md={6}>
          <StyledDataGridContainer>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error.message}</Alert>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 20, 50]}
              />
            )}
          </StyledDataGridContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 600 }}>
            <MapContainer
              center={defaultCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {currentData?.map((truck) => (
                <Marker
                  key={truck.id}
                  position={[Number(truck.latitude), Number(truck.longitude)]}
                >
                  <Popup>
                    <strong>{truck.name}</strong>
                    <br />
                    {truck.description}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FoodTruckList;
