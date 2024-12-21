import { AxiosError } from "axios"
import { extractErrors } from "./extractErrors"
import axiosClient from "./axios"

interface Image {
  imageURL: string
}

async function analyzeImage ({ imageURL }: Image) {
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