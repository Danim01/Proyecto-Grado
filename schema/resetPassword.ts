import { z } from "zod"

// Validación de la página "recuperar contraseña"
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo es invalido" })
})

export default resetPasswordSchema