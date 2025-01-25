import { AxiosError } from "axios";
import axiosClient from "./axios";
import { extractErrors } from "./extractErrors";
import { CredentialsRegister } from "@/types/credentials";

async function register ({ name, email, password }: CredentialsRegister) {
  try {
    const response = await axiosClient.post('usuario/registro/', {
      name, email, password
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

export default register