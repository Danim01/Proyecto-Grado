import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import { passwordSchema } from "@/schema";
import saveNewPassword from "@/utils/saveNewPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Icon } from "react-native-paper";
import { z } from "zod";

type FormType = z.infer<typeof passwordSchema>

function NewPasswordScreen() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })
  const { updateError } = useGlobalError()
  const local = useLocalSearchParams<{ token: string, uidb64: string }>()
  const [loading, setLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const router = useRouter()
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
    }
  }, [])

  if (!local.token || !local.uidb64) {
    updateError("Algo salio mal, inténtalo de nuevo")
    return <Redirect href="/" />
  }

  const onSubmit = async (data: FormType) => {
    setLoading(true)
    try {
      const response = await saveNewPassword({
        new_password: data.password,
        confirm_password: data.confirmPassword,
        token: local.token,
        uidb64: local.uidb64
      })
      reset()
      console.log("response: ", response)
      setLoading(false)
      setIsFinished(true)
    } catch (error: any) {
      console.error(error.message)
      updateError("Algo salio mal, intente de nuevo mas tarde")
    } finally {
      const timeOutId = setTimeout(() => {
        router.navigate("/")
      }, 5000)
      timeOutRef.current = timeOutId
    }
  }


  return (
    <ThemedView>
      {loading &&
        <Loader text="Guardando nueva contraseña"/>
      }
      {isFinished && (
        <>
          <Icon
            source="check-circle"
            size={20}
            color='green'
          />
          <ThemedText type='defaultSemiBold'>A tu correo se mando un link para restablecer la contraseña</ThemedText>
      </>
      )}
      <ThemedText>Ingrese su contraseña nueva</ThemedText>
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
        <Button onPress={handleSubmit(onSubmit)} disabled={loading}>Guardar</Button>
    </ThemedView>
  )
}

export default NewPasswordScreen