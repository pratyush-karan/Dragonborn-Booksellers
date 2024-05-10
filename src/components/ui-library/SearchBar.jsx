"use client";
import React from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchBar({ onInputChange, handleSubmit, query }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        "@media (max-width: 695px)": {
          flexDirection: "column",
        },
        margin: "2rem",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search books by name,author or title"
        variant="outlined"
        color="red"
        value={query}
        onChange={onInputChange}
        size="small"
        sx={{
          width: "30rem",
          "@media (max-width: 1200px)": {
            width: "20rem",
          },
        }}
      />

      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Search Books
      </Button>
    </Box>
  );
}

export default SearchBar;
