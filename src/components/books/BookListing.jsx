"use client";
import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import { useRouter, useSearchParams } from "next/navigation";
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

function BookListing({ initialBooks, getBooksAction }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCheckBoxStatus = {
    Fiction: false,
    "Non-Fiction": false,
    Biography: false,
    "Science Fiction": false,
    History: false,
    Mystery: false,
    Romance: false,
  };
  const [checkBoxStatus, setCheckBoxStatus] = useState(initialCheckBoxStatus);
  const [orderBy, setOrderBy] = useState("relevance");

  const getInitialQuery = () => {
    return searchParams.get("query") || "";
  };
  const page = useRef(0);
  const [query, setQuery] = useState(getInitialQuery);
  const [books, setBooks] = useState(initialBooks);
  const [ref, inView] = useInView();
  const [error, setError] = useState(null);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  const handleSubmit = (e) => {
    if (query.trim()) {
      setError(null);
      setHasMoreBooks(true);
      e.preventDefault();
      router.push(`/books?query=${query}`);
      page.current = 0;
      setCheckBoxStatus(initialCheckBoxStatus);
      setOrderBy("relevance");
    }
  };

  useEffect(() => {
    if (initialBooks.length) {
      setBooks(initialBooks);
    } else {
      setError("No Books Found");
    }
  }, [initialBooks]);

  const handleNextPage = async () => {
    page.current += 10;
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
    console.log(page.current, newBooks);
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
    page.current = 0;

    let cat;
    for (let [k, v] of Object.entries(copy)) {
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

    const uniqueNewBooks = {};
    newBooks.forEach((item) => {
      uniqueNewBooks[item.id] = item;
    });
    const newUniqueBooks = Object.values(uniqueNewBooks);
    if (newUniqueBooks.length) {
      setBooks(newUniqueBooks);
    } else {
      setBooks([]);
      setError("No Books Found");
    }
  };

  const handleOrderby = async (e) => {
    setOrderBy(e.target.value);

    setError(null);
    setHasMoreBooks(true);

    page.current = 0;

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
      orderBy: e.target.value,
    });

    const uniqueNewBooks = {};
    newBooks.forEach((item) => {
      uniqueNewBooks[item.id] = item;
    });
    const newUniqueBooks = Object.values(uniqueNewBooks);
    if (newUniqueBooks.length) {
      setBooks(newUniqueBooks);
    } else {
      setBooks([]);
      setError("No Books Found");
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("hi");
      handleNextPage();
    }
  }, [inView]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        onInputChange={handleInputChange}
        query={query}
      />
      {console.log(books)}
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
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
          xs={8}
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
                    justifyContent: "flex-start",
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
