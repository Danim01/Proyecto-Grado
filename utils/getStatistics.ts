import { baseURL } from "@/constants/api"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"


async function getStatistics(axiosClient: AxiosInstance) {
  try {
    const response = await axiosClient.get(`${baseURL}busquedas/estadisticas/`)
    console.log(response.data)
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default getStatistics