export async function useGet<T = any>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        ...options,
      })
  
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Request failed: ${res.status} ${text}`)
      }
  
      return res.json()
    } catch (err) {
      console.error("API Error:", err)
      throw err
    }
  }
  
  export async function usePost<T = any>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        ...options,
      })
  
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Request failed: ${res.status} ${text}`)
      }
  
      return res.json()
    } catch (err) {
      console.error("API Error:", err)
      throw err
    }
  }
  
  export async function usePut<T = any>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
  
      const res = await fetch(url, {
        method: "PUT",
        cache: "no-cache",
        ...options,
      })
  
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Request failed: ${res.status} ${text}`)
      }
  
      return res.json()
    } catch (err) {
      console.error("API Error:", err)
      throw err
    }
  }
  
  export async function useDelete<T = any>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        cache: "no-cache",
        ...options,
      })
  
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Request failed: ${res.status} ${text}`)
      }
  
      return res.json()
    } catch (err) {
      console.error("API Error:", err)
      throw err
    }
  }