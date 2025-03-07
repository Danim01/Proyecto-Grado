import { baseURL } from "@/constants/api"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

interface Props {
  axiosClient: AxiosInstance,
  email: string
}

async function editProfile({ email, axiosClient }: Props) {
  try {
    const response = await axiosClient.post(`${baseURL}usuario/detalle/`, {
      email
    })

    console.log({response})
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default editProfile