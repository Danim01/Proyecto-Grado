import { z } from "zod";
import newPasswordSchema from "./basePassword";

// Validación de la página "registro"
const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" }),
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo es invalido" }),
}).merge(newPasswordSchema).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export default registerSchema