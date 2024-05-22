"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

function ProfilePageDetails({ session }) {
  const gridStyles = {
    border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
    backgroundColor: (theme) => `${theme.palette.white.main}`,
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
  };
  return (
    <Grid
      container
      spacing={2}
      flexDirection="row"
      flexWrap="nowrap"
      gap="2rem"
      sx={{ width: "90%", margin: "2rem auto" }}
    >
      {console.log("session", session)}
      <Grid item xs={3} sx={gridStyles}>
        <Image
          src={session.user.image}
          height={100}
          width={100}
          sx={{ borderRadius: "50%" }}
          alt={session.user.name}
        />
      </Grid>
      <Grid item xs={9} sx={gridStyles}>
        2
      </Grid>
    </Grid>
  );
}

export default ProfilePageDetails;
