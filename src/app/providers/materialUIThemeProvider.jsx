"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  lightBlue,
  grey,
  yellow,
  red,
  amber,
  blueGrey,
} from "@mui/material/colors";
// import { Roboto } from "next/font/google";

export default function ({ children }) {
  const theme = createTheme({
    palette: {
      white: { main: "#fff" },
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: amber[500],
      },
      tertiary: {
        main: grey[600],
      },
      blueGrey: {
        main: blueGrey[500],
      },
      red: {
        main: red[500],
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
