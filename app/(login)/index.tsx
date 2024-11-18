import { Link } from "expo-router"
import { useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import { Pressable, StyleSheet } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function LoginScreen() {
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
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.title}>
        <ThemedText type="title">Iniciar Sesión</ThemedText>
        <ThemedText type="default">
          Bienvenido, por favor ingrese sus datos para iniciar sesión
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.form}>
        <ThemedView>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
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
                onChangeText={(value: any) => onChange(value)}
                value={value || ""}
                secureTextEntry
                placeholder="••••••••"
                aria-labelledby="contraseña"
              />
            )}
            name="contraseña"
            rules={{ required: "Este campo es requerido" }}
          />
        </ThemedView>
        <ThemedView>
          <ThemedText>
            <Link href="/resetpassword">Recuperar contraseña</Link>
          </ThemedText>
        </ThemedView>
        <ThemedView>
          <Button onPress={handleSubmit(onSubmit)} mode="contained-tonal">
            <ThemedText>Iniciar Sesión</ThemedText>
          </Button>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <Link href="/(tabs)/home">
          <ThemedText type="default">Inicio</ThemedText>
        </Link>
        <ThemedText style={styles.textBottom}>
          ¿No estas registrado?
          <Link href="/register"> Registrarse</Link>
        </ThemedText>
      </ThemedView>
    </ThemedView>
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
    paddingTop: 160,
  }
})
