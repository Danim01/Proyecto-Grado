import { z } from "zod"

// Validación de la página "recuperar contraseña"
const newPasswordSchema = z.object({
  password: z
  .string()
  .min(1, { message: "La contraseña es requerida" })
  .min(8, { message: "Debe tener mínimo 8 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Este campo es requerido" })
})

export default newPasswordSchema