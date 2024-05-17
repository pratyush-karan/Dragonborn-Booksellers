"use client";
import React from "react";

import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function BasicUsage({
  open,
  handleCloseModal,
  title,
  image,
  description,
  otherDetails,
  handleAddtoCart,
}) {
  const format = (arr) => {
    if (!arr) return "";
    if (arr.length === 1) return arr[0];
    else {
      return arr.join(",");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: "fit-content",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            padding: "1rem 1.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{title}</Typography>
            <CloseIcon
              fontSize="small"
              onClick={handleCloseModal}
              sx={{
                cursor: "pointer",
                ":hover": {
                  bgcolor: (theme) => theme.palette.tertiaryLight.main,
                  borderRadius: "4px",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
            <img
              src={`${image}`}
              alt=""
              style={{ width: "100px", height: "auto" }}
            />
            <Grid container rowSpacing={0.25}>
              {format(otherDetails.authors) && (
                <>
                  <Grid item xs={3} flex="auto">
                    <Typography sx={{ fontWeight: "bold" }}>
                      Author :
                    </Typography>
                  </Grid>
                  <Grid item xs={9} flex="auto">
                    <Typography>{format(otherDetails.authors)}</Typography>
                  </Grid>
                </>
              )}
              {format(otherDetails.genre) && (
                <>
                  <Grid item xs={3} flex="auto">
                    <Typography sx={{ fontWeight: "bold" }}>Genre :</Typography>
                  </Grid>
                  <Grid item xs={9} flex="auto">
                    <Typography>{format(otherDetails.genre)}</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={3} flex="auto">
                <Typography sx={{ fontWeight: "bold" }}>Price :</Typography>
              </Grid>

              <Grid item xs={9} flex="auto">
                {otherDetails.saleability ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", color: "green.main" }}
                    >
                      {` ${otherDetails.price.retailPrice.amount}  ${otherDetails.price.retailPrice.currencyCode}`}
                    </Typography>
                    <Typography sx={{ textDecoration: "line-through" }}>
                      {otherDetails.price.listPrice.amount}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="subtitle2" color="red.main">
                    Not For Sale!
                  </Typography>
                )}
              </Grid>

              {otherDetails.isbn && (
                <>
                  <Grid item xs={3} flex="auto">
                    <Typography sx={{ fontWeight: "bold" }}>ISBN :</Typography>
                  </Grid>
                  <Grid item xs={9} flex="auto">
                    <Typography>{otherDetails.isbn}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          {description && (
            <Typography
              sx={{
                margin: "1rem 0px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "500px",
              }}
            >
              {description}
            </Typography>
          )}

          <Divider sx={{ width: "100%", margin: "1rem 0px" }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="tertiary"
              onClick={handleAddtoCart}
              disabled={!otherDetails.saleability}
            >
              <ShoppingCartIcon fontSize="small" />
              <Typography>Add To Cart</Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
