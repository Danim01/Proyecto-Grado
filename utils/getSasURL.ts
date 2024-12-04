import axiosClient from "./axios"

interface URLSas {
  url: string
}

async function getSasURL() {
  try {
    const { data } = await axiosClient.get<URLSas>('busquedas/get-sas-url/')
    return data.url
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getSasURL