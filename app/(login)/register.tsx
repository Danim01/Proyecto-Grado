import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from "@/components/ThemedView"
import FormField from "@/components/FormField"
import { registerSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export default function RegisterScreen() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<any> = (errors, e) => {
    return console.log(errors)
  }

  return (
    <>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.title}>
          <ThemedText type="title">Registrarse</ThemedText>
          <ThemedText type="default">
            Ingresa tus datos para completar tu registro
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.form}>
          <ThemedView>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormField
                  label="Nombre"
                  onChangeText={field.onChange}
                  placeholder="kevinPapasito"
                  inputError={errors.name}
                  {...field}
                />
              )}
            />
          </ThemedView>
          <ThemedView>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormField
                  label="Correo"
                  onChangeText={field.onChange}
                  placeholder="kevinPapasito@gmail.com"
                  inputError={errors.email}
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
                  label="Contraseña"
                  onChangeText={field.onChange}
                  secureTextEntry
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
                  secureTextEntry
                  placeholder="••••••••"
                  inputError={errors.confirmPassword}
                  {...field}
                />
              )}
            />
          </ThemedView>
          <ThemedView>
            <Button onPress={handleSubmit(onSubmit)} mode="contained-tonal">
              <ThemedText>Registrar</ThemedText>
            </Button>
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedText style={styles.textBottom}>
            ¿Ya tienes una cuenta?
            <Link href="/"> Iniciar Sesión</Link>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 20,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  title: {
    gap: 20,
  },
  form: {
    gap: 15,
  },
  textBottom: {
    textAlign: 'center',
    paddingTop: 40,
  }
});
