import Loader from "@/components/Loader"
import { useSession } from "@/context/authContext"
import { Redirect, Stack } from "expo-router"
import { View } from 'react-native'

export default function LoginLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#EDF7F1' }}>
        <Loader text="Iniciando sesión..." />
      </View>
    )
  }

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
      <Stack.Screen name="password/reset/verify" options={{ headerShown: false }} />
    </Stack>
  )
}
