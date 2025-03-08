import { z } from "zod";
import newPasswordSchema from "./basePassword";

const editPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(8, { message: "Debe tener mínimo 8 caracteres" }),
}).merge(newPasswordSchema).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export default editPasswordSchema