import FormField from '@/components/FormField'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { resetPasswordSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { z } from 'zod'

export default function () {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })
  const [formData, setFormData] = useState(null)

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data)
    setFormData(data)
  }

  return (
    <>
      <ThemedView style={styles.mainContainer}>
        <ThemedText type='title'>Recuperar Contraseña</ThemedText>
        <ThemedView>
          <Controller
            control={control}
            render={({ field }) => (
              <FormField
                label="Correo"
                onChangeText={field.onChange}
                placeholder="kevinPapasito@gmail.com"
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
    </>
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

