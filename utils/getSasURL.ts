import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

interface URLSas {
  url: string
}

// Obtenemos la URL del Token SAS para subir la URL
// de la imagen a la carpeta de azure
async function getSasURL(axiosClient: AxiosInstance) {
  try {
    const { data } = await axiosClient.get<URLSas>('busquedas/url-sas/')
    return data.url
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default getSasURL