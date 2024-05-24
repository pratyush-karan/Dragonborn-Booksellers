"use client";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import GoogleLoginButton from "./GoogleLoginButton";
import { signIn, signOut, useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(true);
  };

  const { data: session } = useSession();
  return (
    <Box
      sx={{
        width: "350px",
        padding: "30px",
        height: "200px",
        margin: "50px auto",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Image src="/icon.png" alt="dragon" width={50} height={50} />
        <Typography variant="h5" fontWeight="bold">
          Dragonborn Booksellers
        </Typography>
      </Box>
      {!session ? (
        <>
          {loading ? (
            <Box sx={{ margin: "2rem 0rem" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <GoogleLoginButton handleSignIn={handleSignIn} session={session} />
          )}
        </>
      ) : (
        <Button
          onClick={handleLogout}
          variant="outlined"
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
}

export default LoginCard;
