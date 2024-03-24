"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import styles from "./BookViewModal.module.scss";

import React from "react";

export default function BasicUsage({
  isOpen,
  onClose,
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
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent className={styles.modal}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody className={styles[`modal-body`]}>
            <div className={styles[`image-details-div`]}>
              <img src={image} alt="" />

              <div className={styles[`other-details`]}>
                {format(otherDetails.authors) && (
                  <div className={styles[`grid-item`]}>
                    Author: {format(otherDetails.authors)}
                  </div>
                )}
                {format(otherDetails.genre) && (
                  <div className={styles[`grid-item`]}>
                    Genre : {format(otherDetails.genre)}
                  </div>
                )}

                <div className={styles[`grid-item`]}>
                  {otherDetails.saleability ? (
                    <>
                      Price :
                      <span className={styles[`strikethrough`]}>
                        {otherDetails.price.listPrice.amount}
                      </span>
                      <span>
                        {` ${otherDetails.price.retailPrice.amount}  ${otherDetails.price.retailPrice.currencyCode}`}
                      </span>
                    </>
                  ) : (
                    <>Not For Sale</>
                  )}
                </div>
                {otherDetails.isbn && (
                  <div className={styles[`grid-item`]}>
                    ISBN : {otherDetails.isbn}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.description}>{description}</div>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={handleAddtoCart}
              isDisabled={!otherDetails.saleability}
            >
              <span>Add To Cart</span>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
