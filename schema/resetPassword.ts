import { z } from "zod"

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo es invalido" })
})

export default resetPasswordSchema