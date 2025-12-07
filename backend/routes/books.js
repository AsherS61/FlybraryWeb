const express = require("express");
const { getBooks, getBook, getBooksBorrowedByUser, borrowBook, returnBook } = require("../controllers/book.js");
const router = express.Router();

router.get('/', getBooks)
router.get('/user/:id', getBooksBorrowedByUser)
router.get('/:id', getBook)  
router.put('/borrow/:id', borrowBook)
router.put('/return/:id', returnBook)
router.post('/sendImage', sendImage)

module.exports = router;