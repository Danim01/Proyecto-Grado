import { useSession } from "@/context/authContext"
import { Redirect, Stack } from "expo-router"

export default function LoginLayout() {
  const { session } = useSession()

  if (session?.refresh && session.access) {
    return <Redirect href="/home" />
  }

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#1b1b1b',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="index" options={{ headerTitle: "Iniciar Sesión" }} />
      <Stack.Screen name="register" options={{ headerTitle: "Registrarse" }}  />
      <Stack.Screen name="resetpassword" options={{ headerTitle: "Recuperar Contraseña" }}  />
      <Stack.Screen name="password" options={{ headerShown: false }}  />
    </Stack>
  )
}
