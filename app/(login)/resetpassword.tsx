import FormField from '@/components/FormField'
import Loader from '@/components/Loader'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useGlobalError } from '@/context/globalErrorsContext'
import { resetPasswordSchema } from '@/schema'
import sendEmail from '@/utils/sendEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"
import { Button, Icon } from "react-native-paper"
import { z } from 'zod'

type FormDataType = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordScreen () {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })
  const [loading, setLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const { updateError } = useGlobalError()

  const onSubmit = async (data: FormDataType) => {
    setLoading(true)
    try {
      await sendEmail(data.email)
      setIsFinished(true)
      reset()
    } catch (error: any) {
      console.error(error.message)
      updateError("Algo salio mal, por favor ingrese nuevamente su correo")
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemedView style={styles.mainContainer}>
      {loading &&
        <Loader text='Enviando correo'/>
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
      <ThemedText type='title'>Recuperar Contraseña</ThemedText>
      <ThemedView>
        <Controller
          control={control}
          render={({ field }) => (
            <FormField
              label="Correo"
              onChangeText={field.onChange}
              placeholder="sofia@gmail.com"
              inputError={errors.email}
              {...field}
            />
          )}
          name="email"
          rules={{ required: "Este campo es requerido" }}
        />
      </ThemedView>
      <ThemedView>
        <Button onPress={handleSubmit(onSubmit)} mode="contained-tonal">
          <ThemedText>Recuperar Contraseña</ThemedText>
        </Button>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 45,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
});

