import { AxiosInstance } from "axios"

interface URLSas {
  url: string
}

// Obtenemos la URL del Token SAS para subir la URL 
// de la imagen a la carpeta de azure
async function getSasURL(axiosClient: AxiosInstance) {
  try {
    const { data } = await axiosClient.get<URLSas>('busquedas/url-sas/')
    return data.url
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getSasURL