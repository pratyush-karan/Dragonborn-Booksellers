import React from "react";
import BookListing from "@/components/books/BookListing";
import { searchBooks } from "@/services/googleBookServices";

export default async function BookListingPage({ searchParams }) {
  const getBooks = async (query, page) => {
    "use server";
    const res = await searchBooks(query, page);
    //res.totalItems -> gives total items
    return res.items;
  };

  const initialBooks = await getBooks(searchParams.query);
  return <BookListing getBooksAction={getBooks} initialBooks={initialBooks} />;
}
