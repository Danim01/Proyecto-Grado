import { AxiosError } from "axios";

export function extractErrors (error: AxiosError) {
  let errorMessage = ''

  if (error.response) {
    const errorData = error.response.data as Record<any, any>
    Object.values(errorData).forEach((value, i, arr) => {
      errorMessage += `${value[0]}${i === (arr.length - 1) ? '.' : ', '}`
    })
  } else {
    errorMessage = error.message
  }
  return errorMessage
}