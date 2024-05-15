"use client";
import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, IconButton } from "@mui/material";
import CarouselCard from "./CarouselCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CategoryCarousel({ books, screenWidth }) {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const calculateSlidesToScroll = () => {
    if (screenWidth >= 1530) return 4;
    else if (screenWidth >= 1200) return 3;
    else if (screenWidth >= 900) return 2;
    else return 1;
  };

  console.log("calculateSlidesToScroll()", calculateSlidesToScroll());
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: calculateSlidesToScroll(),
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const embla_slide = {
    flex: "0 0 100%",
    minWidth: "0px",
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: (theme) => theme.palette.tertiaryLight.main,
          cursor: "pointer",
        }}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box sx={{ overflow: "hidden" }} ref={emblaRef}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "2rem",
          }}
        >
          {books.map((book) => (
            <CarouselCard book={book} key={book.id} sx={embla_slide} />
          ))}
        </Box>
      </Box>
      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: (theme) => theme.palette.tertiaryLight.main,
          cursor: "pointer",
        }}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
