//protected route
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function MyLibrary() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return <div>MyLibrary</div>;
}
