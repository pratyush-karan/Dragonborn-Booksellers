"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

function CartItemCard({ book, handleRemove }) {
  const router = useRouter();
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: book.price.currencyCode,
  });

  const routeToBookDetailsPage = () => {
    router.push(`/books/${book.id}`);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Image
        style={{ cursor: "pointer" }}
        src={book.image}
        width={100}
        height={100}
        alt={book.title}
        onClick={routeToBookDetailsPage}
      />
      <Box>
        <Typography
          variant="h6"
          onClick={routeToBookDetailsPage}
          sx={{ cursor: "pointer" }}
        >
          {book.title}
        </Typography>
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
          <Button onClick={() => handleRemove(book.id)}>Delete Item</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItemCard;
