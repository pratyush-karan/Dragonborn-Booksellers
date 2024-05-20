"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks({
  query,
  startIndex = 0,
  orderBy = "relevance",
  category = "",
  current_max_results = 12,
  filter = "",
}) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  let url = `${BASE_URL}?`;

  if (query && category) {
    url += `q=intitle:${query}+subject:${category}`;
  } else if (query) {
    url += `q=${query}`;
  } else if (category) {
    url += `q=subject:${category}`;
  } else {
    url += `q=undefined`;
  }

  if (filter) url += `filter=${filter}`;
  url += `&startIndex=${startIndex}&maxResults=${current_max_results}&orderBy=${orderBy}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  const result = await res.json();
  return result;
}
