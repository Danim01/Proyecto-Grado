import { Link } from "expo-router"
import { useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import { Pressable, StyleSheet, View } from "react-native"
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
      <View>
        <ThemedText type="title">Iniciar Sesión</ThemedText>
        <ThemedText type="subtitle">
          Bienvenido, por favor ingrese sus datos para iniciar sesión
        </ThemedText>
      </View>
      <View>
        <View>
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
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                value={value || ""}
                secureTextEntry
                placeholder="......."
                aria-labelledby="contraseña"
              />
            )}
            name="contraseña"
            rules={{ required: "Este campo es requerido" }}
          />
        </View>
        <View>
          <Link href="/resetpassword">Recuperar contraseña</Link>
        </View>
        <View>
          <Button onPress={handleSubmit(onSubmit)}>
            <ThemedText>Iniciar Sesión</ThemedText>
          </Button>
        </View>
      </View>
      <View>
        <ThemedText>
          ¿No estas registrado?
          <Link href="/register">Registrarse</Link>
        </ThemedText>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 8,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40
  },
});
