"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next-nprogress-bar";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

function BookDetails({ bookData }) {
  console.log("bookData", bookData);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const format = (arr) => {
    if (!arr) return "";
    if (arr.length === 1) return arr[0];
    else {
      return arr.join(",");
    }
  };
  const saleability =
    bookData.saleInfo.saleability === "FOR_SALE" ? true : false;

  let formatter;
  if (saleability) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: bookData.saleInfo.retailPrice.currencyCode,
    });
  }

  const getImageSrc = (bookData) => {
    const imageLinks = bookData.volumeInfo?.imageLinks;
    return (
      imageLinks?.extraLarge ||
      imageLinks?.large ||
      imageLinks?.medium ||
      imageLinks?.small ||
      imageLinks?.smallThumbnail ||
      imageLinks?.thumbnail ||
      null
    );
  };

  const handleAddtoCart = () => {
    dispatch(
      addItemToCart({
        id: bookData.id,
        image: getImageSrc(bookData),
        title: bookData.volumeInfo.title,
        authors: format(bookData.volumeInfo.authors),
        price: bookData.saleInfo.retailPrice,
      })
    );
  };

  const rows = [
    { name: "Title:", value: bookData.volumeInfo.title },
    { name: "Author:", value: format(bookData.volumeInfo.authors) || "NA" },
    {
      name: "ISBN:",
      value: bookData.volumeInfo.industryIdentifiers
        ? bookData.volumeInfo.industryIdentifiers[0].identifier
        : "NA",
    },
    {
      name: "Price:",
      value: saleability ? (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <Typography sx={{ fontWeight: "bold", color: "green.main" }}>
            {formatter.format(bookData.saleInfo.retailPrice.amount)}
          </Typography>
          <Typography sx={{ textDecoration: "line-through" }}>
            {formatter.format(bookData.saleInfo.listPrice.amount)}
          </Typography>
        </Box>
      ) : (
        <Typography variant="subtitle2" color="red.main">
          Not For Sale!
        </Typography>
      ),
    },
    {
      name: "Maturity Rating",
      value: bookData.volumeInfo.maturityRating || "NA",
    },
    {
      name: "Published Date",
      value: bookData.volumeInfo.publishedDate || "NA",
    },
    {
      name: "Publisher",
      value: bookData.volumeInfo.publisher || "NA",
    },
    {
      name: "Preview Link:",
      value: (
        <Link
          href={`${bookData.volumeInfo.previewLink}`}
          style={{ color: "#000" }}
        >
          {bookData.volumeInfo.previewLink}
        </Link>
      ),
    },
  ];

  const sanitizeHtml = (html) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");

    // Remove script tags (or other potentially risky elements if needed)
    const scripts = doc.querySelectorAll("script");
    scripts.forEach((script) => script.remove());

    return doc.body.innerHTML.replace(/^_*|_*$/g, "");
  };

  const sanitizedDescription = sanitizeHtml(bookData.volumeInfo.description);

  const onImageLoad = () => {
    setLoading(false);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        margin: "5rem auto",
        width: "90%",
        minHeight: "500px",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        padding: "1.5rem",
        borderRadius: "10px",
        backgroundColor: (theme) => `${theme.palette.white.main}`,
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              textAlign: "center",
            }}
          >
            <div style={{ display: loading ? "block" : "none" }}>
              <CircularProgress color="primary" />
            </div>
            <Image
              width={300}
              height={300}
              layout="responsive"
              alt=""
              priority
              onLoad={onImageLoad}
              src={getImageSrc(bookData)}
              style={{ maxWidth: "300px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left" sx={{ border: "none" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ border: "none" }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: ".5rem",
                marginTop: "2rem",

                "@media (max-width: 400px)": {
                  flexDirection: "column",
                  alignItems: "center",
                },
              }}
            >
              <Button
                size="small"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleAddtoCart()}
                disabled={!saleability}
                variant="contained"
                sx={{
                  height: "40px",
                  width: "140px",
                  bgcolor: (theme) => theme.palette.secondary.light,
                  textAlign: "center",
                  ":hover": {
                    bgcolor: (theme) => theme.palette.secondary.dark,
                  },
                }}
              >
                Add to cart
              </Button>

              <Button
                startIcon={<LocalMallIcon />}
                size="small"
                variant="contained"
                color="blueGrey"
                disabled={!saleability}
                sx={{
                  width: "140px",
                  height: "40px",
                  color: (theme) => theme.palette.white.main,

                  ":hover": {
                    bgcolor: (theme) => theme.palette.blueGreyDark.main,
                  },
                  textAlign: "center",
                }}
                onClick={() => {
                  handleAddtoCart();
                  router.push("/cart");
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Description:-</Typography>
        {bookData.volumeInfo.description ? (
          <Typography
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription || bookData.volumeInfo.description, // Fallback for non-HTML descriptions
            }}
            sx={{
              height: "auto",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        ) : (
          <Typography>No Description Avaliable</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default BookDetails;
