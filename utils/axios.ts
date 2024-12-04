import axios from "axios";

const axiosClient = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API_URL
  // ipconfig sirve para saber cual es la ip de mi computador
  baseURL: "http://192.168.1.38:8000/api/"
})

export default axiosClient