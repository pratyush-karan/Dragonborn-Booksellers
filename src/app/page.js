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

    if (res.items)
      return res.items.sort((a, b) => {
        if (
          a.saleInfo.saleability === "FOR_SALE" &&
          b.saleInfo.saleability !== "FOR_SALE"
        )
          return -1;
        if (
          a.saleInfo.saleability !== "FOR_SALE" &&
          b.saleInfo.saleability === "FOR_SALE"
        )
          return 1;

        return 0;
      });
    else return [];
  };
  const dailyTop100 = await getCarouselBooks({
    query: "fantasy",
  });
  const newReleases = await getCarouselBooks({
    query: "new+releases",
  });
  const bestSellers = await getCarouselBooks({
    query: "inspirational",
  });
  const topAuthors = await getCarouselBooks({
    query: "authors",
  });
  return (
    <HomePageLayout
      data={[dailyTop100, newReleases, bestSellers, topAuthors]}
    />
  );
}
