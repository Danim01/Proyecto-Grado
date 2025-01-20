import axios from "axios";

// Axios nos facilita hacer peticiones HTTP
// En este caso nos esta haciendo la conexión con el backend
const axiosClient = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API_URL
  // ipconfig sirve para saber cual es la ip de mi computador
  baseURL: "http://192.168.1.43:8000/api/"
})

export default axiosClient