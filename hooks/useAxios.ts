import { useSession } from "@/context/authContext";
import { tokenExpired, uploadTokens } from "@/utils/manageTokens";
import axios from "axios";
import { baseURL } from "@/constants/api";
import { useEffect, useRef } from 'react';

/*
  Se esta haciendo uso del useRef ya que en este hook la
  sesión no se actualiza en el cliente de axios hasta que
  no se renderice de nuevo, por ende estaba axiosClient estaba
  haciendo uso de sesiones antiguas y con el uso  del useRef
  quitamos ese problema ya que este no depende de renderizados
  y vamos a estar pendiente de actualizarlo solo cuando la sesión
  cambie
*/

function useAxios() {
  const { session, setSession } = useSession()
  // Referencias de los tokens
  const accessTokenRef = useRef(session?.access);
  const refreshTokenRef = useRef(session?.refresh);

  useEffect(() => {
    // Hace que la referencia de los tokens se actualice cada que la sesión cambie
    accessTokenRef.current = session?.access
    refreshTokenRef.current = session?.refresh
  }, [session])

  // Axios nos facilita hacer peticiones HTTP
  // En este caso nos esta haciendo la conexión con el backend
  const axiosClient = axios.create({
    baseURL,
    headers: {
      Authorization: session ? `Bearer ${session.access}` : null
    }
  })

  axiosClient.interceptors.request.use(async (req) => {
    const accessToken = accessTokenRef.current
    const refreshToken = refreshTokenRef.current

    try {
      if (!refreshToken || !accessToken) return req

      const didTokenExpired = tokenExpired(accessToken)

      if (!didTokenExpired) {
        req.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null
        return req
      }

      const axiosResponse = await axios.post(
        `${baseURL}usuario/token/renovar/`,
        {
          refresh: refreshToken
        }
      )

      const tokens = axiosResponse.data

      accessTokenRef.current = tokens.access
      refreshTokenRef.current = tokens.refresh

      setSession({access: tokens.access, refresh: tokens.refresh})
      await uploadTokens({access: tokens.access, refresh: tokens.refresh})

      // Actualiza el access token de la petición si el access token ya expiro
      req.headers.Authorization = tokens ? `Bearer ${tokens.access}` : null
      return req
    } catch (error) {
      console.error(error)
      return req
    }
  })

  return axiosClient
}

export default useAxios