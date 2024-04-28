"use client";
import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function BookListing({ initialBooks, getBooksAction }) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    setBooks((prev) =>
      Array.from(new Set([...prev, ...newBooks].map((book) => book.id))).map(
        (id) =>
          prev.find((book) => book.id === id) ||
          newBooks.find((book) => book.id === id)
      )
    );
  };

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          margin: "0px",
        }}
      >
        {console.log("books", books)}
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
          <>
            {books?.length > 0 && (
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  textAlign: "center",
                  gap: "2rem",
                }}
              >
                {books.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </Stack>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <CircularProgress ref={ref} color="blueGrey" />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default BookListing;
