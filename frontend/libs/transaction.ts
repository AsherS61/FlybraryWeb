// import interface
import { useGet } from "../utils/useQuery"


//---------------------
// GET
//---------------------
export async function getTransactions(limit : number = 6) {
  return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions?limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
}

export async function getTransaction(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }

export async function getTransactionsByUser(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }

export async function getTransactionsByBook(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/book/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }