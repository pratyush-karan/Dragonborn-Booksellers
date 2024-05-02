"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import IntroCarousel from "./IntroCarousel";
import SearchBar from "../ui-library/SearchBar";
import { useRouter } from "next/navigation";

function HomePageLayout() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChage = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    router.push(`/books?query=${query}`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        <SearchBar
          onInputChange={handleInputChage}
          handleSubmit={handleSubmit}
          query={query}
        />
        <Typography variant="h3" sx={{ margin: "1rem 0rem" }}>
          Dragonborn Booksellers: Fus Ro Dah! Your Next Great Read Awaits
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <IntroCarousel />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                backgroundImage: "url(/svg/daily-top-100.svg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "250px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              Daily Top 100
            </Box>
            <Box
              sx={{
                backgroundImage: "url(/svg/new-releases.svg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "250px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              New Releases
            </Box>
            <Box
              sx={{
                backgroundImage: "url(/svg/best-sellers.svg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "250px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              BestSellers
            </Box>
            <Box
              sx={{
                backgroundImage: "url(/svg/top-authors.svg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "250px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                border: "1px solid black",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              Top Authors
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePageLayout;
