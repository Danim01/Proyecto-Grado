import { baseURL } from "@/constants/api";
import axios, { AxiosError } from "axios";
import { extractErrors } from "./extractErrors";

async function sendEmail(email: string) {
  try {
    const response = await axios.post(`${baseURL}usuario/contrasena/restablecer/`, {
      email
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

export default sendEmail