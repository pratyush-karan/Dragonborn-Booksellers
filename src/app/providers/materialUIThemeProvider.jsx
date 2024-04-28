"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  lightBlue,
  grey,
  yellow,
  red,
  amber,
  blueGrey,
  green,
  teal,
} from "@mui/material/colors";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
        main: grey[500],
      },
      tertiaryLight: {
        main: grey[200],
      },
      blueGrey: {
        main: blueGrey[500],
      },
      red: {
        main: red[500],
      },
      green: {
        main: green[500],
      },
    },
    typography: {
      fontFamily: raleway.style.fontFamily,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
