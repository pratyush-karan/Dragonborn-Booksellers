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
import { sanitizeHtml } from "../ui-library/helpers";

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

  const sanitizedDescription = sanitizeHtml(description);

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
      disableScrollLock={true}
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
            }}
          >
            <Typography variant="h6">{title}</Typography>
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

          <Box sx={{ display: "flex", margin: "1rem 0 rem", gap: "1rem" }}>
            <Image
              src={`${image}`}
              alt=""
              width={120}
              height={120}
              layout="responsive"
              style={{ maxWidth: "120px" }}
            />
            <Grid
              container
              rowSpacing={0.25}
              // sx={{ flexWrap: "nowrap", flexDirection: "column" }}
            >
              {format(otherDetails.authors) && (
                <>
                  <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>Author:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{format(otherDetails.authors)}</Typography>
                  </Grid>
                </>
              )}
              {format(otherDetails.genre) && (
                <>
                  <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>Genre:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{format(otherDetails.genre)}</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>Price:</Typography>
              </Grid>

              <Grid item xs={9}>
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
                  <Grid item xs={3}>
                    <Typography sx={{ fontWeight: "bold" }}>ISBN:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{otherDetails.isbn}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          <Typography variant="h6">Description:-</Typography>
          {description ? (
            <Typography
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription || description, // Fallback for non-HTML descriptions
              }}
              sx={{
                height: "auto",
                overflowY: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "500px",
              }}
            />
          ) : (
            <Typography>No Description Avaliable</Typography>
          )}

          <Divider sx={{ width: "100%", margin: "1rem 0px" }} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              startIcon={<ShoppingCartIcon />}
              onClick={() => handleAddtoCart()}
              disabled={!otherDetails.saleability}
              variant="contained"
              sx={{
                height: "40px",
                width: "140px",
                bgcolor: (theme) => theme.palette.secondary.light,
                textAlign: "center",
                ":hover": {
                  bgcolor: (theme) => theme.palette.secondary.dark,
                },
              }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
