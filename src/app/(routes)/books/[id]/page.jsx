import React from "react";
import { getBookDetails } from "@/services/fetchbooks";
import BookDetails from "@/components/bookViewPage/BookDetails";

export default async function BookViewPage({ params }) {
  const getBook = async (id) => {
    "use server";
    const res = await getBookDetails(id);
    return res;
  };

  const bookData = await getBook(params.id);
  return (
    <div>
      <div>BookViewPage : {params.id}</div>
      <BookDetails bookData={bookData} />
    </div>
  );
}
