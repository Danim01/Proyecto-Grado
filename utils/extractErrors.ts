import { AxiosError } from "axios";

// Extrae los errores del backend y los convierte en un string
// fácil de utilizar en el frontend
// Esta función solo recibe errores de axios
export function extractErrors (error: AxiosError) {
  let errorMessage = ''

  if (error.response) {
    const errorData = error.response.data as Record<any, any>
    const errorValues = Object.values(errorData)
    // Si tenemos varios errores los separamos por , y si es el ultimo un .
    errorValues.forEach((value, i) => {
      // length - 1 hace referencia al ultimo elemento de mi array
      errorMessage += `${value}${i === (errorValues.length - 1) ? '' : ', '}`
    })
  } else {
    errorMessage = error.message
  }
  return errorMessage
}