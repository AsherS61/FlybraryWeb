const express = require("express");
const { getTransactions, getTransaction, getTransactionsByUser, getTransactionsByBook } = require("../controllers/transaction.js");
const router = express.Router();

router.get('/', getTransactions)
router.get('/:id', getTransaction)
router.get('/user/:id', getTransactionsByUser)
router.get('/book/:id', getTransactionsByBook)

module.exports = router;