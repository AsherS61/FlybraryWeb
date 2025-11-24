// import interface
import { useGet, usePost } from "../utils/useQuery"


//---------------------
// GET
//---------------------
export async function logout() {
  return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//---------------------
// POST
//---------------------
export async function login({ email, password } : { email: string, password: string }) {
  return usePost(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
    },
    body: JSON.stringify({ email , password })
  })
}