import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"
import { AnalysisResult } from "@/types/analyzeImage"

interface Image {
  axiosClient: AxiosInstance,
  imageURL: string
}

async function analyzeImage ({ axiosClient, imageURL }: Image) {
  try {
    const { data } = await axiosClient.post<AnalysisResult>('busquedas/analisis-imagen/', {
      img_url: imageURL
    })

    return data
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default analyzeImage