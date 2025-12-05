import express from "express";
import { getBooks, getBook, borrowBook, returnBook, getBooksByUser } from "../controllers/book.js";

const router = express.Router();

router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.get('books/borrow/:id', getBooksByUser)
router.put('/books/borrow/:id', borrowBook)
router.put('/books/return/:id', returnBook)

module.exports = router;
export default router;