import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import useAxios from "@/hooks/useAxios";
import { editPasswordSchema } from "@/schema";
import saveNewPassword from "@/utils/saveNewPassword";
import verifyOldPassword from "@/utils/verifyOldPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Icon } from "react-native-paper";
import { z } from "zod";

type EditPasswordType = z.infer<typeof editPasswordSchema>

export default function EditPasswordScreen() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditPasswordType>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }
  })
  const axiosClient = useAxios()
  const { updateError } = useGlobalError()
  const [loading, setLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const onSubmit = async (data: EditPasswordType) => {
    setLoading(true)
    try {
      const response = await verifyOldPassword({ axiosClient, old_password: data.oldPassword })
      await saveNewPassword({ token: response.token, uidb64: response.uuid, new_password: data.password, confirm_password: data.confirmPassword })
      setIsFinished(true)
      reset()
    } catch (error: any) {
      updateError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemedView>
      {loading &&
        <Loader text="Validando información"/>
      }
      {isFinished &&
        <>
          <Icon
            source="check-circle"
            size={20}
            color="green"
          />
          <ThemedText>Se actualizo la contraseña correctamente</ThemedText>
        </>
      }
      <ThemedView>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <FormField
                label="Contraseña antigua"
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
            name="password"
            render={({ field }) => (
              <FormField
                label="Contraseña nueva"
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
                label="Confirmar Contraseña nueva"
                onChangeText={field.onChange}
                isPassword
                placeholder="••••••••"
                inputError={errors.confirmPassword}
                {...field}
              />
            )}
          />
        </ThemedView>
        <Button onPress={handleSubmit(onSubmit)} disabled={loading}>Guardar</Button>
    </ThemedView>
  )
}
