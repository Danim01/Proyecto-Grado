import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo es invalido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
})

export default loginSchema