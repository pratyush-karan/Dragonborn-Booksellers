"use client";

import React from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BasicTable from "../ui-library/BasicTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderViewModal({ openModal, handleClose, orderList, order }) {
  const headers = ["ID", "Product Name", "Qty", "Price"];
  const rows = orderList[order].productList.map((product) => {
    return [product.id, product.productName, product.qty, product.totalPrice];
  });

  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Order Id : {orderList[order].orderId}
        <CloseIcon
          fontSize="small"
          onClick={handleClose}
          sx={{
            cursor: "pointer",
            ":hover": {
              bgcolor: (theme) => theme.palette.tertiaryLight.main,
              borderRadius: "4px",
            },
          }}
        />
      </DialogTitle>
      <DialogContent>
        <BasicTable rows={rows} headers={headers} />
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: "bold",
          }}
        >
          SubTotal:{" "}
          <Typography sx={{ color: (theme) => theme.palette.green.main }}>
            {orderList[order].totalPrice}
          </Typography>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderViewModal;
