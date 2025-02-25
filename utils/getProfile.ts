import { Profile } from "@/types/common"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

async function getProfile(axiosClient: AxiosInstance) {
  try {
    console.log(axiosClient)
    const response = await axiosClient.get<Profile>('usuario/perfil/')

    return response.data
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default getProfile