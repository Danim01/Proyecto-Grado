import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"
import { AnalysisResult } from "@/types/analyzeImage"
import { LocationObject } from "expo-location"

interface Image {
  axiosClient: AxiosInstance,
  imageURL: string,
  location?: LocationObject
}

async function analyzeImage ({ axiosClient, imageURL, location }: Image) {
  try {
    const { data } = await axiosClient.post<AnalysisResult>('busquedas/analisis-imagen/', {
      img_url: imageURL,
      latitud: location?.coords.latitude,
      longitud: location?.coords.longitude
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