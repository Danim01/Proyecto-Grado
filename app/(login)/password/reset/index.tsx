import FormField from "@/components/FormField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import { passwordSchema } from "@/schema";
import saveNewPassword from "@/utils/saveNewPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { z } from "zod";

function NewPasswordScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })
  const { updateError } = useGlobalError()

  const onSubmit = async (data: any) => {
    try {
      const response = await saveNewPassword(data)
    } catch (error: any) {
      console.error(error.message)
      updateError("Algo salio mal, por favor ingrese nuevamente la contraseña")
    }
  }
  return (
    <ThemedView>
      <ThemedText>Ingrese su contraseña su contraseña nueva</ThemedText>
      <ThemedView>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormField
                label="Contraseña"
                onChangeText={field.onChange}
                isPassword
                placeholder="••••••••"
                inputError={errors.password}
                {...field}
              />
            )}
          />
        </ThemedView>
        <ThemedView>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormField
                label="Confirmar Contraseña"
                onChangeText={field.onChange}
                isPassword
                placeholder="••••••••"
                inputError={errors.confirmPassword}
                {...field}
              />
            )}
          />
        </ThemedView>
        <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
    </ThemedView>
  )
}

export default NewPasswordScreen