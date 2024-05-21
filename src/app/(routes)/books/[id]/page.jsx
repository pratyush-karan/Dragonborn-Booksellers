import React from "react";
import { getBookDetails } from "@/services/fetchbook";
import BookDetails from "@/components/bookViewPage/BookDetails";

export default async function BookViewPage({ params }) {
  const getBook = async (id) => {
    "use server";
    const res = await getBookDetails({ id: id });
    return res;
  };

  const bookData = await getBook(params.id);
  return <BookDetails bookData={bookData} />;
}
