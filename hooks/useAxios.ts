import { useSession } from "@/context/authContext";
import { tokenExpired, uploadTokens } from "@/utils/manageTokens";
import axios from "axios";

// ipconfig sirve para saber cual es la ip de mi computador
const baseURL = "http://192.168.1.43:8000/api/"

function useAxios() {
  const { session, setSession } = useSession()
  // Axios nos facilita hacer peticiones HTTP
  // En este caso nos esta haciendo la conexión con el backend
  const axiosClient = axios.create({
    // baseURL: process.env.EXPO_PUBLIC_API_URL
    baseURL,
    headers: {
      Authorization: session ? `Bearer ${session.access}` : null
    }
  })

  axiosClient.interceptors.request.use(async (req) => {
    try {
      if (!session) return req

      const didTokenExpired = tokenExpired(session.access)

      if (!didTokenExpired) return req

      const axiosResponse = await axios.post(
        `${baseURL}usuario/login/refresh/`,
        {
          refresh: session.refresh
        }
      )

      const tokens = axiosResponse.data

      await uploadTokens(tokens)
      setSession(tokens)

      // Actualiza el access token de la petición si el access token ya expiro
      req.headers.Authorization = tokens ? `Bearer ${tokens.access}` : null
      console.log({axiosResponse})
      return req
    } catch (error) {
      console.error(error)
      return req
    }
  })

  return axiosClient
}

export default useAxios