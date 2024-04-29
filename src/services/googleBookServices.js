"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(
  query = "abc",
  startIndex = 0,
  orderBy = "relevance",
  category = ""
) {
  const current_max_results = 10;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  let url = `${BASE_URL}?q=intitle:${query}&startIndex=${startIndex}&maxResults=${current_max_results}&orderBy=${orderBy}`;

  if (category) {
    url += `&subject=${category}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  const result = await res.json();
  return result;
}
