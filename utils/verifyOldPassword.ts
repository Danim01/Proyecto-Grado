import { baseURL } from "@/constants/api"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

interface Props {
  axiosClient: AxiosInstance
  old_password: string
}

interface Response {
  uuid: string
  token: string
}

async function verifyOldPassword({ axiosClient, old_password }: Props) {
  try {
    const response = await axiosClient.post<Response>(`${baseURL}usuario/password/verify-old/`, {
      old_password
    })

    return response.data
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      // El throw new Error manda el error para el catch del try que llamó a la función
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default verifyOldPassword