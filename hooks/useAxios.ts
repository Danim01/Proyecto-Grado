import { useSession } from "@/context/authContext";
import axios from "axios";

// ipconfig sirve para saber cual es la ip de mi computador
const baseURL = "http://192.168.1.38:8000/api/"

function useAxios() {
  const { session } = useSession()
  // Axios nos facilita hacer peticiones HTTP
  // En este caso nos esta haciendo la conexión con el backend
  const axiosClient = axios.create({
    // baseURL: process.env.EXPO_PUBLIC_API_URL
    baseURL,
    headers: {
      Authorization: `Bearer${session}`
    }
  })
}