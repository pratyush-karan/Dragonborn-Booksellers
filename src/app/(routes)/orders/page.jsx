//protected route
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import OrderDetails from "@/components/ordersPage/orderDetails";

export default async function OrdersPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return <OrderDetails />;
}
