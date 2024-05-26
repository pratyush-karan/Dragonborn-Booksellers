"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
  removeAllItemsFromCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CartDetails() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const bookList = useSelector((state) => state.cartReducer);
  const profileDetails = useSelector((state) => state.profileReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllItemsFromCart());
  };
  useEffect(() => {
    if (bookList.totalItems > 0) {
      const totalPrice = bookList.itemList.reduce(
        (acc, e) => acc + e.price.amount * e.qty,
        0
      );

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: bookList.itemList[0].price.currencyCode,
      });
      const formattedTotalPrice = formatter.format(totalPrice);
      setTotalPrice(formattedTotalPrice);
    }
  }, [bookList]);

  const handlePlaceOrder = () => {
    handleRemoveAll();
    setOrderPlaced(true);
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
        backgroundColor: (theme) => `${theme.palette.white.main}`,
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* {console.log("bookList", bookList)} */}
      <>
        {!orderPlaced ? (
          <>
            {bookList.itemList.length ? (
              <>
                <Box sx={{ padding: "1rem" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    Shopping Cart
                    <Button onClick={handleRemoveAll}>Delete all items</Button>
                  </Typography>
                </Box>

                <Grid container rowGap={5}>
                  <Grid item xs={12}></Grid>
                  <Grid item lg={8} xs={12} order={{ lg: 1, xs: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                      }}
                    >
                      {bookList.itemList.map((book) => (
                        <CartItemCard
                          key={book.id}
                          book={book}
                          handleRemove={handleRemove}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    lg={4}
                    order={{ lg: 2, xs: 1 }}
                    width={{ lg: "100%", xs: "50%" }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "fit-content",
                      padding: "2rem !important",
                      gap: "1rem",
                      borderRadius: "10px",
                      border: (theme) =>
                        `1px solid ${theme.palette.tertiaryLight.main}`,
                      boxShadow: "5px 10px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {session ? (
                      <>
                        {profileDetails.addressLine1 ||
                        profileDetails.contact ? (
                          <>
                            <Typography variant="h5">
                              Proceed to pay!
                            </Typography>
                            <Typography variant="body1">
                              Subtotal ({bookList.totalItems} items) :{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {totalPrice}
                              </span>
                            </Typography>
                            <Typography variant="body1">
                              Payment Method :{" "}
                              <span style={{ fontWeight: "bold" }}>
                                Cash on Delivery (COD)
                              </span>
                            </Typography>
                            <Button
                              onClick={handlePlaceOrder}
                              variant="contained"
                              sx={{
                                height: "30px",
                                width: "140px",
                                bgcolor: (theme) =>
                                  theme.palette.secondary.light,
                                textAlign: "center",
                                ":hover": {
                                  bgcolor: (theme) =>
                                    theme.palette.secondary.dark,
                                },
                              }}
                            >
                              Add to cart
                            </Button>
                          </>
                        ) : (
                          <>
                            <Typography variant="h6">
                              Add Address and Contact info on the{" "}
                              <Link href="/profile">proifle page</Link>
                            </Typography>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        to continue <Link href="/auth/signIn">Login </Link>
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="h4" gutterBottom>
                Your Cart is empty!
              </Typography>
            )}
          </>
        ) : (
          <>
            <Box>Your Order (orderId:) has been placed successfully!</Box>
          </>
        )}
      </>
    </Box>
  );
}

// transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//     border-radius: 4px;
//     box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
