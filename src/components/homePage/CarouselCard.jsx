"use client";

import React, { useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookViewModal from "@/components/modals/BookViewModal";

export default function CarouselCard({ book }) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const saleability = book.saleInfo.saleability === "FOR_SALE" ? true : false;

  return (
    <Card
      sx={{
        minWidth: "300px",
        height: "200px",
        border: (theme) =>
          `1px solid ${theme.palette.tertiaryLight.main} !important`,
        boxShadow: (theme) =>
          `0 2px 5px ${theme.palette.tertiaryLight.main} !important`,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "felx-start",
          padding: "0.5rem",
          boxSizing: "border-box",
          height: "100%",
          gap: "1rem",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100px",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            padding: "0.5rem",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "170px",
            }}
          >
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(book.volumeInfo.authors)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
