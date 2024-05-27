"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
  removeAllItemsFromCart,
} from "@/redux/features/cart-slice";
import moment from "moment";
import { addOrderDetails } from "@/redux/features/order-slice";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

export default function CartDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const bookList = useSelector((state) => state.cartReducer);
  const profileDetails = useSelector((state) => state.profileReducer);
  const orderList = useSelector((state) => state.orderReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllItemsFromCart());
  };

  const priceFormatter = (price, currencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(price);
  };

  const calculateTotalPrice = () => {
    const totalPrice = bookList.itemList.reduce(
      (acc, e) => acc + e.price.amount * e.qty,
      0
    );

    return priceFormatter(totalPrice, bookList.itemList[0].price.currencyCode);
  };

  useEffect(() => {
    if (bookList.totalItems > 0) {
      setTotalPrice(calculateTotalPrice());
    }
  }, [bookList]);

  const handlePlaceOrder = () => {
    const productList = bookList.itemList.map((product) => {
      return {
        id: product.id,
        productName: product.title,
        qty: product.qty,
        totalPrice: priceFormatter(
          product.price.amount * product.qty,
          product.price.currencyCode
        ),
      };
    });

    const today = moment();
    dispatch(
      addOrderDetails({
        orderId: orderList.length + 1,
        orderDate: today.format("MMMM Do, YYYY"),
        productList: productList,
        totalPrice: calculateTotalPrice(),
        name: profileDetails.fname + " " + profileDetails.lname,
        address:
          profileDetails.addressLine1 + " " + profileDetails.addressLine2,
      })
    );

    handleRemoveAll();
    setOrderPlaced(true);
    setTimeout(() => {
      router.push("/orders");
    }, 3000);
  };
  console.log("profileDetails", profileDetails);
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
                  <Grid
                    item
                    lg={8}
                    xs={12}
                    order={{ lg: 1, xs: 2 }}
                    sx={{ paddingRight: "1rem" }}
                  >
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
                              Place Order
                            </Button>
                          </>
                        ) : (
                          <>
                            <Typography variant="h6">
                              Add Address and Contact info on the{" "}
                              <Link
                                href="/profile"
                                style={{
                                  color: "#f44336",
                                }}
                              >
                                profile page
                              </Link>
                            </Typography>
                          </>
                        )}
                      </>
                    ) : (
                      <Typography variant="h6">
                        to continue placing your order{" "}
                        <Link
                          href="/auth/signIn"
                          style={{
                            color: "#f44336",
                          }}
                        >
                          Login{" "}
                        </Link>
                      </Typography>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: (theme) => theme.palette.green.main,
              width: "70%",
              margin: "auto",
              height: "300px",
              gap: "1rem",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Your Order (orderId:{orderList.length}) has been placed
              successfully!
            </Typography>
            <Typography variant="h6">
              Please Wait while we route you to the Orders Page!
            </Typography>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </>
    </Box>
  );
}
