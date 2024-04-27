"use client";
import React, { useState } from "react";
import styles from "./BookCard.module.scss";
import BookViewModal from "../modals/BookViewModal";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  CardActions,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function BookListingCard({ book }) {
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.cartReducer);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const saleability = book.saleInfo.saleability === "FOR_SALE" ? true : false;

  const format = (arr) => {
    if (!arr) return "";
    if (arr.length === 1) return arr[0];
    else {
      return arr.join(",");
    }
  };

  let formatter;
  if (saleability) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: book.saleInfo.retailPrice.currencyCode,
    });
  }

  const handleAddtoCart = () => {
    dispatch(
      addItemToCart({
        id: book.id,
        image: book.volumeInfo.imageLinks?.thumbnail,
        title: book.volumeInfo.title,
        authors: format(book.volumeInfo.authors),
        price: book.saleInfo.retailPrice,
      })
    );
  };

  return (
    <>
      {console.log(bookList)}
      <Card
        sx={{
          minWidth: "300px",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          sx={{
            marginTop: "0.5rem",
            width: "fit-content",
          }}
          image={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <Typography variant="h6" component="h6" fontWeight="bold">
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="subtitle1">
            {format(book.volumeInfo.authors)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            {saleability ? (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {formatter.format(book.saleInfo.retailPrice.amount)}
                </Typography>
                <Typography sx={{ textDecoration: "line-through" }}>
                  {formatter.format(book.saleInfo.listPrice.amount)}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Not For Sale!
              </Typography>
            )}
          </Box>
        </CardContent>

        <Divider
          sx={{
            width: "100%",
          }}
        />
        <CardActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: ".5rem",
            margin: "0.5rem 0px",
          }}
        >
          <Button
            size="small"
            onClick={openModal}
            variant="contained"
            color="blueGrey"
            sx={{
              color: (theme) => theme.palette.white.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.25rem",
            }}
          >
            <VisibilityIcon fontSize="small" />
            <span>View Book</span>
          </Button>
          <Button
            size="small"
            onClick={() => handleAddtoCart()}
            disabled={!saleability}
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.palette.secondary.light,
              ":hover": {
                bgcolor: (theme) => theme.palette.secondary.dark,
              },
            }}
          >
            <ShoppingCartIcon fontSize="small" />
            <span>Add to cart</span>
          </Button>
        </CardActions>
      </Card>

      <BookViewModal
        isOpen={isOpen}
        onClose={closeModal}
        handleAddtoCart={handleAddtoCart}
        title={book.volumeInfo.title}
        description={book.volumeInfo.description}
        image={book.volumeInfo.imageLinks?.thumbnail}
        otherDetails={{
          id: book.id,
          genre: book.volumeInfo.categories,
          isbn: book.volumeInfo.industryIdentifiers?.[0].identifier,
          saleability: saleability,
          authors: book.volumeInfo.authors,
          price: {
            retailPrice: book.saleInfo.retailPrice,
            listPrice: book.saleInfo.listPrice,
          },
        }}
      />
    </>
  );
}

export default BookListingCard;
