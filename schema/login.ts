import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string({ message: "El correo es requerido" })
    .email({ message: "El correo es invalido" }),
  password: z
    .string({ message: "La contraseña es requerida" })
})

export default loginSchema