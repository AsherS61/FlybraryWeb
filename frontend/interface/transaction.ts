import { lineUserInterface } from "./user";
import { BookInterface } from "./book";

export interface TransactionInterface {
  _id: string,
  book: BookInterface
  user:  lineUserInterface,
  borrowDate: Date,
  returnBy: Date,
  returnDate: Date,
}