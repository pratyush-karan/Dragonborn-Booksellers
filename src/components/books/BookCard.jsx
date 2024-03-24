"use client";
import React, { useState } from "react";
import styles from "./BookCard.module.scss";
import BookViewModal from "../modals/BookViewModal";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemsFromCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";

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
import { ViewIcon } from "@chakra-ui/icons";

function BookListingCard({ book }) {
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.cartReducer);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
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

  const handleAddtoCart = () => {
    dispatch(
      addItemToCart({
        id: book.id,
        image: book.volumeInfo.imageLinks?.thumbnail,
        title: book.volumeInfo.title,
        authors: format(book.volumeInfo.authors),
        price: book.saleInfo.retailPrice,
      })
    );
  };

  return (
    <>
      {console.log(bookList)}
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
            <Button
              variant="solid"
              colorScheme="blue"
              leftIcon={<ViewIcon />}
              onClick={openModal}
            >
              View Book
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleAddtoCart()}
              isDisabled={!saleability}
            >
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
          id: book.id,
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
