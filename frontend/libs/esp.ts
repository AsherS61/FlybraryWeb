import { useGet } from "@/utils/useQuery";

export async function getTemperature() {
    return useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/esp/latestTemperature`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }