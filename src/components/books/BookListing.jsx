"use client";
import React, { useState, useEffect, useRef } from "react";
import { searchBooks } from "@/services/googleBookServices";
import styles from "./BookListing.module.scss";
import BookCard from "./BookCard";
import { useRouter } from "next/navigation";
import { Stack, Spinner, Input, Button } from "@chakra-ui/react";

function BookListing({ searchParams, initialBooks }) {
  const router = useRouter();
  const page = useRef(0);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(initialBooks);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    if (query.trim()) {
      e.preventDefault();
      router.push(`/books?query=${query}`);
    }
  };

  const fetchBooks = async (currentPage) => {
    const res = await searchBooks(searchParams?.query, currentPage);
    setIsLoading(false);
    return res.items;
  };

  useEffect(() => {
    // Update state when `initialBooks` prop changes
    setBooks(initialBooks);
  }, [initialBooks]);

  const handleNextPage = async () => {
    setIsLoading(true);
    page.current += 10;
    const newBooks = await fetchBooks(page.current);
    setBooks((prev) =>
      Array.from(new Set([...prev, ...newBooks].map((book) => book.id))).map(
        (id) =>
          prev.find((book) => book.id === id) ||
          newBooks.find((book) => book.id === id)
      )
    );
  };

  const loadingRef = useRef(null); //Intersection Observer

  useEffect(() => {
    let observer;
    if (loadingRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          handleNextPage();
        }
      });
      observer.observe(loadingRef.current);
    }
    return () => {
      if (observer && loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef, isLoading]);

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
        <div ref={loadingRef} /> {/* Reference for IntersectionObserver */}
        {isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </div>
    </>
  );
}

export default BookListing;
