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
    if (error instanceof AxiosError) {
      const message = extractErrors(error)
      throw new Error(message)
    }
    throw new Error(error.message)
  }
}

export default signIn