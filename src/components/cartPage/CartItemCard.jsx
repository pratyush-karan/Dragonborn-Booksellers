"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

function CartItemCard({ book }) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: book.price.currencyCode,
  });
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Image src={book.image} width={100} height={100} />
      <Box>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body1">
          {formatter.format(book.price.amount)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Qty: {book.qty}</Typography>
          <Button>Delete Item</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItemCard;
