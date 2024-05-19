import React from "react";
import BookListing from "@/components/books/BookListing";
import { searchBooks } from "@/services/googleBookServices";

export default async function BookListingPage({ searchParams }) {
  const getBooks = async ({ query, page, category, orderBy }) => {
    "use server";
    const res = await searchBooks({
      query: query,
      startIndex: page,
      category: category,
      orderBy: orderBy,
    });

    if (res.items) return res.items;
    else return [];
  };

  const initialBooks = await getBooks({ query: searchParams.query });
  return <BookListing getBooksAction={getBooks} initialBooks={initialBooks} />;
}
