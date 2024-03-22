import React from "react";
import { getServerSession } from "next-auth";
import WhoAmIButton from "./WhoAmIButton";

export default async function CartPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession();
    return session?.user?.name || "Not Logged In";
  };
  return (
    <div>
      CartPage
      <div>
        <WhoAmIButton whoAmIAction={whoAmI} />
      </div>
    </div>
  );
}
