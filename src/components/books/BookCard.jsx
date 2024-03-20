"use client";
import React, { useState } from "react";
import styles from "./BookCard.module.scss";
import { FaEye } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import BookViewModal from "../modals/BookViewModal";

function BookListingCard({ book }) {
  const [isOpen, setIsOpen] = useState();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <img
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt={book.volumeInfo.title}
        className={styles[`book-image`]}
      />
      <div className={styles[`book-details`]}>
        <div className={styles[`book-title`]}>{book.volumeInfo.title}</div>
        {book.volumeInfo.authors?.map((author, index) => (
          <div className={styles[`book-author`]} key={`author-${index}`}>
            {author}
          </div>
        ))}
      </div>
      <div className={styles["button-container"]}>
        <button onClick={openModal}>
          <FaEye />
          <span>View</span>
        </button>
        <button>
          <FaCartPlus />
          <span>Add to Cart</span>
        </button>
      </div>
      <BookViewModal
        isOpen={isOpen}
        onClose={closeModal}
        title={book.volumeInfo.title}
        description={book.volumeInfo.description}
        image={book.volumeInfo.imageLinks?.thumbnail}
        otherDetails={{
          genre: book.volumeInfo.categories,
          isbn: book.volumeInfo.industryIdentifiers?.[0].identifier,
          saleability: book.saleInfo.saleability === "FOR_SALE" ? true : false,
          authors: book.volumeInfo.authors,
          price: {
            retailPrice: book.saleInfo.retailPrice,
            listPrice: book.saleInfo.listPrice,
          },
        }}
      />
    </div>
  );
}

export default BookListingCard;
