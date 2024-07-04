import React from "react";
import { Box } from "@mui/material";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { FoodTruck } from "../../types/FoodTruck";
import { StyledMapContainer } from "./FoodTrucksMap.styles";

const defaultCenter: LatLngExpression = [37.7749, -122.4194];

type FoodTrucksMapProps = {
  currentData: FoodTruck[];
};

const FoodTrucksMap: React.FC<FoodTrucksMapProps> = ({ currentData }) => {
  return (
    <Box sx={{ height: 600 }} data-testid="map-container">
      <StyledMapContainer
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
      </StyledMapContainer>
    </Box>
  );
};

export default FoodTrucksMap;
