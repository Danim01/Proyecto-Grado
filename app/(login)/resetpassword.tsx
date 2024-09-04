import { ThemedText } from '@/components/ThemedText'
import { Link } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper"

export default function () {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [formData, setFormData] = useState(null)

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data)
    setFormData(data)
  }

  return (
    <>
      <View>
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
          <Button onPress={handleSubmit(onSubmit)}>
            <ThemedText>Recuperar Contraseña</ThemedText>
          </Button>
        </View>
      </View>
    </>
  )
}
