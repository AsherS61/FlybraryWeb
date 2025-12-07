// import interface
import { useGet, usePut } from "../utils/useQuery"


//---------------------
// GET
//---------------------
export async function getBooks() {
  return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
}

export async function getBook(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }

export async function getBooksBorrowedByUser(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }
  
//---------------------
// PUT
//---------------------
export async function borrowBook(id : string, userId : string) {
    return usePut(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/borrow/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
      credentials: "include",
    })
  }

export async function returnBook(id : string) {
    return usePut(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/return/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
}