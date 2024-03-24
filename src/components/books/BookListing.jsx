"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./BookListing.module.scss";
import BookCard from "./BookCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Stack, Spinner, Input, Button } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

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

  const handleSubmit = (e) => {
    if (query.trim()) {
      e.preventDefault();
      router.push(`/books?query=${query}`);
      page.current = 0;
    }
  };

  useEffect(() => {
    setBooks(initialBooks);
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
      <div className={styles.container}>
        {console.log("books", books)}
        <Stack spacing={5} direction="row" align="center" margin={10}>
          <Input
            variant="filled"
            size="md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter book title or author"
          />
          <Button
            colorScheme="yellow"
            onClick={handleSubmit}
            paddingInline={10}
            size="md"
          >
            Search Books
          </Button>
        </Stack>
        {books?.length > 0 && (
          <div className={styles[`book-list`]}>
            {books.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        )}

        <Spinner
          ref={ref}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </>
  );
}

export default BookListing;
