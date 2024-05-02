"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";

const images = [
  {
    label: `Whether you're a seasoned adventurer or just starting your literary journey, Dragonborn Booksellers has the perfect tome to ignite your imagination. Explore hidden worlds, delve into captivating characters, and discover the magic that awaits within every page.`,
    imgPath: "/images/pic-1.jpg",
  },
  {
    label: `Dive into a world of endless possibilities with Dragonborn Booksellers. Our curated selection offers something for every reader, from heart-stopping thrillers to enchanting fantasies. Unleash your inner hero and find your next great read with just a click!`,
    imgPath: "/images/pic-2.jpg",
  },
  {
    label: `Join the Dragonborn Booksellers fellowship! We're a haven for bookworms and storytellers alike. Explore new releases, rediscover old favorites, and share your passion for reading with our vibrant community. Let the adventure begin!`,
    imgPath: "/images/pic-3.jpg",
  },
  {
    label: `Heard there's a dragon guarding a mountain of books? Fear not, with Dragonborn Booksellers, your next great read is just a click away. No Thu'um required (but feel free to shout in excitement when you find your perfect book!).`,
    imgPath: "/images/pic-4.jpg",
  },
];

function IntroCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const timerId = useRef(null);

  const maxSteps = images.length;
  const handleNext = () => {
    clearTimeout(timerId.current);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    clearTimeout(timerId.current);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    timerId.current = setTimeout(() => {
      setActiveStep((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(timerId.current);
  }, [activeStep]);

  return (
    <Box sx={{ maxWidth: 480, flexGrow: 1 }}>
      <SwipeableViews
        index={activeStep}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 270,
                  display: "block",
                  maxWidth: 480,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "fit-content",
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
    </Box>
  );
}

export default IntroCarousel;
