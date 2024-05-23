"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/redux/features/profile-slice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import isEqual from "lodash/isEqual";

function ProfilePageDetails({ session }) {
  const gridStyles = {
    border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
    backgroundColor: (theme) => `${theme.palette.white.main}`,
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
  };

  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileReducer);
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [formData, setFormData] = useState(
    useSelector((state) => state.profileReducer)
  );

  //   const handlePhoneChange = (newValue) => {
  //     // matchIsValidTel(newValue, {
  //     //   onlyCountryies: ["IN"], // optional,
  //     //   excludedCountryies: [], // optional
  //     //   continents: [], // optional
  //     // }); // true | false

  //     setPhoneNumber(newValue);
  //   };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    handleOpenSnackBar();
  };

  useEffect(() => {
    setFormData(profileDetails);
  }, [profileDetails]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar({ ...openSnackBar, open: false });
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar({ ...openSnackBar, open: true });
  };

  return (
    <Grid
      container
      spacing={2}
      flexWrap="nowrap"
      gap="2rem"
      sx={{
        width: "90%",
        margin: "2rem auto",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: openSnackBar.vertical,
          horizontal: openSnackBar.horizontal,
        }}
        open={openSnackBar.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          // variant="filled"
        >
          Profile is Updated!
        </Alert>
      </Snackbar>
      <Grid
        item
        lg={3}
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
        lg={9}
        sx={{
          ...gridStyles,
          //   display: "flex",
          //   flexDirection: "column",
          //   padding: "1rem",
          //   gap: "2rem",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            gap: "2rem",
          }}
          onSubmit={handleSubmit}
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
              value={formData.fname}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, fname: e.target.value };
                })
              }
            />
            <TextField
              id="lname"
              label="Last Name"
              variant="outlined"
              required
              value={formData.lname}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, lname: e.target.value };
                })
              }
            />
          </Box>
          <MuiTelInput
            id="phone-number"
            value={formData.phone}
            onChange={(newValue) =>
              setFormData((prev) => {
                return { ...prev, phone: newValue };
              })
            }
            label="Phone Number"
            defaultCountry="IN"
            required
          />
          <TextField
            id="outlined-textarea"
            label="Address Line 1"
            multiline
            required
            inputProps={{ maxLength: 65 }}
            value={formData.addressLine1}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, addressLine1: e.target.value };
              })
            }
          />
          <TextField
            id="outlined-textarea"
            label="Address Line 2"
            multiline
            required
            inputProps={{ maxLength: 65 }}
            value={formData.addressLine2}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, addressLine2: e.target.value };
              })
            }
          />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            required
            sx={{ width: "50%" }}
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, city: e.target.value };
              })
            }
          />
          <Autocomplete
            disablePortal
            required
            id="combo-box-demo"
            options={statesAndUTs}
            sx={{ width: 300 }}
            value={formData.state}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, state: e.target.textContent };
              })
            }
            renderInput={(params) => <TextField {...params} label="State" />}
          />
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            required
            sx={{ width: "50%" }}
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, country: e.target.value };
              })
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "80px", height: "30px" }}
            color="secondary"
            disabled={isEqual(formData, profileDetails)}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfilePageDetails;
