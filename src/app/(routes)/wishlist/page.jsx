//protected route
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function WishListPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return <div>WishListPage</div>;
}
