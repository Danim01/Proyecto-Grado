import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" }),
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo es invalido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(8, { message: "Debe tener mínimo 8 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Este campo es requerido" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export default registerSchema