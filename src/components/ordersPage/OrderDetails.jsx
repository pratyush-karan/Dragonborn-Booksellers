"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import Table from "../ui-library/BasicTable";
import OrderViewModal from "../modals/OrderViewModal";

function OrderDetails() {
  const orderList = useSelector((state) => state.orderReducer);
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState(null);
  const orderListHeaders = [
    "Order ID",
    "Order Date",
    "Product List",
    "Price",
    "Details",
  ];
  const orderListRows = orderList.map((order) => {
    const productListString = order.productList
      .map((product) => product.productName)
      .join(", ");
    return [
      order.orderId,
      order.orderDate,
      productListString,
      order.totalPrice,
      <Button onClick={() => handleSeeMore(order.orderId)}>See-more</Button>,
    ];
  });

  const handleSeeMore = (orderId) => {
    setOrder(orderId - 1);
    setOpenModal(true);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  console.log("orderList", orderList);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        padding: "1.5rem",
        height: "fit-content",
        margin: "4rem auto",
        border: (theme) => `1px solid ${theme.palette.tertiary.main}`,
        backgroundColor: (theme) => `${theme.palette.white.main}`,
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Order Details :-
      </Typography>
      {orderList.length ? (
        <>
          <Table rows={orderListRows} headers={orderListHeaders} />
        </>
      ) : (
        <Typography variant="h6">There are no orders to show!</Typography>
      )}
      {order !== null && (
        <OrderViewModal
          handleClose={handleCloseModal}
          openModal={openModal}
          orderList={orderList}
          order={order}
        />
      )}
    </Box>
  );
}

export default OrderDetails;
