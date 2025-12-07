export interface BookInterface {
  _id: number,
  ISBN: string,
  bookId: string, 
  name: string,
  desc?: string,
  author: string,
  status?: "available" | "borrowed",
  cover?: string,
  borrowedBy?: string, 
  borrowedAt?: Date
}