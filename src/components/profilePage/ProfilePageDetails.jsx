"use client";

import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import Autocomplete from "@mui/material/Autocomplete";

function ProfilePageDetails({ session }) {
  const gridStyles = {
    border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
    backgroundColor: (theme) => `${theme.palette.white.main}`,
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (newValue) => {
    // matchIsValidTel(newValue, {
    //   onlyCountryies: ["IN"], // optional,
    //   excludedCountryies: [], // optional
    //   continents: [], // optional
    // }); // true | false

    setPhoneNumber(newValue);
  };

  const statesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

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
      <Grid
        item
        xs={3}
        sx={{
          ...gridStyles,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "0.5rem",
          padding: "2rem 1rem !important",
          height: "fit-content",
        }}
      >
        <Image
          src={session.user.image}
          height={100}
          width={100}
          style={{ borderRadius: "50%" }}
          alt={session.user.name}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {session.user.name}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="subtitle2">{session.user.email}</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          ...gridStyles,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "2rem",
        }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Profile Settings
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: "2rem" }}
        >
          <TextField
            id="fname"
            label="First Name"
            variant="outlined"
            required
          />
          <TextField id="lname" label="Last Name" variant="outlined" required />
        </Box>
        <MuiTelInput
          value={phoneNumber}
          onChange={handlePhoneChange}
          label="Phone Number"
          defaultCountry="IN"
        />

        <TextField
          id="outlined-textarea"
          label="Address Line 1"
          multiline
          required
          inputProps={{ maxLength: 65 }}
        />

        <TextField
          id="outlined-textarea"
          label="Address Line 2"
          multiline
          required
          inputProps={{ maxLength: 65 }}
        />

        <TextField
          id="city"
          label="City"
          variant="outlined"
          required
          sx={{ width: "50%" }}
        />

        <Autocomplete
          disablePortal
          required
          id="combo-box-demo"
          options={statesAndUTs}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="State" />}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          required
          sx={{ width: "50%" }}
        />

        <Button
          variant="contained"
          sx={{ width: "80px", height: "30px" }}
          color="secondary"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePageDetails;
