"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(
  query = undefined,
  startIndex = 0,
  orderBy = "relevance"
) {
  const current_max_results = 10;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const res = await fetch(
    `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${current_max_results}&orderBy=${orderBy}`,
    {
      cache: "no-store",
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
  const result = await res.json();
  return result;
}
