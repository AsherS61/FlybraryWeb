export function queryStringify(params: Record<string, any>): string {
    const query = new URLSearchParams()
  
    function appendParam(key: string, value: any) {
      if (value == null || value === "") return
  
      if (Array.isArray(value)) {
        value.forEach(v => appendParam(key, v))
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          appendParam(`${key}.${k}`, v) // use dot notation for nested keys
        })
      } else {
        query.append(key, String(value))
      }
    }
  
    Object.entries(params).forEach(([key, value]) => appendParam(key, value))
  
    return query.toString()
  }