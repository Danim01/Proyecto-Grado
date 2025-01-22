import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

interface Image {
  axiosClient: AxiosInstance,
  imageURL: string
}

async function analyzeImage ({ axiosClient, imageURL }: Image) {
  try {
    const response = await axiosClient.post('busquedas/analyze-image/', {
      img_url: imageURL
    })

    return response.data
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default analyzeImage