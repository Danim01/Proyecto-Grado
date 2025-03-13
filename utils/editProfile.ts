import { baseURL } from "@/constants/api"
import { AxiosError, AxiosInstance } from "axios"
import { extractErrors } from "./extractErrors"

interface Props {
  axiosClient: AxiosInstance,
  name: string
}

async function editProfile({ axiosClient, ...profileData }: Props) {
  try {
    const response = await axiosClient.patch(`${baseURL}usuario/detalle/`, {
      ...profileData
    })
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default editProfile