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
} from "@mui/material";

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

  const getInitialQuery = () => {
    return searchParams.get("query") || "";
  };
  const page = useRef(0);
  const [query, setQuery] = useState(getInitialQuery);
  const [books, setBooks] = useState(initialBooks);
  const [ref, inView] = useInView();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    setError(null);
    if (query.trim()) {
      e.preventDefault();
      router.push(`/books?query=${query}`);
      page.current = 0;
    }
  };

  useEffect(() => {
    if (initialBooks) {
      setBooks(initialBooks);
    } else {
      setError("Can't find books");
    }
  }, [initialBooks]);

  const handleNextPage = async () => {
    page.current += 10;
    const newBooks = await getBooksAction(
      searchParams.get("query") || undefined,
      page.current
    );
    if (newBooks) {
      setBooks((prev) =>
        Array.from(new Set([...prev, ...newBooks].map((book) => book.id))).map(
          (id) =>
            prev.find((book) => book.id === id) ||
            newBooks.find((book) => book.id === id)
        )
      );
    }
  };

  const handleCheckBoxChange = (key) => {
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
  };

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);
  return (
    <>
      {console.log(checkBoxStatus)}
      {/* {console.log("books", books)} */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
          margin: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search books by name,author or title"
          variant="outlined"
          color="red"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{
            width: "30rem",
            "@media (max-width: 1200px)": {
              width: "20rem",
            },
          }}
        />

        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Search Books
        </Button>
      </Box>
      {error ? (
        <p>{error}</p>
      ) : (
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
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
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
                          color="blueGrey"
                        />
                      }
                      label={
                        <Typography
                          variant="subtitle2"
                          style={{ fontSize: "14px" }}
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
            {books?.length > 0 && (
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
                {books.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                height: "80px",
              }}
            >
              <CircularProgress ref={ref} color="blueGrey" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default BookListing;
