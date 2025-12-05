export interface BookInterface {
  id: number,
  bookId: string, 
  name: string,
  desc?: string,
  author?: string,
  status?: "available" | "borrowed",
  coverImage?: string,
  borrowedBy?: string, 
  borrowedAt?: Date
}