import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Restablecer contraseña" }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
    </Stack>
  )
}