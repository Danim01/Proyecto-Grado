import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from "@/components/ThemedView"
import FormField from "@/components/FormField"
import { registerSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSession } from "@/context/authContext"
import { User } from "@/types/session"

export default function RegisterScreen() {
  const {
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

  const { register } = useSession()
  const router = useRouter()
  const [userRegister, setUserRegister] = useState<User | null>(null)


  useEffect(() => {
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const newUser = await register(data)
      if (newUser) {
        setUserRegister(newUser)
        setTimeout(() => (
          router.navigate("/")
        ), 5000)
        reset()
      }
    } catch (error) {
      console.error(error)
    }
    console.log("nuevo:", userRegister)
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.title}>
        <ThemedText type="title">Registrarse</ThemedText>
        <ThemedText type="default">
          Ingresa tus datos para completar tu registro
        </ThemedText>
        {userRegister &&
          <ThemedText type="defaultSemiBold" style={{color: "#008000"}}>
            {userRegister.name}, su cuenta fue creada exitosamente, sera redirigido al inicio de sesión
          </ThemedText>
        }
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
                placeholder="Sofia"
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
                placeholder="sofia@gmail.com"
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
                isPassword
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
                isPassword
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
