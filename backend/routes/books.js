import express from "express";
import { getBooks, getBook } from "../controllers/book.js";

const router = express.Router();

router.get('/books', getBooks)
router.get('/books/:id', getBook)

module.exports = router;
export default router;