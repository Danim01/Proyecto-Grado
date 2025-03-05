import axios, { AxiosError } from "axios";
import { extractErrors } from "./extractErrors";
import { CredentialsRegister } from "@/types/credentials";
import { baseURL } from "@/constants/api";

async function register ({ name, email, password }: CredentialsRegister) {
  try {
    const response = await axios.post(`${baseURL}usuario/registro/`, {
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