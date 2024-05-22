"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
  removeAllItemsFromCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";

export default function CartDetails() {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.cartReducer);
  console.log(bookList);

  const handleRemove = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllItemsFromCart());
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        width: "90%",
        padding: "1.5rem",
        height: "fit-content",
        margin: "4rem auto",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      {bookList.itemList.length ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              Shopping Cart
              <Button onClick={handleRemoveAll}>Delete all items</Button>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {bookList.itemList.map((book) => (
                <CartItemCard
                  key={book.id}
                  book={book}
                  handleRemove={handleRemove}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={4}>
            Proceed to pay!
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h4" gutterBottom>
          Your Cart is empty!
        </Typography>
      )}
    </Box>
  );
}
