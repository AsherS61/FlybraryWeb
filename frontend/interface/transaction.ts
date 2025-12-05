import { User } from "next-auth";
import { BookInterface } from "./book";

export interface TransactionInterface {
  id: string,
  book: BookInterface
  user:  User,
  borrowDate: Date,
  returnDate: Date,
}