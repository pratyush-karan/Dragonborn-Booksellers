"use client";
import { Box, Typography, Divider } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import IntroCarousel from "./IntroCarousel";
import SearchBar from "../ui-library/SearchBar";
import { useRouter } from "next/navigation";
import CategoryCarousel from "./CategoryCarousel";
import useScreenWidth from "@/hooks/useScreenWidth";

function HomePageLayout({ data }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChage = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    router.push(`/books?query=${query}`);
  };

  const mainCategories = [
    ["Daily Top 100", "/svg/daily-top-100.svg"],
    ["New Releases", "/svg/new-releases.svg"],
    ["BestSellers", "/svg/best-sellers.svg"],
    ["Top Authors", "/svg/top-authors.svg"],
  ];

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "90%",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <IntroCarousel />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {mainCategories.map((category, index) => (
              <Box
                key={category[1]}
                sx={{
                  backgroundImage: `url(${category[1]})`,
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
                  color: category[0] === "Top Authors" ? "#fff" : "#000",
                  cursor: "pointer",
                }}
                onClick={() => scrollToSection(index)}
              >
                {category[0]}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ margin: "1rem 0rem" }}>
          {mainCategories.map((category, index) => (
            <Box
              ref={sectionRefs[index]}
              key={category[1]}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ margin: "1rem 0rem", fontWeight: "bold" }}
              >
                {category[0]}
              </Typography>
              <CategoryCarousel books={data[index]} screenWidth={screenWidth} />
              <Divider
                sx={{
                  margin: "1rem 0rem",
                  width: "100%",
                  borderBottomWidth: "5px",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default HomePageLayout;
