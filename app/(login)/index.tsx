import { Link } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "@/schema"
import FormField from "@/components/FormField"
import { z } from "zod"
import { useSession } from "@/context/authContext"
import Loader from "@/components/Loader"

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

  const { signIn, isLoading } = useSession()

  const onSubmit = (data: any) => {
    signIn(data)
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, backgroundColor: '#EDF7F1' }}>
          <Loader text="Iniciando sesión..." />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.title}>
            <ThemedText type="title">¡Bienvenido!</ThemedText>
            <ThemedText type="default">
              Por favor ingrese sus datos para iniciar sesión
            </ThemedText>
          </View>
          <View style={styles.form}>
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormField
                    label="Email"
                    onChangeText={field.onChange}
                    placeholder="sofia@gmail.com"
                    inputError={errors.email}
                    autoCapitalize="none"
                    {...field}
                  />
                )}
              />
            </View>
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
              <ThemedText>
                <Link href="/resetpassword">Recuperar contraseña</Link>
              </ThemedText>
            </View>
            <View>
              <Button onPress={handleSubmit(onSubmit)} mode="contained-tonal">
                <ThemedText>Iniciar Sesión</ThemedText>
              </Button>
            </View>
          </View>
          <View>
            <ThemedText style={styles.textBottom}>
              ¿No estas registrado?
              <Link href="/register"> Registrarse</Link>
            </ThemedText>
          </View>
        </View>

      )}
    </View>
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
