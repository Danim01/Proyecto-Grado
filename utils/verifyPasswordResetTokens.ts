import { baseURL } from "@/constants/api"
import axios, { AxiosError } from "axios"
import { extractErrors } from "./extractErrors"

interface Params {
  token: string
  uidb64: string
}

async function verifyPasswordResetTokens({ token, uidb64 }: Params) {
  try {
    const response = await axios.get(`${baseURL}usuario/contrasena/restablecer/confirmar/${uidb64}/${token}/`,)
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default verifyPasswordResetTokens