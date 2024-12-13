import { Credentials, Session } from "@/context/authContext";
import axiosClient from "./axios";
import { extractErrors } from "./extractErrors";
import { AxiosError } from "axios";

async function signIn({ email, password }: Credentials): Promise<Session> {
  try {
    const response = await axiosClient.post<Session>('usuario/login/', {
      email, password
    })
    return response.data
  } catch (error: any) {
    // Si el error es una instancia de un error de axios entonces
    // hace la llamada a la función que maneja errores de axios y lo muestra
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      // El throw new Error manda el error para el catch del try que llamó a la función
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default signIn