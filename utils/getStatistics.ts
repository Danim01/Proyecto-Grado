import { baseURL } from "@/constants/api"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"
import { StatisticsResponse } from "@/types/statistics"


async function getStatistics(axiosClient: AxiosInstance) {
  try {
    const response = await axiosClient.get<StatisticsResponse>(`${baseURL}busquedas/estadisticas/`)
    return response.data.estadisticas
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default getStatistics