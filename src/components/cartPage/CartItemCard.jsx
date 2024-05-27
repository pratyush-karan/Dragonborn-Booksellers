"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Typography, Grid } from "@mui/material";
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
    <Grid container>
      <Grid item xl={1.5} md={2} xs={12}>
        <Image
          style={{ cursor: "pointer" }}
          src={book.image}
          width={100}
          height={100}
          alt={book.title}
          onClick={routeToBookDetailsPage}
        />
      </Grid>
      <Grid item xl={10.5} md={10} xs={12}>
        <Typography
          variant="h6"
          onClick={routeToBookDetailsPage}
          sx={{ cursor: "pointer", width: "fit-content" }}
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
      </Grid>
    </Grid>
  );
}

export default CartItemCard;
