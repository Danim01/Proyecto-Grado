import { baseURL } from "@/constants/api";
import { CredentialsNewPassword } from "@/types/credentials";
import axios, { AxiosError } from "axios";
import { extractErrors } from "./extractErrors";

async function saveNewPassword({ new_password, confirm_password, uidb64, token }: CredentialsNewPassword) {
  try {
    const response = await axios.post(`${baseURL}usuario/nueva-contrasena/${uidb64}/${token}/`, {
      new_password, confirm_password
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


export default saveNewPassword