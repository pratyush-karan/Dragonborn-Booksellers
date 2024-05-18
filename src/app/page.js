import HomePageLayout from "@/components/homePage/HomePageLayout";
import React from "react";
import { searchBooks } from "@/services/googleBookServices";

export default async function HomePage() {
  const getCarouselBooks = async ({ query, page, category, orderBy }) => {
    "use server";
    const res = await searchBooks({
      query: query,
      startIndex: page,
      category: category,
      orderBy: orderBy,
      current_max_results: 20,
      // filter: "ebooks",
    });

    if (res.items) return res.items;
    else return [];
  };
  const dailyTop100 = await getCarouselBooks({
    category: "fantasy",
  });
  const newReleases = await getCarouselBooks({
    query: "new+releases",
  });
  const bestSellers = await getCarouselBooks({
    category: "inspirational",
  });
  const topAuthors = await getCarouselBooks({
    category: "authors",
  });
  return (
    <HomePageLayout
      data={[dailyTop100, newReleases, bestSellers, topAuthors]}
    />
  );
}
