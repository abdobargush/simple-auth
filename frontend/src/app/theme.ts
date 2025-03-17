"use client";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: grey[900],
        },
      },
    },
  },
});

export default theme;
