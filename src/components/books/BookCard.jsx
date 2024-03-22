"use client";
import React, { useState } from "react";
import styles from "./BookCard.module.scss";
import BookViewModal from "../modals/BookViewModal";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

function BookListingCard({ book }) {
  const [isOpen, setIsOpen] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };
  const saleability = book.saleInfo.saleability === "FOR_SALE" ? true : false;

  const format = (arr) => {
    if (!arr) return "";
    if (arr.length === 1) return arr[0];
    else {
      return arr.join(",");
    }
  };

  let formatter;
  if (saleability) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: book.saleInfo.retailPrice.currencyCode,
    });
  }

  return (
    <>
      <Card maxW="sm" className={styles[`card`]}>
        <CardBody className={styles[`card-body`]}>
          <Image
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            borderRadius="lg"
            height={150}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{book.volumeInfo.title}</Heading>
            <Text>{format(book.volumeInfo.authors)}</Text>
            <Text color="blue.600" fontSize="2xl" className={styles[`price`]}>
              {saleability ? (
                <>
                  <span>
                    {formatter.format(book.saleInfo.retailPrice.amount)}
                  </span>
                  <span className={styles[`strike-through`]}>
                    {formatter.format(book.saleInfo.listPrice.amount)}
                  </span>
                </>
              ) : (
                <>Not For Sale!</>
              )}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter className={styles[`footer`]}>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <BookViewModal
        isOpen={isOpen}
        onClose={closeModal}
        title={book.volumeInfo.title}
        description={book.volumeInfo.description}
        image={book.volumeInfo.imageLinks?.thumbnail}
        otherDetails={{
          genre: book.volumeInfo.categories,
          isbn: book.volumeInfo.industryIdentifiers?.[0].identifier,
          saleability: saleability,
          authors: book.volumeInfo.authors,
          price: {
            retailPrice: book.saleInfo.retailPrice,
            listPrice: book.saleInfo.listPrice,
          },
        }}
      />
    </>
  );
}

export default BookListingCard;
