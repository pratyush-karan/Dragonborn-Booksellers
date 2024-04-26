"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue, grey, yellow } from "@mui/material/colors";
// import { Roboto } from "next/font/google";

export default function ({ children }) {
  //   const roboto = Roboto({
  //     weight: ["300", "400", "500", "700"],
  //     subsets: ["latin"],
  //     display: "swap",
  //   });

  const theme = createTheme({
    palette: {
      white: { main: "#fff" },
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: yellow[600],
        light: yellow[200],
      },
      tertiary: {
        main: grey[600],
        light: grey[300],
      },
    },
    // typography: {
    //   fontFamily: roboto.style.fontFamily,
    // },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
