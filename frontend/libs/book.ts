// import interface
import { useGet } from "../utils/useQuery"


//---------------------
// GET
//---------------------
export async function getBooks() {
  return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function getBook(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }