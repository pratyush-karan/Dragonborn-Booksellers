"use client";
import React from "react";
import { Button, Typography } from "@mui/material";
import googleIcon from "../../../public/svg/googleIcon.svg";
import Image from "next/image";

function GoogleLoginButton({ handleSignIn }) {
  return (
    <Button
      startIcon={
        <Image
          src={"/svg/googleIcon.svg"}
          width={48}
          height={48}
          alt="google-icon"
        />
      }
      sx={{
        width: "fit-content",
        height: "fit-content",
        margin: "2rem 0rem",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        borderRadius: "50rem",
        color: "#000",
        ":hover": {
          backgroundColor: (theme) => `${theme.palette.tertiaryLight.main}`,
        },
      }}
    >
      <Typography
        variant="button"
        display="block"
        sx={{ textTransform: "none", padding: "0rem 1rem" }}
        onClick={handleSignIn}
      >
        Sign in with Google
      </Typography>
    </Button>
  );
}

export default GoogleLoginButton;
