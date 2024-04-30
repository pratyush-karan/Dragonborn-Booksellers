"use server";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks({
  query = "popular",
  startIndex = 0,
  orderBy = "relevance",
  category = "",
}) {
  const current_max_results = 10;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  let url = `${BASE_URL}?`;

  if (query && category) {
    url += `q=intitle:${query}+subject:${category}`;
  } else if (query) {
    url += `q=intitle:${query}`;
  } else if (category) {
    url += `q=subject:${category}`;
  }
  url += `&startIndex=${startIndex}&maxResults=${current_max_results}&orderBy=${orderBy}`;

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
