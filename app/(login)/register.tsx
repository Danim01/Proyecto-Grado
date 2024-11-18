import { Link } from "expo-router"
import { useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from "@/components/ThemedView"

export default function RegisterScreen() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm()
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
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nombre"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value || ""}
                  placeholder="kevinPapasito"
                />
              )}
              name="name"
              rules={{ required: "Este campo es requerido" }}
            />
          </ThemedView>
          <ThemedView>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Correo"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value || ""}
                  placeholder="kevinPapasito@gmail.com"
                  aria-labelledby="email"
                />
              )}
              name="email"
              rules={{ required: "Este campo es requerido" }}
            />
          </ThemedView>
          <ThemedView>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Contraseña"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value || ""}
                  secureTextEntry
                  placeholder="••••••••"
                  aria-labelledby="contraseña"
                />
              )}
              name="password"
              rules={{ required: "Este campo es requerido" }}
            />
          </ThemedView>
          <ThemedView>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirmar Contraseña"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value || ""}
                  secureTextEntry
                  placeholder="••••••••"
                  aria-labelledby="contraseña"
                />
              )}
              name="confirmPassword"
              rules={{ required: "Este campo es requerido" }}
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
