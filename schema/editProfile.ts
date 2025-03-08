import { z } from "zod";

const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
})

export default editProfileSchema