import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useSession } from "@/context/authContext"
import { Redirect, Stack } from "expo-router"

export default function LoginLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return (
      <ThemedView>
        <ThemedText type='title'>Cargando...</ThemedText>
      </ThemedView> 
    )
  }

  if (session?.refresh && session.access) {
    return <Redirect href="/home" />
  }

  return (
    <Stack screenOptions={{
      headerTitle: "",
      headerStyle: {
        backgroundColor: '#1b1b1b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="resetpassword" />
    </Stack>
  )
}
