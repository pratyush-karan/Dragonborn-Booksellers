"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";

function CartDetails() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.cartReducer);
  console.log(bookList);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        margin: "2rem auto 0rem auto",
      }}
    >
      {bookList.itemList.length ? (
        <>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {bookList.itemList.map((book) => (
              <CartItemCard key={book.id} book={book} />
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h4" gutterBottom>
          Your Cart is empty!
        </Typography>
      )}
    </Box>
  );
}

export default CartDetails;
