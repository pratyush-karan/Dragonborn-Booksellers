"use client";
import React from "react";
import { useSelector } from "react-redux";

function OrderDetails() {
  const orderList = useSelector((state) => state.orderReducer);
  console.log("orderList", orderList);
  return <div>Order Details</div>;
}

export default OrderDetails;
