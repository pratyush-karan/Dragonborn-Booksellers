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

    const filterUniqueBooks = (books) => {
      const uniqueNewBooks = {};
      books?.forEach((item) => {
        uniqueNewBooks[item.id] = item;
      });
      return Object.values(uniqueNewBooks);
    };

    // if (res.items) return filterUniqueBooks(res.items);
    // else return [];
    return filterUniqueBooks(res.items);
  };

  const initialBooks = await getBooks({
    query: searchParams.query,
    page: 0,
    orderBy: searchParams.orderBy,
    category: searchParams.category,
  });
  return <BookListing getBooksAction={getBooks} initialBooks={initialBooks} />;
}
