"use client";
import React, { useState } from "react";
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
  const [bookList, setBookList] = useState(() =>
    useSelector((state) => state.cartReducer)
  );
  //   const bookList = useSelector((state) => state.cartReducer);
  console.log(bookList);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        padding: "1rem",
        height: "fit-content",
        margin: "4rem auto",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      {bookList.itemList.length ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: "2rem" }}>
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
