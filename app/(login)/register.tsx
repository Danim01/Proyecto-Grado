import { Link } from "expo-router"
import { useState } from "react"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
import { Pressable, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'

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
      <View>
        <ThemedText type="title">Registrarse</ThemedText>
        <ThemedText type="subtitle">
          Ingresa tus datos para completar tu registro
        </ThemedText>
      </View>
      <View>
        <View>
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
        </View>
        <View>
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
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value || ""}
                secureTextEntry
                placeholder="..........."
                aria-labelledby="contraseña"
              />
            )}
            name="password"
            rules={{ required: "Este campo es requerido" }}
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirmar Contraseña"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value || ""}
                secureTextEntry
                placeholder="..........."
                aria-labelledby="contraseña"
              />
            )}
            name="confirmPassword"
            rules={{ required: "Este campo es requerido" }}
          />
        </View>
        <View>
          <Button onPress={handleSubmit(onSubmit)}>
            <ThemedText>Registrar</ThemedText>
          </Button>
        </View>
      </View>
      <View>
        <ThemedText>
          ¿Ya tienes una cuenta?
          <Link href="/">Iniciar Sesión</Link>
        </ThemedText>
      </View>
    </>
  )
}
