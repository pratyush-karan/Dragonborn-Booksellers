"use client";

import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { format } from "@/components/ui-library/helpers";

export default function CarouselCard({ book }) {
  return (
    <Card
      sx={{
        minWidth: "400px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-around",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          sx={{
            width: "fit-content",
            padding: "0.5rem",
            transition: "transform 0.2s ease",
            cursor: "pointer",
            ":hover": {
              transform: "scale(1.1)",
              zIndex: 1,
            },
          }}
          alt={book.volumeInfo.title}
          image={book.volumeInfo.imageLinks?.thumbnail}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            flexWrap: "nowrap",
            padding: "0px",
            marginTop: "0.5rem",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(book.volumeInfo.authors)}
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <Button size="small">View Book</Button>
        <Button size="small">Add To Cart</Button>
      </Box>
    </Card>
  );
}
