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
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          height="140"
          sx={{
            marginTop: "0.5rem",
            width: "fit-content",
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(book.volumeInfo.authors)}
          </Typography>
        </CardContent>
      </Box>

      <CardActions>
        <Button size="small">View Book</Button>
        <Button size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
}
