import React from "react";
import BookListing from "@/components/books/BookListing";
import { searchBooks } from "@/services/googleBookServices";

export default async function BookListingPage({ searchParams }) {
  const res = await searchBooks(searchParams.query);

  return <BookListing initialBooks={res.items} />;
}
