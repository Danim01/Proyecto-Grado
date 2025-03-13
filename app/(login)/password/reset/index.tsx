import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { useGlobalError } from "@/context/globalErrorsContext";
import { forgetPasswordSchema } from "@/schema";
import saveNewPassword from "@/utils/saveNewPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, Portal, Icon } from "react-native-paper";
import { z } from "zod";

type FormType = z.infer<typeof forgetPasswordSchema>

function NewPasswordScreen() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(forgetPasswordSchema),
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
      await saveNewPassword({
        new_password: data.password,
        confirm_password: data.confirmPassword,
        token: local.token,
        uidb64: local.uidb64
      })
      reset()
      setIsFinished(true)
    } catch (error: any) {
      console.error(error.message)
      updateError("Algo salio mal, intente de nuevo mas tarde")
    } finally {
      setLoading(false)
      const timeOutId = setTimeout(() => {
        router.navigate("/")
      }, 5000)
      timeOutRef.current = timeOutId
    }
  }


  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader text="Guardando nueva contraseña"/>
      ) : (
        <View
          style={{
            padding: 16,
            paddingTop: 48,
            flex: 1,
            gap: 16
          }}
        >
          <ThemedText type="subtitle">
            Ingrese su contraseña nueva
          </ThemedText>
          <View>
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
          </View>
          <View>
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
          </View>
          <Button
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}
            style={{ width: 200, alignSelf: "center" }}
            icon="check"
          >
            Guardar
          </Button>
        </View>
      )}
      {isFinished && (
        <Portal>
          <Dialog visible={isFinished} onDismiss={() => setIsFinished(false)}>
            <Dialog.Title accessibilityLabel="Actualización exitosa">
              <Icon
                source="check-circle"
                size={32}
                color="green"
              />
            </Dialog.Title>
            <Dialog.Content>
              <ThemedText>La información se guardo exitosamente</ThemedText>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsFinished(false)}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  )
}

export default NewPasswordScreen