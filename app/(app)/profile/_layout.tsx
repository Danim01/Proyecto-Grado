import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      <Stack.Screen name="editPassword" options={{ headerShown: false }} />
    </Stack>
  )
}