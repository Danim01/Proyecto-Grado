import basePasswordSchema from "./basePassword";

const forgetPasswordSchema = basePasswordSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
  })

export default forgetPasswordSchema