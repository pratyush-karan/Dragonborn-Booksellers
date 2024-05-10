"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Slide, Stack } from "@mui/material";
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import CarouselCard from "./CarouselCard";

export default function CategoryCarousel({ books }) {
  const [cards, setCards] = useState(() =>
    books.map((book) => <CarouselCard book={book} key={book.id} />)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");
  const cardsPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        height: "fit-content",
      }}
    >
      <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
        <NavigateBeforeIcon />
      </IconButton>

      <Box
        sx={{
          width: `${cardsPerPage * 250}px`,
          height: "100%",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={`card-${index}`}
            sx={{
              width: "100%",
              height: "100%",
              display: currentPage === index ? "block" : "none",
            }}
          >
            {/* this is the slide animation that will be used to slide the cards in and out*/}
            <Slide direction={slideDirection} in={currentPage === index}>
              <Stack
                spacing={2}
                direction="row"
                alignContent="center"
                justifyContent="center"
                sx={{ width: "100%", height: "100%" }}
              >
                {/* this slices the cards array to only display the amount you have previously determined per page*/}
                {cards.slice(
                  index * cardsPerPage,
                  index * cardsPerPage + cardsPerPage
                )}
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNextPage}
        disabled={
          currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}
