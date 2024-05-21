"use client";
import React, { useState, Fragment, forwardRef, useEffect } from "react";
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
import { format } from "@/components/ui-library/helpers";
import { useRouter } from "next-nprogress-bar";

const BookListingCard = forwardRef(({ book, handleOpenSnackBar }, ref) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.cartReducer);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const saleability = book.saleInfo.saleability === "FOR_SALE" ? true : false;

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
    handleOpenSnackBar();
  };

  return (
    <Card
      ref={ref}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={() => router.push(`/books/${book.id}`)}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
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
      </Box>

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
          startIcon={<VisibilityIcon fontSize="small" />}
          size="small"
          onClick={handleOpenModal}
          variant="contained"
          color="blueGrey"
          sx={{
            textAlign: "center",
            color: (theme) => theme.palette.white.main,
            width: "130px",
            height: "32px",
            ":hover": {
              bgcolor: (theme) => theme.palette.blueGreyDark.main,
            },
          }}
        >
          View Book
        </Button>
        <Button
          startIcon={<ShoppingCartIcon fontSize="small" />}
          size="small"
          onClick={() => handleAddtoCart()}
          disabled={!saleability}
          variant="contained"
          sx={{
            width: "130px",
            height: "32px",
            bgcolor: (theme) => theme.palette.secondary.light,
            ":hover": {
              bgcolor: (theme) => theme.palette.secondary.dark,
            },
          }}
        >
          Add to cart
        </Button>
      </CardActions>
      <BookViewModal
        open={open}
        handleCloseModal={handleCloseModal}
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
    </Card>
  );
});

export default BookListingCard;
