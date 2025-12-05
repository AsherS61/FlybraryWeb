import express from "express";
import { getTransactions, getTransaction, getTransactionsByUser, getTransactionsByBook } from "../controllers/transaction.js";

const router = express.Router();

router.get('/transaction', getTransactions)
router.get('/transaction/:id', getTransaction)
router.get('/transaction/user/:id', getTransactionsByUser)
router.get('/transaction/book/:id', getTransactionsByBook)

module.exports = router;
export default router;