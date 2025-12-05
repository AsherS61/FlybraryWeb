// import interface
import { useGet } from "../utils/useQuery"


//---------------------
// GET
//---------------------
export async function getTransactions() {
  return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function getTransaction(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

export async function getTransactionsByUser(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

export async function getTransactionsByBook(id : string) {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/book/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }