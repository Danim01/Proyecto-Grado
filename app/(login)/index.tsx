import { Link } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "@/schema"
import FormField from "@/components/FormField"
import { z } from "zod"
import { useSession } from "@/context/authContext"

export default function LoginScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { signIn } = useSession()

  const onSubmit = (data: any) => {
     signIn(data)
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
            name="email"
            render={({ field }) => (
              <FormField
                label="Email"
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
