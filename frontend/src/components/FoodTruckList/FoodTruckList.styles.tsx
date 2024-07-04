import { styled } from "@mui/material";

export const StyledDataGridContainer = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    height: 300,
  },
  [theme.breakpoints.up("md")]: {
    height: 600,
  },
}));
