import React from "react";
import { getServerSession } from "next-auth";
import WhoAmIButton from "./WhoAmIButton";
import CartDetails from "@/components/cartPage/CartDetails";

export default async function CartPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession();
    return session?.user?.name || "Not Logged In";
  };
  return (
    <div>
      <CartDetails />
      {/* <WhoAmIButton whoAmIAction={whoAmI} /> */}
    </div>
  );
}
