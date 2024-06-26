"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function getBookDetails({ id }) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  let url = `${BASE_URL}/${id}`;
  console.log("url", url);
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  const result = await res.json();
  return result;
}
