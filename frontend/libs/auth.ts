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
    credentials: "include",
  })
}

//---------------------
// POST
//---------------------
export async function findOrCreateUser(profile: any) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(profile),
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Backend error:", await res.text());
    throw new Error("Failed to login user on backend");
  }

  return res.json();
}