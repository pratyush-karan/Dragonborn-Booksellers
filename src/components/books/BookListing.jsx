"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import BookCard from "./BookCard";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useInView } from "react-intersection-observer";
import {
  Typography,
  CircularProgress,
  Stack,
  Container,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchBar from "../ui-library/SearchBar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function BookListing({ initialBooks, getBooksAction }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const initialCheckBoxStatus = {
    Fiction: false,
    "Non-Fiction": false,
    Biography: false,
    "Science Fiction": false,
    History: false,
    Mystery: false,
    Romance: false,
  };

  const getInitialCheckBoxStatus = () => {
    const category = searchParams.get("category");
    if (category) initialCheckBoxStatus[category] = true;
    else {
      for (let k in initialCheckBoxStatus) {
        if (initialCheckBoxStatus.hasOwnProperty(k)) {
          initialCheckBoxStatus[k] = false;
        }
      }
    }
    return initialCheckBoxStatus;
  };

  const getInitialQuery = () => {
    return searchParams.get("query") || "";
  };
  const getInitialOrderBy = () => {
    return searchParams.get("orderBy") || "relevance";
  };
  const [checkBoxStatus, setCheckBoxStatus] = useState(
    getInitialCheckBoxStatus
  );
  const [orderBy, setOrderBy] = useState(getInitialOrderBy);
  const page = useRef(0);
  const [query, setQuery] = useState(getInitialQuery);
  const [books, setBooks] = useState(initialBooks);
  const [ref, inView] = useInView();
  const [error, setError] = useState(null);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (e) => {
    if (query.trim()) {
      setError(null);
      setHasMoreBooks(true);
      e.preventDefault();
      router.push(pathname + "?" + createQueryString("query", query.trim()));
    }
  };

  useEffect(() => {
    if (initialBooks.length) {
      setBooks(initialBooks);
    } else {
      setBooks([]);
      setError("No Books Found");
    }
  }, [initialBooks]);

  const handleNextPage = async () => {
    page.current += 12;
    let cat;
    for (let [k, v] of Object.entries(checkBoxStatus)) {
      if (v === true) {
        cat = k;
      }
    }
    const newBooks = await getBooksAction({
      query: searchParams.get("query") || undefined,
      page: page.current,
      category: cat,
      orderBy: orderBy,
    });

    if (newBooks.length > 0) {
      setBooks((prev) =>
        Array.from(new Set([...prev, ...newBooks].map((book) => book.id))).map(
          (id) =>
            prev.find((book) => book.id === id) ||
            newBooks.find((book) => book.id === id)
        )
      );
    } else {
      setHasMoreBooks(false);
    }
  };

  const handleCheckBoxChange = async (key) => {
    setError(null);
    setHasMoreBooks(true);
    const copy = { ...checkBoxStatus };
    for (let i in copy) {
      if (copy.hasOwnProperty(i)) {
        if (i === key) {
          copy[i] = !copy[i];
        } else {
          copy[i] = false;
        }
      }
    }
    setCheckBoxStatus(copy);

    let cat;
    for (let [k, v] of Object.entries(copy)) {
      if (v === true) {
        cat = k;
      }
    }

    if (cat) {
      router.push(pathname + "?" + createQueryString("category", cat));
    } else {
      router.push(pathname + "?" + deleteQueryString("category"));
    }
  };

  const handleOrderby = async (e) => {
    setOrderBy(e.target.value);
    router.push(pathname + "?" + createQueryString("orderBy", e.target.value));
    setError(null);
    setHasMoreBooks(true);
  };

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar({ ...openSnackBar, open: false });
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar({ ...openSnackBar, open: true });
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        onInputChange={handleInputChange}
        query={query}
      />

      <Snackbar
        anchorOrigin={{
          vertical: openSnackBar.vertical,
          horizontal: openSnackBar.horizontal,
        }}
        open={openSnackBar.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          // variant="filled"
        >
          Book is added to the Cart
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              Filter
            </Typography>
            <Box>
              <Typography sx={{ textAlign: "center" }} gutterBottom>
                Category
              </Typography>
              <Box
                sx={{
                  paddingLeft: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                }}
              >
                {Object.keys(initialCheckBoxStatus).map((e) => (
                  <FormControlLabel
                    key={e}
                    control={
                      <Checkbox
                        checked={checkBoxStatus[e]}
                        onChange={() => handleCheckBoxChange(e)}
                        sx={{ paddingTop: ".25rem", paddingBottom: ".25rem" }}
                        color="primaryDark"
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle2"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {e}
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ textAlign: "center" }} gutterBottom>
                Order By
              </Typography>
              <ToggleButtonGroup
                orientation="vertical"
                color="primaryDark"
                value={orderBy}
                exclusive
                onChange={handleOrderby}
                aria-label="Platform"
              >
                <ToggleButton value="relevance">Relevance</ToggleButton>
                <ToggleButton value="newest">Newest</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {error ? (
            <Typography variant="h5" sx={{ margin: "2rem auto" }}>
              {error}
            </Typography>
          ) : (
            <>
              {books?.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    textAlign: "center",
                    gap: "2rem",
                  }}
                >
                  {books.map((book, index) => (
                    <BookCard
                      book={book}
                      key={book.id}
                      handleOpenSnackBar={handleOpenSnackBar}
                      ref={index === books.length - 1 ? ref : null}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="h5" sx={{ margin: "2rem auto" }}>
                  No Books Found!
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  height: "80px",
                }}
              >
                {hasMoreBooks && !error ? (
                  <CircularProgress color="blueGrey" />
                ) : (
                  <Typography variant="body1">
                    All books have been loaded.
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default BookListing;
