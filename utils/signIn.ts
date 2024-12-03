import { Credentials, Session } from "@/context/authContext";
import axiosClient from "./axios";

async function signIn({ email, password }: Credentials): Promise<Session | null> {
  try {
    const { data } = await axiosClient.post<Session>('usuario/login/', {
      email, password
    })
    return data
  } catch (error) {
    console.error('Error iniciando sesión', error)
    return null
  }
}

export default signIn