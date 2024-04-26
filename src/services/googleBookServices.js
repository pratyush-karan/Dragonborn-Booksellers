"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(
  query = "abc",
  startIndex = 0,
  orderBy = "relevance",
  category = "Fiction"
) {
  const current_max_results = 10;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const res = await fetch(
    `${BASE_URL}?q=intitle:${query}&subject:${category}&startIndex=${startIndex}&maxResults=${current_max_results}&orderBy=${orderBy}`,
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
