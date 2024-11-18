import { Slot, Stack } from "expo-router"
import { View } from "react-native"

export default function LoginLayout() {
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
