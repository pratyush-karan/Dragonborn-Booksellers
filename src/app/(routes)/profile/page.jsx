//protected route
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ProfilePageDetails from "@/components/profilePage/ProfilePageDetails";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return <ProfilePageDetails session={session} />;
}
