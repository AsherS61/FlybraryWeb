import express from "express";
import { getBooks, getBook, borrowBook, returnBook, getBooksBorrowedByUser } from "../controllers/book.js";

const router = express.Router();

router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.get('books/borrow/:id', getBooksBorrowedByUser)
router.put('/books/borrow/:id', borrowBook)
router.put('/books/return/:id', returnBook)

module.exports = router;
export default router;