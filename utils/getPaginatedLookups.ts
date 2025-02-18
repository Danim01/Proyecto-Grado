import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"
import { PaginatedLookup } from "@/types/analyzeImage"

async function getPaginatedLookups(axiosClient: AxiosInstance) {
  try {
    const { data } = await axiosClient.get<PaginatedLookup>("busquedas/")
    return data
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default getPaginatedLookups