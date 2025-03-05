import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"
import { PaginatedLookup } from "@/types/analyzeImage"
import { PaginatedOptions } from "@/types/common"

interface InterfacePaginated extends PaginatedOptions {
  axiosClient: AxiosInstance
}

async function getPaginatedLookups({axiosClient, limit = 8, offset = 0}: InterfacePaginated) {
  try {
    const { data } = await axiosClient.get<PaginatedLookup>(`busquedas/?limit=${limit}&offset=${offset}`)
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